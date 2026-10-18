import { EpochGame } from '../types/game';

export const PORTAL_META = {
  schoolName: 'Staatliche Regelschule Heimbürgeschule',
  schoolLocation: 'Kahla',
  portalTitle: 'Epochenhub • 16-Bit Geschichtsabenteuer',
  portalSubtitle: 'Erkunde die großen Epochen der Menschheitsgeschichte in interaktiven Retro-Lernabenteuern',
  supportEmail: 'schulleitung@regelschule-kahla.de',
};

export const EPOCH_GAMES: EpochGame[] = [
  {
    id: 'steinzeit-wiege-der-menschheit',
    title: 'Vom Jäger zum Schmied',
    shortTitle: 'Steinzeit bis Eisenzeit',
    subtitle: 'Die Wiege der Menschheit',
    epoch: 'Ur- & Frühgeschichte',
    epochCategory: 'urgeschichte',
    period: 'ca. 40.000 v. Chr. – ca. 800 v. Chr.',
    yearStart: -40000,
    yearEnd: -800,
    grade: 'Klasse 5 / 6',
    chaptersCount: 6,
    duration: 'ca. 45–60 Min.',
    liveUrl: 'https://retrolernspiel.vercel.app/',
    coverImage: '/assets/covers/stone_age_cover.png',
    spriteImage: '/assets/sprites/alva_hero.png',
    theme: {
      primary: '#78716c',
      accent: '#d97706',
      badgeBg: 'bg-stone-800/90 text-amber-300 border-stone-600',
      border: 'border-stone-500',
      glowClass: 'hover:shadow-[0_0_25px_rgba(217,119,6,0.35)]',
    },
    guidingQuestion: 'Wie verwandelte sich der Mensch vom umherziehenden Nomaden zum sesshaften Erbauer der Zivilisation?',
    didacticFocus: [
      'Neolithische Revolution: Wandel vom Jäger & Sammler zum sesshaften Ackerbauern und Tierhalter.',
      'Werkstoff- & Zivilisationsevolution: Faustkeil → Keramik → Kupferbeil (Ötzi) → Bronzeguss → Eisenschmiede.',
      'Arbeitsteilung & Siedlung: Domestizierung (Wolf/Hund, Vieh), Langhausbau und Tauschhandel ohne Geld.'
    ],
    tags: ['Steinzeit', 'Neolithikum', 'Bronzezeit', 'Eisenzeit', 'Ötzi', 'Ackerbau'],
    companionMaterials: [
      {
        title: 'Begleitende Aufgabenstellung zur Neolithischen Revolution',
        type: 'task',
        url: '#',
        badge: 'Klasse 5/6'
      }
    ]
  },
  {
    id: 'kemet-altes-aegypten',
    title: 'Kemet – Das Geschenk des Nils',
    shortTitle: 'Altes Ägypten',
    subtitle: 'Hochkultur am Nil',
    epoch: 'Altes Ägypten',
    epochCategory: 'antike',
    period: 'ca. 3.000 v. Chr. – 30 v. Chr.',
    yearStart: -3000,
    yearEnd: -30,
    grade: 'Klasse 5 / 6',
    chaptersCount: 6,
    duration: 'ca. 45–60 Min.',
    liveUrl: 'https://retrolernspielegypt.vercel.app/',
    coverImage: '/assets/covers/egypt_cover.png',
    spriteImage: '/assets/sprites/egypt_hero.png',
    theme: {
      primary: '#d97706',
      accent: '#f59e0b',
      badgeBg: 'bg-amber-950/90 text-amber-300 border-amber-600',
      border: 'border-amber-500',
      glowClass: 'hover:shadow-[0_0_25px_rgba(245,158,11,0.35)]',
    },
    guidingQuestion: 'Warum bezeichnete der antike Geschichtsschreiber Herodot Ägypten als ein „Geschenk des Nils“?',
    didacticFocus: [
      'Naturraum als Lebensgrundlage: Nilschwemme (Achet), Bewässerungstechnik (Schaduf) & Nilometer.',
      'Herrschaft & Gesellschaftspyramide: Der Pharao als Gottkönig, Rolle des Wesirs und Macht der Schreiber.',
      'Götterwelt & Totenkult: Polytheismus, Ma\'at (Weltenordnung), Mumifizierung & Totengericht des Osiris.'
    ],
    tags: ['Ägypten', 'Nilkultur', 'Pharao', 'Hieroglyphen', 'Pyramiden', 'Ma\'at'],
    companionMaterials: [
      {
        title: 'Didaktische Nil-Pegel-Grafik & Schaduf-Analyse',
        type: 'pdf',
        url: '#',
        badge: 'Arbeitsblatt'
      }
    ]
  },
  {
    id: 'hellas-antikes-griechenland',
    title: 'Hellas – Von der Polis zum Weltreich',
    shortTitle: 'Antikes Griechenland',
    subtitle: 'Wiege Europas',
    epoch: 'Antikes Griechenland',
    epochCategory: 'antike',
    period: 'ca. 800 v. Chr. – 30 v. Chr.',
    yearStart: -800,
    yearEnd: -30,
    grade: 'Klasse 5 / 6',
    chaptersCount: 10,
    duration: 'ca. 60–75 Min.',
    liveUrl: 'https://retrolernspielgreece.vercel.app/',
    coverImage: '/assets/covers/greek_cover.png',
    spriteImage: '/assets/sprites/greek_hero.png',
    theme: {
      primary: '#0284c7',
      accent: '#38bdf8',
      badgeBg: 'bg-sky-950/90 text-sky-300 border-sky-600',
      border: 'border-sky-500',
      glowClass: 'hover:shadow-[0_0_25px_rgba(56,189,248,0.35)]',
    },
    guidingQuestion: 'Wie legten die griechischen Stadtstaaten das Fundament für Demokratie, Philosophie und europäische Kultur?',
    didacticFocus: [
      'Naturraum & Griechische Kolonisation: Inseln, Seefahrt und Kolonisation („Frösche um den Teich“).',
      'Verfassungsvergleich: Attische Demokratie (Volksversammlung, Scherbengericht) vs. Spartanischer Kriegerstaat.',
      'Kulturelle Einheit: Die 12 olympischen Götter, Orakel von Delphi & die Olympischen Spiele (Gottesfrieden).',
      'Welthistorische Konflikte: Perserkriege (Marathon, Salamis) und der Alexanderzug bis nach Indien.'
    ],
    tags: ['Griechenland', 'Polis', 'Athen', 'Sparta', 'Olymp', 'Alexander der Große'],
    companionMaterials: [
      {
        title: 'Verfassungsschema Athen vs. Sparta',
        type: 'pdf',
        url: '#',
        badge: 'Übersicht'
      }
    ]
  },
  {
    id: 'roma-aeterna-roemisches-reich',
    title: 'Imperium Romanum: Roma Aeterna',
    shortTitle: 'Altes Rom',
    subtitle: 'Vom Dorf zum Weltreich',
    epoch: 'Römisches Reich',
    epochCategory: 'antike',
    period: '753 v. Chr. – 476 n. Chr.',
    yearStart: -753,
    yearEnd: 476,
    grade: 'Klasse 6',
    chaptersCount: 12,
    duration: 'ca. 60–90 Min.',
    liveUrl: 'https://retrospielrome.vercel.app/',
    coverImage: '/assets/covers/rome_cover.png',
    spriteImage: '/assets/sprites/rome_hero.png',
    theme: {
      primary: '#dc2626',
      accent: '#fbbf24',
      badgeBg: 'bg-red-950/90 text-amber-300 border-red-600',
      border: 'border-red-600',
      glowClass: 'hover:shadow-[0_0_25px_rgba(220,38,38,0.35)]',
    },
    guidingQuestion: 'Wie gelang es Rom, von einer bescheidenen Siedlung am Tiber zur beherrschenden Supermacht des Mittelmeers aufzusteigen?',
    didacticFocus: [
      'Vom Stadtstaat zur Weltmacht: Mythos (Romulus & Remus), Vertreibung der Könige & Ständekämpfe.',
      'Krise der Republik: Punische Kriege (Hannibal), Sklavenaufstand des Spartacus & Gaius Julius Caesar.',
      'Kaiserzeit & Romanisierung: Pax Romana unter Augustus, römische Ingenieurskunst (Aquädukte, Limes) bis zum Zerfall 476 n. Chr.'
    ],
    tags: ['Rom', 'Senat', 'Caesar', 'Legionen', 'Aquädukte', 'Kolosseum', 'Pax Romana'],
    companionMaterials: [
      {
        title: 'Zeitleiste der Römischen Republik & Kaiserzeit',
        type: 'pdf',
        url: '#',
        badge: 'Zeitleiste'
      }
    ]
  },
  {
    id: 'germanen-vom-langhaus-zum-limes',
    title: 'Die Germanen: Vom Langhaus zum Limes',
    shortTitle: 'Die Germanen',
    subtitle: 'Vom Langhaus zum Limes',
    epoch: 'Die Germanen',
    epochCategory: 'antike',
    period: 'ca. 10 v. Chr. – 350 n. Chr.',
    yearStart: -10,
    yearEnd: 350,
    grade: 'Klasse 6',
    chaptersCount: 8,
    duration: 'ca. 60–75 Min.',
    liveUrl: 'https://retrolernspielgermanic.vercel.app',
    coverImage: '/assets/covers/german_cover.png',
    spriteImage: '/assets/sprites/german_hero.png',
    theme: {
      primary: '#15803d',
      accent: '#d97706',
      badgeBg: 'bg-emerald-950/90 text-amber-300 border-emerald-600',
      border: 'border-emerald-600',
      glowClass: 'hover:shadow-[0_0_25px_rgba(21,128,61,0.35)]',
    },
    guidingQuestion: 'Wie lebten die germanischen Sippen im Schatten des Römischen Reiches – und wie wandelten sie sich von freien Stämmen zu Mitgestaltern Europas?',
    didacticFocus: [
      'Alltag, Siedlung & Sippe: Das Wohnstallhaus als Lebenszentrum von Mensch und Vieh, Spelzweizen-Ackerbau und Vorratshaltung.',
      'Technologie & Glaubenswelt: Eisengewinnung aus Raseneisenerz im Rennofen, Naturheiligtümer im Moor und Seherinnen (Völva).',
      'Recht & Kulturtransfer: Thing-Versammlung (Wergeld statt Blutrache), friedlicher Handel (Waldgirmes) und die Varusschlacht bei Kalkriese (9 n. Chr.).',
      'Grenze & Wandel: Alltag am Obergermanischen Limes (Zollgrenze & Vicus) bis zum Föderaten-Bündnis der Spätantike.'
    ],
    tags: ['Germanen', 'Langhaus', 'Rennofen', 'Thing', 'Kalkriese', 'Varusschlacht', 'Limes', 'Föderaten'],
    companionMaterials: [
      {
        title: 'Didaktische Analyse: Wohnstallhaus & Rennofen-Technik',
        type: 'pdf',
        url: '#',
        badge: 'Arbeitsblatt'
      }
    ]
  }
];

export const EPOCH_CATEGORIES = [
  { id: 'all', label: 'Alle Epochen' },
  { id: 'urgeschichte', label: 'Ur- & Frühgeschichte' },
  { id: 'antike', label: 'Antike Hochkulturen' },
  { id: 'mittelalter', label: 'Mittelalter' },
  { id: 'neuzeit', label: 'Neuzeit & Moderne' },
];
