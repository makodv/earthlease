"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { homeTranslations } from "@/data/translations/home";
import { navTranslations, type Locale } from "@/data/translations";
import { Button } from "@/components/ui/Button";

interface HomeHeroProps {
  locale: Locale;
}

export function HomeHero({ locale }: HomeHeroProps) {
  const t = homeTranslations[locale];
  const nav = navTranslations[locale];
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.4"
        )
        .fromTo(
          descRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.35"
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.4 },
          "-=0.3"
        );
    }, sectionRef);
    return () => ctx.revert();
  }, [locale]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[85vh] flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8"
      style={{
        background:
          "radial-gradient(ellipse 90% 70% at 50% -10%, rgba(6, 46, 91, 0.18) 0%, transparent 50%), radial-gradient(ellipse 60% 50% at 90% 60%, rgba(92, 184, 92, 0.14) 0%, transparent 45%), radial-gradient(ellipse 50% 40% at 5% 90%, rgba(6, 46, 91, 0.1) 0%, transparent 45%), linear-gradient(180deg, #e8eef5 0%, #f4f7fb 35%, #f8fafc 100%)",
      }}
    >
      <div
        className="relative mx-auto max-w-4xl rounded-2xl px-8 py-12 sm:px-12 sm:py-16"
        style={{
          background: "rgba(255, 255, 255, 0.75)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255, 255, 255, 0.4)",
          boxShadow:
            "0 4px 24px rgba(6, 46, 91, 0.1), 0 1px 0 rgba(255, 255, 255, 0.6) inset",
        }}
      >
        <h1
          ref={titleRef}
          className="text-display text-[var(--text-primary)]"
        >
          {t.heroTitle}{" "}
          <span
            ref={subtitleRef}
            className="block text-[var(--accent-green)] sm:mt-2"
          >
            {t.heroSubtitle}
          </span>
        </h1>

        <p
          ref={descRef}
          className="mx-auto mt-8 max-w-2xl text-body-lg text-[var(--text-secondary)]"
        >
          {t.heroDescription}
        </p>

        <div
          ref={ctaRef}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5"
        >
          <Button
            href={`/${locale}/vehicles`}
            variant="primary"
            size="lg"
            className="min-w-[200px]"
          >
            {nav.seeVehicles}
          </Button>
          <Button
            href={`/${locale}/contact`}
            variant="secondary"
            size="lg"
            className="min-w-[200px]"
          >
            {locale === "fr" ? "Nous contacter" : "Contact us"}
          </Button>
        </div>
      </div>
    </section>
  );
}
