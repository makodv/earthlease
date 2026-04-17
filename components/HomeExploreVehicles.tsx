"use client";

import Link from "next/link";
import { useRef, useState, useCallback, useEffect, useMemo } from "react";
import { homeTranslations, vehicleTranslations, type Locale } from "@/data/translations";
import { HomeVehicleCard } from "@/components/HomeVehicleCard";
import {
  vehiclesMaterielProfessionnel,
  vehiclesParticulier,
  vehiclesProfessionnel,
} from "@/data/vehicles";
import type { VehicleOption } from "@/data/types/vehicle";
import { catalogHref } from "@/lib/vehiclesCatalog";
import {
  EXPLORE_TAB_PRO_INDEX,
  useCatalogLandingFromAudience,
} from "@/hooks/useCatalogLandingFromAudience";

const CARD_WIDTH = 296;
const GAP = 24;

interface HomeExploreVehiclesProps {
  locale: Locale;
}

interface PreviewTab {
  id: string;
  label: string;
  vehicles: VehicleOption[];
  catalogHref: string;
}

function tabChipClass(active: boolean): string {
  if (active) {
    return "inline-flex min-h-[44px] shrink-0 snap-start items-center justify-center rounded-full border border-[var(--accent-green)] bg-[var(--accent-green)] px-4 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--accent-green-hover)]";
  }
  return "inline-flex min-h-[44px] shrink-0 snap-start items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-center text-sm font-semibold text-[var(--text-primary)] shadow-[var(--shadow-card)] transition hover:border-[var(--navy-primary)]/25 hover:shadow-[var(--shadow-lift)]";
}

