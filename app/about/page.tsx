import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — Atharva Sonar | Student Founder & Software Developer",
  description:
    "Learn about Atharva Sonar — a computer science student, full-stack developer, and student founder from Mumbai, India. Building AI-powered products like FinGrow, SafeHer AI, and ClaimBlitz.",
  alternates: {
    canonical: "https://atharvasonar.me/about",
  },
  openGraph: {
    title: "About Atharva Sonar",
    description:
      "Student founder and full-stack developer from Mumbai building AI-powered products and ambitious technology experiments.",
    url: "https://atharvasonar.me/about",
  },
};

export default function AboutPage() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>About — Atharva Sonar</title>
        <style>{`
          *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
          body{
            background:#FAFAF7;
            color:#171A19;
            font-family:'Outfit',system-ui,-apple-system,sans-serif;
            line-height:1.7;
            padding:0;
          }
          .page{max-width:720px;margin:0 auto;padding:3rem 1.5rem 5rem}
          .back{
            display:inline-flex;align-items:center;gap:0.4rem;
            font-size:0.8rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;
            color:#626865;text-decoration:none;
            font-family:monospace;
            margin-bottom:3rem;
            transition:color 0.15s;
          }
          .back:hover{color:#D97A57}
          .label{
            display:inline-block;
            font-size:0.7rem;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;
            color:#D97A57;font-family:monospace;margin-bottom:1rem;
          }
          h1{
            font-size:clamp(2rem,5vw,3.2rem);font-weight:800;letter-spacing:-0.03em;
            line-height:1.1;margin-bottom:1.5rem;
          }
          h1 span{color:#D97A57}
          h2{
            font-size:1.1rem;font-weight:700;letter-spacing:-0.01em;
            margin:2.5rem 0 0.75rem;color:#171A19;
          }
          p{font-size:0.95rem;color:#626865;margin-bottom:1rem;line-height:1.75}
          p strong{color:#171A19;font-weight:600}
          .tag-row{display:flex;flex-wrap:wrap;gap:0.5rem;margin:1rem 0 2rem}
          .tag{
            padding:0.3rem 0.7rem;border-radius:6px;
            font-size:0.7rem;font-family:monospace;font-weight:600;
            background:#F1F2EF;color:#626865;
            letter-spacing:0.04em;
          }
          .card{
            background:#F1F2EF;border-radius:12px;
            padding:1.25rem 1.5rem;margin-bottom:1rem;
          }
          .card-title{font-size:0.875rem;font-weight:700;color:#171A19;margin-bottom:0.25rem}
          .card-meta{font-size:0.75rem;font-family:monospace;color:#626865}
          .divider{border:none;border-top:1px solid #E2E4E1;margin:2.5rem 0}
          .contact-link{
            display:inline-flex;align-items:center;
            color:#D97A57;text-decoration:none;font-weight:600;font-size:0.9rem;
            margin-right:1.5rem;margin-top:0.5rem;
          }
          .contact-link:hover{text-decoration:underline}
          .nav-links{display:flex;gap:1rem;flex-wrap:wrap;margin-top:3rem}
          .btn{
            display:inline-flex;align-items:center;
            padding:0.6rem 1.25rem;border-radius:10px;
            font-size:0.875rem;font-weight:600;text-decoration:none;
            transition:opacity 0.15s;
          }
          .btn-primary{background:#D97A57;color:#fff}
          .btn-secondary{border:1px solid #E2E4E1;color:#171A19}
          .btn:hover{opacity:0.8}
        `}</style>
      </head>
      <body>
        <main className="page">
          <a href="/" className="back">← Back to Portfolio</a>

          <span className="label">About</span>
          <h1>
            Student Founder &amp; <span>Developer</span>
          </h1>

          <p>
            I&apos;m <strong>Atharva Sonar</strong> — a computer science student,
            full-stack software developer, and student founder from{" "}
            <strong>Mumbai, India</strong>. I&apos;m obsessed with turning ideas
            into real, working products that solve actual problems.
          </p>
          <p>
            I work across backend systems, full-stack web applications, AI-powered
            solutions, and product development. My approach is simple: the best way
            to learn something is to build something real with it.
          </p>

          <div className="tag-row">
            {["Builder", "Founder", "Developer", "AI Enthusiast", "Product Thinker"].map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>

          <hr className="divider" />

          <h2>Education</h2>
          <div className="card">
            <p className="card-title">B.E. — Computer Science &amp; IT</p>
            <p className="card-meta">University of Mumbai · 2025–2028 · Current</p>
          </div>
          <div className="card">
            <p className="card-title">Diploma — Computer Engineering</p>
            <p className="card-meta">KCES College of Engineering, Jalgaon · 2022–2025</p>
          </div>

          <hr className="divider" />

          <h2>What I Build</h2>
          <p>
            My work spans <strong>AI-powered fintech</strong> (FinGrow — an AI financial
            intelligence platform), <strong>safety technology</strong> (SafeHer AI — a
            proactive safety monitoring system with ML risk scoring), and{" "}
            <strong>multi-agent AI systems</strong> (ClaimBlitz — 9 specialized AI agents
            that process insurance claims with debate-based consensus).
          </p>
          <p>
            I&apos;ve shipped full-stack applications using{" "}
            <strong>Python, Django, React, TypeScript</strong>, integrated AI systems
            with <strong>LangChain, Gemini, Groq, and RAG pipelines</strong>, and built
            real-time infrastructure with <strong>WebSockets, Celery, and Docker</strong>.
          </p>

          <hr className="divider" />

          <h2>Velquix</h2>
          <p>
            <strong>Velquix</strong> is my personal product studio — a label for my
            shipped work and ongoing experiments. It&apos;s where I take ideas seriously
            enough to build them, not just prototype them.
          </p>

          <hr className="divider" />

          <h2>Hackathons &amp; Recognition</h2>
          <p>
            I&apos;ve competed in 4 hackathons, building production-quality projects under
            tight constraints. These experiences taught me how to make fast, high-stakes
            product decisions — and how to ship when it matters.
          </p>

          <hr className="divider" />

          <h2>What I&apos;m Looking For</h2>
          <p>
            I&apos;m open to <strong>internships</strong>, freelance projects,
            <strong> technical co-founder conversations</strong>, and collaboration on
            ambitious ideas — especially at the intersection of AI, fintech, and product.
            If you&apos;re building something interesting, let&apos;s talk.
          </p>

          <h2>Contact</h2>
          <p>The fastest way to reach me:</p>
          <div>
            <a href="mailto:atharvasonar23@gmail.com" className="contact-link">
              atharvasonar23@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/atharva-sonar-/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/atharva-404"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              GitHub
            </a>
          </div>

          <div className="nav-links">
            <a href="/" className="btn btn-primary">View Portfolio</a>
            <a href="/privacy" className="btn btn-secondary">Privacy Policy</a>
            <a href="/llms.txt" className="btn btn-secondary">llms.txt</a>
          </div>
        </main>
      </body>
    </html>
  );
}
