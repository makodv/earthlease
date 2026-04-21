import type { VehicleCategory } from "@/data/types/vehicle";
import type { AudienceProfile } from "@/lib/audienceProfile";

export type CatalogSegment = "individuel" | "professionnel" | "materiel";

const MOTOR_ELEC = "electrique";
const MOTOR_THERM = "thermique";

export function catalogSegmentFromSearchParams(
  searchParams: URLSearchParams
): CatalogSegment {
  const raw = searchParams.get("segment")?.toLowerCase() ?? "";
  if (raw === "professionnel" || raw === "pro") return "professionnel";
  if (raw === "materiel" || raw === "equipment") return "materiel";
  if (raw === "individuel" || raw === "particulier") return "individuel";
  const motorOnly = searchParams.get("motorisation");
  if (motorOnly) return "individuel";
  return "individuel";
}

/** URL preset for passenger fuel (only when segment is individuel). */
export function motorisationPresetFromSearchParams(
  searchParams: URLSearchParams,
  segment: CatalogSegment
): "all" | "electric" | "thermique" {
  if (segment !== "individuel") return "all";
  const m = searchParams.get("motorisation")?.toLowerCase() ?? "";
  if (m === "electrique" || m === "electric") return "electric";
  if (m === "thermique" || m === "gas") return "thermique";
  return "all";
}

/**
 * Default “Nos produits” landing from saved profile, or passenger cars when unknown.
 */
export function catalogDefaultHref(
  basePath: string,
  audience?: AudienceProfile | null
): string {
  if (audience === "professionnel") {
    return catalogHref(basePath, "professionnel");
  }
  return catalogHref(basePath, "individuel");
}

export function catalogHref(
  basePath: string,
  segment: CatalogSegment,
  motorPreset: "all" | "electric" | "thermique" = "all"
): string {
  const path = `${basePath}/vehicles`;
  if (segment === "individuel") {
    if (motorPreset === "all") {
      return `${path}?segment=individuel`;
    }
    const q = new URLSearchParams({
      segment: "individuel",
      motorisation: motorPreset === "electric" ? MOTOR_ELEC : MOTOR_THERM,
    });
    return `${path}?${q.toString()}`;
  }
  return `${path}?segment=${segment}`;
}

export function listPathForVehicleCategory(
  locale: string,
  category: VehicleCategory
): string {
  if (category === "professionnel") return catalogHref(`/${locale}`, "professionnel");
  if (category === "materiel") return catalogHref(`/${locale}`, "materiel");
  return catalogHref(`/${locale}`, "individuel");
}
