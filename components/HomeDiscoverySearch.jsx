"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { catalog, catLabel } from "@/data/catalog";
import { normalizeSearch, searchCatalog } from "@/lib/search";
import { useSpeechRecognition } from "@/lib/useSpeechRecognition";
import { CameraIcon, MicIcon, SearchIcon } from "@/components/Icons";

const suggestions = ["Phố cổ", "Tạ Hiện", "Hàng Mã", "Đồng Xuân", "Mã Mây", "Cà phê trứng", "Ẩm thực phố cổ"];
const excludedWords = new Set(["toi", "minh", "muon", "tim", "kiem", "cho", "xem", "kham", "pha", "di", "den", "o", "tai", "pho", "co", "ha", "noi", "mot", "nhung", "cai", "ve", "co", "gi", "nao", "duoc", "khong", "gan", "day", "hay", "giup", "voi", "an", "uong", "dich", "vu"]);

function discover(query) {
  const value = query.trim();
  if (!value) return [];
  const direct = searchCatalog(catalog, value, catLabel);
  if (direct.length) return direct.slice(0, 8);
  const keywords = normalizeSearch(value).split(/\s+/).filter((w) => w.length > 1 && !excludedWords.has(w));
  if (!keywords.length) return [];
  return catalog.filter((item) => {
    const text = normalizeSearch([item.name, item.area, item.summary, catLabel(item.cat)].join(" "));
    return keywords.every((word) => text.includes(word));
  }).slice(0, 8);
}

function destinationHref(item) {
  return item.cat === "destination" ? `/destination?d=${encodeURIComponent(item.destinationSlug || item.id)}` : `/item?id=${encodeURIComponent(item.id)}`;
}
function openExistingCamera() {
  window.dispatchEvent(new CustomEvent("wayecho:open-ai-camera"));
}

export function HomeDiscoveryHeroActions() {
  function openVoice() {
    document.getElementById("wayecho-home-discovery")?.scrollIntoView({ behavior: "smooth", block: "center" });
    window.dispatchEvent(new CustomEvent("wayecho:home-voice"));
  }
  return <div className="mt-7 flex flex-wrap gap-3">
    <button type="button" onClick={openVoice} className="btn-3d px-6 py-3.5 text-base sm:text-lg flex items-center gap-2"><MicIcon size={22} /> Bắt đầu bằng giọng nói</button>
    <button type="button" onClick={openExistingCamera} className="btn-ghost hc-border text-base sm:text-lg rounded-full bg-white/70 backdrop-blur-md hover:bg-white flex items-center gap-2"><CameraIcon size={22} /> Mở trợ lý camera</button>
  </div>;
}

