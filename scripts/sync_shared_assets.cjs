/**
 * Universelles Synchronisations-Skript für Spieleprojekte
 * Kopiert die passenden Spritesheets aus dem Epochenhub in das Ziel-Projekt.
 * 
 * Benutzung im Spiel-Ordner:
 *   node "../Epochenhub Retro Games/scripts/sync_shared_assets.cjs"
 *   oder:
 *   node "../Epochenhub Retro Games/scripts/sync_shared_assets.cjs" --epoch=aegypten
 */

const fs = require('fs');
const path = require('path');

const HUB_DIR = path.resolve(__dirname, '..');
const SHARED_DIR = path.join(HUB_DIR, 'public/assets/shared');
const MANIFEST_PATH = path.join(SHARED_DIR, 'shared_assets.json');

// Argumente parsen
const args = process.argv.slice(2);
let targetDir = process.cwd();
let forceEpoch = null;

for (const arg of args) {
  if (arg.startsWith('--target=')) {
    targetDir = path.resolve(arg.split('=')[1]);
  } else if (arg.startsWith('--epoch=')) {
    forceEpoch = arg.split('=')[1].toLowerCase();
  }
}

function detectEpoch(targetPath) {
  if (forceEpoch) return forceEpoch;

  const folderName = path.basename(targetPath).toLowerCase();
  if (folderName.includes('aegypt') || folderName.includes('egypt')) return 'aegypten';
  if (folderName.includes('greek') || folderName.includes('hellas')) return 'griechenland';
  if (folderName.includes('rome') || folderName.includes('rom')) return 'rom';
  if (folderName.includes('german')) return 'germanen';
  if (folderName.includes('viking') || folderName.includes('wikinger')) return 'wikinger';
  if (folderName.includes('snes retro game') || folderName.includes('steinzeit')) return 'steinzeit';

  return 'all';
}

function runSync() {
  if (!fs.existsSync(MANIFEST_PATH)) {
    console.error(`Fehler: Manifest nicht gefunden unter: ${MANIFEST_PATH}`);
    process.exit(1);
  }

  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  const epoch = detectEpoch(targetDir);

  console.log(`=== SYNC SHARED ASSETS ===`);
  console.log(`Ziel-Ordner: ${targetDir}`);
  console.log(`Erkannte Epoche: ${epoch.toUpperCase()}`);

  const targetPublic = path.join(targetDir, 'public/assets');
  if (!fs.existsSync(targetPublic)) {
    console.error(`Fehler: '${targetPublic}' existiert nicht. Bitte im Root-Verzeichnis eines Spiels ausführen.`);
    process.exit(1);
  }

  const targetFauna = path.join(targetPublic, 'fauna');
  const targetFlora = path.join(targetPublic, 'flora');
  const targetProps = path.join(targetPublic, 'props');

  if (!fs.existsSync(targetFauna)) fs.mkdirSync(targetFauna, { recursive: true });
  if (!fs.existsSync(targetFlora)) fs.mkdirSync(targetFlora, { recursive: true });
  if (!fs.existsSync(targetProps)) fs.mkdirSync(targetProps, { recursive: true });

  let copiedCount = 0;
  const phaserSnippets = [];

  for (const asset of manifest.assets) {
    const isMatchingEpoch = epoch === 'all' || asset.epochs.includes(epoch) || asset.epochs.length === 0;
    if (!isMatchingEpoch) continue;

    const srcFile = path.join(SHARED_DIR, asset.category, asset.cleanName);
    const destDir = path.join(targetPublic, asset.category);
    const destFile = path.join(destDir, asset.cleanName);

    if (fs.existsSync(srcFile)) {
      fs.copyFileSync(srcFile, destFile);
      copiedCount++;
      phaserSnippets.push({
        id: asset.id,
        category: asset.category,
        file: asset.cleanName,
        frameWidth: asset.frameWidth,
        frameHeight: asset.frameHeight
      });
    }
  }

  console.log(`\n✅ ${copiedCount} Spritesheets erfolgreich nach 'public/assets/' synchronisiert!`);
  console.log(`Fauna & Flora stehen dem Spiel nun lokal zur Verfügung.`);
}

runSync();
