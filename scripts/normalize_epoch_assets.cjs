/**
 * Universal-Asset-Normalizer für SNES-Geschichtsspiele
 * Skaliert externe Assetpacks (RPG Maker MV 48px, XP 32px, freie High-Res-PNGs)
 * verlustfrei per Nearest-Neighbor-Verfahren auf den nativen 16-Bit SNES-Standard (16x16 Grid).
 * 
 * Verwendung im Spielprojekt:
 *   node scripts/normalize_epoch_assets.cjs
 *   oder:
 *   node "../Epochenhub Retro Games/scripts/normalize_epoch_assets.cjs" --target=.
 */

const fs = require('fs');
const path = require('path');

function getPuppeteer(root) {
  const candidates = [
    path.join(root, 'node_modules/puppeteer-core'),
    path.join(root, 'node_modules/puppeteer'),
    path.join(__dirname, '../node_modules/puppeteer-core'),
    '/Users/nicolekeller/Desktop/Antigravity Projekte/SNES Retro Game/node_modules/puppeteer-core',
    '/Users/nicolekeller/Desktop/Antigravity Projekte/SNES Retro Game Aegypten/node_modules/puppeteer-core'
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) {
      try {
        return require(c);
      } catch (e) {}
    }
  }
  return require('puppeteer-core');
}

// Argumente parsen
const args = process.argv.slice(2);
let targetDir = process.cwd();
for (const arg of args) {
  if (arg.startsWith('--target=')) {
    targetDir = path.resolve(arg.split('=')[1]);
  }
}

const RAW_DIRS = ['raw_assets', 'Assets', 'assets_raw', 'downloaded assets'];

function findRawDir(root) {
  for (const d of RAW_DIRS) {
    const full = path.join(root, d);
    if (fs.existsSync(full) && fs.statSync(full).isDirectory()) {
      return full;
    }
  }
  return null;
}

function findPngs(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of list) {
    if (item.name.startsWith('.')) continue;
    const full = path.join(dir, item.name);
    if (item.isDirectory()) {
      results = results.concat(findPngs(full));
    } else if (item.isFile() && item.name.toLowerCase().endsWith('.png')) {
      results.push(full);
    }
  }
  return results;
}

function getPngDimensions(filePath) {
  try {
    const buf = fs.readFileSync(filePath);
    if (buf.length < 24) return null;
    const width = buf.readUInt32BE(16);
    const height = buf.readUInt32BE(20);
    return { width, height };
  } catch (e) {
    return null;
  }
}

function cleanName(filename) {
  return filename
    .toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/[^\w\.\-]/g, '')
    .replace(/_+/g, '_');
}

function ensureGitIgnore(projectRoot) {
  const giPath = path.join(projectRoot, '.gitignore');
  let content = fs.existsSync(giPath) ? fs.readFileSync(giPath, 'utf8') : '';
  const entriesToAdd = ['raw_assets/', 'Assets/', 'assets_raw/', 'downloaded assets/'];
  let modified = false;

  for (const entry of entriesToAdd) {
    if (!content.includes(entry)) {
      content += (content.endsWith('\n') ? '' : '\n') + entry + '\n';
      modified = true;
    }
  }

  if (modified) {
    fs.writeFileSync(giPath, content, 'utf8');
    console.log(`🔒 .gitignore aktualisiert: Rohe Asset-Ordner werden lokal gehalten und nicht nach Git gepusht.`);
  }
}

