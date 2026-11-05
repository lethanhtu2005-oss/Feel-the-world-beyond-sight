"use client";
import {useBusiness} from "@/components/BusinessShell";

import Link from "next/link";
import { getBusiness } from "@/data/businesses";
import { getItem, catLabel } from "@/data/catalog";
import { AccessibleIcon } from "@/components/Icons";

const DECL_LABELS = {
  blind: "Phù hợp người mù", lowVision: "Phù hợp người nhìn kém", staff: "Nhân viên hỗ trợ",
  audio: "Thuyết minh bằng âm thanh", braille: "Chữ nổi Braille", elevator: "Thang máy",
  stepFree: "Lối không bậc", checkinAssist: "Hỗ trợ nhận phòng", accessibleRoom: "Phòng/khu tiếp cận",
};
const valCls = (v) => v === "Tốt" || v === "Có" ? "text-green-700" : v === "Trung bình" ? "text-amber-700" : "text-red-600";

export default function BusinessServices() {
  const {businessId}=useBusiness();
  const biz = getBusiness(businessId);
  const items = biz.items.map(getItem).filter(Boolean);
  const isLodging = biz.type === "Lưu trú";

  return (
    <div className="mx-auto max-w-[1500px] px-4 py-8 lg:px-8">
      <h1 className="text-4xl sm:text-5xl">Quản lý dịch vụ</h1>
      <p className="hc-muted mt-2 text-lg text-ink-soft">Quản lý dịch vụ demo và khai báo khả năng tiếp cận. Chỉ dữ liệu đã được xác minh mới nên hiển thị là “Có”.</p>

      <section className="mt-7 rounded-3xl border border-[#f0dfc7] bg-[#fff7e6] p-5 text-sm text-[#704b24]">
        <strong>Danh mục dịch vụ của đơn vị đang chọn · DEMO</strong>
        <p className="mt-1">Mỗi dịch vụ có một hộp thư tiếp nhận thử nghiệm riêng. Đơn và trạng thái xử lý không đồng nghĩa cơ sở thật đã nhận hoặc xác nhận đặt chỗ.</p>
        <p className="mt-2">Loại dịch vụ: <b>{biz.type}</b> · Số dịch vụ: <b>{items.length}</b></p>
      </section>
      {/* Khai báo accessibility */}
      <section className="mt-8 rounded-[18px] border border-line bg-white p-6 shadow-card hc-surface hc-border" aria-labelledby="decl">
        <h2 id="decl" className="flex items-center gap-2 text-2xl"><AccessibleIcon size={24} /> Khai báo khả năng tiếp cận</h2>
        <p className="hc-muted mt-1 text-sm text-ink-soft">Thông tin này giúp khách khiếm thị quyết định trước khi đặt (khách không thể tự sửa; chỉ doanh nghiệp cập nhật).</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(biz.declaration).map(([k, v]) => (
            <div key={k} className="flex items-center justify-between rounded-xl border border-line p-3 hc-border">
              <span className="font-medium">{DECL_LABELS[k] || k}</span>
              <span className={`font-bold ${v === "Chưa xác minh" ? "text-neutral-600" : valCls(v)}`}>{v}</span>
            </div>
          ))}
        </div>
        <Link href="/business/profile" className="btn-ghost hc-border mt-4 inline-flex !py-2 text-sm">Xem hồ sơ và khai báo của cơ sở →</Link>
      </section>

      {/* Danh sách dịch vụ */}
      <section className="mt-8" aria-labelledby="svc">
        <h2 id="svc" className="text-2xl">Dịch vụ demo ({items.length})</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {items.map((it) => (
            <div key={it.id} className="card hc-surface hc-border flex gap-4 p-4">
              <img src={it.image} alt={it.alt} className="h-24 w-28 rounded-xl object-cover" />
              <div className="flex-1">
                <p className="text-xs font-semibold uppercase text-ink-soft hc-muted">{catLabel(it.cat)}</p>
                <Link href={`/item?id=${it.id}`} className="text-lg font-semibold hover:text-accent-dark hover:underline">{it.name}</Link>
                <p className="hc-muted text-sm text-ink-soft"><span className="font-bold text-ink">{it.price}</span> · {it.level}</p>
                <div className="mt-2 flex gap-2">
                  <Link href={`/item?id=${encodeURIComponent(it.id)}`} className="btn-ghost hc-border !min-h-[36px] !py-1 text-xs">Xem dịch vụ</Link>
                  <Link href="/business/bookings" className="btn-ghost hc-border !min-h-[36px] !py-1 text-xs">Xem đơn đặt</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="hc-muted mt-3 text-sm text-ink-soft">Các thao tác chỉnh sửa, tạm ngừng dịch vụ chưa được triển khai; không hiển thị nút giả. Xử lý đơn đặt từ mục Đặt chỗ & Yêu cầu.</p>
      </section>
    </div>
  );
}
