"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { SectionReveal } from "@/components/ui/SectionReveal";

const nodes = [
  { label: "CODE", angle: 0, color: "#D67E5F", icon: "{ }" },
  { label: "AI", angle: 60, color: "#7A9B6A", icon: "◉" },
  { label: "DATABASE", angle: 120, color: "#9B8EC4", icon: "⬡" },
  { label: "API", angle: 180, color: "#EEC97D", icon: "⇄" },
  { label: "DESIGN", angle: 240, color: "#C48B9F", icon: "◈" },
  { label: "USERS", angle: 300, color: "#6B9DAD", icon: "◎" },
];

const transformSteps = [
  { label: "IDEA", color: "#9CA3A3" },
  { label: "→", color: "#E4E7EB" },
  { label: "PRODUCT", color: "#D67E5F" },
  { label: "→", color: "#E4E7EB" },
  { label: "STARTUP", color: "#7A9B6A" },
];

function getPosition(angle: number, radius: number) {
  const rad = ((angle - 90) * Math.PI) / 180;
  return { x: Math.cos(rad) * radius, y: Math.sin(rad) * radius };
}

const RADIUS = 130;

// Individual node
function NodeItem({
  node,
  index,
  scrollYProgress,
}: {
  node: (typeof nodes)[0];
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const pos = getPosition(node.angle, RADIUS);
  const delayStart = 0.1 + (index / nodes.length) * 0.4;
  const delayEnd = Math.min(delayStart + 0.18, 0.6);

  const opacity = useTransform(scrollYProgress, [delayStart, delayEnd], [0, 1]);
  const x = useTransform(scrollYProgress, [delayStart, delayEnd], [0, pos.x]);
  const y = useTransform(scrollYProgress, [delayStart, delayEnd], [0, pos.y]);
  const scale = useTransform(scrollYProgress, [delayStart, delayEnd], [0, 1]);

  return (
    <motion.div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
        opacity,
        scale,
      }}
    >
      <div className="flex flex-col items-center gap-1" style={{ color: node.color }}>
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold border"
          style={{ borderColor: `${node.color}30`, background: `${node.color}08` }}
        >
          {node.icon}
        </div>
        <span className="text-[9px] tracking-widest font-[family-name:var(--font-mono)] font-bold">
          {node.label}
        </span>
      </div>
    </motion.div>
  );
}

// Individual transform step
function TransformStep({
  item,
  index,
  scrollYProgress,
}: {
  item: (typeof transformSteps)[0];
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const start = 0.6 + index * 0.05;
  const end = Math.min(start + 0.08, 0.95);
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const y = useTransform(scrollYProgress, [start, end], [20, 0]);

  return (
    <motion.div
      style={{ opacity, y, color: item.color }}
      className="text-2xl md:text-4xl font-extrabold"
    >
      {item.label}
    </motion.div>
  );
}

export function BuildEngine() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const ideaOpacity = useTransform(scrollYProgress, [0.05, 0.15], [0, 1]);
  const ideaScale = useTransform(scrollYProgress, [0.05, 0.15], [0, 1]);
  const ringOpacity = useTransform(scrollYProgress, [0.1, 0.6], [0, 1]);

  return (
    <section
      ref={ref}
      id="buildengine"
      className="section-padding border-t border-[#E4E7EB] overflow-hidden bg-[#FEFEFE]"
      aria-label="The Build Engine"
    >
      <div className="container-lg mx-auto">
        <SectionReveal>
          <p className="text-[11px] tracking-widest text-[#D67E5F] font-[family-name:var(--font-mono)] mb-4 text-center">
            THE BUILD ENGINE
          </p>
          <h2 className="text-4xl md:text-6xl font-extrabold text-center mb-4 text-[#1D2120]">
            Ideas become <span className="gradient-text">products</span>
            <br />through engineering
          </h2>
          <p className="text-[#6E7171] text-lg text-center mb-16 max-w-xl mx-auto">
            Scroll to watch the assembly.
          </p>
        </SectionReveal>

        <div className="flex flex-col items-center gap-16">
          {/* Assembly visualization */}
          <div className="relative" style={{ width: 320, height: 320 }}>
            {/* Orbit ring */}
            <motion.div
              style={{ opacity: ringOpacity }}
              className="absolute inset-0 rounded-full border border-[#E4E7EB]"
            />

            {/* IDEA at center */}
            <motion.div
              style={{ scale: ideaScale, opacity: ideaOpacity }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="text-center">
                <div className="text-4xl font-extrabold text-[#1D2120]">IDEA</div>
                <div className="w-16 h-px bg-[#D67E5F] mx-auto mt-2" />
              </div>
            </motion.div>

            {/* Nodes */}
            {nodes.map((node, i) => (
              <NodeItem key={node.label} node={node} index={i} scrollYProgress={scrollYProgress} />
            ))}

            {/* Connection lines SVG */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="-160 -160 320 320"
              aria-hidden="true"
            >
              {nodes.map((node) => {
                const pos = getPosition(node.angle, RADIUS);
                return (
                  <motion.line
                    key={node.label}
                    x1={0} y1={0}
                    x2={pos.x} y2={pos.y}
                    stroke={node.color}
                    strokeWidth="0.5"
                    strokeOpacity={0.2}
                    style={{ opacity: ringOpacity }}
                  />
                );
              })}
            </svg>
          </div>

          {/* IDEA → PRODUCT → STARTUP */}
          <div className="flex items-center gap-4 md:gap-6 flex-wrap justify-center">
            {transformSteps.map((item, i) => (
              <TransformStep key={`${item.label}-${i}`} item={item} index={i} scrollYProgress={scrollYProgress} />
            ))}
          </div>

          <SectionReveal delay={0.3}>
            <p className="text-[#6E7171] text-center text-sm max-w-md leading-relaxed font-[family-name:var(--font-mono)]">
              This is the builder&apos;s philosophy — every component of engineering combines to transform an idea into something real.
            </p>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
