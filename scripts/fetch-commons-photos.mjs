#!/usr/bin/env node
// Tải ảnh THẬT cho các điểm đến từ Wikimedia Commons, kiểm tra giấy phép, đổi sang WebP và lưu vào public/.
// Chạy trên GitHub Actions (workflow "fetch-commons-photos") hoặc máy có mạng:
//   npm i --no-save sharp && node scripts/fetch-commons-photos.mjs [--force] [--only=slug1,slug2]
//
// Nguyên tắc (khớp AGENTS.md mục 8.4):
//  - Chỉ nhận ảnh CC0 / Public domain / CC BY / CC BY-SA (loại NC, ND).
//  - Ảnh tìm theo từ khóa chỉ được nhận nếu TÊN FILE hoặc DANH MỤC Commons chứa tên địa điểm.
//    Không khớp thì để trống (giữ placeholder), không bao giờ gán ảnh địa điểm khác.
//  - Ảnh lưu cục bộ trong public/assets/images/destinations/, không phụ thuộc URL ngoài.
//  - Sinh data/destinationPhotos.js (credit, nguồn, giấy phép) và IMAGE_REPORT_COMMONS.md để người đối chiếu.

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const API = "https://commons.wikimedia.org/w/api.php";
const UA = "WayEchoImageFetcher/1.0 (https://github.com/lethanhtu2005-oss/wayecho_phoco_source_da_ghep_v7; image sourcing for an accessibility travel prototype)";
const OUT_DIR = path.join(ROOT, "public/assets/images/destinations");
const OUT_JS = path.join(ROOT, "data/destinationPhotos.js");
const OUT_REPORT = path.join(ROOT, "IMAGE_REPORT_COMMONS.md");

const args = process.argv.slice(2);
const FORCE = args.includes("--force");
const ONLY = (args.find((a) => a.startsWith("--only=")) || "").replace("--only=", "").split(",").filter(Boolean);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const norm = (s) => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").toLowerCase();
const stripHtml = (s) => String(s || "").replace(/<[^>]*>/g, " ").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#0?39;/g, "'").replace(/\s+/g, " ").trim();

async function api(params, attempt = 0) {
  const url = `${API}?${new URLSearchParams({ format: "json", formatversion: "2", origin: "*", ...params })}`;
  const res = await fetch(url, { headers: { "User-Agent": UA, "Api-User-Agent": UA } });
  if ((res.status === 429 || res.status >= 500) && attempt < 4) {
    await sleep(2000 * (attempt + 1));
    return api(params, attempt + 1);
  }
  if (!res.ok) throw new Error(`Commons API ${res.status}`);
  await sleep(700);
  return res.json();
}

const INFO = { prop: "imageinfo|categories", iiprop: "url|size|mime|extmetadata", iiurlwidth: "1600", iiextmetadatafilter: "LicenseShortName|Artist|ImageDescription|Credit", cllimit: "max", clshow: "!hidden" };

function licenseRank(short) {
  const s = String(short || "");
  if (/NC|ND/i.test(s)) return null;
  if (/^CC0/i.test(s) || /public domain/i.test(s) || /^PD/i.test(s)) return 0;
  if (/^CC BY-SA[ -]\d/i.test(s)) return 2;
  if (/^CC BY[ -]\d/i.test(s)) return 1;
  return null;
}

function toCandidate(page) {
  const ii = page.imageinfo?.[0];
  if (!ii) return null;
  const meta = ii.extmetadata || {};
  const license = stripHtml(meta.LicenseShortName?.value);
  return {
    title: page.title,
    file: page.title.replace(/^File:/, ""),
    page: `https://commons.wikimedia.org/wiki/${encodeURIComponent(page.title.replace(/ /g, "_")).replace(/%2F/g, "/")}`,
    mime: ii.mime,
    width: ii.width,
    height: ii.height,
    thumb: ii.thumburl || ii.url,
    license,
    licenseRank: licenseRank(license),
    author: (stripHtml(meta.Artist?.value) || "Không rõ tác giả").slice(0, 120),
    categories: (page.categories || []).map((c) => c.title),
  };
}

