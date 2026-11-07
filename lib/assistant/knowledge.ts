import { education, profile } from "@/data/profile";
import { projects, type Project } from "@/data/projects";
import { skillGroups } from "@/data/skills";
import { hackathons, hackathonTeam } from "@/data/journey";
import { velquix } from "@/data/velquix";
import type { AssistantReply } from "./types";

/** A pattern is a word or phrase; the number is how strongly it signals the intent. */
export type Pattern = [phrase: string, weight: number];

export interface Intent {
  id: string;
  patterns: Pattern[];
  answer: () => Omit<AssistantReply, "intent">;
}

export const suggestedQuestions = [
  "Who is Atharva?",
  "What technologies does he use?",
  "Tell me about SpendDecode.",
  "What is Velquix?",
  "What projects has he built?",
  "What are his career interests?",
  "How can I contact him?",
] as const;

const contactLinks = [
  { label: "Email", href: `mailto:${profile.email}` },
  { label: "LinkedIn", href: profile.links.linkedin, external: true },
  { label: "GitHub", href: profile.links.github, external: true },
  { label: "X", href: profile.links.x, external: true },
];

function projectAnswer(p: Project): Omit<AssistantReply, "intent"> {
  const links = [];
  if (p.links.live) links.push({ label: p.status === "Private preview" ? "View preview" : "Visit site", href: p.links.live, external: true });
  if (p.links.github) links.push({ label: "Source on GitHub", href: p.links.github, external: true });
  links.push({ label: "See all projects", href: "#projects" });

  return {
    text: `${p.name} — ${p.tagline}\n${p.description}\nStatus: ${p.status}.${p.hackathon ? ` Built at ${p.hackathon}.` : ""} Built with ${p.tech.join(", ")}.`,
    bullets: p.features.slice(0, 5),
    links,
  };
}

const projectIntents: Intent[] = projects.map((p) => ({
  id: `project:${p.slug}`,
  patterns: [[p.name.toLowerCase(), 8], ...p.keywords.map((k): Pattern => [k, k.includes(" ") ? 6 : 3])],
  answer: () => projectAnswer(p),
}));

