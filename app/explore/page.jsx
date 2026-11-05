"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import CatalogCard from "@/components/CatalogCard";
import { SERVICE_CONFIG, LEVEL_ALL, levelOptions, filterByLevel, withDisplayLevel, DEMO_LEVELS } from "@/data/serviceDiscovery";
import { EXPLORE_APPROVED_ITEMS } from "@/data/exploreApprovedData";
import { itemA11y, A11Y_FILTERS } from "@/data/businesses";

function ExploreContent() {
  const params = useSearchParams();
  const categories = [
    {id:"all",label:"Tất cả dịch vụ"},
    {id:"activity",label:"Tour & Trải nghiệm"},
    {id:"destination",label:"Điểm đến"},
    {id:"restaurant",label:"Ẩm thực"},
    {id:"accommodation",label:"Lưu trú"},
    {id:"transport",label:"Di chuyển"},
    {id:"ticket",label:"Vé tham quan"},
  ];
  // Các lối đi này dùng chung với menu Dịch vụ ở Header, không tạo danh mục giả.
  const serviceShortcuts = [
    {label:"Guide đồng hành",href:"/services/guides"},
    {label:"Đặt dịch vụ",href:"/booking"},
  ];
  const requestedCat = params.get("cat") || "all";
  const cat = categories.some(c=>c.id === requestedCat) ? requestedCat : "all";
  const [filters, setFilters] = useState({});
  const [query, setQuery] = useState("");
  const [transportType, setTransportType] = useState("all");
  const [dataMode, setDataMode] = useState("demo");
  const [level, setLevel] = useState(LEVEL_ALL);
  const cfg = cat === "all" ? {title:"Khám phá & Dịch vụ Phố cổ Hà Nội",intro:"Lựa chọn điểm đến, trải nghiệm, nơi ở, ẩm thực, phương tiện và vé tham quan theo từng danh mục."} : SERVICE_CONFIG[cat];

  const active = Object.keys(filters).filter((k) => filters[k]);
  const selected = cat === "all" ? EXPLORE_APPROVED_ITEMS : EXPLORE_APPROVED_ITEMS.filter(it=>it.cat===cat);
  const catItems = selected.map(it => ({...it, displayLevel:it.level, levelIsDemo:false}));
  const levels = levelOptions(catItems);
  const items = filterByLevel(catItems, level).filter((it) => {
    if (dataMode === "verified" && it.a11yVerified !== true) return false;
    if (cat === "transport" && transportType !== "all" && it.transportType !== transportType) return false;
    if (query.trim() && ![it.name,it.area,it.summary].join(" ").toLowerCase().includes(query.trim().toLowerCase())) return false;
    if (active.length === 0) return true;
    // The seven properties in the supplied document are simulated. Unknown must not be treated as verified.
    const a = itemA11y(it, { mode: dataMode });
    return active.every((k) => dataMode === "demo" && a[k]);
  });

  function toggle(k) {
    setFilters((f) => ({ ...f, [k]: !f[k] }));
  }

  return (
    <div className="container-page py-10">
      <p className="text-sm text-ink-soft hc-muted">
        <Link href="/" className="hover:underline">Trang chủ</Link> · Khám phá
      </p>
      <h1 className="mt-2 text-4xl sm:text-5xl">{cfg.title}</h1>
      <p className="hc-muted mt-2 max-w-2xl text-lg text-ink-soft">{cfg.intro} Thông tin tiếp cận chỉ mang tính tham khảo, chưa thay thế khảo sát tại chỗ.</p>

      {requestedCat !== cat && <p role="status" className="mt-3">Danh mục không tồn tại; đang hiển thị tất cả dịch vụ.</p>}
      {/* Tabs danh mục */}
      <nav aria-label="Danh mục" className="mt-5 flex flex-wrap gap-2">
        {categories.map((c) => (
          <Link
            key={c.id}
            href={`/explore?cat=${c.id}`}
            aria-current={c.id === cat ? "page" : undefined}
            onClick={() => setLevel(LEVEL_ALL)}
            className={`inline-flex min-h-[44px] items-center rounded-pill px-4 text-sm font-semibold transition-colors ${
              c.id === cat ? "bg-primary text-ink" : "border border-line bg-white text-ink hover:bg-surface-alt hc-surface hc-border"
            }`}
          >
            {c.label}
          </Link>
        ))}
        {serviceShortcuts.map((item) => (
          <Link key={item.href} href={item.href} className="inline-flex min-h-[44px] items-center rounded-pill border border-line bg-white px-4 text-sm font-semibold text-ink hover:bg-surface-alt focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500">{item.label}</Link>
        ))}
      </nav>

      {/* Lien thong ban do: nhan vao ban do xem truoc de mo trang ban do du lich hien co. */}
      <Link
        href="/navigation"
        aria-label="Mở Bản đồ du lịch Phố cổ Hà Nội"
        className="group mt-6 flex w-full items-center gap-4 rounded-2xl border border-[#efd5ad] bg-[#fff9ef] p-3 shadow-sm transition hover:border-[#f8ae38] hover:shadow-md focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#eaa129] sm:max-w-xl"
      >
        <div aria-hidden="true" className="relative h-28 w-36 shrink-0 overflow-hidden rounded-xl border border-[#f0dfbf] bg-[#f6e6c7] sm:h-32 sm:w-48">
          <svg viewBox="0 0 200 140" className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="140" fill="#f7e8cb" />
            <path d="M165 -5 Q146 46 175 80 Q194 105 181 150" fill="none" stroke="#aad7df" strokeWidth="34" />
            <path d="M-10 30 L208 83 M2 121 L155 -4 M-9 74 L212 113 M50 -12 L118 145 M-5 10 L195 46" stroke="#fffdf5" strokeWidth="12" fill="none" />
            <path d="M-10 30 L208 83 M2 121 L155 -4 M-9 74 L212 113 M50 -12 L118 145 M-5 10 L195 46" stroke="#e6cfa5" strokeWidth="1" fill="none" />
            <g fill="#f18d23" stroke="white" strokeWidth="2"><circle cx="60" cy="41" r="8"/><circle cx="104" cy="77" r="8"/><circle cx="69" cy="100" r="8"/></g>
            <text x="8" y="18" fill="#77512c" fontSize="10" fontWeight="bold">Phố cổ Hà Nội</text>
          </svg>
          <span className="absolute bottom-1 left-2 rounded-md bg-white/95 px-2 py-0.5 text-[10px] font-semibold text-[#84551e]">Sơ đồ minh họa</span>
        </div>
        <span className="min-w-0 flex-1">
          <span className="block text-lg font-bold text-ink">Bản đồ du lịch Phố cổ</span>
          <span className="mt-1 block text-sm text-ink-soft">Xem bản đồ văn hóa, các điểm đến và thông tin hỗ trợ tiếp cận trên trang bản đồ hiện có.</span>
          <span className="mt-2 inline-block text-sm font-bold text-[#a7500a] underline underline-offset-2 group-hover:text-[#783600]">Mở bản đồ du lịch →</span>
        </span>
      </Link>

      <div className="mt-5 rounded-2xl border border-amber-300 bg-[#fff9ed] p-4">
        <p className="font-semibold">Độ tin cậy của dữ liệu trợ năng</p>
        <p className="mt-1 text-sm text-ink-soft">Mặc định chỉ hiện dịch vụ có bằng chứng xác minh theo từng tiêu chí. Chế độ minh họa giúp thử giao diện và không khẳng định khả năng tiếp cận thực tế.</p>
        <div className="mt-3 flex flex-wrap gap-3">
          <button type="button" aria-pressed={dataMode === "verified"} onClick={() => { setDataMode("verified"); setLevel(LEVEL_ALL); }} className={`min-h-11 rounded-full px-4 font-semibold ${dataMode === "verified" ? "bg-primary" : "border border-line bg-white"}`}>Đã xác minh</button>
          <button type="button" aria-pressed={dataMode === "demo"} onClick={() => { setDataMode("demo"); setLevel(LEVEL_ALL); }} className={`min-h-11 rounded-full px-4 font-semibold ${dataMode === "demo" ? "bg-primary" : "border border-line bg-white"}`}>Dữ liệu minh họa</button>
        </div>
      </div>
      {cat === "transport" && (
        <section className="mt-6 rounded-2xl border border-[#eed5a6] bg-white p-5" aria-labelledby="transport-types-title">
          <h2 id="transport-types-title" className="text-xl font-bold">Dịch vụ di chuyển cho người khiếm thị</h2>
          <p className="mt-1 text-sm text-ink-soft">Tìm phương tiện, điểm đón và hỗ trợ di chuyển quanh Phố cổ Hà Nội. Tất cả thông tin hãng xe, giá và khả năng tiếp cận là DEMO; chưa xác nhận hợp tác.</p>
          <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Lọc theo phương tiện">
            {["all", "Xe buýt", "Xe điện", "Ô tô", "Xe máy", "Xích lô"].map((t) => (
              <button type="button" key={t} aria-pressed={transportType === t} onClick={() => setTransportType(t)} className={`min-h-11 rounded-full px-4 text-sm font-semibold ${transportType === t ? "bg-primary text-ink" : "border border-line bg-[#fff8e9] text-ink"}`}>{t === "all" ? "Tất cả" : t}</button>
            ))}
          </div>
          <p className="mt-3 text-xs text-ink-soft">Dịch vụ đi bộ đồng hành được quản lý riêng ở Cổng Hướng dẫn viên/Tình nguyện viên, không còn hiển thị như một loại xe.</p>
        </section>
      )}
      <label className="mt-5 block max-w-xl text-sm font-semibold">
        Tìm theo tên địa điểm hoặc dịch vụ
        <input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Ví dụ: Mã Mây, quán ăn, tour..." className="mt-2 block min-h-12 w-full rounded-xl border border-line bg-white px-4 text-base" />
      </label>
      {/* Bộ lọc accessibility */}
      <div className="mt-5 rounded-2xl border border-line bg-white p-4 hc-surface hc-border" role="group" aria-label="Lọc theo khả năng tiếp cận">
        <p className="mb-2 text-sm font-semibold text-ink-soft hc-muted">Lọc theo khả năng tiếp cận</p>
        {levels.length > 0 && (
          <label className="mb-3 flex flex-wrap items-center gap-2 font-semibold">
            <span>Mức độ tiếp cận</span>
            <select value={level} onChange={(e) => setLevel(e.target.value)} className="min-h-[44px] rounded-xl border border-line bg-white px-3 hc-surface hc-border">
              <option value={LEVEL_ALL}>Mọi mức độ tiếp cận</option>
              {levels.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
          </label>
        )}
        <div className="flex flex-wrap gap-2">
          {A11Y_FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => toggle(f.key)}
              aria-pressed={!!filters[f.key]}
              className={`inline-flex min-h-[40px] items-center rounded-pill px-3 text-sm font-semibold transition-colors ${
                filters[f.key] ? "bg-primary text-ink" : "border border-line bg-surface-alt text-ink hover:bg-white hc-surface hc-border"
              }`}
            >
              {f.label.replace(" (đã xác minh)", "")}
            </button>
          ))}
          {(active.length > 0 || level !== LEVEL_ALL) && (
            <button type="button" onClick={() => { setFilters({}); setLevel(LEVEL_ALL); }} className="inline-flex min-h-[40px] items-center px-3 text-sm font-semibold text-accent-dark hover:underline">
              Xóa lọc
            </button>
          )}
        </div>
      </div>

      <h2 className="mt-8 text-2xl" aria-live="polite">{items.length} kết quả · {dataMode === "verified" ? "Đã xác minh" : "Dữ liệu minh họa"}</h2>
      {items.length === 0 ? (
        <p className="hc-muted mt-4 text-ink-soft">Chưa có dịch vụ nào đáp ứng đồng thời các tiêu chí ở chế độ này. Nếu cần thử giao diện, chuyển sang Dữ liệu minh họa; không coi đây là dữ liệu đã khảo sát.</p>
      ) : (
        <div className="mt-4 grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => <CatalogCard key={it.id} item={it} />)}
        </div>
      )}
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="container-page py-10">Đang tải…</div>}>
      <ExploreContent />
    </Suspense>
  );
}
