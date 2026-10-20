import React from 'react';
import { AtlasItem } from '../config/atlas.config';
import { AnimatedSprite } from './AnimatedSprite';
import { ArrowRight, BookOpen } from 'lucide-react';
import { audioService } from '../services/audioService';

interface AtlasCardProps {
  item: AtlasItem;
  onOpenDetails: (item: AtlasItem) => void;
}

export const AtlasCard: React.FC<AtlasCardProps> = ({ item, onOpenDetails }) => {
  const isFauna = item.category === 'fauna';

  return (
    <div
      onMouseEnter={() => audioService.playHoverSound()}
      onClick={() => {
        audioService.playPortalChime();
        onOpenDetails(item);
      }}
      className={`group relative bg-[#151322] rounded-2xl border-2 border-[#2b2544] hover:border-amber-500/80 transition-all duration-300 flex flex-col overflow-hidden shadow-pixel hover:shadow-pixel-lg cursor-pointer ${
        isFauna
          ? 'hover:shadow-[0_0_25px_rgba(245,158,11,0.25)]'
          : 'hover:shadow-[0_0_25px_rgba(16,185,129,0.25)]'
      }`}
    >
      {/* Top Banner Stage with Live Sprite */}
      <div className="relative h-44 w-full bg-gradient-to-b from-[#1c1830] via-[#141124] to-[#151322] flex items-center justify-center p-4 border-b border-[#25203b] overflow-hidden">
        {/* Subtle decorative radial glow */}
        <div
          className={`absolute w-32 h-32 rounded-full blur-2xl opacity-20 pointer-events-none ${
            isFauna ? 'bg-amber-500' : 'bg-emerald-500'
          }`}
        />

        {/* Category Pill (Top Left) */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span
            className={`px-2 py-0.5 rounded text-[10px] font-pixel uppercase tracking-wider border backdrop-blur-md ${
              isFauna
                ? 'bg-amber-950/80 text-amber-300 border-amber-600/80'
                : 'bg-emerald-950/80 text-emerald-300 border-emerald-600/80'
            }`}
          >
            {isFauna ? '🐾 Tierwelt' : '🌿 Nutzpflanze'}
          </span>
        </div>

        {/* Live Animated 16-Bit Sprite */}
        <div className="relative z-10 py-2 group-hover:scale-110 transition-transform duration-300">
          <AnimatedSprite
            src={item.spriteUrl}
            frameWidth={item.frameWidth}
            frameHeight={item.frameHeight}
            animation={item.animation}
            mode="idle"
            scale={item.frameHeight > 64 ? 1.5 : item.frameHeight > 32 ? 2.2 : 3}
          />
        </div>

        {/* Epoch Badges (Top Right) */}
        <div className="absolute top-3 right-3 flex flex-col gap-1 items-end">
          {item.epochLabels.slice(0, 2).map((label, idx) => (
            <span
              key={idx}
              className="bg-black/75 text-slate-300 border border-slate-700/80 px-2 py-0.5 rounded text-[9px] font-mono backdrop-blur-sm"
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          <span className="text-[10px] font-pixel text-amber-400 uppercase tracking-wider block">
            {item.roleTitle}
          </span>
          <h3 className="font-cinzel text-base font-bold text-white group-hover:text-amber-200 transition-colors leading-tight">
            {item.name}
          </h3>
          <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
            {item.summary}
          </p>
        </div>

        {/* Bottom Action Footer */}
        <div className="pt-2 border-t border-[#231e36] flex items-center justify-between text-xs">
          <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>Steckbrief</span>
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              audioService.playPortalChime();
              onOpenDetails(item);
            }}
            className="flex items-center gap-1 text-amber-400 group-hover:text-amber-300 font-pixel text-[10px] group-hover:translate-x-0.5 transition-transform"
          >
            <span>Erforschen</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
