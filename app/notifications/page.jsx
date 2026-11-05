"use client";

import {useEffect, useMemo, useState} from "react";
import Link from "next/link";
import {api} from "@/lib/api";
import {useA11y} from "@/components/A11yProvider";

const filters = [
  ["all", "Tất cả"], ["booking", "Đặt dịch vụ"],
  ["support", "Yêu cầu hỗ trợ"], ["finance", "Thanh toán demo"],
  ["other", "Thông tin khác"]
];
function kind(item) {
  const type = (item.type || "").toLowerCase();
  if (/booking|ride|reservation|trip/.test(type)) return "booking";
  if (/request|support|advisor|accessibility/.test(type)) return "support";
  if (/escrow|payment|refund|finance/.test(type)) return "finance";
  return "other";
}
function safeDate(item) {
  const raw = item.createdAt || item.timestamp || item.date;
  if (!raw) return "Thông báo từ WayEcho";
  const d = new Date(raw);
  return Number.isNaN(d.getTime()) ? "Thông báo từ WayEcho" : d.toLocaleString("vi-VN", {dateStyle:"short",timeStyle:"short"});
}
export default function NotificationsPage() {
  const {speak} = useA11y();
  const [items,setItems] = useState([]);
  const [tab,setTab] = useState("all");
  const [busy,setBusy] = useState(true);
  const [error,setError] = useState("");
  const [readIds,setReadIds] = useState([]);
  useEffect(()=>{
    let ok=true;
    try {setReadIds(JSON.parse(sessionStorage.getItem("waye-notifications-read") || "[]"));} catch {}
    api.listNotifications().then(data=>{if(ok) setItems(Array.isArray(data)?data:[]);})
      .catch(()=>{if(ok) setError("Không tải được thông báo. Vui lòng thử lại.");})
      .finally(()=>{if(ok) setBusy(false);});
    return ()=>{ok=false;};
  },[]);
  function markRead(ids) {
    const next=[...new Set([...readIds,...ids])];
    setReadIds(next);
    try{sessionStorage.setItem("waye-notifications-read",JSON.stringify(next));}catch{}
  }
  const visible=useMemo(()=>items.filter(item=>tab==="all"||kind(item)===tab),[items,tab]);
  const unread=items.filter(item=>!readIds.includes(item.id)).length;
  function readLatest(){if(items.length) speak(items[0].message); else speak("Bạn chưa có thông báo nào.");}
  useEffect(()=>{
    function onKey(e){
      if(e.altKey && (e.key==="r"||e.key==="R")){e.preventDefault();readLatest();}
      if(e.altKey && (e.key==="f"||e.key==="F")){e.preventDefault();document.getElementById("waye-notification-filter-all")?.focus();}
    }
    window.addEventListener("keydown",onKey);
    return ()=>window.removeEventListener("keydown",onKey);
  },[items,speak]);
  return <div className="min-h-screen bg-[#fffaf1] pb-16 text-[#28231e]">
    <main className="container-page py-8 sm:py-12 space-y-7">
      <nav aria-label="Đường dẫn trang" className="text-sm text-[#755d43]"><Link href="/" className="underline-offset-4 hover:underline">Trang chủ</Link><span aria-hidden="true"> / </span><span aria-current="page">Thông báo của tôi</span></nav>
      <header className="rounded-[30px] border border-[#efd8b2] bg-gradient-to-r from-[#fff0cb] via-[#fff8e9] to-white p-6 sm:p-9 shadow-sm">
        <p className="text-sm font-bold uppercase tracking-wider text-[#a46615]">Cập nhật dành riêng cho bạn</p>
        <h1 className="mt-2 text-3xl sm:text-5xl font-black">Thông báo của tôi</h1>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-[#5f5348]">Theo dõi trạng thái đặt dịch vụ, chuyến đi, yêu cầu hỗ trợ và các phản hồi từ WayEcho. Đây là bản demo; chưa có thông báo đẩy đến điện thoại.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <button type="button" className="rounded-2xl border border-[#ddb874] bg-white px-5 py-3 font-bold min-h-12" onClick={readLatest}>🔊 Nghe thông báo mới nhất</button>
          <button type="button" className="rounded-2xl bg-[#f8ae38] px-5 py-3 font-bold min-h-12 text-[#211b13] hover:bg-[#f5a524]" onClick={()=>markRead(items.map(x=>x.id))}>✓ Đánh dấu tất cả đã đọc</button>
        </div>
      </header>
      <section aria-label="Tổng hợp thông báo" className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-[#f1debf] bg-white p-5"><p className="text-sm text-[#665b50]">Tổng thông báo</p><p className="mt-1 text-3xl font-black">{items.length}</p></div>
        <div className="rounded-2xl border border-[#f1debf] bg-white p-5"><p className="text-sm text-[#665b50]">Chưa đọc trên thiết bị</p><p className="mt-1 text-3xl font-black text-[#b46a12]">{unread}</p></div>
        <div className="col-span-2 rounded-2xl border border-[#f1debf] bg-white p-5 sm:col-span-1"><p className="text-sm text-[#665b50]">Nơi quản lý đơn</p><Link href="/my-booking" className="mt-2 inline-block font-bold text-[#925002] underline underline-offset-4">Xem đặt chỗ của tôi</Link></div>
      </section>
      <section aria-label="Danh sách thông báo" className="space-y-5">
        <div role="group" aria-label="Lọc theo nhóm thông báo" className="flex flex-wrap gap-2">
          {filters.map(([id,label])=><button key={id} id={`waye-notification-filter-${id}`} type="button" aria-pressed={tab===id} onClick={()=>setTab(id)} className={`rounded-full border px-4 py-3 text-sm font-bold min-h-12 ${tab===id?"border-[#d99112] bg-[#ffcf69] text-[#2d2116]":"border-[#e7d7bf] bg-white hover:bg-[#fff1d7]"}`}>{label}</button>)}
        </div>
        <div role="status" aria-live="polite" className="text-sm text-[#76604c]">{busy ? "Đang tải thông báo..." : `Hiển thị ${visible.length} thông báo`}</div>
        {error && <div role="alert" className="rounded-2xl border border-red-300 bg-red-50 px-5 py-4 text-red-900">{error}<button type="button" className="ml-3 font-bold underline" onClick={()=>window.location.reload()}>Tải lại</button></div>}
        {!busy && !error && !visible.length && <div className="rounded-[26px] border border-[#f0ddc0] bg-white p-10 text-center"><div className="text-4xl" aria-hidden="true">🔔</div><h2 className="mt-3 text-xl font-bold">Chưa có thông báo nào</h2><p className="mt-2 text-[#65574a]">Khi bạn có cập nhật về đặt dịch vụ hoặc yêu cầu hỗ trợ, nội dung sẽ xuất hiện tại đây.</p><Link href="/explore" className="mt-5 inline-block rounded-xl bg-[#f8ae38] px-5 py-3 font-bold">Khám phá dịch vụ</Link></div>}
        <div className="space-y-3">
          {visible.map(item=><article key={item.id} className="rounded-2xl border border-[#f0ddc0] bg-white p-5 sm:p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <span aria-hidden="true" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#fff0d0] text-2xl">{kind(item)==="booking"?"📅":kind(item)==="support"?"🤝":kind(item)==="finance"?"💳":"🔔"}</span>
              <div className="min-w-0 flex-1"><p className="text-xs font-semibold text-[#835b21]">{safeDate(item)}{!readIds.includes(item.id)?" · Chưa đọc":" · Đã đọc trên thiết bị"}</p><p className="mt-2 text-base font-semibold leading-relaxed">{item.message}</p>
                <div className="mt-4 flex flex-wrap gap-2"><button type="button" onClick={()=>{speak(item.message);markRead([item.id]);}} className="rounded-xl border border-[#e8d5b6] bg-[#fff9ee] px-4 py-2.5 font-semibold min-h-11">Nghe nội dung</button>{!readIds.includes(item.id)&&<button type="button" onClick={()=>markRead([item.id])} className="rounded-xl border border-[#e8d5b6] bg-white px-4 py-2.5 font-semibold min-h-11">Đánh dấu đã đọc</button>}{kind(item)==="booking"&&<Link href="/my-booking" className="rounded-xl border border-[#e8d5b6] bg-white px-4 py-2.5 font-semibold min-h-11">Xem đơn đặt</Link>}</div>
              </div>
            </div>
          </article>)}
        </div>
      </section>
      <div className="rounded-2xl bg-[#fff0d2] p-5 text-sm leading-relaxed text-[#69491e]">Lưu ý: Các đơn đặt, giao dịch và trạng thái hiển thị ở môi trường hiện tại chỉ phục vụ mô phỏng. Nếu gặp nguy hiểm thật, hãy gọi 113, 114 hoặc 115; không chờ thông báo từ WayEcho.</div>
    </main>
  </div>;
}
