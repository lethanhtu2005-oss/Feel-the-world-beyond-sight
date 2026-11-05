"use client";

import { useState } from "react";
import Link from "next/link";
import { useA11y } from "@/components/A11yProvider";

const initialRequests = [
  {
    id: "req-1",
    touristName: "Bác Nguyễn Văn Thành",
    disabilityType: "Khiếm thị hoàn toàn (B1)",
    time: "Ngay bây giờ (Cần gấp)",
    pickup: "28 Hàng Buồm (Đền Quan Đế)",
    destination: "87 Mã Mây (Nhà Cổ)",
    distance: "250m • Đi bộ khoảng 5 phút",
    notes: "Có mang gậy trắng. Cần 1 tình nguyện viên đi cạnh hỗ trợ qua ngã tư Hàng Buồm - Tạ Hiện và bước qua bậc cửa gỗ cao 18cm tại 87 Mã Mây.",
    status: "pending",
    phone: "0912 xxx 889"
  },
  {
    id: "req-2",
    touristName: "Bạn Lê Thu Trang",
    disabilityType: "Nhìn kém (Thị lực < 1/10)",
    time: "15 phút nữa (14:30)",
    pickup: "42 Hàng Bạc (Đình Kim Ngân)",
    destination: "50 Đào Duy Từ (TT Giao lưu Văn hóa)",
    distance: "320m",
    notes: "Cần hỗ trợ định hướng qua khu vực Hàng Bạc đông xe máy và tìm lối vào sảnh chính có ánh sáng tốt.",
    status: "in_progress",
    assignedTo: "TNV Vũ Minh Đức (Đang di chuyển)",
    phone: "0983 xxx 445"
  },
  {
    id: "req-3",
    touristName: "David Miller & Phiên dịch",
    disabilityType: "Du khách khiếm thị quốc tế",
    time: "15:15 chiều nay",
    pickup: "Ô Quan Chưởng",
    destination: "Chợ Đồng Xuân (Cửa Tây)",
    distance: "400m",
    notes: "Cần bạn giao tiếp tiếng Anh cơ bản, hướng dẫn trải nghiệm khứu giác khu gia vị Chợ Đồng Xuân.",
    status: "pending",
    phone: "0904 xxx 112"
  }
];

const initialBarriers = [
  {
    id: "bar-1",
    location: "Vỉa hè ngã tư Hàng Buồm - Đào Duy Từ",
    type: "Xe máy đỗ chiếm trọn dải gạch xúc giác",
    severity: "Cao",
    reportedAt: "30 phút trước",
    status: "Đã báo công an phường Hàng Buồm"
  },
  {
    id: "bar-2",
    location: "Trước số 38 Hàng Đào (Đình Đồng Lạc)",
    type: "Bậc tam cấp bị nứt mép gờ gạch trơn trượt",
    severity: "Trung bình",
    reportedAt: "Hôm nay 09:15",
    status: "Đang dán băng keo phản quang cảnh báo"
  },
  {
    id: "bar-3",
    location: "Ngõ Gạch (Gần Đình Thanh Hà)",
    type: "Biển hiệu quảng cáo treo thấp ngang tầm trán (1.6m)",
    severity: "Nguy hiểm",
    reportedAt: "Hôm qua",
    status: "Đã vận động hộ kinh doanh nâng cao biển"
  }
];

