"use client";

import { motion } from "framer-motion";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { currentlyLearning } from "@/data/experience";
import { philosophy } from "@/data/education";

type LearningStatus = "EXPLORING" | "BUILDING" | "APPLYING" | "MASTERING";

const learningConfig: Record<LearningStatus, { color: string; width: string }> = {
  EXPLORING: { color: "#9588C7", width: "25%" },
  BUILDING: { color: "#D97A57", width: "60%" },
  APPLYING: { color: "#7FA06F", width: "80%" },
  MASTERING: { color: "#171A19", width: "95%" },
};

export function Learning() {
  return (
    <section id="learning" className="section-padding border-t border-[#E2E4E1] bg-[#FAFAF7]" aria-label="Currently learning">
      <div className="container-lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          <div>
            <SectionReveal>
              <p className="label-mono text-[#D97A57] mb-3">GROWTH</p>
              <h2 className="heading-section text-[clamp(2rem,4vw,3rem)] text-[#171A19] mb-6">
                Currently <span className="text-[#D97A57]">Learning</span>
              </h2>
            </SectionReveal>

            <div className="space-y-4">
              {currentlyLearning.map((item, i) => {
                const cfg = learningConfig[item.status as LearningStatus];
                return (
                  <motion.div
                    key={item.topic}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[13px] text-[#171A19] font-medium">{item.topic}</span>
                      <span
                        className="text-[9px] px-2 py-0.5 border rounded-full font-[family-name:var(--font-mono)]"
                        style={{ color: cfg.color, borderColor: `${cfg.color}20`, background: `${cfg.color}05` }}
                      >
                        {item.status}
                      </span>
                    </div>
                    <div className="h-1 bg-[#F1F2EF] rounded-full overflow-hidden border border-[#E2E4E1]">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: cfg.width }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: i * 0.06, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ background: cfg.color }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <SectionReveal delay={0.4}>
              <div className="mt-6 flex flex-wrap gap-3">
                {(["EXPLORING", "BUILDING", "APPLYING", "MASTERING"] as LearningStatus[]).map((status) => {
                  const cfg = learningConfig[status];
                  return (
                    <div key={status} className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: cfg.color }} />
                      <span className="text-[9px] text-[#626865] font-[family-name:var(--font-mono)]">{status}</span>
                    </div>
                  );
                })}
              </div>
            </SectionReveal>
          </div>

          {/* Philosophy */}
          <div>
            <SectionReveal delay={0.1} direction="left">
              <p className="label-mono text-[#D97A57] mb-3">ENGINEERING PHILOSOPHY</p>
              <h2 className="heading-section text-[clamp(2rem,4vw,3rem)] text-[#171A19] mb-6">
                Build. Break.<br />Understand. <span className="text-[#D97A57]">Rebuild.</span>
              </h2>
            </SectionReveal>

            <div className="space-y-5">
              {philosophy.map((p, i) => (
                <motion.div
                  key={p.number}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex gap-4 group"
                >
                  <span className="text-[11px] text-[#D97A57] font-[family-name:var(--font-mono)] mt-0.5 flex-shrink-0 w-6">{p.number}</span>
                  <div>
                    <p className="font-semibold text-[14px] text-[#171A19] mb-0.5 group-hover:text-[#D97A57] transition-colors">
                      {p.title}
                    </p>
                    <p className="text-[13px] text-[#626865] leading-relaxed">{p.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
