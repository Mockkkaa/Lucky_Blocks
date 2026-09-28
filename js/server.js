const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Database Persistence (users_db.json)
const DB_FILE = path.join(__dirname, 'users_db.json');

function loadUsersDB() {
    try {
        if (fs.existsSync(DB_FILE)) {
            const data = fs.readFileSync(DB_FILE, 'utf8');
            return JSON.parse(data);
        }
    } catch (e) {
        console.error("Error al cargar la base de datos de usuarios:", e);
    }
    return {};
}

function saveUsersDB(db) {
    try {
        fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf8');
    } catch (e) {
        console.error("Error al guardar la base de datos de usuarios:", e);
    }
}

let usersDB = loadUsersDB();

function hashPassword(password) {
    return crypto.createHash('sha256').update(password + '_lucky_salt').digest('hex');
}

// REST API Endpoints for Account Management & Cloud Saves
app.post('/api/register', (req, res) => {
    const { username, password, initialState } = req.body;

    if (!username || !password || username.trim().length < 3 || password.length < 4) {
        return res.status(400).json({
            success: false,
            message: 'El usuario debe tener al menos 3 caracteres y la contraseña al menos 4.'
        });
    }

    const cleanUsername = username.trim();
    const key = cleanUsername.toLowerCase();

    if (usersDB[key]) {
        return res.status(400).json({
            success: false,
            message: 'El nombre de usuario ya está registrado.'
        });
    }

    const token = 'tok_' + Date.now() + '_' + crypto.randomBytes(8).toString('hex');
    const userRecord = {
        username: cleanUsername,
        passwordHash: hashPassword(password),
        token: token,
        gameState: initialState || null,
        createdAt: Date.now(),
        updatedAt: Date.now()
    };

    usersDB[key] = userRecord;
    saveUsersDB(usersDB);

    console.log(`[AUTH] Cuenta registrada: ${cleanUsername}`);
    return res.json({
        success: true,
        username: cleanUsername,
        token: token,
        gameState: userRecord.gameState,
        message: '¡Cuenta registrada e iniciada correctamente!'
    });
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Ingresa usuario y contraseña.' });
    }

    const key = username.trim().toLowerCase();
    const user = usersDB[key];

    if (!user || user.passwordHash !== hashPassword(password)) {
        return res.status(401).json({ success: false, message: 'Usuario o contraseña incorrectos.' });
    }

    // Refresh token
    user.token = 'tok_' + Date.now() + '_' + crypto.randomBytes(8).toString('hex');
    user.lastLogin = Date.now();
    saveUsersDB(usersDB);

    console.log(`[AUTH] Inicio de sesión exitoso: ${user.username}`);
    return res.json({
        success: true,
        username: user.username,
        token: user.token,
        gameState: user.gameState,
        message: '¡Bienvenido de nuevo!'
    });
});

app.post('/api/save', (req, res) => {
    const { username, token, gameState } = req.body;

    if (!username || !token) {
        return res.status(400).json({ success: false, message: 'Datos incompletos.' });
    }

    const key = username.trim().toLowerCase();
    const user = usersDB[key];

    if (!user || user.token !== token) {
        return res.status(401).json({ success: false, message: 'Sesión no válida o expirada.' });
    }

    user.gameState = gameState;
    user.updatedAt = Date.now();
    saveUsersDB(usersDB);

    return res.json({ success: true, message: 'Progreso guardado en la nube.' });
});

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
// Active Battles
const activeBattles = new Map();

// Random Event System
let activeEvent = null;
const EVENTS = [
    { id: 'lucky_hour',  name: '🍀 LUCKY HOUR',      duration: 60,  effect: { type: 'luckBonus',   value: 0.50 }, desc: '+50% de Suerte durante 60s' },
    { id: 'golden_rain', name: '💰 LLUVIA DORADA',   duration: 1,   effect: { type: 'coinsAll',    value: 500  }, desc: '¡500 Coins gratis para todos!' },
    { id: 'cursed_hour', name: '☠️ HORA MALDITA',    duration: 30,  effect: { type: 'luckPenalty', value: 0.25 }, desc: '-25% de Suerte durante 30s' },
    { id: 'block_rain',  name: '🎁 LLUVIA DE CAJAS', duration: 30,  effect: { type: 'freeBlocks',  value: 3    }, desc: '¡3 cajas gratis durante 30s!' }
];

