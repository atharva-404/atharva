import type { Metadata } from "next";
import { profile } from "@/data/profile";
import { SubpageShell } from "@/components/layout/SubpageShell";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you requested does not exist.",
  robots: { index: false, follow: false },
};

/**
 * Exported as out/404.html; GitHub Pages serves it with a real 404 status.
 * The visually hidden block gives automated agents a plain-text way to recover.
 */
export default function NotFound() {
  return (
    <SubpageShell eyebrow="404" title={<>This page <span className="text-accent">doesn&apos;t exist.</span></>}>
      <p>The link may be old or mistyped. Here are the places worth visiting instead.</p>
      <div className="flex flex-wrap gap-3 pt-2">
        <ButtonLink href="/">Go home</ButtonLink>
        <ButtonLink href="/projects/" variant="secondary">Projects</ButtonLink>
        <ButtonLink href="/#contact" variant="secondary">Contact</ButtonLink>
      </div>

      <pre className="sr-only">{`# 404 — Page Not Found
The requested path does not exist on https://atharvasonar.me.
- Home: https://atharvasonar.me/
- About: https://atharvasonar.me/about/
- Projects: https://atharvasonar.me/projects/
- FAQ: https://atharvasonar.me/faq/
- Contact: https://atharvasonar.me/#contact
- Privacy: https://atharvasonar.me/privacy/
- Sitemap: https://atharvasonar.me/sitemap.xml
- Agent instructions: https://atharvasonar.me/llms.txt
Contact: ${profile.email}`}</pre>
    </SubpageShell>
  );
}
