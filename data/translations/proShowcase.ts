export const proShowcaseTranslations = {
  fr: {
    vehiclesMetaTitle: "Location voitures, utilitaires, matériel & deux-roues | EarthLease",
    vehiclesPageTitle: "Location — tout notre univers",
    vehiclesMetaDescription:
      "Voitures électriques & hybrides, utilitaires, matériel d’isolation, deux-roues (gamme précisée sur devis). Minimum 1 mois.",
    eyebrow: "Location multi-mobilité",
    title: "Pro, tourisme, utilitaires & deux-roues",
    lead:
      "EarthLease vous oriente vers la bonne formule (courte ou longue durée), met à votre disposition du matériel professionnel pour l’isolation (cardeuse-souffleuse), vos utilitaires, et vous accompagne pour votre mobilité du quotidien : tourisme en électrique ou hybride, deux-roues. Un commercial précise avec vous les références, options et tarifs.",
    minLease: "Durée minimum de location : 1 mois.",
    commercialNote:
      "Pas de catalogue filtrable : visuels représentatifs ; références exactes et disponibilité validées avec vous sur devis.",
    tourismeFocusNote:
      "Tourisme : uniquement motorisations électriques ou hybrides.",
    materielTitle: "Matériel & isolation",
    materielBody:
      "Gamme KRENDL : 425, 575 (1 ou 2 turbines), 2300 ; extracteur GV230 possible en complément. Détail, EPI et logistique sur la page matériel. Tarifs sur devis.",
    seeCategoryPage: "Page catégorie",
    utilTitle: "Véhicules utilitaires",
    utilBody:
      "Fourgons et utilitaires pour livraisons, équipes terrain ou flotte courte durée.",
    tourismeTitle: "Voitures tourisme — électrique & hybride",
    tourismeBody:
      "Citadines, berlines et SUV : nous orientons l’offre vers l’électrique et l’hybride uniquement. Précisez le type de motorisation dans votre devis.",
    tourismeSectionElectric: "100 % électrique",
    tourismeSectionHybrid: "Hybride",
    veloTitle: "Deux-roues",
    veloBody:
      "Vélos, trottinettes ou solutions cargo : la liste des références sera ajoutée ici. En attendant, décrivez votre besoin au devis — nous préparons l’offre.",
    veloListHint: "Gamme deux-roues : liste des modèles à venir.",
    modelsLabel: "Modèles & équipements",
    ctaDevis: "Demander un devis",
    ctaVehiclesPage: "Voir toutes les fiches",
    cards: {
      krendl: {
        title: "Cardeuses souffleuses KRENDL",
        subtitle: "425, 575 (1 ou 2 turbines), 2300 — location chantiers d’isolation",
      },
      ducato: {
        title: "Utilitaires & fourgons",
        subtitle:
          "Livraisons, charges volumineuses, équipes terrain — indiquez le véhicule souhaité dans votre demande de devis.",
      },
      boxer: {
        title: "Peugeot Boxer",
        subtitle: "Utilitaire professionnel",
      },
      transit: {
        title: "Ford Transit",
        subtitle: "Utilitaire — motorisations selon stock",
      },
      tourismeElec: {
        title: "Tourisme 100% électrique",
        subtitle: "Citadines et SUV électriques — selon stock et devis",
      },
      tourismeHybride: {
        title: "Tourisme hybride",
        subtitle: "Rechargeable ou hybride classique — selon stock et devis",
      },
      velo: {
        title: "Deux-roues",
        subtitle: "Vélos, trottinettes, cargo — précisez le modèle au devis",
      },
    },
  },
  en: {
    vehiclesMetaTitle: "Rent cars, vans, equipment & bikes | EarthLease",
    vehiclesPageTitle: "Rentals — full range",
    vehiclesMetaDescription:
      "Electric & hybrid cars, commercial vans, insulation equipment, two-wheelers (models confirmed on quote). Minimum 1 month.",
    eyebrow: "Multi-mobility rental",
    title: "Pro, passenger, vans & two-wheelers",
    lead:
      "Like a pro hire desk that steers you to the right plan (short or long term), EarthLease covers insulation equipment, vans and everyday mobility: electric or hybrid passenger cars, plus two-wheelers (model list coming). No filterable catalogue: our team confirms spec, options and pricing with you on the quote.",
    minLease: "Minimum rental period: 1 month.",
    commercialNote:
      "No filterable catalogue: representative product imagery; exact specs and availability are confirmed with you on the quote.",
    tourismeFocusNote: "Passenger cars: electric and hybrid only.",
    materielTitle: "Equipment & insulation",
    materielBody:
      "KRENDL line-up: 425, 575 (single or twin turbine), 2300; GV230 extractor available as an add-on. Detail, PPE and logistics on the equipment page. Pricing on quotation.",
    seeCategoryPage: "Category page",
    utilTitle: "Commercial vans",
    utilBody: "Vans for deliveries, field teams or short-term fleet needs.",
    tourismeTitle: "Passenger cars — electric & hybrid",
    tourismeBody:
      "City cars, saloons and SUVs: we only offer electric and hybrid powertrains. State your preference in the quote.",
    tourismeSectionElectric: "Fully electric",
    tourismeSectionHybrid: "Hybrid",
    veloTitle: "Two-wheelers",
    veloBody:
      "Bikes, e-scooters or cargo solutions: the model list will appear here. Until then, describe what you need in your quote.",
    veloListHint: "Two-wheeler range: model list coming soon.",
    modelsLabel: "Models & equipment",
    ctaDevis: "Request a quote",
    ctaVehiclesPage: "View all listings",
    cards: {
      krendl: {
        title: "KRENDL blowing machines",
        subtitle: "425, 575 (1 or 2 turbines), 2300 — insulation site rental",
      },
      ducato: {
        title: "Commercial vans",
        subtitle:
          "Deliveries, bulky loads, field teams — specify the vehicle you want in your quote request.",
      },
      boxer: {
        title: "Peugeot Boxer",
        subtitle: "Professional van",
      },
      transit: {
        title: "Ford Transit",
        subtitle: "Van — powertrains per stock",
      },
      tourismeElec: {
        title: "Fully electric passenger",
        subtitle: "City cars and electric SUVs — per stock and quote",
      },
      tourismeHybride: {
        title: "Hybrid passenger",
        subtitle: "Plug-in or full hybrid — per stock and quote",
      },
      velo: {
        title: "Two-wheelers",
        subtitle: "Bikes, e-scooters, cargo — name the model on your quote",
      },
    },
  },
} as const;

export type ProShowcaseCardId = keyof typeof proShowcaseTranslations.fr.cards;
