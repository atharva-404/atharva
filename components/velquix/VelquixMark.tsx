"use client";

import { motion, type Variants } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { delay: 0.2 + i * 0.25, duration: 1.4, ease: EASE }, opacity: { delay: 0.2 + i * 0.25, duration: 0.2 } },
  }),
};

const nodes = [
  { x: 60, y: 70, c: "#b6f36b" },
  { x: 200, y: 330, c: "#ff6b35" },
  { x: 340, y: 70, c: "#ff6b35" },
  { x: 130, y: 70, c: "#ffffff" },
  { x: 270, y: 70, c: "#ffffff" },
  { x: 200, y: 200, c: "#b6f36b" },
];

/** Abstract technical "V": construction lines, two strokes and connected nodes. */
export function VelquixMark() {
  return (
    <motion.svg
      viewBox="0 0 400 400"
      className="h-full w-full"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-15%" }}
      aria-hidden="true"
    >
      <g stroke="#fff" strokeOpacity="0.08" fill="none">
        <circle cx="200" cy="200" r="170" />
        <circle cx="200" cy="200" r="120" strokeDasharray="2 6" />
        <line x1="20" y1="70" x2="380" y2="70" />
        <line x1="200" y1="20" x2="200" y2="380" />
      </g>

      <motion.path d="M60 70 L200 330" stroke="#b6f36b" strokeWidth="3" strokeLinecap="round" fill="none" variants={draw} custom={0} />
      <motion.path d="M340 70 L200 330" stroke="#ff6b35" strokeWidth="3" strokeLinecap="round" fill="none" variants={draw} custom={1} />
      <motion.path d="M130 70 L200 200 L270 70" stroke="#fff" strokeOpacity="0.5" strokeWidth="1.5" fill="none" variants={draw} custom={2} />
      <motion.path d="M60 70 L130 70 M270 70 L340 70" stroke="#fff" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="3 5" fill="none" variants={draw} custom={3} />

      {nodes.map((n, i) => (
        <motion.circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={i === 1 ? 7 : 5}
          fill="#080808"
          stroke={n.c}
          strokeWidth="2"
          variants={{ hidden: { scale: 0, opacity: 0 }, visible: { scale: 1, opacity: 1, transition: { delay: 1 + i * 0.1, type: "spring", stiffness: 300, damping: 20 } } }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        />
      ))}
    </motion.svg>
  );
}
