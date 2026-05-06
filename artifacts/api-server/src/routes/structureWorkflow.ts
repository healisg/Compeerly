import { Router } from "express";
import Anthropic from "@anthropic-ai/sdk";

const router = Router();
const client = new Anthropic();

const SYSTEM_PROMPT = `You are a workflow structuring assistant for an enterprise AI adoption platform. The user will describe something they did using an AI tool this week. Extract and structure their description into the following JSON format. Be concise and practical. If information is missing, make a reasonable inference based on the description.

{
  "title": "Short descriptive title for this workflow (max 8 words)",
  "role": "The user's likely job role based on the task described",
  "aiTool": "Claude or ChatGPT or Gemini (whichever was mentioned or most likely)",
  "category": "Reporting or Communication or Analysis or Admin",
  "timeSaved": "Estimated time saved per occurrence (e.g. '~2h 15m')",
  "frequency": "How often this task occurs (e.g. 'Weekly', 'Daily', 'Per project')",
  "summary": "One sentence summary of what they did and the outcome",
  "steps": ["Step 1 description", "Step 2 description", "Step 3 description"],
  "tips": "One practical tip or nuance the user mentioned (or infer one)"
}

Respond with only the JSON object. No markdown, no explanation.`;

router.post("/structure-workflow", async (req, res) => {
  const { rawText } = req.body as { rawText?: string };

  if (!rawText || typeof rawText !== "string" || rawText.trim().length === 0) {
    res.status(400).json({ error: "rawText is required and must be a non-empty string" });
    return;
  }

  try {
    const message = await client.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: rawText.trim(),
        },
      ],
    });

    const content = message.content[0];
    if (content.type !== "text") {
      res.status(500).json({ error: "Unexpected response format from Claude" });
      return;
    }

    let structured: unknown;
    try {
      structured = JSON.parse(content.text);
    } catch {
      res.status(500).json({ error: "Failed to parse Claude response as JSON" });
      return;
    }

    res.json(structured);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: `Failed to structure workflow: ${message}` });
  }
});

export default router;
