import React from 'react';
import { EpochGame } from '../types/game';
import { GameCard } from './GameCard';
import { Milestone, ChevronRight } from 'lucide-react';

interface TimelineViewProps {
  games: EpochGame[];
  exploredGameIds: string[];
  onOpenDetails: (game: EpochGame) => void;
  onOpenQr: (game: EpochGame) => void;
}

export const TimelineView: React.FC<TimelineViewProps> = ({
  games,
  exploredGameIds,
  onOpenDetails,
  onOpenQr,
}) => {
  // Sort games chronologically by yearStart
  const sortedGames = [...games].sort((a, b) => a.yearStart - b.yearStart);

  if (sortedGames.length === 0) {
    return (
      <div className="text-center py-16 text-slate-400 space-y-3">
        <Milestone className="w-12 h-12 mx-auto text-slate-600 animate-bounce" />
        <p className="text-sm">Keine Spiele für die gewählten Filterkriterien gefunden.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      
      {/* Timeline Header Instruction */}
      <div className="flex items-center justify-between px-2 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
          <span className="font-pixel text-[10px] text-amber-400 uppercase">Chronologische Zeitreise</span>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-slate-500 font-mono text-[11px] overflow-x-auto">
          {sortedGames.map((g, idx) => (
            <React.Fragment key={g.id}>
              {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />}
              <span className="hover:text-slate-300 transition-colors shrink-0">{g.shortTitle}</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Responsive Timeline Grid */}
      <div className="relative">
        
        {/* Continuous Connecting Line for Desktop */}
        <div className="hidden xl:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-stone-600 via-amber-600 via-sky-600 via-red-600 to-emerald-600 -translate-y-1/2 z-0 opacity-40 rounded-full" />

        {/* Dynamic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 sm:gap-6 relative z-10">
          {sortedGames.map((game, index) => {
            const isExplored = exploredGameIds.includes(game.id);

            return (
              <div key={game.id} className="relative flex flex-col">
                
                {/* Station Step Indicator */}
                <div className="flex items-center gap-2 mb-2 px-1">
                  <div className="w-6 h-6 rounded-full bg-[#1e1b30] border-2 border-amber-500 text-amber-300 font-pixel text-[9px] flex items-center justify-center shrink-0 shadow-[0_0_8px_rgba(245,158,11,0.4)]">
                    {index + 1}
                  </div>
                  <span className="text-xs font-semibold text-slate-300 truncate">
                    Station {index + 1}: {game.epoch}
                  </span>
                </div>

                {/* Card */}
                <GameCard
                  game={game}
                  isExplored={isExplored}
                  onOpenDetails={onOpenDetails}
                  onOpenQr={onOpenQr}
                />
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
