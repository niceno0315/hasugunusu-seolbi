"use strict";
const fs = require("fs");
const path = require("path");

function walk(dir, out) {
  for (const name of fs.readdirSync(dir)) {
    if (name === ".git") continue;
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, out);
    else out.push(p);
  }
}

const all = [];
walk(".", all);
let changed = 0;
const changedFiles = [];
for (const p of all) {
  if (!/\.(html|js|sh)$/.test(p)) continue;
  let t;
  try {
    t = fs.readFileSync(p, "utf8");
  } catch (e) {
    continue;
  }
  if (!t.includes("101호")) continue;
  const nt = t.split("경기 평택시 죽백1길 51 1층").join("경기 평택시 죽백1길 51 1층");
  if (nt !== t) {
    fs.writeFileSync(p, nt);
    changed++;
    const rel = p.replace(/^\.[\\/]/, "").split(path.sep).join("/");
    changedFiles.push(rel);
  }
}
console.log("changed:", changed);
fs.writeFileSync("address_fix_filelist.txt", changedFiles.join("\n"));
