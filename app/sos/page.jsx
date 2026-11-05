"use client";

import { initCustomerProfileScope, profileGet } from "@/lib/customerProfileStorage";
import { useEffect, useState } from "react";
import { requestSOSLocation, networkMessage, emergencyPhone } from "@/lib/sos";
import Link from "next/link";
import { useA11y } from "@/components/A11yProvider";
import { PhoneIcon, MapPinIcon, CheckIcon } from "@/components/Icons";

export default function SOSPage() {
  const { speak } = useA11y();
  const [contact, setContact] = useState("");
  const [locationStatus, setLocationStatus] = useState("Chưa yêu cầu quyền vị trí");
  const [active, setActive] = useState(false);
  const [sirenOn, setSirenOn] = useState(false);
  const [online, setOnline] = useState(true);
  const audioCtxRef = useState(null);

  useEffect(() => {
    const sync = () => setOnline(navigator.onLine);
    sync();
    window.addEventListener("online", sync);
    window.addEventListener("offline", sync);
    return () => { window.removeEventListener("online", sync); window.removeEventListener("offline", sync); };
  }, []);

  useEffect(() => { let active=true; initCustomerProfileScope().then(() => { if(active) setContact(profileGet("we-emergency") || ""); }).catch(() => {}); return () => { active=false; }; }, []);

  function toggleSiren() {
    if (sirenOn) {
      setSirenOn(false);
      speak("Đã tắt còi báo động khẩn cấp.");
    } else {
      setSirenOn(true);
      speak("Đang phát còi báo động khẩn cấp.");
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.5);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 1.2);
      } catch (_) {}
    }
  }

  function testHaptic() {
    try {
      if (typeof navigator !== "undefined" && navigator.vibrate) {
        navigator.vibrate([200, 100, 200, 100, 400]);
        speak("Đã kích hoạt rung phản hồi xúc giác.");
      } else {
        speak("Thiết bị không hỗ trợ rung haptic.");
      }
    } catch (_) {}
  }

  function startSOS() {
    setActive(true);
    speak("SOS demo đã được kích hoạt. WayEcho sẽ chỉ lấy vị trí nếu bạn cho phép. Bản demo không tự động gọi dịch vụ khẩn cấp.");
    requestSOSLocation(navigator.geolocation, setLocationStatus);
    testHaptic();
  }

  const phone = emergencyPhone(contact);

  return (
    <div className="container-page py-10 space-y-8">
      {/* Top Banner */}
      <div className="rounded-2xl bg-red-700 text-white p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-3">
          <span className="relative flex h-3.5 w-3.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-white"></span>
          </span>
          <span className="font-bold text-sm tracking-wide">
            SOS DEMO • Vị trí phụ thuộc vào quyền truy cập và thiết bị
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleSiren}
            className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm ${sirenOn ? 'bg-amber-400 text-slate-900 animate-bounce' : 'bg-white/20 text-white hover:bg-white/30'}`}
          >
            🔊 {sirenOn ? "Tắt còi báo" : "Bật còi báo động (Siren)"}
          </button>
          <button
            type="button"
            onClick={testHaptic}
            className="rounded-full bg-white/20 hover:bg-white/30 px-3 py-1.5 text-xs font-semibold text-white transition-all"
          >
            📳 Rung Haptic
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="font-semibold text-red-700 uppercase tracking-widest text-xs">SOS và liên hệ khẩn cấp</p>
          <h1 className="mt-1 text-4xl sm:text-5xl font-bold tracking-tight">SOS & Hỗ trợ Khẩn cấp Phố Cổ</h1>
          <p className="hc-muted mt-2 max-w-3xl text-lg text-ink-soft">
            Bản demo không giám sát ngõ phố, không phát hiện vật cản và không tự gửi yêu cầu đến lực lượng cứu hộ. Nếu nguy hiểm, gọi trực tiếp 113, 114 hoặc 115.
          </p>
        </div>
        <a
          href="tel:115"
          className="inline-flex items-center gap-2 rounded-2xl bg-red-700 px-6 py-3.5 text-white font-bold hover:bg-red-800 shadow-md shrink-0 transition-transform hover:scale-105"
        >
          <PhoneIcon size={22} />
          <span>Gọi cấp cứu 115</span>
        </a>
      </div>

      <p className="text-red-900 font-medium" role="status">{networkMessage(online)}</p>

      {/* Main Action Grid */}
      <div className="grid gap-6 lg:grid-cols-12 items-start">
        {/* Giant SOS Trigger Button (col 5) */}
        <section className="lg:col-span-5 rounded-[28px] bg-red-700 p-8 text-white text-center flex flex-col items-center justify-center shadow-xl relative overflow-hidden" aria-labelledby="activate-sos">
          <div className="absolute top-0 left-0 right-0 h-2 bg-amber-400"></div>
          <h2 id="activate-sos" className="text-3xl font-bold">Cần Trợ Giúp Khẩn?</h2>
          <p className="mt-2 text-sm text-red-100 max-w-xs">
            Nhấn nút SOS bên dưới để mở thao tác hỗ trợ demo. Vị trí chỉ được hỏi khi bạn đồng ý.
          </p>

          <button
            type="button"
            onClick={startSOS}
            className={`mt-8 flex h-48 w-48 rounded-full items-center justify-center border-8 border-red-500/50 shadow-2xl transition-all active:scale-95 ${
              active ? "bg-amber-400 text-slate-900 animate-pulse" : "bg-white text-red-800 hover:bg-red-50"
            }`}
            aria-label="Kích hoạt báo động khẩn cấp SOS"
          >
            <div className="flex flex-col items-center">
              <PhoneIcon size={44} />
              <span className="mt-2 text-2xl font-black">{active ? "ĐÃ KÍCH HOẠT" : "NHẤN SOS"}</span>
              <span className="text-xs font-semibold tracking-wider uppercase opacity-80">1-Chạm Khẩn Cấp</span>
            </div>
          </button>

          <div className="mt-6 text-xs text-red-100/90 space-y-1">
            <p>⌨️ <strong>Phím tắt:</strong> Nhấn 3 lần phím Space liên tiếp</p>
            <p>🔒 Quyền vị trí chỉ kích hoạt khi bạn bấm nút</p>
          </div>
        </section>

        {/* Right Info Section (col 7) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Status and Location Card */}
          <section className="rounded-[22px] border border-line bg-white p-6 shadow-card hc-surface hc-border" aria-labelledby="status-sos">
            <h2 id="status-sos" className="text-2xl font-bold flex items-center gap-2">
              <span>Trạng thái Định vị Thực địa</span>
            </h2>
            <div className="mt-4 space-y-3">
              <div className="flex items-start gap-3 rounded-xl bg-surface-alt p-4 hc-surface hc-border">
                <MapPinIcon size={20} className="mt-1 shrink-0 text-red-600" />
                <div className="flex-1">
                  <p className="font-semibold">Vị trí GPS thiết bị</p>
                  <p role="status" className="hc-muted text-sm text-ink-soft">{locationStatus}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl bg-amber-50/70 p-4 border border-amber-200/60 hc-surface hc-border">
                <span className="text-xl shrink-0">📍</span>
                <div>
                  <p className="font-semibold text-amber-950">Mã định danh what3words Phố Cổ:</p>
                  <p className="text-sm font-mono font-bold text-red-700 mt-0.5">{"///"}nhiệt.ngói.cổ (Khu vực Mã Mây - Hàng Buồm)</p>
                  <p className="text-xs text-ink-soft mt-1">Dễ dàng đọc to cho Đội cứu nạn qua điện thoại mà không cần nhớ số tọa độ dài.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl bg-surface-alt p-4 hc-surface hc-border">
                <CheckIcon size={20} className="mt-1 shrink-0 text-green-600" />
                <div className="flex-1">
                  <p className="font-semibold">Emergency contact (Người thân)</p>
                  <p className="hc-muted text-sm text-ink-soft">{contact || "Chưa thiết lập liên hệ khẩn cấp."}</p>
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              {phone && <a className="btn-primary" href={`tel:${phone}`}>📞 Gọi liên hệ đã lưu ({phone})</a>}
              {contact && !phone && <p className="text-sm text-ink-soft">Chưa xác định được một số điện thoại duy nhất. Hãy dùng chức năng gọi của máy.</p>}
              {!contact && <Link href="/profile" className="btn-primary">⚙️ Thiết lập Emergency Contact</Link>}
            </div>
          </section>

          {/* Tactile Landmarks Radar Card */}
          <section className="rounded-[22px] border border-line bg-white p-6 shadow-card hc-surface hc-border">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <span>Mốc Xúc Giác & Trợ Giúp Lân Cận (Hoàn Kiếm)</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-800">Bán kính 300m</span>
            </h3>
            <ul className="mt-4 divide-y divide-line text-sm">
              <li className="py-2.5 flex items-center justify-between">
                <div>
                  <span className="font-semibold">Nhà Cổ 87 Mã Mây (Di tích cấp Quốc gia)</span>
                  <span className="block text-xs text-ink-soft">Cửa gỗ lim, bậc thềm đá Thanh Hóa 15cm • Có bảo vệ trực</span>
                </div>
                <span className="font-bold text-red-700 text-right">45m Đông Bắc</span>
              </li>
              <li className="py-2.5 flex items-center justify-between">
                <div>
                  <span className="font-semibold">Ô Quan Chưởng (Cổng Đông Hà Môn)</span>
                  <span className="block text-xs text-ink-soft">Vòm cuốn gạch vồ thời Lê • Đèn tín hiệu giao thông âm thanh</span>
                </div>
                <span className="font-bold text-red-700 text-right">180m Bắc</span>
              </li>
              <li className="py-2.5 flex items-center justify-between">
                <div>
                  <span className="font-semibold">Công an Phường Hàng Buồm</span>
                  <span className="block text-xs text-ink-soft">Số 64 Hàng Buồm • Trực ban hỗ trợ người khuyết tật 24/24</span>
                </div>
                <span className="font-bold text-red-700 text-right">210m Tây</span>
              </li>
              <li className="py-2.5 flex items-center justify-between">
                <div>
                  <span className="font-semibold">Trạm Y Tế Phường Hàng Bạc</span>
                  <span className="block text-xs text-ink-soft">Số 136 Hàng Bạc • Sơ cấp cứu thực địa</span>
                </div>
                <span className="font-bold text-red-700 text-right">320m Nam</span>
              </li>
            </ul>
          </section>
        </div>
      </div>

      <div className="rounded-[18px] border border-red-300 bg-red-50 p-5 text-red-950 text-sm" role="note">
        <strong>Trong tình huống khẩn cấp thực tế:</strong> hãy sử dụng chức năng gọi điện của thiết bị hoặc dịch vụ khẩn cấp (113, 114, 115) hoặc gọi số người thân đã lưu. Không phụ thuộc vào bản demo WayEcho để đảm bảo an toàn tính mạng.
      </div>
    </div>
  );
}
