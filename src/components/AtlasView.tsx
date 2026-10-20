import React, { useState, useMemo } from 'react';
import { ATLAS_ITEMS, ATLAS_CATEGORIES, ATLAS_EPOCHS, AtlasItem } from '../config/atlas.config';
import { AtlasCard } from './AtlasCard';
import { AtlasModal } from './AtlasModal';
import { Search, Sparkles, Filter, Leaf } from 'lucide-react';
import { audioService } from '../services/audioService';

interface AtlasViewProps {
  onLaunchGame?: (gameId: string) => void;
}

export const AtlasView: React.FC<AtlasViewProps> = ({ onLaunchGame }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedEpoch, setSelectedEpoch] = useState('all');
  const [activeItem, setActiveItem] = useState<AtlasItem | null>(null);

  const filteredItems = useMemo(() => {
    return ATLAS_ITEMS.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Epoch filter
      if (selectedEpoch !== 'all' && !item.epochs.includes(selectedEpoch)) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesRole = item.roleTitle.toLowerCase().includes(q);
        const matchesSummary = item.summary.toLowerCase().includes(q);
        const matchesTags = item.tags.some((t) => t.toLowerCase().includes(q));

        if (!matchesName && !matchesRole && !matchesSummary && !matchesTags) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedEpoch]);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Intro Hero Banner for Atlas */}
      <div className="text-center space-y-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-pixel shadow-[0_0_15px_rgba(16,185,129,0.2)]">
          <Leaf className="w-4 h-4 text-emerald-400" />
          <span>Interaktives 16-Bit Epochen-Bestiarium &amp; Herbarium</span>
        </div>

        <h2 className="font-cinzel text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-amber-300 to-emerald-100 uppercase tracking-wide drop-shadow-md">
          Natur-Atlas der Geschichte
        </h2>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto">
          Erkunde die lebendige Tier- und Pflanzenwelt der Epochen in animierter SNES-Pixel-Art.
          Klicke auf ein Wesen oder eine Pflanze für spannende Entdecker-Fakten und ihre Rolle im Alltag der Menschen.
        </p>

        {/* Search & Filter Bar */}
        <div className="pt-2 space-y-3">
          {/* Search Input */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Tier, Pflanze oder Stichwort suchen (z. B. Katze, Hund, Datteln, Emmer)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#151324] border border-[#2d2747] focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-slate-200 placeholder-slate-500 text-xs sm:text-sm rounded-xl pl-10 pr-4 py-2.5 outline-none transition-all shadow-inner"
            />
          </div>

          {/* Category Switcher Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            {ATLAS_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  audioService.playClickSound();
                  setSelectedCategory(cat.id);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-pixel-sm'
                    : 'bg-[#171426] text-slate-400 hover:text-slate-200 border border-[#2b2544] hover:bg-[#201d36]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Epoch Filter Pills */}
          <div className="flex items-center justify-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {ATLAS_EPOCHS.map((ep) => (
              <button
                key={ep.id}
                onClick={() => {
                  audioService.playClickSound();
                  setSelectedEpoch(ep.id);
                }}
                className={`px-2.5 py-1 rounded-md text-[11px] whitespace-nowrap transition-all ${
                  selectedEpoch === ep.id
                    ? 'bg-amber-500 text-slate-950 font-semibold shadow-pixel-sm'
                    : 'bg-[#131120] text-slate-400 hover:text-slate-200 border border-[#25203d]'
                }`}
              >
                {ep.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between px-2 text-xs text-slate-400 border-b border-[#211c33] pb-3">
        <div className="flex items-center gap-2 font-pixel text-[10px] text-emerald-400 uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>
            {filteredItems.length} {filteredItems.length === 1 ? 'Entdeckung' : 'Entdeckungen'} im Atlas
          </span>
        </div>
        <span className="text-[11px] text-slate-500">
          Klicke auf ein Bild, um den Steckbrief zu öffnen
        </span>
      </div>

      {/* Cards Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 text-slate-400 space-y-3">
          <Filter className="w-12 h-12 mx-auto text-slate-600 animate-pulse" />
          <p className="text-sm">Keine Lebewesen oder Pflanzen für die gewählten Filter gefunden.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <AtlasCard
              key={item.id}
              item={item}
              onOpenDetails={(selected) => setActiveItem(selected)}
            />
          ))}
        </div>
      )}

      {/* Detail Modal */}
      <AtlasModal
        item={activeItem}
        isOpen={Boolean(activeItem)}
        onClose={() => setActiveItem(null)}
        onLaunchGame={onLaunchGame}
      />
    </div>
  );
};
