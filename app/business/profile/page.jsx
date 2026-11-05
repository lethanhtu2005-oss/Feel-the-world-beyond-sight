"use client";
import {useBusiness} from "@/components/BusinessShell";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useA11y } from "@/components/A11yProvider";
import { getBusiness } from "@/data/businesses";
import { UserIcon, MapPinIcon, CheckIcon } from "@/components/Icons";

export default function BusinessProfile() {
  const {businessId}=useBusiness();
  const biz = getBusiness(businessId);
  const { speak } = useA11y();
  const [form, setForm] = useState({ name: biz.name, type: biz.type, area: biz.area, address: "", phone: "", hours: "", desc: "" });
  const [full, setFull] = useState(null);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    let live = true;
    api.getBusinessProfile().then((r) => { if (live) { setFull(r.profile); setForm({ name: r.profile.name, type: r.profile.type, area: r.profile.area, address: r.profile.address, phone: r.profile.phone, hours: r.profile.hours, desc: r.profile.desc }); } }).catch((e) => live && setError(e.message));
    return () => { live = false; };
  }, [businessId]);

  function set(k, v) { setForm((f) => ({ ...f, [k]: v })); setSaved(false); }
  async function submit(e) {
    e.preventDefault(); setBusy(true); setError("");
    try { const r = await api.saveBusinessProfile({ ...(full || {}), ...form }); setFull(r.profile); setSaved(true); speak("Đã lưu hồ sơ doanh nghiệp lên hệ thống."); }
    catch (err) { setError(err.message || "Chưa lưu được hồ sơ."); } finally { setBusy(false); }
  }

  const renderField = (label, k, type = "text") => (
    <div>
      <label htmlFor={k} className="mb-1 block font-semibold">{label}</label>
      <input id={k} type={type} value={form[k]} onChange={(e) => set(k, e.target.value)} className="w-full rounded-pill border border-line bg-white px-5 py-3 text-lg outline-none hc-surface hc-border" />
    </div>
  );

  return (
    <div className="mx-auto max-w-[1500px] px-4 py-8 lg:px-8">
      <h1 className="text-4xl sm:text-5xl">Hồ sơ doanh nghiệp</h1>
      <p className="hc-muted mt-2 text-lg text-ink-soft">Chỉnh sửa tại đây sẽ được lưu lên hệ thống và hiển thị ở Tổng quan. Tiện ích tiếp cận chỉnh ở tab “Hồ sơ đơn vị” của Tổng quan. Dữ liệu DEMO, chưa được WayEcho xác minh.</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <form onSubmit={submit} className="space-y-4 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2">
            {renderField("Tên đơn vị tiếp nhận", "name")}
            {renderField("Loại hình", "type")}
            {renderField("Khu vực", "area")}
            {renderField("Địa chỉ", "address")}
            {renderField("Điện thoại", "phone")}
            {renderField("Thời gian phục vụ", "hours")}
          </div>
          <div>
            <label htmlFor="desc" className="mb-1 block font-semibold">Mô tả</label>
            <textarea id="desc" rows={4} value={form.desc} onChange={(e) => set("desc", e.target.value)} className="w-full rounded-2xl border border-line bg-white px-5 py-3 text-lg outline-none hc-surface hc-border" />
          </div>
          {error && <p role="alert" className="rounded-xl border border-red-300 bg-red-50 p-3 text-red-800">{error}</p>}
          {saved && <p role="status" className="rounded-xl border border-green-300 bg-green-50 p-3 font-semibold text-green-900">Đã lưu hồ sơ (DEMO).</p>}
          <button type="submit" disabled={busy} className="btn-primary text-lg disabled:opacity-60"><CheckIcon size={22} /> {busy ? "Đang lưu…" : "Lưu hồ sơ"}</button>
        </form>

        <aside className="h-fit rounded-[18px] border border-line bg-white p-6 shadow-card hc-surface hc-border" aria-label="Xem trước">
          <p className="text-sm font-semibold text-ink-soft hc-muted">Xem trước hồ sơ</p>
          <img src={biz.logo} alt={`Ảnh minh họa cho ${biz.name}`} className="mt-3 h-28 w-full rounded-xl object-cover" />
          <p className="mt-3 flex items-center gap-2 text-xl font-semibold"><UserIcon size={20} /> {form.name}</p>
          <p className="hc-muted flex items-center gap-1 text-ink-soft"><MapPinIcon size={15} /> {form.area} · {form.type}</p>
          {biz.verified && <span className="chip mt-2 bg-green-100 text-green-900">✓ Đã xác minh</span>}
          <p className="hc-muted mt-3 text-sm text-ink-soft">{form.desc}</p>
        </aside>
      </div>
    </div>
  );
}
