import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getVehicleBySlug, getAllVehicleSlugs } from "@/data/vehicles";
import { isValidLocale, locales } from "@/lib/i18n";
import { listPathForVehicleCategory } from "@/lib/vehiclesCatalog";
import { vehicleTranslations, type Locale } from "@/data/translations";
import { Button } from "@/components/ui/Button";
import { SITE_ORIGIN, hreflangAlternates } from "@/lib/siteOrigin";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) return {};
  const vehicle = getVehicleBySlug(slug);
  if (!vehicle) return {};

  const loc = locale as Locale;
  const isFr = locale === "fr";
  const path = `/vehicles/${slug}`;
  const url = `${SITE_ORIGIN}/${locale}${path}`;
  const categoryLabel = vehicle.category ?? "";

  const title = isFr
    ? `Location ${vehicle.brand} ${vehicle.name} — ${categoryLabel} | EarthLease`
    : `Rent ${vehicle.brand} ${vehicle.name} — ${categoryLabel} | EarthLease`;

  const description = isFr
    ? `Louez le ${vehicle.brand} ${vehicle.name} (${categoryLabel}) à partir d'1 mois. ${vehicle.priceOnRequest ? "Tarif sur devis." : `À partir de ${vehicle.pricePerMonth}€/mois.`} Devis rapide chez EarthLease.`
    : `Rent the ${vehicle.brand} ${vehicle.name} (${categoryLabel}) from 1 month. ${vehicle.priceOnRequest ? "Quote-based pricing." : `From ${vehicle.pricePerMonth}€/month.`} Fast quote at EarthLease.`;

  const imagePath = vehicle.image ?? "/og-image.jpg";
  const ogImageUrl = new URL(imagePath, SITE_ORIGIN).href;

  return {
    title,
    description,
    alternates: hreflangAlternates(loc, path),
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: vehicle.image ? `${vehicle.brand} ${vehicle.name}` : "EarthLease",
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  const slugs = getAllVehicleSlugs();
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export default async function VehicleDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();

  const vehicle = getVehicleBySlug(slug);
  if (!vehicle) notFound();

  const t = vehicleTranslations[locale as Locale];
  const transmissionLabel =
    vehicle.transmission === "automatic" ? t.automatic : t.manual;
  const fuelLabel =
    vehicle.fuelType === "diesel"
      ? t.diesel
      : vehicle.fuelType === "electric"
        ? t.electric
        : t.essence;

  const listPath = listPathForVehicleCategory(locale, vehicle.vehicleCategory);
  const backLabel =
    vehicle.vehicleCategory === "professionnel"
      ? t.backToProList
      : vehicle.vehicleCategory === "materiel"
        ? t.backToMaterielList
        : t.backToList;
  const contactPath = `/${locale}/contact`;
  const devisPath = `/${locale}/vehicles/${slug}/devis`;
  const isMateriel = vehicle.vehicleCategory === "materiel";
  const showNumericPrice = !vehicle.priceOnRequest && vehicle.pricePerMonth > 0;

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8" style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(6,46,91,0.05) 0%, transparent 50%), #f4f7fb" }}>
      <Link
        href={listPath}
        className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--navy-primary)]"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        {backLabel}
      </Link>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Image */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--background)]">
          {vehicle.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={vehicle.image}
              alt={`${vehicle.brand} ${vehicle.name}`}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-[var(--text-muted)]">
              <svg
                className="h-24 w-24 opacity-30"
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
          <span className="absolute left-4 top-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-sm font-semibold text-[var(--text-primary)]">
            {vehicle.brand}
          </span>
        </div>

        <div className="flex flex-col">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--navy-primary)]">
            {vehicle.category}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
            {vehicle.name}
          </h1>

          {isMateriel ? (
            <p className="mt-5 text-sm text-[var(--text-secondary)]">
              <span className="font-medium text-[var(--text-primary)]">{t.equipmentLine}</span>
              {vehicle.category ? (
                <>
                  {" · "}
                  {vehicle.category}
                </>
              ) : null}
            </p>
          ) : (
            <p className="mt-5 flex flex-wrap gap-4 text-sm text-[var(--text-secondary)]">
              <span>
                {vehicle.seats} {t.seats}
              </span>
              <span>{transmissionLabel}</span>
              <span>{fuelLabel}</span>
            </p>
          )}

          {vehicle.brochureUrl ? (
            <a
              href={vehicle.brochureUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex text-sm font-semibold text-[var(--navy-primary)] underline-offset-2 hover:underline"
            >
              {t.brochurePdf}
            </a>
          ) : null}

          <div className="mt-8 rounded-xl border border-white/20 bg-white/70 p-6 shadow-[0_4px_24px_rgba(6,46,91,0.08)] backdrop-blur-md">
            {showNumericPrice ? (
              <>
                <p className="text-sm font-medium text-[var(--text-muted)]">{t.priceFrom}</p>
                <p className="mt-1 text-3xl font-bold text-[var(--navy-primary)]">
                  {vehicle.pricePerMonth.toLocaleString(
                    locale === "fr" ? "fr-FR" : "en-US"
                  )}
                  {vehicle.currency ?? "€"}
                  <span className="text-lg font-normal text-[var(--text-muted)]">{t.perMonth}</span>
                </p>
                <p className="mt-1 text-sm text-[var(--text-muted)]">{t.allIncluded}</p>
              </>
            ) : (
              <>
                <p className="text-sm font-medium text-[var(--text-muted)]">
                  {t.pricingSectionLabel}
                </p>
                <p className="mt-1 text-3xl font-bold text-[var(--navy-primary)]">{t.priceOnRequest}</p>
              </>
            )}
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:gap-5">
            <Button href={devisPath} variant="accent" size="lg">
              {t.requestQuote}
            </Button>
            <Button href={contactPath} variant="secondary" size="lg">
              {t.contactUs}
            </Button>
          </div>
        </div>
      </div>

      <section className="mt-20 border-t border-[var(--border)] pt-14">
        <h2 className="text-section-title text-[var(--text-primary)]">
          {t.specs}
        </h2>
        {isMateriel ? (
          <dl className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-white/20 bg-white/70 p-5 shadow-[0_4px_24px_rgba(6,46,91,0.08)] backdrop-blur-md">
              <dt className="text-sm text-[var(--text-muted)]">{t.equipmentLine}</dt>
              <dd className="mt-1 font-semibold text-[var(--text-primary)]">
                {vehicle.category ?? "—"}
              </dd>
            </div>
            {vehicle.brochureUrl ? (
              <div className="rounded-xl border border-white/20 bg-white/70 p-5 shadow-[0_4px_24px_rgba(6,46,91,0.08)] backdrop-blur-md">
                <dt className="text-sm text-[var(--text-muted)]">{t.brochurePdf}</dt>
                <dd className="mt-1">
                  <a
                    href={vehicle.brochureUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[var(--navy-primary)] underline-offset-2 hover:underline"
                  >
                    {t.brochurePdf}
                  </a>
                </dd>
              </div>
            ) : null}
          </dl>
        ) : (
          <dl className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-white/20 bg-white/70 p-5 shadow-[0_4px_24px_rgba(6,46,91,0.08)] backdrop-blur-md">
              <dt className="text-sm text-[var(--text-muted)]">{t.seats}</dt>
              <dd className="mt-1 font-semibold text-[var(--text-primary)]">
                {vehicle.seats}
              </dd>
            </div>
            <div className="rounded-xl border border-white/20 bg-white/70 p-5 shadow-[0_4px_24px_rgba(6,46,91,0.08)] backdrop-blur-md">
              <dt className="text-sm text-[var(--text-muted)]">{t.transmission}</dt>
              <dd className="mt-1 font-semibold text-[var(--text-primary)]">
                {transmissionLabel}
              </dd>
            </div>
            <div className="rounded-xl border border-white/20 bg-white/70 p-5 shadow-[0_4px_24px_rgba(6,46,91,0.08)] backdrop-blur-md">
              <dt className="text-sm text-[var(--text-muted)]">{t.filterFuel}</dt>
              <dd className="mt-1 font-semibold text-[var(--text-primary)]">
                {fuelLabel}
              </dd>
            </div>
            <div className="rounded-xl border border-white/20 bg-white/70 p-5 shadow-[0_4px_24px_rgba(6,46,91,0.08)] backdrop-blur-md">
              <dt className="text-sm text-[var(--text-muted)]">
                {showNumericPrice ? t.priceFrom : t.pricingSectionLabel}
              </dt>
              <dd className="mt-1 font-semibold text-[var(--navy-primary)]">
                {showNumericPrice ? `${vehicle.pricePerMonth}€ / ${t.perMonth}` : t.priceOnRequest}
              </dd>
            </div>
          </dl>
        )}
      </section>
    </div>
  );
}
