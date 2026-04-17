import type { VehicleCategory } from "@/data/types/vehicle";

export type CatalogSegment = "particulier" | "professionnel" | "materiel";

const MOTOR_ELEC = "electrique";
const MOTOR_THERM = "thermique";

export function catalogSegmentFromSearchParams(
  searchParams: URLSearchParams
): CatalogSegment {
  const raw = searchParams.get("segment")?.toLowerCase() ?? "";
  if (raw === "professionnel" || raw === "pro") return "professionnel";
  if (raw === "materiel" || raw === "equipment") return "materiel";
  if (raw === "particulier") return "particulier";
  const motorOnly = searchParams.get("motorisation");
  if (motorOnly) return "particulier";
  return "particulier";
}

/** URL preset for passenger fuel (only when segment is particulier). */
export function motorisationPresetFromSearchParams(
  searchParams: URLSearchParams,
  segment: CatalogSegment
): "all" | "electric" | "thermique" {
  if (segment !== "particulier") return "all";
  const m = searchParams.get("motorisation")?.toLowerCase() ?? "";
  if (m === "electrique" || m === "electric") return "electric";
  if (m === "thermique" || m === "gas") return "thermique";
  return "all";
}

/** Default “Nos produits” landing: voitures particulières (toutes motorisations). */
export function catalogDefaultHref(basePath: string): string {
  return catalogHref(basePath, "particulier");
}

export function catalogHref(
  basePath: string,
  segment: CatalogSegment,
  motorPreset: "all" | "electric" | "thermique" = "all"
): string {
  const path = `${basePath}/vehicles`;
  if (segment === "particulier") {
    if (motorPreset === "all") {
      return `${path}?segment=particulier`;
    }
    const q = new URLSearchParams({
      segment: "particulier",
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
  return catalogHref(`/${locale}`, "particulier");
}
