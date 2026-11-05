"use client";
import EscrowLedgerView from "@/components/EscrowLedgerView";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useA11y } from "@/components/A11yProvider";
import { bookingStatus, requestStatus } from "@/lib/bookingStatus";
import { api } from "@/lib/api";

import { CalendarIcon, SpeakerIcon } from "@/components/Icons";

export default function MyBookingPage() {
  const { speak } = useA11y();
  const [bookings, setBookings] = useState([]);
  const [requests, setRequests] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    // Lỗi tải yêu cầu hỗ trợ không được che danh sách đặt chỗ.
    Promise.all([api.listBookings(), api.listRequests().catch(() => null)])
      .then(([list, reqs]) => { setBookings(list); setRequests(reqs); })
      .catch(() => setError("Không tải được đặt chỗ. Hãy kiểm tra kết nối rồi thử lại.")).finally(() => setLoading(false));
  }, [attempt]);
  const [busyId, setBusyId] = useState("");
  const [notice, setNotice] = useState("");
  async function cancel(b) {
    if (!window.confirm(`Hủy đặt chỗ "${b.itemName}"? Đây là bản demo, không có tiền thật.`)) return;
    setBusyId(b.id); setError(""); setNotice("");
    try { await api.updateBooking(b.id, "cancelled"); setBookings((xs) => xs.map((x) => (x.id === b.id ? { ...x, status: "cancelled" } : x))); setNotice("Đã hủy đặt chỗ."); speak("Đã hủy đặt chỗ."); }
    catch (e) { setNotice(""); setError(e.message || "Chưa hủy được đặt chỗ."); } finally { setBusyId(""); }
  }
  // Hành trình của khách: Đã gửi → Cơ sở xác nhận → Đến trải nghiệm → Đánh giá.
  function stage(b) {
    if (["rejected", "cancelled"].includes(b.status)) return -1;
    if (b.status === "pending") return 0;
    return b.status === "completed" ? 2 : 1;
  }
  const STEPS = ["Đã gửi đặt chỗ", "Cơ sở xác nhận", "Đến trải nghiệm", "Chia sẻ đánh giá"];
  function retry() { setLoading(true); setError(""); setAttempt((n) => n + 1); }

  return (
    <div className="container-page py-10">
      <h1 className="text-4xl sm:text-5xl">Đặt chỗ của tôi</h1>
      <p className="hc-muted mt-3 max-w-2xl text-lg text-ink-soft">
        Các bản ghi đặt chỗ của bạn. Chưa có nhà cung cấp, tồn chỗ hoặc thanh toán thật; xác nhận trong demo không bảo đảm dịch vụ thực tế. Bạn cần đăng nhập bằng tài khoản khách hàng để đặt dịch vụ và xem đơn của chính mình. Các đơn ở đây chỉ là mô phỏng, không phải xác nhận của nhà cung cấp thực tế.
      </p>

      {notice && <p role="status" className="mt-4 rounded-xl border border-green-300 bg-green-50 p-3 font-semibold text-green-900">{notice}</p>}
      {loading ? (
        <p className="mt-8 text-ink-soft">Đang tải…</p>
      ) : error ? (<div className="mt-8" role="alert"><p className="text-red-800">{error}</p><button type="button" onClick={retry} className="btn-ghost hc-border mt-3">Thử lại</button></div>) : bookings.length === 0 ? (
        <div className="mt-8 rounded-[18px] border border-line bg-white p-8 text-center hc-surface hc-border">
          <p className="text-lg">Bạn chưa có đặt chỗ nào.</p>
          <Link href="/explore" className="btn-primary mt-4">Khám phá dịch vụ</Link>
        </div>
      ) : (
        <ul className="mt-8 space-y-4">
          {bookings.map((b) => { const req = requests?.find((r) => r.bookingId === b.id); const reqText = b.assist ? (req ? requestStatus(req.status) : requests ? "Có yêu cầu hỗ trợ" : "Có yêu cầu hỗ trợ (chưa tải được trạng thái)") : ""; return (
            <li key={b.id} className="card hc-surface hc-border p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-surface-alt text-ink"><CalendarIcon size={24} /></span>
              <div className="flex-1">
                <p className="text-xl font-semibold">{b.itemName}</p>
                <p className="hc-muted flex flex-wrap items-center gap-x-3 text-ink-soft">
                  <span className="flex items-center gap-1"><CalendarIcon size={15} /> {b.date || "—"} · {b.time || "—"}</span>
                  <span>{b.guests} khách</span>
                  {reqText && <span className="font-semibold text-accent-dark">{reqText}</span>}
                  {b.price && <span className="font-bold text-ink">{b.price}</span>}
                </p>
                {req?.note && <p className="mt-1 text-sm">Ghi chú của doanh nghiệp: {req.note}</p>}
              </div>
              <span className={`chip hc-surface hc-border ${bookingStatus(b.status)[1]}`}>{bookingStatus(b.status)[0]}</span>
              <button
                onClick={() => speak(`${b.itemName}, ${b.time || ""} ${b.date || ""}, ${b.guests} khách. ${bookingStatus(b.status)[0]}. ${reqText}${req?.note ? `. Ghi chú: ${req.note}` : ""}.`)}
                className="btn-ghost hc-border !min-h-[40px] !p-2" aria-label={`Nghe lại đơn ${b.itemName}`}
              ><SpeakerIcon size={18} /></button>
              </div>
              {(() => { const at = stage(b); return <>
                {at >= 0 && <ol className="mt-4 grid grid-cols-2 gap-2 text-xs font-semibold sm:grid-cols-4" aria-label="Tiến trình đặt chỗ">{STEPS.map((t, i) => <li key={t} aria-current={i === at ? "step" : undefined} className={`rounded-full px-3 py-2 text-center ${i < at ? "bg-green-100 text-green-900" : i === at ? "bg-[#ffb332] text-[#171b20]" : "bg-[#f3efe7] text-[#6b6358]"}`}>{i < at ? "✓ " : ""}{t}</li>)}</ol>}
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link href={`/item?id=${b.itemId}`} className="btn-ghost hc-border !min-h-[44px] !py-2 text-sm">Xem dịch vụ</Link>
                  {["pending", "confirmed"].includes(b.status) && <button type="button" disabled={busyId === b.id} onClick={() => cancel(b)} className="btn-ghost hc-border !min-h-[44px] !py-2 text-sm disabled:opacity-60">Hủy đặt chỗ</button>}
                  {at === 2 && <Link href={`/review?item=${b.itemId}&bookingId=${encodeURIComponent(b.id)}`} className="btn-primary !min-h-[44px] !py-2 text-sm">Viết đánh giá tiếp cận</Link>}
                  {at >= 1 && <Link href="/report" className="btn-ghost hc-border !min-h-[44px] !py-2 text-sm">Báo sự cố đang gặp</Link>}
                  {at === -1 && <Link href={`/booking?item=${b.itemId}`} className="btn-primary !min-h-[44px] !py-2 text-sm">Đặt lại dịch vụ này</Link>}
                </div>
                {at === 1 && <p className="mt-2 text-xs text-ink-soft hc-muted">Nút đánh giá sẽ mở sau khi đơn được xác nhận hoàn thành trải nghiệm.</p>}
              </>; })()}
            </li>
          ); })}
        </ul>
      )}
    <EscrowLedgerView role="customer" />
      </div>
  );
}
