"use strict";
const fs = require("fs");
const path = require("path");

const SITE_URL = "https://hasugudoctor.co.kr";
const ROOT = path.join(__dirname, "..");

const LIVE_CITIES = [
  "평택", "안성", "오산", "천안서북구", "화성", "아산", "천안동남구",
  "처인구", "기흥구", "수지구", "장안구", "권선구", "팔달구", "영통구",
  "단원구", "상록구", "시흥", "군포", "의왕",
];
const SYMPTOM_KEYS = ["하수구막힘", "변기막힘", "싱크대막힘", "누수", "고압세척"];

const urls = [`${SITE_URL}/`];
for (const area of LIVE_CITIES) {
  urls.push(`${SITE_URL}/areas/${encodeURIComponent(area)}.html`);
  for (const sym of SYMPTOM_KEYS) {
    urls.push(`${SITE_URL}/areas/${encodeURIComponent(area)}-${encodeURIComponent(sym)}.html`);
  }
}

const today = new Date().toISOString().slice(0, 10);
const body = urls
  .map((u) => `  <url>\n    <loc>${u}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`)
  .join("\n");
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;

fs.writeFileSync(path.join(ROOT, "sitemap.xml"), xml);
console.log(`sitemap.xml 생성 완료: URL ${urls.length}개`);
