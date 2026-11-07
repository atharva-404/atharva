import { ArrowRight } from "lucide-react";
import { builderLoop, education, principles, profile } from "@/data/profile";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

const story = [
  "It started with a Diploma in Computer Engineering — C++, data structures, and small apps I built just to see if I could. Today I'm pursuing a B.E. in Computer Science & Information Technology at the University of Mumbai.",
  "Somewhere along the way I stopped writing features and started building systems: Django and React applications, real-time WebSockets, and then AI — retrieval pipelines, ML risk scoring and multi-agent workflows.",
  "Now I think in products. Through Velquix I take ideas from a problem statement to a launched product, and I care about the interface as much as the architecture behind it.",
];

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section-y relative border-t border-line">
      <div className="container-site">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionHeader id="about-title" index="01" label="About" title={<>More Than Just <span className="text-accent">Writing Code.</span></>} />

            <Reveal delay={0.1} className="mt-10">
              <p className="eyebrow">Engineering interests</p>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Engineering interests">
                {profile.interests.map((interest) => (
                  <li key={interest} className="chip">
                    {interest}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="space-y-6 text-lg leading-relaxed text-muted lg:col-span-7 lg:pt-16">
            {story.map((paragraph, i) => (
              <Reveal key={i} delay={0.05 * i}>
                <p className={i === 2 ? "text-fg" : undefined}>{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-6 lg:mt-20 lg:grid-cols-12">
          {/* Education */}
          <Reveal className="surface p-6 sm:p-8 lg:col-span-5">
            <p className="eyebrow">Education</p>
            <ol className="relative mt-8 space-y-8 before:absolute before:bottom-2 before:left-[5px] before:top-2 before:w-px before:bg-line-strong">
              {education.map((item) => (
                <li key={item.degree} className="relative pl-8">
                  <span
                    className={`absolute left-0 top-1.5 h-[11px] w-[11px] rounded-full border-2 ${item.current ? "border-lime bg-lime/20" : "border-white/40 bg-bg"}`}
                    aria-hidden="true"
                  />
                  <p className="font-mono text-xs uppercase tracking-[0.12em] text-faint">
                    {item.period}
                    {item.current ? <span className="ml-3 rounded-full bg-lime/10 px-2 py-0.5 text-lime">Current</span> : null}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-semibold leading-snug">{item.degree}</h3>
                  <p className="mt-1 text-sm text-muted">{item.institution}</p>
                  <p className="mt-3 text-sm leading-relaxed text-faint">{item.note}</p>
                </li>
              ))}
            </ol>
          </Reveal>

          {/* Builder's loop + principles */}
          <Reveal delay={0.1} className="surface flex flex-col p-6 sm:p-8 lg:col-span-7">
            <p className="eyebrow">The builder&apos;s loop</p>
            <ol className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-3" aria-label="Learn, Experiment, Build, Ship, Iterate">
              {builderLoop.map((step, i) => (
                <li key={step} className="flex items-center gap-2">
                  <span className="rounded-full border border-line-strong px-4 py-2 font-display text-[15px] font-medium sm:text-base">
                    <span className="mr-2 font-mono text-[11px] text-accent">0{i + 1}</span>
                    {step}
                  </span>
                  {i < builderLoop.length - 1 ? <ArrowRight size={14} className="text-faint" aria-hidden="true" /> : null}
                </li>
              ))}
            </ol>

            <div className="mt-10 grid flex-1 gap-6 border-t border-line pt-8 sm:grid-cols-3">
              {principles.map((principle) => (
                <div key={principle.title}>
                  <h3 className="font-display text-lg font-semibold">{principle.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{principle.description}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
