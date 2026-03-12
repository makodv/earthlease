export type FuelType = "diesel" | "essence";

/** "particulier" = passenger cars, "professionnel" = commercial/construction/utility */
export type VehicleCategory = "particulier" | "professionnel";

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
}
