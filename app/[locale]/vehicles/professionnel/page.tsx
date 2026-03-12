import { isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { VehicleListWithFilters } from "@/components/VehicleListWithFilters";
import { vehiclesProfessionnel } from "@/data/vehicles";
import type { Locale } from "@/data/translations";

export default async function VehiclesProfessionnelPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const title = locale === "fr" ? "Véhicules professionnels" : "Professional vehicles";
  const subtitle =
    locale === "fr"
      ? "Utilitaires, véhicules de construction et chantier."
      : "Commercial, construction and utility vehicles.";

  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <h1 className="text-3xl font-bold text-[var(--foreground)]">{title}</h1>
      <p className="mt-2 text-[var(--muted)]">{subtitle}</p>

      <div className="mt-10">
        <VehicleListWithFilters
          vehicles={vehiclesProfessionnel}
          locale={locale as Locale}
          basePath={`/${locale}`}
        />
      </div>
    </div>
  );
}
