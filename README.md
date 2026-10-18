# Epochenhub Retro Games 🕹️⏳
### Staatliche Regelschule Heimbürgeschule Kahla

Zentrales, immersives 16-Bit-Epochenportal zur Verteilung und Entdeckung aller Geschichts-Lernabenteuer von der Ur- und Frühgeschichte bis zur Antike und Moderne.

---

## 🎮 Integrierte Spiele & Live-URLs

| Station | Titel | Epoche & Datierung | Klasse | Kapitel | Live-URL |
| :---: | :--- | :--- | :---: | :---: | :--- |
| **I** | **Vom Jäger zum Schmied** *(Die Wiege der Menschheit)* | Ur- & Frühgeschichte *(40.000 – 800 v. Chr.)* | Kl. 5/6 | **6 Kapitel** | [retrolernspiel.vercel.app](https://retrolernspiel.vercel.app/) |
| **II** | **Kemet – Das Geschenk des Nils** *(Hochkultur am Nil)* | Altes Ägypten *(3.000 – 30 v. Chr.)* | Kl. 5/6 | **6 Kapitel** | [retrolernspielegypt.vercel.app](https://retrolernspielegypt.vercel.app/) |
| **III** | **Hellas – Von der Polis zum Weltreich** *(Wiege Europas)* | Antikes Griechenland *(800 – 30 v. Chr.)* | Kl. 5/6 | **10 Kapitel** | [retrolernspielgreece.vercel.app](https://retrolernspielgreece.vercel.app/) |
| **IV** | **Imperium Romanum: Roma Aeterna** *(Vom Dorf zum Weltreich)* | Römisches Reich *(753 v. Chr. – 476 n. Chr.)* | Kl. 6 | **12 Kapitel** | [retrospielrome.vercel.app](https://retrospielrome.vercel.app/) |
| **V** | **Die Germanen: Vom Langhaus zum Limes** *(Alltag, Thing & Limes)* | Germanische Stämme *(ca. 10 v. Chr. – 350 n. Chr.)* | Kl. 6 | **8 Kapitel** | [retrolernspielgermanic.vercel.app](https://retrolernspielgermanic.vercel.app/) |

---

## 🚀 Kernfunktionen

1. **Chronologische 16-Bit Zeitreise & Bento-Grid:**
   - Umschaltbar zwischen animierter Zeitleiste und kompaktem Raster mit Filterung nach Klassenstufe und Epochen.
2. **Schlanke Didaktik-Vorschau:**
   - Zeigt gezielt die **Anzahl der Kapitel** (z. B. 6, 10 oder 12 Kapitel), empfohlene Spielzeit, Klassenstufe und die historische Leitfrage.
3. **Smartboard- & Tablet-QR-Codes:**
   - Zu jedem Spiel kann per Klick ein kontrastreicher QR-Code eingeblendet werden, ideal für die Beamer-Projektion im Unterricht zum direkten Scannen durch die Schüler.
4. **Schüler-Zeitreise-Pass:**
   - Schüler können erforschte Epochen im Browser stempeln (lokal gespeichert, ohne Login, mit Konfetti-Effekt).
5. **WebAudio Retro-Synthesizer:**
   - Echte 8-Bit/16-Bit Klick-, Hover- und Fanfare-Sounds sowie prozedurale Retro-Musik mit Stummschalt-Schalter.
6. **Fluid-responsiv:**
   - Optimiert für 4K/5K iMacs, MacBooks, iPads (Portrait & Landscape) und Smartphones.

---

## 🛠️ Entwicklung & Build

```bash
# Entwicklungsserver starten (Port 3000)
npm run dev

# Produktions-Build erzeugen
npm run build

# Lokalen Build testen
npm run preview
```

---

## ➕ Künftige Spiele hinzufügen
Um künftig weitere Spiele zu ergänzen, muss lediglich ein Eintrag in [`src/config/games.config.ts`](./src/config/games.config.ts) vorgenommen werden:

```typescript
{
  id: 'mein-neues-spiel',
  title: 'Titel des Spiels',
  subtitle: 'Untertitel',
  epoch: 'Mittelalter',
  epochCategory: 'mittelalter',
  period: 'ca. 500 – 1500 n. Chr.',
  yearStart: 500,
  yearEnd: 1500,
  grade: 'Klasse 7',
  chaptersCount: 8,
  duration: 'ca. 45 Min.',
  liveUrl: 'https://mein-neues-spiel.vercel.app/',
  coverImage: '/assets/covers/mein_cover.png',
  spriteImage: '/assets/sprites/mein_held.png',
  theme: { ... },
  guidingQuestion: 'Historische Leitfrage?',
  didacticFocus: [ ... ],
  tags: [ ... ]
}
```
