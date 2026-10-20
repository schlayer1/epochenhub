/**
 * Import- & Normalisierungs-Skript für den zentralen 16-Bit Shared World-Atlas
 * Liest alle 51 Spritesheets aus SNES Retro Game/Spritesheets ein,
 * benennt sie sauber um und kategorisiert sie in fauna/, flora/ und props/.
 */

const fs = require('fs');
const path = require('path');

const SRC_DIR = '/Users/nicolekeller/Desktop/Antigravity Projekte/SNES Retro Game/Spritesheets';
const HUB_ROOT = path.resolve(__dirname, '..');
const SHARED_DIR = path.join(HUB_ROOT, 'public/assets/shared');

function getPngDimensions(filePath) {
  const buf = fs.readFileSync(filePath);
  const width = buf.readUInt32BE(16);
  const height = buf.readUInt32BE(20);
  return { width, height };
}

// 51 Spritesheets Mapping
const MAPPING = [
  // FAUNA (Tiere)
  {
    raw: 'PC _ Computer - Stardew Valley - Animals - Cat (Black).png',
    clean: 'cat_black.png',
    category: 'fauna',
    frameWidth: 32,
    frameHeight: 32,
    isDidactic: true,
    epochs: ['aegypten'],
    titleDe: 'Schwarze Katze (Bastet-Kult)',
    subtitleDe: 'Heiliges Tier und Wächterin der Kornspeicher im Alten Ägypten'
  },
  {
    raw: 'PC _ Computer - Stardew Valley - Animals - Cat (Grey).png',
    clean: 'cat_grey.png',
    category: 'fauna',
    frameWidth: 32,
    frameHeight: 32,
    isDidactic: true,
    epochs: ['rom', 'griechenland'],
    titleDe: 'Hauskatze der Antike',
    subtitleDe: 'Geschätzter Mäusejäger in römischen Villen und griechischen Städten'
  },
  {
    raw: 'PC _ Computer - Stardew Valley - Animals - Cat (New).png',
    clean: 'cat_sand.png',
    category: 'fauna',
    frameWidth: 32,
    frameHeight: 32,
    isDidactic: true,
    epochs: ['aegypten'],
    titleDe: 'Nubische Falbkatze',
    subtitleDe: 'Die wilde Stammform aller domestizierten Hauskatzen am Nil'
  },
  {
    raw: 'PC _ Computer - Stardew Valley - Animals - Cat (White).png',
    clean: 'cat_white.png',
    category: 'fauna',
    frameWidth: 32,
    frameHeight: 32,
    isDidactic: true,
    epochs: ['aegypten', 'rom'],
    titleDe: 'Weiße Tempelkatze',
    subtitleDe: 'Sonnensymbol und Begleiterin im Tempelbezirk von Bubastis'
  },
  {
    raw: 'PC _ Computer - Stardew Valley - Animals - Cat.png',
    clean: 'cat_tabby.png',
    category: 'fauna',
    frameWidth: 32,
    frameHeight: 32,
    isDidactic: true,
    epochs: ['aegypten', 'griechenland', 'rom'],
    titleDe: 'Gestreifte Dorfkatze',
    subtitleDe: 'Alltägliche Gefährtin in Wohnhäusern und Marktgassen'
  },
  {
    raw: 'PC _ Computer - Stardew Valley - Animals - Cow (Brown).png',
    clean: 'cow_brown.png',
    category: 'fauna',
    frameWidth: 32,
    frameHeight: 32,
    isDidactic: true,
    epochs: ['steinzeit', 'germanen', 'rom'],
    titleDe: 'Hausrind / Milchvieh',
    subtitleDe: 'Grundlage der bäuerlichen Wirtschaft und Fleischversorgung'
  },
  {
    raw: 'PC _ Computer - Stardew Valley - Animals - Cow (White).png',
    clean: 'cow_white.png',
    category: 'fauna',
    frameWidth: 32,
    frameHeight: 32,
    isDidactic: true,
    epochs: ['aegypten', 'griechenland'],
    titleDe: 'Heilige weiße Kuh (Hathor)',
    subtitleDe: 'Symbol für mütterliche Fürsorge und Fruchtbarkeit der Götter'
  },
  {
    raw: 'PC _ Computer - Stardew Valley - Animals - Calf (Brown).png',
    clean: 'calf_brown.png',
    category: 'fauna',
    frameWidth: 32,
    frameHeight: 32,
    isDidactic: true,
    epochs: ['steinzeit', 'germanen'],
    titleDe: 'Braunes Kalb',
    subtitleDe: 'Jungvieh im germanischen Wohnstallhaus und steinzeitlichen Dorf'
  },
  {
    raw: 'PC _ Computer - Stardew Valley - Animals - Calf (White).png',
    clean: 'calf_white.png',
    category: 'fauna',
    frameWidth: 32,
    frameHeight: 32,
    isDidactic: true,
    epochs: ['aegypten', 'rom'],
    titleDe: 'Helles Zuchtkalb',
    subtitleDe: 'Kostbarer Nachwuchs auf römischen Landgütern (Villa Rustica)'
  },
  {
    raw: 'PC _ Computer - Stardew Valley - Animals - Dog (Brown).png',
    clean: 'dog_lupo.png',
    category: 'fauna',
    frameWidth: 32,
    frameHeight: 32,
    isDidactic: true,
    epochs: ['steinzeit', 'germanen'],
    titleDe: 'Steinzeit-Hund (Lupo)',
    subtitleDe: 'Der erste treue Jagdbegleiter des Menschen aus dem zahmen Wolf'
  },
  {
    raw: 'PC _ Computer - Stardew Valley - Animals - Dog (Light Brown).png',
    clean: 'dog_tesem.png',
    category: 'fauna',
    frameWidth: 32,
    frameHeight: 32,
    isDidactic: true,
    epochs: ['aegypten'],
    titleDe: 'Tesem-Windhund',
    subtitleDe: 'Pfeilschneller Jagdhund der Pharaonen und Vorbild für Gott Anubis'
  },
  {
    raw: 'PC _ Computer - Stardew Valley - Animals - Dog (Dark Brown).png',
    clean: 'dog_molosser.png',
    category: 'fauna',
    frameWidth: 32,
    frameHeight: 32,
    isDidactic: true,
    epochs: ['griechenland', 'rom'],
    titleDe: 'Molosser-Wachhund',
    subtitleDe: 'Kraftvoller Beschützer römischer Kastelle und Schafherden'
  },
  {
    raw: 'PC _ Computer - Stardew Valley - Animals - Dog (Blonde).png',
    clean: 'dog_shepherd.png',
    category: 'fauna',
    frameWidth: 32,
    frameHeight: 32,
    isDidactic: true,
    epochs: ['griechenland', 'rom'],
    titleDe: 'Antiker Hirtenhund',
    subtitleDe: 'Unverzichtbarer Hüter der Herden gegen Raubtiere im Gebirge'
  },
  {
    raw: 'PC _ Computer - Stardew Valley - Animals - Dog (Grey).png',
    clean: 'dog_wolfhound.png',
    category: 'fauna',
    frameWidth: 32,
    frameHeight: 32,
    isDidactic: true,
    epochs: ['germanen'],
    titleDe: 'Germanischer Bärenhund',
    subtitleDe: 'Wachhund der Sippe an Wall und Langhaus'
  },
  {
    raw: 'PC _ Computer - Stardew Valley - Animals - Duck.png',
    clean: 'duck.png',
    category: 'fauna',
    frameWidth: 32,
    frameHeight: 32,
    isDidactic: true,
    epochs: ['steinzeit', 'aegypten', 'rom'],
    titleDe: 'Nil-Stockente',
    subtitleDe: 'Nahrungsquelle und Symbol der fruchtbaren Papyrus-Sümpfe'
  },
  {
    raw: 'PC _ Computer - Stardew Valley - Animals - Goat.png',
    clean: 'goat.png',
    category: 'fauna',
    frameWidth: 32,
    frameHeight: 32,
    isDidactic: true,
    epochs: ['steinzeit', 'griechenland', 'germanen'],
    titleDe: 'Hausziege',
    subtitleDe: 'Die „Kuh des kleinen Mannes“ – widerstandsfähig in kargen Bergen'
  },
  {
    raw: 'PC _ Computer - Stardew Valley - Animals - Goat (Baby).png',
    clean: 'goat_baby.png',
    category: 'fauna',
    frameWidth: 32,
    frameHeight: 32,
    isDidactic: true,
    epochs: ['steinzeit', 'griechenland'],
    titleDe: 'Zicklein',
    subtitleDe: 'Frühlingsbote und Opfergabe an Fruchtbarkeitsgottheiten'
  },
  {
    raw: 'PC _ Computer - Stardew Valley - Animals - Sheep.png',
    clean: 'sheep.png',
    category: 'fauna',
    frameWidth: 32,
    frameHeight: 32,
    isDidactic: true,
    epochs: ['steinzeit', 'griechenland', 'rom', 'germanen'],
    titleDe: 'Wollschaf',
    subtitleDe: 'Lieferant für wärmende Kleidung, Toga-Stoffe und Weichkäse'
  },
  {
    raw: 'PC _ Computer - Stardew Valley - Animals - Sheep (Sheared).png',
    clean: 'sheep_sheared.png',
    category: 'fauna',
    frameWidth: 32,
    frameHeight: 32,
    isDidactic: true,
    epochs: ['rom', 'griechenland'],
    titleDe: 'Geschorenes Schaf',
    subtitleDe: 'Nach der Schafschur – Beginn des Spinnens und Webens'
  },
  {
    raw: 'PC _ Computer - Stardew Valley - Animals - Sheep (Baby).png',
    clean: 'sheep_baby.png',
    category: 'fauna',
    frameWidth: 32,
    frameHeight: 32,
    isDidactic: true,
    epochs: ['griechenland', 'germanen'],
    titleDe: 'Lamm',
    subtitleDe: 'Häufiges Weidetier in den Gebirgen von Arkadien und Thüringen'
  },
  {
    raw: 'PC _ Computer - Stardew Valley - Animals - Horse.png',
    clean: 'horse.png',
    category: 'fauna',
    frameWidth: 32,
    frameHeight: 32,
    isDidactic: true,
    epochs: ['griechenland', 'rom', 'germanen'],
    titleDe: 'Streitross & Reitpferd',
    subtitleDe: 'Wichtigstes Transport- und Kriegstier antiker Zivilisationen'
  },
  {
    raw: 'PC _ Computer - Stardew Valley - Animals - Ostrich.png',
    clean: 'ostrich.png',
    category: 'fauna',
    frameWidth: 32,
    frameHeight: 32,
    isDidactic: true,
    epochs: ['aegypten'],
    titleDe: 'Afrikanischer Strauß',
    subtitleDe: 'Lieferant der heiligen Wahrheitsfeder der Göttin Ma\'at'
  },
  {
    raw: 'PC _ Computer - Stardew Valley - Animals - Ostrich (Baby).png',
    clean: 'ostrich_baby.png',
    category: 'fauna',
    frameWidth: 32,
    frameHeight: 32,
    isDidactic: true,
    epochs: ['aegypten'],
    titleDe: 'Straußenküken',
    subtitleDe: 'Seltenes Wüstentier am Übergang zur nubischen Steppe'
  },
  {
    raw: 'PC _ Computer - Stardew Valley - Animals - Pig.png',
    clean: 'pig.png',
    category: 'fauna',
    frameWidth: 32,
    frameHeight: 32,
    isDidactic: true,
    epochs: ['steinzeit', 'rom', 'germanen'],
    titleDe: 'Eichelschwein',
    subtitleDe: 'Im Eichenwald gemästet – wichtigste Fleischreserve für den Winter'
  },
  {
    raw: 'PC _ Computer - Stardew Valley - Animals - Piglet.png',
    clean: 'piglet.png',
    category: 'fauna',
    frameWidth: 32,
    frameHeight: 32,
    isDidactic: true,
    epochs: ['steinzeit', 'germanen'],
    titleDe: 'Ferkel',
    subtitleDe: 'Lebhafter Nachwuchs auf dem Hof der Sippe'
  },
  {
    raw: 'PC _ Computer - Stardew Valley - Animals - Rabbit.png',
    clean: 'rabbit.png',
    category: 'fauna',
    frameWidth: 32,
    frameHeight: 32,
    isDidactic: true,
    epochs: ['steinzeit', 'germanen', 'rom'],
    titleDe: 'Wildhase',
    subtitleDe: 'Schnelle Beute für Schlingenleger und geübte Speerwerfer'
  },
  {
    raw: 'PC _ Computer - Stardew Valley - Animals - Rabbit (Baby).png',
    clean: 'rabbit_baby.png',
    category: 'fauna',
    frameWidth: 32,
    frameHeight: 32,
    isDidactic: false,
    epochs: ['steinzeit'],
    titleDe: 'Junger Feldhase',
    subtitleDe: 'Wiesenbewohner an Siedlungsrändern'
  },
  {
    raw: 'PC _ Computer - Stardew Valley - Animals - Turtle (Green).png',
    clean: 'turtle_green.png',
    category: 'fauna',
    frameWidth: 32,
    frameHeight: 32,
    isDidactic: true,
    epochs: ['aegypten', 'griechenland', 'rom'],
    titleDe: 'Nil-Wasserschildkröte',
    subtitleDe: 'Geheimnisvolles Flusstier und Schutzamulett gegen Schlangen'
  },
  {
    raw: 'PC _ Computer - Stardew Valley - Animals - Chicken (Brown).png',
    clean: 'chicken_brown.png',
    category: 'fauna',
    frameWidth: 16,
    frameHeight: 16,
    isDidactic: true,
    epochs: ['griechenland', 'rom', 'germanen'],
    titleDe: 'Braunes Haushuhn',
    subtitleDe: 'Lieferant frischer Eier für die tägliche Mahlzeit'
  },
  {
    raw: 'PC _ Computer - Stardew Valley - Animals - Chicken (White).png',
    clean: 'chicken_white.png',
    category: 'fauna',
    frameWidth: 16,
    frameHeight: 16,
    isDidactic: true,
    epochs: ['rom'],
    titleDe: 'Heiliges Orakelhuhn',
    subtitleDe: 'Beobachtung des Pickverhaltens vor wichtigen römischen Senatsbeschlüssen'
  },
  {
    raw: 'PC _ Computer - Stardew Valley - Animals - Chicken (Void).png',
    clean: 'chicken_dark.png',
    category: 'fauna',
    frameWidth: 16,
    frameHeight: 16,
    isDidactic: false,
    epochs: ['germanen'],
    titleDe: 'Dunkles Moorhuhn',
    subtitleDe: 'Zuchthuhn für raue Klimazonen'
  },
  {
    raw: 'PC _ Computer - Stardew Valley - Animals - Golden Chicken.png',
    clean: 'chicken_golden.png',
    category: 'fauna',
    frameWidth: 16,
    frameHeight: 16,
    isDidactic: true,
    epochs: ['griechenland'],
    titleDe: 'Goldenes Götterhuhn',
    subtitleDe: 'Mythologisches Symbol für unendlichen Wohlstand'
  },
  {
    raw: 'PC _ Computer - Stardew Valley - Animals - Chick (Brown).png',
    clean: 'chick_brown.png',
    category: 'fauna',
    frameWidth: 16,
    frameHeight: 16,
    isDidactic: false,
    epochs: ['rom', 'germanen'],
    titleDe: 'Braunes Küken',
    subtitleDe: 'Frisch geschlüpftes Nestküken'
  },
  {
    raw: 'PC _ Computer - Stardew Valley - Animals - Chick (White).png',
    clean: 'chick_white.png',
    category: 'fauna',
    frameWidth: 16,
    frameHeight: 16,
    isDidactic: false,
    epochs: ['rom'],
    titleDe: 'Helles Küken',
    subtitleDe: 'Hofgeflügel-Nachwuchs'
  },
  {
    raw: 'PC _ Computer - Stardew Valley - Animals - Chick (Blue).png',
    clean: 'chick_blue.png',
    category: 'fauna',
    frameWidth: 16,
    frameHeight: 16,
    isDidactic: false,
    epochs: [],
    titleDe: 'Seltenes Küken',
    subtitleDe: 'Deko-Sprite'
  },
  {
    raw: 'PC _ Computer - Stardew Valley - Animals - Chick (Void).png',
    clean: 'chick_dark.png',
    category: 'fauna',
    frameWidth: 16,
    frameHeight: 16,
    isDidactic: false,
    epochs: [],
    titleDe: 'Dunkles Küken',
    subtitleDe: 'Deko-Sprite'
  },
  {
    raw: 'PC _ Computer - Stardew Valley - Animals - Parrots.png',
    clean: 'parrots.png',
    category: 'fauna',
    frameWidth: 24,
    frameHeight: 24,
    isDidactic: true,
    epochs: ['aegypten', 'rom'],
    titleDe: 'Bunte Papageien',
    subtitleDe: 'Exotische Luxustiere aus Afrika und Indien für reiche Römer'
  },
  {
    raw: 'PC _ Computer - Stardew Valley - Animals - Island Parrot.png',
    clean: 'island_parrot.png',
    category: 'fauna',
    frameWidth: 24,
    frameHeight: 24,
    isDidactic: false,
    epochs: ['aegypten'],
    titleDe: 'Wüstenpapagei',
    subtitleDe: 'Farbiger Vogel im Palmenhain'
  },
  {
    raw: 'PC _ Computer - Stardew Valley - Animals - Gem Birds.png',
    clean: 'gem_birds.png',
    category: 'fauna',
    frameWidth: 16,
    frameHeight: 16,
    isDidactic: false,
    epochs: ['steinzeit', 'griechenland'],
    titleDe: 'Singvögel',
    subtitleDe: 'Wald- und Hainbewohner'
  },
  {
    raw: 'PC _ Computer - Stardew Valley - Animals - Critters.png',
    clean: 'critters.png',
    category: 'fauna',
    frameWidth: 16,
    frameHeight: 16,
    isDidactic: true,
    epochs: ['steinzeit', 'germanen', 'aegypten'],
    titleDe: 'Kleine Wildtiere (Eichhörnchen, Frösche, Eulen)',
    subtitleDe: 'Lebendige Fauna der Wälder, Flussauen und Nachthimmel'
  },
  {
    raw: 'PC _ Computer - Stardew Valley - Animals - Fishing.png',
    clean: 'fishing_fishes.png',
    category: 'fauna',
    frameWidth: 16,
    frameHeight: 16,
    isDidactic: true,
    epochs: ['steinzeit', 'aegypten', 'griechenland', 'rom', 'germanen'],
    titleDe: 'Süßwasser-Fische & Nilbarsch',
    subtitleDe: 'Eiweißreiche Lebensgrundlage aller frühen Hochkulturen an Flüssen und Seen'
  },

  // FLORA (Nutzpflanzen, Bäume & Kulturpflanzen)
  {
    raw: 'PC _ Computer - Stardew Valley - Environment - Crops.png',
    clean: 'crops.png',
    category: 'flora',
    frameWidth: 16,
    frameHeight: 32,
    isDidactic: true,
    epochs: ['steinzeit', 'aegypten', 'griechenland', 'rom', 'germanen'],
    titleDe: 'Urgetreide: Emmer, Einkorn & Spelzweizen',
    subtitleDe: 'Der Meilenstein der Neolithischen Revolution: Vom Sammler zum Ackerbauern'
  },
  {
    raw: 'PC _ Computer - Stardew Valley - Environment - Fruit Trees.png',
    clean: 'fruit_trees.png',
    category: 'flora',
    frameWidth: 48,
    frameHeight: 80,
    isDidactic: true,
    epochs: ['aegypten', 'griechenland', 'rom'],
    titleDe: 'Fruchtbäume: Dattelpalme, Feige & Olivenbaum',
    subtitleDe: 'Öl, süße Früchte und lebenswichtiger Schattenspender des Mittelmeerraums'
  },
  {
    raw: 'PC _ Computer - Stardew Valley - Environment - Forage.png',
    clean: 'forage.png',
    category: 'flora',
    frameWidth: 16,
    frameHeight: 16,
    isDidactic: true,
    epochs: ['steinzeit', 'germanen'],
    titleDe: 'Wildfrüchte, Waldkräuter & Wurzeln',
    subtitleDe: 'Traditionelles Sammelgut vor Beginn des planvollen Ackerbaus'
  },
  {
    raw: 'PC _ Computer - Stardew Valley - Environment - Bushes.png',
    clean: 'bushes.png',
    category: 'flora',
    frameWidth: 32,
    frameHeight: 32,
    isDidactic: true,
    epochs: ['steinzeit', 'germanen'],
    titleDe: 'Beerensträucher & Haselhecken',
    subtitleDe: 'Ergänzende Vitaminnahrung und Holz für Pfeile und Flechtwerkwände'
  },
  {
    raw: 'PC _ Computer - Stardew Valley - Environment - Trees.png',
    clean: 'trees.png',
    category: 'flora',
    frameWidth: 48,
    frameHeight: 96,
    isDidactic: true,
    epochs: ['steinzeit', 'germanen'],
    titleDe: 'Eichen & Urwälder (Heilige Haine)',
    subtitleDe: 'Bauholz für Wohnstallhäuser und Kultstätten der germanischen Götter'
  },
  {
    raw: 'PC _ Computer - Stardew Valley - Environment - Grass.png',
    clean: 'grass.png',
    category: 'flora',
    frameWidth: 16,
    frameHeight: 16,
    isDidactic: false,
    epochs: [],
    titleDe: 'Steppen- & Weidegras',
    subtitleDe: 'Boden-Deko für Spielwelten'
  },
  {
    raw: 'PC _ Computer - Stardew Valley - Environment - Plants (Cave_Mines).png',
    clean: 'cave_plants.png',
    category: 'flora',
    frameWidth: 16,
    frameHeight: 16,
    isDidactic: false,
    epochs: ['steinzeit'],
    titleDe: 'Höhlenpilze & Flechten',
    subtitleDe: 'Schattenpflanzen in Felsspalten'
  },
  {
    raw: 'PC _ Computer - Stardew Valley - Environment - Mines.png',
    clean: 'mines_ores.png',
    category: 'props',
    frameWidth: 16,
    frameHeight: 16,
    isDidactic: true,
    epochs: ['steinzeit', 'germanen'],
    titleDe: 'Raseneisenerz, Kupfer & Feuerstein',
    subtitleDe: 'Mineralische Rohstoffe für die Entwicklung von Waffen und Werkzeugen'
  },

  // CHARAKTERE & PROPS
  {
    raw: 'PC _ Computer - Stardew Valley - Playable Characters - Player (Updated).png',
    clean: 'player_modern.png',
    category: 'props',
    frameWidth: 16,
    frameHeight: 32,
    isDidactic: false,
    epochs: [],
    titleDe: 'Spieler-Charakter Base',
    subtitleDe: 'Animations-Vorlage für Avatare'
  },
  {
    raw: 'PC _ Computer - Stardew Valley - Playable Characters - Player.png',
    clean: 'player_classic.png',
    category: 'props',
    frameWidth: 16,
    frameHeight: 32,
    isDidactic: false,
    epochs: [],
    titleDe: 'Klassische Spieler-Base',
    subtitleDe: 'Animations-Vorlage'
  }
];

