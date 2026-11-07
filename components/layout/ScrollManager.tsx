"use client";

import { useEffect } from "react";
import { scrollToSection } from "@/lib/scroll";

/**
 * - A fresh load or refresh starts at the hero (browser scroll restoration off).
 * - Shared deep links like /#projects still land on their section.
 * - Every in-page `href="#id"` link scrolls smoothly without leaving a hash behind.
 */
export function ScrollManager() {
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";

    const hash = window.location.hash.slice(1);
    if (hash && document.getElementById(hash)) {
      requestAnimationFrame(() => scrollToSection(hash));
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    }

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element | null)?.closest?.("a[href^='#']");
      if (!anchor) return;
      const id = anchor.getAttribute("href")!.slice(1);
      if (id && scrollToSection(id)) event.preventDefault();
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
