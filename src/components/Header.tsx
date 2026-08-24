import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { List } from '@phosphor-icons/react';
import { translations, Language } from '@/lib/translations';
import { useIsMobile } from '@/hooks/use-mobile';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  currentPage: string;
  onNavigate: (page: string) => void;
  onDiscoBallClick?: () => void;
}

export function Header({ language, onLanguageChange, currentPage, onNavigate, onDiscoBallClick }: HeaderProps) {
  const t = translations[language].nav;
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { key: 'home', label: t.home },
    { key: 'about', label: t.about },
    { key: 'schedule', label: t.schedule },
    { key: 'rsvp', label: t.rsvp },
    { key: 'faq', label: t.faq },
    { key: 'travel', label: t.travel },
    { key: 'venue', label: t.venue },
    { key: 'registry', label: t.registry }
  ];

  const handleNavClick = (page: string) => {
    onNavigate(page);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-6 md:px-12 h-20 flex items-center relative">
        <div className="flex-1 flex items-center gap-4">
          <button
            onClick={onDiscoBallClick}
            className="disco-ball-button-header"
            aria-label="Activate disco mode"
          >
            🪩
          </button>
          <button
            onClick={() => onNavigate('home')}
            className="text-2xl md:text-3xl text-display text-foreground hover:text-accent transition-colors"
          >
            J & A
          </button>
        </div>

        {!isMobile && (
          <nav className="flex items-center gap-8 flex-shrink-0">
            {navItems.map(item => (
              <button
                key={item.key}
                onClick={() => onNavigate(item.key)}
                className={`text-xs uppercase tracking-[0.15em] font-medium transition-colors relative ${
                  currentPage === item.key ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.label}
                {currentPage === item.key && (
                  <span className="absolute -bottom-[25px] left-0 right-0 h-[1px] bg-accent" />
                )}
              </button>
            ))}
          </nav>
        )}

        <div className="flex-1 flex items-center justify-end gap-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onLanguageChange('en')}
              className={`text-xs uppercase tracking-[0.15em] font-medium transition-colors ${
                language === 'en' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              EN
            </button>
            <span className="text-muted-foreground">|</span>
            <button
              onClick={() => onLanguageChange('fr')}
              className={`text-xs uppercase tracking-[0.15em] font-medium transition-colors ${
                language === 'fr' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              FR
            </button>
          </div>

          {isMobile && (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10">
                  <List className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px]">
                <nav className="flex flex-col gap-1 mt-12">
                  {navItems.map(item => (
                    <button
                      key={item.key}
                      onClick={() => handleNavClick(item.key)}
                      className={`text-left text-sm uppercase tracking-[0.15em] font-medium py-4 px-4 transition-colors ${
                        currentPage === item.key
                          ? 'text-foreground bg-muted'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  );
}