const LOOT_TABLE = [
    // Common (49.99%)
    { id: 'c1', name: 'Espada de Madera', rarity: 'Common', image: 'images/Comun/Espada_Madera.jpg', emoji: '🗡️', baseValue: 10 },
    { id: 'c2', name: 'Armadura de Cuero', rarity: 'Common', image: 'images/Comun/Armadura_Cuero.jpg', emoji: '👘', baseValue: 8 },
    { id: 'c3', name: 'Pico de Piedra', rarity: 'Common', image: 'images/Comun/Pico_Madera.jpg', emoji: '⛏️', baseValue: 12 },
    { id: 'c4', name: 'Pan de Centeno', rarity: 'Common', image: 'images/Comun/Pan_Centeno.jpg', emoji: '🍞', baseValue: 5 },
    { id: 'c5', name: 'Cuerda Resistente', rarity: 'Common', image: 'images/Comun/Cuerda_Resistente.jpg', emoji: '🪢', baseValue: 7 },

    // Uncommon (25.00%)
    { id: 'u1', name: 'Poción Slime', rarity: 'Uncommon', image: 'images/Poco comun/Pocion_Slime.jpg', emoji: '🧪', baseValue: 50 },
    { id: 'u2', name: 'Escudo de Hierro', rarity: 'Uncommon', image: 'images/Poco comun/Escudo_Hierro.jpg', emoji: '🛡️', baseValue: 45 },
    { id: 'u3', name: 'Flecha de Plata', rarity: 'Uncommon', image: 'images/Poco comun/Flecha_Plata.jpg', emoji: '🏹', baseValue: 40 },
    { id: 'u4', name: 'Botas de Velocidad', rarity: 'Uncommon', image: 'images/Poco comun/Botas_Velocidad.jpg', emoji: '👟', baseValue: 60 },

    // Rare (15.00%)
    { id: 'r1', name: 'Anillo Mágico', rarity: 'Rare', image: 'images/Raro/Anillo_Magico.jpg', emoji: '💍', baseValue: 200 },
    { id: 'r2', name: 'Arco Encantado', rarity: 'Rare', image: 'images/Raro/Arco_Encantado.jpg', emoji: '🏹', baseValue: 180 },
    { id: 'r3', name: 'Varita de Cristal', rarity: 'Rare', image: 'images/Raro/Varita_Cristal.jpg', emoji: '🪄', baseValue: 220 },
    { id: 'r4', name: 'Manto de Sombras', rarity: 'Rare', image: 'images/Raro/Manto_Sombra.jpg', emoji: '🧥', baseValue: 250 },

    // Epic (7.00%)
    { id: 'e1', name: 'Hoja de Plasma', rarity: 'Epic', image: 'images/Epico/Hoja_Plasma.jpg', emoji: '⚔️', baseValue: 1000 },
    { id: 'e2', name: 'Escama de Dragón', rarity: 'Epic', image: 'images/Epico/Escama_Dragon.jpg', emoji: '🐉', baseValue: 900 },
    { id: 'e3', name: 'Martillo de Tormenta', rarity: 'Epic', image: 'images/Epico/Martillo_Tormenta.jpg', emoji: '🔨', baseValue: 1100 },
    { id: 'e4', name: 'Orbe del Vacío', rarity: 'Epic', image: 'images/Epico/Orbe_Vacio.jpg', emoji: '🔮', baseValue: 1200 },

    // Legendary (2.50%)
    { id: 'l1', name: 'Corona Dorada', rarity: 'Legendary', image: 'images/Legendario/Corona_Dorada.jpg', emoji: '👑', baseValue: 5000 },
    { id: 'l2', name: 'Pluma de Fénix', rarity: 'Legendary', image: 'images/Legendario/Pluma_Fenix.jpg', emoji: '🪶', baseValue: 4500 },
    { id: 'l3', name: 'Escudo de Titán', rarity: 'Legendary', image: 'images/Legendario/Escudo_Titan.jpg', emoji: '🛡️', baseValue: 6000 },

    // Mythic (0.50%)
    { id: 'm1', name: 'Armadura Vampírica', rarity: 'Mythic', image: 'images/Mitico/Armadura_Vampirica.jpg', emoji: '🧛', baseValue: 25000 },
    { id: 'm2', name: 'Cetro del Caos', rarity: 'Mythic', image: 'images/Mitico/Cetro_Caos.jpg', emoji: '🔱', baseValue: 30000 },
    { id: 'm3', name: 'Reliquia Ancestral', rarity: 'Mythic', image: 'images/Mitico/Reliquia_Ancestral.jpg', emoji: '⚱️', baseValue: 28000 },

    // Omnisciente (0.01%)
    { id: 'o1', name: 'Artefacto Cósmico', rarity: 'Omnisciente', image: 'images/Omnisciente/Artefacto_Cosmico.jpg', emoji: '✨', baseValue: 100000 },
    { id: 'o2', name: 'Cristal del Universo', rarity: 'Omnisciente', image: 'images/Omnisciente/Cristal_Universo.jpg', emoji: '🌌', baseValue: 150000 },
    { id: 'o3', name: 'Orbe Celestial', rarity: 'Omnisciente', image: 'images/Omnisciente/Orbe_Celestial.jpg', emoji: '🔮', baseValue: 500000 },
];

/* ==========================================================================
   CENTRALIZED GAME CONFIG — Edit here to tune every mechanic
   ========================================================================== */
const CONFIG = {
    LUCK_STREAK: {
        points: { Common: 0, Uncommon: 1, Rare: 2, Epic: 4, Legendary: 8, Mythic: 15, Omnisciente: 50, Secret: 100 },
        breakOn: ['Common'],          // rarities that RESET the streak
        maxStreak: 9999,
        getMultiplier: (s) => Math.min(3.0, 1.0 + Math.floor(s / 10) * 0.05) // +5% per 10 pts, max 3x
    },
    RISK_IT: {
        levels: [
            { id: 'safe', name: 'SAFE', emoji: '🛡️', multiplier: 1.5, winChance: 0.75, loseAll: false, losePercent: 0.50, color: '#2ecc71' },
            { id: 'risky', name: 'RISKY', emoji: '⚔️', multiplier: 2.5, winChance: 0.55, loseAll: false, losePercent: 1.00, color: '#f39c12' },
            { id: 'insane', name: 'INSANE', emoji: '💀', multiplier: 5.0, winChance: 0.35, loseAll: true, losePercent: 1.00, color: '#e74c3c' },
            { id: 'gamble', name: 'GAMBLE', emoji: '🎰', multiplier: 10, winChance: 0.15, loseAll: true, losePercent: 1.00, color: '#9b59b6' }
        ]
    },
    COLLECTION_BONUSES: {
        Common: { type: 'luck', value: 0.05, label: '+5% de Suerte' },
        Uncommon: { type: 'sellValue', value: 0.05, label: '+5% Valor de Venta' },
        Rare: { type: 'xp', value: 0.05, label: '+5% de XP' },
        Epic: { type: 'luck', value: 0.10, label: '+10% de Suerte' },
        Legendary: { type: 'coins', value: 10000, label: '+10,000 Coins de Regalo' },
        Mythic: { type: 'sellValue', value: 0.15, label: '+15% Valor de Venta' },
        Omnisciente: { type: 'luck', value: 0.25, label: '+25% de Suerte Total' }
    },
    PRESTIGE: {
        requiredLevel: 50,
        keep: ['playerName', 'role', 'selectedSkin', 'selectedTheme', 'missions', 'collection', 'discoveredSecrets', 'unlockedSkins', 'unlockedThemes', 'unlockedRoles', 'stats', 'startDate', 'prestige', 'prestigeBonus', 'streakBest'],
        bonusPerPrestige: { luck: 0.05, sellValue: 0.05, xp: 0.05 },
        maxPrestige: 10
    },
    EVENTS: [
        { id: 'lucky_hour', name: '🍀 LUCKY HOUR', duration: 60, probability: 0.004, effect: { type: 'luckBonus', value: 0.50 }, cooldown: 600, desc: '+50% de Suerte durante 60s' },
        { id: 'golden_rain', name: '💰 LLUVIA DORADA', duration: 1, probability: 0.003, effect: { type: 'coinsAll', value: 500 }, cooldown: 900, desc: '¡500 Coins gratis para todos!' },
        { id: 'cursed_hour', name: '☠️ HORA MALDITA', duration: 30, probability: 0.003, effect: { type: 'luckPenalty', value: 0.25 }, cooldown: 600, desc: '-25% de Suerte durante 30s' },
        { id: 'block_rain', name: '🎁 LLUVIA DE CAJAS', duration: 30, probability: 0.002, effect: { type: 'freeBlocks', value: 3 }, cooldown: 1200, desc: '¡3 cajas gratis durante 30s!' }
    ],
    BATTLE: {
        duration: 30,
        points: { Common: 1, Uncommon: 3, Rare: 7, Epic: 15, Legendary: 35, Mythic: 100, Omnisciente: 500, Secret: 1000 },
        winnerReward: { coins: 5000, xp: 500 },
        loserReward: { coins: 1000, xp: 150 },
        cooldownMs: 60000
    }
};

/* ==========================================================================
   SECRET ITEMS — Conditions hidden until discovered
   ========================================================================== */
const SECRET_ITEMS = [
    { id: 's1', name: 'NULL', rarity: 'Secret', image: "", emoji: '⬛', baseValue: 500000, condition: 'streak_500', hint: '???', description: 'Un ítem que no debería existir.' },
    { id: 's2', name: 'VOID', rarity: 'Secret', image: 'images/Secreto/Vacio.jpg', emoji: '🌑', baseValue: 750000, condition: 'open_1000_no_legendary', hint: 'La oscuridad recompensa la perseverancia...', description: 'Encontrado tras 1000 aperturas sin gloria.' },
    { id: 's3', name: 'COSMIC GOD', rarity: 'Secret', image: 'images/Secreto/Cosmico.jpg', emoji: '👁️', baseValue: 2000000, condition: 'prestige_3', hint: '???', description: 'Solo los renacidos 3 veces pueden verlo.' }
];

function getItemIcon(item, extraClass = '') {
    if (!item) return '📦';
    const lootDef = LOOT_TABLE.find(i => i.id === item.id || i.name === item.name);
    const secretDef = SECRET_ITEMS.find(i => i.id === item.id || i.name === item.name);
    const imagePath = item.image || (lootDef && lootDef.image) || (secretDef && secretDef.image);
    const emojiIcon = item.emoji || (lootDef && lootDef.emoji) || (secretDef && secretDef.emoji) || '📦';

    if (imagePath) {
        if (imagePath.startsWith('<img')) return imagePath;
        return `<img src="${imagePath}" alt="" class="item-icon-img ${extraClass}" onerror="this.style.display='none'; if(this.nextElementSibling) this.nextElementSibling.style.display='inline';"><span class="fallback-emoji" style="display:none;">${emojiIcon}</span>`;
    }
    return emojiIcon;
}

const SKINS_DATA = [
    { id: 'classic', name: 'Clásico', icon: '⭐', cost: 0, reqLevel: 1, image: 'images/Luckys/Lucky_normal.png' },
    { id: 'pumpkin', name: 'Calabaza', icon: '🎃', cost: 2000, reqLevel: 1, image: 'images/Luckys/lucky_calabaza.png' },
    { id: 'safe', name: 'Caja Fuerte', icon: '🔒', cost: 5000, reqLevel: 1, image: 'images/Luckys/lucky_fuerte.png' },
    { id: 'plasma', name: 'Cubo Plasma', icon: '💠', cost: 0, reqLevel: 10, image: 'images/Luckys/lucky_plasma.png' },
    { id: 'shadow', name: 'Sombra Oscura', icon: '⬛', cost: 0, reqLevel: 20, image: 'images/Luckys/lucky_sombra.png' }
];

function getSkinImage(skinId) {
    const skin = SKINS_DATA.find(s => s.id === skinId);
    return skin ? skin.image : 'images/Luckys/Lucky_normal.png';
}

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
const AUTH_KEY = 'lucky_block_sim_auth_v1';

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
    startDate: new Date().toLocaleDateString(),
    // === NEW SYSTEMS ===
    luckStreak: 0,
    streakBest: 0,
    collection: {},           // { itemId: { firstObtained, totalCount } }
    discoveredSecrets: [],    // array of secret item ids
    prestige: 0,
    prestigeBonus: { luck: 0, sellValue: 0, xp: 0 },
    blocksSinceLastLegendary: 0,
    freeBlocks: 0,            // from events
    activeEventId: null,
    activeEventExpiry: 0,
    battleCooldownExpiry: 0,
    battleHistory: [],
    // === AURA BATTLE & CHARACTER CUSTOMIZER ===
    character: {
        body: 'classic',
        aura: 'none',
        head: 'none',
        weapon: 'none',
        color: '#00f0ff',
        auraColor: '#ff0055',
        pose: 'guard'
    },
    unlockedCosmetics: {
        bodies: ['classic', 'cyber', 'shadow'],
        auras: ['none', 'fire'],
        heads: ['none'],
        weapons: ['none']
    },
    defeatedBosses: [],
    currentBossId: 'b1',
    auraBattlesWon: 0,
    auraBattlesLost: 0,
    // === ARCADE & MINIGAMES ===
    arcade: {
        lastDailyWheel: 0,
        wheelSpinsTotal: 0,
        minesGamesWon: 0,
        minesTotalWon: 0,
        coinFlipWon: 0
    }
};

let state = { ...DEFAULT_STATE };
let lastRevealedItem = null;
let autoClickerIntervalId = null;
let currentAuthUser = null; // { username, token }
let cloudSaveDebounceTimer = null;

function loadState() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);
            state = { ...DEFAULT_STATE, ...parsed };
            if (state.inventory && Array.isArray(state.inventory)) {
                state.inventory.forEach(item => {
                    const lootDef = LOOT_TABLE.find(i => i.id === item.id || i.name === item.name);
                    if (lootDef && lootDef.image) {
                        item.image = lootDef.image;
                    }
                });
            }
            // Ensure character and arcade structures
            if (!state.character) {
                state.character = { body: 'classic', aura: 'none', head: 'none', weapon: 'none', color: '#00f0ff', auraColor: '#ff0055', pose: 'guard' };
            }
            if (!state.unlockedCosmetics) {
                state.unlockedCosmetics = { bodies: ['classic', 'cyber', 'shadow'], auras: ['none', 'fire'], heads: ['none'], weapons: ['none'] };
            }
            if (!Array.isArray(state.defeatedBosses)) state.defeatedBosses = [];
            if (!state.arcade) {
                state.arcade = { lastDailyWheel: 0, wheelSpinsTotal: 0, minesGamesWon: 0, minesTotalWon: 0, coinFlipWon: 0 };
            }
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
        console.error("Error al guardar estado local:", e);
    }

    if (currentAuthUser) {
        debouncedCloudSave();
    }
}

function debouncedCloudSave() {
    if (cloudSaveDebounceTimer) clearTimeout(cloudSaveDebounceTimer);
    cloudSaveDebounceTimer = setTimeout(() => {
        sendCloudSave();
    }, 2000);
}

