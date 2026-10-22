import React from 'react';
import { PlayerAccount } from '../types/coc';
import { Trophy, Award, Crown, Sparkles, Building2 } from 'lucide-react';

interface PlayerBannerProps {
  account: PlayerAccount;
  onOpenSettings: () => void;
  syncSource?: string;
}

export const PlayerBanner: React.FC<PlayerBannerProps> = ({
  account,
  onOpenSettings,
  syncSource
}) => {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-[#121824] shadow-xl">
      {/* Background Graphic with scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/coc_banner_epic_1792685384582.jpg"
          alt="Clash Fortress"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-30 filter brightness-75 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d121c] via-[#0d121c]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d121c] via-transparent to-transparent" />
      </div>

      <div className="relative z-10 p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        
        {/* Left: Player Profile & Identity */}
        <div className="flex items-center gap-4">
          {/* Town Hall Badge */}
          <div className="relative shrink-0">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-b from-amber-400 via-amber-600 to-amber-900 p-0.5 shadow-2xl flex items-center justify-center">
              <div className="w-full h-full bg-[#151c2a] rounded-[14px] flex flex-col items-center justify-center border border-amber-500/40">
                <Building2 className="w-6 h-6 md:w-8 md:h-8 text-amber-400" />
                <span className="font-heading font-black text-xs md:text-sm text-amber-300">
                  TH {account.townHallLevel}
                </span>
              </div>
            </div>
            {account.townHallWeaponLevel && (
              <span className="absolute -bottom-1 -right-1 bg-amber-500 text-slate-950 font-mono-num font-black text-[10px] px-1.5 py-0.5 rounded-full shadow">
                ★{account.townHallWeaponLevel}
              </span>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="font-heading font-black text-xl md:text-2xl text-slate-100 tracking-wide">
                {account.name}
              </h1>
              {account.nickname && (
                <span className="text-xs text-amber-300/80 font-medium">
                  ({account.nickname})
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400 mt-1 flex-wrap">
              <span className="font-mono text-slate-300 font-semibold">{account.tag}</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-300 font-medium">
                {account.clan ? `${account.clan.name} (Lv ${account.clan.clanLevel})` : 'No Clan'}
              </span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-400 capitalize">
                {account.role || 'Member'}
              </span>
              {syncSource && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className={`text-[11px] px-1.5 py-0.2 rounded border font-mono ${
                    syncSource === 'official_api' 
                      ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400' 
                      : 'border-amber-500/40 bg-amber-500/10 text-amber-300'
                  }`}>
                    {syncSource === 'official_api' ? 'Official API' : 'Cached Sync'}
                  </span>
                </>
              )}
            </div>

            {/* Quick Hero Levels Pill strip */}
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              {account.heroes && account.heroes.filter(h => h.village === 'home').map(h => (
                <div 
                  key={h.name}
                  className="bg-slate-900/80 border border-slate-700/60 rounded-md px-2 py-0.5 text-[11px] flex items-center gap-1.5"
                  title={`${h.name}: Level ${h.level}/${h.maxLevel}`}
                >
                  <Crown className="w-3 h-3 text-amber-400" />
                  <span className="text-slate-300">{h.name.split(' ').map(w => w[0]).join('')}:</span>
                  <span className="font-mono-num font-bold text-amber-300">{h.level}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Key Stats metrics */}
        <div className="flex items-center gap-4 sm:gap-6 self-stretch md:self-auto justify-between md:justify-end border-t md:border-t-0 border-slate-800 pt-3 md:pt-0">
          
          <div className="text-center md:text-right">
            <div className="flex items-center justify-center md:justify-end gap-1 text-slate-400 text-xs">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>Trophies</span>
            </div>
            <div className="font-mono-num font-bold text-base md:text-lg text-slate-100">
              {account.trophies.toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-400 font-mono-num">
              Best: {account.bestTrophies.toLocaleString()}
            </div>
          </div>

          <div className="h-8 w-px bg-slate-800 hidden sm:block" />

          <div className="text-center md:text-right">
            <div className="flex items-center justify-center md:justify-end gap-1 text-slate-400 text-xs">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>War Stars</span>
            </div>
            <div className="font-mono-num font-bold text-base md:text-lg text-amber-300">
              {account.warStars.toLocaleString()} ★
            </div>
            <div className="text-[11px] text-slate-400 font-mono-num">
              XP Lv {account.expLevel}
            </div>
          </div>

          <div className="h-8 w-px bg-slate-800 hidden sm:block" />

          <div className="text-center md:text-right">
            <div className="flex items-center justify-center md:justify-end gap-1 text-slate-400 text-xs">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Capital Gold</span>
            </div>
            <div className="font-mono-num font-bold text-base md:text-lg text-purple-300">
              {((account.clanCapitalContributions || 0) / 1000).toFixed(0)}k
            </div>
            <div className="text-[11px] text-slate-400">
              Donated
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
