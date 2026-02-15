import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { callAI } from "../lib/tensai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  try {
    const { message, model } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    if (!model) {
      return res.status(400).json({
        error: "Model is required",
      });
    }

    console.log("CHAT REQUEST:", {
      model,
      time: new Date().toISOString(),
    });

    const reply = await callAI({
      message,
      model,
    });

    res.json({ reply });

  } catch (error: any) {
    console.error("SERVER ERROR:", error);

    res.status(500).json({
      error: "AI service temporarily unavailable",
    });
  }
});

app.get("/api/models", async (req, res) => {
  try {
    const models: any[] = [];
    const groqKey = process.env.GROQ_API_KEY;

    if (!groqKey) {
      return res.status(500).json({
        error: "GROQ_API_KEY not found",
      });
    }

    const groqRes = await fetch(
      "https://api.groq.com/openai/v1/models",
      {
        headers: {
          Authorization: `Bearer ${groqKey}`,
        },
      }
    );

    if (!groqRes.ok) {
      const text = await groqRes.text();
      throw new Error(text);
    }

    const groqData = await groqRes.json();

    if (Array.isArray(groqData.data)) {
      const groqModels = groqData.data
        .filter((m: any) => m.active) 
        .map((m: any) => ({
          label: m.id,
          model: m.id,
        }));

      models.push(...groqModels);
    }

    res.json(models);

  } catch (error) {
    console.error("MODELS ERROR:", error);

    res.status(500).json({
      error: "Failed to fetch models",
    });
  }
});

const distPath = path.resolve(process.cwd(), "dist");

app.use(express.static(distPath));

app.use((req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
});
