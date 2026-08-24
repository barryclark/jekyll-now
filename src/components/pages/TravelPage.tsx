import { Airplane, Car, Bus, Buildings, CloudSun, MapPin } from '@phosphor-icons/react';
import { translations, Language } from '@/lib/translations';

interface TravelPageProps {
  language: Language;
}

export function TravelPage({ language }: TravelPageProps) {
  const t = translations[language].travel;

  const travelSections = [
    {
      icon: Airplane,
      title: t.byAir,
      content: t.byAirDesc,
      link: null,
      linkText: null
    },
    {
      icon: Car,
      title: t.byCar,
      content: t.byCarDesc,
      link: null,
      linkText: null
    },
    {
      icon: Bus,
      title: t.byTransit,
      content: t.byTransitDesc,
      link: t.byTransitLink,
      linkText: t.byTransitLinkText
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-24 md:py-32">
      <div className="text-center mb-20">
        <MapPin className="w-12 h-12 mx-auto mb-8 text-accent" weight="thin" />
        <h1 className="text-5xl md:text-7xl text-display mb-6 text-foreground">
          {t.title}
        </h1>
      </div>

      <div className="elegant-border pt-16 pb-20">
        <h2 className="text-2xl md:text-3xl text-display text-center mb-12 text-foreground">
          {t.gettingThere}
        </h2>
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {travelSections.map((section, index) => {
            const Icon = section.icon;
            return (
              <div key={index} className="text-center">
                <Icon className="w-10 h-10 mx-auto text-accent mb-4" weight="thin" />
                <h3 className="text-sm uppercase tracking-[0.2em] mb-3 text-foreground font-medium">
                  {section.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {section.content}
                </p>
                {section.link && (
                  <a
                    href={section.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-sm text-accent hover:underline"
                  >
                    {section.linkText}
                  </a>
                )}
              </div>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="text-center">
            <Buildings className="w-10 h-10 mx-auto text-accent mb-4" weight="thin" />
            <h3 className="text-sm uppercase tracking-[0.2em] mb-3 text-foreground font-medium">
              {t.hotels}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t.hotelsDesc}
            </p>
          </div>

          <div className="text-center">
            <CloudSun className="w-10 h-10 mx-auto text-accent mb-4" weight="thin" />
            <h3 className="text-sm uppercase tracking-[0.2em] mb-3 text-foreground font-medium">
              {t.weather}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t.weatherDesc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}