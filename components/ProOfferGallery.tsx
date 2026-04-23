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

/** Premiers emplacements visuels matériel (accueil) — PNG dans `public/`. */
const MATERIEL_HOME_STRIP_IMAGES: { src: string; alt: Record<Locale, string> }[] = [
  {
    src: "/souffleuses1.png",
    alt: {
      fr: "Souffleuses et cardeuses KRENDL pour chantiers d’isolation",
      en: "KRENDL blowing and carding machines for insulation sites",
    },
  },
  {
    src: "/krendl-2300.png",
    alt: {
      fr: "Machine d’isolation KRENDL 2300",
      en: "KRENDL 2300 insulation machine",
    },
  },
];

/** Grille 100 % électrique : 4 visuels paysage + bloc CTA commun. */
const TOURISME_ELEC_GRID_IMAGES: { src: string; alt: Record<Locale, string> }[] = [
  {
    src: "/tesla.png",
    alt: {
      fr: "SUV électrique — gamme tourisme",
      en: "Electric SUV — passenger range",
    },
  },
  {
    src: "/byd.png",
    alt: {
      fr: "SUV électrique BYD — gamme tourisme",
      en: "BYD electric SUV — passenger range",
    },
  },
  {
    src: "/bmwi4.png",
    alt: {
      fr: "Berline électrique BMW — gamme tourisme",
      en: "BMW electric saloon — passenger range",
    },
  },
  {
    src: "/volkswagen.png",
    alt: {
      fr: "Citadine électrique Volkswagen — gamme tourisme",
      en: "Volkswagen electric hatchback — passenger range",
    },
  },
];

/** Grille hybride — même présentation que 100 % électrique. */
const TOURISME_HYBRID_GRID_IMAGES: { src: string; alt: Record<Locale, string> }[] = [
  {
    src: "/corolla.png",
    alt: {
      fr: "Berline hybride Toyota — gamme tourisme",
      en: "Toyota hybrid saloon — passenger range",
    },
  },
  {
    src: "/cliohybrid.png",
    alt: {
      fr: "Citadine hybride Renault — gamme tourisme",
      en: "Renault hybrid city car — passenger range",
    },
  },
  {
    src: "/tucson.png",
    alt: {
      fr: "SUV hybride — gamme tourisme",
      en: "Hybrid SUV — passenger range",
    },
  },
  {
    src: "/honda.png",
    alt: {
      fr: "SUV hybride Honda — gamme tourisme",
      en: "Honda hybrid SUV — passenger range",
    },
  },
];

