import { Clock, Martini, ForkKnife, MusicNotes, UsersThree, Coffee } from '@phosphor-icons/react';
import { translations, Language } from '@/lib/translations';

interface SchedulePageProps {
  language: Language;
}

export function SchedulePage({ language }: SchedulePageProps) {
  const t = translations[language].schedule;

  const daySections = [
    {
      day: t.days.friday,
      items: [
        {
          icon: ForkKnife,
          time: t.welcomeDinnerTime,
          event: t.welcomeDinnerTitle,
          desc: t.welcomeDinnerDesc,
        },
      ],
    },
    {
      day: t.days.saturday,
      items: [
        { icon: UsersThree, time: t.arrivalTime, event: t.arrival },
        { icon: Clock, time: t.ceremonyTime, event: t.ceremony },
        { icon: Martini, time: t.cocktailTime, event: t.cocktail },
        { icon: ForkKnife, time: t.dinnerTime, event: t.dinner },
        { icon: MusicNotes, time: t.dancingTime, event: t.dancing },
      ],
    },
    {
      day: t.days.sunday,
      items: [
        {
          icon: Coffee,
          time: t.sundayPicnicTime,
          event: t.sundayPicnicTitle,
          desc: t.sundayPicnicDesc,
        },
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-24 md:py-32">
      <div className="text-center mb-20">
        <Clock className="w-12 h-12 mx-auto mb-8 text-accent" weight="thin" />
        <h1 className="text-5xl md:text-7xl text-display mb-6 text-foreground">
          {t.title}
        </h1>
      </div>

      <div className="elegant-border pt-16">
        <div className="max-w-2xl mx-auto space-y-16">
          {daySections.map((section) => (
            <div key={section.day}>
              <h2 className="text-2xl md:text-3xl text-display text-foreground mb-10">
                {section.day}
              </h2>

              <div className="space-y-12">
                {section.items.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="flex items-start gap-8 md:gap-12">
                      <div className="flex-shrink-0 w-24 md:w-32 text-right">
                        <div className="text-xl md:text-2xl text-display text-accent">
                          {item.time}
                        </div>
                      </div>

                      <div className="flex-shrink-0 pt-2">
                        <Icon className="w-6 h-6 text-muted-foreground" weight="thin" />
                      </div>

                      <div className="flex-grow pt-1">
                        <h3 className="text-xl md:text-2xl font-light text-foreground">
                          {item.event}
                        </h3>

                        {item.desc && (
                          <p className="mt-2 text-sm md:text-base text-muted-foreground leading-relaxed">
                            {item.desc}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-12 border-t border-border max-w-2xl mx-auto">
          <p className="text-center text-sm md:text-base text-muted-foreground italic">
            {t.timingNote}
          </p>
        </div>
      </div>
    </div>
  );
}
