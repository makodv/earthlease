import type { VehicleOption } from "./types/vehicle";

/** Passenger cars – shown on /vehicles (segment individuel) */
const IMG_RENAULT_SYMBIOZ = encodeURI("/symbioz pic.png");
const IMG_RENAULT_CLIO = encodeURI("/clio.png");
const IMG_PEUGEOT_208 = encodeURI("/208.png");
const IMG_GOLF = encodeURI("/golf.png");
const IMG_PEUGEOT_5008 = encodeURI("/5008.png");
const IMG_RENAULT_MEGANE = encodeURI("/megane.png");

const vehiclesIndividuelBase: VehicleOption[] = [
  {
    id: "ev1",
    slug: "renault-symbioz",
    name: "Symbioz",
    brand: "Renault",
    pricePerMonth: 349,
    seats: 5,
    transmission: "automatic",
    fuelType: "electric",
    category: "Compact",
    vehicleCategory: "individuel",
    image: IMG_RENAULT_SYMBIOZ,
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
    vehicleCategory: "individuel",
    image: IMG_RENAULT_CLIO,
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
    vehicleCategory: "individuel",
    image: IMG_PEUGEOT_208,
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
    vehicleCategory: "individuel",
    image: IMG_GOLF,
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
    vehicleCategory: "individuel",
    image: IMG_PEUGEOT_5008,
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
    vehicleCategory: "individuel",
    image: IMG_RENAULT_MEGANE,
  },
];

export const vehiclesIndividuel: VehicleOption[] = vehiclesIndividuelBase.map(
  (v) => ({ ...v, priceOnRequest: true })
);

/** Brochures in /public — spaces encoded for safe URLs */
const PDF_FIAT_DUCATO = encodeURI("/brochure commercial _fiat_ducato 4035 XL.pdf");
const PDF_KRENDL = encodeURI("/2_M99_NW75 (1).pdf");
const IMG_FIAT_DUCATO = encodeURI("/ducato.png");

/** Véhicules professionnels (flotte utilitaire) — /vehicles/professionnel */
const vehiclesProfessionnelBase: VehicleOption[] = [
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
    image: IMG_FIAT_DUCATO,
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

export const vehiclesProfessionnel: VehicleOption[] = vehiclesProfessionnelBase.map(
  (v) => ({ ...v, priceOnRequest: true })
);

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
  ...vehiclesIndividuel,
  ...vehiclesProfessionnel,
  ...vehiclesMaterielProfessionnel,
];

export function getVehicleBySlug(slug: string): VehicleOption | null {
  return sampleVehicles.find((v) => v.slug === slug) ?? null;
}

export function getAllVehicleSlugs(): string[] {
  return sampleVehicles.map((v) => v.slug);
}
