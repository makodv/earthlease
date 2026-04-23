import {
  formatShareCapitalEn,
  formatShareCapitalFr,
  legalPublisher,
} from "@/lib/legalPublisher";
import type { Locale } from "@/data/translations";

const defaultTitles = {
  fr: "Éditeur du site",
  en: "Site publisher",
} as const;

const labels = {
  fr: {
    legalName: "Raison sociale",
    capital: "Capital social",
    hq: "Siège social",
    secondary: "Autre établissement",
    siret: "SIRET",
    naf: "Code NAF / APE",
  },
  en: {
    legalName: "Legal name",
    capital: "Share capital",
    hq: "Registered office",
    secondary: "Additional address",
    siret: "SIRET (French company ID)",
    naf: "NAF / APE activity code",
  },
} as const;

interface LegalPublisherCardProps {
  locale: Locale;
  /** Si défini, remplace le titre principal de l’encadré (ex. « Responsable du traitement »). */
  titleOverride?: string;
  /** Sans titre ni aside décoratif : à placer sous le `<h2>` de la section. */
  compact?: boolean;
}

export function LegalPublisherCard({ locale, titleOverride, compact }: LegalPublisherCardProps) {
  const l = labels[locale];
  const mainTitle = titleOverride ?? defaultTitles[locale];
  const capital =
    locale === "fr"
      ? formatShareCapitalFr(legalPublisher.shareCapitalEuros)
      : formatShareCapitalEn(legalPublisher.shareCapitalEuros);

  const inner = (
    <dl className={`space-y-4 text-sm text-[var(--text-secondary)] ${compact ? "" : "mt-4"}`}>
        <div>
          <dt className="font-medium text-[var(--text-primary)]">{l.legalName}</dt>
          <dd className="mt-0.5">{legalPublisher.companyName}</dd>
        </div>
        <div>
          <dt className="font-medium text-[var(--text-primary)]">{l.capital}</dt>
          <dd className="mt-0.5">{capital}</dd>
        </div>
        <div>
          <dt className="font-medium text-[var(--text-primary)]">{l.hq}</dt>
          <dd className="mt-0.5">
            {legalPublisher.registeredOfficeStreet}
            <br />
            {legalPublisher.registeredOfficeCityLine}, {legalPublisher.country}
          </dd>
        </div>
        <div>
          <dt className="font-medium text-[var(--text-primary)]">{l.secondary}</dt>
          <dd className="mt-0.5">
            {legalPublisher.secondaryStreet}
            <br />
            {legalPublisher.secondaryCityLine}, {legalPublisher.country}
          </dd>
        </div>
        <div>
          <dt className="font-medium text-[var(--text-primary)]">{l.siret}</dt>
          <dd className="mt-0.5 font-mono text-[var(--text-primary)]">{legalPublisher.siretDisplay}</dd>
        </div>
        <div>
          <dt className="font-medium text-[var(--text-primary)]">{l.naf}</dt>
          <dd className="mt-0.5 font-mono text-[var(--text-primary)]">{legalPublisher.nafCode}</dd>
        </div>
      </dl>
  );

  if (compact) {
    return (
      <div className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-card)]">
        {inner}
      </div>
    );
  }

  return (
    <aside
      className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-card)]"
      aria-label={mainTitle}
    >
      <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--navy-primary)]">
        {mainTitle}
      </h2>
      {inner}
    </aside>
  );
}
