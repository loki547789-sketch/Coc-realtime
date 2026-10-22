import React, { useState } from 'react';
import { CapitalRaidSeason, PlayerAccount } from '../types/coc';
import { 
  Landmark, 
  Coins, 
  Award, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Shield, 
  Users, 
  Flame,
  Search
} from 'lucide-react';

interface CapitalRaidTrackerProps {
  raidSeason: CapitalRaidSeason;
  activeAccount: PlayerAccount;
}

export const CapitalRaidTracker: React.FC<CapitalRaidTrackerProps> = ({
  raidSeason,
  activeAccount
}) => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'top'>('all');
  const [search, setSearch] = useState('');

  const members = raidSeason.members || [];
  const currentRaid = raidSeason.attackLog?.[0];

  const filteredMembers = members
    .filter((m) => {
      if (filter === 'pending') {
        const totalPossible = m.attackLimit + m.bonusAttackLimit;
        return m.attacks < totalPossible;
      }
      if (search.trim()) {
        return m.name.toLowerCase().includes(search.toLowerCase()) || m.tag.toLowerCase().includes(search.toLowerCase());
      }
      return true;
    })
    .sort((a, b) => {
      if (filter === 'top') {
        return b.capitalResourcesLooted - a.capitalResourcesLooted;
      }
      return 0;
    });

  const membersWithUnusedAttacks = members.filter(
    (m) => m.attacks < (m.attackLimit + m.bonusAttackLimit)
  ).length;

  return (
    <div className="space-y-6">
      
      {/* Top Banner: Capital Raid Weekend Summary */}
      <div className="bg-[#121824] border border-slate-800 rounded-2xl p-5 md:p-6 shadow-xl space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-heading font-black text-lg text-slate-100 uppercase tracking-wider">
                  Clan Capital Raid Weekend
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 animate-pulse">
                  ACTIVE WEEKEND
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Track member attack limits, capital gold loot, and district progression
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-[#0b0e14] border border-slate-800 px-3.5 py-1.5 rounded-xl self-start sm:self-auto">
            <Clock className="w-4 h-4 text-purple-400" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                Weekend Closes In
              </div>
              <div className="font-mono-num font-bold text-purple-300 text-sm">
                12h 45m Remaining
              </div>
            </div>
          </div>
        </div>

        {/* 4 Core Capital Raid KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          
          <div className="bg-[#0b0e14] border border-slate-800 rounded-xl p-4">
            <div className="text-xs text-slate-400 flex items-center gap-1.5">
              <Coins className="w-3.5 h-3.5 text-amber-400" />
              <span>Capital Gold Looted</span>
            </div>
            <div className="font-mono-num font-black text-xl md:text-2xl text-amber-400 mt-1">
              {raidSeason.capitalTotalLoot.toLocaleString()} 🪙
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              Across {raidSeason.totalAttacks} total hits
            </div>
          </div>

          <div className="bg-[#0b0e14] border border-slate-800 rounded-xl p-4">
            <div className="text-xs text-slate-400 flex items-center gap-1.5">
              <Landmark className="w-3.5 h-3.5 text-purple-400" />
              <span>Districts Destroyed</span>
            </div>
            <div className="font-mono-num font-black text-xl md:text-2xl text-purple-300 mt-1">
              {raidSeason.enemyDistrictsDestroyed} 🏰
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              {raidSeason.raidsCompleted} full clans raided
            </div>
          </div>

          <div className="bg-[#0b0e14] border border-slate-800 rounded-xl p-4">
            <div className="text-xs text-slate-400 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-cyan-400" />
              <span>Estimated Raid Medals</span>
            </div>
            <div className="font-mono-num font-black text-xl md:text-2xl text-cyan-300 mt-1">
              ~{(raidSeason.offensiveReward + raidSeason.defensiveReward).toLocaleString()} 🎖️
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              {raidSeason.offensiveReward} Offense + {raidSeason.defensiveReward} Defense
            </div>
          </div>

          <div className="bg-[#0b0e14] border border-slate-800 rounded-xl p-4">
            <div className="text-xs text-slate-400 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-emerald-400" />
              <span>Clan Participation</span>
            </div>
            <div className="font-mono-num font-black text-xl md:text-2xl text-slate-100 mt-1">
              {members.length} Chiefs
            </div>
            <div className="text-[11px] mt-0.5">
              {membersWithUnusedAttacks > 0 ? (
                <span className="text-amber-400 font-semibold">{membersWithUnusedAttacks} with attacks left</span>
              ) : (
                <span className="text-emerald-400">All attacks utilized</span>
              )}
            </div>
          </div>

        </div>

      </div>

      {/* Member Attack Leaderboard & Audit */}
      <div className="bg-[#121824] border border-slate-800 rounded-2xl p-5 space-y-5">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-purple-400" />
            <h3 className="font-heading font-bold text-sm text-slate-200 uppercase tracking-wider">
              Member Raid Attacks & Gold Contribution
            </h3>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search member..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-[#0b0e14] border border-slate-800 rounded-lg py-1 pl-8 pr-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="flex items-center gap-1 p-1 bg-[#0b0e14] rounded-lg border border-slate-800 text-xs">
              <button
                onClick={() => setFilter('all')}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  filter === 'all' ? 'bg-purple-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('pending')}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors flex items-center gap-1 ${
                  filter === 'pending' ? 'bg-purple-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <AlertTriangle className="w-3 h-3 text-amber-400" />
                <span>Unused Hits ({membersWithUnusedAttacks})</span>
              </button>
              <button
                onClick={() => setFilter('top')}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  filter === 'top' ? 'bg-purple-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Top Looters
              </button>
            </div>
          </div>
        </div>

        {/* Members Grid / Rows */}
        <div className="space-y-2">
          {filteredMembers.map((member, idx) => {
            const maxAttacks = member.attackLimit + member.bonusAttackLimit;
            const remaining = maxAttacks - member.attacks;
            const isUser = member.tag === activeAccount.tag;

            return (
              <div
                key={member.tag}
                className={`bg-[#0b0e14] border rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isUser
                    ? 'border-purple-500/70 bg-purple-500/5'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#161f30] border border-slate-700 flex items-center justify-center font-mono-num font-bold text-xs text-slate-300 shrink-0">
                    {idx + 1}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-heading font-bold text-sm text-slate-200">
                        {member.name}
                      </span>
                      {isUser && (
                        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300">
                          Active Chief
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      {member.tag}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 shrink-0">
                  {/* Attacks Badge */}
                  <div className="text-left sm:text-right">
                    <div className="text-xs font-mono-num font-bold">
                      {member.attacks === maxAttacks ? (
                        <span className="text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {member.attacks}/{maxAttacks} Completed
                        </span>
                      ) : (
                        <span className="text-amber-400 flex items-center gap-1 font-bold">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          {member.attacks}/{maxAttacks} ({remaining} Left!)
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      Attacks Used
                    </div>
                  </div>

                  {/* Capital Gold Looted */}
                  <div className="text-right">
                    <div className="text-sm font-mono-num font-black text-amber-400">
                      {member.capitalResourcesLooted.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      Gold Looted
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Current Enemy Districts Assault Progress */}
      {currentRaid && (
        <div className="bg-[#121824] border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="font-heading font-bold text-sm text-slate-200 uppercase tracking-wider">
                Current Raid Target: {currentRaid.defender.name}
              </h3>
              <p className="text-xs text-slate-400">
                {currentRaid.districtsDestroyed}/{currentRaid.districtCount} Districts 100% Destroyed
              </p>
            </div>
            <div className="font-mono-num font-bold text-xs text-purple-400 bg-purple-500/10 border border-purple-500/30 px-2.5 py-1 rounded-lg">
              {currentRaid.attackCount} Total Attacks Landed
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {currentRaid.districts.map((district) => (
              <div
                key={district.name}
                className="bg-[#0b0e14] border border-slate-800 rounded-xl p-3 space-y-2"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-200">{district.name}</span>
                  <span className="font-mono-num text-[11px] text-slate-400">
                    Hall Lv {district.districtHallLevel}
                  </span>
                </div>

                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                    style={{ width: `${district.destructionPercent}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono-num">
                  <span className={district.destructionPercent === 100 ? 'text-emerald-400 font-semibold' : 'text-amber-400'}>
                    {district.destructionPercent}% Destroyed
                  </span>
                  <span>{district.attackCount} hits · {district.totalLooted.toLocaleString()} gold</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
