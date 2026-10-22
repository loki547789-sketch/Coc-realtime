import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Built-in fixture database with realistic Clash of Clans data
const FIXTURE_PLAYERS: Record<string, any> = {
  '#2PP': {
    tag: '#2PP',
    name: 'Klaus Valhalla',
    townHallLevel: 17,
    townHallWeaponLevel: 5,
    expLevel: 268,
    trophies: 5640,
    bestTrophies: 6120,
    warStars: 2450,
    attackWins: 142,
    defenseWins: 38,
    builderHallLevel: 10,
    builderBaseTrophies: 5200,
    bestBuilderBaseTrophies: 5450,
    role: 'leader',
    warPreference: 'in',
    donations: 12480,
    donationsReceived: 8950,
    clanCapitalContributions: 1450000,
    clan: {
      tag: '#2Q29V9L',
      name: 'Valhalla Kings',
      clanLevel: 24,
      badgeUrls: {
        small: 'https://api-assets.clashofclans.com/badges/70/P9x74b3G.png',
        large: 'https://api-assets.clashofclans.com/badges/512/P9x74b3G.png',
        medium: 'https://api-assets.clashofclans.com/badges/200/P9x74b3G.png'
      }
    },
    heroes: [
      { name: 'Barbarian King', level: 95, maxLevel: 95, village: 'home' },
      { name: 'Archer Queen', level: 95, maxLevel: 95, village: 'home' },
      { name: 'Grand Warden', level: 70, maxLevel: 70, village: 'home' },
      { name: 'Royal Champion', level: 45, maxLevel: 45, village: 'home' },
      { name: 'Minion Prince', level: 35, maxLevel: 40, village: 'home' },
      { name: 'Battle Copter', level: 35, maxLevel: 35, village: 'builderBase' },
      { name: 'Battle Machine', level: 35, maxLevel: 35, village: 'builderBase' }
    ],
    heroEquipment: [
      { name: 'Giant Gauntlet', level: 27, maxLevel: 27, village: 'home' },
      { name: 'Spiky Ball', level: 27, maxLevel: 27, village: 'home' },
      { name: 'Frozen Arrow', level: 27, maxLevel: 27, village: 'home' },
      { name: 'Invisibility Vial', level: 18, maxLevel: 18, village: 'home' },
      { name: 'Eternal Tome', level: 18, maxLevel: 18, village: 'home' },
      { name: 'Healing Tome', level: 18, maxLevel: 18, village: 'home' },
      { name: 'Rocket Spears', level: 27, maxLevel: 27, village: 'home' },
      { name: 'Haste Vial', level: 18, maxLevel: 18, village: 'home' }
    ],
    troops: [
      { name: 'Electro Dragon', level: 7, maxLevel: 7, village: 'home' },
      { name: 'Root Rider', level: 3, maxLevel: 3, village: 'home' },
      { name: 'Super Archer', level: 12, maxLevel: 12, village: 'home' },
      { name: 'Super Miner', level: 10, maxLevel: 10, village: 'home' },
      { name: 'Dragon Rider', level: 4, maxLevel: 4, village: 'home' },
      { name: 'Bowler', level: 8, maxLevel: 8, village: 'home' },
      { name: 'Healer', level: 9, maxLevel: 9, village: 'home' },
      { name: 'Hog Rider', level: 13, maxLevel: 13, village: 'home' }
    ],
    spells: [
      { name: 'Rage Spell', level: 6, maxLevel: 6, village: 'home' },
      { name: 'Freeze Spell', level: 7, maxLevel: 7, village: 'home' },
      { name: 'Overgrowth Spell', level: 4, maxLevel: 4, village: 'home' },
      { name: 'Poison Spell', level: 10, maxLevel: 10, village: 'home' },
      { name: 'Invisibility Spell', level: 4, maxLevel: 4, village: 'home' }
    ]
  },
  '#8UP8': {
    tag: '#8UP8',
    name: 'Shadow Valkyrie',
    townHallLevel: 16,
    townHallWeaponLevel: 4,
    expLevel: 215,
    trophies: 4980,
    bestTrophies: 5410,
    warStars: 1780,
    attackWins: 98,
    defenseWins: 24,
    builderHallLevel: 9,
    builderBaseTrophies: 4400,
    bestBuilderBaseTrophies: 4600,
    role: 'coLeader',
    warPreference: 'in',
    donations: 7450,
    donationsReceived: 4200,
    clanCapitalContributions: 980000,
    clan: {
      tag: '#2Q29V9L',
      name: 'Valhalla Kings',
      clanLevel: 24
    },
    heroes: [
      { name: 'Barbarian King', level: 88, maxLevel: 95, village: 'home' },
      { name: 'Archer Queen', level: 90, maxLevel: 95, village: 'home' },
      { name: 'Grand Warden', level: 65, maxLevel: 70, village: 'home' },
      { name: 'Royal Champion', level: 38, maxLevel: 45, village: 'home' },
      { name: 'Minion Prince', level: 20, maxLevel: 40, village: 'home' }
    ],
    heroEquipment: [
      { name: 'Giant Gauntlet', level: 24, maxLevel: 27, village: 'home' },
      { name: 'Frozen Arrow', level: 23, maxLevel: 27, village: 'home' },
      { name: 'Eternal Tome', level: 18, maxLevel: 18, village: 'home' }
    ],
    troops: [
      { name: 'Electro Dragon', level: 6, maxLevel: 7, village: 'home' },
      { name: 'Root Rider', level: 2, maxLevel: 3, village: 'home' },
      { name: 'Super Archer', level: 11, maxLevel: 12, village: 'home' }
    ],
    spells: [
      { name: 'Rage Spell', level: 6, maxLevel: 6, village: 'home' },
      { name: 'Freeze Spell', level: 7, maxLevel: 7, village: 'home' }
    ]
  },
  '#9Y9G': {
    tag: '#9Y9G',
    name: 'Iron Forge (Mini)',
    townHallLevel: 14,
    townHallWeaponLevel: 5,
    expLevel: 172,
    trophies: 3850,
    bestTrophies: 4300,
    warStars: 1120,
    attackWins: 65,
    defenseWins: 18,
    builderHallLevel: 9,
    builderBaseTrophies: 3600,
    bestBuilderBaseTrophies: 3900,
    role: 'elder',
    warPreference: 'in',
    donations: 5120,
    donationsReceived: 6200,
    clanCapitalContributions: 620000,
    clan: {
      tag: '#2Q29V9L',
      name: 'Valhalla Kings',
      clanLevel: 24
    },
    heroes: [
      { name: 'Barbarian King', level: 75, maxLevel: 80, village: 'home' },
      { name: 'Archer Queen', level: 78, maxLevel: 80, village: 'home' },
      { name: 'Grand Warden', level: 52, maxLevel: 55, village: 'home' },
      { name: 'Royal Champion', level: 25, maxLevel: 30, village: 'home' }
    ],
    heroEquipment: [
      { name: 'Giant Gauntlet', level: 18, maxLevel: 27, village: 'home' },
      { name: 'Frozen Arrow', level: 18, maxLevel: 27, village: 'home' }
    ],
    troops: [
      { name: 'Electro Dragon', level: 5, maxLevel: 7, village: 'home' },
      { name: 'Dragon', level: 9, maxLevel: 10, village: 'home' }
    ],
    spells: [
      { name: 'Rage Spell', level: 5, maxLevel: 6, village: 'home' },
      { name: 'Freeze Spell', level: 6, maxLevel: 7, village: 'home' }
    ]
  }
};

