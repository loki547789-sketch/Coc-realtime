import React, { useState } from 'react';
import { ClanInfo, PlayerAccount } from '../types/coc';
import { 
  Users, 
  Trophy, 
  Award, 
  Search, 
  ShieldCheck, 
  Send, 
  ChevronRight,
  TrendingUp,
  Flame
} from 'lucide-react';

interface ClanRosterViewProps {
  clan: ClanInfo;
  activeAccount: PlayerAccount;
}

export const ClanRosterView: React.FC<ClanRosterViewProps> = ({
  clan,
  activeAccount
}) => {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');

  const members = clan.memberList || [];

  const filteredMembers = members.filter((m) => {
    if (roleFilter !== 'all' && m.role !== roleFilter) return false;
    if (search.trim()) {
      return (
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.tag.toLowerCase().includes(search.toLowerCase())
      );
    }
    return true;
  });

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'leader':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">Leader</span>;
      case 'coLeader':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40">Co-Leader</span>;
      case 'admin':
      case 'elder':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">Elder</span>;
      default:
        return <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-800 text-slate-400">Member</span>;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Clan Overview Header Banner */}
      <div className="bg-[#121824] border border-slate-800 rounded-2xl p-5 md:p-6 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 p-0.5 flex items-center justify-center">
              <div className="w-full h-full bg-[#111726] rounded-[10px] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-heading font-black text-xl text-slate-100">
                  {clan.name}
                </h2>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  Level {clan.clanLevel}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                {clan.tag} · {clan.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-[11px] text-slate-400">War Win Streak</div>
              <div className="font-mono-num font-black text-amber-400 text-base flex items-center justify-end gap-1">
                <Flame className="w-4 h-4 fill-amber-400 inline" />
                <span>{clan.warWinStreak} Wins</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Clan Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-[#0b0e14] border border-slate-800 rounded-xl p-3.5">
            <div className="text-xs text-slate-400">Clan Points</div>
            <div className="font-mono-num font-black text-lg text-amber-400 mt-1">
              {clan.clanPoints?.toLocaleString()} 🏆
            </div>
          </div>

          <div className="bg-[#0b0e14] border border-slate-800 rounded-xl p-3.5">
            <div className="text-xs text-slate-400">War Record</div>
            <div className="font-mono-num font-black text-lg text-emerald-400 mt-1">
              {clan.warWins}W <span className="text-slate-500 font-normal">/</span> {clan.warLosses}L
            </div>
          </div>

          <div className="bg-[#0b0e14] border border-slate-800 rounded-xl p-3.5">
            <div className="text-xs text-slate-400">Capital Points</div>
            <div className="font-mono-num font-black text-lg text-purple-400 mt-1">
              {clan.clanCapitalPoints?.toLocaleString()}
            </div>
          </div>

          <div className="bg-[#0b0e14] border border-slate-800 rounded-xl p-3.5">
            <div className="text-xs text-slate-400">Roster Capacity</div>
            <div className="font-mono-num font-black text-lg text-slate-100 mt-1">
              {members.length} / 50
            </div>
          </div>
        </div>
      </div>

      {/* Roster Table */}
      <div className="bg-[#121824] border border-slate-800 rounded-2xl p-5 space-y-4">
        
        {/* Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-amber-400" />
            <h3 className="font-heading font-bold text-sm text-slate-200 uppercase tracking-wider">
              Clan Members Roster
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
                className="bg-[#0b0e14] border border-slate-800 rounded-lg py-1.5 pl-8 pr-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="flex items-center gap-1 p-0.5 bg-[#0b0e14] rounded-lg border border-slate-800 text-xs">
              {['all', 'leader', 'coLeader', 'elder', 'member'].map((role) => (
                <button
                  key={role}
                  onClick={() => setRoleFilter(role)}
                  className={`px-2.5 py-1 rounded font-medium capitalize ${
                    roleFilter === role
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {role === 'coLeader' ? 'Co-Leader' : role}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Member Rows */}
        <div className="space-y-2">
          {filteredMembers.map((member) => {
            const isCurrentAccount = member.tag === activeAccount.tag;

            return (
              <div
                key={member.tag}
                className={`bg-[#0b0e14] border rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isCurrentAccount
                    ? 'border-amber-500/70 bg-amber-500/5'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#161f30] border border-slate-700 flex items-center justify-center font-mono-num font-bold text-xs text-slate-300 shrink-0">
                    #{member.clanRank}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-heading font-bold text-sm text-slate-100">
                        {member.name}
                      </span>
                      {getRoleBadge(member.role)}
                      {isCurrentAccount && (
                        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400">
                          Active Account
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                      {member.tag} · XP Lv {member.expLevel}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 shrink-0">
                  {/* Donations */}
                  <div className="text-left sm:text-right text-xs">
                    <div className="font-mono-num font-semibold text-slate-300">
                      ▲ {member.donations?.toLocaleString()} / ▼ {member.donationsReceived?.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      Donations
                    </div>
                  </div>

                  {/* Trophies */}
                  <div className="text-right">
                    <div className="font-mono-num font-bold text-amber-400 text-sm flex items-center justify-end gap-1">
                      <Trophy className="w-3.5 h-3.5 inline text-amber-400" />
                      <span>{member.trophies?.toLocaleString()}</span>
                    </div>
                    <div className="text-[10px] text-slate-500">
                      {member.league?.name || 'Trophies'}
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