export function HomeExploreVehicles({ locale }: HomeExploreVehiclesProps) {
  const t = homeTranslations[locale];
  const vt = vehicleTranslations[locale];
  const basePath = `/${locale}`;
  const { audience, hasMounted, catalogLandingHref } =
    useCatalogLandingFromAudience(basePath);

  const previewTabs = useMemo((): PreviewTab[] => {
    const electric = vehiclesParticulier.filter((v) => v.fuelType === "electric");
    const thermique = vehiclesParticulier.filter(
      (v) => v.fuelType === "diesel" || v.fuelType === "essence"
    );
    return [
      {
        id: "particulier",
        label: vt.segmentParticulier,
        vehicles: vehiclesParticulier,
        catalogHref: catalogLandingHref,
      },
      {
        id: "electric",
        label: vt.segmentElectric,
        vehicles: electric,
        catalogHref: catalogHref(basePath, "particulier", "electric"),
      },
      {
        id: "thermique",
        label: vt.segmentThermique,
        vehicles: thermique,
        catalogHref: catalogHref(basePath, "particulier", "thermique"),
      },
      {
        id: "pro",
        label: vt.segmentPro,
        vehicles: vehiclesProfessionnel,
        catalogHref: catalogHref(basePath, "professionnel"),
      },
      {
        id: "materiel",
        label: vt.segmentMateriel,
        vehicles: vehiclesMaterielProfessionnel,
        catalogHref: catalogHref(basePath, "materiel"),
      },
    ];
  }, [basePath, vt, catalogLandingHref]);

  const [activeIndex, setActiveIndex] = useState(0);
  const activeTab = previewTabs[activeIndex] ?? previewTabs[0];

  useEffect(() => {
    if (!hasMounted) return;
    setActiveIndex(audience === "professionnel" ? EXPLORE_TAB_PRO_INDEX : 0);
  }, [hasMounted, audience]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScroll, setCanScroll] = useState(false);

  const updateProgress = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const scrollable = max > 4;
    setCanScroll(scrollable);
    if (!scrollable) {
      setScrollProgress(0);
      return;
    }
    setScrollProgress(el.scrollLeft / max);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollLeft = 0;
    updateProgress();
  }, [activeIndex, activeTab.id, activeTab.vehicles.length, updateProgress]);

  useEffect(() => {
    updateProgress();
    window.addEventListener("resize", updateProgress);
    return () => window.removeEventListener("resize", updateProgress);
  }, [updateProgress, activeTab.vehicles.length]);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const step = CARD_WIDTH + GAP;
    el.scrollBy({ left: dir === "left" ? -step : step, behavior: "smooth" });
  };

  const navDisabled = !canScroll;

  return (
    <section className="section-explore-organic relative overflow-hidden py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
          {t.exploreEyebrow}
        </p>
        <h2 className="mt-3 text-center text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
          {t.exploreTitle}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-[var(--text-secondary)]">
          {t.exploreSubtitle}
        </p>

        <div className="mt-10 flex flex-col items-center gap-4">
          <div
            role="tablist"
            aria-label={locale === "fr" ? "Choisir une gamme à prévisualiser" : "Choose a range to preview"}
            className="scrollbar-hide flex w-full max-w-3xl snap-x snap-mandatory flex-wrap justify-center gap-2 overflow-x-auto px-1 pb-1 sm:overflow-visible"
          >
            {previewTabs.map((tab, i) => (
              <button
                key={tab.id}
                id={`explore-tab-${tab.id}`}
                type="button"
                role="tab"
                aria-selected={i === activeIndex}
                className={tabChipClass(i === activeIndex)}
                onClick={() => setActiveIndex(i)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm">
            <Link
              href={activeTab.catalogHref}
              className="font-semibold text-[var(--navy-primary)] underline-offset-2 hover:underline"
            >
              {t.exploreSeeRangeInCatalog}
            </Link>
            <span className="hidden text-[var(--text-muted)] sm:inline" aria-hidden>
              ·
            </span>
            <Link
              href={catalogLandingHref}
              className="font-medium text-[var(--text-secondary)] underline-offset-2 hover:text-[var(--navy-primary)] hover:underline"
            >
              {t.exploreCta}
            </Link>
          </div>
        </div>

        <p className="mt-10 text-center text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
          {activeTab.label} — {t.exploreCarouselCaption}
        </p>

        <div className="relative mt-4">
          <button
            type="button"
            disabled={navDisabled}
            onClick={() => scroll("left")}
            className={`absolute left-0 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] shadow-[var(--shadow-card)] transition hover:border-[var(--navy-primary)]/25 hover:shadow-[var(--shadow-lift)] ${
              navDisabled ? "pointer-events-none opacity-40" : ""
            }`}
            aria-label={locale === "fr" ? "Faire défiler vers la gauche" : "Scroll left"}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            disabled={navDisabled}
            onClick={() => scroll("right")}
            className={`absolute right-0 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] shadow-[var(--shadow-card)] transition hover:border-[var(--navy-primary)]/25 hover:shadow-[var(--shadow-lift)] ${
              navDisabled ? "pointer-events-none opacity-40" : ""
            }`}
            aria-label={locale === "fr" ? "Faire défiler vers la droite" : "Scroll right"}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div
            ref={scrollRef}
            onScroll={updateProgress}
            role="tabpanel"
            aria-labelledby={`explore-tab-${activeTab?.id ?? "particulier"}`}
            className="scrollbar-hide flex min-h-[200px] gap-6 overflow-x-auto scroll-smooth py-4 pb-6 pl-14 pr-14 md:gap-8"
          >
            {activeTab.vehicles.length > 0 ? (
              activeTab.vehicles.map((vehicle) => (
                <HomeVehicleCard key={`${activeTab.id}-${vehicle.id}`} vehicle={vehicle} locale={locale} />
              ))
            ) : (
              <p className="w-full py-12 text-center text-sm text-[var(--text-muted)]">
                {locale === "fr" ? "Aucun modèle dans cette sélection." : "No models in this selection."}
              </p>
            )}
          </div>

          <div className="mx-auto mt-4 h-1 w-48 overflow-hidden rounded-full bg-[var(--border)]">
            <div
              className="h-full rounded-full bg-[var(--accent-green)] transition-all duration-300"
              style={{ width: canScroll ? `${20 + 80 * scrollProgress}%` : "100%" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
