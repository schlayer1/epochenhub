import React, { useState } from 'react';
import { AtlasItem } from '../config/atlas.config';
import { AnimatedSprite } from './AnimatedSprite';
import { X, Sparkles, ExternalLink, Gamepad2 } from 'lucide-react';
import { audioService } from '../services/audioService';

interface AtlasModalProps {
  item: AtlasItem | null;
  isOpen: boolean;
  onClose: () => void;
  onLaunchGame?: (gameId: string) => void;
}

export const AtlasModal: React.FC<AtlasModalProps> = ({
  item,
  isOpen,
  onClose,
  onLaunchGame,
}) => {
  const [activeMode, setActiveMode] = useState<'idle' | 'walk' | 'action'>('idle');

  if (!isOpen || !item) return null;

  const isFauna = item.category === 'fauna';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      {/* Modal Dialog Card */}
      <div
        className="relative w-full max-w-2xl bg-[#141221] border-2 border-amber-500 rounded-2xl shadow-pixel-lg overflow-hidden flex flex-col my-auto max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            audioService.playClickSound();
            onClose();
          }}
          className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-black/70 hover:bg-rose-900 border border-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-all pixel-button"
          aria-label="Schließen"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header / Interactive Sprite Showcase Stage */}
        <div className="relative bg-gradient-to-b from-[#201a38] via-[#161226] to-[#120f21] p-6 text-center border-b border-[#2b2544] flex flex-col items-center justify-center overflow-hidden">
          {/* Ambient glow */}
          <div
            className={`absolute w-56 h-56 rounded-full blur-3xl opacity-25 pointer-events-none ${
              isFauna ? 'bg-amber-500' : 'bg-emerald-500'
            }`}
          />

          {/* Category & Epoch Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-3 relative z-10">
            <span
              className={`px-2.5 py-0.5 rounded text-[10px] font-pixel uppercase tracking-wider border ${
                isFauna
                  ? 'bg-amber-950/80 text-amber-300 border-amber-600'
                  : 'bg-emerald-950/80 text-emerald-300 border-emerald-600'
              }`}
            >
              {isFauna ? '🐾 Tierwelt (Fauna)' : '🌿 Nutzpflanze (Flora)'}
            </span>
            {item.epochLabels.map((lbl, i) => (
              <span
                key={i}
                className="bg-black/60 text-slate-300 border border-slate-700 px-2.5 py-0.5 rounded text-[10px] font-mono"
              >
                {lbl}
              </span>
            ))}
          </div>

          {/* Live Interactive Sprite Stage */}
          <div className="relative z-10 my-2 p-4 rounded-xl bg-black/30 border border-[#2b2544] inline-block shadow-inner">
            <AnimatedSprite
              src={item.spriteUrl}
              frameWidth={item.frameWidth}
              frameHeight={item.frameHeight}
              animation={item.animation}
              mode={activeMode}
              scale={item.frameHeight > 64 ? 2 : item.frameHeight > 32 ? 2.8 : 3.8}
              interactive={true}
            />
          </div>

          {/* Animation Action Switcher Pills */}
          <div className="flex items-center gap-1.5 mt-2 relative z-10">
            <button
              onClick={() => {
                audioService.playClickSound();
                setActiveMode('idle');
              }}
              className={`px-2.5 py-1 rounded-md text-[10px] font-pixel transition-all ${
                activeMode === 'idle'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-[#1a162b] text-slate-400 hover:text-white border border-[#2d2747]'
              }`}
            >
              Rasten (Idle)
            </button>
            {item.animation.walk && (
              <button
                onClick={() => {
                  audioService.playClickSound();
                  setActiveMode('walk');
                }}
                className={`px-2.5 py-1 rounded-md text-[10px] font-pixel transition-all ${
                  activeMode === 'walk'
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-[#1a162b] text-slate-400 hover:text-white border border-[#2d2747]'
                }`}
              >
                Bewegen (Walk)
              </button>
            )}
            {item.animation.action && (
              <button
                onClick={() => {
                  audioService.playClickSound();
                  setActiveMode('action');
                }}
                className={`px-2.5 py-1 rounded-md text-[10px] font-pixel transition-all ${
                  activeMode === 'action'
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-[#1a162b] text-slate-400 hover:text-white border border-[#2d2747]'
                }`}
              >
                Aktion (Fressen/Kult)
              </button>
            )}
          </div>
        </div>

        {/* Modal Body: Student Fact Sheet */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-slate-200">
          {/* Title Header */}
          <div className="space-y-1">
            <span className="text-xs font-pixel text-amber-400 uppercase tracking-wider block">
              {item.roleTitle}
            </span>
            <h2 className="font-cinzel text-xl sm:text-2xl font-extrabold text-white">
              {item.name}
            </h2>
            {item.scientificOrHistoricalName && (
              <span className="text-xs text-slate-400 italic block font-mono">
                Historische Bezeichnung: {item.scientificOrHistoricalName}
              </span>
            )}
          </div>

          {/* Child-friendly Didactic Story Box */}
          <div className="bg-[#19152b] border border-amber-500/30 rounded-xl p-4 space-y-2 shadow-inner">
            <div className="flex items-center gap-2 text-xs font-pixel text-amber-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Geschichtlicher Hintergrund für Entdecker</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              {item.didacticStory}
            </p>
          </div>

          {/* In-Game Chapter Reference Card */}
          {item.gameChapterRef && (
            <div className="bg-gradient-to-r from-amber-950/40 via-[#1a172e] to-[#120f21] border border-amber-600/40 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-1.5 text-[10px] font-pixel text-amber-400 uppercase">
                  <Gamepad2 className="w-3.5 h-3.5" />
                  <span>Im Retro-Lernspiel zu finden</span>
                </div>
                <h4 className="text-sm font-bold text-white truncate">
                  {item.gameChapterRef.gameTitle}
                </h4>
                <p className="text-xs text-slate-300">
                  Kapitel {item.gameChapterRef.chapterNumber}: {item.gameChapterRef.chapterTitle}
                </p>
              </div>

              {onLaunchGame && (
                <button
                  onClick={() => {
                    audioService.playClickSound();
                    onLaunchGame(item.gameChapterRef!.gameId);
                  }}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3.5 py-2 rounded-xl text-xs pixel-button flex items-center gap-1.5 shrink-0"
                >
                  <span>Zum Spiel</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {item.tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-[#171426] text-slate-400 border border-[#2b2544] px-2 py-0.5 rounded text-[10px]"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-[#100e1b] border-t border-[#2b2544] p-4 flex items-center justify-end">
          <button
            onClick={() => {
              audioService.playClickSound();
              onClose();
            }}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-2 rounded-xl text-xs pixel-button"
          >
            Fertig
          </button>
        </div>
      </div>
    </div>
  );
};
