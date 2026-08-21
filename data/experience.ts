export interface TimelineEntry {
  year: string;
  entries: string[];
  category: "learning" | "building" | "founding" | "shipping";
}

export const buildLog: TimelineEntry[] = [
  {
    year: "2023",
    entries: [
      "Started Computer Science journey",
      "Programming fundamentals — Python, C++",
      "First lines of code",
      "Discovered the builder mindset",
    ],
    category: "learning",
  },
  {
    year: "2024",
    entries: [
      "Deep-dive into web development",
      "Django & backend architecture",
      "First full-stack applications",
      "Explored AI/ML fundamentals",
      "FinRight AI / Finexa experiments begin",
      "First exposure to RAG systems",
    ],
    category: "building",
  },
  {
    year: "2025",
    entries: [
      "OFFGRID 1.0 Hackathon — Finexa prototype",
      "MumbaiHacks 2025",
      "GHRhack 2.0 — ClaimBlitz",
      "Fitness Hub AI Powered Web App — full-stack + WebSockets + OpenCV",
      "RAG PDF Assistant — production-grade AI pipeline",
      "Started thinking like a founder, not just a developer",
      "Deploy House team forms",
      "Velquix concept begins",
    ],
    category: "building",
  },
  {
    year: "2026",
    entries: [
      "FinGrow — AI Financial Intelligence Platform (active)",
      "Full-stack product development at startup depth",
      "AI-first product architecture",
      "Exploring cybersecurity & network systems",
      "Building Velquix as a product studio",
      "Thinking beyond code — into product, growth, users",
    ],
    category: "founding",
  },
];

export const currentlyLearning = [
  { topic: "Advanced Backend Engineering", status: "BUILDING" as const },
  { topic: "AI / ML Systems", status: "BUILDING" as const },
  { topic: "Cybersecurity Fundamentals", status: "EXPLORING" as const },
  { topic: "Network Administration", status: "EXPLORING" as const },
  { topic: "Cloud Architecture", status: "EXPLORING" as const },
  { topic: "System Architecture Design", status: "APPLYING" as const },
  { topic: "Product Development", status: "APPLYING" as const },
  { topic: "Startup Thinking", status: "APPLYING" as const },
];
