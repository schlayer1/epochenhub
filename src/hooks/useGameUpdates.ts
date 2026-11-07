import { useState, useEffect, useCallback } from 'react';
import { GameUpdateInfo } from '../types/game';
import { updateService } from '../services/updateService';

export function useGameUpdates() {
  const [updates, setUpdates] = useState<Record<string, GameUpdateInfo>>(() => {
    return updateService.getStoredUpdates();
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadUpdates = useCallback(async () => {
    try {
      const data = await updateService.fetchUpdates();
      if (data && Object.keys(data).length > 0) {
        setUpdates(data);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUpdates();
  }, [loadUpdates]);

  return {
    updates,
    isLoading,
    refresh: loadUpdates,
  };
}
