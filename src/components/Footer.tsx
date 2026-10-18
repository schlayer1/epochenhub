import React from 'react';
import { Compass, Heart, ShieldCheck, Mail, Sparkles } from 'lucide-react';
import { PORTAL_META } from '../config/games.config';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t-2 border-[#211c33] bg-[#09080e] px-4 sm:px-6 lg:px-8 py-10 text-xs text-slate-400">
      <div className="w-full max-w-[2100px] mx-auto space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Col 1: School Identity */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400">
                <Compass className="w-4 h-4 animate-spin-slow" />
              </div>
              <span className="font-pixel text-xs text-amber-400 uppercase tracking-wider">
                Epochenhub
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Offizielle Retro-Spiele-Zentrale der <strong>{PORTAL_META.schoolName} {PORTAL_META.schoolLocation}</strong>. Interaktive Geschichts-Expeditionen im 16-Bit-Stil für den modernen Unterricht.
            </p>
          </div>

          {/* Col 2: Didactics & Privacy */}
          <div className="space-y-3">
            <h4 className="font-pixel text-[11px] text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Didaktik & Datenschutz</span>
            </h4>
            <p className="text-slate-400 leading-relaxed">
              100% werbefrei, ohne Registrierungszwang und ohne Schüler-Tracking. Fortschritte im Zeitreise-Pass werden sicher und lokal im Webbrowser der Schüler gespeichert.
            </p>
          </div>

          {/* Col 3: Teacher Note & Extension */}
          <div className="space-y-3">
            <h4 className="font-pixel text-[11px] text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Künftige Spiele ergänzen</span>
            </h4>
            <p className="text-slate-400 leading-relaxed">
              Neue Epochen und Spiele können in Sekunden über die Datei <code className="bg-[#1b172d] text-amber-300 px-1.5 py-0.5 rounded border border-[#2d2747]">games.config.ts</code> im Quelltext hinzugefügt werden.
            </p>
            <div className="pt-1">
              <a
                href={`mailto:${PORTAL_META.supportEmail}`}
                className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{PORTAL_META.supportEmail}</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Line */}
        <div className="pt-6 border-t border-[#1a1729] flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} {PORTAL_META.schoolName} {PORTAL_META.schoolLocation} • Alle Rechte vorbehalten
          </div>
          <div className="flex items-center gap-1">
            <span>Entwickelt mit</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>für begeisternden Geschichtsunterricht</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
