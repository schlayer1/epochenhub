import React from 'react';
import { X, Play, QrCode, Award, CheckCircle2, BookOpen, Clock, GraduationCap, Sparkles, ExternalLink, FileText } from 'lucide-react';
import { EpochGame } from '../types/game';
import { audioService } from '../services/audioService';

interface GameModalProps {
  game: EpochGame | null;
  isOpen: boolean;
  onClose: () => void;
  isExplored: boolean;
  onToggleStamp: (gameId: string) => void;
  onOpenQr: (game: EpochGame) => void;
}

export const GameModal: React.FC<GameModalProps> = ({
  game,
  isOpen,
  onClose,
  isExplored,
  onToggleStamp,
  onOpenQr,
}) => {
  if (!isOpen || !game) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm animate-fade-in overflow-y-auto">
      
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-4xl bg-[#141221] border-2 border-amber-500/80 rounded-2xl shadow-pixel-lg overflow-hidden flex flex-col my-auto max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button
          onClick={() => {
            audioService.playClickSound();
            onClose();
          }}
          className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-black/70 hover:bg-rose-900/80 border border-slate-600 hover:border-rose-500 text-slate-300 hover:text-white flex items-center justify-center transition-all pixel-button"
          title="Schließen"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto flex-1">
          
          {/* Header Cover Banner */}
          <div className="relative h-56 sm:h-72 w-full bg-[#0a0912] overflow-hidden">
            <img
              src={game.coverImage}
              alt={game.title}
              className="w-full h-full object-cover object-center pixelated"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#141221] via-[#141221]/60 to-transparent" />

            {/* Badges on Top */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2 items-center">
              <span className={`px-3 py-1 rounded-md text-xs font-semibold uppercase tracking-wider border shadow-md ${game.theme.badgeBg}`}>
                {game.epoch}
              </span>
              <span className="bg-black/80 text-amber-300 border border-amber-500/50 px-2.5 py-1 rounded text-xs font-mono">
                {game.period}
              </span>
            </div>

            {/* Title & Subtitle inside Hero */}
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
              <div className="space-y-1 max-w-xl">
                <p className="font-pixel text-xs text-amber-400 uppercase tracking-widest">
                  {game.subtitle}
                </p>
                <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-md">
                  {game.title}
                </h2>
              </div>

              {/* Character Sprite Floating Avatar */}
              {game.spriteImage && (
                <div className="hidden sm:flex shrink-0 w-16 h-16 sm:w-20 sm:h-20 bg-black/75 backdrop-blur-md border-2 border-amber-500/60 rounded-2xl p-2 items-center justify-center shadow-xl">
                  <img
                    src={game.spriteImage}
                    alt="Charakter"
                    className="w-full h-full object-contain pixelated animate-retro-bounce"
                  />
                </div>
              )}
            </div>

          </div>

          {/* Quick Metrics Bar (Grade, Chapters Count, Duration) */}
          <div className="bg-[#1b182d] border-y border-[#2d2747] px-4 sm:px-6 py-3 grid grid-cols-3 gap-2 text-center">
            
            {/* Chapters Count Metric (PURE NUMBER, as requested!) */}
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center gap-1.5 text-amber-400 font-pixel text-xs sm:text-sm">
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>{game.chaptersCount} Kapitel</span>
              </div>
              <span className="text-[11px] text-slate-400">Kapitelanzahl</span>
            </div>

            {/* Grade Metric */}
            <div className="flex flex-col items-center justify-center border-x border-[#2d2747]">
              <div className="flex items-center gap-1.5 text-sky-400 font-semibold text-xs sm:text-sm">
                <GraduationCap className="w-4 h-4 text-sky-400" />
                <span>{game.grade}</span>
              </div>
              <span className="text-[11px] text-slate-400">Klassenstufe</span>
            </div>

            {/* Duration Metric */}
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-xs sm:text-sm">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>{game.duration}</span>
              </div>
              <span className="text-[11px] text-slate-400">Empfohlene Spielzeit</span>
            </div>

          </div>

          {/* Detail Body */}
          <div className="p-4 sm:p-6 space-y-6">
            
            {/* Historische Leitfrage Box */}
            <div className="bg-gradient-to-r from-amber-950/40 via-amber-900/20 to-transparent border-l-4 border-amber-500 p-4 rounded-r-xl space-y-1 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-pixel text-amber-400 uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Historische Leitfrage</span>
              </div>
              <p className="text-sm sm:text-base font-medium text-slate-100 italic leading-relaxed">
                „{game.guidingQuestion}“
              </p>
            </div>

            {/* Didaktische Schwerpunkte */}
            <div className="space-y-3">
              <h4 className="text-xs font-pixel text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>Didaktische Schwerpunkte im Spiel</span>
              </h4>
              <div className="grid grid-cols-1 gap-2.5">
                {game.didacticFocus.map((focus, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 bg-[#19162a] border border-[#2b2544] p-3 rounded-xl text-xs sm:text-sm text-slate-200"
                  >
                    <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-pixel text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <span className="leading-relaxed">{focus}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Companion Materials (if available) */}
            {game.companionMaterials && game.companionMaterials.length > 0 && (
              <div className="space-y-2 pt-1">
                <h4 className="text-xs font-pixel text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <FileText className="w-4 h-4 text-sky-400" />
                  <span>Didaktisches Begleitmaterial</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {game.companionMaterials.map((mat, idx) => (
                    <a
                      key={idx}
                      href={mat.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#19162a] hover:bg-[#221e38] border border-[#2b2544] hover:border-sky-500/60 text-slate-300 hover:text-white px-3 py-2 rounded-xl text-xs transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5 text-sky-400" />
                      <span>{mat.title}</span>
                      {mat.badge && (
                        <span className="bg-sky-950 text-sky-300 px-1.5 py-0.5 rounded text-[10px] border border-sky-800">
                          {mat.badge}
                        </span>
                      )}
                      <ExternalLink className="w-3 h-3 text-slate-500" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {game.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-[#1b182d] text-slate-400 border border-[#2d2747] px-2.5 py-1 rounded-md text-[11px]"
                >
                  #{tag}
                </span>
              ))}
            </div>

          </div>

        </div>

        {/* Modal Action Footer */}
        <div className="bg-[#100e1b] border-t border-[#2b2544] p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 shrink-0">
          
          {/* Stamp in Zeitreise-Pass */}
          <button
            onClick={() => {
              audioService.playStampFanfare();
              onToggleStamp(game.id);
            }}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium pixel-button transition-all ${
              isExplored
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                : 'bg-[#1b182d] text-slate-300 hover:text-white border border-[#352f52]'
            }`}
          >
            {isExplored ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Epoche im Pass gestempelt</span>
              </>
            ) : (
              <>
                <Award className="w-4 h-4 text-amber-400" />
                <span>Im Chrono-Pass als erforscht stempeln</span>
              </>
            )}
          </button>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 ml-auto">
            {/* QR Code Button */}
            <button
              onClick={() => {
                audioService.playClickSound();
                onOpenQr(game);
              }}
              className="flex items-center gap-2 bg-[#1b182d] hover:bg-[#25213d] text-amber-300 border border-amber-600/50 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm pixel-button transition-all"
              title="Großen QR-Code für Tablet oder Beamer anzeigen"
            >
              <QrCode className="w-4 h-4" />
              <span className="hidden sm:inline">Tablet-QR</span>
            </button>

            {/* Launch Game Button */}
            <a
              href={game.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => audioService.playClickSound()}
              className="flex items-center gap-2 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-slate-950 font-extrabold px-5 py-2.5 rounded-xl text-xs sm:text-sm pixel-button shadow-pixel-sm transition-all"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>Zeitreise starten</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};
