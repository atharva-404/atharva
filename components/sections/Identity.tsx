"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SectionReveal } from "@/components/ui/SectionReveal";

const timeline = [
  { label: "Learn", desc: "Absorb fundamentals" },
  { label: "Experiment", desc: "Break things, explore" },
  { label: "Build", desc: "Create working systems" },
  { label: "Ship", desc: "Get it to real users" },
  { label: "Iterate", desc: "Improve on what's real" },
];

export function Identity() {
  return (
    <section id="identity" className="section-padding border-t border-[#E2E4E1] bg-[#FAFAF7]" aria-label="About Atharva">
      <div className="container-lg">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12 lg:gap-20 items-start">

          {/* Left */}
          <div>
            <SectionReveal>
              <p className="label-mono text-[#D97A57] mb-4">About</p>
              <h2 className="heading-section text-[clamp(2rem,5vw,3.5rem)] text-[#171A19] mb-6">
                More than a<br />
                <span className="text-[#D97A57]">developer.</span>
              </h2>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <div className="space-y-3 mb-6">
                <p className="text-[#626865] text-[15px] leading-[1.65]">
                  I&apos;m a computer science student, developer and student founder obsessed with turning ideas into real products.
                </p>
                <p className="text-[#626865] text-[15px] leading-[1.65]">
                  I work across backend systems, full-stack applications, AI-powered solutions and product development.
                </p>
                <p className="text-[#171A19] text-[15px] leading-[1.65] font-medium">
                  My favorite way to learn something is to{" "}
                  <span className="text-[#D97A57]">build</span> something with it.
                </p>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.15}>
              <div className="flex flex-wrap gap-2">
                {["Builder", "Founder", "Developer", "AI Enthusiast", "Product Thinker"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 border border-[#E2E4E1] rounded-md text-[11px] text-[#626865] hover:border-[#D97A57]/30 hover:text-[#171A19] transition-all font-[family-name:var(--font-mono)] cursor-none"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </SectionReveal>

            {/* Builder loop */}
            <SectionReveal delay={0.2}>
              <div className="mt-10">
                <p className="label-mono text-[#626865]/60 mb-4">
                  The Builder&apos;s Loop
                </p>
                <div className="flex items-center gap-0 flex-wrap">
                  {timeline.map((step, i) => (
                    <div key={step.label} className="flex items-center">
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.06 }}
                        whileHover={{ y: -2 }}
                        className="group text-center cursor-none"
                      >
                        <div className="px-3 py-1.5 border border-[#E2E4E1] rounded-lg group-hover:border-[#D97A57]/30 transition-colors">
                          <p className="font-medium text-[13px] text-[#171A19] group-hover:text-[#D97A57] transition-colors">{step.label}</p>
                          <p className="text-[9px] text-[#626865] mt-0.5 font-[family-name:var(--font-mono)]">{step.desc}</p>
                        </div>
                      </motion.div>
                      {i < timeline.length - 1 && (
                        <span className="text-[#E2E4E1] mx-1 text-xs">→</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>
          </div>

          {/* Right */}
          <SectionReveal delay={0.1} direction="left">
            <div className="flex flex-col items-center lg:items-end gap-5">
              {/* Portrait */}
              <div className="relative lg:hidden xl:flex">
                <div className="relative w-44 h-44 rounded-xl overflow-hidden border border-[#E2E4E1]">
                  <Image
                    src="/atharva sonar.jpeg"
                    alt="Atharva Sonar"
                    fill
                    className="object-cover object-top"
                    sizes="176px"
                  />
                </div>
              </div>

              {/* Education */}
              <div className="w-full border border-[#E2E4E1] rounded-xl p-4 bg-white">
                <p className="label-mono text-[#626865]/60 mb-3">Education</p>
                <div className="space-y-3">
                  <div>
                    <p className="text-[13px] font-semibold text-[#171A19]">B.Tech — CS / IT</p>
                    <p className="text-[11px] text-[#626865] mt-0.5">Bharat College of Engineering, Badlapur</p>
                    <span className="inline-block mt-1 text-[9px] px-2 py-0.5 border border-[#7FA06F]/20 text-[#7FA06F] rounded font-[family-name:var(--font-mono)]">
                      CURRENT
                    </span>
                  </div>
                  <div className="border-t border-[#E2E4E1] pt-3">
                    <p className="text-[13px] font-semibold text-[#171A19]">Diploma — Computer Engineering</p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="w-full grid grid-cols-2 gap-2.5">
                {[
                  { value: "7+", label: "Projects Built" },
                  { value: "3", label: "Hackathons" },
                ].map((stat) => (
                  <div key={stat.label} className="border border-[#E2E4E1] rounded-xl p-3 bg-white text-center">
                    <p className="text-xl font-bold text-[#D97A57] font-[family-name:var(--font-display)]">{stat.value}</p>
                    <p className="label-mono text-[#626865] mt-0.5" style={{ fontSize: '9px' }}>{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
