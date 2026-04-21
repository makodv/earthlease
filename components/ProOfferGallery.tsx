import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { proShowcaseTranslations, type Locale } from "@/data/translations";
import type { ProShowcaseCardId } from "@/data/translations/proShowcase";
import { categoryVisualUi } from "@/data/translations/categoryVisualUi";
import { Button } from "@/components/ui/Button";
import { ImagePlaceholderSlot } from "@/components/ImagePlaceholderSlot";
import { demandeDevisHref, offersCategoryHref, type OfferCategorySlug } from "@/lib/offerCategory";

type ProShowcaseCopy = (typeof proShowcaseTranslations)[Locale];

const IMG_SYMBIOZ = encodeURI("/symbioz pic.png");

const MATERIEL_HOME_PLACEHOLDERS = 6;
const TOURISME_EXTRA_PHOTOS = 4;

/** Gallery: set `image` to `/public` paths when ready. “Demander un devis” → formulaire libre `/demande-devis`. */
const SHOWCASE_ITEMS: {
  id: ProShowcaseCardId;
  slug: string | null;
  image: string | null;
  region: "materiel" | "util" | "tourisme" | "velo";
}[] = [
  { id: "krendl", slug: "krendl-cardeuse-souffleuse", image: null, region: "materiel" },
  { id: "ducato", slug: "fiat-ducato-4035-xl", image: "/ducato.png", region: "util" },
  { id: "boxer", slug: "peugeot-boxer", image: null, region: "util" },
  { id: "transit", slug: "ford-transit", image: null, region: "util" },
  { id: "tourismeElec", slug: "renault-symbioz", image: IMG_SYMBIOZ, region: "tourisme" },
  { id: "tourismeHybride", slug: null, image: null, region: "tourisme" },
  { id: "velo", slug: null, image: null, region: "velo" },
];

interface ProOfferGalleryProps {
  locale: Locale;
  variant: "home" | "vehicles";
}

function categorySlugForRegion(region: (typeof SHOWCASE_ITEMS)[number]["region"]): OfferCategorySlug {
  if (region === "materiel") return "materiel";
  if (region === "util") return "utilitaires";
  if (region === "tourisme") return "tourisme";
  return "deux-roues";
}

function CategorySectionIntro({
  title,
  body,
  hint,
  basePath,
  region,
  seeLabel,
}: {
  title: string;
  body: string;
  hint?: ReactNode;
  basePath: string;
  region: (typeof SHOWCASE_ITEMS)[number]["region"];
  seeLabel: string;
}) {
  const slug = categorySlugForRegion(region);
  return (
    <div className="text-center">
      <h3 className="text-lg font-semibold text-[var(--text-primary)] sm:text-xl">{title}</h3>
      <p className="mx-auto mt-2 max-w-2xl text-sm text-[var(--text-secondary)] leading-relaxed">{body}</p>
      {hint ? <div className="mt-2">{hint}</div> : null}
      <p className="mt-3">
        <Link
          href={offersCategoryHref(basePath, slug)}
          className="text-sm font-semibold text-[var(--accent-green)] hover:underline"
        >
          {seeLabel} →
        </Link>
      </p>
    </div>
  );
}

function PlaceholderVisual({ region }: { region: "materiel" | "util" | "tourisme" | "velo" }) {
  const bg =
    region === "materiel"
      ? "bg-[linear-gradient(145deg,#062e5b_0%,#0b4a8f_45%,#1a6b4a_100%)]"
      : region === "util"
        ? "bg-[linear-gradient(145deg,#1e293b_0%,#334155_50%,#062e5b_100%)]"
        : region === "tourisme"
          ? "bg-[linear-gradient(145deg,#0f3d2a_0%,#1a5c40_40%,#062e5b_100%)]"
          : "bg-[linear-gradient(145deg,#312e81_0%,#4338ca_45%,#0f172a_100%)]";

  return (
    <div className={`flex h-full min-h-[160px] w-full items-center justify-center ${bg}`}>
      {region === "velo" ? (
        <svg className="h-14 w-14 text-white/35" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <circle cx="6.5" cy="17" r="2.75" strokeWidth={1.25} />
          <circle cx="17.5" cy="17" r="2.75" strokeWidth={1.25} />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.25}
            d="M6.5 17H4l2-6h4l2 4 2-4h3l2 6h-2.5M9 11l-1 6M15 11l-1 6"
          />
        </svg>
      ) : (
        <svg className="h-14 w-14 text-white/35" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.25}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      )}
    </div>
  );
}

