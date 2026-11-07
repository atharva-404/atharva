#!/usr/bin/env node
/**
 * Notify IndexNow (Bing, Yandex, Seznam, Naver…) about the site's URLs.
 * Run AFTER a deploy is live:  npm run indexnow
 * Optionally pass specific URLs: npm run indexnow -- https://atharvasonar.me/faq/
 *
 * The key file public/<KEY>.txt is deployed with the site so search engines
 * can verify ownership. Google does not use IndexNow; use Search Console.
 */
import { readFileSync } from "node:fs";

const HOST = "atharvasonar.me";
const KEY = "e05cec52ee6a3bd754b77c409fd7b918";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

async function sitemapUrls() {
  const res = await fetch(`https://${HOST}/sitemap.xml`);
  const xml = res.ok ? await res.text() : readFileSync("out/sitemap.xml", "utf8");
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

const keyCheck = await fetch(KEY_LOCATION);
if (!keyCheck.ok || (await keyCheck.text()).trim() !== KEY) {
  console.error(`Key file ${KEY_LOCATION} is not live yet. Deploy first, then re-run.`);
  process.exit(1);
}

const urlList = process.argv.slice(2).length ? process.argv.slice(2) : await sitemapUrls();
const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
});

// 200 = accepted, 202 = accepted pending key validation.
console.log(`IndexNow responded ${res.status} ${res.statusText} for ${urlList.length} URL(s).`);
process.exit(res.status === 200 || res.status === 202 ? 0 : 1);
