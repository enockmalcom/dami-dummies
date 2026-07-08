export type MannequinType = "Male" | "Female" | "Gender-neutral" | "Child";

export type MaterialType = "Obsidian Matte" | "Alabaster Satin" | "Brushed Brass" | "Chrome Silver" | "Recycled Walnut";

export type PoseType = "Editorial Strut" | "Classic Museum" | "Dynamic Action" | "Seated Lounge";

export interface MannequinSpec {
  height: string;
  bust: string;
  waist: string;
  hips: string;
  standMaterial: string;
  weight: string;
  durabilityRating: string;
}

export interface MannequinProduct {
  id: string;
  name: string;
  type: MannequinType;
  material: MaterialType;
  pose: PoseType;
  price: number;
  image: string;
  specs: MannequinSpec;
  tagline: string;
  description: string;
}

export interface AIStylistRecommendation {
  mannequinType: string;
  material: string;
  pose: string;
  lightingSetup: string;
  accessorySuggestions: string[];
  backdropAesthetic: string;
  merchandisingStrategy: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  companyName: string;
  mannequinId?: string;
  customSpecs?: {
    type: MannequinType;
    material: MaterialType;
    pose: PoseType;
    notes: string;
  };
  quantity: number;
  date: string;
  status: "pending" | "confirmed";
}