/** Showcase cards: images under `public/`. Quote CTA → `/demande-devis` with category preset. */
const SHOWCASE_ITEMS: {
  id: ProShowcaseCardId;
  slug: string | null;
  image: string | null;
  region: "materiel" | "util" | "tourisme" | "velo";
  /** Cadre photo : `contain` évite de couper les machines / logos. */
  imageFit?: "cover" | "contain";
}[] = [
  {
    id: "krendl",
    slug: "krendl-cardeuse-souffleuse",
    image: "/produits-cardeuse-souffleuse.jpg",
    region: "materiel",
    imageFit: "contain",
  },
  { id: "ducato", slug: "fiat-ducato-4035-xl", image: "/ducatoimage.png", region: "util" },
  { id: "tourismeElec", slug: "renault-symbioz", image: "/tesla.png", region: "tourisme", imageFit: "cover" },
  { id: "velo", slug: null, image: "/bikes.png", region: "velo", imageFit: "cover" },
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

function TourismeElectricBlock({
  locale,
  basePath,
  t,
}: {
  locale: Locale;
  basePath: string;
  t: ProShowcaseCopy;
}) {
  const devisHref = demandeDevisHref(basePath, "tourisme");
  const c = t.cards.tourismeElec;
  return (
    <div className="mt-4 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-card)]">
      <div className="grid grid-cols-2 gap-px bg-[var(--border)] lg:grid-cols-4">
        {TOURISME_ELEC_GRID_IMAGES.map((img) => (
          <div
            key={img.src}
            className="relative aspect-[5/4] min-h-[120px] overflow-hidden bg-[var(--muted)] sm:aspect-[16/10] sm:min-h-[150px] lg:min-h-[190px]"
          >
            <Image
              src={img.src}
              alt={img.alt[locale]}
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 50vw, 25vw"
            />
          </div>
        ))}
      </div>
      <Link
        href={devisHref}
        className="group block border-t border-[var(--border)] bg-[var(--surface)] px-5 py-6 text-center transition-colors hover:bg-[var(--muted)]/50 sm:px-8 sm:py-8"
      >
        <p className="text-lg font-semibold text-[var(--text-primary)] sm:text-xl">{c.title}</p>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-[var(--text-secondary)]">
          {c.subtitle}
        </p>
        <span className="mt-5 inline-flex rounded-full bg-[var(--navy-primary)] px-6 py-2.5 text-sm font-bold text-white shadow-md transition-colors group-hover:bg-[var(--navy-primary-hover)]">
          {t.ctaDevis} →
        </span>
      </Link>
    </div>
  );
}

function TourismeHybridBlock({
  locale,
  basePath,
  t,
}: {
  locale: Locale;
  basePath: string;
  t: ProShowcaseCopy;
}) {
  const devisHref = demandeDevisHref(basePath, "tourisme");
  const c = t.cards.tourismeHybride;
  return (
    <div className="mt-4 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-card)]">
      <div className="grid grid-cols-2 gap-px bg-[var(--border)] lg:grid-cols-4">
        {TOURISME_HYBRID_GRID_IMAGES.map((img) => (
          <div
            key={img.src}
            className="relative aspect-[5/4] min-h-[120px] overflow-hidden bg-[var(--muted)] sm:aspect-[16/10] sm:min-h-[150px] lg:min-h-[190px]"
          >
            <Image
              src={img.src}
              alt={img.alt[locale]}
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 50vw, 25vw"
            />
          </div>
        ))}
      </div>
      <Link
        href={devisHref}
        className="group block border-t border-[var(--border)] bg-[var(--surface)] px-5 py-6 text-center transition-colors hover:bg-[var(--muted)]/50 sm:px-8 sm:py-8"
      >
        <p className="text-lg font-semibold text-[var(--text-primary)] sm:text-xl">{c.title}</p>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-[var(--text-secondary)]">
          {c.subtitle}
        </p>
        <span className="mt-5 inline-flex rounded-full bg-[var(--navy-primary)] px-6 py-2.5 text-sm font-bold text-white shadow-md transition-colors group-hover:bg-[var(--navy-primary-hover)]">
          {t.ctaDevis} →
        </span>
      </Link>
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
  visualAspectClass,
  imageSizes,
}: {
  item: (typeof SHOWCASE_ITEMS)[number];
  c: { title: string; subtitle: string };
  basePath: string;
  t: ProShowcaseCopy;
  /** Remplace le ratio par défaut (ex. grand bandeau utilitaires). */
  visualAspectClass?: string;
  imageSizes?: string;
}) {
  const category = categorySlugForRegion(item.region);
  const devisHref = demandeDevisHref(basePath, category);
  const isTourisme = item.region === "tourisme";
  const aspectWrap =
    visualAspectClass ??
    (isTourisme
      ? "relative aspect-[3/4] min-h-[280px] w-full overflow-hidden sm:min-h-[320px]"
      : "relative aspect-[16/10] w-full overflow-hidden");
  const sizes = imageSizes ?? "(max-width: 1024px) 100vw, 33vw";
  const imageFit = item.imageFit ?? "cover";
  const imageFitClass =
    imageFit === "contain"
      ? "object-contain object-center"
      : "object-cover object-center";
  const imageAreaBg = imageFit === "contain" ? "bg-[var(--muted)]" : "";

  return (
    <li key={item.id}>
      <Link
        href={devisHref}
        className="group block overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-card)] transition hover:border-[var(--navy-primary)]/25 hover:shadow-[var(--shadow-lift)]"
      >
        <div className={[aspectWrap, imageAreaBg].filter(Boolean).join(" ")}>
          {item.image ? (
            <Image
              src={item.image}
              alt={c.title}
              fill
              className={`${imageFitClass} transition duration-500 group-hover:scale-[1.02]`}
              sizes={sizes}
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

  const utilHeroItem = SHOWCASE_ITEMS.find((i) => i.id === "ducato")!;
  const veloHeroItem = SHOWCASE_ITEMS.find((i) => i.id === "velo")!;

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
              <ul className="mt-5 grid grid-cols-1 gap-6 sm:mt-6 sm:grid-cols-2 sm:gap-8 lg:mx-auto lg:max-w-5xl lg:gap-10">
                {MATERIEL_HOME_STRIP_IMAGES.map((strip, i) => (
                  <li key={strip.src} className="min-w-0">
                    <ImagePlaceholderSlot
                      label={`${ui.slotPrefix} ${i + 1}`}
                      aspectClass="relative aspect-[3/4] w-full min-h-[260px] sm:min-h-[300px] lg:aspect-[5/6] lg:min-h-[360px]"
                      imageSrc={strip.src}
                      imageAlt={strip.alt[locale]}
                      imageFit="contain"
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
          <ul className="mt-8 grid gap-6 sm:mx-auto sm:max-w-4xl lg:max-w-5xl">
            <ShowcaseCard
              item={utilHeroItem}
              c={t.cards.ducato}
              basePath={basePath}
              t={t}
              visualAspectClass="relative aspect-[21/9] min-h-[200px] w-full overflow-hidden sm:min-h-[280px] lg:min-h-[360px]"
              imageSizes="(max-width: 1024px) 100vw, 85vw"
            />
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
          <TourismeElectricBlock locale={locale} basePath={basePath} t={t} />
          <p className="mt-14 text-center text-sm font-bold uppercase tracking-wide text-[var(--navy-primary)]">
            {t.tourismeSectionHybrid}
          </p>
          <TourismeHybridBlock locale={locale} basePath={basePath} t={t} />
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
          <ul className="mt-8 grid gap-6 sm:mx-auto sm:max-w-4xl lg:max-w-5xl">
            <ShowcaseCard
              item={veloHeroItem}
              c={t.cards.velo}
              basePath={basePath}
              t={t}
              visualAspectClass="relative aspect-[21/9] min-h-[160px] w-full overflow-hidden sm:min-h-[220px] lg:min-h-[280px]"
              imageSizes="(max-width: 1024px) 100vw, 85vw"
            />
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
