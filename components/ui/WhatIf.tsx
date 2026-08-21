"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { whatIfStatements } from "@/data/education";

export function WhatIf() {
  const [statement, setStatement] = useState<string | null>(null);
  const [key, setKey] = useState(0);

  const trigger = () => {
    const random = whatIfStatements[Math.floor(Math.random() * whatIfStatements.length)];
    setStatement(random);
    setKey((k) => k + 1);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <motion.button
        onClick={trigger}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className="px-5 py-2.5 border border-[#3a3f3e] rounded-full text-[13px] font-[family-name:var(--font-mono)] text-[#626865] hover:border-[#D97A57] hover:text-[#D97A57] transition-all cursor-none"
        aria-label="Reveal a 'What If?' statement"
      >
        <span className="mr-1.5 text-[#D97A57]">◈</span>
        What if?
      </motion.button>

      <AnimatePresence mode="wait">
        {statement && (
          <motion.p
            key={key}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="text-center text-white text-base max-w-sm leading-relaxed"
          >
            &ldquo;{statement}&rdquo;
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
