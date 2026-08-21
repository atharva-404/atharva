export interface SkillItem {
  name: string;
  category: "BUILDING" | "COMFORTABLE" | "EXPLORING";
  domain: "language" | "frontend" | "backend" | "ai" | "database" | "infra" | "payment";
}

export const skills: SkillItem[] = [
  // BUILDING
  { name: "Python", category: "BUILDING", domain: "language" },
  { name: "Django", category: "BUILDING", domain: "backend" },
  { name: "REST APIs", category: "BUILDING", domain: "backend" },
  { name: "React", category: "BUILDING", domain: "frontend" },
  { name: "Git / GitHub", category: "BUILDING", domain: "infra" },
  { name: "Django REST Framework", category: "BUILDING", domain: "backend" },
  { name: "Django Channels", category: "BUILDING", domain: "backend" },
  { name: "HTML / CSS", category: "BUILDING", domain: "frontend" },
  { name: "RAG Systems", category: "BUILDING", domain: "ai" },
  { name: "AI Integration", category: "BUILDING", domain: "ai" },

  // COMFORTABLE
  { name: "C++", category: "COMFORTABLE", domain: "language" },
  { name: "JavaScript", category: "COMFORTABLE", domain: "language" },
  { name: "TypeScript", category: "COMFORTABLE", domain: "language" },
  { name: "PostgreSQL", category: "COMFORTABLE", domain: "database" },
  { name: "MySQL", category: "COMFORTABLE", domain: "database" },
  { name: "SQLite", category: "COMFORTABLE", domain: "database" },
  { name: "Supabase", category: "COMFORTABLE", domain: "database" },
  { name: "OpenCV", category: "COMFORTABLE", domain: "ai" },
  { name: "Tailwind CSS", category: "COMFORTABLE", domain: "frontend" },
  { name: "WebSockets", category: "COMFORTABLE", domain: "backend" },
  { name: "Razorpay", category: "COMFORTABLE", domain: "payment" },
  { name: "Firebase / FCM", category: "COMFORTABLE", domain: "payment" },
  { name: "Redis", category: "COMFORTABLE", domain: "infra" },
  { name: "Celery", category: "COMFORTABLE", domain: "infra" },
  { name: "Docker (basics)", category: "COMFORTABLE", domain: "infra" },

  // EXPLORING
  { name: "PyTorch", category: "EXPLORING", domain: "ai" },
  { name: "TensorFlow", category: "EXPLORING", domain: "ai" },
  { name: "Advanced ML", category: "EXPLORING", domain: "ai" },
  { name: "Cybersecurity", category: "EXPLORING", domain: "infra" },
  { name: "Network Administration", category: "EXPLORING", domain: "infra" },
  { name: "Cloud Architecture", category: "EXPLORING", domain: "infra" },
  { name: "Distributed Systems", category: "EXPLORING", domain: "infra" },
  { name: "React Native", category: "EXPLORING", domain: "frontend" },
  { name: "Framer Motion", category: "EXPLORING", domain: "frontend" },
  { name: "Advanced AI Infrastructure", category: "EXPLORING", domain: "ai" },
];

export const techStack = {
  languages: ["Python", "C++", "JavaScript", "TypeScript", "HTML", "CSS"],
  frontend: ["React", "React Native", "Tailwind CSS", "Framer Motion"],
  backend: ["Django", "Django REST Framework", "Django Channels", "REST APIs"],
  ai: ["Machine Learning", "AI", "PyTorch", "TensorFlow", "OpenCV", "RAG", "Embeddings", "AI Assistants", "Gemini"],
  databases: ["PostgreSQL", "MySQL", "SQLite", "Supabase"],
  infra: ["Git", "GitHub", "Docker", "Redis", "Celery", "Cloud platforms"],
  payments: ["Razorpay", "UPI integrations", "Firebase / FCM"],
};
