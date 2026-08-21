"use client";

import { motion } from "framer-motion";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { hackathons } from "@/data/hackathons";

export function Hackathons() {
  // Filter out hackathons with placeholder content
  const validHackathons = hackathons.filter(
    (h) => !h.project.includes("[ADD") && !h.projectDescription.includes("[ADD")
  );

  return (
    <section id="hackathons" className="section-padding border-t border-[#E2E4E1] bg-[#F1F2EF]" aria-label="Hackathons">
      <div className="container-xl">
        <SectionReveal>
          <p className="label-mono text-[#D97A57] mb-3">HACKATHONS</p>
          <h2 className="heading-section text-[clamp(2rem,5vw,3.5rem)] text-[#171A19] mb-3">
            Built Under <span className="text-[#D97A57]">Pressure</span>
          </h2>
          <p className="text-[#626865] text-[15px] mb-3 max-w-md">
            Some of the best ideas come with a deadline.
          </p>
          <div className="inline-flex items-center gap-2 mb-10 label-mono text-[#626865]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D97A57]" />
            Competing as <span className="text-[#D97A57]">Deploy House</span>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {validHackathons.map((hack, i) => (
            <motion.div
              key={hack.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="border border-[#E2E4E1] rounded-xl p-5 bg-white group cursor-none"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  {hack.date && !hack.date.includes("[ADD") && (
                    <p className="label-mono text-[#626865]/50 mb-1">{hack.date}</p>
                  )}
                  <h3 className="font-[family-name:var(--font-display)] font-bold text-[16px] text-[#171A19]">{hack.event}</h3>
                  {hack.organizer && (
                    <p className="text-[11px] text-[#626865] mt-0.5">{hack.organizer}</p>
                  )}
                </div>
                <div className="label-mono text-[#D97A57]">
                  {String(i + 1).padStart(2, "0")}
                </div>
              </div>

              {/* Project */}
              <div className="mb-3">
                <p className="label-mono text-[#626865]/50 mb-1">PROJECT</p>
                <p className="font-medium text-[14px] text-[#171A19]">{hack.project}</p>
                <p className="text-[13px] text-[#626865] mt-0.5 leading-relaxed">{hack.projectDescription}</p>
              </div>

              {/* Role */}
              {hack.myRole && !hack.myRole.includes("[ADD") && (
                <div className="mb-3">
                  <p className="label-mono text-[#626865]/50 mb-1">MY ROLE</p>
                  <p className="text-[13px] text-[#626865]">{hack.myRole}</p>
                </div>
              )}

              {/* Tech */}
              {hack.tech.length > 0 && !hack.tech[0].includes("[ADD") && (
                <div className="mb-3">
                  <div className="flex flex-wrap gap-1">
                    {hack.tech.map((t) => (
                      <span key={t} className="text-[9px] px-1.5 py-0.5 border border-[#E2E4E1] rounded text-[#626865] font-[family-name:var(--font-mono)]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Learned */}
              {hack.learned && !hack.learned.includes("[ADD") && (
                <div className="pt-3 border-t border-[#E2E4E1]">
                  <p className="label-mono text-[#626865]/50 mb-1">WHAT I LEARNED</p>
                  <p className="text-[12px] text-[#626865] leading-relaxed">{hack.learned}</p>
                </div>
              )}

              {/* Result + GitHub */}
              {(hack.result && !hack.result.includes("[ADD")) || hack.github ? (
                <div className="mt-2 flex items-center justify-between">
                  {hack.result && !hack.result.includes("[ADD") && (
                    <p className="label-mono text-[#D97A57]">{hack.result}</p>
                  )}
                  {hack.github && (
                    <a
                      href={hack.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-[#626865] hover:text-[#D97A57] transition-colors cursor-none font-[family-name:var(--font-mono)]"
                    >
                      GitHub →
                    </a>
                  )}
                </div>
              ) : null}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
