"use client";

import { homeTranslations, type Locale } from "@/data/translations";
import { Card } from "@/components/ui/Card";

const STARS = "★★★★★";

interface HomeReviewsProps {
  locale: Locale;
}

function ReviewCard({
  name,
  text,
  locale,
}: {
  name: string;
  text: string;
  locale: Locale;
}) {
  return (
    <Card variant="glass" className="flex flex-col">
      <div className="mb-3 flex items-center gap-2">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--navy-primary)] text-sm font-semibold text-white">
          {name.charAt(0)}
        </span>
        <span className="text-sm font-medium text-[var(--text-primary)]">
          {name}
        </span>
      </div>
      <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
        {text}
      </p>
      <p className="mt-3 text-xs text-amber-600" aria-hidden>
        {STARS} 5.0
      </p>
    </Card>
  );
}

export function HomeReviews({ locale }: HomeReviewsProps) {
  const t = homeTranslations[locale];
  const reviews = [
    { name: t.review1Name, text: t.review1Text },
    { name: t.review2Name, text: t.review2Text },
    { name: t.review3Name, text: t.review3Text },
    { name: t.review4Name, text: t.review4Text },
  ];

  return (
    <section
      className="relative py-20"
      style={{
        background:
          "radial-gradient(ellipse 70% 60% at 30% 40%, rgba(6, 46, 91, 0.06) 0%, transparent 55%), radial-gradient(ellipse 60% 50% at 70% 60%, rgba(92, 184, 92, 0.05) 0%, transparent 50%), linear-gradient(180deg, #e8eef5 0%, #eef2f7 40%, #f4f7fb 100%)",
      }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-section-title text-[var(--text-primary)]">
          {t.reviewsTitle}
        </h2>
        <p className="mt-2 text-center text-[var(--text-secondary)]">
          {t.reviewsSubtitle}
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reviews.map((r) => (
            <ReviewCard
              key={r.name}
              name={r.name}
              text={r.text}
              locale={locale}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
