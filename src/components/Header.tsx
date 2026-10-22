import React from 'react';
import { PlayerAccount } from '../types/coc';
import { Shield, TrendingUp, Users, Swords, Landmark, Settings, RefreshCw, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  accounts: PlayerAccount[];
  activeAccount: PlayerAccount;
  onSelectAccount: (account: PlayerAccount) => void;
  onOpenAddAccount: () => void;
  onOpenSettings: () => void;
  onSyncAccount: () => void;
  isSyncing: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  accounts,
  activeAccount,
  onSelectAccount,
  onOpenAddAccount,
  onOpenSettings,
  onSyncAccount,
  isSyncing
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0d121c]/95 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 md:gap-8">
        
        {/* Zone 1: Brand Wordmark (Single element) */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 p-0.5 shadow-lg shadow-amber-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-[#111726] rounded-[10px] flex items-center justify-center">
              <Shield className="w-5 h-5 text-amber-400 fill-amber-400/20" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-black text-lg md:text-xl tracking-wider text-amber-400 drop-shadow-sm whitespace-nowrap">
                CLASH PULSE
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded font-mono font-bold bg-amber-400/10 text-amber-300 border border-amber-500/30">
                TH{activeAccount.townHallLevel}
              </span>
            </div>
            <div className="text-[11px] text-slate-400 hidden sm:block whitespace-nowrap">
              Official Supercell API Live Dashboard
            </div>
          </div>
        </div>

        {/* Zone 2: Navigation Links (Single line, concise) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          <button
            onClick={() => setActiveTab('progression')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'progression'
                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Progression & Upgrades</span>
          </button>

          <button
            onClick={() => setActiveTab('multi-account')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'multi-account'
                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Multi-Account ({accounts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('clan-war')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'clan-war'
                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Swords className="w-3.5 h-3.5" />
            <span>Clan War</span>
          </button>

          <button
            onClick={() => setActiveTab('capital-raid')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'capital-raid'
                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Landmark className="w-3.5 h-3.5" />
            <span>Capital Raid</span>
          </button>

          <button
            onClick={() => setActiveTab('clan-roster')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'clan-roster'
                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Clan Roster</span>
          </button>
        </nav>

        {/* Zone 3: Primary Action & Quick Account Selector */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Quick Account Switcher dropdown */}
          <div className="relative">
            <select
              value={activeAccount.id}
              onChange={(e) => {
                const target = accounts.find((a) => a.id === e.target.value);
                if (target) onSelectAccount(target);
              }}
              className="appearance-none bg-[#161f30] hover:bg-[#1c283e] text-slate-200 text-xs font-medium py-1.5 pl-3 pr-8 rounded-lg border border-slate-700/80 focus:outline-none focus:border-amber-500/60 cursor-pointer transition-colors max-w-[150px] sm:max-w-[190px] truncate"
            >
              {accounts.map((acc) => (
                <option key={acc.id} value={acc.id} className="bg-[#111726] text-slate-100">
                  {acc.nickname || acc.name} (TH{acc.townHallLevel})
                </option>
              ))}
            </select>
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-[10px]">
              ▼
            </span>
          </div>

          {/* Sync Button */}
          <button
            onClick={onSyncAccount}
            disabled={isSyncing}
            title="Synchronize live data from official Supercell API"
            className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-amber-300 transition-colors border border-slate-700"
          >
            <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin text-amber-400' : ''}`} />
          </button>

          {/* Settings / API Modal Trigger */}
          <button
            onClick={onOpenSettings}
            title="Configure Official API Key & Server Settings"
            className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Mobile Navigation bar */}
      <div className="lg:hidden flex items-center justify-around gap-1 pt-2.5 mt-2 border-t border-slate-800/60 overflow-x-auto text-[11px]">
        <button
          onClick={() => setActiveTab('progression')}
          className={`py-1 px-2.5 rounded-md font-medium whitespace-nowrap ${
            activeTab === 'progression' ? 'bg-amber-500/20 text-amber-300' : 'text-slate-400'
          }`}
        >
          Progression
        </button>
        <button
          onClick={() => setActiveTab('multi-account')}
          className={`py-1 px-2.5 rounded-md font-medium whitespace-nowrap ${
            activeTab === 'multi-account' ? 'bg-amber-500/20 text-amber-300' : 'text-slate-400'
          }`}
        >
          Accounts ({accounts.length})
        </button>
        <button
          onClick={() => setActiveTab('clan-war')}
          className={`py-1 px-2.5 rounded-md font-medium whitespace-nowrap ${
            activeTab === 'clan-war' ? 'bg-amber-500/20 text-amber-300' : 'text-slate-400'
          }`}
        >
          Clan War
        </button>
        <button
          onClick={() => setActiveTab('capital-raid')}
          className={`py-1 px-2.5 rounded-md font-medium whitespace-nowrap ${
            activeTab === 'capital-raid' ? 'bg-amber-500/20 text-amber-300' : 'text-slate-400'
          }`}
        >
          Capital Raid
        </button>
        <button
          onClick={() => setActiveTab('clan-roster')}
          className={`py-1 px-2.5 rounded-md font-medium whitespace-nowrap ${
            activeTab === 'clan-roster' ? 'bg-amber-500/20 text-amber-300' : 'text-slate-400'
          }`}
        >
          Clan Roster
        </button>
      </div>
    </header>
  );
};
