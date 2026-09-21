// 실제 작업 사진 + 예방법 콘텐츠로 지역 상세페이지를 생성하는 스크립트
// 대상: 실제 시공 사례가 있는 지역(평택/안성/오산/천안서북구)의 허브 + 증상별 페이지
"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const AREAS_DIR = path.join(ROOT, "areas");

const FOOTER_BLOCK = `<footer class="site">
  <div class="wrap footer-stack">
    <div class="footer-block">
      <h5>하수구누수종합설비</h5>
      <ul>
        <li>대표자명: 황용희</li>
        <li>사업자등록번호: 260-14-03187</li>
        <li>주소: 경기 평택시 죽백1길 51 1층 101호</li>
        <li>전화: 010-2159-5341</li>
      </ul>
    </div>
    <div class="footer-legal">
      © 2026 하수구누수종합설비. All rights reserved.
    </div>
  </div>
</footer>`;

const HEAD_STYLE = `<link rel="stylesheet" href="../css/style.css?v=6">`;

function header() {
  return `<div class="hotbar">🚨 접수 즉시 <strong>신속 연결</strong> 안내 · 24시간 접수</div>

<header class="site">
  <div class="nav">
    <a href="../index.html" class="brand">하수구누수종합설비<small>PLUMBING NETWORK</small></a>
    <nav class="nav-links">
      <a href="../index.html#symptoms">증상별 서비스</a>
      <a href="../index.html#coverage">출동/연계 지역</a>
      <a href="../index.html#how">이용 방법</a>
      <a href="../index.html#faq">자주 묻는 질문</a>
    </nav>
    <a class="nav-call" href="tel:010-2159-5341">📞 010-2159-5341</a>
  </div>
</header>`;
}

function figure(photo, alt, caption) {
  if (!photo) return "";
  return `    <figure>
      <img class="full" src="../assets/img/${photo}" alt="${alt}" loading="lazy">
      <figcaption>${caption}</figcaption>
    </figure>
`;
}

