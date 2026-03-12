export const navTranslations = {
  fr: {
    vehicles: "Véhicules",
    vehiclesPro: "Véhicules professionnels",
    vehiclesProDesc: "Utilitaires, construction, chantier",
    vehiclesCars: "Voitures particuliers",
    vehiclesCarsDesc: "Berlines, SUV, citadines",
    howItWorks: "Comment ça marche",
    faq: "FAQ",
    contact: "Contact",
    phone: "01 76 43 19 05",
    hours: "L-V 9:00h - 18:00h",
    questions: "Des questions ?",
    seeVehicles: "Voir les véhicules",
  },
  en: {
    vehicles: "Vehicles",
    vehiclesPro: "Professional vehicles",
    vehiclesProDesc: "Commercial, construction, utility",
    vehiclesCars: "Passenger cars",
    vehiclesCarsDesc: "Sedans, SUVs, city cars",
    howItWorks: "How it works",
    faq: "FAQ",
    contact: "Contact",
    phone: "+33 1 76 43 19 05",
    hours: "Mon-Fri 9:00 AM - 6:00 PM",
    questions: "Any questions?",
    seeVehicles: "See vehicles",
  },
} as const;

export type Locale = keyof typeof navTranslations;
