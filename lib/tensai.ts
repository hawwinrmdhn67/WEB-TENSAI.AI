type AIRequest = {
  message: string;
  model: string;
};

export async function callAI({
  message,
  model,
}: AIRequest): Promise<string> {
  return callGroq(message, model);
}

async function callGroq(prompt: string, model: string) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new Error("GROQ_API_KEY not found");
  }

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model,
            messages: [
              {
                role: "user",
                content: prompt,
              },
            ],
          }),
        }
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
      }

      const data = await res.json();
      return data?.choices?.[0]?.message?.content || "";

    } catch (err: any) {
      console.warn(`Retry attempt ${attempt} failed`);

      if (attempt === 3) {
        throw err;
      }

      await new Promise(r => setTimeout(r, 1000)); 
    }
  }

  throw new Error("Unexpected failure");
}