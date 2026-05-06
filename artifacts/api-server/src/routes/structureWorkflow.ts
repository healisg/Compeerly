import { Router } from "express";
import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";

const router = Router();
const client = new Anthropic();

const DEFAULT_MODEL = "claude-opus-4-5";
const CLAUDE_MODEL = process.env["CLAUDE_MODEL"] ?? DEFAULT_MODEL;

const StructuredWorkflowSchema = z.object({
  title: z.string().min(1),
  role: z.string().min(1),
  aiTool: z.string().min(1),
  category: z.string().min(1),
  timeSaved: z.string().min(1),
  frequency: z.string().min(1),
  summary: z.string().min(1),
  steps: z.array(z.string()).min(1),
  tips: z.string().min(1),
});

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
      model: CLAUDE_MODEL,
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

    let parsed: unknown;
    try {
      parsed = JSON.parse(content.text);
    } catch {
      res.status(500).json({ error: "Claude returned a response that could not be parsed as JSON. Please try again." });
      return;
    }

    const result = StructuredWorkflowSchema.safeParse(parsed);
    if (!result.success) {
      res.status(500).json({ error: "Claude returned an incomplete workflow structure. Please try again with more detail." });
      return;
    }

    res.json(result.data);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    if (message.toLowerCase().includes("quota") || message.toLowerCase().includes("rate limit") || message.toLowerCase().includes("credit")) {
      res.status(500).json({ error: "API quota or credit limit reached. Please check your Anthropic account." });
      return;
    }
    if (message.toLowerCase().includes("model")) {
      res.status(500).json({ error: `The configured AI model is unavailable. Try setting CLAUDE_MODEL to a model your API key can access.` });
      return;
    }
    res.status(500).json({ error: `Failed to structure workflow: ${message}` });
  }
});

export default router;
