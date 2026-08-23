import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Atharva Sonar",
  description:
    "Privacy policy for atharvasonar.me — the personal portfolio of Atharva Sonar. This site collects no personal data and uses no tracking cookies.",
  alternates: {
    canonical: "https://atharvasonar.me/privacy",
  },
  openGraph: {
    title: "Privacy Policy — Atharva Sonar",
    description: "Privacy policy for atharvasonar.me. No personal data is collected.",
    url: "https://atharvasonar.me/privacy",
  },
};

export default function PrivacyPage() {
  const updated = "2026-08-23";

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Privacy Policy — Atharva Sonar</title>
        <style>{`
          *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
          body{
            background:#FAFAF7;
            color:#171A19;
            font-family:'Outfit',system-ui,-apple-system,sans-serif;
            line-height:1.7;
          }
          .page{max-width:720px;margin:0 auto;padding:3rem 1.5rem 5rem}
          .back{
            display:inline-flex;align-items:center;gap:0.4rem;
            font-size:0.8rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;
            color:#626865;text-decoration:none;font-family:monospace;
            margin-bottom:3rem;transition:color 0.15s;
          }
          .back:hover{color:#D97A57}
          .label{
            display:inline-block;
            font-size:0.7rem;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;
            color:#D97A57;font-family:monospace;margin-bottom:1rem;
          }
          h1{
            font-size:clamp(1.8rem,4vw,2.8rem);font-weight:800;letter-spacing:-0.03em;
            line-height:1.1;margin-bottom:0.75rem;
          }
          .updated{
            font-size:0.75rem;font-family:monospace;color:#626865;
            margin-bottom:2.5rem;
          }
          h2{
            font-size:1rem;font-weight:700;letter-spacing:-0.01em;
            margin:2rem 0 0.6rem;color:#171A19;
          }
          p{font-size:0.925rem;color:#626865;margin-bottom:0.9rem;line-height:1.75}
          p strong{color:#171A19;font-weight:600}
          ul{margin:0.5rem 0 1rem 1.25rem;color:#626865;font-size:0.925rem}
          li{margin-bottom:0.4rem;line-height:1.7}
          .divider{border:none;border-top:1px solid #E2E4E1;margin:2rem 0}
          a{color:#D97A57;text-decoration:none}
          a:hover{text-decoration:underline}
          .nav-links{display:flex;gap:1rem;flex-wrap:wrap;margin-top:3rem}
          .btn{
            display:inline-flex;align-items:center;
            padding:0.6rem 1.25rem;border-radius:10px;
            font-size:0.875rem;font-weight:600;text-decoration:none;
            transition:opacity 0.15s;
          }
          .btn-primary{background:#D97A57;color:#fff}
          .btn-secondary{border:1px solid #E2E4E1;color:#171A19}
          .btn:hover{opacity:0.8;text-decoration:none}
        `}</style>
      </head>
      <body>
        <main className="page">
          <a href="/" className="back">← Back to Portfolio</a>

          <span className="label">Legal</span>
          <h1>Privacy Policy</h1>
          <p className="updated">Last updated: {updated}</p>

          <p>
            This privacy policy describes how <strong>atharvasonar.me</strong> (the
            &quot;Site&quot;), the personal portfolio of{" "}
            <strong>Atharva Sonar</strong>, handles information when you visit.
          </p>
          <p>
            The short version: <strong>this site does not collect, store, or share any
            personal data about visitors.</strong> There are no tracking cookies,
            no analytics scripts, and no user accounts.
          </p>

          <hr className="divider" />

          <h2>1. Information We Collect</h2>
          <p>
            <strong>None.</strong> This is a static personal portfolio website hosted on
            GitHub Pages. It does not run any server-side code, set cookies, or collect
            any form submissions. No personal information is gathered from visitors.
          </p>

          <h2>2. Cookies</h2>
          <p>
            This site sets <strong>no cookies</strong> of any kind — no session cookies,
            no persistent cookies, and no third-party tracking cookies.
          </p>

          <h2>3. Analytics &amp; Tracking</h2>
          <p>
            This site does <strong>not</strong> use Google Analytics, Plausible, Fathom,
            Mixpanel, or any other analytics or user-tracking service. No behavioral
            data, session recordings, heatmaps, or similar tools are in use.
          </p>

          <h2>4. Third-Party Services</h2>
          <p>The following third-party services may load resources on this page:</p>
          <ul>
            <li>
              <strong>Google Fonts</strong> — used to load the Outfit and Geist typefaces.
              Google may log the request IP address per their standard CDN logging. See{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google&apos;s privacy policy
              </a>
              .
            </li>
            <li>
              <strong>GitHub Pages</strong> — the hosting provider. GitHub may collect
              standard server access logs (IP address, request path, timestamp). See{" "}
              <a
                href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub&apos;s privacy statement
              </a>
              .
            </li>
          </ul>

          <h2>5. External Links</h2>
          <p>
            This site links to external platforms including GitHub, LinkedIn, and Google
            Drive (resume). Clicking these links takes you to third-party websites with
            their own privacy policies. Atharva Sonar is not responsible for the privacy
            practices of those sites.
          </p>

          <h2>6. Contact Form &amp; Email</h2>
          <p>
            This site does not have a contact form. If you email{" "}
            <a href="mailto:atharvasonar23@gmail.com">atharvasonar23@gmail.com</a>{" "}
            directly, your email is handled through Gmail (Google). Any information you
            provide in that email is used only to respond to your inquiry and is not shared
            with third parties.
          </p>

          <h2>7. Children&apos;s Privacy</h2>
          <p>
            This site is not directed at children under 13 years of age and does not
            knowingly collect any information from children.
          </p>

          <h2>8. Changes to This Policy</h2>
          <p>
            If this privacy policy changes in a material way, the &quot;Last updated&quot;
            date at the top of this page will be revised. Since no personal data is
            collected, changes are expected to be infrequent.
          </p>

          <h2>9. Contact</h2>
          <p>
            Questions about this privacy policy? Reach out at{" "}
            <a href="mailto:atharvasonar23@gmail.com">atharvasonar23@gmail.com</a>.
          </p>

          <hr className="divider" />

          <p>
            <strong>Atharva Sonar</strong>
            <br />
            Mumbai, Maharashtra, India
            <br />
            <a href="mailto:atharvasonar23@gmail.com">atharvasonar23@gmail.com</a>
          </p>

          <div className="nav-links">
            <a href="/" className="btn btn-primary">Back to Portfolio</a>
            <a href="/about" className="btn btn-secondary">About</a>
          </div>
        </main>
      </body>
    </html>
  );
}
