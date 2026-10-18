import confetti from 'canvas-confetti';
import { PassportProgress } from '../types/game';

const STORAGE_KEY = 'epochenhub_passport_progress';

export const storageService = {
  getProgress(): PassportProgress {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch {
      // Fallback
    }
    return {
      exploredGames: [],
      stampsCount: 0,
    };
  },

  isGameExplored(gameId: string): boolean {
    const progress = this.getProgress();
    return progress.exploredGames.includes(gameId);
  },

  toggleStamp(gameId: string): { explored: boolean; totalStamps: number } {
    const progress = this.getProgress();
    const exists = progress.exploredGames.includes(gameId);

    if (exists) {
      progress.exploredGames = progress.exploredGames.filter(id => id !== gameId);
    } else {
      progress.exploredGames.push(gameId);
      progress.lastExploredDate = new Date().toISOString();

      // Trigger celebratory retro confetti
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#f59e0b', '#d97706', '#fbbf24', '#0284c7', '#dc2626']
        });
      } catch {
        // Ignore
      }
    }

    progress.stampsCount = progress.exploredGames.length;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));

    return {
      explored: !exists,
      totalStamps: progress.stampsCount
    };
  },

  resetProgress(): void {
    localStorage.removeItem(STORAGE_KEY);
  }
};
