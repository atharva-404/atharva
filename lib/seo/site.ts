import type { Metadata } from "next";
import { SITE_URL } from "@/data/profile";

/**
 * Site-wide SEO constants and the metadata helper every page uses.
 * Canonical URLs always use https://atharvasonar.me with a trailing slash,
 * matching `trailingSlash: true` in next.config.ts and GitHub Pages' redirects.
 */

export const SITE_NAME = "Atharva Sonar";
export const DEFAULT_OG_IMAGE = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "Atharva Sonar — AI Engineer, Full-Stack Developer & Founder",
};

/** Absolute URL for a site path ("/about/" → "https://atharvasonar.me/about/"). */
export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

interface PageMetaInput {
  /** Full <title>; the root layout template is not applied. */
  title: string;
  description: string;
  /** Path with a trailing slash, e.g. "/projects/spenddecode/". */
  path: string;
  type?: "website" | "profile" | "article";
  image?: { url: string; width: number; height: number; alt: string };
}

/**
 * Builds complete metadata for a page. Next.js replaces (not merges) nested
 * objects like `openGraph`, so each page gets the full set here instead of
 * relying on the root layout.
 */
export function pageMetadata({ title, description, path, type = "website", image = DEFAULT_OG_IMAGE }: PageMetaInput): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      siteName: SITE_NAME,
      locale: "en_IN",
      title,
      description,
      images: [image],
      ...(type === "profile" ? { firstName: "Atharva", lastName: "Sonar" } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: image.url, alt: image.alt }],
    },
  };
}

/**
 * Indexable pages and when their content last changed. Used by app/sitemap.ts;
 * project pages add their own entries from data/projects.ts.
 */
export const staticPages = [
  { path: "/", updated: "2026-11-07", changeFrequency: "monthly", priority: 1 },
  { path: "/about/", updated: "2026-11-07", changeFrequency: "monthly", priority: 0.9 },
  { path: "/projects/", updated: "2026-11-05", changeFrequency: "monthly", priority: 0.9 },
  { path: "/faq/", updated: "2026-11-07", changeFrequency: "monthly", priority: 0.7 },
  { path: "/privacy/", updated: "2026-11-07", changeFrequency: "yearly", priority: 0.2 },
] as const;
