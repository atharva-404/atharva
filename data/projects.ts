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
    github: undefined,
    live: undefined,
    color: "#FF6B00",
    accentColor: "#FF8C00",
    year: "2025–Present",
  },
  {
    id: "safeher",
    name: "SafeHer AI",
    tagline: "Proactive Safety Monitoring Platform",
    description:
      "A full-stack proactive safety monitoring platform with live location tracking, ML risk scoring, SOS workflows, voice emergency detection, and agentic safety automation.",
    problem:
      "Women's safety in urban environments lacks proactive, real-time monitoring. Existing solutions only react after an incident instead of preventing it.",
    idea:
      "Build an AI-powered safety companion that monitors context in real-time, calculates risk, and can autonomously trigger protective actions before danger escalates.",
    whatIBuilt:
      "Full-stack safety platform with React frontend, Django REST backend, ML risk engine (scikit-learn), agentic safety automation, voice SOS detection, safe route intelligence, and Google Maps integration.",
    tech: ["Python", "Django", "React", "TypeScript", "scikit-learn", "REST APIs", "AI", "Google Maps", "JWT"],
    challenges:
      "Building a reliable real-time risk scoring engine. Designing autonomous safety workflows that don't produce false positives. Integrating voice detection for emergency phrases.",
    learned:
      "ML model integration in production, real-time location systems, safety-critical product design, agentic AI workflows.",
    status: "COMPLETED",
    github: "https://github.com/atharva-404/SafeHer-AI",
    live: "https://safeher-ai-five.vercel.app/",
    color: "#7C3AED",
    accentColor: "#6D28D9",
    year: "2026",
  },
  {
    id: "claimblitz",
    name: "ClaimBlitz",
    tagline: "Multi-Agent AI Claims Processor",
    description:
      "9 specialized AI agents collaborate in real-time to process insurance claims — extracting data, validating codes, detecting fraud, assessing risk, and delivering explainable decisions.",
    problem:
      "Traditional insurance claim processing takes 30-90 days with manual review, high error rates, and zero transparency for claimants.",
    idea:
      "Replace sequential manual processing with an autonomous multi-agent AI system where specialized agents debate, vote, and reach consensus on claims.",
    whatIBuilt:
      "A multi-agent system with 9 independent AI agents (Scanner, OCR, Validator, Medical Expert, Policy Expert, Fraud Detection, Risk Assessment, Judge, Communication) using FastAPI, Groq LLM, MongoDB, and Pinecone vector memory. Includes debate mode, consensus voting, and human escalation.",
    tech: ["Python", "FastAPI", "React", "Groq LLM", "MongoDB", "Pinecone", "Redis", "Celery", "Docker"],
    challenges:
      "Designing inter-agent communication protocols. Building a debate system where agents can challenge each other's findings. Handling Groq rate limits while maintaining pipeline flow.",
    learned:
      "Multi-agent system architecture, LLM orchestration, vector memory for AI agents, consensus algorithms, building production-grade AI pipelines.",
    status: "COMPLETED",
    github: "https://github.com/atharva-404/ClaimBlitz",
    color: "#F59E0B",
    accentColor: "#D97706",
    year: "2026",
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
    id: "rag-pdf",
    name: "RAG PDF Assistant",
    tagline: "AI-Powered Document Intelligence",
    description:
      "A complete RAG system that lets you chat with your PDF documents using Retrieval-Augmented Generation with local embeddings and Google Gemini.",
    problem: "Reading long PDFs is tedious. Extracting specific information takes too long. Normal chatbots hallucinate answers.",
    idea: "Build a RAG system that searches your actual document for relevant information before answering — grounding responses in facts.",
    whatIBuilt:
      "A full RAG pipeline with PDF text extraction, chunking with overlap, local embeddings (sentence-transformers), FAISS vector search, and Google Gemini for answer generation. Built with Streamlit UI.",
    tech: ["Python", "RAG", "FAISS", "Sentence Transformers", "Google Gemini", "LangChain", "Streamlit"],
    challenges: "Achieving accurate retrieval on complex technical documents. Managing context window limits. Optimizing chunk size for precision.",
    learned: "RAG architecture from scratch, vector embeddings, similarity search, document processing pipelines, LLM prompt engineering.",
    status: "COMPLETED",
    github: "https://github.com/atharva-404/RAG-PDF-Assistant",
    color: "#8B5CF6",
    accentColor: "#7C3AED",
    year: "2025",
  },
  {
    id: "finexa",
    name: "Finexa",
    tagline: "AI Personal Finance Platform",
    description:
      "An AI-powered personal finance management platform with expense extraction, health scoring, AI coach, gamification, and goal tracking.",
    problem: "People lack personalized, intelligent tools to understand and improve their financial health.",
    idea: "Build a comprehensive AI financial platform that combines document processing, spending analysis, and conversational AI coaching.",
    whatIBuilt:
      "Full-stack platform with Django backend, React TypeScript frontend, AI expense extraction from documents, financial health scoring algorithm, AI coach (LangChain + Gemini), gamification system, and goal tracking.",
    tech: ["Python", "Django", "React", "TypeScript", "LangChain", "Google Gemini", "PostgreSQL", "MongoDB"],
    challenges:
      "Rapid financial product development under hackathon constraints. AI integration for document expense extraction. Designing a meaningful health score algorithm.",
    learned:
      "Product thinking for fintech, AI integration under time pressure, team execution, full-stack architecture decisions.",
    status: "COMPLETED",
    github: "https://github.com/atharva-404/Logic_Legion_Finexa",
    color: "#06B6D4",
    accentColor: "#0891B2",
    year: "2026",
  },
  {
    id: "datify",
    name: "Datify",
    tagline: "AI-Powered Compatibility Discovery",
    description: "An AI-powered dating concept exploring personality matching through conversational AI before showing profiles.",
    problem: "Dating apps focus on swiping based on photos, not genuine compatibility discovery.",
    idea: "Use AI conversations to discover compatibility before revealing profiles — personality first, looks second.",
    whatIBuilt: "A concept prototype exploring AI-driven compatibility conversations and personality matching algorithms.",
    tech: ["Python", "AI", "Chatbot", "NLP"],
    challenges: "Defining what 'compatibility' means algorithmically. Ethical AI design for personal relationships.",
    learned: "AI product design, ethical considerations, conversational UI design.",
    status: "PROTOTYPE",
    color: "#EC4899",
    accentColor: "#DB2777",
    year: "2025",
  },
];