function ShowcaseCard({
  item,
  c,
  basePath,
  t,
}: {
  item: (typeof SHOWCASE_ITEMS)[number];
  c: { title: string; subtitle: string };
  basePath: string;
  t: ProShowcaseCopy;
}) {
  const category = categorySlugForRegion(item.region);
  const devisHref = demandeDevisHref(basePath, category);
  const isTourisme = item.region === "tourisme";
  const aspectWrap = isTourisme
    ? "relative aspect-[3/4] min-h-[280px] w-full overflow-hidden sm:min-h-[320px]"
    : "relative aspect-[16/10] w-full overflow-hidden";

  return (
    <li key={item.id}>
      <Link
        href={devisHref}
        className="group block overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-card)] transition hover:border-[var(--navy-primary)]/25 hover:shadow-[var(--shadow-lift)]"
      >
        <div className={aspectWrap}>
          {item.image ? (
            <Image
              src={item.image}
              alt={c.title}
              fill
              className="object-cover transition duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0">
              <PlaceholderVisual region={item.region} />
            </div>
          )}
        </div>
        <div className="p-5">
          <p className="font-semibold text-[var(--text-primary)]">{c.title}</p>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">{c.subtitle}</p>
          <span className="mt-4 inline-flex rounded-lg bg-[var(--navy-primary)] px-4 py-2 text-sm font-bold text-white shadow-md transition group-hover:bg-[var(--navy-primary-hover)]">
            {t.ctaDevis} →
          </span>
        </div>
      </Link>
    </li>
  );
}

