// 실제 시공사례 섹션 생성 스크립트 (/cases/ 허브 + 개별 사례 19건)
"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const CASES_DIR = path.join(ROOT, "cases");
fs.mkdirSync(CASES_DIR, { recursive: true });

const { LEAK_CASES } = require("./leak_cases");
const SITE_URL = "https://hasugudoctor.co.kr";

const FOOTER_BLOCK = `<footer class="site">
  <div class="wrap footer-stack">
    <div class="footer-block">
      <h5>하수구누수종합설비</h5>
      <ul>
        <li>대표자명: 황용희</li>
        <li>사업자등록번호: 260-14-03187</li>
        <li>주소: 경기 평택시 죽백1길 51 1층</li>
        <li>전화: 010-2159-5341</li>
      </ul>
    </div>
    <div class="footer-legal">
      © 2026 하수구누수종합설비. All rights reserved.
    </div>
  </div>
</footer>`;

function header() {
  return `<div class="hotbar">🚨 접수 즉시 <strong>직접 출동 또는 파트너 연계</strong> 안내 · 24시간 접수</div>

<header class="site">
  <div class="nav">
    <a href="../index.html" class="brand">하수구누수종합설비<small>PLUMBING NETWORK</small></a>
    <nav class="nav-links">
      <a href="../index.html#symptoms">증상별 서비스</a>
      <a href="../index.html#coverage">출동/연계 지역</a>
      <a href="index.html">시공사례</a>
      <a href="../index.html#faq">자주 묻는 질문</a>
    </nav>
    <a class="nav-call" href="tel:010-2159-5341">📞 010-2159-5341</a>
  </div>
</header>`;
}

