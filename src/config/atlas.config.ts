/**
 * Konfiguration & Didaktische Steckbriefe für den 16-Bit Natur-Atlas
 * Speziell aufbereitet für Schülerinnen und Schüler der Klassen 5 & 6.
 * Fokus: Historische Bedeutung, Alltag, Kult und Tierhaltung.
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
  epochs: string[]; // 'steinzeit' | 'aegypten' | 'griechenland' | 'rom' | 'germanen'
  epochLabels: string[];
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
  // FAUNA: ALTES ÄGYPTEN
  // ==========================================
  {
    id: 'cat_black',
    name: 'Schwarze Katze (Bastet-Kult)',
    scientificOrHistoricalName: 'Felis lybica domestica',
    category: 'fauna',
    spriteUrl: '/assets/shared/fauna/cat_black.png',
    frameWidth: 32,
    frameHeight: 32,
    epochs: ['aegypten'],
    epochLabels: ['Altes Ägypten'],
    roleTitle: 'Heilige Beschützerin & Göttin Bastet',
    summary: 'Schützte die riesigen Getreidespeicher des Pharaos vor Ratten und Schlangen.',
    didacticStory:
      'Im Alten Ägypten wurden Katzen wie Familienmitglieder verehrt. Wer einer Katze Leid antat, wurde schwer bestraft! Sie verkörperten die friedliche Katzengöttin Bastet, die für Freude, Musik und Schutz des Heimes stand. Starb eine Hauskatze, rasierte sich die ganze Familie aus Trauer die Augenbrauen ab.',
    gameChapterRef: {
      gameId: 'kemet-altes-aegypten',
      gameTitle: 'Kemet – Das Geschenk des Nils',
      chapterNumber: 3,
      chapterTitle: 'Der Pharao, sein Wesir & der Kornspeicher'
    },
    animation: {
      idle: [0, 1, 2, 3],
      walk: [4, 5, 6, 7],
      action: [16, 17, 18, 19], // Putzen/Sitzen
      fps: 5
    },
    tags: ['Ägypten', 'Bastet', 'Heilig', 'Kornspeicher', 'Kulttier']
  },
  {
    id: 'dog_tesem',
    name: 'Tesem-Windhund',
    scientificOrHistoricalName: 'Altägyptischer Windhund',
    category: 'fauna',
    spriteUrl: '/assets/shared/fauna/dog_tesem.png',
    frameWidth: 32,
    frameHeight: 32,
    epochs: ['aegypten'],
    epochLabels: ['Altes Ägypten'],
    roleTitle: 'Jagdhund der Pharaonen & Gott Anubis',
    summary: 'Pfeilschneller Wüstenjäger mit Stehohren und Ringelschwanz.',
    didacticStory:
      'Der Tesem ist eine der ältesten nachgewiesenen Hunderassen der Menschheit. Mit seinen langen Beinen und wachen Stehohren jagte er für Pharaonen und Adlige Gazellen in der Wüste. Seine aufrechte Gestalt stand Pate für die Darstellung von Anubis, dem Schakalgott und Hüter der Mumifizierung.',
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
    tags: ['Ägypten', 'Anubis', 'Windhund', 'Wüstenjagd']
  },
  {
    id: 'ostrich',
    name: 'Afrikanischer Strauß',
    scientificOrHistoricalName: 'Struthio camelus',
    category: 'fauna',
    spriteUrl: '/assets/shared/fauna/ostrich.png',
    frameWidth: 32,
    frameHeight: 32,
    epochs: ['aegypten'],
    epochLabels: ['Altes Ägypten'],
    roleTitle: 'Symbol der Wahrheit & Ma\'at-Kult',
    summary: 'Lieferant der Feder der Wahrheit für das Totengericht des Osiris.',
    didacticStory:
      'Der Strauß war der größte Vogel im Einflussbereich Ägyptens. Seine edlen weißen Federn waren mehr als nur Fächer-Schmuck: Eine einzige Straußenfeder legten die Götter auf die Waage des Totengerichts! Nur wessen Herz leichter oder gleich schwer wie die Straußenfeder der Wahrheit (Ma\'at) war, durfte ins ewige Jenseits eintreten.',
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
    tags: ['Ägypten', 'Ma\'at', 'Totengericht', 'Feder', 'Wüste']
  },
  {
    id: 'duck',
    name: 'Nil-Stockente',
    scientificOrHistoricalName: 'Anas platyrhynchos',
    category: 'fauna',
    spriteUrl: '/assets/shared/fauna/duck.png',
    frameWidth: 32,
    frameHeight: 32,
    epochs: ['aegypten', 'steinzeit', 'rom'],
    epochLabels: ['Altes Ägypten', 'Ur- & Frühgeschichte'],
    roleTitle: 'Wasservogel der Papyrus-Sümpfe',
    summary: 'Fett- und Eiweißquelle sowie Symbol für das Erwachen des Lebens nach der Flut.',
    didacticStory:
      'In den dichten Schilfwäldern des Nildeltas wimmelte es von Wasservögeln. Mit leichten Schilfbooten fuhren ägyptische Fischer und Jäger hinaus und fingen Enten mit Wurfhölzern und Schlagnetzen. Enten dienten als Festtagsbraten und galten als Opfergabe für den Nilgott Hapi.',
    gameChapterRef: {
      gameId: 'kemet-altes-aegypten',
      gameTitle: 'Kemet – Das Geschenk des Nils',
      chapterNumber: 2,
      chapterTitle: 'Die Nilschwemme & das Wunder des Schadufs'
    },
    animation: {
      idle: [0, 1, 2, 3],
      walk: [4, 5, 6, 7],
      action: [8, 9, 10, 11], // Tauchen/Gründeln
      fps: 5
    },
    tags: ['Ägypten', 'Nil', 'Papyrus', 'Fischfang', 'Schaduf']
  },
  {
    id: 'turtle_green',
    name: 'Nil-Wasserschildkröte',
    scientificOrHistoricalName: 'Trionyx triunguis',
    category: 'fauna',
    spriteUrl: '/assets/shared/fauna/turtle_green.png',
    frameWidth: 32,
    frameHeight: 32,
    epochs: ['aegypten', 'griechenland', 'rom'],
    epochLabels: ['Altes Ägypten', 'Antikes Griechenland'],
    roleTitle: 'Urtümliches Flusstier & Schutzamulett',
    summary: 'Sonnte sich auf Schlammbänken und galt als Wächtertier gegen böse Mächte.',
    didacticStory:
      'Weil sie lautlos im Schlamm abtauchen und plötzlich wieder auftauchen konnte, faszinierte die Weichschildkröte die Menschen der Antike. Kinder trugen oft kleine geschnitzte Schildkröten-Amulette aus Fayence oder Ton um den Hals, um sich vor bösen Flussdämonen und Krokodilen zu schützen.',
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
    tags: ['Ägypten', 'Nil', 'Amulett', 'Flusstier']
  },

  // ==========================================
  // FAUNA: UR- & FRÜHGESCHICHTE (STEINZEIT)
  // ==========================================
  {
    id: 'dog_lupo',
    name: 'Steinzeit-Hund (Lupo)',
    scientificOrHistoricalName: 'Canis lupus familiaris',
    category: 'fauna',
    spriteUrl: '/assets/shared/fauna/dog_lupo.png',
    frameWidth: 32,
    frameHeight: 32,
    epochs: ['steinzeit', 'germanen'],
    epochLabels: ['Ur- & Frühgeschichte', 'Die Germanen'],
    roleTitle: 'Der erste Gefährte des Menschen',
    summary: 'Aus dem gezähmten Wolf wurde vor über 15.000 Jahren der erste treue Jagdbegleiter.',
    didacticStory:
      'Vor tausenden von Jahren wagten sich die mutigsten Wölfe an die Lagerfeuer der Steinzeit-Jäger, um Fleischreste zu fressen. Daraus entstand eine feste Freundschaft: Der Hund warnte die Sippe nachts vor Bären und Säbelzahntigern, spürte verletztes Wild auf und hielt die Kinder im eisigen Winter warm.',
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
    id: 'cow_brown',
    name: 'Hausrind / Ur-Rind',
    scientificOrHistoricalName: 'Bos taurus',
    category: 'fauna',
    spriteUrl: '/assets/shared/fauna/cow_brown.png',
    frameWidth: 32,
    frameHeight: 32,
    epochs: ['steinzeit', 'germanen', 'rom'],
    epochLabels: ['Ur- & Frühgeschichte', 'Die Germanen', 'Römisches Reich'],
    roleTitle: 'Lebendes Kraftwerk & Wärmequelle',
    summary: 'Zog die ersten Holzpflüge und wärmte das germanische Wohnstallhaus.',
    didacticStory:
      'Die Zähmung wilder Auerochsen war eine der größten Leistungen der Jungsteinzeit. Rinder gaben nicht nur Milch, Leder und Horn, sondern dienten vor der Erfindung des Geldes als wichtigster Tauschwert. Bei den Germanen stand das Rindvieh im selben Haus wie die Menschen – die Körperwärme der Tiere heizte die Stube!',
    gameChapterRef: {
      gameId: 'steinzeit-wiege-der-menschheit',
      gameTitle: 'Vom Jäger zum Schmied',
      chapterNumber: 3,
      chapterTitle: 'Die Jungsteinzeit-Siedlung (Hausbau & Viehzucht)'
    },
    animation: {
      idle: [0, 1, 2, 3],
      walk: [4, 5, 6, 7],
      action: [16, 17, 18, 19], // Gras fressen
      fps: 4
    },
    tags: ['Steinzeit', 'Ackerbau', 'Wohnstallhaus', 'Viehzucht', 'Neolithikum']
  },
  {
    id: 'goat',
    name: 'Hausziege',
    scientificOrHistoricalName: 'Capra hircus',
    category: 'fauna',
    spriteUrl: '/assets/shared/fauna/goat.png',
    frameWidth: 32,
    frameHeight: 32,
    epochs: ['steinzeit', 'griechenland', 'germanen'],
    epochLabels: ['Ur- & Frühgeschichte', 'Antikes Griechenland', 'Die Germanen'],
    roleTitle: 'Kletterkünstlerin & Milchspenderin',
    summary: 'Genügsames Weidetier für steile Felshänge und karge Böden.',
    didacticStory:
      'Ziegen waren die idealen Haustiere für steinige Berglandschaften wie in Griechenland oder den Thüringer Wäldern. Sie fressen fast alles – sogar stacheliges Gestrüpp und Baumrinde. Für Bauern waren sie lebenswichtig, weil sie täglich nahrhafte Milch für Schafskäse und feste Häute für Wasserschläuche lieferten.',
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
    tags: ['Griechenland', 'Polis', 'Berge', 'Milch', 'Viehzucht']
  },
  {
    id: 'pig',
    name: 'Eichelschwein',
    scientificOrHistoricalName: 'Sus domesticus',
    category: 'fauna',
    spriteUrl: '/assets/shared/fauna/pig.png',
    frameWidth: 32,
    frameHeight: 32,
    epochs: ['steinzeit', 'germanen', 'rom'],
    epochLabels: ['Ur- & Frühgeschichte', 'Die Germanen', 'Römisches Reich'],
    roleTitle: 'Waldweide & Fleischreserve',
    summary: 'Wurde im Herbst in die Eichenwälder getrieben, um sich für den Winter dick zu fressen.',
    didacticStory:
      'Frühere Schweine sahen noch fast wie Wildschweine aus und hatten borstiges Fell. Germanische und römische Hirten trieben riesige Schweinerotten in die dichten Wälder, wo die Tiere tonnenweise herabgefallene Eicheln und Bucheckern fraßen. Geräucherter Schinken war der wichtigste Proviant für lange Winter.',
    gameChapterRef: {
      gameId: 'germanen-vom-langhaus-zum-limes',
      gameTitle: 'Die Germanen: Vom Langhaus zum Limes',
      chapterNumber: 1,
      chapterTitle: 'Im Schatten des Langhauses (Alltag, Siedlung & Sippe)'
    },
    animation: {
      idle: [0, 1, 2, 3],
      walk: [4, 5, 6, 7],
      action: [16, 17, 18, 19], // Wühlen im Boden
      fps: 5
    },
    tags: ['Germanen', 'Sippe', 'Waldweide', 'Eicheln', 'Langhaus']
  },
  {
    id: 'fishing_fishes',
    name: 'Flussfische & Nilbarsch',
    scientificOrHistoricalName: 'Pisces (z. B. Lates niloticus, Salmo trutta)',
    category: 'fauna',
    spriteUrl: '/assets/shared/fauna/fishing_fishes.png',
    frameWidth: 16,
    frameHeight: 16,
    epochs: ['steinzeit', 'aegypten', 'griechenland', 'rom', 'germanen'],
    epochLabels: ['Ur- & Frühgeschichte', 'Altes Ägypten', 'Römisches Reich'],
    roleTitle: 'Der Reichtum der Gewässer',
    summary: 'Fischfang mit Harpunen aus Knochen, Reusen aus Weiden und kupfernen Haken.',
    didacticStory:
      'Bevor der Mensch Getreide anbaute, sicherte der Fischfang das Überleben. Ötzi trug sogar Schnüre bei sich! In Ägypten trocknete man Fische in der glühenden Wüstensonne, um sie monatelang haltbar zu machen, während die Römer aus Fischresten die berühmte Würzsoße „Garum“ brauten, die auf keinem Festmahl fehlen durfte.',
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
    tags: ['Fischfang', 'Harpune', 'Garum', 'Nil', 'Ernährung']
  },

  // ==========================================
  // FAUNA: ANTIKE & RÖMISCHES REICH / GRIECHENLAND
  // ==========================================
  {
    id: 'horse',
    name: 'Kavallerie-Pferd & Streitross',
    scientificOrHistoricalName: 'Equus caballus',
    category: 'fauna',
    spriteUrl: '/assets/shared/fauna/horse.png',
    frameWidth: 32,
    frameHeight: 32,
    epochs: ['griechenland', 'rom', 'germanen'],
    epochLabels: ['Antikes Griechenland', 'Römisches Reich', 'Die Germanen'],
    roleTitle: 'Tempo, Macht & Wagenrennen',
    summary: 'Gefürchtet im Circus Maximus und unverzichtbar für römische Melder und Reiterei.',
    didacticStory:
      'Wer in der Antike ein Pferd besaß, gehörte zur wohlhabenden Oberschicht – bei den Römern hießen diese Adligen sogar „Equites“ (Ritter). Pferde revolutionierten das Reisen: Dank des römischen Pflasterstraßen-Netzes konnten Eilboten Nachrichten über hunderte Kilometer in wenigen Tagen durch das gesamte Weltreich überbringen.',
    gameChapterRef: {
      gameId: 'roma-aeterna-roemisches-reich',
      gameTitle: 'Imperium Romanum: Roma Aeterna',
      chapterNumber: 8,
      chapterTitle: 'Pax Romana (Augustus & Architektur der Kaiserzeit)'
    },
    animation: {
      idle: [0, 1, 2, 3],
      walk: [4, 5, 6, 7],
      action: [16, 17, 18, 19], // Schnauben/Grasen
      fps: 6
    },
    tags: ['Rom', 'Circus Maximus', 'Reiter', 'Kavallerie', 'Ritter']
  },
  {
    id: 'sheep',
    name: 'Wollschaf',
    scientificOrHistoricalName: 'Ovis aries',
    category: 'fauna',
    spriteUrl: '/assets/shared/fauna/sheep.png',
    frameWidth: 32,
    frameHeight: 32,
    epochs: ['griechenland', 'rom', 'germanen', 'steinzeit'],
    epochLabels: ['Römisches Reich', 'Antikes Griechenland', 'Die Germanen'],
    roleTitle: 'Lieferant für Toga, Tunika & Wollhandel',
    summary: 'Ohne Schafwolle hätte kein römischer Senator eine Toga tragen können.',
    didacticStory:
      'Im Römischen Reich war Schafzucht ein echtes Millionengeschäft. Millionen Meter feine Schafwolle wurden jedes Jahr auf Webstühlen zu Tuniken, warmen Soldatenmänteln und Togen verarbeitet. Reiche Römer ließen ihre Schafherden über hunderte Kilometer auf speziellen Viehtrieb-Straßen vom Sommer- ins Winterquartier wandern.',
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
    tags: ['Rom', 'Toga', 'Wolle', 'Webstuhl', 'Kleidung']
  },
  {
    id: 'chicken_white',
    name: 'Heiliges Orakelhuhn',
    scientificOrHistoricalName: 'Gallus gallus domesticus',
    category: 'fauna',
    spriteUrl: '/assets/shared/fauna/chicken_white.png',
    frameWidth: 16,
    frameHeight: 16,
    epochs: ['rom'],
    epochLabels: ['Römisches Reich'],
    roleTitle: 'Göttliche Entscheidungshilfe für Feldherren',
    summary: 'Pickte das Huhn eifrig die Körner, stand den römischen Legionen ein Sieg bevor.',
    didacticStory:
      'Römische Generale zogen niemals in die Schlacht, ohne vorher die heiligen Hühner (Pulli) zu befragen! Ein Priester warf ihnen Futter hin: Pickten die Hühner so gierig, dass Körner aus dem Schnabel fielen, galt das als glückhaftes Vorzeichen der Götter. Verweigerten sie das Futter, wurde der Angriff sofort abgeblasen.',
    gameChapterRef: {
      gameId: 'roma-aeterna-roemisches-reich',
      gameTitle: 'Imperium Romanum: Roma Aeterna',
      chapterNumber: 4,
      chapterTitle: 'Der Schatten von Karthago (Cannae & Hannibal)'
    },
    animation: {
      idle: [0, 1, 2, 3],
      walk: [4, 5, 6, 7],
      action: [12, 13, 14, 15], // Picken
      fps: 5
    },
    tags: ['Rom', 'Orakel', 'Legion', 'Götterzeichen', 'Feldzug']
  },
  {
    id: 'dog_molosser',
    name: 'Molosser-Wachhund',
    scientificOrHistoricalName: 'Canis molossus',
    category: 'fauna',
    spriteUrl: '/assets/shared/fauna/dog_molosser.png',
    frameWidth: 32,
    frameHeight: 32,
    epochs: ['rom', 'griechenland'],
    epochLabels: ['Römisches Reich', 'Antikes Griechenland'],
    roleTitle: 'Wächter der Kastelle & Mosaik-Star',
    summary: 'Das Vorbild für die berühmten Mosaike mit der Aufschrift „Cave Canem“ (Hüte dich vor dem Hund!).',
    didacticStory:
      'Im antiken Pompeji fand man am Eingang reicher Villen Fußbodenmosaike mit an der Kette liegenden Hunden und dem Warnspruch „Cave Canem“. Diese kräftigen Molosser-Hunde schützten Landgüter vor Einbrechern, bewachten römische Kastelle am Limes und wurden sogar als Jagdhunde gegen Wildschweine eingesetzt.',
    gameChapterRef: {
      gameId: 'germanen-vom-langhaus-zum-limes',
      gameTitle: 'Die Germanen: Vom Langhaus zum Limes',
      chapterNumber: 7,
      chapterTitle: 'Wachtürme und Grenzmärkte (Das Leben am Obergermanischen Limes)'
    },
    animation: {
      idle: [0, 1, 2, 3],
      walk: [4, 5, 6, 7],
      action: [12, 13, 14, 15],
      fps: 5
    },
    tags: ['Rom', 'Cave Canem', 'Wachhund', 'Limes', 'Pompeji']
  },

  // ==========================================
  // FLORA: NUTZPFLANZEN, BÄUME & ERNTE
  // ==========================================
  {
    id: 'crops',
    name: 'Urgetreide: Emmer, Einkorn & Spelzweizen',
    scientificOrHistoricalName: 'Triticum dicoccum / Triticum monococcum',
    category: 'flora',
    spriteUrl: '/assets/shared/flora/crops.png',
    frameWidth: 16,
    frameHeight: 32,
    epochs: ['steinzeit', 'aegypten', 'griechenland', 'rom', 'germanen'],
    epochLabels: ['Ur- & Frühgeschichte', 'Altes Ägypten', 'Die Germanen'],
    roleTitle: 'Das Fundament der menschlichen Zivilisation',
    summary: 'Erst der Anbau von Getreide machte die Menschheit sesshaft und führte zum Bau von Dörfern und Städten.',
    didacticStory:
      'Vor der Neolithischen Revolution mussten die Menschen täglich dem Wild hinterherziehen. Als sie entdeckten, dass man Körner aussäen, pflegen und ernten kann, veränderte sich die Welt für immer! Aus gemahlenem Emmer backte man auf heißen Steinen die ersten Fladenbrote und braute das nahrhafte Alltagsgetränk: Bier.',
    gameChapterRef: {
      gameId: 'steinzeit-wiege-der-menschheit',
      gameTitle: 'Vom Jäger zum Schmied',
      chapterNumber: 2,
      chapterTitle: 'Der Wendepunkt (Wolf zähmen & die erste Aussaat am See)'
    },
    animation: {
      idle: [0, 1, 2, 3], // Wachstums- & Wogestufen
      fps: 2
    },
    tags: ['Ackerbau', 'Neolithikum', 'Emmer', 'Brot', 'Ernte']
  },
  {
    id: 'fruit_trees',
    name: 'Kultur-Fruchtbäume: Dattelpalme, Feige & Olivenbaum',
    scientificOrHistoricalName: 'Phoenix dactylifera / Ficus carica / Olea europaea',
    category: 'flora',
    spriteUrl: '/assets/shared/flora/fruit_trees.png',
    frameWidth: 48,
    frameHeight: 80,
    epochs: ['aegypten', 'griechenland', 'rom'],
    epochLabels: ['Altes Ägypten', 'Antikes Griechenland', 'Römisches Reich'],
    roleTitle: 'Flüssiges Gold, Süße & Oasenschatten',
    summary: 'Lieferte Olivenöl für Öllampen und die Körperpflege sowie süße Datteln für die Wüstenkarawane.',
    didacticStory:
      'Der Olivenbaum war für die Griechen heilig – der Mythos besagt, dass Göttin Athene den Athenern den ersten Olivenbaum schenkte, um die Stadtpatronin zu werden! Olivenöl war nicht nur Nahrungsmittel: Es erleuchtete als Lampenöl die Nacht, diente beim Sport als Einreibemittel und bildete die Basis für kostbare Parfüme.',
    gameChapterRef: {
      gameId: 'hellas-antikes-griechenland',
      gameTitle: 'Hellas – Von der Polis zum Weltreich',
      chapterNumber: 1,
      chapterTitle: 'Die Geburt der Polis – Berge, Buchten & Olivenhaine'
    },
    animation: {
      idle: [0, 1, 2, 3], // Sanftes Wehen im Wind
      fps: 3
    },
    tags: ['Olivenbaum', 'Dattelpalme', 'Öl', 'Athene', 'Mittelmeer']
  },
  {
    id: 'trees',
    name: 'Mächtige Eichen & Heilige Haine',
    scientificOrHistoricalName: 'Quercus robur',
    category: 'flora',
    spriteUrl: '/assets/shared/flora/trees.png',
    frameWidth: 48,
    frameHeight: 96,
    epochs: ['germanen', 'steinzeit', 'griechenland'],
    epochLabels: ['Die Germanen', 'Ur- & Frühgeschichte'],
    roleTitle: 'Kultstätte der Götter & stabiles Bauholz',
    summary: 'Germanische Stämme bauten keine Steintempel – uralte Eichenhaine waren ihre Heiligtümer.',
    didacticStory:
      'Die Germanen verehrten den Donnergott Donar besonders an alten, knorrigen Eichen. Sie glaubten, dass die Götter in der freien Natur wohnen und kein von Menschenhand gebautes Dach über sich dulden. Zudem lieferte die Eiche das härteste Bauholz für die Pfosten der riesigen Wohnstallhäuser.',
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
    tags: ['Germanen', 'Eiche', 'Heiliger Hain', 'Donar', 'Langhaus']
  },
  {
    id: 'forage',
    name: 'Wildkräuter, Wurzeln & Waldbeeren',
    scientificOrHistoricalName: 'Flora silvestris',
    category: 'flora',
    spriteUrl: '/assets/shared/flora/forage.png',
    frameWidth: 16,
    frameHeight: 16,
    epochs: ['steinzeit', 'germanen'],
    epochLabels: ['Ur- & Frühgeschichte', 'Die Germanen'],
    roleTitle: 'Heilwissen der Sammlerinnen',
    summary: 'Heilkräuter gegen Fieber, Wundkräuter und vitaminreiche Notnahrung.',
    didacticStory:
      'Schon die Jäger und Sammler der Altsteinzeit kannten jede Pflanze ihrer Umgebung genau. Seherinnen und Sippenälteste wussten, welche Rinde Schmerzen linderte (Weidenrinde enthält denselben Wirkstoff wie heutiges Aspirin!) und welche Pilze giftig oder heilsam waren.',
    gameChapterRef: {
      gameId: 'steinzeit-wiege-der-menschheit',
      gameTitle: 'Vom Jäger zum Schmied',
      chapterNumber: 1,
      chapterTitle: 'Jäger und Sammler (Überleben als Nomaden in der Altsteinzeit)'
    },
    animation: {
      idle: [0, 1, 2, 3],
      fps: 2
    },
    tags: ['Steinzeit', 'Heilkräuter', 'Sammeln', 'Medizin', 'Wurzeln']
  }
];

export const ATLAS_CATEGORIES = [
  { id: 'all', label: 'Gesamte Natur' },
  { id: 'fauna', label: '🐾 Tierwelt (Fauna)' },
  { id: 'flora', label: '🌿 Pflanzenwelt (Flora)' },
];

export const ATLAS_EPOCHS = [
  { id: 'all', label: 'Alle Epochen' },
  { id: 'steinzeit', label: 'Urgeschichte' },
  { id: 'aegypten', label: 'Altes Ägypten' },
  { id: 'griechenland', label: 'Griechenland' },
  { id: 'rom', label: 'Altes Rom' },
  { id: 'germanen', label: 'Die Germanen' },
];
