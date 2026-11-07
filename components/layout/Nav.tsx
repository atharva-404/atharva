"use client";

import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Mail, Menu, X } from "lucide-react";
import { navItems, profile } from "@/data/profile";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/icons/BrandIcons";
import { cn } from "@/lib/cn";
import { scrollToSection } from "@/lib/scroll";

type SectionId = (typeof navItems)[number]["id"];

function useActiveSection() {
  const [active, setActive] = useState<SectionId>("home");

  useEffect(() => {
    const ids = navItems.map((item) => item.id);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return active;
}

export function Nav() {
  const active = useActiveSection();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  /** Close the menu first (releasing the scroll lock), then scroll on the next frames. */
  const navigate = (event: ReactMouseEvent<HTMLAnchorElement>, id: string) => {
    if (!open) return; // desktop links are handled by ScrollManager
    event.preventDefault();
    setOpen(false);
    requestAnimationFrame(() => requestAnimationFrame(() => scrollToSection(id)));
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile menu: lock scroll, close on Escape or when resizing to desktop.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onResize = () => desktop.matches && setOpen(false);

    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
          scrolled || open
            ? "border-b border-line bg-bg/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <nav aria-label="Main" className="container-site flex h-16 items-center justify-between gap-6">
          <a
            href="#home"
            onClick={(e) => navigate(e, "home")}
            className="inline-flex min-h-[44px] items-center font-display text-[15px] font-bold tracking-[0.04em] text-fg"
            aria-label="Atharva Sonar — back to top"
          >
            ATHARVA<span className="text-accent">.</span>SONAR
          </a>

          <ul className="hidden items-center gap-1 rounded-full border border-line bg-white/[0.02] p-1 lg:flex">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative flex h-9 items-center rounded-full px-4 text-sm font-medium transition-colors",
                      isActive ? "text-fg" : "text-muted hover:text-fg",
                    )}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-full bg-white/[0.08]"
                        transition={{ type: "spring", stiffness: 420, damping: 36 }}
                        aria-hidden="true"
                      />
                    ) : null}
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={profile.links.resumeDownload}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm hidden sm:inline-flex"
            >
              <span>Resume</span>
              <span className="btn-icon" data-motion="down" aria-hidden="true">
                <Download size={15} />
              </span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="icon-btn lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col bg-bg/95 pt-16 backdrop-blur-xl lg:hidden"
          >
            <div className="container-site flex flex-1 flex-col justify-between pb-[max(2rem,env(safe-area-inset-bottom))] pt-8">
              <ul className="flex flex-col">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="border-b border-line"
                  >
                    <a
                      ref={i === 0 ? firstLinkRef : undefined}
                      href={`#${item.id}`}
                      onClick={(e) => navigate(e, item.id)}
                      aria-current={active === item.id ? "true" : undefined}
                      className="flex items-center justify-between py-4 font-display text-[clamp(1.75rem,8vw,2.5rem)] font-semibold tracking-tight"
                    >
                      <span className={active === item.id ? "text-fg" : "text-muted"}>{item.label}</span>
                      <span className="font-mono text-xs text-faint">0{i + 1}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="mt-10 flex flex-col gap-4"
              >
                <a
                  href={profile.links.resumeDownload}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary w-full"
                >
                  <span>Download Resume</span>
                  <Download size={16} aria-hidden="true" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
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
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
