/**
 * Central Schema.org (JSON-LD) builders.
 *
 * Every page emits one @graph. Shared entities (Person, WebSite, Velquix) use
 * stable @id values so search engines can merge them across pages:
 *   https://atharvasonar.me/#person, /#website, /#velquix
 * Only facts that are visible on the site are included: no ratings, prices,
 * awards or invented credentials.
 */
import { education, profile, SITE_URL } from "@/data/profile";
import { projects, type Project } from "@/data/projects";
import { velquix } from "@/data/velquix";
import type { FaqItem } from "@/data/faq";
import { absoluteUrl, SITE_NAME } from "./site";

type Node = Record<string, unknown>;

export const ids = {
  person: `${SITE_URL}/#person`,
  website: `${SITE_URL}/#website`,
  velquix: `${SITE_URL}/#velquix`,
  portrait: `${SITE_URL}/#portrait`,
} as const;

const ref = (id: string) => ({ "@id": id });

const universityOfMumbai = {
  "@type": "CollegeOrUniversity",
  name: "University of Mumbai",
  url: "https://mu.ac.in/",
  sameAs: "https://en.wikipedia.org/wiki/University_of_Mumbai",
};
const kces = { "@type": "CollegeOrUniversity", name: education[1].institution };

export function personNode(): Node {
  return {
    "@type": "Person",
    "@id": ids.person,
    name: profile.name,
    alternateName: ["AtharvaSonar", "atharva-404"],
    givenName: "Atharva",
    familyName: "Sonar",
    url: absoluteUrl("/"),
    image: {
      "@type": "ImageObject",
      "@id": ids.portrait,
      url: absoluteUrl(profile.portrait.fallback),
      contentUrl: absoluteUrl(profile.portrait.fallback),
      width: profile.portrait.width,
      height: profile.portrait.height,
      caption: profile.portrait.alt,
    },
    description:
      "Atharva Sonar is an AI Engineer, Full-Stack Developer and Founder of Velquix who builds AI-powered applications, scalable software systems and digital products.",
    jobTitle: [...profile.roles],
    email: `mailto:${profile.email}`,
    homeLocation: { "@type": "Place", name: "Mumbai, Maharashtra, India" },
    // Currently studying at the University of Mumbai; the diploma is complete.
    affiliation: universityOfMumbai,
    alumniOf: kces,
    worksFor: ref(ids.velquix),
    knowsAbout: [
      "Artificial Intelligence",
      "Generative AI",
      "Agentic AI",
      "Retrieval-Augmented Generation",
      "Machine Learning",
      "AI Automation",
      "Full-Stack Development",
      "Backend Engineering",
      "REST API Development",
      "SaaS Product Development",
      "Fintech Application Development",
      "Python",
      "Django",
      "Django REST Framework",
      "FastAPI",
      "React",
      "Next.js",
      "LangChain",
    ],
    sameAs: [profile.links.github, profile.links.linkedin, profile.links.x],
  };
}

export function websiteNode(): Node {
  return {
    "@type": "WebSite",
    "@id": ids.website,
    name: SITE_NAME,
    alternateName: "atharvasonar.me",
    url: absoluteUrl("/"),
    description: "Official portfolio of Atharva Sonar, AI Engineer, Full-Stack Developer and Founder of Velquix.",
    inLanguage: "en-IN",
    author: ref(ids.person),
    publisher: ref(ids.person),
  };
}

export function velquixNode(): Node {
  return {
    "@type": "Organization",
    "@id": ids.velquix,
    name: velquix.name,
    alternateName: velquix.brand,
    url: velquix.url,
    description: velquix.description.replace("my technology", "Atharva Sonar's technology"),
    founder: ref(ids.person),
  };
}

function webPage(type: string | string[], path: string, name: string, description: string, extra: Node = {}): Node {
  return {
    "@type": type,
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name,
    description,
    inLanguage: "en-IN",
    isPartOf: ref(ids.website),
    ...extra,
  };
}

