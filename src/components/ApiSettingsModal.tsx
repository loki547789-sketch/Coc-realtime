import React, { useState, useEffect } from 'react';
import { cocApi } from '../services/cocApi';
import { 
  X, 
  Key, 
  Globe, 
  Check, 
  AlertCircle, 
  Download, 
  Upload, 
  RotateCcw,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

interface ApiSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExportData: () => void;
  onImportData: (jsonStr: string) => void;
  onResetData: () => void;
}

export const ApiSettingsModal: React.FC<ApiSettingsModalProps> = ({
  isOpen,
  onClose,
  onExportData,
  onImportData,
  onResetData
}) => {
  if (!isOpen) return null;

  const [token, setToken] = useState(cocApi.getStoredToken());
  const [serverIp, setServerIp] = useState('Detecting...');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyResult, setVerifyResult] = useState<{ valid: boolean; message: string } | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    cocApi.getServerIp().then(setServerIp);
  }, []);

  const handleSaveToken = () => {
    cocApi.setStoredToken(token);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleTestToken = async () => {
    setIsVerifying(true);
    setVerifyResult(null);
    const res = await cocApi.verifyToken(token);
    setIsVerifying(false);
    setVerifyResult(res);
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        if (text) {
          onImportData(text);
          onClose();
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#121824] border border-slate-700 rounded-2xl w-full max-w-xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 bg-[#0d121c]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Key className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base text-slate-100">
                Official Supercell API Configuration
              </h3>
              <p className="text-xs text-slate-400">
                Developer token settings, IP whitelisting, and data management
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-5 flex-1">
          
          {/* Official API Token section */}
          <div className="space-y-3 bg-[#0b0e14] border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                  Supercell Developer API Token
                </span>
              </div>
              <a
                href="https://developer.clashofclans.com"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-amber-400 hover:underline flex items-center gap-1 font-semibold"
              >
                <span>developer.clashofclans.com</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Enter your official Supercell developer Bearer token.
              If no custom token is configured, Clash Pulse seamlessly displays authentic verified clan and player data fixtures.
            </p>

            {/* Server IP helper */}
            <div className="bg-[#161f30] border border-slate-700/80 rounded-lg p-2.5 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Globe className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Current Server IP:</span>
                <code className="font-mono font-bold text-cyan-300 bg-slate-900 px-1.5 py-0.5 rounded">
                  {serverIp}
                </code>
              </div>
              <span className="text-[10px] text-slate-400">
                (Add to Supercell IP whitelist)
              </span>
            </div>

            <div>
              <textarea
                rows={3}
                placeholder="Paste Bearer token here..."
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="w-full bg-[#161f30] border border-slate-700 rounded-lg p-2.5 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            {verifyResult && (
              <div className={`p-2.5 rounded-lg border text-xs flex items-center gap-2 ${
                verifyResult.valid
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                  : 'bg-red-500/10 border-red-500/30 text-red-300'
              }`}>
                {verifyResult.valid ? <Check className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                <span>{verifyResult.message}</span>
              </div>
            )}

            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={handleTestToken}
                disabled={isVerifying || !token.trim()}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors disabled:opacity-50"
              >
                {isVerifying ? 'Testing...' : 'Verify Token'}
              </button>

              <button
                type="button"
                onClick={handleSaveToken}
                className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow"
              >
                {isSaved ? 'Saved!' : 'Save Token'}
              </button>
            </div>
          </div>

          {/* Backup & Restore Data */}
          <div className="bg-[#0b0e14] border border-slate-800 rounded-xl p-4 space-y-3">
            <span className="text-xs font-bold text-slate-200 uppercase tracking-wider block">
              Manage Tracked Accounts
            </span>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={onExportData}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Accounts (JSON)</span>
              </button>

              <label className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 flex items-center gap-1.5 cursor-pointer">
                <Upload className="w-3.5 h-3.5" />
                <span>Import JSON</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileImport}
                  className="hidden"
                />
              </label>

              <button
                onClick={onResetData}
                className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold border border-red-500/30 flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Defaults</span>
              </button>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-[#0d121c] flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 transition-colors shadow"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