const FIXTURE_CLAN = {
  tag: '#2Q29V9L',
  name: 'Valhalla Kings',
  type: 'inviteOnly',
  description: 'Top tier competitive war & capital raid clan. Active daily, max donations, CWL Champion II.',
  location: { id: 32000006, name: 'International', isCountry: false },
  badgeUrls: {
    small: 'https://api-assets.clashofclans.com/badges/70/P9x74b3G.png',
    large: 'https://api-assets.clashofclans.com/badges/512/P9x74b3G.png',
    medium: 'https://api-assets.clashofclans.com/badges/200/P9x74b3G.png'
  },
  clanLevel: 24,
  clanPoints: 54200,
  clanBuilderBasePoints: 48500,
  clanCapitalPoints: 1850,
  capitalLeague: { id: 85000021, name: 'Legends League' },
  requiredTrophies: 4500,
  warFrequency: 'always',
  warWinStreak: 14,
  warWins: 684,
  warTies: 12,
  warLosses: 142,
  isWarLogPublic: true,
  warLeague: { id: 48000017, name: 'Champion League II' },
  members: 48,
  memberList: [
    { tag: '#2PP', name: 'Klaus Valhalla', role: 'leader', expLevel: 268, league: { name: 'Legend League' }, trophies: 5640, clanRank: 1, donations: 12480, donationsReceived: 8950 },
    { tag: '#8UP8', name: 'Shadow Valkyrie', role: 'coLeader', expLevel: 215, league: { name: 'Titan League I' }, trophies: 4980, clanRank: 2, donations: 7450, donationsReceived: 4200 },
    { tag: '#9Y9G', name: 'Iron Forge (Mini)', role: 'elder', expLevel: 172, league: { name: 'Champion League I' }, trophies: 3850, clanRank: 3, donations: 5120, donationsReceived: 6200 },
    { tag: '#C28J', name: 'ThunderStorm', role: 'coLeader', expLevel: 242, league: { name: 'Legend League' }, trophies: 5410, clanRank: 4, donations: 9340, donationsReceived: 5600 },
    { tag: '#LQ99', name: 'DragonSlayer', role: 'member', expLevel: 198, league: { name: 'Titan League II' }, trophies: 4620, clanRank: 5, donations: 3100, donationsReceived: 4800 }
  ]
};

