import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { callOpenRouter } from "./tensai"

dotenv.config()

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

app.post("/api/chat", async (req, res) => {
  try {
    const { message, model } = req.body
    if (!message) {
      return res.status(400).json({ error: "Message is required" })
    }

    const reply = await callOpenRouter(message, model)
    res.json({ reply })
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
})

app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`)
})
