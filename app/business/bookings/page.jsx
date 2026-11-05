"use client";
import {useBusiness} from "@/components/BusinessShell";

import { useEffect, useState } from "react";
import {bookingStatus} from "@/lib/bookingStatus";
import { api } from "@/lib/api";
import { RIDE_STATUS, RIDE_VEHICLES } from "@/lib/rideDemo";

import Link from "next/link";
import { CalendarIcon, AccessibleIcon, CheckIcon } from "@/components/Icons";



export default function BusinessBookings() {
  const {businessId}=useBusiness();
  const [bookings, setBookings] = useState([]);
  const [rides,setRides]=useState([]);
  const [loading, setLoading] = useState(true);
  const [error,setError] = useState("");
  const [busy, setBusy] = useState(null);

  useEffect(() => { let live=true;
    Promise.all([api.listBusinessBookings(businessId),fetch('/api/ride-demo',{cache:'no-store'}).then(r=>r.ok?r.json():[])]).then(([b,r])=>{if(live){setBookings(b);setRides(Array.isArray(r)?r:[]);}}).catch(err => {if(live)setError(err.message)}).finally(() => {if(live)setLoading(false)});
    return ()=>{live=false};
  }, [businessId]);
  async function decide(id, status) { setBusy(id); try { const updated = await api.updateBooking(id, status); setBookings((xs) => xs.map((x) => x.id === id ? updated : x)); } catch(err) { setError(err.message); } finally { setBusy(null); } }

  return (
    <div className="mx-auto max-w-[1500px] px-4 py-8 lg:px-8">
      <Link href="/business/requests" className="inline-flex rounded-full bg-[#ffcf74] px-5 py-3 font-bold">Xem yêu cầu hỗ trợ →</Link>
      {error && <p role="alert" className="mb-4 text-red-800">{error}</p>}
      <h1 className="text-4xl sm:text-5xl">Đặt chỗ &amp; Yêu cầu hỗ trợ</h1>
      <p className="hc-muted mt-2 text-lg text-ink-soft">Yêu cầu khách gửi đến hộp thư tiếp nhận DEMO của dịch vụ này. Xác nhận chỉ là thao tác minh họa, không gửi đơn tới nhà cung cấp thực tế.</p>
      {loading ? <p className="mt-8 text-ink-soft">Đang tải…</p> : bookings.length === 0 && rides.length===0 ? (
        <div className="mt-8 rounded-[18px] border border-line bg-white p-8 text-center hc-surface hc-border"><p className="text-lg">Chưa có yêu cầu đặt chỗ demo nào cho dịch vụ này.</p><p className="hc-muted mt-1 text-ink-soft">Ở Cổng đối tác, chọn đúng dịch vụ demo rồi đăng nhập vai trò Doanh nghiệp. Khách tạo yêu cầu từ trang chi tiết của cùng dịch vụ.</p></div>
      ) : bookings.length>0 ? (
        <div className="mt-8 overflow-x-auto"><table className="w-full min-w-[760px] border-collapse text-left"><thead><tr className="border-b-2 border-line text-sm text-ink-soft hc-muted"><th className="py-3 pr-4">Dịch vụ</th><th className="py-3 pr-4">Ngày / giờ</th><th className="py-3 pr-4">Khách</th><th className="py-3 pr-4">Hỗ trợ tiếp cận</th><th className="py-3 pr-4">Trạng thái</th><th className="py-3">Xử lý</th></tr></thead><tbody>{bookings.map((b) => { const [label, cls] = bookingStatus(b.status); return <tr key={b.id} className="border-b border-line hc-border"><td className="py-4 pr-4 font-semibold">{b.itemName}</td><td className="py-4 pr-4 text-ink-soft hc-muted"><CalendarIcon size={14} className="mr-1 inline align-[-2px]" />{b.date || "—"} · {b.time || "—"}</td><td className="py-4 pr-4">{b.guests}</td><td className="py-4 pr-4">{b.assist ? <span className="inline-flex items-center gap-1 font-semibold text-accent-dark"><AccessibleIcon size={15} /> Có yêu cầu</span> : "—"}</td><td className="py-4 pr-4"><span className={`rounded-pill px-3 py-1 text-xs font-bold ${cls}`}>{label}</span></td><td className="py-4">{b.status === "pending" ? <div className="flex gap-2"><button disabled={busy === b.id} onClick={() => decide(b.id, "confirmed")} className="btn-primary !min-h-[38px] !px-3 !py-1 text-xs"><CheckIcon size={15}/>Xác nhận</button><button disabled={busy === b.id} onClick={() => decide(b.id, "rejected")} className="btn-ghost hc-border !min-h-[38px] !px-3 !py-1 text-xs">Từ chối</button></div> : b.status === "confirmed" ? <button disabled={busy === b.id} onClick={() => decide(b.id, "completed")} className="btn-primary !min-h-[38px] !px-3 !py-1 text-xs">Xác nhận hoàn thành</button> : "—"}</td></tr>; })}</tbody></table></div>
      ) : null}
      {rides.length>0&&<section className="mt-8 rounded-3xl border border-[#f0dfc7] bg-white p-5">
        <h2 className="text-2xl font-bold">Yêu cầu xe của dịch vụ này (DEMO)</h2>
        <p className="mt-1 text-sm text-[#775e48]">Đơn được chuyển đến đúng hộp thư của phương tiện đã chọn. Chỉ Admin có quyền mô phỏng phân công tài xế; không phải chuyến xe thật.</p>
        <div className="mt-4 space-y-3">{rides.map(r=><article key={r.id} className="rounded-2xl border border-[#eddcc5] bg-[#fffaf2] p-4"><div className="flex flex-wrap justify-between gap-2"><b>{r.id} · {RIDE_VEHICLES.find(v=>v.id===r.vehicle)?.name||'Phương tiện'}</b><span className="rounded-full bg-[#ffe4a7] px-3 py-1 text-xs font-bold">{RIDE_STATUS[r.status]||r.status} · DEMO</span></div><p className="mt-2 text-sm">Điểm đón: {r.pickup}</p><p className="mt-1 text-sm">Điểm đến: {r.destination}</p><p className="mt-1 text-sm">Yêu cầu hỗ trợ: {r.notes||'Chưa có'}</p><Link href="/partner" className="mt-3 inline-block text-xs font-bold text-[#a5670b]">Quay lại Cổng đối tác →</Link></article>)}</div>
      </section>}
    </div>
  );
}
