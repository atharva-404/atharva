/**
 * Journey timeline and hackathons.
 * Hackathon → project pairs come from Atharva directly. Dates are only shown
 * where they are confirmed (MumbaiHacks carries its year in the name).
 * No awards or rankings are claimed.
 */

export interface JourneyStep {
  period: string;
  title: string;
  description: string;
  kind: "education" | "building" | "founding";
}

export const journey: JourneyStep[] = [
  {
    period: "2022",
    title: "Diploma in Computer Engineering",
    description: "Started at KCES College of Engineering & Management, Jalgaon. C++, data structures and the habit of building to learn.",
    kind: "education",
  },
  {
    period: "During the diploma",
    title: "Into full-stack development",
    description: "Django backends, React frontends and real-time features — FitHub Gym brought payments, WebSockets and computer vision together.",
    kind: "building",
  },
  {
    period: "2025",
    title: "B.E. Computer Science & IT",
    description: "Joined the University of Mumbai (2025 – 2028) after completing the diploma.",
    kind: "education",
  },
  {
    period: "2025 – 2026",
    title: "AI engineering & hackathons",
    description: "A RAG assistant built from scratch, then ML risk scoring and multi-agent systems shipped under hackathon deadlines with team Deploy House.",
    kind: "building",
  },
  {
    period: "Now",
    title: "Building Velquix",
    description: "Turning experiments into products: Velquix Learn and SpendDecode are both live.",
    kind: "founding",
  },
];

export interface Hackathon {
  event: string;
  project: string;
  projectSlug: string;
  summary: string;
}

export const hackathonTeam = "Deploy House";

export const hackathons: Hackathon[] = [
  {
    event: "MumbaiHacks 2025",
    project: "FinRight AI",
    projectSlug: "finright-ai",
    summary: "Personal liquidity and group expense sharing.",
  },
  {
    event: "OFFGRID 1.0",
    project: "ClaimBlitz",
    projectSlug: "claimblitz",
    summary: "Multi-agent insurance claim processing.",
  },
  {
    event: "GHRhack 2.0",
    project: "Finexa",
    projectSlug: "finexa",
    summary: "AI personal finance with an AI coach.",
  },
  {
    event: "Build And Grow: AI Hackathon 2.0",
    project: "SafeHer AI",
    projectSlug: "safeher-ai",
    summary: "Proactive safety monitoring and risk scoring.",
  },
];
