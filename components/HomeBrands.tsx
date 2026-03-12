"use client";

import Image from "next/image";
import { homeTranslations, type Locale } from "@/data/translations";
import { brandLogos } from "@/data/brands";

interface HomeBrandsProps {
  locale: Locale;
}

export function HomeBrands({ locale }: HomeBrandsProps) {
  const t = homeTranslations[locale];

  return (
    <section
      className="relative py-20"
      style={{
        background:
          "linear-gradient(135deg, rgba(6, 46, 91, 0.08) 0%, rgba(92, 184, 92, 0.06) 50%, transparent 100%), #f0f4f9",
      }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-xl font-semibold uppercase tracking-wider text-[var(--navy-primary)] sm:text-2xl">
          {t.brandsTitle}
        </h2>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 sm:gap-10">
          {brandLogos.map((brand) => (
            <div
              key={brand.id}
              className="flex h-14 w-24 shrink-0 items-center justify-center rounded-xl border border-white/70 bg-white/90 shadow-md transition-all hover:border-[var(--navy-primary)]/25 hover:shadow-lg sm:h-16 sm:w-28"
              title={brand.name}
            >
              {brand.logoSrc ? (
                <Image
                  src={brand.logoSrc}
                  alt={brand.name}
                  width={112}
                  height={64}
                  className="max-h-10 w-auto max-w-[80px] object-contain sm:max-h-12 sm:max-w-[100px]"
                />
              ) : (
                <span className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)] sm:text-xs">
                  Logo
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
