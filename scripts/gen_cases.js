// 실제 시공사례 섹션 생성 스크립트 (/cases/ 허브 + 개별 사례 19건)
"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const CASES_DIR = path.join(ROOT, "cases");
fs.mkdirSync(CASES_DIR, { recursive: true });

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

  // ---------- 누수탐지 시공사례 (상세 보강판) ----------
  {
    slug: "anseong-pyeongtaek-cheonan-cheongeum",
    title: "안성·평택·천안 누수탐지 청음·가스검사 후 굴착 배관연결",
    region: "안성·평택·천안 일대",
    photo: "leak-listening-device.jpg",
    alt: "청음탐지 장비로 누수 위치를 확인하는 모습",
    photos: [
      { file: "leak-floor-open.jpg", alt: "마루를 걷어내고 배관을 확인하는 모습", caption: "안성·평택·천안 일대 시공사례 사진입니다 · 마루를 걷어내고 배관 상태를 확인하는 모습" },
      { file: "leak-listening-device.jpg", alt: "청음탐지 장비로 누수 위치를 확인하는 모습", caption: "청음탐지 장비로 벽과 바닥의 물소리를 확인하는 모습" },
      { file: "leak-pipe-connected.jpg", alt: "굴착 후 노출된 냉온수 배관", caption: "굴착 후 노출된 냉수·온수 배관 이음부" },
    ],
    bodyHtml: `
    <h2>현장 상황</h2>
    <p>수도 요금이 평소보다 많이 나오고 벽지에도 미세한 습기가 느껴진다는 문의를 받고 출동한 현장입니다. 이런 경우 눈으로만 봐서는 정확한 누수 지점을 찾기 어렵습니다.</p>
    <h2>진단 과정</h2>
    <p>먼저 청음탐지 장비로 벽과 바닥을 따라가며 물이 흐르는 소리를 확인했습니다. 배관 안에서 물이 새어 나올 때 발생하는 미세한 진동음을 헤드폰으로 증폭해서 듣는 방식으로, 매립 배관 누수를 찾는 가장 기본이 되는 진단법입니다. 이어서 가스검사를 함께 진행해 배관 안에 특수 가스를 주입하고 지표면으로 올라오는 가스를 탐지, 의심 구간을 한 번 더 교차 확인했습니다.</p>
    <h2>작업 내용</h2>
    <p>정확한 지점이 확인된 뒤 바닥재를 걷어내고 해당 구간만 최소한으로 굴착했습니다. 온수관과 냉수관 이음부가 노후되어 미세하게 벌어져 있었고, 그 틈으로 물이 새고 있었습니다. 문제 구간을 잘라내고 새 이음쇠로 배관을 다시 연결한 뒤 마감까지 깔끔하게 정리했습니다.</p>
    <h2>마무리</h2>
    <p>누수는 방치할수록 수도 요금 증가는 물론 구조물 손상, 곰팡이 발생으로도 이어질 수 있습니다. 수도 요금이 갑자기 늘었거나 벽지·바닥에 이상 증상이 있으시다면 미루지 마시고 편하게 연락 주세요.</p>`,
  },
  {
    slug: "anseong-gongdoeup-oebu-nusu",
    title: "안성 공도읍 외부누수",
    region: "안성시 공도읍",
    photo: "leak-water-meter-flooded.jpg",
    alt: "물이 고인 수도계량기함",
    photos: [
      { file: "leak-manhole-open.jpg", alt: "계량기함 맨홀 뚜껑을 여는 모습", caption: "안성시 공도읍 시공사례 사진입니다 · 계량기함 맨홀 뚜껑을 여는 모습" },
      { file: "leak-water-meter-flooded.jpg", alt: "물이 고인 수도계량기함", caption: "물이 가득 고여 있는 계량기함 내부" },
      { file: "leak-meter-closeup.jpg", alt: "수도계량기 클로즈업", caption: "누수 확인 후 배관을 교체한 계량기 주변" },
    ],
    bodyHtml: `
    <h2>현장 상황</h2>
    <p>건물 외부 계량기함 주변 바닥이 계속 젖어 있다는 신고를 받고 출동한 현장입니다.</p>
    <h2>진단 과정</h2>
    <p>맨홀 덮개를 열어 계량기함 내부를 확인해 보니 물이 가득 고여 있었습니다. 외부누수는 이렇게 계량기함이나 밸브실에 물이 고이는 것으로 1차 확인이 가능한 경우가 많습니다. 계량기 주변 배관을 자세히 살펴보니 이음부 쪽에서 계속 물이 흘러나오고 있었습니다. 외부에 매설된 배관은 계절 변화와 지반 침하의 영향을 오래 받다 보니, 시간이 지나면서 이음부 실링이 약해지거나 관 자체에 미세한 균열이 생기는 경우가 흔합니다.</p>
    <h2>작업 내용</h2>
    <p>정확한 누수 지점을 확인한 뒤 해당 구간의 배관을 교체하고 이음부를 새로 시공했습니다. 작업 후 계량기 수치를 일정 시간 확인해 정상적으로 멈춰 있는 것까지 재확인하고 마무리했습니다.</p>
    <h2>마무리</h2>
    <p>계량기함 주변이 자주 젖어 있거나 수도 요금이 평소보다 많이 나온다면 외부누수를 의심해 보셔야 합니다. 방치하면 지반이 약해지거나 인근 구조물에도 영향을 줄 수 있습니다.</p>`,
  },
  {
    slug: "anseong-pungnim-sangga-baegwan",
    title: "안성 공도 풍림상가 배관노후 신설배관교체",
    region: "안성시 공도읍",
    photo: "leak-pipe-replace-closeup.jpg",
    alt: "노후 배관 교체 작업",
    photos: [
      { file: "leak-old-pipe-ceiling.jpg", alt: "천장 노후 강관 배관 상태", caption: "안성시 공도읍 풍림상가 시공사례 사진입니다 · 천장 노후 강관 배관 상태" },
      { file: "leak-pipe-replace-closeup.jpg", alt: "신설 배관 연결부 클로즈업", caption: "신소재 배관으로 교체한 연결부" },
      { file: "leak-pipe-final.jpg", alt: "작업 완료 후 정리된 배관", caption: "교체 작업 완료 후 정리된 천장 배관 라인" },
    ],
    bodyHtml: `
    <h2>현장 상황</h2>
    <p>상가 천장에서 물이 떨어진다는 신고를 받고 출동한 현장입니다.</p>
    <h2>진단 과정</h2>
    <p>천장 텍스를 열어 확인해 보니 오래된 강관 배관이 부식되어 녹물 자국과 함께 미세한 균열이 보였습니다. 강관 배관은 시공된 지 오래될수록 내부 부식이 진행되어 특정 구간만 교체해도 얼마 지나지 않아 다른 구간에서 또 문제가 생기는 경우가 많습니다.</p>
    <h2>작업 내용</h2>
    <p>이번 현장은 단순 보수보다 문제가 되는 배관 라인 전체를 신설 배관으로 교체하는 방향으로 진행했습니다. 기존 노후 배관을 철거하고 내구성이 좋은 신소재 배관으로 교체했으며, 연결부마다 이음쇠를 꼼꼼히 체결하고 보온재로 마감해 결로나 재부식도 함께 예방했습니다. 작업 완료 후에는 수압 테스트까지 진행해 누수가 완전히 해결됐는지 재확인했습니다.</p>
    <h2>마무리</h2>
    <p>오래된 상가나 건물일수록 배관 노후로 인한 누수는 한 번 손보고 끝나는 문제가 아닐 수 있습니다. 천장이나 벽에서 반복적으로 누수가 발생한다면 배관 상태를 전체적으로 진단받아 보시길 권해드립니다.</p>`,
  },
  {
    slug: "anseong-miyangmyeon-budongjeon",
    title: "안성 미양면 부동전교체",
    region: "안성시 미양면",
    photo: "leak-budongjeon-install.jpg",
    alt: "부동전(동파방지 수전) 설치 모습",
    bodyHtml: `
    <h2>현장 상황</h2>
    <p>마당 수전 아래쪽 바닥이 계속 젖어 있다는 신고를 받고 출동한 현장입니다. 부동전은 겨울철 동파를 막기 위해 땅속 깊이 밸브를 두고 수도를 잠그는 구조의 외부 수전입니다.</p>
    <h2>진단 과정</h2>
    <p>구조가 복잡한 만큼 내부 부품이 노후되면 겉으로는 멀쩡해 보여도 안쪽에서 물이 계속 새는 경우가 많습니다. 기존 부동전을 확인해 보니 오래 사용하면서 내부 패킹과 밸브가 마모되어 물이 완전히 잠기지 않고 조금씩 흘러내리고 있었습니다.</p>
    <h2>작업 내용</h2>
    <p>노후된 부동전을 통째로 새 제품으로 교체하고, 주변 배관 연결부까지 다시 정리해 물샘이 없는지 꼼꼼히 확인했습니다. 교체 후에는 밸브를 여러 차례 열고 잠그며 정상 작동하는지, 잠갔을 때 완전히 차단되는지까지 재차 테스트했습니다.</p>
    <h2>마무리</h2>
    <p>마당 수전 주변이 계속 젖어 있거나 겨울마다 동파 걱정이 되신다면 부동전 상태를 점검받아 보시길 권해드립니다. 방치하면 겨울철 동파로 이어져 더 큰 공사가 필요해질 수 있습니다.</p>`,
  },
  {
    slug: "cheonan-dujeongdong-hwajangsil-damsu",
    title: "천안 두정동 화장실누수 담수테스트·우수관 방수작업",
    region: "천안시 서북구 두정동",
    photo: "leak-bathroom-hose-test.jpg",
    alt: "화장실 바닥 담수테스트 모습",
    photos: [
      { file: "leak-bathroom-hose-test.jpg", alt: "화장실 바닥 담수테스트 모습", caption: "천안시 서북구 두정동 시공사례 사진입니다 · 화장실 바닥 담수테스트 모습" },
      { file: "leak-utility-pipe.jpg", alt: "세탁실 우수관 배관 확인", caption: "세탁실 우수관 배관 이음부 확인" },
      { file: "leak-drain-cover-mesh.jpg", alt: "방수 마감 작업 후 배수구", caption: "방수 마감 작업을 마친 배수구 주변" },
    ],
    bodyHtml: `
    <h2>현장 상황</h2>
    <p>아래층에서 천장에 누수 흔적이 있다는 연락을 받고 위층 화장실을 점검한 현장입니다.</p>
    <h2>진단 과정</h2>
    <p>담수테스트를 먼저 진행했습니다. 화장실 바닥 배수구를 막고 일정 수위까지 물을 채운 뒤 시간을 두고 수위 변화를 관찰하는 방법인데, 수위가 눈에 띄게 줄어들어 바닥 방수층이나 배관 이음부에서 누수가 진행되고 있음을 확인했습니다. 함께 아파트 우수관(빗물 배관) 쪽도 점검했습니다.</p>
    <h2>작업 내용</h2>
    <p>세탁실 배관 이음부와 우수관 연결 부위를 확인해 보니 방수 마감이 오래되어 갈라진 부분이 있었습니다. 해당 구간을 정리하고 방수 작업을 새로 진행해 빗물과 생활용수가 새어 들어가지 않도록 조치했습니다. 작업 후 다시 한번 담수테스트로 수위 변화가 없는 것을 확인했습니다.</p>
    <h2>마무리</h2>
    <p>아파트는 위아래층이 연결되어 있는 구조라 한 세대의 누수가 이웃 세대 피해로까지 번지는 경우가 많습니다. 아래층에서 누수 관련 연락을 받으셨다면 빠르게 담수테스트부터 받아보시길 권해드립니다.</p>`,
  },
  {
    slug: "cheonan-buldangdong-hwajangsil-meji",
    title: "천안 불당동 화장실누수 메지시공",
    region: "천안시 서북구 불당동",
    photo: "leak-bathroom-tile-waterproof.jpg",
    alt: "화장실 바닥 타일 메지 시공",
    photos: [
      { file: "leak-toolbag.jpg", alt: "메지 시공 준비 도구", caption: "천안시 서북구 불당동 시공사례 사진입니다 · 메지 시공 준비 도구" },
      { file: "leak-bathroom-tile-waterproof.jpg", alt: "방수 처리 전 바닥면", caption: "삭은 메지를 제거하고 방수 처리 중인 바닥면" },
      { file: "leak-tile-toilet-base.jpg", alt: "메지 시공 완료면", caption: "변기 주변까지 꼼꼼히 마감한 메지 시공 완료면" },
    ],
    bodyHtml: `
    <h2>현장 상황</h2>
    <p>화장실누수 신고를 받고 출동한 현장입니다. 화장실 벽 타일 사이 줄눈(메지)이 오래되어 갈라지고 검게 변색되면서, 그 틈으로 물이 스며들어 배면 쪽에 누수가 의심되는 상황이었습니다.</p>
    <h2>진단 과정</h2>
    <p>타일 자체는 멀쩡해 보여도 줄눈이 삭으면 그 틈으로 물이 계속 침투해 방수층을 서서히 손상시키기 때문에, 눈에 잘 띄지 않지만 화장실누수의 흔한 원인 중 하나입니다. 기존의 삭은 메지를 제거하고 바닥과 벽 이음부까지 꼼꼼히 확인했습니다.</p>
    <h2>작업 내용</h2>
    <p>방수 성능이 좋은 메지재로 재시공을 진행했습니다. 단순히 겉보기 줄눈만 채우는 것이 아니라 이음부 안쪽까지 방수재가 충분히 밀착되도록 작업했고, 변기와 바닥이 만나는 부분, 배수구 주변처럼 물이 자주 고이는 자리는 더 꼼꼼하게 마감했습니다. 작업 후 물을 뿌려 방수 처리가 제대로 됐는지 확인했습니다.</p>
    <h2>마무리</h2>
    <p>화장실 타일 줄눈이 검게 변하거나 갈라져 있다면 단순 미관 문제가 아니라 누수로 이어질 수 있는 신호일 수 있습니다. 방치하지 마시고 미리 점검받아 보시길 권해드립니다.</p>`,
  },
  {
    slug: "pyeongtaek-bijeondong-bundaegi",
    title: "평택 비전동 분배기누수 분배기 교체",
    region: "평택시 비전동",
    photo: "leak-distributor-box.jpg",
    alt: "분배기함 내부 배관",
    bodyHtml: `
    <h2>현장 상황</h2>
    <p>다용도실 벽 아래쪽이 계속 축축하다는 신고를 받고 출동한 현장입니다. 분배기는 보일러나 온수 배관이 각 방과 화장실, 주방으로 갈라지는 지점에 설치되는 장치로, 보통 현관이나 다용도실 벽 안에 매립되어 있습니다.</p>
    <h2>진단 과정</h2>
    <p>구조상 눈에 잘 띄지 않다 보니 누수가 진행돼도 한참 뒤에야 발견되는 경우가 많습니다. 분배기함을 열어 내부를 확인해 보니 여러 갈래로 나뉜 배관 중 한 라인의 연결부에서 물이 조금씩 새어 나오고 있었습니다. 하나씩 밸브를 잠가가며 수압 변화를 확인하는 방식으로 문제가 되는 라인을 특정했습니다.</p>
    <h2>작업 내용</h2>
    <p>노후된 분배기를 통째로 새 제품으로 교체하고, 각 배관 연결부를 다시 체결한 뒤 밸브를 하나씩 열어가며 모든 라인에 누수가 없는지 재확인했습니다. 교체 후에는 수압을 걸어둔 상태로 일정 시간 지켜본 뒤 이상이 없는 것을 최종 확인했습니다.</p>
    <h2>마무리</h2>
    <p>다용도실이나 현관 쪽 벽면이 원인 모르게 축축하다면 분배기 누수를 의심해 보셔야 합니다. 겉으로 드러나지 않는 만큼 방치되기 쉬우니 이상 증상이 느껴지시면 빠르게 점검받아 보시길 권해드립니다.</p>`,
  },
  {
    slug: "pyeongtaek-segyodong-oebyeok",
    title: "평택 세교동 외벽누수 외벽코킹방수",
    region: "평택시 세교동",
    photo: "leak-exterior-caulking.jpg",
    alt: "외벽 코킹 방수 시공",
    bodyHtml: `
    <h2>현장 상황</h2>
    <p>비가 온 뒤에만 실내 벽지에 얼룩이 생긴다는 신고를 받고 출동한 현장입니다.</p>
    <h2>진단 과정</h2>
    <p>외벽을 살펴보니 외벽 마감재 이음부를 따라 미세한 균열이 여러 군데 있었습니다. 비가 오는 날에만 증상이 나타나는 누수는 대부분 배관 문제가 아니라 외벽 틈으로 빗물이 스며드는 외벽누수인 경우가 많습니다. 외벽 마감재와 마감재 사이, 창틀 주변 이음부는 시간이 지나면서 실리콘이나 코킹재가 굳고 갈라져 방수 기능을 잃기 쉽습니다.</p>
    <h2>작업 내용</h2>
    <p>균열이 발생한 이음부를 따라 기존의 삭은 코킹재를 깨끗이 제거하고, 표면을 정리한 뒤 방수 성능이 좋은 코킹재로 새로 시공했습니다. 물이 흘러 들어갈 수 있는 경로 전체를 따라가며 빈틈없이 작업했고, 작업 후에는 물을 뿌려 시공 부위로 물이 스며들지 않는지 재확인했습니다.</p>
    <h2>마무리</h2>
    <p>비 온 뒤에만 벽지에 얼룩이 생기거나 곰팡이가 반복된다면 실내 배관보다 외벽 쪽을 먼저 의심해 보시는 것이 좋습니다. 외벽누수는 시간이 지날수록 균열이 커져 공사 범위도 커지니 초기에 조치하시길 권해드립니다.</p>`,
  },
  {
    slug: "pyeongtaek-segyodong-hwajangsil-yuga",
    title: "평택 세교동 화장실누수 유가교체·방수작업",
    region: "평택시 세교동",
    photo: "leak-bathroom-floor-drain-repair.jpg",
    alt: "화장실 바닥 배수구(유가) 교체 작업",
    bodyHtml: `
    <h2>현장 상황</h2>
    <p>아래층 천장에 누수 흔적이 생겼다는 신고를 받고 위층 화장실 바닥 배수구 주변을 확인한 현장입니다.</p>
    <h2>진단 과정</h2>
    <p>오래된 유가(바닥 배수구) 주변 방수층이 삭아 있었습니다. 유가는 화장실 바닥 물을 하수관으로 흘려보내는 배수구인데, 이 주변은 물이 가장 오래 고이는 자리인 만큼 방수층이 손상되면 바로 아래층 누수로 이어지는 경우가 많습니다. 배수구 주변 타일과 방수층을 걷어내고 확인해 보니 유가 자체도 오래돼 이음부가 헐거워져 있었습니다.</p>
    <h2>작업 내용</h2>
    <p>노후된 유가를 새 제품으로 교체하고, 주변 바닥에는 방수재를 여러 차례 덧발라 완전히 밀착되도록 시공했습니다. 방수 작업은 한 번에 두껍게 바르는 것보다 얇게 여러 번 덧발라 굳히는 방식이 훨씬 견고합니다. 작업이 끝난 뒤에는 물을 채워 배수 상태와 방수 여부를 함께 확인했습니다.</p>
    <h2>마무리</h2>
    <p>화장실 배수구 주변에서 냄새가 나거나 아래층에서 누수 연락을 받으셨다면 유가 노후를 의심해 보셔야 합니다. 바닥을 걷어내는 공사라 조기에 발견할수록 공사 범위를 줄일 수 있습니다.</p>`,
  },
  {
    slug: "pyeongtaek-anseong-cheonan-apt-yeolhwasang",
    title: "평택·안성·천안 아파트 누수검사 실내열화상·공압검사",
    region: "평택·안성·천안 일대",
    photo: "leak-pressure-gauge-test.jpg",
    alt: "공압검사 압력게이지",
    photos: [
      { file: "leak-pressure-gauge-test.jpg", alt: "공압검사 압력게이지", caption: "평택·안성·천안 일대 시공사례 사진입니다 · 공압검사 압력게이지" },
      { file: "leak-thermal-camera.jpg", alt: "열화상 카메라로 확인한 온도 분포", caption: "실내열화상 카메라로 확인한 벽면 온도 분포" },
    ],
    bodyHtml: `
    <h2>현장 상황</h2>
    <p>수도 요금이 늘었는데 겉으로는 별다른 흔적이 안 보인다는 문의를 받고 출동한 현장입니다.</p>
    <h2>진단 과정</h2>
    <p>먼저 배관에 공압검사를 진행했습니다. 배관 내부에 일정한 압력의 공기를 주입한 뒤 압력게이지로 압력이 유지되는지를 관찰하는 방법인데, 게이지 수치가 시간이 지날수록 조금씩 떨어지는 것을 확인해 배관 내부에 누수가 있다는 것을 먼저 확인했습니다. 이어서 실내열화상 카메라로 벽과 바닥의 온도 분포를 촬영했습니다. 온수 배관에서 물이 새고 있으면 주변보다 온도가 미세하게 높게 나타나는데, 촬영한 이미지에서도 특정 구간의 온도가 주변보다 높게 표시되는 것을 확인했습니다.</p>
    <h2>작업 내용</h2>
    <p>공압검사로 누수 여부를, 열화상검사로 대략적인 위치까지 교차 확인한 뒤, 필요한 최소 구간만 개방해 정확한 지점을 찾아 조치했습니다.</p>
    <h2>마무리</h2>
    <p>수도 요금만 늘고 눈에 보이는 누수 흔적이 없을 때는 이렇게 장비를 활용한 정밀 진단이 꼭 필요합니다. 육안으로 확인이 안 된다고 방치하지 마시고 정확한 검사를 먼저 받아보시길 권해드립니다.</p>`,
  },
  {
    slug: "pyeongtaek-yongidong-apt-damsu",
    title: "평택 용이동 아파트누수 담수테스트·열화상검사",
    region: "평택시 용이동",
    photo: "leak-bathroom-flood-test.jpg",
    alt: "화장실 바닥 담수테스트 현장",
    bodyHtml: `
    <h2>현장 상황</h2>
    <p>아래층 천장에 얼룩이 생겼다는 연락을 받고 위층 화장실을 점검한 현장입니다.</p>
    <h2>진단 과정</h2>
    <p>먼저 배수구를 막고 물을 채워 일정 시간 수위 변화를 지켜보는 담수테스트를 진행했는데, 시간이 지나며 수위가 눈에 띄게 줄어드는 것을 확인했습니다. 정확한 지점까지는 육안으로 알기 어려워, 이어서 열화상 카메라로 바닥면 전체를 촬영했습니다. 물이 스며든 부분은 주변보다 미세하게 온도가 낮게 나타나는데, 배수구 인근 특정 구간의 온도가 다르게 표시되는 것을 확인해 누수 지점을 좁힐 수 있었습니다.</p>
    <h2>작업 내용</h2>
    <p>담수테스트로 누수 여부를, 열화상검사로 위치를 함께 확인해 불필요하게 바닥 전체를 뜯지 않고도 정확한 지점만 개방해 작업했습니다. 확인된 지점만 최소한으로 개방해 원인을 제거하고 방수 처리까지 마무리한 뒤, 다시 담수테스트로 수위 변화가 없는 것을 최종 확인했습니다.</p>
    <h2>마무리</h2>
    <p>아파트는 아래층과 바로 연결되는 구조라 화장실누수를 방치하면 이웃 세대 피해로 번질 수 있습니다. 천장 얼룩이나 누수 의심 증상이 있으시면 빠르게 검사받아 보시길 권해드립니다.</p>`,
  },
  {
    slug: "pyeongtaek-jukbaekdong-boiler",
    title: "평택 죽백동 보일러누수 보일러공압검사",
    region: "평택시 죽백동",
    photo: "leak-boiler-pressure-test.jpg",
    alt: "보일러 배관 공압검사 압력게이지",
    bodyHtml: `
    <h2>현장 상황</h2>
    <p>보일러 난방을 켤 때마다 바닥 일부가 유독 따뜻하고 축축하다는 신고를 받고 출동한 현장입니다.</p>
    <h2>진단 과정</h2>
    <p>보일러 배관은 바닥 콘크리트 아래 매립되어 있어 겉으로는 확인이 불가능하기 때문에, 가장 먼저 보일러공압검사를 진행했습니다. 난방 배관에 일정 압력의 공기를 주입하고 압력게이지로 시간에 따른 압력 변화를 확인하는 방법인데, 게이지 압력이 시간이 지날수록 조금씩 떨어지는 것이 확인되어 난방 배관 어딘가에 누수가 있다는 것을 먼저 진단할 수 있었습니다. 여러 개로 나뉜 난방 라인을 하나씩 잠그고 압력 변화를 비교하는 방식으로 문제가 되는 라인을 좁혀나갔고, 열화상 장비로 바닥 온도 분포까지 함께 확인해 정확한 위치를 특정했습니다.</p>
    <h2>작업 내용</h2>
    <p>확인된 구간만 최소한으로 바닥을 개방해 배관을 보수한 뒤, 다시 공압검사로 압력이 정상적으로 유지되는 것을 확인하고 마무리했습니다.</p>
    <h2>마무리</h2>
    <p>난방을 켰을 때 바닥 특정 구역만 유난히 뜨겁거나 축축하다면 보일러 배관 누수를 의심해 보셔야 합니다. 바닥 공사가 필요한 만큼 빨리 진단받으실수록 공사 범위를 줄일 수 있습니다.</p>`,
  },
  {
    slug: "pyeongtaek-jukbaekdong-hasugu-nusu",
    title: "평택 죽백동 하수구막힘·하수구누수검사",
    region: "평택시 죽백동",
    photo: "leak-drain-scope-inspection.jpg",
    alt: "내시경 카메라로 확인한 배관 내부",
    bodyHtml: `
    <h2>현장 상황</h2>
    <p>배수가 잘 안 되면서 동시에 바닥 일부가 축축하다는 신고를 받고 출동한 현장입니다.</p>
    <h2>진단 과정</h2>
    <p>막힘과 누수 증상이 함께 나타나는 경우, 단순히 이물질만 제거해서는 문제가 해결되지 않을 수 있어 정확한 원인 파악이 우선입니다. 내시경 카메라를 배관 안으로 투입해 내부 상태를 직접 확인하는 하수구누수검사를 진행했는데, 모니터로 살펴보니 오래된 배관 벽면에 이물질이 두껍게 쌓여 있었고 일부 구간에서는 배관 자체에 미세한 균열도 함께 확인됐습니다.</p>
    <h2>작업 내용</h2>
    <p>이물질로 인한 막힘과 균열로 인한 누수가 동시에 진행되고 있었던 만큼, 먼저 막힘의 원인이 된 이물질을 제거해 배수를 정상화하고 균열이 확인된 구간은 별도로 보수 작업을 진행했습니다. 작업 후 다시 한번 내시경 카메라로 배관 내부를 확인해 이물질과 균열 부위가 모두 정리된 것을 확인했습니다.</p>
    <h2>마무리</h2>
    <p>하수구가 잘 안 내려가면서 동시에 바닥이 축축한 증상이 있다면 단순 막힘이 아닐 수 있습니다. 내시경 카메라로 내부를 정확히 확인한 뒤 조치받으시길 권해드립니다.</p>`,
  },
];

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
${figuresHtml(c)}
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
    <h1>실제 시공사례</h1>
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
