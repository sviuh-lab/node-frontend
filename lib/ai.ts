// lib/ai.ts
export async function callAI(prompt: string) {
  const res = await fetch(process.env.AI_ENDPOINT!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.AI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini", // hoặc model AI Studio
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    }),
  });

  if (!res.ok) {
    throw new Error("AI request failed");
  }

  const data = await res.json();
  return data.choices[0].message.content;
}