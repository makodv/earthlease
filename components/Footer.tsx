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
    <footer className="border-t border-white/10 bg-[#062E5B] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
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
                    href={`${basePath}/vehicles?city=${city}`}
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
            <p className="mt-6 text-sm text-white/70">L-V 9:00h - 18:00h</p>
            <p className="mt-3 text-sm">
              <span className="text-white/70">{t.customerService}:</span>{" "}
              <a
                href="tel:0176431905"
                className="font-medium text-white/90 transition-colors hover:text-white"
              >
                01 76 43 19 05
              </a>
            </p>
            <p className="mt-1 text-sm">
              <span className="text-white/70">{t.newClients}:</span>{" "}
              <a
                href="tel:0176410841"
                className="font-medium text-white/90 transition-colors hover:text-white"
              >
                01 76 41 08 41
              </a>
            </p>
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
              href={`${basePath}/confidentialite`}
              className="text-white/70 transition-colors hover:text-white"
            >
              {t.privacyPolicy}
            </Link>
            <Link
              href={`${basePath}/cookies`}
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
