"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect,useState } from "react";
import SOSLink from "@/components/SOSLink";
import LogoutButton from "@/components/LogoutButton";
const GROUPS=[
 {name:"Tổng quan",href:"/admin",icon:"⌂",children:[]},
 {name:"Điều phối & Hỗ trợ",href:"/admin/dispatch",icon:"✥",children:[{href:"/admin/consultation",name:"Trung tâm tư vấn"}]},
 {name:"Người dùng",href:"/admin/users",icon:"♙",children:[]},
 {name:"Đối tác & Dịch vụ",href:"/admin/businesses",icon:"▣",children:[{href:"/admin/inquiries",name:"Yêu cầu hợp tác"}]},
 {name:"Nội dung & Bản đồ",href:"/admin/content",icon:"▤",children:[{href:"/admin/moderation",name:"Đánh giá & Phản hồi"}]},
 {name:"Vận hành hệ thống",href:"/admin/operations",icon:"▥",children:[{href:"/admin/escrow",name:"Ký quỹ Escrow"},{href:"/admin/ride-demo",name:"Theo dõi xe DEMO"}]},
 {name:"Báo cáo & Thống kê",href:"/admin/reports",icon:"▥",children:[]},
 {name:"Cấu hình & Phân quyền",href:"/admin/settings",icon:"⚙",children:[]}
];
export default function AdminNav(){
 const path=usePathname(),[role,setRole]=useState(null);
 useEffect(()=>{fetch("/api/auth/session",{cache:"no-store"}).then(r=>r.ok?r.json():null).then(u=>setRole(u?.role||null)).catch(()=>setRole(null));},[]);
 const groups=role==="advisor"?[{name:"Trung tâm tư vấn",href:"/admin/consultation",icon:"◉",children:[]}]:GROUPS;
 return <aside className="waye-admin-nav" aria-label="Điều hướng quản trị WayEcho"><div className="waye-admin-navinner">
  <Link href={role==="advisor"?"/admin/consultation":"/admin"} className="waye-admin-logo" aria-label="WayEcho - Cổng quản trị"><img src="/assets/brand/logo.png" alt="" /><span className="waye-admin-wordmark">Way<span>Echo</span></span></Link>
  <p className="waye-admin-caption">CỔNG QUẢN TRỊ HỆ THỐNG · DEMO</p>
  <nav className="waye-admin-menu">{groups.map(g=>{const active=path===g.href||g.children.some(c=>path===c.href);return <div key={g.href} className="waye-admin-group"><Link href={g.href} className={'waye-admin-item '+(active?'selected':'')} aria-current={path===g.href?'page':undefined}><span aria-hidden="true" className="waye-admin-icon">{g.icon}</span><span>{g.name}</span></Link>{active&&g.children.length>0&&<div className="waye-admin-subnav">{g.children.map(c=><Link className={path===c.href?'current':''} key={c.href} href={c.href}>{c.name}</Link>)}</div>}</div>})}</nav>
  <div className="waye-admin-navbottom"><SOSLink/><Link href="/internal/login">Chuyển tài khoản nhân viên</Link><Link href="/partner">Cổng đối tác liên thông</Link><LogoutButton/></div>
 </div></aside>
}