export default function VolunteerPortalPage() {
  const { speak } = useA11y();
  const [isOnline, setIsOnline] = useState(true);
  const [requests, setRequests] = useState(initialRequests);
  const [barriers, setBarriers] = useState(initialBarriers);

  // New barrier form state
  const [barrierLocation, setBarrierLocation] = useState("");
  const [barrierType, setBarrierType] = useState("Vật cản dải gạch xúc giác");
  const [barrierNote, setBarrierNote] = useState("");
  const [submittedAlert, setSubmittedAlert] = useState("");

  function toggleStatus() {
    const nextStatus = !isOnline;
    setIsOnline(nextStatus);
    speak(
      nextStatus
        ? "Bạn đã chuyển sang trạng thái: Sẵn sàng nhận ca hỗ trợ tại Trạm Phố Cổ."
        : "Bạn đã chuyển sang trạng thái: Tạm nghỉ ca trực."
    );
  }

  function handleAcceptRequest(id) {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: "accepted", assignedTo: "Bạn (Đã nhận ca)" } : r
      )
    );
    speak("Bạn đã nhận ca hỗ trợ thành công. Vui lòng di chuyển đến điểm hẹn để đón du khách.");
  }

  function handleCompleteRequest(id) {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "completed" } : r))
    );
    speak("Đã ghi nhận hoàn thành ca hỗ trợ an toàn. Cảm ơn sự cống hiến của bạn!");
  }

  function handleAddBarrier(e) {
    e.preventDefault();
    if (!barrierLocation.trim()) return;

    const newBar = {
      id: `bar-${Date.now()}`,
      location: barrierLocation,
      type: barrierType,
      severity: "Cần xử lý",
      reportedAt: "Vừa xong",
      status: "Đã gửi đến tổ điều phối trạm 28 Hàng Buồm"
    };

    setBarriers([newBar, ...barriers]);
    setSubmittedAlert(`Đã ghi nhận báo cáo rào cản tại: ${barrierLocation}`);
    setBarrierLocation("");
    setBarrierNote("");
    speak("Đã gửi báo cáo rào cản vỉa hè lên hệ thống bản đồ tiếp cận Phố Cổ.");
    setTimeout(() => setSubmittedAlert(""), 4000);
  }

  return (
    <div className="container-page max-w-7xl mx-auto px-4 py-8 sm:py-10">
      <Link href="/volunteer?tab=tasks" className="inline-flex mb-4 rounded-full bg-[#ffdb78] px-5 py-3 font-bold text-[#422914] hover:bg-[#ffc953]">← Quay về Cổng Tình nguyện viên / Nhiệm vụ</Link>
      <p role="note" className="mb-4 rounded-2xl border-2 border-[#825500] bg-[#fff4d6] px-4 py-3 text-sm font-bold text-[#4a3000]">
        DEMO: tên, số điện thoại, ca trực và chỉ số trên trang này là dữ liệu minh họa, không phải người hay yêu cầu thật. Thao tác "Nhận ca" chỉ đổi trạng thái trên trình duyệt này và không được lưu hay gửi tới ai.
      </p>
      {/* Station Overview & Status Bar */}
      <section aria-label="Trạng thái ca trực" className="rounded-3xl border border-[#ebd9c5] bg-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#0d9488] text-white text-2xl font-black shadow-sm">
              🤝
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[#f0fdfa] border border-[#99f6e4] px-3 py-0.5 text-xs font-bold text-[#0f766e]">
                  TNV THẺ CAM WBU
                </span>
                <span className="text-xs text-[#665b50]">Mã: TNV-HN09</span>
              </div>
              <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#352016]">
                Trần Mai Anh · Trạm Trực 28 Hàng Buồm
              </h2>
              <p className="mt-1 text-sm text-[#554336]">
                Ca trực chiều: <strong>13:30 – 17:30</strong> • Khu vực phụ trách: Hàng Buồm, Mã Mây, Hàng Bạc, Đào Duy Từ
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={toggleStatus}
              aria-pressed={isOnline}
              className={`flex items-center gap-2.5 rounded-2xl px-5 py-3 text-sm font-bold shadow-sm transition-all focus:ring-4 ${
                isOnline
                  ? "bg-[#16a34a] text-white hover:bg-[#15803d] focus:ring-green-200"
                  : "bg-[#e5e7eb] text-[#374151] hover:bg-[#d1d5db] focus:ring-gray-300"
              }`}
            >
              <span className={`h-3 w-3 rounded-full ${isOnline ? "bg-white animate-ping" : "bg-gray-500"}`} />
              <span>{isOnline ? "Đang trực tuyến (Sẵn sàng nhận ca)" : "Đang tạm nghỉ (Tắt nhận ca)"}</span>
            </button>

            <Link
              href="/partner"
              className="rounded-2xl border border-[#ebd9c5] bg-[#faf9f3] px-4 py-3 text-sm font-semibold text-[#554336] hover:bg-[#f0e7dd] transition-colors"
            >
              Cổng đối tác
            </Link>
          </div>
        </div>

        {/* Volunteer Stats Strip */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 border-t border-[#f0e7dd] pt-6">
          <div className="rounded-2xl bg-[#faf9f3] p-4 border border-[#f0e7dd]">
            <p className="text-xs font-medium text-[#665b50]">Giờ đồng hành tích lũy</p>
            <p className="mt-1 text-2xl font-black text-[#0d9488]">42.5 giờ</p>
          </div>
          <div className="rounded-2xl bg-[#faf9f3] p-4 border border-[#f0e7dd]">
            <p className="text-xs font-medium text-[#665b50]">Ca hỗ trợ hoàn thành</p>
            <p className="mt-1 text-2xl font-black text-[#c75c13]">28 lượt</p>
          </div>
          <div className="rounded-2xl bg-[#faf9f3] p-4 border border-[#f0e7dd]">
            <p className="text-xs font-medium text-[#665b50]">Khảo sát rào cản đã gửi</p>
            <p className="mt-1 text-2xl font-black text-[#352016]">15 điểm</p>
          </div>
          <div className="rounded-2xl bg-[#faf9f3] p-4 border border-[#f0e7dd]">
            <p className="text-xs font-medium text-[#665b50]">Chỉ số an toàn & Thấu cảm (số liệu minh họa)</p>
            <p className="mt-1 text-2xl font-black text-[#16a34a]">100% ★</p>
          </div>
        </div>
      </section>

      {/* Main Grid: Left Column = Live Requests & WBU Guide; Right Column = Barrier Audit & Inventory */}
      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        {/* Left Column (7 cols): Real-Time Accompaniment Requests Feed */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          <section aria-labelledby="live-requests-heading" className="rounded-3xl border border-[#ebd9c5] bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-3 pb-4 border-b border-[#f0e7dd]">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#c75c13] uppercase">
                  <span className="h-2 w-2 rounded-full bg-[#c75c13] animate-pulse" />
                  <span>Bảng Tin Thực Địa Phố Cổ</span>
                </div>
                <h3 id="live-requests-heading" className="text-xl font-bold text-[#352016]">
                  Yêu Cầu Hỗ Trợ Đón Khách Tức Thời
                </h3>
              </div>
              <span className="rounded-full bg-[#ffedd5] px-3 py-1 text-xs font-bold text-[#9a3412]">
                {requests.filter((r) => r.status === "pending").length} ca chờ
              </span>
            </div>

            <div className="mt-5 space-y-4">
              {requests.map((req) => (
                <article
                  key={req.id}
                  className={`rounded-2xl border p-5 transition-all ${
                    req.status === "completed"
                      ? "border-gray-200 bg-gray-50 opacity-75"
                      : req.status === "accepted"
                      ? "border-green-300 bg-green-50/50"
                      : "border-[#ebd9c5] bg-white hover:border-[#c75c13]"
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <span className="text-xs font-bold text-[#0d9488] uppercase tracking-wide">
                        {req.disabilityType}
                      </span>
                      <h4 className="text-lg font-bold text-[#352016]">{req.touristName}</h4>
                    </div>

                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                        req.status === "completed"
                          ? "bg-gray-200 text-gray-700"
                          : req.status === "accepted"
                          ? "bg-green-100 text-green-800"
                          : "bg-amber-100 text-amber-800 animate-pulse"
                      }`}
                    >
                      {req.status === "completed"
                        ? "Đã hoàn thành"
                        : req.status === "accepted"
                        ? "Bạn đang phụ trách"
                        : "Cần tình nguyện viên"}
                    </span>
                  </div>

                  {/* Route details */}
                  <div className="mt-3 rounded-xl bg-[#faf9f3] p-3 border border-[#f0e7dd] text-xs space-y-1.5 text-[#554336]">
                    <p>
                      <strong>Điểm đón:</strong> <span className="text-[#352016] font-semibold">{req.pickup}</span>
                    </p>
                    <p>
                      <strong>Đến:</strong> <span className="text-[#352016] font-semibold">{req.destination}</span> ({req.distance})
                    </p>
                    <p>
                      <strong>Thời gian:</strong> <span className="text-[#c75c13] font-bold">{req.time}</span>
                    </p>
                    <p className="text-[#665b50] italic border-t border-[#f0e7dd] pt-1.5">
                      &ldquo;{req.notes}&rdquo;
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-2">
                    <span className="text-xs text-[#665b50]">
                      Hotline khách: <strong>{req.phone}</strong>
                    </span>

                    <div className="flex items-center gap-2">
                      {req.status === "pending" && (
                        <button
                          type="button"
                          onClick={() => handleAcceptRequest(req.id)}
                          className="rounded-xl bg-[#f8ae38] hover:bg-[#e09f2f] text-[#212529] px-4 py-2 text-xs font-bold shadow-xs transition-all focus:ring-4 focus:ring-amber-200"
                        >
                          Nhận ca hỗ trợ này
                        </button>
                      )}

                      {req.status === "accepted" && (
                        <button
                          type="button"
                          onClick={() => handleCompleteRequest(req.id)}
                          className="rounded-xl bg-[#16a34a] hover:bg-[#15803d] text-white px-4 py-2 text-xs font-bold shadow-xs transition-all"
                        >
                          ✓ Đã hoàn thành an toàn
                        </button>
                      )}

                      <a
                        href={`tel:${req.phone.replace(/[^0-9]/g, "")}`}
                        className="rounded-xl border border-[#ebd9c5] bg-white px-3 py-2 text-xs font-semibold text-[#554336] hover:bg-[#f0e7dd]"
                      >
                        Gọi điện
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* WBU 4-Step Accompaniment Guide */}
          <section id="wbu-guidelines" className="rounded-3xl border border-[#ebd9c5] bg-white p-6 shadow-sm">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0d9488] uppercase">
              <span>Chuẩn Hiệp Hội Người Khiếm Thị Thế Giới (WBU)</span>
            </div>
            <h3 className="mt-1 text-xl font-bold text-[#352016]">
              4 Bước Đồng Hành An Toàn (Sighted Guide)
            </h3>
            <p className="mt-1 text-xs text-[#665b50]">
              Quy tắc ứng xử cốt lõi khi hỗ trợ người mù và người nhìn kém trên vỉa hè Phố Cổ:
            </p>

            <div className="mt-4 grid gap-3 sm:grid-cols-2 text-xs text-[#554336]">
              <div className="rounded-2xl bg-[#faf9f3] p-4 border border-[#f0e7dd]">
                <span className="font-bold text-[#0d9488] text-sm">Bước 1: Chào hỏi & Xin phép</span>
                <p className="mt-1 leading-relaxed">
                  Đứng cách khách 1 cánh tay. Chào bằng tên, giới thiệu bạn là TNV WayEcho và hỏi: <em>&ldquo;Bác/bạn có cần hỗ trợ qua ngã tư này không ạ?&rdquo;</em>. Không tự ý cầm tay hay đẩy lưng.
                </p>
              </div>

              <div className="rounded-2xl bg-[#faf9f3] p-4 border border-[#f0e7dd]">
                <span className="font-bold text-[#0d9488] text-sm">Bước 2: Kỹ thuật Cho mượn cánh tay</span>
                <p className="mt-1 leading-relaxed">
                  Để khách chạm mu bàn tay vào mặt ngoài khuỷu tay bạn. Khách sẽ nắm nhẹ phía trên khuỷu tay bạn khoảng 3-5cm. Bạn đi trước nửa bước chân để khách cảm nhận chuyển động cơ thể.
                </p>
              </div>

              <div className="rounded-2xl bg-[#faf9f3] p-4 border border-[#f0e7dd]">
                <span className="font-bold text-[#0d9488] text-sm">Bước 3: Báo trước Bậc thềm & Chướng ngại</span>
                <p className="mt-1 leading-relaxed">
                  Dừng lại 1 nhịp trước mép vỉa hè hoặc bậc cửa. Báo rõ: <em>&ldquo;Phía trước có bậc bước lên, cao khoảng 15cm&rdquo;</em>. Không bao giờ nói &ldquo;coi chừng&rdquo; chung chung mà không nêu hướng.
                </p>
              </div>

              <div className="rounded-2xl bg-[#faf9f3] p-4 border border-[#f0e7dd]">
                <span className="font-bold text-[#0d9488] text-sm">Bước 4: Hướng dẫn Chỗ ngồi</span>
                <p className="mt-1 leading-relaxed">
                  Đặt tay của khách chạm vào lưng ghế hoặc tay vịn. Để khách tự ước lượng khoảng cách và ngồi xuống tự nhiên theo quán tính.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column (5 cols): Tactile Sidewalk Audit & Station Inventory */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          {/* Barrier Reporting Form */}
          <section id="audit-feed" className="rounded-3xl border border-[#ebd9c5] bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#f0e7dd]">
              <h3 className="text-xl font-bold text-[#352016]">
                Khảo Sát & Báo Cáo Rào Cản
              </h3>
              <span className="rounded-full bg-[#f0fdfa] border border-[#99f6e4] px-2.5 py-0.5 text-xs font-bold text-[#0f766e]">
                Thực địa Phố Cổ
              </span>
            </div>

            {submittedAlert && (
              <div role="status" className="mt-3 rounded-xl bg-green-100 border border-green-300 p-3 text-xs font-bold text-green-800">
                {submittedAlert}
              </div>
            )}

            <form onSubmit={handleAddBarrier} className="mt-4 space-y-3">
              <div>
                <label htmlFor="barrier-loc" className="block text-xs font-bold text-[#352016]">
                  Vị trí vỉa hè / Số nhà phát hiện:
                </label>
                <input
                  id="barrier-loc"
                  type="text"
                  required
                  placeholder="VD: Trước số 22 Hàng Buồm, ngã tư Tạ Hiện..."
                  value={barrierLocation}
                  onChange={(e) => setBarrierLocation(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#ebd9c5] bg-[#faf9f3] p-2.5 text-xs text-[#212529] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0d9488]"
                />
              </div>

              <div>
                <label htmlFor="barrier-type" className="block text-xs font-bold text-[#352016]">
                  Loại rào cản cản trở:
                </label>
                <select
                  id="barrier-type"
                  value={barrierType}
                  onChange={(e) => setBarrierType(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#ebd9c5] bg-[#faf9f3] p-2.5 text-xs text-[#212529] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0d9488]"
                >
                  <option value="Vật cản dải gạch xúc giác">Xe máy/bàn ghế chiếm gạch xúc giác</option>
                  <option value="Bậc thềm cao không gờ dốc">Bậc thềm cao chênh cốt (&gt; 15cm)</option>
                  <option value="Biển hiệu ngang tầm đầu">Biển quảng cáo/cành cây thấp ngang tầm đầu</option>
                  <option value="Hố đào công trình không rào">Nắp cống hỏng/Hố đào công trình</option>
                </select>
              </div>

              <div>
                <label htmlFor="barrier-note" className="block text-xs font-bold text-[#352016]">
                  Ghi chú hiện trường:
                </label>
                <textarea
                  id="barrier-note"
                  rows={2}
                  placeholder="Mô tả cụ thể để cảnh báo bản đồ âm thanh..."
                  value={barrierNote}
                  onChange={(e) => setBarrierNote(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#ebd9c5] bg-[#faf9f3] p-2.5 text-xs text-[#212529] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0d9488]"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-[#0d9488] hover:bg-[#0f766e] text-white py-2.5 text-xs font-bold shadow-xs transition-colors"
              >
                + Gửi Báo Cáo Rào Cản Lên Bản Đồ
              </button>
            </form>

            {/* Active alerts list */}
            <div className="mt-6 border-t border-[#f0e7dd] pt-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#665b50]">
                Rào cản đang được giám sát ({barriers.length})
              </h4>
              <ul className="mt-3 space-y-2.5">
                {barriers.slice(0, 4).map((b) => (
                  <li key={b.id} className="rounded-xl bg-[#faf9f3] p-3 border border-[#f0e7dd] text-xs">
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-bold text-[#352016]">{b.location}</span>
                      <span className="rounded px-1.5 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-800">
                        {b.severity}
                      </span>
                    </div>
                    <p className="mt-1 text-[#554336]">{b.type}</p>
                    <p className="mt-1 text-[11px] text-[#0d9488] font-medium">↳ {b.status}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="rounded-3xl border border-[#ebd9c5] bg-white p-6 shadow-sm">
            <h3 className="text-xl font-bold text-[#352016]">Hướng dẫn chuẩn bị trước ca hỗ trợ</h3>
            <p className="mt-2 text-sm text-[#665b50]">WayEcho không bán, phát hay cho mượn gậy trắng, tai nghe hoặc thiết bị trợ năng. Khách có thể sử dụng dụng cụ cá nhân phù hợp với thói quen của mình.</p>
            <ul className="mt-4 list-disc pl-5 text-sm leading-8 text-[#352016]">
              <li>Hỏi khách có muốn được hỗ trợ và hỗ trợ theo cách nào.</li>
              <li>Không tự ý chạm hoặc cầm gậy trắng của khách.</li>
              <li>Nhắc khách chuẩn bị thiết bị cá nhân quen dùng nếu cần.</li>
              <li>Không mô tả trạm demo như một cơ sở hỗ trợ đang vận hành thực tế.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
