"use client";

import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { CarOptionPreview, type PriceDisplay } from "@/components/CarOptionPreview";
import {
  VehicleFilters,
  type TransmissionFilter,
  type FuelFilter,
} from "@/components/VehicleFilters";
import type { VehicleOption } from "@/data/types/vehicle";
import { vehicleTranslations, type Locale } from "@/data/translations";
import {
  catalogSegmentFromSearchParams,
  motorisationPresetFromSearchParams,
  catalogHref,
  type CatalogSegment,
} from "@/lib/vehiclesCatalog";

interface VehiclesCatalogProps {
  allVehicles: VehicleOption[];
  locale: Locale;
  basePath: string;
}

function segmentPillClass(active: boolean): string {
  return [
    "shrink-0 snap-start rounded-full border px-4 py-2.5 text-sm font-semibold transition-all",
    active
      ? "border-[var(--navy-primary)] bg-[var(--navy-primary)] text-white shadow-[var(--shadow-card)]"
      : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:border-[var(--navy-primary)]/30 hover:text-[var(--text-primary)]",
  ].join(" ");
}

type Pill = {
  segment: CatalogSegment;
  motor: "all" | "electric" | "thermique";
  label: string;
};

export function VehiclesCatalog({ allVehicles, locale, basePath }: VehiclesCatalogProps) {
  const t = vehicleTranslations[locale];
  const searchParams = useSearchParams();

  const segment = useMemo(
    () => catalogSegmentFromSearchParams(searchParams),
    [searchParams]
  );

  const motorPreset = useMemo(
    () => motorisationPresetFromSearchParams(searchParams, segment),
    [searchParams, segment]
  );

  const baseList = useMemo(() => {
    return allVehicles.filter((v) => v.vehicleCategory === segment);
  }, [allVehicles, segment]);

  const isEquipment = segment === "professionnel" || segment === "materiel";

  const [priceDisplay, setPriceDisplay] = useState<PriceDisplay>("month");
  const [selectedSeats, setSelectedSeats] = useState<number | "all">("all");
  const [selectedTransmission, setSelectedTransmission] =
    useState<TransmissionFilter>("all");
  const [selectedFuel, setSelectedFuel] = useState<FuelFilter>("all");

  useEffect(() => {
    if (segment !== "particulier") {
      setSelectedFuel("all");
      return;
    }
    if (motorPreset === "electric") {
      setSelectedFuel("electric");
      return;
    }
    if (motorPreset === "thermique") {
      setSelectedFuel("thermique");
      return;
    }
    setSelectedFuel("all");
  }, [segment, motorPreset]);

  const uniqueSeats = useMemo(
    () => Array.from(new Set(baseList.map((v) => v.seats))).sort((a, b) => a - b),
    [baseList]
  );

  const filteredVehicles = useMemo(() => {
    if (isEquipment) return baseList;
    return baseList.filter((vehicle) => {
      if (selectedSeats !== "all" && vehicle.seats !== selectedSeats) return false;
      if (
        selectedTransmission !== "all" &&
        vehicle.transmission !== selectedTransmission
      )
        return false;
      if (selectedFuel === "thermique") {
        if (vehicle.fuelType === "electric") return false;
        return vehicle.fuelType === "diesel" || vehicle.fuelType === "essence";
      }
      if (selectedFuel !== "all" && vehicle.fuelType !== selectedFuel) return false;
      return true;
    });
  }, [baseList, isEquipment, selectedSeats, selectedTransmission, selectedFuel]);

  const { eyebrow, title, subtitle } = catalogCopy(locale, segment);

  const pills: Pill[] = [
    { segment: "particulier", motor: "all", label: t.segmentParticulier },
    { segment: "particulier", motor: "electric", label: t.segmentElectric },
    { segment: "particulier", motor: "thermique", label: t.segmentThermique },
    { segment: "professionnel", motor: "all", label: t.segmentPro },
    { segment: "materiel", motor: "all", label: t.segmentMateriel },
  ];

  function pillActive(p: Pill): boolean {
    if (p.segment === "particulier") {
      return segment === "particulier" && motorPreset === p.motor;
    }
    return segment === p.segment;
  }

  return (
    <div className="space-y-10">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
          {eyebrow}
        </p>
        <h1 className="mt-3 text-3xl font-bold text-[var(--text-primary)] sm:text-4xl">
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-[var(--text-secondary)]">{subtitle}</p>
      </div>

      <div className="space-y-3">
        <p className="text-center text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
          {t.catalogChooseRange}
        </p>
        <div className="scrollbar-hide -mx-1 flex snap-x snap-mandatory gap-2 overflow-x-auto px-1 pb-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 sm:pb-0">
          {pills.map((p) => (
            <Link
              key={`${p.segment}-${p.motor}`}
              href={catalogHref(basePath, p.segment, p.motor)}
              scroll={false}
              className={segmentPillClass(pillActive(p))}
            >
              {p.label}
            </Link>
          ))}
        </div>
      </div>

      {!isEquipment && (
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-start">
            <span className="text-sm font-medium text-[var(--text-primary)]">
              {locale === "fr" ? "Tarifs affichés" : "Prices shown"}
            </span>
            <div className="flex rounded-xl border border-[var(--border)] bg-[var(--surface)] p-1 shadow-[var(--shadow-card)]">
              <button
                type="button"
                onClick={() => setPriceDisplay("month")}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  priceDisplay === "month"
                    ? "bg-[var(--navy-primary)] text-white shadow-sm"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {t.pricePerMonth}
              </button>
              <button
                type="button"
                onClick={() => setPriceDisplay("day")}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  priceDisplay === "day"
                    ? "bg-[var(--navy-primary)] text-white shadow-sm"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {t.pricePerDay}
              </button>
            </div>
          </div>
          <VehicleFilters
            locale={locale}
            seats={uniqueSeats}
            selectedSeats={selectedSeats}
            selectedTransmission={selectedTransmission}
            selectedFuel={selectedFuel}
            onSeatsChange={setSelectedSeats}
            onTransmissionChange={setSelectedTransmission}
            onFuelChange={setSelectedFuel}
          />
        </div>
      )}

      {filteredVehicles.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredVehicles.map((vehicle) => (
            <CarOptionPreview
              key={vehicle.id}
              vehicle={vehicle}
              locale={locale}
              href={`${basePath}/vehicles/${vehicle.slug}`}
              priceDisplay={isEquipment ? "month" : priceDisplay}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-8 py-20 text-center shadow-[var(--shadow-card)]">
          <p className="text-[var(--text-secondary)]">{t.noResults}</p>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            {locale === "fr"
              ? "Essayez une autre gamme ou d’ajuster les filtres."
              : "Try another range or adjust the filters."}
          </p>
          <Link
            href={catalogHref(basePath, "particulier")}
            className="mt-6 inline-block text-sm font-semibold text-[var(--navy-primary)] underline-offset-2 hover:underline"
          >
            {t.catalogResetLink}
          </Link>
        </div>
      )}
    </div>
  );
}

function catalogCopy(locale: Locale, segment: CatalogSegment) {
  const t = vehicleTranslations[locale];
  if (segment === "professionnel") {
    return {
      eyebrow: t.catalogEyebrowPro,
      title: t.catalogTitlePro,
      subtitle: t.catalogSubtitlePro,
    };
  }
  if (segment === "materiel") {
    return {
      eyebrow: t.catalogEyebrowMateriel,
      title: t.catalogTitleMateriel,
      subtitle: t.catalogSubtitleMateriel,
    };
  }
  return {
    eyebrow: t.catalogEyebrowParticulier,
    title: t.catalogTitleParticulier,
    subtitle: t.catalogSubtitleParticulier,
  };
}
