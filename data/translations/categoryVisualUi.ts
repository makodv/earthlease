import type { Locale } from "./nav";

export const categoryVisualUi = {
  fr: {
    backOffers: "← Toutes les offres",
    heroEyebrow: "Offres EarthLease",
    galleryAboveTitle: "Aperçu de la gamme tourisme",
    galleryAboveHint:
      "Sélection représentative de citadines, berlines et SUV 100 % électriques — disponibilités et finitions validées sur devis.",
    galleryBelowTitle: "Galerie complémentaire",
    slotPrefix: "Visuel",
    seeHome: "Voir l’aperçu sur l’accueil",
    demandeDevis: "Demander un devis",
    utilHomeCaption: "Utilitaires et fourgons professionnels",
    materielHomeStrip: "Machines KRENDL — aperçu chantier",
    tourismeExtraSlot: "Photo",
  },
  en: {
    backOffers: "← All offers",
    heroEyebrow: "EarthLease offers",
    galleryAboveTitle: "Passenger range overview",
    galleryAboveHint:
      "Representative city cars, saloons and fully electric SUVs — availability and specifications confirmed on quote.",
    galleryBelowTitle: "Extra gallery",
    slotPrefix: "Visual",
    seeHome: "See overview on homepage",
    demandeDevis: "Request a quote",
    utilHomeCaption: "Professional vans and utility vehicles",
    materielHomeStrip: "KRENDL machines — site overview",
    tourismeExtraSlot: "Photo",
  },
} as const satisfies Record<Locale, Record<string, string>>;
