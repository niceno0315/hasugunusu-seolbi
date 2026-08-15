#!/bin/bash
set -e
cd "$(dirname "$0")/.."

AREAS=(
  # 서울
  "강남구" "강동구" "강북구" "강서구" "관악구" "광진구" "구로구" "금천구"
  "노원구" "도봉구" "동대문구" "동작구" "마포구" "서대문구" "서초구" "성동구"
  "성북구" "송파구" "양천구" "영등포구" "용산구" "은평구" "중랑구" "중구"
  # 인천
  "연수구" "계양구" "미추홀구" "남동구" "부평구"
  # 경기(구 분할 도시)
  "덕양구" "일산" "원미구" "소사구" "오정구" "수정구" "중원구" "분당구"
  "장안구" "권선구" "팔달구" "영통구" "단원구" "상록구" "만안구" "동안구"
  "기흥구" "처인구" "수지구"
  # 경기(단일 시/군)
  "가평" "과천" "광주" "광명" "구리" "김포" "남양주" "동두천" "시흥"
  "안성" "양주" "양평" "여주" "오산" "의왕" "의정부" "이천" "파주"
  "평택" "포천" "하남" "화성"
  # 충남
  "아산" "천안 서북구"
  # 세종
  "세종"
  # 대전
  "유성구" "대덕구"
)

mkdir -p areas

for area in "${AREAS[@]}"; do
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
<link rel="stylesheet" href="../css/style.css?v=1">
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
    <span class="nav-call">📞 상담 번호 준비중</span>
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

echo "생성 완료: ${#AREAS[@]}개 지역 페이지"
