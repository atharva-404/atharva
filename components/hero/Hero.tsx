"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { social } from "@/data/social";

const roles = [
  "Student Founder",
  "AI Builder",
  "Full Stack Developer",
  "Product Thinker",
];

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [SceneComponent, setSceneComponent] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    setMounted(true);
    import("@/components/3d/BuildersUniverse").then((mod) => {
      setSceneComponent(() => mod.BuildersUniverse);
    });
  }, []);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: NodeJS.Timeout;
    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 70);
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2500);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 35);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIndex]);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#FAFAF7]"
      aria-label="Hero section"
    >
      {/* 3D scene — desktop only */}
      {mounted && SceneComponent && (
        <div className="absolute inset-0 md:block hidden opacity-60">
          <SceneComponent />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 w-full container-xl">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-16 items-center min-h-screen py-24 lg:py-0">

          {/* Left: Text */}
          <div className="max-w-2xl">
            {/* Status */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#7FA06F]" />
              <span className="label-mono text-[#626865]">
                Building · Learning · Shipping
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="heading-display mb-5"
            >
              <span className="block text-[clamp(3.2rem,9vw,7.5rem)] text-[#171A19]">ATHARVA</span>
              <span className="block text-[clamp(3.2rem,9vw,7.5rem)] text-[#D97A57]">SONAR</span>
            </motion.h1>

            {/* Typewriter role */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mb-4 h-7 flex items-center"
            >
              <span className="text-base text-[#626865] font-[family-name:var(--font-mono)]">
                {displayed}
                <span className="inline-block w-0.5 h-[18px] bg-[#D97A57] ml-0.5 align-middle animate-[blink_1s_ease-in-out_infinite]" />
              </span>
            </motion.div>

            {/* Statement */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-[clamp(1.1rem,2.2vw,1.4rem)] font-[family-name:var(--font-display)] font-semibold text-[#171A19] mb-2 leading-snug max-w-lg"
            >
              I build ideas into products.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.95 }}
              className="text-[15px] text-[#626865] mb-8 max-w-md leading-relaxed"
            >
              Student founder building AI-powered products, full-stack systems, and ambitious technology experiments.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="flex flex-wrap gap-3"
            >
              <button
                onClick={() => scrollTo("projects")}
                className="px-5 py-2.5 bg-[#D97A57] text-white font-medium text-[13px] tracking-wide rounded-[10px] hover:bg-[#c46c4b] transition-colors cursor-none"
                id="hero-explore-cta"
              >
                Explore My Work
              </button>
              <button
                onClick={() => scrollTo("contact")}
                className="px-5 py-2.5 border border-[#E2E4E1] text-[#626865] font-medium text-[13px] rounded-[10px] hover:border-[#D97A57] hover:text-[#171A19] transition-all cursor-none"
                id="hero-build-cta"
              >
                Let&apos;s Build Something
              </button>
              <a
                href={social.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 border border-[#E2E4E1] text-[#626865] font-medium text-[13px] rounded-[10px] hover:border-[#E2E4E1] hover:text-[#171A19] transition-all cursor-none"
                id="hero-resume-cta"
              >
                View Resume
              </a>
            </motion.div>

            {/* ⌘K hint */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
              className="mt-6 label-mono text-[#626865]/60"
            >
              Press <span className="text-[#D97A57]">Ctrl + K</span> to open Command Center
            </motion.p>
          </div>

          {/* Right: Portrait */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="hidden lg:flex flex-col items-center gap-3"
          >
            <div className="relative">
              <div className="relative w-52 h-52 xl:w-60 xl:h-60 rounded-2xl overflow-hidden border border-[#E2E4E1]">
                <Image
                  src="/atharva sonar.jpeg"
                  alt="Atharva Sonar"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1280px) 208px, 240px"
                  priority
                />
              </div>
            </div>

            <div className="text-center">
              <p className="label-mono text-[#171A19] tracking-[0.14em]">ATHARVA SONAR</p>
              <p className="text-[10px] text-[#626865] font-[family-name:var(--font-mono)] tracking-widest mt-0.5">STUDENT FOUNDER · DEVELOPER</p>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="w-4 h-7 border border-[#E2E4E1] rounded-full flex justify-center pt-1.5"
        >
          <div className="w-0.5 h-1.5 bg-[#D97A57] rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
