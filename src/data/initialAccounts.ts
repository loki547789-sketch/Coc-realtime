import { PlayerAccount } from '../types/coc';

const now = Date.now();

export const INITIAL_ACCOUNTS: PlayerAccount[] = [
  {
    id: 'acc_main',
    tag: '#2PP',
    name: 'Klaus Valhalla',
    nickname: 'Main (TH17 Titan)',
    townHallLevel: 17,
    townHallWeaponLevel: 5,
    builderHallLevel: 10,
    expLevel: 268,
    trophies: 5640,
    bestTrophies: 6120,
    warStars: 2450,
    attackWins: 142,
    defenseWins: 38,
    role: 'leader',
    warPreference: 'in',
    clan: {
      name: 'Valhalla Kings',
      tag: '#2Q29V9L',
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
      { name: 'Root Rider', level: 3, maxLevel: 3, village: 'home' },
      { name: 'Electro Dragon', level: 7, maxLevel: 7, village: 'home' },
      { name: 'Super Archer', level: 12, maxLevel: 12, village: 'home' },
      { name: 'Super Miner', level: 10, maxLevel: 10, village: 'home' },
      { name: 'Dragon Rider', level: 4, maxLevel: 4, village: 'home' },
      { name: 'Bowler', level: 8, maxLevel: 8, village: 'home' },
      { name: 'Healer', level: 9, maxLevel: 9, village: 'home' },
      { name: 'Hog Rider', level: 13, maxLevel: 13, village: 'home' },
      { name: 'P.E.K.K.A', level: 11, maxLevel: 11, village: 'home' },
      { name: 'Miner', level: 10, maxLevel: 10, village: 'home' },
      { name: 'Wizard', level: 12, maxLevel: 12, village: 'home' },
      { name: 'Balloon', level: 11, maxLevel: 11, village: 'home' }
    ],
    spells: [
      { name: 'Rage Spell', level: 6, maxLevel: 6, village: 'home' },
      { name: 'Freeze Spell', level: 7, maxLevel: 7, village: 'home' },
      { name: 'Overgrowth Spell', level: 4, maxLevel: 4, village: 'home' },
      { name: 'Poison Spell', level: 10, maxLevel: 10, village: 'home' },
      { name: 'Invisibility Spell', level: 4, maxLevel: 4, village: 'home' },
      { name: 'Bat Spell', level: 6, maxLevel: 6, village: 'home' }
    ],
    achievements: [
      { name: 'War Hero', stars: 3, value: 2450, target: 1000, info: 'Score stars for your clan in Clan War battles', village: 'home' },
      { name: 'Aggressive Capitalism', stars: 3, value: 1450000, target: 1000000, info: 'Loot Capital Gold in Raid Weekends', village: 'home' },
      { name: 'Gold Grab', stars: 3, value: 2000000000, target: 2000000000, info: 'Steal Gold from enemies', village: 'home' },
      { name: 'Sharing is Caring', stars: 3, value: 125000, target: 100000, info: 'Donate troops to clanmates', village: 'home' }
    ],
    donations: 12480,
    donationsReceived: 8950,
    clanCapitalContributions: 1450000,
    lastSyncedAt: now - 15 * 60 * 1000
  },
  {
    id: 'acc_mini',
    tag: '#8UP8',
    name: 'Shadow Valkyrie',
    nickname: 'Mini (TH16 CWL)',
    townHallLevel: 16,
    townHallWeaponLevel: 4,
    builderHallLevel: 9,
    expLevel: 215,
    trophies: 4980,
    bestTrophies: 5410,
    warStars: 1780,
    attackWins: 98,
    defenseWins: 24,
    role: 'coLeader',
    warPreference: 'in',
    clan: {
      name: 'Valhalla Kings',
      tag: '#2Q29V9L',
      clanLevel: 24
    },
    heroes: [
      { name: 'Barbarian King', level: 88, maxLevel: 95, village: 'home' },
      { name: 'Archer Queen', level: 90, maxLevel: 95, village: 'home' },
      { name: 'Grand Warden', level: 65, maxLevel: 70, village: 'home' },
      { name: 'Royal Champion', level: 38, maxLevel: 45, village: 'home' },
      { name: 'Minion Prince', level: 20, maxLevel: 40, village: 'home' },
      { name: 'Battle Machine', level: 35, maxLevel: 35, village: 'builderBase' }
    ],
    heroEquipment: [
      { name: 'Giant Gauntlet', level: 24, maxLevel: 27, village: 'home' },
      { name: 'Frozen Arrow', level: 23, maxLevel: 27, village: 'home' },
      { name: 'Eternal Tome', level: 18, maxLevel: 18, village: 'home' },
      { name: 'Healing Tome', level: 15, maxLevel: 18, village: 'home' }
    ],
    troops: [
      { name: 'Root Rider', level: 2, maxLevel: 3, village: 'home' },
      { name: 'Electro Dragon', level: 6, maxLevel: 7, village: 'home' },
      { name: 'Super Archer', level: 11, maxLevel: 12, village: 'home' },
      { name: 'Dragon Rider', level: 3, maxLevel: 4, village: 'home' },
      { name: 'Healer', level: 8, maxLevel: 9, village: 'home' }
    ],
    spells: [
      { name: 'Rage Spell', level: 6, maxLevel: 6, village: 'home' },
      { name: 'Freeze Spell', level: 7, maxLevel: 7, village: 'home' },
      { name: 'Overgrowth Spell', level: 3, maxLevel: 4, village: 'home' }
    ],
    achievements: [
      { name: 'War Hero', stars: 3, value: 1780, target: 1000, info: 'Score stars for your clan in Clan War battles', village: 'home' },
      { name: 'Aggressive Capitalism', stars: 3, value: 980000, target: 1000000, info: 'Loot Capital Gold in Raid Weekends', village: 'home' }
    ],
    donations: 7450,
    donationsReceived: 4200,
    clanCapitalContributions: 980000,
    lastSyncedAt: now - 35 * 60 * 1000
  },
  {
    id: 'acc_dono',
    tag: '#9Y9G',
    name: 'Iron Forge (Mini)',
    nickname: 'Alt (TH14 Donation)',
    townHallLevel: 14,
    townHallWeaponLevel: 5,
    builderHallLevel: 9,
    expLevel: 172,
    trophies: 3850,
    bestTrophies: 4300,
    warStars: 1120,
    attackWins: 65,
    defenseWins: 18,
    role: 'elder',
    warPreference: 'in',
    clan: {
      name: 'Valhalla Kings',
      tag: '#2Q29V9L',
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
      { name: 'Dragon', level: 9, maxLevel: 10, village: 'home' },
      { name: 'Balloon', level: 9, maxLevel: 11, village: 'home' }
    ],
    spells: [
      { name: 'Rage Spell', level: 5, maxLevel: 6, village: 'home' },
      { name: 'Freeze Spell', level: 6, maxLevel: 7, village: 'home' }
    ],
    achievements: [
      { name: 'War Hero', stars: 3, value: 1120, target: 1000, info: 'Score stars for your clan in Clan War battles', village: 'home' }
    ],
    donations: 5120,
    donationsReceived: 6200,
    clanCapitalContributions: 620000,
    lastSyncedAt: now - 50 * 60 * 1000
  }
];
