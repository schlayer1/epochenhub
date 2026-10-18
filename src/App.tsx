import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { TimelineView } from './components/TimelineView';
import { GridView } from './components/GridView';
import { GameModal } from './components/GameModal';
import { PassportModal } from './components/PassportModal';
import { QrCodeModal } from './components/QrCodeModal';
import { Footer } from './components/Footer';
import { EPOCH_GAMES } from './config/games.config';
import { EpochGame } from './types/game';
import { storageService } from './services/storageService';

export const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<'timeline' | 'grid'>('timeline');
  const [isCrtEnabled, setIsCrtEnabled] = useState(false);
  
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedGrade, setSelectedGrade] = useState('all');

  // Modals State
  const [selectedGame, setSelectedGame] = useState<EpochGame | null>(null);
  const [qrGame, setQrGame] = useState<EpochGame | null>(null);
  const [isPassportOpen, setIsPassportOpen] = useState(false);

  // Zeitreise-Pass Progress
  const [exploredGameIds, setExploredGameIds] = useState<string[]>(() => {
    return storageService.getProgress().exploredGames;
  });

  // Calculate Total Chapters
  const totalChapters = useMemo(() => {
    return EPOCH_GAMES.reduce((sum, g) => sum + g.chaptersCount, 0);
  }, []);

  // Filtered Games
  const filteredGames = useMemo(() => {
    return EPOCH_GAMES.filter((game) => {
      // Category Filter
      if (selectedCategory !== 'all' && game.epochCategory !== selectedCategory) {
        return false;
      }

      // Grade Filter
      if (selectedGrade === '5' && !game.grade.includes('5')) {
        return false;
      }
      if (selectedGrade === '6' && !game.grade.includes('6')) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = game.title.toLowerCase().includes(query);
        const matchesSubtitle = game.subtitle.toLowerCase().includes(query);
        const matchesEpoch = game.epoch.toLowerCase().includes(query);
        const matchesQuestion = game.guidingQuestion.toLowerCase().includes(query);
        const matchesTags = game.tags.some(tag => tag.toLowerCase().includes(query));

        if (!matchesTitle && !matchesSubtitle && !matchesEpoch && !matchesQuestion && !matchesTags) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedGrade]);

  const handleToggleStamp = (gameId: string) => {
    const result = storageService.toggleStamp(gameId);
    setExploredGameIds(storageService.getProgress().exploredGames);
    return result;
  };

  const handleResetPassport = () => {
    storageService.resetProgress();
    setExploredGameIds([]);
  };

  return (
    <div className={`min-h-screen flex flex-col bg-[#0c0b10] text-slate-100 selection:bg-amber-500 selection:text-slate-950 ${isCrtEnabled ? 'crt-overlay' : ''}`}>
      
      {/* Sticky Header with Navigation, Sound & Passport Status */}
      <Header
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onOpenPassport={() => setIsPassportOpen(true)}
        isCrtEnabled={isCrtEnabled}
        onToggleCrt={() => setIsCrtEnabled(prev => !prev)}
      />

      {/* Hero Section with Search, Metrics & Category Pills */}
      <HeroSection
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        selectedGrade={selectedGrade}
        onSelectGrade={setSelectedGrade}
        totalChapters={totalChapters}
        totalGames={EPOCH_GAMES.length}
      />

      {/* Main Content Area: Fluid Responsive Container */}
      <main className="flex-1 w-full max-w-[2100px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-6 sm:py-8">
        
        {viewMode === 'timeline' ? (
          <TimelineView
            games={filteredGames}
            exploredGameIds={exploredGameIds}
            onOpenDetails={(game) => setSelectedGame(game)}
            onOpenQr={(game) => setQrGame(game)}
          />
        ) : (
          <GridView
            games={filteredGames}
            exploredGameIds={exploredGameIds}
            onOpenDetails={(game) => setSelectedGame(game)}
            onOpenQr={(game) => setQrGame(game)}
          />
        )}

      </main>

      {/* Interactive Epochen-Modal & Hero-Bühne */}
      <GameModal
        game={selectedGame}
        isOpen={Boolean(selectedGame)}
        onClose={() => setSelectedGame(null)}
        isExplored={selectedGame ? exploredGameIds.includes(selectedGame.id) : false}
        onToggleStamp={handleToggleStamp}
        onOpenQr={(game) => {
          setSelectedGame(null);
          setQrGame(game);
        }}
      />

      {/* Zeitreise-Pass Modal */}
      <PassportModal
        isOpen={isPassportOpen}
        onClose={() => setIsPassportOpen(false)}
        games={EPOCH_GAMES}
        exploredGameIds={exploredGameIds}
        onToggleStamp={handleToggleStamp}
        onResetPassport={handleResetPassport}
      />

      {/* Instant QR-Code Modal (for Smartboards & Tablets) */}
      <QrCodeModal
        game={qrGame}
        isOpen={Boolean(qrGame)}
        onClose={() => setQrGame(null)}
      />

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default App;
