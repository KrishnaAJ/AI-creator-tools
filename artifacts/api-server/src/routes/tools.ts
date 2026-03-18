import { Router, type IRouter } from "express";
import { openai } from "@workspace/integrations-openai-ai-server";
import {
  GenerateYoutubeTitlesBody,
  GenerateInstagramBioBody,
  GenerateHashtagsBody,
  GenerateCaptionBody,
  GenerateBlogIdeasBody,
  GenerateEmailSubjectBody,
  GenerateTweetBody,
  GenerateProductDescriptionBody,
  GenerateAdCopyBody,
  TextToEmojiBody,
  ParaphraseTextBody,
  GrammarCheckBody,
  SummarizeTextBody,
  GenerateSeoMetaBody,
} from "@workspace/api-zod";

const router: IRouter = Router();

async function callAI(systemPrompt: string, userMessage: string): Promise<string> {
  const response = await openai.chat.completions.create({
    model: "gpt-5-mini",
    max_completion_tokens: 8192,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userMessage },
    ],
  });
  return response.choices[0]?.message?.content ?? "";
}

function parseJsonList(text: string): string[] {
  try {
    const cleaned = text.trim().replace(/^```json\n?/, "").replace(/\n?```$/, "");
    const parsed = JSON.parse(cleaned);
    if (Array.isArray(parsed)) return parsed.map(String);
  } catch {}
  return text
    .split(/\n+/)
    .map((l) => l.replace(/^[\d\-\.\*\•]+\s*/, "").trim())
    .filter(Boolean);
}

router.post("/tools/youtube-titles", async (req, res) => {
  const body = GenerateYoutubeTitlesBody.safeParse(req.body);
  if (!body.success) return void res.status(400).json({ error: body.error.message });
  const { topic, style } = body.data;
  const text = await callAI(
    "You are a YouTube SEO expert. Generate exactly 5 compelling YouTube video titles as a JSON array of strings. No explanation.",
    `Topic: ${topic}${style ? `, Style: ${style}` : ""}. Generate 5 titles.`
  );
  res.json({ results: parseJsonList(text).slice(0, 5) });
});

router.post("/tools/instagram-bio", async (req, res) => {
  const body = GenerateInstagramBioBody.safeParse(req.body);
  if (!body.success) return void res.status(400).json({ error: body.error.message });
  const { name, niche, tone } = body.data;
  const text = await callAI(
    "You are an Instagram marketing expert. Write a compelling Instagram bio in 150 characters or less. Return only the bio text, no explanation.",
    `Name: ${name}, Niche: ${niche}, Tone: ${tone ?? "casual"}`
  );
  res.json({ result: text.trim() });
});

router.post("/tools/hashtags", async (req, res) => {
  const body = GenerateHashtagsBody.safeParse(req.body);
  if (!body.success) return void res.status(400).json({ error: body.error.message });
  const { topic, platform, count } = body.data;
  const num = count ?? 15;
  const text = await callAI(
    `You are a social media expert. Generate exactly ${num} relevant hashtags as a JSON array of strings (include # symbol). No explanation.`,
    `Topic: ${topic}, Platform: ${platform}`
  );
  res.json({ results: parseJsonList(text).slice(0, num) });
});

router.post("/tools/caption", async (req, res) => {
  const body = GenerateCaptionBody.safeParse(req.body);
  if (!body.success) return void res.status(400).json({ error: body.error.message });
  const { description, platform, tone } = body.data;
  const text = await callAI(
    `You are a social media copywriter. Write an engaging ${platform} caption. Return only the caption text.`,
    `Description: ${description}, Tone: ${tone}`
  );
  res.json({ result: text.trim() });
});

router.post("/tools/blog-ideas", async (req, res) => {
  const body = GenerateBlogIdeasBody.safeParse(req.body);
  if (!body.success) return void res.status(400).json({ error: body.error.message });
  const { niche, count } = body.data;
  const num = count ?? 5;
  const text = await callAI(
    `You are a content strategist. Generate exactly ${num} unique, SEO-friendly blog post ideas as a JSON array of strings. No explanation.`,
    `Niche: ${niche}`
  );
  res.json({ results: parseJsonList(text).slice(0, num) });
});

router.post("/tools/email-subject", async (req, res) => {
  const body = GenerateEmailSubjectBody.safeParse(req.body);
  if (!body.success) return void res.status(400).json({ error: body.error.message });
  const { emailTopic, audience } = body.data;
  const text = await callAI(
    "You are an email marketing expert. Generate 5 high-converting email subject lines as a JSON array of strings. No explanation.",
    `Topic: ${emailTopic}${audience ? `, Audience: ${audience}` : ""}`
  );
  res.json({ results: parseJsonList(text).slice(0, 5) });
});

