"use client";

import { vehicleTranslations, type Locale } from "@/data/translations";
import type { FuelType } from "@/data/types/vehicle";

export type TransmissionFilter = "all" | "manual" | "automatic";
export type FuelFilter = "all" | FuelType;

interface VehicleFiltersProps {
  locale: Locale;
  seats: number[];
  selectedSeats: number | "all";
  selectedTransmission: TransmissionFilter;
  selectedFuel: FuelFilter;
  onSeatsChange: (value: number | "all") => void;
  onTransmissionChange: (value: TransmissionFilter) => void;
  onFuelChange: (value: FuelFilter) => void;
}

export function VehicleFilters({
  locale,
  seats,
  selectedSeats,
  selectedTransmission,
  selectedFuel,
  onSeatsChange,
  onTransmissionChange,
  onFuelChange,
}: VehicleFiltersProps) {
  const t = vehicleTranslations[locale];

  return (
    <div className="flex flex-wrap items-end gap-4 rounded-xl border border-[var(--border)] bg-white p-4">
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="filter-seats"
          className="text-sm font-medium text-[var(--foreground)]"
        >
          {t.filterSeats}
        </label>
        <select
          id="filter-seats"
          value={selectedSeats}
          onChange={(e) =>
            onSeatsChange(
              e.target.value === "all" ? "all" : Number(e.target.value)
            )
          }
          className="rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-sm text-[var(--foreground)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] min-w-[120px]"
        >
          <option value="all">{t.all}</option>
          {seats.map((n) => (
            <option key={n} value={n}>
              {n} {t.seats}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="filter-transmission"
          className="text-sm font-medium text-[var(--foreground)]"
        >
          {t.filterTransmission}
        </label>
        <select
          id="filter-transmission"
          value={selectedTransmission}
          onChange={(e) =>
            onTransmissionChange(e.target.value as TransmissionFilter)
          }
          className="rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-sm text-[var(--foreground)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] min-w-[140px]"
        >
          <option value="all">{t.all}</option>
          <option value="manual">{t.manual}</option>
          <option value="automatic">{t.automatic}</option>
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="filter-fuel"
          className="text-sm font-medium text-[var(--foreground)]"
        >
          {t.filterFuel}
        </label>
        <select
          id="filter-fuel"
          value={selectedFuel}
          onChange={(e) => onFuelChange(e.target.value as FuelFilter)}
          className="rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-sm text-[var(--foreground)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] min-w-[120px]"
        >
          <option value="all">{t.all}</option>
          <option value="diesel">{t.diesel}</option>
          <option value="essence">{t.essence}</option>
        </select>
      </div>
    </div>
  );
}
