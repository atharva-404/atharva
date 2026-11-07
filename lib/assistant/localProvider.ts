import { fallbackReply, intents, type Intent } from "./knowledge";
import type { AssistantProvider, AssistantReply } from "./types";

const MIN_SCORE = 2;

export function normalize(text: string) {
  return ` ${text.toLowerCase().replace(/[’']/g, "").replace(/[^a-z0-9+#.]+/g, " ").replace(/\./g, " ").replace(/\s+/g, " ").trim()} `;
}

function scoreIntent(intent: Intent, normalized: string, tokens: string[]) {
  let score = 0;
  for (const [phrase, weight] of intent.patterns) {
    const p = normalize(phrase);
    if (p.trim().includes(" ")) {
      if (normalized.includes(p)) score += weight;
    } else {
      const word = p.trim();
      if (tokens.includes(word)) score += weight;
      // Light stemming: "project" matches "projects", "technolog..." etc.
      else if (word.length >= 5 && tokens.some((t) => t.startsWith(word) || (t.length >= 5 && word.startsWith(t)))) score += weight * 0.6;
    }
  }
  return score;
}

/** Picks the best-matching intent, or null when nothing is a confident match. */
export function matchIntent(question: string): Intent | null {
  const normalized = normalize(question);
  const tokens = normalized.trim().split(" ").filter(Boolean);
  if (!tokens.length) return null;

  let best: Intent | null = null;
  let bestScore = 0;
  for (const intent of intents) {
    const score = scoreIntent(intent, normalized, tokens);
    if (score > bestScore) {
      best = intent;
      bestScore = score;
    }
  }
  return bestScore >= MIN_SCORE ? best : null;
}

export function answerLocally(question: string): AssistantReply {
  const intent = matchIntent(question);
  if (!intent) return { ...fallbackReply, intent: "fallback" };
  return { ...intent.answer(), intent: intent.id };
}

/** Rule-based provider. Runs entirely in the browser — no network, no API keys. */
export const localProvider: AssistantProvider = {
  id: "local-faq",
  async reply(question) {
    return answerLocally(question);
  },
};
