import { homeTranslations, type Locale } from "@/data/translations";
import { Button } from "@/components/ui/Button";

const EDOCEO_ACADEMY_URL = "https://edoceo-academy.com";

interface HomePartnerTrainingProps {
  locale: Locale;
}

function IconGraduation({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M22 10v6M2 10l10-5 10 5-10 5L2 10z" />
      <path d="M6 12v5c0 1 2 3 6 3s6-2 6-3v-5" />
    </svg>
  );
}

function IconExternal({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M14 3h7v7M10 14L21 3M21 14v6a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h6"
      />
    </svg>
  );
}

export function HomePartnerTraining({ locale }: HomePartnerTrainingProps) {
  const t = homeTranslations[locale];

  return (
    <section
      className="section-partner-training border-t border-[var(--border)] py-16 sm:py-20 lg:py-24"
      aria-labelledby="partner-training-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-[var(--shadow-card)] sm:p-10 lg:p-12">
          <div
            className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-[var(--accent-green)]/[0.08] blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-20 -left-12 h-56 w-56 rounded-full bg-[var(--navy-primary)]/[0.06] blur-3xl"
            aria-hidden
          />

          <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-center lg:gap-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent-green)]">
                {t.partnerEyebrow}
              </p>
              <h2
                id="partner-training-heading"
                className="mt-3 text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl"
              >
                {t.partnerTitle}
              </h2>
              <p className="mt-4 max-w-2xl text-[var(--text-secondary)] leading-relaxed sm:text-[0.9375rem]">
                {t.partnerBody}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button
                  href={EDOCEO_ACADEMY_URL}
                  variant="accent"
                  size="lg"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t.partnerCtaAria}
                  className="inline-flex gap-2 !no-underline"
                >
                  {t.partnerCta}
                  <IconExternal className="h-4 w-4 shrink-0 opacity-95" />
                </Button>
                <span className="text-xs text-[var(--text-muted)] sm:text-sm">
                  edoceo-academy.com
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-[var(--border)] bg-[var(--muted)]/80 px-6 py-8 text-center shadow-[var(--shadow-ambient)] lg:py-10">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--navy-primary)]/10 text-[var(--navy-primary)]">
                <IconGraduation className="h-8 w-8" />
              </div>
              <p className="text-sm font-semibold text-[var(--text-primary)]">Edoceo</p>
              <p className="text-xs leading-relaxed text-[var(--text-muted)]">
                {locale === "fr"
                  ? "Formations professionnelles certifiées Qualiopi."
                  : "Qualiopi-certified professional training."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
