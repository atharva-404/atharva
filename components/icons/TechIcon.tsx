import type { CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";
import { Bot, Braces, BrainCircuit, FileSearch, Layers, Network, Radio, Sparkles } from "lucide-react";
import {
  siCloudflare, siCplusplus, siCss, siDjango, siDocker, siFastapi, siFirebase, siGit, siGithub,
  siHtml5, siJavascript, siLangchain, siMongodb, siMysql, siNextdotjs, siOpencv, siPostgresql,
  siPostman, siPython, siReact, siRedis, siSqlite, siSupabase, siTailwindcss, siTypescript,
  type SimpleIcon,
} from "simple-icons";
import type { BrandSlug, ConceptIcon, SkillIcon } from "@/data/skills";

const brands: Record<BrandSlug, SimpleIcon> = {
  python: siPython, cplusplus: siCplusplus, javascript: siJavascript, typescript: siTypescript,
  django: siDjango, fastapi: siFastapi,
  react: siReact, nextdotjs: siNextdotjs, html5: siHtml5, css: siCss, tailwindcss: siTailwindcss,
  langchain: siLangchain, opencv: siOpencv,
  postgresql: siPostgresql, mysql: siMysql, mongodb: siMongodb, supabase: siSupabase, sqlite: siSqlite,
  git: siGit, github: siGithub, docker: siDocker, redis: siRedis, firebase: siFirebase,
  cloudflare: siCloudflare, postman: siPostman,
};

const concepts: Record<ConceptIcon, LucideIcon> = {
  sparkles: Sparkles, brain: BrainCircuit, search: FileSearch, bot: Bot,
  network: Network, braces: Braces, radio: Radio, layers: Layers,
};

/** Brand colors that are too dark to read on #080808 fall back to white on hover. */
function readableHex(hex: string) {
  const n = parseInt(hex, 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance < 0.08 ? "#ffffff" : `#${hex}`;
}

/** Sets `--brand` so a parent `group` can color the icon on hover. */
export function techIconStyle(icon: SkillIcon): CSSProperties {
  const color = icon.kind === "brand" ? readableHex(brands[icon.slug].hex) : "var(--color-accent)";
  return { "--brand": color } as CSSProperties;
}

export function TechIcon({ icon, size = 18, className }: { icon: SkillIcon; size?: number; className?: string }) {
  if (icon.kind === "brand") {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true" className={className}>
        <path d={brands[icon.slug].path} />
      </svg>
    );
  }
  const Icon = concepts[icon.name];
  return <Icon size={size} strokeWidth={1.75} aria-hidden="true" className={className} />;
}
