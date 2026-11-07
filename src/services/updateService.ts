import { GameUpdateInfo } from '../types/game';

const STORAGE_KEY = 'epochenhub_game_updates_cache';

export const updateService = {
  getStoredUpdates(): Record<string, GameUpdateInfo> {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') {
          return parsed.data || parsed;
        }
      }
    } catch {
      // Ignore
    }
    return {};
  },

  async fetchUpdates(): Promise<Record<string, GameUpdateInfo>> {
    try {
      const response = await fetch('/api/game-updates', {
        headers: { Accept: 'application/json' },
      });
      if (response.ok) {
        const data = await response.json();
        if (data && typeof data === 'object') {
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
              timestamp: Date.now(),
              data
            }));
          } catch {
            // Ignore quota issues
          }
          return data;
        }
      }
    } catch (err) {
      // Offline or network error
    }

    // Fallback to cached version
    return this.getStoredUpdates();
  }
};
