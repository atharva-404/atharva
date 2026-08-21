"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { projects, type ProjectStatus } from "@/data/projects";

const statusColors: Record<ProjectStatus | string, string> = {
  BUILDING: "status-building",
  MVP: "status-mvp",
  EXPERIMENT: "status-experiment",
  PROTOTYPE: "status-prototype",
  COMPLETED: "status-completed",
  IDEA: "status-idea",
};

export function ProjectUniverse() {
  const [selected, setSelected] = useState<string | null>(null);
  const otherProjects = projects.filter((p) => p.id !== "fingrow");
  const selectedProject = otherProjects.find((p) => p.id === selected);

  return (
    <section id="projects" className="section-padding border-t border-[#E2E4E1] bg-[#F1F2EF]" aria-label="All projects">
      <div className="container-xl">
        <SectionReveal>
          <p className="label-mono text-[#D97A57] mb-3">PROJECT ARCHIVE</p>
          <h2 className="heading-section text-[clamp(2rem,5vw,3.5rem)] text-[#171A19] mb-3">
            Things I&apos;ve <span className="text-[#D97A57]">Built</span>
          </h2>
          <p className="text-[#626865] text-[15px] mb-10 max-w-md">
            A collection of experiments, products and prototypes. Click any project to dive deeper.
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {otherProjects.map((project, i) => (
            <motion.button
              key={project.id}
              onClick={() => setSelected(selected === project.id ? null : project.id)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -3 }}
              className={`text-left p-4 sm:p-5 rounded-xl transition-all group ${
                selected === project.id
                  ? "border border-[#D97A57]/30 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
                  : "bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
              }`}
              aria-expanded={selected === project.id}
              aria-label={`${project.name} — ${project.tagline}`}
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-[11px] text-[#D97A57] font-[family-name:var(--font-mono)] font-medium">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={`${statusColors[project.status]} text-[9px] px-2 py-0.5 border rounded-full font-[family-name:var(--font-mono)]`}>
                  {project.status}
                </span>
              </div>

              <h3 className="font-[family-name:var(--font-display)] font-bold text-lg text-[#171A19] mb-1 group-hover:text-[#D97A57] transition-colors">
                {project.name}
              </h3>
              <p className="text-[#626865] text-[13px] mb-3 leading-relaxed">{project.tagline}</p>

              <div className="flex flex-wrap gap-1">
                {project.tech.slice(0, 3).map((t) => (
                  <span key={t} className="text-[9px] px-1.5 py-0.5 border border-[#E2E4E1] rounded text-[#626865] font-[family-name:var(--font-mono)]">
                    {t}
                  </span>
                ))}
                {project.tech.length > 3 && (
                  <span className="text-[9px] text-[#626865] font-[family-name:var(--font-mono)]">+{project.tech.length - 3}</span>
                )}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Expanded detail */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              key={selectedProject.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35 }}
              className="mt-4 overflow-hidden"
            >
              <div className="rounded-xl p-4 sm:p-6 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <p className="label-mono text-[#626865]/50 mb-1.5">PROBLEM</p>
                    <p className="text-[#626865] text-[13px] mb-4 leading-relaxed">{selectedProject.problem}</p>
                    <p className="label-mono text-[#626865]/50 mb-1.5">WHAT I BUILT</p>
                    <p className="text-[#626865] text-[13px] mb-4 leading-relaxed">{selectedProject.whatIBuilt}</p>
                    <p className="label-mono text-[#626865]/50 mb-1.5">WHAT I LEARNED</p>
                    <p className="text-[#626865] text-[13px] leading-relaxed">{selectedProject.learned}</p>
                  </div>
                  <div>
                    <p className="label-mono text-[#626865]/50 mb-1.5">TECH STACK</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {selectedProject.tech.map((t) => (
                        <span key={t} className="text-[10px] px-2 py-0.5 border border-[#E2E4E1] rounded-full text-[#626865] font-[family-name:var(--font-mono)]">
                          {t}
                        </span>
                      ))}
                    </div>
                    <p className="label-mono text-[#626865]/50 mb-1.5">YEAR</p>
                    <p className="text-[#626865] text-[13px] mb-4">{selectedProject.year}</p>
                    {selectedProject.github && (
                      <a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[13px] text-[#D97A57] hover:underline font-[family-name:var(--font-mono)]"
                      >
                        View on GitHub →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
