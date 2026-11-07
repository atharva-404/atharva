/**
 * Skill categories. `icon` is either a Simple Icons slug (brand logos)
 * or a lucide key for concepts that have no brand mark.
 * No proficiency percentages on purpose.
 */

export type SkillIcon =
  | { kind: "brand"; slug: BrandSlug }
  | { kind: "concept"; name: ConceptIcon };

export type BrandSlug =
  | "python" | "cplusplus" | "javascript" | "typescript"
  | "django" | "fastapi"
  | "react" | "nextdotjs" | "html5" | "css" | "tailwindcss"
  | "langchain" | "opencv"
  | "postgresql" | "mysql" | "mongodb" | "supabase" | "sqlite"
  | "git" | "github" | "docker" | "redis" | "firebase" | "cloudflare" | "postman";

export type ConceptIcon = "sparkles" | "brain" | "search" | "bot" | "network" | "braces" | "radio" | "layers";

export interface Skill {
  name: string;
  icon: SkillIcon;
}

export interface SkillGroup {
  id: string;
  title: string;
  blurb: string;
  skills: Skill[];
}

const brand = (slug: BrandSlug): SkillIcon => ({ kind: "brand", slug });
const concept = (name: ConceptIcon): SkillIcon => ({ kind: "concept", name });

export const skillGroups: SkillGroup[] = [
  {
    id: "ai",
    title: "AI & Machine Learning",
    blurb: "LLM apps, retrieval and agents",
    skills: [
      { name: "Generative AI", icon: concept("sparkles") },
      { name: "LLMs", icon: concept("brain") },
      { name: "RAG", icon: concept("search") },
      { name: "LangChain", icon: brand("langchain") },
      { name: "AI Agents", icon: concept("bot") },
      { name: "OpenCV", icon: brand("opencv") },
      { name: "Machine Learning", icon: concept("network") },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    blurb: "APIs, real-time and data flow",
    skills: [
      { name: "Django", icon: brand("django") },
      { name: "Django REST Framework", icon: concept("layers") },
      { name: "FastAPI", icon: brand("fastapi") },
      { name: "REST APIs", icon: concept("braces") },
      { name: "Django Channels", icon: concept("radio") },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    blurb: "Interfaces people enjoy using",
    skills: [
      { name: "React", icon: brand("react") },
      { name: "Next.js", icon: brand("nextdotjs") },
      { name: "HTML", icon: brand("html5") },
      { name: "CSS", icon: brand("css") },
      { name: "Tailwind CSS", icon: brand("tailwindcss") },
    ],
  },
  {
    id: "languages",
    title: "Programming",
    blurb: "Daily drivers",
    skills: [
      { name: "Python", icon: brand("python") },
      { name: "TypeScript", icon: brand("typescript") },
      { name: "JavaScript", icon: brand("javascript") },
      { name: "C++", icon: brand("cplusplus") },
    ],
  },
  {
    id: "data",
    title: "Databases",
    blurb: "Relational, document and hosted",
    skills: [
      { name: "PostgreSQL", icon: brand("postgresql") },
      { name: "MySQL", icon: brand("mysql") },
      { name: "MongoDB", icon: brand("mongodb") },
      { name: "Supabase", icon: brand("supabase") },
      { name: "SQLite", icon: brand("sqlite") },
    ],
  },
  {
    id: "tools",
    title: "Tools & Infrastructure",
    blurb: "Shipping and running software",
    skills: [
      { name: "Git", icon: brand("git") },
      { name: "GitHub", icon: brand("github") },
      { name: "Docker", icon: brand("docker") },
      { name: "Redis", icon: brand("redis") },
      { name: "Firebase", icon: brand("firebase") },
      { name: "Cloudflare", icon: brand("cloudflare") },
      { name: "Postman", icon: brand("postman") },
    ],
  },
];
