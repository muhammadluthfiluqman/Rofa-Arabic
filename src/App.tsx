import React, { useState } from 'react';
import { PageTab } from './types';
import { AuthProvider } from './contexts/AuthContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PetunjukPenggunaanSection } from './components/PetunjukPenggunaanSection';
import { MateriSection } from './components/MateriSection';
import { GameSection } from './components/GameSection';
import { TestimoniSection } from './components/TestimoniSection';
import { KontakSection } from './components/KontakSection';
import { TentangKamiSection } from './components/TentangKamiSection';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { ProgressModal } from './components/ProgressModal';
import { Gamepad2 } from 'lucide-react';

function AppContent() {
  const [currentTab, setCurrentTab] = useState<PageTab>('beranda');

  // Smooth scroll to top when changing tab
  const handleSelectTab = (tab: PageTab) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1E293B] font-sans flex flex-col selection:bg-[#EC853E] selection:text-white w-full max-w-full overflow-x-hidden">
      {/* Top Header Navbar */}
      <Navbar currentTab={currentTab} onSelectTab={handleSelectTab} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 overflow-x-hidden">
        {currentTab === 'beranda' && (
          <HeroSection onNavigate={handleSelectTab} />
        )}

        {currentTab === 'petunjuk' && (
          <PetunjukPenggunaanSection onStartLearning={handleSelectTab} />
        )}

        {currentTab === 'materi' && (
          <MateriSection />
        )}

        {currentTab === 'game' && (
          <GameSection />
        )}

        {currentTab === 'testimoni' && (
          <TestimoniSection />
        )}

        {currentTab === 'kontak' && (
          <KontakSection />
        )}

        {currentTab === 'tentang' && (
          <TentangKamiSection onNavigate={handleSelectTab} />
        )}
      </main>

      {/* Floating Quick Action Button on Mobile for "Mulai Bermain" when on other tabs */}
      {currentTab !== 'game' && (
        <div className="fixed bottom-6 right-6 z-30 sm:hidden">
          <button
            onClick={() => handleSelectTab('game')}
            className="px-4 py-3 bg-[#EC853E] text-white rounded-full font-bold text-xs shadow-2xl flex items-center gap-2 border-2 border-white ring-4 ring-orange-400/30 active:scale-95 transition-transform"
            aria-label="Mulai Bermain Game Bahasa Arab"
          >
            <Gamepad2 className="w-5 h-5 animate-bounce" />
            <span>Mulai Bermain!</span>
          </button>
        </div>
      )}

      {/* Bottom Footer */}
      <Footer onNavigate={handleSelectTab} />

      {/* Global Modals for Auth and Progress */}
      <AuthModal />
      <ProgressModal />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
