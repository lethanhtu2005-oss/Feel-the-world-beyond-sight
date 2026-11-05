"use client";
import {usePathname} from "next/navigation";
import Link from "next/link";
import SOSLink from "@/components/SOSLink";
import Logo from "@/components/Logo";
import {endGuideSession} from "@/lib/guideSession";
import "@/components/guide-portal.css";
const nav=[[/^\/guide$/, "▦", "Tổng quan", "/guide"],[/^\/guide\/bookings/, "▣", "Booking & Chuyến đi", "/guide/bookings"],[/^\/guide\/schedule/, "▤", "Lịch hỗ trợ", "/guide/schedule"],[/^\/guide\/support/, "◎", "Yêu cầu hỗ trợ", "/guide/support"],[/^\/guide\/reviews/, "☆", "Đánh giá & Phản hồi", "/guide/reviews"],[/^\/guide\/profile/, "♙", "Hồ sơ hướng dẫn viên", "/guide/profile"],[/^\/guide\/escrow/, "⬡", "Escrow & Ký quỹ", "/guide/escrow"],[/^\/guide\/analytics/, "▥", "Thống kê hoạt động", "/guide/analytics"],[/^\/guide\/settings/, "⚙", "Cài đặt", "/guide/settings"]];
export default function GuideShell({children}){
 const path=usePathname();if(path==="/guide/login"||path==="/guide/register")return children;
 return <div className="wg-root"><div className="wg-demo">BẢN DEMO · Lịch, đánh giá, chứng chỉ và số liệu minh họa; Escrow chỉ mô phỏng, không có tiền thật.</div><header className="wg-top"><Link href="/guide" aria-label="WayEcho - tổng quan HDV"><Logo height={36}/></Link><span className="wg-portal">Cổng Hướng dẫn viên</span><div className="wg-top-right"><Link className="wg-top-link" href="/partner">↔ Cổng Đối tác Liên thông</Link><SOSLink/><Link className="wg-top-link" href="/guide/notifications" aria-label="Thông báo">♧</Link><Link className="wg-account" href="/guide/profile"><span>L</span><strong>Lê Thanh Tú</strong></Link></div></header><div className="wg-layout"><aside className="wg-sidebar" aria-label="Menu cổng hướng dẫn viên"><nav>{nav.map(([pattern,icon,label,url])=><Link key={url} href={url} aria-current={pattern.test(path)?"page":undefined} className={pattern.test(path)?"wg-nav-active":""}><span aria-hidden="true">{icon}</span>{label}</Link>)}</nav><button type="button" className="wg-btn wg-logout" onClick={async()=>{try{await endGuideSession();window.location.assign("/partner")}catch{window.alert("Không đăng xuất được, hãy thử lại.")}}}>Đăng xuất khỏi cổng HDV</button><div className="wg-side-visual" aria-hidden="true">✦<br/>HÀ NỘI<br/>✦</div></aside><div className="wg-workarea">{children}</div></div></div>;
}
