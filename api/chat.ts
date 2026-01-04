import type { VercelRequest, VercelResponse } from "@vercel/node"
import { callOpenRouter } from "../lib/tensai"

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    const { message } = req.body

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required" })
    }

    const reply = await callOpenRouter(message)

    return res.status(200).json({ reply })
  } catch (err: any) {
    console.error("CHAT API ERROR:", err)

    return res.status(500).json({
      error: err.message || "Internal server error",
    })
  }
}
