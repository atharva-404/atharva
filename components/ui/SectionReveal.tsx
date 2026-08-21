"use client";

import { useEffect, useRef, ReactNode } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
}

export function SectionReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: SectionRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const controls = useAnimation();

  const initialMap = {
    up: { opacity: 0, y: 60 },
    left: { opacity: 0, x: -60 },
    right: { opacity: 0, x: 60 },
    none: { opacity: 0 },
  };

  const animateMap = {
    up: { opacity: 1, y: 0 },
    left: { opacity: 1, x: 0 },
    right: { opacity: 1, x: 0 },
    none: { opacity: 1 },
  };

  useEffect(() => {
    if (isInView) {
      controls.start(animateMap[direction]);
    }
  }, [isInView, controls, direction]);

  return (
    <motion.div
      ref={ref}
      initial={initialMap[direction]}
      animate={controls}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
