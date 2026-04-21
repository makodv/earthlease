import { isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { howItWorksTranslations, type Locale } from "@/data/translations";

export default async function HowItWorksPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const t = howItWorksTranslations[locale as Locale];

  return (
    <div className="section-how-organic min-h-[60vh]">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
          {locale === "fr" ? "Processus" : "Process"}
        </p>
        <h1 className="mt-3 text-center text-3xl font-bold text-[var(--text-primary)] sm:text-4xl">
          {t.title}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-center text-[var(--text-secondary)]">
          {t.subtitle}
        </p>

        {/* Steps */}
        <div className="mt-16 grid gap-12 sm:grid-cols-3">
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--navy-primary)]/20 bg-[var(--surface)] text-xl font-bold text-[var(--navy-primary)] shadow-[var(--shadow-card)]">
              1
            </div>
            <h2 className="mt-5 font-semibold text-[var(--text-primary)]">
              {t.step1Title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
              {t.step1Desc}
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--navy-primary)]/20 bg-[var(--surface)] text-xl font-bold text-[var(--navy-primary)] shadow-[var(--shadow-card)]">
              2
            </div>
            <h2 className="mt-5 font-semibold text-[var(--text-primary)]">
              {t.step2Title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
              {t.step2Desc}
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--navy-primary)]/20 bg-[var(--surface)] text-xl font-bold text-[var(--navy-primary)] shadow-[var(--shadow-card)]">
              3
            </div>
            <h2 className="mt-5 font-semibold text-[var(--text-primary)]">
              {t.step3Title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
              {t.step3Desc}
            </p>
          </div>
        </div>

        {/* What's included */}
        <div className="mt-20 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-[var(--shadow-card)]">
          <h2 className="text-xl font-semibold text-[var(--text-primary)]">
            {t.whatsIncludedTitle}
          </h2>
          <p className="mt-2 text-[var(--text-secondary)]">
            {t.whatsIncludedIntro}
          </p>
          <ul className="mt-6 space-y-3">
            <li className="flex items-center gap-3 text-[var(--text-secondary)]">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent-green)]/15 text-sm font-medium text-[var(--accent-green)]">✓</span>
              {t.included1}
            </li>
            <li className="flex items-center gap-3 text-[var(--text-secondary)]">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent-green)]/15 text-sm font-medium text-[var(--accent-green)]">✓</span>
              {t.included2}
            </li>
            <li className="flex items-center gap-3 text-[var(--text-secondary)]">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent-green)]/15 text-sm font-medium text-[var(--accent-green)]">✓</span>
              {t.included3}
            </li>
            <li className="flex items-center gap-3 text-[var(--text-secondary)]">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent-green)]/15 text-sm font-medium text-[var(--accent-green)]">✓</span>
              {t.included4}
            </li>
          </ul>
        </div>

        {/* Documents */}
        <div className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-[var(--shadow-card)]">
          <h2 className="text-xl font-semibold text-[var(--text-primary)]">
            {t.documentsTitle}
          </h2>
          <p className="mt-2 text-[var(--text-secondary)]">
            {t.documentsIntro}
          </p>
          <ul className="mt-6 space-y-3">
            <li className="flex items-center gap-3 text-[var(--text-secondary)]">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--navy-primary)]/10 text-sm font-medium text-[var(--navy-primary)]">1</span>
              {t.doc1}
            </li>
            <li className="flex items-center gap-3 text-[var(--text-secondary)]">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--navy-primary)]/10 text-sm font-medium text-[var(--navy-primary)]">2</span>
              {t.doc2}
            </li>
            <li className="flex items-center gap-3 text-[var(--text-secondary)]">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--navy-primary)]/10 text-sm font-medium text-[var(--navy-primary)]">3</span>
              {t.doc3}
            </li>
            <li className="flex items-center gap-3 text-[var(--text-secondary)]">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--navy-primary)]/10 text-sm font-medium text-[var(--navy-primary)]">4</span>
              {t.doc4}
            </li>
          </ul>
        </div>

        {/* CTAs */}
        <div className="mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href={`/${locale}/#offres-pro`} variant="accent" size="lg">
            {t.ctaVehicles}
          </Button>
          <Button href={`/${locale}/contact`} variant="secondary" size="lg">
            {t.ctaContact}
          </Button>
        </div>
      </div>
    </div>
  );
}