// ---------- 증상별 예방법 콘텐츠 (공통 정보, 지역 공통 적용) ----------
const SYMPTOMS = {
  "하수구막힘": {
    heroQ: (area) => `${area} 하수구막힘, 반복되지 않게 예방하려면?`,
    metaDesc: (area) => `${area} 하수구막힘 원인과 예방법 안내. 기름·이물질로 인한 하수구막힘을 미리 막는 자가 점검 방법과 전문업체를 불러야 하는 시점을 정리했습니다.`,
    answer: (area) => `<b>${area}</b> 지역에서도 하수구막힘은 기름 찌꺼기, 음식물 찌꺼기, 노후 배관 스케일이 주요 원인입니다. 아래 예방법을 먼저 확인해 보시고, 역류나 악취가 반복된다면 전화로 접수해 주세요. 현장 진단 후 견적에 동의하신 뒤에만 작업이 진행됩니다.`,
    body: () => `
    <h2>하수구막힘, 왜 반복될까요</h2>
    <p>하수구막힘의 가장 흔한 원인은 배수구로 흘려보낸 기름과 음식물 찌꺼기가 배관 벽에 서서히 달라붙는 것입니다. 동물성 기름은 차가운 배관 속에서 굳으면서 층층이 쌓이고, 그 위로 머리카락이나 이물질이 엉겨 붙으면 물길이 점점 좁아집니다. 여기에 노후 배관 내부의 스케일(찌든때)까지 더해지면 약품 세척만으로는 근본적인 해결이 어려워집니다.</p>
    <h2>셀프 예방수칙</h2>
    <ul>
      <li>기름·국물류는 키친타월로 먼저 닦아낸 뒤 설거지하기</li>
      <li>배수구 거름망을 매일 비우고 주 1회 이상 세척하기</li>
      <li>월 1회 정도 뜨거운 물(끓는 물 X, 화상 주의)로 배관 헹궈주기</li>
      <li>역류·배수 지연이 한 번이라도 있었다면 원인을 방치하지 않기</li>
    </ul>
    <h2>이럴 땐 전문업체를 불러야 합니다</h2>
    <p>거품이 역류하거나 여러 세대·여러 배수구에서 동시에 물이 안 내려간다면 공동관 문제일 가능성이 큽니다. 이때는 약품이나 펌프로 해결되지 않고, 내시경 카메라로 배관 내부를 확인한 뒤 전동스프링이나 고압세척으로 원인을 제거해야 재발을 막을 수 있습니다.</p>`,
  },
  "변기막힘": {
    heroQ: (area) => `${area} 변기막힘, 예방과 초기 대처 방법`,
    metaDesc: (area) => `${area} 변기막힘 원인과 예방법 안내. 이물질 투입, 배관 구조로 인한 변기막힘을 예방하는 방법과 전문업체가 필요한 상황을 정리했습니다.`,
    answer: (area) => `<b>${area}</b> 지역의 변기막힘은 대부분 물티슈·이물질 투입, 과도한 휴지 사용이 원인입니다. 아래 예방수칙을 확인하시고, 변기가 완전히 막혀 사용이 어려운 상태라면 전화로 접수해 주세요. 현장 진단 후 견적에 동의하신 뒤에만 작업이 진행됩니다.`,
    body: () => `
    <h2>변기막힘, 왜 발생할까요</h2>
    <p>변기는 일반 휴지 외의 이물질이 들어가면 쉽게 막힙니다. 특히 물티슈·청소용 시트는 물에 잘 풀리지 않아 배관 구부러진 구간(S트랩)에 걸려 쌓이는 경우가 많습니다. 오래된 건물일수록 배관 구경이 좁고 경사가 완만해 같은 이물질이라도 더 쉽게 막히는 편입니다.</p>
    <h2>셀프 예방수칙</h2>
    <ul>
      <li>물티슈·청소시트·생리용품은 변기가 아닌 쓰레기통에 버리기</li>
      <li>휴지는 한 번에 소량씩 나눠서 내리기</li>
      <li>막힘 초기 증상(물 내려가는 속도가 느려짐)을 무시하지 않기</li>
      <li>뚫어뻥 사용 후에도 증상이 반복되면 원인을 반드시 확인하기</li>
    </ul>
    <h2>이럴 땐 전문업체를 불러야 합니다</h2>
    <p>변기 물이 아예 안 내려가거나, 뚫어뻥으로 뚫었는데도 며칠 내 같은 증상이 반복된다면 배관 깊숙한 곳의 막힘일 가능성이 높습니다. 무리하게 이물질을 밀어 넣으면 오히려 배관이 손상될 수 있어, 이때는 전문 장비로 원인을 확인한 뒤 작업하는 것이 안전합니다.</p>`,
  },
  "싱크대막힘": {
    heroQ: (area) => `${area} 싱크대막힘, 기름때 예방법`,
    metaDesc: (area) => `${area} 싱크대막힘 원인과 예방법 안내. 기름·음식물 찌꺼기로 인한 싱크대막힘을 예방하는 방법과 전문업체가 필요한 시점을 정리했습니다.`,
    answer: (area) => `<b>${area}</b> 지역의 싱크대막힘은 기름과 음식물 찌꺼기가 배수구 안쪽에 쌓이며 발생하는 경우가 대부분입니다. 아래 예방법을 확인해 보시고, 역류가 발생했다면 전화로 접수해 주세요. 현장 진단 후 견적에 동의하신 뒤에만 작업이 진행됩니다.`,
    body: () => `
    <h2>싱크대막힘, 주원인은 기름입니다</h2>
    <p>동물성 기름은 식물성 기름보다 포화지방산 함유량이 높아 빨리 굳습니다. 싱크대에 그대로 흘려보내면 배관 벽에 얇게 코팅되듯 달라붙고, 그 위로 음식물 찌꺼기가 겹겹이 쌓이면서 시간이 지날수록 단단하게 굳어 배관 전체를 막아버립니다. 내시경 카메라로 막힌 배관을 살펴보면 대부분 이 기름 덩어리가 원인으로 확인됩니다.</p>
    <h2>셀프 예방수칙</h2>
    <ul>
      <li>기름·국물은 키친타월이나 신문지로 먼저 제거한 뒤 설거지하기</li>
      <li>배수구 거름망을 매일 비우고 음식물 찌꺼기를 바로 제거하기</li>
      <li>기름 성분이 많은 설거지 후에는 미지근한 물로 한 번 더 헹구기</li>
      <li>배수 속도가 평소보다 느려졌다면 초기에 원인을 확인하기</li>
    </ul>
    <h2>이럴 땐 전문업체를 불러야 합니다</h2>
    <p>한번 굳은 기름 덩어리는 약품으로 잘 제거되지 않고, 잠시 뚫려도 금방 재발합니다. 특히 노후 배관은 무리하게 뚫다가 손상될 수 있어, 내시경 카메라로 내부를 확인한 뒤 전동스프링이나 고압세척으로 맞춤 작업하는 것이 안전합니다.</p>`,
  },
  "누수": {
    heroQ: (area) => `${area} 누수, 조기에 알아차리는 방법`,
    metaDesc: (area) => `${area} 누수 조기 발견 방법과 예방 체크리스트. 벽·바닥 누수를 미리 확인하는 방법과 누수탐지 전문업체가 필요한 시점을 정리했습니다.`,
    answer: (area) => `<b>${area}</b> 지역의 누수는 벽이나 바닥 안쪽 배관에서 서서히 진행되는 경우가 많아 초기에 알아차리기 어렵습니다. 아래 체크리스트로 미리 확인해 보시고, 의심 증상이 있다면 전화로 접수해 주세요. 현장 진단 후 견적에 동의하신 뒤에만 작업이 진행됩니다.`,
    body: () => `
    <h2>누수, 왜 늦게 발견될까요</h2>
    <p>누수는 벽체나 바닥 슬라브 안쪽 배관에서 시작되는 경우가 많아 눈에 보이지 않습니다. 수도 요금이 평소보다 많이 나오거나, 벽지에 얼룩이 생기거나, 아래층에서 물이 샌다는 연락을 받고 나서야 알게 되는 일이 흔합니다. 노후 배관일수록 부식·이음부 손상으로 인한 누수 위험이 커집니다.</p>
    <h2>셀프 체크리스트</h2>
    <ul>
      <li>지난달 대비 수도 요금이 눈에 띄게 늘었는지 확인하기</li>
      <li>모든 수전을 잠근 상태에서 계량기 바늘이 도는지 확인하기</li>
      <li>벽지·천장에 얼룩, 곰팡이, 들뜸이 있는지 살펴보기</li>
      <li>바닥 일부가 유독 따뜻하거나 축축한 곳이 있는지 확인하기</li>
    </ul>
    <h2>이럴 땐 전문업체를 불러야 합니다</h2>
    <p>위 체크리스트에서 하나라도 해당된다면 육안으로 위치를 찾기보다 열화상 카메라나 청음 장비로 정확한 위치를 먼저 진단받는 것이 좋습니다. 벽을 임의로 뜯기 전에 정확한 지점을 확인해야 불필요한 공사를 줄이고 비용도 아낄 수 있습니다.</p>`,
  },
  "고압세척": {
    heroQ: (area) => `${area} 고압세척, 언제 받아야 할까요`,
    metaDesc: (area) => `${area} 배관 고압세척 시기와 효과 안내. 노후 배관·메인 하수관 고압세척이 필요한 신호와 예방 관리 방법을 정리했습니다.`,
    answer: (area) => `<b>${area}</b> 지역의 상가·아파트·공장은 배관 구경이 크고 사용 빈도가 높아 정기적인 고압세척이 필요한 경우가 많습니다. 아래 내용을 확인해 보시고, 배수 불량이 반복된다면 전화로 접수해 주세요. 현장 진단 후 견적에 동의하신 뒤에만 작업이 진행됩니다.`,
    body: () => `
    <h2>고압세척이 필요한 신호</h2>
    <p>배수 속도가 눈에 띄게 느려지거나, 하수구에서 냄새가 올라오거나, 여러 배수구에서 동시에 역류 증상이 나타난다면 배관 내부에 기름때·스케일이 쌓였다는 신호입니다. 약품이나 스프링으로는 일시적으로만 뚫리고 금방 재발하는 경우가 많아, 350bar 안팎의 고압 물살로 배관 내부를 전체적으로 세척해야 근본적으로 해결됩니다.</p>
    <h2>정기 관리 팁</h2>
    <ul>
      <li>식당·상가는 6개월~1년 주기로 정기 고압세척을 고려하기</li>
      <li>공동관(여러 세대가 함께 쓰는 배관)은 한 세대만 조치해도 재발할 수 있어 관리사무소와 함께 확인하기</li>
      <li>작업 전 내시경 카메라로 배관 내부 상태를 먼저 진단받기</li>
      <li>노후 배관은 무리한 기계식 작업보다 수압 조절이 가능한 장비로 진행하기</li>
    </ul>
    <h2>이럴 땐 전문업체를 불러야 합니다</h2>
    <p>가정용 약품이나 펌프로 해결되지 않고 역류가 반복된다면 배관 내부에 이미 상당한 이물질이 쌓인 상태입니다. 이때는 내시경 카메라로 노후 정도와 막힘 구간을 먼저 확인한 뒤, 수압을 맞춤 조절할 수 있는 전문 장비로 세척하는 것이 배관 손상 없이 안전합니다.</p>`,
  },
};

