# SEO audit — atharvasonar.me

Audit date: 2026-11-05. Scope: the repository (`d:\Atharva-Sonar-Portfolio`, Next.js 16 static export) and the live site at https://atharvasonar.me/.

All results below come from tools that were actually run: `npm run seo:check` (repo script), a Schema.org vocabulary check against the official `schemaorg-current-https.jsonld`, Lighthouse 12 (Edge, headless), Playwright screenshots, and `curl` against the live site. Nothing is assumed.

## 1. Hosting: what is actually deployed

The brief says Cloudflare Pages. The live site is **GitHub Pages**, not Cloudflare:

| Check | Result |
|---|---|
| `Server` header on https://atharvasonar.me/ | `GitHub.com` (Fastly cache, `x-github-request-id`) |
| Apex A records | 185.199.108–111.153 (GitHub Pages) |
| DNS host | Namecheap (`dns1/dns2.registrar-servers.com`) |
| Deploy pipeline | `.github/workflows/deploy.yml` builds `out/` and deploys with `actions/deploy-pages` on push to `main` |
| Custom domain | `public/CNAME` → `atharvasonar.me` |

Consequences:
- Cloudflare-only files (`_headers`, `_redirects`) would do nothing here, so none were added.
- GitHub Pages has no preview deployments. `https://atharva-404.github.io/atharva/` returns **301 → https://atharvasonar.me/**, so there is no duplicate production site.
- Response headers (HSTS, CSP, cache lifetime) cannot be configured on GitHub Pages. See §4.

## 2. Original problems and fixes

Severity: **High** = blocks discovery or breaks a URL; **Medium** = weakens ranking, entity understanding or snippets; **Low** = polish; **Info** = no action needed.

