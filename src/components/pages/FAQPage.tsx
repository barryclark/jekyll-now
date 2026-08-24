import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Question } from '@phosphor-icons/react';
import { translations, Language } from '@/lib/translations';

interface FAQPageProps {
  language: Language;
}

export function FAQPage({ language }: FAQPageProps) {
  const t = translations[language].faq;

const faqs = [
  { q: t.timing.q, a: t.timing.a },
  { q: t.dress.q, a: t.dress.a },
  { q: t.food.q, a: t.food.a },
  { q: t.parking.q, a: t.parking.a },
  { q: t.lodging.q, a: t.lodging.a },
  { q: t.gifts.q, a: t.gifts.a },
];


  return (
    <div className="max-w-4xl mx-auto px-6 py-24 md:py-32">
      <div className="text-center mb-20">
        <Question className="w-12 h-12 mx-auto mb-8 text-accent" weight="thin" />
        <h1 className="text-5xl md:text-7xl text-display mb-6 text-foreground">
          {t.title}
        </h1>
      </div>

      <div className="elegant-border pt-16">
        <Accordion type="single" collapsible className="space-y-8">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border-b border-border last:border-0"
            >
              <AccordionTrigger className="text-lg md:text-xl font-light text-left hover:text-accent hover:no-underline py-4">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed pb-6 max-w-2xl">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
