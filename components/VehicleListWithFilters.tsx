"use client";

import { useMemo, useState } from "react";
import { CarOptionPreview, type PriceDisplay } from "@/components/CarOptionPreview";
import {
  VehicleFilters,
  type TransmissionFilter,
  type FuelFilter,
} from "@/components/VehicleFilters";
import type { VehicleOption } from "@/data/types/vehicle";
import { vehicleTranslations, type Locale } from "@/data/translations";

interface VehicleListWithFiltersProps {
  vehicles: VehicleOption[];
  locale: Locale;
  basePath: string;
}

export function VehicleListWithFilters({
  vehicles,
  locale,
  basePath,
}: VehicleListWithFiltersProps) {
  const t = vehicleTranslations[locale];

  const [priceDisplay, setPriceDisplay] = useState<PriceDisplay>("month");
  const [selectedSeats, setSelectedSeats] = useState<number | "all">("all");
  const [selectedTransmission, setSelectedTransmission] =
    useState<TransmissionFilter>("all");
  const [selectedFuel, setSelectedFuel] = useState<FuelFilter>("all");

  const uniqueSeats = useMemo(
    () => Array.from(new Set(vehicles.map((v) => v.seats))).sort((a, b) => a - b),
    [vehicles]
  );

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      if (selectedSeats !== "all" && vehicle.seats !== selectedSeats)
        return false;
      if (
        selectedTransmission !== "all" &&
        vehicle.transmission !== selectedTransmission
      )
        return false;
      if (selectedFuel !== "all" && vehicle.fuelType !== selectedFuel)
        return false;
      return true;
    });
  }, [vehicles, selectedSeats, selectedTransmission, selectedFuel]);

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center gap-4">
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

      {filteredVehicles.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredVehicles.map((vehicle) => (
            <CarOptionPreview
              key={vehicle.id}
              vehicle={vehicle}
              locale={locale}
              href={`${basePath}/vehicles/${vehicle.slug}`}
              priceDisplay={priceDisplay}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-8 py-20 text-center shadow-[var(--shadow-card)]">
          <p className="text-[var(--text-secondary)]">{t.noResults}</p>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            {locale === "fr"
              ? "Essayez d’ajuster les filtres."
              : "Try adjusting the filters."}
          </p>
        </div>
      )}
    </div>
  );
}
