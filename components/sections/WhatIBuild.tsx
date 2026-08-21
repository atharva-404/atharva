"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionReveal } from "@/components/ui/SectionReveal";

const areas = [
  {
    id: "ai",
    label: "AI",
    tagline: "Building intelligence into products",
    items: ["RAG systems", "AI assistants", "Machine Learning", "Computer Vision", "AI integrations"],
    color: "#D97A57",
  },
  {
    id: "software",
    label: "SOFTWARE",
    tagline: "Systems that actually work",
    items: ["Backend systems", "REST APIs", "Full-stack apps", "Database architecture"],
    color: "#171A19",
  },
  {
    id: "product",
    label: "PRODUCT",
    tagline: "Ideas that reach real users",
    items: ["Fintech products", "SaaS concepts", "Startup experiments", "User-focused apps"],
    color: "#7FA06F",
  },
  {
    id: "security",
    label: "SECURITY",
    tagline: "Systems built to be trusted",
    items: ["Cybersecurity", "Network admin", "Secure APIs", "Authentication"],
    color: "#626865",
  },
];

export function WhatIBuild() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section id="whatibuild" className="section-padding border-t border-[#E2E4E1] bg-[#FAFAF7]" aria-label="What I Build">
      <div className="container-xl">
        <SectionReveal>
          <p className="label-mono text-[#D97A57] mb-4">What I Build</p>
        </SectionReveal>

        <div className="divide-y divide-[#E2E4E1]">
          {areas.map((area, i) => {
            const isActive = activeId === area.id;
            return (
              <motion.div
                key={area.id}
                onHoverStart={() => setActiveId(area.id)}
                onHoverEnd={() => setActiveId(null)}
                onClick={() => setActiveId(isActive ? null : area.id)}
                className="group py-5 sm:py-6 flex flex-col gap-3 cursor-pointer sm:cursor-default"
                role="button"
                tabIndex={0}
                aria-expanded={isActive}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActiveId(isActive ? null : area.id); } }}
              >
                {/* Top row */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-baseline gap-3 sm:gap-6">
                    <motion.span
                      animate={{ color: isActive ? area.color : "#E2E4E1" }}
                      transition={{ duration: 0.2 }}
                      className="text-[10px] font-[family-name:var(--font-mono)] w-5 text-right flex-shrink-0"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </motion.span>
                    <motion.h3
                      animate={{
                        color: isActive ? area.color : "#171A19",
                        x: isActive ? 4 : 0,
                      }}
                      transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                      className="text-[clamp(1.8rem,5vw,4.5rem)] font-[family-name:var(--font-display)] font-bold tracking-[-0.03em] leading-none"
                    >
                      {area.label}
                    </motion.h3>
                  </div>

                  {/* Mobile expand indicator */}
                  <motion.span
                    animate={{ rotate: isActive ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-[#E2E4E1] text-xl sm:hidden flex-shrink-0"
                    aria-hidden="true"
                  >
                    +
                  </motion.span>

                  {/* Desktop tagline — always visible on hover (pointer: fine) */}
                  <motion.p
                    animate={{ opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.15 }}
                    className="hidden sm:block text-[12px] text-[#626865] italic flex-shrink-0"
                  >
                    {area.tagline}
                  </motion.p>
                </div>

                {/* Expandable content — always visible when active (touch or hover) */}
                <motion.div
                  initial={false}
                  animate={{
                    height: isActive ? "auto" : 0,
                    opacity: isActive ? 1 : 0,
                  }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden ml-8 sm:ml-11"
                >
                  <p className="text-[12px] text-[#626865] italic mb-2 sm:hidden">{area.tagline}</p>
                  <div className="flex flex-wrap gap-1.5 pb-1">
                    {area.items.map((item) => (
                      <span
                        key={item}
                        className="text-[10px] sm:text-[11px] px-2 py-0.5 border rounded font-[family-name:var(--font-mono)]"
                        style={{ borderColor: `${area.color}18`, color: area.color, background: `${area.color}05` }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
