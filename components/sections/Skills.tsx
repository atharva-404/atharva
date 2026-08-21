"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { skills, techStack } from "@/data/skills";

type Category = "ALL" | "BUILDING" | "COMFORTABLE" | "EXPLORING";

const categoryConfig = {
  BUILDING: { color: "#D97A57", desc: "Where I spend most of my time" },
  COMFORTABLE: { color: "#7FA06F", desc: "Familiar and productive" },
  EXPLORING: { color: "#9588C7", desc: "Learning and experimenting" },
};

export function Skills() {
  const [filter, setFilter] = useState<Category>("ALL");
  const filtered = filter === "ALL" ? skills : skills.filter((s) => s.category === filter);

  return (
    <section id="skills" className="section-padding border-t border-[#E2E4E1] bg-[#FAFAF7]" aria-label="Skills and technologies">
      <div className="container-xl">
        <SectionReveal>
          <p className="label-mono text-[#D97A57] mb-3">SKILLS</p>
          <h2 className="heading-section text-[clamp(2rem,5vw,3.5rem)] text-[#171A19] mb-3">
            What I Work <span className="text-[#D97A57]">With</span>
          </h2>
          <p className="text-[#626865] text-[15px] mb-8 max-w-md">
            Honest categories. No fake percentages.
          </p>
        </SectionReveal>

        {/* Filter */}
        <SectionReveal delay={0.1}>
          <div className="flex flex-wrap gap-2 mb-8">
            {(["ALL", "BUILDING", "COMFORTABLE", "EXPLORING"] as Category[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3.5 py-2 rounded-lg text-[11px] tracking-[0.06em] font-semibold transition-all font-[family-name:var(--font-mono)] min-h-[44px] ${
                  filter === cat
                    ? cat === "ALL"
                      ? "bg-[#171A19] text-white"
                      : `text-white`
                    : "border border-[#E2E4E1] text-[#626865] hover:text-[#171A19]"
                }`}
                style={filter === cat && cat !== "ALL" ? { background: categoryConfig[cat].color } : undefined}
              >
                {cat}
              </button>
            ))}
          </div>
        </SectionReveal>

        {filter !== "ALL" && (
          <p className="text-[13px] text-[#626865] mb-5 font-[family-name:var(--font-mono)]">
            {categoryConfig[filter as keyof typeof categoryConfig]?.desc}
          </p>
        )}

        {/* Skills */}
        <div className="flex flex-wrap gap-2">
          {filtered.map((skill) => {
            const config = categoryConfig[skill.category];
            return (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="px-3 py-1.5 border rounded-lg text-[12px] font-[family-name:var(--font-mono)] font-medium transition-colors"
                style={{
                  borderColor: `${config.color}18`,
                  color: filter === "ALL" ? "#626865" : config.color,
                  background: `${config.color}04`,
                }}
              >
                {skill.name}
              </motion.div>
            );
          })}
        </div>

        {/* Legend */}
        <SectionReveal delay={0.3}>
          <div className="mt-10 flex flex-wrap gap-5">
            {Object.entries(categoryConfig).map(([cat, config]) => (
              <div key={cat} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: config.color }} />
                <span className="text-[10px] text-[#626865] font-[family-name:var(--font-mono)]">{cat}</span>
                <span className="text-[10px] text-[#626865]/50">— {config.desc}</span>
              </div>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
