import type { Locale } from "./nav";

export const categoryVisualUi = {
  fr: {
    backOffers: "← Toutes les offres",
    heroEyebrow: "Offres EarthLease",
    galleryAboveTitle: "Visuels produit — à compléter avec vos photos",
    galleryAboveHint:
      "Placez vos fichiers dans `public/` et branchez-les dans les composants, ou remplacez ces blocs par des `<Image />` Next.js.",
    galleryBelowTitle: "Galerie complémentaire",
    slotPrefix: "Visuel",
    seeHome: "Voir l’aperçu sur l’accueil",
    demandeDevis: "Demander un devis",
    utilHomeCaption: "Bandeau utilitaires — ajoutez votre photo ici",
    materielHomeStrip: "Modèles KRENDL — emplacements visuels",
    tourismeExtraSlot: "Photo",
  },
  en: {
    backOffers: "← All offers",
    heroEyebrow: "EarthLease offers",
    galleryAboveTitle: "Product visuals — add your photos",
    galleryAboveHint:
      "Drop files under `public/` and wire them in, or swap these blocks for Next.js `<Image />` components.",
    galleryBelowTitle: "Extra gallery",
    slotPrefix: "Visual",
    seeHome: "See overview on homepage",
    demandeDevis: "Request a quote",
    utilHomeCaption: "Vans banner — add your hero photo here",
    materielHomeStrip: "KRENDL models — image placeholders",
    tourismeExtraSlot: "Photo",
  },
} as const satisfies Record<Locale, Record<string, string>>;