// Fixture War Data
const FIXTURE_WAR = {
  state: 'inWar', // 'preparation', 'inWar', 'warEnded'
  teamSize: 15,
  attacksPerMember: 2,
  battleModifier: 'none',
  startTime: new Date(Date.now() - 14 * 3600 * 1000).toISOString().replace(/[-:T.]/g, '').slice(0, 15) + 'Z',
  endTime: new Date(Date.now() + 10 * 3600 * 1000).toISOString().replace(/[-:T.]/g, '').slice(0, 15) + 'Z',
  clan: {
    tag: '#2Q29V9L',
    name: 'Valhalla Kings',
    badgeUrls: FIXTURE_CLAN.badgeUrls,
    clanLevel: 24,
    attacks: 26,
    stars: 42,
    destructionPercentage: 97.4,
    members: [
      {
        tag: '#2PP',
        name: 'Klaus Valhalla',
        townhallLevel: 17,
        mapPosition: 1,
        attacks: [
          { attackerTag: '#2PP', defenderTag: '#OPP1', stars: 3, destructionPercentage: 100, order: 4, duration: 165 },
          { attackerTag: '#2PP', defenderTag: '#OPP2', stars: 3, destructionPercentage: 100, order: 12, duration: 172 }
        ],
        opponentAttacks: 1,
        bestOpponentAttack: { attackerTag: '#OPP1', defenderTag: '#2PP', stars: 2, destructionPercentage: 86 }
      },
      {
        tag: '#8UP8',
        name: 'Shadow Valkyrie',
        townhallLevel: 16,
        mapPosition: 2,
        attacks: [
          { attackerTag: '#8UP8', defenderTag: '#OPP3', stars: 3, destructionPercentage: 100, order: 6, duration: 158 },
          { attackerTag: '#8UP8', defenderTag: '#OPP4', stars: 2, destructionPercentage: 94, order: 18, duration: 180 }
        ],
        opponentAttacks: 2,
        bestOpponentAttack: { attackerTag: '#OPP2', defenderTag: '#8UP8', stars: 2, destructionPercentage: 91 }
      },
      {
        tag: '#9Y9G',
        name: 'Iron Forge (Mini)',
        townhallLevel: 14,
        mapPosition: 5,
        attacks: [
          { attackerTag: '#9Y9G', defenderTag: '#OPP6', stars: 3, destructionPercentage: 100, order: 2, duration: 142 }
        ],
        opponentAttacks: 1,
        bestOpponentAttack: { attackerTag: '#OPP5', defenderTag: '#9Y9G', stars: 3, destructionPercentage: 100 }
      }
    ]
  },
  opponent: {
    tag: '#OPP999',
    name: 'Apex Predators',
    badgeUrls: {
      small: 'https://api-assets.clashofclans.com/badges/70/4LzB128e.png',
      large: 'https://api-assets.clashofclans.com/badges/512/4LzB128e.png',
      medium: 'https://api-assets.clashofclans.com/badges/200/4LzB128e.png'
    },
    clanLevel: 21,
    attacks: 24,
    stars: 39,
    destructionPercentage: 94.8,
    members: [
      { tag: '#OPP1', name: 'Vortex', townhallLevel: 17, mapPosition: 1, attacks: [] },
      { tag: '#OPP2', name: 'Oblivion', townhallLevel: 17, mapPosition: 2, attacks: [] }
    ]
  }
};

