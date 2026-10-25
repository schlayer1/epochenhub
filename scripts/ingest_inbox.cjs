/**
 * Ingestion-Skript für die Dropzone 'assets_inbox/'
 * Liest rekursiv alle neuen Dateien aus assets_inbox/ (inkl. Unterordner),
 * analysiert ihre Dimensionen, ordnet sie automatisch tilesets/, props/, fauna/ oder flora/ zu,
 * vergibt kollisionsfreie Clean-Names mit Pack-Präfix und aktualisiert das zentrale Manifest shared_assets.json.
 */

const fs = require('fs');
const path = require('path');

const HUB_ROOT = path.resolve(__dirname, '..');
const INBOX_DIR = path.join(HUB_ROOT, 'assets_inbox');
const SHARED_DIR = path.join(HUB_ROOT, 'public/assets/shared');
const MANIFEST_PATH = path.join(SHARED_DIR, 'shared_assets.json');

function getPngDimensions(filePath) {
  try {
    const buf = fs.readFileSync(filePath);
    if (buf.length < 24) return { width: 0, height: 0 };
    const width = buf.readUInt32BE(16);
    const height = buf.readUInt32BE(20);
    return { width, height };
  } catch (e) {
    return { width: 0, height: 0 };
  }
}

function scanInboxRecursively(dir, baseDir = dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.name.startsWith('.') || entry.name.toLowerCase() === 'readme.md') continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(scanInboxRecursively(fullPath, baseDir));
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.png')) {
      const relPath = path.relative(baseDir, fullPath);
      results.push({ fullPath, relPath, filename: entry.name });
    }
  }
  return results;
}

function cleanSlug(str) {
  return str
    .toLowerCase()
    .replace(/^pc\s*_\s*computer\s*-\s*stardew\s*valley\s*-\s*/i, '')
    .replace(/^(animals|environment|props|tilesets)\s*-\s*/i, '')
    .replace(/&/g, 'and')
    .replace(/[\(\)\[\]\{\}\']/g, '')
    .trim()
    .replace(/[\s\-_]+/g, '_')
    .replace(/_+/g, '_');
}

function buildCleanFilename(item) {
  const parts = item.relPath.split(path.sep);
  // Falls in einem Unterordner (z. B. "Docks_and_Harbour/Tileset.png")
  let prefix = '';
  if (parts.length > 1) {
    // Nimm den obersten Pack-Ordner als Namensraum
    prefix = cleanSlug(parts[0]).replace(/^bubbabba_?/, '') + '_';
  }
  const baseName = cleanSlug(path.basename(item.filename, '.png'));
  
  // Wenn der Dateiname bereits den Ordnernamen enthält, vermeide Doppler
  let finalName = baseName;
  if (prefix && !baseName.startsWith(prefix.replace(/_$/, ''))) {
    finalName = prefix + baseName;
  }
  return finalName.replace(/_+/g, '_') + '.png';
}

function classifyCategory(relPath, cleanName) {
  const text = (relPath + ' ' + cleanName).toLowerCase();

  // Tilesets (Böden, Wände, Gelände, Outdoor, Höhlen, Gebäude, Docks, Pfade)
  if (
    text.includes('tileset') || text.includes('tilemap') || text.includes('terrain') ||
    text.includes('wall') || text.includes('floor') || text.includes('ground') ||
    text.includes('outdoor') || text.includes('path') || text.includes('road') ||
    text.includes('water') || text.includes('harbour') || text.includes('docks') ||
    text.includes('pier') || text.includes('dungeon') || text.includes('interior') ||
    text.includes('room')
  ) {
    return 'tilesets';
  }

  // Props (Möbel, Craftables, Zäune, Dekoration, Kisten, Schiffe)
  if (
    text.includes('prop') || text.includes('item') || text.includes('chair') ||
    text.includes('desk') || text.includes('table') || text.includes('furniture') ||
    text.includes('craftable') || text.includes('fence') || text.includes('torch') ||
    text.includes('lamp') || text.includes('flag') || text.includes('banner') ||
    text.includes('boat') || text.includes('ship') || text.includes('barrel') ||
    text.includes('crate') || text.includes('chest') || text.includes('cart')
  ) {
    return 'props';
  }

  // Flora (Pflanzen, Bäume, Ernte)
  if (
    text.includes('tree') || text.includes('crop') || text.includes('plant') ||
    text.includes('bush') || text.includes('grass') || text.includes('flower') ||
    text.includes('flora') || text.includes('nature') || text.includes('farm')
  ) {
    return 'flora';
  }

  // Fauna (Tiere)
  if (
    text.includes('fauna') || text.includes('animal') || text.includes('horse') ||
    text.includes('dog') || text.includes('cat') || text.includes('bird') ||
    text.includes('wolf') || text.includes('sheep') || text.includes('cow')
  ) {
    return 'fauna';
  }

  // Default: Props falls kein Match
  return 'props';
}

function guessFrameSize(width, height, category, cleanName) {
  const name = cleanName.toLowerCase();
  if (name.includes('32x32') || name.includes('32_')) return { w: 32, h: 32 };
  if (name.includes('16x16') || name.includes('16_')) return { w: 16, h: 16 };
  if (name.includes('48x48') || name.includes('48_')) return { w: 48, h: 48 };

  if (category === 'tilesets') {
    // Wenn durch 16 teilbar, meist 16x16
    if (width % 16 === 0 && height % 16 === 0) return { w: 16, h: 16 };
    return { w: 32, h: 32 };
  }

  if (width % 32 === 0 && width <= 128) return { w: 32, h: 32 };
  if (width % 16 === 0 && width <= 64) return { w: 16, h: 16 };
  if (width % 48 === 0) return { w: 48, h: height > 100 ? 80 : 48 };
  return { w: 16, h: 16 };
}

function getEpochsForAsset(cleanName) {
  const name = cleanName.toLowerCase();
  const epochs = [];
  if (name.includes('farm') || name.includes('interior') || name.includes('castle') || name.includes('dungeon')) {
    epochs.push('mittelalter');
  }
  if (name.includes('docks') || name.includes('harbour') || name.includes('boat')) {
    epochs.push('wikinger', 'griechenland', 'rom', 'mittelalter');
  }
  if (name.includes('desert') || name.includes('pyramid')) {
    epochs.push('aegypten');
  }
  if (name.includes('outdoor') || name.includes('nature') || name.includes('camp')) {
    epochs.push('steinzeit', 'germanen', 'griechenland', 'rom', 'wikinger', 'mittelalter');
  }
  return [...new Set(epochs)];
}

function removeEmptyDirs(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const sub = path.join(dir, entry.name);
      removeEmptyDirs(sub);
      try {
        fs.rmdirSync(sub);
      } catch (e) {
        // Nicht leer, belassen
      }
    }
  }
}

