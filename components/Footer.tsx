"use client";

import Link from "next/link";
import { footerTranslations, type Locale } from "@/data/translations";
import { legalPublisher } from "@/lib/legalPublisher";

const LOGO_SRC = "/logo.svg";

interface FooterProps {
  locale: Locale;
}

const citySlugs = [
  "paris",
  "lyon",
  "marseille",
  "bordeaux",
  "toulouse",
  "nice",
  "lille",
  "nantes",
  "strasbourg",
  "montpellier",
  "rennes",
] as const;

export function Footer({ locale }: FooterProps) {
  const t = footerTranslations[locale];
  const basePath = `/${locale}`;

  return (
    <footer className="footer-organic border-t border-[var(--glass-border-dark)]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/95">
              {t.products}
            </h4>
            <ul className="mt-6 space-y-3">
              <li>
                <Link
                  href={`${basePath}/abonnement`}
                  className="text-sm text-white/80 transition-colors hover:text-white"
                >
                  {t.whatIsSubscription}
                </Link>
              </li>
              <li>
                <Link
                  href={`${basePath}/offres`}
                  className="text-sm text-white/80 transition-colors hover:text-white"
                >
                  {t.offers}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/95">
              {t.popularCities}
            </h4>
            <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3 text-sm text-white/80">
              {citySlugs.map((city) => (
                <li key={city}>
                  <Link
                    href={`${basePath}/vehicles`}
                    className="transition-colors hover:text-white"
                  >
                    {t.cities[city]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/95">
              {t.discoverUs}
            </h4>
            <ul className="mt-6 space-y-3">
              <li>
                <Link
                  href={`${basePath}/avis`}
                  className="text-sm text-white/80 transition-colors hover:text-white"
                >
                  {t.reviews}
                </Link>
              </li>
              <li>
                <Link
                  href={`${basePath}/presse`}
                  className="text-sm text-white/80 transition-colors hover:text-white"
                >
                  {t.press}
                </Link>
              </li>
              <li>
                <Link
                  href={`${basePath}/sitemap`}
                  className="text-sm text-white/80 transition-colors hover:text-white"
                >
                  {t.sitemap}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/95">
              {t.needHelp}
            </h4>
            <p className="mt-6 text-sm text-white/70">{t.officeHours}</p>
            <p className="mt-3 text-sm">
              <span className="text-white/70">{t.phoneLabel}:</span>{" "}
              <a
                href={`tel:${t.phoneTel}`}
                className="font-medium text-white/90 transition-colors hover:text-white"
              >
                {t.phoneDisplay}
              </a>
            </p>
            <div className="mt-8 text-sm text-white/75">
              <p className="text-xs font-semibold uppercase tracking-wider text-white/95">
                {t.addressHeading}
              </p>
              <p className="mt-2 font-medium text-white/90">{legalPublisher.companyName}</p>
              <p className="mt-4">
                <span className="block text-xs font-semibold uppercase tracking-wider text-white/80">
                  {t.registeredOfficeLabel}
                </span>
                <span className="mt-1 block leading-relaxed">
                  {legalPublisher.registeredOfficeStreet}
                  <br />
                  {legalPublisher.registeredOfficeCityLine}, {legalPublisher.country}
                </span>
              </p>
              <p className="mt-4">
                <span className="block text-xs font-semibold uppercase tracking-wider text-white/80">
                  {t.secondaryAddressLabel}
                </span>
                <span className="mt-1 block leading-relaxed">
                  {legalPublisher.secondaryStreet}
                  <br />
                  {legalPublisher.secondaryCityLine}, {legalPublisher.country}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-10 md:flex-row">
          <Link href={basePath} className="shrink-0">
            <img
              src={LOGO_SRC}
              alt="EarthLease"
              className="h-8 w-auto object-contain opacity-95"
              width={140}
              height={32}
            />
          </Link>
          <div className="flex flex-wrap justify-center gap-8 text-sm">
            <Link
              href={`${basePath}/conditions`}
              className="text-white/70 transition-colors hover:text-white"
            >
              {t.termsOfUse}
            </Link>
            <Link
              href={`${basePath}/confidentialite-rgpd`}
              className="text-white/70 transition-colors hover:text-white"
            >
              {t.privacyPolicy}
            </Link>
            <Link
              href={`${basePath}/confidentialite-rgpd#cookies`}
              className="text-white/70 transition-colors hover:text-white"
            >
              {t.cookiePolicy}
            </Link>
          </div>
          <p className="text-sm text-white/60">{t.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
