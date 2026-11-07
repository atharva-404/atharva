import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, type Project } from "@/data/projects";
import { SubpageShell } from "@/components/layout/SubpageShell";
import { ProjectLinks, ProjectMedia, StatusPill, TechList } from "@/components/projects/ProjectParts";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/seo/site";
import { projectGraph } from "@/lib/seo/schema";

// Only the projects with a written case study get a page; anything else 404s.
export const dynamicParams = false;

const withCaseStudy = projects.filter((p): p is Project & { caseStudy: NonNullable<Project["caseStudy"]> } => Boolean(p.caseStudy));

export function generateStaticParams() {
  return withCaseStudy.map((p) => ({ slug: p.slug }));
}

function getProject(slug: string) {
  return withCaseStudy.find((p) => p.slug === slug);
}

function titleFor(p: (typeof withCaseStudy)[number]) {
  return `${p.name} — ${p.caseStudy.seoTitle} | Atharva Sonar`;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return pageMetadata({
    title: titleFor(p),
    description: p.caseStudy.seoDescription,
    path: `/projects/${p.slug}/`,
    type: "article",
    image: p.image ? { url: p.image.src, width: p.image.width, height: p.image.height, alt: p.image.alt } : undefined,
  });
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const cs = p.caseStudy;
  const path = `/projects/${p.slug}/`;
  const others = withCaseStudy.filter((o) => o.slug !== p.slug);

  return (
    <SubpageShell
      wide
      eyebrow={`Project · ${p.category}`}
      title={p.name}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Projects", path: "/projects/" },
        { name: p.name, path },
      ]}
    >
      <JsonLd data={projectGraph(p, titleFor(p), cs.seoDescription)} />

      <p className="text-xl text-fg">{p.tagline}</p>
      <p>{p.description}</p>

      <div className="flex flex-wrap items-center gap-4">
        <StatusPill status={p.status} />
        {p.hackathon ? <span className="font-mono text-xs text-faint">Built at {p.hackathon}</span> : null}
      </div>
      <ProjectLinks project={p} primary />

      <div className="pt-4">
        <ProjectMedia
          project={p}
          sizes="(min-width: 1024px) 960px, 100vw"
          className={p.image ? "w-full" : "aspect-[16/9] w-full"}
          eager
        />
      </div>

      <h2>What problem does {p.name} solve?</h2>
      <p>{cs.problem}</p>

      <h2>Key features</h2>
      <ul>
        {p.features.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>

      {cs.workflow ? (
        <>
          <h2>How {p.name} works</h2>
          <ol>
            {cs.workflow.map((step) => (
              <li key={step.title}>
                <strong>{step.title}.</strong> {step.detail}
              </li>
            ))}
          </ol>
        </>
      ) : null}

      <h2>Architecture</h2>
      <ul>
        {cs.architecture.map((a) => (
          <li key={a.layer}>
            <strong>{a.layer}:</strong> {a.detail}
          </li>
        ))}
      </ul>

      <h2>Tech stack</h2>
      <div className="[&_li]:mt-0 [&_ul]:list-none [&_ul]:pl-0">
        <TechList tech={p.tech} />
      </div>

      {cs.decisions ? (
        <>
          <h2>Engineering decisions</h2>
          <ul>
            {cs.decisions.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </>
      ) : null}

      <h2>Atharva&apos;s role</h2>
      <p>{p.contribution}</p>

      <h2>Current status</h2>
      <p>{cs.statusNote}</p>

      <h2>Sources</h2>
      <ul>
        {cs.sources.map((s) => (
          <li key={s.url}>
            <a href={s.url} target="_blank" rel="noopener noreferrer">
              {s.label}
            </a>
          </li>
        ))}
      </ul>
      <p className="font-mono text-xs text-faint">
        Page updated <time dateTime={cs.updated}>{cs.updated}</time> by Atharva Sonar.
      </p>

      <h2>More projects by Atharva Sonar</h2>
      <ul>
        {others.map((o) => (
          <li key={o.slug}>
            <a href={`/projects/${o.slug}/`}>{o.name}</a> — {o.tagline}
          </li>
        ))}
        <li>
          <a href="/projects/">All projects</a>
        </li>
      </ul>
    </SubpageShell>
  );
}
