"use client";

import Link from "next/link";
import Image from "next/image";
import type { VehicleOption } from "@/data/types/vehicle";
import { vehicleTranslations, type Locale } from "@/data/translations";

interface HomeVehicleCardProps {
  vehicle: VehicleOption;
  locale: Locale;
}

export function HomeVehicleCard({ vehicle, locale }: HomeVehicleCardProps) {
  const t = vehicleTranslations[locale];
  const href = `/${locale}/vehicles/${vehicle.slug}`;

  return (
    <Link
      href={href}
      className="group flex w-[280px] shrink-0 snap-start flex-col overflow-hidden rounded-xl border border-white/25 bg-white/80 shadow-lg transition-all hover:border-[var(--navy-primary)]/30 hover:shadow-xl hover:bg-white"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#eef2f7]">
        {vehicle.image ? (
          <Image
            src={vehicle.image}
            alt={`${vehicle.brand} ${vehicle.name}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="280px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[var(--text-muted)]">
            <svg
              className="h-12 w-12 opacity-40"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
              />
            </svg>
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-md border border-white/30 bg-white/90 px-2 py-0.5 text-xs font-medium text-[var(--text-primary)]">
          {vehicle.brand}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-bold text-[var(--text-primary)]">
          {vehicle.brand} {vehicle.name}
        </h3>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          {t.from} {vehicle.pricePerMonth.toLocaleString(locale === "fr" ? "fr-FR" : "en-US")}
          {vehicle.currency ?? "€"}
          {t.perMonth}
        </p>
      </div>
    </Link>
  );
}