router.post("/tools/tweet", async (req, res) => {
  const body = GenerateTweetBody.safeParse(req.body);
  if (!body.success) return void res.status(400).json({ error: body.error.message });
  const { topic, tone, count } = body.data;
  const num = count ?? 3;
  const text = await callAI(
    `You are a Twitter/X expert. Generate exactly ${num} tweets (under 280 chars each) as a JSON array of strings. Include emojis where appropriate. No explanation.`,
    `Topic: ${topic}, Tone: ${tone ?? "informative"}`
  );
  res.json({ results: parseJsonList(text).slice(0, num) });
});

router.post("/tools/product-description", async (req, res) => {
  const body = GenerateProductDescriptionBody.safeParse(req.body);
  if (!body.success) return void res.status(400).json({ error: body.error.message });
  const { productName, features, targetAudience } = body.data;
  const text = await callAI(
    "You are a copywriter. Write a compelling, SEO-friendly product description. Return only the description text.",
    `Product: ${productName}, Features: ${features}${targetAudience ? `, Target Audience: ${targetAudience}` : ""}`
  );
  res.json({ result: text.trim() });
});

router.post("/tools/ad-copy", async (req, res) => {
  const body = GenerateAdCopyBody.safeParse(req.body);
  if (!body.success) return void res.status(400).json({ error: body.error.message });
  const { product, platform, goal } = body.data;
  const text = await callAI(
    `You are an advertising expert. Generate 3 compelling ${platform} ad copies optimized for ${goal ?? "engagement"} as a JSON array of strings. No explanation.`,
    `Product: ${product}`
  );
  res.json({ results: parseJsonList(text).slice(0, 3) });
});

router.post("/tools/text-to-emoji", async (req, res) => {
  const body = TextToEmojiBody.safeParse(req.body);
  if (!body.success) return void res.status(400).json({ error: body.error.message });
  const { text } = body.data;
  const result = await callAI(
    "You are an emoji translator. Convert the user's text into an emoji-rich version. Keep the meaning but add relevant emojis throughout. Return only the emoji-fied text.",
    text
  );
  res.json({ result: result.trim() });
});

router.post("/tools/paraphrase", async (req, res) => {
  const body = ParaphraseTextBody.safeParse(req.body);
  if (!body.success) return void res.status(400).json({ error: body.error.message });
  const { text, tone } = body.data;
  const result = await callAI(
    `You are a writing expert. Rewrite the following text in a ${tone ?? "casual"} tone while preserving the original meaning. Return only the rewritten text.`,
    text
  );
  res.json({ result: result.trim() });
});

router.post("/tools/grammar-check", async (req, res) => {
  const body = GrammarCheckBody.safeParse(req.body);
  if (!body.success) return void res.status(400).json({ error: body.error.message });
  const { text } = body.data;
  const result = await callAI(
    `You are a grammar expert. Check and correct the text. Return a JSON object with two fields: "corrected" (the corrected text as a string) and "changes" (array of strings describing each change made). If there are no changes, return an empty array for changes. Format: {"corrected": "...", "changes": [...]}`,
    text
  );
  try {
    const cleaned = result.trim().replace(/^```json\n?/, "").replace(/\n?```$/, "");
    const parsed = JSON.parse(cleaned);
    return void res.json({ corrected: parsed.corrected ?? text, changes: parsed.changes ?? [] });
  } catch {
    return void res.json({ corrected: result.trim(), changes: [] });
  }
});

router.post("/tools/summarize", async (req, res) => {
  const body = SummarizeTextBody.safeParse(req.body);
  if (!body.success) return void res.status(400).json({ error: body.error.message });
  const { text, length } = body.data;
  const lengthGuide = length === "short" ? "1-2 sentences" : length === "long" ? "2-3 paragraphs" : "3-5 sentences";
  const result = await callAI(
    `You are a summarization expert. Summarize the text in ${lengthGuide}. Return only the summary.`,
    text
  );
  res.json({ result: result.trim() });
});

router.post("/tools/seo-meta", async (req, res) => {
  const body = GenerateSeoMetaBody.safeParse(req.body);
  if (!body.success) return void res.status(400).json({ error: body.error.message });
  const { pageTitle, description, keywords } = body.data;
  const result = await callAI(
    `You are an SEO expert. Generate SEO meta tags. Return a JSON object with: "metaTitle" (string, under 60 chars), "metaDescription" (string, under 160 chars), "keywords" (array of 5-10 keyword strings). Format: {"metaTitle": "...", "metaDescription": "...", "keywords": [...]}`,
    `Page Title: ${pageTitle}, Description: ${description}${keywords ? `, Keywords hint: ${keywords}` : ""}`
  );
  try {
    const cleaned = result.trim().replace(/^```json\n?/, "").replace(/\n?```$/, "");
    const parsed = JSON.parse(cleaned);
    return void res.json({
      metaTitle: parsed.metaTitle ?? pageTitle,
      metaDescription: parsed.metaDescription ?? description,
      keywords: Array.isArray(parsed.keywords) ? parsed.keywords : [],
    });
  } catch {
    return void res.json({ metaTitle: pageTitle, metaDescription: description, keywords: [] });
  }
});

export default router;
