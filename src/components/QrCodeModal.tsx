import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X, Copy, Check, ExternalLink, Tablet, Smartphone, Sparkles } from 'lucide-react';
import { EpochGame } from '../types/game';
import { audioService } from '../services/audioService';

interface QrCodeModalProps {
  game: EpochGame | null;
  isOpen: boolean;
  onClose: () => void;
}

export const QrCodeModal: React.FC<QrCodeModalProps> = ({
  game,
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !game) return null;

  const handleCopy = () => {
    audioService.playClickSound();
    navigator.clipboard.writeText(game.liveUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
      
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-md bg-[#141221] border-2 border-amber-500 rounded-2xl shadow-pixel-lg overflow-hidden flex flex-col p-6 text-center space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button
          onClick={() => {
            audioService.playClickSound();
            onClose();
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 hover:bg-rose-900 border border-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-all pixel-button"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/40 text-amber-300 font-pixel text-[10px]">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Smartboard & Tablet QR-Code</span>
          </div>
          <h3 className="text-lg font-bold text-white pt-1">
            {game.title}
          </h3>
          <p className="text-xs text-slate-400">
            Scanne den Code mit deinem iPad oder Smartphone, um das Spiel sofort zu starten.
          </p>
        </div>

        {/* QR Code Canvas */}
        <div className="bg-white p-5 rounded-2xl mx-auto shadow-2xl border-4 border-amber-400 inline-block">
          <QRCodeSVG
            value={game.liveUrl}
            size={200}
            level="H"
            includeMargin={false}
          />
        </div>

        {/* URL Box & Copy */}
        <div className="bg-[#1b182d] border border-[#2d2747] rounded-xl p-2.5 flex items-center justify-between gap-2 text-xs">
          <span className="text-slate-300 font-mono truncate text-[11px] text-left pl-1">
            {game.liveUrl}
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3 py-1.5 rounded-lg shrink-0 text-xs transition-colors pixel-button"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-slate-950" />
                <span>Kopiert!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Kopieren</span>
              </>
            )}
          </button>
        </div>

        {/* Hint Icons */}
        <div className="flex items-center justify-center gap-4 text-xs text-slate-400 pt-1">
          <div className="flex items-center gap-1.5">
            <Tablet className="w-4 h-4 text-sky-400" />
            <span>iPad / Tablet</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5">
            <Smartphone className="w-4 h-4 text-amber-400" />
            <span>Smartphone</span>
          </div>
        </div>

        {/* Launch Directly Link */}
        <a
          href={game.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => audioService.playClickSound()}
          className="inline-flex items-center justify-center gap-2 text-xs text-amber-400 hover:text-amber-300 transition-colors pt-1"
        >
          <span>Direkt im neuen Tab öffnen</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>

      </div>
    </div>
  );
};
