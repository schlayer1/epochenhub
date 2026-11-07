export interface CompanionMaterial {
  title: string;
  type: 'pdf' | 'quiz' | 'task' | 'kahoot' | 'menti';
  url: string;
  badge?: string;
}

export interface EpochGame {
  id: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  epoch: string;
  epochCategory: 'urgeschichte' | 'antike' | 'mittelalter' | 'neuzeit';
  period: string;
  yearStart: number;
  yearEnd: number;
  grade: string;
  chaptersCount: number;
  duration: string;
  liveUrl: string;
  coverImage: string;
  spriteImage?: string;
  theme: {
    primary: string;     // Hex / Tailwind
    accent: string;
    badgeBg: string;
    border: string;
    glowClass: string;
  };
  guidingQuestion: string;
  didacticFocus: string[];
  tags: string[];
  companionMaterials?: CompanionMaterial[];
  githubRepo?: string;
  localFolderName?: string;
}

export interface GameUpdateInfo {
  repo: string;
  updatedAt: string;        // ISO timestamp
  formattedDate: string;    // e.g. "07.11.2026"
  formattedTime: string;    // e.g. "14:09 Uhr"
  displayLabel: string;     // e.g. "Letztes Update am 07.11.2026 um 14:09 Uhr"
  commitMessage?: string;
  commitSha?: string;
  commitUrl?: string;
}

export interface PassportProgress {
  exploredGames: string[]; // List of game IDs marked as explored
  stampsCount: number;
  lastExploredDate?: string;
}
