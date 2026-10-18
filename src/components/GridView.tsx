import React from 'react';
import { EpochGame } from '../types/game';
import { GameCard } from './GameCard';
import { LayoutGrid } from 'lucide-react';

interface GridViewProps {
  games: EpochGame[];
  exploredGameIds: string[];
  onOpenDetails: (game: EpochGame) => void;
  onOpenQr: (game: EpochGame) => void;
}

export const GridView: React.FC<GridViewProps> = ({
  games,
  exploredGameIds,
  onOpenDetails,
  onOpenQr,
}) => {
  if (games.length === 0) {
    return (
      <div className="text-center py-16 text-slate-400 space-y-3">
        <LayoutGrid className="w-12 h-12 mx-auto text-slate-600 animate-pulse" />
        <p className="text-sm">Keine Spiele für die aktuelle Suche gefunden.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-2 text-xs text-slate-400">
        <span className="font-pixel text-[10px] text-amber-400 uppercase">
          Epochen-Katalog ({games.length} {games.length === 1 ? 'Spiel' : 'Spiele'})
        </span>
      </div>

      {/* Fluid Grid: 1 col on mobile, 2 cols on tablet, 3 on laptop, 4 on iMac */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
        {games.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            isExplored={exploredGameIds.includes(game.id)}
            onOpenDetails={onOpenDetails}
            onOpenQr={onOpenQr}
          />
        ))}
      </div>
    </div>
  );
};
