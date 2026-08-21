export type ProjectStatus = "BUILDING" | "MVP" | "EXPERIMENT" | "PROTOTYPE" | "COMPLETED" | "IDEA" | "RESEARCH";

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  problem: string;
  idea: string;
  whatIBuilt: string;
  tech: string[];
  challenges: string;
  learned: string;
  status: ProjectStatus;
  featured?: boolean;
  github?: string;
  live?: string;
  caseStudy?: string;
  color: string;
  accentColor: string;
  year: string;
}

export const projects: Project[] = [
  {
    id: "fingrow",
    name: "FinGrow",
    tagline: "AI Financial Intelligence Platform",
    description:
      "A financial intelligence platform designed to help people understand their money, analyze spending, build financial goals and make better financial decisions with AI.",
    problem:
      "Most people don't understand where their money goes or how to make better financial decisions. Existing apps show data but don't explain it or act on it.",
    idea:
      "Build an AI-powered financial companion that doesn't just show charts — it actually understands your financial situation and helps you improve it.",
    whatIBuilt:
      "A full-stack fintech platform with an AI assistant (RAG-powered), spending analysis, goal tracking, budget management, smart predictions, transaction intelligence, and payment integration.",
    tech: ["Python", "Django", "React", "REST APIs", "AI", "RAG", "Gemini", "PostgreSQL", "Supabase", "Razorpay", "FCM"],
    challenges:
      "Building a truly intelligent RAG pipeline that understands personal finance context. Designing a clean, non-overwhelming UI for complex financial data.",
    learned:
      "End-to-end product development, AI integration at product level, fintech domain knowledge, designing for real users.",
    status: "BUILDING",
    featured: true,
    github: undefined, // Private
    live: undefined,
    color: "#FF6B00",
    accentColor: "#FF8C00",
    year: "2025–Present",
  },
  {
    id: "fithub",
    name: "Fit Hub Gym",
    tagline: "AI-Powered Gym Management Platform",
    description:
      "A full-stack gym management and fitness platform with real-time features, AI coaching, and payment integration.",
    problem: "Gyms run on spreadsheets and WhatsApp. Members don't get personalized guidance. No real-time insight for owners.",
    idea:
      "Create a comprehensive gym platform that handles memberships, real-time workout sessions, AI-powered guidance, and business management in one place.",
    whatIBuilt:
      "Full-stack web app with Django, real-time WebSocket sessions, OpenCV-based form detection, AI chatbot for fitness guidance, workout management, and Razorpay payment integration.",
    tech: ["Django", "Django Channels", "WebSockets", "OpenCV", "Razorpay", "AI Chatbot", "Python", "JavaScript"],
    challenges:
      "Real-time WebSocket architecture at scale. Integrating computer vision for exercise form detection in a web environment.",
    learned: "Real-time systems, WebSocket architecture, computer vision integration, business software design.",
    status: "COMPLETED",
    github: "https://github.com/atharva-404/Fitness-Hub-AI-Powered-Web-App",
    color: "#22C55E",
    accentColor: "#16A34A",
    year: "2025",
  },
  {
    id: "claimblitz",
    name: "ClaimBlitz",
    tagline: "Hackathon Project — Rapid Claims Processing",
    description:
      "A fast claims processing system built during a hackathon to demonstrate automated validation and decision pipelines.",
    problem: "Insurance claim processing is slow, manual, and opaque for claimants.",
    idea: "Automate the claims intake and initial validation pipeline using AI.",
    whatIBuilt: "An automated claims intake and processing prototype with AI-based validation logic.",
    tech: ["Python", "AI", "REST APIs"],
    challenges: "Building a complete working prototype under hackathon time pressure.",
    learned: "Rapid prototyping, system design under constraints, team collaboration.",
    status: "PROTOTYPE",
    github: "https://github.com/atharva-404/ClaimBlitz",
    color: "#F59E0B",
    accentColor: "#D97706",
    year: "2025",
  },
  {
    id: "rag-pdf",
    name: "RAG PDF Assistant",
    tagline: "AI-Powered Document Intelligence",
    description:
      "An AI assistant that lets you chat with your PDF documents using Retrieval-Augmented Generation.",
    problem: "Reading long PDFs is tedious. Extracting specific information takes too long.",
    idea: "Build a RAG system that lets users ask natural language questions about any PDF.",
    whatIBuilt:
      "A RAG pipeline that processes PDFs, creates embeddings, and answers questions with context-aware AI responses.",
    tech: ["Python", "RAG", "Embeddings", "AI", "LLM"],
    challenges: "Achieving accurate retrieval on complex technical documents. Managing context window limits.",
    learned: "RAG architecture, vector embeddings, document processing pipelines.",
    status: "COMPLETED",
    github: "https://github.com/atharva-404/RAG-PDF-Assistant",
    color: "#8B5CF6",
    accentColor: "#7C3AED",
    year: "2025",
  },
  {
    id: "finexa",
    name: "Finexa / FinRight AI",
    tagline: "Financial Intelligence Experiment",
    description:
      "An earlier financial intelligence experiment that contributed to the evolution toward FinGrow.",
    problem: "Understanding personal finance decisions with AI assistance.",
    idea: "Experiment with AI-powered financial guidance before building a full product.",
    whatIBuilt: "A prototype financial analysis system exploring AI-powered financial insights and decision support.",
    tech: ["Python", "AI", "Django", "Logic"],
    challenges: "Defining the right product scope. Understanding what users actually need from financial AI.",
    learned:
      "Product thinking for fintech, importance of user research, technical validation before full development.",
    status: "EXPERIMENT",
    github: "https://github.com/atharva-404/Logic_Legion_Finexa",
    color: "#06B6D4",
    accentColor: "#0891B2",
    year: "2024",
  },
  {
    id: "datify",
    name: "Datify",
    tagline: "AI-Powered Dating Concept",
    description: "An AI-powered dating/chatbot concept exploring personality matching with conversational AI.",
    problem: "Dating apps focus on swiping, not genuine compatibility discovery.",
    idea: "Use AI conversations to discover compatibility before showing profiles.",
    whatIBuilt: "A concept prototype exploring AI-driven compatibility conversations and personality matching.",
    tech: ["Python", "AI", "Chatbot", "NLP"],
    challenges: "Defining what 'compatibility' means algorithmically. Ethical AI design for personal relationships.",
    learned: "AI product design, ethical considerations, conversational UI design.",
    status: "PROTOTYPE",
    color: "#EC4899",
    accentColor: "#DB2777",
    year: "2025",
  },
  {
    id: "drivons",
    name: "Drivons",
    tagline: "Rent • Drive • Explore",
    description: "A mobility concept exploring vehicle rental and urban mobility solutions.",
    problem: "Urban mobility is fragmented. Vehicle rentals are clunky and outdated.",
    idea: "A clean, modern platform for seamless vehicle rental experiences.",
    whatIBuilt: "A conceptual product and early-stage prototype exploring the mobility rental space.",
    tech: ["React", "Django", "Maps API", "Payments"],
    challenges: "Understanding the logistics complexity of vehicle rental at scale.",
    learned: "Marketplace product design, logistics system thinking, mobility domain research.",
    status: "IDEA",
    color: "#10B981",
    accentColor: "#059669",
    year: "2025",
  },
];
