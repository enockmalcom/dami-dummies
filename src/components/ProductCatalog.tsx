import React, { useState } from "react";
import { MannequinProduct, MannequinType, MaterialType } from "../types";
import { DAMI_PRODUCTS } from "../data";
import { Filter, Eye, ChevronRight, Scale, Activity, Cpu } from "lucide-react";

interface ProductCatalogProps {
  onSelectProduct: (product: MannequinProduct) => void;
}

export default function ProductCatalog({ onSelectProduct }: ProductCatalogProps) {
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<MannequinType | "All">("All");
  const [selectedMaterialFilter, setSelectedMaterialFilter] = useState<MaterialType | "All">("All");

  const filteredProducts = DAMI_PRODUCTS.filter((prod) => {
    const typeMatch = selectedTypeFilter === "All" || prod.type === selectedTypeFilter;
    const materialMatch = selectedMaterialFilter === "All" || prod.material === selectedMaterialFilter;
    return typeMatch && materialMatch;
  });

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-zinc-800">
        <div>
          <h3 className="text-2xl font-light text-zinc-100 tracking-tight">
            Curated Showroom
          </h3>
          <p className="text-sm text-zinc-400">
            A precise alignment of hand-crafted masterworks ready to transform your floor.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2 bg-[#0c0c0e] border border-zinc-800 rounded-xl px-3.5 py-2">
            <Filter className="w-3.5 h-3.5 text-zinc-500" />
            <select
              value={selectedTypeFilter}
              onChange={(e) => setSelectedTypeFilter(e.target.value as any)}
              className="bg-transparent border-none text-xs font-mono text-zinc-300 focus:outline-none cursor-pointer"
            >
              <option value="All">All Silhouettes</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Gender-neutral">Gender-neutral</option>
            </select>
          </div>

          <div className="flex items-center space-x-2 bg-[#0c0c0e] border border-zinc-800 rounded-xl px-3.5 py-2">
            <Filter className="w-3.5 h-3.5 text-zinc-500" />
            <select
              value={selectedMaterialFilter}
              onChange={(e) => setSelectedMaterialFilter(e.target.value as any)}
              className="bg-transparent border-none text-xs font-mono text-zinc-300 focus:outline-none cursor-pointer"
            >
              <option value="All">All Finishes</option>
              <option value="Obsidian Matte">Obsidian Matte</option>
              <option value="Alabaster Satin">Alabaster Satin</option>
              <option value="Recycled Walnut">Recycled Walnut</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="group bg-[#0c0c0e] border border-zinc-800 rounded-2xl overflow-hidden shadow-xl hover:border-zinc-700 transition-all duration-300 flex flex-col justify-between"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-zinc-950">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-60"></div>
              
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-zinc-950/80 border border-zinc-800 text-[10px] font-mono font-medium px-2.5 py-1 rounded-full text-zinc-300 backdrop-blur-md">
                  {product.type}
                </span>
                <span className="bg-zinc-950/80 border border-zinc-800 text-[10px] font-mono font-medium px-2.5 py-1 rounded-full text-zinc-300 backdrop-blur-md">
                  {product.material}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 space-y-1">
                <p className="text-[10px] font-mono text-amber-400 tracking-wider uppercase">
                  {product.tagline}
                </p>
                <h4 className="text-lg font-light text-zinc-100">{product.name}</h4>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed">
                {product.description}
              </p>

              <div className="grid grid-cols-2 gap-4 text-[10px] font-mono text-zinc-500 py-4 border-y border-zinc-800/60">
                <div className="flex items-center space-x-2">
                  <Activity className="w-3.5 h-3.5 text-zinc-600" />
                  <span>Height: {product.specs.height}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Scale className="w-3.5 h-3.5 text-zinc-600" />
                  <span>Weight: {product.specs.weight}</span>
                </div>
                <div className="col-span-2 flex items-center space-x-2">
                  <Cpu className="w-3.5 h-3.5 text-zinc-600" />
                  <span className="truncate">Stand: {product.specs.standMaterial}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-mono text-zinc-500">Unit Cost</p>
                  <p className="text-xl font-light text-zinc-100">${product.price.toLocaleString()}</p>
                </div>

                <button
                  onClick={() => onSelectProduct(product)}
                  className="bg-zinc-900 border border-zinc-800 hover:border-zinc-600 text-zinc-300 hover:text-zinc-100 font-medium px-4 py-2.5 rounded-xl transition-all duration-300 flex items-center space-x-2 text-xs"
                >
                  <span>Select</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredProducts.length === 0 && (
          <div className="col-span-full py-20 text-center space-y-3">
            <p className="text-zinc-500 text-sm">No mannequins match your active showroom filters.</p>
            <button
              onClick={() => {
                setSelectedTypeFilter("All");
                setSelectedMaterialFilter("All");
              }}
              className="text-xs text-amber-400 font-mono underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
