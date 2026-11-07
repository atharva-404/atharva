#!/usr/bin/env node
/**
 * SEO validator for the static export in ./out (run `npm run build` first).
 *
 * Checks every exported HTML page for: title, meta description, canonical,
 * robots directives, Open Graph / Twitter tags, a single <h1>, heading order,
 * image alt text, JSON-LD validity and broken internal links. It also checks
 * that sitemap.xml only lists indexable pages whose canonical matches the URL,
 * and that robots.txt references the sitemap.
 *
 * Usage: node scripts/seo-check.mjs [--json]
 * Exit code 1 when any error is found; warnings do not fail the run.
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const OUT = join(process.cwd(), "out");
const SITE = "https://atharvasonar.me";
const asJson = process.argv.includes("--json");

if (!existsSync(OUT)) {
  console.error("out/ not found. Run `npm run build` first.");
  process.exit(2);
}

const errors = [];
const warnings = [];
const err = (page, msg) => errors.push(`${page}: ${msg}`);
const warn = (page, msg) => warnings.push(`${page}: ${msg}`);

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return name === "_next" ? [] : walk(full);
    return name.endsWith(".html") ? [full] : [];
  });
}

/** "/about/" for out/about/index.html, "/404.html" for out/404.html. */
function routeOf(file) {
  const rel = relative(OUT, file).split(sep).join("/");
  if (rel === "index.html") return "/";
  if (rel.endsWith("/index.html")) return `/${rel.slice(0, -"index.html".length)}`;
  return `/${rel}`;
}

