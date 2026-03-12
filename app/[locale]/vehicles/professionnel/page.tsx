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
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8" style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(6,46,91,0.05) 0%, transparent 50%), #f4f7fb" }}>
      <h1 className="text-section-title text-[var(--text-primary)]">{title}</h1>
      <p className="mt-4 text-body-lg text-[var(--text-secondary)]">{subtitle}</p>

      <div className="mt-12">
        <VehicleListWithFilters
          vehicles={vehiclesProfessionnel}
          locale={locale as Locale}
          basePath={`/${locale}`}
        />
      </div>
    </div>
  );
}
