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
        <div className="absolute inset-0 hidden md:block opacity-60">
          <SceneComponent />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 w-full container-xl">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center min-h-screen py-20 sm:py-24 lg:py-0">

          {/* Left: Text */}
          <div className="max-w-2xl">
            {/* Status */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 mb-5 sm:mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#7FA06F]" />
              <span className="label-mono text-[#626865]">
                Building · Learning · Shipping
              </span>
            </motion.div>

            {/* Name — responsive with better mobile sizing */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="heading-display mb-4 sm:mb-5"
            >
              <span className="block text-[clamp(2.5rem,12vw,7.5rem)] text-[#171A19]">ATHARVA</span>
              <span className="block text-[clamp(2.5rem,12vw,7.5rem)] text-[#D97A57]">SONAR</span>
            </motion.h1>

            {/* Typewriter role */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mb-3 sm:mb-4 h-7 flex items-center"
            >
              <span className="text-sm sm:text-base text-[#626865] font-[family-name:var(--font-mono)]">
                {displayed}
                <span className="inline-block w-0.5 h-[18px] bg-[#D97A57] ml-0.5 align-middle animate-[blink_1s_ease-in-out_infinite]" />
              </span>
            </motion.div>

            {/* Statement */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-[clamp(1.05rem,2.2vw,1.4rem)] font-[family-name:var(--font-display)] font-semibold text-[#171A19] mb-2 leading-snug max-w-lg"
            >
              I build ideas into products.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.95 }}
              className="text-[14px] sm:text-[15px] text-[#626865] mb-6 sm:mb-8 max-w-md leading-relaxed"
            >
              Computer Science student, developer and student founder building AI-powered products, full-stack systems and ambitious technology experiments.
            </motion.p>

            {/* Mobile portrait — shown between text and CTAs on small screens */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="lg:hidden mb-6 flex items-center gap-4"
            >
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border border-[#E2E4E1] flex-shrink-0">
                <Image
                  src="/atharva sonar.jpeg"
                  alt="Atharva Sonar"
                  fill
                  className="object-cover object-top"
                  sizes="80px"
                  priority
                />
              </div>
              <div>
                <p className="text-[12px] font-[family-name:var(--font-mono)] text-[#171A19] tracking-[0.1em] font-medium">ATHARVA SONAR</p>
                <p className="text-[10px] text-[#626865] font-[family-name:var(--font-mono)] tracking-wider mt-0.5">STUDENT FOUNDER · DEVELOPER</p>
              </div>
            </motion.div>

            {/* CTAs — full width on mobile, inline on desktop */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <button
                onClick={() => scrollTo("projects")}
                className="btn-primary w-full sm:w-auto"
                id="hero-explore-cta"
              >
                Explore My Work
                <span className="ml-1.5">→</span>
              </button>
              <button
                onClick={() => scrollTo("contact")}
                className="btn-secondary w-full sm:w-auto"
                id="hero-build-cta"
              >
                Let&apos;s Build Something
              </button>
              <a
                href={social.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full sm:w-auto text-center"
                id="hero-resume-cta"
              >
                View Resume
              </a>
            </motion.div>

            {/* ⌘K hint — hidden on mobile */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
              className="mt-6 label-mono text-[#626865]/60 hidden sm:block"
            >
              Press <span className="text-[#D97A57]">Ctrl + K</span> to open Command Center
            </motion.p>
          </div>

          {/* Right: Portrait — desktop only (larger) */}
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

      {/* Scroll indicator — hidden on mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-1.5"
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
