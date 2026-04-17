"use client";

import { useMemo } from "react";
import { catalogDefaultHref } from "@/lib/vehiclesCatalog";
import { useAudienceProfile } from "@/hooks/useAudienceProfile";
import { useHasMounted } from "@/hooks/useHasMounted";

/** Index in HomeExploreVehicles `previewTabs` for the commercial vans row. */
export const EXPLORE_TAB_PRO_INDEX = 3;

export function useCatalogLandingFromAudience(basePath: string) {
  const audience = useAudienceProfile();
  const hasMounted = useHasMounted();
  const catalogLandingHref = useMemo(
    () => catalogDefaultHref(basePath, hasMounted ? audience : null),
    [basePath, audience, hasMounted]
  );
  return { audience, hasMounted, catalogLandingHref };
}
