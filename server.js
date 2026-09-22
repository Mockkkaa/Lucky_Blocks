const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

// Map of online players: socketId -> Player Object
const onlinePlayers = new Map();
// Map of active trade sessions: tradeId -> Session Object
const activeTrades = new Map();

io.on('connection', (socket) => {
    console.log(`[SOCKET] Jugador conectado: ${socket.id}`);

    // Register / Update player info
    socket.on('user:join', (userData) => {
        const player = {
            socketId: socket.id,
            username: userData.username || 'Jugador Anónimo',
            role: userData.role || 'JUGADOR',
            level: userData.level || 1,
            avatar: userData.avatar || '⚡',
            joinedAt: Date.now()
        };
        onlinePlayers.set(socket.id, player);

        // Broadcast updated list to all players
        io.emit('players:online_list', Array.from(onlinePlayers.values()));

        // Broadcast system chat notification
        io.emit('chat:message', {
            id: 'sys_' + Date.now(),
            system: true,
            text: `✨ ${player.username} [${player.role}] se ha unido al mundo.`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
    });

    // Profile update
    socket.on('user:update_profile', (userData) => {
        if (onlinePlayers.has(socket.id)) {
            const player = onlinePlayers.get(socket.id);
            player.username = userData.username || player.username;
            player.role = userData.role || player.role;
            player.level = userData.level || player.level;
            player.avatar = userData.avatar || player.avatar;
            onlinePlayers.set(socket.id, player);
            io.emit('players:online_list', Array.from(onlinePlayers.values()));
        }
    });

    // Global Chat
    socket.on('chat:send', (payload) => {
        const player = onlinePlayers.get(socket.id);
        if (!player || !payload.text || !payload.text.trim()) return;

        const chatMsg = {
            id: 'msg_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
            socketId: socket.id,
            username: player.username,
            role: player.role,
            level: player.level,
            avatar: player.avatar,
            text: payload.text.trim().substring(0, 200),
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        io.emit('chat:message', chatMsg);
    });

    // Global Drop Announcement (Mythic / Omnisciente)
    socket.on('drop:announce', (dropData) => {
        const player = onlinePlayers.get(socket.id);
        if (!player) return;

        io.emit('drop:global_announce', {
            username: player.username,
            role: player.role,
            itemName: dropData.itemName,
            rarity: dropData.rarity,
            rarityColor: dropData.rarityColor,
            emoji: dropData.emoji,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
    });

    // ==========================================
    // 🤝 ADOPT ME STYLE TRADE SYSTEM (4 SLOTS)
    // ==========================================

    // 1. Send Trade Invitation
    socket.on('trade:invite', (data) => {
        const sender = onlinePlayers.get(socket.id);
        const target = onlinePlayers.get(data.targetSocketId);

        if (!sender || !target) {
            socket.emit('trade:error', { message: 'El jugador no está disponible.' });
            return;
        }

        if (sender.socketId === target.socketId) {
            socket.emit('trade:error', { message: 'No puedes comerciar contigo mismo.' });
            return;
        }

        console.log(`[TRADE] Invitación de ${sender.username} para ${target.username}`);

        // Notify target player with incoming trade banner/modal
        io.to(target.socketId).emit('trade:incoming_invite', {
            senderSocketId: sender.socketId,
            senderName: sender.username,
            senderRole: sender.role,
            senderLevel: sender.level,
            senderAvatar: sender.avatar
        });

        socket.emit('trade:status', { message: `Solicitud enviada a ${target.username}. Esperando que acepte...` });
    });

    // 2. Target Player Responds to Invite
    socket.on('trade:respond_invite', (data) => {
        const responder = onlinePlayers.get(socket.id);
        const sender = onlinePlayers.get(data.senderSocketId);

        if (!responder || !sender) {
            socket.emit('trade:error', { message: 'El jugador ya no está disponible.' });
            return;
        }

        if (!data.accepted) {
            io.to(sender.socketId).emit('trade:rejected', {
                responderName: responder.username,
                message: `${responder.username} ha rechazado tu solicitud de intercambio.`
            });
            return;
        }

        // Create new active Adopt Me Trade Session!
        const tradeId = 'trade_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4);
        const session = {
            id: tradeId,
            p1: {
                socketId: sender.socketId,
                username: sender.username,
                role: sender.role,
                avatar: sender.avatar,
                level: sender.level,
                slots: [], // up to 4 items
                accepted: false,
                confirmed: false
            },
            p2: {
                socketId: responder.socketId,
                username: responder.username,
                role: responder.role,
                avatar: responder.avatar,
                level: responder.level,
                slots: [], // up to 4 items
                accepted: false,
                confirmed: false
            },
            countdown: null
        };

        activeTrades.set(tradeId, session);

        // Open live trade window for both players!
        io.to(sender.socketId).emit('trade:session_start', {
            tradeId: tradeId,
            myRole: 'p1',
            partner: {
                username: responder.username,
                role: responder.role,
                avatar: responder.avatar,
                level: responder.level
            }
        });

        io.to(responder.socketId).emit('trade:session_start', {
            tradeId: tradeId,
            myRole: 'p2',
            partner: {
                username: sender.username,
                role: sender.role,
                avatar: sender.avatar,
                level: sender.level
            }
        });
    });

    // 3. Update Trade Slots (Add/Remove items - Up to 4)
    socket.on('trade:update_slots', (data) => {
        const session = activeTrades.get(data.tradeId);
        if (!session) return;

        const isP1 = session.p1.socketId === socket.id;
        const playerObj = isP1 ? session.p1 : session.p2;

        // Ensure max 4 items
        playerObj.slots = (data.slots || []).slice(0, 4);

        // Security rule: Any slot change cancels previous acceptances!
        session.p1.accepted = false;
        session.p2.accepted = false;
        session.p1.confirmed = false;
        session.p2.confirmed = false;

        // Broadcast updated trade room state to both
        io.to(session.p1.socketId).emit('trade:session_update', {
            mySlots: session.p1.slots,
            partnerSlots: session.p2.slots,
            myAccepted: session.p1.accepted,
            partnerAccepted: session.p2.accepted,
            status: 'modifying'
        });

        io.to(session.p2.socketId).emit('trade:session_update', {
            mySlots: session.p2.slots,
            partnerSlots: session.p1.slots,
            myAccepted: session.p2.accepted,
            partnerAccepted: session.p1.accepted,
            status: 'modifying'
        });
    });

    // 4. Accept Offer (Stage 1)
    socket.on('trade:accept_stage1', (data) => {
        const session = activeTrades.get(data.tradeId);
        if (!session) return;

        const isP1 = session.p1.socketId === socket.id;
        if (isP1) session.p1.accepted = true;
        else session.p2.accepted = true;

        const bothAccepted = session.p1.accepted && session.p2.accepted;

        io.to(session.p1.socketId).emit('trade:session_update', {
            mySlots: session.p1.slots,
            partnerSlots: session.p2.slots,
            myAccepted: session.p1.accepted,
            partnerAccepted: session.p2.accepted,
            bothAccepted: bothAccepted
        });

        io.to(session.p2.socketId).emit('trade:session_update', {
            mySlots: session.p2.slots,
            partnerSlots: session.p1.slots,
            myAccepted: session.p2.accepted,
            partnerAccepted: session.p1.accepted,
            bothAccepted: bothAccepted
        });

        // If both accepted, trigger countdown sequence!
        if (bothAccepted) {
            io.to(session.p1.socketId).emit('trade:countdown_start', { seconds: 5 });
            io.to(session.p2.socketId).emit('trade:countdown_start', { seconds: 5 });
        }
    });

    // 5. Final Confirmation (Stage 2 after countdown)
    socket.on('trade:confirm_final', (data) => {
        const session = activeTrades.get(data.tradeId);
        if (!session) return;

        const isP1 = session.p1.socketId === socket.id;
        if (isP1) session.p1.confirmed = true;
        else session.p2.confirmed = true;

        if (session.p1.confirmed && session.p2.confirmed) {
            // TRADE COMPLETE! Swap up to 4 items
            io.to(session.p1.socketId).emit('trade:completed', {
                givenItems: session.p1.slots,
                receivedItems: session.p2.slots,
                partnerName: session.p2.username
            });

            io.to(session.p2.socketId).emit('trade:completed', {
                givenItems: session.p2.slots,
                receivedItems: session.p1.slots,
                partnerName: session.p1.username
            });

            io.emit('chat:message', {
                id: 'sys_' + Date.now(),
                system: true,
                text: `🤝 ¡${session.p1.username} e ${session.p2.username} han completado un intercambio de ${session.p1.slots.length + session.p2.slots.length} ítems!`,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            });

            activeTrades.delete(data.tradeId);
        }
    });

    // 6. Cancel Trade
    socket.on('trade:cancel', (data) => {
        const session = activeTrades.get(data.tradeId);
        if (session) {
            io.to(session.p1.socketId).emit('trade:cancelled', { message: 'El intercambio ha sido cancelado.' });
            io.to(session.p2.socketId).emit('trade:cancelled', { message: 'El intercambio ha sido cancelado.' });
            activeTrades.delete(data.tradeId);
        }
    });

    // Disconnect Handler
    socket.on('disconnect', () => {
        const player = onlinePlayers.get(socket.id);
        if (player) {
            onlinePlayers.delete(socket.id);
            io.emit('players:online_list', Array.from(onlinePlayers.values()));
            io.emit('chat:message', {
                id: 'sys_' + Date.now(),
                system: true,
                text: `🚪 ${player.username} se ha desconectado.`,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            });

            // Cancel any trade session this player was part of
            for (const [tradeId, session] of activeTrades.entries()) {
                if (session.p1.socketId === socket.id || session.p2.socketId === socket.id) {
                    const otherSocketId = session.p1.socketId === socket.id ? session.p2.socketId : session.p1.socketId;
                    io.to(otherSocketId).emit('trade:cancelled', { message: 'El otro jugador se ha desconectado.' });
                    activeTrades.delete(tradeId);
                }
            }
            console.log(`[SOCKET] Jugador desconectado: ${player.username}`);
        }
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`🚀 [WEBSOCKET SERVER] Servidor multijugador iniciado en http://localhost:${PORT}`);
});
