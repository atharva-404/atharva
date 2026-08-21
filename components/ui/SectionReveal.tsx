"use client";

import { useEffect, useRef, ReactNode, useMemo } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
}

const initialMap = {
  up: { opacity: 0, y: 40 },
  left: { opacity: 0, x: -40 },
  right: { opacity: 0, x: 40 },
  none: { opacity: 0 },
};

const animateMap = {
  up: { opacity: 1, y: 0 },
  left: { opacity: 1, x: 0 },
  right: { opacity: 1, x: 0 },
  none: { opacity: 1 },
};

export function SectionReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: SectionRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-8%" });
  const controls = useAnimation();

  const target = useMemo(() => animateMap[direction], [direction]);

  useEffect(() => {
    if (isInView) {
      controls.start(target);
    }
  }, [isInView, controls, target]);

  return (
    <motion.div
      ref={ref}
      initial={initialMap[direction]}
      animate={controls}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
