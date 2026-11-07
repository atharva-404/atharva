import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/sections/Footer";

export interface Crumb {
  name: string;
  path: string;
}

/** Shared frame for secondary pages (About, Projects, FAQ, Privacy, 404). */
export function SubpageShell({
  eyebrow,
  title,
  breadcrumbs,
  wide = false,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  /** Visible trail that mirrors the page's BreadcrumbList JSON-LD. */
  breadcrumbs?: Crumb[];
  wide?: boolean;
  children: ReactNode;
}) {
  return (
    <>
      <header className="border-b border-line">
        <div className="container-site flex h-16 items-center justify-between">
          {/* Plain anchors: see the note in eslint.config.mjs about static-export prefetch paths. */}
          <a href="/" className="inline-flex min-h-[44px] items-center font-display text-[15px] font-bold tracking-[0.04em]">
            ATHARVA<span className="text-accent">.</span>SONAR
          </a>
          <a href="/" className="btn btn-ghost btn-sm">
            <ArrowLeft size={16} aria-hidden="true" />
            <span>Back to portfolio</span>
          </a>
        </div>
      </header>
      <main id="main" className="container-site py-16 sm:py-24">
        <div className={wide ? "mx-auto max-w-5xl" : "mx-auto max-w-3xl"}>
          {breadcrumbs ? (
            <nav aria-label="Breadcrumb" className="mb-8 font-mono text-xs text-faint">
              <ol className="flex flex-wrap items-center gap-2">
                {breadcrumbs.map((crumb, i) => {
                  const last = i === breadcrumbs.length - 1;
                  return (
                    <li key={crumb.path} className="flex items-center gap-2">
                      {last ? (
                        <span aria-current="page" className="text-muted">{crumb.name}</span>
                      ) : (
                        <>
                          <a href={crumb.path} className="inline-flex min-h-[32px] items-center transition-colors hover:text-fg">
                            {crumb.name}
                          </a>
                          <span aria-hidden="true">/</span>
                        </>
                      )}
                    </li>
                  );
                })}
              </ol>
            </nav>
          ) : null}
          <p className="eyebrow text-accent">{eyebrow}</p>
          <h1 className="font-display-tight mt-5 text-[clamp(2.5rem,7vw,4.5rem)] font-semibold">{title}</h1>
          <div className="prose-site mt-12">{children}</div>
        </div>
      </main>
      <Footer homeHref="/" />
    </>
  );
}