function runImport() {
  console.log(`Starte Import von 51 Spritesheets aus:\n${SRC_DIR}`);

  const manifest = {
    generatedAt: new Date().toISOString(),
    totalAssets: MAPPING.length,
    categories: {
      fauna: 0,
      flora: 0,
      props: 0
    },
    assets: []
  };

  let importedCount = 0;

  for (const item of MAPPING) {
    const srcPath = path.join(SRC_DIR, item.raw);
    if (!fs.existsSync(srcPath)) {
      console.warn(`[WARNUNG] Datei fehlt: ${item.raw}`);
      continue;
    }

    const targetSubdir = path.join(SHARED_DIR, item.category);
    if (!fs.existsSync(targetSubdir)) {
      fs.mkdirSync(targetSubdir, { recursive: true });
    }

    const targetFile = path.join(targetSubdir, item.clean);
    fs.copyFileSync(srcPath, targetFile);

    const dims = getPngDimensions(targetFile);

    manifest.categories[item.category]++;

    manifest.assets.push({
      id: item.clean.replace('.png', ''),
      cleanName: item.clean,
      category: item.category,
      publicUrl: `/assets/shared/${item.category}/${item.clean}`,
      width: dims.width,
      height: dims.height,
      frameWidth: item.frameWidth,
      frameHeight: item.frameHeight,
      isDidactic: item.isDidactic,
      epochs: item.epochs,
      titleDe: item.titleDe,
      subtitleDe: item.subtitleDe
    });

    importedCount++;
  }

  // Schreibe zentrales JSON-Manifest
  const manifestPath = path.join(SHARED_DIR, 'shared_assets.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');

  console.log(`\nImport erfolgreich abgeschlossen!`);
  console.log(`Dateien kopiert: ${importedCount}/${MAPPING.length}`);
  console.log(`Fauna: ${manifest.categories.fauna} | Flora: ${manifest.categories.flora} | Props: ${manifest.categories.props}`);
  console.log(`Manifest geschrieben nach: ${manifestPath}`);
}

runImport();
