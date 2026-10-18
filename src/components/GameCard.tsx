import React from 'react';
import { Play, QrCode, Clock, BookOpen, GraduationCap, CheckCircle2 } from 'lucide-react';
import { EpochGame } from '../types/game';
import { audioService } from '../services/audioService';

interface GameCardProps {
  game: EpochGame;
  isExplored: boolean;
  onOpenDetails: (game: EpochGame) => void;
  onOpenQr: (game: EpochGame) => void;
}

export const GameCard: React.FC<GameCardProps> = ({
  game,
  isExplored,
  onOpenDetails,
  onOpenQr,
}) => {
  return (
    <div
      onMouseEnter={() => audioService.playHoverSound()}
      className={`group relative bg-[#151322] rounded-2xl border-2 border-[#2b2544] hover:border-amber-500/80 transition-all duration-300 flex flex-col overflow-hidden shadow-pixel hover:shadow-pixel-lg ${game.theme.glowClass}`}
    >
      {/* Top Media / Cover Banner */}
      <div 
        onClick={() => {
          audioService.playPortalChime();
          onOpenDetails(game);
        }}
        className="relative h-44 sm:h-52 w-full overflow-hidden cursor-pointer bg-[#0e0c18]"
      >
        <img
          src={game.coverImage}
          alt={game.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 pixelated opacity-90 group-hover:opacity-100"
          loading="lazy"
        />

        {/* Ambient Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#151322] via-[#151322]/40 to-transparent" />

        {/* Period Badge (Top Left) */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center">
          <span className={`px-2.5 py-1 rounded-md text-[10px] sm:text-xs font-semibold uppercase tracking-wider border backdrop-blur-md shadow-md ${game.theme.badgeBg}`}>
            {game.epoch}
          </span>
          <span className="bg-black/75 text-slate-300 border border-slate-700/80 px-2 py-0.5 rounded text-[10px] font-mono backdrop-blur-sm">
            {game.period}
          </span>
        </div>

        {/* Explored Stamp Indicator (Top Right) */}
        {isExplored && (
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-emerald-950/90 text-emerald-300 border border-emerald-500/80 px-2.5 py-1 rounded-full text-[11px] font-semibold backdrop-blur-md shadow-lg animate-fade-in">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Erforscht</span>
          </div>
        )}

        {/* Floating Sprite Preview (Bottom Right of Cover) */}
        {game.spriteImage && (
          <div className="absolute bottom-2 right-3 w-12 h-12 sm:w-14 sm:h-14 bg-black/60 backdrop-blur-md border border-amber-500/40 rounded-xl p-1 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <img
              src={game.spriteImage}
              alt="Avatar Sprite"
              className="w-full h-full object-contain pixelated animate-retro-bounce"
            />
          </div>
        )}

        {/* Quick Chapter Counter Pill (Bottom Left of Cover) */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <span className="flex items-center gap-1 bg-black/80 text-amber-300 border border-amber-500/40 px-2.5 py-1 rounded-md text-xs font-pixel text-[10px]">
            <BookOpen className="w-3 h-3 text-amber-400" />
            {game.chaptersCount} Kapitel
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <div className="space-y-2">
          {/* Subtitle / Epoch Epithet */}
          <p className="text-[11px] sm:text-xs font-medium text-amber-400 tracking-wider uppercase font-pixel">
            {game.subtitle}
          </p>

          {/* Title */}
          <h3 
            onClick={() => {
              audioService.playPortalChime();
              onOpenDetails(game);
            }}
            className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors cursor-pointer line-clamp-1"
          >
            {game.title}
          </h3>

          {/* Guiding Question Teaser */}
          <p className="text-xs sm:text-sm text-slate-300 italic line-clamp-2 leading-relaxed">
            „{game.guidingQuestion}“
          </p>
        </div>

        {/* Metadata Footer: Grade & Duration */}
        <div className="pt-2 border-t border-[#26203a] flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-sky-400" />
            <span>{game.grade}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span>{game.duration}</span>
          </div>
        </div>

        {/* Actions Button Group */}
        <div className="grid grid-cols-12 gap-2 pt-1">
          
          {/* Main Play Action */}
          <a
            href={game.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => audioService.playClickSound()}
            className="col-span-8 flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-slate-950 font-bold px-3 py-2.5 rounded-xl text-xs sm:text-sm pixel-button shadow-pixel-sm transition-all"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>Spiel starten</span>
          </a>

          {/* Details / Preview Button */}
          <button
            onClick={() => {
              audioService.playPortalChime();
              onOpenDetails(game);
            }}
            className="col-span-2 flex items-center justify-center bg-[#1e1b30] hover:bg-[#282440] text-slate-300 hover:text-white border border-[#373152] rounded-xl text-xs pixel-button transition-all"
            title="Spieldetails & Leitfrage anzeigen"
          >
            <BookOpen className="w-4 h-4" />
          </button>

          {/* QR Code Button */}
          <button
            onClick={() => {
              audioService.playClickSound();
              onOpenQr(game);
            }}
            className="col-span-2 flex items-center justify-center bg-[#1e1b30] hover:bg-[#282440] text-amber-400 hover:text-amber-300 border border-[#373152] rounded-xl text-xs pixel-button transition-all"
            title="QR-Code für Tablet oder Smartboard anzeigen"
          >
            <QrCode className="w-4 h-4" />
          </button>

        </div>

      </div>
    </div>
  );
};
