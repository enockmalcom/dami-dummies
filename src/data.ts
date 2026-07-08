import { MannequinProduct } from "./types";

export const DAMI_PRODUCTS: MannequinProduct[] = [
  {
    id: "obsidian-matte",
    name: "Obsidian Onyx Articulate",
    type: "Male",
    material: "Obsidian Matte",
    pose: "Editorial Strut",
    price: 1250,
    image: "/src/assets/images/obsidian_matte_mannequin_1783514599636.jpg",
    tagline: "Bold contrast. Premium dark presence.",
    description: "Handcrafted from military-grade carbon-fiber polymers with solid bronze joints. Built to provide a dramatic high-contrast silhouette for dynamic menswear, heavy drapery, and high-fashion streetwear.",
    specs: {
      height: "188 cm (6'2\")",
      bust: "98 cm (38.5\")",
      waist: "78 cm (30.7\")",
      hips: "95 cm (37.4\")",
      standMaterial: "Anodized Dark Bronze Steel",
      weight: "14.5 kg",
      durabilityRating: "Commercial Grade Elite (Lifetime Warranty)"
    }
  },
  {
    id: "alabaster-satin",
    name: "Alabaster Pearlescent Muse",
    type: "Female",
    material: "Alabaster Satin",
    pose: "Classic Museum",
    price: 1390,
    image: "/src/assets/images/alabaster_satin_mannequin_1783514612957.jpg",
    tagline: "Luminous elegance. Soft pearl luster.",
    description: "Coated with multi-layered microscopic pearl dust finishes that gently catch the light without distracting from the fabric. Engineered specifically for haute couture, wedding gowns, and fine delicate lace.",
    specs: {
      height: "180 cm (5'11\")",
      bust: "86 cm (33.8\")",
      waist: "62 cm (24.4\")",
      hips: "90 cm (35.4\")",
      standMaterial: "Polished Stainless Steel with Brass Trim",
      weight: "12.8 kg",
      durabilityRating: "High-Ductility Shatterproof Polymer"
    }
  },
  {
    id: "sustainable-walnut",
    name: "Aethelgard Sculpted Walnut",
    type: "Gender-neutral",
    material: "Recycled Walnut",
    pose: "Classic Museum",
    price: 1850,
    image: "/src/assets/images/sustainable_walnut_dummy_1783514629135.jpg",
    tagline: "Artisan luxury. Sustainably sculpted wood.",
    description: "Precisely carved from sustainably-sourced salvaged walnut trees, with a natural beeswax finish. Designed as an artistic center-piece for premium boutiques, eco-conscious collections, and luxury workspace studios.",
    specs: {
      height: "178 cm (5'10\")",
      bust: "89 cm (35.0\")",
      waist: "68 cm (26.7\")",
      hips: "92 cm (36.2\")",
      standMaterial: "Solid Cast Iron Base",
      weight: "18.2 kg",
      durabilityRating: "Premium Hardwood Core with Solid Wax Protection"
    }
  }
];

export const OTHER_GALLERY_IMAGES = {
  hero: "/src/assets/images/boutique_mannequins_hero_1783514645326.jpg"
};
