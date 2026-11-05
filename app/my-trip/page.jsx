"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useA11y } from "@/components/A11yProvider";
import { api } from "@/lib/api";
import {
  MapPinIcon,
  TrashIcon,
  SpeakerIcon,
  HeartIcon,
  CompassIcon,
  HeadphonesIcon,
  CalendarIcon,
  WalkingIcon,
  AccessibleIcon,
  CheckIcon,
  BookmarkIcon,
  DownloadIcon,
  ShareIcon,
  SyncIcon,
  TuneIcon,
  VibrationIcon,
  ArrowUpIcon,
  InfoIcon,
  ShieldIcon,
  PhoneIcon,
  PlusIcon
} from "@/components/Icons";
import { getItem } from "@/data/catalog";

// Dữ liệu thời gian & cảnh báo thực địa mẫu cho chặng lộ trình
const STEP_TIMINGS = [
  { time: "08:30 – 09:20", stage: "Chặng 1 • Khởi đầu", walking: "Đi bộ 420m qua Hàng Bạc • Vỉa hè có gờ sọc dẫn hướng • Thời gian: 8 phút" },
  { time: "09:30 – 10:45", stage: "Chặng 2 • Di tích sống", walking: "Đi bộ 650m về hướng Hàng Chiếu • Đèn tín hiệu âm thanh ngã tư Chợ Gạo • Khoảng 12 phút" },
  { time: "11:00 – 12:15", stage: "Chặng 3 • Cửa ô lịch sử", walking: "Đi bộ 350m qua phố Hàng Đường • Lối đi phẳng có thanh vịn • Khoảng 6 phút" },
  { time: "12:30 – 13:30", stage: "Chặng 4 • Nghỉ trưa & Ẩm thực", walking: "Di chuyển ngắn trong ngõ ẩm thực truyền thống" },
  { time: "14:00 – 15:30", stage: "Chặng 5 • Không gian văn hóa", walking: "Khu vực đi bộ hồ Hoàn Kiếm • Lối sang đường có gờ nổi" }
];

