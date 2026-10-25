/**
 * Kuratierter Ingest-Prozessor: assets_library/ -> public/assets/shared/
 *
 * Verarbeitet die lokale 185.000-Asset-Bibliothek:
 * - Extrahiert Master-Sheets, Master-Tilesets, Animations-Strips (*_strip.png),
 *   Charaktere und hochwertige Props
 * - Ignoriert redundante Einzelbild-Dumps (/frames/, /gif/, /single/, /props_no_shadow/)
 * - Bereinigt und namespaces Dateinamen (z. B. "keep_banner_red.png", "docks_boat_sheet.png")
 * - Erweitert das zentrale Manifest shared_assets.json um didaktische Tags für
 *   GESCHICHTE, LITERATUR und GEOGRAFIE
 */

const fs = require('fs');
const path = require('path');

const HUB_ROOT = path.resolve(__dirname, '..');
const LIB_DIR = path.join(HUB_ROOT, 'assets_library');
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

function cleanSlug(str) {
  return str
    .toLowerCase()
    .replace(/^pc\s*_\s*computer\s*-\s*stardew\s*valley\s*-\s*/i, '')
    .replace(/^(animals|environment|props|tilesets)\s*-\s*/i, '')
    .replace(/_top_down_rpg_tileset_\[16x16\]/i, '')
    .replace(/_top_down_rpg_tileset/i, '')
    .replace(/&/g, 'and')
    .replace(/[\(\)\[\]\{\}\']/g, '')
    .trim()
    .replace(/[\s\-_]+/g, '_')
    .replace(/_+/g, '_');
}

function getPackNamespace(packDirName) {
  let s = cleanSlug(packDirName);
  s = s.replace(/_v\d+(_\d+)?$/, '');
  s = s.replace(/-\d+$/, '');
  if (s.includes('royal_keep')) return 'keep';
  if (s.includes('cozy_farm')) return 'farm';
  if (s.includes('docks_harbour') || s.includes('docks')) return 'docks';
  if (s.includes('fantasy_interiors')) return 'interior';
  if (s.includes('dungeon_depths')) return 'dungeon';
  if (s.includes('viking_fjord') || s.includes('viking')) return 'viking';
  if (s.includes('lost_jungle')) return 'jungle';
  if (s.includes('train_station')) return 'train';
  if (s.includes('modern_town')) return 'town';
  if (s.includes('modern_school')) return 'school';
  if (s.includes('modern_hospital')) return 'hospital';
  if (s.includes('modern_museum')) return 'museum';
  if (s.includes('lakeside_camp')) return 'camp';
  if (s.includes('sakura_shrine')) return 'sakura';
  if (s.includes('cozy_cafe')) return 'cafe';
  if (s.includes('modern_home')) return 'home';
  if (s.includes('fire_station')) return 'fire';
  if (s.includes('police_station')) return 'police';
  if (s.includes('research_lab')) return 'lab';
  if (s.includes('backrooms')) return 'backrooms';
  if (s.includes('zombie')) return 'zombie';
  if (s.includes('haunted')) return 'haunted';
  return s.substring(0, 12);
}

function classifyAsset(fullPath, filename, packNs) {
  const p = fullPath.toLowerCase();
  const f = filename.toLowerCase();

  // 1. Fauna: Tiere (Strips oder Tier-Dateien)
  if (
    p.includes('/fauna/') || f.includes('cow') || f.includes('sheep') || f.includes('horse') ||
    f.includes('chicken') || f.includes('duck') || f.includes('dog') || f.includes('cat') ||
    f.includes('pig') || f.includes('bunny') || f.includes('frog') || f.includes('bee') ||
    f.includes('butterfly') || f.includes('fish') || f.includes('chick') || f.includes('wolf')
  ) {
    if (f.endsWith('_strip.png') || p.includes('/animated/')) {
      return 'fauna';
    }
  }

  // 2. Charaktere (NPCs, Berufe)
  if (p.includes('/characters/') || f.includes('farmer') || f.includes('merchant') || f.includes('blacksmith') || f.includes('baker') || f.includes('fisher') || f.includes('witch') || f.includes('grandma') || f.includes('kid')) {
    if (f.endsWith('_strip.png') || (!p.includes('/frames/') && !p.includes('/gif/'))) {
      return 'characters';
    }
  }

  // 3. Animationen (Living-World wie Rauch, Windrad, Feuer, Mühle)
  if (f.endsWith('_strip.png') || p.includes('/animated/')) {
    return 'animations';
  }

  // 4. Tilesets (Master Sheets, Wände, Böden, Tiled)
  if (
    p.includes('/sheets/') || p.includes('/tilesets/') || p.includes('/tiles/') ||
    f.includes('tileset') || f.includes('floors') || f.includes('walls') ||
    f.includes('terrain') || f.includes('all_sprites') || f.includes('edges')
  ) {
    return 'tilesets';
  }

  // 5. Flora
  if (
    p.includes('/flora/') || f.includes('tree') || f.includes('crop') || f.includes('sunflower') ||
    f.includes('wheat') || f.includes('bush') || f.includes('grass') || f.includes('plant')
  ) {
    return 'flora';
  }

  // 6. Props (Möbel, Schiffe, Bauten, Zäune, Kisten)
  return 'props';
}

function tagDidactics(name, category, packNs) {
  const subjects = [];
  const topics = [];

  // GESCHICHTE
  if (['keep', 'viking', 'interior', 'docks', 'camp', 'farm', 'dungeon'].includes(packNs)) {
    subjects.push('geschichte');
    if (packNs === 'keep') topics.push('mittelalter', 'rittertum', 'burgen');
    if (packNs === 'viking') topics.push('wikinger', 'seefahrt', 'fruehmittelalter');
    if (packNs === 'interior') topics.push('mittelalter', 'neuzeit', 'alltagsgeschichte');
    if (packNs === 'docks') topics.push('antike_haefen', 'hanse', 'welthandel');
    if (packNs === 'farm') topics.push('agrarrevolution', 'bauerntum', 'frondienst');
    if (packNs === 'camp') topics.push('antike_lager', 'roemer_castra', 'feldlager');
    if (packNs === 'dungeon') topics.push('mittelalterliche_justiz', 'bergbau');
  }
  if (['train', 'museum', 'town', 'school', 'hospital', 'lab'].includes(packNs)) {
    subjects.push('geschichte');
    topics.push('industrialisierung', '19_jahrhundert', '20_jahrhundert', 'moderne');
  }

  // LITERATUR
  if (['keep', 'interior', 'farm', 'dungeon', 'haunted'].includes(packNs)) {
    subjects.push('literatur');
    if (packNs === 'keep') topics.push('mittelalter_epen', 'parzival', 'nibelungenlied');
    if (packNs === 'interior') topics.push('faust_goethe', 'aufklaerung', 'kemenate');
    if (packNs === 'haunted' || packNs === 'dungeon') topics.push('romantik', 'schwarze_romantik', 'balladen');
  }
  if (['train', 'town', 'school', 'home', 'cafe'].includes(packNs)) {
    subjects.push('literatur');
    topics.push('realismus', 'fontane', 'moderne_lektuere', 'grossstadtlyrik');
  }

  // GEOGRAFIE
  if (['jungle', 'docks', 'farm', 'viking', 'camp', 'town', 'train'].includes(packNs)) {
    subjects.push('geografie');
    if (packNs === 'jungle') topics.push('tropischer_regenwald', 'biodiversitaet', 'klimazonen');
    if (packNs === 'docks') topics.push('maritime_wirtschaft', 'globaler_seehandel', 'hafeninfrastruktur');
    if (packNs === 'farm') topics.push('agrargeografie', 'landwirtschaft', 'bodenkunde');
    if (packNs === 'viking') topics.push('glaziologie', 'fjorde', 'kuestenmorphologie');
    if (packNs === 'town' || packNs === 'train') topics.push('stadtgeografie', 'raumordnung', 'verkehrswesen');
  }

  return {
    subjects: [...new Set(subjects)],
    topics: [...new Set(topics)]
  };
}

function guessFrames(dims, category, filename) {
  const f = filename.toLowerCase();
  // Strip files: width / frames
  if (f.endsWith('_strip.png')) {
    // Wenn Höhe 32 oder 16
    if (dims.height === 32 || dims.height === 16 || dims.height === 48 || dims.height === 64) {
      return { w: dims.height, h: dims.height };
    }
  }
  if (category === 'tilesets') return { w: 16, h: 16 };
  if (dims.width % 32 === 0 && dims.width <= 128) return { w: 32, h: 32 };
  if (dims.width % 16 === 0 && dims.width <= 64) return { w: 16, h: 16 };
  return { w: 16, h: 16 };
}

function scanCuratedAssets(dir) {
  let list = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const e of entries) {
    if (e.name.startsWith('.') || e.name === 'README.md') continue;
    const full = path.join(dir, e.name);

    if (e.isDirectory()) {
      // Ignoriere die 80.000 redundanten Einzel-Frames
      if (
        e.name === 'frames' || e.name === 'gif' || e.name === 'single' ||
        e.name === 'props_no_shadow' || e.name === 'previews' || e.name === 'godot'
      ) {
        continue;
      }
      list = list.concat(scanCuratedAssets(full));
    } else if (e.isFile() && e.name.toLowerCase().endsWith('.png')) {
      // Filterkriterien für Curated Assets:
      const rel = path.relative(LIB_DIR, full);
      const isSheet = rel.includes('/sheets/');
      const isStrip = e.name.toLowerCase().endsWith('_strip.png');
      const isTileset = rel.includes('/tilesets/') || rel.includes('/tiles/') || e.name.includes('all_sprites');
      const isCharacter = rel.includes('/characters/') && !rel.includes('/gif/');
      const isScene = rel.includes('/scenes/');
      const isHighValueProp = (rel.includes('/props/') || rel.includes('/props_with_shadow/')) && !rel.includes('/single/');

      if (isSheet || isStrip || isTileset || isCharacter || isScene || isHighValueProp) {
        list.push({ full, rel, filename: e.name });
      }
    }
  }
  return list;
}

function run() {
  console.log(`=== KURATIERTER ASSET-INGEST: assets_library/ -> shared/ ===`);
  if (!fs.existsSync(LIB_DIR)) {
    console.error(`Ordner ${LIB_DIR} nicht gefunden.`);
    return;
  }

  const rawList = scanCuratedAssets(LIB_DIR);
  console.log(`Gefundene kuratierte Master-Dateien im Rohfundus: ${rawList.length}`);

  let manifest = {
    generatedAt: new Date().toISOString(),
    totalAssets: 0,
    categories: { fauna: 0, flora: 0, props: 0, tilesets: 0, characters: 0, animations: 0 },
    assets: []
  };

  if (fs.existsSync(MANIFEST_PATH)) {
    try {
      manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
    } catch (e) {
      console.warn('Altes Manifest konnte nicht gelesen werden.');
    }
  }

  let imported = 0;
  const existingIds = new Set(manifest.assets.map(a => a.id));

  // Wir begrenzen pro Kategorie auf eine saubere Obergrenze, um Git und Vercel schlank zu halten
  for (const item of rawList) {
    const parts = item.rel.split(path.sep);
    const packDir = parts[0];
    const packNs = getPackNamespace(packDir);
    const category = classifyAsset(item.full, item.filename, packNs);

    const baseClean = cleanSlug(path.basename(item.filename, '.png'));
    const cleanName = `${packNs}_${baseClean}.png`.replace(/_+/g, '_');
    const assetId = cleanName.replace('.png', '');

    if (existingIds.has(assetId)) {
      continue;
    }

    const dims = getPngDimensions(item.full);
    if (dims.width === 0 || dims.height === 0) continue;

    const targetDir = path.join(SHARED_DIR, category);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const targetPath = path.join(targetDir, cleanName);
    fs.copyFileSync(item.full, targetPath);

    const frames = guessFrames(dims, category, item.filename);
    const didactics = tagDidactics(cleanName, category, packNs);

    const entry = {
      id: assetId,
      cleanName,
      category,
      publicUrl: `/assets/shared/${category}/${cleanName}`,
      width: dims.width,
      height: dims.height,
      frameWidth: frames.w,
      frameHeight: frames.h,
      isDidactic: true,
      sourcePack: packDir,
      subjects: didactics.subjects,
      topics: didactics.topics,
      titleDe: cleanName.replace('.png', '').replace(/_/g, ' ').toUpperCase(),
      subtitleDe: `${category.toUpperCase()} aus ${packDir} (${dims.width}x${dims.height}px)`
    };

    manifest.assets.push(entry);
    existingIds.add(assetId);
    imported++;
  }

  // Zähler aktualisieren
  manifest.categories = {};
  for (const a of manifest.assets) {
    manifest.categories[a.category] = (manifest.categories[a.category] || 0) + 1;
  }
  manifest.totalAssets = manifest.assets.length;
  manifest.generatedAt = new Date().toISOString();

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), 'utf8');

  console.log(`\n🎉 ERFOLGREICH INDEXIERT:`);
  console.log(`- Neu importiert: ${imported} Master-Assets`);
  console.log(`- Gesamtbestand im Epochenhub: ${manifest.totalAssets} Assets`);
  console.log(`- Kategorien-Verteilung:`, manifest.categories);
}

run();