// Fixture Capital Raid Data
const FIXTURE_RAID = {
  items: [
    {
      state: 'ongoing',
      startTime: new Date(Date.now() - 36 * 3600 * 1000).toISOString().replace(/[-:T.]/g, '').slice(0, 15) + 'Z',
      endTime: new Date(Date.now() + 12 * 3600 * 1000).toISOString().replace(/[-:T.]/g, '').slice(0, 15) + 'Z',
      capitalTotalLoot: 845200,
      raidsCompleted: 18,
      totalAttacks: 268,
      enemyDistrictsDestroyed: 54,
      offensiveReward: 1240,
      defensiveReward: 380,
      members: [
        { tag: '#2PP', name: 'Klaus Valhalla', attacks: 6, attackLimit: 6, bonusAttackLimit: 1, capitalResourcesLooted: 24800 },
        { tag: '#8UP8', name: 'Shadow Valkyrie', attacks: 6, attackLimit: 6, bonusAttackLimit: 1, capitalResourcesLooted: 22400 },
        { tag: '#9Y9G', name: 'Iron Forge (Mini)', attacks: 5, attackLimit: 6, bonusAttackLimit: 1, capitalResourcesLooted: 18900 },
        { tag: '#C28J', name: 'ThunderStorm', attacks: 6, attackLimit: 6, bonusAttackLimit: 1, capitalResourcesLooted: 23100 },
        { tag: '#LQ99', name: 'DragonSlayer', attacks: 3, attackLimit: 6, bonusAttackLimit: 0, capitalResourcesLooted: 11200 }
      ],
      attackLog: [
        {
          defender: {
            tag: '#DEF1',
            name: 'Shadow Realm',
            level: 10,
            badgeUrls: FIXTURE_CLAN.badgeUrls
          },
          attackCount: 16,
          districtCount: 8,
          districtsDestroyed: 8,
          districts: [
            { id: 70000000, name: 'Capital Peak', districtHallLevel: 10, destructionPercent: 100, attackCount: 3, totalLooted: 62000 },
            { id: 70000001, name: 'Barbarian Camp', districtHallLevel: 5, destructionPercent: 100, attackCount: 2, totalLooted: 38000 },
            { id: 70000002, name: 'Wizard Valley', districtHallLevel: 5, destructionPercent: 100, attackCount: 2, totalLooted: 35000 },
            { id: 70000003, name: 'Balloon Lagoon', districtHallLevel: 5, destructionPercent: 100, attackCount: 2, totalLooted: 36500 },
            { id: 70000004, name: "Builder's Workshop", districtHallLevel: 5, destructionPercent: 100, attackCount: 2, totalLooted: 37000 },
            { id: 70000005, name: 'Dragon Cliffs', districtHallLevel: 5, destructionPercent: 100, attackCount: 3, totalLooted: 41000 },
            { id: 70000006, name: 'Golem Quarry', districtHallLevel: 5, destructionPercent: 100, attackCount: 2, totalLooted: 39500 }
          ]
        }
      ]
    }
  ]
};

// Helper: Normalize tag (e.g. replace '#' with '%23')
function cleanTagParam(rawTag: string): string {
  const t = rawTag.trim();
  if (t.startsWith('#')) return t;
  return `#${t}`;
}

// Clash of Clans Official API Helper
async function fetchFromOfficialApi(endpoint: string, userToken?: string) {
  const token = userToken || process.env.COC_API_TOKEN;
  if (!token) {
    return { ok: false, status: 401, error: 'No API token configured' };
  }

  const url = `https://api.clashofclans.com/v1${endpoint}`;
  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    });

    if (!res.ok) {
      const errText = await res.text();
      return { ok: false, status: res.status, error: errText };
    }

    const data = await res.json();
    return { ok: true, data };
  } catch (err: any) {
    return { ok: false, status: 500, error: err.message || 'Network request failed' };
  }
}

