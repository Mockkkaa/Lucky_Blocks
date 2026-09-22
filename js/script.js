const LOOT_TABLE = [
            // Common (49.99%)
            { id: 'c1', name: 'Espada de Madera', rarity: 'Common', emoji: '🗡️', baseValue: 10 },
            { id: 'c2', name: 'Armadura de Cuero', rarity: 'Common', emoji: '👘', baseValue: 8 },
            { id: 'c3', name: 'Pico de Piedra', rarity: 'Common', emoji: '⛏️', baseValue: 12 },
            { id: 'c4', name: 'Pan de Centeno', rarity: 'Common', emoji: '🍞', baseValue: 5 },
            { id: 'c5', name: 'Cuerda Resistente', rarity: 'Common', emoji: '🪢', baseValue: 7 },

            // Uncommon (25.00%)
            { id: 'u1', name: 'Poción Slime', rarity: 'Uncommon', emoji: '🧪', baseValue: 50 },
            { id: 'u2', name: 'Escudo de Hierro', rarity: 'Uncommon', emoji: '🛡️', baseValue: 45 },
            { id: 'u3', name: 'Flecha de Plata', rarity: 'Uncommon', emoji: '🏹', baseValue: 40 },
            { id: 'u4', name: 'Botas de Velocidad', rarity: 'Uncommon', emoji: '👟', baseValue: 60 },

            // Rare (15.00%)
            { id: 'r1', name: 'Anillo Mágico', rarity: 'Rare', emoji: '💍', baseValue: 200 },
            { id: 'r2', name: 'Arco Encantado', rarity: 'Rare', emoji: '🏹', baseValue: 180 },
            { id: 'r3', name: 'Varita de Cristal', rarity: 'Rare', emoji: '🪄', baseValue: 220 },
            { id: 'r4', name: 'Manto de Sombras', rarity: 'Rare', emoji: '🧥', baseValue: 250 },

            // Epic (7.00%)
            { id: 'e1', name: 'Hoja de Plasma', rarity: 'Epic', emoji: '⚔️', baseValue: 1000 },
            { id: 'e2', name: 'Escama de Dragón', rarity: 'Epic', emoji: '🐉', baseValue: 900 },
            { id: 'e3', name: 'Martillo de Tormenta', rarity: 'Epic', emoji: '🔨', baseValue: 1100 },
            { id: 'e4', name: 'Orbe del Vacío', rarity: 'Epic', emoji: '🔮', baseValue: 1200 },

            // Legendary (2.50%)
            { id: 'l1', name: 'Corona Dorada', rarity: 'Legendary', emoji: '👑', baseValue: 5000 },
            { id: 'l2', name: 'Pluma de Fénix', rarity: 'Legendary', emoji: '🪶', baseValue: 4500 },
            { id: 'l3', name: 'Escudo de Titán', rarity: 'Legendary', emoji: '🛡️', baseValue: 6000 },

            // Mythic (0.50%)
            { id: 'm1', name: 'Armadura Vampírica', rarity: 'Mythic', emoji: '🧛', baseValue: 25000 },
            { id: 'm2', name: 'Cetro del Caos', rarity: 'Mythic', emoji: '🔱', baseValue: 30000 },
            { id: 'm3', name: 'Reliquia Ancestral', rarity: 'Mythic', emoji: '⚱️', baseValue: 28000 },

            // Omnisciente (0.01%)
            { id: 'o1', name: 'Artefacto Cósmico', rarity: 'Omnisciente', emoji: '✨', baseValue: 100000 },
            { id: 'o2', name: 'Cristal del Universo', rarity: 'Omnisciente', emoji: '🌌', baseValue: 150000 }
        ];

        const SKINS_DATA = [
            { id: 'classic', name: 'Clásico', icon: '⭐', cost: 0, reqLevel: 1 },
            { id: 'pumpkin', name: 'Calabaza', icon: '🎃', cost: 2000, reqLevel: 1 },
            { id: 'safe', name: 'Caja Fuerte', icon: '🔒', cost: 5000, reqLevel: 1 },
            { id: 'plasma', name: 'Cubo Plasma', icon: '💠', cost: 0, reqLevel: 10 },
            { id: 'shadow', name: 'Sombra Oscura', icon: '⬛', cost: 0, reqLevel: 20 }
        ];

        const THEMES_DATA = [
            { id: 'void', name: 'Void Black', previewBg: '#1a0a2e', cost: 0, reqLevel: 1 },
            { id: 'cyber', name: 'Cyber Blue', previewBg: '#001a3e', cost: 1000, reqLevel: 1 },
            { id: 'crimson', name: 'Crimson Red', previewBg: '#2e0a0a', cost: 1500, reqLevel: 1 },
            { id: 'neon', name: 'Neon Green', previewBg: '#0a2e0a', cost: 0, reqLevel: 5 },
            { id: 'golden', name: 'Golden Age', previewBg: '#2e200a', cost: 0, reqLevel: 15 }
        ];

        /* ==========================================================================
           STATE MANAGEMENT & LOCAL STORAGE
           ========================================================================== */
        const STORAGE_KEY = 'lucky_block_sim_cyber_v1';

        const DEFAULT_STATE = {
            playerName: "Jugador #1337",
            role: "JUGADOR",
            unlockedRoles: ["JUGADOR"],
            coins: 100,
            totalCoinsEarned: 100,
            xp: 0,
            level: 1,
            blocksOpened: 0,
            pityCounter: 0,
            luckLevel: 0,
            traderLevel: 0,
            autoClickerLevel: 0,
            autoClickerEnabled: false,
            inventory: [],
            selectedSkin: 'classic',
            unlockedSkins: ['classic'],
            selectedTheme: 'void',
            unlockedThemes: ['void'],
            stats: {
                highestValueItem: null,
                omniscienteCount: 0,
                legendariesObtained: 0
            },
            startDate: new Date().toLocaleDateString()
        };

        let state = { ...DEFAULT_STATE };
        let lastRevealedItem = null;
        let autoClickerIntervalId = null;

        function loadState() {
            try {
                const saved = localStorage.getItem(STORAGE_KEY);
                if (saved) {
                    const parsed = JSON.parse(saved);
                    state = { ...DEFAULT_STATE, ...parsed };
                }
                ensureMissionsInitialized();
            } catch (e) {
                console.error("Error al cargar estado:", e);
                state = { ...DEFAULT_STATE };
                ensureMissionsInitialized();
            }
        }

        function saveState() {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
            } catch (e) {
                console.error("Error al guardar estado:", e);
            }
        }

        /* ==========================================================================
           AUDIO SYNTHESIZER (WEB AUDIO API)
           ========================================================================== */
        class SoundManager {
            constructor() {
                this.ctx = null;
            }

            init() {
                if (!this.ctx) {
                    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
                }
            }

            playClick() {
                this.init();
                if (!this.ctx) return;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(400, this.ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.05);
                gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start();
                osc.stop(this.ctx.currentTime + 0.05);
            }

            playOpen() {
                this.init();
                if (!this.ctx) return;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(150, this.ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(600, this.ctx.currentTime + 0.2);
                gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.2);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start();
                osc.stop(this.ctx.currentTime + 0.2);
            }

            playOmni() {
                this.init();
                if (!this.ctx) return;
                const now = this.ctx.currentTime;
                [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
                    const osc = this.ctx.createOscillator();
                    const gain = this.ctx.createGain();
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(freq, now + idx * 0.1);
                    gain.gain.setValueAtTime(0.3, now + idx * 0.1);
                    gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.1 + 0.8);
                    osc.connect(gain);
                    gain.connect(this.ctx.destination);
                    osc.start(now + idx * 0.1);
                    osc.stop(now + idx * 0.1 + 0.8);
                });
            }
        }
        const sounds = new SoundManager();

        /* ==========================================================================
           WEIGHTED RNG & PITY SYSTEM
           ========================================================================== */
        function getBaseWeights(isPremium = false) {
            // Base weights table (Total 10000)
            let weights = {
                Common: isPremium ? 0 : 4999,
                Uncommon: isPremium ? 5000 : 2500,
                Rare: isPremium ? 3000 : 1500,
                Epic: isPremium ? 1400 : 700,
                Legendary: isPremium ? 500 : 250,
                Mythic: isPremium ? 98 : 50,
                Omnisciente: isPremium ? 2 : 1
            };

            // Apply Luck Upgrade shift (+5% to Epic+ per luck level)
            if (state.luckLevel > 0) {
                const shiftFactor = state.luckLevel * 120;
                if (!isPremium && weights.Common >= shiftFactor) {
                    weights.Common -= shiftFactor;
                } else if (weights.Uncommon >= shiftFactor) {
                    weights.Uncommon -= shiftFactor;
                }
                weights.Epic += Math.floor(shiftFactor * 0.5);
                weights.Legendary += Math.floor(shiftFactor * 0.3);
                weights.Mythic += Math.floor(shiftFactor * 0.18);
                weights.Omnisciente += Math.max(1, Math.floor(shiftFactor * 0.02));
            }

            return weights;
        }

        function rollRarity(isPremium = false) {
            // Check Pity Guarantee (>= 100)
            if (state.pityCounter >= 100) {
                state.pityCounter = 0;
                showToast('🛡️ ¡PITY ALCANZADO!', 'Garantizada rareza Legendaria o superior', 'Legendary');
                const pityRoll = Math.random();
                if (pityRoll < 0.80) return 'Legendary';
                if (pityRoll < 0.98) return 'Mythic';
                return 'Omnisciente';
            }

            const weights = getBaseWeights(isPremium);
            let totalWeight = 0;
            for (let key in weights) totalWeight += weights[key];

            let random = Math.random() * totalWeight;
            for (let rarity in weights) {
                if (random < weights[rarity]) {
                    // Update Pity counter
                    if (['Legendary', 'Mythic', 'Omnisciente'].includes(rarity)) {
                        state.pityCounter = 0; // Reset pity on high roll
                    } else {
                        state.pityCounter += 1;
                    }
                    return rarity;
                }
                random -= weights[rarity];
            }

            state.pityCounter += 1;
            return 'Common';
        }

        function getRandomItemByRarity(rarity) {
            const items = LOOT_TABLE.filter(i => i.rarity === rarity);
            return items[Math.floor(Math.random() * items.length)];
        }

        /* ==========================================================================
           GAME LOGIC & ACTIONS
           ========================================================================== */
        function openLuckyBlock(isPremium = false) {
            const cost = isPremium ? 500 : 50;
            if (state.coins < cost) {
                showToast('❌ Sin Coins suficientes', `Necesitas ${cost} 💰`, 'Common');
                return false;
            }

            // Deduct cost & update stats
            state.coins -= cost;
            state.blocksOpened += 1;

            // Trigger animations & sounds
            sounds.playOpen();
            triggerBlockAnimation();
            createParticleBurst();

            // Calculate drop
            let rarity = rollRarity(isPremium);
            if (window.modMenuState && window.modMenuState.forcedRarity && window.modMenuState.forcedRarity !== 'OFF') {
                rarity = window.modMenuState.forcedRarity;
            }
            const itemBase = getRandomItemByRarity(rarity);

            if (['Legendary', 'Mythic', 'Omnisciente'].includes(rarity)) {
                state.stats.legendariesObtained = (state.stats.legendariesObtained || 0) + 1;
            }

            // Calculate sell price with Trader Upgrade multiplier + VIP role bonus
            const multiplier = 1 + (state.traderLevel * 0.10);
            const vipBonus = (state.role === 'VIP' || state.role === 'OWNER') ? 1.20 : 1.0;
            const sellValue = Math.floor(itemBase.baseValue * multiplier * vipBonus);

            const droppedItem = {
                ...itemBase,
                sellValue: sellValue,
                obtainedAt: new Date().getTime()
            };

            // Add to inventory (stack if existing)
            addToInventory(droppedItem);

            // Add XP
            const xpGained = isPremium ? 25 : 10;
            addXp(xpGained);

            // Handle Last Revealed
            lastRevealedItem = droppedItem;
            renderRevealedItem(droppedItem);

            // Handle Omnisciente Special Overlay
            if (rarity === 'Omnisciente') {
                state.stats.omniscienteCount += 1;
                sounds.playOmni();
                triggerOmniOverlay(droppedItem);
            } else if (['Legendary', 'Mythic'].includes(rarity)) {
                showToast(`🎉 ¡${rarity.toUpperCase()}!`, `Has obtenido ${droppedItem.name}`, rarity);
            }

            // Global WebSocket drop announcement for Mythic & Omnisciente items
            if (typeof announceGlobalDrop === 'function') {
                announceGlobalDrop(droppedItem);
            }

            // Advance Mission Progress
            if (typeof advanceMissionProgress === 'function') {
                if (isPremium) {
                    advanceMissionProgress('open_premium', 1);
                    advanceMissionProgress('spend_coins', 500);
                } else {
                    advanceMissionProgress('open_basic', 1);
                    advanceMissionProgress('spend_coins', 50);
                }
                advanceMissionProgress('open_any', 1);

                if (['Rare', 'Epic', 'Legendary', 'Mythic', 'Omnisciente'].includes(rarity)) {
                    advanceMissionProgress('get_rare', 1);
                }
                if (['Epic', 'Legendary', 'Mythic', 'Omnisciente'].includes(rarity)) {
                    advanceMissionProgress('get_epic_plus', 1);
                }
            }

            saveState();
            renderAll();
            return true;
        }

        function addToInventory(item) {
            const existing = state.inventory.find(i => i.id === item.id);
            if (existing) {
                existing.count = (existing.count || 1) + 1;
            } else {
                state.inventory.push({ ...item, count: 1 });
            }

            // Update highest value item stat
            if (!state.stats.highestValueItem || item.sellValue > state.stats.highestValueItem.sellValue) {
                state.stats.highestValueItem = item;
            }
        }

        function sellItem(itemId, countToSell = 1) {
            const index = state.inventory.findIndex(i => i.id === itemId);
            if (index === -1) return;

            const item = state.inventory[index];
            const actualSellCount = Math.min(countToSell, item.count);
            const totalEarned = item.sellValue * actualSellCount;

            state.coins += totalEarned;
            state.totalCoinsEarned += totalEarned;

            item.count -= actualSellCount;
            if (item.count <= 0) {
                state.inventory.splice(index, 1);
            }

            // Clear reveal quick sell if same item
            if (lastRevealedItem && lastRevealedItem.id === itemId && item.count <= 0) {
                lastRevealedItem = null;
                renderRevealedItem(null);
            }

            sounds.playClick();
            showToast('💰 Venta Completada', `+${totalEarned} 💰 por ${actualSellCount}x ${item.name}`, 'Common');

            if (typeof advanceMissionProgress === 'function') {
                advanceMissionProgress('sell_items', actualSellCount);
                advanceMissionProgress('earn_coins', totalEarned);
            }

            saveState();
            renderAll();
        }

        function sellFilteredItems(rarityFilter) {
            let totalEarned = 0;
            let countSold = 0;

            for (let i = state.inventory.length - 1; i >= 0; i--) {
                const item = state.inventory[i];
                if (!rarityFilter || item.rarity === rarityFilter) {
                    const earned = item.sellValue * item.count;
                    totalEarned += earned;
                    countSold += item.count;
                    state.inventory.splice(i, 1);
                }
            }

            if (countSold > 0) {
                state.coins += totalEarned;
                state.totalCoinsEarned += totalEarned;
                showToast('💰 Venta Masiva', `Vendidos ${countSold} ítems por +${totalEarned} 💰`, 'Legendary');
                saveState();
                renderAll();
            } else {
                showToast('ℹ️ Sin ítems', 'No hay ítems para vender', 'Common');
            }
        }

        /* ==========================================================================
           XP & LEVEL SYSTEM
           ========================================================================== */
        function getRequiredXp(level) {
            return Math.floor(100 * Math.pow(level, 1.4));
        }

        function addXp(amount) {
            // ADMIN & OWNER Role Bonus: 2x XP Multiplier!
            if (state.role === 'ADMIN' || state.role === 'OWNER') {
                amount = amount * 2;
            }

            state.xp += amount;
            let req = getRequiredXp(state.level);

            while (state.xp >= req) {
                state.xp -= req;
                state.level += 1;
                req = getRequiredXp(state.level);
                showToast('⚡ ¡NIVEL ALCANZADO!', `¡Ahora eres Nivel ${state.level}!`, 'Omnisciente');
            }
        }

        /* ==========================================================================
           UPGRADES PURCHASING
           ========================================================================== */
        function getLuckUpgradeCost() {
            return Math.floor(500 * Math.pow(2, state.luckLevel));
        }

        function getTraderUpgradeCost() {
            return Math.floor(300 * Math.pow(2, state.traderLevel));
        }

        function getAutoclickerCost() {
            return Math.floor(1000 * Math.pow(3, state.autoClickerLevel));
        }

        function buyLuckUpgrade() {
            if (state.luckLevel >= 10) return;
            const cost = getLuckUpgradeCost();
            if (state.coins >= cost) {
                state.coins -= cost;
                state.luckLevel += 1;
                sounds.playClick();
                showToast('🍀 Suerte Mejorada', `Nivel actual: ${state.luckLevel}`, 'Rare');
                saveState();
                renderAll();
            }
        }

        function buyTraderUpgrade() {
            if (state.traderLevel >= 10) return;
            const cost = getTraderUpgradeCost();
            if (state.coins >= cost) {
                state.coins -= cost;
                state.traderLevel += 1;
                sounds.playClick();
                showToast('💼 Negociante Mejorado', `+${state.traderLevel * 10}% precio de venta`, 'Rare');
                saveState();
                renderAll();
            }
        }

        function buyAutoclickerUpgrade() {
            if (state.autoClickerLevel >= 5) return;
            const cost = getAutoclickerCost();
            if (state.coins >= cost) {
                state.coins -= cost;
                state.autoClickerLevel += 1;
                state.autoClickerEnabled = true;
                sounds.playClick();
                showToast('🤖 Auto-Clicker Mejorado', `Velocidad nivel ${state.autoClickerLevel}`, 'Epic');
                restartAutoClicker();
                saveState();
                renderAll();
            }
        }

        function restartAutoClicker() {
            if (autoClickerIntervalId) clearInterval(autoClickerIntervalId);
            if (state.autoClickerLevel > 0 && state.autoClickerEnabled) {
                const intervals = [0, 10000, 8000, 6000, 4000, 2000];
                const ms = intervals[state.autoClickerLevel];
                autoClickerIntervalId = setInterval(() => {
                    if (state.coins >= 50) {
                        openLuckyBlock(false);
                    }
                }, ms);
            }
        }

        /* ==========================================================================
           SKINS & THEMES SELECTION
           ========================================================================== */
        function selectSkin(skinId) {
            const skin = SKINS_DATA.find(s => s.id === skinId);
            if (!skin) return;

            if (!state.unlockedSkins.includes(skinId)) {
                if (state.level < skin.reqLevel) {
                    showToast('🔒 Bloqueado', `Requiere Nivel ${skin.reqLevel}`, 'Common');
                    return;
                }
                if (state.coins < skin.cost) {
                    showToast('❌ Coins insuficientes', `Cuesta ${skin.cost} 💰`, 'Common');
                    return;
                }
                state.coins -= skin.cost;
                state.unlockedSkins.push(skinId);
            }

            state.selectedSkin = skinId;
            sounds.playClick();
            showToast('🎨 Skin Equipada', skin.name, 'Rare');
            saveState();
            renderAll();
        }

        function selectTheme(themeId) {
            const theme = THEMES_DATA.find(t => t.id === themeId);
            if (!theme) return;

            if (!state.unlockedThemes.includes(themeId)) {
                if (state.level < theme.reqLevel) {
                    showToast('🔒 Bloqueado', `Requiere Nivel ${theme.reqLevel}`, 'Common');
                    return;
                }
                if (state.coins < theme.cost) {
                    showToast('❌ Coins insuficientes', `Cuesta ${theme.cost} 💰`, 'Common');
                    return;
                }
                state.coins -= theme.cost;
                state.unlockedThemes.push(themeId);
            }

            state.selectedTheme = themeId;
            sounds.playClick();
            showToast('🌌 Tema Equipado', theme.name, 'Rare');
            saveState();
            renderAll();
        }

        window.sellItem = sellItem;
        window.selectSkin = selectSkin;
        window.selectTheme = selectTheme;
        window.openLuckyBlock = openLuckyBlock;

        function updateRoleMissions() {
            // VIP Progress
            const vipBlocks = Math.min(50, state.blocksOpened);
            const vipCoins = Math.min(5000, state.totalCoinsEarned);
            const vipLevel = Math.min(5, state.level);

            const vipPctBlocks = (vipBlocks / 50) * 100;
            const vipPctCoins = (vipCoins / 5000) * 100;
            const vipPctLevel = (vipLevel / 5) * 100;

            if (document.getElementById('vipProgBlocksText')) {
                document.getElementById('vipProgBlocksText').textContent = `${vipBlocks}/50`;
                document.getElementById('vipProgBlocksFill').style.width = `${vipPctBlocks}%`;
                document.getElementById('vipProgCoinsText').textContent = `${vipCoins.toLocaleString()}/5,000`;
                document.getElementById('vipProgCoinsFill').style.width = `${vipPctCoins}%`;
                document.getElementById('vipProgLevelText').textContent = `Niv ${vipLevel}/5`;
                document.getElementById('vipProgLevelFill').style.width = `${vipPctLevel}%`;

                const btnVip = document.getElementById('btnClaimVipRole');
                const vipUnlocked = (state.unlockedRoles || []).includes('VIP');
                if (vipUnlocked) {
                    btnVip.textContent = 'RANGO DESBLOQUEADO';
                    btnVip.disabled = true;
                    document.getElementById('cardMissionVip').classList.add('unlocked');
                } else if (vipBlocks >= 50 && vipCoins >= 5000 && vipLevel >= 5) {
                    btnVip.textContent = '¡RECLAMAR RANGO VIP!';
                    btnVip.disabled = false;
                } else {
                    btnVip.textContent = 'RECLAMAR RANGO VIP';
                    btnVip.disabled = true;
                }
            }

            // ADMIN Progress
            const adminBlocks = Math.min(250, state.blocksOpened);
            const adminLegs = Math.min(1, state.stats.legendariesObtained || 0);
            const adminLevel = Math.min(15, state.level);

            const adminPctBlocks = (adminBlocks / 250) * 100;
            const adminPctLegs = (adminLegs / 1) * 100;
            const adminPctLevel = (adminLevel / 15) * 100;

            if (document.getElementById('adminProgBlocksText')) {
                document.getElementById('adminProgBlocksText').textContent = `${adminBlocks}/250`;
                document.getElementById('adminProgBlocksFill').style.width = `${adminPctBlocks}%`;
                document.getElementById('adminProgLegText').textContent = `${adminLegs}/1`;
                document.getElementById('adminProgLegFill').style.width = `${adminPctLegs}%`;
                document.getElementById('adminProgLevelText').textContent = `Niv ${adminLevel}/15`;
                document.getElementById('adminProgLevelFill').style.width = `${adminPctLevel}%`;

                const btnAdmin = document.getElementById('btnClaimAdminRole');
                const adminUnlocked = (state.unlockedRoles || []).includes('ADMIN');
                if (adminUnlocked) {
                    btnAdmin.textContent = 'RANGO DESBLOQUEADO';
                    btnAdmin.disabled = true;
                    document.getElementById('cardMissionAdmin').classList.add('unlocked');
                } else if (adminBlocks >= 250 && adminLegs >= 1 && adminLevel >= 15) {
                    btnAdmin.textContent = '¡RECLAMAR RANGO ADMIN!';
                    btnAdmin.disabled = false;
                } else {
                    btnAdmin.textContent = 'RECLAMAR RANGO ADMIN';
                    btnAdmin.disabled = true;
                }
            }
        }

        /* ==========================================================================
           CENTRO DE MISIONES (DIARIAS, SEMANALES, ESPECIALES DE ROL)
           ========================================================================== */
        const DAILY_MISSION_TEMPLATES = [
            { id: 'd_open_basic', icon: '📦', title: 'Abridor Novato', desc: 'Abre 10 Cajas Básicas', target: 10, rewardCoins: 250, rewardXp: 40, type: 'open_basic' },
            { id: 'd_spend_coins', icon: '💰', title: 'Inversión Cyber', desc: 'Gasta 800 Monedas', target: 800, rewardCoins: 400, rewardXp: 50, type: 'spend_coins' },
            { id: 'd_get_rare', icon: '💎', title: 'Buscador de Rarezas', desc: 'Consigue 1 ítem Rare o superior', target: 1, rewardCoins: 350, rewardXp: 45, type: 'get_rare' },
            { id: 'd_sell_items', icon: '🏷️', title: 'Vendedor Hábil', desc: 'Vende 5 ítems de tu inventario', target: 5, rewardCoins: 300, rewardXp: 35, type: 'sell_items' },
            { id: 'd_open_premium', icon: '✨', title: 'Caja Premium', desc: 'Abre 2 Cajas Premium', target: 2, rewardCoins: 600, rewardXp: 75, type: 'open_premium' },
            { id: 'd_autoclick', icon: '🤖', title: 'Automatización', desc: 'Abre 5 bloques con Auto-Clicker', target: 5, rewardCoins: 300, rewardXp: 40, type: 'autoclick' }
        ];

        const WEEKLY_MISSION_TEMPLATES = [
            { id: 'w_open_many', icon: '📦', title: 'Fiebre de Bloques', desc: 'Abre 80 Lucky Blocks en total', target: 80, rewardCoins: 3000, rewardXp: 350, type: 'open_any' },
            { id: 'w_get_epic', icon: '🟣', title: 'Coleccionista Épico', desc: 'Consigue 3 ítems Epic o superior', target: 3, rewardCoins: 4500, rewardXp: 450, type: 'get_epic_plus' },
            { id: 'w_earn_coins', icon: '🪙', title: 'Magnate Cyberpunk', desc: 'Acumula 10,000 monedas ganadas', target: 10000, rewardCoins: 5000, rewardXp: 500, type: 'earn_coins' },
            { id: 'w_complete_trade', icon: '🤝', title: 'Comerciante Astuto', desc: 'Completa 1 intercambio con otro jugador', target: 1, rewardCoins: 3500, rewardXp: 400, type: 'complete_trade' }
        ];

        function ensureMissionsInitialized() {
            if (!state.missions) {
                state.missions = {
                    lastDailyDate: '',
                    daily: [],
                    lastWeeklyDate: '',
                    weekly: [],
                    activeCategory: 'daily',
                    isCollapsed: false
                };
            }

            const todayStr = new Date().toDateString();
            if (state.missions.lastDailyDate !== todayStr || !state.missions.daily || state.missions.daily.length === 0) {
                state.missions.lastDailyDate = todayStr;
                const shuffled = [...DAILY_MISSION_TEMPLATES].sort(() => 0.5 - Math.random());
                state.missions.daily = shuffled.slice(0, 3).map(m => ({
                    ...m,
                    current: 0,
                    claimed: false
                }));
            }

            const now = new Date();
            const startOfYear = new Date(now.getFullYear(), 0, 1);
            const weekNum = Math.ceil((((now - startOfYear) / 86400000) + startOfYear.getDay() + 1) / 7);
            const weekKey = `${now.getFullYear()}-W${weekNum}`;

            if (state.missions.lastWeeklyDate !== weekKey || !state.missions.weekly || state.missions.weekly.length === 0) {
                state.missions.lastWeeklyDate = weekKey;
                const shuffledW = [...WEEKLY_MISSION_TEMPLATES].sort(() => 0.5 - Math.random());
                state.missions.weekly = shuffledW.slice(0, 3).map(m => ({
                    ...m,
                    current: 0,
                    claimed: false
                }));
            }
        }

        function advanceMissionProgress(type, amount = 1) {
            if (!state.missions) return;
            ensureMissionsInitialized();

            const checkList = (list) => {
                (list || []).forEach(m => {
                    if (m.type === type && !m.claimed && m.current < m.target) {
                        const prev = m.current;
                        m.current = Math.min(m.target, m.current + amount);
                        if (m.current >= m.target && prev < m.target) {
                            showToast('🎯 ¡Misión Cumplida!', `Completaste "${m.title}". ¡Reclama tu recompensa!`, 'Omnisciente');
                            sounds.playOpen();
                        }
                    }
                });
            };

            checkList(state.missions.daily);
            checkList(state.missions.weekly);

            saveState();
            renderMissions();
        }

        function renderMissions() {
            ensureMissionsInitialized();
            const container = document.getElementById('missionsListContainer');
            if (!container) return;

            const category = state.missions.activeCategory || 'daily';
            const categorySelect = document.getElementById('selectMissionCategory');
            if (categorySelect && categorySelect.value !== category) {
                categorySelect.value = category;
            }

            // Count claimable missions for badge
            let pendingCount = 0;
            (state.missions.daily || []).forEach(m => { if (m.current >= m.target && !m.claimed) pendingCount++; });
            (state.missions.weekly || []).forEach(m => { if (m.current >= m.target && !m.claimed) pendingCount++; });

            const badge = document.getElementById('missionsPendingCount');
            if (badge) {
                if (pendingCount > 0) {
                    badge.textContent = `¡${pendingCount} LISTAS!`;
                    badge.style.color = '#2ecc71';
                    badge.style.borderColor = '#2ecc71';
                    badge.style.background = 'rgba(46, 204, 113, 0.2)';
                } else {
                    badge.textContent = `3 ACTIVAS`;
                    badge.style.color = 'var(--primary)';
                    badge.style.borderColor = 'var(--primary)';
                    badge.style.background = 'rgba(0, 240, 255, 0.15)';
                }
            }

            if (category === 'special') {
                const vipUnlocked = (state.unlockedRoles || []).includes('VIP');
                const adminUnlocked = (state.unlockedRoles || []).includes('ADMIN');

                const vipBlocks = Math.min(50, state.blocksOpened);
                const vipCoins = Math.min(5000, state.totalCoinsEarned);
                const vipLevel = Math.min(5, state.level);
                const canClaimVip = !vipUnlocked && vipBlocks >= 50 && vipCoins >= 5000 && vipLevel >= 5;

                const adminBlocks = Math.min(250, state.blocksOpened);
                const adminLegs = Math.min(1, state.stats.legendariesObtained || 0);
                const adminLevel = Math.min(15, state.level);
                const canClaimAdmin = !adminUnlocked && adminBlocks >= 250 && adminLegs >= 1 && adminLevel >= 15;

                container.innerHTML = `
                    <!-- Rango VIP -->
                    <div class="mission-item-card ${canClaimVip ? 'is-completed' : ''} ${vipUnlocked ? 'is-claimed' : ''}">
                        <div class="mission-top-row">
                            <div>
                                <div class="mission-info-title">💎 Rango VIP Permanente</div>
                                <div class="mission-info-desc">+20% precio de venta en inventario</div>
                            </div>
                            <span class="mission-rewards-pill" style="color: #2ecc71; border-color: #2ecc71;">Rango VIP</span>
                        </div>
                        <div style="font-size: 0.72rem; color: var(--text-muted); display: flex; flex-direction: column; gap: 0.2rem; margin-top: 0.3rem;">
                            <div>• Abrir 50 Lucky Blocks: <strong>${vipBlocks}/50</strong></div>
                            <div>• Acumular 5,000 Coins ganadas: <strong>${vipCoins.toLocaleString()}/5,000</strong></div>
                            <div>• Nivel 5 de Jugador: <strong>Niv ${vipLevel}/5</strong></div>
                        </div>
                        <div class="mission-progress-bar-bg" style="margin-top: 0.4rem;">
                            <div class="mission-progress-bar-fill" style="width: ${((vipBlocks/50 + vipCoins/5000 + vipLevel/5) / 3) * 100}%;"></div>
                        </div>
                        <div class="mission-bottom-row" style="margin-top: 0.5rem;">
                            <span class="mission-progress-text">${vipUnlocked ? 'DESBLOQUEADO ✓' : (canClaimVip ? '¡COMPLETO!' : 'En progreso')}</span>
                            <button class="btn-claim-mission ${canClaimVip ? 'can-claim' : ''} ${vipUnlocked ? 'claimed' : ''}" 
                                onclick="${canClaimVip ? `claimRoleFromMission('VIP')` : ''}" ${canClaimVip ? '' : 'disabled'}>
                                ${vipUnlocked ? 'DESBLOQUEADO' : (canClaimVip ? '¡RECLAMAR VIP!' : 'BLOQUEADO')}
                            </button>
                        </div>
                    </div>

                    <!-- Rango ADMIN -->
                    <div class="mission-item-card ${canClaimAdmin ? 'is-completed' : ''} ${adminUnlocked ? 'is-claimed' : ''}">
                        <div class="mission-top-row">
                            <div>
                                <div class="mission-info-title">⚡ Rango ADMIN Permanente</div>
                                <div class="mission-info-desc">Multiplicador de XP x2 y aura carmesí</div>
                            </div>
                            <span class="mission-rewards-pill" style="color: #ff0055; border-color: #ff0055;">Rango ADMIN</span>
                        </div>
                        <div style="font-size: 0.72rem; color: var(--text-muted); display: flex; flex-direction: column; gap: 0.2rem; margin-top: 0.3rem;">
                            <div>• Abrir 250 Lucky Blocks: <strong>${adminBlocks}/250</strong></div>
                            <div>• 1 Ítem Legendario o superior: <strong>${adminLegs}/1</strong></div>
                            <div>• Nivel 15 de Jugador: <strong>Niv ${adminLevel}/15</strong></div>
                        </div>
                        <div class="mission-progress-bar-bg" style="margin-top: 0.4rem;">
                            <div class="mission-progress-bar-fill" style="width: ${((adminBlocks/250 + adminLegs/1 + adminLevel/15) / 3) * 100}%; background: linear-gradient(90deg, #ff0055, #f1c40f);"></div>
                        </div>
                        <div class="mission-bottom-row" style="margin-top: 0.5rem;">
                            <span class="mission-progress-text">${adminUnlocked ? 'DESBLOQUEADO ✓' : (canClaimAdmin ? '¡COMPLETO!' : 'En progreso')}</span>
                            <button class="btn-claim-mission ${canClaimAdmin ? 'can-claim' : ''} ${adminUnlocked ? 'claimed' : ''}" 
                                onclick="${canClaimAdmin ? `claimRoleFromMission('ADMIN')` : ''}" ${canClaimAdmin ? '' : 'disabled'}>
                                ${adminUnlocked ? 'DESBLOQUEADO' : (canClaimAdmin ? '¡RECLAMAR ADMIN!' : 'BLOQUEADO')}
                            </button>
                        </div>
                    </div>
                `;
                return;
            }

            const list = category === 'weekly' ? state.missions.weekly : state.missions.daily;
            const isWeekly = category === 'weekly';

            container.innerHTML = list.map((m) => {
                const pct = Math.min(100, Math.round((m.current / m.target) * 100));
                const canClaim = m.current >= m.target && !m.claimed;

                return `
                    <div class="mission-item-card ${canClaim ? 'is-completed' : ''} ${m.claimed ? 'is-claimed' : ''}">
                        <div class="mission-top-row">
                            <div>
                                <div class="mission-info-title">${m.icon} ${m.title}</div>
                                <div class="mission-info-desc">${m.desc}</div>
                            </div>
                            <span class="mission-rewards-pill">+${m.rewardCoins} 💰 +${m.rewardXp} XP</span>
                        </div>
                        <div class="mission-progress-bar-bg">
                            <div class="mission-progress-bar-fill" style="width: ${pct}%;"></div>
                        </div>
                        <div class="mission-bottom-row">
                            <span class="mission-progress-text">${m.current.toLocaleString()} / ${m.target.toLocaleString()} (${pct}%)</span>
                            <button class="btn-claim-mission ${canClaim ? 'can-claim' : ''} ${m.claimed ? 'claimed' : ''}" 
                                onclick="${canClaim ? `claimMissionReward('${m.id}', ${isWeekly})` : ''}" ${canClaim ? '' : 'disabled'}>
                                ${m.claimed ? 'RECLAMADO ✓' : (canClaim ? '¡RECLAMAR!' : 'EN PROGRESO')}
                            </button>
                        </div>
                    </div>
                `;
            }).join('');
        }

        window.claimMissionReward = function(missionId, isWeekly) {
            ensureMissionsInitialized();
            const list = isWeekly ? state.missions.weekly : state.missions.daily;
            const m = list.find(item => item.id === missionId);
            if (!m || m.claimed || m.current < m.target) return;

            m.claimed = true;
            state.coins += m.rewardCoins;
            state.totalCoinsEarned += m.rewardCoins;
            addXp(m.rewardXp);

            sounds.playOmni();
            showToast('🎉 ¡Recompensa Reclamada!', `+${m.rewardCoins} 💰 y +${m.rewardXp} XP recibidos.`, 'Omnisciente');

            saveState();
            renderAll();
        };

        window.claimRoleFromMission = function(role) {
            if (!state.unlockedRoles.includes(role)) {
                state.unlockedRoles.push(role);
                state.role = role;
                sounds.playOmni();
                showToast(`🎉 ¡RANGO ${role} DESBLOQUEADO!`, `Ahora posees el rango ${role} permanentemente.`, 'Omnisciente');
                saveState();
                renderAll();
            }
        };


        /* ==========================================================================
           UI RENDERING & DOM UPDATES
           ========================================================================== */
        function renderAll() {
            // Apply Theme to body
            document.body.setAttribute('data-theme', state.selectedTheme);

            // Header info & Avatar Glow
            const headerAv = document.getElementById('headerAvatar');
            if (headerAv) {
                headerAv.textContent = state.playerName.charAt(0).toUpperCase();
                if (state.role === 'OWNER') headerAv.classList.add('avatar-owner-glow');
                else headerAv.classList.remove('avatar-owner-glow');
            }

            document.getElementById('headerPlayerName').textContent = state.playerName;
            document.getElementById('headerLevelBadge').textContent = `NIVEL ${state.level}`;
            document.getElementById('headerCoins').textContent = state.coins.toLocaleString();

            // Role Badge
            const roleBadge = document.getElementById('headerRoleBadge');
            if (roleBadge) {
                const currentRole = state.role || 'OWNER';
                roleBadge.className = `role-badge role-${currentRole.toLowerCase()}`;
                const roleLabels = {
                    OWNER: '👑 OWNER',
                    ADMIN: '⚡ ADMIN',
                    VIP: '💎 VIP',
                    JUGADOR: '🎮 JUGADOR'
                };
                roleBadge.textContent = roleLabels[currentRole] || '👑 OWNER';
            }

            const reqXp = getRequiredXp(state.level);
            const xpPercent = Math.min(100, Math.floor((state.xp / reqXp) * 100));
            document.getElementById('headerXpFill').style.width = `${xpPercent}%`;

            // Pity Bar
            document.getElementById('pityText').textContent = `${state.pityCounter} / 100`;
            document.getElementById('pityBarFill').style.width = `${Math.min(100, state.pityCounter)}%`;

            // Lucky Cube Skin
            const cube = document.getElementById('luckyCube');
            cube.setAttribute('data-skin', state.selectedSkin);

            // Auto-clicker banner & toggle
            const banner = document.getElementById('autoclickerBanner');
            const toggle = document.getElementById('toggleAutoClicker');
            if (state.autoClickerLevel > 0) {
                banner.style.display = 'flex';
                toggle.checked = state.autoClickerEnabled;
            } else {
                banner.style.display = 'none';
            }

            // Buttons state
            document.getElementById('btnOpenBasic').disabled = state.coins < 50;
            document.getElementById('btnOpenPremium').disabled = state.coins < 500;

            renderDroprates();
            renderInventory();
            renderUpgrades();
            renderSkinsAndThemes();
            renderProfile();
            renderMissions();
        }

        function renderRevealedItem(item) {
            const empty = document.getElementById('revealEmpty');
            const content = document.getElementById('revealContent');
            const box = document.getElementById('revealBox');

            if (!item) {
                empty.style.display = 'block';
                content.style.display = 'none';
                box.className = 'reveal-box';
                return;
            }

            empty.style.display = 'none';
            content.style.display = 'block';

            document.getElementById('revealEmoji').textContent = item.emoji;
            document.getElementById('revealName').textContent = item.name;
            document.getElementById('revealRarity').textContent = item.rarity;
            document.getElementById('revealValue').textContent = `+${item.sellValue} 💰`;

            box.className = `reveal-box has-item rarity-${item.rarity}`;
        }

        function renderDroprates() {
            const container = document.getElementById('droprateContainer');
            const weights = getBaseWeights(false);
            let total = 0;
            for (let k in weights) total += weights[k];

            container.innerHTML = Object.keys(weights).map(rarity => {
                const pct = ((weights[rarity] / total) * 100).toFixed(2);
                return `
                    <div class="droprate-row">
                        <span><span class="rarity-dot" style="background: var(--rarity-${rarity.toLowerCase()})"></span> ${rarity}</span>
                        <span style="font-family: var(--font-heading); font-weight: 700;">${pct}%</span>
                    </div>
                `;
            }).join('');
        }

        function renderInventory() {
            const grid = document.getElementById('inventoryGrid');
            const activeFilter = document.querySelector('.filter-chip.active')?.dataset.filter || 'all';

            const filtered = state.inventory.filter(item => activeFilter === 'all' || item.rarity === activeFilter);

            // Summary stats
            const totalCount = state.inventory.reduce((sum, i) => sum + i.count, 0);
            const totalValue = state.inventory.reduce((sum, i) => sum + (i.sellValue * i.count), 0);
            document.getElementById('invTotalCount').textContent = totalCount;
            document.getElementById('invTotalValue').textContent = `${totalValue.toLocaleString()} 💰`;

            if (filtered.length === 0) {
                grid.innerHTML = `<div class="empty-inv-msg">🎒 Inventario Vacío</div>`;
                return;
            }

            grid.innerHTML = filtered.map(item => `
                <div class="item-card rarity-${item.rarity}">
                    <span class="item-stack-badge">x${item.count}</span>
                    <div class="item-card-emoji">${item.emoji}</div>
                    <div class="item-card-name">${item.name}</div>
                    <div class="item-card-rarity">${item.rarity}</div>
                    <div class="item-card-value">${item.sellValue} 💰</div>
                    <div class="item-card-actions">
                        <button class="btn-card-sell" onclick="sellItem('${item.id}', 1)">Vender x1</button>
                        <button class="btn-card-sell" onclick="sellItem('${item.id}', ${item.count})">Vender Todo</button>
                    </div>
                </div>
            `).join('');
        }

        function renderUpgrades() {
            // Luck
            document.getElementById('luckLvlTag').textContent = `Nivel ${state.luckLevel} / 10`;
            const luckCost = getLuckUpgradeCost();
            const btnLuck = document.getElementById('btnBuyLuck');
            if (state.luckLevel >= 10) {
                document.getElementById('luckCostText').textContent = 'MAX';
                btnLuck.disabled = true;
            } else {
                document.getElementById('luckCostText').textContent = `${luckCost.toLocaleString()} 💰`;
                btnLuck.disabled = state.coins < luckCost;
            }

            // Trader
            document.getElementById('traderLvlTag').textContent = `Nivel ${state.traderLevel} / 10`;
            const traderCost = getTraderUpgradeCost();
            const btnTrader = document.getElementById('btnBuyTrader');
            if (state.traderLevel >= 10) {
                document.getElementById('traderCostText').textContent = 'MAX';
                btnTrader.disabled = true;
            } else {
                document.getElementById('traderCostText').textContent = `${traderCost.toLocaleString()} 💰`;
                btnTrader.disabled = state.coins < traderCost;
            }

            // Auto-clicker
            document.getElementById('autoclickerLvlTag').textContent = `Nivel ${state.autoClickerLevel} / 5`;
            const autoCost = getAutoclickerCost();
            const btnAuto = document.getElementById('btnBuyAutoclicker');
            if (state.autoClickerLevel >= 5) {
                document.getElementById('autoclickerCostText').textContent = 'MAX';
                btnAuto.disabled = true;
            } else {
                document.getElementById('autoclickerCostText').textContent = `${autoCost.toLocaleString()} 💰`;
                btnAuto.disabled = state.coins < autoCost;
            }
        }

        function renderSkinsAndThemes() {
            // Skins
            const skinsGrid = document.getElementById('skinsContainer');
            skinsGrid.innerHTML = SKINS_DATA.map(skin => {
                const unlocked = state.unlockedSkins.includes(skin.id);
                const equipped = state.selectedSkin === skin.id;

                let btnText = equipped ? 'EQUIPADO' : (unlocked ? 'EQUIPAR' : `${skin.cost} 💰`);
                if (!unlocked && skin.reqLevel > 1) btnText = `Niv ${skin.reqLevel}`;

                return `
                    <div class="custom-card ${equipped ? 'selected' : ''}">
                        <div class="custom-preview-box">${skin.icon}</div>
                        <div class="custom-card-title">${skin.name}</div>
                        <div class="custom-card-desc">${unlocked ? 'Desbloqueado' : `Req. Niv ${skin.reqLevel}`}</div>
                        <button class="btn-custom-action ${equipped ? 'equipped' : ''}" onclick="selectSkin('${skin.id}')">
                            ${btnText}
                        </button>
                    </div>
                `;
            }).join('');

            // Themes
            const themesGrid = document.getElementById('themesContainer');
            themesGrid.innerHTML = THEMES_DATA.map(theme => {
                const unlocked = state.unlockedThemes.includes(theme.id);
                const equipped = state.selectedTheme === theme.id;

                let btnText = equipped ? 'EQUIPADO' : (unlocked ? 'EQUIPAR' : `${theme.cost} 💰`);
                if (!unlocked && theme.reqLevel > 1) btnText = `Niv ${theme.reqLevel}`;

                return `
                    <div class="custom-card ${equipped ? 'selected' : ''}">
                        <div class="custom-preview-box" style="background: ${theme.previewBg}">🎨</div>
                        <div class="custom-card-title">${theme.name}</div>
                        <div class="custom-card-desc">${unlocked ? 'Desbloqueado' : `Req. Niv ${theme.reqLevel}`}</div>
                        <button class="btn-custom-action ${equipped ? 'equipped' : ''}" onclick="selectTheme('${theme.id}')">
                            ${btnText}
                        </button>
                    </div>
                `;
            }).join('');
        }

        function renderProfile() {
            const profileAv = document.getElementById('profileAvatar');
            if (profileAv) {
                profileAv.textContent = state.playerName.charAt(0).toUpperCase();
                if (state.role === 'OWNER') profileAv.classList.add('avatar-owner-glow');
                else profileAv.classList.remove('avatar-owner-glow');
            }

            document.getElementById('inputPlayerName').value = state.playerName;

            // Populate select with all roles, showing lock icon for locked roles
            const selectRole = document.getElementById('selectRole');
            if (selectRole) {
                const unlocked = state.unlockedRoles || ['JUGADOR'];
                const allRoles = [
                    { value: 'JUGADOR', label: '🎮 JUGADOR' },
                    { value: 'VIP', label: '💎 VIP' },
                    { value: 'ADMIN', label: '⚡ ADMIN' },
                    { value: 'OWNER', label: '👑 OWNER (Creador)' }
                ];
                selectRole.innerHTML = allRoles.map(r => {
                    const isUnlocked = unlocked.includes(r.value);
                    return `<option value="${r.value}">${r.label}${isUnlocked ? '' : ' 🔒'}</option>`;
                }).join('');
                selectRole.value = state.role || 'JUGADOR';
            }

            const ownerPanel = document.getElementById('ownerPanel');
            if (ownerPanel) {
                ownerPanel.style.display = (state.role === 'OWNER') ? 'flex' : 'none';
            }

            const floatModBtn = document.getElementById('floatingModMenuBtn');
            if (floatModBtn) {
                floatModBtn.style.display = (state.role === 'OWNER') ? 'inline-flex' : 'none';
            }

            const modLvlDisplay = document.getElementById('modMenuCurrentLevel');
            if (modLvlDisplay) {
                modLvlDisplay.textContent = state.level.toLocaleString();
            }
            const modCoinsDisplay = document.getElementById('modMenuCurrentCoins');
            if (modCoinsDisplay) {
                modCoinsDisplay.textContent = `${state.coins.toLocaleString()} 💰`;
            }

            document.getElementById('statTotalBlocks').textContent = state.blocksOpened.toLocaleString();
            document.getElementById('statTotalCoins').textContent = `${state.totalCoinsEarned.toLocaleString()} 💰`;
            document.getElementById('statOmniCount').textContent = state.stats.omniscienteCount;
            document.getElementById('statLevel').textContent = state.level;
            document.getElementById('statStartDate').textContent = state.startDate;

            const best = state.stats.highestValueItem;
            document.getElementById('statBestItem').textContent = best ? `${best.emoji} ${best.name} (${best.sellValue}💰)` : 'Ninguno';

            updateRoleMissions();
            if (typeof populateTradeOfferDropdown === 'function') {
                populateTradeOfferDropdown();
            }
        }

        /* ==========================================================================
           ANIMATIONS & OVERLAYS
           ========================================================================== */
        function triggerBlockAnimation() {
            const cube = document.getElementById('luckyCube');
            cube.classList.remove('shaking', 'opening');
            void cube.offsetWidth; // Trigger reflow
            cube.classList.add('shaking');

            setTimeout(() => {
                cube.classList.remove('shaking');
            }, 600);
        }

        function showToast(title, desc, rarity = 'Common') {
            const container = document.getElementById('toastContainer');
            const toast = document.createElement('div');
            toast.className = `toast rarity-${rarity}`;

            const emojiMap = {
                Common: '📦', Uncommon: '🟢', Rare: '🔵',
                Epic: '🟣', Legendary: '🟡', Mythic: '🔴', Omnisciente: '✨'
            };

            toast.innerHTML = `
                <div class="toast-icon">${emojiMap[rarity] || '📦'}</div>
                <div class="toast-content">
                    <div class="toast-title">${title}</div>
                    <div class="toast-desc">${desc}</div>
                </div>
            `;

            container.appendChild(toast);
            setTimeout(() => {
                if (toast.parentNode) toast.parentNode.removeChild(toast);
            }, 3500);
        }

        function triggerOmniOverlay(item) {
            const overlay = document.getElementById('omniOverlay');
            document.getElementById('omniOverlayEmoji').textContent = item.emoji;
            document.getElementById('omniOverlayName').textContent = item.name;
            overlay.classList.add('active');
        }

        /* Canvas Particle System */
        function createParticleBurst() {
            const canvas = document.getElementById('particleCanvas');
            const ctx = canvas.getContext('2d');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            const particles = [];
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2 - 50;

            for (let i = 0; i < 35; i++) {
                particles.push({
                    x: centerX,
                    y: centerY,
                    vx: (Math.random() - 0.5) * 12,
                    vy: (Math.random() - 0.5) * 12,
                    size: Math.random() * 6 + 3,
                    color: ['#00f0ff', '#ff0055', '#f1c40f', '#2ecc71', '#9b59b6'][Math.floor(Math.random() * 5)],
                    alpha: 1
                });
            }

            function animateParticles() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                let alive = false;

                particles.forEach(p => {
                    if (p.alpha > 0) {
                        alive = true;
                        p.x += p.vx;
                        p.y += p.vy;
                        p.alpha -= 0.02;

                        ctx.save();
                        ctx.globalAlpha = Math.max(0, p.alpha);
                        ctx.fillStyle = p.color;
                        ctx.beginPath();
                        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                        ctx.fill();
                        ctx.restore();
                    }
                });

                if (alive) requestAnimationFrame(animateParticles);
            }

            animateParticles();
        }

        /* ==========================================================================
           EVENT LISTENERS & INITIALIZATION
           ========================================================================== */
        document.addEventListener('DOMContentLoaded', () => {
            loadState();
            renderAll();
            restartAutoClicker();

            // Navigation Tabs
            document.querySelectorAll('.nav-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    sounds.playClick();
                    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
                    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));

                    btn.classList.add('active');
                    const tabId = btn.dataset.tab;
                    document.getElementById(`tab-${tabId}`).classList.add('active');
                });
            });

            // Open Buttons
            document.getElementById('btnOpenBasic').addEventListener('click', () => openLuckyBlock(false));
            document.getElementById('btnOpenPremium').addEventListener('click', () => openLuckyBlock(true));
            document.getElementById('blockClickArea').addEventListener('click', () => openLuckyBlock(false));

            // Quick Sell
            document.getElementById('btnQuickSell').addEventListener('click', () => {
                if (lastRevealedItem) {
                    sellItem(lastRevealedItem.id, 1);
                }
            });

            // Bulk Sell Buttons
            document.getElementById('btnSellCommons').addEventListener('click', () => sellFilteredItems('Common'));
            document.getElementById('btnSellUncommons').addEventListener('click', () => sellFilteredItems('Uncommon'));
            document.getElementById('btnSellAll').addEventListener('click', () => sellFilteredItems(null));

            // Inventory Filter Chips
            document.getElementById('inventoryFilters').addEventListener('click', (e) => {
                if (e.target.classList.contains('filter-chip')) {
                    document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
                    e.target.classList.add('active');
                    renderInventory();
                }
            });

            // Auto-clicker Toggle
            document.getElementById('toggleAutoClicker').addEventListener('change', (e) => {
                state.autoClickerEnabled = e.target.checked;
                restartAutoClicker();
                saveState();
            });

            // Upgrade Buttons
            document.getElementById('btnBuyLuck').addEventListener('click', buyLuckUpgrade);
            document.getElementById('btnBuyTrader').addEventListener('click', buyTraderUpgrade);
            document.getElementById('btnBuyAutoclicker').addEventListener('click', buyAutoclickerUpgrade);

            // Profile Player Name Edit
            document.getElementById('btnSaveName').addEventListener('click', () => {
                const newName = document.getElementById('inputPlayerName').value.trim();
                if (newName) {
                    state.playerName = newName;
                    saveState();
                    renderAll();
                    showToast('👤 Perfil Actualizado', `Nombre cambiado a ${newName}`, 'Rare');
                }
            });

            // Role Select Listener
            const selectRoleEl = document.getElementById('selectRole');
            if (selectRoleEl) {
                selectRoleEl.addEventListener('change', (e) => {
                    const chosenRole = e.target.value;
                    const unlocked = state.unlockedRoles || ['JUGADOR'];
                    
                    if (chosenRole === 'OWNER' && !unlocked.includes('OWNER')) {
                        // Revert dropdown selection to current state
                        selectRoleEl.value = state.role;
                        // Open the Secret PIN modal
                        document.getElementById('secretModal').classList.add('active');
                        showToast('🔑 Clave Requerida', 'Debes ingresar la Clave de Creador para equipar el rol de OWNER', 'Legendary');
                        return;
                    }

                    if ((chosenRole === 'VIP' || chosenRole === 'ADMIN') && !unlocked.includes(chosenRole)) {
                        selectRoleEl.value = state.role;
                        showToast('🔒 Rango Bloqueado', `Debes completar las misiones de ${chosenRole} para desbloquearlo`, 'Common');
                        return;
                    }

                    state.role = chosenRole;
                    saveState();
                    renderAll();
                    showToast('👑 Rol Equipado', `Ahora tu rol es ${state.role}`, 'Legendary');
                });
            }

            // ==========================================================================
            // ⚡ OWNER MOD MENU // HACK EXPLOIT SUITE CONTROLLER
            // ==========================================================================
            window.modMenuState = {
                forcedRarity: 'OFF'
            };

            // Populate Item Spawner Dropdown
            function populateModItemSpawner() {
                const select = document.getElementById('modItemSpawnerSelect');
                if (!select) return;
                select.innerHTML = LOOT_TABLE.map(item => {
                    return `<option value="${item.id}">[${item.rarity}] ${item.emoji} ${item.name} (${item.baseValue}💰)</option>`;
                }).join('');
            }
            populateModItemSpawner();

            // Mod Menu Sub-Tabs Switching
            document.querySelectorAll('.mod-tab-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const targetTab = e.currentTarget.dataset.modtab;
                    document.querySelectorAll('.mod-tab-btn').forEach(b => b.classList.remove('active'));
                    e.currentTarget.classList.add('active');

                    document.querySelectorAll('.mod-tab-content').forEach(content => {
                        content.classList.remove('active');
                    });

                    const activePanel = document.getElementById(`modTab${targetTab.charAt(0).toUpperCase() + targetTab.slice(1)}`);
                    if (activePanel) activePanel.classList.add('active');
                    sounds.playClick();
                });
            });

            // Helper to sync profile update over WebSocket
            function syncOwnerProfileWS() {
                if (socket && socket.connected) {
                    socket.emit('user:update_profile', {
                        username: state.playerName,
                        role: state.role,
                        level: state.level,
                        avatar: state.playerName.charAt(0).toUpperCase()
                    });
                }
            }

            // --- TAB 1: NIVELES & XP ---
            // Preset Level Chips
            document.querySelectorAll('.btn-mod-chip[data-add-level]').forEach(chip => {
                chip.addEventListener('click', (e) => {
                    const delta = parseInt(e.currentTarget.dataset.addLevel) || 1;
                    state.level = Math.max(1, state.level + delta);
                    state.xp = 0;
                    saveState();
                    renderAll();
                    syncOwnerProfileWS();
                    sounds.playOmni();
                    showToast('⚡ MOD MENU [NIVELES]', `+${delta.toLocaleString()} Niveles sumados. ¡Nuevo Nivel: ${state.level.toLocaleString()}!`, 'Omnisciente');
                });
            });

            // Custom Level: Add Levels
            document.getElementById('btnModAddCustomLevels')?.addEventListener('click', () => {
                const input = document.getElementById('modCustomLevelInput');
                const val = parseInt(input?.value) || 1;
                if (val <= 0) return;
                state.level = Math.max(1, state.level + val);
                state.xp = 0;
                saveState();
                renderAll();
                syncOwnerProfileWS();
                sounds.playOmni();
                showToast('⚡ MOD MENU [NIVELES]', `+${val.toLocaleString()} Niveles sumados con éxito. ¡Nivel actual: ${state.level.toLocaleString()}!`, 'Omnisciente');
            });

            // Custom Level: Set Exact Level
            document.getElementById('btnModSetExactLevel')?.addEventListener('click', () => {
                const input = document.getElementById('modCustomLevelInput');
                const val = parseInt(input?.value) || 1;
                if (val <= 0) return;
                state.level = val;
                state.xp = 0;
                saveState();
                renderAll();
                syncOwnerProfileWS();
                sounds.playOmni();
                showToast('🎯 MOD MENU [NIVEL FIJADO]', `Nivel establecido exactamente en: ${state.level.toLocaleString()}`, 'Omnisciente');
            });

            // Custom Level: Reset Level
            document.getElementById('btnModResetLevel')?.addEventListener('click', () => {
                state.level = 1;
                state.xp = 0;
                saveState();
                renderAll();
                syncOwnerProfileWS();
                sounds.playClick();
                showToast('🔄 MOD MENU [RESET]', 'Nivel reiniciado a 1.', 'Common');
            });

            // XP Boosts
            document.getElementById('btnModFillXp')?.addEventListener('click', () => {
                const req = getRequiredXp(state.level);
                state.xp = Math.floor(req * 0.99);
                saveState();
                renderAll();
                sounds.playClick();
                showToast('⚡ MOD MENU [XP]', 'Barra de XP cargada al 99%. ¡El próximo bloque te subirá de nivel!', 'Legendary');
            });

            document.getElementById('btnModAddXpMega')?.addEventListener('click', () => {
                addXp(1000000);
                saveState();
                renderAll();
                syncOwnerProfileWS();
                sounds.playOmni();
                showToast('✨ MOD MENU [XP]', '+1,000,000 XP inyectada al instante.', 'Omnisciente');
            });

            // --- TAB 2: COINS & DINERO ---
            // Preset Coins Chips
            document.querySelectorAll('.btn-mod-chip[data-add-coins]').forEach(chip => {
                chip.addEventListener('click', (e) => {
                    const delta = parseInt(e.currentTarget.dataset.addCoins) || 10000;
                    state.coins += delta;
                    state.totalCoinsEarned += delta;
                    saveState();
                    renderAll();
                    sounds.playOmni();
                    showToast('💰 MOD MENU [ECONOMÍA]', `+${delta.toLocaleString()} 💰 añadidas a tu saldo.`, 'Omnisciente');
                });
            });

            // Custom Coins: Inject
            document.getElementById('btnModInjectCoins')?.addEventListener('click', () => {
                const input = document.getElementById('modCustomCoinsInput');
                const val = parseInt(input?.value) || 1000000;
                if (val <= 0) return;
                state.coins += val;
                state.totalCoinsEarned += val;
                saveState();
                renderAll();
                sounds.playOmni();
                showToast('💸 MOD MENU [INYECCIÓN]', `+${val.toLocaleString()} 💰 transferidas a tu cuenta.`, 'Omnisciente');
            });

            // Custom Coins: Zero Out
            document.getElementById('btnModZeroCoins')?.addEventListener('click', () => {
                state.coins = 0;
                saveState();
                renderAll();
                sounds.playClick();
                showToast('🗑️ MOD MENU', 'Saldo de monedas vaciado a 0 💰.', 'Common');
            });

            // --- TAB 3: DROP SPOOFER & SPAWNER ---
            // Forced Rarity Spoofer
            const raritySelect = document.getElementById('modForcedRaritySelect');
            const spoofIndicator = document.getElementById('modSpoofIndicator');

            raritySelect?.addEventListener('change', (e) => {
                const selected = e.target.value;
                window.modMenuState.forcedRarity = selected;
                if (selected === 'OFF') {
                    if (spoofIndicator) {
                        spoofIndicator.textContent = 'ESTADO: DESACTIVADO';
                        spoofIndicator.classList.remove('active');
                    }
                    showToast('🎲 DROP SPOOFER', 'RNG Normal restaurado (probabilidades habituales).', 'Common');
                } else {
                    if (spoofIndicator) {
                        spoofIndicator.textContent = `FORZANDO: ${selected.toUpperCase()} (100%) 🔥`;
                        spoofIndicator.classList.add('active');
                    }
                    sounds.playOmni();
                    showToast('🎲 DROP SPOOFER ACTIVO', `¡Ahora TODOS los lucky blocks abrirán rareza ${selected.toUpperCase()} garantizada!`, 'Omnisciente');
                }
            });

            // Item Spawner
            document.getElementById('btnModSpawnItem')?.addEventListener('click', () => {
                const select = document.getElementById('modItemSpawnerSelect');
                const countInput = document.getElementById('modItemSpawnerCount');
                const itemId = select?.value;
                const count = Math.max(1, Math.min(100, parseInt(countInput?.value) || 1));

                const itemTemplate = LOOT_TABLE.find(i => i.id === itemId);
                if (!itemTemplate) return;

                const multiplier = 1 + (state.traderLevel * 0.10);
                const vipBonus = (state.role === 'VIP' || state.role === 'OWNER') ? 1.20 : 1.0;
                const sellValue = Math.floor(itemTemplate.baseValue * multiplier * vipBonus);

                for (let i = 0; i < count; i++) {
                    addToInventory({
                        ...itemTemplate,
                        sellValue: sellValue,
                        obtainedAt: Date.now()
                    });
                }

                if (itemTemplate.rarity === 'Omnisciente') {
                    state.stats.omniscienteCount += count;
                    sounds.playOmni();
                } else {
                    sounds.playClick();
                }

                saveState();
                renderAll();
                showToast('🚀 ITEM INJECTOR', `Inyectado con éxito: ${count}x ${itemTemplate.emoji} ${itemTemplate.name}`, itemTemplate.rarity);
            });

            // Pity Hacks
            document.getElementById('btnModFillPity')?.addEventListener('click', () => {
                state.pityCounter = 100;
                saveState();
                renderAll();
                sounds.playOmni();
                showToast('🛡️ PITY SPOOFER', 'Barra de Pity cargada al 100% (Próxima apertura Legendaria+ garantizada).', 'Legendary');
            });

            document.getElementById('btnModResetPity')?.addEventListener('click', () => {
                state.pityCounter = 0;
                saveState();
                renderAll();
                sounds.playClick();
                showToast('🔄 PITY SPOOFER', 'Contador de Pity restablecido a 0.', 'Common');
            });

            // Unlock 1x of Every Item
            document.getElementById('btnModUnlockAllItems')?.addEventListener('click', () => {
                const multiplier = 1 + (state.traderLevel * 0.10);
                const vipBonus = (state.role === 'VIP' || state.role === 'OWNER') ? 1.20 : 1.0;

                LOOT_TABLE.forEach(baseItem => {
                    const sellValue = Math.floor(baseItem.baseValue * multiplier * vipBonus);
                    addToInventory({
                        ...baseItem,
                        sellValue: sellValue,
                        obtainedAt: Date.now()
                    });
                });

                state.stats.omniscienteCount += 2;
                saveState();
                renderAll();
                sounds.playOmni();
                showToast('👑 CATÁLOGO TOTAL', '¡Añadido 1x de cada ítem del juego a tu inventario!', 'Omnisciente');
            });

            // Clear Inventory
            document.getElementById('btnModClearInv')?.addEventListener('click', () => {
                if (confirm('¿Seguro que deseas vaciar por completo todo tu inventario?')) {
                    state.inventory = [];
                    lastRevealedItem = null;
                    renderRevealedItem(null);
                    saveState();
                    renderAll();
                    sounds.playClick();
                    showToast('🧹 MOD MENU', 'Inventario vaciado por completo.', 'Common');
                }
            });

            // --- TAB 4: GOD MODE & VELOCIDAD ---
            function runMassOpen(count) {
                for (let i = 0; i < count; i++) {
                    let rarity = rollRarity(true);
                    if (window.modMenuState && window.modMenuState.forcedRarity && window.modMenuState.forcedRarity !== 'OFF') {
                        rarity = window.modMenuState.forcedRarity;
                    }
                    const itemBase = getRandomItemByRarity(rarity);
                    const multiplier = 1 + (state.traderLevel * 0.10);
                    const vipBonus = 1.20;
                    const sellVal = Math.floor(itemBase.baseValue * multiplier * vipBonus);

                    addToInventory({
                        ...itemBase,
                        sellValue: sellVal,
                        obtainedAt: Date.now()
                    });

                    state.blocksOpened += 1;
                    if (rarity === 'Omnisciente') state.stats.omniscienteCount += 1;
                }
                addXp(count * 25);
                saveState();
                renderAll();
                sounds.playOmni();
                showToast('🎁 APERTURA MASIVA', `¡${count} Cajas Premium abiertas en 0 milisegundos!`, 'Omnisciente');
            }

            document.getElementById('btnModOpen10x')?.addEventListener('click', () => runMassOpen(10));
            document.getElementById('btnModOpen50x')?.addEventListener('click', () => runMassOpen(50));
            document.getElementById('btnModOpen100x')?.addEventListener('click', () => runMassOpen(100));

            // God Mode Full
            document.getElementById('btnModGodMode')?.addEventListener('click', () => {
                state.coins += 10000000;
                state.luckLevel = 10;
                state.traderLevel = 10;
                state.autoClickerLevel = 5;
                state.autoClickerEnabled = true;
                state.unlockedSkins = SKINS_DATA.map(s => s.id);
                state.unlockedThemes = THEMES_DATA.map(t => t.id);

                if (autoClickerIntervalId) clearInterval(autoClickerIntervalId);
                autoClickerIntervalId = setInterval(() => {
                    openLuckyBlock(true);
                }, 150);

                saveState();
                renderAll();
                sounds.playOmni();
                showToast('🔥 MODO DIOS EXTREMO', 'Auto-Clicker Turbo (150ms) + 10M Coins + Mejoras Máximas activado.', 'Omnisciente');
            });

            // Max Upgrades
            document.getElementById('btnModMaxUpgrades')?.addEventListener('click', () => {
                state.luckLevel = 10;
                state.traderLevel = 10;
                state.autoClickerLevel = 5;
                state.autoClickerEnabled = true;
                restartAutoClicker();
                saveState();
                renderAll();
                sounds.playOmni();
                showToast('🚀 MOD MENU', 'Todas las mejoras al MÁXIMO (Nivel 10 / Nivel 5).', 'Omnisciente');
            });

            // Unlock Cosmetics
            document.getElementById('btnModUnlockCosmetics')?.addEventListener('click', () => {
                state.unlockedSkins = SKINS_DATA.map(s => s.id);
                state.unlockedThemes = THEMES_DATA.map(t => t.id);
                saveState();
                renderAll();
                sounds.playOmni();
                showToast('🎨 MOD MENU', '100% de Skins y Temas desbloqueados en la Tienda.', 'Omnisciente');
            });

            // --- TAB 5: SERVIDOR & CHAT ---
            document.getElementById('btnModBroadcastSystem')?.addEventListener('click', () => {
                const input = document.getElementById('modBroadcastInput');
                const text = input?.value.trim();
                if (!text) {
                    showToast('⚠️ Escribe un mensaje', 'El campo de transmisión está vacío.', 'Common');
                    return;
                }
                if (socket && socket.connected) {
                    socket.emit('owner:broadcast', { text: text, asSystem: true });
                    input.value = '';
                    showToast('📢 TRANSMISIÓN ENVIADA', 'Mensaje emitido como [SISTEMA] a todos los jugadores.', 'Legendary');
                } else {
                    showToast('❌ Sin conexión', 'El servidor WebSocket no está conectado.', 'Common');
                }
            });

            document.getElementById('btnModBroadcastOwner')?.addEventListener('click', () => {
                const input = document.getElementById('modBroadcastInput');
                const text = input?.value.trim();
                if (!text) {
                    showToast('⚠️ Escribe un mensaje', 'El campo de transmisión está vacío.', 'Common');
                    return;
                }
                if (socket && socket.connected) {
                    socket.emit('owner:broadcast', { text: text, asSystem: false });
                    input.value = '';
                    showToast('👑 COMUNICADO ENVIADO', 'Mensaje emitido como [CREADOR] a todos los jugadores.', 'Omnisciente');
                } else {
                    showToast('❌ Sin conexión', 'El servidor WebSocket no está conectado.', 'Common');
                }
            });

            document.getElementById('btnModFakeOmniDrop')?.addEventListener('click', () => {
                if (typeof announceGlobalDrop === 'function') {
                    announceGlobalDrop({
                        name: 'Artefacto Cósmico Supremo',
                        rarity: 'Omnisciente',
                        emoji: '✨'
                    });
                    sounds.playOmni();
                    showToast('🎆 EVENTO SIMULADO', 'Anuncio de drop Omnisciente enviado al chat global.', 'Omnisciente');
                }
            });

            // --- TAB 6: REGALOS A JUGADORES ---

            // Populate gift item select with full LOOT_TABLE
            function populateGiftItemSelect() {
                const sel = document.getElementById('modGiftItemSelect');
                if (!sel) return;
                sel.innerHTML = LOOT_TABLE.map(item =>
                    `<option value="${item.id}">[${item.rarity}] ${item.emoji} ${item.name}</option>`
                ).join('');
            }
            populateGiftItemSelect();

            // Update gift target player dropdown whenever online list changes
            function updateGiftTargetDropdown(players) {
                const sel = document.getElementById('modGiftTargetPlayer');
                const badge = document.getElementById('modGiftTargetStatus');
                if (!sel) return;
                const myId = socket ? socket.id : null;
                const others = players.filter(p => p.socketId !== myId);
                sel.innerHTML = '<option value="">-- Selecciona un Jugador En Línea --</option>' +
                    others.map(p => `<option value="${p.socketId}">${p.username} [${p.role}] (Niv ${p.level})</option>`).join('');
                if (badge) badge.textContent = others.length > 0 ? `${others.length} JUGADORES EN LÍNEA` : 'SIN JUGADORES';
            }

            sel?.addEventListener('change', (e) => {
                const badge = document.getElementById('modGiftTargetStatus');
                if (badge) badge.textContent = e.target.value ? 'JUGADOR SELECCIONADO ✅' : 'SIN SELECCIÓN';
            });

            function getGiftTarget() {
                const sel = document.getElementById('modGiftTargetPlayer');
                const targetId = sel?.value;
                if (!targetId) {
                    showToast('⚠️ Selecciona un jugador', 'Debes elegir un destino de la lista de jugadores en línea.', 'Common');
                    return null;
                }
                if (!socket || !socket.connected) {
                    showToast('❌ Sin conexión', 'El servidor WebSocket no está conectado.', 'Common');
                    return null;
                }
                return targetId;
            }

            // Send Coins Gift
            document.getElementById('btnModGiftCoins')?.addEventListener('click', () => {
                const targetId = getGiftTarget();
                if (!targetId) return;
                const amount = Math.max(1, parseInt(document.getElementById('modGiftCoinsAmount')?.value) || 100000);
                socket.emit('owner:give_coins', { targetSocketId: targetId, amount });
                sounds.playOmni();
            });

            // Send Levels Gift
            document.getElementById('btnModGiftLevels')?.addEventListener('click', () => {
                const targetId = getGiftTarget();
                if (!targetId) return;
                const amount = Math.max(1, parseInt(document.getElementById('modGiftLevelsAmount')?.value) || 10);
                socket.emit('owner:give_levels', { targetSocketId: targetId, amount });
                sounds.playOmni();
            });

            // Send Item Gift
            document.getElementById('btnModGiftItem')?.addEventListener('click', () => {
                const targetId = getGiftTarget();
                if (!targetId) return;
                const itemId = document.getElementById('modGiftItemSelect')?.value;
                const count = Math.max(1, Math.min(50, parseInt(document.getElementById('modGiftItemCount')?.value) || 1));
                if (!itemId) { showToast('⚠️ Selecciona un ítem', 'Elige un ítem del selector.', 'Common'); return; }
                socket.emit('owner:give_item', { targetSocketId: targetId, itemId, count });
                sounds.playOmni();
            });

            // Preset Pack: Starter
            document.getElementById('btnModGiftStarterPack')?.addEventListener('click', () => {
                const targetId = getGiftTarget();
                if (!targetId) return;
                socket.emit('owner:give_coins', { targetSocketId: targetId, amount: 50000 });
                socket.emit('owner:give_levels', { targetSocketId: targetId, amount: 5 });
                sounds.playOmni();
                showToast('🎒 PACK INICIAL ENVIADO', '50,000 💰 + 5 Niveles enviados al jugador seleccionado.', 'Legendary');
            });

            // Preset Pack: VIP
            document.getElementById('btnModGiftVipPack')?.addEventListener('click', () => {
                const targetId = getGiftTarget();
                if (!targetId) return;
                socket.emit('owner:give_coins', { targetSocketId: targetId, amount: 500000 });
                socket.emit('owner:give_levels', { targetSocketId: targetId, amount: 25 });
                sounds.playOmni();
                showToast('💎 PACK VIP ENVIADO', '500,000 💰 + 25 Niveles enviados al jugador seleccionado.', 'Omnisciente');
            });

            // Preset Pack: GOD
            document.getElementById('btnModGiftGodPack')?.addEventListener('click', () => {
                const targetId = getGiftTarget();
                if (!targetId) return;
                socket.emit('owner:give_coins', { targetSocketId: targetId, amount: 5000000 });
                socket.emit('owner:give_levels', { targetSocketId: targetId, amount: 100 });
                // Also give the Omnisciente item if it exists in LOOT_TABLE
                const omniItem = LOOT_TABLE.find(i => i.rarity === 'Omnisciente');
                if (omniItem) socket.emit('owner:give_item', { targetSocketId: targetId, itemId: omniItem.id, count: 1 });
                sounds.playOmni();
                showToast('👑 PACK DIOS ENVIADO', '5,000,000 💰 + 100 Niveles + Ítem Omnisciente enviados.', 'Omnisciente');
            });

            // Gift success / error feedback
            socket?.on('owner:give_success', (data) => {
                showToast('🎁 REGALO ENVIADO', data.message, 'Legendary');
            });
            socket?.on('owner:give_error', (data) => {
                showToast('❌ ERROR AL ENVIAR', data.message, 'Common');
            });

            // =============================================
            // 🎁 RECEIVE GIFT (runs for ALL players)
            // =============================================
            socket?.on('owner:receive_gift', (gift) => {
                const fromName = gift.fromUsername || 'El Creador';
                if (gift.type === 'coins') {
                    state.coins += gift.amount;
                    state.totalCoinsEarned = (state.totalCoinsEarned || 0) + gift.amount;
                    saveState();
                    renderAll();
                    sounds.playOmni();
                    showToast(`🎁 REGALO DE ${fromName.toUpperCase()}`, `¡Recibiste +${gift.amount.toLocaleString()} 💰! Revisa tu saldo.`, 'Omnisciente');
                } else if (gift.type === 'levels') {
                    state.level = Math.max(1, (state.level || 1) + gift.amount);
                    state.xp = 0;
                    saveState();
                    renderAll();
                    syncOwnerProfileWS();
                    sounds.playOmni();
                    showToast(`🎁 REGALO DE ${fromName.toUpperCase()}`, `¡+${gift.amount.toLocaleString()} Niveles recibidos! Nuevo nivel: ${state.level.toLocaleString()}`, 'Omnisciente');
                } else if (gift.type === 'item') {
                    const itemTemplate = LOOT_TABLE.find(i => i.id === gift.itemId);
                    if (itemTemplate) {
                        const multiplier = 1 + (state.traderLevel * 0.10);
                        const vipBonus = (state.role === 'VIP' || state.role === 'OWNER') ? 1.20 : 1.0;
                        const sellValue = Math.floor(itemTemplate.baseValue * multiplier * vipBonus);
                        const count = gift.count || 1;
                        for (let i = 0; i < count; i++) {
                            addToInventory({ ...itemTemplate, sellValue, obtainedAt: Date.now() });
                        }
                        if (itemTemplate.rarity === 'Omnisciente') state.stats.omniscienteCount += count;
                        saveState();
                        renderAll();
                        sounds.playOmni();
                        showToast(`🎁 REGALO DE ${fromName.toUpperCase()}`, `¡Recibiste ${count}x ${itemTemplate.emoji} ${itemTemplate.name}!`, itemTemplate.rarity);
                    }
                }
            });

            // Hook into players online list to also update gift dropdown
            const _origUpdateDropdown = updateOnlinePlayersDropdown;
            function updateOnlinePlayersDropdown(players) {
                _origUpdateDropdown(players);
                if (state.role === 'OWNER') updateGiftTargetDropdown(players);
            }

            // --- FLOATING MOD MENU MODAL TOGGLE ---
            const floatingBtn = document.getElementById('floatingModMenuBtn');
            const floatingModal = document.getElementById('floatingModMenuModal');
            const btnCloseFloating = document.getElementById('btnCloseFloatingModMenu');
            const btnPopout = document.getElementById('btnModPopout');
            const ownerPanelSlot = document.getElementById('ownerPanelSlot');
            const floatingContent = document.getElementById('floatingModMenuContent');
            const ownerPanelElem = document.getElementById('ownerPanel');

            function openFloatingModMenu() {
                if (ownerPanelElem && floatingContent) {
                    floatingContent.appendChild(ownerPanelElem);
                }
                floatingModal?.classList.add('active');
                sounds.playOpen();
            }

            function closeFloatingModMenu() {
                if (ownerPanelElem && ownerPanelSlot) {
                    ownerPanelSlot.appendChild(ownerPanelElem);
                }
                floatingModal?.classList.remove('active');
            }

            floatingBtn?.addEventListener('click', openFloatingModMenu);
            btnPopout?.addEventListener('click', openFloatingModMenu);
            btnCloseFloating?.addEventListener('click', closeFloatingModMenu);
            floatingModal?.addEventListener('click', (e) => {
                if (e.target === floatingModal) closeFloatingModMenu();
            });

            // Claim VIP Role
            document.getElementById('btnClaimVipRole')?.addEventListener('click', () => {
                if (!state.unlockedRoles.includes('VIP')) {
                    state.unlockedRoles.push('VIP');
                    state.role = 'VIP';
                    saveState();
                    renderAll();
                    showToast('💎 ¡RANGO VIP DESBLOQUEADO!', 'Ahora disfrutas de +20% en valor de venta', 'Omnisciente');
                }
            });

            // Claim ADMIN Role
            document.getElementById('btnClaimAdminRole')?.addEventListener('click', () => {
                if (!state.unlockedRoles.includes('ADMIN')) {
                    state.unlockedRoles.push('ADMIN');
                    state.role = 'ADMIN';
                    saveState();
                    renderAll();
                    showToast('⚡ ¡RANGO ADMIN DESBLOQUEADO!', 'Ahora ganas el doble de XP (x2)', 'Omnisciente');
                }
            });

            // Secret PIN Modal Listeners
            document.getElementById('btnOpenSecretModal')?.addEventListener('click', () => {
                document.getElementById('secretModal').classList.add('active');
            });
            document.getElementById('btnCloseSecretModal')?.addEventListener('click', () => {
                document.getElementById('secretModal').classList.remove('active');
            });
            document.getElementById('btnSubmitSecretKey')?.addEventListener('click', () => {
                const inputKey = document.getElementById('inputSecretKey').value.trim();
                if (inputKey === 'LuckyOwner2026') {
                    if (!state.unlockedRoles.includes('OWNER')) {
                        state.unlockedRoles.push('OWNER');
                    }
                    state.role = 'OWNER';
                    document.getElementById('secretModal').classList.remove('active');
                    sounds.playOmni();
                    saveState();
                    renderAll();
                    showToast('👑 CREADOR VERIFICADO', '¡Acceso de Owner otorgado exitosamente!', 'Omnisciente');
                } else {
                    showToast('❌ Clave Incorrecta', 'La clave ingresada no es válida', 'Common');
                }
            });

            // Reset Data
            document.getElementById('btnResetData').addEventListener('click', () => {
                if (confirm('⚠️ ¿Estás seguro de que deseas reiniciar TODO tu progreso? Esta acción no se puede deshacer.')) {
                    localStorage.removeItem(STORAGE_KEY);
                    state = { ...DEFAULT_STATE };
                    saveState();
                    renderAll();
                    showToast('🔄 Datos Reiniciados', 'Progreso restaurado a cero', 'Common');
                }
            });

            // Claim Omnisciente Overlay
            document.getElementById('btnClaimOmni').addEventListener('click', () => {
                document.getElementById('omniOverlay').classList.remove('active');
            });

            // Mission Center UI Listeners
            document.getElementById('selectMissionCategory')?.addEventListener('change', (e) => {
                ensureMissionsInitialized();
                state.missions.activeCategory = e.target.value;
                sounds.playClick();
                renderMissions();
            });

            document.getElementById('btnToggleMissionsCollapse')?.addEventListener('click', () => {
                const body = document.getElementById('missionsCollapsibleBody');
                const btn = document.getElementById('btnToggleMissionsCollapse');
                if (body) {
                    body.classList.toggle('collapsed');
                    if (btn) btn.classList.toggle('collapsed');
                }
            });

            // Init WebSocket Connection
            initSocketConnection();

            // Chat UI Listeners
            document.getElementById('btnSendChat')?.addEventListener('click', sendChatMessage);
            document.getElementById('chatInput')?.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') sendChatMessage();
            });

            // Trade UI Listeners - Send Adopt Me Trade Invite
            document.getElementById('btnStartTrade')?.addEventListener('click', () => {
                const targetSocketId = document.getElementById('tradeTargetPlayer').value;

                if (!targetSocketId) {
                    showToast('⚠️ Selecciona Jugador', 'Debes seleccionar un jugador conectado para invitarlo a comerciar.', 'Common');
                    return;
                }

                if (!socket || !socket.connected) {
                    showToast('🔴 Sin Conexión', 'No estás conectado al servidor multijugador.', 'Common');
                    return;
                }

                socket.emit('trade:invite', {
                    targetSocketId: targetSocketId
                });
            });

            // Trade Invite Modal (Accept / Reject)
            document.getElementById('btnAcceptInvite')?.addEventListener('click', () => {
                const modal = document.getElementById('tradeInviteModal');
                if (modal) modal.classList.remove('active');
                if (pendingInviteSenderSocketId && socket) {
                    socket.emit('trade:respond_invite', {
                        senderSocketId: pendingInviteSenderSocketId,
                        accepted: true
                    });
                    pendingInviteSenderSocketId = null;
                }
            });

            document.getElementById('btnRejectInvite')?.addEventListener('click', () => {
                const modal = document.getElementById('tradeInviteModal');
                if (modal) modal.classList.remove('active');
                if (pendingInviteSenderSocketId && socket) {
                    socket.emit('trade:respond_invite', {
                        senderSocketId: pendingInviteSenderSocketId,
                        accepted: false
                    });
                    pendingInviteSenderSocketId = null;
                }
            });

            // Adopt Me Modal UI Controls
            document.getElementById('btnCancelTrade')?.addEventListener('click', () => {
                if (currentTradeSession && socket) {
                    socket.emit('trade:cancel', { tradeId: currentTradeSession.tradeId });
                }
                closeAdoptMeModal();
            });

            document.getElementById('btnAdoptMeAccept')?.addEventListener('click', () => {
                if (currentTradeSession && socket) {
                    sounds.playClick();
                    socket.emit('trade:accept_stage1', { tradeId: currentTradeSession.tradeId });
                }
            });

            document.getElementById('btnAdoptMeConfirm')?.addEventListener('click', () => {
                if (currentTradeSession && socket) {
                    sounds.playClick();
                    document.getElementById('btnAdoptMeConfirm').disabled = true;
                    document.getElementById('btnAdoptMeConfirm').textContent = '⏳ ESPERANDO AL OTRO JUGADOR...';
                    socket.emit('trade:confirm_final', { tradeId: currentTradeSession.tradeId });
                }
            });
        });

        /* ==========================================================================
           SOCKET.IO MULTIPLAYER & ADOPT ME TRADE CLIENT
           ========================================================================== */
        let socket = null;
        let pendingInviteSenderSocketId = null;
        let currentTradeSession = null;
        let countdownTimerId = null;

        function initSocketConnection() {
            if (typeof io === 'undefined') {
                console.warn('Socket.io library not loaded.');
                const statusBadge = document.getElementById('socketStatusBadge');
                if (statusBadge) statusBadge.textContent = '🔴 Servidor Offline';
                return;
            }

            try {
                const socketUrl = `${window.location.protocol}//${window.location.hostname}:3000`;
                socket = io(socketUrl, { reconnectionAttempts: 5, timeout: 5000 });

                socket.on('connect', () => {
                    console.log('✅ Conectado al servidor multijugador con ID:', socket.id);
                    const statusBadge = document.getElementById('socketStatusBadge');
                    if (statusBadge) {
                        statusBadge.textContent = '🟢 Online';
                        statusBadge.style.color = '#2ecc71';
                    }

                    // Sync identity with server
                    socket.emit('user:join', {
                        username: state.playerName,
                        role: state.role,
                        level: state.level,
                        avatar: state.playerName.charAt(0).toUpperCase()
                    });
                });

                socket.on('disconnect', () => {
                    const statusBadge = document.getElementById('socketStatusBadge');
                    if (statusBadge) {
                        statusBadge.textContent = '🔴 Desconectado';
                        statusBadge.style.color = '#ff0055';
                    }
                });

                // Online Players list update
                socket.on('players:online_list', (players) => {
                    updateOnlinePlayersDropdown(players);
                });

                // Global Chat messages
                socket.on('chat:message', (msg) => {
                    appendChatMessage(msg);
                });

                // Global Drop Announcements (Mythic / Omnisciente)
                socket.on('drop:global_announce', (data) => {
                    if (data.username !== state.playerName) {
                        showToast(`✨ ¡HALLAZGO GLOBAL!`, `${data.username} [${data.role}] obtuvo "${data.itemName}"!`, data.rarity);
                    }
                });

                // Trade Status Notification
                socket.on('trade:status', (data) => {
                    showToast('🤝 Intercambio', data.message, 'Rare');
                });

                // 🔔 INCOMING TRADE INVITATION (Target Player sees this!)
                socket.on('trade:incoming_invite', (data) => {
                    console.log('🔔 Solicitud de intercambio recibida de:', data.senderName);
                    sounds.playOpen();
                    pendingInviteSenderSocketId = data.senderSocketId;

                    const modal = document.getElementById('tradeInviteModal');
                    if (modal) {
                        document.getElementById('tradeInviteAvatar').textContent = (data.senderName || 'J').charAt(0).toUpperCase();
                        document.getElementById('tradeInviteText').innerHTML = `<strong>${data.senderName} [${data.senderRole}]</strong> (Niv ${data.senderLevel}) te ha invitado a comerciar estilo Adopt Me.`;
                        modal.classList.add('active');
                    }
                });

                // Trade Rejected
                socket.on('trade:rejected', (data) => {
                    showToast('❌ Intercambio Rechazado', data.message, 'Common');
                });

                // Trade Error
                socket.on('trade:error', (data) => {
                    showToast('⚠️ Intercambio Fallido', data.message, 'Common');
                });

                // 🌟 TRADE SESSION STARTED! (Adopt Me Modal opens for BOTH players!)
                socket.on('trade:session_start', (data) => {
                    console.log('🚀 ¡Sala de intercambio iniciada!', data);
                    sounds.playOmni();

                    // Close any invite dialog
                    document.getElementById('tradeInviteModal')?.classList.remove('active');

                    currentTradeSession = {
                        tradeId: data.tradeId,
                        partner: data.partner,
                        mySlots: [],
                        partnerSlots: [],
                        myAccepted: false,
                        partnerAccepted: false
                    };

                    // Open Adopt Me modal
                    const modal = document.getElementById('adoptMeTradeModal');
                    if (modal) {
                        modal.classList.add('active');
                        document.getElementById('partnerTradeName').textContent = `OFERTA DE ${data.partner.username.toUpperCase()} [${data.partner.role}]`;
                        renderAdoptMeTrade();
                    }
                });

                // 🔄 LIVE TRADE SESSION UPDATE (Sync 4 slots & acceptance status)
                socket.on('trade:session_update', (data) => {
                    if (!currentTradeSession) return;

                    currentTradeSession.mySlots = data.mySlots || [];
                    currentTradeSession.partnerSlots = data.partnerSlots || [];
                    currentTradeSession.myAccepted = data.myAccepted || false;
                    currentTradeSession.partnerAccepted = data.partnerAccepted || false;

                    // If modification happened while countdown was active, cancel countdown
                    if (!data.bothAccepted && countdownTimerId) {
                        clearInterval(countdownTimerId);
                        countdownTimerId = null;
                        document.getElementById('adoptMeCountdownBox')?.classList.remove('active');
                        document.getElementById('btnAdoptMeConfirm')?.classList.remove('active');
                        document.getElementById('btnAdoptMeAccept').style.display = 'block';
                    }

                    renderAdoptMeTrade();
                });

                // ⏱️ 5-SECOND SECURITY COUNTDOWN (When both accept!)
                socket.on('trade:countdown_start', (data) => {
                    sounds.playClick();
                    let secondsLeft = data.seconds || 5;

                    const countdownBox = document.getElementById('adoptMeCountdownBox');
                    const timerText = document.getElementById('adoptMeTimerText');
                    const timerBar = document.getElementById('adoptMeTimerBar');
                    const btnConfirm = document.getElementById('btnAdoptMeConfirm');
                    const btnAccept = document.getElementById('btnAdoptMeAccept');

                    if (btnAccept) btnAccept.style.display = 'none';
                    if (countdownBox) countdownBox.classList.add('active');
                    if (timerBar) timerBar.style.width = '100%';

                    if (countdownTimerId) clearInterval(countdownTimerId);

                    countdownTimerId = setInterval(() => {
                        secondsLeft -= 1;
                        if (timerText) timerText.textContent = `🔒 TIEMPO DE SEGURIDAD: ${secondsLeft}s...`;
                        if (timerBar) timerBar.style.width = `${(secondsLeft / 5) * 100}%`;

                        if (secondsLeft <= 0) {
                            clearInterval(countdownTimerId);
                            countdownTimerId = null;
                            if (countdownBox) countdownBox.classList.remove('active');
                            if (btnConfirm) {
                                btnConfirm.classList.add('active');
                                btnConfirm.disabled = false;
                                btnConfirm.textContent = '🔒 CONFIRMAR INTERCAMBIO DEFINITIVO';
                            }
                        }
                    }, 1000);
                });

                // 🎉 TRADE COMPLETED! (Swap up to 4 items)
                socket.on('trade:completed', (data) => {
                    sounds.playOmni();

                    // Remove given items from my inventory
                    (data.givenItems || []).forEach(given => {
                        const idx = state.inventory.findIndex(i => i.id === given.id);
                        if (idx !== -1) {
                            state.inventory[idx].count = (state.inventory[idx].count || 1) - 1;
                            if (state.inventory[idx].count <= 0) {
                                state.inventory.splice(idx, 1);
                            }
                        }
                    });

                    // Add received items to my inventory
                    (data.receivedItems || []).forEach(rec => {
                        addToInventory(rec);
                    });

                    saveState();
                    renderAll();
                    closeAdoptMeModal();

                    showToast('🤝 ¡Intercambio Completado!', `Intercambio exitoso con ${data.partnerName}.`, 'Omnisciente');
                });

                // Trade Cancelled
                socket.on('trade:cancelled', (data) => {
                    closeAdoptMeModal();
                    showToast('⚠️ Intercambio Cancelado', data.message || 'La sesión de intercambio ha finalizado.', 'Common');
                });

            } catch (e) {
                console.error('Socket.io connection error:', e);
            }
        }

        // --- ADOPT ME UI HELPERS ---

        function closeAdoptMeModal() {
            if (countdownTimerId) {
                clearInterval(countdownTimerId);
                countdownTimerId = null;
            }
            currentTradeSession = null;
            document.getElementById('adoptMeTradeModal')?.classList.remove('active');
            document.getElementById('adoptMeCountdownBox')?.classList.remove('active');
            document.getElementById('btnAdoptMeConfirm')?.classList.remove('active');
            const btnAccept = document.getElementById('btnAdoptMeAccept');
            if (btnAccept) {
                btnAccept.style.display = 'block';
                btnAccept.classList.remove('accepted');
                btnAccept.textContent = 'ACEPTAR OFERTA';
            }
        }

        function renderAdoptMeTrade() {
            if (!currentTradeSession) return;

            // Render My 4 Slots
            const mySlotsGrid = document.getElementById('mySlotsGrid');
            if (mySlotsGrid) {
                let html = '';
                for (let i = 0; i < 4; i++) {
                    const item = currentTradeSession.mySlots[i];
                    if (item) {
                        html += `
                            <div class="adoptme-slot filled rarity-${item.rarity}" style="border-color: var(--rarity-${item.rarity.toLowerCase()});">
                                <span class="adoptme-slot-emoji">${item.emoji}</span>
                                <span class="adoptme-slot-name">${item.name}</span>
                                <span class="adoptme-slot-rarity" style="color: var(--rarity-${item.rarity.toLowerCase()});">${item.rarity}</span>
                                <button class="btn-remove-slot" onclick="removeAdoptMeSlot(${i})">✕</button>
                            </div>
                        `;
                    } else {
                        html += `
                            <div class="adoptme-slot empty-slot">
                                <span style="font-size: 1.4rem; opacity: 0.3;">+</span>
                                <span style="font-size: 0.65rem; color: var(--text-dim);">Añadir Ítem</span>
                            </div>
                        `;
                    }
                }
                mySlotsGrid.innerHTML = html;
            }

            // Render Partner's 4 Slots
            const partnerSlotsGrid = document.getElementById('partnerSlotsGrid');
            if (partnerSlotsGrid) {
                let html = '';
                for (let i = 0; i < 4; i++) {
                    const item = currentTradeSession.partnerSlots[i];
                    if (item) {
                        html += `
                            <div class="adoptme-slot filled partner-slot rarity-${item.rarity}" style="border-color: var(--rarity-${item.rarity.toLowerCase()});">
                                <span class="adoptme-slot-emoji">${item.emoji}</span>
                                <span class="adoptme-slot-name">${item.name}</span>
                                <span class="adoptme-slot-rarity" style="color: var(--rarity-${item.rarity.toLowerCase()});">${item.rarity}</span>
                            </div>
                        `;
                    } else {
                        html += `
                            <div class="adoptme-slot empty-slot partner-slot">
                                <span style="font-size: 1.4rem; opacity: 0.2;">⏳</span>
                                <span style="font-size: 0.65rem; color: var(--text-dim);">(Vacío)</span>
                            </div>
                        `;
                    }
                }
                partnerSlotsGrid.innerHTML = html;
            }

            // Status Badges & Glow
            const mySide = document.getElementById('myTradeSide');
            const myStatus = document.getElementById('myTradeStatus');
            if (currentTradeSession.myAccepted) {
                mySide?.classList.add('is-accepted');
                if (myStatus) {
                    myStatus.className = 'adoptme-status-pill ready';
                    myStatus.textContent = '✅ OFERTA ACEPTADA';
                }
            } else {
                mySide?.classList.remove('is-accepted');
                if (myStatus) {
                    myStatus.className = 'adoptme-status-pill';
                    myStatus.textContent = currentTradeSession.mySlots.length ? 'Modificando oferta...' : 'Elige ítems...';
                }
            }

            const partnerSide = document.getElementById('partnerTradeSide');
            const partnerStatus = document.getElementById('partnerTradeStatus');
            if (currentTradeSession.partnerAccepted) {
                partnerSide?.classList.add('is-accepted');
                if (partnerStatus) {
                    partnerStatus.className = 'adoptme-status-pill ready';
                    partnerStatus.textContent = '✅ OFERTA ACEPTADA';
                }
            } else {
                partnerSide?.classList.remove('is-accepted');
                if (partnerStatus) {
                    partnerStatus.className = 'adoptme-status-pill';
                    partnerStatus.textContent = currentTradeSession.partnerSlots.length ? 'Modificando...' : 'Esperando...';
                }
            }

            // Accept Button state
            const btnAccept = document.getElementById('btnAdoptMeAccept');
            if (btnAccept) {
                if (currentTradeSession.myAccepted) {
                    btnAccept.classList.add('accepted');
                    btnAccept.textContent = '✅ OFERTA ACEPTADA (Esperando al otro)';
                } else {
                    btnAccept.classList.remove('accepted');
                    btnAccept.textContent = 'ACEPTAR OFERTA';
                }
            }

            // Counter
            const counter = document.getElementById('adoptMeSlotCounter');
            if (counter) counter.textContent = `${currentTradeSession.mySlots.length}/4 Ítems seleccionados`;

            // Inventory Drawer
            renderAdoptMeInventoryDrawer();
        }

        function renderAdoptMeInventoryDrawer() {
            const drawerList = document.getElementById('adoptMeInvList');
            if (!drawerList) return;

            if (!state.inventory || state.inventory.length === 0) {
                drawerList.innerHTML = '<span style="font-size: 0.8rem; color: var(--text-dim); padding: 0.5rem;">Tu inventario está vacío.</span>';
                return;
            }

            drawerList.innerHTML = state.inventory.map(item => {
                // Count how many of this item are already placed in my 4 slots
                const placedCount = currentTradeSession.mySlots.filter(s => s.id === item.id).length;
                const remaining = (item.count || 1) - placedCount;
                const canAdd = remaining > 0 && currentTradeSession.mySlots.length < 4 && !currentTradeSession.myAccepted;

                return `
                    <div class="adoptme-inv-item ${canAdd ? '' : 'disabled'}" onclick="${canAdd ? `addAdoptMeSlot('${item.id}')` : ''}">
                        <span style="font-size: 1.8rem;">${item.emoji}</span>
                        <span style="font-family: var(--font-heading); font-size: 0.75rem; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; width: 100%; text-align: center;">${item.name}</span>
                        <span style="font-size: 0.65rem; color: var(--rarity-${item.rarity.toLowerCase()}); font-weight: 800;">${item.rarity}</span>
                        <span style="font-size: 0.7rem; color: #f1c40f;">x${remaining}</span>
                    </div>
                `;
            }).join('');
        }

        window.addAdoptMeSlot = function(itemId) {
            if (!currentTradeSession) return;
            if (currentTradeSession.mySlots.length >= 4) {
                showToast('⚠️ Límite de Slots', 'Solo puedes añadir un máximo de 4 ítems (Estilo Adopt Me).', 'Common');
                return;
            }

            const item = state.inventory.find(i => i.id === itemId);
            if (!item) return;

            const placedCount = currentTradeSession.mySlots.filter(s => s.id === item.id).length;
            if (placedCount >= (item.count || 1)) {
                showToast('⚠️ No tienes más copias', 'Ya has puesto todas tus copias de este ítem.', 'Common');
                return;
            }

            sounds.playClick();
            currentTradeSession.mySlots.push({ ...item });
            currentTradeSession.myAccepted = false; // Reset acceptance on modification

            // Sync with server
            if (socket) {
                socket.emit('trade:update_slots', {
                    tradeId: currentTradeSession.tradeId,
                    slots: currentTradeSession.mySlots
                });
            }

            renderAdoptMeTrade();
        };

        window.removeAdoptMeSlot = function(slotIndex) {
            if (!currentTradeSession || !currentTradeSession.mySlots[slotIndex]) return;

            sounds.playClick();
            currentTradeSession.mySlots.splice(slotIndex, 1);
            currentTradeSession.myAccepted = false;

            // Sync with server
            if (socket) {
                socket.emit('trade:update_slots', {
                    tradeId: currentTradeSession.tradeId,
                    slots: currentTradeSession.mySlots
                });
            }

            renderAdoptMeTrade();
        };

        function updateOnlinePlayersDropdown(players) {
            const select = document.getElementById('tradeTargetPlayer');
            if (!select) return;

            const currentSelection = select.value;
            const myId = socket ? socket.id : null;
            const otherPlayers = players.filter(p => p.socketId !== myId);

            select.innerHTML = '<option value="">-- Selecciona Jugador En Línea --</option>' + 
                otherPlayers.map(p => `<option value="${p.socketId}">${p.username} [${p.role}] (Niv ${p.level})</option>`).join('');

            if (otherPlayers.some(p => p.socketId === currentSelection)) {
                select.value = currentSelection;
            }

            const statusBadge = document.getElementById('socketStatusBadge');
            if (statusBadge && socket && socket.connected) {
                const count = players.length;
                statusBadge.textContent = `🟢 ${count} en línea`;
            }
        }

        function appendChatMessage(msg) {
            const chatContainer = document.getElementById('chatMessages');
            if (!chatContainer) return;

            const row = document.createElement('div');

            if (msg.system) {
                row.className = 'chat-system-msg';
                row.textContent = msg.text;
            } else {
                row.className = 'chat-msg-row';
                const roleColor = msg.role === 'OWNER' ? '#f1c40f' : (msg.role === 'ADMIN' ? '#ff0055' : (msg.role === 'VIP' ? '#2ecc71' : '#00f0ff'));
                row.innerHTML = `
                    <span class="chat-msg-author" style="color: ${roleColor};">[${msg.role}] ${msg.username}:</span>
                    <span style="color: #fff;">${msg.text}</span>
                    <span class="chat-msg-time">${msg.time}</span>
                `;
            }

            chatContainer.appendChild(row);
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }

        function sendChatMessage() {
            const input = document.getElementById('chatInput');
            if (!input || !input.value.trim() || !socket) return;
            socket.emit('chat:send', { text: input.value.trim() });
            input.value = '';
        }

        function announceGlobalDrop(item) {
            if (socket && ['Mythic', 'Omnisciente'].includes(item.rarity)) {
                socket.emit('drop:announce', {
                    itemName: item.name,
                    rarity: item.rarity,
                    emoji: item.emoji
                });
            }
        }
