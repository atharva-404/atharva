/**
 * Project data. Every link here was checked against the live site or the
 * public GitHub API. Statuses reflect what is actually deployed:
 * - SpendDecode is public with free sign-up (checked 2026-11-05).
 * - Finexa's old Vercel demo returns 404, so it has no live link.
 *
 * `caseStudy` powers /projects/<slug>/. Its facts come only from the project's
 * README or its live website (listed in `sources`). Lessons learned are left
 * out on purpose until Atharva writes them himself.
 */

export type ProjectStatus =
  | "Private preview"
  | "Live"
  | "Live demo"
  | "Hackathon build"
  | "Completed"
  | "Earlier project"
  | "Prototype";

export type ProjectTier = "flagship" | "featured" | "earlier";

export interface ProjectImage {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export interface CaseStudy {
  /** Short phrase used in the page title, e.g. "AI Personal Finance Platform". */
  seoTitle: string;
  /** Unique meta description for the project page (120–160 characters). */
  seoDescription: string;
  /** The problem the project addresses, in plain language. */
  problem: string;
  /** Ordered steps of how the product or pipeline works. */
  workflow?: { title: string; detail: string }[];
  /** Layers of the system as documented by the README or visible on the live site. */
  architecture: { layer: string; detail: string }[];
  /** Design decisions and trade-offs the project itself documents. */
  decisions?: string[];
  /** Current status in one sentence. */
  statusNote: string;
  /** Schema.org applicationCategory for live apps. */
  applicationCategory?: string;
  /** Where the facts on the page come from. */
  sources: { label: string; url: string }[];
  /** ISO date the page content last changed (used for sitemap lastmod). */
  updated: string;
}

export interface Project {
  slug: string;
  name: string;
  /** Other names the project is known by (repo name, demo branding). */
  alternateName?: string;
  category: string;
  tagline: string;
  description: string;
  features: string[];
  tech: string[];
  contribution: string;
  status: ProjectStatus;
  tier: ProjectTier;
  hackathon?: string;
  links: { live?: string; github?: string };
  image?: ProjectImage;
  /** Real architecture/module list, rendered as a schematic when there is no screenshot. */
  schematic?: { label: string; stages: string[][] };
  /** Extra search terms for the FAQ assistant. */
  keywords: string[];
  caseStudy?: CaseStudy;
}

export const projects: Project[] = [
  {
    slug: "spenddecode",
    name: "SpendDecode",
    category: "AI Fintech",
    tagline: "AI-powered personal finance and spending intelligence.",
    description:
      "A personal finance platform that helps people understand their transactions, analyse spending habits, find saving opportunities, and make better purchasing decisions — with an AI layer that explains the numbers instead of just charting them.",
    features: [
      "Expense and spending analytics",
      "AI-powered financial insights",
      "Transaction understanding",
      "Money-saving recommendations",
      "Multi-file financial data analysis",
      "Budgets and savings goals",
    ],
    tech: ["Python", "Django", "Django REST Framework", "React", "Supabase", "LangChain", "AI integrations"],
    contribution: "Founder-led Velquix product — product direction, backend architecture and AI integration.",
    status: "Live",
    tier: "flagship",
    links: { live: "https://spenddecode.velquix.dev/" },
    image: {
      src: "/images/projects/spenddecode.webp",
      width: 1200,
      height: 630,
      alt: "SpendDecode product artwork showing the dashboard, budgets and AI insights on laptop and phone",
    },
    keywords: ["spenddecode", "spend decode", "finance", "fintech", "money", "budget", "spending", "flagship"],
    caseStudy: {
      seoTitle: "AI Personal Finance Platform",
      seoDescription:
        "SpendDecode is an AI personal finance platform by Atharva Sonar and Velquix: statement upload, a financial health score, spending insights and an AI coach.",
      problem:
        "Bank and UPI statements list transactions but don't explain them. SpendDecode reads an uploaded statement, organises the transactions and explains spending patterns in plain language, so people can budget, save and make purchase decisions with their own data in front of them.",
      workflow: [
        { title: "Create an account", detail: "Sign up without a credit card." },
        { title: "Upload a statement", detail: "Drop in a bank or UPI statement PDF; the AI extracts the transactions." },
        { title: "AI analysis", detail: "A financial health score, spending patterns, anomalies and a category breakdown are generated." },
        { title: "Personalised insights", detail: "An AI financial coach gives recommendations based on the user's real transactions." },
        { title: "Track progress", detail: "Follow the health score over time and work towards savings goals." },
      ],
      architecture: [
        { layer: "Frontend", detail: "React web app built with Vite." },
        { layer: "Backend", detail: "Python, Django and Django REST Framework APIs." },
        { layer: "Data", detail: "Supabase." },
        { layer: "AI layer", detail: "LLM integrations built with LangChain behind the insights and the AI coach." },
      ],
      statusNote: "Live at spenddecode.velquix.dev with a free plan; paid plans add more AI chats and statement uploads.",
      applicationCategory: "FinanceApplication",
      sources: [{ label: "SpendDecode website", url: "https://spenddecode.velquix.dev/" }],
      updated: "2026-11-05",
    },
  },
  {
    slug: "velquix-learn",
    name: "Velquix Learn",
    category: "EdTech · Learning Platform",
    tagline: "Structured roadmaps and curated resources for developers.",
    description:
      "A developer learning platform that turns scattered tutorials into a clear path: career roadmaps, curated free resources and playlists, practice projects, and progress tracking.",
    features: [
      "Career roadmaps by stage",
      "Curated resources and YouTube playlists",
      "Learning progress tracking",
      "Streaks and achievement badges",
    ],
    tech: ["Next.js", "React"],
    contribution: "Velquix product — designed and shipped as part of the Velquix product line.",
    status: "Live",
    tier: "featured",
    links: { live: "https://learn.velquix.dev/" },
    image: {
      src: "/images/projects/velquix-learn.webp",
      width: 1200,
      height: 750,
      alt: "Velquix Learn homepage with the headline 'Learn with purpose. Build with confidence.' and a backend developer roadmap card",
    },
    keywords: ["velquix learn", "learn", "edtech", "roadmap", "education", "learning"],
    caseStudy: {
      seoTitle: "Developer Roadmaps Platform",
      seoDescription:
        "Velquix Learn, built by Atharva Sonar under Velquix, turns free tutorials into structured developer roadmaps with practice projects and progress tracking.",
      problem:
        "Learning to code from scattered tutorials makes it hard to know what to learn next. Velquix Learn turns curated free resources into structured career roadmaps, pairs them with practice, and tracks progress along the way.",
      workflow: [
        { title: "Discover", detail: "Pick a career path and set your level." },
        { title: "Follow a roadmap", detail: "A structured path of stages, modules and resources in a sensible order." },
        { title: "Learn from resources", detail: "Curated videos, docs and articles." },
        { title: "Practice", detail: "Module practice tasks, projects and challenges." },
        { title: "Build", detail: "Ship real projects and grow a profile that shows what you can do." },
        { title: "Track progress", detail: "Completion, streaks, XP and badges." },
      ],
      architecture: [
        { layer: "Content model", detail: "Career path → roadmap → stage → module → resource." },
        { layer: "Frontend", detail: "Next.js and React (confirmed from the live site's build output)." },
        { layer: "Delivery", detail: "Served through Cloudflare." },
      ],
      statusNote: "Live and free to start at learn.velquix.dev.",
      applicationCategory: "EducationalApplication",
      sources: [{ label: "Velquix Learn website", url: "https://learn.velquix.dev/" }],
      updated: "2026-11-05",
    },
  },
  {
    slug: "claimblitz",
    name: "ClaimBlitz",
    alternateName: "ClaimBitz",
    category: "Multi-Agent AI",
    tagline: "Nine AI agents that process an insurance claim together.",
    description:
      "A medical insurance claim processor where specialised agents extract, validate, analyse and decide. When analysts disagree, a structured debate and a judge agent settle the verdict, and low-confidence cases are escalated to a human.",
    features: [
      "OCR extraction from claim PDFs",
      "Medical, policy, fraud and risk analysis agents",
      "Debate rounds, voting and a judge agent",
      "Explainable per-agent findings and human escalation",
    ],
    tech: ["Python", "FastAPI", "React", "Groq LLM", "MongoDB", "Pinecone", "Redis", "Celery"],
    contribution: "Built with team Deploy House during OFFGRID 1.0.",
    status: "Live demo",
    tier: "featured",
    hackathon: "OFFGRID 1.0",
    links: {
      live: "https://claimbitz.vercel.app/",
      github: "https://github.com/atharva-404/ClaimBlitz",
    },
    image: {
      src: "/images/projects/claimblitz.webp",
      width: 1200,
      height: 750,
      alt: "ClaimBlitz demo console processing a CMS-1500 claim, with a document preview and the AI agent timeline",
    },
    keywords: ["claimblitz", "claimbitz", "claim", "insurance", "multi-agent", "agents", "agentic", "fraud"],
    caseStudy: {
      seoTitle: "Multi-Agent Claim Processing",
      seoDescription:
        "ClaimBlitz is a multi-agent AI system by Atharva Sonar that reads, validates and judges medical insurance claims with debate, voting and human escalation.",
      problem:
        "Medical insurance claims are usually reviewed step by step, which the project's README puts at 30–90 days. ClaimBlitz has specialised AI agents read, check and decide on a claim in one automated pipeline, and hands uncertain cases to a person.",
      workflow: [
        { title: "Scanner", detail: "Checks that the uploaded document is a valid claim." },
        { title: "OCR", detail: "Extracts 13+ fields from the claim PDF." },
        { title: "Validator", detail: "Checks formats and ICD-10 and CPT code syntax." },
        { title: "Analysts", detail: "Medical, policy, fraud and risk agents each review the claim." },
        { title: "Consensus and debate", detail: "If analysts disagree, up to two debate and voting rounds run; a 3/4 majority wins." },
        { title: "Judge", detail: "A judge agent rules only when there is still no consensus." },
        { title: "Human escalation", detail: "Decisions below 80% confidence go to a human reviewer." },
        { title: "Communication", detail: "A communication agent drafts the email and SMS to the claimant." },
      ],
      architecture: [
        { layer: "Frontend", detail: "React (Vite, Tailwind CSS) agent command centre with live logs, a risk meter and a CMS-1500 document viewer." },
        { layer: "API", detail: "Async FastAPI with JWT auth, role-based access and rate limiting." },
        { layer: "Orchestration", detail: "A supervisor state machine runs the agents; agents exchange typed messages on a message bus." },
        { layer: "Reasoning", detail: "Llama 3.1 8B on Groq through an OpenAI-compatible API." },
        { layer: "Data", detail: "MongoDB for claims, Pinecone for per-agent vector memory (optional) and Redis as a shared blackboard." },
        { layer: "Workers", detail: "Celery for distributed tasks." },
      ],
      decisions: [
        "Groq instead of OpenAI: a free tier, lower latency and the same API format.",
        "MongoDB instead of Postgres, because claims are nested JSON documents.",
        "Analyst agents run one after another to stay inside Groq's 30-requests-per-minute limit.",
        "The judge agent is only called when the analysts disagree.",
        "Each agent's errors are isolated, so one failure does not stop the pipeline.",
        "Each agent keeps its own memory namespace.",
      ],
      statusNote: "Hackathon build with a public demo console at claimbitz.vercel.app.",
      applicationCategory: "BusinessApplication",
      sources: [
        { label: "ClaimBlitz README on GitHub", url: "https://github.com/atharva-404/ClaimBlitz" },
        { label: "ClaimBlitz demo", url: "https://claimbitz.vercel.app/" },
      ],
      updated: "2026-11-05",
    },
  },
  {
    slug: "safeher-ai",
    name: "SafeHer AI",
    category: "AI · Safety Technology",
    tagline: "Proactive personal-safety monitoring with risk scoring.",
    description:
      "A full-stack safety platform that tracks live route context, scores risk with a scikit-learn engine, listens for spoken SOS phrases, and lets an agentic engine recommend or trigger protective actions as risk rises.",
    features: [
      "Live location tracking and safety dashboard",
      "ML risk scoring (time, area, isolation, SOS)",
      "Voice SOS keyword detection",
      "Agentic responses by risk threshold",
      "Safe-route and nearby safe-place lookup",
    ],
    tech: ["TypeScript", "React", "Vite", "Django", "Django REST Framework", "scikit-learn", "Google Maps", "JWT"],
    contribution: "Built with team Deploy House during Build And Grow: AI Hackathon 2.0.",
    status: "Live demo",
    tier: "featured",
    hackathon: "Build And Grow: AI Hackathon 2.0",
    links: {
      live: "https://safeher-ai-five.vercel.app/",
      github: "https://github.com/atharva-404/safeher-ai",
    },
    image: {
      src: "/images/projects/safeher-ai.webp",
      width: 1200,
      height: 750,
      alt: "SafeHer AI landing page reading 'Walk free. Stay protected.' with safety score, risk level and tracking status",
    },
    keywords: ["safeher", "safe her", "safety", "sos", "women", "risk", "voice"],
    caseStudy: {
      seoTitle: "AI Personal Safety Platform",
      seoDescription:
        "SafeHer AI is a personal safety platform by Atharva Sonar with live tracking, scikit-learn risk scoring, voice SOS detection and safe-route suggestions.",
      problem:
        "SafeHer AI helps people move with more confidence by combining live tracking, risk analysis, safe-route intelligence and emergency response in one app, so protective actions can start as risk rises instead of only after an SOS.",
      workflow: [
        { title: "Start tracking", detail: "The user starts a tracked journey." },
        { title: "Send context", detail: "The frontend sends location and context to the tracking API, which validates it." },
        { title: "Score risk", detail: "The risk engine computes a score and the factors behind it." },
        { title: "Respond by threshold", detail: "50+ starts active monitoring, 70+ triggers high-risk recommendations, 85+ runs the full emergency workflow." },
        { title: "Update the dashboard", detail: "The safety score (100 minus risk) and alerts refresh." },
      ],
      architecture: [
        { layer: "Frontend", detail: "React and TypeScript (Vite, Tailwind CSS, shadcn/ui) dashboard with live route tracking." },
        { layer: "API", detail: "Django REST Framework with Simple JWT, split into tracking, agents, alerts, routes and accounts apps." },
        { layer: "Risk engine", detail: "A self-contained scikit-learn model scoring time of day, area type, isolation, location source, SOS status and safe-zone proximity." },
        { layer: "Voice SOS", detail: "Keyword detection for phrases such as \"help\", \"emergency\", \"bachao\" and \"madad\"." },
        { layer: "Maps", detail: "Optional Google Maps APIs for safe routes and nearby hospitals, police and stations." },
        { layer: "Data and hosting", detail: "SQLite or PostgreSQL; frontend on Vercel and backend on Render." },
      ],
      decisions: [
        "The ML risk engine needs no external model file, which keeps it easy to run and deploy.",
        "When Google Maps is unavailable, the app falls back to default safe zones.",
        "Production hardening (stricter access rules, host and CORS settings) is still in progress.",
      ],
      statusNote: "Live demo at safeher-ai-five.vercel.app; core features are complete and production hardening is in progress.",
      applicationCategory: "LifestyleApplication",
      sources: [
        { label: "SafeHer AI README on GitHub", url: "https://github.com/atharva-404/safeher-ai" },
        { label: "SafeHer AI demo", url: "https://safeher-ai-five.vercel.app/" },
      ],
      updated: "2026-11-05",
    },
  },
  {
    slug: "fithub-gym",
    name: "FitHub Gym",
    category: "Full-Stack · AI",
    tagline: "Gym management with a computer-vision rep counter.",
    description:
      "A Django gym platform covering memberships and subscriptions, trainer dashboards and workout videos, plus an AI trainer that counts biceps curls from the webcam using OpenCV and MediaPipe pose tracking over WebSockets.",
    features: [
      "Memberships, subscriptions and Razorpay payments",
      "AI trainer: OpenCV + MediaPipe rep counting",
      "Real-time video over Django Channels",
      "Fitness chatbot and trainer dashboard",
    ],
    tech: ["Python", "Django", "Django Channels", "OpenCV", "MediaPipe", "Razorpay", "OpenAI API"],
    contribution: "Designed and built the full stack.",
    status: "Completed",
    tier: "featured",
    links: { github: "https://github.com/atharva-404/Fitness-Hub-AI-Powered-Web-App" },
    schematic: {
      label: "Platform modules",
      stages: [
        ["Members", "Subscriptions", "Payments"],
        ["Webcam", "Pose model", "Rep counter"],
        ["Trainer dashboard", "Chatbot"],
      ],
    },
    keywords: ["fithub", "fit hub", "gym", "fitness", "opencv", "computer vision", "workout"],
    caseStudy: {
      seoTitle: "AI Gym Management App",
      seoDescription:
        "FitHub Gym is a Django gym management app by Atharva Sonar with memberships, payments, trainers and an OpenCV and MediaPipe AI trainer that tracks reps.",
      problem:
        "Running a gym means managing memberships, payments, trainers and workout guidance in separate places. FitHub Gym (Fitness Hub in the repository) puts them in one Django web app, with a workout video library and an AI trainer that tracks reps from the webcam.",
      architecture: [
        { layer: "Frontend", detail: "HTML5, CSS3, JavaScript and Bootstrap." },
        { layer: "Backend", detail: "Django with OTP-verified sign-in, membership plans, and admin and trainer panels." },
        { layer: "Real time", detail: "Django Channels (WebSockets)." },
        { layer: "AI trainer", detail: "OpenCV and MediaPipe pose estimation for rep tracking and form feedback." },
        { layer: "Chatbot", detail: "OpenAI-powered assistant for workout, diet and membership questions." },
        { layer: "Data and payments", detail: "SQLite in development, PostgreSQL or MySQL in production; Razorpay payments." },
      ],
      statusNote: "Completed. The source code is on GitHub; there is no public deployment.",
      sources: [{ label: "Fitness Hub README on GitHub", url: "https://github.com/atharva-404/Fitness-Hub-AI-Powered-Web-App" }],
      updated: "2026-11-05",
    },
  },
  {
    slug: "finexa",
    name: "Finexa",
    category: "AI Fintech",
    tagline: "The finance platform that came before SpendDecode.",
    description:
      "An earlier AI personal-finance platform: document-based expense extraction, a financial health score, an AI coach, goals and habit challenges. Much of what I learned here shaped SpendDecode.",
    features: ["AI expense extraction", "Financial health score", "AI coach", "Goals and habit challenges"],
    tech: ["TypeScript", "React", "Django", "LangChain", "Gemini", "MongoDB"],
    contribution: "Built with team Deploy House during GHRhack 2.0.",
    status: "Earlier project",
    tier: "earlier",
    hackathon: "GHRhack 2.0",
    links: { github: "https://github.com/atharva-404/Logic_Legion_Finexa" },
    keywords: ["finexa", "earlier", "finance"],
  },
  {
    slug: "finright-ai",
    name: "FinRight AI",
    category: "Fintech",
    tagline: "Personal liquidity and group expense sharing.",
    description:
      "A full-stack financial intelligence platform focused on personal liquidity and group expense sharing.",
    features: ["Group expense sharing", "Liquidity insights"],
    tech: ["React", "Django", "Django REST Framework", "LangChain"],
    contribution: "Built with team Deploy House during MumbaiHacks 2025.",
    status: "Hackathon build",
    tier: "earlier",
    hackathon: "MumbaiHacks 2025",
    links: { github: "https://github.com/atharva-404/FinRight-AI" },
    keywords: ["finright", "fin right", "mumbaihacks"],
  },
  {
    slug: "rag-pdf-assistant",
    name: "RAG PDF Assistant",
    category: "Generative AI",
    tagline: "Chat with a PDF using local embeddings and Gemini.",
    description:
      "A Streamlit RAG app: PDF extraction, overlapping chunks, local sentence-transformer embeddings, FAISS search and Gemini answers grounded in the retrieved text.",
    features: ["Local embeddings", "FAISS similarity search", "Source chunks with page numbers"],
    tech: ["Python", "FAISS", "Sentence Transformers", "Gemini", "Streamlit"],
    contribution: "Built solo to learn RAG end to end.",
    status: "Completed",
    tier: "earlier",
    links: { github: "https://github.com/atharva-404/RAG-PDF-Assistant" },
    keywords: ["rag", "pdf", "retrieval", "faiss", "embeddings"],
  },
];

export const flagshipProject = projects.find((p) => p.tier === "flagship")!;
export const featuredProjects = projects.filter((p) => p.tier === "featured");
export const earlierProjects = projects.filter((p) => p.tier === "earlier");
