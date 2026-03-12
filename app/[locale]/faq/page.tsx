import { isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { FaqAccordion } from "@/components/FaqAccordion";
import { faqTranslations, type Locale } from "@/data/translations";

export default async function FAQPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const t = faqTranslations[locale as Locale];

  return (
    <div className="section-how-organic min-h-[60vh]">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
          {locale === "fr" ? "Aide" : "Help"}
        </p>
        <h1 className="mt-3 text-center text-3xl font-bold text-[var(--text-primary)] sm:text-4xl">
          {t.title}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-center text-[var(--text-secondary)]">
          {t.subtitle}
        </p>

        <div className="mt-14">
          <FaqAccordion locale={locale as Locale} />
        </div>
      </div>
    </div>
  );
}
