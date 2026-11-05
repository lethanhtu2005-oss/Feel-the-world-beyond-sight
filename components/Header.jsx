"use client";

import {useEffect, useRef, useState} from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {isInternalPortalPath} from "@/lib/portalRoutes";
import {useA11y} from "./A11yProvider";
import Logo from "./Logo";
import {AccessibleIcon, ContrastIcon, TextSizeIcon, SpeakerIcon, UserIcon, MenuIcon} from "./Icons";

const NAV = [
  {label:"Khám phá",href:"/destination",links:[["Khám phá điểm đến","/destination"],["Bản đồ du lịch","/navigation"]]},
  {label:"Dịch vụ",href:"/explore",links:[["Xem các dịch vụ","/explore"],["Điểm đến","/explore?cat=destination"],["Lưu trú","/explore?cat=accommodation"],["Ẩm thực","/explore?cat=restaurant"],["Di chuyển","/explore?cat=transport"],["Guide đồng hành","/services/guides"],["Vé tham quan","/explore?cat=ticket"],["Tour & Trải nghiệm","/explore?cat=activity"],["Đặt dịch vụ","/booking"]]},
  {label:"Blog & Trải nghiệm",href:"/articles",links:[["Cẩm nang du lịch","/articles?muc=cam-nang"],["Du lịch tiếp cận","/articles?muc=du-lich-tiep-can"],["Gợi ý hành trình","/articles?muc=goi-y-hanh-trinh"],["Câu chuyện trải nghiệm","/articles?muc=cau-chuyen"],["Mẹo du lịch","/articles?muc=meo-du-lich"]]},
  {label:"Hỗ trợ",href:"/help",links:[["Hồ sơ tiếp cận","/profile"],["Hướng dẫn tương tác","/onboarding"],["Hướng dẫn sử dụng","/help"],["Liên hệ hỗ trợ","/help#contact"],["SOS – hỗ trợ khẩn cấp","/sos"]]},
];

const ACCOUNT_LINKS = [
  ["Hồ sơ cá nhân","/profile","Thông tin tài khoản, thông tin liên hệ"],
  ["Đặt chỗ của tôi","/my-booking","Các đơn đặt tour, vé, lưu trú, xe, hướng dẫn viên"],
  ["Chuyến đi của tôi","/my-trip","Lịch trình đã tạo, địa điểm đã lưu, các điểm dừng"],
  ["Cài đặt tài khoản","/settings","Thông tin đăng nhập và tùy chọn cá nhân"],
];
const ROLE_HOME = {traveler:"/profile",guide:"/guide",business:"/business",advisor:"/admin/consultation"};
const menuLink = "flex min-h-11 items-center rounded-xl px-3 py-2.5 text-sm font-semibold text-[#452a1d] transition-colors hover:bg-[#fff0df] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a94c1c]";

function Chevron() {
  return <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>;
}
function BellIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Z"/><path d="M10 21h4"/></svg>;
}