async function byTitle(file) {
  const data = await api({ action: "query", titles: `File:${file}`, ...INFO });
  const page = data.query?.pages?.[0];
  return page && !page.missing ? toCandidate(page) : null;
}

async function bySearch(q) {
  const data = await api({ action: "query", generator: "search", gsrsearch: `${q} filetype:bitmap`, gsrnamespace: "6", gsrlimit: "25", ...INFO });
  return (data.query?.pages || []).map(toCandidate).filter(Boolean);
}

function titleMatches(c, tokens) {
  const raw = c.title.toLowerCase().normalize("NFC");
  const plain = norm(c.title);
  return tokens.some((m) => (m.startsWith("=") ? raw.includes(m.slice(1).normalize("NFC")) : plain.includes(norm(m))));
}

function pickBest(cands, cfg, exclude, context, used) {
  const scored = [];
  for (const c of cands) {
    if (c.licenseRank == null || c.licenseRank === 0) continue; // ảnh tìm theo từ khóa: bỏ CC0/PD vì thường là tư liệu cũ
    if (used.has(c.title)) continue; // không dùng một ảnh cho hai địa điểm
    if (!/^image\/(jpeg|png)$/.test(c.mime || "")) continue;
    if (exclude.test(norm(c.title))) continue;
    const ratio = c.width / c.height;
    if (c.width < 1000 || ratio < 1.1 || ratio > 2.4) continue;
    if (!titleMatches(c, cfg.must)) continue; // chỉ nhận khi TÊN FILE chứa tên địa điểm; danh mục chung không đủ tin cậy
    if (cfg.needContext && !context.test(`${norm(c.title)} | ${c.categories.map(norm).join(" | ")}`)) continue;
    scored.push({ c, ratioDist: Math.abs(ratio - 1.5) });
  }
  scored.sort((a, b) => a.c.licenseRank - b.c.licenseRank || Math.min(b.c.width, 3000) - Math.min(a.c.width, 3000) || a.ratioDist - b.ratioDist);
  return { best: scored[0]?.c || null, considered: scored.length };
}

