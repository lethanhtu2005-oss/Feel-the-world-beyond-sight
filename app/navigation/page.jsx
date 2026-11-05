"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { destinations } from "@/data/destinations";
import { culturalEvents } from "@/data/culturalEvents";
import VoiceDistanceFinder from "@/components/VoiceDistanceFinder";
import { validCoordinates } from "@/lib/navigationTarget";

const MapView = dynamic(() => import("@/components/MapView"), {
  ssr: false,
  loading: () => <div className="flex h-full items-center justify-center bg-[#fff6e8] text-[#675b51]">Đang tải bản đồ OpenStreetMap…</div>,
});

const CENTER = [21.0357, 105.8523];
const IMAGE_FALLBACK = "/assets/images/location-image-unavailable.svg";
const featuredSlugs = ["cho-dong-xuan", "nha-co-87-ma-may", "den-bach-ma", "o-quan-chuong"];
const layers = [
  { id: "destination", label: "Điểm đến văn hóa", description: "Di tích, kiến trúc, phố nghề và điểm tham quan.", icon: "🏛️", image: "/assets/images/destinations/den-bach-ma-800.webp" },
  { id: "event", label: "Sự kiện văn hóa", description: "Thông tin sự kiện tham khảo; cần kiểm tra lịch trước khi đến.", icon: "🎭", image: "/assets/images/destinations/dinh-kim-ngan-800.webp" },
  { id: "service", label: "Dịch vụ hỗ trợ", description: "Xem dịch vụ trên WayEcho; chưa có ghim tọa độ đã xác minh.", icon: "🤝", image: "/assets/images/destinations/cho-dong-xuan-800.webp" },
];

const normalize = value => String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").toLowerCase().trim();
const distanceKm = (a, b) => {
  const toRad = n => n * Math.PI / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lng - a.lng);
  const z = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLon / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(z), Math.sqrt(1 - z));
};

