export default async function handler(req: any, res: any) {
  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/models",
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
      }
    );

    const data = await response.json();

    const models = data.data
      .filter((m: any) => m.active)
      .map((m: any) => ({
        label: m.id,
        model: m.id,
      }));

    res.status(200).json(models);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}