const SYMPTOM_KEYS = ["하수구막힘", "변기막힘", "싱크대막힘", "누수", "고압세척"];

// ---------- 지역별 정보: 실제 사진 배치 (지역 공통 정보 언급 없이, 사진은 알트/캡션으로만 설명) ----------
const CITIES = {
  "평택": {
    intro: `평택시 안팎의 아파트·상가·식당·원룸 현장에서 꾸준히 출동해 온 지역입니다. 최근에도 소사벌·세교동·비전동·고덕동·안중읍 등에서 하수구막힘, 싱크대막힘, 변기막힘 출동이 있었습니다.`,
    hubPhoto: { file: "equipment-spring-camera.jpg", alt: "평택 현장에 투입되는 전동스프링 장비와 관로 내시경 카메라", caption: "실제 출동 현장에서 사용하는 전동스프링·내시경 카메라 장비" },
    photos: {
      "하수구막힘": { file: "pipe-scope-inspection.jpg", alt: "내시경 카메라로 확인한 배관 내부 스케일 적체 모습", caption: "내시경 카메라로 확인한 배관 내부 스케일(찌든때) — 실제 현장 사진" },
      "변기막힘": { file: "toilet-out-of-order.jpg", alt: "변기막힘으로 사용이 중단된 현장 모습", caption: "변기막힘으로 임시 사용중단 안내가 붙은 실제 현장 사진" },
      "싱크대막힘": { file: "sink-clog-debris.jpg", alt: "싱크대 배수구 내부의 음식물 찌꺼기 적체 모습", caption: "싱크대 배수구 내부의 음식물·기름 찌꺼기 — 실제 현장 사진" },
      "누수": { file: "equipment-spring-camera.jpg", alt: "누수 위치 확인에도 쓰이는 내시경 카메라 장비", caption: "배관 내부 확인·누수 위치 탐지에 함께 사용되는 내시경 카메라 장비" },
      "고압세척": { file: "highpressure-yard-work.jpg", alt: "고압호스로 배관을 세척하는 실제 작업 현장", caption: "고압호스로 배관 라인을 세척하는 실제 작업 현장 사진" },
    },
  },
  "안성": {
    intro: `안성시 공도읍·안성동·양성면·석정동 등에서 원룸, 상가, 식당 하수구막힘과 고압세척 작업으로 출동해 온 지역입니다.`,
    hubPhoto: { file: "manhole-onsite-work.jpg", alt: "안성 상가 맨홀을 열고 고압세척 작업하는 현장", caption: "맨홀을 열고 고압호스로 관로를 세척하는 실제 작업 현장" },
    photos: {
      "하수구막힘": { file: "manhole-onsite-work.jpg", alt: "맨홀을 열고 관로를 점검하는 실제 작업 현장", caption: "맨홀을 열고 고압호스로 관로를 세척하는 실제 작업 현장" },
      "변기막힘": { file: "toilet-out-of-order.jpg", alt: "변기막힘으로 사용이 중단된 현장 모습", caption: "변기막힘으로 임시 사용중단 안내가 붙은 실제 현장 사진" },
      "싱크대막힘": { file: "sink-clog-debris.jpg", alt: "싱크대 배수구 내부의 음식물 찌꺼기 적체 모습", caption: "싱크대 배수구 내부의 음식물·기름 찌꺼기 — 실제 현장 사진" },
      "누수": { file: "equipment-spring-camera.jpg", alt: "누수 위치 확인에도 쓰이는 내시경 카메라 장비", caption: "배관 내부 확인·누수 위치 탐지에 함께 사용되는 내시경 카메라 장비" },
      "고압세척": { file: "highpressure-yard-work.jpg", alt: "마당 정화조 배관을 고압으로 세척하는 실제 작업 현장", caption: "정화조·배관 라인을 고압으로 세척하는 실제 작업 현장 사진" },
    },
  },
  "오산": {
    intro: `오산동 등 상가·식당 밀집 지역에서 하수구막힘과 셕션·고압세척 작업으로 출동해 온 지역입니다.`,
    hubPhoto: { file: "market-kitchen-drain-work.jpg", alt: "오산 상가 주방 하수구막힘 작업 현장", caption: "주방 하수구막힘을 셕션·고압세척으로 처리하는 실제 현장" },
    photos: {
      "하수구막힘": { file: "market-kitchen-drain-work.jpg", alt: "상가 주방 하수구막힘 작업 현장", caption: "주방 하수구막힘을 셕션·고압세척으로 처리하는 실제 현장" },
      "변기막힘": { file: "toilet-out-of-order.jpg", alt: "변기막힘으로 사용이 중단된 현장 모습", caption: "변기막힘으로 임시 사용중단 안내가 붙은 실제 현장 사진" },
      "싱크대막힘": { file: "sink-clog-debris.jpg", alt: "싱크대 배수구 내부의 음식물 찌꺼기 적체 모습", caption: "싱크대 배수구 내부의 음식물·기름 찌꺼기 — 실제 현장 사진" },
      "누수": { file: "equipment-spring-camera.jpg", alt: "누수 위치 확인에도 쓰이는 내시경 카메라 장비", caption: "배관 내부 확인·누수 위치 탐지에 함께 사용되는 내시경 카메라 장비" },
      "고압세척": { file: "market-kitchen-drain-work.jpg", alt: "상가 주방 하수구 고압세척 작업 현장", caption: "셕션 작업 후 고압세척으로 마무리한 실제 현장" },
    },
  },
  "천안서북구": {
    intro: `천안 불당동·두정동 등의 아파트, 식당 현장에서 싱크대막힘, 하수구막힘 작업으로 출동해 온 지역입니다.`,
    hubPhoto: { file: "pipe-scale-buildup.jpg", alt: "배관 이음부에 낀 기름때·스케일 실물", caption: "제거한 배관 이음부에 낀 기름때·스케일 — 실제 현장 사진" },
    photos: {
      "하수구막힘": { file: "pipe-scope-inspection.jpg", alt: "내시경 카메라로 확인한 배관 내부 스케일 적체 모습", caption: "내시경 카메라로 확인한 배관 내부 스케일(찌든때) — 실제 현장 사진" },
      "변기막힘": { file: "toilet-out-of-order.jpg", alt: "변기막힘으로 사용이 중단된 현장 모습", caption: "변기막힘으로 임시 사용중단 안내가 붙은 실제 현장 사진" },
      "싱크대막힘": { file: "pipe-scale-buildup.jpg", alt: "배관 이음부에 낀 기름때·스케일 실물", caption: "아파트 싱크대 배관 이음부에 낀 기름때·스케일 — 실제 현장 사진" },
      "누수": { file: "equipment-spring-camera.jpg", alt: "누수 위치 확인에도 쓰이는 내시경 카메라 장비", caption: "배관 내부 확인·누수 위치 탐지에 함께 사용되는 내시경 카메라 장비" },
      "고압세척": { file: "highpressure-yard-work.jpg", alt: "고압호스로 배관을 세척하는 실제 작업 현장", caption: "고압호스로 배관 라인을 세척하는 실제 작업 현장 사진" },
    },
  },
};

