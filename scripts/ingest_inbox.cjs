/**
 * Ingestion-Skript für die Dropzone 'assets_inbox/'
 * Liest alle neuen Dateien aus assets_inbox/, analysiert ihre Dimensionen,
 * ordnet sie automatisch fauna/, flora/ oder props/ zu, vergibt Clean-Names
 * und aktualisiert das zentrale Manifest shared_assets.json.
 */

const fs = require('fs');
const path = require('path');

const HUB_ROOT = path.resolve(__dirname, '..');
const INBOX_DIR = path.join(HUB_ROOT, 'assets_inbox');
const SHARED_DIR = path.join(HUB_ROOT, 'public/assets/shared');
const MANIFEST_PATH = path.join(SHARED_DIR, 'shared_assets.json');

function getPngDimensions(filePath) {
  const buf = fs.readFileSync(filePath);
  const width = buf.readUInt32BE(16);
  const height = buf.readUInt32BE(20);
  return { width, height };
}

function cleanFilename(rawName) {
  return rawName
    .toLowerCase()
    .replace(/^pc\s*_\s*computer\s*-\s*stardew\s*valley\s*-\s*/i, '')
    .replace(/^(animals|environment|props|tilesets)\s*-\s*/i, '')
    .replace(/&/g, 'and')
    .replace(/[\(\)]/g, '')
    .trim()
    .replace(/[\s\-_]+/g, '_')
    .replace(/_+/g, '_') + (rawName.endsWith('.png') ? '' : '.png');
}

function classifyCategory(rawName, cleanName) {
  const raw = rawName.toLowerCase();
  const clean = cleanName.toLowerCase();

  // Props (Möbel, Craftables, Zäune, Dekoration)
  if (
    clean.includes('chair') || clean.includes('desk') || clean.includes('table') ||
    clean.includes('furniture') || clean.includes('craftable') || clean.includes('fence') ||
    clean.includes('torch') || clean.includes('flag') || clean.includes('banner') ||
    clean.includes('mine') || clean.includes('ore') || clean.includes('item') ||
    clean.includes('tool') || clean.includes('player') || clean.includes('prop') ||
    clean.includes('pirate') || clean.includes('festival')
  ) {
    return 'props';
  }

  // Flora (Pflanzen, Bäume, Ernte)
  if (
    clean.includes('tree') || clean.includes('crop') || clean.includes('plant') ||
    clean.includes('bush') || clean.includes('grass') || clean.includes('flower') ||
    clean.includes('forage')
  ) {
    return 'flora';
  }

  // Tilesets (Böden, Wände, Gelände, Outdoor, Höhlen, Gebäude)
  if (
    raw.includes('tileset') || clean.includes('outdoor') || clean.includes('desert') ||
    clean.includes('wall') || clean.includes('floor') || clean.includes('cabin') ||
    clean.includes('farmhouse') || clean.includes('sewer') || clean.includes('dirt') ||
    clean.includes('cave') || clean.includes('pond')
  ) {
    return 'tilesets';
  }

  return 'fauna';
}

function guessFrameSize(width, height, category) {
  if (category === 'tilesets') return { w: 16, h: 16 };
  if (width % 32 === 0 && width <= 128) return { w: 32, h: 32 };
  if (width % 16 === 0 && width <= 64) return { w: 16, h: 16 };
  if (width % 48 === 0) return { w: 48, h: height > 100 ? 80 : 48 };
  return { w: 16, h: 16 };
}

function getEpochsForAsset(cleanName) {
  const name = cleanName.toLowerCase();
  if (name.includes('desert')) return ['aegypten', 'rom'];
  if (name.includes('cave') || name.includes('diggable')) return ['steinzeit'];
  if (name.includes('winter') || name.includes('pirate')) return ['wikinger'];
  if (name.includes('outdoor')) return ['germanen', 'griechenland', 'rom', 'wikinger', 'steinzeit'];
  return [];
}

function runIngest() {
  if (!fs.existsSync(INBOX_DIR)) {
    fs.mkdirSync(INBOX_DIR, { recursive: true });
  }

  const files = fs.readdirSync(INBOX_DIR).filter(f => f.endsWith('.png') && !f.startsWith('.'));
  if (files.length === 0) {
    console.log(`Keine neuen Spritesheets in 'assets_inbox/' gefunden.`);
    console.log(`Lege einfach PNG-Dateien in '${INBOX_DIR}' ab und führe 'npm run ingest' erneut aus.`);
    return;
  }

  console.log(`Gefunden: ${files.length} neue Datei(en) in 'assets_inbox/'!`);

  let manifest = {
    generatedAt: new Date().toISOString(),
    totalAssets: 0,
    categories: { fauna: 0, flora: 0, props: 0 },
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

  for (const rawFile of files) {
    const rawPath = path.join(INBOX_DIR, rawFile);
    const clean = cleanFilename(rawFile);
    const category = classifyCategory(rawFile, clean);
    const targetDir = path.join(SHARED_DIR, category);

    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const targetPath = path.join(targetDir, clean);
    fs.renameSync(rawPath, targetPath);

    const dims = getPngDimensions(targetPath);
    const frames = guessFrameSize(dims.width, dims.height, category);
    const assetId = clean.replace('.png', '');

    // Prüfe, ob Eintrag schon im Manifest existiert
    const existingIdx = manifest.assets.findIndex(a => a.id === assetId);
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
      titleDe: clean.replace('.png', '').replace(/_/g, ' ').toUpperCase(),
      subtitleDe: category === 'tilesets' 
        ? `16-Bit Umgebungskachel-Set (${dims.width}x${dims.height}px, 16x16 Grid)`
        : `Neu importiertes Spritesheet (${dims.width}x${dims.height}px)`
    };

    if (existingIdx >= 0) {
      manifest.assets[existingIdx] = { ...manifest.assets[existingIdx], ...assetEntry };
    } else {
      manifest.assets.push(assetEntry);
    }

    console.log(`✅ [${category.toUpperCase()}] ${rawFile} -> ${clean} (${dims.width}x${dims.height}px, Frame: ${frames.w}x${frames.h})`);
    processedCount++;
  }

  // Kategorienzähler aktualisieren
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
  console.log(`Manifest aktualisiert: ${manifest.totalAssets} Gesamt-Assets.`);
}

runIngest();
