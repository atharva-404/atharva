# SEO, AEO & GEO strategy — atharvasonar.me

Owner: Atharva Sonar. Last updated: 2026-11-05. Companion to [SEO-AUDIT.md](SEO-AUDIT.md).

Goal: when someone searches "Atharva Sonar", or asks an AI assistant about his work, atharvasonar.me should be the source engines find, understand and cite. Nothing here guarantees a ranking. It maximises the chance of being found and described correctly.

## 1. Entity and keyword strategy

**One identity, spelled the same everywhere:**

| Field | Value |
|---|---|
| Name | Atharva Sonar |
| Website | https://atharvasonar.me/ |
| Roles | AI Engineer · Full-Stack Developer · Founder |
| Company | Velquix (Velquix Dev) — https://www.velquix.dev/ |
| Products | SpendDecode (https://spenddecode.velquix.dev/), Velquix Learn (https://learn.velquix.dev/) |
| Education | B.E. Computer Science & IT, University of Mumbai (2025–2028, current); Diploma in Computer Engineering, KCES College of Engineering & Management, Jalgaon (2022–2025) |
| Location | Mumbai, Maharashtra, India |
| Email | hello@atharvasonar.me (Namecheap forwarding to Gmail) |
| Profiles | https://github.com/atharva-404 · https://www.linkedin.com/in/atharva-sonar-92287b353/ · https://x.com/atharva_sonar_ |
| Photo | https://atharvasonar.me/images/atharva-sonar.jpg (use the same photo on every profile) |

Atharva (Person), Velquix (Organization) and each product (WebApplication) are separate entities with their own `@id`s, so engines don't merge the person with the company.

**Keyword clusters** (each maps to one page, so pages don't compete):

| Cluster | Example queries | Target page |
|---|---|---|
| Branded identity | Atharva Sonar, AtharvaSonar, Atharva Sonar portfolio, Atharva Sonar developer | `/` |
| Branded role and place | Atharva Sonar AI Engineer, Atharva Sonar Full Stack Developer, Atharva Sonar Mumbai | `/`, `/about/` |
| Branded company | Atharva Sonar Velquix, Velquix founder | `/about/`, `/#velquix` |
| Questions | who is Atharva Sonar, what is Velquix, what is SpendDecode | `/faq/` |
| Product | SpendDecode, Velquix Learn, ClaimBlitz, SafeHer AI | `/projects/<slug>/` |
| Non-branded (long term) | multi-agent insurance claim processing, Django React AI finance app, building RAG apps | case studies, future articles |

Non-branded terms like "AI Engineer portfolio" or "Django developer India" are very competitive. They come from published content and links over time, not from metadata.

## 2. Implemented metadata

All pages get their metadata from `pageMetadata()` in `lib/seo/site.ts`: absolute title, description, self-canonical, full Open Graph and Twitter card.

| Path | Title | H1 |
|---|---|---|
| `/` | Atharva Sonar \| AI Engineer, Full-Stack Developer & Founder | Atharva Sonar — AI Engineer · Full-Stack Developer · Founder |
| `/about/` | About Atharva Sonar — AI Engineer & Founder of Velquix | AI Engineer, developer & founder. |
| `/projects/` | Projects by Atharva Sonar — AI, Full-Stack & Fintech | Products and builds by Atharva Sonar. |
| `/projects/spenddecode/` | SpendDecode — AI Personal Finance Platform \| Atharva Sonar | SpendDecode |
| `/projects/velquix-learn/` | Velquix Learn — Developer Roadmaps Platform \| Atharva Sonar | Velquix Learn |
| `/projects/claimblitz/` | ClaimBlitz — Multi-Agent Claim Processing \| Atharva Sonar | ClaimBlitz |
| `/projects/safeher-ai/` | SafeHer AI — AI Personal Safety Platform \| Atharva Sonar | SafeHer AI |
| `/projects/fithub-gym/` | FitHub Gym — AI Gym Management App \| Atharva Sonar | FitHub Gym |
| `/faq/` | Atharva Sonar FAQ — Work, Education, Velquix & Contact | Questions about Atharva Sonar. |
| `/privacy/` | Privacy Policy \| Atharva Sonar | Privacy Policy |

Canonical format: `https://atharvasonar.me/<path>/` (no www, HTTPS, trailing slash). This matches `trailingSlash: true` and GitHub Pages' 301s.

Adding a page:
1. Use `pageMetadata()`.
2. Add a JSON-LD graph from `lib/seo/schema.ts`.
3. Add the path to `staticPages` in `lib/seo/site.ts` with the date its content changed.
4. Run `npm run build && npm run seo:check`.

## 3. Schema inventory

Built in `lib/seo/schema.ts` and rendered with `components/seo/JsonLd.tsx`.

| Entity | `@id` | Where |
|---|---|---|
| Person (Atharva Sonar) | `https://atharvasonar.me/#person` | every page |
| WebSite | `https://atharvasonar.me/#website` | every page |
| Organization (Velquix) | `https://atharvasonar.me/#velquix` | every page (Person.worksFor; footer links to Velquix) |
| ProfilePage | `/#webpage` | `/` |
| AboutPage | `/about/#webpage` | `/about/` |
| CollectionPage + ItemList | `/projects/#webpage` | `/projects/` |
| WebPage + WebApplication + SoftwareSourceCode | `/projects/<slug>/#webpage`, `#software`, `#source` | project pages |
| FAQPage (Question/Answer) | `/faq/#webpage` | `/faq/` |
| BreadcrumbList | `<page>#breadcrumb` | every page except `/`; mirrored by the visible breadcrumb |

Person properties used:
- Identity: `name`, `alternateName` (AtharvaSonar, atharva-404), `givenName`, `familyName`, `url`, `image`, `description`
- Work: `jobTitle` (3 roles), `worksFor` (Velquix), `knowsAbout`
- Contact and location: `email`, `homeLocation`
- Education: `affiliation` (University of Mumbai, current), `alumniOf` (KCES, completed)
- Profiles: `sameAs` (GitHub, LinkedIn)

Deliberately absent: ratings, reviews, prices, download counts, operating systems, awards, certifications, a postal or business address, and LocalBusiness markup.

## 4. Sitemap and robots

- **Sitemap:** https://atharvasonar.me/sitemap.xml is generated by `app/sitemap.ts`. It lists the 10 canonical pages only. `lastmod` comes from content dates; update the date in `lib/seo/site.ts` or a project's `caseStudy.updated` when that page's content changes.
- **robots.txt:** `public/robots.txt`. Crawler names were checked against the official docs on 2026-11-05 ([OpenAI](https://developers.openai.com/api/docs/bots), [Anthropic](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler), [Perplexity](https://docs.perplexity.ai/guides/bots)).

| Group | Agents | Policy | Why |
|---|---|---|---|
| Search and AI search | Googlebot, Bingbot, OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User | Allow | Needed to appear and be cited in Google, Bing/Copilot, ChatGPT search, Claude and Perplexity |
| Model training | GPTBot, ClaudeBot, Google-Extended, CCBot | Allow (separate group) | Public facts about your work in model training help assistants describe you. To opt out of training, change this group to `Disallow: /`. Search visibility is unaffected. |
| Everyone else | `*` | Allow | — |

Notes from the official docs:
- OpenAI and Perplexity say their user-initiated fetchers (ChatGPT-User, Perplexity-User) may not follow robots.txt.
- Changes to robots.txt take about 24 hours to apply.
- Nothing blocks CSS, JS or images.

`llms.txt` (and its copy `llms.md`) is an optional plain-text summary for AI agents. It is not a ranking signal and does not replace any of the above.

## 5. AEO and GEO content

What is in place:
- **Direct answers:** `/faq/` answers the 10 questions from the brief, plus "Is he open to work?", under question headings. The answers are generated from `data/*.ts`, so they can't drift from the rest of the site.
- **First-hand project content:** each case study states the problem, how it works, architecture, stack, documented engineering decisions, status and its sources. Facts come only from the project README or live site.
- **Internal links:** homepage cards → case studies; case studies ↔ each other → `/projects/`; About → each case study and FAQ; footer → About, Projects, FAQ and Privacy on every page.
- **Entity separation:** Person, Velquix and products are distinct schema entities with cross-references.

## 6. Content strategy (engineering journal)

No blog was added, because there are no articles yet and the brief rules out empty placeholders. When the first article is ready, add a `/writing/<slug>/` route with `Article` JSON-LD (author = `#person`, `datePublished`, `dateModified`), and add it to the sitemap and `llms.txt`.

Write each piece from real work. The most valuable first pieces, using what each project already documents:

| Priority | Article | First-hand material to draw on |
|---|---|---|
| 1 | How I built SpendDecode | Statement parsing, the health score, the AI coach, Django + React + Supabase choices |
| 2 | Designing a nine-agent claim pipeline (ClaimBlitz) | Debate and voting design, the judge, Groq rate limits (sequential analysts), escalation below 80% |
| 3 | Lessons from four hackathons with Deploy House | MumbaiHacks 2025, OFFGRID 1.0, GHRhack 2.0, Build And Grow 2.0 |
| 4 | Building a RAG PDF assistant from scratch | Chunking 1000/200, local MiniLM embeddings, FAISS, Gemini grounding, no-OCR limitation |
| 5 | Engineering decisions behind Velquix Learn | The path → stage → module → resource model |
| 6 | From diploma to B.E.: how I learned by building | Your own story |

Each article needs:
- Author and date
- Real screenshots or diagrams
- Links to the related case study
- Sources for any external facts

**Also add "Lessons learned" to each case study.** It was left out because only you can write it. Add a `lessons` field in `data/projects.ts` and it can be rendered the same way as `decisions`.

## 7. Webmaster setup and manual steps

These need your accounts. None of them have been done or verified on your behalf.

1. **Fix HTTPS on www (do this first).**
   1. In Namecheap → Advanced DNS, set `www` to `CNAME atharva-404.github.io.`
   2. In GitHub → repo `atharva-404/atharva` → Settings → Pages, remove and re-add `atharvasonar.me` and wait for the certificate.
   3. Tick **Enforce HTTPS**.
   4. Verify with `curl -I https://www.atharvasonar.me/`. It should return 301 to `https://atharvasonar.me/`.
2. **Deploy:** push to `main`. GitHub Actions builds and publishes `out/`.
3. **Google Search Console:** the site already carries an HTML verification file and a meta tag.
   1. Open the property (prefer a Domain property via a DNS TXT record in Namecheap).
   2. Go to Sitemaps and submit `https://atharvasonar.me/sitemap.xml`.
   3. In URL Inspection, request indexing for `/`, `/about/`, `/projects/`, `/faq/` and each case study.
4. **Bing Webmaster Tools:** sign in → Import from Google Search Console (fastest), or add the site and send me the `msvalidate.01` value to add as a meta tag. Submit the sitemap. This also feeds Copilot and DuckDuckGo.
5. **IndexNow (Bing, Yandex and others):** after each deploy, run `npm run indexnow`. It checks the key file is live, then submits every sitemap URL.
6. **Analytics (optional):**
   - Cloudflare Web Analytics works without Cloudflare DNS: add the site in Cloudflare → Web Analytics and send me the beacon token.
   - It is cookieless, but `/privacy/` currently says "no analytics", so that page must be updated in the same change.
   - Don't add GA4 or Clarity unless you need them; both set cookies and need a consent notice.
7. **Security headers (optional):** GitHub Pages can't set them. Putting Cloudflare's proxy in front would allow HSTS, CSP and longer caching. That requires moving DNS to Cloudflare, and you'd decide it separately.

## 8. Social and external consistency

| Where | Action |
|---|---|
| GitHub profile | Set **Website** to `https://atharvasonar.me/` (currently empty). Suggested bio: "AI Engineer · Full-Stack Developer · Founder of Velquix. Building SpendDecode & Velquix Learn. Python, Django, React, LLMs." |
| GitHub profile README (`atharva-404/atharva-404`) | One-paragraph intro using the same wording as the site, links to atharvasonar.me, SpendDecode, Velquix Learn and LinkedIn |
| Repo "Website" fields | ClaimBlitz → `https://claimbitz.vercel.app/`; safeher-ai → `https://safeher-ai-five.vercel.app/`; others → their case study (e.g. `https://atharvasonar.me/projects/fithub-gym/`) |
| Repo descriptions | `atharva`, `atharva-404`, `nexusai-intern-challenge` and `Healthcare-Backend-WhatBytes` have no description; fill them in (e.g. `atharva`: "Source of atharvasonar.me — Atharva Sonar's portfolio") |
| LinkedIn headline | "AI Engineer · Full-Stack Developer · Founder at Velquix \| Python, Django, React, Generative AI" |
| LinkedIn About and Contact info | Same first sentence as the site's FAQ answer; add `https://atharvasonar.me/` as the website; list Velquix as current experience |
| velquix.dev | Change the founder's LinkedIn in its JSON-LD from `/in/atharva-sonar-/` to `/in/atharva-sonar-92287b353/`; add `"sameAs": ["https://atharvasonar.me/"]` to that Person; add a meta description |
| spenddecode / learn.velquix.dev | Add a footer link "Built by Atharva Sonar" → `https://atharvasonar.me/` |
| Photo | Use the same portrait on GitHub, LinkedIn and the site |

Real authority comes from:
- Hackathon pages and event write-ups that link to you
- Open-source contributions
- Technical articles
- Mentions from real collaborators

Never buy links or create fake profiles.

## 9. Regional relevance

The site states Mumbai, India (location) and the University of Mumbai (education). That covers genuine "Atharva Sonar Mumbai / India / Maharashtra" searches. No LocalBusiness markup, business address or Google Business Profile is used, because there is no qualifying physical business.

If you offer freelance services, tell me which ones, and a `/services/` page can be added for those services only.

## 10. Performance targets

| Metric | Target (field p75) | Current lab result (mobile, simulated) |
|---|---|---|
| LCP | ≤ 2.5 s | 3.4 s on `/`; 2.7–2.8 s on subpages (observed unthrottled: ~0.2–0.3 s) |
| INP | ≤ 200 ms | TBT 100 ms (lab proxy) |
| CLS | ≤ 0.1 | 0 |
| Lighthouse | ≥ 90 in all four categories | `/`: 91 / 100 / 100 / 100 (mobile), 100 / 100 / 100 / 100 (desktop) |

Already in place:
- WebP images with explicit dimensions, and lazy loading below the fold
- Self-hosted fonts with `display: swap`
- three.js loads only on desktop with WebGL, after idle
- The assistant panel is lazy-loaded
- Hero copy is server-rendered

Next levers if field LCP misses the target:
- Pre-generate responsive image sizes
- Trim Framer Motion use above the fold

## 11. Monthly monitoring checklist

Record numbers in a simple sheet each month. Don't estimate what you can't measure.

- [ ] **Search Console → Performance:** total impressions and clicks; top queries; filter queries containing "atharva" (branded) vs. not (non-branded); average position for "Atharva Sonar" and each product name.
- [ ] **Search Console → Pages:** indexed vs. not indexed; investigate any "Crawled – currently not indexed" or "Duplicate" entries.
- [ ] **Search Console → Sitemaps:** last read date, discovered URL count = 10 (or more as pages are added).
- [ ] **Search Console → Core Web Vitals and HTTPS:** any URL group failing.
- [ ] **Bing Webmaster Tools:** same checks, plus IndexNow submissions accepted.
- [ ] **Links:** Search Console → Links: top linking sites (referring domains); note new genuine mentions.
- [ ] **AI referrals:** if analytics is enabled, referrers such as chatgpt.com, perplexity.ai, copilot.microsoft.com, gemini.google.com and claude.ai.
- [ ] **AI answers (manual spot check):** ask ChatGPT (search on), Perplexity, Copilot, Gemini and Claude "Who is Atharva Sonar?" and "What is SpendDecode?". Note whether atharvasonar.me is cited and whether facts are correct. Record exactly what you see; it varies by session.
- [ ] **Run locally:** `npm run build && npm run seo:check` (must be 0 errors) and Lighthouse on `/` and one case study.
- [ ] **Facts:** project statuses, education dates and links in `data/*.ts` are still true; bump `updated` dates for pages you changed.

## 12. Outstanding tasks

| Task | Owner |
|---|---|
| Fix HTTPS on www (§7.1) | Atharva (DNS and GitHub settings) |
| Push to `main`, then submit the sitemap in Search Console and Bing, and run `npm run indexnow` | Atharva |
| Confirm ClaimBlitz naming (ClaimBlitz vs. ClaimBitz) and hackathon (OFFGRID 1.0 vs. DYP Hackathon 2026 in the README) | Atharva |
| GitHub website field, repo descriptions and profile README; LinkedIn headline and website (§8) | Atharva |
| Fix the LinkedIn URL and add sameAs on velquix.dev; add a meta description there | Atharva / Velquix site |
| Write "Lessons learned" for each case study, and the first article (§6) | Atharva |
| Optional: analytics (update `/privacy/` with it), Cloudflare proxy for headers, responsive image sizes | Decide later |