| # | Issue | Severity | Affected | Fix | Status |
|---|---|---|---|---|---|
| 1 | `https://www.atharvasonar.me/` fails TLS (`SEC_E_WRONG_PRINCIPAL`). HTTP www redirects correctly, but HTTPS www links break. | High | DNS / GitHub Pages | Point `www` CNAME at `atharva-404.github.io`, then re-save the custom domain in GitHub → Settings → Pages so GitHub issues a certificate covering www. See SEO-STRATEGY.md §7. | **Open (manual)** |
| 2 | Only 3 indexable pages; no page per project, so search and AI engines had little first-hand project content to cite | High | site structure | Added `/projects/` and five case studies (`/projects/spenddecode/`, `velquix-learn`, `claimblitz`, `safeher-ai`, `fithub-gym`): problem, workflow, architecture, stack, documented decisions, status, sources | Fixed |
| 3 | No direct-answer content for "who is / what is" questions | Medium | AEO | Added `/faq/`, 11 question headings with factual answers generated from the data files, plus FAQPage JSON-LD | Fixed |
| 4 | `/about/` and `/privacy/` had no `og:image` or `og:type`. Next.js replaces the layout's `openGraph` object instead of merging it. | Medium | about, privacy | `pageMetadata()` in `lib/seo/site.ts` gives every page a complete OG and Twitter set | Fixed |
| 5 | Generic titles (`About \| Atharva Sonar`, `Privacy Policy \| Atharva Sonar`) | Medium | about | Unique, descriptive titles on every page (table in SEO-STRATEGY.md §2) | Fixed |
| 6 | Homepage meta description was 178 characters (truncated in results) | Low | `/` | Rewritten to 158 characters | Fixed |
| 7 | Homepage `<h1>` was the slogan ("Building Intelligent Products…") and did not contain the name | Medium | `components/sections/Hero.tsx` | The role line is now the `<h1>`: "Atharva Sonar — AI Engineer · Full-Stack Developer · Founder". Same styling; the name was added. The slogan is now a `<p>` with identical visuals. | Fixed |
| 8 | The same JSON-LD graph was on every page, including a `ProfilePage` whose `url` was the homepage on `/about/` and `/privacy/` | Medium | `app/layout.tsx` | Central builders in `lib/seo/schema.ts`; each page now has its own page node (ProfilePage, AboutPage, CollectionPage, FAQPage or WebPage) | Fixed |
| 9 | `Person.founder` used (not a Person property in Schema.org) | Medium | JSON-LD | Removed. `Organization.founder` → Person and `Person.worksFor` → Velquix | Fixed |
| 10 | Velquix's website listed in `Person.sameAs` (sameAs is for profiles of the same entity) | Low | JSON-LD | `sameAs` now lists GitHub and LinkedIn only; Velquix is its own Organization node | Fixed |
| 11 | `alumniOf: University of Mumbai`, though he is a current student | Low | JSON-LD | University of Mumbai → `affiliation` (with `sameAs` Wikipedia and `url` mu.ac.in). The completed diploma institution stays `alumniOf`. | Fixed |
| 12 | `PostalAddress` on Person looked like a business address | Low | JSON-LD | Replaced with `homeLocation: Place "Mumbai, Maharashtra, India"`, matching the visible "Mumbai, India" | Fixed |
| 13 | Project schema used free-text `applicationCategory` labels, and `url` pointed at GitHub | Low | JSON-LD | `WebApplication` (live apps, Schema.org category values) and `SoftwareSourceCode` (`codeRepository`) per project page | Fixed |
| 14 | Static `public/sitemap.xml` missed new pages and listed `llms.txt` (not a page) | Medium | sitemap | `app/sitemap.ts` generates the sitemap at build from the page registry and project data; `lastmod` = content date, not build date | Fixed |
| 15 | `robots.txt` had no crawler policy (single `*` group) | Low | robots | Explicit groups: search and AI-search crawlers; training crawlers kept separate; sitemap reference | Fixed |
| 16 | `<meta name="keywords">` list | Info | layout | Removed. Google and Bing ignore it, and it reads as stuffing. | Fixed |
| 17 | SpendDecode labelled "Private preview", but the live site now offers free sign-up and plans | Medium | data, llms.txt | Status → Live in all data files, assistant answers and llms.txt | Fixed |
| 18 | FinRight AI tech listed as "Python, React"; README lists React, Django, DRF, LangChain | Low | `data/projects.ts` | Corrected | Fixed |
| 19 | Underlined text links missing in prose; Lighthouse `link-in-text-block` failure (accessibility 96) | Low | `.prose-site` CSS | Prose links underlined (accent at 40%) | Fixed |
| 20 | No IndexNow key or submission path for Bing | Low | — | Key file `public/e05cec52ee6a3bd754b77c409fd7b918.txt` plus `npm run indexnow` | Fixed (run after deploy) |
| 21 | No repeatable SEO validation | Medium | — | `npm run seo:check`: titles, descriptions, canonical, OG/Twitter, single h1, heading order, alt text, JSON-LD parse, internal links and anchors, sitemap vs. indexability, robots | Fixed |
| 22 | No security headers (HSTS, CSP, X-Content-Type-Options); `Cache-Control: max-age=600` on all assets | Low | GitHub Pages | Not configurable on GitHub Pages. Added `<meta name="referrer" content="strict-origin-when-cross-origin">`. Options in SEO-STRATEGY.md §7. | Limitation |
| 23 | `next/image` runs with `unoptimized: true` (static export), so there is no responsive `srcset`. Lighthouse estimates 24 KiB (mobile) to 158 KiB (desktop) of savings. | Low | images | Images are already WebP with explicit width/height and lazy loading below the fold. Pre-generating sizes is optional. | Open (optional) |
| 24 | velquix.dev's own JSON-LD lists Atharva's LinkedIn as `/in/atharva-sonar-/` (different from the verified `/in/atharva-sonar-92287b353/`); velquix.dev has no meta description | Medium | external site | Fix on velquix.dev (SEO-STRATEGY.md §8) | **Open (external)** |
| 25 | GitHub profile has no website field set | Medium | github.com/atharva-404 | Set "Website" to `https://atharvasonar.me/` | **Open (manual)** |
| 26 | Naming mismatch: the demo brands itself "ClaimBitz", and the ClaimBlitz README says "Built for DYP Hackathon 2026" while the site says OFFGRID 1.0 | Low | ClaimBlitz | Kept "ClaimBlitz" and OFFGRID 1.0 as you stated them; added `alternateName: ClaimBitz` in schema | **Needs your confirmation** |

