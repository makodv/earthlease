import type { Locale } from "@/data/translations";

export const defaultLocale: Locale = "fr";
export const locales: Locale[] = ["fr", "en"];

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