const CASES = [
  { slug: "pyeongtaek-sosabeol-massage", title: "평택 소사벌 마사지샵 하수구막힘·싱크대막힘", region: "평택시 소사벌", photo: "equipment-spring-camera.jpg", alt: "전동스프링·내시경 카메라 장비", body: "마사지샵에서 하수구막힘·싱크대막힘 신고를 받고 출동한 현장입니다. 전동스프링과 관로 내시경 카메라를 함께 투입해 막힘 위치와 원인을 먼저 확인한 뒤 작업을 진행했습니다." },
  { slug: "pyeongtaek-sangga-cheolgeo", title: "평택 상가철거 중 하수구막힘", region: "평택시", photo: "pipe-scope-inspection.jpg", alt: "내시경 카메라로 확인한 배관 내부", body: "상가 철거 공사 중 하수구막힘 신고를 받고 출동한 현장입니다. 내시경 카메라로 배관 내부를 살펴보니 오랜 기간 쌓인 스케일(찌든때)이 확인되어, 이를 제거하는 작업을 진행했습니다." },
  { slug: "pyeongtaek-anseong-cheonan-asan-sobyeongi", title: "평택·안성·천안·아산 소변기막힘 해결", region: "평택·안성·천안·아산 일대", photo: "toilet-out-of-order.jpg", alt: "소변기막힘으로 사용이 중단된 현장", body: "평택·안성·천안·아산 일대 여러 현장에서 소변기막힘 신고를 받고 출동했습니다. 이물질로 막힌 배관을 확인하고 제거해 정상적으로 사용할 수 있도록 조치했습니다." },
  { slug: "pyeongtaek-segyo-sink", title: "평택 세교동 싱크대막힘", region: "평택시 세교동", photo: "sink-clog-debris.jpg", alt: "싱크대 배수구 내부 음식물 찌꺼기", body: "싱크대막힘 신고를 받고 출동한 현장입니다. 배수구 내부에 쌓인 음식물·기름 찌꺼기를 확인하고 제거해 배수가 정상적으로 되도록 조치했습니다." },
  { slug: "anseong-anseongdong-sangga", title: "안성 안성동 상가 하수구막힘", region: "안성시 안성동", photo: "manhole-onsite-work.jpg", alt: "맨홀을 열고 고압호스로 관로를 세척하는 모습", body: "상가 하수구막힘 신고를 받고 출동한 현장입니다. 맨홀을 열어 관로 상태를 확인한 뒤, 고압호스로 관로 전체를 세척해 막힘을 해결했습니다." },
  { slug: "anseong-yangseong-gopyeop", title: "안성 양성면 하수구막힘·고압세척", region: "안성시 양성면", photo: "highpressure-yard-work.jpg", alt: "정화조·배관 라인 고압세척 작업", body: "단독주택 하수구막힘 신고를 받고 출동한 현장입니다. 정화조와 연결된 배관까지 고압세척으로 정리해 막힘 원인을 근본적으로 해결했습니다." },
  { slug: "osan-osandong-mart", title: "오산 오산동 마트 식당 하수구막힘", region: "오산시 오산동", photo: "market-kitchen-drain-work.jpg", alt: "상가 주방 하수구막힘 작업 현장", body: "마트 내 식당에서 하수구막힘 신고를 받고 야간에 출동한 현장입니다. 셕션 작업으로 이물질을 먼저 제거한 뒤 고압세척으로 마무리했습니다." },
  { slug: "cheonan-buldangdong-apt", title: "천안 불당동 아파트 싱크대막힘·하수구막힘", region: "천안시 서북구 불당동", photo: "pipe-scale-buildup.jpg", alt: "배관 이음부에 낀 기름때·스케일", body: "아파트 싱크대막힘 신고를 받고 출동한 현장입니다. 배관 이음부에 두껍게 낀 기름때와 스케일을 확인하고 제거해 배수를 정상화했습니다." },
  { slug: "anseong-gongdo-oneroom", title: "안성 공도 원룸 싱크대배관막힘", region: "안성시 공도읍", photo: "pipe-scale-closeup-2.jpg", alt: "배관 내부 이물질", body: "옆집에서 배관을 험하게 사용해 역류가 발생한 원룸 현장입니다. 배관 내부에 쌓인 이물질을 확인하고 제거해 정상화했습니다." },
  { slug: "pyeongtaek-bijeondong-apt", title: "평택 비전동 아파트 싱크대막힘", region: "평택시 비전동", photo: "scope-monitor-view.jpg", alt: "내시경 카메라 모니터로 확인한 배관 내부", body: "아파트 싱크대막힘 신고를 받고 출동한 현장입니다. 내시경 카메라로 배관 내부 상태를 먼저 확인한 뒤 막힘 원인을 제거했습니다." },
  { slug: "pyeongtaek-godeok-apt", title: "평택 고덕 아파트 싱크대막힘", region: "평택시 고덕", photo: "sink-pipe-connection.jpg", alt: "싱크대 하부 배관 연결부", body: "아파트 싱크대막힘 신고를 받고 출동한 현장입니다. 싱크대 하부 배관 연결부를 점검하고 정비해 막힘을 해결했습니다." },
  { slug: "pyeongtaek-anjung-apt", title: "평택 안중 아파트 하수구막힘·싱크대막힘", region: "평택시 안중읍", photo: "sink-drain-standing-water.jpg", alt: "물이 고여 내려가지 않는 싱크대 배수구", body: "아파트 하수구막힘·싱크대막힘 신고를 받고 출동한 현장입니다. 물이 고여 잘 내려가지 않던 배수구 상태를 확인하고 작업을 진행했습니다." },
  { slug: "pyeongtaek-yongidong-sink", title: "평택 용이동 싱크대막힘", region: "평택시 용이동", photo: "drain-hose-scale-buildup.jpg", alt: "배수 호스 안쪽에 낀 스케일", body: "싱크대막힘 신고를 받고 출동한 현장입니다. 배수 호스 안쪽에 두껍게 낀 스케일을 확인하고 제거해 배수를 정상화했습니다." },
  { slug: "anseong-gongdoeup-sink", title: "안성 공도읍 싱크대막힘", region: "안성시 공도읍", photo: "sink-strainer-clean.jpg", alt: "싱크대 거름망 점검 모습", body: "싱크대막힘 신고를 받고 출동한 현장입니다. 거름망 상태를 점검하고 배수구를 정비해 막힘을 해결했습니다." },
  { slug: "anseong-seokjeongdong-malatang", title: "안성 석정동 마라탕 식당 하수구막힘·고압세척", region: "안성시 석정동", photo: "kitchen-floor-drain-rust.jpg", alt: "상가 주방 바닥 배수로", body: "마라탕 식당 하수구막힘 신고를 받고 출동한 현장입니다. 주방 바닥 배수로를 고압세척으로 정비해 배수를 정상화했습니다." },
  { slug: "cheonan-dujeongdong-apt", title: "천안 두정동 아파트 하수구막힘·싱크대막힘", region: "천안시 서북구 두정동", photo: "sink-pipe-connection-cheonan.jpg", alt: "싱크대 하부 배관 연결부", body: "아파트 하수구막힘·싱크대막힘 신고를 받고 출동한 현장입니다. 하부 배관 연결부를 점검하고 정비해 막힘을 해결했습니다." },
  { slug: "cheonan-dujeongdong-restaurant", title: "천안 두정동 식당 하수구막힘", region: "천안시 서북구 두정동", photo: "floor-drain-scale-cheonan.jpg", alt: "상가 바닥 배수로", body: "음식점 하수구막힘 신고를 받고 출동한 현장입니다. 상가 바닥 배수로 상태를 점검하고 정비해 배수를 정상화했습니다." },
  { slug: "pyeongtaek-sosadong-apt", title: "평택 소사동 아파트 하수구막힘·고압세척", region: "평택시 소사동", photo: "pipe-ceiling-work.jpg", alt: "천장 배관 라인 작업 모습", body: "아파트 하수구막힘 신고를 받고 출동한 현장입니다. 천장을 지나는 배관 라인을 고압세척으로 정비해 막힘을 해결했습니다." },
  { slug: "pyeongtaek-songtan-restaurant", title: "평택 송탄 음식점 하수구막힘·하수구역류", region: "평택시 송탄", photo: "pipe-scale-chunk.jpg", alt: "배관 내부에 굳은 이물질", body: "음식점 하수구역류 신고를 받고 출동한 현장입니다. 배관 내부에 단단하게 굳은 이물질을 확인하고 제거한 뒤 고압세척으로 마무리했습니다." },

  ...LEAK_CASES,
];

