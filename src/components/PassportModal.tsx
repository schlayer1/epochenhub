import React from 'react';
import { X, Award, CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';
import { EpochGame } from '../types/game';
import { audioService } from '../services/audioService';

interface PassportModalProps {
  isOpen: boolean;
  onClose: () => void;
  games: EpochGame[];
  exploredGameIds: string[];
  onToggleStamp: (gameId: string) => void;
  onResetPassport: () => void;
}

export const PassportModal: React.FC<PassportModalProps> = ({
  isOpen,
  onClose,
  games,
  exploredGameIds,
  onToggleStamp,
  onResetPassport,
}) => {
  if (!isOpen) return null;

  const total = games.length;
  const current = exploredGameIds.length;
  const percent = Math.round((current / total) * 100);
  const isMaster = current === total;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm animate-fade-in overflow-y-auto">
      
      {/* Passport Container in Ancient Leather/Parchment Style */}
      <div 
        className="relative w-full max-w-3xl bg-[#141221] border-2 border-amber-500 rounded-2xl shadow-pixel-lg overflow-hidden flex flex-col my-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button
          onClick={() => {
            audioService.playClickSound();
            onClose();
          }}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-rose-900 border border-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-all pixel-button"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Passport Header */}
        <div className="bg-gradient-to-r from-amber-950 via-[#1e1933] to-amber-950 border-b border-[#2d2747] p-6 text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/40 text-amber-300 font-pixel text-[10px]">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Offizieller Schüler-Zeitreise-Pass</span>
          </div>
          <h2 className="font-cinzel text-xl sm:text-3xl font-extrabold text-amber-200 uppercase tracking-wider">
            Chronik der Entdeckungen
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
            Erkunde alle großen Epochen in den Retro-Lernspielen und sammle deine Epochen-Stempel.
          </p>

          {/* Progress Bar */}
          <div className="pt-3 max-w-md mx-auto space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-amber-400">Fortschritt</span>
              <span className="text-slate-300">{current} von {total} Epochen erforscht ({percent}%)</span>
            </div>
            <div className="w-full h-3.5 bg-[#0a0912] rounded-full border border-amber-500/40 p-0.5 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-400 rounded-full transition-all duration-700 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                style={{ width: `${percent}%` }}
              />
            </div>
            {isMaster && (
              <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-400 font-pixel text-[10px] pt-1 animate-pulse">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Auszeichnung: Großer Meister der Weltgeschichte!</span>
              </div>
            )}
          </div>
        </div>

        {/* Stamps Grid */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {games.map((game) => {
              const hasStamp = exploredGameIds.includes(game.id);

              return (
                <div
                  key={game.id}
                  onClick={() => {
                    audioService.playStampFanfare();
                    onToggleStamp(game.id);
                  }}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer relative overflow-hidden flex items-center gap-3.5 ${
                    hasStamp
                      ? 'bg-gradient-to-br from-[#1a231a] to-[#121912] border-emerald-500/80 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                      : 'bg-[#171426] border-[#2b2544] hover:border-amber-500/50 opacity-70 hover:opacity-100'
                  }`}
                >
                  {/* Stamp Graphic / Seal */}
                  <div className={`w-14 h-14 rounded-full border-2 flex items-center justify-center shrink-0 pixel-box ${
                    hasStamp
                      ? 'border-emerald-400 bg-emerald-950/80 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.4)]'
                      : 'border-slate-600 bg-black/60 text-slate-600'
                  }`}>
                    {hasStamp ? (
                      <CheckCircle2 className="w-8 h-8 text-emerald-400 animate-spin-once" />
                    ) : (
                      <Award className="w-7 h-7 text-slate-600" />
                    )}
                  </div>

                  <div className="space-y-0.5 min-w-0">
                    <span className="text-[10px] font-pixel text-amber-400 uppercase truncate block">
                      {game.epoch}
                    </span>
                    <h4 className="text-sm font-bold text-white truncate">
                      {game.title}
                    </h4>
                    <p className="text-xs text-slate-400 truncate">
                      {hasStamp ? '✓ Im Pass besiegelt' : 'Noch nicht erforscht (Klicken zum Stempeln)'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Passport Footer Actions */}
        <div className="bg-[#100e1b] border-t border-[#2b2544] p-4 flex items-center justify-between">
          <button
            onClick={() => {
              if (confirm('Möchtest du deinen Zeitreise-Pass wirklich zurücksetzen?')) {
                audioService.playClickSound();
                onResetPassport();
              }
            }}
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-rose-400 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Pass zurücksetzen</span>
          </button>

          <button
            onClick={() => {
              audioService.playClickSound();
              onClose();
            }}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs pixel-button"
          >
            Fertig
          </button>
        </div>

      </div>
    </div>
  );
};
