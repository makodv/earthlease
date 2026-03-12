"use client";

import { useMemo, useState } from "react";
import { CarOptionPreview } from "@/components/CarOptionPreview";
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
    <div className="space-y-8">
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

      {filteredVehicles.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredVehicles.map((vehicle) => (
            <CarOptionPreview
              key={vehicle.id}
              vehicle={vehicle}
              locale={locale}
              href={`${basePath}/vehicles/${vehicle.slug}`}
            />
          ))}
        </div>
      ) : (
        <p className="rounded-xl border border-[var(--border)] bg-[var(--muted-bg)] px-6 py-12 text-center text-[var(--muted)]">
          {t.noResults}
        </p>
      )}
    </div>
  );
}
