import { Gift } from '@phosphor-icons/react';
import { translations, Language } from '@/lib/translations';

interface RegistryPageProps {
  language: Language;
}

export function RegistryPage({ language }: RegistryPageProps) {
  const t = translations[language].registry;

  return (
    <div className="max-w-4xl mx-auto px-6 py-24 md:py-32">
      <div className="text-center mb-20">
        <Gift className="w-12 h-12 mx-auto mb-8 text-accent" weight="thin" />
        <h1 className="text-5xl md:text-7xl text-display mb-6 text-foreground">
          {t.title}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground font-light italic">
          {t.subtitle}
        </p>
      </div>

      <div className="elegant-border pt-16">
        <p className="text-base md:text-lg leading-relaxed text-foreground/80 max-w-2xl mx-auto text-center mb-16">
          {t.description}
        </p>

        <div className="grid gap-8 md:grid-cols-2 max-w-xl mx-auto mb-16">
          <div className="border border-border rounded-lg p-8 text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
              {t.venmoLabel}
            </p>
            <a
              href="https://venmo.com/u/afnorfolk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-medium text-accent hover:underline"
            >
              {t.venmoValue}
            </a>
          </div>
          <div className="border border-border rounded-lg p-8 text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
              {t.etransferLabel}
            </p>
            <p className="text-sm md:text-base font-medium text-foreground break-all">
              {t.etransferValue}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
