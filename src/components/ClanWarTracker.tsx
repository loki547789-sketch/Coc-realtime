import React, { useState, useEffect } from 'react';
import { ClanWarData, PlayerAccount } from '../types/coc';
import { formatDuration } from '../utils/format';
import { 
  Swords, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  Star, 
  Filter, 
  Crosshair, 
  Users, 
  ChevronRight,
  Flame,
  Award
} from 'lucide-react';

interface ClanWarTrackerProps {
  warData: ClanWarData;
  activeAccount: PlayerAccount;
  onRefreshWar: () => void;
  isSyncing: boolean;
}

export const ClanWarTracker: React.FC<ClanWarTrackerProps> = ({
  warData,
  activeAccount,
  onRefreshWar,
  isSyncing
}) => {
  const [filterState, setFilterState] = useState<'all' | 'pending' | 'completed'>('all');
  const [baseCallNotes, setBaseCallNotes] = useState<Record<number, string>>({
    1: 'Reserved for Klaus (TH17 Root Rider smash)',
    2: 'Reserved for Shadow (Super Archer blimp)',
    4: 'Open for clean-up 2★+'
  });
  const [editingTarget, setEditingTarget] = useState<number | null>(null);
  const [noteInput, setNoteInput] = useState('');

  // Countdown timer
  const [remainingSeconds, setRemainingSeconds] = useState(0);

  useEffect(() => {
    // Parse war endTime
    // warData.endTime format is standard Supercell ISO e.g. 20261023T183000.000Z or ISO string
    let endMs = Date.now() + 10 * 3600 * 1000;
    if (warData.endTime) {
      // Clean ISO string if in Supercell condensed format
      const cleaned = warData.endTime.replace(
        /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})\.(\d{3})Z$/,
        '$1-$2-$3T$4:$5:$6.$7Z'
      );
      const parsed = Date.parse(cleaned);
      if (!isNaN(parsed)) {
        endMs = parsed;
      }
    }

    const updateTimer = () => {
      const diff = Math.max(0, Math.floor((endMs - Date.now()) / 1000));
      setRemainingSeconds(diff);
    };
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [warData.endTime]);

  const maxPossibleAttacks = warData.teamSize * (warData.attacksPerMember || 2);
  const clanAttacks = warData.clan.attacks || 0;
  const opponentAttacks = warData.opponent.attacks || 0;

  const clanMembers = warData.clan.members || [];

  const filteredMembers = clanMembers.filter((m) => {
    const attacksUsed = m.attacks ? m.attacks.length : 0;
    const requiredAttacks = warData.attacksPerMember || 2;
    if (filterState === 'pending') {
      return attacksUsed < requiredAttacks;
    }
    if (filterState === 'completed') {
      return attacksUsed >= requiredAttacks;
    }
    return true;
  });

  const pendingAttacksCount = clanMembers.filter(
    (m) => (m.attacks?.length || 0) < (warData.attacksPerMember || 2)
  ).length;

  const handleSaveNote = (targetNum: number) => {
    setBaseCallNotes((prev) => ({
      ...prev,
      [targetNum]: noteInput.trim()
    }));
    setEditingTarget(null);
    setNoteInput('');
  };

  return (
    <div className="space-y-6">
      
      {/* War Status & Head to Head Matchup Banner */}
      <div className="relative overflow-hidden bg-[#121824] border border-slate-800 rounded-2xl shadow-xl">
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/clan_war_crest_1792685385888.jpg"
            alt="War Crest"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-15 filter brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d121c]/90 via-[#0d121c]/95 to-[#0d121c]" />
        </div>

        <div className="relative z-10 p-5 md:p-6 space-y-6">
          
          {/* Top War State Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400">
                <Swords className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-heading font-black text-lg text-slate-100 uppercase tracking-wider">
                    Clan War · Battle Day
                  </h2>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse">
                    LIVE
                  </span>
                </div>
                <div className="text-xs text-slate-400">
                  {warData.teamSize} vs {warData.teamSize} Format · 2 Attacks Per Chief
                </div>
              </div>
            </div>

            {/* Countdown Clock */}
            <div className="flex items-center gap-2 bg-[#0b0e14] border border-slate-800 px-3.5 py-1.5 rounded-xl self-start sm:self-auto">
              <Clock className="w-4 h-4 text-amber-400" />
              <div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                  War Ends In
                </div>
                <div className="font-mono-num font-bold text-amber-300 text-sm">
                  {formatDuration(remainingSeconds)}
                </div>
              </div>
            </div>
          </div>

          {/* Head-to-Head Clash Scoreboard */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            
            {/* Friendly Clan */}
            <div className="text-center md:text-left space-y-1">
              <div className="text-xs text-emerald-400 font-bold uppercase tracking-wider">
                Your Clan
              </div>
              <h3 className="font-heading font-black text-xl md:text-2xl text-slate-100">
                {warData.clan.name}
              </h3>
              <div className="text-xs text-slate-400 font-mono">
                Level {warData.clan.clanLevel} · {warData.clan.tag}
              </div>
            </div>

            {/* Big Center Score */}
            <div className="bg-[#0b0e14] border border-slate-800 rounded-xl p-4 text-center space-y-3">
              <div className="flex items-center justify-center gap-4">
                <div className="text-center">
                  <div className="font-mono-num font-black text-3xl md:text-4xl text-amber-400 flex items-center justify-center gap-1">
                    <span>{warData.clan.stars}</span>
                    <Star className="w-5 h-5 fill-amber-400 text-amber-400 inline" />
                  </div>
                  <div className="text-xs font-mono-num text-slate-400 mt-1">
                    {warData.clan.destructionPercentage.toFixed(1)}%
                  </div>
                </div>

                <span className="font-heading font-black text-slate-600 text-xl">VS</span>

                <div className="text-center">
                  <div className="font-mono-num font-black text-3xl md:text-4xl text-slate-300 flex items-center justify-center gap-1">
                    <span>{warData.opponent.stars}</span>
                    <Star className="w-5 h-5 fill-slate-400 text-slate-400 inline" />
                  </div>
                  <div className="text-xs font-mono-num text-slate-400 mt-1">
                    {warData.opponent.destructionPercentage.toFixed(1)}%
                  </div>
                </div>
              </div>

              {/* Attacks comparison bar */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono-num">
                  <span>Attacks: {clanAttacks}/{maxPossibleAttacks}</span>
                  <span>Opponent: {opponentAttacks}/{maxPossibleAttacks}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden flex">
                  <div
                    className="bg-emerald-500 h-full transition-all"
                    style={{ width: `${(clanAttacks / maxPossibleAttacks) * 100}%` }}
                  />
                  <div
                    className="bg-red-500/60 h-full ml-auto transition-all"
                    style={{ width: `${(opponentAttacks / maxPossibleAttacks) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Opponent Clan */}
            <div className="text-center md:text-right space-y-1">
              <div className="text-xs text-red-400 font-bold uppercase tracking-wider">
                Opponent
              </div>
              <h3 className="font-heading font-black text-xl md:text-2xl text-slate-100">
                {warData.opponent.name}
              </h3>
              <div className="text-xs text-slate-400 font-mono">
                Level {warData.opponent.clanLevel} · {warData.opponent.tag}
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Roster & Attack Strategy Section */}
      <div className="bg-[#121824] border border-slate-800 rounded-2xl p-5 space-y-5">
        
        {/* Table Controls & Filter Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-amber-400" />
            <h3 className="font-heading font-bold text-sm text-slate-200 uppercase tracking-wider">
              Clan War Roster & Attack Log
            </h3>
            {pendingAttacksCount > 0 && (
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                {pendingAttacksCount} Members Have Attacks Left
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 p-1 bg-[#0b0e14] rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setFilterState('all')}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                filterState === 'all'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All ({clanMembers.length})
            </button>
            <button
              onClick={() => setFilterState('pending')}
              className={`px-3 py-1 rounded-md font-medium transition-colors flex items-center gap-1 ${
                filterState === 'pending'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ShieldAlert className="w-3 h-3" />
              <span>Pending Attacks ({pendingAttacksCount})</span>
            </button>
            <button
              onClick={() => setFilterState('completed')}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                filterState === 'completed'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Completed
            </button>
          </div>
        </div>

        {/* Member Roster List */}
        <div className="space-y-2.5">
          {filteredMembers.map((member) => {
            const attacks = member.attacks || [];
            const attacksRemaining = Math.max(0, (warData.attacksPerMember || 2) - attacks.length);
            const isUserAccount = member.tag === activeAccount.tag;

            return (
              <div
                key={member.tag}
                className={`bg-[#0b0e14] border rounded-xl p-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all ${
                  isUserAccount
                    ? 'border-amber-500/70 bg-amber-500/5'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Left: Position & Player Info */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#161f30] border border-slate-700 flex items-center justify-center font-mono-num font-bold text-slate-200 text-xs shrink-0">
                    #{member.mapPosition}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-heading font-bold text-sm text-slate-100">
                        {member.name}
                      </span>
                      <span className="text-[10px] font-mono-num font-bold px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                        TH{member.townhallLevel}
                      </span>
                      {isUserAccount && (
                        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400">
                          You
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                      {member.tag}
                    </div>
                  </div>
                </div>

                {/* Middle: Attack 1 & Attack 2 Breakdown */}
                <div className="flex items-center gap-3 flex-wrap">
                  {/* Attack 1 */}
                  {attacks[0] ? (
                    <div className="flex items-center gap-1.5 bg-[#121824] border border-slate-800 rounded-lg px-2.5 py-1 text-xs">
                      <span className="text-[10px] text-slate-400">Atk 1:</span>
                      <span className="font-mono-num font-bold text-amber-400">
                        {'★'.repeat(attacks[0].stars)}
                        {'☆'.repeat(3 - attacks[0].stars)}
                      </span>
                      <span className="font-mono-num text-[11px] text-slate-300">
                        ({attacks[0].destructionPercentage}%)
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 bg-red-500/10 border border-red-500/30 rounded-lg px-2.5 py-1 text-xs text-red-400">
                      <Clock className="w-3 h-3" />
                      <span>Attack #1 Unused</span>
                    </div>
                  )}

                  {/* Attack 2 */}
                  {attacks[1] ? (
                    <div className="flex items-center gap-1.5 bg-[#121824] border border-slate-800 rounded-lg px-2.5 py-1 text-xs">
                      <span className="text-[10px] text-slate-400">Atk 2:</span>
                      <span className="font-mono-num font-bold text-amber-400">
                        {'★'.repeat(attacks[1].stars)}
                        {'☆'.repeat(3 - attacks[1].stars)}
                      </span>
                      <span className="font-mono-num text-[11px] text-slate-300">
                        ({attacks[1].destructionPercentage}%)
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/30 rounded-lg px-2.5 py-1 text-xs text-amber-400">
                      <Clock className="w-3 h-3" />
                      <span>Attack #2 Unused</span>
                    </div>
                  )}
                </div>

                {/* Right: Status Tag & Defense summary */}
                <div className="flex items-center justify-between md:justify-end gap-3 shrink-0">
                  {attacksRemaining === 0 ? (
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Done (2/2)
                    </span>
                  ) : (
                    <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      {attacksRemaining} Attack{attacksRemaining > 1 ? 's' : ''} Left!
                    </span>
                  )}

                  {member.bestOpponentAttack && (
                    <span className="text-[11px] text-slate-400 font-mono-num hidden sm:inline" title="Best defense result">
                      Defended: {member.bestOpponentAttack.stars}★ ({member.bestOpponentAttack.destructionPercentage}%)
                    </span>
                  )}
                </div>

              </div>
            );
          })}
        </div>

        {/* War Strategy & Target Reservation Board */}
        <div className="mt-6 pt-5 border-t border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Crosshair className="w-4 h-4 text-red-400" />
              Clan Target Calls & Strategy Notes
            </h4>
            <span className="text-[11px] text-slate-500">
              Coordinate attacks to avoid overlapping hits
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[1, 2, 3].map((targetNum) => {
              const note = baseCallNotes[targetNum];
              const isEditing = editingTarget === targetNum;

              return (
                <div
                  key={targetNum}
                  className="bg-[#0b0e14] border border-slate-800 rounded-xl p-3 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-amber-400">Enemy Base #{targetNum}</span>
                      <span className="text-[10px] text-slate-500">TH17 Priority</span>
                    </div>

                    {isEditing ? (
                      <div className="mt-2 space-y-2">
                        <input
                          type="text"
                          value={noteInput}
                          onChange={(e) => setNoteInput(e.target.value)}
                          placeholder="e.g. Call for TH17 Smash..."
                          className="w-full bg-[#161f30] border border-slate-700 rounded px-2 py-1 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                        />
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setEditingTarget(null)}
                            className="text-[11px] text-slate-400 hover:text-slate-200"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleSaveNote(targetNum)}
                            className="text-[11px] bg-amber-500 text-slate-950 font-bold px-2 py-0.5 rounded"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs text-slate-300 mt-1 min-h-[36px]">
                        {note || <span className="text-slate-500 italic">No reservation yet</span>}
                      </p>
                    )}
                  </div>

                  {!isEditing && (
                    <button
                      onClick={() => {
                        setEditingTarget(targetNum);
                        setNoteInput(note || '');
                      }}
                      className="mt-3 text-[11px] font-semibold text-slate-400 hover:text-amber-400 text-left transition-colors"
                    >
                      {note ? '✎ Edit Call' : '+ Call Target'}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