function ogBlock(title, desc, url, file) {
  return `<meta property="og:type" content="article">
<meta property="og:site_name" content="하수구누수종합설비">
<meta property="og:title" content="${title} | 하수구누수종합설비">
<meta property="og:description" content="${desc}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE_URL}/assets/img/${file}">
<meta name="twitter:card" content="summary_large_image">`;
}

function figuresHtml(c) {
  const list = c.photos || [{ file: c.photo, alt: c.alt, caption: `${c.region} 시공사례 사진입니다 · ${c.alt}` }];
  return list
    .map(
      (p) => `    <figure>
      <img class="full" src="../assets/img/${p.file}" alt="${p.alt}" loading="lazy">
      <figcaption>${p.caption}</figcaption>
    </figure>`
    )
    .join("\n");
}

function caseDetailHtml(c) {
  const url = `${SITE_URL}/cases/${c.slug}.html`;
  return `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${c.title} 시공사례 | 하수구누수종합설비</title>
<meta name="description" content="${c.region} ${c.title} 실제 시공사례입니다. 현장 사진과 함께 작업 내용을 안내해 드립니다.">
<meta name="robots" content="index, follow">
<link rel="canonical" href="${url}">
${ogBlock(`${c.title} 시공사례`, `${c.region} ${c.title} 실제 시공사례입니다. 현장 사진과 함께 작업 내용을 안내해 드립니다.`, url, c.photo)}
<link rel="stylesheet" href="../css/style.css?v=6">
</head>
<body>

${header()}

<section class="case-hero">
  <div class="wrap">
    <a class="case-back" href="index.html">← 시공사례 목록으로</a>
    <h1>${c.title} 시공사례</h1>
    <p class="meta">${c.region} · 실제 출동 현장</p>
  </div>
</section>

<section class="case-article">
  <div class="wrap">
${c.inlinePhotos ? "" : figuresHtml(c)}
    ${c.bodyHtml || `<p>${c.body}</p>`}
    <h2>접수 안내</h2>
    <p>비슷한 증상으로 문의하실 곳을 찾고 계신다면 전화로 접수해 주세요. 접수 건은 확인 후 신속하게 연결해 안내해 드리며, 현장 진단 후 견적에 동의하신 뒤에만 작업이 진행됩니다.</p>
  </div>
</section>

${FOOTER_BLOCK}

</body>
</html>
`;
}

function casesIndexHtml() {
  const cards = CASES.map(
    (c) => `      <a class="case-card" href="${c.slug}.html">
        <img src="../assets/img/${c.photo}" alt="${c.alt}" loading="lazy">
        <div class="case-card-body">
          <span class="case-card-region">${c.region}</span>
          <h3>${c.title}</h3>
        </div>
      </a>`
  ).join("\n");
  return `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>시공사례 | 하수구누수종합설비</title>
<meta name="description" content="하수구누수종합설비의 실제 시공사례 모음입니다. 하수구막힘, 싱크대막힘, 변기막힘, 고압세척 등 실제 출동 현장 사진과 작업 내용을 확인하세요.">
<meta name="robots" content="index, follow">
<link rel="canonical" href="${SITE_URL}/cases/index.html">
${ogBlock("시공사례", "하수구누수종합설비의 실제 시공사례 모음입니다. 하수구막힘, 싱크대막힘, 변기막힘, 고압세척 등 실제 출동 현장 사진과 작업 내용을 확인하세요.", `${SITE_URL}/cases/index.html`, CASES[0].photo)}
<link rel="stylesheet" href="../css/style.css?v=6">
<style>
.case-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 20px; margin: 32px 0; }
.case-card { display: block; border: 1px solid var(--bone-dim); border-radius: var(--radius); overflow: hidden; text-decoration: none; background: var(--bone); transition: box-shadow .15s ease; }
.case-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,.08); }
.case-card img { width: 100%; height: 170px; object-fit: cover; display: block; }
.case-card-body { padding: 14px 16px; }
.case-card-region { font-size: 12.5px; color: var(--steel); }
.case-card-body h3 { margin: 4px 0 0; font-size: 15px; color: var(--ink); line-height: 1.4; }
</style>
</head>
<body>

${header()}

<section class="case-hero">
  <div class="wrap">
    <h1>시공사례</h1>
    <p class="meta">저희가 실제로 출동해 해결한 현장들입니다. 사진과 함께 작업 내용을 소개합니다.</p>
  </div>
</section>

<section class="case-article">
  <div class="wrap" style="max-width:1000px;">
    <div class="case-grid">
${cards}
    </div>
  </div>
</section>

${FOOTER_BLOCK}

</body>
</html>
`;
}

let count = 0;
fs.writeFileSync(path.join(CASES_DIR, "index.html"), casesIndexHtml());
count++;
for (const c of CASES) {
  fs.writeFileSync(path.join(CASES_DIR, `${c.slug}.html`), caseDetailHtml(c));
  count++;
}
console.log(`시공사례 생성 완료: ${count}개 파일 (허브 1 + 사례 ${CASES.length}개)`);
