import { Mail } from "lucide-react";
import { navItems, profile } from "@/data/profile";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/icons/BrandIcons";

/** `homeHref` lets sub-pages (About, Privacy) link back to sections on the home page. */
export function Footer({ homeHref = "" }: { homeHref?: string }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-14">
      <div className="container-site">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_auto] md:items-start">
          <div>
            <a href={`${homeHref}#home`} className="inline-flex min-h-[44px] items-center font-display text-[15px] font-bold tracking-[0.04em]">
              ATHARVA<span className="text-accent">.</span>SONAR
            </a>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
              Building intelligent products. Engineering what&apos;s next.
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a href={`${homeHref}#${item.id}`} className="inline-flex min-h-[32px] items-center text-muted transition-colors hover:text-fg">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="GitHub (opens in a new tab)">
              <GitHubIcon />
            </a>
            <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="LinkedIn (opens in a new tab)">
              <LinkedInIcon />
            </a>
            <a href={profile.links.x} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="X (opens in a new tab)">
              <XIcon size={16} />
            </a>
            <a href={`mailto:${profile.email}`} className="icon-btn" aria-label={`Email ${profile.email}`}>
              <Mail size={18} />
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 font-mono text-xs text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {profile.name} · {profile.location}</p>
          {/*
            Plain anchors on purpose: with `output: "export"`, Next 16's segment
            prefetch requests a path the static export doesn't write (404s on
            GitHub Pages). A full page load between static pages is fine.
          */}
          <p className="flex flex-wrap gap-x-5">
            <a href="/about/" className="inline-flex min-h-[40px] min-w-[40px] items-center justify-center transition-colors hover:text-fg">About</a>
            <a href="/projects/" className="inline-flex min-h-[40px] min-w-[40px] items-center justify-center transition-colors hover:text-fg">Projects</a>
            <a href="/faq/" className="inline-flex min-h-[40px] min-w-[40px] items-center justify-center transition-colors hover:text-fg">FAQ</a>
            <a href="/privacy/" className="inline-flex min-h-[40px] min-w-[40px] items-center justify-center transition-colors hover:text-fg">Privacy</a>
            <a href={profile.links.velquix} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[40px] min-w-[40px] items-center justify-center transition-colors hover:text-fg">
              Velquix<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
