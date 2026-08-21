"use client";

import { motion } from "framer-motion";
import { SectionReveal } from "@/components/ui/SectionReveal";

const journey = [
  { step: "Student", color: "#626865" },
  { step: "Developer", color: "#D97A57" },
  { step: "Builder", color: "#F1C47A" },
  { step: "Founder", color: "#7FA06F" },
];

const labItems = [
  { label: "FinGrow", desc: "AI Financial Intelligence Platform", status: "BUILDING", color: "#D97A57" },
  { label: "Velquix", desc: "Product studio — Ideas → Products → Experiments", status: "BUILDING", color: "#7FA06F" },
  { label: "Datify", desc: "AI-powered compatibility concept", status: "PROTOTYPE", color: "#9588C7" },
  { label: "Drivons", desc: "Urban mobility rental concept", status: "IDEA", color: "#626865" },
];

export function FounderSection() {
  return (
    <section id="founder" className="section-padding border-t border-[#E2E4E1] bg-[#FAFAF7]" aria-label="Founder journey">
      <div className="container-xl">
        <SectionReveal>
          <p className="label-mono text-[#D97A57] mb-3">THE STUDENT FOUNDER</p>
          <h2 className="heading-section text-[clamp(2rem,5vw,3.5rem)] text-[#171A19] leading-[1.05] mb-5">
            I don&apos;t want to only<br />
            <span className="text-[#626865]">write software.</span><br />
            <span className="text-[#D97A57]">I want to build products.</span>
          </h2>
        </SectionReveal>

        {/* Journey progression */}
        <SectionReveal delay={0.1}>
          <div className="flex flex-wrap items-center gap-2 mb-12">
            {journey.map((step, i) => (
              <div key={step.step} className="flex items-center gap-2">
                <span className="text-[13px] font-semibold" style={{ color: step.color }}>{step.step}</span>
                {i < journey.length - 1 && (
                  <span className="text-[#E2E4E1] text-sm">→</span>
                )}
              </div>
            ))}
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Velquix */}
          <SectionReveal>
            <div className="border border-[#E2E4E1] rounded-xl p-6 bg-white">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-lg bg-[#D97A57]/8 flex items-center justify-center text-[#D97A57] text-sm font-bold font-[family-name:var(--font-display)]">
                  V
                </div>
                <div>
                  <p className="font-semibold text-[14px] text-[#171A19]">Velquix</p>
                  <p className="label-mono text-[#626865]">Product Studio</p>
                </div>
              </div>
              <p className="text-[#626865] text-[14px] leading-[1.65] mb-4">
                Velquix is the umbrella under which I&apos;m building products, running experiments, and developing my journey as a student founder.
              </p>
              <p className="text-[#171A19] font-medium text-[14px]">
                Ideas → Products → Experiments → Systems
              </p>

              <div className="mt-5 pt-5 border-t border-[#E2E4E1]">
                <p className="label-mono text-[#626865]/50 mb-2">FOCUS AREAS</p>
                <div className="flex flex-wrap gap-1.5">
                  {["Fintech", "AI Products", "SaaS", "Developer Tools"].map((area) => (
                    <span key={area} className="text-[10px] px-2 py-0.5 border border-[#D97A57]/15 text-[#D97A57] rounded font-[family-name:var(--font-mono)]">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </SectionReveal>

          {/* What I do */}
          <SectionReveal delay={0.1} direction="left">
            <p className="label-mono text-[#626865]/50 mb-4">WHAT A STUDENT FOUNDER ACTUALLY DOES</p>
            <div className="space-y-3">
              {[
                "Startup experiments & product ideas",
                "Fintech research & domain learning",
                "Customer research & problem discovery",
                "MVP development & iteration",
                "Branding & product design",
                "Technical architecture decisions",
                "Business model experimentation",
              ].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-center gap-3 group"
                >
                  <span className="text-[#D97A57] text-xs">→</span>
                  <span className="text-[#626865] text-[14px] group-hover:text-[#171A19] transition-colors">{item}</span>
                </motion.div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}

export function StartupLab() {
  return (
    <section id="lab" className="section-padding border-t border-[#E2E4E1] bg-[#FAFAF7]" aria-label="Startup Lab">
      <div className="container-xl">
        <SectionReveal>
          <p className="label-mono text-[#7FA06F] mb-3">STARTUP LAB</p>
          <h2 className="heading-section text-[clamp(2rem,5vw,3.5rem)] text-[#171A19] mb-3">
            Where <span className="text-[#7FA06F]">Ideas</span> Live
          </h2>
          <p className="text-[#626865] text-[15px] mb-10 max-w-md">
            Experiments, prototypes, and new directions. Part of who I am as a builder.
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {labItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="p-4 sm:p-5 border border-[#E2E4E1] rounded-xl bg-white hover:border-[#E2E4E1] transition-all group"
            >
              <div className="flex justify-between items-start mb-3">
                <span className="text-[15px] font-bold font-[family-name:var(--font-display)]" style={{ color: item.color }}>
                  {item.label}
                </span>
                <span className={`text-[9px] px-2 py-0.5 border rounded-full font-[family-name:var(--font-mono)] status-${item.status.toLowerCase()}`}>
                  {item.status}
                </span>
              </div>
              <p className="text-[13px] text-[#626865] group-hover:text-[#171A19] transition-colors">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
