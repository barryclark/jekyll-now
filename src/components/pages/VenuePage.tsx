import { MapTrifold } from '@phosphor-icons/react';
import { translations, Language } from '@/lib/translations';

interface VenuePageProps {
  language: Language;
}

export function VenuePage({ language }: VenuePageProps) {
  const t = translations[language].venue;

  return (
    <div className="max-w-4xl mx-auto px-6 py-24 md:py-32">
      <div className="text-center mb-12">
        <MapTrifold className="w-12 h-12 mx-auto mb-8 text-accent" weight="thin" />
        <h1 className="text-5xl md:text-7xl text-display mb-6 text-foreground">
          {t.title}
        </h1>
      </div>

      {/* Venue Photo - subtle, black and white */}
      <div className="mb-20 overflow-hidden rounded-lg">
        <img
          src="/images/fritz.jpg"
          alt={t.name}
          className="w-full h-48 md:h-64 object-cover grayscale opacity-80"
        />
      </div>

      <div className="pt-8 pb-16 mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl text-display mb-4 text-foreground">
            {t.name}
          </h2>
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-8">
            {t.address}
          </p>
          <p className="text-base md:text-lg leading-relaxed text-foreground/80 max-w-2xl mx-auto">
            {t.description}
          </p>
        </div>
      </div>

      <div className="aspect-video bg-muted border border-border overflow-hidden relative group">
        <iframe
          src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Fritz+Community+Center,Baie-d'Urfé,QC,Canada&zoom=15"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={t.name}
        />
        <a
          href="https://www.google.com/maps/search/?api=1&query=20477+Rue+Lakeshore,+Baie-d'Urfé,+QC+H9X+1R3"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/10 transition-colors cursor-pointer"
          aria-label={language === 'fr' ? 'Ouvrir dans Google Maps' : 'Open in Google Maps'}
        >
          <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium text-foreground shadow-lg">
            {language === 'fr' ? 'Ouvrir dans Google Maps' : 'Open in Google Maps'}
          </span>
        </a>
      </div>
    </div>
  );
}