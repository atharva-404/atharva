export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Smoothly scrolls to a section and moves focus there for keyboard and
 * screen-reader users. The URL hash is not kept, so a refresh always
 * starts at the hero.
 */
export function scrollToSection(id: string) {
  const target = document.getElementById(id);
  if (!target) return false;

  const behavior: ScrollBehavior = prefersReducedMotion() ? "auto" : "smooth";
  if (id === "home") {
    window.scrollTo({ top: 0, behavior });
  } else {
    target.scrollIntoView({ behavior, block: "start" });
  }

  if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
  target.focus({ preventScroll: true });

  if (window.location.hash) {
    history.replaceState(null, "", window.location.pathname + window.location.search);
  }
  return true;
}
