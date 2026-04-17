"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { catalogHref } from "@/lib/vehiclesCatalog";

/** Legacy URL — static export cannot rely on server redirects. */
export default function LegacyProfessionnelRedirect() {
  const params = useParams();
  const router = useRouter();
  const locale = typeof params.locale === "string" ? params.locale : "fr";

  useEffect(() => {
    router.replace(catalogHref(`/${locale}`, "professionnel"));
  }, [locale, router]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-24 text-center text-sm text-[var(--text-muted)]">
      Redirection…
    </div>
  );
}
