"use client";

import { homeTranslations, type Locale } from "@/data/translations";
import { Button } from "@/components/ui/Button";

interface HomeHowItWorksProps {
  locale: Locale;
}

const STEP_KEYS = [
  { title: "howStep1Title", desc: "howStep1Desc" },
  { title: "howStep2Title", desc: "howStep2Desc" },
  { title: "howStep3Title", desc: "howStep3Desc" },
  { title: "howStep4Title", desc: "howStep4Desc" },
] as const;

function IconCar({ className }: { className?: string }) {
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
      <path d="M5 17h14v-5H5v5z" />
      <path d="M7 12V9h10v3" />
      <path d="M2 12h3M19 12h3" />
      <circle cx="7.5" cy="17" r="1.25" fill="currentColor" stroke="none" />
      <circle cx="16.5" cy="17" r="1.25" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconClipboard({ className }: { className?: string }) {
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
      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
      <path d="M9 5a2 2 0 012-2h2a2 2 0 012 2v0a2 2 0 01-2 2h-2a2 2 0 01-2-2v0z" />
      <path d="M9 12h6M9 16h4" />
    </svg>
  );
}

function IconCalendarClock({ className }: { className?: string }) {
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
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
      <circle cx="16" cy="16" r="3.25" />
      <path d="M16 14.25V16l1.25 1.25" />
    </svg>
  );
}

function IconShieldCheck({ className }: { className?: string }) {
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
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

const STEP_ICONS = [IconCar, IconClipboard, IconCalendarClock, IconShieldCheck] as const;

export function HomeHowItWorks({ locale }: HomeHowItWorksProps) {
  const t = homeTranslations[locale];

  return (
    <section className="section-how-organic relative overflow-hidden py-16 sm:py-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(ellipse 120% 70% at 50% -10%, rgba(92, 184, 92, 0.09) 0%, transparent 45%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-bold tracking-tight text-[var(--navy-primary)] sm:text-3xl lg:text-4xl">
          {t.howTitle}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-sm leading-relaxed text-stone-600 sm:text-base">
          {t.howSubtitle}
        </p>

        {/* Elevated timeline “module” */}
        <div className="how-timeline-feature relative mx-auto mt-10 max-w-5xl rounded-[1.75rem] border-2 border-[#062e5b]/14 bg-white p-6 sm:mt-12 sm:p-9 lg:mt-14 lg:max-w-6xl lg:rounded-[2rem] lg:p-12 lg:pt-14">
          <div
            className="absolute left-1/2 top-0 h-1.5 w-28 -translate-x-1/2 rounded-b-full bg-[var(--accent-green)] shadow-[0_2px_12px_rgba(92,184,92,0.45)]"
            aria-hidden
          />
          <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-[var(--navy-primary)]/70">
            {t.howProcessLabel}
          </p>

          {/* Mobile: vertical timeline inside card */}
          <div className="relative mt-8 md:hidden">
            <ul className="space-y-0">
              {STEP_KEYS.map((keys, i) => {
                const Icon = STEP_ICONS[i];
                return (
                  <li key={keys.title} className="relative flex gap-5 pb-11 last:pb-0">
                    {i < STEP_KEYS.length - 1 ? (
                      <span
                        className="absolute bottom-0 left-[27px] top-14 w-0.5 bg-gradient-to-b from-[var(--navy-primary)]/20 via-stone-300 to-stone-200"
                        aria-hidden
                      />
                    ) : null}
                    <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-[#062e5b]/18 bg-gradient-to-b from-white to-stone-50 text-[var(--navy-primary)] shadow-md ring-4 ring-white">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="min-w-0 border-b border-stone-100 pb-8 last:border-0 last:pb-0">
                      <h3 className="text-base font-semibold leading-snug text-[var(--navy-primary)]">
                        {t[keys.title]}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-stone-600">{t[keys.desc]}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Desktop: horizontal track */}
          <div className="relative mx-auto mt-10 hidden max-w-[68rem] md:block">
            <div
              className="how-timeline-track pointer-events-none absolute left-[4%] right-[4%] top-[30px] z-0 h-3 rounded-full"
              aria-hidden
            />
            <ol className="relative z-10 grid grid-cols-4 gap-2 lg:gap-5">
              {STEP_KEYS.map((keys, i) => {
                const Icon = STEP_ICONS[i];
                return (
                  <li
                    key={keys.title}
                    className="group flex flex-col items-center text-center transition duration-200 ease-out will-change-transform hover:-translate-y-1"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#062e5b]/20 bg-gradient-to-b from-white to-stone-50 text-[var(--navy-primary)] shadow-md ring-[10px] ring-white transition group-hover:border-[var(--accent-green)]/50 group-hover:shadow-lg lg:h-[3.75rem] lg:w-[3.75rem]">
                      <Icon className="h-6 w-6 lg:h-7 lg:w-7" />
                    </div>
                    <h3 className="mt-5 max-w-[13rem] text-[0.8125rem] font-semibold leading-snug text-[var(--navy-primary)] lg:max-w-[14rem] lg:text-sm">
                      {t[keys.title]}
                    </h3>
                    <p className="mt-2 max-w-[13.5rem] text-[0.6875rem] leading-relaxed text-stone-600 lg:text-xs">
                      {t[keys.desc]}
                    </p>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        <div className="mt-10 flex justify-center sm:mt-12">
          <Button href={`/${locale}/how-it-works`} variant="accent" size="lg" className="rounded-full px-8">
            {t.howCta}
          </Button>
        </div>
      </div>
    </section>
  );
}
