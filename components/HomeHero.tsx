"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { homeTranslations } from "@/data/translations/home";
import { navTranslations, type Locale } from "@/data/translations";

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
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        lineRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.8, ease: "power2.inOut" }
      )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.4"
        )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.5"
        )
        .fromTo(
          descRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.4"
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.35"
        );
    }, sectionRef);
    return () => ctx.revert();
  }, [locale]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden px-4 py-20 text-center sm:px-6 lg:px-8"
    >
      {/* Subtle gradient background */}
      <div
        className="absolute inset-0 -z-10"
        aria-hidden
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--muted-bg)] via-white to-[var(--muted-bg)]/50" />
        <div
          className="absolute left-1/2 top-1/3 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(circle, var(--primary-light) 0%, transparent 70%)",
          }}
        />
      </div>

      <div
        ref={lineRef}
        className="origin-left rounded-full bg-[var(--primary)]"
        style={{ height: "4px", width: "80px" }}
      />

      <h1
        ref={titleRef}
        className="mt-8 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-[var(--foreground)] sm:text-5xl md:text-6xl lg:text-7xl"
      >
        {t.heroTitle}{" "}
        <span
          ref={subtitleRef}
          className="block text-[var(--primary)] sm:mt-1"
        >
          {t.heroSubtitle}
        </span>
      </h1>

      <p
        ref={descRef}
        className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-[var(--muted)] sm:text-xl"
      >
        {t.heroDescription}
      </p>

      <Link
        ref={ctaRef}
        href={`/${locale}/vehicles`}
        className="group relative mt-12 inline-flex items-center justify-center overflow-hidden rounded-full bg-[var(--primary)] px-10 py-4 text-base font-semibold text-white shadow-lg shadow-[var(--primary)]/25 transition-all hover:bg-[var(--primary-hover)] hover:shadow-xl hover:shadow-[var(--primary)]/30 hover:scale-[1.02] active:scale-[0.98]"
      >
        <span className="relative z-10">{nav.seeVehicles}</span>
      </Link>
    </section>
  );
}
