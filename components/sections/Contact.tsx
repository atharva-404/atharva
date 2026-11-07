import { ArrowUpRight, Download, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { Reveal } from "@/components/ui/Reveal";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/icons/BrandIcons";
import { CopyEmail } from "@/components/contact/CopyEmail";

const channels = [
  { label: "LinkedIn", detail: "Connect professionally", href: profile.links.linkedin, icon: <LinkedInIcon size={20} /> },
  { label: "GitHub", detail: "@atharva-404", href: profile.links.github, icon: <GitHubIcon size={20} /> },
  { label: "X", detail: "@atharva_sonar_", href: profile.links.x, icon: <XIcon size={18} /> },
  { label: "Resume", detail: "Download PDF", href: profile.links.resumeDownload, icon: <Download size={20} /> },
];

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="section-y relative overflow-hidden">
      <div
        className="pointer-events-none absolute left-1/2 top-[30%] h-[70vmax] w-[70vmax] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,107,53,0.12),transparent_55%)]"
        aria-hidden="true"
      />

      <div className="container-site relative">
        <Reveal className="mx-auto max-w-4xl text-center">
          <p className="eyebrow flex items-center justify-center gap-3">
            <span className="text-accent">06</span>
            <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
            <span>Contact</span>
          </p>
          <h2 id="contact-title" className="font-display-tight mt-8 text-[clamp(2.75rem,8vw,6.5rem)] font-semibold">
            Have an <span className="text-accent">Interesting</span> Idea?
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
            Let&apos;s connect, collaborate, or build something meaningful together.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto mt-14 max-w-3xl">
          <div className="card-sweep surface flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <a href={`mailto:${profile.email}`} className="group flex min-w-0 items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-bg transition-transform duration-300 group-hover:scale-105">
                <Mail size={20} aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-faint">Email me</span>
                <span className="block truncate font-display text-[clamp(1.1rem,3.6vw,1.6rem)] font-semibold underline decoration-transparent decoration-2 underline-offset-[6px] transition-colors group-hover:decoration-accent">
                  {profile.email}
                </span>
              </span>
            </a>
            <div className="flex items-center gap-3 self-end sm:self-auto">
              <CopyEmail email={profile.email} />
              <a href={`mailto:${profile.email}`} className="btn btn-primary">
                <span>Say hello</span>
                <span className="btn-icon" data-motion="up-right" aria-hidden="true">
                  <ArrowUpRight size={16} />
                </span>
              </a>
            </div>
          </div>

          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {channels.map((channel) => (
              <li key={channel.label}>
                <a
                  href={channel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full items-center justify-between gap-3 rounded-2xl border border-line bg-card/60 p-5 transition-[border-color,background-color,transform] duration-300 hover:-translate-y-1 hover:border-line-strong hover:bg-card"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-muted transition-colors group-hover:text-fg" aria-hidden="true">
                      {channel.icon}
                    </span>
                    <span>
                      <span className="block font-medium">{channel.label}</span>
                      <span className="block text-xs text-faint">{channel.detail}</span>
                    </span>
                  </span>
                  <ArrowUpRight size={17} className="text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" aria-hidden="true" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