export function breadcrumbNode(path: string, trail: { name: string; path: string }[]): Node {
  return {
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(path)}#breadcrumb`,
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** Schema node for a project: a WebApplication when it is live, plus its source code when public. */
export function projectNodes(p: Project): Node[] {
  const pagePath = `/projects/${p.slug}/`;
  const appId = `${absoluteUrl(pagePath)}#software`;
  const codeId = `${absoluteUrl(pagePath)}#source`;
  const isVelquix = p.slug === "spenddecode" || p.slug === "velquix-learn";
  const nodes: Node[] = [];

  if (p.links.live) {
    nodes.push({
      "@type": "WebApplication",
      "@id": appId,
      name: p.name,
      ...(p.alternateName ? { alternateName: p.alternateName } : {}),
      url: p.links.live,
      description: p.description,
      ...(p.caseStudy?.applicationCategory ? { applicationCategory: p.caseStudy.applicationCategory } : {}),
      browserRequirements: "Requires a modern web browser with JavaScript enabled.",
      ...(p.image ? { image: absoluteUrl(p.image.src), screenshot: absoluteUrl(p.image.src) } : {}),
      featureList: p.features,
      creator: ref(ids.person),
      ...(isVelquix ? { publisher: ref(ids.velquix) } : {}),
      mainEntityOfPage: ref(`${absoluteUrl(pagePath)}#webpage`),
    });
  }

  if (p.links.github) {
    nodes.push({
      "@type": "SoftwareSourceCode",
      "@id": codeId,
      name: `${p.name} source code`,
      codeRepository: p.links.github,
      description: p.description,
      author: ref(ids.person),
      ...(p.links.live ? { targetProduct: ref(appId) } : {}),
      keywords: p.tech.join(", "),
    });
  }

  return nodes;
}

const graph = (nodes: Node[]) => ({ "@context": "https://schema.org", "@graph": nodes });

/**
 * Person, WebSite and Velquix on every page. The Person references Velquix
 * (worksFor), so Velquix has to be defined wherever the Person is; the
 * affiliation is visible site-wide through the footer's Velquix link.
 */
const sharedEntities = () => [personNode(), websiteNode(), velquixNode()];

/** Homepage: the profile page for Atharva. */
export function homeGraph(title: string, description: string) {
  const featured = projects.filter((p) => p.caseStudy);
  return graph([
    webPage("ProfilePage", "/", title, description, {
      mainEntity: ref(ids.person),
      about: ref(ids.person),
      primaryImageOfPage: ref(ids.portrait),
      dateModified: "2026-11-07",
      hasPart: featured.map((p) => ({ "@type": "WebPage", name: p.name, url: absoluteUrl(`/projects/${p.slug}/`) })),
    }),
    ...sharedEntities(),
  ]);
}

export function aboutGraph(title: string, description: string) {
  return graph([
    webPage("AboutPage", "/about/", title, description, {
      about: ref(ids.person),
      mainEntity: ref(ids.person),
      breadcrumb: ref(`${absoluteUrl("/about/")}#breadcrumb`),
    }),
    breadcrumbNode("/about/", [
      { name: "Home", path: "/" },
      { name: "About", path: "/about/" },
    ]),
    ...sharedEntities(),
  ]);
}

export function projectsIndexGraph(title: string, description: string, list: Project[]) {
  return graph([
    webPage("CollectionPage", "/projects/", title, description, {
      about: ref(ids.person),
      breadcrumb: ref(`${absoluteUrl("/projects/")}#breadcrumb`),
      mainEntity: {
        "@type": "ItemList",
        itemListElement: list.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: p.name,
          url: p.caseStudy ? absoluteUrl(`/projects/${p.slug}/`) : (p.links.live ?? p.links.github),
        })),
      },
    }),
    breadcrumbNode("/projects/", [
      { name: "Home", path: "/" },
      { name: "Projects", path: "/projects/" },
    ]),
    ...sharedEntities(),
  ]);
}

export function projectGraph(p: Project, title: string, description: string) {
  const path = `/projects/${p.slug}/`;
  const nodes = projectNodes(p);
  return graph([
    webPage("WebPage", path, title, description, {
      about: nodes.length ? ref(String(nodes[0]["@id"])) : undefined,
      author: ref(ids.person),
      dateModified: p.caseStudy?.updated,
      breadcrumb: ref(`${absoluteUrl(path)}#breadcrumb`),
      ...(p.image ? { primaryImageOfPage: { "@type": "ImageObject", url: absoluteUrl(p.image.src), caption: p.image.alt } } : {}),
    }),
    breadcrumbNode(path, [
      { name: "Home", path: "/" },
      { name: "Projects", path: "/projects/" },
      { name: p.name, path },
    ]),
    ...nodes,
    ...sharedEntities(),
  ]);
}

export function faqGraph(title: string, description: string, items: FaqItem[]) {
  return graph([
    webPage("FAQPage", "/faq/", title, description, {
      about: ref(ids.person),
      breadcrumb: ref(`${absoluteUrl("/faq/")}#breadcrumb`),
      mainEntity: items.map((q) => ({
        "@type": "Question",
        name: q.question,
        acceptedAnswer: { "@type": "Answer", text: q.answer },
      })),
    }),
    breadcrumbNode("/faq/", [
      { name: "Home", path: "/" },
      { name: "FAQ", path: "/faq/" },
    ]),
    ...sharedEntities(),
  ]);
}

export function privacyGraph(title: string, description: string) {
  return graph([
    webPage("WebPage", "/privacy/", title, description, {
      breadcrumb: ref(`${absoluteUrl("/privacy/")}#breadcrumb`),
    }),
    breadcrumbNode("/privacy/", [
      { name: "Home", path: "/" },
      { name: "Privacy Policy", path: "/privacy/" },
    ]),
    ...sharedEntities(),
  ]);
}
