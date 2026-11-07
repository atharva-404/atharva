/**
 * Questions people (and answer engines) ask about Atharva. Answers are built
 * from the other data files so they stay in sync with the rest of the site.
 * Rendered on /faq/ and mirrored in its FAQPage JSON-LD.
 */
import { education, profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";
import { velquix } from "@/data/velquix";

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  links?: { label: string; href: string }[];
}

const project = (slug: string) => projects.find((p) => p.slug === slug)!;
const spendDecode = project("spenddecode");
const learn = project("velquix-learn");
const skillsOf = (id: string) => skillGroups.find((g) => g.id === id)!.skills.map((s) => s.name);
const list = (items: readonly string[]) => `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;

export const faq: FaqItem[] = [
  {
    id: "who-is-atharva-sonar",
    question: "Who is Atharva Sonar?",
    answer: `Atharva Sonar is an AI Engineer, Full-Stack Developer and Founder based in ${profile.location}. He builds AI-powered applications, scalable software systems and digital products, and founded Velquix, the product initiative behind SpendDecode and Velquix Learn.`,
    links: [{ label: "About Atharva", href: "/about/" }],
  },
  {
    id: "what-does-he-do",
    question: "What does Atharva Sonar do?",
    answer:
      "He designs and builds full-stack software with an AI layer: Python and Django backends, React frontends and REST APIs, plus LLM features such as retrieval-augmented generation (RAG) and multi-agent workflows. For Velquix products he also leads product direction, backend architecture and AI integration.",
  },
  {
    id: "education",
    question: "Where did Atharva Sonar study?",
    answer: `${education
      .map((e) => `${e.current ? "He is studying for a" : "He completed a"} ${e.degree.replace(" — ", " in ")} at ${e.institution} (${e.period})`)
      .join(". ")}.`,
  },
  {
    id: "technologies",
    question: "What technologies does Atharva Sonar use?",
    answer: `His main languages are ${list(skillsOf("languages"))}. On the backend he uses ${list(skillsOf("backend"))}; on the frontend ${list(skillsOf("frontend"))}. For AI work he uses ${list(skillsOf("ai"))}, and he works with ${list(skillsOf("data"))} for data.`,
    links: [{ label: "Skills on the homepage", href: "/#skills" }],
  },
  {
    id: "ai-projects",
    question: "What AI projects has Atharva Sonar built?",
    answer:
      "SpendDecode (AI personal finance with an AI financial coach), ClaimBlitz (nine AI agents that process medical insurance claims), SafeHer AI (machine-learning risk scoring and voice SOS for personal safety), FitHub Gym (an OpenCV and MediaPipe AI trainer), a RAG PDF assistant built with FAISS and Gemini, and Finexa, an earlier AI finance platform.",
    links: [{ label: "All projects", href: "/projects/" }],
  },
  {
    id: "what-is-spenddecode",
    question: "What is SpendDecode?",
    answer: `SpendDecode is an AI-powered personal finance platform built by Atharva under Velquix. Users upload a bank or UPI statement and get a financial health score, spending patterns, savings goals and advice from an AI financial coach. It is live at spenddecode.velquix.dev and built with ${list(spendDecode.tech.filter((t) => t !== "AI integrations"))}.`,
    links: [
      { label: "SpendDecode case study", href: "/projects/spenddecode/" },
      { label: "spenddecode.velquix.dev", href: spendDecode.links.live! },
    ],
  },
  {
    id: "what-is-velquix",
    question: "What is Velquix?",
    answer: `Velquix (Velquix Dev) is Atharva Sonar's technology and product development initiative, focused on modern software products, AI-powered applications and digital experiences. Its products are ${velquix.products.map((p) => p.name).join(" and ")}.`,
    links: [
      { label: "Velquix on the homepage", href: "/#velquix" },
      { label: "velquix.dev", href: velquix.url },
    ],
  },
  {
    id: "what-is-velquix-learn",
    question: "What is Velquix Learn?",
    answer: `Velquix Learn is a developer learning platform from Velquix. It organises curated free resources into career roadmaps (path, stage, module, resource), adds practice projects and challenges, and tracks progress with streaks, XP and badges. It is live at learn.velquix.dev.`,
    links: [
      { label: "Velquix Learn case study", href: "/projects/velquix-learn/" },
      { label: "learn.velquix.dev", href: learn.links.live! },
    ],
  },
  {
    id: "type-of-software",
    question: "What type of software does Atharva Sonar build?",
    answer:
      "Mostly AI-powered web applications: fintech and personal-finance products, SaaS products under Velquix, multi-agent AI systems, and full-stack platforms with real-time features, payments and computer vision.",
  },
  {
    id: "availability",
    question: "Is Atharva Sonar open to work or collaboration?",
    answer:
      "Yes. He is open to internships, freelance projects and collaborating on ambitious ideas, especially at the intersection of AI, fintech and product.",
  },
  {
    id: "contact",
    question: "How can I contact Atharva Sonar?",
    answer: `Email ${profile.email}, or reach him on LinkedIn, on GitHub (atharva-404) or on X (@atharva_sonar_).`,
    links: [
      { label: "Email", href: `mailto:${profile.email}` },
      { label: "LinkedIn", href: profile.links.linkedin },
      { label: "GitHub", href: profile.links.github },
      { label: "X", href: profile.links.x },
    ],
  },
];
