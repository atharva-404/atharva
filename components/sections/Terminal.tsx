"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { SectionReveal } from "@/components/ui/SectionReveal";

interface Line {
  id: number;
  text: string;
  type: "command" | "output" | "error" | "blank";
}

const COMMANDS: Record<string, string[]> = {
  help: [
    "Available commands:",
    "  about      — Who am I",
    "  projects   — What I've built",
    "  skills     — What I work with",
    "  fingrow    — My flagship project",
    "  github     — Open GitHub",
    "  contact    — Reach out",
    "  clear      — Clear terminal",
  ],
  about: [
    "atharva@builder-machine",
    "──────────────────────",
    "Role:   Student Founder + Developer",
    "Focus:  AI / Backend / Full Stack / Products",
    "Status: BUILDING",
    "Base:   Mumbai, India",
    "Email:  atharvasonar23@gmail.com",
  ],
  projects: [
    "PROJECTS",
    "──────────────────────",
    "→ FinGrow      [BUILDING]  AI Financial Intelligence Platform",
    "→ Fit Hub Gym  [COMPLETED] Full-stack gym management + AI",
    "→ RAG PDF      [COMPLETED] AI document intelligence",
    "→ ClaimBlitz   [PROTOTYPE] Automated claims processing",
    "→ Finexa       [EXPERIMENT] Financial intelligence prototype",
    "→ Datify       [PROTOTYPE] AI dating concept",
    "→ Drivons      [IDEA]      Urban mobility concept",
  ],
  skills: [
    "SKILLS",
    "──────────────────────",
    "BUILDING:    Python, Django, React, REST APIs, RAG",
    "COMFORTABLE: C++, PostgreSQL, AI Integration, WebSockets",
    "EXPLORING:   Advanced ML, Cybersecurity, Cloud Architecture",
  ],
  fingrow: [
    "FINGROW",
    "──────────────────────",
    "AI Financial Intelligence Platform",
    "Tech: Python · Django · React · Gemini · RAG · PostgreSQL",
    "Status: BUILDING",
    "Focus: Helping people understand their money with AI",
  ],
  github: [
    "Opening GitHub...",
    "→ github.com/atharva-404",
  ],
  contact: [
    "CONTACT",
    "──────────────────────",
    "Email:    atharvasonar23@gmail.com",
    "LinkedIn: linkedin.com/in/atharva-sonar-",
    "GitHub:   github.com/atharva-404",
  ],
};

export function Terminal() {
  const [lines, setLines] = useState<Line[]>([
    { id: 0, type: "output", text: 'atharva-portfolio v1.0.0 — type "help" to get started' },
    { id: 1, type: "blank", text: "" },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const nextIdRef = useRef(2);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const addLines = (newLines: string[], type: Line["type"] = "output") => {
    const startId = nextIdRef.current;
    nextIdRef.current += newLines.length;
    setLines((prev) => [
      ...prev,
      ...newLines.map((text, i) => ({ id: startId + i, text, type })),
    ]);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    addLines([`$ ${cmd}`], "command");
    setHistory((h) => [cmd, ...h]);
    setHistoryIdx(-1);
    setInput("");

    if (cmd === "clear") { setLines([]); return; }

    if (COMMANDS[cmd]) {
      if (cmd === "github") window.open("https://github.com/atharva-404", "_blank", "noopener noreferrer");
      addLines(COMMANDS[cmd]);
    } else {
      addLines([`Command not found: '${cmd}'. Type 'help' for available commands.`], "error");
    }
    addLines([""], "blank");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHistoryIdx((i) => { const next = Math.min(i + 1, history.length - 1); setInput(history[next] ?? ""); return next; });
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setHistoryIdx((i) => { const next = Math.max(i - 1, -1); setInput(next === -1 ? "" : history[next]); return next; });
    }
  };

  return (
    <section id="terminal" className="section-padding border-t border-[#E2E4E1] bg-[#FAFAF7]" aria-label="Interactive terminal">
      <div className="container-lg">
        <SectionReveal>
          <p className="label-mono text-[#D97A57] mb-3">TERMINAL</p>
          <h2 className="heading-section text-[clamp(2rem,4vw,3rem)] text-[#171A19] mb-3">
            Talk to <span className="text-[#D97A57]">the Machine</span>
          </h2>
          <p className="text-[#626865] text-[14px] mb-8">
            An interactive terminal. Type <code className="text-[#D97A57] font-[family-name:var(--font-mono)]">help</code> to get started.
          </p>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <div
            className="rounded-xl border border-[#E2E4E1] bg-[#171A19] overflow-hidden cursor-text max-w-3xl"
            onClick={() => inputRef.current?.focus()}
          >
            {/* Chrome */}
            <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-[#2a2f2e]">
              <div className="w-2.5 h-2.5 rounded-full bg-[#3a3f3e]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#3a3f3e]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#3a3f3e]" />
              <span className="ml-3 text-[10px] text-[#626865] font-[family-name:var(--font-mono)]">atharva@builder — ~/portfolio</span>
            </div>

            {/* Output — constrained height */}
            <div className="p-4 h-[420px] max-h-[450px] overflow-y-auto font-[family-name:var(--font-mono)] text-[13px]">
              {lines.map((line) => (
                <div key={line.id} className={line.type === "blank" ? "h-2.5" : "mb-0.5"}>
                  {line.type === "command" && <span className="text-[#D97A57]">{line.text}</span>}
                  {line.type === "output" && <span className="text-[#626865]">{line.text}</span>}
                  {line.type === "error" && <span className="text-[#9588C7]">{line.text}</span>}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 py-2.5 border-t border-[#2a2f2e]">
              <span className="text-[#D97A57] font-[family-name:var(--font-mono)] text-[13px]">$</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-white text-[13px] font-[family-name:var(--font-mono)] outline-none cursor-none caret-[#D97A57]"
                aria-label="Terminal input"
                autoComplete="off"
                spellCheck={false}
              />
              <span className="w-1.5 h-4 bg-[#D97A57] animate-[blink_1s_ease-in-out_infinite]" aria-hidden="true" />
            </form>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
