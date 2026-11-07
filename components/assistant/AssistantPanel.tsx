"use client";

import { useEffect, useId, useRef, useState, type Dispatch, type FormEvent, type SetStateAction } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, ArrowUpRight, X } from "lucide-react";
import { profile } from "@/data/profile";
import { suggestedQuestions } from "@/lib/assistant/knowledge";
import { localProvider } from "@/lib/assistant/localProvider";
import type { AssistantProvider, ChatMessage } from "@/lib/assistant/types";
import { cn } from "@/lib/cn";

interface PanelProps {
  open: boolean;
  onClose: () => void;
  messages: ChatMessage[];
  setMessages: Dispatch<SetStateAction<ChatMessage[]>>;
  provider?: AssistantProvider;
}

const INTRO = "Hey! I'm Atharva's portfolio assistant. What would you like to know?";

let counter = 0;
const nextId = () => `m${Date.now().toString(36)}${(counter++).toString(36)}`;

export default function AssistantPanel({ open, onClose, messages, setMessages, provider = localProvider }: PanelProps) {
  const titleId = useId();
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) requestAnimationFrame(() => inputRef.current?.focus({ preventScroll: true }));
  }, [open]);

  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTo({ top: list.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const asked = new Set(messages.filter((m) => m.role === "user").map((m) => m.text));
  const suggestions = suggestedQuestions.filter((q) => !asked.has(q)).slice(0, messages.length ? 3 : 7);

  const ask = async (question: string) => {
    const text = question.trim();
    if (!text || typing) return;
    const userMessage: ChatMessage = { id: nextId(), role: "user", text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setTyping(true);

    // A short minimum "thinking" pause so the answer doesn't snap in.
    const [reply] = await Promise.all([
      provider.reply(text, [...messages, userMessage]),
      new Promise((resolve) => setTimeout(resolve, 450)),
    ]);

    setMessages((prev) => [...prev, { id: nextId(), role: "assistant", text: reply.text, bullets: reply.bullets, links: reply.links }]);
    setTyping(false);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void ask(input);
  };

  const onLinkClick = (href: string) => {
    // In-page links are handled by the global scroll manager; on phones, get the panel out of the way.
    if (href.startsWith("#") && window.matchMedia("(max-width: 639px)").matches) onClose();
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="assistant"
          role="dialog"
          aria-modal="false"
          aria-labelledby={titleId}
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.98 }}
          transition={{ type: "spring", stiffness: 320, damping: 30 }}
          style={{ transformOrigin: "bottom right" }}
          className="fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-[60] flex h-[min(640px,calc(100svh-5.5rem))] flex-col overflow-hidden rounded-[24px] border border-line-strong bg-[#0d0d0d]/95 shadow-[0_40px_120px_-30px_rgba(0,0,0,1)] backdrop-blur-2xl sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[400px] sm:h-[min(620px,calc(100svh-7rem))]"
        >
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-line px-4 py-3.5">
            <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-line-strong">
              <Image src={profile.portrait.src} alt="" width={80} height={107} className="h-full w-full object-cover object-[50%_20%]" />
            </span>
            <div className="min-w-0 flex-1">
              <p id={titleId} className="font-display text-[15px] font-semibold leading-tight">
                Atharva AI
              </p>
              <p className="flex items-center gap-1.5 truncate text-xs text-faint">
                <span className="h-1.5 w-1.5 rounded-full bg-lime" aria-hidden="true" />
                Portfolio FAQ · answers from this site
              </p>
            </div>
            <button type="button" onClick={onClose} className="icon-btn h-10 w-10 border-transparent" aria-label="Close assistant">
              <X size={18} />
            </button>
          </div>

          {/* Conversation */}
          <div ref={listRef} className="flex-1 space-y-4 overflow-y-auto overscroll-contain px-4 py-5" aria-live="polite" aria-relevant="additions">
            <Bubble role="assistant" text={INTRO} />
            {messages.map((m) => (
              <Bubble key={m.id} {...m} onLinkClick={onLinkClick} />
            ))}
            {typing ? (
              <div className="flex w-fit items-center gap-1 rounded-2xl rounded-bl-md bg-card px-4 py-3.5" aria-label="Atharva AI is typing">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="h-1.5 w-1.5 rounded-full bg-muted" style={{ animation: `typing 1.1s ${i * 0.15}s infinite ease-in-out` }} />
                ))}
              </div>
            ) : null}
          </div>

          {/* Suggestions + input */}
          <div className="border-t border-line p-3">
            {suggestions.length ? (
              <div className="-mx-3 mb-3 flex gap-2 overflow-x-auto px-3 pb-1 [scrollbar-width:none]" aria-label="Suggested questions">
                {suggestions.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => void ask(q)}
                    disabled={typing}
                    className="shrink-0 rounded-full border border-line bg-white/[0.03] px-3 py-2 text-xs text-muted transition-colors hover:border-accent/40 hover:text-fg disabled:opacity-50"
                  >
                    {q}
                  </button>
                ))}
              </div>
            ) : null}

            <form onSubmit={onSubmit} className="flex items-center gap-2 rounded-full border border-line-strong bg-bg pl-4 pr-1.5 focus-within:border-accent/60">
              <label htmlFor={`${titleId}-input`} className="sr-only">
                Ask about Atharva
              </label>
              <input
                id={`${titleId}-input`}
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about projects, skills, Velquix…"
                autoComplete="off"
                maxLength={200}
                className="h-12 min-w-0 flex-1 bg-transparent text-[16px] text-fg placeholder:text-faint focus:outline-none sm:text-sm"
              />
              <button
                type="submit"
                disabled={!input.trim() || typing}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-bg transition-opacity disabled:opacity-35"
                aria-label="Send question"
              >
                <ArrowUp size={18} />
              </button>
            </form>
            <p className="mt-2 px-2 text-center text-[11px] text-faint">
              Answers come from Atharva&apos;s portfolio data — this isn&apos;t a live AI model.
            </p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function Bubble({
  role,
  text,
  bullets,
  links,
  onLinkClick,
}: Pick<ChatMessage, "role" | "text" | "bullets" | "links"> & { onLinkClick?: (href: string) => void }) {
  const isUser = role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("flex", isUser ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "max-w-[88%] rounded-2xl px-4 py-3 text-[14px] leading-relaxed",
          isUser ? "rounded-br-md bg-accent/15 text-fg" : "rounded-bl-md bg-card text-fg/90",
        )}
      >
        {isUser ? <span className="sr-only">You: </span> : <span className="sr-only">Atharva AI: </span>}
        {text.split("\n").map((line, i) => (
          <p key={i} className={i > 0 ? "mt-2" : undefined}>
            {line}
          </p>
        ))}
        {bullets?.length ? (
          <ul className="mt-2.5 space-y-1.5">
            {bullets.map((b) => (
              <li key={b} className="flex gap-2 text-[13px] text-muted">
                <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                {b}
              </li>
            ))}
          </ul>
        ) : null}
        {links?.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {links.map((l) => (
              <a
                key={l.href + l.label}
                href={l.href}
                onClick={() => onLinkClick?.(l.href)}
                {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="inline-flex items-center gap-1 rounded-full border border-line-strong px-3 py-1.5 text-xs text-fg transition-colors hover:border-accent/60 hover:text-accent"
              >
                {l.label}
                {l.external ? <ArrowUpRight size={12} aria-hidden="true" /> : null}
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </motion.div>
  );
}
