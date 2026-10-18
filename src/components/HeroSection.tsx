import React from 'react';
import { Search, Sparkles, Clock, BookOpen, Globe } from 'lucide-react';
import { EPOCH_CATEGORIES, PORTAL_META } from '../config/games.config';
import { audioService } from '../services/audioService';

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  selectedGrade: string;
  onSelectGrade: (grade: string) => void;
  totalChapters: number;
  totalGames: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  selectedGrade,
  onSelectGrade,
  totalChapters,
  totalGames,
}) => {
  return (
    <section className="relative overflow-hidden pt-7 sm:pt-10 pb-6 px-3 sm:px-6 lg:px-8 bg-gradient-to-b from-[#120f21] via-[#0c0b10] to-[#0c0b10] border-b border-[#211c33]">
      
      {/* Decorative ambient pixel particles */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="w-full max-w-[2100px] mx-auto text-center space-y-6 relative z-10">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs sm:text-sm font-medium shadow-[0_0_15px_rgba(245,158,11,0.2)]">
          <Sparkles className="w-4 h-4 text-amber-400 animate-spin-slow" />
          <span>Interaktive Geschichts-Expeditionen • 16-Bit Top-Down Engine</span>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h2 className="font-cinzel text-2xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 tracking-wide uppercase drop-shadow-md">
            Die Große Zeitreise
          </h2>
          <p className="max-w-3xl mx-auto text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
            {PORTAL_META.portalSubtitle}. Wähle dein Zeitalter, starte das Spiel direkt im Browser oder scanne es für dein Tablet.
          </p>
        </div>

        {/* Quick Stats Grid */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-1 text-xs sm:text-sm">
          <div className="flex items-center gap-2 bg-[#171426] border border-[#2b2544] px-3.5 py-1.5 rounded-lg text-slate-300">
            <Globe className="w-4 h-4 text-amber-400" />
            <span><strong className="text-white">{totalGames}</strong> Epochen-Spiele</span>
          </div>
          <div className="flex items-center gap-2 bg-[#171426] border border-[#2b2544] px-3.5 py-1.5 rounded-lg text-slate-300">
            <BookOpen className="w-4 h-4 text-sky-400" />
            <span><strong className="text-white">{totalChapters}</strong> Kapitel gesamt</span>
          </div>
          <div className="flex items-center gap-2 bg-[#171426] border border-[#2b2544] px-3.5 py-1.5 rounded-lg text-slate-300">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span><strong className="text-white">40.000 v. Chr.</strong> bis <strong className="text-white">476 n. Chr.</strong></span>
          </div>
        </div>

        {/* Search & Category Filter Section */}
        <div className="max-w-4xl mx-auto pt-3 space-y-3">
          
          {/* Search Input Bar */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Epoche, Thema oder Stichwort suchen (z. B. Pyramiden, Ötzi, Caesar, Demokratie)..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-[#151324] border border-[#2d2747] focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-slate-200 placeholder-slate-500 text-xs sm:text-sm rounded-xl pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 outline-none transition-all shadow-inner"
            />
          </div>

          {/* Epoch Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none touch-pan-x justify-start sm:justify-center">
            {EPOCH_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  audioService.playClickSound();
                  onSelectCategory(cat.id);
                }}
                className={`px-3 sm:px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500 text-slate-950 font-semibold shadow-pixel-sm'
                    : 'bg-[#171426] text-slate-400 hover:text-slate-200 border border-[#2b2544] hover:bg-[#201d36]'
                }`}
              >
                {cat.label}
              </button>
            ))}

            {/* Grade Filter Pill */}
            <select
              value={selectedGrade}
              onChange={(e) => {
                audioService.playClickSound();
                onSelectGrade(e.target.value);
              }}
              className="bg-[#171426] text-slate-300 text-xs border border-[#2b2544] px-3 py-1.5 rounded-lg outline-none cursor-pointer hover:border-amber-500/50 transition-colors"
            >
              <option value="all">Alle Klassen (5 & 6)</option>
              <option value="5">Klasse 5/6</option>
              <option value="6">Klasse 6 (Rom)</option>
            </select>
          </div>

        </div>

      </div>
    </section>
  );
};
