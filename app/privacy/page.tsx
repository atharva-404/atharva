import { profile } from "@/data/profile";
import { SubpageShell } from "@/components/layout/SubpageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/seo/site";
import { privacyGraph } from "@/lib/seo/schema";

const title = "Privacy Policy | Atharva Sonar";
const description =
  "Privacy policy for atharvasonar.me, the portfolio of Atharva Sonar. The site collects no personal data, sets no cookies and runs no analytics.";

export const metadata = pageMetadata({ title, description, path: "/privacy/" });

const UPDATED = "2026-11-07";

export default function PrivacyPage() {
  return (
    <SubpageShell
      eyebrow="Legal"
      title="Privacy Policy"
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Privacy Policy", path: "/privacy/" },
      ]}
    >
      <JsonLd data={privacyGraph(title, description)} />
      <p className="font-mono text-sm text-faint">Last updated: {UPDATED}</p>
      <p>
        This policy describes how <strong>atharvasonar.me</strong>, the personal portfolio of {profile.name}, handles
        information. The short version: <strong>this site does not collect, store or share personal data.</strong>
      </p>

      <h2>1. Information collected</h2>
      <p>None. This is a static website hosted on GitHub Pages. It has no server-side code, no user accounts and no forms.</p>

      <h2>2. Cookies and analytics</h2>
      <p>The site sets no cookies and uses no analytics, tracking pixels, session recording or similar tools.</p>

      <h2>3. Portfolio assistant</h2>
      <p>
        The &quot;Atharva AI&quot; assistant runs entirely in your browser. Questions you type are matched against portfolio
        content on this page; they are not sent anywhere and are cleared when you close or reload the page.
      </p>

      <h2>4. Third parties</h2>
      <ul>
        <li>
          <strong>GitHub Pages</strong> hosts the site and may keep standard server logs (IP address, path, time). See{" "}
          <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener noreferrer">
            GitHub&apos;s privacy statement
          </a>
          .
        </li>
        <li>Fonts are self-hosted with the site, so no requests are made to Google Fonts.</li>
      </ul>

      <h2>5. External links</h2>
      <p>
        Links to GitHub, LinkedIn, X, Google Drive (resume), Velquix and project websites take you to third-party sites with
        their own privacy policies.
      </p>

      <h2>6. Email</h2>
      <p>
        If you email <a href={`mailto:${profile.email}`}>{profile.email}</a>, Namecheap&apos;s email forwarding delivers your
        message to a Gmail inbox. It is used only to reply to you.
      </p>

      <h2>7. Changes</h2>
      <p>If this policy changes, the date at the top of the page will be updated.</p>
    </SubpageShell>
  );
}
