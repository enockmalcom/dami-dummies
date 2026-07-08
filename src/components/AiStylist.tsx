import React, { useState } from "react";
import { AIStylistRecommendation } from "../types";
import { Sparkles, Loader2, Lightbulb, Compass, Eye, Shirt, MapPin } from "lucide-react";

export default function AiStylist() {
  const [theme, setTheme] = useState("");
  const [audience, setAudience] = useState("");
  const [vibe, setVibe] = useState("");
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<AIStylistRecommendation | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!theme || !audience) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/stylist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          collectionTheme: theme,
          targetAudience: audience,
          vibeDescription: vibe || "Sleek, high-contrast, modern luxury",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to consult Dami AI Stylist. Please verify secrets and backend connections.");
      }

      const data = await response.json();
      setRecommendation(data);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0c0c0e] border border-zinc-800 rounded-3xl p-8 md:p-12 shadow-2xl transition-all duration-300">
      <div className="max-w-4xl mx-auto space-y-12">
        
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 bg-amber-400/10 px-3.5 py-1.5 rounded-full text-xs font-mono text-amber-400 border border-amber-400/20">
            <Sparkles className="w-4 h-4" />
            <span>Generative Display Consultant</span>
          </div>
          <h3 className="text-3xl md:text-4xl font-light tracking-tight text-zinc-100">
            Dami AI Visual Merchandiser
          </h3>
          <p className="text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Provide details about your upcoming clothing launch. Our generative engine will orchestrate the perfect physical showroom, complete with matching mannequin choices, precise lighting, and merchandising layouts.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-zinc-900/30 p-6 rounded-2xl border border-zinc-800/80">
          <div className="space-y-2">
            <label className="text-xs font-mono tracking-wider text-zinc-400 uppercase">
              Collection Theme
            </label>
            <input
              type="text"
              required
              placeholder="e.g., Cyberpunk Streetwear, Silk Royal Wedding"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-400 rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none transition-all duration-300"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono tracking-wider text-zinc-400 uppercase">
              Target Demographic
            </label>
            <input
              type="text"
              required
              placeholder="e.g., Gen Z Trendsetters, Luxury Elite"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-400 rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none transition-all duration-300"
            />
          </div>

          <div className="space-y-2 flex flex-col justify-end">
            <label className="text-xs font-mono tracking-wider text-zinc-400 uppercase mb-2">
              Atmospheric Vibe
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g., Warm, organic, neon"
                value={vibe}
                onChange={(e) => setVibe(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-400 rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none transition-all duration-300"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-zinc-100 hover:bg-amber-400 text-zinc-950 disabled:bg-zinc-800 disabled:text-zinc-500 font-medium px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 active:scale-95 shrink-0"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <span>Curate</span>
                )}
              </button>
            </div>
          </div>
        </form>

        {error && (
          <div className="p-4 bg-red-950/20 border border-red-900/30 rounded-xl text-xs font-mono text-red-400 text-center">
            {error}
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center py-16 space-y-4">
            <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
            <p className="text-xs font-mono text-zinc-500 animate-pulse">
              Orchestrating design architectures and visual coordinates...
            </p>
          </div>
        )}

        {recommendation && !loading && (
          <div className="bg-gradient-to-br from-[#121215] to-[#070708] border border-zinc-800 rounded-2xl p-8 md:p-10 space-y-8 shadow-xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-zinc-800 gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                  Curated Display Guide
                </span>
                <h4 className="text-xl font-light text-zinc-100">
                  {theme} Showcase Specification
                </h4>
              </div>
              <div className="bg-zinc-900 px-4 py-2 rounded-xl border border-zinc-800 text-xs font-mono text-zinc-300">
                Demographic: <span className="text-amber-400">{audience}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-amber-400 shrink-0">
                    <Shirt className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-mono text-zinc-500 uppercase">Mannequin & Finish Recommendation</p>
                    <p className="text-sm font-medium text-zinc-200">
                      {recommendation.mannequinType} Silhouette in <span className="text-amber-400">{recommendation.material}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-amber-400 shrink-0">
                    <Compass className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-mono text-zinc-500 uppercase">Recommended Pose</p>
                    <p className="text-sm font-medium text-zinc-200">{recommendation.pose}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-amber-400 shrink-0">
                    <Lightbulb className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-mono text-zinc-500 uppercase">Atmospheric Lighting Plan</p>
                    <p className="text-xs leading-relaxed text-zinc-300">{recommendation.lightingSetup}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-amber-400 shrink-0">
                    <Eye className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-mono text-zinc-500 uppercase">Backdrop & Visual Merchandising Aesthetic</p>
                    <p className="text-xs leading-relaxed text-zinc-300">{recommendation.backdropAesthetic}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-amber-400 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-mono text-zinc-500 uppercase">Strategic Merchandising Direction</p>
                    <p className="text-xs leading-relaxed text-zinc-300">{recommendation.merchandisingStrategy}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-800 space-y-3">
              <p className="text-xs font-mono text-zinc-500 uppercase">Accessories & Styling Highlights</p>
              <div className="flex flex-wrap gap-2">
                {recommendation.accessorySuggestions.map((acc, index) => (
                  <span
                    key={index}
                    className="bg-zinc-900 border border-zinc-800 text-xs font-medium px-3.5 py-1.5 rounded-full text-zinc-300"
                  >
                    {acc}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
