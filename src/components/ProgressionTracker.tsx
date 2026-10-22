import React, { useState } from 'react';
import { PlayerAccount, PlayerHero, PlayerEquipment, PlayerTroop } from '../types/coc';
import { 
  Crown, 
  Sparkles, 
  FlaskConical, 
  CheckCircle2, 
  Search, 
  Filter, 
  TrendingUp, 
  Building2,
  ChevronRight,
  ShieldCheck,
  Zap
} from 'lucide-react';

interface ProgressionTrackerProps {
  account: PlayerAccount;
  onRefresh: () => void;
  isSyncing: boolean;
}

export const ProgressionTracker: React.FC<ProgressionTrackerProps> = ({
  account,
  onRefresh,
  isSyncing
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'heroes' | 'equipment' | 'troops' | 'spells'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'maxed'>('all');
  const [search, setSearch] = useState('');

  const heroes = account.heroes || [];
  const equipment = account.heroEquipment || [];
  const troops = account.troops || [];
  const spells = account.spells || [];

  // Progression math
  const calculateCategoryStats = (items: Array<{ level: number; maxLevel: number }>) => {
    if (!items.length) return { current: 0, max: 0, percent: 100, remainingLevels: 0, maxedCount: 0 };
    const current = items.reduce((sum, item) => sum + item.level, 0);
    const max = items.reduce((sum, item) => sum + item.maxLevel, 0);
    const percent = max > 0 ? Math.round((current / max) * 100) : 100;
    const remainingLevels = Math.max(0, max - current);
    const maxedCount = items.filter((i) => i.level >= i.maxLevel).length;
    return { current, max, percent, remainingLevels, maxedCount };
  };

  const heroStats = calculateCategoryStats(heroes.filter(h => h.village === 'home'));
  const equipStats = calculateCategoryStats(equipment);
  const troopStats = calculateCategoryStats(troops);
  const spellStats = calculateCategoryStats(spells);

  // Overall progression
  const totalLevels = heroStats.current + equipStats.current + troopStats.current + spellStats.current;
  const totalMax = heroStats.max + equipStats.max + troopStats.max + spellStats.max;
  const overallPercent = totalMax > 0 ? Math.round((totalLevels / totalMax) * 100) : 100;
  const totalRemainingLevels = Math.max(0, totalMax - totalLevels);

  // Collect and filter items
  interface UnifiedItem {
    id: string;
    name: string;
    type: 'hero' | 'equipment' | 'troop' | 'spell';
    level: number;
    maxLevel: number;
    village: 'home' | 'builderBase';
  }

  const allItems: UnifiedItem[] = [
    ...heroes.map((h) => ({ id: `hero_${h.name}`, ...h, type: 'hero' as const })),
    ...equipment.map((e) => ({ id: `equip_${e.name}`, ...e, type: 'equipment' as const })),
    ...troops.map((t) => ({ id: `troop_${t.name}`, ...t, type: 'troop' as const })),
    ...spells.map((s) => ({ id: `spell_${s.name}`, ...s, type: 'spell' as const }))
  ];

  const filteredItems = allItems.filter((item) => {
    if (activeCategory === 'heroes' && item.type !== 'hero') return false;
    if (activeCategory === 'equipment' && item.type !== 'equipment') return false;
    if (activeCategory === 'troops' && item.type !== 'troop') return false;
    if (activeCategory === 'spells' && item.type !== 'spell') return false;

    const isMax = item.level >= item.maxLevel;
    if (statusFilter === 'pending' && isMax) return false;
    if (statusFilter === 'maxed' && !isMax) return false;

    if (search.trim()) {
      return item.name.toLowerCase().includes(search.toLowerCase());
    }
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Progression Overview KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        
        {/* Heroes Max Out KPI */}
        <div className="bg-[#121824] border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 flex items-center gap-1.5">
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span>Heroes Progression</span>
            </div>
            <div className="font-heading font-black text-xl md:text-2xl text-slate-100 mt-1">
              <span className="text-amber-400 font-mono-num">{heroStats.percent}%</span>
              <span className="text-slate-500 font-mono-num text-sm"> Maxed</span>
            </div>
            <div className="text-[11px] mt-0.5 text-slate-400">
              {heroStats.remainingLevels === 0 ? (
                <span className="text-emerald-400 font-semibold">All Heroes Maxed ★</span>
              ) : (
                <span className="text-amber-300 font-medium">{heroStats.remainingLevels} levels remaining</span>
              )}
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
            <Crown className="w-5 h-5 text-amber-400" />
          </div>
        </div>

        {/* Hero Equipment KPI */}
        <div className="bg-[#121824] border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Hero Equipment</span>
            </div>
            <div className="font-heading font-black text-xl md:text-2xl text-slate-100 mt-1">
              <span className="text-cyan-400 font-mono-num">{equipStats.percent}%</span>
              <span className="text-slate-500 font-mono-num text-sm"> Maxed</span>
            </div>
            <div className="text-[11px] mt-0.5 text-slate-400">
              {equipStats.remainingLevels === 0 ? (
                <span className="text-emerald-400 font-semibold">Maxed Equipment ★</span>
              ) : (
                <span className="text-cyan-300 font-medium">{equipStats.remainingLevels} upgrades to max</span>
              )}
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-cyan-400" />
          </div>
        </div>

        {/* Laboratory Troops KPI */}
        <div className="bg-[#121824] border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 flex items-center gap-1.5">
              <FlaskConical className="w-3.5 h-3.5 text-pink-400" />
              <span>Lab Troops</span>
            </div>
            <div className="font-heading font-black text-xl md:text-2xl text-slate-100 mt-1">
              <span className="text-pink-400 font-mono-num">{troopStats.percent}%</span>
              <span className="text-slate-500 font-mono-num text-sm"> Maxed</span>
            </div>
            <div className="text-[11px] mt-0.5 text-slate-400">
              {troopStats.remainingLevels === 0 ? (
                <span className="text-emerald-400 font-semibold">Troops Maxed ★</span>
              ) : (
                <span className="text-pink-300 font-medium">{troopStats.remainingLevels} levels remaining</span>
              )}
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-pink-500/10 border border-pink-500/30 flex items-center justify-center">
            <FlaskConical className="w-5 h-5 text-pink-400" />
          </div>
        </div>

        {/* Spells Progression KPI */}
        <div className="bg-[#121824] border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
              <span>Lab Spells</span>
            </div>
            <div className="font-heading font-black text-xl md:text-2xl text-slate-100 mt-1">
              <span className="text-purple-400 font-mono-num">{spellStats.percent}%</span>
              <span className="text-slate-500 font-mono-num text-sm"> Maxed</span>
            </div>
            <div className="text-[11px] mt-0.5 text-slate-400">
              {spellStats.remainingLevels === 0 ? (
                <span className="text-emerald-400 font-semibold">Spells Maxed ★</span>
              ) : (
                <span className="text-purple-300 font-medium">{spellStats.remainingLevels} levels remaining</span>
              )}
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-purple-400" />
          </div>
        </div>

      </div>

      {/* Town Hall Overall Progression Bar */}
      <div className="bg-[#121824] border border-slate-800 rounded-xl p-5 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-amber-400" />
            <h3 className="font-heading font-bold text-sm text-slate-200">
              Town Hall {account.townHallLevel} Maxing Progression
            </h3>
          </div>
          <div className="text-xs font-mono-num text-slate-300">
            <span className="font-bold text-amber-400">{overallPercent}%</span> Complete ·{' '}
            <span className="text-slate-400">{totalRemainingLevels} upgrades needed to max TH{account.townHallLevel}</span>
          </div>
        </div>

        <div className="w-full h-3 rounded-full bg-slate-900 border border-slate-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-400 rounded-full transition-all duration-500"
            style={{ width: `${overallPercent}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono-num pt-1">
          <span>Official Supercell API Live Synchronization</span>
          <span>Last Synced: {account.lastSyncedAt ? new Date(account.lastSyncedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Live'}</span>
        </div>
      </div>

      {/* Filters & Search Control Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        
        {/* Category Tabs */}
        <div className="flex items-center gap-1 p-1 bg-[#121824] rounded-lg border border-slate-800 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1 font-semibold rounded-md transition-all whitespace-nowrap ${
              activeCategory === 'all'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Upgrades ({allItems.length})
          </button>
          <button
            onClick={() => setActiveCategory('heroes')}
            className={`px-3 py-1 font-semibold rounded-md transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeCategory === 'heroes'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Crown className="w-3 h-3" />
            Heroes ({heroes.length})
          </button>
          <button
            onClick={() => setActiveCategory('equipment')}
            className={`px-3 py-1 font-semibold rounded-md transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeCategory === 'equipment'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3 h-3" />
            Equipment ({equipment.length})
          </button>
          <button
            onClick={() => setActiveCategory('troops')}
            className={`px-3 py-1 font-semibold rounded-md transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeCategory === 'troops'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FlaskConical className="w-3 h-3" />
            Troops ({troops.length})
          </button>
          <button
            onClick={() => setActiveCategory('spells')}
            className={`px-3 py-1 font-semibold rounded-md transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeCategory === 'spells'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Spells ({spells.length})
          </button>
        </div>

        {/* Status Filter & Search */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search upgrades..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-[#121824] border border-slate-800 rounded-lg py-1.5 pl-8 pr-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex items-center gap-1 p-0.5 bg-[#121824] rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-2 py-1 rounded font-medium ${
                statusFilter === 'all' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setStatusFilter('pending')}
              className={`px-2 py-1 rounded font-medium ${
                statusFilter === 'pending' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
              }`}
            >
              Needs Upgrade
            </button>
            <button
              onClick={() => setStatusFilter('maxed')}
              className={`px-2 py-1 rounded font-medium ${
                statusFilter === 'maxed' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
              }`}
            >
              Maxed ★
            </button>
          </div>
        </div>

      </div>

      {/* Upgrades Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => {
          const isMax = item.level >= item.maxLevel;
          const remaining = Math.max(0, item.maxLevel - item.level);
          const percent = Math.min(100, Math.round((item.level / item.maxLevel) * 100));

          return (
            <div
              key={item.id}
              className={`bg-[#121824] border rounded-xl p-4 flex flex-col justify-between transition-all ${
                isMax
                  ? 'border-emerald-500/30 bg-emerald-500/5'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {item.type} {item.village === 'builderBase' ? '· Builder Base' : ''}
                  </span>
                  {isMax ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      MAX LEVEL
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                      {remaining} Upgrade{remaining > 1 ? 's' : ''} Left
                    </span>
                  )}
                </div>

                <div className="mt-3 flex items-center justify-between gap-2">
                  <h4 className="font-heading font-bold text-base text-slate-100">
                    {item.name}
                  </h4>
                  <div className="font-mono-num font-bold text-xs text-slate-300">
                    <span className={isMax ? 'text-emerald-400' : 'text-amber-300'}>
                      Lv {item.level}
                    </span>
                    <span className="text-slate-500"> / {item.maxLevel}</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-3">
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        isMax ? 'bg-emerald-500' : 'bg-gradient-to-r from-amber-500 to-amber-400'
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span>TH{account.townHallLevel} Cap</span>
                <span className="font-mono-num font-semibold text-slate-300">
                  {percent}% Maxed
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
