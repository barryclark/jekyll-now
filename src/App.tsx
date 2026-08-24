import { useState, useEffect } from 'react';
import { useKV } from '@github/spark/hooks';
import { Toaster } from '@/components/ui/sonner';
import { Header } from '@/components/Header';
import { HomePage } from '@/components/pages/HomePage';
import { AboutPage } from '@/components/pages/AboutPage';
import { SchedulePage } from '@/components/pages/SchedulePage';
import { RSVPPage } from '@/components/pages/RSVPPage';
import { FAQPage } from '@/components/pages/FAQPage';
import { TravelPage } from '@/components/pages/TravelPage';
import { VenuePage } from '@/components/pages/VenuePage';
import { RegistryPage } from '@/components/pages/RegistryPage';
import { Language } from '@/lib/translations';
import { weddingConfig } from '@/lib/config';

function App() {
  const [language, setLanguage] = useKV<Language>('language', 'en');
  const [currentPage, setCurrentPage] = useState('home');
  const [isRetro, setIsRetro] = useState(false);
  const [showExplosion, setShowExplosion] = useState(false);
  const [showDino, setShowDino] = useState(false);

  const currentLanguage: Language = language || 'en';

  const handleDiscoBallClick = () => {
    setShowExplosion(true);
    setTimeout(() => {
      setIsRetro(true);
      setShowExplosion(false);
      // Show dinosaur 2 seconds after explosion
      setTimeout(() => {
        setShowDino(true);
      }, 2000);
      
      // Reset after 10 seconds
      setTimeout(() => {
        setIsRetro(false);
        setShowDino(false);
      }, 10000);
    }, 1500);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage language={currentLanguage} onNavigate={setCurrentPage} />;
      case 'about':
        return <AboutPage language={currentLanguage} />;
      case 'schedule':
        return <SchedulePage language={currentLanguage} />;
      case 'rsvp':
        return <RSVPPage language={currentLanguage} />;
      case 'faq':
        return <FAQPage language={currentLanguage} />;
      case 'travel':
        return <TravelPage language={currentLanguage} />;
      case 'venue':
        return <VenuePage language={currentLanguage} />;
      case 'registry':
        return <RegistryPage language={currentLanguage} />;
      default:
        return <HomePage language={currentLanguage} onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className={`min-h-screen ${isRetro ? 'retro-theme' : 'bg-background'}`}>
      {showExplosion && (
        <div className="explosion-container">
          <div className="explosion"></div>
        </div>
      )}
      {showDino && (
        <div className="dino-container">
          <div className="trex">
            <span className="party-hat">🎉</span>
            🦖
          </div>
        </div>
      )}
      <Header
        language={currentLanguage}
        onLanguageChange={setLanguage}
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        onDiscoBallClick={handleDiscoBallClick}
      />
      <main className="pb-12">
        {renderPage()}
      </main>
      <footer className="border-t border-border bg-background py-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
            {weddingConfig.couple.names} • {currentLanguage === 'en' ? weddingConfig.date.displayEn : weddingConfig.date.displayFr}
          </p>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {currentLanguage === 'en' ? weddingConfig.venue.fullName : weddingConfig.venue.fullNameFr}, {weddingConfig.venue.city}, {weddingConfig.venue.province}
          </p>
        </div>
      </footer>
      <Toaster />
    </div>
  );
}

export default App;