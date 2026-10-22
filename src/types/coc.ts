export interface PlayerHero {
  name: string;
  level: number;
  maxLevel: number;
  village: 'home' | 'builderBase';
}

export interface PlayerTroop {
  name: string;
  level: number;
  maxLevel: number;
  village: 'home' | 'builderBase';
}

export interface PlayerEquipment {
  name: string;
  level: number;
  maxLevel: number;
  village: 'home' | 'builderBase';
}

export interface PlayerAchievement {
  name: string;
  stars: number;
  value: number;
  target: number;
  info: string;
  completionInfo?: string;
  village: 'home' | 'builderBase';
}

export interface PlayerAccount {
  id: string;
  tag: string;
  name: string;
  nickname?: string;
  townHallLevel: number;
  townHallWeaponLevel?: number;
  builderHallLevel: number;
  expLevel: number;
  trophies: number;
  bestTrophies: number;
  warStars: number;
  attackWins?: number;
  defenseWins?: number;
  role?: string;
  warPreference?: 'in' | 'out';
  clan?: {
    name: string;
    tag: string;
    clanLevel: number;
    badgeUrls?: {
      small: string;
      large: string;
      medium: string;
    };
  };
  heroes: PlayerHero[];
  heroEquipment: PlayerEquipment[];
  troops: PlayerTroop[];
  spells: PlayerTroop[];
  achievements?: PlayerAchievement[];
  donations?: number;
  donationsReceived?: number;
  clanCapitalContributions?: number;
  lastSyncedAt?: number;
}

export interface WarMemberAttack {
  attackerTag: string;
  defenderTag: string;
  stars: number;
  destructionPercentage: number;
  order: number;
  duration?: number;
}

export interface WarMember {
  tag: string;
  name: string;
  townhallLevel: number;
  mapPosition: number;
  attacks?: WarMemberAttack[];
  opponentAttacks: number;
  bestOpponentAttack?: {
    attackerTag: string;
    defenderTag: string;
    stars: number;
    destructionPercentage: number;
  };
}

export interface ClanWarData {
  state: 'notInWar' | 'preparation' | 'inWar' | 'warEnded';
  teamSize: number;
  attacksPerMember: number;
  startTime: string;
  endTime: string;
  clan: {
    tag: string;
    name: string;
    clanLevel: number;
    attacks: number;
    stars: number;
    destructionPercentage: number;
    badgeUrls?: {
      small: string;
      medium: string;
      large: string;
    };
    members: WarMember[];
  };
  opponent: {
    tag: string;
    name: string;
    clanLevel: number;
    attacks: number;
    stars: number;
    destructionPercentage: number;
    badgeUrls?: {
      small: string;
      medium: string;
      large: string;
    };
    members?: WarMember[];
  };
}

export interface RaidDistrict {
  id: number;
  name: string;
  districtHallLevel: number;
  destructionPercent: number;
  attackCount: number;
  totalLooted: number;
}

export interface RaidMemberContribution {
  tag: string;
  name: string;
  attacks: number;
  attackLimit: number;
  bonusAttackLimit: number;
  capitalResourcesLooted: number;
}

export interface CapitalRaidSeason {
  state: 'ongoing' | 'ended';
  startTime: string;
  endTime: string;
  capitalTotalLoot: number;
  raidsCompleted: number;
  totalAttacks: number;
  enemyDistrictsDestroyed: number;
  offensiveReward: number;
  defensiveReward: number;
  members: RaidMemberContribution[];
  attackLog: Array<{
    defender: {
      tag: string;
      name: string;
      level: number;
      badgeUrls?: any;
    };
    attackCount: number;
    districtCount: number;
    districtsDestroyed: number;
    districts: RaidDistrict[];
  }>;
}

export interface ClanMemberSummary {
  tag: string;
  name: string;
  role: string;
  expLevel: number;
  league?: { name: string };
  trophies: number;
  clanRank: number;
  donations: number;
  donationsReceived: number;
}

export interface ClanInfo {
  tag: string;
  name: string;
  type: string;
  description: string;
  clanLevel: number;
  clanPoints: number;
  clanCapitalPoints: number;
  warWinStreak: number;
  warWins: number;
  warTies: number;
  warLosses: number;
  members: number;
  memberList: ClanMemberSummary[];
  badgeUrls?: {
    small: string;
    medium: string;
    large: string;
  };
}