Checks that passed before any change (no action needed):

| Check | Result |
|---|---|
| HTTP → HTTPS | `http://atharvasonar.me/` → 301 → `https://atharvasonar.me/` |
| Trailing slash | `/about` → 301 → `/about/`; canonicals use the trailing-slash form |
| Query strings | `/?utm_source=x` → 200 with canonical `https://atharvasonar.me/` |
| 404 | Unknown paths return a real 404; 404 page is `noindex` |
| Rendering | All content is server-rendered into static HTML (checked with scripts stripped) |
| Google verification | `googlea9b30e1069863666.html` returns 200; `google-site-verification` meta present |
| Crawler access (live) | Googlebot, Bingbot, OAI-SearchBot, ChatGPT-User, GPTBot, Claude-SearchBot, Claude-User, ClaudeBot, PerplexityBot, Perplexity-User all get 200 on `/`, `/robots.txt` and `/sitemap.xml` (no WAF or bot challenge) |
| Alt text | Every `<img>` has descriptive alt text and explicit dimensions |

## 3. Validation results after the changes

### `npm run seo:check` (built `out/`)

| | Before | After |
|---|---|---|
| Indexable HTML pages | 3 | 10 |
| Sitemap URLs | 4 (incl. llms.txt) | 10 (pages only) |
| Errors | 4 on real pages (missing og:image/og:type on about and privacy), plus 10 from treating the Google verification file as a page | **0** |
| Warnings | description length on `/` | **0** |

Every page has a unique title and description, one `<h1>`, a self-referencing canonical, a complete OG and Twitter set, valid JSON-LD, and no broken internal links or anchors.

### Schema.org vocabulary check

Every `@type` exists. Every property is allowed on its type, including inherited types. Every `@id` reference resolves on its page. **0 issues across 10 pages.**

The public validator.schema.org endpoint now returns an HTML page instead of JSON, so it can't be scripted. Paste a URL into https://validator.schema.org/ after deploy for a second opinion.

Google's Rich Results Test will not show rich results for most of this markup, and that is expected:
- Google limits FAQ rich results to authoritative government and health sites.
- `WebApplication` rich results require ratings and offers. None were added, because the site has no real ratings and the brief rules out invented ones.

### Lighthouse 12 (local production build served with gzip, like GitHub Pages)

| Page | Device | Performance | Accessibility | Best practices | SEO |
|---|---|---|---|---|---|
| `/` | mobile | 91 | 100 | 100 | 100 |
| `/` | desktop | 100 | 100 | 100 | 100 |
| `/projects/claimblitz/` | mobile | 96 | 100 | 100 | 100 |
| `/projects/` | mobile | 96 | 100 | 100 | 100 |
| `/faq/` | mobile | 97 | 100 | 100 | 100 |

For reference, the currently deployed (pre-redesign) homepage scored 82 / 96 / 100 / 100 on mobile. The design is different, so this is context, not a controlled before/after.

Homepage mobile notes:
- Simulated LCP is 3.4 s (CLS 0, TBT 100 ms). Observed LCP in the unthrottled run was 310 ms.
- The simulated number is driven by about 3 s of main-thread work under 4× CPU throttling (React hydration and Framer Motion).
- three.js does not load on mobile.
- Field data from Search Console's Core Web Vitals report is the number to watch after deploy.

### Visual and functional regression

- Playwright at 1440 px and 390 px: all 10 pages render, no horizontal overflow, no console errors, no failed requests.
- The homepage design is unchanged except for two things:
  - The name was added to the role line.
  - A "Case study" link was added to each featured project card.

## 4. Remaining limitations

- **No security headers on GitHub Pages.** Moving DNS to Cloudflare (proxy in front of GitHub Pages) or moving hosting to Cloudflare Pages would allow HSTS, CSP and longer asset caching. This is a hosting decision, so no change was made.
- **No field data yet.** Core Web Vitals, impressions and AI citations can only be measured after deploy and indexing.
- **Case studies leave out lessons learned.** Those must come from Atharva's own experience (SEO-STRATEGY.md §6).
- **No ranking guarantee.** These changes improve crawlability, entity clarity and content depth. No change can guarantee a position in Google or inclusion in any AI answer.
