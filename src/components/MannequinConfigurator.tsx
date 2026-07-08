import React, { useState } from "react";
import { MannequinType, MaterialType, PoseType } from "../types";
import { Sparkles, ArrowRight, ShieldCheck, Zap, Layers } from "lucide-react";

interface ConfiguratorProps {
  onConfigureSelect: (config: {
    type: MannequinType;
    material: MaterialType;
    pose: PoseType;
    estimatedPrice: number;
  }) => void;
}

const TYPE_SPECS = {
  Male: { height: "188 cm", bust: "98 cm", waist: "78 cm", hips: "95 cm" },
  Female: { height: "180 cm", bust: "86 cm", waist: "62 cm", hips: "90 cm" },
  "Gender-neutral": { height: "178 cm", bust: "89 cm", waist: "68 cm", hips: "92 cm" },
  Child: { height: "120 cm", bust: "60 cm", waist: "54 cm", hips: "62 cm" },
};

const MATERIAL_INFO = {
  "Obsidian Matte": { priceModifier: 0, weight: "14.5 kg", stand: "Anodized Black Steel", colorHex: "#111" },
  "Alabaster Satin": { priceModifier: 140, weight: "12.8 kg", stand: "Stainless Steel with Brass Trim", colorHex: "#F2F1ED" },
  "Recycled Walnut": { priceModifier: 600, weight: "18.2 kg", stand: "Solid Cast Iron Base", colorHex: "#4C3525" },
  "Brushed Brass": { priceModifier: 450, weight: "21.5 kg", stand: "Heavyweight Solid Brass Plate", colorHex: "#D4AF37" },
  "Chrome Silver": { priceModifier: 350, weight: "19.8 kg", stand: "Polished Chrome Mirror Plate", colorHex: "#C0C0C0" },
};

const POSE_INFO = {
  "Editorial Strut": { priceModifier: 100, mood: "Avant-Garde & High Fashion" },
  "Classic Museum": { priceModifier: 0, mood: "Symmetry & Quiet Luxury" },
  "Dynamic Action": { priceModifier: 180, mood: "Athletic & Energetic Drapery" },
  "Seated Lounge": { priceModifier: 150, mood: "Relaxed Tailoring & Overcoats" },
};

