"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import type { ChatMessage } from "@/lib/assistant/types";

// The chat UI and its knowledge base load only when a visitor opens it.
const AssistantPanel = dynamic(() => import("./AssistantPanel"), { ssr: false });

export function AssistantWidget() {
  const [open, setOpen] = useState(false);
  const [everOpened, setEverOpened] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const launcherRef = useRef<HTMLButtonElement>(null);

  const openPanel = () => {
    setEverOpened(true);
    setOpen(true);
  };

  const close = useCallback(() => {
    setOpen(false);
    requestAnimationFrame(() => launcherRef.current?.focus());
  }, []);

  // Warm the chunk when the visitor shows intent, so opening feels instant.
  const prefetch = () => void import("./AssistantPanel");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <>
      <AnimatePresence>
        {!open ? (
          <motion.button
            ref={launcherRef}
            key="launcher"
            type="button"
            onClick={openPanel}
            onPointerEnter={prefetch}
            onFocus={prefetch}
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: { delay: everOpened ? 0 : 1.6, type: "spring", stiffness: 260, damping: 22 } }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
            className="group fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-4 z-[45] flex h-14 items-center gap-2.5 rounded-full border border-line-strong bg-card/90 pl-2 pr-2 text-sm font-semibold shadow-[0_20px_60px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl transition-colors hover:border-accent/50 sm:right-6 sm:pr-5"
            aria-haspopup="dialog"
            aria-expanded={false}
            aria-label="Open Atharva AI, the portfolio assistant"
          >
            <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-accent text-bg">
              <Sparkles size={18} aria-hidden="true" />
              <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-card bg-lime" aria-hidden="true" />
            </span>
            <span className="hidden sm:inline">Atharva AI</span>
          </motion.button>
        ) : null}
      </AnimatePresence>

      {everOpened ? (
        <AssistantPanel open={open} onClose={close} messages={messages} setMessages={setMessages} />
      ) : null}
    </>
  );
}
