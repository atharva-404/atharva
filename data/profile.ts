/**
 * Single source of truth for personal/brand information.
 * Used by the page sections, metadata, JSON-LD and the FAQ assistant.
 */

const RESUME_FILE_ID = "1TVHL3a3FEgri8eOkdGo-NPE4UGySZrap";

export const SITE_URL = "https://atharvasonar.me";

export const profile = {
  name: "Atharva Sonar",
  firstName: "Atharva",
  location: "Mumbai, India",
  roles: ["AI Engineer", "Full-Stack Developer", "Founder"],
  headline: "Building Intelligent Products. Engineering What's Next.",
  intro:
    "I build AI-powered applications, scalable software systems, and digital products that turn ambitious ideas into reality.",
  summary:
    "I'm Atharva Sonar — an AI Engineer, Full-Stack Developer, and Founder passionate about building intelligent applications, scalable software systems, and products that solve real-world problems.",
  interests: [
    "Artificial Intelligence",
    "Generative AI",
    "Agentic AI",
    "Full-Stack Engineering",
    "Backend Architecture",
    "Fintech",
    "SaaS Development",
    "Product Engineering",
    "Machine Learning",
    "Automation",
  ],
  // Forwarded to Gmail through Namecheap email forwarding.
  email: "hello@atharvasonar.me",
  links: {
    github: "https://github.com/atharva-404",
    linkedin: "https://www.linkedin.com/in/atharva-sonar-92287b353/",
    x: "https://x.com/atharva_sonar_",
    resume: `https://drive.google.com/file/d/${RESUME_FILE_ID}/view?usp=sharing`,
    resumeDownload: `https://drive.google.com/uc?export=download&id=${RESUME_FILE_ID}`,
    velquix: "https://www.velquix.dev/",
  },
  portrait: {
    src: "/images/atharva-sonar.webp",
    fallback: "/images/atharva-sonar.jpg",
    width: 720,
    height: 960,
    alt: "Portrait of Atharva Sonar in a black suit and red tie",
  },
} as const;

export const education = [
  {
    degree: "B.E. — Computer Science & Information Technology",
    institution: "University of Mumbai",
    period: "2025 – 2028",
    current: true,
    note: "Deepening fundamentals in systems, data and software engineering.",
  },
  {
    degree: "Diploma — Computer Engineering",
    institution: "KCES College of Engineering & Management, Jalgaon",
    period: "2022 – 2025",
    current: false,
    note: "Where it started: C++, data structures, and my first full-stack builds.",
  },
] as const;

/** The builder's loop — preserved from the previous portfolio. */
export const builderLoop = ["Learn", "Experiment", "Build", "Ship", "Iterate"] as const;

export const principles = [
  {
    title: "Learn by building",
    description: "Theory becomes useful when it ships. The fastest way to understand a tool is to build something real with it.",
  },
  {
    title: "Keep systems simple",
    description: "Complexity needs a reason. If I can't explain why a system is complex, I simplify it.",
  },
  {
    title: "Design is engineering",
    description: "A powerful product should also feel good to use. Interface and architecture are one decision.",
  },
] as const;

export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "journey", label: "Journey" },
  { id: "contact", label: "Contact" },
] as const;
