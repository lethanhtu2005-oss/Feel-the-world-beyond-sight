"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { soundTracks } from "@/data/oldQuarterDiscovery";

export default function SoundWalkBar() {
  const [active, setActive] = useState(soundTracks[0].id);
  const [playing, setPlaying] = useState(false);
  const [note, setNote] = useState("");
  const track = soundTracks.find((t) => t.id === active);

  const stop = () => { try { window.speechSynthesis?.cancel(); } catch {} setPlaying(false); };
  useEffect(() => stop, []);

  function play(id) {
    const synth = typeof window !== "undefined" ? window.speechSynthesis : null;
    if (!synth) { setNote("Trình duyệt này chưa hỗ trợ đọc mô tả."); return; }
    const t = soundTracks.find((x) => x.id === id);
    if (playing && id === active) { stop(); setNote("Đã dừng."); return; }
    synth.cancel();
    setActive(id);
    const u = new SpeechSynthesisUtterance(`${t.title}. ${t.text}`);
    u.lang = "vi-VN";
    u.onend = () => setPlaying(false);
    setPlaying(true);
    setNote(`Đang đọc mô tả: ${t.title}`);
    synth.speak(u);
  }

  return (
    <section className="py-10" aria-labelledby="soundwalk-heading">
      <div className="container-page">
        <div className="rounded-[26px] border border-line bg-[#1f2a37] p-6 text-white shadow-card md:p-8" style={{ colorScheme: "dark" }}>
          <p className="text-sm font-bold text-[#ffd9b8]">🎧 Nên đeo tai nghe khi nghe</p>
          <h2 id="soundwalk-heading" className="mt-1 text-3xl text-white">Nghe trước không gian Phố cổ</h2>
          <p className="mt-2 max-w-3xl text-[#e6edf5]">Mô tả bằng lời về âm thanh từng khu vực, giúp bạn hình dung trước khi đến. Đây là bản mô tả đọc bằng giọng máy (DEMO), chưa phải bản thu âm thật.</p>

          <div className="mt-5 flex items-center gap-1" aria-hidden="true">
            {Array.from({ length: 28 }).map((_, i) => (
              <span key={i} className={`w-1.5 rounded-full bg-[#ffb37a] ${playing ? "motion-safe:animate-pulse" : ""}`} style={{ height: `${10 + ((i * 37) % 28)}px`, animationDelay: `${(i % 7) * 90}ms` }} />
            ))}
          </div>

          <ul className="mt-5 grid gap-3 md:grid-cols-3">
            {soundTracks.map((t, i) => {
              const on = playing && active === t.id;
              return (
                <li key={t.id}>
                  <button type="button" aria-pressed={on} onClick={() => play(t.id)}
                    className={`flex min-h-[64px] w-full items-center gap-3 rounded-2xl border-2 px-4 py-3 text-left ${on ? "border-[#ffb37a] bg-[#33414f]" : "border-[#4a5968] bg-[#273341]"}`}>
                    <span aria-hidden="true" className="text-2xl">{on ? "⏸" : "▶"}</span>
                    <span><span className="block font-bold text-white">{i + 1}. {t.title}</span><span className="block text-sm text-[#d3dde8]">{t.sub}</span></span>
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href="/navigation" className="inline-flex min-h-[44px] items-center rounded-full border-2 border-[#ffb37a] px-4 font-semibold text-white">Mở bản đồ dẫn đường</Link>
            <Link href="/my-trip" className="inline-flex min-h-[44px] items-center rounded-full border-2 border-[#ffb37a] px-4 font-semibold text-white">Lập chuyến đi</Link>
          </div>
          <p className="mt-4 text-sm text-[#d3dde8]" role="status" aria-live="polite">{playing ? `Đang đọc: ${track.title}` : note || "Chọn một khu vực để nghe mô tả."}</p>
        </div>
      </div>
    </section>
  );
}
