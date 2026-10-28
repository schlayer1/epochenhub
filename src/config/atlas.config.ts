/**
 * Konfiguration & Didaktische Steckbriefe für den 16-Bit Natur-Atlas
 * Speziell aufbereitet für Schülerinnen und Schüler der Klassen 5 & 6.
 * Fokus: Historische Bedeutung, Alltag, Kult und Tierhaltung.
 *
 * Jede Kachel ist einer spezifischen Epoche zugeordnet, sodass die historische
 * Funktion, Rolle und Bedeutung des Lebewesens bzw. der Pflanze in jener Epoche
 * didaktisch präzise dargestellt wird.
 */

export interface AtlasAnimationConfig {
  idle: number[];
  walk?: number[];
  action?: number[];
  fps: number;
}

export interface AtlasItem {
  id: string;
  name: string;
  scientificOrHistoricalName?: string;
  category: 'fauna' | 'flora';
  spriteUrl: string;
  frameWidth: number;
  frameHeight: number;
  epochs: string[]; // z.B. ['steinzeit'] oder ['germanen']
  epochLabels: string[]; // z.B. ['Ur- & Frühgeschichte'] oder ['Die Germanen']
  roleTitle: string;
  summary: string;
  didacticStory: string; // Kindgerechte historische Erklärung
  gameChapterRef?: {
    gameId: string;
    gameTitle: string;
    chapterNumber: number;
    chapterTitle: string;
  };
  animation: AtlasAnimationConfig;
  tags: string[];
}

