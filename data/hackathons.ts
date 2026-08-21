export interface HackathonEntry {
  id: string;
  event: string;
  organizer?: string;
  date: string;
  project: string;
  projectDescription: string;
  myRole: string;
  tech: string[];
  result: string;
  learned: string;
  teamName?: string;
  github?: string;
}

export const hackathons: HackathonEntry[] = [
  {
    id: "mumbaihacks-2025",
    event: "MumbaiHacks 2025",
    date: "2025",
    project: "FinRight AI",
    projectDescription: "An AI-powered financial intelligence prototype built to help users understand and improve their financial decisions with smart analysis and personalized guidance.",
    myRole: "Full-stack Developer & AI Engineer",
    tech: ["Python", "Django", "React", "AI", "RAG"],
    result: "Completed",
    learned: "Rapid financial product development, AI integration under time constraints, team execution under pressure.",
    teamName: "Deploy House",
    github: undefined,
  },
  {
    id: "offgrid-2026",
    event: "OFFGRID 1.0",
    date: "2026",
    project: "ClaimBlitz",
    projectDescription: "A multi-agent AI system with 9 specialized agents that collaborate to process insurance claims — extracting data, detecting fraud, debating disagreements, and delivering explainable decisions in seconds.",
    myRole: "Full-stack Developer & AI Architecture Lead",
    tech: ["Python", "FastAPI", "React", "Groq LLM", "MongoDB", "Pinecone", "Multi-Agent AI"],
    result: "Completed",
    learned: "Multi-agent system design, LLM orchestration, building consensus algorithms for AI agents, production-grade AI pipelines under time pressure.",
    teamName: "Deploy House",
    github: "https://github.com/atharva-404/ClaimBlitz",
  },
  {
    id: "ghrhack-2",
    event: "GHRhack 2.0",
    date: "2026",
    project: "Finexa",
    projectDescription: "An AI-powered personal finance management platform with expense extraction, health scoring, AI coach, gamification, and goal tracking.",
    myRole: "Full-stack Developer & AI Engineer",
    tech: ["Python", "Django", "React", "TypeScript", "LangChain", "Gemini", "MongoDB"],
    result: "Completed",
    learned: "Rapid fintech product development, AI-powered document extraction, financial health scoring algorithms, full-stack architecture under pressure.",
    teamName: "Deploy House",
    github: "https://github.com/atharva-404/Logic_Legion_Finexa",
  },
  {
    id: "build-grow-ai-2",
    event: "Build And Grow: AI Hackathon 2.0",
    date: "2026",
    project: "SafeHer AI",
    projectDescription: "A proactive safety monitoring platform with live location tracking, ML risk scoring, voice SOS detection, agentic safety automation, and safe route intelligence.",
    myRole: "Full-stack Developer & ML Engineer",
    tech: ["Python", "Django", "React", "scikit-learn", "AI", "Google Maps", "JWT"],
    result: "Completed",
    learned: "ML model integration in production, real-time location systems, safety-critical product design, agentic AI workflows.",
    teamName: "Deploy House",
    github: "https://github.com/atharva-404/SafeHer-AI",
  },
];
