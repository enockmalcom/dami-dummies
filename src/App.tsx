import React, { useState, useEffect } from "react";
import { MannequinProduct, MannequinType, MaterialType, PoseType } from "./types";
import { DAMI_PRODUCTS, OTHER_GALLERY_IMAGES } from "./data";
import MannequinConfigurator from "./components/MannequinConfigurator";
import AiStylist from "./components/AiStylist";
import ProductCatalog from "./components/ProductCatalog";
import CustomInquiry from "./components/CustomInquiry";
import { Sparkles, Compass, Shield, ArrowRight, X, Clock, HelpCircle } from "lucide-react";

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<MannequinProduct | null>(null);
  const [configuredCustom, setConfiguredCustom] = useState<{
    type: MannequinType;
    material: MaterialType;
    pose: PoseType;
    estimatedPrice: number;
  } | null>(null);

  const [activeTab, setActiveTab] = useState<"showroom" | "laboratory" | "stylist" | "requisition">("showroom");
  const [timeStr, setTimeStr] = useState("");
  const [activePromoModal, setActivePromoModal] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      setTimeStr(date.toLocaleTimeString("en-US", { hour12: false }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleConfigureSelect = (config: {
    type: MannequinType;
    material: MaterialType;
    pose: PoseType;
    estimatedPrice: number;
  }) => {
    setConfiguredCustom(config);
    setSelectedProduct(null);
    setActiveTab("requisition");
    const element = document.getElementById("acquisitions-anchor");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectProduct = (product: MannequinProduct) => {
    setSelectedProduct(product);
    setConfiguredCustom(null);
    setActiveTab("requisition");
    const element = document.getElementById("acquisitions-anchor");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const clearSelection = () => {
    setSelectedProduct(null);
    setConfiguredCustom(null);
  };

  return (
    <div className="min-h-screen bg-[#050506] text-zinc-100 flex flex-col font-sans selection:bg-amber-400 selection:text-zinc-950">
      
      <header className="sticky top-0 z-40 bg-[#050506]/85 backdrop-blur-md border-b border-zinc-900/60 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="font-display text-2xl font-black tracking-widest text-zinc-100 uppercase">
              Dami
            </span>
            <span className="font-mono text-[9px] text-zinc-500 tracking-widest border border-zinc-800/80 px-2 py-0.5 rounded uppercase">
              Atelier
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-1">
            {(["showroom", "laboratory", "stylist", "requisition"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  const element = document.getElementById(`${tab}-anchor`);
                  if (element) element.scrollIntoView({ behavior: "smooth" });
                }}
                className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                  activeTab === tab
                    ? "text-amber-400 font-bold bg-zinc-900/40"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center space-x-2 bg-zinc-950 border border-zinc-900 px-3.5 py-1.5 rounded-xl font-mono text-[10px] text-zinc-400">
              <Clock className="w-3.5 h-3.5 text-zinc-500 animate-pulse" />
              <span>GVA {timeStr}</span>
            </div>
            <button
              onClick={() => setActivePromoModal(true)}
              className="bg-zinc-100 hover:bg-amber-400 text-zinc-950 font-medium text-xs uppercase tracking-wider px-4 py-2.5 rounded-lg transition-all duration-300 active:scale-95"
            >
              Inquire
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow space-y-24 pb-24">
        
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-12">
          <div className="absolute inset-0 z-0">
            <img
              src={OTHER_GALLERY_IMAGES.hero}
              alt="Dami Dummies Display Showcase"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-35 filter scale-105 duration-[10s] transition-all"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050506] via-[#050506]/35 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#050506]/40 via-transparent to-transparent"></div>
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-8">
            <div className="inline-flex items-center space-x-2 bg-zinc-900/60 border border-zinc-800/80 px-4 py-1.5 rounded-full backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                Next-Gen Mannequin Architecture
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-zinc-100 leading-none">
                STRONG. <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">BEAUTIFUL.</span>
                <br />
                LASTING.
              </h1>
              <p className="text-sm md:text-lg text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed">
                Sculpting the physical standard for luxury apparel. Dami Dummies combine ultra-resilient carbon polymers with hand-waxed finishes to maximize garments' spatial impact.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => {
                  setActiveTab("showroom");
                  const element = document.getElementById("showroom-anchor");
                  if (element) element.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full sm:w-auto bg-zinc-100 hover:bg-amber-400 text-zinc-950 font-medium px-8 py-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-amber-400/15"
              >
                <span>Explore Showroom</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setActiveTab("laboratory");
                  const element = document.getElementById("laboratory-anchor");
                  if (element) element.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full sm:w-auto bg-zinc-900 border border-zinc-800 hover:border-zinc-600 text-zinc-300 font-medium px-8 py-4 rounded-xl transition-all duration-300"
              >
                Bespoke Laboratory
              </button>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#0c0c0e] border border-zinc-900/60 p-8 rounded-2xl space-y-4 shadow-xl">
            <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl w-fit text-amber-400">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-medium text-zinc-200">Carbon Polymer Core</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Every Dami is reinforced with high-density aerospace structural composites, yielding absolute impact-resistance while retaining effortless carry weight.
            </p>
          </div>

          <div className="bg-[#0c0c0e] border border-zinc-900/60 p-8 rounded-2xl space-y-4 shadow-xl">
            <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl w-fit text-amber-400">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-medium text-zinc-200">Artisan Hand Finishes</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Coated in five layers of micro-pearl wax or premium textured obsidian matte, ensuring zero friction or discoloration for precious silks and lace.
            </p>
          </div>

          <div className="bg-[#0c0c0e] border border-zinc-900/60 p-8 rounded-2xl space-y-4 shadow-xl">
            <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl w-fit text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-medium text-zinc-200">Modular Articulation</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Dami's internal joint mechanisms replicate natural dynamic stances, providing perfect structural posture for tailoring and visual window merchandising.
            </p>
          </div>
        </section>

        <section id="showroom-anchor" className="max-w-7xl mx-auto px-6">
          <ProductCatalog onSelectProduct={handleSelectProduct} />
        </section>

        <section id="laboratory-anchor" className="max-w-7xl mx-auto px-6 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl md:text-5xl font-light text-zinc-100 tracking-tight">
              Bespoke Fabrication
            </h2>
            <p className="text-sm text-zinc-400 max-w-lg mx-auto">
              Configure anatomical builds, custom outer finishes, and heavy steel bases in real time inside our laboratory.
            </p>
          </div>
          <MannequinConfigurator onConfigureSelect={handleConfigureSelect} />
        </section>

        <section id="stylist-anchor" className="max-w-7xl mx-auto px-6">
          <AiStylist />
        </section>

        <section id="requisition-anchor" className="max-w-7xl mx-auto px-6">
          <CustomInquiry
            selectedProduct={selectedProduct}
            configuredCustom={configuredCustom}
            onClearSelection={clearSelection}
          />
        </section>
      </main>

      <footer className="bg-[#030304] border-t border-zinc-900 py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-zinc-400 text-xs">
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-3 text-zinc-100">
              <span className="font-display text-xl font-black tracking-widest uppercase">
                Dami
              </span>
              <span className="font-mono text-[8px] border border-zinc-800 px-2 py-0.5 rounded">
                HQ
              </span>
            </div>
            <p className="leading-relaxed text-zinc-500">
              Designing structural silhouettes and display models for the world's most demanding fashion ateliers. Inspired by Geneva's watchmakers, built with modern materials.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-zinc-200 font-mono text-[10px] uppercase tracking-wider">Ateliers</h4>
            <p className="leading-relaxed text-zinc-500">
              Geneva • London • Paris • Milan • New York • Tokyo
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-zinc-200 font-mono text-[10px] uppercase tracking-wider">Sustainability</h4>
            <p className="leading-relaxed text-zinc-500">
              100% Recyclable high-density polymers, local FSC-certified walnut wood harvesting, beeswax hand coatings.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-zinc-200 font-mono text-[10px] uppercase tracking-wider">Acquisitions</h4>
            <p className="leading-relaxed text-zinc-500">
              For volume order inquiries, bespoke museum display mounts, and corporate partnerships, submit a proposal.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-12 mt-12 border-t border-zinc-900/60 flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono text-zinc-600">
          <p>© {new Date().getFullYear()} Dami Dummies Limited. All Rights Reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <span className="hover:text-zinc-400 transition-colors">Geneva Registry No: CH-202.4.920</span>
            <span className="hover:text-zinc-400 transition-colors">Privacy Policy</span>
          </div>
        </div>
      </footer>

      {activePromoModal && (
        <div className="fixed inset-0 z-50 bg-[#050506]/80 backdrop-blur-md flex items-center justify-center p-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 max-w-md w-full space-y-6 relative shadow-2xl">
            <button
              onClick={() => setActivePromoModal(false)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2 text-center">
              <span className="text-[10px] font-mono text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded uppercase">
                Volume Acquisitions
              </span>
              <h4 className="text-xl font-light text-zinc-100">Dami Custom Quotations</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Connect directly with our master fabricators in Geneva for volume orders, custom branding embossing, or custom paint-matching services.
              </p>
            </div>

            <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-400">Direct Sales Line:</span>
                <span className="font-mono text-zinc-200">+41 22 901 0292</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-400">Atelier Email:</span>
                <span className="font-mono text-zinc-200">atelier@dami-dummies.com</span>
              </div>
            </div>

            <button
              onClick={() => {
                setActivePromoModal(false);
                setActiveTab("requisition");
                const element = document.getElementById("acquisitions-anchor");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full bg-zinc-100 hover:bg-amber-400 text-zinc-950 font-medium py-3 rounded-xl transition-all duration-300 text-xs uppercase tracking-wider"
            >
              Open Requisition Contract Form
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
