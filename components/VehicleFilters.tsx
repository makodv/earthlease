"use client";

import { vehicleTranslations, type Locale } from "@/data/translations";
import type { FuelType } from "@/data/types/vehicle";
import { inputBase } from "@/components/ui/Card";

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
    <div className="flex flex-wrap items-end gap-6 rounded-xl border border-white/20 bg-white/70 p-5 shadow-[0_4px_24px_rgba(6,46,91,0.08)] backdrop-blur-md">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="filter-seats"
          className="text-sm font-medium text-[var(--text-primary)]"
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
          className={`${inputBase} min-w-[140px] py-2.5`}
        >
          <option value="all">{t.all}</option>
          {seats.map((n) => (
            <option key={n} value={n}>
              {n} {t.seats}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="filter-transmission"
          className="text-sm font-medium text-[var(--text-primary)]"
        >
          {t.filterTransmission}
        </label>
        <select
          id="filter-transmission"
          value={selectedTransmission}
          onChange={(e) =>
            onTransmissionChange(e.target.value as TransmissionFilter)
          }
          className={`${inputBase} min-w-[160px] py-2.5`}
        >
          <option value="all">{t.all}</option>
          <option value="manual">{t.manual}</option>
          <option value="automatic">{t.automatic}</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="filter-fuel"
          className="text-sm font-medium text-[var(--text-primary)]"
        >
          {t.filterFuel}
        </label>
        <select
          id="filter-fuel"
          value={selectedFuel}
          onChange={(e) => onFuelChange(e.target.value as FuelFilter)}
          className={`${inputBase} min-w-[140px] py-2.5`}
        >
          <option value="all">{t.all}</option>
          <option value="diesel">{t.diesel}</option>
          <option value="essence">{t.essence}</option>
        </select>
      </div>
    </div>
  );
}
