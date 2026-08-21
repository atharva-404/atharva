"use client";

import { useRef, ReactNode, MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  type?: "button" | "submit" | "reset";
  "aria-label"?: string;
}

export function MagneticButton({
  children,
  className = "",
  strength = 30,
  onClick,
  href,
  target,
  rel,
  "aria-label": ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 15, stiffness: 150 });
  const springY = useSpring(y, { damping: 15, stiffness: 150 });

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * (strength / 100));
    y.set((e.clientY - centerY) * (strength / 100));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Tag = href ? "a" : "button";

  return (
    <motion.div style={{ x: springX, y: springY }} className="inline-block">
      <Tag
        ref={ref as any}
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        aria-label={ariaLabel}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`magnetic ${className}`}
      >
        {children}
      </Tag>
    </motion.div>
  );
}
