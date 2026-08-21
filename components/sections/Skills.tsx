"use client";

import { motion } from "framer-motion";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { skills } from "@/data/skills";

const categories = [
  {
    key: "BUILDING" as const,
    label: "Building",
    desc: "Where I spend most of my time",
    color: "#D97A57",
    icon: "▲",
  },
  {
    key: "COMFORTABLE" as const,
    label: "Comfortable",
    desc: "Familiar and productive",
    color: "#7FA06F",
    icon: "●",
  },
  {
    key: "EXPLORING" as const,
    label: "Exploring",
    desc: "Learning and experimenting",
    color: "#9588C7",
    icon: "◆",
  },
];

export function Skills() {
  return (
    <section id="skills" className="section-padding border-t border-[#E2E4E1] bg-[#FAFAF7]" aria-label="Skills and technologies">
      <div className="container-xl">
        <SectionReveal>
          <p className="label-mono text-[#D97A57] mb-3">STACK</p>
          <h2 className="heading-section text-[clamp(2rem,5vw,3.5rem)] text-[#171A19] mb-2">
            What I Work <span className="text-[#D97A57]">With</span>
          </h2>
          <p className="text-[#626865] text-[15px] mb-10 sm:mb-12 max-w-md">
            Honest categories. No fake percentages. Just what I actually use.
          </p>
        </SectionReveal>

        {/* Category cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {categories.map((cat, catIdx) => {
            const catSkills = skills.filter((s) => s.category === cat.key);
            return (
              <SectionReveal key={cat.key} delay={catIdx * 0.1}>
                <div className="rounded-xl p-5 sm:p-6 bg-white shadow-[0_1px_4px_rgba(0,0,0,0.05)] h-full group hover:shadow-[0_3px_10px_rgba(0,0,0,0.07)] transition-all"
                  style={{ borderTop: `2px solid ${cat.color}` }}
                >
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
                      style={{ background: `${cat.color}10`, color: cat.color }}
                    >
                      {cat.icon}
                    </div>
                    <div>
                      <h3 className="font-[family-name:var(--font-display)] font-bold text-[16px] text-[#171A19]">
                        {cat.label}
                      </h3>
                      <p className="text-[11px] text-[#626865] font-[family-name:var(--font-mono)]">
                        {cat.desc}
                      </p>
                    </div>
                  </div>

                  {/* Skill count */}
                  <div className="mb-4 pb-4 border-b border-[#E2E4E1]">
                    <span className="text-2xl font-bold font-[family-name:var(--font-display)]" style={{ color: cat.color }}>
                      {catSkills.length}
                    </span>
                    <span className="text-[11px] text-[#626865] ml-1.5 font-[family-name:var(--font-mono)]">
                      technologies
                    </span>
                  </div>

                  {/* Skills list */}
                  <div className="space-y-2">
                    {catSkills.map((skill, i) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: catIdx * 0.08 + i * 0.03 }}
                        className="flex items-center gap-2.5 group/item"
                      >
                        <span
                          className="w-1 h-1 rounded-full flex-shrink-0"
                          style={{ background: cat.color }}
                        />
                        <span className="text-[13px] text-[#626865] group-hover/item:text-[#171A19] transition-colors">
                          {skill.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </SectionReveal>
            );
          })}
        </div>

        {/* Bottom summary */}
        <SectionReveal delay={0.4}>
          <div className="mt-10 sm:mt-12 pt-8 border-t border-[#E2E4E1]">
            <p className="label-mono text-[#626865]/60 mb-4">CORE STACK</p>
            <div className="flex flex-wrap gap-2">
              {["Python", "Django", "React", "PostgreSQL", "REST APIs", "AI / RAG", "Git", "Tailwind CSS"].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 border border-[#E2E4E1] rounded-lg text-[12px] font-[family-name:var(--font-mono)] text-[#171A19] font-medium bg-white"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