export default function MannequinConfigurator({ onConfigureSelect }: ConfiguratorProps) {
  const [selectedType, setSelectedType] = useState<MannequinType>("Female");
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialType>("Obsidian Matte");
  const [selectedPose, setSelectedPose] = useState<PoseType>("Classic Museum");

  const basePrice = 1250;
  const currentPrice =
    basePrice +
    MATERIAL_INFO[selectedMaterial].priceModifier +
    POSE_INFO[selectedPose].priceModifier;

  const currentSpecs = TYPE_SPECS[selectedType];
  const materialDetails = MATERIAL_INFO[selectedMaterial];

  const handleSelect = () => {
    onConfigureSelect({
      type: selectedType,
      material: selectedMaterial,
      pose: selectedPose,
      estimatedPrice: currentPrice,
    });
  };

  return (
    <div className="bg-[#0c0c0e] border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300">
      <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        <div className="lg:col-span-5 flex flex-col justify-between space-y-8 bg-gradient-to-b from-zinc-900 to-[#121215] p-8 rounded-2xl border border-zinc-800">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono tracking-wider text-zinc-500 uppercase">
                Interactive Preview
              </span>
              <div className="flex items-center space-x-1.5 bg-zinc-800 px-2.5 py-1 rounded-full text-[10px] font-mono text-amber-400">
                <Sparkles className="w-3 h-3" />
                <span>Next-Gen Render</span>
              </div>
            </div>

            <div className="relative h-80 flex items-center justify-center bg-[#070708] rounded-xl overflow-hidden border border-zinc-800">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-transparent to-transparent opacity-60"></div>
              
              <div className="relative flex flex-col items-center justify-center space-y-4">
                <div 
                  className="w-16 h-48 rounded-full blur-sm opacity-20 absolute -z-10 transition-all duration-700"
                  style={{ backgroundColor: materialDetails.colorHex }}
                ></div>

                <div className="w-24 h-56 border-2 border-zinc-700 rounded-[40px] flex flex-col items-center justify-between p-4 relative transition-all duration-500 hover:border-amber-400/50">
                  <div className="w-8 h-8 rounded-full border border-zinc-500 flex items-center justify-center text-[10px] font-mono text-zinc-400">
                    H
                  </div>
                  <div className="w-14 h-24 border border-zinc-500 rounded-2xl flex items-center justify-center text-[10px] font-mono text-zinc-400">
                    B/W
                  </div>
                  <div className="w-16 h-12 border border-zinc-500 rounded-b-xl flex items-center justify-center text-[10px] font-mono text-zinc-400">
                    L
                  </div>
                  <div className="absolute -bottom-3 px-3 py-0.5 bg-zinc-900 border border-zinc-700 rounded-full text-[9px] font-mono text-zinc-300">
                    {selectedType}
                  </div>
                </div>

                <div className="text-center space-y-1">
                  <p className="text-sm font-medium text-zinc-200">{selectedMaterial}</p>
                  <p className="text-xs font-mono text-amber-400/80">{POSE_INFO[selectedPose].mood}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800">
                <p className="text-zinc-500 font-mono">Height</p>
                <p className="text-zinc-200 font-medium">{currentSpecs.height}</p>
              </div>
              <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800">
                <p className="text-zinc-500 font-mono">Bust</p>
                <p className="text-zinc-200 font-medium">{currentSpecs.bust}</p>
              </div>
              <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800">
                <p className="text-zinc-500 font-mono">Waist / Hips</p>
                <p className="text-zinc-200 font-medium">{currentSpecs.waist} / {currentSpecs.hips}</p>
              </div>
              <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800">
                <p className="text-zinc-500 font-mono">Total Weight</p>
                <p className="text-zinc-200 font-medium">{materialDetails.weight}</p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-zinc-800/80 flex items-center justify-between">
            <div>
              <p className="text-xs font-mono text-zinc-500">Estimated Unit Price</p>
              <p className="text-3xl font-light text-zinc-100">${currentPrice.toLocaleString()}</p>
            </div>
            <button
              onClick={handleSelect}
              className="bg-zinc-100 hover:bg-amber-400 text-zinc-950 font-medium px-5 py-3 rounded-xl transition-all duration-300 flex items-center space-x-2 text-sm shadow-lg hover:shadow-amber-400/10 active:scale-95"
            >
              <span>Build Mine</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-10">
          <div className="space-y-2">
            <h3 className="text-2xl md:text-3xl font-light text-zinc-100 tracking-tight">
              Design Laboratory
            </h3>
            <p className="text-sm text-zinc-400 max-w-lg leading-relaxed">
              Select precision measurements, artisan material coat finishes, and natural ergonomic poses to align perfectly with your premium storefront environment.
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-xs font-mono tracking-wider text-zinc-400 uppercase flex items-center space-x-2">
                <Layers className="w-3.5 h-3.5 text-zinc-500" />
                <span>1. Silhouette Structure</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {(["Male", "Female", "Gender-neutral", "Child"] as MannequinType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`p-3 rounded-xl border text-sm font-medium transition-all duration-300 ${
                      selectedType === type
                        ? "bg-zinc-200 border-zinc-200 text-zinc-950 shadow-md"
                        : "bg-zinc-900/40 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-mono tracking-wider text-zinc-400 uppercase flex items-center space-x-2">
                <ShieldCheck className="w-3.5 h-3.5 text-zinc-500" />
                <span>2. Artisan Outer Material Finish</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {(Object.keys(MATERIAL_INFO) as MaterialType[]).map((mat) => {
                  const details = MATERIAL_INFO[mat];
                  const isSelected = selectedMaterial === mat;
                  return (
                    <button
                      key={mat}
                      onClick={() => setSelectedMaterial(mat)}
                      className={`p-4 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between h-24 ${
                        isSelected
                          ? "bg-zinc-200 border-zinc-200 text-zinc-950 shadow-md"
                          : "bg-zinc-900/40 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="text-sm font-medium">{mat}</span>
                        <div 
                          className="w-3 h-3 rounded-full border border-zinc-500/30 shadow-inner"
                          style={{ backgroundColor: details.colorHex }}
                        ></div>
                      </div>
                      <div className="space-y-0.5">
                        <p className={`text-[10px] font-mono ${isSelected ? "text-zinc-600" : "text-zinc-500"}`}>
                          Stand: {details.stand}
                        </p>
                        <p className={`text-[10px] font-mono ${isSelected ? "text-zinc-950 font-bold" : "text-amber-400/90"}`}>
                          {details.priceModifier === 0 ? "Included" : `+$${details.priceModifier}`}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-mono tracking-wider text-zinc-400 uppercase flex items-center space-x-2">
                <Zap className="w-3.5 h-3.5 text-zinc-500" />
                <span>3. Ergonomic Display Pose</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(Object.keys(POSE_INFO) as PoseType[]).map((p) => {
                  const details = POSE_INFO[p];
                  const isSelected = selectedPose === p;
                  return (
                    <button
                      key={p}
                      onClick={() => setSelectedPose(p)}
                      className={`p-4 rounded-xl border text-left transition-all duration-300 flex justify-between items-center ${
                        isSelected
                          ? "bg-zinc-200 border-zinc-200 text-zinc-950 shadow-md"
                          : "bg-zinc-900/40 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                      }`}
                    >
                      <div>
                        <p className="text-sm font-medium">{p}</p>
                        <p className={`text-[10px] font-mono ${isSelected ? "text-zinc-600" : "text-zinc-500"}`}>
                          {details.mood}
                        </p>
                      </div>
                      <span className={`text-xs font-mono font-medium ${isSelected ? "text-zinc-950 font-bold" : "text-amber-400/90"}`}>
                        {details.priceModifier === 0 ? "Standard" : `+$${details.priceModifier}`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