export function ProOfferGallery({ locale, variant }: ProOfferGalleryProps) {
  const t = proShowcaseTranslations[locale];
  const ui = categoryVisualUi[locale];
  const basePath = `/${locale}`;
  const byRegion = (r: (typeof SHOWCASE_ITEMS)[number]["region"]) =>
    SHOWCASE_ITEMS.filter((i) => i.region === r);

  const tourismeElec = SHOWCASE_ITEMS.find((i) => i.id === "tourismeElec")!;
  const tourismeHyb = SHOWCASE_ITEMS.find((i) => i.id === "tourismeHybride")!;

  return (
    <div className={variant === "home" ? "" : "pb-8"}>
      {variant === "vehicles" ? (
        <header className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
            {t.vehiclesPageTitle}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-[var(--text-secondary)] leading-relaxed">
            {t.vehiclesMetaDescription}
          </p>
        </header>
      ) : null}

      <div className={variant === "vehicles" ? "mx-auto mt-12 max-w-6xl" : ""}>
        <div className="mx-auto max-w-2xl text-center">
          {variant === "home" ? (
            <>
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent-green)]">
                {t.eyebrow}
              </p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
                {t.title}
              </h2>
            </>
          ) : null}
          <p
            className={
              variant === "home"
                ? "mt-4 text-[var(--text-secondary)] leading-relaxed"
                : "mt-0 text-[var(--text-secondary)] leading-relaxed"
            }
          >
            {t.lead}
          </p>
          <p className="mt-3 text-sm font-medium text-[var(--navy-primary)]">{t.minLease}</p>
          <p className="mt-2 text-sm text-[var(--text-muted)] leading-relaxed">{t.commercialNote}</p>
          <p className="mt-2 text-sm font-medium text-[var(--text-secondary)]">{t.tourismeFocusNote}</p>
        </div>

        <div id="offres-materiel" className="mx-auto mt-14 max-w-6xl scroll-mt-28">
          <CategorySectionIntro
            title={t.materielTitle}
            body={t.materielBody}
            basePath={basePath}
            region="materiel"
            seeLabel={t.seeCategoryPage}
          />
          {variant === "home" ? (
            <div className="mt-8">
              <p className="text-center text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                {ui.materielHomeStrip}
              </p>
              <ul className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-3">
                {Array.from({ length: MATERIEL_HOME_PLACEHOLDERS }, (_, i) => (
                  <li key={`mat-ph-${i}`}>
                    <ImagePlaceholderSlot
                      label={`${ui.slotPrefix} ${i + 1}`}
                      aspectClass="aspect-square min-h-[72px] sm:min-h-[88px]"
                    />
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <ul className="mt-8 grid gap-6 sm:mx-auto sm:max-w-lg sm:grid-cols-1">
            {byRegion("materiel").map((item) => (
              <ShowcaseCard key={item.id} item={item} c={t.cards[item.id]} basePath={basePath} t={t} />
            ))}
          </ul>
        </div>

        <div id="offres-utilitaires" className="mx-auto mt-16 max-w-6xl scroll-mt-28">
          <CategorySectionIntro
            title={t.utilTitle}
            body={t.utilBody}
            basePath={basePath}
            region="util"
            seeLabel={t.seeCategoryPage}
          />
          {variant === "home" ? (
            <div className="mt-8">
              <p className="text-center text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                {ui.utilHomeCaption}
              </p>
              <div className="mt-3">
                <ImagePlaceholderSlot
                  label={ui.slotPrefix}
                  aspectClass="aspect-[21/9] min-h-[120px] w-full sm:min-h-[160px]"
                />
              </div>
            </div>
          ) : null}
          <p className="mt-6 text-center text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
            {t.modelsLabel}
          </p>
          <ul className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {byRegion("util").map((item) => (
              <ShowcaseCard key={item.id} item={item} c={t.cards[item.id]} basePath={basePath} t={t} />
            ))}
          </ul>
        </div>

        <div id="offres-tourisme" className="mx-auto mt-16 max-w-6xl scroll-mt-28">
          <CategorySectionIntro
            title={t.tourismeTitle}
            body={t.tourismeBody}
            basePath={basePath}
            region="tourisme"
            seeLabel={t.seeCategoryPage}
          />
          <p className="mt-10 text-center text-sm font-bold uppercase tracking-wide text-[var(--navy-primary)]">
            {t.tourismeSectionElectric}
          </p>
          <ul className="mt-4 grid gap-6 lg:grid-cols-3">
            <ShowcaseCard item={tourismeElec} c={t.cards[tourismeElec.id]} basePath={basePath} t={t} />
            {Array.from({ length: TOURISME_EXTRA_PHOTOS }, (_, i) => (
              <li key={`elec-extra-${i}`}>
                <ImagePlaceholderSlot
                  label={`${ui.tourismeExtraSlot} ${i + 1}`}
                  aspectClass="aspect-[3/4] min-h-[260px] w-full sm:min-h-[300px]"
                />
              </li>
            ))}
          </ul>
          <p className="mt-14 text-center text-sm font-bold uppercase tracking-wide text-[var(--navy-primary)]">
            {t.tourismeSectionHybrid}
          </p>
          <ul className="mt-4 grid gap-6 lg:grid-cols-3">
            <ShowcaseCard item={tourismeHyb} c={t.cards[tourismeHyb.id]} basePath={basePath} t={t} />
            {Array.from({ length: TOURISME_EXTRA_PHOTOS }, (_, i) => (
              <li key={`hyb-extra-${i}`}>
                <ImagePlaceholderSlot
                  label={`${ui.tourismeExtraSlot} ${i + 1 + TOURISME_EXTRA_PHOTOS}`}
                  aspectClass="aspect-[3/4] min-h-[260px] w-full sm:min-h-[300px]"
                />
              </li>
            ))}
          </ul>
        </div>

        <div id="offres-deux-roues" className="mx-auto mt-16 max-w-6xl scroll-mt-28">
          <CategorySectionIntro
            title={t.veloTitle}
            body={t.veloBody}
            hint={<p className="text-center text-xs font-medium text-[var(--text-muted)]">{t.veloListHint}</p>}
            basePath={basePath}
            region="velo"
            seeLabel={t.seeCategoryPage}
          />
          <ul className="mt-8 mx-auto grid max-w-lg gap-6 sm:grid-cols-1">
            {byRegion("velo").map((item) => (
              <ShowcaseCard key={item.id} item={item} c={t.cards[item.id]} basePath={basePath} t={t} />
            ))}
          </ul>
        </div>

        <div className="mx-auto mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href={`${basePath}/contact`} variant="secondary" size="lg">
            {locale === "fr" ? "Nous contacter" : "Contact us"}
          </Button>
          {variant === "home" ? (
            <Button href={`${basePath}/vehicles`} variant="primary" size="lg">
              {t.ctaVehiclesPage}
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
