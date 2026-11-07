"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

/** Vertical timeline rail that fills in as the visitor scrolls through it. */
export function ScrollLine({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <div ref={ref} className={className} aria-hidden="true">
      <div className="absolute inset-0 bg-line-strong" />
      <motion.div style={{ scaleY }} className="absolute inset-0 origin-top bg-gradient-to-b from-accent via-accent to-lime" />
    </div>
  );
}
