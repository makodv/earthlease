import type { VehicleOption } from "./types/vehicle";

/** Passenger cars – shown on /vehicles (Voitures particuliers) */
export const vehiclesParticulier: VehicleOption[] = [
  {
    id: "ev1",
    slug: "renault-megane-e-tech",
    name: "Mégane E-Tech",
    brand: "Renault",
    pricePerMonth: 349,
    seats: 5,
    transmission: "automatic",
    fuelType: "electric",
    category: "Compact",
    vehicleCategory: "particulier",
  },
  {
    id: "ev2",
    slug: "peugeot-e-208",
    name: "e-208",
    brand: "Peugeot",
    pricePerMonth: 319,
    seats: 5,
    transmission: "automatic",
    fuelType: "electric",
    category: "Compact",
    vehicleCategory: "particulier",
  },
  {
    id: "1",
    slug: "renault-clio",
    name: "Clio",
    brand: "Renault",
    pricePerMonth: 249,
    seats: 5,
    transmission: "manual",
    fuelType: "essence",
    category: "Compact",
    vehicleCategory: "particulier",
  },
  {
    id: "2",
    slug: "peugeot-208",
    name: "208",
    brand: "Peugeot",
    pricePerMonth: 269,
    seats: 5,
    transmission: "automatic",
    fuelType: "essence",
    category: "Compact",
    vehicleCategory: "particulier",
  },
  {
    id: "3",
    slug: "volkswagen-golf",
    name: "Golf",
    brand: "Volkswagen",
    pricePerMonth: 329,
    seats: 5,
    transmission: "automatic",
    fuelType: "diesel",
    category: "Compact",
    vehicleCategory: "particulier",
  },
  {
    id: "4",
    slug: "citroen-c3",
    name: "C3",
    brand: "Citroën",
    pricePerMonth: 229,
    seats: 5,
    transmission: "manual",
    fuelType: "essence",
    category: "Compact",
    vehicleCategory: "particulier",
  },
  {
    id: "5",
    slug: "fiat-500",
    name: "500",
    brand: "Fiat",
    pricePerMonth: 199,
    seats: 4,
    transmission: "manual",
    fuelType: "essence",
    category: "City",
    vehicleCategory: "particulier",
  },
  {
    id: "6",
    slug: "peugeot-5008",
    name: "5008",
    brand: "Peugeot",
    pricePerMonth: 399,
    seats: 7,
    transmission: "automatic",
    fuelType: "diesel",
    category: "SUV",
    vehicleCategory: "particulier",
  },
  {
    id: "7",
    slug: "renault-megane",
    name: "Mégane",
    brand: "Renault",
    pricePerMonth: 299,
    seats: 5,
    transmission: "manual",
    fuelType: "diesel",
    category: "Compact",
    vehicleCategory: "particulier",
  },
];

/** Brochures in /public — spaces encoded for safe URLs */
const PDF_FIAT_DUCATO = encodeURI("/brochure commercial _fiat_ducato 4035 XL.pdf");
const PDF_KRENDL = encodeURI("/2_M99_NW75 (1).pdf");

/** Véhicules professionnels (flotte utilitaire) — /vehicles/professionnel */
export const vehiclesProfessionnel: VehicleOption[] = [
  {
    id: "pd1",
    slug: "fiat-ducato-4035-xl",
    name: "Ducato 4035 XL",
    brand: "Fiat",
    pricePerMonth: 549,
    seats: 3,
    transmission: "manual",
    fuelType: "diesel",
    category: "Fourgon utilitaire",
    vehicleCategory: "professionnel",
    brochureUrl: PDF_FIAT_DUCATO,
  },
  {
    id: "p2",
    slug: "peugeot-boxer",
    name: "Boxer",
    brand: "Peugeot",
    pricePerMonth: 499,
    seats: 3,
    transmission: "manual",
    fuelType: "diesel",
    category: "Fourgon",
    vehicleCategory: "professionnel",
  },
  {
    id: "p4",
    slug: "ford-transit",
    name: "Transit",
    brand: "Ford",
    pricePerMonth: 529,
    seats: 3,
    transmission: "automatic",
    fuelType: "diesel",
    category: "Fourgon",
    vehicleCategory: "professionnel",
  },
];

/** Matériel professionnel (équipement) — /vehicles/materiel-professionnel */
export const vehiclesMaterielProfessionnel: VehicleOption[] = [
  {
    id: "m1",
    slug: "krendl-cardeuse-souffleuse",
    name: "Cardeuse-souffleuse",
    brand: "Krendl",
    pricePerMonth: 0,
    priceOnRequest: true,
    seats: 0,
    transmission: "manual",
    fuelType: "diesel",
    category: "Matériel de chantier",
    vehicleCategory: "materiel",
    brochureUrl: PDF_KRENDL,
  },
];

/** All vehicles (for search or combined views) */
export const sampleVehicles: VehicleOption[] = [
  ...vehiclesParticulier,
  ...vehiclesProfessionnel,
  ...vehiclesMaterielProfessionnel,
];

export function getVehicleBySlug(slug: string): VehicleOption | null {
  return sampleVehicles.find((v) => v.slug === slug) ?? null;
}

export function getAllVehicleSlugs(): string[] {
  return sampleVehicles.map((v) => v.slug);
}
