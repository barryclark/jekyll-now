import { weddingConfig } from './config';

export const translations = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      schedule: "Schedule",
      rsvp: "RSVP",
      faq: "FAQ",
      travel: "Travel",
      venue: "Venue",
      registry: "Registry",
      saveTheDate: "Save the date"
    },
    home: {
      title: "We're getting married!",
      names: weddingConfig.couple.names,
      date: weddingConfig.date.displayEn,
      location: weddingConfig.venue.name,
      locationDetail: `${weddingConfig.venue.city}, ${weddingConfig.venue.province}`,
      countdownTitle: "Countdown to our big day",
      days: "Days",
      hours: "Hours",
      minutes: "Minutes",
      seconds: "Seconds",
      married: "We're married!",
      quickLinks: "Quick links"
    },
    about: {
      title: "Our story",
      story: `Alex and Justine met in Montreal late in February 2020. Just as their relationship was beginning, the world was ending. Two weeks after they met, the global pandemic would close down the city, forcing them to navigate a new world together.  But, as Miles Cameron wrote, “all the best romances bloom in the midst of a good siege.” Those early days were spent either in the kitchen, sharing their love of cooking, or in front of the T.V. watching the Hab’s historic 2021 run for Stanley Cup, which they sadly lost due to some uncharacteristic errors early in Game 3, when the Habs allowed two goals in the first 3:30 of the game after Josh Anderson failed to clear the puck along the boards. The rest is history. 

If the first few years were spent grounded, the next few were spent on the road, traveling back and forth between Virginia, Florida, Maryland, and the Outer Banks. There were cottages and mushroom foraging, weddings and oyster roasts, holiday traditions kept and made, one oven fire (no one’s fault), several grill fires (not Alex's fault), and many many hockey games.  In March 2023, they moved into a little apartment in Little Italy. The same week, Alex proposed (with the ring on a Habs hockey puck). 

Throughout this entire time, they have been blessed to mark the passing of each day in the richness of love and joy with family and friends. Justine calls it 'the fun times', Alex calls it 'the only memories he's ever wanted to make.'

We invite you to join us, family and friends both old and new, to celebrate our first six years together—and all the years to come.`,
      contact: "Contact",
      email: weddingConfig.couple.email
    },
