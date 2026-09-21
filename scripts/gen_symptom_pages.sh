#!/bin/bash
set -e
cd "$(dirname "$0")/.."

AREAS=(
  "강남구" "강동구" "강북구" "강서구" "관악구" "광진구" "구로구" "금천구"
  "노원구" "도봉구" "동대문구" "동작구" "마포구" "서대문구" "서초구" "성동구"
  "성북구" "송파구" "양천구" "영등포구" "용산구" "은평구" "중랑구" "중구"
  "연수구" "계양구" "미추홀구" "남동구" "부평구"
  "덕양구" "일산" "원미구" "소사구" "오정구" "수정구" "중원구" "분당구"
  "장안구" "권선구" "팔달구" "영통구" "단원구" "상록구" "만안구" "동안구"
  "기흥구" "처인구" "수지구"
  "가평" "과천" "광주" "광명" "구리" "김포" "남양주" "동두천" "시흥"
  "안성" "양주" "양평" "여주" "오산" "의왕" "의정부" "이천" "파주"
  "평택" "포천" "하남" "화성"
  "아산" "천안서북구"
  "세종"
  "유성구" "대덕구"
)

SYMPTOMS=("하수구막힘" "변기막힘" "싱크대막힘" "누수" "고압세척")

symptom_desc() {
  case "$1" in
    "하수구막힘") echo "거품 역류, 악취, 배수 불량 등 하수구 관련 문제" ;;
    "변기막힘") echo "이물질 투입, 오배수 역류 등 변기 관련 문제" ;;
    "싱크대막힘") echo "기름·음식물 슬러지로 인한 역류 등 싱크대 관련 문제" ;;
    "누수") echo "벽·바닥 안 배관 누수 위치 탐지 및 보수 관련 문제" ;;
    "고압세척") echo "노후 배관·메인 하수관·우수관 세척 관련 문의" ;;
  esac
}

mkdir -p areas

# 지역 허브 페이지: 증상별 서브페이지 링크 블록 생성
for area in "${AREAS[@]}"; do
  links=""
  for sym in "${SYMPTOMS[@]}"; do
    links="${links}      <a href=\"${area}-${sym}.html\">${area} ${sym}</a>\n"
  done
  fname="areas/${area}.html"
  cat > "$fname" <<HTML
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${area} 배관·하수구막힘 접수 안내 | 뉴월드</title>
<meta name="description" content="${area} 지역 배관막힘, 하수구막힘, 누수 등 설비 문제 접수. 접수 즉시 확인 후 신속하게 연결해 드립니다.">
<meta name="robots" content="noindex, nofollow">
<!-- TODO: 정식 오픈 시 위 robots 메타태그 제거, canonical 추가 -->
<link rel="stylesheet" href="../css/style.css?v=2">
</head>
<body>

<div class="hotbar">🚨 접수 즉시 <strong>신속 연결</strong> 안내 · 24시간 접수</div>

<header class="site">
  <div class="nav">
    <a href="../index.html" class="brand">뉴월드<small>PLUMBING NETWORK</small></a>
    <nav class="nav-links">
      <a href="../index.html#symptoms">증상별 서비스</a>
      <a href="../index.html#coverage">출동/연계 지역</a>
      <a href="../index.html#how">이용 방법</a>
      <a href="../index.html#faq">자주 묻는 질문</a>
    </nav>
    <a class="nav-call" href="tel:010-2159-5341">📞 010-2159-5341</a>
  </div>
</header>

<section class="case-hero">
  <div class="wrap">
    <a class="case-back" href="../index.html#coverage">← 출동/연계 지역으로</a>
    <h1>${area} 배관·하수구막힘 접수 안내</h1>
    <p class="meta">접수하신 내용을 확인해 가장 빠르게 연결해 드립니다.</p>
  </div>
</section>

<section class="case-article">
  <div class="wrap">
    <h2>${area}, 이렇게 접수하시면 됩니다</h2>
    <p>하수구막힘·변기막힘·싱크대막힘·누수 등 배관 관련 문제가 있으시면 접수해 주세요. ${area} 지역 접수 건은 확인 후 신속하게 연결해 안내해 드립니다. 현장 진단 후 견적에 동의하신 뒤에만 작업이 진행됩니다.</p>
    <h2>${area} 증상별 안내</h2>
  </div>
</section>

<section id="coverage" class="coverage">
  <div class="wrap">
    <div class="coverage-grid">
$(echo -e "$links")
    </div>
  </div>
</section>

<footer class="site">
  <div class="wrap">
    <div class="footer-legal">
      © 2026 뉴월드. All rights reserved. (임시 상호 — 확정되는 대로 변경 예정)
    </div>
  </div>
</footer>

</body>
</html>
HTML

  # 증상별 서브페이지
  for sym in "${SYMPTOMS[@]}"; do
    desc="$(symptom_desc "$sym")"
    sfname="areas/${area}-${sym}.html"
    cat > "$sfname" <<HTML
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${area} ${sym} 비용·업체·출장 안내 | 뉴월드</title>
<meta name="description" content="${area} ${sym} 비용, 업체, 출장 문의는 여기서 접수하세요. ${desc}, 접수 즉시 확인 후 신속하게 연결해 드립니다.">
<meta name="robots" content="noindex, nofollow">
<!-- TODO: 정식 오픈 시 위 robots 메타태그 제거, canonical 추가 -->
<link rel="stylesheet" href="../css/style.css?v=2">
</head>
<body>

<div class="hotbar">🚨 접수 즉시 <strong>신속 연결</strong> 안내 · 24시간 접수</div>

<header class="site">
  <div class="nav">
    <a href="../index.html" class="brand">뉴월드<small>PLUMBING NETWORK</small></a>
    <nav class="nav-links">
      <a href="../index.html#symptoms">증상별 서비스</a>
      <a href="../index.html#coverage">출동/연계 지역</a>
      <a href="../index.html#how">이용 방법</a>
      <a href="../index.html#faq">자주 묻는 질문</a>
    </nav>
    <a class="nav-call" href="tel:010-2159-5341">📞 010-2159-5341</a>
  </div>
</header>

<section class="case-hero">
  <div class="wrap">
    <a class="case-back" href="${area}.html">← ${area} 안내로</a>
    <h1>${area} ${sym} 비용·업체·출장 안내</h1>
    <p class="meta">접수하신 내용을 확인해 가장 빠르게 연결해 드립니다.</p>
  </div>
</section>

<section class="case-article">
  <div class="wrap">
    <h2>${area} ${sym}, 이런 문제라면 접수해 주세요</h2>
    <p>${desc}. ${area} 지역에서 ${sym} 비용이 궁금하시거나 믿을 수 있는 업체의 출장 연결이 필요하시면 접수해 주세요. 접수 건은 확인 후 신속하게 연결해 안내해 드립니다. 현장 진단 후 견적에 동의하신 뒤에만 작업이 진행됩니다.</p>
    <h2>자주 묻는 질문</h2>
    <p>접수와 비용 관련 안내는 <a href="../index.html#faq">자주 묻는 질문</a>을 참고해 주세요.</p>
  </div>
</section>

<footer class="site">
  <div class="wrap">
    <div class="footer-legal">
      © 2026 뉴월드. All rights reserved. (임시 상호 — 확정되는 대로 변경 예정)
    </div>
  </div>
</footer>

</body>
</html>
HTML
  done
done

total_areas=${#AREAS[@]}
total_symptoms=${#SYMPTOMS[@]}
echo "지역 허브: ${total_areas}개 / 증상별 서브페이지: $((total_areas * total_symptoms))개 / 합계: $((total_areas + total_areas * total_symptoms))개"