export default function HomeDiscoverySearch() {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [notice, setNotice] = useState("");
  const input = useRef(null);
  const { supported, listening, start, stop, error } = useSpeechRecognition({
    onResult: (spoken) => {
      setQuery(spoken);
      setSubmitted(true);
      setNotice(`Đã nhận giọng nói: ${spoken}. Kết quả hiển thị ngay bên dưới.`);
    },
  });
  const results = useMemo(() => submitted ? discover(query) : [], [query, submitted]);
  function listen() {
    if (listening) { stop(); setNotice("Đã dừng ghi âm."); return; }
    if (!supported || !start()) {
      setNotice("Trình duyệt chưa hỗ trợ nhận diện giọng nói hoặc chưa cho phép micro. Bạn vẫn có thể gõ để tìm.");
      input.current?.focus();
      return;
    }
    setNotice("Đang lắng nghe. Hãy nói tên địa điểm hoặc dịch vụ bạn muốn tìm.");
  }
  useEffect(() => {
    const onVoice = () => listen();
    window.addEventListener("wayecho:home-voice", onVoice);
    return () => window.removeEventListener("wayecho:home-voice", onVoice);
  });
  useEffect(() => () => { stop(); }, [stop]);
  function search(value) { setQuery(value); setSubmitted(true); setNotice(""); }
  function submit(e) { e.preventDefault(); search(query); }
  return <section id="wayecho-home-discovery" className="container-page pb-7 relative z-10" aria-labelledby="wayecho-discovery-title">
    <div className="glass-liquid-warm rounded-[24px] p-5 card-3d hc-surface hc-border sm:p-7">
      <h2 id="wayecho-discovery-title" className="text-3xl text-[#352016]">Bạn muốn khám phá Hà Nội như thế nào?</h2>
      <p className="hc-muted mt-1 text-ink-soft">Nhập hoặc nói tên địa điểm, trải nghiệm hay dịch vụ; kết quả xuất hiện tại đây, không cần mở trang tìm kiếm khác.</p>
      <form role="search" onSubmit={submit} className="mt-4 flex items-center gap-2">
        <label htmlFor="wayecho-home-search" className="sr-only">Bạn muốn đi đâu, làm gì ở Phố cổ Hà Nội?</label>
        <div className="glass-liquid flex min-h-[54px] min-w-0 flex-1 items-center gap-3 rounded-2xl border border-[#eedecb] px-4 shadow-sm focus-within:border-[#f8ae38] hc-surface hc-border">
          <SearchIcon size={21} />
          <input ref={input} id="wayecho-home-search" value={query} onChange={(e) => { setQuery(e.target.value); setSubmitted(false); }} placeholder="Bạn muốn đi đâu, làm gì ở Phố cổ Hà Nội?" className="min-w-0 w-full bg-transparent py-3 text-ink outline-none placeholder:text-ink-soft" />
        </div>
        <button type="submit" className="min-h-[54px] rounded-2xl bg-[#f8ae38] px-4 font-bold shadow-sm hover:bg-[#e09f2f]" aria-label="Tìm kiếm">Tìm</button>
        <button type="button" onClick={listen} aria-pressed={listening} aria-label={listening ? "Dừng thu giọng nói" : "Tìm bằng giọng nói"} className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full btn-3d shadow-md"><MicIcon size={22} /></button>
        <button type="button" onClick={openExistingCamera} aria-label="Mở Camera AI hiện có" className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#f4ead7] border border-[#eedecb] text-ink shadow-sm hover:bg-[#faedd8] transition-colors"><CameraIcon size={22} /></button>
      </form>
      {(notice || error) && <p className="mt-3 text-sm text-[#7d4618]" role="status" aria-live="polite">{error || notice}</p>}
      <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
        <span className="font-semibold text-[#352016]">Gợi ý nhanh:</span>
        {suggestions.map((label) => <button type="button" key={label} onClick={() => search(label)} className="rounded-full bg-surface-alt border border-[#eedecb]/60 px-4 py-2 font-semibold hover:border-[#f8ae38] hover:bg-[#fff0df] transition-colors">{label}</button>)}
      </div>
      {submitted && <div className="mt-5 border-t border-[#eedecb] pt-4" aria-live="polite">
        <div className="flex flex-wrap items-center justify-between gap-2"><h3 className="text-xl font-bold text-[#352016]">Kết quả cho “{query.trim() || ""}”</h3><span className="text-sm text-ink-soft">{results.length} kết quả hiển thị</span></div>
        {results.length ? <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{results.map(item => <Link key={`${item.cat}-${item.id}`} href={destinationHref(item)} className="rounded-2xl border border-[#eedecb] bg-white p-4 shadow-sm hover:border-[#f8ae38] focus-visible:outline-4 focus-visible:outline-orange-500"><span className="text-xs text-[#875729]">{catLabel(item.cat)} · {item.area || "Phố cổ Hà Nội"}</span><span className="mt-1 block font-bold text-[#352016]">{item.name}</span><span className="mt-2 block text-sm text-[#a34c10]">Xem chi tiết →</span></Link>)}</div> : <p className="mt-3 text-sm text-ink-soft">Chưa tìm thấy kết quả khớp trong dữ liệu WayEcho. Hãy thử tên địa điểm ngắn hơn hoặc xem từng danh mục bên dưới.</p>}
        <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold"><Link className="text-[#985012] underline" href="/destination">Khám phá điểm đến</Link><Link className="text-[#985012] underline" href="/explore">Xem các dịch vụ</Link><Link className="text-[#985012] underline" href="/navigation">Bản đồ du lịch</Link></div>
      </div>}
    </div>
  </section>;
}