function NavigationContent() {
  const params = useSearchParams();
  const initialSlug = params.get("to") || "";
  const places = useMemo(() => destinations.filter(d => validCoordinates(d.coordinates)), []);
  const [tab, setTab] = useState("directions");
  const [selectedSlug, setSelectedSlug] = useState(initialSlug);
  const [from, setFrom] = useState(null);
  const [fromLabel, setFromLabel] = useState("Chưa chọn điểm xuất phát");
  const [placeSearch, setPlaceSearch] = useState("");
  const [mapSearch, setMapSearch] = useState("");
  const [visibleLayers, setVisibleLayers] = useState({ destination: true, event: true, service: true });
  const [voiceOpen, setVoiceOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [gettingLocation, setGettingLocation] = useState(false);
  const selected = places.find(d => d.slug === selectedSlug);
  const mapCenter = selected ? [selected.coordinates.lat, selected.coordinates.lng] : CENTER;

  const destinationPoints = useMemo(() => places.map(d => ({
    id: `dest-${d.slug}`, name: d.name, lat: d.coordinates.lat, lng: d.coordinates.lng,
    href: `/destination?d=${encodeURIComponent(d.slug)}`, color: "#ed8118",
    level: "Chưa xác minh khảo sát tiếp cận", category: "Điểm đến",
  })), [places]);
  const eventPoints = useMemo(() => culturalEvents.filter(e => validCoordinates(e.coordinates)).map(e => ({
    id: `event-${e.id}`, name: e.title, lat: e.coordinates.lat, lng: e.coordinates.lng,
    href: `/destination?d=${encodeURIComponent(e.destinationSlug)}`, color: "#0e9488",
    level: "Lịch sự kiện cần xác nhận", category: "Sự kiện",
  })), []);
  // Chưa có tọa độ cơ sở dịch vụ được xác minh trong nguồn hiện tại.
  // Không ghim một tọa độ giả lên bản đồ và gắn nhãn là cơ sở thực tế.
  const servicePoints = useMemo(() => [], []);
  const points = useMemo(() => {
    const pool = [
      ...(visibleLayers.destination ? destinationPoints : []),
      ...(visibleLayers.event ? eventPoints : []),
      ...(visibleLayers.service ? servicePoints : []),
    ];
    const q = normalize(mapSearch);
    return q ? pool.filter(p => normalize(p.name).includes(q)) : pool;
  }, [visibleLayers, destinationPoints, eventPoints, servicePoints, mapSearch]);
  const suggestions = useMemo(() => featuredSlugs.map(slug => places.find(p => p.slug === slug)).filter(Boolean), [places]);

  function selectPlace(slug) {
    setSelectedSlug(slug);
    setPlaceSearch(places.find(p => p.slug === slug)?.name || "");
    setMessage("Đã chọn điểm đến. Vị trí trên bản đồ là tọa độ tham khảo, chưa có tuyến đi bộ được xác minh.");
    document.getElementById("map-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function gps() {
    if (!navigator.geolocation) { setMessage("Trình duyệt chưa hỗ trợ GPS. Bạn vẫn có thể chọn điểm xuất phát trong danh sách."); return; }
    setGettingLocation(true);
    navigator.geolocation.getCurrentPosition(({coords}) => {
      setFrom({ lat: coords.latitude, lng: coords.longitude });
      setFromLabel("Vị trí thiết bị đã cấp quyền");
      setGettingLocation(false);
      setMessage("Đã lấy vị trí thiết bị. Khoảng cách sẽ được tính theo đường chim bay; tuyến đi thực tế phải mở bằng ứng dụng bản đồ.");
    }, () => {
      setGettingLocation(false);
      setMessage("Chưa được cấp quyền GPS. WayEcho không tự giả định vị trí của bạn.");
    }, { timeout: 10000, maximumAge: 60000 });
  }
  function chooseOrigin(event) {
    const match = places.find(p => p.slug === event.target.value);
    if (match) { setFrom({lat: match.coordinates.lat, lng: match.coordinates.lng}); setFromLabel(match.name); }
    else { setFrom(null); setFromLabel("Chưa chọn điểm xuất phát"); }
  }
  function searchRoute(event) {
    event.preventDefault();
    const target = selected || places.find(p => normalize(p.name) === normalize(placeSearch)) || places.find(p => normalize(p.name).includes(normalize(placeSearch)) && placeSearch.trim());
    if (!target) { setMessage("Hãy chọn một địa điểm từ danh sách hoặc nhập đúng tên điểm đến."); return; }
    setSelectedSlug(target.slug);
    const d = from ? distanceKm(from, {lat: target.coordinates.lat, lng: target.coordinates.lng}) : null;
    setMessage(d === null ? `Đã xác định ${target.name}. Chọn điểm xuất phát hoặc cho phép GPS để ước tính khoảng cách.` : `Đã xác định ${target.name}. Khoảng cách đường chim bay khoảng ${Math.round(d * 1000)} m; đây không phải quãng đường đi bộ hay lộ trình an toàn.`);
  }
  const mapsUrl = selected ? `https://www.google.com/maps/dir/?api=1&destination=${selected.coordinates.lat}%2C${selected.coordinates.lng}&travelmode=walking${from ? `&origin=${from.lat}%2C${from.lng}` : ""}` : null;
  const toggleLayer = key => setVisibleLayers(prev => ({ ...prev, [key]: !prev[key] }));
  const showOnMap = key => { setVisibleLayers(prev => ({ ...prev, [key]: true })); setTab("layers"); document.getElementById("map-section")?.scrollIntoView({ behavior: "smooth" }); };

  return (
    <div className="mx-auto max-w-[1460px] px-4 py-6 text-[#252525] sm:px-6 lg:px-8">
      <nav aria-label="Đường dẫn trang" className="mb-3 flex items-center gap-2 text-sm text-[#73685f]">
        <Link href="/" className="hover:text-[#d76b08]">Trang chủ</Link><span aria-hidden="true">/</span><span>Bản đồ du lịch</span>
      </nav>
      <header className="mb-6 border-b border-[#ead9c6] pb-5">
        <h1 className="font-display text-4xl font-bold tracking-tight text-[#252525] sm:text-5xl">Bản đồ du lịch Phố cổ Hà Nội</h1>
        <p className="mt-2 max-w-4xl text-base text-[#685d52]">Khám phá địa điểm, dịch vụ và thông tin văn hóa trong khu Phố cổ. Tìm vị trí, hỏi bằng giọng nói và mở chỉ đường trong ứng dụng bản đồ.</p>
      </header>

      <section id="map-section" aria-label="Bản đồ và công cụ khám phá" className="grid items-stretch gap-4 lg:grid-cols-[minmax(320px,390px)_minmax(0,1fr)]">
        <div className="flex flex-col gap-3">
          <div className="overflow-hidden rounded-[24px] border border-[#efdfce] bg-white p-4 shadow-[0_10px_35px_rgba(84,57,26,.06)] sm:p-5">
            <div role="tablist" aria-label="Chế độ bản đồ" className="grid grid-cols-3 gap-1 rounded-2xl bg-[#fff9f1] p-1">
              {[["directions", "Chỉ đường"], ["discover", "Khám phá"], ["layers", "Lớp bản đồ"]].map(([key, text]) => <button key={key} type="button" role="tab" aria-selected={tab === key} onClick={() => setTab(key)} className={`rounded-xl px-2 py-3 text-sm font-bold transition-colors ${tab === key ? "bg-[#fa9b21] text-[#252525] shadow-sm" : "text-[#473a2e] hover:bg-[#fff0dd]"}`}>{text}</button>)}
            </div>
            {tab === "directions" && <form onSubmit={searchRoute} className="mt-4 space-y-3" aria-label="Tìm đường tới địa điểm">
              <h2 className="font-display text-2xl font-bold">Tìm đường đến địa điểm</h2>
              <label className="block text-sm font-bold" htmlFor="waye-origin">Điểm xuất phát</label>
              <select id="waye-origin" onChange={chooseOrigin} defaultValue="" className="w-full rounded-xl border border-[#ecdcc8] bg-white px-3 py-3 text-sm">
                <option value="">Chọn địa điểm làm điểm xuất phát</option>
                {places.map(d => <option key={d.slug} value={d.slug}>{d.name}</option>)}
              </select>
              <button type="button" onClick={gps} disabled={gettingLocation} className="w-full rounded-xl border border-[#efd5b6] bg-[#fff8ef] px-3 py-2 text-sm font-semibold hover:bg-[#ffebd2]">📍 {gettingLocation ? "Đang xin vị trí…" : "Dùng vị trí hiện tại của tôi"}</button>
              <p className="text-xs text-[#7c6551]">{fromLabel}</p>
              <label className="block text-sm font-bold" htmlFor="waye-destination">Điểm đến</label>
              <input id="waye-destination" list="waye-destination-options" value={placeSearch} onChange={e => {setPlaceSearch(e.target.value); const d = places.find(p => normalize(p.name) === normalize(e.target.value)); setSelectedSlug(d?.slug || "");}} placeholder="Nhập tên điểm đến…" className="w-full rounded-xl border border-[#ecdcc8] bg-white px-3 py-3 text-sm" />
              <datalist id="waye-destination-options">{places.map(d => <option key={d.slug} value={d.name} />)}</datalist>
              <button type="submit" className="w-full rounded-xl bg-gradient-to-r from-[#ffae35] to-[#ff8517] px-4 py-3 font-bold text-[#31200c] hover:brightness-95">➤ Xác định điểm đến</button>
              {mapsUrl && <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="block rounded-xl border border-[#f4ad62] bg-white px-4 py-3 text-center text-sm font-bold text-[#a34b05] hover:bg-[#fff0dd]">Mở tuyến đi bộ trong Google Maps ↗</a>}
              <p className="text-xs leading-5 text-[#785c43]">Tuyến trên Google Maps là nguồn ngoài WayEcho; hãy kiểm tra thực tế và không coi đây là tuyến tiếp cận an toàn đã khảo sát.</p>
            </form>}
            {tab === "discover" && <div className="mt-4 space-y-3"><h2 className="font-display text-2xl font-bold">Khám phá điểm đến</h2><p className="text-sm text-[#6d6154]">Chọn địa điểm để đưa bản đồ tới vị trí tương ứng.</p><div className="max-h-[300px] space-y-2 overflow-auto">{places.map(d => <button key={d.slug} type="button" onClick={() => selectPlace(d.slug)} className="flex w-full items-center justify-between rounded-xl border border-[#efdfce] px-3 py-3 text-left text-sm hover:bg-[#fff7eb]"><span>📍 {d.name}</span><span aria-hidden="true">→</span></button>)}</div></div>}
            {tab === "layers" && <div className="mt-4 space-y-3"><h2 className="font-display text-2xl font-bold">Các lớp trên bản đồ</h2><p className="text-sm text-[#6d6154]">Bật hoặc tắt dữ liệu được hiển thị.</p>{layers.map(l => <label key={l.id} className="flex items-center justify-between gap-3 rounded-xl border border-[#efdfce] px-3 py-3 text-sm"><span>{l.icon} {l.label}</span><input type="checkbox" checked={visibleLayers[l.id]} onChange={() => toggleLayer(l.id)} className="h-5 w-5 accent-[#ed8118]" /></label>)}<p className="text-xs text-[#876449]">Sự kiện là dữ liệu tham khảo; hiện chưa có ghim dịch vụ được xác minh tọa độ. <Link href="/explore" className="font-bold underline">Xem danh sách dịch vụ</Link></p></div>}
          </div>

          <div className="rounded-[22px] border border-[#efdfce] bg-[#fff5e7] p-4 shadow-sm">
            <button type="button" onClick={() => setVoiceOpen(value => !value)} aria-expanded={voiceOpen} className="flex w-full items-center justify-between gap-3 text-left"><span className="flex items-center gap-3"><span className="rounded-full bg-[#ffe1bd] p-3 text-xl">🎙️</span><span><strong className="block">Hỏi đường bằng giọng nói</strong><span className="block text-xs text-[#745e4b]">Nói tên địa điểm hoặc hỏi khoảng cách</span></span></span><span aria-hidden="true">{voiceOpen ? "−" : "+"}</span></button>
            {voiceOpen && <div className="mt-3"><VoiceDistanceFinder initialTarget={selectedSlug} compact /></div>}
          </div>

          <div className="rounded-[22px] border border-[#efdfce] bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between gap-2"><h2 className="font-display text-2xl font-bold">Gợi ý điểm đến</h2><Link href="/destination" className="text-sm font-bold text-[#a74f0b] hover:underline">Xem tất cả →</Link></div>
            <div className="space-y-2">{suggestions.slice(0, 3).map(d => <button key={d.slug} type="button" onClick={() => selectPlace(d.slug)} className="flex w-full items-center gap-3 rounded-xl px-1 py-1 text-left hover:bg-[#fff5e7]"><img src={d.image || IMAGE_FALLBACK} alt="" className="h-14 w-16 rounded-lg object-cover" onError={e => { e.currentTarget.src = IMAGE_FALLBACK; }} /><span className="flex-1 text-sm font-semibold">{d.name}<small className="block font-normal text-[#786c60]">Chạm để xem trên bản đồ</small></span><span aria-hidden="true">›</span></button>)}</div>
          </div>
        </div>

        <div className="relative min-h-[610px] overflow-hidden rounded-[26px] border-[7px] border-white bg-[#fff0d9] shadow-[0_12px_40px_rgba(94,64,28,.11)] lg:min-h-[760px]">
          <div role="region" aria-label="Bản đồ OpenStreetMap của Phố cổ Hà Nội" className="absolute inset-0"><MapView points={points} route={[]} center={mapCenter} zoom={selected ? 16 : 15} /></div>
          <div className="pointer-events-none absolute left-3 right-3 top-3 z-[600] flex flex-wrap items-center justify-between gap-2">
            <label className="pointer-events-auto flex w-full max-w-[345px] items-center gap-2 rounded-full bg-white px-4 py-3 shadow-lg"><span aria-hidden="true">⌕</span><span className="sr-only">Tìm trong các điểm trên bản đồ</span><input value={mapSearch} onChange={e => setMapSearch(e.target.value)} placeholder="Tìm địa điểm trên bản đồ…" className="min-w-0 flex-1 bg-transparent text-sm outline-none" /></label>
            <div className="pointer-events-auto flex flex-wrap gap-1 rounded-full bg-white/95 p-1 shadow-lg">{[["destination", "Điểm đến"], ["event", "Sự kiện"], ["service", "Dịch vụ"]].map(([k, label]) => <button key={k} onClick={() => toggleLayer(k)} type="button" aria-pressed={visibleLayers[k]} className={`rounded-full px-3 py-2 text-xs font-semibold ${visibleLayers[k] ? "bg-[#ffead1] text-[#a9500b]" : "text-[#736b62]"}`}>{label}</button>)}</div>
          </div>
          {selected && <div className="pointer-events-none absolute bottom-5 left-4 z-[600] max-w-[340px] rounded-2xl border border-[#f1dbc4] bg-white/95 p-3 shadow-xl"><p className="text-sm font-bold">📍 {selected.name}</p><p className="mt-1 text-xs text-[#6b625b]">Vị trí tham khảo; chưa xác minh lối đi tiếp cận</p><Link href={`/destination?d=${encodeURIComponent(selected.slug)}`} className="pointer-events-auto mt-2 inline-block text-xs font-bold text-[#b45a0a] underline">Xem thông tin điểm đến →</Link></div>}
        </div>
      </section>

      <p aria-live="polite" role="status" className={`mt-4 rounded-xl border border-[#efcf9f] bg-[#fff8ec] px-4 py-3 text-sm text-[#7d4c16] ${message ? "" : "sr-only"}`}>{message}</p>
      <div className="mt-4 rounded-xl border border-[#f2d7b6] bg-[#fff8ef] px-4 py-3 text-sm text-[#79512d]"><strong>Lưu ý:</strong> Bản đồ và tọa độ phục vụ khám phá. Dữ liệu tiếp cận, sự kiện và vị trí dịch vụ có thể chưa được xác minh tại hiện trường; không dùng WayEcho để tự định hướng khi sang đường hoặc tránh vật cản.</div>

      <section className="mt-10" aria-labelledby="layers-heading">
        <h2 id="layers-heading" className="font-display text-3xl font-bold">Khám phá các lớp bản đồ</h2>
        <p className="mb-4 text-sm text-[#73685e]">Bật từng lớp thông tin để xem các điểm tương ứng trên bản đồ.</p>
        <div className="grid gap-4 md:grid-cols-3">{layers.map(l => <button type="button" key={l.id} onClick={() => showOnMap(l.id)} className="overflow-hidden rounded-2xl border border-[#f0e1d1] bg-white text-left shadow-sm transition-transform hover:-translate-y-1"><img src={l.image} alt="" className="h-40 w-full object-cover" /><div className="flex items-start gap-3 p-4"><span className="rounded-xl bg-[#fff2e1] p-2 text-xl">{l.icon}</span><span className="flex-1"><strong className="block">{l.label}</strong><small className="mt-1 block leading-5 text-[#74675b]">{l.description}</small></span><span className="text-[#ca6e17]">→</span></div></button>)}</div>
      </section>

      <section className="mt-10" aria-labelledby="featured-heading"><div className="mb-4 flex items-center justify-between gap-2"><div><h2 id="featured-heading" className="font-display text-3xl font-bold">Địa điểm nổi bật trên bản đồ</h2><p className="text-sm text-[#73685e]">Chọn địa điểm để xem vị trí và thông tin chi tiết.</p></div><Link href="/destination" className="rounded-full border border-[#ecc49b] px-4 py-2 text-sm font-bold text-[#a95210]">Xem tất cả →</Link></div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{suggestions.map(d => <article key={d.slug} className="overflow-hidden rounded-2xl border border-[#eedfd0] bg-white shadow-sm"><button type="button" onClick={() => selectPlace(d.slug)} className="block w-full text-left"><img src={d.image || IMAGE_FALLBACK} alt={d.alt || `Minh họa ${d.name}`} onError={e => {e.currentTarget.src = IMAGE_FALLBACK;}} className="h-40 w-full object-cover" /><span className="block px-4 pb-2 pt-3 text-base font-bold">📍 {d.name}</span></button><div className="flex items-center justify-between gap-2 px-4 pb-4"><span className="text-xs text-[#7a6b5c]">Hoàn Kiếm · tọa độ tham khảo</span><Link href={`/destination?d=${encodeURIComponent(d.slug)}`} className="text-xs font-bold text-[#ba6014] underline">Chi tiết</Link></div></article>)}</div>
      </section>

      <section className="mt-10 rounded-3xl border border-[#eedcc9] bg-[#fff8ef] p-5 sm:p-7" aria-labelledby="guide-heading"><h2 id="guide-heading" className="font-display text-3xl font-bold">Hướng dẫn sử dụng bản đồ</h2><p className="mb-4 text-sm text-[#76685c]">Ba bước để khám phá các địa điểm của Phố cổ Hà Nội.</p><div className="grid gap-3 md:grid-cols-3">{[["1", "Tìm địa điểm", "Chọn điểm đến hoặc tìm trong danh sách WayEcho."], ["2", "Chọn cách xem", "Xem vị trí, lớp dữ liệu và dùng micro để hỏi khoảng cách."], ["3", "Mở chỉ đường", "Mở Google Maps để xem tuyến, sau đó tự kiểm tra điều kiện thực tế."]].map(([n, name, desc]) => <div key={n} className="flex items-start gap-3 rounded-2xl border border-[#f1dfca] bg-white p-4"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#fa9821] font-bold text-white">{n}</span><div><h3 className="font-bold">{name}</h3><p className="mt-1 text-sm text-[#75685c]">{desc}</p></div></div>)}</div></section>
    </div>
  );
}

export default function NavigationPage() {
  return <Suspense fallback={<div className="container-page py-16 text-center">Đang chuẩn bị bản đồ du lịch…</div>}><NavigationContent /></Suspense>;
}
