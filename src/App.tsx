/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PlayerAccount, ClanWarData, CapitalRaidSeason, ClanInfo } from './types/coc';
import { INITIAL_ACCOUNTS } from './data/initialAccounts';
import { cocApi } from './services/cocApi';

import { Header } from './components/Header';
import { PlayerBanner } from './components/PlayerBanner';
import { ProgressionTracker } from './components/ProgressionTracker';
import { MultiAccountOverview } from './components/MultiAccountOverview';
import { ClanWarTracker } from './components/ClanWarTracker';
import { CapitalRaidTracker } from './components/CapitalRaidTracker';
import { ClanRosterView } from './components/ClanRosterView';
import { AddAccountModal } from './components/AddAccountModal';
import { ApiSettingsModal } from './components/ApiSettingsModal';

const STORAGE_KEYS = {
  ACCOUNTS: 'clash_pulse_accounts_v2',
  ACTIVE_ACC_ID: 'clash_pulse_active_id_v2'
};

export default function App() {
  // Accounts state with persistence
  const [accounts, setAccounts] = useState<PlayerAccount[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ACCOUNTS);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_ACCOUNTS;
  });

  const [activeAccountId, setActiveAccountId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ACTIVE_ACC_ID);
      if (saved) return saved;
    } catch {
      // fallback
    }
    return INITIAL_ACCOUNTS[0].id;
  });

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<string>('progression');

  // Modals state
  const [isAddAccountOpen, setIsAddAccountOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Live Official Data state
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncSource, setSyncSource] = useState<string>('cached_snapshot');
  const [warData, setWarData] = useState<ClanWarData | null>(null);
  const [raidSeason, setRaidSeason] = useState<CapitalRaidSeason | null>(null);
  const [clanInfo, setClanInfo] = useState<ClanInfo | null>(null);
  const [bannerToast, setBannerToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Active account object
  const activeAccount = accounts.find((a) => a.id === activeAccountId) || accounts[0];

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(accounts));
  }, [accounts]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_ACC_ID, activeAccountId);
  }, [activeAccountId]);

  // Initial fetch of Clan War, Capital Raid, and Clan Roster for active account's clan
  useEffect(() => {
    const clanTag = activeAccount.clan?.tag || '#2Q29V9L';
    
    // War
    cocApi.fetchCurrentWar(clanTag).then((res) => {
      if (res.data) {
        setWarData(res.data);
      }
    });

    // Raid
    cocApi.fetchCapitalRaid(clanTag).then((res) => {
      if (res.data?.items?.[0]) {
        setRaidSeason(res.data.items[0]);
      }
    });

    // Clan Roster
    cocApi.fetchClan(clanTag).then((res) => {
      if (res.data) {
        setClanInfo(res.data);
      }
    });
  }, [activeAccount.id]);

  // Toast auto-clear
  useEffect(() => {
    if (bannerToast) {
      const t = setTimeout(() => setBannerToast(null), 3500);
      return () => clearTimeout(t);
    }
  }, [bannerToast]);

  // Sync active account with Official API / Server proxy
  const handleSyncAccount = async () => {
    setIsSyncing(true);
    const res = await cocApi.fetchPlayer(activeAccount.tag);
    setIsSyncing(false);

    if (res.data) {
      setSyncSource(res.source);
      setAccounts((prev) =>
        prev.map((acc) => {
          if (acc.id === activeAccount.id) {
            return {
              ...acc,
              name: res.data.name || acc.name,
              townHallLevel: res.data.townHallLevel || acc.townHallLevel,
              townHallWeaponLevel: res.data.townHallWeaponLevel || acc.townHallWeaponLevel,
              trophies: res.data.trophies || acc.trophies,
              bestTrophies: res.data.bestTrophies || acc.bestTrophies,
              warStars: res.data.warStars || acc.warStars,
              expLevel: res.data.expLevel || acc.expLevel,
              attackWins: res.data.attackWins || acc.attackWins,
              defenseWins: res.data.defenseWins || acc.defenseWins,
              clan: res.data.clan || acc.clan,
              heroes: res.data.heroes || acc.heroes,
              heroEquipment: res.data.heroEquipment || acc.heroEquipment,
              troops: res.data.troops || acc.troops,
              spells: res.data.spells || acc.spells,
              achievements: res.data.achievements || acc.achievements,
              donations: res.data.donations || acc.donations,
              clanCapitalContributions: res.data.clanCapitalContributions || acc.clanCapitalContributions,
              lastSyncedAt: Date.now()
            };
          }
          return acc;
        })
      );

      setBannerToast({
        message: `Synced ${res.data.name} with ${res.source === 'official_api' ? 'Official API' : 'Live Data Snapshot'}!`,
        type: 'success'
      });
    } else {
      setBannerToast({
        message: res.apiError || 'Could not reach Clash of Clans API',
        type: 'error'
      });
    }
  };

  const handleAddAccount = (newAcc: PlayerAccount) => {
    setAccounts((prev) => [...prev, newAcc]);
    setActiveAccountId(newAcc.id);
    setBannerToast({
      message: `Linked account ${newAcc.name} (${newAcc.tag})!`,
      type: 'success'
    });
  };

  // Export & Import Handlers
  const handleExportData = () => {
    const dataToExport = {
      accounts,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `clash-pulse-accounts-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportData = (jsonStr: string) => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.accounts && Array.isArray(parsed.accounts)) {
        setAccounts(parsed.accounts);
        if (parsed.accounts[0]) setActiveAccountId(parsed.accounts[0].id);
      }
      setBannerToast({ message: 'Accounts backup restored successfully!', type: 'success' });
    } catch {
      setBannerToast({ message: 'Invalid backup JSON file.', type: 'error' });
    }
  };

  const handleResetData = () => {
    if (confirm('Reset accounts to original default profiles?')) {
      setAccounts(INITIAL_ACCOUNTS);
      setActiveAccountId(INITIAL_ACCOUNTS[0].id);
      setBannerToast({ message: 'Reset to default accounts complete.', type: 'info' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0e14] text-slate-100 flex flex-col font-sans">
      
      {/* Header with Top Bar Contract */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        accounts={accounts}
        activeAccount={activeAccount}
        onSelectAccount={(acc) => setActiveAccountId(acc.id)}
        onOpenAddAccount={() => setIsAddAccountOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onSyncAccount={handleSyncAccount}
        isSyncing={isSyncing}
      />

      {/* Floating Notification Toast */}
      {bannerToast && (
        <div className="fixed bottom-5 right-5 z-50 animate-bounce duration-300">
          <div
            className={`px-4 py-2.5 rounded-xl border text-xs font-semibold shadow-2xl flex items-center gap-2 ${
              bannerToast.type === 'success'
                ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-300'
                : bannerToast.type === 'error'
                ? 'bg-red-950/90 border-red-500/50 text-red-300'
                : 'bg-slate-900/90 border-slate-700 text-slate-200'
            }`}
          >
            <span>{bannerToast.message}</span>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* Active Player Status Banner */}
        <PlayerBanner
          account={activeAccount}
          onOpenSettings={() => setIsSettingsOpen(true)}
          syncSource={syncSource}
        />

        {/* View Switcher Container */}
        {activeTab === 'progression' && (
          <ProgressionTracker
            account={activeAccount}
            onRefresh={handleSyncAccount}
            isSyncing={isSyncing}
          />
        )}

        {activeTab === 'multi-account' && (
          <MultiAccountOverview
            accounts={accounts}
            activeAccount={activeAccount}
            onSelectAccount={(acc) => {
              setActiveAccountId(acc.id);
              setActiveTab('progression');
            }}
            onOpenAddAccount={() => setIsAddAccountOpen(true)}
          />
        )}

        {activeTab === 'clan-war' && warData && (
          <ClanWarTracker
            warData={warData}
            activeAccount={activeAccount}
            onRefreshWar={handleSyncAccount}
            isSyncing={isSyncing}
          />
        )}

        {activeTab === 'capital-raid' && raidSeason && (
          <CapitalRaidTracker
            raidSeason={raidSeason}
            activeAccount={activeAccount}
          />
        )}

        {activeTab === 'clan-roster' && clanInfo && (
          <ClanRosterView
            clan={clanInfo}
            activeAccount={activeAccount}
          />
        )}

      </main>

      {/* Modals */}
      <AddAccountModal
        isOpen={isAddAccountOpen}
        onClose={() => setIsAddAccountOpen(false)}
        onAddAccount={handleAddAccount}
      />

      <ApiSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onExportData={handleExportData}
        onImportData={handleImportData}
        onResetData={handleResetData}
      />

      {/* Subtle Footer */}
      <footer className="border-t border-slate-900 py-6 px-4 text-center text-xs text-slate-400">
        <p>
          Clash Pulse · Official Supercell API Supported Features · Clan War, Capital Raid, and Upgrades Progression
        </p>
      </footer>

    </div>
  );
}
