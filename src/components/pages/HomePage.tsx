import { CalendarDots, MapPin, ArrowRight } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { useCountdown } from '@/hooks/use-countdown';
import { translations, Language } from '@/lib/translations';
import { weddingConfig } from '@/lib/config';

interface HomePageProps {
  language: Language;
  onNavigate: (page: string) => void;
}

export function HomePage({ language, onNavigate }: HomePageProps) {
  const t = translations[language].home;
  const weddingDate = new Date(`${weddingConfig.date.year}-${String(weddingConfig.date.month).padStart(2, '0')}-${String(weddingConfig.date.day).padStart(2, '0')}T16:00:00`);
  const { timeLeft, isComplete } = useCountdown(weddingDate);

  return (
    <div className="min-h-screen">
      <div className="hero-pattern py-32 md:py-48 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl lg:text-9xl text-display mb-16 text-foreground">
            {t.names}
          </h1>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mb-12 text-sm uppercase tracking-[0.2em]">
            <div className="flex items-center gap-3">
              <CalendarDots className="w-5 h-5 text-accent" />
              <span className="font-medium text-foreground">{t.date}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-accent" />
              <div className="text-center md:text-left">
                <div className="font-medium text-foreground">{t.location}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-24">
        <div className="elegant-border pt-16 pb-20">
          <h2 className="text-3xl md:text-4xl text-display text-center mb-16 text-foreground tracking-wide">
            {isComplete ? t.married : t.countdownTitle}
          </h2>
          
          {!isComplete && (
            <div className="grid grid-cols-4 gap-6 md:gap-12 max-w-4xl mx-auto">
              {[
                { value: timeLeft.days, label: t.days },
                { value: timeLeft.hours, label: t.hours },
                { value: timeLeft.minutes, label: t.minutes },
                { value: timeLeft.seconds, label: t.seconds }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-6xl text-display-bold text-accent mb-2">
                    {item.value.toString().padStart(2, '0')}
                  </div>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 pb-32">
        <div className="grid md:grid-cols-3 gap-6">
          <button 
            onClick={() => onNavigate('schedule')}
            className="group border border-border py-8 px-6 text-center hover:border-accent transition-all duration-300"
          >
            <div className="text-sm uppercase tracking-[0.2em] text-foreground mb-2 group-hover:text-accent transition-colors">
              {translations[language].nav.schedule}
            </div>
            <ArrowRight className="w-5 h-5 mx-auto text-muted-foreground group-hover:text-accent transition-colors" />
          </button>
          <button 
            onClick={() => onNavigate('rsvp')}
            className="group bg-accent border border-accent py-8 px-6 text-center hover:bg-accent/90 transition-all duration-300"
          >
            <div className="text-sm uppercase tracking-[0.2em] text-accent-foreground mb-2">
              {translations[language].nav.rsvp}
            </div>
            <ArrowRight className="w-5 h-5 mx-auto text-accent-foreground" />
          </button>
          <button 
            onClick={() => onNavigate('travel')}
            className="group border border-border py-8 px-6 text-center hover:border-accent transition-all duration-300"
          >
            <div className="text-sm uppercase tracking-[0.2em] text-foreground mb-2 group-hover:text-accent transition-colors">
              {translations[language].nav.travel}
            </div>
            <ArrowRight className="w-5 h-5 mx-auto text-muted-foreground group-hover:text-accent transition-colors" />
          </button>
        </div>
      </div>
    </div>
  );
}