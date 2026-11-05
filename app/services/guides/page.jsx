"use client";
import {serviceBreakdown,formatVND} from "@/lib/serviceEconomics";

import { useState } from "react";
import Link from "next/link";
import { guides } from "@/data/guides";
import { useA11y } from "@/components/A11yProvider";

export default function GuideDirectory() {
  const { speak } = useA11y();
  const [filter, setFilter] = useState("all");
  const [playingId, setPlayingId] = useState(null);

  const filterTabs = [
    { id: "all", label: "Tất cả hồ sơ (10)" },
    { id: "culture", label: "Thuyết minh văn hóa" },
    { id: "orientation", label: "Định hướng & Gậy dò" },
    { id: "food", label: "Ẩm thực & Cảm quan" },
    { id: "sign", label: "Ký hiệu & Đa giác quan" },
  ];

  const filteredGuides = guides.filter((g) => {
    if (filter === "culture") return g.role.includes("văn hóa") || g.services.some(s => s.includes("Thuyết minh"));
    if (filter === "orientation") return g.services.some(s => s.includes("định hướng"));
    if (filter === "food") return g.role.includes("ẩm thực");
    if (filter === "sign") return g.languages?.length > 1 || g.services.some(s => s.includes("Ký hiệu"));
    return true;
  });

  function playSampleVoice(g) {
    if (playingId === g.id) {
      setPlayingId(null);
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      speak("Đã dừng mẫu giọng.");
    } else {
      setPlayingId(g.id);
      speak(`Mẫu giọng của ${g.name}, vai trò ${g.role}. Xin chào quý khách, tôi sẵn sàng đồng hành cùng bạn trên từng góc phố cổ Hà Nội với giọng đọc ấm áp và chỉ dẫn chi tiết.`);
      setTimeout(() => {
        setPlayingId(null);
      }, 7000);
    }
  }

  return (
    <main className="container-page py-12 space-y-8">
      {/* Breadcrumb & Header */}
      <nav aria-label="Breadcrumb" className="text-sm text-ink-soft">
        <Link href="/" className="hover:underline">Trang chủ</Link> /{" "}
        <Link href="/explore" className="hover:underline">Dịch vụ</Link> /{" "}
        <span className="font-semibold text-ink">Guide đồng hành</span>
      </nav>

      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2 border-b border-line">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#fff1bf] px-3.5 py-1 text-xs font-bold text-[#7a4d00]">
            <span>MẠNG LƯỚI ĐỒNG HÀNH TIẾP CẬN</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#7a4d00]" />
            <span>Thiết kế hướng đến trợ năng</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Guide & Người Đồng Hành Phố Cổ
          </h1>
          <p className="text-lg leading-relaxed text-ink-soft">
            Khám phá hồ sơ hướng dẫn viên và người đồng hành minh họa tại Phố Cổ. Kỹ năng, năng lực và khả năng nhận khách cần được xác minh trước khi cung cấp dịch vụ thật.
          </p>
        </div>

        <div className="rounded-2xl bg-amber-50 p-4 border border-amber-200/80 text-xs text-[#7a4c00] max-w-sm space-y-1">
          <div className="font-bold flex items-center gap-1.5">
            <span>🛡️ Quy trình thanh toán demo:</span>
          </div>
          <p>Quy trình đặt lịch và theo dõi thanh toán chỉ là mô phỏng; WayEcho chưa nhận hoặc giữ tiền thật.</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none" role="tablist">
        {filterTabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={filter === t.id}
            onClick={() => setFilter(t.id)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-all shrink-0 ${
              filter === t.id
                ? "bg-primary text-white shadow-sm"
                : "bg-surface-alt text-ink-soft hover:bg-slate-200"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Notice demo */}
      <div className="rounded-2xl bg-amber-50/80 border border-amber-200 p-4 text-sm text-[#7a4c00]">
        <strong>Lưu ý minh họa (DEMO):</strong> Dữ liệu 10 hướng dẫn viên là hồ sơ nhân vật mẫu phục vụ trải nghiệm luồng đặt lịch và ký quỹ Escrow. Chưa áp dụng tuyển dụng thật ngoài thực tế.
      </div>

      {/* Guides Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredGuides.map((g) => (
          <article
            key={g.id}
            className="flex flex-col justify-between overflow-hidden rounded-[26px] border border-line bg-white shadow-card transition-all hover:shadow-lg hc-surface hc-border"
          >
            <div>
              {/* Card Header with Avatar & Badge */}
              <div className="relative bg-[#fff3e7] p-6 pb-5 flex items-center gap-4">
                <div className="relative shrink-0">
                  <img
                    src={g.image}
                    alt={`Chân dung minh họa của ${g.name}`}
                    className="h-20 w-20 rounded-2xl object-cover bg-white shadow-sm border border-amber-200/60"
                  />
                  <span className="absolute -bottom-1 -right-1 rounded-full bg-emerald-600 px-1.5 py-0.5 text-[10px] font-bold text-white shadow">
                    ✓ Guide
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h2 className="text-xl font-bold truncate">{g.name}</h2>
                  </div>
                  <p className="text-sm font-semibold text-[#a74e1d]">{g.role}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="rounded-full bg-white px-2 py-0.5 text-[11px] font-bold text-[#8c5700] shadow-sm">
                      Kinh nghiệm 3-5 năm
                    </span>
                  </div>
                </div>
              </div>

              {/* Voice Sample Bar Simulation */}
              <div className="bg-amber-100/50 px-6 py-2.5 border-y border-amber-200/50 flex items-center justify-between text-xs text-[#7a4c00]">
                <button
                  type="button"
                  onClick={() => playSampleVoice(g)}
                  className="flex items-center gap-2 font-bold hover:underline focus:outline-none"
                  aria-label={`Nghe thử mẫu giọng của ${g.name}`}
                >
                  <span>{playingId === g.id ? "⏸️ Đang nghe..." : "▶️ Nghe mẫu giọng"}</span>
                  <span className="text-[10px] font-normal opacity-75">(giọng đọc mô phỏng)</span>
                </button>
                <span className="font-semibold text-emerald-800">Chuẩn rõ lời</span>
              </div>

              {/* Guide Details */}
              <div className="space-y-3 p-6 text-sm">
                <p>
                  <strong className="text-ink">Khu vực thông thạo:</strong>{" "}
                  <span className="text-ink-soft">{g.area}</span>
                </p>
                <p>
                  <strong className="text-ink">Ngôn ngữ:</strong>{" "}
                  <span className="text-ink-soft">{g.languages.join(", ")}</span>
                </p>
                <p>
                  <strong className="text-ink">Kỹ năng trợ năng:</strong>{" "}
                  <span className="text-ink-soft">{g.services.join("; ")}</span>
                </p>
                <p>
                  <strong className="text-ink">Mức phí tham khảo:</strong>{" "}
                  <span className="font-bold text-[#a74e1d]">{formatVND(serviceBreakdown("guide").gross)} / 2 giờ · DEMO</span>
                </p>
                <p className="text-xs text-ink-soft italic leading-relaxed bg-surface-alt p-3 rounded-xl hc-surface">
                  &ldquo;{g.bio}&rdquo;
                </p>

                {/* Question dropdown */}
                <details className="rounded-xl border border-[#e7c99c] bg-[#fff9ed] hc-surface hc-border">
                  <summary className="flex min-h-[44px] cursor-pointer items-center px-3 font-semibold text-xs">
                    💡 Chuẩn bị & lưu ý khi đồng hành
                  </summary>
                  <ul className="grid gap-1 px-3 pb-3 text-xs text-ink-soft">
                    <li>• Sử dụng kỹ thuật Sighted Guide (nắm khủy tay chuẩn xác)</li>
                    <li>• Luôn cảnh báo bậc tam cấp, vỉa hè gồ ghề trước 3 bước</li>
                    <li>• Hỗ trợ mô tả vật thể văn hóa qua xúc giác</li>
                  </ul>
                </details>
              </div>
            </div>

            {/* Actions */}
            <div className="p-6 pt-0 space-y-2">
              <Link
                href={`/booking?item=tour-am-thanh-pho-co&guide=${g.id}&guideName=${encodeURIComponent(g.name)}`}
                className="btn-primary w-full text-center text-sm font-bold !min-h-[44px] flex items-center justify-center gap-2"
              >
                <span>📅 Đặt lịch đồng hành cùng {g.name}</span>
              </Link>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/explore?cat=activity"
                  className="btn-ghost hc-border !min-h-[40px] text-center text-xs flex items-center justify-center"
                >
                  Xem tour
                </Link>
                <Link
                  href="/my-trip"
                  className="btn-ghost hc-border !min-h-[40px] text-center text-xs flex items-center justify-center"
                >
                  Thêm vào chuyến đi
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