function runIngest() {
  if (!fs.existsSync(INBOX_DIR)) {
    fs.mkdirSync(INBOX_DIR, { recursive: true });
  }

  const items = scanInboxRecursively(INBOX_DIR);
  if (items.length === 0) {
    console.log(`Keine neuen Bilddateien (.png) in 'assets_inbox/' gefunden.`);
    console.log(`Lege einfach Ordner oder PNG-Dateien in '${INBOX_DIR}' ab und führe 'npm run ingest' erneut aus.`);
    return;
  }

  console.log(`🚀 Gefunden: ${items.length} PNG-Datei(en) in 'assets_inbox/' (inkl. Unterordner)!`);

  let manifest = {
    generatedAt: new Date().toISOString(),
    totalAssets: 0,
    categories: { fauna: 0, flora: 0, props: 0, tilesets: 0 },
    assets: []
  };

  if (fs.existsSync(MANIFEST_PATH)) {
    try {
      manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
    } catch (e) {
      console.warn('Altes Manifest konnte nicht geparst werden, erstelle neu.');
    }
  }

  let processedCount = 0;

  for (const item of items) {
    const dims = getPngDimensions(item.fullPath);
    if (dims.width === 0 || dims.height === 0) {
      console.warn(`Überspringe ungültige PNG-Datei: ${item.relPath}`);
      continue;
    }

    const clean = buildCleanFilename(item);
    const category = classifyCategory(item.relPath, clean);
    const targetDir = path.join(SHARED_DIR, category);

    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const targetPath = path.join(targetDir, clean);
    
    // Kopiere/Verschiebe
    fs.copyFileSync(item.fullPath, targetPath);
    fs.unlinkSync(item.fullPath);

    const frames = guessFrameSize(dims.width, dims.height, category, clean);
    const assetId = clean.replace('.png', '');

    const assetEntry = {
      id: assetId,
      cleanName: clean,
      category,
      publicUrl: `/assets/shared/${category}/${clean}`,
      width: dims.width,
      height: dims.height,
      frameWidth: frames.w,
      frameHeight: frames.h,
      isDidactic: (category === 'fauna' || category === 'flora') && !clean.includes('grass'),
      epochs: getEpochsForAsset(clean),
      sourcePack: item.relPath.split(path.sep)[0] || 'inbox',
      titleDe: clean.replace('.png', '').replace(/_/g, ' ').toUpperCase(),
      subtitleDe: category === 'tilesets' 
        ? `Umgebungskachel-Set (${dims.width}x${dims.height}px, ${frames.w}x${frames.h} Grid)`
        : `Spritesheet (${dims.width}x${dims.height}px)`
    };

    const existingIdx = manifest.assets.findIndex(a => a.id === assetId);
    if (existingIdx >= 0) {
      manifest.assets[existingIdx] = { ...manifest.assets[existingIdx], ...assetEntry };
    } else {
      manifest.assets.push(assetEntry);
    }

    console.log(`✅ [${category.toUpperCase()}] ${item.relPath} -> ${clean} (${dims.width}x${dims.height}px, Grid: ${frames.w}x${frames.h})`);
    processedCount++;
  }

  // Leere Ordner aufräumen
  removeEmptyDirs(INBOX_DIR);

  // Zähler aktualisieren
  manifest.categories = { fauna: 0, flora: 0, props: 0, tilesets: 0 };
  for (const a of manifest.assets) {
    if (manifest.categories[a.category] !== undefined) {
      manifest.categories[a.category]++;
    } else {
      manifest.categories[a.category] = 1;
    }
  }
  manifest.totalAssets = manifest.assets.length;
  manifest.generatedAt = new Date().toISOString();

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), 'utf8');
  console.log(`\n🎉 ${processedCount} Datei(en) erfolgreich verarbeitet und in 'public/assets/shared/' einsortiert!`);
  console.log(`Manifest aktualisiert: ${manifest.totalAssets} Gesamt-Assets im Epochenhub.`);
}

runIngest();
