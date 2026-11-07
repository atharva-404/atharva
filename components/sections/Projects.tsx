import { ArrowUpRight, Check } from "lucide-react";
import { earlierProjects, featuredProjects, flagshipProject, type Project } from "@/data/projects";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectLinks, ProjectMedia, StatusPill, TechList } from "@/components/projects/ProjectParts";

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="section-y border-t border-line">
      <div className="container-site">
        <SectionHeader
          id="projects-title"
          index="02"
          label="Featured Projects"
          title={<>Things I&apos;ve <span className="text-accent">designed, engineered</span> and shipped.</>}
          intro="Products under Velquix and builds from hackathons — what each one does, what I built, and where you can see it."
        />

        <Flagship project={flagshipProject} />

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {featuredProjects.map((project, i) => (
            <Reveal key={project.slug} delay={(i % 2) * 0.08}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        <EarlierWork projects={earlierProjects} />
      </div>
    </section>
  );
}

function RoleNote({ contribution, className }: { contribution: string; className?: string }) {
  return (
    <p className={`border-l-2 border-accent/60 pl-4 text-sm leading-relaxed text-muted ${className ?? ""}`}>
      <span className="text-fg">My role — </span>
      {contribution}
    </p>
  );
}

function Flagship({ project }: { project: Project }) {
  return (
    <Reveal className="mt-16 sm:mt-20">
      <article
        aria-labelledby={`${project.slug}-title`}
        className="card-sweep surface group grid overflow-hidden lg:grid-cols-[1.12fr_1fr]"
      >
        <div className="p-3 sm:p-4 lg:p-5 lg:pt-8">
          <ProjectMedia project={project} sizes="(min-width: 1024px) 640px, 100vw" className="aspect-[1200/630] w-full" />
          <div className="hidden lg:mt-8 lg:block lg:px-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">Stack</p>
            <div className="mt-4">
              <TechList tech={project.tech} />
            </div>
            <RoleNote contribution={project.contribution} className="mt-8" />
          </div>
        </div>

        <div className="flex flex-col p-6 pt-4 sm:p-8 lg:p-10 lg:pl-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">Flagship · Velquix</span>
            <StatusPill status={project.status} />
          </div>

          <h3 id={`${project.slug}-title`} className="font-display-tight mt-6 text-[clamp(2.25rem,4.5vw,3.5rem)] font-semibold">
            {project.name}
          </h3>
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.14em] text-faint">{project.category}</p>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{project.description}</p>

          <ul className="mt-7 grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {project.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5 text-sm text-fg/90">
                <Check size={16} className="mt-0.5 shrink-0 text-lime" aria-hidden="true" />
                {feature}
              </li>
            ))}
          </ul>

          <div className="lg:hidden">
            <div className="mt-8">
              <TechList tech={project.tech} />
            </div>
            <RoleNote contribution={project.contribution} className="mt-6" />
          </div>

          <div className="mt-8 lg:mt-auto lg:pt-8">
            <ProjectLinks project={project} primary caseStudy />
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article aria-labelledby={`${project.slug}-title`} className="card-sweep surface group flex h-full flex-col overflow-hidden">
      <div className="p-3 sm:p-4">
        <ProjectMedia project={project} sizes="(min-width: 768px) 560px, 100vw" className="aspect-[16/10]" />
      </div>

      <div className="flex flex-1 flex-col p-6 pt-3 sm:p-7 sm:pt-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">{project.category}</p>
          <StatusPill status={project.status} />
        </div>

        <h3 id={`${project.slug}-title`} className="mt-4 font-display text-3xl font-semibold tracking-tight">
          {project.name}
        </h3>
        <p className="mt-1 text-fg/85">{project.tagline}</p>
        <p className="mt-4 text-[15px] leading-relaxed text-muted">{project.description}</p>

        <ul className="mt-5 space-y-2">
          {project.features.slice(0, 4).map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-sm text-fg/85">
              <Check size={15} className="mt-0.5 shrink-0 text-lime" aria-hidden="true" />
              {feature}
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <TechList tech={project.tech} max={6} />
        </div>

        <p className="mt-5 text-sm text-faint">
          {project.hackathon ? <span className="text-muted">Hackathon · </span> : null}
          {project.contribution}
        </p>

        <div className="mt-6 pt-1 md:mt-auto md:pt-6">
          <ProjectLinks project={project} caseStudy />
        </div>
      </div>
    </article>
  );
}

function EarlierWork({ projects }: { projects: Project[] }) {
  return (
    <Reveal className="mt-20">
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="eyebrow">Earlier work</p>
          <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-3xl">Where the flagship ideas started.</h3>
        </div>
      </div>

      <ul className="mt-8 divide-y divide-line border-y border-line">
        {projects.map((project) => (
          <li key={project.slug}>
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group grid gap-3 py-6 transition-colors hover:bg-white/[0.02] md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)_auto] md:items-center md:gap-8 md:px-4"
            >
              <div>
                <p className="font-display text-xl font-semibold">{project.name}</p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-faint">
                  {project.category}
                  {project.hackathon ? ` · ${project.hackathon}` : ""}
                </p>
              </div>
              <p className="text-sm leading-relaxed text-muted">{project.description}</p>
              <span className="inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors group-hover:text-fg">
                GitHub
                <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                <span className="sr-only">— {project.name} source (opens in a new tab)</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