async function download(url, attempt = 0) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if ((res.status === 429 || res.status >= 500) && attempt < 4) {
    await sleep(3000 * (attempt + 1));
    return download(url, attempt + 1);
  }
  if (!res.ok) throw new Error(`Tải ảnh thất bại ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

async function main() {
  const { default: sharp } = await import("sharp");
  const map = JSON.parse(await fs.readFile(path.join(ROOT, "scripts/commons-photo-map.json"), "utf8"));
  const exclude = new RegExp(map.titleExclude, "i");
  const context = new RegExp(map.placeContext, "i");
  const used = new Set();
  await fs.mkdir(OUT_DIR, { recursive: true });

  let existing = {};
  try {
    const text = await fs.readFile(OUT_JS, "utf8");
    existing = JSON.parse(text.slice(text.indexOf("const photos = ") + 15, text.lastIndexOf(";\nexport default")));
  } catch { /* chưa có hoặc hỏng: tải lại từ đầu */ }

  const results = {};
  const report = [];
  for (const [slug, cfg] of Object.entries(map.places)) {
    if (ONLY.length && !ONLY.includes(slug)) { if (existing[slug]) results[slug] = existing[slug]; continue; }
    const outFile = path.join(OUT_DIR, `${slug}.webp`);
    if (!FORCE && existing[slug]) {
      try { await fs.access(outFile); results[slug] = existing[slug]; report.push({ slug, cfg, status: "giữ nguyên", pick: existing[slug] }); continue; } catch { /* tải lại */ }
    }
    let best = null;
    let how = "";
    let considered = 0;
    try {
      if (cfg.pinned) {
        const c = await byTitle(cfg.pinned);
        if (c && c.licenseRank != null) { best = c; how = "ghim sẵn trong repo"; }
        else report.push({ slug, cfg, status: `file ghim không dùng được (${c ? c.license || "không rõ giấy phép" : "không tìm thấy"})` });
      }
      if (!best && cfg.queries) {
        const pool = new Map();
        for (const q of cfg.queries) for (const c of await bySearch(q)) pool.set(c.title, c);
        const r = pickBest([...pool.values()], cfg, exclude, context, used);
        best = r.best; considered = r.considered; how = `tìm theo từ khóa (${pool.size} ứng viên, ${considered} đạt lọc)`;
      }
    } catch (e) {
      report.push({ slug, cfg, status: `lỗi API: ${e.message}` });
      continue;
    }
    if (!best) {
      if (!report.some((r) => r.slug === slug)) report.push({ slug, cfg, status: "KHÔNG tìm được ảnh đạt điều kiện — giữ placeholder" });
      continue;
    }
    used.add(best.title);
    const raw = await download(best.thumb);
    const img = sharp(raw, { failOn: "none" }).rotate();
    await img.clone().resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 78, effort: 5 }).toFile(outFile);
    await img.clone().resize({ width: 800, withoutEnlargement: true }).webp({ quality: 76, effort: 5 }).toFile(path.join(OUT_DIR, `${slug}-800.webp`));
    const base = `/assets/images/destinations/${slug}`;
    results[slug] = {
      image: `${base}.webp`,
      imageSrcSet: `${base}-800.webp 800w, ${base}.webp 1600w`,
      alt: `Ảnh chụp thực tế liên quan đến ${cfg.name}, Hà Nội (tên ảnh gốc trên Commons: ${best.file.replace(/\.[a-z]+$/i, "").replace(/\s*\(\d{6,}\)\s*$/, "")}).`,
      imageCredit: `${best.author} · Wikimedia Commons · ${best.license}`,
      imageSource: best.page,
      file: best.file,
      license: best.license,
      author: best.author,
    };
    report.push({ slug, cfg, status: `đã tải (${how})`, pick: results[slug], size: `${best.width}×${best.height}` });
    console.log(`✔ ${slug}: ${best.file} [${best.license}]`);
  }

  if (!ONLY.length) {
    for (const f of await fs.readdir(OUT_DIR)) {
      const slug = f.replace(/(-800)?\.webp$/, "");
      if (/\.webp$/.test(f) && !results[slug]) await fs.rm(path.join(OUT_DIR, f));
    }
  }

  const body = `// TỆP SINH TỰ ĐỘNG bởi scripts/fetch-commons-photos.mjs — không sửa tay.\n// Ghi đè ảnh/credit của điểm đến trong data/destinations.js. Slug không có ở đây giữ nguyên dữ liệu cũ.\nconst photos = ${JSON.stringify(results, null, 2)};\nexport default photos;\n`;
  await fs.writeFile(OUT_JS, body);

  const rows = report.map((r) => {
    const p = r.pick;
    return `| ${r.slug} | ${r.cfg.name} | ${r.status} | ${p ? `[${p.file}](${p.imageSource})` : "—"} | ${p ? p.author.replace(/\|/g, "/") : "—"} | ${p ? p.license : "—"} |`;
  });
  const missing = report.filter((r) => !r.pick).map((r) => `- \`${r.slug}\` (${r.cfg.name}): ${r.status}`);
  await fs.writeFile(
    OUT_REPORT,
    `# Báo cáo ảnh thật từ Wikimedia Commons\n\nSinh tự động ngày ${new Date().toISOString().slice(0, 10)} bởi \`scripts/fetch-commons-photos.mjs\`.\n\n**Cần người đối chiếu**: script chỉ chọn ảnh có tên file hoặc danh mục Commons chứa tên địa điểm và giấy phép CC0/PD/CC BY/CC BY-SA. Hãy mở link từng ảnh để xác nhận đúng địa điểm trước khi phát hành. Văn bản \`alt\` đang để mô tả chung; nên chỉnh lại sau khi xem ảnh.\n\n| Slug | Địa điểm | Trạng thái | Ảnh (Commons) | Tác giả | Giấy phép |\n| --- | --- | --- | --- | --- | --- |\n${rows.join("\n")}\n\n## Chưa có ảnh đạt điều kiện\n\n${missing.join("\n") || "Không có."}\n`
  );
  console.log(`Xong: ${Object.keys(results).length}/${Object.keys(map.places).length} địa điểm có ảnh.`);
}

main().catch((e) => { console.error(e); process.exit(1); });
