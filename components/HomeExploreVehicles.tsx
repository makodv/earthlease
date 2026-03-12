"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { homeTranslations, type Locale } from "@/data/translations";
import { Button } from "@/components/ui/Button";
import { HomeVehicleCard } from "@/components/HomeVehicleCard";
import { vehiclesParticulier } from "@/data/vehicles";

const CARD_WIDTH = 296; // card width + gap
const GAP = 24;

interface HomeExploreVehiclesProps {
  locale: Locale;
}

export function HomeExploreVehicles({ locale }: HomeExploreVehiclesProps) {
  const t = homeTranslations[locale];
  const featuredVehicles = vehiclesParticulier.slice(0, 8);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const updateProgress = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    if (max <= 0) {
      setScrollProgress(0);
      return;
    }
    setScrollProgress(el.scrollLeft / max);
  }, []);

  useEffect(() => {
    updateProgress();
    window.addEventListener("resize", updateProgress);
    return () => window.removeEventListener("resize", updateProgress);
  }, [updateProgress, featuredVehicles.length]);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const step = CARD_WIDTH + GAP;
    el.scrollBy({ left: dir === "left" ? -step : step, behavior: "smooth" });
  };

  return (
    <section className="section-explore-organic relative overflow-hidden py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
          {t.exploreEyebrow}
        </p>
        <h2 className="mt-3 text-center text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
          {t.exploreTitle}
        </h2>
        <p className="mt-4 max-w-xl mx-auto text-center text-[var(--text-secondary)]">
          {t.exploreSubtitle}
        </p>

        <div className="mt-10 flex justify-center">
          <Button
            href={`/${locale}/vehicles`}
            variant="accent"
            size="lg"
            className="min-w-[240px]"
          >
            {t.exploreCta}
          </Button>
        </div>

        <div className="relative mt-14">
          <button
            type="button"
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] shadow-[var(--shadow-card)] transition hover:border-[var(--navy-primary)]/25 hover:shadow-[var(--shadow-lift)]"
            aria-label={locale === "fr" ? "Précédent" : "Previous"}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] shadow-[var(--shadow-card)] transition hover:border-[var(--navy-primary)]/25 hover:shadow-[var(--shadow-lift)]"
            aria-label={locale === "fr" ? "Suivant" : "Next"}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div
            ref={scrollRef}
            onScroll={updateProgress}
            className="scrollbar-hide flex gap-6 overflow-x-auto scroll-smooth py-4 pb-6 pl-14 pr-14 md:gap-8"
          >
            {featuredVehicles.map((vehicle) => (
              <HomeVehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                locale={locale}
              />
            ))}
          </div>

          <div className="mx-auto mt-4 h-1 w-48 overflow-hidden rounded-full bg-[var(--border)]">
            <div
              className="h-full rounded-full bg-[var(--accent-green)] transition-all duration-300"
              style={{ width: `${20 + 80 * scrollProgress}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
