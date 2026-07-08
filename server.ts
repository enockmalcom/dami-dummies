import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

app.post("/api/stylist", async (req, res) => {
  try {
    const { collectionTheme, targetAudience, vibeDescription } = req.body;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Design a high-end visual merchandising display recommendation for a fashion collection with the theme: "${collectionTheme}", targeted at "${targetAudience}", with a vibe described as "${vibeDescription}". Recommendation must use Dami Dummies premium mannequins.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            mannequinType: { type: Type.STRING },
            material: { type: Type.STRING },
            pose: { type: Type.STRING },
            lightingSetup: { type: Type.STRING },
            accessorySuggestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            backdropAesthetic: { type: Type.STRING },
            merchandisingStrategy: { type: Type.STRING },
          },
          required: [
            "mannequinType",
            "material",
            "pose",
            "lightingSetup",
            "accessorySuggestions",
            "backdropAesthetic",
            "merchandisingStrategy",
          ],
        },
      },
    });

    const text = response.text;
    if (!text) {
      res.status(500).json({ error: "Empty AI response" });
      return;
    }

    res.json(JSON.parse(text));
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to generate styling advice" });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server started on http://0.0.0.0:${PORT}`);
  });
}

startServer();