const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");
const text = (html) => decode(html.replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim();
const attr = (tag, name) => {
  const m = tag.match(new RegExp(`\\s${name}="([^"]*)"`, "i"));
  return m ? decode(m[1]) : undefined;
};
const meta = (head, key, value) => {
  for (const tag of head.match(/<meta\b[^>]*>/gi) ?? []) {
    if (attr(tag, key) === value) return attr(tag, "content");
  }
  return undefined;
};

/** Resolve an internal path to the file GitHub Pages would serve. */
function fileFor(pathname) {
  const clean = decodeURIComponent(pathname.split("#")[0].split("?")[0]);
  const candidates = clean.endsWith("/")
    ? [join(OUT, clean, "index.html")]
    : [join(OUT, clean), join(OUT, `${clean}.html`), join(OUT, clean, "index.html")];
  return candidates.find((c) => existsSync(c) && statSync(c).isFile());
}

// Search-engine ownership files (Google: google<token>.html) are not pages.
const isVerificationFile = (file) => /^google[0-9a-f]+\.html$/i.test(file.split(sep).pop());

const pages = walk(OUT).filter((file) => !isVerificationFile(file)).map((file) => {
  const raw = readFileSync(file, "utf8");
  const jsonLd = [...raw.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  // Drop scripts/styles so the RSC payload never looks like markup.
  const html = raw.replace(/<script\b[\s\S]*?<\/script>/gi, "").replace(/<style\b[\s\S]*?<\/style>/gi, "");
  const head = html.match(/<head>([\s\S]*?)<\/head>/i)?.[1] ?? "";
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  return { file, route: routeOf(file), html, head, jsonLd, ids };
});

const byRoute = new Map(pages.map((p) => [p.route, p]));
const titles = new Map();
const descriptions = new Map();
const report = [];

for (const page of pages) {
  const { route, html, head } = page;
  const isErrorPage = route === "/404.html" || route === "/404/" || route.startsWith("/_not-found");
  const robots = meta(head, "name", "robots") ?? "";
  const noindex = /noindex/i.test(robots);
  page.indexable = !isErrorPage && !noindex;

  const title = text(head.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? "");
  const description = meta(head, "name", "description") ?? "";
  const canonicalTag = (head.match(/<link\b[^>]*rel="canonical"[^>]*>/i) ?? [])[0];
  const canonical = canonicalTag ? attr(canonicalTag, "href") : undefined;
  page.canonical = canonical;

  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => text(m[1]));
  const levels = [...html.matchAll(/<h([1-6])\b/gi)].map((m) => Number(m[1]));
  const imgs = html.match(/<img\b[^>]*>/gi) ?? [];
  const og = {
    title: meta(head, "property", "og:title"),
    description: meta(head, "property", "og:description"),
    url: meta(head, "property", "og:url"),
    image: meta(head, "property", "og:image"),
    type: meta(head, "property", "og:type"),
  };
  const twitter = { card: meta(head, "name", "twitter:card"), title: meta(head, "name", "twitter:title"), image: meta(head, "name", "twitter:image") };

  if (isErrorPage) {
    if (!noindex) err(route, "error page should be noindex");
    report.push({ route, title, indexable: false });
    continue;
  }

  // Title and description
  if (!title) err(route, "missing <title>");
  else {
    if (title.length > 65) warn(route, `title is ${title.length} chars (may be truncated): "${title}"`);
    titles.set(title, [...(titles.get(title) ?? []), route]);
  }
  if (!description) err(route, "missing meta description");
  else {
    if (description.length < 70 || description.length > 170) warn(route, `description is ${description.length} chars`);
    descriptions.set(description, [...(descriptions.get(description) ?? []), route]);
  }

  // Indexing and canonical
  if (noindex) warn(route, `page is noindex (${robots})`);
  if (!canonical) err(route, "missing canonical");
  else if (canonical !== `${SITE}${route}`) err(route, `canonical ${canonical} does not match ${SITE}${route}`);

  // Social cards
  for (const [k, v] of Object.entries(og)) if (!v) err(route, `missing og:${k}`);
  if (og.url && canonical && og.url !== canonical) err(route, `og:url ${og.url} differs from canonical`);
  if (og.title && og.title === meta(byRoute.get("/")?.head ?? "", "property", "og:title") && route !== "/")
    warn(route, "og:title is identical to the homepage");
  if (!twitter.card) err(route, "missing twitter:card");
  if (!twitter.title) warn(route, "missing twitter:title");
  if (!twitter.image) warn(route, "missing twitter:image");

  // Headings
  if (h1s.length !== 1) err(route, `expected 1 <h1>, found ${h1s.length}`);
  for (let i = 1; i < levels.length; i++) {
    if (levels[i] > levels[i - 1] + 1) {
      warn(route, `heading jumps from h${levels[i - 1]} to h${levels[i]}`);
      break;
    }
  }

  // Images
  for (const img of imgs) {
    const alt = attr(img, "alt");
    const decorative = /aria-hidden="true"|role="presentation"/.test(img);
    if (alt === undefined) err(route, `<img src="${attr(img, "src")}"> has no alt attribute`);
    else if (!alt && !decorative) warn(route, `<img src="${attr(img, "src")}"> has empty alt`);
    if (!attr(img, "width") || !attr(img, "height")) warn(route, `<img src="${attr(img, "src")}"> lacks width/height`);
  }

  // JSON-LD
  const types = [];
  for (const block of page.jsonLd) {
    try {
      const data = JSON.parse(block);
      const nodes = data["@graph"] ?? [data];
      for (const n of nodes) types.push([].concat(n["@type"]).join("+"));
      if (!data["@context"]) err(route, "JSON-LD block has no @context");
    } catch (e) {
      err(route, `JSON-LD does not parse: ${e.message}`);
    }
  }
  if (!page.jsonLd.length) warn(route, "no JSON-LD");

  // Internal links
  for (const m of html.matchAll(/<a\b[^>]*\shref="([^"]+)"/gi)) {
    const href = decode(m[1]);
    if (/^(mailto:|tel:|javascript:)/i.test(href)) continue;
    let url;
    try {
      url = new URL(href, `${SITE}${route}`);
    } catch {
      err(route, `unparseable link ${href}`);
      continue;
    }
    if (url.origin !== SITE) continue;
    const target = url.pathname === route ? page : byRoute.get(url.pathname);
    if (!target && !fileFor(url.pathname)) {
      err(route, `broken internal link ${href}`);
      continue;
    }
    if (!url.pathname.endsWith("/") && !/\.[a-z0-9]+$/i.test(url.pathname)) warn(route, `link ${href} lacks a trailing slash (causes a redirect)`);
    if (url.hash && target && !target.ids.has(url.hash.slice(1))) err(route, `link ${href} points to a missing #${url.hash.slice(1)}`);
  }

  report.push({ route, title, description, canonical, h1: h1s[0], jsonLd: types, images: imgs.length, indexable: page.indexable });
}

