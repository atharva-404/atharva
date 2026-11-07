export const velquix = {
  name: "Velquix",
  brand: "Velquix Dev",
  url: "https://www.velquix.dev/",
  headline: "Building Beyond Ideas.",
  description:
    "Velquix is my technology and product development initiative focused on creating modern software products, AI-powered applications, and digital experiences.",
  pillars: [
    { title: "Software engineering", detail: "Backends, APIs and full-stack systems" },
    { title: "AI-powered applications", detail: "LLMs, retrieval and agents in real products" },
    { title: "SaaS products", detail: "Our own products, built and maintained" },
    { title: "Product development", detail: "From problem framing to launch" },
    { title: "Automation", detail: "Workflows that remove manual work" },
    { title: "Digital innovation", detail: "Experiments worth taking seriously" },
  ],
  products: [
    { name: "Velquix Learn", status: "Live", url: "https://learn.velquix.dev/", detail: "Developer roadmaps & curated learning" },
    { name: "SpendDecode", status: "Live", url: "https://spenddecode.velquix.dev/", detail: "AI financial intelligence" },
  ],
} as const;
