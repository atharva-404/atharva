import { cn } from "@/lib/cn";

const CX = 390;
const CY = 225;

// Deterministic star field so server and client markup match.
const stars = Array.from({ length: 46 }, (_, i) => {
  const a = (i * 137.508 * Math.PI) / 180;
  const r = 120 + ((i * 53) % 150);
  return { x: CX + Math.cos(a) * r, y: CY + Math.sin(a) * r * 0.9, r: i % 5 === 0 ? 1.6 : 1 };
});

/**
 * Lightweight SVG version of the hero orbit. Used on mobile, with reduced
 * motion, without WebGL, and as the placeholder while the 3D scene loads.
 */
export function HeroFallback({ className }: { className?: string }) {
  const spin = { transformOrigin: `${CX}px ${CY}px`, transformBox: "view-box" } as const;

  return (
    <svg viewBox="0 0 600 600" className={cn("absolute inset-0 h-full w-full", className)} aria-hidden="true">
      <defs>
        <radialGradient id="hf-core" cx="38%" cy="32%" r="70%">
          <stop offset="0%" stopColor="#3a3a3a" />
          <stop offset="55%" stopColor="#161616" />
          <stop offset="100%" stopColor="#0a0a0a" />
        </radialGradient>
        <radialGradient id="hf-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff6b35" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#ff6b35" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx={CX} cy={CY} r={190} fill="url(#hf-glow)" />

      {stars.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#fff" opacity={0.35} />
      ))}

      <g className="orbit-slow" style={spin}>
        <ellipse cx={CX} cy={CY} rx={175} ry={58} transform={`rotate(-18 ${CX} ${CY})`} fill="none" stroke="#fff" strokeOpacity={0.14} />
        <circle cx={CX + 166} cy={CY - 72} r={4} fill="#ff6b35" />
      </g>
      <g className="orbit-slower" style={spin}>
        <ellipse cx={CX} cy={CY} rx={215} ry={82} transform={`rotate(24 ${CX} ${CY})`} fill="none" stroke="#fff" strokeOpacity={0.1} />
        <circle cx={CX - 190} cy={CY - 98} r={3.5} fill="#b6f36b" />
      </g>

      <circle cx={CX} cy={CY} r={92} fill="url(#hf-core)" stroke="#fff" strokeOpacity={0.12} />
      <g stroke="#fff" strokeOpacity={0.1} fill="none">
        <ellipse cx={CX} cy={CY} rx={92} ry={34} />
        <ellipse cx={CX} cy={CY} rx={34} ry={92} />
        <path d={`M${CX - 92} ${CY} L${CX} ${CY - 92} L${CX + 92} ${CY} L${CX} ${CY + 92} Z`} />
      </g>
      <circle cx={CX - 30} cy={CY - 36} r={3} fill="#ff6b35" />
      <circle cx={CX + 44} cy={CY + 20} r={2.5} fill="#ff6b35" />
      <circle cx={CX + 8} cy={CY - 70} r={2} fill="#b6f36b" />
    </svg>
  );
}
