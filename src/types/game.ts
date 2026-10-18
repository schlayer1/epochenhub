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
}

export interface PassportProgress {
  exploredGames: string[]; // List of game IDs marked as explored
  stampsCount: number;
  lastExploredDate?: string;
}
