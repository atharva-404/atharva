import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

interface SectionHeaderProps {
  index: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
  className?: string;
}

export function SectionHeader({ index, label, title, intro, id, className }: SectionHeaderProps) {
  return (
    <Reveal className={cn("max-w-3xl", className)}>
      <p className="eyebrow flex items-center gap-3">
        <span className="text-accent">{index}</span>
        <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
        <span>{label}</span>
      </p>
      <h2 id={id} className="font-display-tight mt-6 text-[clamp(2.25rem,5.5vw,4.25rem)] font-semibold text-balance-safe">
        {title}
      </h2>
      {intro ? <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{intro}</p> : null}
    </Reveal>
  );
}