function symptomPageHtml(area, sym) {
  const s = SYMPTOMS[sym];
  const ph = CITIES[area].photos[sym];
  return `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${area} ${sym} 예방법·비용·업체 안내 | 하수구누수종합설비</title>
<meta name="description" content="${s.metaDesc(area)}">
<meta name="robots" content="noindex, nofollow">
<!-- TODO: 정식 오픈 시 위 robots 메타태그 제거, canonical 추가 -->
${HEAD_STYLE}
</head>
<body>

${header()}

<section class="case-hero">
  <div class="wrap">
    <a class="case-back" href="${area}.html">← ${area} 안내로</a>
    <h1>${s.heroQ(area)}</h1>
    <p class="meta">아래 원인과 예방법을 확인하고, 접수는 전화로 바로 가능합니다.</p>
  </div>
</section>

<section class="case-article">
  <div class="wrap">
    <div class="answer-box">${s.answer(area)}</div>
${figure(ph.file, ph.alt, ph.caption)}${s.body()}
    <h2>접수 안내</h2>
    <p>${area} 지역 ${sym} 관련 문의는 전화로 접수해 주세요. 접수 건은 확인 후 신속하게 연결해 안내해 드리며, 자세한 내용은 <a href="../index.html#faq">자주 묻는 질문</a>에서도 확인하실 수 있습니다.</p>
  </div>
</section>

${FOOTER_BLOCK}

</body>
</html>
`;
}

