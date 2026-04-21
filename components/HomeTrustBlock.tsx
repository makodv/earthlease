import Image from "next/image";
import { homeTranslations, type Locale } from "@/data/translations";
import { TrustBenefitItem } from "@/components/TrustBenefitItem";

interface HomeTrustBlockProps {
  locale: Locale;
  /** Optional: path to image in public/ for the right column (e.g. "/images/why-earthlease.jpg") */
  imageSrc?: string;
}

export function HomeTrustBlock({ locale, imageSrc }: HomeTrustBlockProps) {
  const t = homeTranslations[locale];

  const benefits = [
    { title: t.trustFlexible, desc: t.trustFlexibleDesc },
    { title: t.trustEco, desc: t.trustEcoDesc },
    { title: t.trustPro, desc: t.trustProDesc },
  ];

  return (
    <section className="section-trust-organic border-t border-[var(--border)] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_1fr] md:gap-16 md:items-center">
          {/* Left column: heading, intro, benefits */}
          <div className="md:max-w-[520px] order-1">
            <h2 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl lg:text-[2rem]">
              {t.trustTitle}
            </h2>
            <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
              {t.trustSubtitle}
            </p>
            <ul className="mt-10 space-y-8 sm:mt-12 sm:space-y-10">
              {benefits.map((item) => (
                <li key={item.title}>
                  <TrustBenefitItem
                    title={item.title}
                    description={item.desc}
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* Right column: organic image / visual block */}
          <div className="relative order-2 md:flex md:justify-end">
            <div
              className="trust-organic-mask relative aspect-[4/3] w-full overflow-hidden bg-[var(--surface)] md:aspect-[5/6] md:max-h-[480px] md:w-[90%] lg:max-h-[520px]"
              style={
                !imageSrc
                  ? {
                      background:
                        "linear-gradient(145deg, rgba(6, 46, 91, 0.06) 0%, rgba(92, 184, 92, 0.05) 40%, var(--muted) 100%)",
                    }
                  : undefined
              }
            >
              {imageSrc ? (
                <Image
                  src={imageSrc}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-full border border-[var(--border)] bg-[var(--surface)]/80 p-8 shadow-[var(--shadow-card)]">
                    <svg
                      className="h-16 w-16 text-[var(--navy-primary)] sm:h-20 sm:w-20"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.2}
                        d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                      />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
