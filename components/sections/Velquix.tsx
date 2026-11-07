import { ArrowUpRight } from "lucide-react";
import { velquix } from "@/data/velquix";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { VelquixMark } from "@/components/velquix/VelquixMark";
import { cn } from "@/lib/cn";

export function Velquix() {
  return (
    <section id="velquix" aria-labelledby="velquix-title" className="relative overflow-hidden border-y border-line bg-bg-2 section-y">
      {/* Oversized outlined wordmark drifting in the background */}
      <p
        className="pointer-events-none absolute -bottom-[0.18em] left-0 select-none whitespace-nowrap font-display text-[clamp(8rem,26vw,24rem)] font-bold leading-none tracking-tighter text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.06)] [animation:float-y_14s_ease-in-out_infinite]"
        aria-hidden="true"
      >
        VELQUIX
      </p>
      <div
        className="pointer-events-none absolute -left-[15%] top-0 h-[60vmax] w-[60vmax] rounded-full bg-[radial-gradient(circle,rgba(182,243,107,0.07),transparent_60%)]"
        aria-hidden="true"
      />

      <div className="container-site relative">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow flex items-center gap-3">
                <span className="text-accent">05</span>
                <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
                <span>Founder</span>
                <span className="rounded-full border border-lime/30 bg-lime/[0.06] px-2.5 py-0.5 text-lime">{velquix.brand}</span>
              </p>
              <h2 id="velquix-title" className="font-display-tight mt-8 text-[clamp(3rem,8vw,6.5rem)] font-semibold">
                Building <span className="text-lime">Beyond</span>
                <br />
                Ideas<span className="text-accent">.</span>
              </h2>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">{velquix.description}</p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={velquix.url} external icon={<ArrowUpRight size={17} />} iconMotion="up-right">
                  Explore Velquix
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="mx-auto w-full max-w-[420px] lg:col-span-5">
            <div className="aspect-square">
              <VelquixMark />
            </div>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow">What Velquix focuses on</p>
            <ol className="mt-6 grid border-t border-line sm:grid-cols-2">
              {velquix.pillars.map((pillar, i) => (
                <li
                  key={pillar.title}
                  className={cn("border-b border-line py-5 sm:pr-6", i % 2 === 1 && "sm:border-l sm:pl-6")}
                >
                  <p className="flex items-baseline gap-3">
                    <span className="font-mono text-[11px] text-accent">0{i + 1}</span>
                    <span className="font-display text-lg font-semibold">{pillar.title}</span>
                  </p>
                  <p className="mt-1 pl-8 text-sm text-faint">{pillar.detail}</p>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="eyebrow">Products</p>
            <ul className="mt-6 space-y-3">
              {velquix.products.map((product) => (
                <li key={product.name}>
                  <a
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-sweep group flex items-center justify-between gap-4 rounded-2xl border border-line bg-bg p-5 transition-colors hover:bg-card"
                  >
                    <span>
                      <span className="flex flex-wrap items-center gap-3">
                        <span className="font-display text-xl font-semibold">{product.name}</span>
                        <span
                          className={cn(
                            "rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em]",
                            product.status === "Live" ? "border-lime/30 text-lime" : "border-accent/30 text-accent",
                          )}
                        >
                          {product.status}
                        </span>
                      </span>
                      <span className="mt-1 block text-sm text-muted">{product.detail}</span>
                    </span>
                    <ArrowUpRight size={20} className="shrink-0 text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" aria-hidden="true" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
