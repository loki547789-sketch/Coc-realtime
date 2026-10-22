import React from 'react';
import { PlayerAccount } from '../types/coc';
import { 
  Users, 
  Crown, 
  FlaskConical, 
  Trophy, 
  Award, 
  Building2, 
  Plus, 
  Check, 
  ExternalLink,
  Sparkles,
  TrendingUp
} from 'lucide-react';

interface MultiAccountOverviewProps {
  accounts: PlayerAccount[];
  activeAccount: PlayerAccount;
  onSelectAccount: (acc: PlayerAccount) => void;
  onOpenAddAccount: () => void;
}

export const MultiAccountOverview: React.FC<MultiAccountOverviewProps> = ({
  accounts,
  activeAccount,
  onSelectAccount,
  onOpenAddAccount
}) => {
  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#121824] border border-slate-800 rounded-xl p-4 sm:p-5">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-amber-400" />
            <h2 className="font-heading font-bold text-lg text-slate-100">
              Multi-Account Village Command
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Monitor trophies, war stats, hero progression, and clan status across all {accounts.length} linked accounts
          </p>
        </div>

        <button
          onClick={onOpenAddAccount}
          className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Clash Account</span>
        </button>
      </div>

      {/* Accounts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {accounts.map((acc) => {
          const isActive = acc.id === activeAccount.id;
          
          // Hero calculations
          const homeHeroes = (acc.heroes || []).filter(h => h.village === 'home');
          const totalHeroLevels = homeHeroes.reduce((sum, h) => sum + h.level, 0);
          const totalHeroMax = homeHeroes.reduce((sum, h) => sum + h.maxLevel, 0);
          const heroPercent = totalHeroMax > 0 ? Math.round((totalHeroLevels / totalHeroMax) * 100) : 100;
          const remainingHeroLevels = Math.max(0, totalHeroMax - totalHeroLevels);

          // Equipment calculations
          const equipItems = acc.heroEquipment || [];
          const totalEquipLevels = equipItems.reduce((sum, e) => sum + e.level, 0);
          const totalEquipMax = equipItems.reduce((sum, e) => sum + e.maxLevel, 0);
          const equipPercent = totalEquipMax > 0 ? Math.round((totalEquipLevels / totalEquipMax) * 100) : 100;

          return (
            <div
              key={acc.id}
              className={`bg-[#121824] rounded-2xl border transition-all duration-200 overflow-hidden flex flex-col justify-between ${
                isActive
                  ? 'border-amber-500/80 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/30'
                  : 'border-slate-800 hover:border-slate-700 shadow-md'
              }`}
            >
              <div className="p-5 space-y-4">
                
                {/* Top Row: Town Hall Badge & Name */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 via-amber-600 to-amber-800 p-0.5 shrink-0 flex items-center justify-center shadow">
                      <div className="w-full h-full bg-[#111726] rounded-[10px] flex flex-col items-center justify-center">
                        <Building2 className="w-4 h-4 text-amber-400" />
                        <span className="font-heading font-black text-[10px] text-amber-300">
                          TH{acc.townHallLevel}
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h3 className="font-heading font-bold text-sm text-slate-100 truncate max-w-[150px]">
                          {acc.name}
                        </h3>
                        {isActive && (
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                            Active
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1 mt-0.5">
                        <span>{acc.tag}</span>
                        {acc.nickname && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="text-amber-300/80 font-sans">{acc.nickname}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-[11px] font-mono-num font-bold text-slate-200 flex items-center justify-end gap-1">
                      <Trophy className="w-3 h-3 text-amber-400" />
                      <span>{acc.trophies.toLocaleString()}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono-num">
                      {acc.clan?.name || 'No Clan'}
                    </div>
                  </div>
                </div>

                {/* Hero Progression Metric */}
                <div className="bg-[#0b0e14] border border-slate-800/80 rounded-xl p-3 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                      <Crown className="w-3.5 h-3.5 text-amber-400" />
                      <span>Heroes Progression</span>
                    </span>
                    <span className="font-mono-num font-bold text-amber-400">
                      {heroPercent}%
                    </span>
                  </div>

                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full"
                      style={{ width: `${heroPercent}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5">
                    <span>
                      {remainingHeroLevels === 0 ? 'Maxed for TH' : `${remainingHeroLevels} upgrades left`}
                    </span>
                    <span className="font-mono-num font-semibold text-slate-300">
                      {homeHeroes.length} Heroes Unlocked
                    </span>
                  </div>
                </div>

                {/* Equipment & War Stars Mini Stats */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-[#0b0e14] border border-slate-800/80 rounded-lg p-2.5">
                    <div className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-cyan-400" />
                      <span>Equipment</span>
                    </div>
                    <div className="font-mono-num font-bold text-cyan-300 mt-1">
                      {equipPercent}% Maxed
                    </div>
                  </div>

                  <div className="bg-[#0b0e14] border border-slate-800/80 rounded-lg p-2.5">
                    <div className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Award className="w-3 h-3 text-amber-400" />
                      <span>War Stars</span>
                    </div>
                    <div className="font-mono-num font-bold text-amber-300 mt-1">
                      {acc.warStars.toLocaleString()} ★
                    </div>
                  </div>
                </div>

              </div>

              {/* Action Button: Switch or Active */}
              <div className="p-3 bg-[#0d121c] border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 capitalize">
                  {acc.role || 'Member'} · XP Lv {acc.expLevel}
                </span>

                {isActive ? (
                  <button
                    disabled
                    className="py-1 px-3 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-semibold flex items-center gap-1 cursor-default"
                  >
                    <Check className="w-3 h-3" />
                    <span>Current</span>
                  </button>
                ) : (
                  <button
                    onClick={() => onSelectAccount(acc)}
                    className="py-1 px-3 rounded-lg bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 text-xs font-bold transition-all border border-slate-700 flex items-center gap-1"
                  >
                    <span>Switch</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