function hubPageHtml(area) {
  const c = CITIES[area];
  const links = SYMPTOM_KEYS.map((sym) => `      <a href="${area}-${sym}.html">${area} ${sym}</a>`).join("\n");
  return `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${area} 배관·하수구막힘 예방법 안내 | 하수구누수종합설비</title>
<meta name="description" content="${area} 지역 배관막힘, 하수구막힘, 누수 등 설비 문제의 원인과 예방법 안내. 접수 즉시 확인 후 신속하게 연결해 드립니다.">
<meta name="robots" content="noindex, nofollow">
<!-- TODO: 정식 오픈 시 위 robots 메타태그 제거, canonical 추가 -->
${HEAD_STYLE}
</head>
<body>

${header()}

<section class="case-hero">
  <div class="wrap">
    <a class="case-back" href="../index.html#coverage">← 출동/연계 지역으로</a>
    <h1>${area}, 배관·하수구막힘 어디로 접수하나요?</h1>
    <p class="meta">아래 답변과 증상별 예방법 안내를 확인해 주세요.</p>
  </div>
</section>

<section class="case-article">
  <div class="wrap">
    <div class="answer-box"><b>${area}</b> 지역은 접수 즉시 확인 후 신속하게 연결해 드립니다. ${c.intro}</div>
${figure(c.hubPhoto.file, c.hubPhoto.alt, c.hubPhoto.caption)}    <h2>${area} 증상별 예방법 안내</h2>
    <p>아래 증상을 눌러 원인과 예방법을 먼저 확인해 보세요. 자가 조치로 해결되지 않으면 전화로 접수해 주세요.</p>
    <div class="coverage-tags">
${links}
    </div>
  </div>
</section>

${FOOTER_BLOCK}

</body>
</html>
`;
}

let count = 0;
for (const area of Object.keys(CITIES)) {
  fs.writeFileSync(path.join(AREAS_DIR, `${area}.html`), hubPageHtml(area));
  count++;
  for (const sym of SYMPTOM_KEYS) {
    fs.writeFileSync(path.join(AREAS_DIR, `${area}-${sym}.html`), symptomPageHtml(area, sym));
    count++;
  }
}
console.log(`생성 완료: ${count}개 파일 (${Object.keys(CITIES).length}개 지역 x 6페이지)`);
