/**
 * Brand logos for the homepage.
 * Add logoSrc (path to image in public/) when you have assets, e.g. logoSrc: "/brands/mercedes.svg"
 */
export interface BrandLogo {
  id: string;
  name: string;
  /** Set when you add logo images, e.g. "/brands/mercedes.svg" */
  logoSrc?: string;
}

export const brandLogos: BrandLogo[] = [
  { id: "mercedes", name: "Mercedes-Benz" },
  { id: "audi", name: "Audi" },
  { id: "bmw", name: "BMW" },
  { id: "volkswagen", name: "Volkswagen" },
  { id: "renault", name: "Renault" },
  { id: "peugeot", name: "Peugeot" },
  { id: "citroen", name: "Citroën" },
  { id: "ford", name: "Ford" },
  { id: "toyota", name: "Toyota" },
  { id: "nissan", name: "Nissan" },
  { id: "hyundai", name: "Hyundai" },
  { id: "kia", name: "Kia" },
];
