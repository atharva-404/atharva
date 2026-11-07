import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { absoluteUrl, staticPages } from "@/lib/seo/site";

// Rendered once at build time into out/sitemap.xml (static export).
export const dynamic = "force-static";

/**
 * Only canonical, indexable HTML pages. `lastModified` comes from the content
 * dates in lib/seo/site.ts and data/projects.ts, not the build time, so it
 * changes only when a page actually changes.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = staticPages.map((p) => ({
    url: absoluteUrl(p.path),
    lastModified: p.updated,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));

  const projectPages = projects
    .filter((p) => p.caseStudy)
    .map((p) => ({
      url: absoluteUrl(`/projects/${p.slug}/`),
      lastModified: p.caseStudy!.updated,
      changeFrequency: "monthly" as const,
      priority: p.tier === "flagship" ? 0.9 : 0.8,
    }));

  return [...pages, ...projectPages];
}
