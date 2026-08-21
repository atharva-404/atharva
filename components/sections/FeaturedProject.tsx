"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { social } from "@/data/social";

const fingrowTech = ["Python", "Django", "React", "REST APIs", "AI", "RAG", "Gemini", "PostgreSQL", "Supabase", "Razorpay", "FCM"];

const fingrowFeatures = [
  { num: "01", label: "AI Assistant", desc: "RAG-powered financial advisor" },
  { num: "02", label: "Smart Analytics", desc: "Intelligent spending analysis" },
  { num: "03", label: "Goal Tracking", desc: "Build and monitor financial goals" },
  { num: "04", label: "Budget Engine", desc: "Dynamic budget management" },
  { num: "05", label: "Predictions", desc: "AI-powered financial forecasts" },
  { num: "06", label: "Transaction Intel", desc: "Smart transaction classification" },
];

export function FeaturedProject() {
  const [view, setView] = useState<"product" | "engineering">("product");

  return (
    <section id="fingrow" className="section-padding border-t border-[#E2E4E1] bg-[#FAFAF7]" aria-label="FinGrow featured project">
      <div className="container-xl">
        {/* Header */}
        <SectionReveal>
          <div className="flex items-center gap-3 mb-3">
            <p className="label-mono text-[#D97A57]">FLAGSHIP PROJECT</p>
            <span className="status-building text-[10px] px-2 py-0.5 border rounded font-[family-name:var(--font-mono)]">BUILDING</span>
          </div>
          <h2 className="heading-section text-[clamp(2.5rem,7vw,5rem)] text-[#171A19] mb-3">
            Fin<span className="text-[#D97A57]">Grow</span>
          </h2>
          <p className="text-[16px] text-[#626865] max-w-xl leading-[1.65] mb-8">
            A financial intelligence platform designed to help people understand their money,
            analyze spending, build financial goals and make better financial decisions with AI.
          </p>
        </SectionReveal>

        {/* View Toggle */}
        <SectionReveal delay={0.1}>
          <div className="flex gap-2 mb-6 sm:mb-8">
            {(["product", "engineering"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-4 py-2 rounded-lg text-[11px] tracking-[0.06em] font-semibold transition-all font-[family-name:var(--font-mono)] uppercase min-h-[44px] ${
                  view === v
                    ? "bg-[#171A19] text-white"
                    : "border border-[#E2E4E1] text-[#626865] hover:border-[#171A19]/20"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </SectionReveal>

        {view === "product" ? (
          <SectionReveal delay={0.15}>
            {/* Numbered feature list — editorial */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 sm:gap-x-12 gap-y-4 sm:gap-y-6 mb-8 sm:mb-10">
              {fingrowFeatures.map((feat, i) => (
                <motion.div
                  key={feat.num}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex gap-4 items-start py-3 border-b border-[#E2E4E1] last:border-b-0"
                >
                  <span className="text-[11px] text-[#D97A57] font-[family-name:var(--font-mono)] font-medium mt-0.5 flex-shrink-0">{feat.num}</span>
                  <div>
                    <h3 className="font-semibold text-[14px] text-[#171A19] mb-0.5">{feat.label}</h3>
                    <p className="text-[13px] text-[#626865]">{feat.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Dashboard mockup */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="rounded-xl border border-[#E2E4E1] bg-white overflow-hidden"
            >
              <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 border-b border-[#E2E4E1] bg-[#F1F2EF]">
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#E2E4E1]" />
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#E2E4E1]" />
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#E2E4E1]" />
                <div className="flex-1 mx-2 sm:mx-3 h-5 bg-white border border-[#E2E4E1] rounded flex items-center px-2">
                  <span className="text-[9px] sm:text-[10px] text-[#626865] font-[family-name:var(--font-mono)] truncate">fingrow.app/dashboard</span>
                </div>
              </div>

              <div className="p-3 sm:p-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { label: "Monthly Spend", value: "₹XX,XXX", change: "AI tracked", color: "#D97A57" },
                  { label: "Savings Goal", value: "67%", change: "On track", color: "#7FA06F" },
                  { label: "Transactions", value: "XXX", change: "This month", color: "#9588C7" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-[#F1F2EF] rounded-lg p-3 border border-[#E2E4E1]">
                    <p className="label-mono text-[#626865] mb-1">{stat.label}</p>
                    <p className="text-xl font-bold font-[family-name:var(--font-display)]" style={{ color: stat.color }}>{stat.value}</p>
                    <p className="text-[10px] text-[#626865] mt-0.5 font-[family-name:var(--font-mono)]">{stat.change}</p>
                  </div>
                ))}

                <div className="sm:col-span-2 bg-[#F1F2EF] rounded-lg p-3 border border-[#E2E4E1]">
                  <p className="label-mono text-[#626865] mb-2">SPENDING ANALYSIS</p>
                  <div className="flex items-end gap-1 sm:gap-1.5 h-12">
                    {[40, 70, 45, 85, 55, 90, 65, 78, 52, 88, 70, 95].map((h, i) => (
                      <motion.div
                        key={`bar-${i}`}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.03, duration: 0.4 }}
                        className="flex-1 rounded-sm bg-[#D97A57]"
                        style={{ opacity: 0.3 + h / 200 }}
                      />
                    ))}
                  </div>
                </div>

                <div className="bg-[#F1F2EF] rounded-lg p-3 border border-[#E2E4E1]">
                  <p className="label-mono text-[#7FA06F] mb-2">AI ASSISTANT</p>
                  <div className="space-y-1.5">
                    <div className="bg-white rounded p-2 border border-[#E2E4E1]">
                      <p className="text-[11px] text-[#626865]">&ldquo;Your food spending is 23% higher than last month.&rdquo;</p>
                    </div>
                    <div className="bg-[#D97A57]/5 border border-[#D97A57]/10 rounded p-2">
                      <p className="text-[11px] text-[#626865]">You: How can I save more?</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </SectionReveal>
        ) : (
          <SectionReveal delay={0.1}>
            <div className="space-y-3">
              {[
                { layer: "Frontend", tech: "React", desc: "Component-based UI with real-time data updates" },
                { layer: "API Layer", tech: "Django REST Framework", desc: "RESTful APIs with authentication, rate limiting, and serializers" },
                { layer: "AI Engine", tech: "RAG + Gemini", desc: "Retrieval-Augmented Generation for context-aware financial advice" },
                { layer: "Backend", tech: "Django + Celery", desc: "Business logic, background jobs, task queues" },
                { layer: "Database", tech: "PostgreSQL / Supabase", desc: "Relational data model for transactions, goals, budgets" },
                { layer: "Push Notifications", tech: "Firebase FCM", desc: "Real-time alerts and spending notifications" },
                { layer: "Payments", tech: "Razorpay", desc: "Payment gateway integration for premium features" },
              ].map((layer, i) => (
                <motion.div
                  key={layer.layer}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-xl hover:bg-[#F1F2EF] transition-colors group bg-white shadow-[0_1px_3px_rgba(0,0,0,0.03)]"
                >
                  <div className="w-24 flex-shrink-0">
                    <p className="label-mono text-[#626865]/50 mb-0.5">LAYER</p>
                    <p className="text-[13px] font-semibold text-[#D97A57]">{layer.layer}</p>
                  </div>
                  <div className="w-px h-6 bg-[#E2E4E1] hidden sm:block" />
                  <div className="flex-1">
                    <p className="font-medium text-[14px] text-[#171A19] mb-0.5">{layer.tech}</p>
                    <p className="text-[13px] text-[#626865]">{layer.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </SectionReveal>
        )}

        {/* Tech tags + CTAs */}
        <SectionReveal delay={0.3}>
          <div className="mt-8 flex flex-wrap gap-1.5 mb-6">
            {fingrowTech.map((t) => (
              <span key={t} className="text-[10px] px-2.5 py-1 border border-[#E2E4E1] rounded-full font-[family-name:var(--font-mono)] text-[#626865]">
                {t}
              </span>
            ))}
          </div>

          <a
            href={social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex"
          >
            View GitHub (Private)
          </a>
        </SectionReveal>
      </div>
    </section>
  );
}
