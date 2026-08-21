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
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

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
            className="font-[family-name:var(--font-display)] font-bold text-base tracking-tight text-[#171A19] hover:text-[#D97A57] transition-colors cursor-none"
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
                className="text-[13px] tracking-[0.08em] text-[#626865] hover:text-[#171A19] transition-colors font-medium cursor-none"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setCommandOpen(true)}
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 border border-[#E2E4E1] rounded-lg text-[11px] text-[#626865] hover:border-[#D97A57]/40 hover:text-[#D97A57] transition-all font-[family-name:var(--font-mono)] cursor-none"
              aria-label="Open command center (Ctrl+K)"
            >
              <span>⌘</span>
              <span>K</span>
            </button>

            <motion.a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2 bg-[#D97A57] text-white text-[12px] tracking-[0.06em] font-semibold rounded-[8px] hover:bg-[#c46c4b] transition-colors cursor-none"
            >
              LET&apos;S BUILD
            </motion.a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden flex flex-col gap-1.5 p-2 cursor-none"
              aria-label="Toggle mobile menu"
              aria-expanded={mobileOpen}
            >
              <motion.span
                animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 7 : 0 }}
                className="w-5 h-px bg-[#171A19] block origin-center"
              />
              <motion.span
                animate={{ opacity: mobileOpen ? 0 : 1 }}
                className="w-5 h-px bg-[#171A19] block"
              />
              <motion.span
                animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -7 : 0 }}
                className="w-5 h-px bg-[#171A19] block origin-center"
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-[#E2E4E1] bg-[#FAFAF7]/95 backdrop-blur-md"
            >
              <div className="px-6 py-5 flex flex-col gap-3">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => scrollTo(item.href)}
                    className="text-left text-[13px] tracking-[0.08em] text-[#626865] hover:text-[#171A19] transition-colors font-medium cursor-none py-1.5"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