export const intents: Intent[] = [
  {
    id: "greeting",
    patterns: [["hi", 2], ["hello", 2], ["hey", 2], ["namaste", 2], ["good morning", 2], ["good evening", 2]],
    answer: () => ({
      text: "Hi! I can tell you about Atharva's projects, skills, Velquix, education, hackathons, or how to reach him. What would you like to know?",
    }),
  },
  {
    id: "about",
    patterns: [
      ["who is", 4], ["who are you", 2], ["atharva", 1], ["about him", 3], ["introduce", 3], ["background", 3],
      ["tell me about atharva", 6], ["what does he do", 4], ["summary", 2],
    ],
    answer: () => ({
      text: `Atharva Sonar is an AI Engineer, Full-Stack Developer and Founder who builds intelligent applications, scalable software systems and products that solve real-world problems.\nHe's based in ${profile.location}, studying for a B.E. in Computer Science & IT at the University of Mumbai, and building products under Velquix.`,
      links: [{ label: "Read the About section", href: "#about" }],
    }),
  },
  {
    id: "skills",
    patterns: [
      ["skills", 4], ["skill", 4], ["technologies", 4], ["technology", 3], ["tech stack", 5], ["stack", 3], ["languages", 3],
      ["frameworks", 3], ["tools", 2], ["use", 1], ["strongest", 3], ["good at", 3], ["expertise", 3], ["programming", 2],
    ],
    answer: () => ({
      text: "Atharva's core stack is Python, Django, React and REST APIs, with AI work across LLMs, RAG, LangChain and agents. By area:",
      bullets: skillGroups.map((g) => `${g.title}: ${g.skills.map((s) => s.name).join(", ")}`),
      links: [{ label: "See the skills section", href: "#skills" }],
    }),
  },
  {
    id: "projects",
    patterns: [
      ["projects", 4], ["project", 3], ["built", 3], ["build", 2], ["work", 2], ["portfolio", 2], ["apps", 2], ["made", 2], ["products", 2],
    ],
    answer: () => ({
      text: "Here's what he's built, starting with the flagship:",
      bullets: projects.map((p) => `${p.name} — ${p.tagline} (${p.status})`),
      links: [{ label: "Browse projects", href: "#projects" }],
    }),
  },
  {
    id: "velquix",
    patterns: [["velquix", 5], ["startup", 4], ["company", 4], ["founder", 3], ["founded", 3], ["studio", 3], ["initiative", 3], ["business", 2]],
    answer: () => ({
      text: `Velquix (Velquix Dev) is Atharva's technology and product development initiative, focused on modern software products, AI-powered applications and digital experiences.\nIts products are ${velquix.products.map((p) => `${p.name} (${p.status.toLowerCase()})`).join(" and ")}.`,
      bullets: velquix.pillars.map((p) => p.title),
      links: [
        { label: "Visit velquix.dev", href: velquix.url, external: true },
        { label: "Velquix section", href: "#velquix" },
      ],
    }),
  },
  {
    id: "interests",
    patterns: [
      ["career", 4], ["interests", 4], ["interested", 4], ["interest", 3], ["goals", 3], ["looking for", 4], ["opportunities", 4],
      ["opportunity", 4], ["internship", 4], ["hire", 4], ["hiring", 4], ["job", 3], ["freelance", 4], ["collaborate", 3], ["available", 3], ["future", 2], ["next", 1],
    ],
    answer: () => ({
      text: "His focus areas are AI, product engineering and building startups. He's open to internships, freelance projects and collaborating on ambitious ideas — especially at the intersection of AI, fintech and product.",
      bullets: [...profile.interests],
      links: contactLinks,
    }),
  },
  {
    id: "contact",
    patterns: [
      ["contact", 5], ["email", 4], ["mail", 3], ["reach", 4], ["connect", 3], ["linkedin", 4], ["github", 3], ["twitter", 4], ["x.com", 4], ["social", 3], ["message", 2], ["talk", 2], ["get in touch", 6],
    ],
    answer: () => ({
      text: `The fastest way is email: ${profile.email}. He's also on LinkedIn, GitHub and X (@atharva_sonar_).`,
      links: [...contactLinks, { label: "Contact section", href: "#contact" }],
    }),
  },
  {
    id: "education",
    patterns: [
      ["education", 5], ["study", 3], ["studying", 3], ["student", 3], ["college", 4], ["university", 4], ["degree", 4], ["diploma", 4], ["qualification", 4],
    ],
    answer: () => ({
      text: "Atharva's education:",
      bullets: education.map((e) => `${e.degree} — ${e.institution} (${e.period})${e.current ? ", current" : ""}`),
      links: [{ label: "About section", href: "#about" }],
    }),
  },
  {
    id: "hackathons",
    patterns: [["hackathon", 5], ["hackathons", 5], ["competition", 3], ["competitions", 3], ["deploy house", 6], ["team", 2]],
    answer: () => ({
      text: `He has taken part in ${hackathons.length} hackathons with team ${hackathonTeam}:`,
      bullets: hackathons.map((h) => `${h.event} — ${h.project}`),
      links: [{ label: "See the journey", href: "#journey" }],
    }),
  },
  {
    id: "resume",
    patterns: [["resume", 6], ["cv", 6], ["curriculum vitae", 6]],
    answer: () => ({
      text: "You can view or download Atharva's resume here:",
      links: [
        { label: "Download resume", href: profile.links.resumeDownload, external: true },
        { label: "View on Google Drive", href: profile.links.resume, external: true },
      ],
    }),
  },
  {
    id: "location",
    patterns: [["where", 1], ["location", 4], ["located", 4], ["based", 3], ["live", 1], ["city", 3], ["mumbai", 3], ["india", 2]],
    answer: () => ({ text: `Atharva is based in ${profile.location}.` }),
  },
  {
    id: "thanks",
    patterns: [["thanks", 4], ["thank you", 5], ["thx", 4], ["great", 1], ["cool", 1]],
    answer: () => ({ text: "You're welcome! Anything else you'd like to know?" }),
  },
  ...projectIntents,
];

export const fallbackReply: Omit<AssistantReply, "intent"> = {
  text: "I don't have an answer for that in Atharva's portfolio data. I can tell you about his projects, skills, Velquix, education, hackathons or how to contact him — or you can ask him directly.",
  links: [{ label: "Email Atharva", href: `mailto:${profile.email}` }],
};
