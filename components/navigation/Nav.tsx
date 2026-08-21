"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CommandCenter } from "./CommandCenter";

const navItems = [
  { label: "WORK", href: "#projects" },
  { label: "LAB", href: "#lab" },
  { label: "STACK", href: "#skills" },
  { label: "STORY", href: "#buildlog" },
  { label: "FOUNDER", href: "#founder" },
  { label: "CONTACT", href: "#contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandOpen((v) => !v);
      }
      // Close mobile menu on Escape
      if (e.key === "Escape" && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [mobileOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      <CommandCenter isOpen={commandOpen} onClose={() => setCommandOpen(false)} />

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className={`fixed top-0 left-0 right-0 z-[9980] transition-all duration-300 ${
          scrolled
            ? "bg-[#FAFAF7]/90 backdrop-blur-md border-b border-[#E2E4E1]"
            : "bg-transparent"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container-xl h-14 flex items-center justify-between">
          {/* Brand */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-[family-name:var(--font-display)] font-bold text-base tracking-tight text-[#171A19] hover:text-[#D97A57] transition-colors min-h-[44px] flex items-center"
            aria-label="Scroll to top"
          >
            ATHARVA<span className="text-[#D97A57]">.</span>
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-7">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollTo(item.href)}
                className="text-[13px] tracking-[0.08em] text-[#626865] hover:text-[#171A19] transition-colors font-medium min-h-[44px] flex items-center"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setCommandOpen(true)}
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 border border-[#E2E4E1] rounded-lg text-[11px] text-[#626865] hover:border-[#D97A57]/40 hover:text-[#D97A57] transition-all font-[family-name:var(--font-mono)] min-h-[44px]"
              aria-label="Open command center (Ctrl+K)"
            >
              <span>⌘</span>
              <span>K</span>
            </button>

            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}
              className="items-center px-4 py-2 bg-[#D97A57] text-white text-[12px] tracking-[0.06em] font-semibold rounded-[8px] hover:bg-[#c46c4b] transition-colors min-h-[44px] hidden md:flex"
            >
              LET&apos;S BUILD
            </a>

            {/* Mobile hamburger — 44×44 touch target */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden flex items-center justify-center w-11 h-11 -mr-2"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              <div className="flex flex-col gap-[5px] w-5">
                <motion.span
                  animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 7 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="w-5 h-[1.5px] bg-[#171A19] block origin-center"
                />
                <motion.span
                  animate={{ opacity: mobileOpen ? 0 : 1 }}
                  transition={{ duration: 0.15 }}
                  className="w-5 h-[1.5px] bg-[#171A19] block"
                />
                <motion.span
                  animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -7 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="w-5 h-[1.5px] bg-[#171A19] block origin-center"
                />
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu — fullscreen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[9990] md:hidden bg-[#FAFAF7] flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            {/* Top bar with brand and close */}
            <div className="h-14 flex-shrink-0 flex items-center justify-between px-[clamp(16px,4vw,72px)]">
              <button
                onClick={() => { setMobileOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="font-[family-name:var(--font-display)] font-bold text-base tracking-tight text-[#171A19] min-h-[44px] flex items-center"
                aria-label="Scroll to top"
              >
                ATHARVA<span className="text-[#D97A57]">.</span>
              </button>
              <button
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center w-11 h-11 -mr-2"
                aria-label="Close menu"
              >
                <div className="flex flex-col gap-[5px] w-5">
                  <span className="w-5 h-[1.5px] bg-[#171A19] block origin-center rotate-45 translate-y-[3px]" />
                  <span className="w-5 h-[1.5px] bg-[#171A19] block origin-center -rotate-45 -translate-y-[3px]" />
                </div>
              </button>
            </div>

            <div className="border-b border-[#E2E4E1]" />

            {/* Nav items */}
            <div className="flex-1 flex flex-col justify-center px-8">
              <nav className="space-y-1">
                {navItems.map((item, i) => (
                  <motion.button
                    key={item.label}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04, duration: 0.3 }}
                    onClick={() => scrollTo(item.href)}
                    className="block w-full text-left py-3 text-[clamp(1.5rem,5vw,2rem)] font-[family-name:var(--font-display)] font-bold text-[#171A19] hover:text-[#D97A57] transition-colors min-h-[48px] tracking-tight"
                  >
                    {item.label}
                  </motion.button>
                ))}
              </nav>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.3 }}
                className="mt-8 pt-6 border-t border-[#E2E4E1]"
              >
                <button
                  onClick={() => scrollTo("#contact")}
                  className="w-full py-3.5 bg-[#D97A57] text-white font-semibold text-[14px] tracking-wide rounded-xl hover:bg-[#c46c4b] transition-colors min-h-[48px]"
                >
                  LET&apos;S BUILD
                </button>
              </motion.div>
            </div>

            {/* Bottom label */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="px-8 pb-8"
            >
              <p className="label-mono text-[#626865]/50">
                Press <span className="text-[#D97A57]">Ctrl + K</span> for Command Center
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
