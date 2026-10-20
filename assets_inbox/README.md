# Assets Inbox / Dropzone

Lege hier neue Spritesheet-Grafiken (.png) ab (z. B. `wehende_fahne.png`, `wolf_grey_idle.png`, `olive_tree.png`).

Führe danach im Terminal aus:
```bash
npm run ingest
```

Das Ingest-Skript:
1. Analysiert die Abmessungen und Dateinamen
2. Ordnet die Datei automatisch der passenden Kategorie zu (`fauna/`, `flora/`, `props/`)
3. Konvertiert den Namen in sauberes `snake_case`
4. Verschiebt die Datei nach `public/assets/shared/<kategorie>/`
5. Aktualisiert das zentrale Manifest `public/assets/shared/shared_assets.json`
