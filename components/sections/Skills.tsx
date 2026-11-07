import { skillGroups } from "@/data/skills";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { TechIcon, techIconStyle } from "@/components/icons/TechIcon";

/** Server component: icon paths are rendered to HTML, so none of the icon data ships as JS. */
export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="section-y border-t border-line bg-bg-2">
      <div className="container-site">
        <SectionHeader
          id="skills-title"
          index="03"
          label="Skills & Technologies"
          title={<>The stack behind <span className="text-accent">the products.</span></>}
          intro="Grouped by what I use them for. No percentage bars — the projects above are the evidence."
        />

        <div className="mt-14 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => (
            <div key={group.id} className="bg-bg">
              <Reveal delay={(i % 3) * 0.06} className="h-full p-6 sm:p-7">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-lg font-semibold">{group.title}</h3>
                  <span className="font-mono text-[11px] text-faint">0{i + 1}</span>
                </div>
                <p className="mt-1 text-sm text-faint">{group.blurb}</p>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <li
                      key={skill.name}
                      style={techIconStyle(skill.icon)}
                      className="group/skill inline-flex items-center gap-2 rounded-xl border border-line bg-white/[0.02] px-3 py-2 text-sm text-muted transition-[color,border-color,transform,background-color] duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:bg-white/[0.05] hover:text-fg"
                    >
                      <TechIcon icon={skill.icon} size={16} className="text-faint transition-colors duration-300 group-hover/skill:text-[var(--brand)]" />
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
