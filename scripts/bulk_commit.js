// 대량 파일 변경을 Git Trees API로 한 번에 커밋 (git push가 안 되는 환경 + 파일별 API 호출은 너무 느림)
"use strict";
const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");

const REPO = "niceno0315/hasugunusu-seolbi";
const BRANCH = "master";
const ROOT = path.join(__dirname, "..");

function gh(args) {
  return execFileSync("gh", ["api", ...args], { encoding: "utf8", maxBuffer: 1024 * 1024 * 200 });
}

const listFile = process.argv[2];
const message = process.argv[3] || "대량 파일 업데이트";
const files = fs.readFileSync(listFile, "utf8").split("\n").map((s) => s.trim()).filter(Boolean);
console.log("파일 수:", files.length);

const refInfo = JSON.parse(gh([`repos/${REPO}/git/ref/heads/${BRANCH}`]));
const commitSha = refInfo.object.sha;
console.log("현재 커밋:", commitSha);

const commitInfo = JSON.parse(gh([`repos/${REPO}/git/commits/${commitSha}`]));
const baseTreeSha = commitInfo.tree.sha;
console.log("베이스 트리:", baseTreeSha);

const treeEntries = files.map((rel) => {
  const abs = path.join(ROOT, rel);
  const content = fs.readFileSync(abs, "utf8");
  return { path: rel, mode: "100644", type: "blob", content };
});

const treePayloadPath = path.join(os.tmpdir(), "gh_tree_payload.json");
fs.writeFileSync(treePayloadPath, JSON.stringify({ base_tree: baseTreeSha, tree: treeEntries }));
console.log("트리 생성 중... (파일 크기: " + (fs.statSync(treePayloadPath).size / 1024 / 1024).toFixed(1) + "MB)");
const newTree = JSON.parse(gh([`repos/${REPO}/git/trees`, "--input", treePayloadPath]));
console.log("새 트리:", newTree.sha);

const commitPayloadPath = path.join(os.tmpdir(), "gh_commit_payload.json");
fs.writeFileSync(commitPayloadPath, JSON.stringify({ message, tree: newTree.sha, parents: [commitSha] }));
const newCommit = JSON.parse(gh([`repos/${REPO}/git/commits`, "--input", commitPayloadPath]));
console.log("새 커밋:", newCommit.sha);

gh([`repos/${REPO}/git/refs/heads/${BRANCH}`, "--method", "PATCH", "-f", `sha=${newCommit.sha}`, "-f", "force=false"]);
console.log("완료: master 브랜치가 새 커밋을 가리키도록 업데이트됨");

fs.unlinkSync(treePayloadPath);
fs.unlinkSync(commitPayloadPath);