async function sendCloudSave() {
    if (!currentAuthUser) return false;
    try {
        const response = await fetch('/api/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: currentAuthUser.username,
                token: currentAuthUser.token,
                gameState: state
            })
        });
        const resData = await response.json();
        return resData.success;
    } catch (e) {
        console.warn("No se pudo conectar con el servidor para guardado en la nube:", e);
        return false;
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

    playClash() {
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(120, now);
        osc.frequency.exponentialRampToValueAtTime(40, now + 0.4);
        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.4);
    }

    playVictory() {
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        [440, 554.37, 659.25, 880].forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, now + idx * 0.12);
            gain.gain.setValueAtTime(0.25, now + idx * 0.12);
            gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.12 + 0.6);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now + idx * 0.12);
            osc.stop(now + idx * 0.12 + 0.6);
        });
    }

    playSpin() {
        this.init();
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.04);
    }

    playLaser() {
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(1200, now);
        osc.frequency.exponentialRampToValueAtTime(200, now + 0.15);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.15);
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

    // Apply Prestige Luck Bonus
    if (state.prestigeBonus && state.prestigeBonus.luck > 0) {
        const prestigeShift = Math.floor(state.prestigeBonus.luck * 2000);
        if (!isPremium && weights.Common >= prestigeShift) weights.Common -= prestigeShift;
        weights.Epic += Math.floor(prestigeShift * 0.5);
        weights.Legendary += Math.floor(prestigeShift * 0.3);
        weights.Mythic += Math.floor(prestigeShift * 0.2);
    }

    // Apply Collection Bonus (luck type)
    const colLuckBonus = getCollectionLuckBonus();
    if (colLuckBonus > 0) {
        const colShift = Math.floor(colLuckBonus * 1500);
        if (!isPremium && weights.Common >= colShift) weights.Common -= colShift;
        weights.Legendary += Math.floor(colShift * 0.4);
        weights.Mythic += Math.floor(colShift * 0.3);
        weights.Omnisciente += Math.max(1, Math.floor(colShift * 0.1));
    }

    // Apply Active Event Effect
    if (state.activeEventId && Date.now() < state.activeEventExpiry) {
        const evt = CONFIG.EVENTS.find(e => e.id === state.activeEventId);
        if (evt) {
            if (evt.effect.type === 'luckBonus') {
                const evtShift = Math.floor(evt.effect.value * 1500);
                if (!isPremium && weights.Common >= evtShift) weights.Common -= evtShift;
                weights.Legendary += Math.floor(evtShift * 0.4);
                weights.Mythic += Math.floor(evtShift * 0.3);
            } else if (evt.effect.type === 'luckPenalty') {
                const penalty = Math.floor(evt.effect.value * 1000);
                weights.Legendary = Math.max(1, weights.Legendary - penalty);
                weights.Mythic = Math.max(1, weights.Mythic - Math.floor(penalty * 0.5));
                if (!isPremium) weights.Common += penalty;
            }
        }
    } else if (state.activeEventId && Date.now() >= state.activeEventExpiry) {
        state.activeEventId = null; // Expire event
        state.activeEventExpiry = 0;
        renderEventBanner();
    }

    return weights;
}

let ownerDropSpoofer = 'OFF';
let ownerAutoSpeedOverride = null;

