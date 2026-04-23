import type { Metadata } from "next";
import type { Locale } from "@/data/translations";

export const SITE_ORIGIN = "https://earthlease.fr" as const;

/** Full URL for a locale segment, e.g. `("/contact")` → `https://earthlease.fr/fr/contact`. */
export function absoluteLocaleUrl(locale: Locale, pathAfterLocale: string): string {
  const suffix =
    pathAfterLocale === "" ? "" : pathAfterLocale.startsWith("/") ? pathAfterLocale : `/${pathAfterLocale}`;
  return `${SITE_ORIGIN}/${locale}${suffix}`;
}

/** Hreflang + canonical for a path shared by FR and EN (x-default → FR). */
export function hreflangAlternates(
  activeLocale: Locale,
  pathAfterLocale: string
): Metadata["alternates"] {
  const fr = absoluteLocaleUrl("fr", pathAfterLocale);
  const en = absoluteLocaleUrl("en", pathAfterLocale);
  return {
    canonical: absoluteLocaleUrl(activeLocale, pathAfterLocale),
    languages: {
      "fr-FR": fr,
      "en-GB": en,
      "x-default": fr,
    },
  };
}
