"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { offersCategoryHref } from "@/lib/offerCategory";

/** Legacy URL — redirect to dedicated matériel category page. */
export default function LegacyMaterielRedirect() {
  const params = useParams();
  const router = useRouter();
  const locale = typeof params.locale === "string" ? params.locale : "fr";
  const message = locale === "en" ? "Redirecting…" : "Redirection en cours…";

  useEffect(() => {
    router.replace(offersCategoryHref(`/${locale}`, "materiel"));
  }, [locale, router]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-24 text-center text-sm text-[var(--text-muted)]">
      {message}
    </div>
  );
}
