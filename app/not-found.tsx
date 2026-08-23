import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 — Page Not Found | Atharva Sonar",
  description: "The page you requested does not exist. Visit the home page or check the site map.",
  robots: { index: false, follow: false },
};

/**
 * Agent-friendly 404 page.
 *
 * Compiled to out/404.html by `next build` (static export).
 * GitHub Pages serves this file with a real HTTP 404 status for any
 * unmatched path, satisfying the "Agent-friendly 404s" requirement.
 *
 * The hidden <pre> block contains a short markdown body so that agents
 * reading the response body can recover — they get the site map, the
 * llms.txt location, and a pointer to the home page.
 */
export default function NotFound() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex" />
        <title>404 — Page Not Found | Atharva Sonar</title>
        <style>{`
          *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
          body{
            background:#171A19;
            color:#FAFAF7;
            font-family:'Outfit',system-ui,-apple-system,sans-serif;
            min-height:100dvh;
            display:flex;
            flex-direction:column;
            align-items:center;
            justify-content:center;
            padding:2rem;
            text-align:center;
          }
          .code{
            font-size:clamp(5rem,20vw,9rem);
            font-weight:800;
            letter-spacing:-0.04em;
            line-height:1;
            color:#D97A57;
            opacity:0.18;
            user-select:none;
          }
          h1{
            font-size:clamp(1.4rem,4vw,2.2rem);
            font-weight:700;
            margin:1rem 0 0.5rem;
            letter-spacing:-0.02em;
          }
          p{color:#626865;font-size:0.95rem;line-height:1.6;max-width:34ch;margin:0 auto 2rem}
          .links{display:flex;flex-wrap:wrap;gap:0.75rem;justify-content:center}
          a{
            display:inline-flex;align-items:center;
            padding:0.6rem 1.25rem;
            border-radius:10px;
            font-size:0.875rem;
            font-weight:600;
            text-decoration:none;
            transition:opacity 0.15s;
          }
          a:hover{opacity:0.8}
          .primary{background:#D97A57;color:#fff}
          .secondary{border:1px solid #3a3f3e;color:#FAFAF7}
          /* Markdown body for agent consumption — visually hidden, semantically present */
          .agent-md{
            position:absolute;
            width:1px;height:1px;
            overflow:hidden;
            clip:rect(0 0 0 0);
            white-space:pre;
          }
        `}</style>
      </head>
      <body>
        {/*
         * AGENT RECOVERY BLOCK — markdown body
         * This content is visually hidden but present in the HTTP response body.
         * Agents that read the 404 response body can use these links to recover.
         */}
        <pre className="agent-md" aria-hidden="true">{`
# 404 — Page Not Found

The path you requested does not exist on https://atharvasonar.me.

## Where to look next

- **Home / Portfolio**: https://atharvasonar.me/
- **About Atharva**: https://atharvasonar.me/about
- **Contact**: https://atharvasonar.me/#contact
- **Privacy Policy**: https://atharvasonar.me/privacy
- **Sitemap (XML)**: https://atharvasonar.me/sitemap.xml
- **Agent instructions (llms.txt)**: https://atharvasonar.me/llms.txt
- **Agent instructions (Markdown)**: https://atharvasonar.me/llms.md

## About this site

Atharva Sonar is a student founder and full-stack software developer from Mumbai, India.
This portfolio showcases his projects, skills, and work — including AI-powered products
like FinGrow, the SafeHer AI safety platform, ClaimBlitz multi-agent claims processor,
and his startup Velquix.

Contact: atharvasonar23@gmail.com
`}</pre>

        <p className="code" aria-hidden="true">404</p>
        <h1>Page Not Found</h1>
        <p>
          The path you requested doesn&apos;t exist. Here are some places to go
          instead.
        </p>
        <nav className="links" aria-label="Recovery navigation">
          <a href="/" className="primary">Go Home</a>
          <a href="/about" className="secondary">About</a>
          <a href="/#contact" className="secondary">Contact</a>
          <a href="/sitemap.xml" className="secondary">Sitemap</a>
          <a href="/llms.txt" className="secondary">llms.txt</a>
        </nav>
      </body>
    </html>
  );
}
