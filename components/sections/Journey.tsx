import { ArrowUpRight } from "lucide-react";
import { hackathons, hackathonTeam, journey, type JourneyStep } from "@/data/journey";
import { projects } from "@/data/projects";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { ScrollLine } from "@/components/journey/ScrollLine";
import { cn } from "@/lib/cn";

const dotTone: Record<JourneyStep["kind"], string> = {
  education: "border-white/60 bg-bg",
  building: "border-accent bg-accent/20",
  founding: "border-lime bg-lime/25",
};

const kindLabel: Record<JourneyStep["kind"], string> = {
  education: "Education",
  building: "Building",
  founding: "Founding",
};

export function Journey() {
  return (
    <section id="journey" aria-labelledby="journey-title" className="section-y border-t border-line">
      <div className="container-site">
        <SectionHeader
          id="journey-title"
          index="04"
          label="Experience & Achievements"
          title={<>From first lines of code to <span className="text-accent">founding Velquix.</span></>}
        />

        <div className="mt-16 grid gap-16 lg:grid-cols-12 lg:gap-12">
          <ol className="relative lg:col-span-7">
            <ScrollLine className="absolute bottom-3 left-[7px] top-3 w-px" />
            {journey.map((step, i) => (
              <li key={step.title} className="relative pb-12 pl-10 last:pb-0 sm:pl-12">
                <span className={cn("absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2", dotTone[step.kind])} aria-hidden="true" />
                <Reveal delay={0.04 * i}>
                  <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs uppercase tracking-[0.12em] text-faint">
                    <span className="text-fg">{step.period}</span>
                    <span aria-hidden="true">/</span>
                    <span>{kindLabel[step.kind]}</span>
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight">{step.title}</h3>
                  <p className="mt-2 max-w-xl leading-relaxed text-muted">{step.description}</p>
                </Reveal>
              </li>
            ))}
          </ol>

          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="surface p-6 sm:p-8 lg:sticky lg:top-24">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="eyebrow">Hackathons</p>
                  <p className="mt-3 text-sm text-muted">
                    Competing as team <span className="text-fg">{hackathonTeam}</span>
                  </p>
                </div>
                <p className="font-display text-6xl font-semibold leading-none text-accent" aria-label={`${hackathons.length} hackathons`}>
                  {hackathons.length}
                </p>
              </div>

              <ul className="mt-8 divide-y divide-line border-t border-line">
                {hackathons.map((h) => {
                  const project = projects.find((p) => p.slug === h.projectSlug);
                  const href = project?.links.github ?? project?.links.live;
                  return (
                    <li key={h.event} className="py-5">
                      <p className="font-display text-lg font-semibold leading-snug">{h.event}</p>
                      <p className="mt-1 text-sm text-muted">{h.summary}</p>
                      {href ? (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 inline-flex min-h-[40px] items-center gap-1.5 font-mono text-xs text-accent transition-colors hover:text-accent-soft"
                        >
                          Built: {h.project}
                          <ArrowUpRight size={14} aria-hidden="true" />
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                      ) : (
                        <p className="mt-3 font-mono text-xs text-accent">Built: {h.project}</p>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