async function run() {
  console.log(`=== SNES HISTORY GAME: ASSET NORMALIZER ===`);
  console.log(`Projekt: ${targetDir}`);

  const rawDir = findRawDir(targetDir);
  if (!rawDir) {
    console.log(`Kein Roh-Asset-Ordner (raw_assets/, Assets/) gefunden. Überspringe Normalisierung.`);
    return;
  }

  console.log(`Gefundener Roh-Asset-Ordner: ${path.relative(targetDir, rawDir)}`);
  ensureGitIgnore(targetDir);

  const pngFiles = findPngs(rawDir);
  console.log(`Gefundene PNG-Dateien: ${pngFiles.length}\n`);

  if (pngFiles.length === 0) return;

  // Puppeteer laden für verlustfreies Nearest-Neighbor-Resampling
  const puppeteer = getPuppeteer(targetDir);
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();

  const publicAssets = path.join(targetDir, 'public/assets');
  const targetProps = path.join(publicAssets, 'props');
  const targetTilesets = path.join(publicAssets, 'tilesets');
  const targetBuildings = path.join(publicAssets, 'buildings');

  [targetProps, targetTilesets, targetBuildings].forEach(d => {
    if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
  });

  const catalog = {
    generatedAt: new Date().toISOString(),
    sourceDir: path.basename(rawDir),
    totalNormalized: 0,
    assets: []
  };

  for (const srcFile of pngFiles) {
    const dims = getPngDimensions(srcFile);
    if (!dims) continue;

    const baseName = path.basename(srcFile);
    const sanitized = cleanName(baseName);
    const relFromRaw = path.relative(rawDir, srcFile).toLowerCase();

    // Relevanz-Prüfung: Ignoriere statische Flora/Fauna (kommt besser aus Epochenhub)
    const isAnimalOrPlant = relFromRaw.includes('animal') || relFromRaw.includes('creature') || 
                            relFromRaw.includes('character') || relFromRaw.includes('actor');
    if (isAnimalOrPlant) {
      console.log(`⏩ Überspringe statische Figur/Kreatur (Epochenhub-Standard greift): ${baseName}`);
      continue;
    }

    let targetSubdir = targetProps;
    let targetW = dims.width;
    let targetH = dims.height;
    let category = 'props';

    // 1. RPG-Maker MV/MZ Auto-Tiles & Sheets (768px Standardbreite -> 48px Kacheln)
    if (dims.width === 768) {
      targetW = Math.round(dims.width / 3);  // 256px
      targetH = Math.round(dims.height / 3);
      targetSubdir = targetTilesets;
      category = 'tilesets';
    } 
    // 2. RPG-Maker XP Sheets (512px Standardbreite -> 32px Kacheln)
    else if (dims.width === 512 && dims.height >= 512) {
      targetW = Math.round(dims.width / 2);  // 256px
      targetH = Math.round(dims.height / 2);
      targetSubdir = targetTilesets;
      category = 'tilesets';
    }
    // 3. Große Gebäude & Landmarken
    else if (relFromRaw.includes('building') || relFromRaw.includes('monument') || relFromRaw.includes('pyramid') || relFromRaw.includes('temple') || relFromRaw.includes('ruin')) {
      targetSubdir = targetBuildings;
      category = 'buildings';
      // Skaliere riesige High-Res-Gebäude so herab, dass sie im 480x270 Retro-Canvas stimmig wirken
      if (dims.height > 160) {
        const factor = 112 / dims.height; // Max ~112px Höhe für monumentale Bauten
        targetW = Math.max(16, Math.round(dims.width * factor));
        targetH = Math.max(16, Math.round(dims.height * factor));
      }
    }
    // 4. Einrichtungs- und Umgebungsobjekte (Tische, Zelte, Kisten, Brunnen)
    else {
      targetSubdir = targetProps;
      category = 'props';
      if (dims.height > 80) {
        const factor = 48 / dims.height; // Mittlere Props auf ~32-48px einpassen
        targetW = Math.max(16, Math.round(dims.width * factor));
        targetH = Math.max(16, Math.round(dims.height * factor));
      }
    }

    const destFile = path.join(targetSubdir, sanitized);

    // Pixelgenaues Resampling über Offscreen HTML5 Canvas (Nearest-Neighbor)
    const b64 = fs.readFileSync(srcFile).toString('base64');
    const dataUrl = await page.evaluate(async (base64, outW, outH) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = outW;
          canvas.height = outH;
          const ctx = canvas.getContext('2d');
          ctx.imageSmoothingEnabled = false; // STRIKTES PIXEL-ART NEAREST-NEIGHBOR
          ctx.drawImage(img, 0, 0, outW, outH);
          resolve(canvas.toDataURL('image/png'));
        };
        img.src = 'data:image/png;base64,' + base64;
      });
    }, b64, targetW, targetH);

    const buffer = Buffer.from(dataUrl.replace(/^data:image\/png;base64,/, ''), 'base64');
    fs.writeFileSync(destFile, buffer);

    catalog.assets.push({
      id: sanitized.replace('.png', ''),
      fileName: sanitized,
      category,
      path: `assets/${category}/${sanitized}`,
      origWidth: dims.width,
      origHeight: dims.height,
      targetWidth: targetW,
      targetHeight: targetH
    });

    catalog.totalNormalized++;
    console.log(`✅ [${category.toUpperCase()}] ${baseName} (${dims.width}x${dims.height}px) -> ${sanitized} (${targetW}x${targetH}px)`);
  }

  await browser.close();

  // Lokalen Katalog für Phase 2/3 Map-Generation anlegen
  const catalogPath = path.join(publicAssets, 'epoch_assets.json');
  fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2), 'utf8');

  console.log(`\n🎉 ${catalog.totalNormalized} Assets erfolgreich auf 16-Bit SNES-Maßstab normalisiert!`);
  console.log(`Katalog gespeichert unter: ${path.relative(targetDir, catalogPath)}`);
}

run().catch(err => {
  console.error('Fehler bei der Asset-Normalisierung:', err);
  process.exit(1);
});
