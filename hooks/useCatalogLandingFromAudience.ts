"use client";

import { useMemo } from "react";
import { useAudienceProfile } from "@/hooks/useAudienceProfile";
import { useHasMounted } from "@/hooks/useHasMounted";

/** Landing anchor for “offres pro” (matériel + utilitaires) on the homepage. */
export function useCatalogLandingFromAudience(basePath: string) {
  const audience = useAudienceProfile();
  const hasMounted = useHasMounted();
  const catalogLandingHref = useMemo(() => `${basePath}/#offres-pro`, [basePath]);
  return { audience, hasMounted, catalogLandingHref };
}
