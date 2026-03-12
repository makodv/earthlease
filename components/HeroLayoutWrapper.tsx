"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface HeroLayoutWrapperProps {
  children: React.ReactNode;
  locale: string;
}

/** Sets data-hero-active on homepage; data-hero-scrolled when user scrolls past hero so navbar switches to dark text on white sections */
export function HeroLayoutWrapper({ children, locale }: HeroLayoutWrapperProps) {
  const pathname = usePathname();
  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;
  const [scrolledPastHero, setScrolledPastHero] = useState(false);

  useEffect(() => {
    if (!isHome) return;
    const threshold = typeof window !== "undefined" ? Math.min(window.innerHeight * 0.4, 350) : 300;

    function checkScroll() {
      setScrolledPastHero(window.scrollY > threshold);
    }
    checkScroll();
    window.addEventListener("scroll", checkScroll, { passive: true });
    return () => window.removeEventListener("scroll", checkScroll);
  }, [isHome]);

  return (
    <div
      className="flex min-h-screen flex-col"
      data-hero-active={isHome || undefined}
      data-hero-scrolled={isHome && scrolledPastHero ? "true" : undefined}
    >
      {children}
    </div>
  );
}
