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
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="whatibuild" className="section-padding border-t border-[#E2E4E1] bg-[#FAFAF7]" aria-label="What I Build">
      <div className="container-xl">
        <SectionReveal>
          <p className="label-mono text-[#D97A57] mb-4">What I Build</p>
        </SectionReveal>

        <div className="divide-y divide-[#E2E4E1]">
          {areas.map((area, i) => {
            const isHovered = hoveredId === area.id;
            return (
              <motion.div
                key={area.id}
                onHoverStart={() => setHoveredId(area.id)}
                onHoverEnd={() => setHoveredId(null)}
                className="group py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-none"
              >
                <div className="flex items-baseline gap-4 sm:gap-6">
                  <motion.span
                    animate={{ color: isHovered ? area.color : "#E2E4E1" }}
                    transition={{ duration: 0.2 }}
                    className="text-[10px] font-[family-name:var(--font-mono)] w-5 text-right flex-shrink-0"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </motion.span>
                  <motion.h3
                    animate={{
                      color: isHovered ? area.color : "#171A19",
                      x: isHovered ? 4 : 0,
                    }}
                    transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                    className="text-[clamp(2rem,6vw,4.5rem)] font-[family-name:var(--font-display)] font-bold tracking-[-0.03em] leading-none"
                  >
                    {area.label}
                  </motion.h3>
                </div>

                <motion.div
                  animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 8 }}
                  transition={{ duration: 0.15 }}
                  className="sm:text-right ml-9 sm:ml-0"
                >
                  <p className="text-[12px] text-[#626865] mb-1.5 italic">{area.tagline}</p>
                  <div className="flex flex-wrap sm:justify-end gap-1">
                    {area.items.map((item) => (
                      <span
                        key={item}
                        className="text-[10px] px-2 py-0.5 border rounded font-[family-name:var(--font-mono)]"
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