function rollRarity(isPremium = false) {
    // Owner Drop Spoofer Override
    if (ownerDropSpoofer && ownerDropSpoofer !== 'OFF') {
        return ownerDropSpoofer;
    }

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
                state.pityCounter = 0;
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
   NEW MECHANICS HELPERS (Streak, Collection, Secrets, Events)
   ========================================================================== */

function getCollectionLuckBonus() {
    let totalColBonus = 0;
    for (let itemId in state.collection) {
        const rarity = LOOT_TABLE.find(i => i.id === itemId)?.rarity || 'Common';
        const b = CONFIG.COLLECTION_BONUSES[rarity];
        if (b && b.type === 'luck') totalColBonus += b.value;
    }
    return totalColBonus;
}

function getCollectionSellBonus() {
    let totalSellBonus = 0;
    for (let itemId in state.collection) {
        const rarity = LOOT_TABLE.find(i => i.id === itemId)?.rarity || 'Common';
        const b = CONFIG.COLLECTION_BONUSES[rarity];
        if (b && b.type === 'sellValue') totalSellBonus += b.value;
    }
    return totalSellBonus;
}

function getCollectionXpBonus() {
    let totalXpBonus = 0;
    for (let itemId in state.collection) {
        const rarity = LOOT_TABLE.find(i => i.id === itemId)?.rarity || 'Common';
        const b = CONFIG.COLLECTION_BONUSES[rarity];
        if (b && b.type === 'xp') totalXpBonus += b.value;
    }
    return totalXpBonus;
}

function updateLuckStreak(rarity) {
    if (CONFIG.LUCK_STREAK.breakOn.includes(rarity)) {
        if (state.luckStreak > 0) {
            showToast('💔 Racha Perdida', 'Tu racha de suerte ha vuelto a cero.', 'Common');
        }
        state.luckStreak = 0;
    } else {
        const pts = CONFIG.LUCK_STREAK.points[rarity] || 0;
        state.luckStreak = Math.min(CONFIG.LUCK_STREAK.maxStreak, state.luckStreak + pts);
        if (state.luckStreak > state.streakBest) {
            state.streakBest = state.luckStreak;
        }
    }
}

function updateCollection(item) {
    let isNewDiscovery = false;
    if (!state.collection[item.id]) {
        state.collection[item.id] = { firstObtained: Date.now(), totalCount: 1 };
        isNewDiscovery = true;
    } else {
        state.collection[item.id].totalCount += 1;
    }

    // Give direct rewards if it's new
    if (isNewDiscovery) {
        const b = CONFIG.COLLECTION_BONUSES[item.rarity];
        if (b && b.type === 'coins') {
            state.coins += b.value;
            state.totalCoinsEarned += b.value;
        }
    }
    return isNewDiscovery;
}

function announceFirstDiscovery(item) {
    showToast('📖 ¡NUEVO DESCUBRIMIENTO!', `Has añadido ${item.name} a tu colección.`, 'Rare');
}

function checkSecretConditions() {
    SECRET_ITEMS.forEach(secret => {
        if (!state.discoveredSecrets.includes(secret.id)) {
            let unlocked = false;
            if (secret.condition === 'streak_500' && state.luckStreak >= 500) unlocked = true;
            if (secret.condition === 'open_1000_no_legendary' && state.blocksSinceLastLegendary >= 1000) unlocked = true;
            if (secret.condition === 'prestige_3' && state.prestige >= 3) unlocked = true;

            if (unlocked) {
                state.discoveredSecrets.push(secret.id);
                // Also give the item directly
                const multiplier = 1 + (state.traderLevel * 0.10);
                const secretItem = { ...secret, sellValue: Math.floor(secret.baseValue * multiplier), obtainedAt: Date.now() };
                addToInventory(secretItem);

                showToast('👁️ ¡SECRETO DESCUBIERTO!', `Has desbloqueado y obtenido: ${secret.name}`, 'Omnisciente');
                sounds.playOmni();
                triggerOmniOverlay(secretItem);
                if (typeof announceGlobalFeed === 'function') announceGlobalFeed(secretItem);
            }
        }
    });
}

function announceGlobalFeed(item) {
    if (socket && ['Legendary', 'Mythic', 'Omnisciente', 'Secret'].includes(item.rarity)) {
        socket.emit('drop:announce', {
            itemName: item.name,
            rarity: item.rarity,
            emoji: item.emoji
        });
    }
}

function doPrestige() {
    if (state.level < CONFIG.PRESTIGE.requiredLevel || state.prestige >= CONFIG.PRESTIGE.maxPrestige) return;

    // Save things we want to keep
    const savedState = {};
    CONFIG.PRESTIGE.keep.forEach(k => savedState[k] = state[k]);

    // Calculate new bonuses
    const newPrestige = state.prestige + 1;
    const newBonus = {
        luck: newPrestige * CONFIG.PRESTIGE.bonusPerPrestige.luck,
        sellValue: newPrestige * CONFIG.PRESTIGE.bonusPerPrestige.sellValue,
        xp: newPrestige * CONFIG.PRESTIGE.bonusPerPrestige.xp
    };

    // Keep secret items in inventory
    const secretItems = state.inventory.filter(item => item.rarity === 'Secret');

    // Reset state to default but merge saved
    state = { ...DEFAULT_STATE, ...savedState, prestige: newPrestige, prestigeBonus: newBonus };
    if (currentAuthUser && currentAuthUser.username) {
        state.playerName = currentAuthUser.username;
    }
    state.inventory = secretItems;
    lastRevealedItem = null;
    renderRevealedItem(null);

    showToast('🌌 RENACIMIENTO CÓSMICO', `Has alcanzado el Prestigio ${newPrestige}. Tus multiplicadores han aumentado.`, 'Omnisciente');
    sounds.playOmni();

    if (socket) {
        socket.emit('drop:announce', {
            itemName: `PRESTIGIO ${newPrestige}`,
            rarity: 'Omnisciente',
            emoji: '🌀'
        });
    }

    saveState();
    renderAll();
}

function doRiskIt() {
    if (!lastRevealedItem) return;

    const invIndex = state.inventory.findIndex(i => i.id === lastRevealedItem.id);
    if (invIndex === -1) {
        showToast('❌ Error', 'Ya no tienes este ítem en tu inventario.', 'Common');
        return;
    }

    const levels = CONFIG.RISK_IT.levels;
    const level = levels[Math.floor(Math.random() * levels.length)];
    const roll = Math.random();
    const invItem = state.inventory[invIndex];

    // Handle unstacking if user has multiple copies of the item
    let targetItem;
    if (invItem.count > 1) {
        invItem.count -= 1;
        targetItem = { ...invItem, count: 1 };
        state.inventory.push(targetItem);
    } else {
        targetItem = invItem;
    }

    if (roll < level.winChance) {
        const newVal = Math.floor(lastRevealedItem.sellValue * level.multiplier);
        targetItem.sellValue = newVal;
        targetItem.name = `${lastRevealedItem.name} [+${level.multiplier}x]`;
        sounds.playOmni();
        showToast(`🎲 ¡RIESGO EXITOSO! (${level.name})`, `Ganaste x${level.multiplier} de valor (${newVal} 💰)`, 'Legendary');

        if (typeof announceGlobalFeed === 'function') {
            announceGlobalFeed({ name: `Risk It x${level.multiplier} en ${lastRevealedItem.name}`, rarity: 'Legendary', emoji: '🎰' });
        }
    } else {
        if (level.loseAll) {
            const idx = state.inventory.indexOf(targetItem);
            if (idx !== -1) state.inventory.splice(idx, 1);
            sounds.playError();
            showToast(`💀 LO PERDISTE TODO (${level.name})`, 'La casa gana.', 'Common');
        } else {
            const newVal = Math.floor(lastRevealedItem.sellValue * (1 - level.losePercent));
            targetItem.sellValue = Math.max(1, newVal);
            targetItem.name = `${lastRevealedItem.name} [DAÑADO]`;
            sounds.playError();
            showToast(`⚠️ FALLO (${level.name})`, `Perdiste ${Math.floor(level.losePercent * 100)}% del valor.`, 'Common');
        }
    }

    saveState();
    renderAll();
    renderRevealedItem(null);
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
    const rarity = rollRarity(isPremium);
    const itemBase = getRandomItemByRarity(rarity);

    if (['Legendary', 'Mythic', 'Omnisciente'].includes(rarity)) {
        state.stats.legendariesObtained = (state.stats.legendariesObtained || 0) + 1;
    }

    // Calculate sell price with Trader Upgrade multiplier + VIP role bonus + Prestige + Collection bonus
    const multiplier = 1 + (state.traderLevel * 0.10);
    const vipBonus = (state.role === 'VIP' || state.role === 'OWNER') ? 1.20 : 1.0;
    const prestigeSellBonus = 1 + (state.prestigeBonus ? state.prestigeBonus.sellValue : 0);
    const collectionSellBonus = 1 + getCollectionSellBonus();
    const sellValue = Math.floor(itemBase.baseValue * multiplier * vipBonus * prestigeSellBonus * collectionSellBonus);

    const droppedItem = {
        ...itemBase,
        sellValue: sellValue,
        obtainedAt: new Date().getTime()
    };

    // Add to inventory (stack if existing)
    addToInventory(droppedItem);

    // Add XP (with prestige + collection bonus)
    const xpGainBase = isPremium ? 25 : 10;
    const xpPrestigeBonus = 1 + (state.prestigeBonus ? state.prestigeBonus.xp : 0);
    const xpColBonus = 1 + getCollectionXpBonus();
    const xpGained = Math.floor(xpGainBase * xpPrestigeBonus * xpColBonus);
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

    // === NEW SYSTEMS INTEGRATION ===
    // 1. Update Luck Streak
    updateLuckStreak(rarity);

    // 2. Update Collection tracker (first discovery detection)
    const isNewDisc = updateCollection(droppedItem);
    if (isNewDisc) announceFirstDiscovery(droppedItem);

    // 3. Track blocks since last legendary (for SECRET_VOID condition)
    if (['Legendary', 'Mythic', 'Omnisciente'].includes(rarity)) {
        state.blocksSinceLastLegendary = 0;
    } else {
        state.blocksSinceLastLegendary = (state.blocksSinceLastLegendary || 0) + 1;
    }

    // 4. Check secret item unlock conditions
    checkSecretConditions();

    // 5. Announce important drops via Global Feed
    if (typeof announceGlobalFeed === 'function') {
        announceGlobalFeed(droppedItem);
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
    if ((state.autoClickerLevel > 0 || ownerAutoSpeedOverride) && state.autoClickerEnabled) {
        const intervals = [0, 10000, 8000, 6000, 4000, 2000];
        const ms = ownerAutoSpeedOverride || intervals[state.autoClickerLevel] || 2000;
        autoClickerIntervalId = setInterval(() => {
            if (state.coins >= 50 || state.role === 'OWNER') {
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

    const blockImg = document.getElementById('luckyBlockImg');
    if (blockImg) {
        blockImg.src = getSkinImage(skinId);
    }

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
                            <div class="mission-progress-bar-fill" style="width: ${((vipBlocks / 50 + vipCoins / 5000 + vipLevel / 5) / 3) * 100}%;"></div>
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
                            <div class="mission-progress-bar-fill" style="width: ${((adminBlocks / 250 + adminLegs / 1 + adminLevel / 15) / 3) * 100}%; background: linear-gradient(90deg, #ff0055, #f1c40f);"></div>
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

window.claimMissionReward = function (missionId, isWeekly) {
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

window.claimRoleFromMission = function (role) {
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

    // Live Mod HUD Telemetry Dashboard
    const modLvlEl = document.getElementById('modDashLevel');
    const modCoinsEl = document.getElementById('modDashCoins');
    const modSpooferEl = document.getElementById('modDashSpoofer');
    const modSpeedEl = document.getElementById('modDashSpeed');
    if (modLvlEl) modLvlEl.textContent = `Nivel ${state.level.toLocaleString()}`;
    if (modCoinsEl) modCoinsEl.textContent = `${state.coins.toLocaleString()} 💰`;
    if (modSpooferEl) modSpooferEl.textContent = ownerDropSpoofer === 'OFF' ? 'OFF (Normal)' : `100% ${ownerDropSpoofer}`;
    if (modSpeedEl) modSpeedEl.textContent = `${ownerAutoSpeedOverride || 2000}ms`;

    // Pity Bar
    document.getElementById('pityText').textContent = `${state.pityCounter} / 100`;
    document.getElementById('pityBarFill').style.width = `${Math.min(100, state.pityCounter)}%`;

    // Lucky Cube Skin & Image
    const cube = document.getElementById('luckyCube');
    if (cube) cube.setAttribute('data-skin', state.selectedSkin);

    const blockImg = document.getElementById('luckyBlockImg');
    if (blockImg) {
        blockImg.src = getSkinImage(state.selectedSkin);
    }

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

    // New mechanics
    if (typeof renderCollection === 'function') renderCollection();
    if (typeof renderLuckStreak === 'function') renderLuckStreak();
    if (typeof renderEventBanner === 'function') renderEventBanner();
    if (typeof renderPrestige === 'function') renderPrestige();
    // Battle tab — keep aura summary fresh when it's visible
    if (typeof renderAuraSummaryBar === 'function' &&
        document.getElementById('tab-battle')?.classList.contains('active')) {
        renderAuraSummaryBar();
    }
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

    document.getElementById('revealEmoji').innerHTML = getItemIcon(item);
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
                    <div class="item-card-emoji">${getItemIcon(item)}</div>
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
                        <div class="custom-preview-box">${skin.image ? `<img src="${skin.image}" style="width: 50px; height: 50px; object-fit: contain;">` : skin.icon}</div>
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

function renderCollection() {
    const grid = document.getElementById('collectionGrid');
    if (!grid) return;

    let html = '';
    let discovered = 0;

    // Sort logic to match inventory: rarity -> value
    const sortedTable = [...LOOT_TABLE, ...SECRET_ITEMS].sort((a, b) => {
        const rarities = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Mythic', 'Omnisciente', 'Secret'];
        return rarities.indexOf(a.rarity) - rarities.indexOf(b.rarity);
    });

    sortedTable.forEach(item => {
        const disc = state.collection[item.id];
        if (disc) discovered++;

        const isSecret = item.rarity === 'Secret' || SECRET_ITEMS.some(s => s.id === item.id);
        if (isSecret && !disc) return; // Hide undiscovered secrets entirely

        if (disc) {
            html += `
                <div class="item-card rarity-${item.rarity.toLowerCase()}">
                    <div class="item-emoji-large" style="display:flex; justify-content:center; align-items:center; height:60px;">${getItemIcon(item)}</div>
                    <div class="item-name">${item.name}</div>
                    <div class="item-rarity-tag">${item.rarity}</div>
                    <div class="item-value" style="font-size: 0.75rem;">Obtenidos: ${disc.totalCount}</div>
                </div>
            `;
        } else {
            html += `
                <div class="item-card" style="opacity: 0.5; filter: grayscale(1);">
                    <div class="item-emoji-large" style="display:flex; justify-content:center; align-items:center; height:60px;">❓</div>
                    <div class="item-name">Desconocido</div>
                    <div class="item-rarity-tag">${item.rarity}</div>
                    <div class="item-value" style="font-size: 0.75rem;">Sigue buscando...</div>
                </div>
            `;
        }
    });

    grid.innerHTML = html;

    const maxItems = LOOT_TABLE.length + SECRET_ITEMS.length;
    const progressEl = document.getElementById('collectionProgress');
    if (progressEl) progressEl.textContent = `${discovered} / ${maxItems}`;

    const luckEl = document.getElementById('collectionBonusLuck');
    if (luckEl) luckEl.textContent = `+${Math.floor(getCollectionLuckBonus() * 100)}%`;

    const sellEl = document.getElementById('collectionBonusSell');
    if (sellEl) sellEl.textContent = `+${Math.floor(getCollectionSellBonus() * 100)}%`;

    const xpBonusEl = document.getElementById('collectionBonusXp');
    if (xpBonusEl) xpBonusEl.textContent = `+${Math.floor(getCollectionXpBonus() * 100)}%`;
}

function renderLuckStreak() {
    const elCount = document.getElementById('streakCount');
    const elMult = document.getElementById('streakMultiplier');
    if (elCount) elCount.textContent = state.luckStreak;
    if (elMult) elMult.textContent = CONFIG.LUCK_STREAK.getMultiplier(state.luckStreak).toFixed(2);
}

function renderEventBanner() {
    const banner = document.getElementById('eventBanner');
    if (!banner) return;

    if (state.activeEventId && Date.now() < state.activeEventExpiry) {
        const evt = CONFIG.EVENTS.find(e => e.id === state.activeEventId);
        if (evt) {
            banner.style.display = 'flex';
            document.getElementById('eventTitle').textContent = evt.name;
            document.getElementById('eventDesc').textContent = evt.desc;
        }
    } else {
        banner.style.display = 'none';
    }
}

function renderPrestige() {
    const pLvlEl = document.getElementById('prestigeLevelLabel');
    const pBonusEl = document.getElementById('prestigeBonusesLabel');
    const btn = document.getElementById('btnPrestige');

    if (pLvlEl) pLvlEl.textContent = state.prestige;
    if (pBonusEl) {
        const bonus = (state.prestigeBonus?.luck || 0) * 100;
        pBonusEl.textContent = `+${Math.floor(bonus)}% Multiplicador`;
    }
    if (btn) {
        if (state.level >= CONFIG.PRESTIGE.requiredLevel && state.prestige < CONFIG.PRESTIGE.maxPrestige) {
            btn.disabled = false;
            btn.textContent = `HACER PRESTIGIO (Renacer)`;
        } else if (state.prestige >= CONFIG.PRESTIGE.maxPrestige) {
            btn.disabled = true;
            btn.textContent = 'PRESTIGIO MÁXIMO ALCANZADO';
        } else {
            btn.disabled = true;
            btn.textContent = `HACER PRESTIGIO (Requiere Niv ${CONFIG.PRESTIGE.requiredLevel})`;
        }
    }
}

function announceGlobalFeed(data) {
    const feed = document.getElementById('globalFeed');
    if (!feed) return;

    const item = document.createElement('div');
    const r = (data.rarity || 'Common').toLowerCase();
    item.style = `display: flex; gap: 0.5rem; align-items: center; padding: 0.5rem; border-radius: var(--radius-sm); border: 1px solid var(--rarity-${r}); background: rgba(0,0,0,0.4);`;

    item.innerHTML = `
        <span style="font-size: 1.2rem;">${data.emoji || '🎁'}</span>
        <div>
            <div style="font-weight: 700; color: var(--rarity-${r});">${data.name}</div>
            <div style="font-size: 0.75rem; color: var(--text-muted);">${data.username ? `Por ${data.username}` : 'Sistema'}</div>
        </div>
    `;

    feed.prepend(item);

    while (feed.children.length > 20) {
        feed.removeChild(feed.lastChild);
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
    document.getElementById('omniOverlayEmoji').innerHTML = getItemIcon(item);
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

    // Risk It
    const btnRiskIt = document.getElementById('btnRiskIt');
    if (btnRiskIt) {
        btnRiskIt.addEventListener('click', doRiskIt);
    }

    // Prestige
    const btnPrestige = document.getElementById('btnPrestige');
    if (btnPrestige) {
        btnPrestige.addEventListener('click', doPrestige);
    }

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

    /* ==========================================================================
       👑 CYBERPUNK OWNER MOD MENU TRAINER v3.0 LOGIC
       ========================================================================== */

    // Populate Mod Menu Selects
    function populateModItemSelects() {
        const spawnerSelect = document.getElementById('modItemSpawnerSelect');
        const fakeDropSelect = document.getElementById('modFakeDropSelect');
        if (!spawnerSelect) return;

        spawnerSelect.innerHTML = '';
        if (fakeDropSelect) fakeDropSelect.innerHTML = '';

        LOOT_TABLE.forEach((item) => {
            const opt = document.createElement('option');
            opt.value = item.id;
            opt.textContent = `${item.emoji} ${item.name} (${item.rarity})`;
            spawnerSelect.appendChild(opt);

            if (fakeDropSelect) {
                const opt2 = document.createElement('option');
                opt2.value = item.name;
                opt2.textContent = `${item.emoji} ${item.name} (${item.rarity})`;
                fakeDropSelect.appendChild(opt2);
            }
        });
    }

    // Global Actions for Mod Menu
    window.addOwnerLevels = function (amount) {
        amount = parseInt(amount, 10) || 0;
        if (amount <= 0) return;
        state.level += amount;
        saveState();
        renderAll();
        showToast('⚡ MOD MENU: NIVELES', `+${amount.toLocaleString()} Niveles añadidos. Nivel actual: Nivel ${state.level.toLocaleString()}`, 'Omnisciente');
    };

    window.setOwnerLevel = function (targetLevel) {
        targetLevel = Math.max(1, parseInt(targetLevel, 10) || 1);
        state.level = targetLevel;
        saveState();
        renderAll();
        showToast('⚡ MOD MENU: NIVEL FIJADO', `Nivel del jugador fijado en: Nivel ${state.level.toLocaleString()}`, 'Omnisciente');
    };

    window.addOwnerCoins = function (amount) {
        amount = parseInt(amount, 10) || 0;
        if (amount <= 0) return;
        state.coins += amount;
        state.totalCoinsEarned += amount;
        saveState();
        renderAll();
        showToast('💰 MOD MENU: COINS', `+${amount.toLocaleString()} Coins agregadas. Saldo: ${state.coins.toLocaleString()} 💰`, 'Omnisciente');
    };

    window.setOwnerCoins = function (amount) {
        amount = Math.max(0, parseInt(amount, 10) || 0);
        state.coins = amount;
        saveState();
        renderAll();
        showToast('💰 MOD MENU: COINS', `Saldo de Coins fijado en: ${state.coins.toLocaleString()} 💰`, 'Omnisciente');
    };

    window.setOwnerSpeed = function (ms) {
        ownerAutoSpeedOverride = ms;
        state.autoClickerEnabled = true;
        state.autoClickerLevel = Math.max(1, state.autoClickerLevel);
        restartAutoClicker();
        showToast('🔥 MOD MENU: SPEED', `Velocidad de auto-apertura ajustada a ${ms}ms`, 'Omnisciente');
    };

    window.ownerInstantMultiOpen = function (count) {
        let omniCount = 0;
        for (let i = 0; i < count; i++) {
            const rarity = rollRarity(true);
            const itemBase = getRandomItemByRarity(rarity);
            const multiplier = 1 + (state.traderLevel * 0.10);
            const droppedItem = { ...itemBase, sellValue: Math.floor(itemBase.baseValue * multiplier), obtainedAt: Date.now() };
            addToInventory(droppedItem);
            state.blocksOpened += 1;
            if (rarity === 'Omnisciente') omniCount++;
        }
        state.stats.omniscienteCount += omniCount;
        saveState();
        renderAll();
        showToast(`🎁 BATCH OPEN ${count}x`, `¡${count} Cajas Premium abiertas en lote! (${omniCount} Omniscientes)`, 'Omnisciente');
    };

    // Preset Level Chips
    document.getElementById('chipLvl1')?.addEventListener('click', () => addOwnerLevels(1));
    document.getElementById('chipLvl5')?.addEventListener('click', () => addOwnerLevels(5));
    document.getElementById('chipLvl10')?.addEventListener('click', () => addOwnerLevels(10));
    document.getElementById('chipLvl50')?.addEventListener('click', () => addOwnerLevels(50));
    document.getElementById('chipLvl100')?.addEventListener('click', () => addOwnerLevels(100));
    document.getElementById('chipLvl1k')?.addEventListener('click', () => addOwnerLevels(1000));
    document.getElementById('chipLvl10k')?.addEventListener('click', () => addOwnerLevels(10000));
    document.getElementById('chipLvl100k')?.addEventListener('click', () => addOwnerLevels(100000));
    document.getElementById('floatLvl10')?.addEventListener('click', () => addOwnerLevels(10));
    document.getElementById('floatLvl1k')?.addEventListener('click', () => addOwnerLevels(1000));
    document.getElementById('floatLvl10k')?.addEventListener('click', () => addOwnerLevels(10000));

    // Custom Level Actions
    document.getElementById('btnApplyCustomAddLevels')?.addEventListener('click', () => {
        const val = document.getElementById('customLevelInput')?.value;
        addOwnerLevels(val);
    });
    document.getElementById('btnApplyCustomSetLevel')?.addEventListener('click', () => {
        const val = document.getElementById('customLevelInput')?.value;
        setOwnerLevel(val);
    });
    document.getElementById('btnMaxOutLevel')?.addEventListener('click', () => setOwnerLevel(999999));
    document.getElementById('btnResetLevel')?.addEventListener('click', () => setOwnerLevel(1));

    // Preset Coin Chips
    document.getElementById('chipCoin50k')?.addEventListener('click', () => addOwnerCoins(50000));
    document.getElementById('chipCoin500k')?.addEventListener('click', () => addOwnerCoins(500000));
    document.getElementById('chipCoin1m')?.addEventListener('click', () => addOwnerCoins(1000000));
    document.getElementById('chipCoin10m')?.addEventListener('click', () => addOwnerCoins(10000000));
    document.getElementById('chipCoin100m')?.addEventListener('click', () => addOwnerCoins(100000000));
    document.getElementById('chipCoin1b')?.addEventListener('click', () => addOwnerCoins(1000000000));
    document.getElementById('floatCoin1m')?.addEventListener('click', () => addOwnerCoins(1000000));
    document.getElementById('floatCoin100m')?.addEventListener('click', () => addOwnerCoins(100000000));

    // Custom Coin Actions
    document.getElementById('btnApplyCustomCoins')?.addEventListener('click', () => {
        const val = document.getElementById('customCoinInput')?.value;
        addOwnerCoins(val);
    });
    document.getElementById('btnApplySetCoins')?.addEventListener('click', () => {
        const val = document.getElementById('customCoinInput')?.value;
        setOwnerCoins(val);
    });
    document.getElementById('btnInfiniteCoins')?.addEventListener('click', () => setOwnerCoins(999999999999999));

    // Drop Spoofer Selectors
    const dropSelectEl = document.getElementById('modDropRarityOverride');
    const floatDropSelectEl = document.getElementById('floatingDropRarityOverride');
    if (dropSelectEl) {
        dropSelectEl.addEventListener('change', (e) => {
            ownerDropSpoofer = e.target.value;
            if (floatDropSelectEl) floatDropSelectEl.value = ownerDropSpoofer;
            showToast('🎯 DROP SPOOFER', ownerDropSpoofer === 'OFF' ? 'Spoofer Desactivado (RNG Normal)' : `Drop forzado a: 100% ${ownerDropSpoofer}`, 'Omnisciente');
        });
    }
    if (floatDropSelectEl) {
        floatDropSelectEl.addEventListener('change', (e) => {
            ownerDropSpoofer = e.target.value;
            if (dropSelectEl) dropSelectEl.value = ownerDropSpoofer;
            showToast('🎯 DROP SPOOFER', ownerDropSpoofer === 'OFF' ? 'Spoofer Desactivado (RNG Normal)' : `Drop forzado a: 100% ${ownerDropSpoofer}`, 'Omnisciente');
        });
    }

    // Direct Item Spawner
    document.getElementById('btnSpawnSelectedItem')?.addEventListener('click', () => {
        const itemId = document.getElementById('modItemSpawnerSelect')?.value;
        const qty = Math.max(1, parseInt(document.getElementById('modItemSpawnQty')?.value, 10) || 1);
        const targetItem = LOOT_TABLE.find(i => i.id === itemId) || LOOT_TABLE[0];

        for (let i = 0; i < qty; i++) {
            const multiplier = 1 + (state.traderLevel * 0.10);
            const itemCopy = { ...targetItem, sellValue: Math.floor(targetItem.baseValue * multiplier), obtainedAt: Date.now() };
            addToInventory(itemCopy);
        }
        saveState();
        renderAll();
        showToast('🎁 ITEM SPAWNER', `+${qty}x ${targetItem.name} generado(s) en tu inventario`, 'Omnisciente');
    });

    // Quick Pity & Omni Item
    document.getElementById('btnOwnerOmniItem')?.addEventListener('click', () => {
        const omniItem = LOOT_TABLE.find(i => i.rarity === 'Omnisciente') || LOOT_TABLE[LOOT_TABLE.length - 1];
        const multiplier = 1 + (state.traderLevel * 0.10);
        const item = { ...omniItem, sellValue: Math.floor(omniItem.baseValue * multiplier), obtainedAt: Date.now() };
        addToInventory(item);
        state.stats.omniscienteCount += 1;
        sounds.playOmni();
        triggerOmniOverlay(item);
        saveState();
        renderAll();
    });

    document.getElementById('btnOwnerMaxPity')?.addEventListener('click', () => {
        state.pityCounter = 100;
        saveState();
        renderAll();
        showToast('🛡️ MOD MENU', 'Barra de Pity cargada al 100%', 'Legendary');
    });

    // Speed & Batch open buttons
    document.getElementById('btnSpeed500')?.addEventListener('click', () => setOwnerSpeed(500));
    document.getElementById('btnSpeed250')?.addEventListener('click', () => setOwnerSpeed(250));
    document.getElementById('btnSpeed100')?.addEventListener('click', () => setOwnerSpeed(100));
    document.getElementById('btnSpeed50')?.addEventListener('click', () => setOwnerSpeed(50));

    document.getElementById('btnBatchOpen10')?.addEventListener('click', () => ownerInstantMultiOpen(10));
    document.getElementById('btnBatchOpen50')?.addEventListener('click', () => ownerInstantMultiOpen(50));
    document.getElementById('btnBatchOpen100')?.addEventListener('click', () => ownerInstantMultiOpen(100));
    document.getElementById('floatBatchOpen10')?.addEventListener('click', () => ownerInstantMultiOpen(10));

    // Upgrades & Unlock All & God mode
    document.getElementById('btnOwnerMaxUpgrades')?.addEventListener('click', () => {
        state.luckLevel = 10;
        state.traderLevel = 10;
        state.autoClickerLevel = 5;
        state.autoClickerEnabled = true;
        restartAutoClicker();
        saveState();
        renderAll();
        showToast('🚀 MOD MENU', 'Todas las mejoras al MÁXIMO', 'Omnisciente');
    });

    document.getElementById('btnOwnerUnlockAll')?.addEventListener('click', () => {
        state.unlockedSkins = SKINS_DATA.map(s => s.id);
        state.unlockedThemes = THEMES_DATA.map(t => t.id);
        saveState();
        renderAll();
        showToast('🔓 MOD MENU', 'Skins y Temas desbloqueados al 100%', 'Omnisciente');
    });

    const triggerGodMode = () => {
        state.coins += 10000000;
        state.luckLevel = 10;
        state.traderLevel = 10;
        state.autoClickerLevel = 5;
        state.autoClickerEnabled = true;
        state.unlockedSkins = SKINS_DATA.map(s => s.id);
        state.unlockedThemes = THEMES_DATA.map(t => t.id);

        ownerAutoSpeedOverride = 100;
        restartAutoClicker();
        saveState();
        renderAll();
        showToast('🔥 MODO DIOS COMPLETO', 'Super Speed (100ms) + 10 Millones Coins + Skins + Mejoras', 'Omnisciente');
    };

    document.getElementById('btnOwnerGodMode')?.addEventListener('click', triggerGodMode);
    document.getElementById('floatGodMode')?.addEventListener('click', triggerGodMode);

    // ==========================================
    // NUEVAS MECÁNICAS — OWNER CONTROLS
    // ==========================================

    // Risk It Admin
    document.getElementById('btnApplyRiskItForce')?.addEventListener('click', () => {
        const val = document.getElementById('modRiskItForceResult')?.value;
        if (val) {
            window.ownerForcedRiskItOutcome = val; // We'll handle this global var in `doRiskIt` or just let it exist for future implementation
            showToast('🎲 RISK IT OVERRIDE', `Resultado forzado a: ${val}`, 'Legendary');
        }
    });

    document.getElementById('btnOwnerForcedRiskIt')?.addEventListener('click', () => {
        if (!lastRevealedItem) return showToast('⚠️ Error', 'Abre un bloque primero', 'Common');
        // Simple instant sim
        doRiskIt();
    });

    // Prestige Admin
    const forcePrestige = () => {
        state.prestige = (state.prestige || 0) + 1;
        state.level = 1;
        state.coins = 0;
        state.xp = 0;
        state.luckLevel = 1;
        state.traderLevel = 1;
        state.autoClickerLevel = 0;
        state.autoClickerEnabled = false;
        state.inventory = state.inventory.filter(i => i.rarity === 'Secret' || CONFIG.PRESTIGE.keep.includes(i.id));
        state.prestigeBonus = CONFIG.PRESTIGE.getBonuses(state.prestige);
        saveState();
        renderAll();
        showToast('🌀 PRESTIGIO FORZADO', `Has renacido por la fuerza (Niv ${state.prestige})`, 'Omnisciente');
    };
    document.getElementById('btnOwnerForcePrestige')?.addEventListener('click', forcePrestige);
    document.getElementById('floatForcePrestige')?.addEventListener('click', forcePrestige);

    document.getElementById('btnOwnerResetPrestige')?.addEventListener('click', () => {
        state.prestige = 0;
        state.prestigeBonus = null;
        saveState();
        renderAll();
        showToast('🌀 PRESTIGIO RESET', 'Nivel de prestigio reiniciado a 0', 'Legendary');
    });

    // Eventos Admin
    const forceEvent = (eventId) => {
        const evt = CONFIG.EVENTS.find(e => e.id === eventId);
        if (!evt) return;
        state.activeEventId = evt.id;
        state.activeEventExpiry = Date.now() + (evt.duration * 1000);

        if (evt.effect.type === 'coinsAll') {
            state.coins += evt.effect.value;
            state.totalCoinsEarned += evt.effect.value;
        } else if (evt.effect.type === 'freeBlocks') {
            for (let i = 0; i < evt.effect.value; i++) openLuckyBlock(false);
        }

        saveState();
        renderAll();
        showToast('⭐ EVENTO FORZADO', evt.name, 'Legendary');
        if (typeof socket !== 'undefined' && socket && socket.connected) {
            socket.emit('chat:send', { text: `📢 ¡EL OWNER HA INICIADO EL EVENTO: ${evt.name}!` });
        }
    };

    document.getElementById('ownerEvtLuckyHour')?.addEventListener('click', () => forceEvent('lucky_hour'));
    document.getElementById('ownerEvtGoldenRain')?.addEventListener('click', () => forceEvent('golden_rain'));
    document.getElementById('ownerEvtCursedHour')?.addEventListener('click', () => forceEvent('cursed_hour'));
    document.getElementById('ownerEvtBlockRain')?.addEventListener('click', () => forceEvent('block_rain'));

    document.getElementById('floatEvtLucky')?.addEventListener('click', () => forceEvent('lucky_hour'));
    document.getElementById('floatEvtGolden')?.addEventListener('click', () => forceEvent('golden_rain'));
    document.getElementById('floatEvtCursed')?.addEventListener('click', () => forceEvent('cursed_hour'));
    document.getElementById('floatEvtBlocks')?.addEventListener('click', () => forceEvent('block_rain'));

    const clearEvent = () => {
        state.activeEventId = null;
        state.activeEventExpiry = 0;
        saveState();
        renderAll();
        showToast('❌ EVENTO CANCELADO', 'Se ha limpiado el evento activo', 'Common');
    };
    document.getElementById('btnOwnerClearEvent')?.addEventListener('click', clearEvent);
    document.getElementById('floatClearEvent')?.addEventListener('click', clearEvent);

    // Secretos Admin
    const unlockSecret = (secretId) => {
        const s = SECRET_ITEMS.find(i => i.id === secretId);
        if (!s) return;
        const droppedItem = { ...s, sellValue: s.baseValue, obtainedAt: Date.now() };
        addToInventory(droppedItem);
        state.collection[secretId] = { firstObtained: Date.now(), totalCount: 1 };
        saveState();
        renderAll();
        showToast(`👁️ SECRETO FORZADO`, `Has añadido ${s.name} al inventario`, 'Secret');
    };

    document.getElementById('ownerUnlockNull')?.addEventListener('click', () => unlockSecret('s1'));
    document.getElementById('ownerUnlockVoid')?.addEventListener('click', () => unlockSecret('s2'));
    document.getElementById('ownerUnlockCosmicGod')?.addEventListener('click', () => unlockSecret('s3'));

    const unlockAllSecrets = () => {
        SECRET_ITEMS.forEach(s => {
            const droppedItem = { ...s, sellValue: s.baseValue, obtainedAt: Date.now() };
            addToInventory(droppedItem);
            state.collection[s.id] = { firstObtained: Date.now(), totalCount: 1 };
        });
        saveState();
        renderAll();
        showToast('👁️ SECRETOS DESBLOQUEADOS', 'Todos los ítems secretos añadidos', 'Secret');
    };
    document.getElementById('btnOwnerUnlockAllSecrets')?.addEventListener('click', unlockAllSecrets);
    document.getElementById('floatUnlockAllSecrets')?.addEventListener('click', unlockAllSecrets);

    // Battles Admin
    const forceBattleWin = () => {
        if (!state.activeBattleId) return showToast('⚠️ Sin Batalla', 'No hay batalla activa', 'Common');
        socket.emit('battle:update_score', { battleId: state.activeBattleId, points: 9999999 });
        showToast('⚔️ BATALLA HACKEADA', '+9,999,999 puntos añadidos', 'Legendary');
    };
    document.getElementById('btnOwnerBattleWin')?.addEventListener('click', forceBattleWin);
    document.getElementById('floatBattleWin')?.addEventListener('click', forceBattleWin);

    document.getElementById('btnOwnerResetBattleCooldown')?.addEventListener('click', () => {
        // Implement if we added client-side cooldowns
        showToast('🔄 BATALLA', 'Cooldown reiniciado', 'Common');
    });

    // Streak Admin
    const setStreak = (val) => {
        state.luckStreak = Math.max(0, parseInt(val) || 0);
        saveState();
        renderAll();
        showToast('🔥 RACHA MODIFICADA', `Racha actual: ${state.luckStreak}`, 'Rare');
    };

    document.getElementById('btnOwnerSetStreak')?.addEventListener('click', () => {
        setStreak(document.getElementById('ownerStreakSetVal')?.value);
    });
    document.getElementById('floatSetStreak')?.addEventListener('click', () => {
        setStreak(document.getElementById('floatStreakVal')?.value);
    });

    document.getElementById('btnOwnerResetStreak')?.addEventListener('click', () => setStreak(0));

    // ==========================================
    // FLOATING MOD MENU TABS
    // ==========================================
    const floatTabs = ['Basic', 'Mech', 'Event'];
    floatTabs.forEach(t => {
        document.getElementById(`floatTab${t}`)?.addEventListener('click', (e) => {
            floatTabs.forEach(tb => {
                document.getElementById(`floatTab${tb}`)?.classList.remove('active');
                const panel = document.getElementById(`floatPanel${tb}`);
                if (panel) panel.style.display = 'none';
            });
            e.target.classList.add('active');
            const p = document.getElementById(`floatPanel${t}`);
            if (p) p.style.display = 'block';
        });
    });

    // Server & Broadcast
    document.getElementById('btnSendServerBroadcast')?.addEventListener('click', () => {
        const msgInput = document.getElementById('modBroadcastInput');
        const msg = msgInput?.value?.trim();
        if (!msg) return;
        socket.emit('chat:send', { text: `📢 [ANUNCIO OWNER]: ${msg}` });
        msgInput.value = '';
        showToast('📢 ANUNCIO ENVIADO', 'Mensaje emitido a todos los jugadores en línea.', 'Omnisciente');
    });

    document.getElementById('btnSendFakeDrop')?.addEventListener('click', () => {
        const user = document.getElementById('modFakeDropUser')?.value || 'Jugador';
        const itemName = document.getElementById('modFakeDropSelect')?.value || 'Nébula Viviente';
        socket.emit('chat:send', { text: `✨ ¡ENHORABUENA! ${user} ha obtenido ${itemName} [Omnisciente] de una Lucky Box!` });
        showToast('🔮 DROP SIMULADO', `Simulación transmitida al chat global.`, 'Omnisciente');
    });

    document.getElementById('btnGiftCoinsPlayer')?.addEventListener('click', () => {
        const targetSocketId = document.getElementById('modOnlinePlayersSelect')?.value;
        if (!targetSocketId) {
            showToast('⚠️ REGALO CANCELADO', 'Selecciona un jugador en línea primero.', 'Common');
            return;
        }
        socket.emit('chat:send', { text: `🎁 El Owner ha regalado +1,000,000 Coins!` });
        showToast('🎁 REGALO ENVIADO', 'Recompensa enviada al jugador.', 'Omnisciente');
    });

    document.getElementById('btnGiftLevelsPlayer')?.addEventListener('click', () => {
        const targetSocketId = document.getElementById('modOnlinePlayersSelect')?.value;
        if (!targetSocketId) {
            showToast('⚠️ REGALO CANCELADO', 'Selecciona un jugador en línea primero.', 'Common');
            return;
        }
        socket.emit('chat:send', { text: `⚡ El Owner ha regalado +100 Niveles!` });
        showToast('🎁 REGALO ENVIADO', 'Niveles regalados al jugador.', 'Omnisciente');
    });

    // Stepper controls
    document.getElementById('btnStepDecLvl')?.addEventListener('click', () => {
        const input = document.getElementById('customLevelInput');
        if (input) input.value = Math.max(1, (parseInt(input.value, 10) || 1000) - 100);
    });
    document.getElementById('btnStepIncLvl')?.addEventListener('click', () => {
        const input = document.getElementById('customLevelInput');
        if (input) input.value = (parseInt(input.value, 10) || 1000) + 100;
    });

    // Interactive Spoofer Cards Selection
    document.querySelectorAll('.spoofer-card').forEach(card => {
        card.addEventListener('click', () => {
            document.querySelectorAll('.spoofer-card').forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            const mode = card.getAttribute('data-spoofer');
            ownerDropSpoofer = mode;
            const selectEl = document.getElementById('modDropRarityOverride');
            if (selectEl) selectEl.value = mode;
            showToast('🎯 DROP SPOOFER', mode === 'OFF' ? 'Spoofer Desactivado (RNG Normal)' : `Drop forzado a: 100% ${mode}`, 'Omnisciente');
            renderAll();
        });
    });

    // Speed Dial Visual Toggles
    document.querySelectorAll('.speed-dial-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.speed-dial-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Mod Menu Sidebar Rail Tab Switching logic
    document.querySelectorAll('.mod-rail-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.mod-rail-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.mod-tab-content').forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            const tabKey = btn.getAttribute('data-mod-tab');
            const targetId = 'modTab' + tabKey.charAt(0).toUpperCase() + tabKey.slice(1);
            const targetEl = document.getElementById(targetId);
            if (targetEl) targetEl.classList.add('active');
        });
    });

    // Pop-out Floating Window logic
    const floatingMenu = document.getElementById('floatingModMenu');
    document.getElementById('btnToggleFloatingModMenu')?.addEventListener('click', () => {
        if (floatingMenu) {
            floatingMenu.style.display = floatingMenu.style.display === 'none' ? 'block' : 'none';
        }
    });
    document.getElementById('btnCloseFloatingMod')?.addEventListener('click', () => {
        if (floatingMenu) floatingMenu.style.display = 'none';
    });
    document.getElementById('btnMinimizeFloatingMod')?.addEventListener('click', () => {
        const content = document.getElementById('floatingModContent');
        if (content) {
            content.style.display = content.style.display === 'none' ? 'flex' : 'none';
        }
    });

    // Draggable Floating Mod Menu
    (() => {
        const header = document.getElementById('floatingModHeader');
        if (!floatingMenu || !header) return;

        let isDragging = false;
        let offsetX = 0, offsetY = 0;

        header.addEventListener('mousedown', (e) => {
            if (e.target.classList.contains('btn-float-control')) return;
            isDragging = true;
            offsetX = e.clientX - floatingMenu.offsetLeft;
            offsetY = e.clientY - floatingMenu.offsetTop;
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            floatingMenu.style.left = (e.clientX - offsetX) + 'px';
            floatingMenu.style.top = (e.clientY - offsetY) + 'px';
            floatingMenu.style.right = 'auto';
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });
    })();

    // Populate Mod Menu Selects
    populateModItemSelects();

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
            // Also refresh PVP battle grid if visible
            const pvpGrid = document.getElementById('pvpOnlinePlayersGrid');
            if (pvpGrid) {
                const cards = players.map(p => buildPvpPlayerCard(p)).filter(Boolean).join('');
                pvpGrid.innerHTML = cards || `<p style="text-align:center; color:var(--text-dim); padding:2rem;">No hay jugadores disponibles en este momento.</p>`;
            }
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
            if (typeof announceGlobalFeed === 'function') {
                announceGlobalFeed({
                    name: data.itemName,
                    rarity: data.rarity,
                    emoji: data.emoji,
                    username: data.username
                });
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

        // ==========================================
        // EVENTS
        // ==========================================
        socket.on('event:start', (evt) => {
            state.activeEventId = evt.id;
            state.activeEventExpiry = evt.expiry;
            showToast(`⭐ EVENTO GLOBAL: ${evt.name}`, evt.desc, 'Mythic');
            sounds.playOmni();
            renderAll();
        });

        // ==========================================
        // LUCK BATTLES
        // ==========================================
        socket.on('battle:incoming_invite', (data) => {
            const accept = confirm(`⚔️ ${data.senderName} te ha desafiado a una Luck Battle por ${data.bet} Coins! ¿Aceptas?`);
            socket.emit('battle:respond', { accept, senderSocketId: data.senderSocketId });
        });

        socket.on('battle:start', (data) => {
            state.activeBattleId = data.battleId;
            document.getElementById('activeBattlePanel').style.display = 'block';
            document.getElementById('btnInviteBattle').disabled = true;
            document.getElementById('battleMyScore').textContent = '0 pts';
            document.getElementById('battleRivalScore').textContent = '0 pts';
            document.getElementById('battleTimer').textContent = '30s';
            sounds.playOmni();
            showToast('⚔️ BATALLA INICIADA', `Te enfrentas a ${data.rivalName}. ¡Abre bloques GRATIS rápido!`, 'Legendary');
        });

        socket.on('battle:score_update', (data) => {
            document.getElementById('battleMyScore').textContent = `${data.p1Score} pts`;
            document.getElementById('battleRivalScore').textContent = `${data.p2Score} pts`;
        });

        socket.on('battle:end', (data) => {
            state.activeBattleId = null;
            document.getElementById('activeBattlePanel').style.display = 'none';
            document.getElementById('btnInviteBattle').disabled = false;

            const amIWinner = data.winnerId === socket.id;
            const isTie = data.winnerId === null;

            if (isTie) {
                showToast('⚔️ EMPATE', 'La batalla ha terminado en empate.', 'Common');
            } else if (amIWinner) {
                state.coins += 10000;
                sounds.playOmni();
                showToast('🏆 ¡HAS GANADO LA BATALLA!', '+10,000 Coins', 'Legendary');
                saveState();
                renderAll();
            } else {
                sounds.playError();
                showToast('💀 HAS PERDIDO LA BATALLA', 'El rival fue más rápido y afortunado.', 'Common');
            }
        });

        socket.on('battle:error', (data) => {
            showToast('⚠️ Error de Batalla', data.message, 'Common');
        });

        // Hook Aura PVP socket events (after socket is established)
        hookAuraSocketEvents();

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
        drawerList.innerHTML = '<span style="font-size: 0.8rem; color: var(--text-dim); padding: 0.5rem; text-align: center; width: 100%;">Tu inventario está vacío. Abre Lucky Blocks para conseguir ítems.</span>';
        return;
    }

    drawerList.innerHTML = state.inventory.map(item => {
        // Count how many of this item are already placed in my 4 slots (by id or name)
        const placedCount = (currentTradeSession.mySlots || []).filter(s => (s.id && s.id === item.id) || s.name === item.name).length;
        const remaining = (item.count || 1) - placedCount;
        const canAdd = remaining > 0 && currentTradeSession.mySlots.length < 4;

        return `
                    <div class="adoptme-inv-item ${canAdd ? '' : 'disabled'}" data-item-id="${item.id || ''}" data-item-name="${item.name.replace(/"/g, '&quot;')}">
                        <span style="font-size: 1.8rem;">${item.emoji}</span>
                        <span style="font-family: var(--font-heading); font-size: 0.75rem; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; width: 100%; text-align: center;">${item.name}</span>
                        <span style="font-size: 0.65rem; color: var(--rarity-${item.rarity.toLowerCase()}); font-weight: 800;">${item.rarity}</span>
                        <span style="font-size: 0.7rem; color: #f1c40f;">x${remaining}</span>
                    </div>
                `;
    }).join('');
}

// Attach event delegation for drawer item clicks
document.getElementById('adoptMeInvList')?.addEventListener('click', (e) => {
    const invItem = e.target.closest('.adoptme-inv-item');
    if (!invItem) return;

    if (invItem.classList.contains('disabled')) {
        if (currentTradeSession && currentTradeSession.mySlots.length >= 4) {
            showToast('⚠️ Límite Alcanzado', 'Ya has alcanzado el máximo de 4 slots de intercambio.', 'Common');
        }
        return;
    }

    const itemId = invItem.getAttribute('data-item-id');
    const itemName = invItem.getAttribute('data-item-name');
    addAdoptMeSlot(itemId, itemName);
});

window.addAdoptMeSlot = function (itemId, itemName) {
    if (!currentTradeSession) return;
    if (currentTradeSession.mySlots.length >= 4) {
        showToast('⚠️ Límite de Slots', 'Solo puedes añadir un máximo de 4 ítems (Estilo Adopt Me).', 'Common');
        return;
    }

    const item = state.inventory.find(i => (itemId && i.id === itemId) || (itemName && i.name === itemName));
    if (!item) {
        showToast('⚠️ Error de Ítem', 'No se encontró el ítem en tu inventario.', 'Common');
        return;
    }

    const placedCount = currentTradeSession.mySlots.filter(s => (s.id && s.id === item.id) || s.name === item.name).length;
    const availableCount = item.count || 1;
    if (placedCount >= availableCount) {
        showToast('⚠️ Sin copias disponibles', 'Ya has puesto todas tus copias de este ítem.', 'Common');
        return;
    }

    sounds.playClick();
    currentTradeSession.mySlots.push({ ...item });
    currentTradeSession.myAccepted = false; // Reset acceptance on modification

    // Sync with server
    if (socket && socket.connected) {
        socket.emit('trade:update_slots', {
            tradeId: currentTradeSession.tradeId,
            slots: currentTradeSession.mySlots
        });
    }

    renderAdoptMeTrade();
};

window.removeAdoptMeSlot = function (slotIndex) {
    if (!currentTradeSession || !currentTradeSession.mySlots[slotIndex]) return;

    sounds.playClick();
    currentTradeSession.mySlots.splice(slotIndex, 1);
    currentTradeSession.myAccepted = false;

    // Sync with server
    if (socket && socket.connected) {
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

/* ==========================================================================
   ☁️ AUTHENTICATION & CLOUD SAVE SYSTEM
   ========================================================================== */
function getBackendUrl() {
    return `${window.location.protocol}//${window.location.hostname}:3000`;
}

async function sendCloudSave() {
    if (!currentAuthUser || !currentAuthUser.username || !currentAuthUser.token) return false;
    try {
        const backendUrl = getBackendUrl();
        const response = await fetch(`${backendUrl}/api/save`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: currentAuthUser.username,
                token: currentAuthUser.token,
                gameState: state
            })
        });
        const data = await response.json();
        return data.success;
    } catch (e) {
        console.error("Error al guardar en la nube:", e);
        return false;
    }
}

function initAuthSystem() {
    const modal = document.getElementById('authModal');
    const btnOpen = document.getElementById('btnOpenAuthModal');
    const btnClose = document.getElementById('btnCloseAuthModal');
    const accountBtnText = document.getElementById('accountBtnText');
    const loggedInView = document.getElementById('authLoggedInView');
    const loggedOutView = document.getElementById('authLoggedOutView');
    const tabLogin = document.getElementById('tabAuthLogin');
    const tabRegister = document.getElementById('tabAuthRegister');
    const btnSubmit = document.getElementById('btnAuthSubmit');
    const msgBox = document.getElementById('authMsgBox');
    const accountUsername = document.getElementById('accountUsername');
    const accountAvatar = document.getElementById('accountAvatar');
    const btnSaveNow = document.getElementById('btnManualCloudSave');
    const btnLogout = document.getElementById('btnLogoutAccount');
    const inputUser = document.getElementById('authInputUser');
    const inputPass = document.getElementById('authInputPass');

    let isRegisterMode = false;

    // Check existing saved auth session
    try {
        const savedAuth = localStorage.getItem(AUTH_KEY);
        if (savedAuth) {
            currentAuthUser = JSON.parse(savedAuth);
            updateAuthUIState();
        }
    } catch (e) {
        console.warn("Error leyendo sesión de autenticación:", e);
    }

    // Modal controls
    if (btnOpen) btnOpen.addEventListener('click', () => modal.classList.add('active'));
    if (btnClose) btnClose.addEventListener('click', () => modal.classList.remove('active'));

    // Tab switching
    if (tabLogin) {
        tabLogin.addEventListener('click', () => {
            isRegisterMode = false;
            tabLogin.classList.add('active');
            tabRegister.classList.remove('active');
            btnSubmit.textContent = '🔑 INICIAR SESIÓN';
            hideAuthMsg();
        });
    }

    if (tabRegister) {
        tabRegister.addEventListener('click', () => {
            isRegisterMode = true;
            tabRegister.classList.add('active');
            tabLogin.classList.remove('active');
            btnSubmit.textContent = '✨ CREAR CUENTA Y GUARDAR';
            hideAuthMsg();
        });
    }

    function showAuthMsg(msg, isError = true) {
        if (!msgBox) return;
        msgBox.textContent = msg;
        msgBox.className = 'auth-message-box ' + (isError ? 'error' : 'success');
        msgBox.style.display = 'block';
    }

    function hideAuthMsg() {
        if (msgBox) msgBox.style.display = 'none';
    }

    // Submit Handler
    if (btnSubmit) {
        btnSubmit.addEventListener('click', async () => {
            const username = inputUser ? inputUser.value.trim() : '';
            const password = inputPass ? inputPass.value : '';

            if (!username || username.length < 3) {
                showAuthMsg('El usuario debe tener al menos 3 caracteres.');
                return;
            }
            if (!password || password.length < 4) {
                showAuthMsg('La contraseña debe tener al menos 4 caracteres.');
                return;
            }

            btnSubmit.disabled = false;
            btnSubmit.textContent = '⏳ Procesando...';

            const backendUrl = getBackendUrl();
            const endpoint = isRegisterMode ? `${backendUrl}/api/register` : `${backendUrl}/api/login`;
            try {
                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        username,
                        password,
                        initialState: state
                    })
                });

                const data = await response.json();
                btnSubmit.disabled = false;
                btnSubmit.textContent = isRegisterMode ? '✨ CREAR CUENTA Y GUARDAR' : '🔑 INICIAR SESIÓN';

                if (!data.success) {
                    showAuthMsg(data.message || 'Error en la solicitud.', true);
                    return;
                }

                // Successful Auth!
                currentAuthUser = {
                    username: data.username,
                    token: data.token
                };
                localStorage.setItem(AUTH_KEY, JSON.stringify(currentAuthUser));

                // If cloud state exists, restore state from cloud
                if (data.gameState) {
                    state = { ...DEFAULT_STATE, ...data.gameState };
                    state.playerName = data.username;
                    saveState();
                    renderAll();
                } else {
                    state.playerName = data.username;
                    saveState();
                    renderAll();
                }

                // Notify online players socket
                if (typeof socket !== 'undefined' && socket && socket.connected) {
                    socket.emit('user:join', { username: data.username, level: state.level });
                }

                showAuthMsg(data.message, false);
                setTimeout(() => {
                    updateAuthUIState();
                    hideAuthMsg();
                    if (inputPass) inputPass.value = '';
                }, 1000);

            } catch (e) {
                btnSubmit.disabled = false;
                btnSubmit.textContent = isRegisterMode ? '✨ CREAR CUENTA Y GUARDAR' : '🔑 INICIAR SESIÓN';
                showAuthMsg('Error de conexión con el servidor backend (puerto 3000).', true);
            }
        });
    }

    // Manual Save
    if (btnSaveNow) {
        btnSaveNow.addEventListener('click', async () => {
            btnSaveNow.disabled = true;
            btnSaveNow.textContent = '⏳ Guardando...';
            const ok = await sendCloudSave();
            btnSaveNow.disabled = false;
            btnSaveNow.textContent = ok ? '✅ ¡Guardado con Éxito!' : '❌ Error al Guardar';
            setTimeout(() => {
                btnSaveNow.textContent = '☁️ Guardar Ahora';
            }, 2500);
        });
    }

    // Logout
    if (btnLogout) {
        btnLogout.addEventListener('click', () => {
            currentAuthUser = null;
            localStorage.removeItem(AUTH_KEY);
            updateAuthUIState();
            if (typeof showToast === 'function') {
                showToast('🚪 Sesión Cerrada', 'Has cerrado sesión. Tus datos locales se conservan.', 'Common');
            }
        });
    }

    function updateAuthUIState() {
        if (currentAuthUser) {
            if (loggedInView) loggedInView.style.display = 'block';
            if (loggedOutView) loggedOutView.style.display = 'none';
            if (accountUsername) accountUsername.textContent = currentAuthUser.username;
            if (accountAvatar) accountAvatar.textContent = currentAuthUser.username.charAt(0).toUpperCase();
            if (accountBtnText) accountBtnText.textContent = currentAuthUser.username;
        } else {
            if (loggedInView) loggedInView.style.display = 'none';
            if (loggedOutView) loggedOutView.style.display = 'block';
            if (accountBtnText) accountBtnText.textContent = 'Cuenta';
        }
    }

    // Auto cloud save every 30 seconds if logged in
    setInterval(() => {
        if (currentAuthUser) {
            sendCloudSave();
        }
    }, 30000);
    // Battle System
    const btnInviteBattle = document.getElementById('btnInviteBattle');
    if (btnInviteBattle) {
        btnInviteBattle.addEventListener('click', () => {
            const targetId = document.getElementById('battleTargetPlayer').value;
            if (!targetId) return showToast('Error', 'Selecciona un jugador', 'Common');
            if (state.coins < 10000) return showToast('Error', 'No tienes suficientes coins (Requiere 10,000)', 'Common');

            socket.emit('battle:invite', { targetSocketId: targetId });
        });
    }

    const btnBattleOpen = document.getElementById('btnBattleOpen');
    if (btnBattleOpen) {
        btnBattleOpen.addEventListener('click', () => {
            if (!state.activeBattleId) return;

            // Similar to normal open logic but free and just sends points to server
            triggerBlockAnimation();
            const weights = getBaseWeights(false);
            const { rarity } = rollRarity(weights);

            // Random item of that rarity
            const possibleItems = LOOT_TABLE.filter(i => i.rarity === rarity);
            const item = possibleItems[Math.floor(Math.random() * possibleItems.length)];

            const points = item.sellValue;

            socket.emit('battle:update_score', { battleId: state.activeBattleId, points });
            renderRevealedItem({ ...item, sellValue: points }); // show it
            sounds.playOpen();
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initAuthSystem();
});

/* ==========================================================================
   ⚔️ AURA BATTLE SYSTEM — Coliseo de Aura & Torre de Jefes
   ========================================================================== */

const AURA_WEIGHTS = {
    Common: 1,
    Uncommon: 3,
    Rare: 8,
    Epic: 20,
    Legendary: 60,
    Mythic: 200,
    Omnisciente: 800,
    Secret: 2500
};

const AURA_RANK_TIERS = [
    { min: 0,       max: 999,     name: 'Iniciado',      color: '#aaa',    icon: '🌱' },
    { min: 1000,    max: 4999,    name: 'Aprendiz',      color: '#2ecc71', icon: '⚡' },
    { min: 5000,    max: 14999,   name: 'Guerrero',      color: '#3498db', icon: '⚔️' },
    { min: 15000,   max: 39999,   name: 'Élite',         color: '#9b59b6', icon: '🟣' },
    { min: 40000,   max: 99999,   name: 'Legendario',    color: '#f1c40f', icon: '🌟' },
    { min: 100000,  max: 299999,  name: 'Mítico',        color: '#e74c3c', icon: '🔥' },
    { min: 300000,  max: 999999,  name: 'Omnisciente',   color: '#00f0ff', icon: '👁️' },
    { min: 1000000, max: Infinity, name: 'CÓSMICO',       color: '#fff',    icon: '🌌' }
];

const AURA_COSMETIC_MULTIPLIERS = {
    aura: { none: 1.0, fire: 1.05, electric: 1.10, void: 1.15, golden: 1.20, cosmic: 1.30 }
};

const BOSSES = [
    { id: 'b1', name: 'Sombra Novata',   emoji: '👤', aura: 650,   lore: '"Apenas comienzas, forastero."',           reward: { coins: 1000,  xp: 100 },  unlocks: { body: 'shadow' } },
    { id: 'b2', name: 'Cazador Cyber',   emoji: '🤖', aura: 3500,  lore: '"Mi inventario es tu pesadilla."',         reward: { coins: 5000,  xp: 350 },  unlocks: { aura: 'electric', head: 'visor' } },
    { id: 'b3', name: 'Señor del Caos',  emoji: '🔱', aura: 12000, lore: '"El caos es mi naturaleza."',              reward: { coins: 15000, xp: 1000 }, unlocks: { weapon: 'sword', head: 'horns' } },
    { id: 'b4', name: 'Rey Legendario',  emoji: '👑', aura: 35000, lore: '"Solo los dignos pueden mirarme."',        reward: { coins: 40000, xp: 3000 }, unlocks: { body: 'golden', head: 'crown', aura: 'void' } },
    { id: 'b5', name: 'Espectro Mítico', emoji: '☠️', aura: 90000, lore: '"Morirás sin haber conocido el poder."',  reward: { coins: 100000, xp: 8000 }, unlocks: { weapon: 'scythe', aura: 'golden' } },
    { id: 'b6', name: 'Guardián Omni',   emoji: '👁️', aura: 280000, lore: '"Soy la suma de todos los mundos."',    reward: { coins: 500000, xp: 25000 }, unlocks: { weapon: 'orb', head: 'halo', aura: 'cosmic' } },
    { id: 'b7', name: 'ENTIDAD CÓSMICA', emoji: '🌌', aura: 850000, lore: '"Tu universo entero cabe en mi palma."', reward: { coins: 2000000, xp: 100000 }, unlocks: { body: 'void', weapon: 'blaster' } }
];

function computeAuraScore() {
    let itemAura = 0;
    state.inventory.forEach(item => {
        const weight = AURA_WEIGHTS[item.rarity] || 1;
        const count  = item.count || 1;
        const val    = item.sellValue || item.baseValue || 0;
        // Base: weight × count + bonus from value
        itemAura += weight * count + Math.floor(val * 0.001);
    });

    // Level & prestige bonus
    const levelBonus  = (state.level || 1) * 10;
    const prestigeBonus = (state.prestige || 0) * 500;

    // Cosmetic multiplier (from character aura type)
    const auraMult = AURA_COSMETIC_MULTIPLIERS.aura[state.character?.aura || 'none'] || 1.0;

    const total = Math.floor((itemAura + levelBonus + prestigeBonus) * auraMult);
    return { total, itemAura, levelBonus, prestigeBonus, auraMult };
}

function getAuraRank(total) {
    return AURA_RANK_TIERS.find(r => total >= r.min && total <= r.max) || AURA_RANK_TIERS[0];
}

function renderAuraSummaryBar() {
    const { total, itemAura, levelBonus, prestigeBonus, auraMult } = computeAuraScore();
    const rank = getAuraRank(total);

    const myAuraHeaderVal    = document.getElementById('myAuraHeaderVal');
    const myAuraRankBadge    = document.getElementById('myAuraRankBadge');
    const auraStatItemCount  = document.getElementById('auraStatItemCount');
    const auraStatItemAura   = document.getElementById('auraStatItemAura');
    const auraStatBonusAura  = document.getElementById('auraStatBonusAura');
    const auraStatCosmeticBuff = document.getElementById('auraStatCosmeticBuff');

    if (myAuraHeaderVal)    myAuraHeaderVal.textContent   = total.toLocaleString();
    if (myAuraRankBadge)    { myAuraRankBadge.textContent = `${rank.icon} ${rank.name}`; myAuraRankBadge.style.color = rank.color; myAuraRankBadge.style.borderColor = rank.color + '66'; }
    if (auraStatItemCount)  auraStatItemCount.textContent  = state.inventory.reduce((s, i) => s + (i.count || 1), 0);
    if (auraStatItemAura)   auraStatItemAura.textContent   = itemAura.toLocaleString();
    if (auraStatBonusAura)  auraStatBonusAura.textContent  = `+${(levelBonus + prestigeBonus).toLocaleString()}`;
    if (auraStatCosmeticBuff) auraStatCosmeticBuff.textContent = `x${auraMult.toFixed(2)}`;

    // Header player name + perks
    const arenaPlayerName  = document.getElementById('arenaPlayerName');
    const arenaPlayerAuraNum = document.getElementById('arenaPlayerAuraNum');
    const arenaPlayerAuraBar = document.getElementById('arenaPlayerAuraBar');
    const arenaPlayerPerks   = document.getElementById('arenaPlayerPerks');
    if (arenaPlayerName)    arenaPlayerName.textContent  = state.playerName;
    if (arenaPlayerAuraNum) arenaPlayerAuraNum.textContent = total.toLocaleString();
    if (arenaPlayerPerks)   arenaPlayerPerks.textContent = `Niv. ${state.level} • Prestigio ${state.prestige || 0} • ${rank.icon} ${rank.name}`;

    return { total, rank };
}

function selectBoss(bossId) {
    const boss = BOSSES.find(b => b.id === bossId);
    if (!boss) return;
    state.currentBossId = bossId;
    saveState();

    const { total } = computeAuraScore();
    const rivalAuraNum = document.getElementById('arenaRivalAuraNum');
    const rivalAuraBar = document.getElementById('arenaRivalAuraBar');
    const arenaRivalName  = document.getElementById('arenaRivalName');
    const arenaRivalPerks = document.getElementById('arenaRivalPerks');
    const arenaRivalDialogue = document.getElementById('arenaRivalDialogue');
    const currentRivalLabel  = document.getElementById('currentRivalLabel');

    if (rivalAuraNum)   rivalAuraNum.textContent  = boss.aura.toLocaleString();
    if (arenaRivalName) arenaRivalName.textContent = `${boss.emoji} ${boss.name}`;
    if (arenaRivalPerks) arenaRivalPerks.textContent = `Jefe Torre • Aura ${boss.aura.toLocaleString()}`;
    if (arenaRivalDialogue) arenaRivalDialogue.textContent = boss.lore;
    if (currentRivalLabel)  currentRivalLabel.textContent  = `${boss.emoji} ${boss.name} (Aura: ${boss.aura.toLocaleString()})`;

    // Update power struggle bar
    updatePowerStruggleBar(total, boss.aura);

    // Update rival bar width
    if (rivalAuraBar) {
        const max = Math.max(total, boss.aura);
        rivalAuraBar.style.width = `${Math.min(100, Math.round((boss.aura / max) * 100))}%`;
    }
    if (document.getElementById('arenaPlayerAuraBar')) {
        const max = Math.max(total, boss.aura);
        document.getElementById('arenaPlayerAuraBar').style.width = `${Math.min(100, Math.round((total / max) * 100))}%`;
    }
}

function updatePowerStruggleBar(playerAura, rivalAura) {
    const pointer   = document.getElementById('powerStrugglePointer');
    const advText   = document.getElementById('clashAdvantageText');
    if (!pointer) return;

    const total = playerAura + rivalAura || 1;
    const playerPct = (playerAura / total) * 100;
    pointer.style.left = `${Math.min(95, Math.max(5, playerPct))}%`;

    const diff = playerAura - rivalAura;
    const pct  = Math.abs(diff / (rivalAura || 1)) * 100;
    if (Math.abs(diff) < rivalAura * 0.05) {
        advText.textContent = '⚡ EQUILIBRADO';
        advText.style.color = '#f1c40f';
    } else if (diff > 0) {
        advText.textContent = `🔵 DOMINAS +${Math.round(pct)}%`;
        advText.style.color = '#00f0ff';
    } else {
        advText.textContent = `🔴 DESVENTAJA -${Math.round(pct)}%`;
        advText.style.color = '#ff0055';
    }
}

function executeAuraClash() {
    const { total: playerAura, rank: playerRank } = renderAuraSummaryBar();
    const boss = BOSSES.find(b => b.id === (state.currentBossId || 'b1'));
    if (!boss) return;

    const rivalAura = boss.aura;
    sounds.playClash();

    // Animate stickmen clashing
    const playerSvg = document.querySelector('#playerStickmanContainer svg');
    const rivalSvg  = document.querySelector('#rivalStickmanContainer svg');
    if (playerSvg) { playerSvg.classList.remove('animate-breathe'); playerSvg.classList.add('animate-clash-left'); }
    if (rivalSvg)  { rivalSvg.classList.remove('animate-breathe'); rivalSvg.classList.add('animate-clash-right'); }

    setTimeout(() => {
        const won = playerAura >= rivalAura;
        const logPanel = document.getElementById('clashLogContent');
        if (!logPanel) return;

        // Build breakdown table
        const rarities = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Mythic', 'Omnisciente', 'Secret'];
        const playerCounts = {};
        rarities.forEach(r => playerCounts[r] = 0);
        state.inventory.forEach(item => { if (playerCounts[item.rarity] !== undefined) playerCounts[item.rarity] += (item.count || 1); });

        let tableHtml = `<div style="font-weight:800; color:${won ? '#2ecc71' : '#e74c3c'}; font-size:1rem; text-align:center; margin-bottom:0.8rem;">
            ${won ? '🏆 ¡VICTORIA! — Tu Aura APLASTÓ al rival' : '💀 DERROTA — Tu Aura fue insuficiente'}
        </div>`;
        tableHtml += `<div style="display:grid; grid-template-columns:1fr auto auto; gap:0.3rem 1rem; align-items:center; font-size:0.82rem;">
            <span style="color:var(--text-muted); font-weight:700;">CATEGORÍA</span>
            <span style="color:#00f0ff; font-weight:700;">TUYO</span>
            <span style="color:#ff0055; font-weight:700;">RIVAL</span>`;

        rarities.forEach(r => {
            const pc = playerCounts[r];
            const pAura = pc * AURA_WEIGHTS[r];
            tableHtml += `<span style="color:var(--text-dim);">${r}</span>
                <span style="color:#00f0ff;">${pc} ítem${pc !== 1 ? 's' : ''} = <strong>${pAura.toLocaleString()} pts</strong></span>
                <span style="color:#ff0055;">—</span>`;
        });

        tableHtml += `<span style="color:#f1c40f; font-weight:800; border-top:1px solid rgba(255,255,255,0.1); padding-top:0.4rem;">TOTAL AURA</span>
            <span style="color:#00f0ff; font-weight:900; font-size:1rem; border-top:1px solid rgba(255,255,255,0.1); padding-top:0.4rem;">${playerAura.toLocaleString()}</span>
            <span style="color:#ff0055; font-weight:900; font-size:1rem; border-top:1px solid rgba(255,255,255,0.1); padding-top:0.4rem;">${rivalAura.toLocaleString()}</span>
        </div>`;

        logPanel.innerHTML = tableHtml;

        if (won) {
            sounds.playVictory();
            if (playerSvg) { playerSvg.classList.remove('animate-clash-left'); playerSvg.classList.add('animate-victory'); }
            if (rivalSvg)  { rivalSvg.classList.remove('animate-clash-right'); }

            if (!state.defeatedBosses.includes(boss.id)) {
                state.defeatedBosses.push(boss.id);
                state.coins += boss.reward.coins;
                state.xp    += boss.reward.xp;
                state.auraBattlesWon = (state.auraBattlesWon || 0) + 1;

                // Unlock cosmetics
                if (boss.unlocks.body   && !state.unlockedCosmetics.bodies.includes(boss.unlocks.body))   state.unlockedCosmetics.bodies.push(boss.unlocks.body);
                if (boss.unlocks.aura   && !state.unlockedCosmetics.auras.includes(boss.unlocks.aura))     state.unlockedCosmetics.auras.push(boss.unlocks.aura);
                if (boss.unlocks.head   && !state.unlockedCosmetics.heads.includes(boss.unlocks.head))     state.unlockedCosmetics.heads.push(boss.unlocks.head);
                if (boss.unlocks.weapon && !state.unlockedCosmetics.weapons.includes(boss.unlocks.weapon)) state.unlockedCosmetics.weapons.push(boss.unlocks.weapon);

                showToast(`🏆 ¡${boss.name} DERROTADO!`, `+${boss.reward.coins.toLocaleString()} 💰 · +${boss.reward.xp.toLocaleString()} XP · ¡Cosméticos desbloqueados!`, 'Legendary');
                saveState();
                renderAll();
                renderBossGrid();
                renderCustomizerChips();
            } else {
                showToast('⚔️ ¡VICTORIA!', `Tu Aura (${playerAura.toLocaleString()}) venció a ${boss.name} (${rivalAura.toLocaleString()}).`, 'Epic');
            }

            // Auto-advance to next boss
            const bossIdx = BOSSES.findIndex(b => b.id === boss.id);
            if (bossIdx < BOSSES.length - 1) {
                const nextBoss = BOSSES[bossIdx + 1];
                if (!state.defeatedBosses.includes(nextBoss.id)) {
                    setTimeout(() => selectBoss(nextBoss.id), 800);
                }
            }
        } else {
            state.auraBattlesLost = (state.auraBattlesLost || 0) + 1;
            if (playerSvg) { playerSvg.classList.remove('animate-clash-left'); playerSvg.classList.add('animate-breathe'); }
            if (rivalSvg)  { rivalSvg.classList.remove('animate-clash-right'); rivalSvg.classList.add('animate-breathe'); }
            showToast(`💀 DERROTA`, `Tu Aura (${playerAura.toLocaleString()}) no fue suficiente. Necesitas ${(rivalAura - playerAura).toLocaleString()} más.`, 'Common');
            saveState();
        }
    }, 900);
}

function renderBossGrid() {
    const grid = document.getElementById('bossCardsGrid');
    if (!grid) return;
    const { total: playerAura } = computeAuraScore();

    grid.innerHTML = BOSSES.map((boss, idx) => {
        const defeated = state.defeatedBosses.includes(boss.id);
        const prevDefeated = idx === 0 || state.defeatedBosses.includes(BOSSES[idx - 1].id);
        const isCurrent = state.currentBossId === boss.id;
        const locked = !prevDefeated && !defeated;
        const pct = Math.min(100, Math.round((playerAura / boss.aura) * 100));

        return `<div class="boss-card ${defeated ? 'defeated' : ''} ${locked ? 'locked' : ''}" data-boss="${boss.id}">
            <div class="boss-card-top">
                <div class="boss-avatar-box" style="font-size:2.2rem;">${boss.emoji}</div>
                <div class="boss-info-meta">
                    <div class="boss-title-name">${boss.name}${defeated ? ' ✅' : locked ? ' 🔒' : ''}</div>
                    <div class="boss-aura-tag">Aura Requerida: ${boss.aura.toLocaleString()} pts</div>
                    <div style="margin-top:0.3rem;">
                        <div style="display:flex; justify-content:space-between; font-size:0.7rem; color:var(--text-muted); margin-bottom:2px;">
                            <span>Tu poder vs este jefe</span><span>${pct}%</span>
                        </div>
                        <div style="height:4px; background:rgba(255,255,255,0.08); border-radius:999px; overflow:hidden;">
                            <div style="width:${pct}%; height:100%; background:${pct >= 100 ? '#2ecc71' : pct >= 70 ? '#f1c40f' : '#ff0055'}; transition:width 0.4s;"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="boss-lore-desc">${boss.lore}</div>
            <div class="boss-reward-pill">🏆 Recompensa: +${boss.reward.coins.toLocaleString()} 💰 · +${boss.reward.xp.toLocaleString()} XP</div>
            ${locked ? '' : `<button class="btn-select-boss ${isCurrent ? 'active' : ''}" data-boss-btn="${boss.id}">
                ${defeated ? '⚔️ Reto Rematch' : isCurrent ? '🎯 Seleccionado' : '⚔️ Seleccionar Rival'}
            </button>`}
        </div>`;
    }).join('');

    grid.querySelectorAll('[data-boss-btn]').forEach(btn => {
        btn.addEventListener('click', () => {
            sounds.playClick();
            selectBoss(btn.dataset.bossBtn);
            // Switch to arena view
            document.querySelectorAll('.battle-subnav-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.battle-view-pane').forEach(v => v.classList.remove('active'));
            document.querySelector('[data-battle-sub="arena"]')?.classList.add('active');
            document.getElementById('battleViewArena')?.classList.add('active');
        });
    });
}

/* ==========================================================================
   🎨 CHARACTER CUSTOMIZER — SVG Stickman Renderer
   ========================================================================== */
function buildStickmanSVG(char, side = 'left', size = 180) {
    const c = char || { body: 'classic', aura: 'none', head: 'none', weapon: 'none', color: '#00f0ff', auraColor: '#ff0055', pose: 'guard' };
    const col    = c.color || '#00f0ff';
    const aCol   = c.auraColor || '#ff0055';
    const flip   = side === 'right' ? `transform="scale(-1,1) translate(-${size},0)"` : '';
    const pose   = c.pose || 'guard';

    // Body variant fill
    const bodyFill  = c.body === 'cyber' ? col : c.body === 'shadow' ? '#111' : c.body === 'golden' ? '#f1c40f' : c.body === 'void' ? '#330066' : col;
    const bodyStroke = c.body === 'shadow' ? '#333' : bodyFill;
    const strokeW = 3;

    // Pose-based SVG paths
    const poses = {
        guard: {
            torso:  'M90,80 L90,135',
            armL:   'M90,95 L60,115 L50,130',
            armR:   'M90,95 L118,110 L130,125',
            legL:   'M90,135 L70,170 L60,195',
            legR:   'M90,135 L108,170 L118,195'
        },
        attack: {
            torso:  'M90,80 L85,135',
            armL:   'M87,95 L55,80 L35,65',
            armR:   'M87,95 L115,115 L128,130',
            legL:   'M85,135 L60,165 L50,195',
            legR:   'M85,135 L105,172 L118,197'
        },
        powerup: {
            torso:  'M90,80 L90,138',
            armL:   'M90,96 L65,70 L55,50',
            armR:   'M90,96 L115,70 L125,50',
            legL:   'M90,138 L78,172 L70,200',
            legR:   'M90,138 L102,172 L110,200'
        },
        victory: {
            torso:  'M90,80 L90,140',
            armL:   'M90,100 L70,78 L62,55',
            armR:   'M90,100 L110,78 L118,55',
            legL:   'M90,140 L82,175 L78,200',
            legR:   'M90,140 L100,175 L104,200'
        }
    };
    const p = poses[pose] || poses.guard;

    // Head accessories
    let headAcc = '';
    if (c.head === 'crown')  headAcc = `<text x="90" y="28" text-anchor="middle" font-size="22" fill="#f1c40f">👑</text>`;
    if (c.head === 'visor')  headAcc = `<rect x="70" y="40" width="40" height="12" rx="4" fill="${col}" opacity="0.9"/><rect x="70" y="40" width="40" height="4" rx="2" fill="${col}"/>`;
    if (c.head === 'horns')  headAcc = `<polygon points="78,30 72,10 85,25" fill="#c0392b"/><polygon points="102,30 108,10 95,25" fill="#c0392b"/>`;
    if (c.head === 'halo')   headAcc = `<ellipse cx="90" cy="22" rx="22" ry="6" fill="none" stroke="#f1c40f" stroke-width="3" opacity="0.9"/>`;
    if (c.head === 'tophat') headAcc = `<rect x="72" y="14" width="36" height="20" rx="2" fill="#222"/><rect x="66" y="34" width="48" height="6" rx="2" fill="#222"/>`;

    // Weapon
    let weapon = '';
    if (c.weapon === 'sword')   weapon = `<line x1="130" y1="100" x2="165" y2="65" stroke="${col}" stroke-width="4" stroke-linecap="round"/>
        <line x1="148" y1="82" x2="138" y2="72" stroke="#fff" stroke-width="2.5" opacity="0.6"/>`;
    if (c.weapon === 'scepter') weapon = `<line x1="128" y1="98" x2="155" y2="55" stroke="#f1c40f" stroke-width="4" stroke-linecap="round"/>
        <circle cx="155" cy="52" r="8" fill="${aCol}" stroke="#f1c40f" stroke-width="2"/>`;
    if (c.weapon === 'scythe')  weapon = `<line x1="125" y1="100" x2="162" y2="52" stroke="#9b59b6" stroke-width="4" stroke-linecap="round"/>
        <path d="M162,52 Q185,30 165,22 Q145,14 150,38" fill="none" stroke="${aCol}" stroke-width="3"/>`;
    if (c.weapon === 'blaster') weapon = `<rect x="120" y="102" width="32" height="14" rx="4" fill="${col}"/>
        <rect x="148" y="106" width="10" height="6" rx="2" fill="${aCol}"/>`;
    if (c.weapon === 'orb')     weapon = `<circle cx="140" cy="88" r="14" fill="${aCol}" opacity="0.4" stroke="${col}" stroke-width="2"/>
        <circle cx="140" cy="88" r="7" fill="${aCol}"/>`;

    // Aura glow / particles
    let aura = '';
    if (c.aura === 'fire')     aura = `<ellipse cx="90" cy="150" rx="45" ry="12" fill="${aCol}" opacity="0.18"/><ellipse cx="90" cy="130" rx="38" ry="40" fill="${aCol}" opacity="0.08" filter="url(#auraBlur)"/>`;
    if (c.aura === 'electric') aura = `<polyline points="82,60 95,80 78,100 92,120 80,145" fill="none" stroke="${aCol}" stroke-width="2" opacity="0.7"/>
        <polyline points="98,60 110,85 95,105 108,125 100,145" fill="none" stroke="${col}" stroke-width="1.5" opacity="0.5"/>`;
    if (c.aura === 'void')     aura = `<ellipse cx="90" cy="130" rx="52" ry="52" fill="${aCol}" opacity="0.1"/><ellipse cx="90" cy="130" rx="38" ry="38" fill="${aCol}" opacity="0.1"/>`;
    if (c.aura === 'golden')   aura = `<ellipse cx="90" cy="130" rx="58" ry="58" fill="#f1c40f" opacity="0.07"/>
        ${Array.from({length:8}, (_,i) => `<circle cx="${90 + Math.round(50*Math.cos(i*Math.PI/4))}" cy="${130 + Math.round(50*Math.sin(i*Math.PI/4))}" r="4" fill="#f1c40f" opacity="0.5"/>`).join('')}`;
    if (c.aura === 'cosmic')   aura = `<ellipse cx="90" cy="130" rx="70" ry="70" fill="${aCol}" opacity="0.06"/>
        <ellipse cx="90" cy="130" rx="50" ry="50" fill="${col}" opacity="0.07"/>
        ${Array.from({length:12}, (_,i) => `<circle cx="${90 + Math.round(60*Math.cos(i*Math.PI/6))}" cy="${130 + Math.round(60*Math.sin(i*Math.PI/6))}" r="3" fill="${i%2===0?col:aCol}" opacity="0.6"/>`).join('')}`;

    return `<svg class="stickman-svg animate-breathe" width="${size}" height="${size + 20}" viewBox="0 0 180 215" xmlns="http://www.w3.org/2000/svg" ${flip}>
        <defs>
            <filter id="auraBlur"><feGaussianBlur stdDeviation="8"/></filter>
            <filter id="glow"><feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="${bodyFill}" flood-opacity="0.9"/></filter>
        </defs>
        <!-- Aura layer -->
        ${aura}
        <!-- Head -->
        <circle cx="90" cy="45" r="22" fill="none" stroke="${bodyFill}" stroke-width="${strokeW}" filter="url(#glow)"/>
        ${headAcc}
        <!-- Body & Limbs -->
        <path d="${p.torso}" stroke="${bodyFill}" stroke-width="${strokeW}" fill="none" stroke-linecap="round"/>
        <path d="${p.armL}"  stroke="${bodyFill}" stroke-width="${strokeW}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="${p.armR}"  stroke="${bodyFill}" stroke-width="${strokeW}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="${p.legL}"  stroke="${bodyFill}" stroke-width="${strokeW}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="${p.legR}"  stroke="${bodyFill}" stroke-width="${strokeW}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        <!-- Weapon -->
        ${weapon}
    </svg>`;
}

function renderStickmen() {
    const pc = document.getElementById('playerStickmanContainer');
    const rc = document.getElementById('rivalStickmanContainer');
    const cp = document.getElementById('customizerCanvasPreview');

    const boss = BOSSES.find(b => b.id === (state.currentBossId || 'b1'));
    const rivalChar = {
        body: boss ? (BOSSES.indexOf(boss) >= 4 ? 'void' : BOSSES.indexOf(boss) >= 2 ? 'cyber' : 'shadow') : 'shadow',
        aura: boss ? (BOSSES.indexOf(boss) >= 5 ? 'cosmic' : BOSSES.indexOf(boss) >= 3 ? 'golden' : BOSSES.indexOf(boss) >= 1 ? 'electric' : 'fire') : 'fire',
        head: boss ? (BOSSES.indexOf(boss) >= 4 ? 'halo' : BOSSES.indexOf(boss) >= 2 ? 'horns' : 'none') : 'none',
        weapon: boss ? (BOSSES.indexOf(boss) >= 5 ? 'orb' : BOSSES.indexOf(boss) >= 3 ? 'scythe' : BOSSES.indexOf(boss) >= 1 ? 'sword' : 'none') : 'none',
        color: boss ? ['#aaa','#00f0ff','#9b59b6','#f1c40f','#e74c3c','#ff0055','#fff'][Math.min(6, BOSSES.indexOf(boss))] : '#aaa',
        auraColor: '#ff0055',
        pose: boss ? (BOSSES.indexOf(boss) >= 2 ? 'attack' : 'guard') : 'guard'
    };

    if (pc) pc.innerHTML = buildStickmanSVG(state.character, 'left');
    if (rc) rc.innerHTML = buildStickmanSVG(rivalChar, 'right');
    if (cp) cp.innerHTML = buildStickmanSVG(state.character, 'left', 160);
}

function renderCustomizerChips() {
    // Lock chips that are not unlocked
    const categories = {
        body:   { el: 'chipsBodyTypes',   stateKey: 'bodies',  attrKey: 'body'   },
        aura:   { el: 'chipsAuraTypes',   stateKey: 'auras',   attrKey: 'aura'   },
        head:   { el: 'chipsHeadTypes',   stateKey: 'heads',   attrKey: 'head'   },
        weapon: { el: 'chipsWeaponTypes', stateKey: 'weapons', attrKey: 'weapon' }
    };

    Object.entries(categories).forEach(([type, cfg]) => {
        const container = document.getElementById(cfg.el);
        if (!container) return;
        const unlocked = state.unlockedCosmetics[cfg.stateKey] || [];
        container.querySelectorAll('[data-cust-type]').forEach(btn => {
            const val = btn.dataset.custVal;
            const isLocked = !unlocked.includes(val);
            btn.disabled = isLocked;
            btn.style.opacity = isLocked ? '0.35' : '1';
            btn.title = isLocked ? '🔒 Derrota un Jefe de Torre para desbloquear' : '';
            btn.classList.toggle('active', state.character[type] === val);
        });
    });

    // Sync color pickers
    const bodyColorPicker = document.getElementById('custColorBody');
    const auraColorPicker = document.getElementById('custColorAura');
    const poseSelect      = document.getElementById('custPoseSelect');
    if (bodyColorPicker) bodyColorPicker.value = state.character.color || '#00f0ff';
    if (auraColorPicker) auraColorPicker.value = state.character.auraColor || '#ff0055';
    if (poseSelect)      poseSelect.value       = state.character.pose || 'guard';

    // Update preview badges
    const auraBadge = document.getElementById('previewAuraBadge');
    const headBadge = document.getElementById('previewHeadBadge');
    if (auraBadge) auraBadge.textContent = `Aura: ${state.character.aura}`;
    if (headBadge) headBadge.textContent = `Cabeza: ${state.character.head}`;
}

/* ==========================================================================
   🎰 ARCADE SYSTEM — Ruleta, Minas & Coin Flip
   ========================================================================== */

// --- LUCKY WHEEL ---
const WHEEL_SEGMENTS = [
    { label: '1,000 💰',       color: '#2ecc71', type: 'coins',   value: 1000  },
    { label: '+5% Suerte 30s', color: '#00f0ff', type: 'luck',    value: 0.05  },
    { label: '5,000 💰',       color: '#3498db', type: 'coins',   value: 5000  },
    { label: 'BOMBA 💣',       color: '#e74c3c', type: 'bomb',    value: 0     },
    { label: '25,000 💰',      color: '#f1c40f', type: 'coins',   value: 25000 },
    { label: 'Premium x1 🎁',  color: '#9b59b6', type: 'premium', value: 1     },
    { label: '100,000 💰',     color: '#e67e22', type: 'coins',   value: 100000},
    { label: '+10% Suerte 1m', color: '#1abc9c', type: 'luck',    value: 0.10  },
    { label: '500,000 💰',     color: '#ff0055', type: 'coins',   value: 500000},
    { label: 'NADA 😶',        color: '#555',    type: 'nothing', value: 0     }
];

let wheelSpinning = false;
let wheelCurrentAngle = 0;

function drawWheel(canvas) {
    const ctx = canvas.getContext('2d');
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const r  = cx - 10;
    const seg = (2 * Math.PI) / WHEEL_SEGMENTS.length;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    WHEEL_SEGMENTS.forEach((s, i) => {
        const start = i * seg;
        const end   = start + seg;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, r, start, end);
        ctx.closePath();
        ctx.fillStyle = s.color;
        ctx.fill();
        ctx.strokeStyle = 'rgba(0,0,0,0.3)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Label
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(start + seg / 2);
        ctx.textAlign = 'right';
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 11px Orbitron, sans-serif';
        ctx.shadowColor = 'rgba(0,0,0,0.8)';
        ctx.shadowBlur = 4;
        ctx.fillText(s.label, r - 8, 4);
        ctx.restore();
    });

    // Center circle
    ctx.beginPath();
    ctx.arc(cx, cy, 22, 0, 2 * Math.PI);
    ctx.fillStyle = '#0e111a';
    ctx.fill();
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 3;
    ctx.stroke();
}

function spinWheel() {
    if (wheelSpinning) return;
    const now = Date.now();
    const lastSpin = state.arcade.lastDailyWheel || 0;
    const msInDay  = 86400000;
    if (now - lastSpin < msInDay) {
        const remaining = Math.ceil((msInDay - (now - lastSpin)) / 3600000);
        showToast('⏰ Ya Giraste', `Vuelta diaria disponible en ${remaining}h`, 'Common');
        return;
    }

    wheelSpinning = true;
    sounds.playSpin();

    const canvas = document.getElementById('luckyWheelCanvas');
    if (!canvas) { wheelSpinning = false; return; }

    // Pick a random segment
    const winIdx    = Math.floor(Math.random() * WHEEL_SEGMENTS.length);
    const seg       = (360 / WHEEL_SEGMENTS.length);
    const extraSpins = (5 + Math.floor(Math.random() * 5)) * 360;
    const targetAngle = extraSpins + (360 - winIdx * seg) - seg / 2;

    // Animate via CSS
    const disc = document.getElementById('luckyWheelDisc');
    if (disc) {
        disc.style.transition = 'transform 4s cubic-bezier(0.15, 0.9, 0.2, 1)';
        wheelCurrentAngle += targetAngle;
        disc.style.transform = `rotate(${wheelCurrentAngle}deg)`;
    }

    setTimeout(() => {
        wheelSpinning = false;
        const prize = WHEEL_SEGMENTS[winIdx];
        const rewardText = document.getElementById('wheelRewardText');
        const rewardVal  = document.getElementById('wheelRewardVal');

        // Apply reward
        if (prize.type === 'coins') {
            state.coins += prize.value;
            if (rewardText) { rewardText.style.display = 'block'; }
            if (rewardVal)  rewardVal.textContent = `${prize.value.toLocaleString()} 💰`;
            showToast('🎡 ¡RULETA!', `+${prize.value.toLocaleString()} Coins`, 'Legendary');
            sounds.playVictory();
        } else if (prize.type === 'luck') {
            state.freeBlocks = (state.freeBlocks || 0) + 3;
            if (rewardText) { rewardText.style.display = 'block'; }
            if (rewardVal)  rewardVal.textContent = `Buff de Suerte ${(prize.value * 100).toFixed(0)}%`;
            showToast('🍀 ¡SUERTE EXTRA!', `Buff de suerte activado`, 'Rare');
        } else if (prize.type === 'premium') {
            state.freeBlocks = (state.freeBlocks || 0) + 1;
            if (rewardText) { rewardText.style.display = 'block'; }
            if (rewardVal)  rewardVal.textContent = `1 Caja Premium Gratis`;
            showToast('🎁 ¡CAJA GRATIS!', '1 Caja Premium añadida', 'Epic');
        } else if (prize.type === 'bomb') {
            if (rewardText) rewardText.style.display = 'none';
            showToast('💣 BOMBA', '¡Mala suerte! Nada esta vez.', 'Common');
        } else {
            if (rewardText) rewardText.style.display = 'none';
            showToast('😶 NADA', 'Sin suerte. Vuelve mañana.', 'Common');
        }

        state.arcade.lastDailyWheel = now;
        state.arcade.wheelSpinsTotal = (state.arcade.wheelSpinsTotal || 0) + 1;
        const spinBtn = document.getElementById('btnSpinWheel');
        const costLabel = document.getElementById('wheelSpinCostLabel');
        if (spinBtn) spinBtn.textContent = '⏰ VUELVE MAÑANA';
        if (costLabel) costLabel.textContent = '1 tirada diaria agotada';
        saveState();
        renderAll();
    }, 4200);
}

// --- MINES GAME ---
let minesState = {
    active: false,
    bet: 500,
    multiplier: 1.0,
    revealedSafe: 0,
    mines: []
};
const MINES_MULT_TABLE = [1.12, 1.26, 1.44, 1.65, 1.90, 2.22, 2.60, 3.10, 3.75, 4.60, 5.70, 7.20, 9.30, 12.5];

function renderMinesGrid() {
    const grid = document.getElementById('minesGrid');
    if (!grid) return;
    grid.innerHTML = '';
    for (let i = 0; i < 16; i++) {
        const cell = document.createElement('div');
        cell.className = 'mines-box-cell';
        cell.dataset.idx = i;
        cell.innerHTML = '📦';
        if (minesState.active) {
            cell.addEventListener('click', () => revealMinesCell(i, cell));
        } else {
            cell.style.opacity = '0.5';
            cell.style.cursor = 'default';
        }
        grid.appendChild(cell);
    }
}

function startMinesGame() {
    if (state.coins < minesState.bet) {
        showToast('❌ Sin fondos', `Necesitas ${minesState.bet.toLocaleString()} 💰`, 'Common');
        return;
    }
    sounds.playClick();
    state.coins -= minesState.bet;
    minesState.active = true;
    minesState.multiplier = 1.0;
    minesState.revealedSafe = 0;

    // Place 2 mines randomly
    const positions = Array.from({length: 16}, (_, i) => i);
    minesState.mines = positions.sort(() => Math.random() - 0.5).slice(0, 2);

    renderMinesGrid();
    updateMinesDisplay();

    const startBtn  = document.getElementById('btnStartMinesGame');
    const cashoutBtn = document.getElementById('btnCashoutMines');
    if (startBtn)  { startBtn.textContent = `🎮 EN JUEGO (${minesState.bet.toLocaleString()} 💰 apostados)`; startBtn.disabled = true; }
    if (cashoutBtn) { cashoutBtn.style.display = 'block'; }
    saveState();
    renderAll();
}

function revealMinesCell(idx, cellEl) {
    if (!minesState.active || cellEl.classList.contains('revealed-safe') || cellEl.classList.contains('revealed-bomb')) return;
    sounds.playLaser();

    if (minesState.mines.includes(idx)) {
        // HIT BOMB
        cellEl.classList.add('revealed-bomb');
        cellEl.innerHTML = '💣';
        minesState.active = false;
        minesState.mines.forEach(mIdx => {
            const bombCell = document.querySelector(`[data-idx="${mIdx}"]`);
            if (bombCell) { bombCell.classList.add('revealed-bomb'); bombCell.innerHTML = '💣'; }
        });
        showToast('💥 ¡EXPLOSIÓN!', `Perdiste ${minesState.bet.toLocaleString()} 💰. Mala suerte.`, 'Common');
        const startBtn  = document.getElementById('btnStartMinesGame');
        const cashoutBtn = document.getElementById('btnCashoutMines');
        if (startBtn)  { startBtn.textContent = '🎮 NUEVA PARTIDA'; startBtn.disabled = false; }
        if (cashoutBtn) cashoutBtn.style.display = 'none';
        minesState.auraBattlesLost = (minesState.auraBattlesLost || 0) + 1;
        saveState();
        renderAll();
    } else {
        // SAFE
        cellEl.classList.add('revealed-safe');
        minesState.revealedSafe++;
        const multIdx = Math.min(minesState.revealedSafe - 1, MINES_MULT_TABLE.length - 1);
        minesState.multiplier = MINES_MULT_TABLE[multIdx];
        cellEl.innerHTML = ['💎','⭐','🏆','✨','🎯','🌟','💰','🔥','⚡'][Math.floor(Math.random()*9)];
        sounds.playClick();
        updateMinesDisplay();
    }
}

function cashoutMines() {
    if (!minesState.active) return;
    const winAmount = Math.floor(minesState.bet * minesState.multiplier);
    state.coins += winAmount;
    state.arcade.minesGamesWon = (state.arcade.minesGamesWon || 0) + 1;
    state.arcade.minesTotalWon = (state.arcade.minesTotalWon || 0) + winAmount;
    minesState.active = false;
    showToast('💰 ¡RETIRADO!', `+${winAmount.toLocaleString()} 💰 (x${minesState.multiplier.toFixed(2)})`, 'Epic');
    sounds.playVictory();

    const startBtn  = document.getElementById('btnStartMinesGame');
    const cashoutBtn = document.getElementById('btnCashoutMines');
    if (startBtn)  { startBtn.textContent = '🎮 NUEVA PARTIDA'; startBtn.disabled = false; }
    if (cashoutBtn) cashoutBtn.style.display = 'none';

    renderMinesGrid();
    saveState();
    renderAll();
}

function updateMinesDisplay() {
    const mult  = document.getElementById('minesCurrentMultiplier');
    const potential = document.getElementById('minesPotentialWin');
    if (mult)     mult.textContent = `x${minesState.multiplier.toFixed(2)}`;
    if (potential) potential.textContent = `${Math.floor(minesState.bet * minesState.multiplier).toLocaleString()} 🪙`;
}

// --- COIN FLIP ---
let coinFlipBet    = 1000;
let coinFlipChoice = 'heads';
let coinFlipping   = false;

function flipCoin() {
    if (coinFlipping) return;
    if (state.coins < coinFlipBet) {
        showToast('❌ Sin fondos', `Necesitas ${coinFlipBet.toLocaleString()} 💰`, 'Common');
        return;
    }
    coinFlipping = true;
    sounds.playLaser();
    state.coins -= coinFlipBet;
    saveState();
    renderAll();

    const disc = document.getElementById('cyberCoinDisc');
    const result = Math.random() < 0.5 ? 'heads' : 'tails';
    const targetRot = result === 'heads' ? 720 : 900;

    if (disc) {
        disc.style.transition = `transform 2.5s cubic-bezier(0.15, 0.9, 0.2, 1)`;
        disc.style.transform = `rotateY(${targetRot}deg)`;
    }

    setTimeout(() => {
        const won = result === coinFlipChoice;
        const banner = document.getElementById('coinResultBanner');
        if (won) {
            state.coins += coinFlipBet * 2;
            state.arcade.coinFlipWon = (state.arcade.coinFlipWon || 0) + 1;
            if (banner) { banner.style.display = 'block'; banner.style.color = '#2ecc71'; banner.textContent = `✅ ¡ACERTASTE! +${(coinFlipBet).toLocaleString()} 💰`; }
            sounds.playVictory();
            showToast('🪙 ¡GANASTE!', `+${coinFlipBet.toLocaleString()} 💰 (x2)`, 'Legendary');
        } else {
            if (banner) { banner.style.display = 'block'; banner.style.color = '#e74c3c'; banner.textContent = `❌ FALLASTE — Perdiste ${coinFlipBet.toLocaleString()} 💰`; }
            showToast('💀 Perdiste', `Mala suerte en el lanzamiento.`, 'Common');
        }
        coinFlipping = false;
        saveState();
        renderAll();
    }, 2700);
}

/* ==========================================================================
   PVP ONLINE — Duelo de Aura en Tiempo Real
   ========================================================================== */
function renderPvpPlayers() {
    const grid = document.getElementById('pvpOnlinePlayersGrid');
    if (!grid || !socket) return;
    socket.emit('players:request_list');
}

function buildPvpPlayerCard(player) {
    const { total } = computeAuraScore();
    const isMe = socket && player.socketId === socket.id;
    if (isMe) return '';
    const playerAura = player.auraScore || 0;
    const rank = getAuraRank(playerAura);
    return `<div class="pvp-player-card">
        <div class="pvp-player-top">
            <span style="font-size:1.3rem;">${player.avatar || '⚡'}</span>
            <div>
                <div style="font-weight:800; color:#fff; font-size:0.9rem;">${player.username}</div>
                <div style="font-size:0.72rem; color:var(--text-muted);">${rank.icon} ${rank.name} · Niv. ${player.level}</div>
            </div>
        </div>
        <div style="font-size:0.78rem; color:#00f0ff; font-weight:700;">Aura: ${playerAura.toLocaleString()} pts</div>
        <div style="font-size:0.72rem; color:${playerAura > total ? '#e74c3c' : '#2ecc71'};">
            ${playerAura > total ? `+${(playerAura-total).toLocaleString()} de ventaja` : `Desventaja de ${(total-playerAura).toLocaleString()}`}
        </div>
        <button class="btn-select-boss" data-pvp-challenge="${player.socketId}" style="margin-top:0.5rem; background:rgba(255,0,85,0.2); border-color:#ff0055; color:#ff0055;">
            ⚔️ Desafiar Aura
        </button>
    </div>`;
}

/* ==========================================================================
   🎛️ BATTLE & ARCADE INIT — Sub-nav, Listeners, Boot
   ========================================================================== */
function initBattleTab() {
    // Sub-nav wiring for BATTLE
    document.querySelectorAll('.battle-subnav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            sounds.playClick();
            document.querySelectorAll('.battle-subnav-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.battle-view-pane').forEach(v => v.classList.remove('active'));
            btn.classList.add('active');
            const sub = btn.dataset.battleSub;
            const pane = document.getElementById(`battleView${sub.charAt(0).toUpperCase() + sub.slice(1)}`);
            if (pane) pane.classList.add('active');

            if (sub === 'arena') {
                renderAuraSummaryBar();
                renderStickmen();
                const boss = BOSSES.find(b => b.id === (state.currentBossId || 'b1'));
                if (boss) selectBoss(boss.id);
            } else if (sub === 'bosses') {
                renderBossGrid();
            } else if (sub === 'customizer') {
                renderCustomizerChips();
                renderStickmen();
            } else if (sub === 'pvp') {
                renderPvpPlayers();
            }
        });
    });

    // Clash button
    const clashBtn = document.getElementById('btnStartAuraClash');
    if (clashBtn) clashBtn.addEventListener('click', () => executeAuraClash());

    // Customizer chips
    document.querySelectorAll('[data-cust-type]').forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.disabled) return;
            sounds.playClick();
            const type = btn.dataset.custType;
            const val  = btn.dataset.custVal;
            if (state.character[type] !== undefined) {
                state.character[type] = val;
            }
            renderCustomizerChips();
            renderStickmen();
            renderAuraSummaryBar();
        });
    });

    // Color pickers
    ['custColorBody', 'custColorAura'].forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        el.addEventListener('input', () => {
            if (id === 'custColorBody') state.character.color    = el.value;
            else                        state.character.auraColor = el.value;
            renderStickmen();
            renderAuraSummaryBar();
        });
    });

    // Pose select
    const poseSelect = document.getElementById('custPoseSelect');
    if (poseSelect) poseSelect.addEventListener('change', () => {
        state.character.pose = poseSelect.value;
        renderStickmen();
    });

    // Save customizer
    const saveBtn = document.getElementById('btnSaveCustomizer');
    if (saveBtn) saveBtn.addEventListener('click', () => {
        sounds.playVictory();
        saveState();
        // Emit character update to server
        if (socket) {
            const { total } = computeAuraScore();
            socket.emit('user:update_profile', {
                username: state.playerName,
                role: state.role,
                level: state.level,
                avatar: state.character.head !== 'none' ? '👑' : state.character.aura !== 'none' ? '⚡' : '🎮',
                auraScore: total,
                character: state.character
            });
        }
        showToast('💾 ¡GUARDADO!', 'Tu personaje ha sido equipado y sincronizado.', 'Rare');
        renderBossGrid();
        renderAuraSummaryBar();
    });

    // PVP Challenge delegation
    document.addEventListener('click', e => {
        const pvpBtn = e.target.closest('[data-pvp-challenge]');
        if (!pvpBtn || !socket) return;
        const { total } = computeAuraScore();
        const rank = getAuraRank(total);
        socket.emit('aura:invite', {
            targetSocketId: pvpBtn.dataset.pvpChallenge,
            senderAura: total,
            senderRank: rank.name,
            senderCharacter: state.character
        });
        showToast('⚔️ Desafío Enviado', 'Esperando respuesta del rival...', 'Rare');
    });

    // Initial render on first tab open
    renderAuraSummaryBar();
    renderStickmen();
    const startBoss = BOSSES.find(b => !state.defeatedBosses.includes(b.id)) || BOSSES[0];
    selectBoss(startBoss.id);
}

