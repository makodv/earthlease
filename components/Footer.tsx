"use client";

import Link from "next/link";
import { footerTranslations, type Locale } from "@/data/translations";

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
    <footer className="border-t border-[var(--border)] bg-[var(--muted-bg)]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Products */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--primary)]">
              {t.products}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href={`${basePath}/abonnement`}
                  className="text-sm text-[var(--foreground)] transition-colors hover:text-[var(--primary)]"
                >
                  {t.whatIsSubscription}
                </Link>
              </li>
              <li>
                <Link
                  href={`${basePath}/offres`}
                  className="text-sm text-[var(--foreground)] transition-colors hover:text-[var(--primary)]"
                >
                  {t.offers}
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular cities */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--primary)]">
              {t.popularCities}
            </h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              {citySlugs.map((city) => (
                <li key={city}>
                  <Link
                    href={`${basePath}/vehicles?city=${city}`}
                    className="text-[var(--foreground)] transition-colors hover:text-[var(--primary)]"
                  >
                    {t.cities[city]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Discover us */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--primary)]">
              {t.discoverUs}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href={`${basePath}/avis`}
                  className="text-sm text-[var(--foreground)] transition-colors hover:text-[var(--primary)]"
                >
                  {t.reviews}
                </Link>
              </li>
              <li>
                <Link
                  href={`${basePath}/presse`}
                  className="text-sm text-[var(--foreground)] transition-colors hover:text-[var(--primary)]"
                >
                  {t.press}
                </Link>
              </li>
              <li>
                <Link
                  href={`${basePath}/sitemap`}
                  className="text-sm text-[var(--foreground)] transition-colors hover:text-[var(--primary)]"
                >
                  {t.sitemap}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact / Help */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--primary)]">
              {t.needHelp}
            </h4>
            <p className="text-sm text-[var(--muted)]">L-V 9:00h - 18:00h</p>
            <p className="mt-2 text-sm">
              <span className="text-[var(--muted)]">{t.customerService}:</span>{" "}
              <a
                href="tel:0176431905"
                className="font-medium text-[var(--foreground)] hover:text-[var(--primary)]"
              >
                01 76 43 19 05
              </a>
            </p>
            <p className="mt-1 text-sm">
              <span className="text-[var(--muted)]">{t.newClients}:</span>{" "}
              <a
                href="tel:0176410841"
                className="font-medium text-[var(--foreground)] hover:text-[var(--primary)]"
              >
                01 76 41 08 41
              </a>
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[var(--border)] pt-8 md:flex-row">
          <Link href={basePath} className="shrink-0">
            <img
              src={LOGO_SRC}
              alt="EarthLease"
              className="h-9 w-auto object-contain opacity-80 sm:h-10"
              width={160}
              height={44}
            />
          </Link>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link
              href={`${basePath}/conditions`}
              className="text-[var(--muted)] transition-colors hover:text-[var(--primary)]"
            >
              {t.termsOfUse}
            </Link>
            <Link
              href={`${basePath}/confidentialite`}
              className="text-[var(--muted)] transition-colors hover:text-[var(--primary)]"
            >
              {t.privacyPolicy}
            </Link>
            <Link
              href={`${basePath}/cookies`}
              className="text-[var(--muted)] transition-colors hover:text-[var(--primary)]"
            >
              {t.cookiePolicy}
            </Link>
          </div>
          <p className="text-sm text-[var(--muted)]">{t.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
