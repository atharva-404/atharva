"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";

/** Framer Motion skips transform animations when the OS asks for reduced motion. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
