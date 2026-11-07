import { education, profile } from "@/data/profile";
import { hackathons, hackathonTeam } from "@/data/journey";
import { velquix } from "@/data/velquix";
import { SubpageShell } from "@/components/layout/SubpageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/seo/site";
import { aboutGraph } from "@/lib/seo/schema";

const title = "About Atharva Sonar — AI Engineer & Founder of Velquix";
const description =
  "About Atharva Sonar: AI Engineer and Full-Stack Developer in Mumbai, studying B.E. CSIT at the University of Mumbai and building SpendDecode and Velquix Learn.";

export const metadata = pageMetadata({ title, description, path: "/about/", type: "profile" });

export default function AboutPage() {
  return (
    <SubpageShell
      eyebrow="About"
      title={<>AI Engineer, developer <span className="text-accent">&amp; founder.</span></>}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "About", path: "/about/" },
      ]}
    >
      <JsonLd data={aboutGraph(title, description)} />

      <p>
        I&apos;m <strong>{profile.name}</strong> — an AI Engineer, Full-Stack Developer and Founder from{" "}
        <strong>{profile.location}</strong>. I build intelligent applications, scalable software systems, and products
        that solve real problems. The best way I know to learn something is to build something real with it.
      </p>

      <h2>Education</h2>
      <ul>
        {education.map((e) => (
          <li key={e.degree}>
            <strong>{e.degree}</strong> — {e.institution}, {e.period}
            {e.current ? " (current)" : ""}
          </li>
        ))}
      </ul>

      <h2>What I build</h2>
      <p>
        My flagship is <a href="/projects/spenddecode/">SpendDecode</a>, an AI-powered personal finance platform, alongside{" "}
        <a href="/projects/velquix-learn/">Velquix Learn</a>, a developer learning platform. Both are live products under
        Velquix. I&apos;ve also built <a href="/projects/claimblitz/">ClaimBlitz</a> (a nine-agent insurance claim
        processor), <a href="/projects/safeher-ai/">SafeHer AI</a> (personal safety monitoring with ML risk scoring) and{" "}
        <a href="/projects/fithub-gym/">FitHub Gym</a> (gym management with an OpenCV rep counter). See{" "}
        <a href="/projects/">all projects</a>.
      </p>
      <p>
        I work mostly with Python, Django, React and REST APIs, and integrate AI with LLMs, RAG pipelines, LangChain and agents.
      </p>

      <h2>Velquix</h2>
      <p>
        {velquix.description} Visit <a href={velquix.url} target="_blank" rel="noopener noreferrer">velquix.dev</a>.
      </p>

      <h2>Hackathons</h2>
      <p>
        With team {hackathonTeam} I&apos;ve built at {hackathons.length} hackathons:{" "}
        {hackathons.map((h) => `${h.event} (${h.project})`).join(", ")}.
      </p>

      <h2>What I&apos;m looking for</h2>
      <p>
        I&apos;m open to internships, freelance projects and collaborating on ambitious ideas — especially at the intersection of
        AI, fintech and product.
      </p>

      <h2>Contact</h2>
      <p>
        Email <a href={`mailto:${profile.email}`}>{profile.email}</a>, or find me on{" "}
        <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>,{" "}
        <a href={profile.links.github} target="_blank" rel="noopener noreferrer">GitHub</a> and{" "}
        <a href={profile.links.x} target="_blank" rel="noopener noreferrer">X</a>. Quick answers are on the{" "}
        <a href="/faq/">FAQ page</a>.
      </p>
    </SubpageShell>
  );
}
