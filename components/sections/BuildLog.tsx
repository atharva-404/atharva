"use client";

import { motion } from "framer-motion";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { buildLog } from "@/data/experience";

const categoryColors: Record<string, string> = {
  learning: "#626865",
  building: "#D97A57",
  founding: "#7FA06F",
  shipping: "#9588C7",
};

const categoryLabel: Record<string, string> = {
  learning: "LEARNING",
  building: "BUILDING",
  founding: "FOUNDING",
  shipping: "SHIPPED",
};

export function BuildLog() {
  return (
    <section id="buildlog" className="section-padding border-t border-[#E2E4E1] bg-[#FAFAF7]" aria-label="Build Log timeline">
      <div className="container-lg">
        <SectionReveal>
          <p className="label-mono text-[#D97A57] mb-3">ENGINEERING LOG</p>
          <h2 className="heading-section text-[clamp(2rem,5vw,3.5rem)] text-[#171A19] mb-3">
            Build <span className="text-[#D97A57]">Log</span>
          </h2>
          <p className="text-[#626865] text-[15px] mb-12 max-w-md">
            A chronological stream of what I&apos;ve built, learned, and shipped.
          </p>
        </SectionReveal>

        <div className="relative">
          {/* Central line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[#E2E4E1]" />

          <div className="space-y-10">
            {buildLog.map((entry, i) => {
              const isLeft = i % 2 === 0;
              const color = categoryColors[entry.category];
              return (
                <motion.div
                  key={entry.year}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-5%" }}
                  transition={{ duration: 0.5, delay: 0.05 }}
                  className={`relative flex flex-col md:flex-row ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} items-start gap-6`}
                >
                  {/* Year */}
                  <div className={`w-full md:w-1/2 ${isLeft ? "md:text-right md:pr-10" : "md:pl-10"} pl-10 md:pl-0`}>
                    <div className="inline-block text-3xl md:text-4xl font-[family-name:var(--font-display)] font-bold" style={{ color }}>
                      {entry.year}
                    </div>
                    <div
                      className="inline-block ml-3 md:ml-0 md:block text-[9px] px-2 py-0.5 border rounded-full font-[family-name:var(--font-mono)] mt-1"
                      style={{ color, borderColor: `${color}20`, background: `${color}05` }}
                    >
                      {categoryLabel[entry.category]}
                    </div>
                  </div>

                  {/* Dot */}
                  <div
                    className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-2 w-2.5 h-2.5 rounded-full border-2 bg-[#FAFAF7]"
                    style={{ borderColor: color }}
                  />

                  {/* Entries */}
                  <div className={`w-full md:w-1/2 ${isLeft ? "md:pl-10" : "md:pr-10"} pl-10 md:pl-0`}>
                    <div className="space-y-1.5">
                      {entry.entries.map((e, j) => (
                        <motion.div
                          key={`${entry.year}-${j}`}
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: j * 0.04 }}
                          className="flex items-start gap-2"
                        >
                          <span style={{ color }} className="text-xs mt-0.5 flex-shrink-0">→</span>
                          <span className="text-[#626865] text-[13px] hover:text-[#171A19] transition-colors leading-relaxed">{e}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Continues */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 pl-10 md:pl-0 md:text-center"
          >
            <div className="inline-flex items-center gap-2 label-mono text-[#626865]/50">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D97A57] animate-pulse" />
              CONTINUES AS I BUILD...
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
