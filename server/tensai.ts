type ORResponse = {
  choices: {
    message: { content: string }
  }[]
}

export async function callOpenRouter(
  prompt: string,
  model = "xiaomi/mimo-v2-flash:free"
) {
  if (!process.env.OPENROUTER_API_KEY) {
    throw new Error("OPENROUTER_API_KEY is missing")
  }

  const res = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:5173",
        "X-Title": "Tensai AI",
      },
      body: JSON.stringify({
        model,
        messages: [{ role: "user", content: prompt }],
      }),
    }
  )

  if (!res.ok) {
    const text = await res.text()
    console.error("OPENROUTER ERROR:", text)
    throw new Error(text)
  }

  const data = (await res.json()) as ORResponse

  if (!data.choices?.length) {
    throw new Error("No choices returned from OpenRouter")
  }

  return data.choices[0].message.content
}
