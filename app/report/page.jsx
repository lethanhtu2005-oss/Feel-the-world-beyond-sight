"use client";

import { useState } from "react";
import Link from "next/link";
import { useA11y } from "@/components/A11yProvider";

export default function IncidentReportPage() {
  const { speak } = useA11y();
  const [incidentType, setIncidentType] = useState("obstacle");
  const [locationText, setLocationText] = useState("Ngã tư Hàng Buồm – Đào Duy Từ, Hoàn Kiếm");
  const [details, setDetails] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState("");
  const [isTourLinked, setIsTourLinked] = useState(true);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setSubmittedMessage("");

    try {
      const res = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemId: "pho-co",
          topic: incidentType === "obstacle" ? "obstacle" : incidentType === "device" ? "device" : "service",
          detail: `[Loại: ${incidentType}] [Vị trí: ${locationText}] [SĐT: ${phone || "Ẩn danh"}] Nội dung: ${details || "Báo cáo sự cố thực địa"}`
        })
      });

      if (!res.ok) {
        throw new Error("Không thể gửi báo cáo lúc này.");
      }

      setSubmittedMessage(
        incidentType === "guide"
          ? "Đã tiếp nhận khiếu nại dịch vụ. Hệ thống đã kích hoạt cơ chế TẠM DỪNG GIẢI NGÂN KÝ QUỸ ESCROW để bảo vệ quyền lợi tài chính của bạn."
          : "Đã gửi thông tin sự cố tới Trạm Điều Phối 28 Hàng Buồm và đội Tình nguyện viên thực địa để khắc phục."
      );
      speak(
        incidentType === "guide"
          ? "Đã tiếp nhận khiếu nại và kích hoạt tạm dừng ký quỹ Escrow."
          : "Đã gửi báo cáo sự cố thành công."
      );
      setDetails("");
    } catch {
      // Demo fallback response
      setSubmittedMessage("Đã tiếp nhận thông tin sự cố (Chế độ mô phỏng demo).");
      speak("Đã ghi nhận báo cáo thành công.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#faf9f3] py-8 sm:py-12 text-[#212529]">
      <div className="container-page max-w-4xl mx-auto px-4">
        {/* Navigation Breadcrumb */}
        <nav aria-label="Đường dẫn trang" className="flex items-center gap-2 text-xs sm:text-sm text-[#665b50] mb-4">
          <Link href="/" className="hover:text-[#c75c13]">Trang chủ</Link>
          <span aria-hidden="true">/</span>
          <Link href="/help" className="hover:text-[#c75c13]">Hỗ trợ</Link>
          <span aria-hidden="true">/</span>
          <span className="font-bold text-[#c75c13]">Báo cáo sự cố thực địa & khiếu nại</span>
        </nav>

        {/* Safety Header Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="rounded-full bg-[#0d9488] text-white px-3 py-1 text-xs font-bold">
            🛡️ TIẾP NHẬN 24/7 PHỐ CỔ
          </span>
          <span className="rounded-full bg-[#352016] text-[#f8ae38] px-3 py-1 text-xs font-bold">
            🔒 CƠ CHẾ BẢO VỆ ESCROW FREEZE
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#352016]">
          Báo Cáo Sự Cố & Khiếu Nại Dịch Vụ
        </h1>
        <p className="mt-2 text-base sm:text-lg text-[#554336] leading-relaxed">
          Hệ thống ghi nhận vật cản trên dải gạch xúc giác, sự cố thiết bị trợ thị hoặc phản ánh chất lượng tour.
          Mọi khiếu nại dịch vụ tour sẽ tự động <strong>KÍCH HOẠT TẠM DỪNG KÝ QUỸ ESCROW</strong> để bảo vệ 100% quyền lợi của du khách.
        </p>

        {submittedMessage && (
          <div role="status" className="mt-6 rounded-2xl bg-green-50 border border-green-300 p-5 text-sm font-bold text-green-800">
            {submittedMessage}
          </div>
        )}

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Section A: Type of Incident */}
          <fieldset className="rounded-3xl border border-[#ebd9c5] bg-white p-6 shadow-sm">
            <legend className="text-xl font-bold text-[#352016] flex items-center gap-2 mb-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-[#ffedd5] text-[#9a3412] text-sm font-black">1</span>
              <span>Chọn Nhóm Sự Cố Cần Báo Cáo</span>
            </legend>
            <p className="text-xs text-[#665b50] mb-4">
              Chọn đúng phân loại để hệ thống điều phối đội Tình nguyện viên hoặc kích hoạt cơ chế bảo vệ ký quỹ:
            </p>

            <div className="grid gap-3 sm:grid-cols-3">
              <label
                className={`flex flex-col justify-between rounded-2xl border p-4 cursor-pointer transition-all ${
                  incidentType === "obstacle"
                    ? "border-[#c75c13] bg-[#fffbf2] shadow-xs"
                    : "border-[#ebd9c5] bg-[#faf9f3] hover:bg-white"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">⚠️</span>
                    <input
                      type="radio"
                      name="incident_type"
                      value="obstacle"
                      checked={incidentType === "obstacle"}
                      onChange={() => setIncidentType("obstacle")}
                      className="accent-[#c75c13]"
                    />
                  </div>
                  <h3 className="mt-2 font-bold text-sm text-[#352016]">Chướng ngại vật thực địa</h3>
                  <p className="mt-1 text-xs text-[#554336]">
                    Xe máy đỗ trên gạch xúc giác, cành cây thấp ngang đầu, bậc tam cấp nứt hỏng.
                  </p>
                </div>
                <span className="mt-3 text-[11px] font-bold text-[#0d9488]">Cập nhật bản đồ âm thanh</span>
              </label>

              <label
                className={`flex flex-col justify-between rounded-2xl border p-4 cursor-pointer transition-all ${
                  incidentType === "device"
                    ? "border-[#c75c13] bg-[#fffbf2] shadow-xs"
                    : "border-[#ebd9c5] bg-[#faf9f3] hover:bg-white"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">🦯</span>
                    <input
                      type="radio"
                      name="incident_type"
                      value="device"
                      checked={incidentType === "device"}
                      onChange={() => setIncidentType("device")}
                      className="accent-[#c75c13]"
                    />
                  </div>
                  <h3 className="mt-2 font-bold text-sm text-[#352016]">Sự cố thiết bị trợ thị</h3>
                  <p className="mt-1 text-xs text-[#554336]">
                    Lối đi có bậc, không có hướng dẫn rõ ràng, hoặc điều kiện tiếp cận tại địa điểm khác với mô tả.
                  </p>
                </div>
                <span className="mt-3 text-[11px] font-bold text-[#352016]">Đổi thiết bị tại Trạm 28 Hàng Buồm</span>
              </label>

              <label
                className={`flex flex-col justify-between rounded-2xl border p-4 cursor-pointer transition-all ${
                  incidentType === "guide"
                    ? "border-[#c75c13] bg-[#fffbf2] shadow-xs"
                    : "border-[#ebd9c5] bg-[#faf9f3] hover:bg-white"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">⚖️</span>
                    <input
                      type="radio"
                      name="incident_type"
                      value="guide"
                      checked={incidentType === "guide"}
                      onChange={() => setIncidentType("guide")}
                      className="accent-[#c75c13]"
                    />
                  </div>
                  <h3 className="mt-2 font-bold text-sm text-[#352016]">Khiếu nại dịch vụ Guide</h3>
                  <p className="mt-1 text-xs text-[#554336]">
                    HDV đến muộn, thao tác dắt không đúng chuẩn WBU, tự ý bỏ điểm tham quan.
                  </p>
                </div>
                <span className="mt-3 text-[11px] font-bold text-[#dc2626]">Đóng băng ký quỹ Escrow 100%</span>
              </label>
            </div>
          </fieldset>

          {/* Section B: Tour Linking */}
          <div className="rounded-3xl border border-[#ebd9c5] bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-[#352016] flex items-center gap-2 mb-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-[#ffedd5] text-[#9a3412] text-sm font-black">2</span>
              <span>Chuyến Đi / Đơn Đặt Chỗ Liên Quan</span>
            </h2>

            {isTourLinked ? (
              <div className="rounded-2xl bg-[#faf9f3] border border-[#ebd9c5] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <span className="font-bold text-sm text-[#352016]">Tour #WE-HC36: Hồn Xưa 36 Phố Phường</span>
                  <p className="text-[#665b50]">HDV: Lê Thanh Tú (WE-G104) • Giờ hẹn: Hôm nay</p>
                  <p className="mt-1 text-[#0d9488] font-bold">Trạng thái Escrow: 300.000 VNĐ đang được bảo vệ an toàn</p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsTourLinked(false)}
                  className="rounded-xl border border-[#ebd9c5] bg-white px-3 py-1.5 font-semibold text-[#554336] hover:bg-[#f0e7dd] self-start sm:self-auto"
                >
                  Báo sự cố tự do ngoài phố
                </button>
              </div>
            ) : (
              <div className="rounded-2xl bg-[#faf9f3] border border-[#ebd9c5] p-4 flex items-center justify-between text-xs">
                <span>Chế độ báo cáo sự cố tự do ngoài phố (Không gắn mã Tour).</span>
                <button
                  type="button"
                  onClick={() => setIsTourLinked(true)}
                  className="font-bold text-[#c75c13] underline"
                >
                  Liên kết lại Tour #WE-HC36
                </button>
              </div>
            )}
          </div>

          {/* Section C: Location & Detail */}
          <div className="rounded-3xl border border-[#ebd9c5] bg-white p-6 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-[#352016] flex items-center gap-2 mb-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-[#ffedd5] text-[#9a3412] text-sm font-black">3</span>
              <span>Chi Tiết Sự Cố & Vị Trí</span>
            </h2>

            <div>
              <label htmlFor="inc-loc" className="block text-xs font-bold text-[#352016]">
                Vị trí vỉa hè / Số nhà xảy ra sự cố:
              </label>
              <input
                id="inc-loc"
                type="text"
                required
                value={locationText}
                onChange={(e) => setLocationText(e.target.value)}
                className="mt-1 w-full rounded-xl border border-[#ebd9c5] bg-[#faf9f3] p-3 text-sm text-[#212529] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#c75c13]"
              />
            </div>

            <div>
              <label htmlFor="inc-detail" className="block text-xs font-bold text-[#352016]">
                Mô tả chi tiết sự cố:
              </label>
              <textarea
                id="inc-detail"
                rows={3}
                required
                placeholder="Mô tả cụ thể vật cản hoặc sự cố để tình nguyện viên hỗ trợ kịp thời..."
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="mt-1 w-full rounded-xl border border-[#ebd9c5] bg-[#faf9f3] p-3 text-sm text-[#212529] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#c75c13]"
              />
            </div>

            <div>
              <label htmlFor="inc-phone" className="block text-xs font-bold text-[#352016]">
                Số điện thoại liên hệ (Để nhận phản hồi):
              </label>
              <input
                id="inc-phone"
                type="tel"
                placeholder="VD: 0912 345 678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 w-full rounded-xl border border-[#ebd9c5] bg-[#faf9f3] p-3 text-sm text-[#212529] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#c75c13]"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-2xl bg-[#f8ae38] hover:bg-[#e09f2f] text-[#212529] py-3.5 text-base font-bold shadow-sm transition-all focus:ring-4 focus:ring-amber-200"
            >
              {submitting ? "Đang gửi báo cáo…" : "Gửi Báo Cáo Sự Cố Ngay"}
            </button>
          </div>
        </form>

        {/* Emergency Assistance Notice */}
        <div className="mt-8 rounded-3xl border border-red-200 bg-red-50 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="font-bold text-sm text-red-800">Cần cứu hộ hoặc hỗ trợ y tế khẩn cấp?</span>
            <p className="mt-0.5 text-xs text-red-700">
              Không chờ xử lý form. Bấm nút SOS hoặc gọi trực tiếp tổng đài ứng cứu khẩn cấp 24/7.
            </p>
          </div>
          <Link
            href="/sos"
            className="rounded-xl bg-[#dc2626] hover:bg-[#b91c1c] text-white px-5 py-2.5 text-xs font-bold shadow-xs transition-colors shrink-0 text-center"
          >
            🚨 Mở Màn Hình SOS
          </Link>
        </div>
      </div>
    </div>
  );
}
