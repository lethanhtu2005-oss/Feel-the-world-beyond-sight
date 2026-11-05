"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {isInternalPortalPath} from "@/lib/portalRoutes";
import { CompassIcon, GridIcon, CalendarIcon, PhoneIcon, UserIcon } from "./Icons";

const ITEMS = [
  { href: "/", label: "Trang chủ", icon: CompassIcon },
  { href: "/explore", label: "Dịch vụ", icon: GridIcon },
  { href: "/my-booking", label: "Đặt chỗ", icon: CalendarIcon },
  { action: "help", label: "Hỗ trợ", icon: PhoneIcon },
  { href: "/profile", label: "Tài khoản", icon: UserIcon },
];

export default function MobileNav() {
  const pathname = usePathname();
  if (isInternalPortalPath(pathname)) return null;
  return (
    <nav aria-label="Điều hướng ứng dụng trên điện thoại" className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-2 pb-[max(8px,env(safe-area-inset-bottom))] pt-2 backdrop-blur md:hidden hc-surface hc-border">
      <ul className="grid grid-cols-5 gap-1">
        {ITEMS.map((item) => {
          const active = item.href ? (item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)) : false;
          const Icon = item.icon;
          return (
            <li key={item.href || item.action}>
              {item.action === "help" ? (
                <>
                <button type="button" onClick={() => window.dispatchEvent(new CustomEvent("wayecho:open-ai-panel"))}
                  className="flex w-full min-h-[52px] flex-col items-center justify-center gap-1 rounded-xl px-1 text-[11px] font-bold text-ink-soft"
                  aria-label="Mở hỗ trợ AI Camera hoặc tư vấn viên">
                  <Icon size={20} /><span>{item.label}</span>
                </button>
                <Link href="/sos" className="sr-only focus:not-sr-only focus:fixed focus:bottom-24 focus:right-3 focus:z-[120] focus:rounded-full focus:bg-red-700 focus:px-4 focus:py-3 focus:text-white">SOS khẩn cấp</Link>
                </>
              ) : <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`flex min-h-[52px] flex-col items-center justify-center gap-1 rounded-xl px-1 text-[11px] font-bold ${
                  item.danger ? "text-red-700" : active ? "bg-surface-alt text-ink" : "text-ink-soft hc-muted"
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
