"use client";

import { useEffect, useState } from "react";
import PartnerEnter from "@/components/PartnerEnter";
import { businesses } from "@/data/businesses";

export default function PartnerRoleCards({ roles }) {
  const [activeId, setActiveId] = useState(null);
  const [demoBusinessId, setDemoBusinessId] = useState("b1");
  const current = roles.find((role) => role.id === activeId);
  useEffect(() => {
    if (!current) return;
    function onKeyDown(event) { if (event.key === "Escape") setActiveId(null); }
    document.addEventListener("keydown", onKeyDown);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKeyDown); document.body.style.overflow = previous; };
  }, [current]);

  return <>
    <div className="grid gap-5 lg:grid-cols-3">
      {roles.map((role) => <article key={role.id} className="group relative flex flex-col overflow-hidden rounded-[26px] border border-[#ead8c4] bg-white shadow-[0_8px_32px_rgba(70,45,18,.07)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_16px_45px_rgba(70,45,18,.12)]">
        <div className="h-2" style={{ backgroundColor: role.color }} />
        <div className="flex flex-1 flex-col px-6 pb-6 pt-6">
          <div className="flex items-center justify-between gap-3">
            <span aria-hidden="true" className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fff5df] text-3xl">{role.icon}</span>
            <span className="rounded-full border border-[#ead8c4] bg-[#fffaf3] px-3 py-1.5 text-xs font-bold text-[#785331]">{role.badge}</span>
          </div>
          <h3 className="mt-5 min-h-[68px] text-[23px] font-extrabold leading-tight text-[#362012]">{role.title}</h3>
          <p className="mt-3 text-sm leading-7 text-[#634b3a]">{role.desc}</p>
          <div className="mt-6 flex-1 rounded-[20px] border border-[#f2e6d4] bg-[#fffbf5] p-4">
            <h4 className="text-xs font-extrabold uppercase tracking-wide text-[#9c5708]">Tính năng nổi bật</h4>
            <ul className="mt-3 space-y-3 text-[13px] leading-5 text-[#44372c]">
              {role.features.map((feature) => <li key={feature} className="flex items-start gap-2.5"><span aria-hidden="true" className="font-bold text-[#0b8e78]">✓</span><span>{feature}</span></li>)}
            </ul>
          </div>
          <button type="button" onClick={() => setActiveId(role.id)} className="mt-6 flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-extrabold text-[#211507] shadow-[0_5px_13px_rgba(100,60,0,.12)] transition hover:brightness-95 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#352016]" style={{ backgroundColor: role.color, color: role.id === "business" ? "#ffffff" : "#211507" }} aria-haspopup="dialog">
            {role.primaryAction.label}<span aria-hidden="true">→</span>
          </button>
        </div>
      </article>)}
    </div>
    {current && <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#23150b]/65 px-4 py-8 backdrop-blur-[4px]" onMouseDown={(event) => { if (event.target === event.currentTarget) setActiveId(null); }}>
      <section role="dialog" aria-modal="true" aria-labelledby="partner-dialog-title" className="relative w-full max-w-[480px] overflow-hidden rounded-[30px] border border-[#f3dfc4] bg-white shadow-[0_32px_100px_rgba(26,16,7,.3)]">
        <div className="relative h-32 overflow-hidden bg-[#fbe6b9] bg-[url('/assets/images/we-photo-doi-song-pho-co.jpg')] bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-r from-[#372015]/85 via-[#372015]/35 to-transparent" />
          <div className="absolute bottom-5 left-7 text-white"><span className="text-xs font-bold uppercase tracking-[.12em] text-[#ffe6ad]">WayEcho · Cổng đối tác liên thông</span><p className="mt-1 text-xl font-extrabold">Truy cập không gian làm việc</p></div>
          <button type="button" onClick={() => setActiveId(null)} aria-label="Đóng cửa sổ" className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-2xl text-[#352016] shadow hover:bg-[#fff2dc]">×</button>
        </div>
        <div className="px-7 pb-8 pt-7">
          <div className="flex items-center gap-3 rounded-2xl border border-[#eedbc0] bg-[#fff9ee] p-4"><span className="text-3xl" aria-hidden="true">{current.icon}</span><div><p className="text-xs font-bold text-[#9e6413]">Cổng đã chọn</p><h2 id="partner-dialog-title" className="text-lg font-extrabold text-[#352016]">{current.title}</h2></div></div>
          <p className="mt-5 text-sm leading-6 text-[#695243]">Bạn sẽ được chuyển vào đúng không gian làm việc của nhóm này. Đây là <strong>bản đăng nhập mô phỏng</strong>, không yêu cầu tài khoản hoặc mật khẩu.</p>
          <div className="mt-5 space-y-3" aria-label="Minh họa giao diện đăng nhập">
            <div className="flex min-h-[48px] items-center gap-3 rounded-xl border border-[#eadbca] bg-[#faf8f5] px-4 text-sm text-[#897566]" aria-disabled="true"><span aria-hidden="true">✉</span><span>Email hoặc số điện thoại</span><span className="ml-auto text-xs">Demo</span></div>
            <div className="flex min-h-[48px] items-center gap-3 rounded-xl border border-[#eadbca] bg-[#faf8f5] px-4 text-sm text-[#897566]" aria-disabled="true"><span aria-hidden="true">🔒</span><span>Mật khẩu</span><span className="ml-auto text-xs">Không cần nhập</span></div>
          </div>
          {current.role === "business" && <div className="mt-5">
            <label htmlFor="demo-service-receiver" className="mb-2 block text-sm font-semibold text-[#50341d]">Chọn dịch vụ muốn kiểm tra đơn (DEMO)</label>
            <select id="demo-service-receiver" value={demoBusinessId} onChange={e=>setDemoBusinessId(e.target.value)} className="min-h-[48px] w-full rounded-xl border border-[#dfc9a5] bg-white px-3 text-sm text-[#422c16]">
              <option value="b1">Cơ sở lưu trú mẫu · La Siesta (DEMO)</option>
              {businesses.filter(b=>b.isDemo).map(b=><option key={b.id} value={b.id}>{b.type} · {b.name.replace("Điểm tiếp nhận DEMO · ", "")}</option>)}
            </select>
            <p className="mt-2 text-xs text-[#795e47]">Đây là hộp thư xử lý đơn thử nghiệm, không phải tài khoản của doanh nghiệp thật.</p>
          </div>}
          <div className="mt-6"><PartnerEnter role={current.role} href={current.primaryAction.href} label="Truy cập bản demo →" color="#F8AE38" demoBusinessId={current.role === "business" ? demoBusinessId : null} /></div>
          <button type="button" onClick={() => setActiveId(null)} className="mt-3 w-full rounded-xl py-2 text-sm font-semibold text-[#795e47] hover:underline">Quay lại xem giới thiệu</button>
        </div>
      </section>
    </div>}
  </>;
}