export default function MyTripPage() {
  const { speak, speechRate, setSpeechRate } = useA11y();
  const [trip, setTrip] = useState([]);
  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");

  // Tùy chỉnh hành trình
  const [travelMode, setTravelMode] = useState("walk_3d");
  const [voiceDialect, setVoiceDialect] = useState("hn");
  const [sosShare, setSosShare] = useState(true);
  const [hapticIntensity, setHapticIntensity] = useState("standard");
  const [companionSync, setCompanionSync] = useState(true);
  const [calibrated, setCalibrated] = useState(false);


  async function refresh() {
    try {
      const [t, s] = await Promise.all([api.listTrip(), api.listSaved()]);
      setTrip(t);
      setSaved(s);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
    try {
      const savedMode = localStorage.getItem("we-trip-travel-mode");
      if (savedMode) setTravelMode(savedMode);
      const savedHaptic = localStorage.getItem("we-trip-haptic");
      if (savedHaptic) setHapticIntensity(savedHaptic);
      const savedSos = localStorage.getItem("we-sos-share");
      if (savedSos !== null) setSosShare(savedSos === "1");
    } catch (_) {}
  }, []);

  async function removeTrip(refId) {
    try {
      await api.removeFromTrip(refId);
      setTrip((x) => x.filter((i) => i.refId !== refId));
      speak("Đã xóa khỏi chuyến đi.");
      showFeedback("Đã xóa địa điểm khỏi lịch trình.");
    } catch (err) {
      setError(err.message);
      speak(err.message);
    }
  }

  async function removeSaved(refId) {
    try {
      await api.unsavePlace(refId);
      setSaved((x) => x.filter((i) => i.refId !== refId));
      speak("Đã bỏ lưu địa điểm.");
      showFeedback("Đã xóa địa điểm khỏi bộ sưu tập đã lưu.");
    } catch (err) {
      setError(err.message);
      speak(err.message);
    }
  }

  async function addSavedToTrip(item) {
    try {
      await api.addToTrip({
        refId: item.refId,
        name: item.name,
        area: item.area,
        image: item.image,
      });
      setTrip((prev) => [...prev.filter((i) => i.refId !== item.refId), item]);
      speak(`Đã thêm ${item.name} vào lịch trình hôm nay.`);
      showFeedback(`Đã thêm "${item.name}" vào lịch trình.`);
    } catch (err) {
      setError(err.message);
      speak(err.message);
    }
  }

  async function addSampleTripItems() {
    const samples = [
      { refId: "nha-co-87-ma-may", name: "Nhà cổ 87 Mã Mây", area: "87 Mã Mây, Hoàn Kiếm", image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Maison%20longue%20traditionnelle%20%282%29.jpg?width=1200" },
      { refId: "dinh-kim-ngan", name: "Đình Kim Ngân", area: "42 Hàng Bạc, Hoàn Kiếm", image: "/assets/images/old-quarter-street.jpg" },
      { refId: "o-quan-chuong", name: "Cửa Ô Quan Chưởng", area: "Đầu phố Hàng Chiếu, Hoàn Kiếm", image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/2024-11-03%20Hanoi%27s%20Old%20Quarter%203.jpg?width=960" }
    ];
    try {
      for (const s of samples) {
        await api.addToTrip(s);
      }
      await refresh();
      speak("Đã nạp 3 điểm mẫu di sản Phố cổ vào lịch trình.");
      showFeedback("Đã nạp các điểm đến mẫu vào lịch trình.");
    } catch (err) {
      setError(err.message);
    }
  }

  function showFeedback(msg) {
    setFeedback(msg);
    setTimeout(() => setFeedback(""), 4000);
  }

  function handleCalibrate() {
    setCalibrated(true);
    speak("Đã hiệu chỉnh lại cảm biến la bàn và vị trí thực địa tại Hoàn Kiếm.");
    showFeedback("Đã hiệu chỉnh lại cảm biến la bàn và định vị thực địa (sai số ± 0.4m).");
  }

  function handleShareTrip() {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href);
      speak("Đã sao chép liên kết hành trình để gửi cho người hỗ trợ hoặc Hướng dẫn viên.");
      showFeedback("Đã sao chép liên kết hành trình vào bộ nhớ tạm.");
    }
  }

  function handleSaveSettings() {
    try {
      localStorage.setItem("we-trip-travel-mode", travelMode);
      localStorage.setItem("we-trip-haptic", hapticIntensity);
      localStorage.setItem("we-sos-share", sosShare ? "1" : "0");
    } catch (_) {}
    speak("Đã lưu các tùy chỉnh tiếp cận hành trình của bạn.");
    showFeedback("Đã lưu tùy chỉnh tiếp cận thành công.");
  }

  return (
    <div className="min-h-screen bg-surface text-ink">
      {/* 1. Interactive Audio Feedback Bar */}
      <div className="w-full bg-surface-alt border-b border-line py-2.5 px-4 sm:px-6">
        <div className="container-page flex flex-wrap items-center justify-between gap-3 text-sm">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-600"></span>
            </span>
            <span className="font-semibold text-emerald-800 dark:text-emerald-400">
              Hồ sơ tiếp cận đang kích hoạt:
            </span>
            <span className="text-ink-soft hidden sm:inline">
              Thị lực hạn chế • Cảnh báo rung Haptic • Âm trường Binaural 360°
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs sm:text-sm">
            <span className="text-ink-soft flex items-center gap-1">
              <CompassIcon size={16} className="text-primary" />
              Định vị vệ tinh & Beacons Hoàn Kiếm: <strong className="text-ink">Sai số ± 0.4m</strong>
            </span>
            <button
              onClick={handleCalibrate}
              type="button"
              className="inline-flex items-center gap-1 font-semibold text-accent-dark hover:underline focus-visible:outline-2"
              aria-label="Hiệu chỉnh cảm biến la bàn và vị trí thực địa"
            >
              <SyncIcon size={14} className={calibrated ? "text-emerald-600" : ""} />
              {calibrated ? "Đã chuẩn hóa" : "Hiệu chỉnh"}
            </button>
          </div>
        </div>
      </div>

      <div className="container-page py-8">
        {/* Thông báo trạng thái / phản hồi trợ năng */}
        {error && (
          <div role="alert" className="mb-4 rounded-xl border border-red-300 bg-red-50 p-4 text-red-800 dark:bg-red-950/40 dark:text-red-200">
            {error}
          </div>
        )}
        {feedback && (
          <div role="status" className="mb-4 rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200">
            {feedback}
          </div>
        )}

        {/* 2. Breadcrumb & Top Bar */}
        <nav aria-label="Đường dẫn trang" className="mb-3 flex items-center gap-2 text-sm text-ink-soft">
          <Link href="/" className="hover:text-ink hover:underline flex items-center gap-1">
            Trang chủ
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-ink font-semibold" aria-current="page">Hành trình của tôi (My Trip)</span>
        </nav>

        {/* Header Title & Action Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-line mb-8">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-ink font-semibold text-xs uppercase tracking-wider">
              <CompassIcon size={14} className="text-primary" />
              Lộ trình thông minh cá nhân hóa
            </div>
            <h1 className="text-4xl sm:text-5xl font-display font-bold tracking-tight">
              Hành trình của tôi (My Trip)
            </h1>
            <p className="hc-muted text-lg text-ink-soft leading-relaxed">
              Lịch trình du lịch tiếp cận được cá nhân hóa theo hồ sơ thị giác và sở thích âm thanh của bạn. Tự động đồng bộ hóa cùng bản đồ âm thanh 3D và trợ lý AI thực địa.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/explore"
              className="btn-primary"
              aria-label="Thêm điểm đến từ trang Khám phá"
            >
              <CompassIcon size={18} />
              <span>Thêm điểm đến</span>
            </Link>
            <Link
              href="/navigation"
              className="btn-ghost hc-border"
              aria-label="Xem toàn bộ lộ trình trên bản đồ tiếp cận"
            >
              <MapPinIcon size={18} />
              <span>Xem trên bản đồ</span>
            </Link>
            <button
              onClick={handleShareTrip}
              type="button"
              className="btn-ghost hc-border"
              aria-label="Sao chép liên kết lộ trình gửi cho Hướng dẫn viên"
            >
              <ShareIcon size={18} />
              <span>Chia sẻ với HDV</span>
            </button>
          </div>
        </div>

        {/* 3. Trip Overview Cards / Stat Badges Bento */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
          {/* Card 1: Time & Day */}
          <div className="card hc-surface hc-border p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-ink-soft uppercase tracking-wide">Thời gian hành trình</span>
              <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-ink">
                <CalendarIcon size={16} />
              </span>
            </div>
            <div>
              <div className="font-display text-xl font-bold">Hôm nay, Thứ Bảy</div>
              <p className="text-xs text-ink-soft mt-0.5">Khung giờ sáng: 08:30 – 12:30</p>
            </div>
          </div>

          {/* Card 2: Safe Walking Distance */}
          <div className="card hc-surface hc-border p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-ink-soft uppercase tracking-wide">Quãng đường an toàn</span>
              <span className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent-dark">
                <WalkingIcon size={18} />
              </span>
            </div>
            <div>
              <div className="font-display text-xl font-bold">
                {trip.length > 0 ? `${(trip.length * 0.6).toFixed(1)} km an toàn` : "1.8 km ước tính"}
              </div>
              <p className="text-xs text-ink-soft mt-0.5">Khoảng {trip.length * 15 || 35} phút đi bộ tiếp cận</p>
            </div>
          </div>

          {/* Card 3: Accessibility Index */}
          <div className="card hc-surface hc-border p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-ink-soft uppercase tracking-wide">Độ phẳng & Tiếp cận</span>
              <span className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center">
                <AccessibleIcon size={18} />
              </span>
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-display text-xl font-bold text-emerald-700 dark:text-emerald-400">94%</span>
                <span className="text-xs text-ink-soft">bằng phẳng</span>
              </div>
              <p className="text-xs text-ink-soft mt-0.5">Bậc thềm ≤ 10cm có thanh vịn</p>
            </div>
          </div>

          {/* Card 4: Soundscape Ambient Warning */}
          <div className="card hc-surface hc-border p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-ink-soft uppercase tracking-wide">Cảnh báo âm cảnh</span>
              <span className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 flex items-center justify-center">
                <HeadphonesIcon size={16} />
              </span>
            </div>
            <div>
              <div className="font-display text-xl font-bold">62 dB (Vừa phải)</div>
              <p className="text-xs text-ink-soft mt-0.5">Gợi ý: Nếu phù hợp, sử dụng tai nghe cá nhân của bạn</p>
            </div>
          </div>

          {/* Card 5: Companion Status */}
          <div className="card hc-surface hc-border p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-ink-soft uppercase tracking-wide">Người đồng hành</span>
              <span className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 flex items-center justify-center">
                <ShieldIcon size={16} />
              </span>
            </div>
            <div>
              <div className="font-display text-xl font-bold truncate">Minh Hoàng</div>
              <p className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold mt-0.5 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Tình nguyện viên trực tiếp
              </p>
            </div>
          </div>
        </div>

        {/* 4. Main Content Grid: Sensory Timeline (8 cols) & Settings Sidebar (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Left Column: Timeline Itinerary (8 Columns) */}
          <section aria-labelledby="itinerary-heading" className="lg:col-span-8 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/20 text-ink flex items-center justify-center">
                  <CompassIcon size={22} className="text-primary" />
                </span>
                <div>
                  <h2 id="itinerary-heading" className="text-2xl sm:text-3xl font-display font-bold">
                    Lộ trình chi tiết từng chặng
                  </h2>
                  <p className="text-xs sm:text-sm text-ink-soft">
                    Theo dõi âm học binaural • Xúc giác không gian • Đánh dấu an toàn
                  </p>
                </div>
              </div>
              <span className="chip hc-surface hc-border">
                {trip.length} Điểm dừng
              </span>
            </div>

            {loading ? (
              <div className="card p-8 text-center text-ink-soft">Đang tải dữ liệu chuyến đi…</div>
            ) : trip.length === 0 ? (
              <div className="card hc-surface hc-border p-8 text-center space-y-4">
                <p className="text-lg text-ink font-semibold">Chưa có điểm nào trong lịch trình hôm nay.</p>
                <p className="text-sm text-ink-soft max-w-md mx-auto">
                  Khám phá các điểm đến di sản có hồ sơ âm học và xúc giác, hoặc nạp nhanh các điểm mẫu để bắt đầu trải nghiệm.
                </p>
                <div className="flex flex-wrap justify-center gap-3 pt-2">
                  <Link href="/explore" className="btn-primary">
                    <CompassIcon size={18} /> Khám phá điểm đến
                  </Link>
                  <button
                    onClick={addSampleTripItems}
                    type="button"
                    className="btn-ghost hc-border"
                  >
                    <PlusIcon size={18} /> Nạp 3 điểm mẫu Phố cổ
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative flex flex-col gap-6 pl-4 sm:pl-8">
                {/* Timeline vertical guide line */}
                <div className="absolute left-4 sm:left-8 top-6 bottom-6 w-1 bg-line -translate-x-1/2"></div>

                {trip.map((it, idx) => {
                  const catItem = getItem(it.refId) || getItem(it.id);
                  const timing = STEP_TIMINGS[idx % STEP_TIMINGS.length];
                  const accessLevel = catItem?.level || "Tiếp cận tốt (Cấp 1)";
                  const summaryText = catItem?.summary || "Điểm đến tiếp cận trong lòng Phố cổ Hà Nội với chỉ dẫn bằng âm thanh và lối đi có gờ xúc giác.";
                  const audioDesc = catItem?.audio || `${it.name}. ${summaryText}`;

                  return (
                    <div key={it.id || it.refId || idx} className="space-y-4">
                      <article className="relative card hc-surface hc-border p-5 sm:p-6 shadow-card">
                        {/* Node Pin Indicator */}
                        <div className="absolute -left-4 sm:-left-8 top-8 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-ink font-display font-bold flex items-center justify-center text-sm shadow-md border-2 border-surface">
                          {idx + 1}
                        </div>

                        {/* Header of Step */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-line">
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-md bg-primary/20 text-ink text-xs font-bold font-mono">
                              {timing.time}
                            </span>
                            <span className="text-xs text-ink-soft">
                              {timing.stage}
                            </span>
                          </div>
                          <span className="inline-flex items-center gap-1 text-emerald-800 dark:text-emerald-400 text-xs font-semibold">
                            <CheckIcon size={14} />
                            {accessLevel}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                          {/* Location Photo */}
                          <div className="md:col-span-5 flex flex-col gap-2">
                            <div className="relative w-full h-44 rounded-xl overflow-hidden bg-surface-alt">
                              <img
                                src={it.image || catItem?.image || "/assets/images/hoguom-lake.jpg"}
                                alt={catItem?.alt || it.name}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/75 text-white text-[11px] font-medium flex items-center gap-1">
                                <HeadphonesIcon size={12} />
                                Ảnh mô tả không gian
                              </div>
                            </div>

                            <div className="p-2.5 rounded-lg bg-surface-alt text-ink">
                              <div className="font-display font-bold text-base truncate">{it.name}</div>
                              <div className="text-xs text-ink-soft flex items-center gap-1 mt-0.5 truncate">
                                <MapPinIcon size={14} className="text-primary shrink-0" />
                                <span>{it.area || catItem?.area || "Hoàn Kiếm, Hà Nội"}</span>
                              </div>
                            </div>
                          </div>

                          {/* Details & Sensory Description */}
                          <div className="md:col-span-7 flex flex-col justify-between gap-3">
                            <div className="space-y-2">
                              <h3 className="font-display font-bold text-lg leading-snug">
                                <Link href={`/item?id=${it.refId}`} className="hover:text-accent-dark hover:underline">
                                  {it.name}
                                </Link>
                              </h3>
                              <p className="text-sm text-ink-soft leading-relaxed">
                                {summaryText}
                              </p>

                              {/* Accessibility details pill list */}
                              <div className="space-y-1.5 pt-1 text-xs">
                                <div className="flex items-start gap-2 text-ink">
                                  <AccessibleIcon size={16} className="text-primary shrink-0 mt-0.5" />
                                  <span><strong>Không gian:</strong> Lối vào phẳng, có lối dốc hoặc gờ báo hiệu an toàn dưới đầu gậy dò đường.</span>
                                </div>
                                <div className="flex items-start gap-2 text-ink">
                                  <SpeakerIcon size={16} className="text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
                                  <span><strong>Trợ năng:</strong> Thực đơn & thông tin có giọng đọc tự nhiên, hỗ trợ đọc màn hình WCAG AAA.</span>
                                </div>
                              </div>
                            </div>

                            {/* Spatial Audio Card inside step */}
                            <div className="p-3 rounded-xl bg-surface-alt border border-line flex items-center justify-between gap-3">
                              <div className="flex items-center gap-3 min-w-0">
                                <button
                                  onClick={() => speak(audioDesc)}
                                  type="button"
                                  className="w-10 h-10 rounded-full bg-primary text-ink flex items-center justify-center shrink-0 hover:scale-105 transition-transform shadow-sm"
                                  aria-label={`Nghe thuyết minh âm học 3D cho ${it.name}`}
                                >
                                  <SpeakerIcon size={20} />
                                </button>
                                <div className="truncate">
                                  <div className="text-xs font-bold truncate">Thuyết minh âm học 3D: {it.name}</div>
                                  <div className="text-[11px] text-ink-soft">Âm trường Binaural 360° • Chuẩn tiếp cận</div>
                                </div>
                              </div>

                              {/* Mini Soundwave visualizer */}
                              <svg aria-hidden="true" className="h-5 w-16 text-primary shrink-0 hidden sm:block" fill="currentColor" viewBox="0 0 100 24">
                                <rect height="8" rx="2" width="4" x="2" y="8" />
                                <rect height="16" rx="2" width="4" x="10" y="4" />
                                <rect height="4" rx="2" width="4" x="18" y="10" />
                                <rect height="20" rx="2" width="4" x="26" y="2" />
                                <rect height="12" rx="2" width="4" x="34" y="6" />
                                <rect height="22" rx="2" width="4" x="42" y="1" />
                                <rect height="6" rx="2" width="4" x="50" y="9" />
                                <rect height="18" rx="2" width="4" x="58" y="3" />
                                <rect height="10" rx="2" width="4" x="66" y="7" />
                                <rect height="14" rx="2" width="4" x="74" y="5" />
                                <rect height="4" rx="2" width="4" x="82" y="10" />
                                <rect height="12" rx="2" width="4" x="90" y="6" />
                              </svg>
                            </div>

                            {/* Step Action buttons */}
                            <div className="flex flex-wrap items-center gap-2 pt-1">
                              <button
                                onClick={() => speak(audioDesc)}
                                type="button"
                                className="btn-primary !min-h-[40px] !py-2 !px-3 text-xs"
                                aria-label={`Nghe trước âm thanh cho ${it.name}`}
                              >
                                <HeadphonesIcon size={16} />
                                <span>Nghe thuyết minh</span>
                              </button>
                              <Link
                                href={`/navigation?to=${it.refId}`}
                                className="btn-ghost hc-border !min-h-[40px] !py-2 !px-3 text-xs"
                                aria-label={`Dẫn đường bằng âm thanh đến ${it.name}`}
                              >
                                <CompassIcon size={16} />
                                <span>Dẫn đường đến đây</span>
                              </Link>
                              <button
                                onClick={() => removeTrip(it.refId)}
                                type="button"
                                className="btn-ghost hc-border !min-h-[40px] !py-2 !px-3 text-xs hover:text-red-700"
                                aria-label={`Xóa ${it.name} khỏi chuyến đi`}
                              >
                                <TrashIcon size={16} />
                                <span>Xóa</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </article>

                      {/* Inter-leg walking connector advisory */}
                      {idx < trip.length - 1 && (
                        <div className="p-3 rounded-xl bg-surface-alt border border-line text-xs flex items-center justify-between gap-3 mx-2">
                          <div className="flex items-center gap-2 text-ink-soft">
                            <WalkingIcon size={18} className="text-primary shrink-0" />
                            <span>{timing.walking}</span>
                          </div>
                          <span className="chip hc-surface hc-border text-[11px] shrink-0">
                            Độ dốc an toàn
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* Right Column: Settings & Live Map Preview (4 Columns) */}
          <aside aria-labelledby="settings-heading" className="lg:col-span-4 flex flex-col gap-6">
            {/* Live Route Map Overview Card */}
            <div className="card hc-surface hc-border p-5 shadow-card">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display font-bold text-lg flex items-center gap-2">
                  <MapPinIcon size={20} className="text-primary" />
                  Bản đồ định tuyến tiếp cận
                </h3>
                <span className="chip hc-surface hc-border text-xs font-bold text-emerald-800 dark:text-emerald-400">
                  {trip.length || 3} Trạm Beacons
                </span>
              </div>

              <Link
                href="/navigation"
                className="group relative block w-full h-52 rounded-xl overflow-hidden bg-surface-alt border border-line shadow-inner focus-visible:outline-3"
                aria-label="Mở trang bản đồ tiếp cận chi tiết"
              >
                <img
                  src="/assets/images/we-minh-hoa-dieu-huong-ban-do.jpg"
                  alt="Bản đồ tiếp cận các tuyến phố cổ Hà Nội có gờ định hướng và trạm âm thanh"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-4 text-white">
                  <span className="text-xs font-bold flex items-center gap-1 text-primary">
                    <CompassIcon size={14} />
                    Theo dõi hành trình theo thời gian thực
                  </span>
                  <p className="text-[11px] text-neutral-200 mt-0.5">Bấm để mở bản đồ định hướng âm thanh</p>
                </div>
              </Link>

              <div className="mt-3 grid grid-cols-2 gap-2 text-center text-xs">
                <div className="p-2 rounded-lg bg-surface-alt border border-line">
                  <span className="text-ink-soft block text-[11px]">Độ dốc cực đại</span>
                  <strong className="font-bold">3.2° (Chuẩn WCAG)</strong>
                </div>
                <div className="p-2 rounded-lg bg-surface-alt border border-line">
                  <span className="text-ink-soft block text-[11px]">Vùng âm thanh 3D</span>
                  <strong className="font-bold text-emerald-700 dark:text-emerald-400">Hoàn tất 100%</strong>
                </div>
              </div>
            </div>

            {/* Accessibility Journey Settings Card */}
            <div className="card hc-surface hc-border p-5 shadow-card space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-line">
                <span className="w-8 h-8 rounded-lg bg-primary/20 text-ink flex items-center justify-center">
                  <TuneIcon size={18} className="text-primary" />
                </span>
                <div>
                  <h3 id="settings-heading" className="font-display font-bold text-lg">
                    Tùy chỉnh tiếp cận hành trình
                  </h3>
                  <p className="text-xs text-ink-soft">Cá nhân hóa theo nhu cầu thực địa</p>
                </div>
              </div>

              {/* Setting 1: Chế độ di chuyển */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-ink uppercase tracking-wide block">
                  1. Chế độ di chuyển ưu tiên
                </label>
                <div className="space-y-1.5">
                  <label className="flex items-start gap-2.5 p-2 rounded-lg bg-surface-alt border border-line cursor-pointer hover:border-primary transition-colors">
                    <input
                      type="radio"
                      name="travel_mode"
                      value="walk_3d"
                      checked={travelMode === "walk_3d"}
                      onChange={(e) => setTravelMode(e.target.value)}
                      className="mt-1 w-4 h-4 accent-primary"
                    />
                    <span className="text-xs">
                      <strong className="block">Đi bộ kết hợp âm thanh 3D</strong>
                      <span className="text-ink-soft text-[11px]">Tín hiệu rung haptic và chỉ dẫn âm hướng</span>
                    </span>
                  </label>

                  <label className="flex items-start gap-2.5 p-2 rounded-lg bg-surface-alt border border-line cursor-pointer hover:border-primary transition-colors">
                    <input
                      type="radio"
                      name="travel_mode"
                      value="low_step"
                      checked={travelMode === "low_step"}
                      onChange={(e) => setTravelMode(e.target.value)}
                      className="mt-1 w-4 h-4 accent-primary"
                    />
                    <span className="text-xs">
                      <strong className="block">Hạn chế bậc thềm tối đa</strong>
                      <span className="text-ink-soft text-[11px]">Ưu tiên đường dốc thoải, không quá 5cm</span>
                    </span>
                  </label>

                  <label className="flex items-start gap-2.5 p-2 rounded-lg bg-surface-alt border border-line cursor-pointer hover:border-primary transition-colors">
                    <input
                      type="radio"
                      name="travel_mode"
                      value="electric_car"
                      checked={travelMode === "electric_car"}
                      onChange={(e) => setTravelMode(e.target.value)}
                      className="mt-1 w-4 h-4 accent-primary"
                    />
                    <span className="text-xs">
                      <strong className="block">Xe điện du lịch Hoàn Kiếm</strong>
                      <span className="text-ink-soft text-[11px]">Đón tại các bến ô tô điện văn hóa</span>
                    </span>
                  </label>
                </div>
              </div>

              {/* Setting 2: Giọng đọc & Tốc độ âm thanh */}
              <div className="space-y-2 pt-1">
                <label className="text-xs font-bold text-ink uppercase tracking-wide block">
                  2. Giọng đọc & Tốc độ âm thanh
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <select
                    value={voiceDialect}
                    onChange={(e) => setVoiceDialect(e.target.value)}
                    className="h-10 px-2 rounded-lg bg-surface-alt border border-line text-ink focus-visible:outline-2"
                    aria-label="Chọn giọng đọc vùng miền"
                  >
                    <option value="hn">Giọng Bắc (Hà Nội)</option>
                    <option value="sg">Giọng Nam (Sài Gòn)</option>
                    <option value="hue">Giọng Trung (Huế)</option>
                  </select>
                  <select
                    value={speechRate}
                    onChange={(e) => setSpeechRate(Number(e.target.value))}
                    className="h-10 px-2 rounded-lg bg-surface-alt border border-line text-ink focus-visible:outline-2"
                    aria-label="Chọn tốc độ giọng đọc"
                  >
                    <option value="0.85">Tốc độ 0.85x (Chậm)</option>
                    <option value="1">Tốc độ 1.0x (Chuẩn)</option>
                    <option value="1.2">Tốc độ 1.2x (Nhanh)</option>
                  </select>
                </div>
              </div>

              {/* Setting 3: Chia sẻ vị trí SOS */}
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <ShieldIcon size={16} className="text-red-700" />
                    <span className="text-xs font-bold text-red-900 dark:text-red-200">Vị trí khẩn cấp SOS</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={sosShare}
                    onChange={(e) => setSosShare(e.target.checked)}
                    className="w-4 h-4 accent-red-600"
                    aria-label="Tự động chia sẻ vị trí khi bấm SOS"
                  />
                </div>
                <p className="text-[11px] text-red-800 dark:text-red-300">
                  Tự động gửi tọa độ thực địa cho Hướng dẫn viên và Tổng đài khi kích hoạt SOS.
                </p>
              </div>

              {/* Setting 4: Gậy rung thông minh Haptic Wand */}
              <div className="p-3 rounded-lg bg-surface-alt border border-line space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <VibrationIcon size={16} className="text-primary" />
                    <span className="text-xs font-bold">Gậy rung thông minh Haptic Wand</span>
                  </div>
                  <span className="chip hc-surface hc-border text-[11px] text-emerald-800 dark:text-emerald-400">
                    Đã kết nối
                  </span>
                </div>
                <p className="text-[11px] text-ink-soft">Xung rung 3 cấp độ báo hiệu bậc thềm và ngã rẽ.</p>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-ink-soft">Cường độ rung:</span>
                  <div className="flex items-center gap-1">
                    {["mild", "standard", "strong"].map((lvl) => {
                      const labels = { mild: "Nhẹ", standard: "Chuẩn", strong: "Mạnh" };
                      return (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => setHapticIntensity(lvl)}
                          className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${
                            hapticIntensity === lvl
                              ? "bg-primary text-ink border-primary"
                              : "bg-surface text-ink-soft border-line hover:border-primary"
                          }`}
                        >
                          {labels[lvl]}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Setting 5: Chế độ Sighted Guide */}
              <div className="p-3 rounded-lg bg-surface-alt border border-line space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <AccessibleIcon size={16} className="text-accent-dark" />
                    <span className="text-xs font-bold">Chế độ Sighted Guide</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={companionSync}
                    onChange={(e) => setCompanionSync(e.target.checked)}
                    className="w-4 h-4 accent-primary"
                    aria-label="Đồng bộ lộ trình hai chiều với người đồng hành"
                  />
                </div>
                <p className="text-[11px] text-ink-soft">
                  Đồng bộ lộ trình thời gian thực với Hướng dẫn viên / Tình nguyện viên trong suốt chặng.
                </p>
              </div>

              <button
                onClick={handleSaveSettings}
                type="button"
                className="w-full btn-primary !min-h-[42px] !py-2 text-xs font-bold"
              >
                Lưu tùy chỉnh hành trình
              </button>
            </div>

            {/* Sticky Safety Widget & SOS hotline */}
            <div className="card hc-surface hc-border p-5 bg-neutral-900 text-white dark:bg-black space-y-3 shadow-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-xs">
                    SOS
                  </span>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-amber-400 font-bold block">
                      Hỗ trợ thực địa 24/7
                    </span>
                    <span className="font-display font-bold text-lg">Hotline Điều phối viên</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-neutral-300">
                Nếu gặp trở ngại trên vỉa hè, vật cản xây dựng hoặc cần người dẫn qua đường gấp:
              </p>

              <a
                href="tel:19008282"
                className="btn-primary w-full !bg-red-600 hover:!bg-red-700 !text-white !font-bold flex items-center justify-center gap-2 shadow-lg"
                aria-label="Gọi ngay hotline cứu hộ khẩn cấp 1900 8282"
              >
                <PhoneIcon size={18} />
                <span className="font-display text-lg tracking-wide">1900 8282</span>
              </a>

              <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-1">
                <span>Độ trễ phản hồi: &lt; 2 phút</span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Đang trực tuyến
                </span>
              </div>
            </div>
          </aside>
        </div>

        {/* 5. Saved Wishlist Section (Bộ sưu tập điểm đến đã lưu) */}
        <section aria-labelledby="wishlist-heading" className="pt-8 border-t border-line mb-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary">
                <BookmarkIcon size={16} />
                Bộ sưu tập điểm đến đã lưu
              </div>
              <h2 id="wishlist-heading" className="text-2xl sm:text-3xl font-display font-bold">
                Điểm dừng tiếp theo cho hành trình tới
              </h2>
              <p className="text-sm text-ink-soft">
                Lưu trữ các điểm đến di sản có sẵn hồ sơ tiếp cận âm học để bổ sung vào lịch trình bất kỳ lúc nào.
              </p>
            </div>
            <span className="chip hc-surface hc-border text-xs font-semibold">
              {saved.length} Điểm đã lưu
            </span>
          </div>

          {saved.length === 0 ? (
            <div className="card hc-surface hc-border p-8 text-center text-ink-soft space-y-3">
              <p className="text-base font-semibold text-ink">Bạn chưa lưu địa điểm nào.</p>
              <p className="text-sm text-ink-soft max-w-md mx-auto">
                Khi duyệt danh sách điểm đến trên trang Khám phá, hãy bấm biểu tượng Lưu để đưa vào bộ sưu tập này.
              </p>
              <Link href="/explore" className="btn-primary inline-flex">
                <CompassIcon size={18} /> Khám phá điểm đến
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {saved.map((it) => {
                const catItem = getItem(it.refId) || getItem(it.id);
                const summaryText = catItem?.summary || "Điểm đến tiếp cận tại phố cổ Hà Nội.";
                const audioDesc = catItem?.audio || `${it.name}. ${summaryText}`;

                return (
                  <article
                    key={it.id || it.refId}
                    className="card hc-surface hc-border overflow-hidden shadow-card flex flex-col justify-between group hover:shadow-lg transition-shadow"
                  >
                    <div>
                      <div className="relative h-48 w-full overflow-hidden bg-surface-alt">
                        <img
                          src={it.image || catItem?.image || "/assets/images/hoguom-lake.jpg"}
                          alt={catItem?.alt || it.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/75 text-white text-xs font-semibold backdrop-blur-sm">
                          {catItem?.cat === "destination" ? "Di sản văn hóa" : "Trải nghiệm Phố cổ"}
                        </span>
                        <button
                          onClick={() => removeSaved(it.refId)}
                          type="button"
                          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-red-600 flex items-center justify-center shadow-md transition-transform hover:scale-110"
                          aria-label={`Xóa ${it.name} khỏi danh sách đã lưu`}
                        >
                          <TrashIcon size={16} />
                        </button>
                      </div>

                      <div className="p-4 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="chip hc-surface hc-border text-[11px] text-emerald-800 dark:text-emerald-400 font-bold">
                            {catItem?.level || "Tiếp cận Cấp 1"}
                          </span>
                          <span className="text-ink-soft flex items-center gap-1 text-[11px]">
                            <HeadphonesIcon size={12} className="text-primary" />
                            Mô tả bằng chữ
                          </span>
                        </div>

                        <h3 className="font-display font-bold text-lg leading-snug">
                          <Link href={`/item?id=${it.refId}`} className="hover:text-accent-dark hover:underline">
                            {it.name}
                          </Link>
                        </h3>

                        <p className="text-xs text-ink-soft line-clamp-3 leading-relaxed">
                          {summaryText}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 pt-0 space-y-2">
                      <button
                        onClick={() => addSavedToTrip(it)}
                        type="button"
                        className="w-full btn-primary !min-h-[40px] !py-2 text-xs font-bold"
                        aria-label={`Thêm ${it.name} vào lịch trình hôm nay`}
                      >
                        <PlusIcon size={16} />
                        <span>Thêm vào lịch trình hôm nay</span>
                      </button>
                      <button
                        onClick={() => speak(audioDesc)}
                        type="button"
                        className="w-full btn-ghost hc-border !min-h-[36px] !py-1 text-xs"
                        aria-label={`Nghe mô tả ${it.name}`}
                      >
                        <SpeakerIcon size={16} />
                        <span>Nghe mô tả địa điểm</span>
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* 6. Bottom Assistive Sync Note */}
        <div className="card hc-surface hc-border p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-full bg-primary/20 text-ink flex items-center justify-center shrink-0">
              <InfoIcon size={20} className="text-primary" />
            </span>
            <p className="text-xs sm:text-sm text-ink leading-relaxed">
              <strong>Lưu ý đồng bộ:</strong> Thông tin trong lịch trình là dữ liệu demo, chưa xác minh khả năng tiếp cận thực tế. Khi ra ngoài, cần sử dụng gậy trắng hoặc người hỗ trợ phù hợp; nội dung trên web không thay thế chỉ dẫn an toàn.
            </p>
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            type="button"
            className="btn-ghost hc-border shrink-0 !min-h-[40px] !py-2 text-xs font-semibold"
            aria-label="Cuộn trang lên đầu"
          >
            <ArrowUpIcon size={16} />
            <span>Về đầu trang</span>
          </button>
        </div>
      </div>
    </div>
  );
}
