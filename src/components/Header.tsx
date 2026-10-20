import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Compass, Award, Tv, LayoutGrid, Milestone, Leaf, HelpCircle } from 'lucide-react';
import { audioService } from '../services/audioService';
import { storageService } from '../services/storageService';
import { EPOCH_GAMES, PORTAL_META } from '../config/games.config';

interface HeaderProps {
  viewMode: 'timeline' | 'grid' | 'atlas';
  onViewModeChange: (mode: 'timeline' | 'grid' | 'atlas') => void;
  onOpenPassport: () => void;
  onOpenGuide: () => void;
  isCrtEnabled: boolean;
  onToggleCrt: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  viewMode,
  onViewModeChange,
  onOpenPassport,
  onOpenGuide,
  isCrtEnabled,
  onToggleCrt,
}) => {
  const [isMuted, setIsMuted] = useState(audioService.getMuted());
  const [isBgmActive, setIsBgmActive] = useState(audioService.isBgmActive());
  const [stampsCount, setStampsCount] = useState(0);

  const totalGames = EPOCH_GAMES.length;

  useEffect(() => {
    const updateStamps = () => {
      const progress = storageService.getProgress();
      setStampsCount(progress.stampsCount);
    };

    updateStamps();
    window.addEventListener('storage', updateStamps);
    const unsubBgm = audioService.subscribeBgm((active) => {
      setIsBgmActive(active);
      setIsMuted(audioService.getMuted());
    });
    return () => {
      window.removeEventListener('storage', updateStamps);
      unsubBgm();
    };
  }, []);

  const handleToggleMute = () => {
    const newMuted = audioService.toggleMute();
    setIsMuted(newMuted);
    setIsBgmActive(audioService.isBgmActive());
  };

  const handleToggleBgm = async () => {
    audioService.playClickSound();
    const active = await audioService.toggleBgm();
    setIsBgmActive(active);
    setIsMuted(audioService.getMuted());
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0c0b10]/95 backdrop-blur-md border-b-2 border-[#262138] px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 transition-colors">
      <div className="w-full max-w-[2100px] mx-auto flex items-center justify-between gap-3">
        
        {/* Left: Branding & Retro Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 p-0.5 flex items-center justify-center pixel-button shrink-0 shadow-[0_0_15px_rgba(245,158,11,0.4)]">
            <div className="w-full h-full bg-[#120f1f] rounded-[6px] flex items-center justify-center">
              <Compass className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 animate-spin-slow" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-pixel text-[11px] sm:text-xs tracking-wider text-amber-400 uppercase">
                Epochenhub
              </span>
              <span className="hidden sm:inline-block text-[10px] font-pixel text-slate-400 bg-purple-950/80 px-2 py-0.5 rounded border border-purple-800">
                16-BIT
              </span>
            </div>
            <h1 className="text-xs sm:text-sm font-semibold text-slate-200 tracking-tight leading-tight">
              {PORTAL_META.schoolName}
            </h1>
          </div>
        </div>

        {/* Center: View Switcher (Timeline vs Bento Grid) */}
        <div className="flex items-center bg-[#151322] p-1 rounded-lg border border-[#2b2544] shadow-inner">
          <button
            onClick={() => {
              audioService.playClickSound();
              onViewModeChange('timeline');
            }}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              viewMode === 'timeline'
                ? 'bg-amber-500 text-slate-950 font-semibold shadow-pixel-sm'
                : 'text-slate-300 hover:text-white hover:bg-[#201d33]'
            }`}
            title="Chronologische Zeitleisten-Reise"
          >
            <Milestone className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Zeitreise</span>
          </button>
          <button
            onClick={() => {
              audioService.playClickSound();
              onViewModeChange('grid');
            }}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              viewMode === 'grid'
                ? 'bg-amber-500 text-slate-950 font-semibold shadow-pixel-sm'
                : 'text-slate-300 hover:text-white hover:bg-[#201d33]'
            }`}
            title="Kompaktes Epochen-Raster"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Raster</span>
          </button>
          <button
            onClick={() => {
              audioService.playClickSound();
              onViewModeChange('atlas');
            }}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              viewMode === 'atlas'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-pixel-sm'
                : 'text-slate-300 hover:text-emerald-300 hover:bg-[#201d33]'
            }`}
            title="Interaktiver 16-Bit Natur-Atlas (Flora & Fauna)"
          >
            <Leaf className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden md:inline">Natur-Atlas</span>
          </button>
        </div>

        {/* Right: Actions, Passport & Audio */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          
          {/* Schüler-Guide Button */}
          <button
            onClick={() => {
              audioService.playClickSound();
              onOpenGuide();
            }}
            className="flex items-center gap-1.5 bg-[#171424] hover:bg-[#231e38] text-slate-300 hover:text-amber-300 border border-[#2d2747] hover:border-amber-500/50 px-2 sm:px-3 py-1.5 rounded-lg text-xs font-medium pixel-button transition-all"
            title="Schüler-Leitfaden: Wie nutze ich den Epochenhub?"
          >
            <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="hidden md:inline font-pixel text-[10px]">Anleitung</span>
          </button>

          {/* Zeitreise-Pass Button */}
          <button
            onClick={() => {
              audioService.playPortalChime();
              onOpenPassport();
            }}
            className="flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-amber-950/70 to-amber-900/60 hover:from-amber-900/80 hover:to-amber-800/80 text-amber-300 border border-amber-600/60 px-2.5 sm:px-3.5 py-1.5 rounded-lg text-xs font-medium pixel-button transition-all shadow-[0_0_12px_rgba(245,158,11,0.2)]"
            title="Zeitreise-Pass & Stempelkarte öffnen"
          >
            <Award className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="hidden lg:inline font-pixel text-[10px]">Chrono-Pass</span>
            <span className="bg-amber-500/20 text-amber-300 font-pixel text-[9px] px-1.5 py-0.5 rounded border border-amber-500/30">
              {stampsCount}/{totalGames}
            </span>
          </button>

          {/* CRT Scanline Toggle */}
          <button
            onClick={() => {
              audioService.playClickSound();
              onToggleCrt();
            }}
            className={`p-2 rounded-lg border transition-all text-xs ${
              isCrtEnabled
                ? 'bg-purple-950/80 border-purple-500 text-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.3)]'
                : 'bg-[#151322] border-[#2b2544] text-slate-400 hover:text-slate-200'
            }`}
            title={isCrtEnabled ? 'CRT-Scanlines deaktivieren' : 'CRT-Scanlines aktivieren'}
          >
            <Tv className="w-4 h-4" />
          </button>

          {/* 16-Bit Chiptune BGM Button */}
          <button
            onClick={handleToggleBgm}
            className={`p-2 rounded-lg border transition-all flex items-center justify-center ${
              isBgmActive
                ? 'bg-emerald-900/90 border-emerald-400 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.5)] ring-2 ring-emerald-500/40'
                : 'bg-[#151322] border-[#2b2544] text-slate-400 hover:text-slate-200 hover:border-amber-500/50'
            }`}
            title={isBgmActive ? '16-Bit Epochen-Musik anhalten (Musik spielt)' : '16-Bit Epochen-Musik abspielen'}
            aria-label={isBgmActive ? '16-Bit Epochen-Musik anhalten' : '16-Bit Epochen-Musik abspielen'}
          >
            <Music className={`w-4 h-4 ${isBgmActive ? 'text-emerald-300 animate-pulse' : ''}`} />
          </button>

          {/* Sound FX Mute Toggle */}
          <button
            onClick={handleToggleMute}
            className={`p-2 rounded-lg border transition-all ${
              isMuted
                ? 'bg-rose-950/70 border-rose-800 text-rose-400'
                : 'bg-[#151322] border-[#2b2544] text-slate-400 hover:text-slate-200'
            }`}
            title={isMuted ? 'Sound-Effekte einschalten' : 'Sound-Effekte stummschalten'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

        </div>

      </div>
    </header>
  );
};
