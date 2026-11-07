export interface AssistantLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface AssistantReply {
  text: string;
  bullets?: string[];
  links?: AssistantLink[];
  /** Which intent answered — useful for analytics or a future backend. */
  intent: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  bullets?: string[];
  links?: AssistantLink[];
}

/**
 * Anything that can answer a visitor's question. The site ships with a local,
 * rule-based provider; a real LLM backend can implement the same interface
 * (calling a server endpoint — never with an API key in the browser).
 */
export interface AssistantProvider {
  id: string;
  reply(question: string, history: ChatMessage[]): Promise<AssistantReply>;
}
