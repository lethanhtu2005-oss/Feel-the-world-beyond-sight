"use client";

import { useState } from "react";
import Link from "next/link";
import PartnerEnter from "@/components/PartnerEnter";

const roles = [
  { id: "guide", title: "Hướng dẫn viên", icon: "♙", role: "guide", href: "/guide", detail: "Quản lý lịch đồng hành, tour và yêu cầu hỗ trợ của khách." },
  { id: "volunteer", title: "Tình nguyện viên", icon: "♡", role: "guide", href: "/volunteer", detail: "Tiếp nhận ca hỗ trợ thực địa và cập nhật rào cản." },
  { id: "business", title: "Doanh nghiệp", icon: "▤", role: "business", href: "/business", detail: "Quản lý dịch vụ, lịch đặt chỗ và điều kiện tiếp cận." },
];

export default function PartnerLoginPreview() {
  const [selected, setSelected] = useState("guide");
  const current = roles.find((entry) => entry.id === selected) || roles[0];

  return (
    <section aria-labelledby="partner-login-title" className="relative overflow-hidden rounded-[32px] border border-[#f0dbc3] bg-[#fffcf7] shadow-[0_24px_70px_rgba(63,38,15,.12)]">
      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(360px,460px)]">
        <div className="relative hidden min-h-[600px] flex-col justify-between overflow-hidden bg-[#f5dfb3] p-9 text-[#352016] lg:flex">
          <div className="absolute inset-0 bg-[url('/assets/images/we-photo-doi-song-pho-co.jpg')] bg-cover bg-center" role="img" aria-label="Khung cảnh phố cổ Hà Nội" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#24170c]/65 via-[#24170c]/10 to-[#24170c]/85" />
          <div className="relative z-10 max-w-sm rounded-2xl border border-white/30 bg-white/15 p-4 text-white backdrop-blur-sm">
            <span className="text-xs font-bold uppercase tracking-[.16em] text-[#ffe8ad]">WayEcho Partner Network</span>
            <h2 className="mt-3 text-4xl font-extrabold leading-tight">Một điểm kết nối. Ba nhóm đồng hành.</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/90">Hướng dẫn viên, tình nguyện viên và doanh nghiệp cùng xây dựng trải nghiệm du lịch tiếp cận.</p>
          </div>
          <div className="relative z-10 flex flex-wrap gap-2 text-xs font-semibold text-white">
            <span className="rounded-full border border-white/40 bg-black/30 px-3 py-2 backdrop-blur-sm">Hướng dẫn viên</span>
            <span className="rounded-full border border-white/40 bg-black/30 px-3 py-2 backdrop-blur-sm">Tình nguyện viên</span>
            <span className="rounded-full border border-white/40 bg-black/30 px-3 py-2 backdrop-blur-sm">Doanh nghiệp</span>
          </div>
        </div>
        <div className="px-5 py-8 sm:px-9 sm:py-10">
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F8AE38] text-3xl font-black text-[#352016] shadow-[0_8px_25px_rgba(248,174,56,.25)]" aria-hidden="true">W</div>
            <p className="mt-3 text-xl font-extrabold tracking-tight text-[#352016]">WayEcho</p>
            <h1 id="partner-login-title" className="mt-5 text-3xl font-extrabold tracking-tight text-[#352016]">Cổng đối tác liên thông</h1>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-[#705b4a]">Chọn vai trò để truy cập không gian làm việc phù hợp. Đây là phiên bản mô phỏng, không yêu cầu mật khẩu.</p>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-2" role="group" aria-label="Chọn vai trò đối tác">
            {roles.map((item) => (
              <button key={item.id} type="button" aria-pressed={selected === item.id} onClick={() => setSelected(item.id)}
                className={`flex min-h-[90px] flex-col items-center justify-center gap-2 rounded-2xl border px-1 py-3 text-center text-xs font-bold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a94c1c] ${selected === item.id ? "border-[#e2a02c] bg-[#ffe28b] text-[#352016] shadow-[0_8px_20px_rgba(248,174,56,.2)]" : "border-[#edddca] bg-white text-[#5e4839] hover:border-[#e2a02c] hover:bg-[#fff7e7]"}`}>
                <span aria-hidden="true" className="text-2xl leading-none">{item.icon}</span><span>{item.title}</span>
              </button>
            ))}
          </div>
          <p className="mt-4 min-h-[42px] rounded-xl bg-[#fff6e8] px-3 py-2 text-center text-xs leading-relaxed text-[#6c4b2f]" role="status">{current.detail}</p>
          <div className="mt-5 space-y-3" aria-label="Mẫu giao diện đăng nhập, không cần nhập thông tin">
            <div className="flex min-h-[48px] items-center gap-3 rounded-xl border border-[#e7d5c2] bg-[#f7f4ee] px-4 text-sm text-[#806f5e]" aria-disabled="true"><span aria-hidden="true">✉</span> Email hoặc số điện thoại <span className="ml-auto text-xs">Demo</span></div>
            <div className="flex min-h-[48px] items-center gap-3 rounded-xl border border-[#e7d5c2] bg-[#f7f4ee] px-4 text-sm text-[#806f5e]" aria-disabled="true"><span aria-hidden="true">♙</span> Mật khẩu <span className="ml-auto text-xs">Không cần nhập</span></div>
          </div>
          <p className="mt-3 text-xs text-[#75614e]">Không cần nhập email, số điện thoại hoặc mật khẩu trong bản demo.</p>
          <div className="mt-5 [&_button]:rounded-full [&_button]:bg-gradient-to-r [&_button]:from-[#F8AE38] [&_button]:to-[#e99513] [&_button]:text-[#352016] [&_button]:shadow-md">
            <PartnerEnter key={current.id} role={current.role} href={current.href} label={`Vào cổng ${current.title}`} color="#F8AE38" />
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-semibold">
            <Link href="/partners/cooperate" className="text-[#a14a17] underline underline-offset-4 hover:text-[#6d320c]">Đăng ký hợp tác</Link>
            <Link href="/help" className="text-[#705b4a] underline underline-offset-4">Cần hỗ trợ?</Link>
          </div>
          <div className="mt-6 border-t border-[#e9d9c5] pt-4 text-center text-xs leading-relaxed text-[#806e5b]">Ba vai trò truy cập từ cùng một cổng. Mỗi lựa chọn dẫn đến trang làm việc riêng đã có trong WayEcho.</div>
        </div>
      </div>
    </section>
  );
}
