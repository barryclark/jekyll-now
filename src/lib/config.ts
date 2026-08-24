export const weddingConfig = {
  couple: {
    names: "Justine & Alex",
    email: "justine.and.alex.wedding@gmail.com"
  },
  date: {
    day: 6,
    month: 6,
    year: 2026,
    displayEn: "June 6, 2026",
    displayFr: "6 juin 2026"
  },
  rsvp: {
    deadline: {
      day: 6,
      month: 4,
      year: 2026,
      displayEn: "April 6, 2026",
      displayFr: "6 avril 2026"
    }
  },
  venue: {
    name: "Fritz Community Center",
    nameFr: "Centre Communautaire Fritz",
    fullName: "Fritz Community Centre",
    fullNameFr: "Centre Communautaire Fritz",
    address: "20477 Rue Lakeshore, Baie-d'Urfé, QC H9X 1R3",
    city: "Baie-D'Urfé",
    province: "QC"
  },
  schedule: {
    arrival: "3:00 PM",
    arrivalFr: "15h00",
    ceremony: "3:30 PM",
    ceremonyFr: "15h30",
    cocktail: "4:15 PM",
    cocktailFr: "16h15",
    dinner: "6:00 PM",
    dinnerFr: "18h00",
    dancing: "8:30 PM",
    dancingFr: "20h30",
    end: "12:00 AM",
    endFr: "00h00"
  }
} as const;
