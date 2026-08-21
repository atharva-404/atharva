"use client";

import { motion } from "framer-motion";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { WhatIf } from "@/components/ui/WhatIf";
import { social } from "@/data/social";

export function Contact() {
  return (
    <section id="contact" className="section-padding border-t border-[#2a2f2e] relative overflow-hidden bg-[#171A19]" aria-label="Contact section">
      <div className="container-lg text-center relative z-10">
        <SectionReveal>
          <p className="label-mono text-[#D97A57] mb-4">GET IN TOUCH</p>
          <h2 className="heading-display text-[clamp(2rem,7vw,5rem)] text-white mb-4">
            Have an <span className="text-[#D97A57]">Idea?</span>
          </h2>
          <p className="text-base sm:text-lg text-[#626865] mb-8 sm:mb-10 max-w-md mx-auto">
            Let&apos;s turn it into something real.
          </p>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 mb-10 sm:mb-12 max-w-lg mx-auto sm:max-w-none">
            <motion.a
              href={`mailto:${social.email}`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto px-6 py-3.5 sm:py-3 bg-[#D97A57] text-white font-semibold text-[14px] sm:text-[13px] tracking-wide rounded-xl sm:rounded-[10px] hover:bg-[#c46c4b] transition-colors glow-orange text-center min-h-[48px] flex items-center justify-center"
              id="contact-email-btn"
            >
              Email Me
            </motion.a>
            <motion.a
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto px-6 py-3.5 sm:py-3 border border-[#3a3f3e] text-white font-medium text-[14px] sm:text-[13px] tracking-wide rounded-xl sm:rounded-[10px] hover:border-[#D97A57] hover:text-[#D97A57] transition-all text-center min-h-[48px] flex items-center justify-center"
              id="contact-linkedin-btn"
            >
              LinkedIn
            </motion.a>
            <motion.a
              href={social.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto px-6 py-3.5 sm:py-3 border border-[#3a3f3e] text-white font-medium text-[14px] sm:text-[13px] tracking-wide rounded-xl sm:rounded-[10px] hover:border-[#D97A57] hover:text-[#D97A57] transition-all text-center min-h-[48px] flex items-center justify-center"
              id="contact-github-btn"
            >
              GitHub
            </motion.a>
            <motion.a
              href={social.resume}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto px-6 py-3.5 sm:py-3 border border-[#7FA06F]/30 text-[#7FA06F] font-medium text-[14px] sm:text-[13px] tracking-wide rounded-xl sm:rounded-[10px] hover:bg-[#7FA06F]/10 transition-all text-center min-h-[48px] flex items-center justify-center"
              id="contact-resume-btn"
            >
              Download Resume
            </motion.a>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <WhatIf />
        </SectionReveal>

        <SectionReveal delay={0.3}>
          <div className="mt-10 sm:mt-14 pt-8 sm:pt-10 border-t border-[#2a2f2e]">
            <p className="text-lg sm:text-xl text-[#626865] font-medium mb-2">Still scrolling?</p>
            <p className="text-[clamp(1.3rem,4vw,2.8rem)] font-[family-name:var(--font-display)] font-bold text-white leading-tight">
              Let&apos;s build something{" "}
              <span className="text-[#D97A57]">worth scrolling for.</span>
            </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