for (const [t, routes] of titles) if (routes.length > 1) err(routes.join(", "), `duplicate title "${t}"`);
for (const routes of descriptions.values()) if (routes.length > 1) err(routes.join(", "), "duplicate meta description");

// Sitemap
const sitemapPath = join(OUT, "sitemap.xml");
const sitemapUrls = [];
if (!existsSync(sitemapPath)) err("sitemap.xml", "missing");
else {
  const xml = readFileSync(sitemapPath, "utf8");
  for (const m of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const loc = m[1].match(/<loc>([^<]+)<\/loc>/)?.[1]?.trim();
    const lastmod = m[1].match(/<lastmod>([^<]+)<\/lastmod>/)?.[1]?.trim();
    if (!loc) continue;
    sitemapUrls.push(loc);
    if (!loc.startsWith(`${SITE}/`)) {
      err("sitemap.xml", `${loc} is not on ${SITE}`);
      continue;
    }
    if (!lastmod || Number.isNaN(Date.parse(lastmod))) warn("sitemap.xml", `${loc} has no valid lastmod`);
    const path = loc.slice(SITE.length);
    const page = byRoute.get(path);
    if (page) {
      if (!page.indexable) err("sitemap.xml", `${loc} is not indexable`);
      if (page.canonical !== loc) err("sitemap.xml", `${loc} canonical is ${page.canonical}`);
    } else if (!fileFor(path)) err("sitemap.xml", `${loc} does not exist in out/`);
  }
  for (const page of pages) {
    if (page.indexable && !sitemapUrls.includes(`${SITE}${page.route}`)) warn("sitemap.xml", `indexable page ${page.route} is not listed`);
  }
}

// robots.txt
const robotsPath = join(OUT, "robots.txt");
if (!existsSync(robotsPath)) err("robots.txt", "missing");
else {
  const robots = readFileSync(robotsPath, "utf8");
  if (!robots.includes(`Sitemap: ${SITE}/sitemap.xml`)) err("robots.txt", "does not reference the sitemap");
  const groups = robots.split(/\n\s*\n/);
  for (const bot of ["Googlebot", "Bingbot", "OAI-SearchBot", "Claude-SearchBot", "PerplexityBot", "*"]) {
    const group = groups.find((g) => new RegExp(`^User-agent:\\s*${bot.replace("*", "\\*")}\\s*$`, "mi").test(g));
    if (group && /^Disallow:\s*\/\s*$/mi.test(group)) err("robots.txt", `${bot} is blocked from the whole site`);
  }
}

if (asJson) {
  console.log(JSON.stringify({ pages: report, sitemap: sitemapUrls, errors, warnings }, null, 2));
} else {
  console.log(`Checked ${pages.length} HTML files, ${sitemapUrls.length} sitemap URLs.\n`);
  for (const r of report) {
    console.log(`${r.indexable ? "✓" : "–"} ${r.route}`);
    if (r.title) console.log(`    title: ${r.title}`);
    if (r.h1) console.log(`    h1:    ${r.h1}`);
    if (r.jsonLd?.length) console.log(`    schema: ${r.jsonLd.join(", ")}`);
  }
  console.log(`\n${errors.length} error(s)`);
  for (const e of errors) console.log(`  ✗ ${e}`);
  console.log(`${warnings.length} warning(s)`);
  for (const w of warnings) console.log(`  ! ${w}`);
}
process.exit(errors.length ? 1 : 0);
