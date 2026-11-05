"use client";
import Link from "next/link";
import {usePathname} from "next/navigation";
import Logo from "./Logo";
import SOSLink from "./SOSLink";
import {useBusiness} from "./BusinessShell";
import {getBusiness} from "@/data/businesses";
const pages=[
["/business","⌂","Tổng quan"],["/business/bookings","▣","Đặt chỗ & Yêu cầu"],
["/business/services","♧","Quản lý dịch vụ"],["/business/rooms","▤","Quản lý phòng"],
["/business/reviews","☆","Đánh giá & Phản hồi"],["/business/profile","♙","Hồ sơ cơ sở"],
["/business/reports","▥","Thống kê & Báo cáo"],["/business/settings","⚙","Cài đặt"]];
export default function BusinessNav(){const {businessId}=useBusiness(); const path=usePathname();const biz=getBusiness(businessId); const visiblePages=pages.filter(([href])=>href!=="/business/rooms" || biz?.type==="Lưu trú");
return <><div className="sticky top-0 z-30 flex min-h-[76px] flex-wrap items-center justify-between gap-3 border-b border-[#f2e1cb] bg-white/95 px-4 py-3 shadow-sm backdrop-blur md:px-8">
<div className="flex items-center gap-4"><Logo height={32}/><span className="hidden h-9 w-px bg-[#ead9c4] sm:block"/><img src={biz?.logo} alt="Ảnh minh họa cơ sở" className="h-11 w-11 rounded-full object-cover"/><div><p className="text-xs text-[#8b765d]">Cổng doanh nghiệp · Bản DEMO</p><p className="text-sm font-extrabold text-[#3e2418]">{biz?.name}</p></div></div>
<div className="flex flex-wrap items-center gap-2"><SOSLink/><Link href="/partner" className="rounded-full border border-[#dec9b0] px-4 py-2 text-sm font-bold hover:bg-[#fff2db]">↔ Cổng Đối Tác Liên Thông</Link><Link href="/" className="rounded-full border border-[#dec9b0] px-4 py-2 text-sm font-semibold hover:bg-[#fff2db]">Trang khách hàng</Link></div></div>
<nav aria-label="Menu cổng doanh nghiệp" className="border-b border-[#f1e3d2] bg-[#fff9ee] px-4 py-3 md:hidden"><div className="flex gap-2 overflow-x-auto">{visiblePages.map(([href,icon,label])=><Link key={href} href={href} aria-current={path===href?'page':undefined} className={`shrink-0 rounded-xl px-3 py-2 text-sm font-semibold ${path===href?'bg-[#ffcb5b]':'bg-white'}`}>{icon} {label}</Link>)}</div></nav>
<aside className="fixed bottom-0 left-0 top-[76px] z-20 hidden w-[246px] overflow-y-auto border-r border-[#f1e3d2] bg-[#fffaf3] p-4 md:block" aria-label="Điều hướng doanh nghiệp"><div className="space-y-2">{visiblePages.map(([href,icon,label])=><Link key={href} href={href} aria-current={path===href?'page':undefined} className={`flex min-h-12 items-center gap-3 rounded-2xl px-4 text-sm font-bold transition-colors ${path===href?'bg-[#ffdc80] text-[#44240d] shadow-sm':'text-[#413831] hover:bg-[#fff0d5]'}`}><span className="text-xl" aria-hidden="true">{icon}</span>{label}</Link>)}</div><div className="mt-8 rounded-2xl bg-[#ffefd0] p-4 text-xs leading-relaxed text-[#805c31]"><strong className="block text-sm">WayEcho · DEMO</strong>Dữ liệu vận hành minh họa. Tiện ích tiếp cận chỉ được xác minh khi có bằng chứng.</div></aside></>;
}