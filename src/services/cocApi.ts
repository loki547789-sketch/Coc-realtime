import { ClanWarData, CapitalRaidSeason, PlayerAccount } from '../types/coc';

const STORAGE_KEYS = {
  TOKEN: 'clash_pulse_api_token',
  ACCOUNTS: 'clash_pulse_accounts',
  ACTIVE_ACCOUNT: 'clash_pulse_active_account_id'
};

export const cocApi = {
  getStoredToken(): string {
    return localStorage.getItem(STORAGE_KEYS.TOKEN) || '';
  },

  setStoredToken(token: string) {
    if (token) {
      localStorage.setItem(STORAGE_KEYS.TOKEN, token.trim());
    } else {
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
    }
  },

  getHeaders(): Record<string, string> {
    const token = this.getStoredToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };
    if (token) {
      headers['x-coc-token'] = token;
    }
    return headers;
  },

  async getServerIp(): Promise<string> {
    try {
      const res = await fetch('/api/coc/server-ip');
      if (res.ok) {
        const data = await res.json();
        return data.ip || 'Unknown';
      }
    } catch {
      // ignore
    }
    return 'Dynamic IP';
  },

  async verifyToken(token: string, playerTag?: string): Promise<{ valid: boolean; message: string }> {
    try {
      const res = await fetch('/api/coc/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, playerTag })
      });
      return await res.json();
    } catch (err: any) {
      return { valid: false, message: err.message || 'Verification failed' };
    }
  },

  async fetchPlayer(tag: string): Promise<{ success: boolean; data: any; source: string; apiError?: string }> {
    try {
      const cleanTag = tag.trim().replace(/^#/, '');
      const res = await fetch(`/api/coc/player/${cleanTag}`, {
        headers: this.getHeaders()
      });
      return await res.json();
    } catch (err: any) {
      return {
        success: false,
        source: 'network_error',
        data: null,
        apiError: err.message
      };
    }
  },

  async fetchClan(tag: string): Promise<{ success: boolean; data: any; source: string; apiError?: string }> {
    try {
      const cleanTag = tag.trim().replace(/^#/, '');
      const res = await fetch(`/api/coc/clan/${cleanTag}`, {
        headers: this.getHeaders()
      });
      return await res.json();
    } catch (err: any) {
      return {
        success: false,
        source: 'network_error',
        data: null,
        apiError: err.message
      };
    }
  },

  async fetchCurrentWar(clanTag: string): Promise<{ success: boolean; data: ClanWarData; source: string; apiError?: string }> {
    try {
      const cleanTag = clanTag.trim().replace(/^#/, '');
      const res = await fetch(`/api/coc/war/${cleanTag}`, {
        headers: this.getHeaders()
      });
      return await res.json();
    } catch (err: any) {
      return {
        success: false,
        source: 'network_error',
        data: null as any,
        apiError: err.message
      };
    }
  },

  async fetchCapitalRaid(clanTag: string): Promise<{ success: boolean; data: { items: CapitalRaidSeason[] }; source: string; apiError?: string }> {
    try {
      const cleanTag = clanTag.trim().replace(/^#/, '');
      const res = await fetch(`/api/coc/raid/${cleanTag}`, {
        headers: this.getHeaders()
      });
      return await res.json();
    } catch (err: any) {
      return {
        success: false,
        source: 'network_error',
        data: null as any,
        apiError: err.message
      };
    }
  }
};