setInterval(() => {
    // 5% chance every minute to spawn an event
    if (Math.random() < 0.05 && !activeEvent) {
        const evt = EVENTS[Math.floor(Math.random() * EVENTS.length)];
        activeEvent = {
            ...evt,
            expiry: Date.now() + evt.duration * 1000
        };
        
        io.emit('event:start', activeEvent);
        io.emit('chat:message', {
            id: 'sys_' + Date.now(),
            system: true,
            text: `⭐ EVENTO GLOBAL: ${evt.name} - ${evt.desc}`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
        
        setTimeout(() => {
            activeEvent = null;
        }, evt.duration * 1000);
    }
}, 60000);

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

    // Trade System
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

        io.to(target.socketId).emit('trade:incoming_invite', {
            senderSocketId: sender.socketId,
            senderName: sender.username,
            senderRole: sender.role,
            senderLevel: sender.level,
            senderAvatar: sender.avatar
        });

        socket.emit('trade:status', { message: `Solicitud enviada a ${target.username}. Esperando que acepte...` });
    });

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

        const tradeId = 'trade_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4);
        const session = {
            id: tradeId,
            p1: {
                socketId: sender.socketId,
                username: sender.username,
                role: sender.role,
                avatar: sender.avatar,
                level: sender.level,
                slots: [],
                accepted: false,
                confirmed: false
            },
            p2: {
                socketId: responder.socketId,
                username: responder.username,
                role: responder.role,
                avatar: responder.avatar,
                level: responder.level,
                slots: [],
                accepted: false,
                confirmed: false
            },
            countdown: null
        };

        activeTrades.set(tradeId, session);

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

    socket.on('trade:update_slots', (data) => {
        const session = activeTrades.get(data.tradeId);
        if (!session) return;

        const isP1 = session.p1.socketId === socket.id;
        const playerObj = isP1 ? session.p1 : session.p2;

        playerObj.slots = (data.slots || []).slice(0, 4);
        session.p1.accepted = false;
        session.p2.accepted = false;
        session.p1.confirmed = false;
        session.p2.confirmed = false;

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

        if (bothAccepted) {
            io.to(session.p1.socketId).emit('trade:countdown_start', { seconds: 5 });
            io.to(session.p2.socketId).emit('trade:countdown_start', { seconds: 5 });
        }
    });

    socket.on('trade:confirm_final', (data) => {
        const session = activeTrades.get(data.tradeId);
        if (!session) return;

        const isP1 = session.p1.socketId === socket.id;
        if (isP1) session.p1.confirmed = true;
        else session.p2.confirmed = true;

        if (session.p1.confirmed && session.p2.confirmed) {
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

    socket.on('trade:cancel', (data) => {
        const session = activeTrades.get(data.tradeId);
        if (session) {
            io.to(session.p1.socketId).emit('trade:cancelled', { message: 'El intercambio ha sido cancelado.' });
            io.to(session.p2.socketId).emit('trade:cancelled', { message: 'El intercambio ha sido cancelado.' });
            activeTrades.delete(data.tradeId);
        }
    });

    // ==========================================
    // LUCK BATTLES
    // ==========================================
    socket.on('battle:invite', (data) => {
        const sender = onlinePlayers.get(socket.id);
        const target = onlinePlayers.get(data.targetSocketId);
        
        if (!sender || !target) return socket.emit('battle:error', { message: 'Jugador no disponible.' });
        if (sender.socketId === target.socketId) return socket.emit('battle:error', { message: 'No puedes pelear contigo mismo.' });
        
        io.to(target.socketId).emit('battle:incoming_invite', {
            senderSocketId: sender.socketId,
            senderName: sender.username,
            bet: 10000
        });
    });

    socket.on('battle:respond', (data) => {
        if (data.accept) {
            const battleId = 'btl_' + Date.now();
            activeBattles.set(battleId, {
                p1: { socketId: data.senderSocketId, score: 0 },
                p2: { socketId: socket.id, score: 0 },
                startTime: Date.now()
            });
            
            io.to(data.senderSocketId).emit('battle:start', { battleId, rivalName: onlinePlayers.get(socket.id).username });
            io.to(socket.id).emit('battle:start', { battleId, rivalName: onlinePlayers.get(data.senderSocketId).username });
            
            setTimeout(() => {
                const battle = activeBattles.get(battleId);
                if (battle) {
                    let winnerId = null;
                    if (battle.p1.score > battle.p2.score) winnerId = battle.p1.socketId;
                    else if (battle.p2.score > battle.p1.score) winnerId = battle.p2.socketId;
                    
                    io.to(battle.p1.socketId).emit('battle:end', { winnerId, p1Score: battle.p1.score, p2Score: battle.p2.score });
                    io.to(battle.p2.socketId).emit('battle:end', { winnerId, p1Score: battle.p1.score, p2Score: battle.p2.score });
                    activeBattles.delete(battleId);
                }
            }, 30000);
        } else {
            io.to(data.senderSocketId).emit('battle:error', { message: 'El jugador rechazó la batalla.' });
        }
    });
    
    socket.on('battle:update_score', (data) => {
        const battle = activeBattles.get(data.battleId);
        if (battle) {
            if (battle.p1.socketId === socket.id) battle.p1.score += data.points;
            if (battle.p2.socketId === socket.id) battle.p2.score += data.points;
            
            io.to(battle.p1.socketId).emit('battle:score_update', { p1Score: battle.p1.score, p2Score: battle.p2.score });
            io.to(battle.p2.socketId).emit('battle:score_update', { p1Score: battle.p1.score, p2Score: battle.p2.score });
        }
    });

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

            for (const [tradeId, session] of activeTrades.entries()) {
                if (session.p1.socketId === socket.id || session.p2.socketId === socket.id) {
                    const otherSocketId = session.p1.socketId === socket.id ? session.p2.socketId : session.p1.socketId;
                    io.to(otherSocketId).emit('trade:cancelled', { message: 'El otro jugador se ha desconectado.' });
                    activeTrades.delete(tradeId);
                }
            }
        }
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`🚀 [WEBSOCKET & AUTH SERVER] Servidor iniciado en http://localhost:${PORT}`);
});
