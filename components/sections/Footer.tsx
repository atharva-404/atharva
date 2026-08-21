"use client";

import { social } from "@/data/social";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#2a2f2e] bg-[#171A19]" aria-label="Footer">
      <div className="container-xl py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-base font-[family-name:var(--font-display)] font-bold text-white mb-0.5">
              ATHARVA<span className="text-[#D97A57]">.</span>
            </p>
            <p className="text-[13px] text-[#626865]">Student Founder &amp; Developer</p>
          </div>

          <div className="flex flex-wrap gap-5">
            {[
              { label: "GitHub", href: social.github },
              { label: "LinkedIn", href: social.linkedin },
              { label: "Email", href: `mailto:${social.email}` },
              { label: "Resume", href: social.resume },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                className="text-[13px] text-[#626865] hover:text-white transition-colors cursor-none"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[#2a2f2e] flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-[#626865] font-[family-name:var(--font-mono)]">
            Built with curiosity, code and too many ideas.
          </p>
          <p className="text-[11px] text-[#626865] font-[family-name:var(--font-mono)]">
            © {year} Atharva Sonar
          </p>
        </div>
      </div>
    </footer>
  );
}
