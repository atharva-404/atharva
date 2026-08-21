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
    project: "[ADD PROJECT NAME]",
    projectDescription: "[ADD PROJECT DESCRIPTION]",
    myRole: "[ADD YOUR ROLE]",
    tech: ["[ADD TECHNOLOGIES]"],
    result: "[ADD RESULT]",
    learned: "[ADD KEY LEARNING]",
    teamName: "Deploy House",
    github: undefined,
  },
  {
    id: "offgrid-2026",
    event: "OFFGRID 1.0",
    date: "2026",
    project: "Finexa",
    projectDescription: "An AI-powered financial intelligence prototype built to help users understand and improve their financial decisions.",
    myRole: "Full-stack Developer & AI Engineer",
    tech: ["Python", "Django", "AI", "RAG"],
    result: "[ADD RESULT]",
    learned: "Rapid financial product development, AI integration under time constraints, team execution under pressure.",
    teamName: "Deploy House",
    github: "https://github.com/atharva-404/Logic_Legion_Finexa",
  },
  {
    id: "ghrhack-2",
    event: "GHRhack 2.0",
    date: "[ADD DATE]",
    project: "ClaimBlitz",
    projectDescription: "An automated insurance claims processing prototype with AI validation pipelines.",
    myRole: "Developer",
    tech: ["Python", "AI", "REST APIs"],
    result: "[ADD RESULT]",
    learned: "Shipping complete working systems under extreme time pressure, problem framing for hackathons.",
    teamName: "Deploy House",
    github: "https://github.com/atharva-404/ClaimBlitz",
  },
];
