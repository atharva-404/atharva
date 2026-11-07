import { Fragment } from "react";
import { ArrowRight, Download, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { ButtonLink } from "@/components/ui/Button";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/icons/BrandIcons";
import { HeroVisual } from "@/components/hero/HeroVisual";
import { cn } from "@/lib/cn";

const headline: { text: string; accent?: boolean; br?: boolean }[] = [
  { text: "Building" },
  { text: "Intelligent", accent: true },
  { text: "Products.", br: true },
  { text: "Engineering" },
  { text: "What's Next.", accent: true },
];

/** Hero copy is server-rendered and animated with CSS, so it paints before hydration. */
export function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="relative overflow-hidden pb-16 pt-28 sm:pt-32 lg:pb-24">
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -right-[20%] -top-[30%] h-[80vmax] w-[80vmax] rounded-full bg-[radial-gradient(circle,rgba(255,107,53,0.13),transparent_60%)]"
        aria-hidden="true"
      />

      <div className="container-site relative grid items-center gap-14 lg:min-h-[calc(100svh-9rem)] lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">
        <div>
          {/* The page's single <h1>: who this is, in plain text for search engines and screen readers. */}
          <h1
            id="hero-title"
            className="rise flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] font-normal uppercase tracking-[0.16em] text-muted sm:text-xs"
          >
            {/* Whitespace text nodes keep the words separated in the plain-text heading; flex ignores them visually. */}
            <span className="pulse-dot" aria-hidden="true" />{" "}
            <span className="text-fg">{profile.name}</span>{" "}
            <span className="text-faint">—</span>{" "}
            {profile.roles.map((role, i) => (
              <Fragment key={role}>
                {i > 0 ? " " : null}
                <span className="flex items-center gap-3">
                  {i > 0 ? (
                    <>
                      <span className="text-faint">·</span>{" "}
                    </>
                  ) : null}
                  {role}
                </span>
              </Fragment>
            ))}
          </h1>

          <p className="font-display-tight mt-7 text-[clamp(2.6rem,6.4vw,5.25rem)] font-semibold">
            {headline.map((word, i) => (
              <span key={word.text}>
                <span
                  className={cn("rise inline-block whitespace-nowrap", word.accent && "text-accent")}
                  style={{ ["--delay" as string]: `${120 + i * 90}ms` }}
                >
                  {word.text}
                </span>
                {word.br ? <br /> : " "}
              </span>
            ))}
          </p>

          <p className="rise mt-8 max-w-xl text-lg leading-relaxed text-muted sm:text-xl" style={{ ["--delay" as string]: "600ms" }}>
            {profile.intro}
          </p>

          <div className="rise mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap" style={{ ["--delay" as string]: "720ms" }}>
            <ButtonLink href="#projects" icon={<ArrowRight size={17} />}>
              Explore My Work
            </ButtonLink>
            <ButtonLink href="#contact" variant="secondary">
              Let&apos;s Connect
            </ButtonLink>
            <ButtonLink
              href={profile.links.resumeDownload}
              variant="ghost"
              external
              icon={<Download size={16} />}
              iconMotion="down"
            >
              Download Resume
            </ButtonLink>
          </div>

          <div className="rise mt-10 flex items-center gap-3" style={{ ["--delay" as string]: "840ms" }}>
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
            <span className="ml-2 hidden font-mono text-xs text-faint sm:inline">{profile.email}</span>
          </div>
        </div>

        <HeroVisual />
      </div>

      <a
        href="#about"
        className="fade-in absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-faint transition-colors hover:text-fg lg:flex"
        style={{ ["--delay" as string]: "1400ms" }}
      >
        Scroll
        <span className="relative h-10 w-px overflow-hidden bg-line-strong" aria-hidden="true">
          <span className="absolute inset-x-0 top-0 h-1/2 bg-accent [animation:scroll-cue_1.8s_ease-in-out_infinite]" />
        </span>
      </a>
    </section>
  );
}
