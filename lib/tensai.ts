// lib/tensai.ts

type ORMessage = {
  role: "system" | "user" | "assistant"
  content: string
}

type ORResponse = {
  choices?: {
    message?: {
      content?: string
    }
  }[]
}

type CallOpenRouterOptions = {
  model?: string
  systemPrompt?: string
}

const OPENROUTER_URL =
  "https://openrouter.ai/api/v1/chat/completions"

/* =======================
   ENV HELPER
======================= */
function getOpenRouterKey(): string {
  const key = process.env.OPENROUTER_API_KEY
  if (!key) {
    throw new Error("OPENROUTER_API_KEY not configured")
  }
  return key
}

/* =======================
   MAIN FUNCTION
======================= */
export async function callOpenRouter(
  prompt: string,
  opts?: CallOpenRouterOptions
): Promise<string> {
  const apiKey = getOpenRouterKey()

  const messages: ORMessage[] = []

  if (opts?.systemPrompt) {
    messages.push({
      role: "system",
      content: opts.systemPrompt,
    })
  }

  messages.push({
    role: "user",
    content: prompt,
  })

  const res = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://your-domain.vercel.app",
      "X-Title": "Tensai AI",
    },
    body: JSON.stringify({
      model: opts?.model ?? "xiaomi/mimo-v2-flash:free",
      messages,
    }),
  })

  if (!res.ok) {
    const errText = await res.text()
    throw new Error(`OpenRouter error: ${errText}`)
  }

  const data = (await res.json()) as ORResponse
  const content = data.choices?.[0]?.message?.content

  if (!content) {
    throw new Error("No response from OpenRouter")
  }

  return content.trim()
}
