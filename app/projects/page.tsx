import { earlierProjects, featuredProjects, flagshipProject, projects } from "@/data/projects";
import { SubpageShell } from "@/components/layout/SubpageShell";
import { StatusPill } from "@/components/projects/ProjectParts";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/seo/site";
import { projectsIndexGraph } from "@/lib/seo/schema";

const title = "Projects by Atharva Sonar — AI, Full-Stack & Fintech";
const description =
  "Software built by Atharva Sonar: SpendDecode, Velquix Learn, ClaimBlitz, SafeHer AI, FitHub Gym and earlier AI and fintech projects, with live links and source.";

export const metadata = pageMetadata({ title, description, path: "/projects/" });

const main = [flagshipProject, ...featuredProjects];

export default function ProjectsPage() {
  return (
    <SubpageShell
      eyebrow="Projects"
      title={<>Products and builds <span className="text-accent">by Atharva Sonar.</span></>}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Projects", path: "/projects/" },
      ]}
    >
      <JsonLd data={projectsIndexGraph(title, description, projects)} />

      <p>
        These are the products and systems I&apos;ve designed and built: Velquix products, hackathon builds with team Deploy
        House, and earlier projects. Each case study explains the problem, how the system works, its architecture and its
        current status.
      </p>

      <h2>Featured projects</h2>
      {main.map((p) => (
        <section key={p.slug} aria-labelledby={`${p.slug}-heading`}>
          <h3 id={`${p.slug}-heading`}>
            <a href={`/projects/${p.slug}/`}>{p.name}</a>
          </h3>
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.12em] text-faint">
            {p.category}
            {p.hackathon ? ` · ${p.hackathon}` : ""}
          </p>
          <p className="mt-3">{p.description}</p>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
            <StatusPill status={p.status} />
            <a href={`/projects/${p.slug}/`}>Read the {p.name} case study</a>
          </div>
        </section>
      ))}

      <h2>Earlier work</h2>
      <ul>
        {earlierProjects.map((p) => (
          <li key={p.slug}>
            <strong>{p.name}</strong>
            {p.hackathon ? ` (${p.hackathon})` : ""} — {p.description}{" "}
            {p.links.github ? (
              <a href={p.links.github} target="_blank" rel="noopener noreferrer">
                Source on GitHub
              </a>
            ) : null}
          </li>
        ))}
      </ul>
    </SubpageShell>
  );
}
