// GitHub Contents API로 파일을 삭제하는 스크립트 (git push가 안 되는 환경 대응)
"use strict";
const { execFileSync } = require("child_process");
const REPO = "niceno0315/hasugunusu-seolbi";
const BRANCH = "master";

function ghApi(args) {
  return execFileSync("gh", ["api", ...args], { encoding: "utf8", maxBuffer: 1024 * 1024 * 50 });
}

const files = process.argv.slice(2);
let ok = 0, fail = 0;
for (const rel of files) {
  let sha;
  try {
    sha = ghApi([`repos/${REPO}/contents/${rel}`, "--jq", ".sha"]).trim();
  } catch (e) {
    console.log("SKIP (not found)", rel);
    continue;
  }
  try {
    ghApi([
      `repos/${REPO}/contents/${rel}`,
      "--method", "DELETE",
      "-f", `message=삭제: 잘못 명명된 파일 제거 (${rel})`,
      "-f", `sha=${sha}`,
      "-f", `branch=${BRANCH}`,
    ]);
    console.log("DELETED", rel);
    ok++;
  } catch (e) {
    console.log("FAIL", rel, e.message.slice(0, 200));
    fail++;
  }
}
console.log(`\n완료: 삭제 ${ok} / 실패 ${fail} / 총 ${files.length}`);
