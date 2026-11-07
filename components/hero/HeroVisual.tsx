"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import { profile } from "@/data/profile";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { cn } from "@/lib/cn";
import { HeroFallback } from "./HeroFallback";
import { heroPointer } from "./pointer";

// three.js only downloads on capable desktop devices, after the page is idle.
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, (v) => v * distance);
}

const labels = [
  { text: "LLM · RAG", className: "left-[2%] top-[14%]", depth: 22, mobile: true },
  { text: "agents.run()", className: "right-[4%] top-[2%]", depth: -16, mobile: false },
  { text: "Django · REST", className: "right-[0%] top-[46%]", depth: 18, mobile: true },
  { text: "React · Next.js", className: "right-[16%] bottom-[39%]", depth: -12, mobile: false },
];

export function HeroVisual() {
  const [mode, setMode] = useState<"static" | "webgl">("static");
  const [sceneReady, setSceneReady] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 60, damping: 18, mass: 0.6 });

  const portraitX = useParallax(sx, -8);
  const portraitY = useParallax(sy, -6);
  const noteX = useParallax(sx, 14);
  const noteY = useParallax(sy, 10);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 768px)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    let cancelIdle: (() => void) | undefined;
    if (desktop && !reduce && supportsWebGL()) {
      if ("requestIdleCallback" in window) {
        const id = window.requestIdleCallback(() => setMode("webgl"), { timeout: 1500 });
        cancelIdle = () => window.cancelIdleCallback(id);
      } else {
        const id = setTimeout(() => setMode("webgl"), 400);
        cancelIdle = () => clearTimeout(id);
      }
    }

    const onMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      heroPointer.x = x;
      heroPointer.y = y;
      mx.set(x);
      my.set(y);
    };
    if (finePointer && !reduce) window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      cancelIdle?.();
      window.removeEventListener("pointermove", onMove);
    };
  }, [mx, my]);

  return (
    // On desktop the visual is capped by the viewport height, so the portrait never falls below the fold.
    <div className="relative mx-auto aspect-square w-full max-w-[600px] lg:mt-2 lg:max-w-[clamp(340px,calc(100svh_-_9rem),600px)] lg:self-start">

      {/* Abstract AI / engineering layer */}
      <div className="absolute -inset-[6%]">
        <div className={cn("absolute inset-0 transition-opacity duration-1000", sceneReady && "opacity-0")}>
          <HeroFallback className="fade-in" />
        </div>
        {mode === "webgl" ? (
          <ErrorBoundary onError={() => setMode("static")}>
            <div className={cn("absolute inset-0 transition-opacity duration-1000", sceneReady ? "opacity-100" : "opacity-0")}>
              <HeroScene onReady={() => setSceneReady(true)} />
            </div>
          </ErrorBoundary>
        ) : null}
      </div>

      {/* Technical labels */}
      {labels.map((label, i) => (
        <Label key={label.text} {...label} delay={900 + i * 120} sx={sx} sy={sy} />
      ))}

      {/* Portrait — the human focal point */}
      <motion.figure
        style={{ x: portraitX, y: portraitY }}
        className="absolute bottom-[2%] left-[2%] w-[58%]"
      >
        <div className="portrait-reveal relative aspect-[3/4] overflow-hidden rounded-[28px] border border-line-strong bg-card shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]">
          <Image
            src={profile.portrait.src}
            alt={profile.portrait.alt}
            width={profile.portrait.width}
            height={profile.portrait.height}
            priority
            sizes="(min-width: 1024px) 320px, 54vw"
            className="h-full w-full object-cover object-[50%_22%] [filter:saturate(0.92)_contrast(1.04)]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/10 to-transparent" aria-hidden="true" />
          <figcaption className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
            <p className="font-display text-base font-semibold leading-tight sm:text-lg">{profile.name}</p>
            <p className="mt-1 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-lime" aria-hidden="true" />
              {profile.location}
            </p>
          </figcaption>
        </div>
      </motion.figure>

      {/* Floating code note (parallax → entrance → float on separate layers so transforms don't clash) */}
      <motion.div
        style={{ x: noteX, y: noteY }}
        className="absolute bottom-[6%] right-[0%] z-10 hidden w-[42%] max-w-[250px] sm:block"
        aria-hidden="true"
      >
        <div className="rise" style={{ ["--delay" as string]: "1100ms" }}>
          <div className="float-y rounded-2xl border border-line bg-card/90 p-4 font-mono text-[11px] leading-relaxed text-muted backdrop-blur-md">
            <div className="mb-2 flex gap-1.5">
              <span className="h-2 w-2 rounded-full bg-white/15" />
              <span className="h-2 w-2 rounded-full bg-white/15" />
              <span className="h-2 w-2 rounded-full bg-accent/80" />
            </div>
            <p><span className="text-accent">const</span> product = <span className="text-lime">await</span> build(idea, {"{"}</p>
            <p className="pl-4">ai: <span className="text-accent">true</span>,</p>
            <p className="pl-4">ship: <span className="text-lime">&quot;soon&quot;</span>,</p>
            <p>{"}"});</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function Label({
  text,
  className,
  depth,
  mobile,
  delay,
  sx,
  sy,
}: {
  text: string;
  className: string;
  depth: number;
  mobile: boolean;
  delay: number;
  sx: MotionValue<number>;
  sy: MotionValue<number>;
}) {
  const x = useParallax(sx, depth);
  const y = useParallax(sy, depth * 0.6);
  return (
    <motion.span
      style={{ x, y }}
      className={cn("absolute z-10", mobile ? "block" : "hidden sm:block", className)}
      aria-hidden="true"
    >
      <span
        className="rise inline-flex items-center rounded-full border border-line bg-bg/70 px-3 py-1.5 font-mono text-[11px] text-muted backdrop-blur-md"
        style={{ ["--delay" as string]: `${delay}ms` }}
      >
        <span className="mr-2 text-accent">◆</span>
        {text}
      </span>
    </motion.span>
  );
}
