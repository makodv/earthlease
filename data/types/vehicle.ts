export type FuelType = "diesel" | "essence" | "electric";

/** individuel = cars; professionnel = vans/fleet; materiel = equipment (e.g. Krendl) */
export type VehicleCategory = "individuel" | "professionnel" | "materiel";

export interface VehicleOption {
  id: string;
  slug: string;
  name: string;
  brand: string;
  image?: string;
  pricePerMonth: number;
  currency?: string;
  seats: number;
  transmission: "manual" | "automatic";
  fuelType: FuelType;
  /** Vehicle type: Compact, SUV, etc. */
  category?: string;
  /** For filtering: passenger cars vs professional vehicles */
  vehicleCategory: VehicleCategory;
  /** Public URL to a brochure PDF (filename may contain spaces — use encodeURI when building) */
  brochureUrl?: string;
  /** When true, listings show “sur devis” instead of a numeric price */
  priceOnRequest?: boolean;
}
