import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Project, ProjectStatus } from "@/data/projects";
import { GitHubIcon } from "@/components/icons/BrandIcons";
import { cn } from "@/lib/cn";

const statusTone: Record<ProjectStatus, string> = {
  Live: "text-lime border-lime/30 bg-lime/[0.06]",
  "Live demo": "text-lime border-lime/30 bg-lime/[0.06]",
  "Private preview": "text-accent border-accent/30 bg-accent/[0.06]",
  "Hackathon build": "text-fg border-line-strong bg-white/[0.04]",
  Completed: "text-fg border-line-strong bg-white/[0.04]",
  "Earlier project": "text-muted border-line bg-white/[0.02]",
  Prototype: "text-muted border-line bg-white/[0.02]",
};

export function StatusPill({ status }: { status: ProjectStatus }) {
  const live = status === "Live" || status === "Live demo";
  return (
    <span className={cn("inline-flex items-center gap-2 rounded-full border px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.1em]", statusTone[status])}>
      {live ? <span className="h-1.5 w-1.5 rounded-full bg-lime" aria-hidden="true" /> : null}
      {status}
    </span>
  );
}

export function TechList({ tech, max }: { tech: string[]; max?: number }) {
  const shown = max ? tech.slice(0, max) : tech;
  const hidden = tech.length - shown.length;
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Technologies">
      {shown.map((t) => (
        <li key={t} className="chip">
          {t}
        </li>
      ))}
      {hidden > 0 ? (
        <li className="chip" title={tech.slice(shown.length).join(", ")}>
          +{hidden} more
        </li>
      ) : null}
    </ul>
  );
}

export function ProjectLinks({
  project,
  primary = false,
  caseStudy = false,
}: {
  project: Project;
  primary?: boolean;
  /** Also link to the project's page on this site (homepage cards). */
  caseStudy?: boolean;
}) {
  const { live, github } = project.links;
  const showCaseStudy = caseStudy && Boolean(project.caseStudy);
  if (!live && !github && !showCaseStudy) return null;
  return (
    <div className="flex flex-wrap gap-3">
      {live ? (
        <a
          href={live}
          target="_blank"
          rel="noopener noreferrer"
          className={cn("btn", primary ? "btn-primary" : "btn-secondary btn-sm")}
        >
          <span>{project.status === "Private preview" ? "View preview" : project.status === "Live demo" ? "Live demo" : "Visit site"}</span>
          <span className="btn-icon" data-motion="up-right" aria-hidden="true">
            <ArrowUpRight size={16} />
          </span>
          <span className="sr-only"> — {project.name} (opens in a new tab)</span>
        </a>
      ) : null}
      {github ? (
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className={cn("btn btn-secondary", !primary && "btn-sm")}
        >
          <GitHubIcon size={16} />
          <span>Source</span>
          <span className="sr-only"> code for {project.name} on GitHub (opens in a new tab)</span>
        </a>
      ) : null}
      {showCaseStudy ? (
        <a href={`/projects/${project.slug}/`} className={cn("btn btn-ghost", !primary && "btn-sm")}>
          <span>Case study</span>
          <span className="btn-icon" data-motion="right" aria-hidden="true">
            <ArrowRight size={16} />
          </span>
          <span className="sr-only">: how {project.name} works</span>
        </a>
      ) : null}
    </div>
  );
}

/** Screenshot when one exists; otherwise a schematic drawn from the real architecture. */
export function ProjectMedia({
  project,
  sizes,
  className,
  eager = false,
}: {
  project: Project;
  sizes: string;
  className?: string;
  /** Load immediately when the image is near the top of the page (project pages). */
  eager?: boolean;
}) {
  return (
    <div className={cn("relative overflow-hidden rounded-[18px] border border-line bg-bg-2", className)}>
      {project.image ? (
        <Image
          src={project.image.src}
          alt={project.image.alt}
          width={project.image.width}
          height={project.image.height}
          sizes={sizes}
          loading={eager ? "eager" : "lazy"}
          className="h-full w-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035]"
        />
      ) : project.schematic ? (
        <Schematic label={project.schematic.label} stages={project.schematic.stages} />
      ) : null}
    </div>
  );
}

function Schematic({ label, stages }: { label: string; stages: string[][] }) {
  return (
    <figure className="relative flex h-full w-full flex-col items-center justify-center gap-0 p-5 sm:p-8">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
      <figcaption className="absolute left-4 top-4 font-mono text-[10px] uppercase tracking-[0.16em] text-faint sm:left-5 sm:top-5">
        {label}
      </figcaption>
      {stages.map((stage, i) => (
        <div key={i} className="relative flex flex-col items-center">
          {i > 0 ? (
            <svg width="2" height="22" className="text-accent" aria-hidden="true">
              <line x1="1" y1="0" x2="1" y2="22" stroke="currentColor" strokeWidth="1.5" className="dash-flow" />
            </svg>
          ) : null}
          <ul className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
            {stage.map((node) => (
              <li
                key={node}
                className="rounded-lg border border-line-strong bg-card px-2.5 py-1.5 font-mono text-[10.5px] text-fg transition-colors duration-500 group-hover:border-accent/40 sm:px-3 sm:text-xs"
              >
                {node}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </figure>
  );
}
