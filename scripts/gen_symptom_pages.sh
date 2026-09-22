#!/bin/bash
set -e
cd "$(dirname "$0")/.."

AREAS=(
  # 서울
  "강남구" "강동구" "강북구" "강서구" "관악구" "광진구" "구로구" "금천구"
  "노원구" "도봉구" "동대문구" "동작구" "마포구" "서대문구" "서초구" "성동구"
  "성북구" "송파구" "양천구" "영등포구" "용산구" "은평구" "중랑구" "중구" "종로구"
  # 인천
  "연수구" "계양구" "미추홀구" "남동구" "부평구" "인천중구" "인천동구" "인천서구" "강화" "옹진"
  # 경기(구 분할 도시)
  "덕양구" "일산" "원미구" "소사구" "오정구" "수정구" "중원구" "분당구"
  "장안구" "권선구" "팔달구" "영통구" "단원구" "상록구" "만안구" "동안구"
  "기흥구" "처인구" "수지구"
  # 경기(단일 시/군)
  "가평" "과천" "광주" "광명" "구리" "김포" "남양주" "동두천" "시흥"
  "안성" "양주" "양평" "여주" "오산" "의왕" "의정부" "이천" "파주"
  "평택" "포천" "하남" "화성" "군포" "연천"
  # 부산
  "부산중구" "부산서구" "부산동구" "영도구" "부산진구" "동래구" "부산남구" "부산북구"
  "해운대구" "사하구" "금정구" "부산강서구" "연제구" "수영구" "사상구" "기장"
  # 대구
  "대구중구" "대구동구" "대구서구" "대구남구" "대구북구" "수성구" "달서구" "달성군"
  # 광주
  "광주동구" "광주서구" "광주남구" "광주북구" "광주광산구"
  # 대전
  "유성구" "대덕구" "대전동구" "대전중구" "대전서구"
  # 울산
  "울산중구" "울산남구" "울산동구" "울산북구" "울주군"
  # 세종
  "세종"
  # 강원
  "춘천" "원주" "강릉" "동해" "태백" "속초" "삼척" "홍천" "횡성" "영월"
  "평창" "정선" "철원" "화천" "양구" "인제" "강원고성" "양양"
  # 충북
  "청주상당구" "청주서원구" "청주흥덕구" "청주청원구" "충주" "제천" "보은" "옥천"
  "영동" "증평" "진천" "괴산" "음성" "단양"
  # 충남
  "아산" "천안서북구" "천안동남구" "공주" "보령" "서산" "논산" "계룡" "당진"
  "금산" "부여" "서천" "청양" "홍성" "예산" "태안"
  # 전북
  "전주완산구" "전주덕진구" "군산" "익산" "정읍" "남원" "김제" "완주" "진안"
  "무주" "장수" "임실" "순창" "고창" "부안"
  # 전남
  "목포" "여수" "순천" "나주" "광양" "담양" "곡성" "구례" "고흥" "보성"
  "화순" "장흥" "강진" "해남" "영암" "무안" "함평" "영광" "장성" "완도" "진도" "신안"
  # 경북
  "포항남구" "포항북구" "경주" "김천" "안동" "구미" "영주" "영천" "상주" "문경"
  "경산" "군위" "의성" "청송" "영양" "영덕" "청도" "고령" "성주" "칠곡" "예천" "봉화" "울진" "울릉"
  # 경남
  "창원의창구" "창원성산구" "창원마산합포구" "창원마산회원구" "창원진해구" "진주" "통영"
  "사천" "김해" "밀양" "거제" "양산" "의령" "함안" "창녕" "경남고성" "남해" "하동" "산청" "함양" "거창" "합천"
  # 제주
  "제주" "서귀포"
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

FOOTER_BLOCK='<footer class="site">
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
</footer>'

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
<title>${area} 배관·하수구막힘 접수 안내 | 하수구누수종합설비</title>
<meta name="description" content="${area} 지역 배관막힘, 하수구막힘, 누수 등 설비 문제 접수. 접수 즉시 확인 후 신속하게 연결해 드립니다.">
<meta name="robots" content="noindex, nofollow">
<!-- TODO: 정식 오픈 시 위 robots 메타태그 제거, canonical 추가 -->
<link rel="stylesheet" href="../css/style.css?v=5">
</head>
<body>

<div class="hotbar">🚨 접수 즉시 <strong>신속 연결</strong> 안내 · 24시간 접수</div>

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
</header>

<section class="case-hero">
  <div class="wrap">
    <a class="case-back" href="../index.html#coverage">← 출동/연계 지역으로</a>
    <h1>${area}, 배관·하수구막힘 어디로 접수하나요?</h1>
    <p class="meta">아래 답변과 증상별 안내를 확인해 주세요.</p>
  </div>
</section>

<section class="case-article">
  <div class="wrap">
    <div class="answer-box"><b>${area}</b> 지역은 접수 즉시 확인 후 신속하게 연결해 드립니다. 하수구막힘·변기막힘·싱크대막힘·누수 등 배관 관련 문제가 있으시면 전화로 접수해 주세요. 현장 진단 후 견적에 동의하신 뒤에만 작업이 진행됩니다.</div>
    <h2>${area} 증상별 안내</h2>
    <div class="coverage-tags">
$(echo -e "$links")
    </div>
  </div>
</section>

$FOOTER_BLOCK

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
<title>${area} ${sym} 비용·업체·출장 안내 | 하수구누수종합설비</title>
<meta name="description" content="${area} ${sym} 비용, 업체, 출장 문의는 여기서 접수하세요. ${desc}, 접수 즉시 확인 후 신속하게 연결해 드립니다.">
<meta name="robots" content="noindex, nofollow">
<!-- TODO: 정식 오픈 시 위 robots 메타태그 제거, canonical 추가 -->
<link rel="stylesheet" href="../css/style.css?v=5">
</head>
<body>

<div class="hotbar">🚨 접수 즉시 <strong>신속 연결</strong> 안내 · 24시간 접수</div>

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
</header>

<section class="case-hero">
  <div class="wrap">
    <a class="case-back" href="${area}.html">← ${area} 안내로</a>
    <h1>${area} ${sym}, 비용·업체·출장은 어떻게 되나요?</h1>
    <p class="meta">아래 답변을 확인하고, 접수는 전화로 바로 가능합니다.</p>
  </div>
</section>

<section class="case-article">
  <div class="wrap">
    <div class="answer-box">${desc}. <b>${area}</b> 지역에서 ${sym} 비용이 궁금하시거나 믿을 수 있는 업체의 출장 연결이 필요하시면 접수해 주세요. 접수 건은 확인 후 신속하게 연결해 안내해 드립니다. 현장 진단 후 견적에 동의하신 뒤에만 작업이 진행됩니다.</div>
    <h2>자주 묻는 질문</h2>
    <p>접수와 비용 관련 안내는 <a href="../index.html#faq">자주 묻는 질문</a>을 참고해 주세요.</p>
  </div>
</section>

$FOOTER_BLOCK

</body>
</html>
HTML
  done
done

total_areas=${#AREAS[@]}
total_symptoms=${#SYMPTOMS[@]}
echo "지역 허브: ${total_areas}개 / 증상별 서브페이지: $((total_areas * total_symptoms))개 / 합계: $((total_areas + total_areas * total_symptoms))개"
