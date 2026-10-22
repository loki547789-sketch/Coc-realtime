import React, { useState } from 'react';
import { PlayerAccount } from '../types/coc';
import { cocApi } from '../services/cocApi';
import { X, UserPlus, Search, Building2, Check, AlertCircle } from 'lucide-react';

interface AddAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddAccount: (newAccount: PlayerAccount) => void;
}

export const AddAccountModal: React.FC<AddAccountModalProps> = ({
  isOpen,
  onClose,
  onAddAccount
}) => {
  if (!isOpen) return null;

  const [playerTag, setPlayerTag] = useState('');
  const [nickname, setNickname] = useState('');
  const [townHallLevel, setTownHallLevel] = useState(16);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [previewPlayer, setPreviewPlayer] = useState<any>(null);

  const handleFetchProfile = async () => {
    if (!playerTag.trim()) return;
    setIsLoading(true);
    setFetchError(null);

    const cleanTag = playerTag.trim().toUpperCase().startsWith('#')
      ? playerTag.trim().toUpperCase()
      : `#${playerTag.trim().toUpperCase()}`;

    const res = await cocApi.fetchPlayer(cleanTag);
    setIsLoading(false);

    if (res.data) {
      setPreviewPlayer(res.data);
      if (res.data.townHallLevel) {
        setTownHallLevel(res.data.townHallLevel);
      }
    } else {
      setFetchError(res.apiError || 'Could not verify tag, using manual profile');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerTag.trim()) return;

    const cleanTag = playerTag.trim().toUpperCase().startsWith('#')
      ? playerTag.trim().toUpperCase()
      : `#${playerTag.trim().toUpperCase()}`;

    const newAcc: PlayerAccount = {
      id: `acc_${Date.now()}`,
      tag: cleanTag,
      name: previewPlayer?.name || nickname || `Chief ${cleanTag}`,
      nickname: nickname.trim() || undefined,
      townHallLevel: previewPlayer?.townHallLevel || townHallLevel,
      townHallWeaponLevel: previewPlayer?.townHallWeaponLevel,
      builderHallLevel: previewPlayer?.builderHallLevel || 9,
      expLevel: previewPlayer?.expLevel || 180,
      trophies: previewPlayer?.trophies || 4200,
      bestTrophies: previewPlayer?.bestTrophies || 4500,
      warStars: previewPlayer?.warStars || 850,
      role: previewPlayer?.role || 'member',
      clan: previewPlayer?.clan,
      heroes: previewPlayer?.heroes || [
        { name: 'Barbarian King', level: 75, maxLevel: 95, village: 'home' },
        { name: 'Archer Queen', level: 78, maxLevel: 95, village: 'home' },
        { name: 'Grand Warden', level: 55, maxLevel: 70, village: 'home' }
      ],
      heroEquipment: previewPlayer?.heroEquipment || [
        { name: 'Giant Gauntlet', level: 20, maxLevel: 27, village: 'home' }
      ],
      troops: previewPlayer?.troops || [
        { name: 'Electro Dragon', level: 5, maxLevel: 7, village: 'home' },
        { name: 'Root Rider', level: 2, maxLevel: 3, village: 'home' }
      ],
      spells: previewPlayer?.spells || [
        { name: 'Rage Spell', level: 6, maxLevel: 6, village: 'home' }
      ],
      achievements: previewPlayer?.achievements,
      donations: previewPlayer?.donations || 0,
      donationsReceived: previewPlayer?.donationsReceived || 0,
      clanCapitalContributions: previewPlayer?.clanCapitalContributions || 0,
      lastSyncedAt: Date.now()
    };

    onAddAccount(newAcc);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#121824] border border-slate-700 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 bg-[#0d121c]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <UserPlus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base text-slate-100">
                Link Clash Account
              </h3>
              <p className="text-xs text-slate-400">
                Synchronize via official Clash of Clans player tag
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-4">
          
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Player Tag (e.g. #2PP, #8UP8)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                required
                placeholder="#PLAYERTAG"
                value={playerTag}
                onChange={(e) => {
                  setPlayerTag(e.target.value);
                  setPreviewPlayer(null);
                }}
                className="flex-1 bg-[#0b0e14] border border-slate-700 rounded-lg py-2 px-3 text-xs text-slate-100 uppercase font-mono placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
              <button
                type="button"
                onClick={handleFetchProfile}
                disabled={isLoading || !playerTag.trim()}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 transition-colors disabled:opacity-50 flex items-center gap-1.5"
              >
                <Search className="w-3.5 h-3.5" />
                <span>{isLoading ? 'Checking...' : 'Fetch'}</span>
              </button>
            </div>
            {previewPlayer && (
              <p className="text-xs text-emerald-400 mt-1.5 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                Found: <span className="font-bold">{previewPlayer.name}</span> (TH{previewPlayer.townHallLevel} · {previewPlayer.trophies} 🏆)
              </p>
            )}
            {fetchError && (
              <p className="text-xs text-amber-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {fetchError}
              </p>
            )}
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Account Label / Nickname (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Main Account, Mini CWL, Donation Base"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full bg-[#0b0e14] border border-slate-700 rounded-lg py-2 px-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Town Hall Level
            </label>
            <select
              value={townHallLevel}
              onChange={(e) => setTownHallLevel(Number(e.target.value))}
              className="w-full bg-[#0b0e14] border border-slate-700 rounded-lg py-2 px-3 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
            >
              {Array.from({ length: 17 }, (_, i) => 17 - i).map((lvl) => (
                <option key={lvl} value={lvl}>
                  Town Hall {lvl}
                </option>
              ))}
            </select>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-300 hover:text-white bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 transition-all shadow-md"
            >
              Link & Monitor
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
