/**
 * Master-Distributions-Skript
 * Synchronisiert alle lokalen Retrospiele auf dem Mac in einem Durchlauf
 * mit den jeweils passenden Spritesheets aus dem Epochenhub.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const HUB_DIR = path.resolve(__dirname, '..');
const PROJECTS_ROOT = path.resolve(HUB_DIR, '..');
const SYNC_SCRIPT = path.join(HUB_DIR, 'scripts/sync_shared_assets.cjs');

console.log(`=== MASTER ASSET DISTRIBUTION ===`);
console.log(`Scanne Projekte in: ${PROJECTS_ROOT}\n`);

const entries = fs.readdirSync(PROJECTS_ROOT, { withFileTypes: true });
const gameDirs = entries
  .filter(e => e.isDirectory() && e.name.startsWith('SNES Retro Game'))
  .map(e => path.join(PROJECTS_ROOT, e.name));

console.log(`Gefundene Spiele-Projekte: ${gameDirs.length}\n`);

for (const dir of gameDirs) {
  const name = path.basename(dir);
  console.log(`----------------------------------------`);
  console.log(`Synchronisiere: ${name}`);
  try {
    execSync(`node "${SYNC_SCRIPT}" --target="${dir}"`, { stdio: 'inherit' });
  } catch (err) {
    console.error(`Fehler bei Synchronisation von ${name}:`, err.message);
  }
}

console.log(`\n🎉 Alle Spieleprojekte wurden erfolgreich mit den zentralen Spritesheets aktualisiert!`);
