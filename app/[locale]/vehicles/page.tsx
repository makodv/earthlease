import { isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { VehicleListWithFilters } from "@/components/VehicleListWithFilters";
import { vehiclesParticulier } from "@/data/vehicles";
import type { Locale } from "@/data/translations";

export default async function VehiclesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <h1 className="text-3xl font-bold text-[var(--foreground)]">
        {locale === "fr" ? "Nos véhicules" : "Our vehicles"}
      </h1>
      <p className="mt-2 text-[var(--muted)]">
        {locale === "fr"
          ? "Choisissez le véhicule qui vous correspond."
          : "Choose the vehicle that suits you."}
      </p>

      <div className="mt-10">
        <VehicleListWithFilters
          vehicles={vehiclesParticulier}
          locale={locale as Locale}
          basePath={`/${locale}`}
        />
      </div>
    </div>
  );
}
