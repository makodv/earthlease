import type { OfferCategorySlug } from "@/lib/offerCategory";
import type { Locale } from "@/data/translations";

type CategorySeo = { metaTitle: string; metaDescription: string };

const categoryMeta: Record<Locale, Record<OfferCategorySlug, CategorySeo>> = {
  fr: {
    materiel: {
      metaTitle: "Location cardeuses & souffleuses KRENDL — Matériel isolation | EarthLease",
      metaDescription:
        "Louez vos cardeuses souffleuses KRENDL (425, 575, 2300) et l'extracteur GV230 pour vos chantiers d'isolation. Tarifs sur devis, durée minimum 1 mois.",
    },
    utilitaires: {
      metaTitle: "Location fourgons & utilitaires professionnels | EarthLease",
      metaDescription:
        "Location courte et longue durée de fourgons et utilitaires pour vos équipes terrain. Devis personnalisé, livraison possible.",
    },
    tourisme: {
      metaTitle: "Location voitures électriques & hybrides professionnelles | EarthLease",
      metaDescription:
        "Citadines, berlines et SUV électriques ou hybrides en location flexible. Motorisations bas carbone uniquement. Devis sous 48 h.",
    },
    "deux-roues": {
      metaTitle: "Location vélos, trottinettes & cargo | EarthLease",
      metaDescription:
        "Location de deux-roues électriques, vélos cargo et trottinettes pour professionnels. Offre en cours de constitution — décrivez votre besoin au devis.",
    },
  },
  en: {
    materiel: {
      metaTitle: "KRENDL Blowing Machine Rental — Insulation Equipment | EarthLease",
      metaDescription:
        "Rent KRENDL blowing machines (425, 575, 2300) and the GV230 extractor for your insulation projects. Quote-based pricing, minimum 1 month.",
    },
    utilitaires: {
      metaTitle: "Van & Utility Vehicle Rental for Professionals | EarthLease",
      metaDescription:
        "Short and long-term rental of vans and utility vehicles for field teams. Personalised quote, delivery available.",
    },
    tourisme: {
      metaTitle: "Electric & Hybrid Car Rental for Professionals | EarthLease",
      metaDescription:
        "City cars, saloons and electric or hybrid SUVs on flexible rental. Low-carbon powertrains only. Quote within 48 h.",
    },
    "deux-roues": {
      metaTitle: "E-Bike, Scooter & Cargo Bike Rental | EarthLease",
      metaDescription:
        "Electric bike, cargo bike and scooter rental for professionals. Offer being built — describe your need in the quote form.",
    },
  },
};

export function getCategoryOfferSeo(locale: Locale, category: OfferCategorySlug): CategorySeo {
  return categoryMeta[locale][category];
}
