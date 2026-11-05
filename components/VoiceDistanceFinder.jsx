"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useA11y } from "@/components/A11yProvider";
import { destinations } from "@/data/destinations";
import services from "@/data/oldQuarterServices.json";

const DEMO_ORIGIN = { lat: 21.0352, lng: 105.8515, label: "điểm xuất phát minh họa ở trung tâm Phố cổ" };
const knownPoints = [
  ...destinations.filter(d => d.coordinates && Number.isFinite(d.coordinates.lat)).map(d => ({ id: d.slug, name: d.name, address: d.address, ...d.coordinates, href: `/destination?d=${d.slug}`, locationType: "tọa độ tham khảo" })),
  ...services.filter(s => s.coordinates && Number.isFinite(s.coordinates.lat)).map(s => ({ id: s.id, name: s.name, address: s.address, ...s.coordinates, href: `/item?id=${s.id}`, locationType: "tọa độ tham khảo" })),
];
function norm(s) { return (s || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").toLowerCase().replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim(); }
function distanceKm(a, b) {
  const rad = x => x * Math.PI / 180;
  const dlat = rad(b.lat - a.lat), dlng = rad(b.lng - a.lng);
  const h = Math.sin(dlat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dlng / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}
function matchPlace(query) {
  const q = norm(query).replace(/\b(toi muon|muon den|den|di toi|chi duong|bao xa|cach bao nhieu km|cach bao xa|tu day|cho toi|toi|hay)\b/g, " ").replace(/\s+/g, " ").trim();
  if (!q) return null;
  return knownPoints.find(p => norm(p.name) === q || norm(p.address) === q)
    || knownPoints.find(p => q.includes(norm(p.name)) || norm(p.name).includes(q))
    || knownPoints.find(p => norm(p.name).split(" ").filter(x => x.length > 3).every(x => q.includes(x)))
    || null;
}

export default function VoiceDistanceFinder({ initialTarget, compact = false }) {
  const { speak } = useA11y();
  const [question, setQuestion] = useState("");
  const [origin, setOrigin] = useState(DEMO_ORIGIN);
  const [status, setStatus] = useState("Chọn điểm xuất phát rồi hỏi điểm đến bằng giọng nói hoặc nhập văn bản.");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(null);
  const recognizer = useRef(null);
  const sortedNames = useMemo(() => knownPoints.map(p => p.name), []);

  function calculate(text) {
    setQuestion(text);
    const place = matchPlace(text);
    if (!place) {
      const msg = "Chưa tìm thấy địa điểm trong danh sách WayEcho. Vui lòng thử nói rõ tên điểm đến.";
      setResult(null); setStatus(msg); speak(msg); return;
    }
    const km = distanceKm(origin, place);
    const number = km < 1 ? `${Math.round(km * 1000)} mét` : `${km.toFixed(2).replace(".", ",")} ki lô mét`;
    const disclaimer = "Đây là khoảng cách đường chim bay ước tính, không phải quãng đường đi bộ, tuyến đường an toàn hoặc khoảng cách theo đường phố.";
    const spoken = `Từ ${origin.label} đến ${place.name} cách khoảng ${number} theo đường chim bay. ${disclaimer}`;
    setResult({ ...place, km, number }); setStatus(spoken); speak(spoken);
  }
  function requestGps() {
    if (!navigator.geolocation) { setStatus("Trình duyệt không hỗ trợ lấy vị trí. Đang dùng điểm xuất phát minh họa."); return; }
    setBusy(true);
    navigator.geolocation.getCurrentPosition(pos => {
      setOrigin({ lat: pos.coords.latitude, lng: pos.coords.longitude, label: "vị trí thiết bị hiện tại" });
      setBusy(false); setResult(null); setStatus("Đã lấy vị trí từ thiết bị. Hãy hỏi lại để tính khoảng cách tới điểm đến.");
    }, () => { setBusy(false); setStatus("Chưa được cấp quyền vị trí. Bản đồ vẫn dùng điểm xuất phát minh họa ở Phố cổ."); }, { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 });
  }
  function mic() {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) { setStatus("Trình duyệt này chưa hỗ trợ nhận dạng giọng nói. Hãy nhập tên địa điểm và bấm Tra khoảng cách."); return; }
    if (recognizer.current) { recognizer.current.stop(); return; }
    const r = new Recognition(); r.lang = "vi-VN"; r.interimResults = false; r.maxAlternatives = 1;
    recognizer.current = r;
    r.onresult = e => calculate(e.results[0][0].transcript);
    r.onerror = () => setStatus("Không nhận được âm thanh. Hãy kiểm tra quyền micro và thử lại.");
    r.onend = () => { recognizer.current = null; setBusy(false); };
    setBusy(true); setStatus("Đang nghe… Hãy nói ví dụ: Tôi muốn đến Chợ Đồng Xuân, cách bao xa?");
    try { r.start(); } catch { setBusy(false); recognizer.current = null; setStatus("Không thể mở micro trên thiết bị này."); }
  }
  useEffect(() => { if (initialTarget) { const p = knownPoints.find(x => x.id === initialTarget); if (p) setQuestion(p.name); } }, [initialTarget]);
  useEffect(() => () => { recognizer.current?.abort(); }, []);
  return <section className={compact ? "rounded-xl border border-[#edcfaa] bg-white p-3" : "rounded-[22px] border border-[#edcfaa] bg-[#fff7e9] p-5 shadow-card sm:p-7"} aria-labelledby="voice-distance-heading">
    <h2 id="voice-distance-heading" className={compact ? "text-base font-bold" : "text-3xl"}>Hỏi đường bằng giọng nói</h2>
    <p className={compact ? "mt-2 text-sm text-ink-soft" : "mt-2 text-ink-soft"}>Ví dụ: “Tôi muốn đến Ô Quan Chưởng, cách đây bao nhiêu ki lô mét?”</p>
    <div className="mt-4 flex flex-wrap gap-3"><button type="button" onClick={requestGps} disabled={busy} className="btn-ghost hc-border">📍 Dùng vị trí của tôi</button><span className="self-center text-sm text-ink-soft">Điểm xuất phát: {origin.label}</span></div>
    <form onSubmit={e => { e.preventDefault(); calculate(question); }} className="mt-4 flex flex-wrap gap-2">
      <label className="sr-only" htmlFor="place-voice-search">Tên điểm đến</label>
      <input id="place-voice-search" className="min-h-12 min-w-0 flex-1 rounded-xl border border-[#e9cba4] bg-white px-4 py-3" placeholder="Ví dụ: Chợ Đồng Xuân" value={question} onChange={e => setQuestion(e.target.value)} list="wayecho-places" />
      <datalist id="wayecho-places">{sortedNames.map(n => <option key={n} value={n}/>)}</datalist>
      <button type="button" onClick={mic} disabled={busy} className="btn-primary text-sm">🎙 {busy ? "Đang nghe" : "Hỏi bằng mic"}</button>
      <button type="submit" className="btn-ghost hc-border">Tra khoảng cách</button>
    </form>
    <p role="status" aria-live="polite" className="mt-4 rounded-xl bg-white p-4 leading-7">{status}</p>
    {result && <div className="mt-4 rounded-xl bg-white p-4"><p className="font-bold">{result.name} · {result.number}</p><p className="text-sm text-ink-soft">Khoảng cách đường chim bay, chưa phải đường đi bộ. {result.address}</p><a className="mt-2 inline-block font-bold text-[#af521a] underline" href={result.href}>Xem thông tin địa điểm</a></div>}
    <p className="mt-4 text-sm font-semibold text-[#8b481b]">Lưu ý an toàn: Nếu chưa cấp GPS, website dùng vị trí minh họa. Không sử dụng khoảng cách này để định hướng khi đi bộ hoặc qua đường.</p>
  </section>;
}
