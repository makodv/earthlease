"use client";

import { homeTranslations, type Locale } from "@/data/translations";
import { Button } from "@/components/ui/Button";

interface HomeHowItWorksProps {
  locale: Locale;
}

const steps = [
  "howStep1Title",
  "howStep2Title",
  "howStep3Title",
] as const;
const stepDescs = [
  "howStep1Desc",
  "howStep2Desc",
  "howStep3Desc",
] as const;

export function HomeHowItWorks({ locale }: HomeHowItWorksProps) {
  const t = homeTranslations[locale];

  return (
    <section className="section-how-organic relative py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-section-title text-[var(--text-primary)]">
          {t.howTitle}
        </h2>
        <p className="mt-2 text-center text-[var(--text-secondary)]">
          {t.howSubtitle}
        </p>
        <div className="mt-16 grid gap-10 sm:grid-cols-3">
          {steps.map((key, i) => (
            <div key={key} className="relative text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--navy-primary)]/20 bg-[var(--surface)] text-xl font-bold text-[var(--navy-primary)] shadow-[var(--shadow-card)]">
                {i + 1}
              </div>
              <h3 className="mt-5 font-semibold text-[var(--text-primary)]">
                {t[key]}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                {t[stepDescs[i]]}
              </p>
              {i < steps.length - 1 && (
                <span
                  className="absolute right-0 top-7 hidden text-[var(--text-muted)] sm:block"
                  aria-hidden
                >
                  →
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="mt-14 flex justify-center">
          <Button href={`/${locale}/how-it-works`} variant="secondary" size="lg">
            {t.howCta}
          </Button>
        </div>
      </div>
    </section>
  );
}