export default function Header() {
  const pathname = usePathname();
  const {contrast,largeText,toggleContrast,toggleLargeText,speak,stop} = useA11y();
  const [menu,setMenu] = useState(null);
  const [mobile,setMobile] = useState(false);
  const [access,setAccess] = useState(false);
  const [account,setAccount] = useState(false);
  const [session,setSession] = useState(null);
  const [sessionLoading,setSessionLoading] = useState(false);
  const [logoutBusy,setLogoutBusy] = useState(false);
  const [accountError,setAccountError] = useState("");
  const root = useRef(null);
  const userButtonRef = useRef(null);

  useEffect(() => {
    function outside(event) {
      if (root.current && !root.current.contains(event.target)) {
        setMenu(null);setAccess(false);setAccount(false);
      }
    }
    function key(event) {
      if (event.key === "Escape") {
        setMenu(null);setMobile(false);setAccess(false);
        setAccount(previous => {if (previous) userButtonRef.current?.focus(); return false;});
      }
    }
    document.addEventListener("pointerdown",outside);
    document.addEventListener("keydown",key);
    return () => {document.removeEventListener("pointerdown",outside);document.removeEventListener("keydown",key);};
  }, []);

  useEffect(() => {
    if (!account) return;
    let cancelled = false;
    setSessionLoading(true);
    setAccountError("");
    fetch("/api/auth/session",{cache:"no-store"})
      .then(async response => response.ok ? response.json() : null)
      .then(data => {if (!cancelled) setSession(data);})
      .catch(() => {if (!cancelled) {setSession(null);setAccountError("Không kiểm tra được phiên. Có thể chọn đăng nhập lại.");}})
      .finally(() => {if (!cancelled) setSessionLoading(false);});
    return () => {cancelled = true;};
  }, [account]);

  if (isInternalPortalPath(pathname)) return null;
  const close = () => {setMenu(null);setMobile(false);setAccess(false);setAccount(false);};
  const authenticated = Boolean(session && !session.guest);

  async function logoutAccount() {
    setLogoutBusy(true);setAccountError("");
    try {
      const response = await fetch("/api/auth/logout",{method:"POST"});
      if (!response.ok) throw new Error("Chưa đăng xuất được. Vui lòng thử lại.");
      window.location.assign("/");
    } catch (error) {setAccountError(error.message || "Đăng xuất không thành công.");setLogoutBusy(false);}
  }

  const nav = <ul className="flex flex-col gap-1 xl:flex-row xl:items-center">
    {NAV.map((item,i) => <li key={item.label} className="relative">
      <button type="button" aria-expanded={menu===i} aria-controls={`we-menu-${i}`}
        onClick={() => {setMenu(menu===i?null:i);setAccess(false);setAccount(false);}}
        className={`we-nav-trigger flex min-h-11 w-full items-center justify-between gap-2 rounded-xl px-3 font-semibold hover:bg-[#fff1e1] focus-visible:outline-2 focus-visible:outline-orange-500 ${menu===i?"bg-[#ffeed9] text-[#ad481a]":""}`}>
        {item.label}<Chevron/>
      </button>
      {menu===i && <div id={`we-menu-${i}`} className="we-dropdown relative z-50 mt-1 min-w-[245px] rounded-2xl border border-[#e8dfd3] bg-white p-2 shadow-xl xl:absolute xl:left-0 xl:top-full xl:mt-2">
        {item.label !== "Đối tác" && item.label !== "Dịch vụ" && item.label !== "Khám phá" && <Link href={item.href} onClick={close} className="block rounded-xl px-4 py-3 font-bold hover:bg-[#fff3e3]">{item.label==="Blog & Trải nghiệm"?"Xem Blog & Trải nghiệm":"Xem tất cả"}</Link>}
        {item.links.map(([name,href]) => <Link key={name} href={href} onClick={close} className="block rounded-xl px-4 py-3 text-sm hover:bg-[#fff3e3] focus-visible:outline-2 focus-visible:outline-orange-500">{name}</Link>)}
      </div>}
    </li>)}
  </ul>;

  return <header ref={root} className="sticky top-0 z-40 border-b border-[#eedecb]/80 bg-white/85 backdrop-blur-xl shadow-[0_4px_24px_rgba(53,32,22,0.04)] hc-surface hc-border">
    <div className="container-page flex min-h-[74px] items-center justify-between gap-2 py-2">
      <Link href="/" onClick={close} aria-label="WayEcho – trang chủ" className="shrink-0 transition-transform hover:scale-[1.02]"><Logo height={31}/></Link>
      <nav aria-label="Điều hướng chính" className="hidden xl:block">{nav}</nav>
      <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
        <div className="relative">
          <button type="button" aria-label="Mở cài đặt trợ năng" title="Trợ năng" aria-expanded={access} aria-controls="we-access" onClick={() => {setAccess(!access);setMenu(null);setAccount(false);}}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#eaa13c] bg-[#F8AE38] text-[#171717] shadow-sm transition-all hover:bg-[#E09F2F] hover:shadow-md hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9b4018] hc-border">
            <AccessibleIcon size={21}/>
          </button>
          {access && <div id="we-access" className="glass-liquid-warm absolute right-0 top-full z-50 mt-2 w-[min(320px,90vw)] rounded-2xl border border-[#eedecb] p-4 shadow-[0_16px_40px_rgba(53,32,22,0.14)] hc-surface hc-border">
            <h2 className="mb-3 font-bold text-[#352016]">Hỗ trợ tiếp cận</h2>
            <button type="button" onClick={toggleContrast} aria-pressed={contrast} className="we-menu-action"><ContrastIcon size={18}/> Tương phản cao: {contrast?"Bật":"Tắt"}</button>
            <button type="button" onClick={toggleLargeText} aria-pressed={largeText} className="we-menu-action"><TextSizeIcon size={18}/> Chữ lớn: {largeText?"Bật":"Tắt"}</button>
            <button type="button" onClick={() => speak(document.getElementById("main")?.innerText?.slice(0,900)||"Không có nội dung")} className="we-menu-action"><SpeakerIcon size={18}/> Nghe nội dung trang</button>
            <button type="button" onClick={stop} className="we-menu-action">Dừng đọc</button>
          </div>}
        </div>
        {/* Thứ tự: Trợ năng -> Chuông thông báo -> Tài khoản khách hàng. */}
        <Link href="/notifications" onClick={close} aria-label="Xem thông báo" title="Thông báo"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[#eedecb] bg-white/90 text-[#54260e] shadow-sm transition-all hover:bg-[#fff1df] hover:shadow-md hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b94f1e] hc-border">
          <BellIcon/>
        </Link>
        <div className="relative">
          <button ref={userButtonRef} type="button" aria-label="Tài khoản của tôi" aria-haspopup="true" aria-expanded={account} aria-controls="we-account-dropdown"
            onClick={() => {setAccount(!account);setMenu(null);setAccess(false);}}
            className={`flex h-11 items-center gap-1 rounded-full border px-2.5 transition-all shadow-sm hover:bg-[#fff1df] hover:shadow-md hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b94f1e] hc-border ${account?"border-[#d97930] bg-[#fff1df]":"border-[#eedecb] bg-white/90"}`}>
            <UserIcon size={22}/><Chevron/>
          </button>
          {account && <div id="we-account-dropdown" aria-label="Tài khoản của tôi" className="glass-liquid-warm we-dropdown absolute right-0 top-full z-50 mt-2 w-[min(300px,calc(100vw-24px))] rounded-[22px] border border-[#ead7c7] p-2.5 shadow-[0_18px_48px_rgba(65,33,17,.16)] hc-surface hc-border">
            <div className="mb-1 rounded-xl bg-[#fff3e7] px-3 py-3 text-[#492c1e] border border-[#f0dfd0]">
              <p className="text-sm font-bold">{"Tài khoản của tôi"}</p>
              <p className="mt-1 text-xs text-[#70564a]">{authenticated?"Bạn đang đăng nhập vào WayEcho.":"Đăng nhập để quản lý chuyến đi và đặt chỗ của bạn."}</p>
            </div>
            {sessionLoading ? <p role="status" className="px-3 py-3 text-sm">Đang tải thông tin tài khoản…</p> : <>
              {!authenticated && <><Link href="/login" onClick={close} className={`${menuLink} bg-[#fff0df]`}>Đăng nhập khách hàng</Link><div className="my-1 border-t border-[#f0dfd0]"/></>}
              {authenticated && session.role!=="traveler" && ROLE_HOME[session.role] && <Link href={ROLE_HOME[session.role]} onClick={close} className={menuLink}>Vào bảng điều khiển</Link>}
              {ACCOUNT_LINKS.map(([label,href,desc]) => <Link key={href} href={href} onClick={close} className={`${menuLink} !block`}><span className="block font-semibold">{label}</span><span className="block text-xs font-normal text-[#70564a]">{desc}</span></Link>)}
              {authenticated && <><div className="my-1 border-t border-[#f0dfd0]"/>
              <button type="button" disabled={logoutBusy} onClick={logoutAccount} className={`${menuLink} !block w-full text-left text-[#a13d1c] disabled:opacity-60`}><span className="block font-semibold">{logoutBusy?"Đang đăng xuất…":"Đăng xuất"}</span><span className="block text-xs font-normal">Kết thúc phiên đăng nhập</span></button></>}
            </>}
            {accountError && <p role="alert" className="m-2 rounded-lg bg-red-50 p-2 text-sm text-red-800">{accountError}</p>}
          </div>}
        </div>
        <button type="button" aria-expanded={mobile} aria-controls="we-mobile-nav" onClick={() => {setMobile(!mobile);setAccount(false);setAccess(false);}}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line xl:hidden" aria-label={mobile?"Đóng menu":"Mở menu"}><MenuIcon size={22}/></button>
      </div>
    </div>
    {mobile && <nav id="we-mobile-nav" className="max-h-[75dvh] overflow-y-auto border-t border-line bg-white px-5 py-3 xl:hidden">{nav}</nav>}
  </header>;
}
