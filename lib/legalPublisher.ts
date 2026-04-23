/** Identité légale affichée sur les pages Conditions d’utilisation et Confidentialité / RGPD. */
export const legalPublisher = {
  companyName: "Earthlease Capital SAS",
  /** Capital en euros (nombre entier). */
  shareCapitalEuros: 100_000,
  /** Siège social */
  registeredOfficeStreet: "3 boulevard Georges Méliès",
  registeredOfficeCityLine: "94350 Villiers-sur-Marne",
  /** Adresse complémentaire */
  secondaryStreet: "22 rue Saarinen",
  secondaryCityLine: "94150 Rungis",
  country: "France",
  /** SIRET (14 chiffres, format affichage avec espaces) */
  siretDisplay: "908 741 044 00022",
  /** Code NAF / APE */
  nafCode: "66.19B",
} as const;

export function formatShareCapitalFr(euros: number): string {
  return `${euros.toLocaleString("fr-FR")} €`;
}

export function formatShareCapitalEn(euros: number): string {
  return `€${euros.toLocaleString("en-US")}`;
}