// API Routes
app.get('/api/coc/server-ip', async (_req: Request, res: Response) => {
  try {
    const ipRes = await fetch('https://api.ipify.org?format=json');
    if (ipRes.ok) {
      const { ip } = await ipRes.json();
      return res.json({ ip });
    }
  } catch (e) {
    // ignore
  }
  return res.json({ ip: 'Auto-detected / Dynamic' });
});

app.post('/api/coc/verify', async (req: Request, res: Response) => {
  const { token, playerTag } = req.body;
  const tagToTest = playerTag ? encodeURIComponent(cleanTagParam(playerTag)) : '%232PP';
  const result = await fetchFromOfficialApi(`/players/${tagToTest}`, token);
  if (result.ok) {
    return res.json({ valid: true, message: 'API token is valid and authorized!' });
  }
  return res.json({
    valid: false,
    status: result.status,
    message: result.error || 'Authorization failed. Check token or IP whitelist.'
  });
});

app.get('/api/coc/player/:tag', async (req: Request, res: Response) => {
  const rawTag = req.params.tag;
  const tag = cleanTagParam(rawTag);
  const userToken = req.headers['x-coc-token'] as string | undefined;

  // Try official API first
  const apiRes = await fetchFromOfficialApi(`/players/${encodeURIComponent(tag)}`, userToken);
  if (apiRes.ok && apiRes.data) {
    return res.json({
      success: true,
      source: 'official_api',
      data: apiRes.data
    });
  }

  // Fallback to Fixture player or generate responsive player profile matching tag
  const fixture = FIXTURE_PLAYERS[tag] || FIXTURE_PLAYERS['#2PP'];
  const playerCopy = { ...fixture, tag };
  return res.json({
    success: true,
    source: userToken ? 'api_error_fallback' : 'fixture_data',
    apiError: apiRes.error,
    data: playerCopy
  });
});

app.get('/api/coc/clan/:tag', async (req: Request, res: Response) => {
  const rawTag = req.params.tag;
  const tag = cleanTagParam(rawTag);
  const userToken = req.headers['x-coc-token'] as string | undefined;

  const apiRes = await fetchFromOfficialApi(`/clans/${encodeURIComponent(tag)}`, userToken);
  if (apiRes.ok && apiRes.data) {
    return res.json({
      success: true,
      source: 'official_api',
      data: apiRes.data
    });
  }

  return res.json({
    success: true,
    source: userToken ? 'api_error_fallback' : 'fixture_data',
    apiError: apiRes.error,
    data: { ...FIXTURE_CLAN, tag }
  });
});

app.get('/api/coc/war/:tag', async (req: Request, res: Response) => {
  const rawTag = req.params.tag;
  const tag = cleanTagParam(rawTag);
  const userToken = req.headers['x-coc-token'] as string | undefined;

  const apiRes = await fetchFromOfficialApi(`/clans/${encodeURIComponent(tag)}/currentwar`, userToken);
  if (apiRes.ok && apiRes.data && apiRes.data.state !== 'notInWar') {
    return res.json({
      success: true,
      source: 'official_api',
      data: apiRes.data
    });
  }

  return res.json({
    success: true,
    source: userToken ? 'api_error_fallback' : 'fixture_data',
    apiError: apiRes.error,
    data: FIXTURE_WAR
  });
});

app.get('/api/coc/raid/:tag', async (req: Request, res: Response) => {
  const rawTag = req.params.tag;
  const tag = cleanTagParam(rawTag);
  const userToken = req.headers['x-coc-token'] as string | undefined;

  const apiRes = await fetchFromOfficialApi(`/clans/${encodeURIComponent(tag)}/capitalraidseasons`, userToken);
  if (apiRes.ok && apiRes.data && apiRes.data.items) {
    return res.json({
      success: true,
      source: 'official_api',
      data: apiRes.data
    });
  }

  return res.json({
    success: true,
    source: userToken ? 'api_error_fallback' : 'fixture_data',
    apiError: apiRes.error,
    data: FIXTURE_RAID
  });
});

// Setup Vite dev server or static build
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Clash Pulse server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
