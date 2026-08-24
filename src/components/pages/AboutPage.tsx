import { Envelope, Heart } from '@phosphor-icons/react';
import { translations, Language } from '@/lib/translations';
import { InteractiveMap } from '@/components/InteractiveMap';

interface AboutPageProps {
  language: Language;
}

export function AboutPage({ language }: AboutPageProps) {
  const t = translations[language].about;

  return (
    <div className="max-w-4xl mx-auto px-6 py-24 md:py-32">
      <div className="text-center mb-20">
        <Heart className="w-12 h-12 mx-auto mb-8 text-accent" weight="thin" />
        <h1 className="text-5xl md:text-7xl text-display mb-6 text-foreground">
          {t.title}
        </h1>
      </div>

      <div className="elegant-border pt-16 pb-16 mb-20">
        <div className="text-lg md:text-xl leading-relaxed text-foreground/80 text-center max-w-3xl mx-auto font-light space-y-6">
          {t.story.split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>

      <div className="mb-20">
        <h2 className="text-3xl md:text-4xl text-display text-center mb-8 text-foreground">
          Our Journey Together
        </h2>
        <InteractiveMap />
      </div>

      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Envelope className="w-6 h-6 text-accent" weight="thin" />
          <h2 className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {t.contact}
          </h2>
        </div>
        <a 
          href={`mailto:${t.email}`}
          className="text-base text-foreground hover:text-accent transition-colors"
        >
          {t.email}
        </a>
      </div>
    </div>
  );
}