function initArcadeTab() {
    // Sub-nav wiring for ARCADE
    document.querySelectorAll('.arcade-subnav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            sounds.playClick();
            document.querySelectorAll('.arcade-subnav-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.arcade-view-pane').forEach(v => v.classList.remove('active'));
            btn.classList.add('active');
            const sub  = btn.dataset.arcadeSub;
            const pane = document.getElementById(`arcadeView${sub.charAt(0).toUpperCase() + sub.slice(1)}`);
            if (pane) pane.classList.add('active');
        });
    });

    // Wheel init
    const canvas = document.getElementById('luckyWheelCanvas');
    if (canvas) drawWheel(canvas);

    const spinBtn = document.getElementById('btnSpinWheel');
    if (spinBtn) {
        spinBtn.addEventListener('click', () => spinWheel());
        // Update label based on cooldown
        const remaining = 86400000 - (Date.now() - (state.arcade.lastDailyWheel || 0));
        if (remaining > 0) {
            const h = Math.ceil(remaining / 3600000);
            spinBtn.textContent = `⏰ Disponible en ${h}h`;
            const lbl = document.getElementById('wheelSpinCostLabel');
            if (lbl) lbl.textContent = '1 tirada diaria agotada';
        }
    }

    // Mines bet chips
    document.querySelectorAll('[data-mines-bet]').forEach(btn => {
        btn.addEventListener('click', () => {
            if (minesState.active) return;
            sounds.playClick();
            document.querySelectorAll('[data-mines-bet]').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            minesState.bet = parseInt(btn.dataset.minesBet);
            const startBtn = document.getElementById('btnStartMinesGame');
            if (startBtn) startBtn.textContent = `🎮 INICIAR PARTIDA (${minesState.bet.toLocaleString()} 🪙)`;
            updateMinesDisplay();
        });
    });

    document.getElementById('btnStartMinesGame')?.addEventListener('click', startMinesGame);
    document.getElementById('btnCashoutMines')?.addEventListener('click', cashoutMines);
    renderMinesGrid();

    // Coin flip choice
    document.querySelectorAll('.coin-choice-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            sounds.playClick();
            document.querySelectorAll('.coin-choice-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            coinFlipChoice = btn.dataset.choice;
        });
    });

    // Coin flip bet chips
    document.querySelectorAll('[data-flip-bet]').forEach(btn => {
        btn.addEventListener('click', () => {
            sounds.playClick();
            document.querySelectorAll('[data-flip-bet]').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            coinFlipBet = parseInt(btn.dataset.flipBet);
            const flipBtn = document.getElementById('btnFlipCoinAction');
            if (flipBtn) flipBtn.textContent = `🪙 LANZAR MONEDA (${coinFlipBet.toLocaleString()} 🪙)`;
        });
    });

    document.getElementById('btnFlipCoinAction')?.addEventListener('click', () => flipCoin());
}

