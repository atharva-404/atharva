"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { social } from "@/data/social";
import { projects } from "@/data/projects";

interface Command {
  id: string;
  label: string;
  description: string;
  action: () => void;
  category: string;
  shortcut?: string;
}

interface CommandCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandCenter({ isOpen, onClose }: CommandCenterProps) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollTo = (id: string) => {
    onClose();
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  const openUrl = (url: string) => {
    onClose();
    window.open(url, "_blank", "noopener noreferrer");
  };

  const commands: Command[] = [
    { id: "work", label: "Explore Work", description: "View all projects", action: () => scrollTo("projects"), category: "Navigate" },
    { id: "fingrow", label: "FinGrow", description: "AI Financial Intelligence Platform", action: () => scrollTo("fingrow"), category: "Projects" },
    { id: "stack", label: "Tech Stack", description: "Technologies I work with", action: () => scrollTo("skills"), category: "Navigate" },
    { id: "story", label: "My Story", description: "Build Log & Timeline", action: () => scrollTo("buildlog"), category: "Navigate" },
    { id: "founder", label: "Founder Journey", description: "Velquix & startup story", action: () => scrollTo("founder"), category: "Navigate" },
    { id: "lab", label: "Startup Lab", description: "Experiments & ideas", action: () => scrollTo("lab"), category: "Navigate" },
    { id: "contact", label: "Contact Me", description: "Let's build something", action: () => scrollTo("contact"), category: "Navigate" },
    { id: "skills", label: "Skills", description: "Building / Comfortable / Exploring", action: () => scrollTo("skills"), category: "Navigate" },
    { id: "github", label: "GitHub", description: "github.com/atharva-404", action: () => openUrl(social.github), category: "Links", shortcut: "G" },
    { id: "linkedin", label: "LinkedIn", description: "Connect with me", action: () => openUrl(social.linkedin), category: "Links", shortcut: "L" },
    { id: "email", label: "Email Me", description: social.email, action: () => openUrl(`mailto:${social.email}`), category: "Links", shortcut: "E" },
    { id: "resume", label: "Download Resume", description: "View my resume", action: () => openUrl(social.resume), category: "Links", shortcut: "R" },
  ];

  const filtered = commands.filter(
    (c) =>
      query === "" ||
      c.label.toLowerCase().includes(query.toLowerCase()) ||
      c.description.toLowerCase().includes(query.toLowerCase())
  );

  const grouped = filtered.reduce<Record<string, Command[]>>((acc, cmd) => {
    if (!acc[cmd.category]) acc[cmd.category] = [];
    acc[cmd.category].push(cmd);
    return acc;
  }, {});

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelected("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown") {
        const idx = filtered.findIndex((c) => c.id === selected);
        setSelected(filtered[Math.min(idx + 1, filtered.length - 1)]?.id ?? "");
      }
      if (e.key === "ArrowUp") {
        const idx = filtered.findIndex((c) => c.id === selected);
        setSelected(filtered[Math.max(idx - 1, 0)]?.id ?? "");
      }
      if (e.key === "Enter") {
        const cmd = filtered.find((c) => c.id === selected);
        if (cmd) cmd.action();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, filtered, selected, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9990] bg-[#171A19]/20 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
            className="fixed top-[22%] left-1/2 -translate-x-1/2 z-[9991] w-full max-w-lg"
            role="dialog"
            aria-label="Command Center"
            aria-modal="true"
          >
            <div className="mx-4 rounded-xl border border-[#E2E4E1] bg-[#FAFAF7] overflow-hidden shadow-lg">
              <div className="border-b border-[#E2E4E1]">
                <div className="flex items-center gap-3 px-4 py-3">
                  <span className="text-[#D97A57] text-sm">⌘</span>
                  <input
                    ref={inputRef}
                    value={query}
                    onChange={(e) => { setQuery(e.target.value); setSelected(""); }}
                    placeholder="Type a command or search..."
                    className="flex-1 bg-transparent text-[#171A19] placeholder-[#626865]/50 text-sm outline-none font-[family-name:var(--font-mono)] focus:outline-none focus-visible:outline-none"
                    aria-label="Command search"
                  />
                  <button
                    onClick={onClose}
                    className="text-[#626865] text-[10px] border border-[#E2E4E1] rounded px-1.5 py-0.5 font-[family-name:var(--font-mono)]"
                  >
                    ESC
                  </button>
                </div>
              </div>

              <div className="max-h-72 overflow-y-auto p-1.5">
                {Object.entries(grouped).length === 0 ? (
                  <p className="text-center text-[#626865] text-sm py-6">No commands found</p>
                ) : (
                  Object.entries(grouped).map(([category, cmds]) => (
                    <div key={category} className="mb-1">
                      <p className="label-mono text-[#626865]/60 px-3 py-1.5">{category}</p>
                      {cmds.map((cmd) => (
                        <button
                          key={cmd.id}
                          onClick={cmd.action}
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-colors min-h-[44px] ${
                            selected === cmd.id
                              ? "bg-[#F1F2EF] text-[#171A19]"
                              : "text-[#626865] hover:bg-[#F1F2EF] hover:text-[#171A19]"
                          }`}
                          onMouseEnter={() => setSelected(cmd.id)}
                        >
                          <div>
                            <p className="text-[13px] font-medium">{cmd.label}</p>
                            <p className="text-[11px] text-[#626865]/60 mt-0.5">{cmd.description}</p>
                          </div>
                          {cmd.shortcut && (
                            <span className="text-[10px] border border-[#E2E4E1] rounded px-1.5 py-0.5 text-[#626865] font-[family-name:var(--font-mono)]">
                              {cmd.shortcut}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  ))
                )}
              </div>

              <div className="border-t border-[#E2E4E1] px-4 py-2 flex items-center gap-4 label-mono text-[#626865]/50">
                <span>↑↓ navigate</span>
                <span>↵ select</span>
                <span>ESC close</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