schedule: {
  title: "Weekend schedule", // (or keep "Wedding day schedule" if you prefer)
  timingNote: "All times are subject to change except arrival time, which is set.",

  days: {
    friday: "Friday",
    saturday: "Saturday",
    sunday: "Sunday",
  },

  // Friday
  welcomeDinnerTitle: "Welcome dinner",
  welcomeDinnerTime: "Friday evening",
  welcomeDinnerDesc: "For those coming in from out of town, we will reach out to you with details about a casual dinner Friday night.",

  // Saturday (your existing labels)
  arrival: "Arrival",
  arrivalTime: weddingConfig.schedule.arrival,
  ceremony: "Ceremony",
  ceremonyTime: weddingConfig.schedule.ceremony,
  cocktail: "Cocktail hour",
  cocktailTime: weddingConfig.schedule.cocktail,
  dinner: "Dinner & speeches",
  dinnerTime: weddingConfig.schedule.dinner,
  dancing: "Dancing",
  dancingTime: weddingConfig.schedule.dancing,

  // Sunday
  sundayPicnicTitle: "Coffee, Croissants, and Mimosa Picnic",
  sundayPicnicTime: "11:00 AM",
  sundayPicnicDesc: "Late Sunday morning we will have a lazy picnic at Parc Jarry with croissants, coffee, and mimosas. A perfect way to wrap up the weekend!"
},

    rsvp: {
      title: "RSVP",
      subtitle: `Please respond by ${weddingConfig.rsvp.deadline.displayEn}`,
      description: "We can't wait to celebrate with you! Please fill out the form below to let us know if you'll be joining us. One RSVP per guest, please.",
      formNote: "Loading RSVP form..."
    },
    faq: {
  title: "Frequently asked questions",
  timing: {
    q: "What time should I arrive?",
    a: "Please arrive by 3:00 PM"
  },
  dress: {
    q: "What should I wear?",
    a: "The attire for the evening is formal. Men should wear a suit and tie. Women should wear a dress that falls below the knees. We love creativity and color. Please note that the ceremony will take place outside with the reception and dinner indoors. Early June in Montréal is usually quite mild."
  },
  food: {
    q: "What about food and drinks?",
    a: "Following the ceremony there will be a cocktail hour with heavy hors-d'oeuvres. This will be followed by a multi-course dinner. Drinks are on us all night! We'll have a selection of liquors, beers, and wines. If there's something special you'd like to see behind the bar, let us know your preferences in your RSVP and we'll do our best to have your favorites ready!"
  },
  parking: {
    q: "Is there parking available?",
    a: "Yes, there's parking on-site. Uber and taxis work out here too, though since we're in the suburbs, it's smart to book ahead or carpool when possible. We're also looking into renting a bus and will update everyone closer to the date. In general it's about a 30 minute drive from downtown Montréal."
  },
  lodging: {
    q: "Where should I stay?",
    a: "Montréal has an abundance of great hotels, and short-term vacation rentals are plentiful. We recommend staying in the city of Montréal as it's got a bit more life than Baie-D'Urfé. Downtown Montréal is most convenient, and the Plateau / Mile-End is great for a trendier scene. Villeray has fewer hotels but plenty of Airbnb options, and it's close to the Sunday brunch."
  },
  gifts: {
    q: "Do you have a gift registry?",
    a: "Your presence truly is the best gift! If you'd still like to give something, there will be a box for envelopes at the venue. You can also contribute to our honeymoon fund via Venmo or e-Transfer. We're saving up for a month-long trip to Vietnam next year. See the Registry page for details."
  }
},


    travel: {
  title: "Travel information",
  gettingThere: "Getting to Montreal",
  byAir: "By air",
  byAirDesc: "Montreal-Pierre Elliott Trudeau International Airport (YUL) is the city's main airport. It is approximately 30 minutes to the venue by car. The airport is also approximately 30 minutes to the city center.",
  byCar: "By car",
  byCarDesc: `${weddingConfig.venue.city} is located on the western tip of the Island of Montreal, easily accessible via Highway 20. The drive is about 30 minutes from the city center. There is on-site parking.`,
  byTransit: "By public transit",
  byTransitDesc: "The venue is accessible by the number 405 bus. By bus, the venue is about an hour from the city center. We recommend checking the STM website for current schedules and routes.",
  byTransitLink: "https://www.stm.info/en/info/networks/bus/local/line-405-west",
  byTransitLinkText: "View STM Bus Route 405",
  hotels: "Hotel recommendations",
  hotelsDesc: "We recommend staying closer to the city center since it's more lively and has better options for exploring Montréal. There are no hotel blocks, so feel free to book wherever suits you best! Downtown, the Mile-End, and the Plateau are all great neighborhoods to book a hotel or Airbnb. Villeray has fewer hotels but plenty of Airbnb options, and it's close to the Sunday brunch. For more on lodging, see the FAQ section.",
  weather: "Weather expectations",
  weatherDesc: "June in Montreal is beautiful! Expect pleasant temperatures around 20-25°C (68-77°F). We recommend bringing a light jacket for the evening. Please note, the ceremony will be outdoors on grass. The dinner and reception will be indoors."
},

    registry: {
      title: "Registry",
      subtitle: "Your presence is our present",
      description: "Honestly, the greatest gift you could give us is being there to celebrate with us. That truly is more than enough. But if you'd still like to give something, there will be a box for envelopes at the venue. You can also contribute to our honeymoon fund via Venmo or e-Transfer:",
      venmoLabel: "Venmo",
      venmoValue: "@afnorfolk",
      etransferLabel: "Interac e-Transfer",
      etransferValue: "justine.and.alex.wedding@gmail.com"
    },
    venue: {
      title: "The venue",
      name: weddingConfig.venue.fullName,
      address: weddingConfig.venue.address,
      description: `${weddingConfig.venue.fullName} is a charming venue nestled in the picturesque town of ${weddingConfig.venue.city}, overlooking beautiful Lake Saint-Louis. The center offers a warm and elegant setting perfect for celebrating our special day with family and friends.`
    },
    saveTheDate: {
      title: "Save the date",
      description: "Our save-the-date announcement sent to friends and family."
    }
  },
  fr: {
    nav: {
      home: "Accueil",
      about: "À propos",
      schedule: "Horaire",
      rsvp: "RSVP",
      faq: "FAQ",
      travel: "Voyager",
      venue: "Lieu",
      registry: "Registre",
      saveTheDate: "Réservez la date"
    },
    home: {
      title: "Nous nous marions!",
      names: weddingConfig.couple.names,
      date: weddingConfig.date.displayFr,
      location: weddingConfig.venue.nameFr,
      locationDetail: `${weddingConfig.venue.city}, ${weddingConfig.venue.province}`,
      countdownTitle: "Compte à rebours",
      days: "Jours",
      hours: "Heures",
      minutes: "Minutes",
      seconds: "Secondes",
      married: "Nous sommes mariés!",
      quickLinks: "Liens rapides"
    },
about: {
  title: "Notre histoire",
  story: `Alex et Justine se sont rencontrés à Montréal vers la fin février 2020. Au moment même où leur relation commençait, le monde, lui, s’arrêtait. Deux semaines après leur rencontre, la pandémie mondiale a mis la ville sur pause, les obligeant à apprivoiser ensemble ce nouveau monde. Mais, comme l’a écrit Miles Cameron, « les plus belles romances fleurissent au cœur d’un bon siège ». Ces premiers jours se passaient soit dans la cuisine, à partager leur amour de la cuisine, soit devant la télévision à regarder l’épopée historique des Habs en 2021 jusqu’à la finale de la Coupe Stanley — une finale malheureusement perdue à cause de quelques erreurs inhabituelles tôt dans le match 3, lorsque le Canadien a accordé deux buts dans les trois premières minutes trente, après que Josh Anderson n’ait pas réussi à dégager la rondelle le long de la bande. Le reste appartient à l’histoire.

Si les premières années se sont vécues surtout “à la maison”, les suivantes se sont passées sur la route, à voyager sans cesse entre la Virginie, la Floride, le Maryland et les Outer Banks. Il y a eu des chalets et de la cueillette de champignons, des mariages et des rôtis d’huîtres, des traditions des Fêtes conservées et inventées, un feu de four (la faute de personne), plusieurs feux de barbecue (pas la faute d’Alex), et beaucoup, beaucoup de matchs de hockey. En mars 2023, ils ont emménagé dans un petit appartement à la Petite-Italie. La même semaine, Alex a fait sa demande en mariage (avec la bague posée sur une rondelle du CH).

Pendant tout ce temps, ils ont eu la chance de marquer le passage de chaque journée dans la richesse de l’amour et de la joie, entourés de leur famille et de leurs amis. Justine appelle ça “The fun times”, Alex appelle ça « les seuls souvenirs qu’il ait jamais voulu créer ».

Nous vous invitons à vous joindre à nous — famille et amis, anciens comme nouveaux — pour célébrer nos six premières années ensemble… et toutes celles à venir.`,
  contact: "Contact",
  email: weddingConfig.couple.email
},

    schedule: {
  title: "Horaire du week-end",
  timingNote: "Tous les horaires sont sujets à changement sauf l'heure d'arrivée, qui est fixe.",

  days: {
    friday: "Vendredi",
    saturday: "Samedi",
    sunday: "Dimanche",
  },

  // Friday
  welcomeDinnerTitle: "Souper d’accueil",
  welcomeDinnerTime: "Vendredi soir",
  welcomeDinnerDesc:
    "Pour ceux venant de l'extérieur de la ville, nous vous contacterons avec les détails pour un souper décontracté vendredi soir.",

  // Saturday (your existing labels)
  arrival: "Arrivée",
  arrivalTime: weddingConfig.schedule.arrivalFr,
  ceremony: "Cérémonie",
  ceremonyTime: weddingConfig.schedule.ceremonyFr,
  cocktail: "Cocktail",
  cocktailTime: weddingConfig.schedule.cocktailFr,
  dinner: "Dîner et discours",
  dinnerTime: weddingConfig.schedule.dinnerFr,
  dancing: "Danse",
  dancingTime: weddingConfig.schedule.dancingFr,

  // Sunday
  sundayPicnicTitle: "Pique-nique café, croissants et mimosas",
  sundayPicnicTime: "11 h",
  sundayPicnicDesc:
    "En fin de matinée dimanche, on se retrouve pour un pique-nique relax au parc Jarry avec croissants, café et mimosas — une belle façon de terminer le week-end!"
},

    rsvp: {
      title: "RSVP",
      subtitle: `Veuillez répondre avant le ${weddingConfig.rsvp.deadline.displayFr}`,
      description: "Nous avons hâte de célébrer avec vous! Veuillez remplir le formulaire ci-dessous pour nous faire savoir si vous serez des nôtres. Un RSVP par invité, s'il vous plaît.",
      formNote: "Chargement du formulaire RSVP..."
    },
    faq: {
  title: "Questions fréquentes",
  timing: {
    q: "À quelle heure dois-je arriver?",
    a: "Veuillez arriver pour 15h."
  },
  dress: {
    q: "Que dois-je porter?",
    a: "La tenue pour la soirée est formelle : messieurs, portez un costume et une cravate; mesdames, une robe sous le genou. La créativité et la couleur sont les bienvenues. À noter que la cérémonie aura lieu à l'extérieur, tandis que la réception et le souper se dérouleront à l'intérieur. Début juin, à Montréal, la température est généralement assez douce."
  },
  food: {
    q: "Qu'en est-il de la nourriture et des boissons?",
    a: "On aura un cocktail avec bouchées suivi d'un repas à plusieurs services. Les consommations sont sur nous toute la soirée—on aura une sélection de spiritueux, bières et vins. Indiquez-nous vos préférences dans votre RSVP et on fera de notre mieux pour avoir vos favoris!"
  },
  parking: {
    q: "Y a-t-il un stationnement disponible?",
    a: "Oui, il y a du stationnement sur place. Uber et les taxis fonctionnent aussi dans le coin, mais comme on est en banlieue, c'est prudent de réserver d'avance ou de faire du covoiturage si possible. On regarde aussi pour louer un autobus et on vous tiendra au courant plus près de la date."
  },
  lodging: {
    q: "Où devrais-je loger ?",
    a: "Montréal offre un grand choix d'hôtels, et les locations à court terme sont faciles à trouver. Nous recommandons de loger à Montréal plutôt qu'à Baie-D'Urfé. Le centre-ville est le plus pratique, et le Plateau / Mile-End est idéal pour une ambiance plus animée. Villeray compte moins d'hôtels, mais offre plusieurs Airbnb, et c'est tout près du brunch du dimanche."
  },
  gifts: {
    q: "Avez-vous un registre de cadeaux?",
    a: "Votre présence est vraiment le plus beau cadeau! Si vous souhaitez tout de même offrir quelque chose, il y aura une boîte pour les enveloppes sur place. Vous pouvez aussi contribuer à notre fonds lune de miel via Venmo ou virement Interac. Nous économisons pour un voyage d'un mois au Vietnam l'année prochaine. Consultez la page Registre pour les détails."
  }
},
    travel: {
  title: "Informations de voyage",
  gettingThere: "Se rendre à Montréal",
  byAir: "Par avion",
  byAirDesc: "L'aéroport international Montréal–Pierre-Elliott-Trudeau (YUL) est l'aéroport principal de la ville. Il faut environ 30 minutes en voiture pour se rendre au lieu. L'aéroport se trouve aussi à environ 30 minutes du centre-ville.",
  byCar: "En voiture",
  byCarDesc: `${weddingConfig.venue.city} est située à l'extrémité ouest de l'île de Montréal, facilement accessible via l'autoroute 20. Le trajet depuis le centre-ville dure environ 30 minutes. Il y a du stationnement sur place.`,
  byTransit: "En transport en commun",
  byTransitDesc: "Le lieu est accessible en autobus (ligne 405). En autobus, il faut environ une heure depuis le centre-ville. Nous recommandons de consulter le site de la STM pour les horaires et itinéraires à jour.",
  byTransitLink: "https://www.stm.info/en/info/networks/bus/local/line-405-west",
  byTransitLinkText: "Voir la ligne 405 de la STM",
  hotels: "Recommandations d'hôtels",
  hotelsDesc: "Nous recommandons de loger plus près du centre-ville, c'est plus animé et idéal pour explorer Montréal. Il n'y a pas de bloc de chambres réservé, alors sentez-vous libre de réserver où bon vous semble! Le centre-ville, le Mile-End et le Plateau sont tous d'excellents quartiers pour réserver un hôtel ou un Airbnb. Villeray compte moins d'hôtels, mais offre plusieurs Airbnb, et c'est tout près du brunch du dimanche. Pour plus d'information sur l'hébergement, voir la section FAQ.",
  weather: "Prévisions météo",
  weatherDesc: "Juin à Montréal est magnifique! Attendez-vous à des températures agréables autour de 20–25°C (68–77°F). Nous recommandons d'apporter une veste légère pour la soirée. À noter : la cérémonie aura lieu à l'extérieur sur du gazon. Le souper et la réception seront à l'intérieur."
},

    registry: {
      title: "Registre",
      subtitle: "Votre présence est notre cadeau",
      description: "Honnêtement, le plus beau cadeau que vous puissiez nous offrir, c'est d'être là pour célébrer avec nous. C'est vraiment plus que suffisant. Mais si vous souhaitez tout de même offrir quelque chose, il y aura une boîte pour les enveloppes sur place. Vous pouvez aussi contribuer à notre fonds lune de miel via Venmo ou virement Interac :",
      venmoLabel: "Venmo",
      venmoValue: "@afnorfolk",
      etransferLabel: "Virement Interac",
      etransferValue: "justine.and.alex.wedding@gmail.com"
    },
    venue: {
      title: "Le lieu",
      name: weddingConfig.venue.fullNameFr,
      address: weddingConfig.venue.address,
      description: `Le ${weddingConfig.venue.fullNameFr} est un lieu charmant niché dans la pittoresque ville de ${weddingConfig.venue.city}, surplombant le magnifique lac Saint-Louis. Le centre offre un cadre chaleureux et élégant parfait pour célébrer notre jour spécial avec la famille et les amis.`
    },
    saveTheDate: {
      title: "Réservez la date",
      description: "Notre annonce 'réservez la date' envoyée aux amis et à la famille."
    }
  }
} as const;

export type Language = 'en' | 'fr';
export type TranslationKey = typeof translations.en;