export const ATLAS_ITEMS: AtlasItem[] = [
  // ==========================================
  // 1. UR- & FRÜHGESCHICHTE (STEINZEIT BIS EISENZEIT)
  // ==========================================
  {
    id: 'steinzeit_dog_lupo',
    name: 'Steinzeit-Hund (Lupo)',
    scientificOrHistoricalName: 'Canis lupus familiaris',
    category: 'fauna',
    spriteUrl: '/assets/shared/fauna/dog_lupo.png',
    frameWidth: 32,
    frameHeight: 32,
    epochs: ['steinzeit'],
    epochLabels: ['Ur- & Frühgeschichte'],
    roleTitle: 'Der erste Gefährte des Menschen',
    summary: 'Aus dem gezähmten Wolf wurde vor über 15.000 Jahren der erste treue Jagdbegleiter.',
    didacticStory:
      'Vor tausenden von Jahren wagten sich die mutigsten Wölfe an die Lagerfeuer der Steinzeit-Jäger, um Fleischreste zu fressen. Daraus entstand eine feste Freundschaft: Der Hund warnte die Sippe nachts vor Bären und Höhlenlöwen, spürte verletztes Wild auf und wärmte die Kinder im eisigen Winter.',
    gameChapterRef: {
      gameId: 'steinzeit-wiege-der-menschheit',
      gameTitle: 'Vom Jäger zum Schmied',
      chapterNumber: 2,
      chapterTitle: 'Der Wendepunkt (Wolf zähmen & erste Aussaat)'
    },
    animation: {
      idle: [0, 1, 2, 3],
      walk: [4, 5, 6, 7],
      action: [12, 13, 14, 15],
      fps: 6
    },
    tags: ['Steinzeit', 'Domestizierung', 'Wolf', 'Jagd', 'Sippe']
  },
  {
    id: 'steinzeit_cow_ur',
    name: 'Auerochse & Neolithisches Hausrind',
    scientificOrHistoricalName: 'Bos primigenius / Bos taurus',
    category: 'fauna',
    spriteUrl: '/assets/shared/fauna/cow_brown.png',
    frameWidth: 32,
    frameHeight: 32,
    epochs: ['steinzeit'],
    epochLabels: ['Ur- & Frühgeschichte'],
    roleTitle: 'Lebendes Kraftwerk & Tauschwert',
    summary: 'Gezähmte Wildrinder zogen die ersten Holzpflüge und lieferten Milch, Leder und Horn.',
    didacticStory:
      'Die Zähmung der gewaltigen Auerochsen war eine der größten Leistungen der Jungsteinzeit. Rinder waren so wertvoll, dass sie vor der Erfindung des Geldes als wichtigster Tauschwert galten. Ein starkes Rind zog die ersten Hakenpflüge über gerodete Waldlichtungen und erleichterte die schwere Feldarbeit enorm.',
    gameChapterRef: {
      gameId: 'steinzeit-wiege-der-menschheit',
      gameTitle: 'Vom Jäger zum Schmied',
      chapterNumber: 3,
      chapterTitle: 'Die Jungsteinzeit-Siedlung (Hausbau & Viehzucht)'
    },
    animation: {
      idle: [0, 1, 2, 3],
      walk: [4, 5, 6, 7],
      action: [16, 17, 18, 19],
      fps: 4
    },
    tags: ['Steinzeit', 'Auerochse', 'Ackerbau', 'Pflug', 'Neolithikum']
  },
  {
    id: 'steinzeit_pig_wild',
    name: 'Urzeit-Schwein / Waldschwein',
    scientificOrHistoricalName: 'Sus scrofa domesticus',
    category: 'fauna',
    spriteUrl: '/assets/shared/fauna/pig.png',
    frameWidth: 32,
    frameHeight: 32,
    epochs: ['steinzeit'],
    epochLabels: ['Ur- & Frühgeschichte'],
    roleTitle: 'Fleischreserve der ersten Dörfer',
    summary: 'Aus dem borstigen Wildschwein gezüchtet – fraß Eicheln, Pilze und Küchenreste.',
    didacticStory:
      'Die ersten sesshaften Bauern pferchten Schweine in Zäune nahe den Langhäusern ein. Schweine waren extrem anspruchslos: Sie fraßen Wurzeln, Eicheln und Reste. Ihr getrocknetes und geräuchertes Fleisch half den Sippen, lange, schneereiche Winter ohne Hungersnot zu überstehen.',
    gameChapterRef: {
      gameId: 'steinzeit-wiege-der-menschheit',
      gameTitle: 'Vom Jäger zum Schmied',
      chapterNumber: 3,
      chapterTitle: 'Die Jungsteinzeit-Siedlung (Hausbau & Viehzucht)'
    },
    animation: {
      idle: [0, 1, 2, 3],
      walk: [4, 5, 6, 7],
      action: [16, 17, 18, 19],
      fps: 5
    },
    tags: ['Steinzeit', 'Wildschwein', 'Haustier', 'Vorrat', 'Dorf']
  },
  {
    id: 'steinzeit_fishes',
    name: 'Harpunenfisch (Hecht & Forelle)',
    scientificOrHistoricalName: 'Esox lucius / Salmo trutta',
    category: 'fauna',
    spriteUrl: '/assets/shared/fauna/fishing_fishes.png',
    frameWidth: 16,
    frameHeight: 16,
    epochs: ['steinzeit'],
    epochLabels: ['Ur- & Frühgeschichte'],
    roleTitle: 'Eiweißquelle aus Fluss & See',
    summary: 'Fischfang mit gezackten Knochenharpunen, Weidenreusen und Steingewichten.',
    didacticStory:
      'An Seen und Flüssen bauten die Steinzeitmenschen Pfahlbauten und höhlten Einbäume aus Holzstämmen aus. Mit kunstvoll gezackten Harpunen aus Rentiergeweih und Knochen stachen Fischer im seichten Uferwasser nach Hechten. Auch Gletschermann Ötzi trug gedrillte Sehnenschnüre für den Fischfang bei sich.',
    gameChapterRef: {
      gameId: 'steinzeit-wiege-der-menschheit',
      gameTitle: 'Vom Jäger zum Schmied',
      chapterNumber: 1,
      chapterTitle: 'Jäger und Sammler (Überleben als Nomaden)'
    },
    animation: {
      idle: [0, 1, 2, 3],
      action: [4, 5, 6, 7],
      fps: 6
    },
    tags: ['Steinzeit', 'Harpune', 'Fischfang', 'Ötzi', 'Einbaum']
  },
  {
    id: 'steinzeit_crops',
    name: 'Urgetreide: Emmer & Einkorn',
    scientificOrHistoricalName: 'Triticum dicoccum / monococcum',
    category: 'flora',
    spriteUrl: '/assets/shared/flora/crops.png',
    frameWidth: 16,
    frameHeight: 32,
    epochs: ['steinzeit'],
    epochLabels: ['Ur- & Frühgeschichte'],
    roleTitle: 'Die Neolithische Revolution',
    summary: 'Der erste Ackerbau der Menschheit – aus Jägern und Sammlern wurden sesshafte Erbauer.',
    didacticStory:
      'Als Menschen vor rund 10.000 Jahren entdeckten, dass man Wildgräser wie Emmer und Einkorn aussäen und ernten kann, veränderte sich die Menschheitsgeschichte! Sie blieben an einem Ort, bauten feste Langhäuser, rieben Körner auf Mahlsteinen zu Mehl und buken auf heißen Steinen die ersten Fladenbrote.',
    gameChapterRef: {
      gameId: 'steinzeit-wiege-der-menschheit',
      gameTitle: 'Vom Jäger zum Schmied',
      chapterNumber: 2,
      chapterTitle: 'Der Wendepunkt (Wolf zähmen & erste Aussaat)'
    },
    animation: {
      idle: [0, 1, 2, 3],
      fps: 2
    },
    tags: ['Steinzeit', 'Emmer', 'Einkorn', 'Neolithikum', 'Ackerbau', 'Fladenbrot']
  },
  {
    id: 'steinzeit_forage',
    name: 'Wildkräuter, Beeren & Wurzeln',
    scientificOrHistoricalName: 'Flora silvestris',
    category: 'flora',
    spriteUrl: '/assets/shared/flora/forage.png',
    frameWidth: 16,
    frameHeight: 16,
    epochs: ['steinzeit'],
    epochLabels: ['Ur- & Frühgeschichte'],
    roleTitle: 'Sammelwissen der Altsteinzeit',
    summary: 'Sammlerinnen kannten jede essbare Pflanze, Beere und schmerzlindernde Rinde.',
    didacticStory:
      'Die Sammlerinnen der Sippe besaßen ein enormes Wissen über die Natur: Sie wussten genau, welche Pilze nahrhaft und welche giftig waren. Weidenrinde beispielsweise enthält natürliches Salicin (den Wirkstoff modernen Aspirins!), womit Steinzeitmenschen Fieber und Zahnschmerzen behandelten.',
    gameChapterRef: {
      gameId: 'steinzeit-wiege-der-menschheit',
      gameTitle: 'Vom Jäger zum Schmied',
      chapterNumber: 1,
      chapterTitle: 'Jäger und Sammler (Überleben als Nomaden)'
    },
    animation: {
      idle: [0, 1, 2, 3],
      fps: 2
    },
    tags: ['Steinzeit', 'Heilkräuter', 'Sammler', 'Medizin', 'Waldbeeren']
  },

  // ==========================================
  // 2. ALTES ÄGYPTEN (HOCHKULTUR AM NIL)
  // ==========================================
  {
    id: 'aegypten_cat_bastet',
    name: 'Heilige Katze (Bastet-Kult)',
    scientificOrHistoricalName: 'Felis lybica domestica',
    category: 'fauna',
    spriteUrl: '/assets/shared/fauna/cat_black.png',
    frameWidth: 32,
    frameHeight: 32,
    epochs: ['aegypten'],
    epochLabels: ['Altes Ägypten'],
    roleTitle: 'Göttliche Hüterin der Kornspeicher',
    summary: 'Schützte die riesigen Getreidesilos des Pharaos vor Ratten und Giftschlangen.',
    didacticStory:
      'Im Alten Ägypten wurden Katzen als lebende Schutzgötter verehrt! Sie verkörperten die freundliche Katzengöttin Bastet, die über Heim, Familie und Fruchtbarkeit wachte. Wer einer Katze Leid antat, wurde schwer bestraft. Starb eine Hauskatze, rasierte sich die Familie aus Trauer die Augenbrauen ab.',
    gameChapterRef: {
      gameId: 'kemet-altes-aegypten',
      gameTitle: 'Kemet – Das Geschenk des Nils',
      chapterNumber: 3,
      chapterTitle: 'Der Pharao, sein Wesir & der Kornspeicher'
    },
    animation: {
      idle: [0, 1, 2, 3],
      walk: [4, 5, 6, 7],
      action: [16, 17, 18, 19],
      fps: 5
    },
    tags: ['Ägypten', 'Bastet', 'Kulttier', 'Kornspeicher', 'Heilig']
  },
  {
    id: 'aegypten_dog_tesem',
    name: 'Tesem-Windhund (Anubis-Gefährte)',
    scientificOrHistoricalName: 'Altägyptischer Windhund',
    category: 'fauna',
    spriteUrl: '/assets/shared/fauna/dog_tesem.png',
    frameWidth: 32,
    frameHeight: 32,
    epochs: ['aegypten'],
    epochLabels: ['Altes Ägypten'],
    roleTitle: 'Jagdhund der Pharaonen & Schakalgott',
    summary: 'Pfeilschneller Wüstenjäger mit Stehohren – Vorbild für Totengott Anubis.',
    didacticStory:
      'Der Tesem ist eine der ältesten Rassen der Geschichte. Mit schlanken Beinen jagte er für Pharaonen Gazellen am Wüstenrand. Seine markante Silhouette mit den aufrechten Ohren und dem Ringelschwanz stand Pate für Gott Anubis, der die Seelen der Toten sicher zur Urteils-Waage geleitete.',
    gameChapterRef: {
      gameId: 'kemet-altes-aegypten',
      gameTitle: 'Kemet – Das Geschenk des Nils',
      chapterNumber: 1,
      chapterTitle: 'Die Wüste weicht – Ankunft am Nil'
    },
    animation: {
      idle: [0, 1, 2, 3],
      walk: [4, 5, 6, 7],
      action: [12, 13, 14, 15],
      fps: 6
    },
    tags: ['Ägypten', 'Anubis', 'Windhund', 'Wüstenjagd', 'Pharao']
  },
  {
    id: 'aegypten_duck_nil',
    name: 'Nil-Stockente',
    scientificOrHistoricalName: 'Anas platyrhynchos',
    category: 'fauna',
    spriteUrl: '/assets/shared/fauna/duck.png',
    frameWidth: 32,
    frameHeight: 32,
    epochs: ['aegypten'],
    epochLabels: ['Altes Ägypten'],
    roleTitle: 'Vogel der Papyrussümpfe',
    summary: 'Festbraten und Opfergabe nach der alljährlichen Nilschwemme (Achet).',
    didacticStory:
      'Im dichten Schilf des Nildeltas nisteten Millionen Wasservögel. Ägyptische Jäger glitten auf lautlosen Papyrusbooten heran und schleuderten hölzerne Wurfhölzer nach Enten. Geräucherte Ente galt als Delikatesse bei Hofe und als gern gesehene Opfergabe für Nilgott Hapi.',
    gameChapterRef: {
      gameId: 'kemet-altes-aegypten',
      gameTitle: 'Kemet – Das Geschenk des Nils',
      chapterNumber: 2,
      chapterTitle: 'Die Nilschwemme & das Wunder des Schadufs'
    },
    animation: {
      idle: [0, 1, 2, 3],
      walk: [4, 5, 6, 7],
      action: [8, 9, 10, 11],
      fps: 5
    },
    tags: ['Ägypten', 'Nil', 'Papyrus', 'Wurfholz', 'Hapi']
  },
  {
    id: 'aegypten_ostrich',
    name: 'Afrikanischer Strauß',
    scientificOrHistoricalName: 'Struthio camelus',
    category: 'fauna',
    spriteUrl: '/assets/shared/fauna/ostrich.png',
    frameWidth: 32,
    frameHeight: 32,
    epochs: ['aegypten'],
    epochLabels: ['Altes Ägypten'],
    roleTitle: 'Die Feder der Wahrheit (Ma\'at)',
    summary: 'Lieferte die Feder, die im Totengericht des Osiris das Herz wog.',
    didacticStory:
      'Der Strauß war der größte Vogel der ägyptischen Savanne. Seine strahlend weiße Feder war das Symbol der Weltenordnung Ma\'at! Im Totengericht wurde das Herz eines Verstorbenen gegen eine einzige Straußenfeder gewogen: Nur wer ein gerechtes, leichtes Herz besaß, durfte ins ewige Paradies eintreten.',
    gameChapterRef: {
      gameId: 'kemet-altes-aegypten',
      gameTitle: 'Kemet – Das Geschenk des Nils',
      chapterNumber: 4,
      chapterTitle: 'Das Haus der Schreiber & das Pantheon der Götter'
    },
    animation: {
      idle: [0, 1, 2, 3],
      walk: [4, 5, 6, 7],
      action: [8, 9, 10, 11],
      fps: 5
    },
    tags: ['Ägypten', 'Ma\'at', 'Totengericht', 'Osiris', 'Feder']
  },
  {
    id: 'aegypten_turtle',
    name: 'Nil-Weichschildkröte',
    scientificOrHistoricalName: 'Trionyx triunguis',
    category: 'fauna',
    spriteUrl: '/assets/shared/fauna/turtle_green.png',
    frameWidth: 32,
    frameHeight: 32,
    epochs: ['aegypten'],
    epochLabels: ['Altes Ägypten'],
    roleTitle: 'Schutzamulett gegen Flussdämonen',
    summary: 'Sonnte sich auf Nil-Sandbänken und schützte Kinder vor Krokodilen.',
    didacticStory:
      'Da sie lautlos im Schlamm abtauchen und plötzlich wieder auftauchen konnte, galt die Schildkröte als magisch. Mütter hängten ihren Kindern kleine Schildkröten-Amulette aus grün glasiertem Ton um, um sie vor Krokodilen und den gefährlichen Dämonen des Nils zu schützen.',
    gameChapterRef: {
      gameId: 'kemet-altes-aegypten',
      gameTitle: 'Kemet – Das Geschenk des Nils',
      chapterNumber: 1,
      chapterTitle: 'Die Wüste weicht – Ankunft am Nil'
    },
    animation: {
      idle: [0, 1, 2, 3],
      walk: [4, 5, 6, 7],
      fps: 3
    },
    tags: ['Ägypten', 'Nil', 'Amulett', 'Schutz', 'Krokodil']
  },
  {
    id: 'aegypten_fruit_trees',
    name: 'Dattelpalme & Feigenbaum',
    scientificOrHistoricalName: 'Phoenix dactylifera / Ficus sycomorus',
    category: 'flora',
    spriteUrl: '/assets/shared/flora/fruit_trees.png',
    frameWidth: 48,
    frameHeight: 80,
    epochs: ['aegypten'],
    epochLabels: ['Altes Ägypten'],
    roleTitle: 'Süße Oasenfrucht & Schattenspender',
    summary: 'Datteln waren die Schokolade der Pharaonen – Nahrung für Karawanen und Pyramidenbauer.',
    didacticStory:
      'In der glühenden Wüstensonne spendeten Palmen lebensrettenden Schatten. Getrocknete Datteln und Feigen lieferten konzentrierte Energie für Karawanen und die Arbeiter an den Pyramiden. Aus den langen Palmwedeln flochten Ägypter Körbe, Sandalen und Liegematten.',
    gameChapterRef: {
      gameId: 'kemet-altes-aegypten',
      gameTitle: 'Kemet – Das Geschenk des Nils',
      chapterNumber: 1,
      chapterTitle: 'Die Wüste weicht – Ankunft am Nil'
    },
    animation: {
      idle: [0, 1, 2, 3],
      fps: 3
    },
    tags: ['Ägypten', 'Dattelpalme', 'Feige', 'Oase', 'Pyramidenbau']
  },
  {
    id: 'aegypten_crops',
    name: 'Nil-Weizen & Schaduf-Bewässerung',
    scientificOrHistoricalName: 'Triticum durum',
    category: 'flora',
    spriteUrl: '/assets/shared/flora/crops.png',
    frameWidth: 16,
    frameHeight: 32,
    epochs: ['aegypten'],
    epochLabels: ['Altes Ägypten'],
    roleTitle: 'Die Kornkammer am Nil',
    summary: 'Fruchtbarer schwarzer Nilschlamm und Bewässerungskanäle sicherten bis zu drei Ernten im Jahr.',
    didacticStory:
      'Herodot nannte Ägypten ein „Geschenk des Nils“. Nach dem Rückgang des Hochwassers säten Bauern Getreide in den feuchten Schlamm. Mit Hebelbrunnen (Schaduf) schöpften sie Wasser in höher liegende Kanäle. Die vollen Getreidesilos machten Ägypten zur reichsten Großmacht der Antike.',
    gameChapterRef: {
      gameId: 'kemet-altes-aegypten',
      gameTitle: 'Kemet – Das Geschenk des Nils',
      chapterNumber: 2,
      chapterTitle: 'Die Nilschwemme & das Wunder des Schadufs'
    },
    animation: {
      idle: [0, 1, 2, 3],
      fps: 2
    },
    tags: ['Ägypten', 'Nilweizen', 'Schaduf', 'Kornkammer', 'Nilschwemme']
  },

  // ==========================================
  // 3. ANTIKES GRIECHENLAND (WIEGE EUROPAS)
  // ==========================================
  {
    id: 'griechenland_dog_argos',
    name: 'Hellas-Jagdhund (Argos)',
    scientificOrHistoricalName: 'Canis molossus graecus',
    category: 'fauna',
    spriteUrl: '/assets/shared/fauna/dog_molosser.png',
    frameWidth: 32,
    frameHeight: 32,
    epochs: ['griechenland'],
    epochLabels: ['Antikes Griechenland'],
    roleTitle: 'Symbol ewiger Treue & Herdenschutz',
    summary: 'Homers Odyssee setzte dem treuen Jagdhund Argos ein unsterbliches Denkmal.',
    didacticStory:
      'Im berühmten Epos von Homer erkannte der alte Jagdhund Argos seinen Herrn Odysseus nach 20 Jahren Irrfahrt als Einziger sofort an Stimme und Geruch wieder. In den felsigen Bergen Griechenlands bewachten kräftige Molosserhunde die Schaf- und Ziegenherden vor Raubtieren.',
    gameChapterRef: {
      gameId: 'hellas-antikes-griechenland',
      gameTitle: 'Hellas – Von der Polis zum Weltreich',
      chapterNumber: 1,
      chapterTitle: 'Die Geburt der Polis – Berge, Buchten & Olivenhaine'
    },
    animation: {
      idle: [0, 1, 2, 3],
      walk: [4, 5, 6, 7],
      action: [12, 13, 14, 15],
      fps: 5
    },
    tags: ['Griechenland', 'Argos', 'Odysseus', 'Treue', 'Homer', 'Polis']
  },
  {
    id: 'griechenland_horse_bukephalos',
    name: 'Griechisches Streitross (Bukephalos)',
    scientificOrHistoricalName: 'Equus caballus',
    category: 'fauna',
    spriteUrl: '/assets/shared/fauna/horse.png',
    frameWidth: 32,
    frameHeight: 32,
    epochs: ['griechenland'],
    epochLabels: ['Antikes Griechenland'],
    roleTitle: 'Aristokratischer Stolz & Alexanderzug',
    summary: 'Pferde waren der Luxus der Polis-Adligen und zogen Wagen bei den Olympischen Spielen.',
    didacticStory:
      'Pferdezucht war im kargen Griechenland selten – nur die reichsten Bürger (Hippeis) konnten sich Pferde leisten. Das berühmteste Pferd war Bukephalos: Der 12-jährige Alexander der Große zähmte den wilden Hengst, indem er ihn gegen die Sonne drehte, damit er sich nicht vor seinem Schatten scheute!',
    gameChapterRef: {
      gameId: 'hellas-antikes-griechenland',
      gameTitle: 'Hellas – Von der Polis zum Weltreich',
      chapterNumber: 9,
      chapterTitle: 'Der Alexanderzug – Bis an die Grenzen der bekannten Welt'
    },
    animation: {
      idle: [0, 1, 2, 3],
      walk: [4, 5, 6, 7],
      action: [16, 17, 18, 19],
      fps: 6
    },
    tags: ['Griechenland', 'Bukephalos', 'Alexander', 'Olympia', 'Wagenrennen']
  },
  {
    id: 'griechenland_goat',
    name: 'Griechische Bergziege',
    scientificOrHistoricalName: 'Capra aegagrus hircus',
    category: 'fauna',
    spriteUrl: '/assets/shared/fauna/goat.png',
    frameWidth: 32,
    frameHeight: 32,
    epochs: ['griechenland'],
    epochLabels: ['Antikes Griechenland'],
    roleTitle: 'Kletterkünstlerin der steilen Klippen',
    summary: 'Lieferte Milch, Feta-Käse und Leder auf den steilen Inseln und Berghängen der Ägäis.',
    didacticStory:
      'Griechenland besteht zu 80 Prozent aus Gebirge. Wo kein Rind grasen konnte, kletterten Ziegen flink über senkrechte Klippen und fraßen Dornbüsche. Hirten lebten in einfachen Steinhütten und versorgten die Stadtstaaten mit nahrhaftem Ziegenkäse und Häuten für Wasserschläuche.',
    gameChapterRef: {
      gameId: 'hellas-antikes-griechenland',
      gameTitle: 'Hellas – Von der Polis zum Weltreich',
      chapterNumber: 1,
      chapterTitle: 'Die Geburt der Polis – Berge, Buchten & Olivenhaine'
    },
    animation: {
      idle: [0, 1, 2, 3],
      walk: [4, 5, 6, 7],
      action: [16, 17, 18, 19],
      fps: 5
    },
    tags: ['Griechenland', 'Bergziege', 'Ägäis', 'Käse', 'Hirten']
  },
  {
    id: 'griechenland_sheep_fleece',
    name: 'Ägäisches Wollschaf',
    scientificOrHistoricalName: 'Ovis aries',
    category: 'fauna',
    spriteUrl: '/assets/shared/fauna/sheep.png',
    frameWidth: 32,
    frameHeight: 32,
    epochs: ['griechenland'],
    epochLabels: ['Antikes Griechenland'],
    roleTitle: 'Das Goldene Vlies & Wollhandwerk',
    summary: 'Schafherden bildeten das Rückgrat der griechischen Textilwirtschaft.',
    didacticStory:
      'In der Mythologie segelten die Argonauten aus, um das sagenhafte „Goldene Vlies“ (ein goldenes Widderfell) zu erobern. Im Alltag weideten Millionen Schafe auf den Hochebenen. Frauen spannen die Wolle auf Handspindeln und webten daraus die feinen Chiton-Gewänder der Griechen.',
    gameChapterRef: {
      gameId: 'hellas-antikes-griechenland',
      gameTitle: 'Hellas – Von der Polis zum Weltreich',
      chapterNumber: 3,
      chapterTitle: 'Die Wiege der Demokratie – Volksversammlung auf der Pnyx'
    },
    animation: {
      idle: [0, 1, 2, 3],
      walk: [4, 5, 6, 7],
      action: [16, 17, 18, 19],
      fps: 4
    },
    tags: ['Griechenland', 'Vlies', 'Wolle', 'Chiton', 'Webstuhl']
  },
  {
    id: 'griechenland_olive_tree',
    name: 'Heiliger Olivenbaum der Athene',
    scientificOrHistoricalName: 'Olea europaea',
    category: 'flora',
    spriteUrl: '/assets/shared/flora/fruit_trees.png',
    frameWidth: 48,
    frameHeight: 80,
    epochs: ['griechenland'],
    epochLabels: ['Antikes Griechenland'],
    roleTitle: 'Flüssiges Gold & Friedenssymbol',
    summary: 'Geschenk der Göttin Athene an Athen – Sieger der Olympischen Spiele erhielten Olivenzweige.',
    didacticStory:
      'Der Mythos berichtet, dass Athene und Meeresgott Poseidon um die Schirmherrschaft Athens stritten. Poseidon stieß den Dreizack in den Fels und schuf eine Salzwasserquelle, Athene pflanzte den ersten Olivenbaum. Das Volk wählte Athene! Olivenöl erleuchtete Öllampen, diente Athleten zur Einreibung und war Athens wertvollstes Gut.',
    gameChapterRef: {
      gameId: 'hellas-antikes-griechenland',
      gameTitle: 'Hellas – Von der Polis zum Weltreich',
      chapterNumber: 1,
      chapterTitle: 'Die Geburt der Polis – Berge, Buchten & Olivenhaine'
    },
    animation: {
      idle: [0, 1, 2, 3],
      fps: 3
    },
    tags: ['Griechenland', 'Olivenbaum', 'Athene', 'Olympia', 'Olivenöl']
  },

  // ==========================================
  // 4. RÖMISCHES REICH (IMPERIUM ROMANUM)
  // ==========================================
  {
    id: 'rom_dog_cave_canem',
    name: 'Kastell- & Wachhund („Cave Canem“)',
    scientificOrHistoricalName: 'Canis molossus romanus',
    category: 'fauna',
    spriteUrl: '/assets/shared/fauna/dog_molosser.png',
    frameWidth: 32,
    frameHeight: 32,
    epochs: ['rom'],
    epochLabels: ['Römisches Reich'],
    roleTitle: 'Wächter der Kastelle & Mosaik-Star',
    summary: 'Berühmt durch das Pompeji-Mosaik mit der Inschrift „Cave Canem“ (Hüte dich vor dem Hund!).',
    didacticStory:
      'Im Eingangsbereich vornehmer Villen in Pompeji warnten kunstvolle Fußbodenmosaike: Ein zähnefletschender Kettenhund mit der Aufschrift „Cave Canem“. Diese kräftigen Molosser bewachten römische Landgüter (Villae Rusticae), begleiteten Legionäre am Limes und wurden gegen Wildschweine eingesetzt.',
    gameChapterRef: {
      gameId: 'roma-aeterna-roemisches-reich',
      gameTitle: 'Imperium Romanum: Roma Aeterna',
      chapterNumber: 8,
      chapterTitle: 'Pax Romana (Augustus & Architektur der Kaiserzeit)'
    },
    animation: {
      idle: [0, 1, 2, 3],
      walk: [4, 5, 6, 7],
      action: [12, 13, 14, 15],
      fps: 5
    },
    tags: ['Rom', 'Cave Canem', 'Pompeji', 'Limes', 'Molosser', 'Villa']
  },
  {
    id: 'rom_chicken_oracle',
    name: 'Heiliges Orakelhuhn (Pulli)',
    scientificOrHistoricalName: 'Gallus gallus domesticus',
    category: 'fauna',
    spriteUrl: '/assets/shared/fauna/chicken_white.png',
    frameWidth: 16,
    frameHeight: 16,
    epochs: ['rom'],
    epochLabels: ['Römisches Reich'],
    roleTitle: 'Göttliche Entscheidungshilfe für Legionen',
    summary: 'Römische Konsuln zogen nicht in die Schlacht, ohne das Fressverhalten der Hühner zu prüfen.',
    didacticStory:
      'Vor jeder Militäroperation warf ein Priester (Pullarius) den heiligen Hühnern Körner hin. Pickten sie so gierig, dass Körner aus dem Schnabel zu Boden fielen, galt das als göttliche Siegesgarantie („Tripudium solistimum“). Verweigerten sie das Futter, wurde der Angriff sofort abgebrochen!',
    gameChapterRef: {
      gameId: 'roma-aeterna-roemisches-reich',
      gameTitle: 'Imperium Romanum: Roma Aeterna',
      chapterNumber: 4,
      chapterTitle: 'Der Schatten von Karthago (Cannae & Hannibal)'
    },
    animation: {
      idle: [0, 1, 2, 3],
      walk: [4, 5, 6, 7],
      action: [12, 13, 14, 15],
      fps: 5
    },
    tags: ['Rom', 'Orakel', 'Legion', 'Götterzeichen', 'Feldzug']
  },
  {
    id: 'rom_horse_circus',
    name: 'Streitross & Circus-Rennpferd',
    scientificOrHistoricalName: 'Equus caballus',
    category: 'fauna',
    spriteUrl: '/assets/shared/fauna/horse.png',
    frameWidth: 32,
    frameHeight: 32,
    epochs: ['rom'],
    epochLabels: ['Römisches Reich'],
    roleTitle: 'Star im Circus Maximus & Kavallerie',
    summary: 'Viergespanne (Quadrigae) rasten vor 250.000 Zuschauern durch die Arena Roms.',
    didacticStory:
      'Wagenrennen waren der aufregendste Sport im Römischen Reich. Die besten Rennpferde waren Superstars und gewannen ihren Wagenlenkern (den Teams Rot, Weiß, Grün und Blau) unermessliche Reichtümer. Auf den gepflasterten Heerstraßen trugen Kurierpferde Eildepepchen in Rekordzeit durch das Riesenreich.',
    gameChapterRef: {
      gameId: 'roma-aeterna-roemisches-reich',
      gameTitle: 'Imperium Romanum: Roma Aeterna',
      chapterNumber: 8,
      chapterTitle: 'Pax Romana (Augustus & Architektur der Kaiserzeit)'
    },
    animation: {
      idle: [0, 1, 2, 3],
      walk: [4, 5, 6, 7],
      action: [16, 17, 18, 19],
      fps: 6
    },
    tags: ['Rom', 'Circus Maximus', 'Wagenrennen', 'Quadriga', 'Pferde']
  },
  {
    id: 'rom_cow_plow',
    name: 'Römisches Zugrind & Opferstier',
    scientificOrHistoricalName: 'Bos taurus',
    category: 'fauna',
    spriteUrl: '/assets/shared/fauna/cow_brown.png',
    frameWidth: 32,
    frameHeight: 32,
    epochs: ['rom'],
    epochLabels: ['Römisches Reich'],
    roleTitle: 'Baumeister der Straßen & Grenzfurche',
    summary: 'Zog tonnenschwere Marmorblöcke für Kolosseum und Aquädukte und weihte Städte ein.',
    didacticStory:
      'Bei der Gründung jeder römischen Kolonie spannte ein Priester einen Stier und eine Kuh vor den Pflug, um die heilige Grenzlinie (Sulcus primigenius) zu ziehen. Ochsen waren die unersetzlichen Lasttiere beim Transport riesiger Steine für Aquädukte, Thermen und Triumphbögen.',
    gameChapterRef: {
      gameId: 'roma-aeterna-roemisches-reich',
      gameTitle: 'Imperium Romanum: Roma Aeterna',
      chapterNumber: 1,
      chapterTitle: 'Der Mythos vom Tiber (Romulus, Remus & Sieben Hügel)'
    },
    animation: {
      idle: [0, 1, 2, 3],
      walk: [4, 5, 6, 7],
      action: [16, 17, 18, 19],
      fps: 4
    },
    tags: ['Rom', 'Ochse', 'Aquädukt', 'Bauwerk', 'Stadtgründung']
  },
  {
    id: 'rom_sheep_toga',
    name: 'Römisches Toga-Wollschaf',
    scientificOrHistoricalName: 'Ovis aries',
    category: 'fauna',
    spriteUrl: '/assets/shared/fauna/sheep.png',
    frameWidth: 32,
    frameHeight: 32,
    epochs: ['rom'],
    epochLabels: ['Römisches Reich'],
    roleTitle: 'Stoff für Senatoren & Legionäre',
    summary: 'Ohne Schafwolle keine Toga: Senatoren trugen bis zu 6 Meter lange weiße Wolltücher.',
    didacticStory:
      'Die weiße Wolltoga war das Erkennungszeichen des freien römischen Bürgers. Riesige Schafherden wurden auf speziellen Viehtrieb-Straßen (Calles) vom Sommer- ins Winterquartier getrieben. Aus dichter Schafwolle wurden auch die wetterfesten Soldatenmäntel (Sagum) gefertigt, die Legionäre am kalten Limes wärmten.',
    gameChapterRef: {
      gameId: 'roma-aeterna-roemisches-reich',
      gameTitle: 'Imperium Romanum: Roma Aeterna',
      chapterNumber: 3,
      chapterTitle: 'Der Mut der Wenigen (Kleinbauern & Ständekämpfe)'
    },
    animation: {
      idle: [0, 1, 2, 3],
      walk: [4, 5, 6, 7],
      action: [16, 17, 18, 19],
      fps: 4
    },
    tags: ['Rom', 'Toga', 'Senator', 'Wolle', 'Legionär']
  },
  {
    id: 'rom_fish_garum',
    name: 'Thunfisch & Sardelle (Garum-Kult)',
    scientificOrHistoricalName: 'Pisces (Scomber / Engraulis)',
    category: 'fauna',
    spriteUrl: '/assets/shared/fauna/fishing_fishes.png',
    frameWidth: 16,
    frameHeight: 16,
    epochs: ['rom'],
    epochLabels: ['Römisches Reich'],
    roleTitle: 'Die goldene Würzsauce der Antike',
    summary: 'Aus fermentiertem Fisch stellten die Römer „Garum“ her – das Ketchup der Antike.',
    didacticStory:
      'Römer liebten Garum! In großen Becken an den Küsten Spaniens und Italiens wurden Fische mit Salz monatelang in der Sonne fermentiert. Die flüssige Würzsoße schmeckte würzig-salzig und wurde in Millionen Amphoren bis in die entlegensten Kastelle an Rhein und Donau geliefert.',
    gameChapterRef: {
      gameId: 'roma-aeterna-roemisches-reich',
      gameTitle: 'Imperium Romanum: Roma Aeterna',
      chapterNumber: 6,
      chapterTitle: 'Brot und Spiele – Das Kolosseum & der Alltag im Forum'
    },
    animation: {
      idle: [0, 1, 2, 3],
      action: [4, 5, 6, 7],
      fps: 6
    },
    tags: ['Rom', 'Garum', 'Fischsauce', 'Amphore', 'Handel']
  },
  {
    id: 'rom_grain_annona',
    name: 'Reichsweizen (Cura Annonae)',
    scientificOrHistoricalName: 'Triticum aestivum',
    category: 'flora',
    spriteUrl: '/assets/shared/flora/crops.png',
    frameWidth: 16,
    frameHeight: 32,
    epochs: ['rom'],
    epochLabels: ['Römisches Reich'],
    roleTitle: 'Brot & Spiele für die Millionenstadt',
    summary: 'Riesige Getreideflotten aus Ägypten versorgten das Volk von Rom mit kostenlosem Getreide.',
    didacticStory:
      'Im kaiserzeitlichen Rom lebten über eine Million Menschen. Um Hungersnöte und Unruhen abzuwenden, organisierte der Staat die kostenlose Verteilung von Getreide („Cura Annonae“). Hunderte Getreidefrachter segelten jeden Sommer von Alexandria nach Ostia, um den Hunger der Metropole zu stillen.',
    gameChapterRef: {
      gameId: 'roma-aeterna-roemisches-reich',
      gameTitle: 'Imperium Romanum: Roma Aeterna',
      chapterNumber: 6,
      chapterTitle: 'Brot und Spiele – Das Kolosseum & der Alltag im Forum'
    },
    animation: {
      idle: [0, 1, 2, 3],
      fps: 2
    },
    tags: ['Rom', 'Annona', 'Brot und Spiele', 'Kornflotte', 'Getreide']
  },

  // ==========================================
  // 5. DIE GERMANEN (VOM LANGHAUS ZUM LIMES)
  // ==========================================
  {
    id: 'germanen_dog_bran',
    name: 'Germanischer Sippenhund (Bran)',
    scientificOrHistoricalName: 'Canis lupus familiaris',
    category: 'fauna',
    spriteUrl: '/assets/shared/fauna/dog_wolfhound.png',
    frameWidth: 32,
    frameHeight: 32,
    epochs: ['germanen'],
    epochLabels: ['Die Germanen'],
    roleTitle: 'Wächter des Wohnstallhauses & Jagdgefährte',
    summary: 'Schützte Hof und Familie vor Bären und Wölfen im undurchdringlichen Urwald.',
    didacticStory:
      'Germanische Sippen lebten in Einzelhöfen mitten im dichten Wald. Ein starker Wolfshund war lebenswichtig: Er schlug an, wenn sich Wölfe, Bären oder feindliche Späher näherten. Hunde galten als so wertvoll, dass im germanischen Recht (Thing) derjenige, der den Hund eines anderen tötete, schweres Bußgeld (Wergeld) zahlen musste!',
    gameChapterRef: {
      gameId: 'germanen-vom-langhaus-zum-limes',
      gameTitle: 'Die Germanen: Vom Langhaus zum Limes',
      chapterNumber: 1,
      chapterTitle: 'Im Schatten des Langhauses (Alltag, Siedlung & Sippe)'
    },
    animation: {
      idle: [0, 1, 2, 3],
      walk: [4, 5, 6, 7],
      action: [12, 13, 14, 15],
      fps: 6
    },
    tags: ['Germanen', 'Bran', 'Langhaus', 'Wergeld', 'Sippe', 'Wolfshund']
  },
  {
    id: 'germanen_cow_stall',
    name: 'Wohnstallhaus-Rind',
    scientificOrHistoricalName: 'Bos taurus',
    category: 'fauna',
    spriteUrl: '/assets/shared/fauna/cow_brown.png',
    frameWidth: 32,
    frameHeight: 32,
    epochs: ['germanen'],
    epochLabels: ['Die Germanen'],
    roleTitle: 'Lebende Heizung & Tauschvermögen',
    summary: 'Mensch und Vieh lebten unter einem Dach – die Körperwärme heizte das germanische Wohnstallhaus.',
    didacticStory:
      'Germanische Langhäuser waren bis zu 30 Meter lang: Vorne wohnte die Familie am Herdfeuer, hinten standen die Rinder in Holzboxen. Im eisigen Winter wirkten die Kühe wie eine Fußbodenheizung! Zudem waren Rinder die wichtigste Währung der Germanen: Brautgaben und Friedensverträge wurden in Rinderköpfen beglichen.',
    gameChapterRef: {
      gameId: 'germanen-vom-langhaus-zum-limes',
      gameTitle: 'Die Germanen: Vom Langhaus zum Limes',
      chapterNumber: 1,
      chapterTitle: 'Im Schatten des Langhauses (Alltag, Siedlung & Sippe)'
    },
    animation: {
      idle: [0, 1, 2, 3],
      walk: [4, 5, 6, 7],
      action: [16, 17, 18, 19],
      fps: 4
    },
    tags: ['Germanen', 'Wohnstallhaus', 'Vieh', 'Wärme', 'Tauschhandel']
  },
  {
    id: 'germanen_pig_eichel',
    name: 'Germanisches Waldweide-Schwein',
    scientificOrHistoricalName: 'Sus domesticus',
    category: 'fauna',
    spriteUrl: '/assets/shared/fauna/pig.png',
    frameWidth: 32,
    frameHeight: 32,
    epochs: ['germanen'],
    epochLabels: ['Die Germanen'],
    roleTitle: 'Eichelmast & Fleischreserve der Sippe',
    summary: 'Fraß sich im Herbst an Wald-Eicheln rund, um Fleisch für den langen Winter zu liefern.',
    didacticStory:
      'Germanische Schweine hatten dunkles, dichtes Borstenhaar und lebten halbwild. Im Herbst trieben die Jugendlichen der Sippe die Herden in uralte Eichenwälder zur „Eichelmast“. Das Fleisch wurde über dem offenen Herdfeuer geräuchert und unter den Sparren des Dachs als Winterproviant aufgehängt.',
    gameChapterRef: {
      gameId: 'germanen-vom-langhaus-zum-limes',
      gameTitle: 'Die Germanen: Vom Langhaus zum Limes',
      chapterNumber: 2,
      chapterTitle: 'Das Geheimnis des Rennofens (Eisen, Erz & Schmiedekunst)'
    },
    animation: {
      idle: [0, 1, 2, 3],
      walk: [4, 5, 6, 7],
      action: [16, 17, 18, 19],
      fps: 5
    },
    tags: ['Germanen', 'Eichelmast', 'Räuchern', 'Wintervorrat', 'Wald']
  },
  {
    id: 'germanen_sacred_oak',
    name: 'Heilige Donar-Eiche & Irminsul',
    scientificOrHistoricalName: 'Quercus robur',
    category: 'flora',
    spriteUrl: '/assets/shared/flora/trees.png',
    frameWidth: 48,
    frameHeight: 96,
    epochs: ['germanen'],
    epochLabels: ['Die Germanen'],
    roleTitle: 'Kultstätte der Götter & Thing-Platz',
    summary: 'Germanen bauten keine Steintempel – uralte Eichenhaine waren ihre heiligen Versammlungsorte.',
    didacticStory:
      'Die Germanen glaubten, dass Götter in der freien Natur wohnen. Donnergott Donar (Thor) wurde besonders an uralten, knorrigen Eichen verehrt. Unter solchen Baumriesen tagte auch das „Thing“ – die freie Volksversammlung aller Sippen, wo Gesetze gesprochen und Häuptlinge gewählt wurden.',
    gameChapterRef: {
      gameId: 'germanen-vom-langhaus-zum-limes',
      gameTitle: 'Die Germanen: Vom Langhaus zum Limes',
      chapterNumber: 5,
      chapterTitle: 'Der Nebel des Heiligen Hains (Glaube, Götter & Mooropfer)'
    },
    animation: {
      idle: [0, 1, 2, 3],
      fps: 2
    },
    tags: ['Germanen', 'Donar', 'Heiliger Hain', 'Eiche', 'Thing']
  },
  {
    id: 'germanen_crops_spelz',
    name: 'Spelzweizen & Flachs',
    scientificOrHistoricalName: 'Triticum spelta / Linum usitatissimum',
    category: 'flora',
    spriteUrl: '/assets/shared/flora/crops.png',
    frameWidth: 16,
    frameHeight: 32,
    epochs: ['germanen'],
    epochLabels: ['Die Germanen'],
    roleTitle: 'Kälteresistentes Korn & Leinenkleidung',
    summary: 'Robuster Spelzweizen für den harten germanischen Winter und Flachs für reißfestes Leinen.',
    didacticStory:
      'Da der kühle germanische Norden für empfindlichen Weizen zu feucht war, bauten die Stämme Spelz (Dinkel) und Gerste an, deren Körner fest geschützt waren. Aus den Stängeln der blauen Flachspflanze spannen die Frauen lange Fasern und woben reißfeste Leinenhemden.',
    gameChapterRef: {
      gameId: 'germanen-vom-langhaus-zum-limes',
      gameTitle: 'Die Germanen: Vom Langhaus zum Limes',
      chapterNumber: 1,
      chapterTitle: 'Im Schatten des Langhauses (Alltag, Siedlung & Sippe)'
    },
    animation: {
      idle: [0, 1, 2, 3],
      fps: 2
    },
    tags: ['Germanen', 'Spelzweizen', 'Flachs', 'Leinen', 'Weben']
  },

  // ==========================================
  // 6. DIE WIKINGER (VOM FJORD NACH VINLAND)
  // ==========================================
  {
    id: 'wikinger_dog_fjord',
    name: 'Wikinger-Fjordhund (Fenrir-Gefährte)',
    scientificOrHistoricalName: 'Norsk Buhund',
    category: 'fauna',
    spriteUrl: '/assets/shared/fauna/dog_lupo.png',
    frameWidth: 32,
    frameHeight: 32,
    epochs: ['wikinger'],
    epochLabels: ['Die Wikinger'],
    roleTitle: 'Schiffsbegleiter & Schutzhund am Fjord',
    summary: 'Wachsam, wetterfest und treu auf langen Entdeckungsfahrten über den Nordatlantik.',
    didacticStory:
      'Wikingerhunde (die Ahnen des Norwegischen Buhunds) waren sturmerprobt und kälteresistent. Sie fuhren auf den Knorr-Handelsschiffen mit und bewachten an den steilen Fjorden Schafe und Hofstellen vor Bären. In der nordischen Mythologie spiegelte sich die Kraft der Hunde im mächtigen Riesenwolf Fenrir wider.',
    gameChapterRef: {
      gameId: 'wikinger-vom-fjord-nach-vinland',
      gameTitle: 'Die Wikinger: Vom Fjord nach Vinland',
      chapterNumber: 1,
      chapterTitle: 'Aufbruch am Fjord (Hof, Sippe & der Ruf der See)'
    },
    animation: {
      idle: [0, 1, 2, 3],
      walk: [4, 5, 6, 7],
      action: [12, 13, 14, 15],
      fps: 6
    },
    tags: ['Wikinger', 'Fjordhund', 'Langschiff', 'Buhund', 'Fjord']
  },
  {
    id: 'wikinger_horse_iceland',
    name: 'Islandpferd & Wikinger-Ross',
    scientificOrHistoricalName: 'Equus caballus islandicus',
    category: 'fauna',
    spriteUrl: '/assets/shared/fauna/horse.png',
    frameWidth: 32,
    frameHeight: 32,
    epochs: ['wikinger'],
    epochLabels: ['Die Wikinger'],
    roleTitle: 'Trittsicherer Pionier des Nordatlantiks',
    summary: 'Auf offenen Frachtschiffen nach Island gebracht – meisterte Geröll, Eis und Tundra.',
    didacticStory:
      'Als Wikinger um 874 n. Chr. das unbewohnte Island besiedelten, transportierten sie ihre zähesten Pferde auf offenen Holzbooten. Diese Pferde entwickelten den bequemen „Tölt“-Gang, mit dem sie über scharfkantige Lavafelder und reißende Gletscherflüsse liefen, ohne zu stolpern.',
    gameChapterRef: {
      gameId: 'wikinger-vom-fjord-nach-vinland',
      gameTitle: 'Die Wikinger: Vom Fjord nach Vinland',
      chapterNumber: 9,
      chapterTitle: 'Pioniere des Nordatlantiks (Grönland & Island)'
    },
    animation: {
      idle: [0, 1, 2, 3],
      walk: [4, 5, 6, 7],
      action: [16, 17, 18, 19],
      fps: 6
    },
    tags: ['Wikinger', 'Islandpferd', 'Island', 'Tundra', 'Seefahrt']
  },
  {
    id: 'wikinger_fish_stock',
    name: 'Kabeljau & Stockfisch',
    scientificOrHistoricalName: 'Gadus morhua',
    category: 'fauna',
    spriteUrl: '/assets/shared/fauna/fishing_fishes.png',
    frameWidth: 16,
    frameHeight: 16,
    epochs: ['wikinger'],
    epochLabels: ['Die Wikinger'],
    roleTitle: 'Der Treibstoff der Atlantik-Fahrten',
    summary: 'Brethart im Wind getrockneter Fisch hielt jahrelang – die Nahrung für Reisen bis nach Amerika.',
    didacticStory:
      'Ohne Stockfisch hätten die Wikinger niemals den Atlantik überquert! Auf Holzgestellen an den windigen Felsen trockneten Kabeljaue ohne Salz bretthart aus. Dieser Proviant wog wenig, verdarb auch nach Monaten auf See nicht und gab den Ruderern die nötige Kraft.',
    gameChapterRef: {
      gameId: 'wikinger-vom-fjord-nach-vinland',
      gameTitle: 'Die Wikinger: Vom Fjord nach Vinland',
      chapterNumber: 2,
      chapterTitle: 'Die Kunst des Klinkerbaus (Drakkar & Axt)'
    },
    animation: {
      idle: [0, 1, 2, 3],
      action: [4, 5, 6, 7],
      fps: 6
    },
    tags: ['Wikinger', 'Stockfisch', 'Kabeljau', 'Langschiff', 'Vinland']
  },
  {
    id: 'wikinger_sheep_wool',
    name: 'Nordisches Kurzschwanzschaf',
    scientificOrHistoricalName: 'Ovis aries borealis',
    category: 'fauna',
    spriteUrl: '/assets/shared/fauna/sheep.png',
    frameWidth: 32,
    frameHeight: 32,
    epochs: ['wikinger'],
    epochLabels: ['Die Wikinger'],
    roleTitle: 'Wollsegel für Langschiffe (Drakkar)',
    summary: 'Aus dichter, fettiger Schafwolle woben Frauen die sturmfesten Segel der Wikingerschiffe.',
    didacticStory:
      'Für ein einziges Wikinger-Segel brauchte man die Wolle von über 100 Schafen und monatelange Arbeit am Webstuhl. Die dichte, mit Tierfett eingeriebene Wolle riss selbst bei Orkanen nicht. Auf diesem Textilhandwerk basierte die hohe gesellschaftliche Stellung der Wikinger-Hausherrin mit ihrer Schlüsselgewalt.',
    gameChapterRef: {
      gameId: 'wikinger-vom-fjord-nach-vinland',
      gameTitle: 'Die Wikinger: Vom Fjord nach Vinland',
      chapterNumber: 1,
      chapterTitle: 'Aufbruch am Fjord (Hof, Sippe & der Ruf der See)'
    },
    animation: {
      idle: [0, 1, 2, 3],
      walk: [4, 5, 6, 7],
      action: [16, 17, 18, 19],
      fps: 4
    },
    tags: ['Wikinger', 'Wollsegel', 'Schaf', 'Schlüsselgewalt', 'Drakkar']
  },
  {
    id: 'wikinger_ship_oak',
    name: 'Knorrige Schiffsbau-Eiche',
    scientificOrHistoricalName: 'Quercus robur',
    category: 'flora',
    spriteUrl: '/assets/shared/flora/trees.png',
    frameWidth: 48,
    frameHeight: 96,
    epochs: ['wikinger'],
    epochLabels: ['Die Wikinger'],
    roleTitle: 'Elastische Planken für den Klinkerbau',
    summary: 'Mit Eisenkeilen gespaltene Eichenstämme machten Drakkare flexibel wie Meereswellen.',
    didacticStory:
      'Wikinger sägten Bäume nicht quer ab, sondern spalteten gerade Eichen mit Keilen entlang der natürlichen Holzfaser. So blieben die Planken elastisch. Wenn ein Drakkar über hohe Wellen schlug, bog sich der Eichenrumpf wie eine Welle mit, ohne zu brechen – das Meisterwerk des Klinkerbaus!',
    gameChapterRef: {
      gameId: 'wikinger-vom-fjord-nach-vinland',
      gameTitle: 'Die Wikinger: Vom Fjord nach Vinland',
      chapterNumber: 2,
      chapterTitle: 'Die Kunst des Klinkerbaus (Drakkar & Axt)'
    },
    animation: {
      idle: [0, 1, 2, 3],
      fps: 2
    },
    tags: ['Wikinger', 'Eiche', 'Klinkerbau', 'Schiffsbau', 'Drakkar']
  },

  // ==========================================
  // 7. EUROPÄISCHES MITTELALTER (FEUDALSYSTEM)
  // ==========================================
  {
    id: 'mittelalter_dog_hound',
    name: 'Adeliger Jagdhund & Burgwächter',
    scientificOrHistoricalName: 'Canis lupus familiaris',
    category: 'fauna',
    spriteUrl: '/assets/shared/fauna/dog_shepherd.png',
    frameWidth: 32,
    frameHeight: 32,
    epochs: ['mittelalter'],
    epochLabels: ['Europäisches Mittelalter'],
    roleTitle: 'Statussymbol des Feudaladels & Torwache',
    summary: 'Begleiter bei fürstlichen Hetzjagden und loyaler Bewacher des Burgtors und Bergfrieds.',
    didacticStory:
      'Im Hochmittelalter war die Jagd das exklusive Privileg des Adels. Burgherren züchteten stolze Jagd- und Hetzhunde für die Hirschjagd im herrschaftlichen Bannwald. Auf der Burg schliefen die edelsten Hunde oft direkt im Kaminzimmer des Ritters, während kräftige Hofhunde das Burgtor sicherten.',
    gameChapterRef: {
      gameId: 'das-mittelalter-feudalsystem',
      gameTitle: 'Ritter, Burg & Dorf – Das Feudalsystem',
      chapterNumber: 3,
      chapterTitle: 'Die Burg des Grafen (Rittertum, Wappen & Wehrhaftigkeit)'
    },
    animation: {
      idle: [0, 1, 2, 3],
      walk: [4, 5, 6, 7],
      action: [12, 13, 14, 15],
      fps: 6
    },
    tags: ['Mittelalter', 'Jagdhund', 'Ritter', 'Burg', 'Adel', 'Bannwald']
  },
  {
    id: 'mittelalter_cat_keep',
    name: 'Burg- & Klosterkatze',
    scientificOrHistoricalName: 'Felis catus',
    category: 'fauna',
    spriteUrl: '/assets/shared/fauna/cat_tabby.png',
    frameWidth: 32,
    frameHeight: 32,
    epochs: ['mittelalter'],
    epochLabels: ['Europäisches Mittelalter'],
    roleTitle: 'Hüterin der Handschriften & Kornböden',
    summary: 'Schützte die unersetzlichen Pergamentbücher der Mönche vor Mäusefraß.',
    didacticStory:
      'In den Klöstern schrieben Mönche jahrelang an wertvollen Handschriften aus Kalbsleder-Pergament. Mäuse waren der größte Feind der Bücher! Klosterkatzen durften sich frei im Skriptorium und in den Vorratskellern bewegen, um Schädlinge unbarmherzig zu jagen.',
    gameChapterRef: {
      gameId: 'das-mittelalter-feudalsystem',
      gameTitle: 'Ritter, Burg & Dorf – Das Feudalsystem',
      chapterNumber: 4,
      chapterTitle: 'Ora et Labora (Klosteralltag, Skriptorium & Kräutergarten)'
    },
    animation: {
      idle: [0, 1, 2, 3],
      walk: [4, 5, 6, 7],
      action: [16, 17, 18, 19],
      fps: 5
    },
    tags: ['Mittelalter', 'Katze', 'Kloster', 'Skriptorium', 'Pergament']
  },
  {
    id: 'mittelalter_horse_destrier',
    name: 'Ritterliches Schlachtross (Destrier)',
    scientificOrHistoricalName: 'Equus caballus',
    category: 'fauna',
    spriteUrl: '/assets/shared/fauna/horse.png',
    frameWidth: 32,
    frameHeight: 32,
    epochs: ['mittelalter'],
    epochLabels: ['Europäisches Mittelalter'],
    roleTitle: 'Gepanzerte Kampfkraft & Turniersieger',
    summary: 'Kräftiger Hengst, der Ritter in schwerer Eisenrüstung (über 150 kg Last) trug.',
    didacticStory:
      'Ein ritterliches Schlachtross (Destrier) kostete so viel wie ein ganzes Bauerngut! Die Hengste wurden trainiert, trotz klirrender Schwerter und Waffenlärm nicht zurückzuweichen. Bei glanzvollen Turnieren trugen sie kostbare Wappendecken und entschieden über Ruhm und Ehre des Ritters.',
    gameChapterRef: {
      gameId: 'das-mittelalter-feudalsystem',
      gameTitle: 'Ritter, Burg & Dorf – Das Feudalsystem',
      chapterNumber: 3,
      chapterTitle: 'Die Burg des Grafen (Rittertum, Wappen & Wehrhaftigkeit)'
    },
    animation: {
      idle: [0, 1, 2, 3],
      walk: [4, 5, 6, 7],
      action: [16, 17, 18, 19],
      fps: 6
    },
    tags: ['Mittelalter', 'Destrier', 'Ritter', 'Schlachtross', 'Turnier']
  },
  {
    id: 'mittelalter_cow_ox',
    name: 'Dreifelder-Pflugochse',
    scientificOrHistoricalName: 'Bos taurus',
    category: 'fauna',
    spriteUrl: '/assets/shared/fauna/cow_brown.png',
    frameWidth: 32,
    frameHeight: 32,
    epochs: ['mittelalter'],
    epochLabels: ['Europäisches Mittelalter'],
    roleTitle: 'Muskelkraft des Frondienstes',
    summary: 'Zog den schweren eisernen Räderpflug durch die harten Schollen der Grundherren-Felder.',
    didacticStory:
      'Im Frondienst mussten abhängige Bauern tagelang die Felder ihres Grundherrn pflügen. Starke Zugochsen mit Holzjochen zogen den neuen Wendepflug mit eiserner Schar, der den schweren Boden tief umbrach und belüftete. Ohne diese Ochsenkraft hätte die Agrarrevolution des Hochmittelalters nicht stattfinden können.',
    gameChapterRef: {
      gameId: 'das-mittelalter-feudalsystem',
      gameTitle: 'Ritter, Burg & Dorf – Das Feudalsystem',
      chapterNumber: 2,
      chapterTitle: 'Frondienst & Zehnter (Der harte Alltag der Hörigen)'
    },
    animation: {
      idle: [0, 1, 2, 3],
      walk: [4, 5, 6, 7],
      action: [16, 17, 18, 19],
      fps: 4
    },
    tags: ['Mittelalter', 'Pflugochse', 'Frondienst', 'Grundherr', 'Wendepflug']
  },
  {
    id: 'mittelalter_chicken_tribute',
    name: 'Das Zinshuhn',
    scientificOrHistoricalName: 'Gallus gallus domesticus',
    category: 'fauna',
    spriteUrl: '/assets/shared/fauna/chicken_golden.png',
    frameWidth: 16,
    frameHeight: 16,
    epochs: ['mittelalter'],
    epochLabels: ['Europäisches Mittelalter'],
    roleTitle: 'Abgabe an Grundherr & Kirche (Der Zehnte)',
    summary: 'Bäuerliche Pachtabgabe: Hühner und Eier wurden zu festen Terminen an die Burg geliefert.',
    didacticStory:
      'Da Bauern kaum Silbermünzen besaßen, zahlten sie Pacht und Steuern in Naturalien. Zu festen Feiertagen (wie Michaelis im Herbst) musste jeder Hof dem Verwalter des Grundherrn ein fettes „Zinshuhn“ und Körbe voller Eier abliefern. Wer die Abgabe verweigerte, verlor sein Land.',
    gameChapterRef: {
      gameId: 'das-mittelalter-feudalsystem',
      gameTitle: 'Ritter, Burg & Dorf – Das Feudalsystem',
      chapterNumber: 2,
      chapterTitle: 'Frondienst & Zehnter (Der harte Alltag der Hörigen)'
    },
    animation: {
      idle: [0, 1, 2, 3],
      walk: [4, 5, 6, 7],
      action: [12, 13, 14, 15],
      fps: 5
    },
    tags: ['Mittelalter', 'Zinshuhn', 'Zehnter', 'Abgabe', 'Grundherrschaft']
  },
  {
    id: 'mittelalter_crops_threefield',
    name: 'Dreifelderwirtschaft (Roggen, Hafer & Brache)',
    scientificOrHistoricalName: 'Secale cereale / Avena sativa',
    category: 'flora',
    spriteUrl: '/assets/shared/flora/crops.png',
    frameWidth: 16,
    frameHeight: 32,
    epochs: ['mittelalter'],
    epochLabels: ['Europäisches Mittelalter'],
    roleTitle: 'Die Agrarrevolution des Hochmittelalters',
    summary: 'Der geniale Fruchtwechsel verhinderte Bodenauslaugung und verdoppelte die Erträge.',
    didacticStory:
      'Im 11. Jahrhundert führten Klöster und Bauern die Dreifelderwirtschaft ein: Ein Feld trug Wintergetreide (Roggen für Brot), das zweite Sommergetreide (Hafer für Pferde / Gerste für Bier), und das dritte ruhte als Brache zur Erholung. Diese geniale Erfindung besiegte den Hunger und ließ Europas Städte aufblühen!',
    gameChapterRef: {
      gameId: 'das-mittelalter-feudalsystem',
      gameTitle: 'Ritter, Burg & Dorf – Das Feudalsystem',
      chapterNumber: 1,
      chapterTitle: 'Das Dorf im Bann der Burg (Alltag der Laboratores)'
    },
    animation: {
      idle: [0, 1, 2, 3],
      fps: 2
    },
    tags: ['Mittelalter', 'Dreifelderwirtschaft', 'Roggen', 'Hafer', 'Ernte']
  },
  {
    id: 'mittelalter_trees_bannwald',
    name: 'Königlicher Bannwald & Bauholz',
    scientificOrHistoricalName: 'Quercus robur / Fagus sylvatica',
    category: 'flora',
    spriteUrl: '/assets/shared/flora/trees.png',
    frameWidth: 48,
    frameHeight: 96,
    epochs: ['mittelalter'],
    epochLabels: ['Europäisches Mittelalter'],
    roleTitle: 'Burgbalken, Köhlerei & Adelsprivileg',
    summary: 'Bauholz für Fachwerkhäuser und Holzkohle für die Schmiede – streng bewacht vom Grundherrn.',
    didacticStory:
      'Der Wald war die Lebensader des Mittelalters: Aus Eichenstämmen zimmerten Handwerker die Wehrtürme der Burgen, Köhler brannten Holzkohle für die Waffenschmiede. Doch Vorsicht: Der Wald war „Bannwald“ des Grundherrn. Wer dort unerlaubt Holz schlug oder Rehe jagte, wurde streng bestraft!',
    gameChapterRef: {
      gameId: 'das-mittelalter-feudalsystem',
      gameTitle: 'Ritter, Burg & Dorf – Das Feudalsystem',
      chapterNumber: 3,
      chapterTitle: 'Die Burg des Grafen (Rittertum, Wappen & Wehrhaftigkeit)'
    },
    animation: {
      idle: [0, 1, 2, 3],
      fps: 2
    },
    tags: ['Mittelalter', 'Bannwald', 'Bauholz', 'Köhler', 'Burg']
  },
  {
    id: 'mittelalter_forage_herbs',
    name: 'Kloster-Kräutergarten (Hildegard von Bingen)',
    scientificOrHistoricalName: 'Hortus medicus',
    category: 'flora',
    spriteUrl: '/assets/shared/flora/forage.png',
    frameWidth: 16,
    frameHeight: 16,
    epochs: ['mittelalter'],
    epochLabels: ['Europäisches Mittelalter'],
    roleTitle: 'Klostermedizin & Heilwissen',
    summary: 'Salbei, Thymian, Lavendel und Fenchel gegen Fieber, Wunden und Magenleiden.',
    didacticStory:
      'Hinter den Klostermauern legten Mönche und heilkundige Gelehrte wie Hildegard von Bingen quadratische Kräutergärten an. Sie erforschten die Wirkkräfte der Natur: In der Klosterapotheke wurden heilende Salben, Tees und Tinkturen zubereitet, um kranke Pilger und arme Dorfbewohner zu pflegen.',
    gameChapterRef: {
      gameId: 'das-mittelalter-feudalsystem',
      gameTitle: 'Ritter, Burg & Dorf – Das Feudalsystem',
      chapterNumber: 4,
      chapterTitle: 'Ora et Labora (Klosteralltag, Skriptorium & Kräutergarten)'
    },
    animation: {
      idle: [0, 1, 2, 3],
      fps: 2
    },
    tags: ['Mittelalter', 'Kräutergarten', 'Hildegard von Bingen', 'Kloster', 'Medizin']
  }
];

export const ATLAS_CATEGORIES = [
  { id: 'all', label: 'Gesamte Natur' },
  { id: 'fauna', label: '🐾 Tierwelt (Fauna)' },
  { id: 'flora', label: '🌿 Pflanzenwelt (Flora)' },
];

export const ATLAS_EPOCHS = [
  { id: 'all', label: 'Alle Epochen' },
  { id: 'steinzeit', label: 'Ur- & Frühgeschichte' },
  { id: 'aegypten', label: 'Altes Ägypten' },
  { id: 'griechenland', label: 'Antikes Griechenland' },
  { id: 'rom', label: 'Römisches Reich' },
  { id: 'germanen', label: 'Die Germanen' },
  { id: 'wikinger', label: 'Die Wikinger' },
  { id: 'mittelalter', label: 'Mittelalter' },
];
