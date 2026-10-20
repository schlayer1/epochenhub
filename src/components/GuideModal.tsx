import React, { useEffect } from 'react';
import { 
  X, 
  HelpCircle, 
  Gamepad2, 
  Backpack, 
  Award, 
  FileText, 
  Sparkles, 
  Keyboard, 
  Smartphone, 
  CheckCircle2,
  BookOpen
} from 'lucide-react';
import { audioService } from '../services/audioService';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose }) => {
  // ESC-Taste zum Schließen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        audioService.playClickSound();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm animate-fade-in overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl bg-[#12101c] border-2 border-amber-500/80 rounded-2xl shadow-[0_0_35px_rgba(245,158,11,0.25)] overflow-hidden flex flex-col my-auto max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Schließen-Button */}
        <button
          onClick={() => {
            audioService.playClickSound();
            onClose();
          }}
          className="absolute top-3.5 right-3.5 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-rose-900 border border-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-all pixel-button"
          title="Schließen (Esc)"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal-Header */}
        <div className="bg-gradient-to-r from-amber-950/90 via-[#1e1933] to-amber-950/90 border-b border-[#2d2747] p-5 sm:p-6 text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/40 text-amber-300 font-pixel text-[10px]">
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span>Schüler-Leitfaden für den Geschichtsunterricht</span>
          </div>
          <h2 className="font-cinzel text-xl sm:text-3xl font-extrabold text-amber-200 uppercase tracking-wider">
            Wie nutze ich den Epochenhub?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Alles, was du für deine historische Forschungsreise auf PC, Laptop oder Tablet wissen musst.
          </p>
        </div>

        {/* 2x2 Kachel-Grid für Schüler */}
        <div className="flex-1 min-h-0 p-4 sm:p-6 overflow-y-auto space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            
            {/* Karte 1: Steuerung (PC & Tablet) */}
            <div className="bg-[#181528] border border-[#2e2747] rounded-xl p-4 sm:p-5 space-y-3.5 hover:border-amber-500/40 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                  <Gamepad2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-pixel text-[9px] text-amber-400 uppercase tracking-wider block">Schritt 1</span>
                  <h3 className="font-pixel text-xs sm:text-sm text-slate-100">Steuerung & Bewegung</h3>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-slate-300 leading-relaxed">
                <div className="flex items-start gap-2 bg-[#12101e] p-2.5 rounded-lg border border-[#231d38]">
                  <Keyboard className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-100 block">Am Computer / Laptop:</strong>
                    Bewege deine Spielfigur mit <kbd className="px-1.5 py-0.5 bg-slate-800 text-amber-300 rounded border border-slate-600 font-mono text-[10px]">W</kbd> <kbd className="px-1.5 py-0.5 bg-slate-800 text-amber-300 rounded border border-slate-600 font-mono text-[10px]">A</kbd> <kbd className="px-1.5 py-0.5 bg-slate-800 text-amber-300 rounded border border-slate-600 font-mono text-[10px]">S</kbd> <kbd className="px-1.5 py-0.5 bg-slate-800 text-amber-300 rounded border border-slate-600 font-mono text-[10px]">D</kbd> oder den <kbd className="px-1.5 py-0.5 bg-slate-800 text-amber-300 rounded border border-slate-600 font-mono text-[10px]">Pfeiltasten</kbd>.
                  </div>
                </div>

                <div className="flex items-start gap-2 bg-[#12101e] p-2.5 rounded-lg border border-[#231d38]">
                  <Smartphone className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-100 block">Auf iPad & Tablet:</strong>
                    Nutze das Bildschirm-Steuerkreuz unten links oder tippe einfach direkt auf das Ziel, zu dem du laufen möchtest.
                  </div>
                </div>

                <div className="bg-amber-500/10 p-2 rounded-md border border-amber-500/20 text-[11px] text-amber-200">
                  👉 <strong>Wichtigste Taste:</strong> Drücke <kbd className="px-1.5 py-0.5 bg-amber-500 text-slate-950 font-bold rounded text-[10px]">E</kbd> (oder tippe auf den Bildschirm-Button), um mit Mentoren zu sprechen, Gebäude zu betreten oder Fundstücke aufzuheben.
                </div>
              </div>
            </div>

            {/* Karte 2: Rucksack & Werkstatt (Die Aktionen) */}
            <div className="bg-[#181528] border border-[#2e2747] rounded-xl p-4 sm:p-5 space-y-3.5 hover:border-amber-500/40 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                  <Backpack className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-pixel text-[9px] text-emerald-400 uppercase tracking-wider block">Schritt 2</span>
                  <h3 className="font-pixel text-xs sm:text-sm text-slate-100">Werkzeuge, Bauen & Lexikon</h3>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-[#12101e] p-2 rounded-lg border border-[#231d38]">
                    <div className="flex items-center gap-1.5 font-bold text-amber-300 mb-1">
                      <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-600 font-mono text-[10px]">I</kbd>
                      <span>Rucksack</span>
                    </div>
                    <span className="text-[11px] text-slate-400">Zeigt deine gesammelten Vorräte und Artefakte.</span>
                  </div>

                  <div className="bg-[#12101e] p-2 rounded-lg border border-[#231d38]">
                    <div className="flex items-center gap-1.5 font-bold text-amber-300 mb-1">
                      <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-600 font-mono text-[10px]">C</kbd>
                      <span>Werkstatt</span>
                    </div>
                    <span className="text-[11px] text-slate-400">Stelle Werkzeuge, Salben, Speere oder Kleidung her.</span>
                  </div>

                  <div className="bg-[#12101e] p-2 rounded-lg border border-[#231d38]">
                    <div className="flex items-center gap-1.5 font-bold text-amber-300 mb-1">
                      <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-600 font-mono text-[10px]">B</kbd>
                      <span>Bauen</span>
                    </div>
                    <span className="text-[11px] text-slate-400">Errichte Brunnen, Speicher und Hütten am Bauplatz.</span>
                  </div>

                  <div className="bg-[#12101e] p-2 rounded-lg border border-[#231d38]">
                    <div className="flex items-center gap-1.5 font-bold text-amber-300 mb-1">
                      <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-600 font-mono text-[10px]">L</kbd>
                      <span>Lexikon</span>
                    </div>
                    <span className="text-[11px] text-slate-400">Schlage Fachbegriffe und Merksätze jederzeit nach.</span>
                  </div>
                </div>

                <div className="bg-[#12101e] p-2 rounded-lg border border-[#231d38] text-[11px] text-slate-300">
                  ⏳ <strong>Taste <kbd className="px-1 py-0.5 bg-slate-800 text-amber-300 rounded border border-slate-600 font-mono text-[9px]">Z</kbd> (Zeitreise):</strong> Vergleicht historische Epochenphasen (z. B. Altsteinzeit vs. Jungsteinzeit).
                </div>
              </div>
            </div>

            {/* Karte 3: Chrono-Pass & Stempel */}
            <div className="bg-[#181528] border border-[#2e2747] rounded-xl p-4 sm:p-5 space-y-3.5 hover:border-amber-500/40 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-pixel text-[9px] text-purple-400 uppercase tracking-wider block">Schritt 3</span>
                  <h3 className="font-pixel text-xs sm:text-sm text-slate-100">Chrono-Pass & Stempelkarte</h3>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-slate-300 leading-relaxed">
                <p>
                  Oben im Menü findest du deinen <strong>Chrono-Pass</strong>. Für jedes Spiel, das du im Unterricht erforschst, kannst du dir einen goldenen Siegel-Stempel abholen!
                </p>

                <div className="bg-[#12101e] p-2.5 rounded-lg border border-[#231d38] space-y-1.5 text-[11px]">
                  <div className="flex items-center gap-2 text-slate-200 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>100% Datenschutz – Kein Login nötig</span>
                  </div>
                  <p className="text-slate-400">
                    Deine Stempel und Spielstände werden ausschließlich lokal auf deinem Gerät gespeichert. Niemand sammelt deine Daten.
                  </p>
                </div>

                <div className="text-[11px] text-purple-300 bg-purple-950/40 p-2 rounded-md border border-purple-800/40">
                  🌿 <strong>Natur-Atlas:</strong> Klicke im Menü auf <em>Natur-Atlas</em>, um heilige Tiere wie die Bastet-Katze oder Nutzpflanzen jeder Epoche in Bewegung zu bestaunen!
                </div>
              </div>
            </div>

            {/* Karte 4: Pause & Hefter-Code */}
            <div className="bg-[#181528] border border-[#2e2747] rounded-xl p-4 sm:p-5 space-y-3.5 hover:border-amber-500/40 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400 shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-pixel text-[9px] text-sky-400 uppercase tracking-wider block">Schritt 4</span>
                  <h3 className="font-pixel text-xs sm:text-sm text-slate-100">Pause & Hefter-Code</h3>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-slate-300 leading-relaxed">
                <p>
                  Möchtest du eine Pause machen oder der Lehrkraft zeigen, wie weit du bist?
                </p>

                <div className="bg-[#12101e] p-2.5 rounded-lg border border-[#231d38] space-y-1.5 text-[11px]">
                  <div className="flex items-center gap-2 text-amber-300 font-bold">
                    <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-600 font-mono text-[10px]">P</kbd>
                    <span>Pause-Zentrale im Spiel öffnen</span>
                  </div>
                  <p className="text-slate-400">
                    Mit Taste <kbd className="px-1 py-0.5 bg-slate-800 text-amber-300 rounded border border-slate-600 font-mono text-[9px]">P</kbd> öffnest du das Pause-Menü mit Musik-Player, Spielstatistiken und deinem Code.
                  </p>
                </div>

                <div className="bg-amber-950/40 border border-amber-600/40 p-2.5 rounded-lg space-y-1">
                  <div className="flex items-center gap-1.5 text-amber-300 font-bold text-[11px]">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Dein persönlicher Hefter-Code</span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Trage den Code (z. B. <code className="bg-black/50 px-1 py-0.5 rounded text-amber-400 font-mono">GERM-481-K2</code>) in deinen Hefter ein, um deine Quests jederzeit nachzuweisen!
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Abschluss-Tipp Banner */}
          <div className="bg-gradient-to-r from-amber-950/60 via-purple-950/40 to-amber-950/60 border border-amber-500/40 rounded-xl p-3.5 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shrink-0">
                <BookOpen className="w-4 h-4" />
              </div>
              <div className="text-xs text-slate-200">
                <strong>Ziel jedes Spiels:</strong> Löse alle Kapitelaufgaben und schließe das Abschluss-Quiz ab, um am Ende deine persönliche <strong>Meister-Urkunde (Taste U)</strong> zu erhalten!
              </div>
            </div>

            <button
              onClick={() => {
                audioService.playClickSound();
                onClose();
              }}
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold font-pixel text-xs pixel-button shadow-[0_0_15px_rgba(245,158,11,0.4)] shrink-0 transition-all"
            >
              Verstanden – Auf ins Abenteuer!
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