// Hook into aura socket events
function hookAuraSocketEvents() {
    if (!socket) return;

    socket.on('aura:incoming_invite', (data) => {
        const accept = confirm(`⚔️ ${data.senderName} te desafía a un Duelo de Aura (${data.senderAura?.toLocaleString() || 0} pts de Aura). ¿Aceptas?`);
        const { total } = computeAuraScore();
        const rank = getAuraRank(total);
        socket.emit('aura:respond', {
            accept,
            senderSocketId: data.senderSocketId,
            senderAura: data.senderAura,
            senderCharacter: data.senderCharacter,
            senderRank: data.senderRank,
            responderAura: total,
            responderRank: rank.name,
            responderCharacter: state.character
        });
    });

    socket.on('aura:duel_start', (data) => {
        showToast('⚔️ DUELO DE AURA', `Rival: ${data.rivalName} (${data.rivalAura?.toLocaleString() || 0} Aura)`, 'Legendary');
        sounds.playClash();
        // Switch to battle arena tab
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
        document.querySelector('[data-tab="battle"]')?.classList.add('active');
        document.getElementById('tab-battle')?.classList.add('active');
        // Show rival in arena
        const { total: playerAura } = renderAuraSummaryBar();
        renderStickmen();
        const rivalNameEl = document.getElementById('arenaRivalName');
        const rivalAuraEl = document.getElementById('arenaRivalAuraNum');
        if (rivalNameEl) rivalNameEl.textContent = `🌐 ${data.rivalName}`;
        if (rivalAuraEl) rivalAuraEl.textContent = (data.rivalAura || 0).toLocaleString();
        updatePowerStruggleBar(playerAura, data.rivalAura || 0);

        // Auto-resolve with a slight delay for drama
        setTimeout(() => {
            const won = playerAura >= (data.rivalAura || 0);
            if (won) {
                state.coins += 10000;
                state.auraBattlesWon = (state.auraBattlesWon || 0) + 1;
                showToast('🏆 ¡GANASTE EL DUELO PVP!', `+10,000 💰 — Tu Aura dominó a ${data.rivalName}`, 'Legendary');
                sounds.playVictory();
            } else {
                state.auraBattlesLost = (state.auraBattlesLost || 0) + 1;
                showToast('💀 PERDISTE EL DUELO PVP', `${data.rivalName} tenía más Aura.`, 'Common');
            }
            saveState();
            renderAll();
        }, 1800);
    });

    socket.on('aura:error', (data) => showToast('⚠️ Error de Aura', data.message, 'Common'));
}

// Boot both systems on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    initBattleTab();
    initArcadeTab();

    // Hook battle tab on click to refresh aura display
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.dataset.tab;
            if (tab === 'battle') {
                setTimeout(() => { renderAuraSummaryBar(); renderStickmen(); }, 50);
            }
        });
    });
});

