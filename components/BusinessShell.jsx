"use client";
import {createContext,useContext,useEffect,useState} from "react";
import Link from "next/link";
import BusinessNav from "./BusinessNav";
import {getBusiness} from "@/data/businesses";
const BusinessContext=createContext(null);
export function useBusiness(){const v=useContext(BusinessContext);if(!v)throw Error("Thiếu phạm vi doanh nghiệp.");return v;}
export default function BusinessShell({children}){const [user,setUser]=useState(null),[error,setError]=useState("");
useEffect(()=>{fetch("/api/auth/session",{cache:"no-store"}).then(async r=>{const d=await r.json();if(!r.ok||d.role!=="business")throw Error("Cần vào từ Cổng Đối Tác Liên Thông.");if(!getBusiness(d.businessId))throw Error("Không tìm thấy cơ sở cho tài khoản này.");return d;}).then(setUser).catch(e=>setError(e.message));},[]);
if(error)return <div className="container-page py-10" role="alert">{error} <Link href="/partner" className="underline">Quay lại Cổng đối tác</Link></div>;
if(!user)return <p role="status" className="container-page py-10">Đang mở không gian làm việc doanh nghiệp…</p>;
return <BusinessContext.Provider value={user}><div className="min-h-screen bg-[#fffaf3]"><BusinessNav/><div className="md:pl-[246px]"><p role="note" className="bg-[#fff1c9] px-5 py-2 text-center text-xs font-medium text-[#724b18]">Bản DEMO · Đơn và thông tin vận hành được lưu tạm, có thể mất khi môi trường chạy lại. Chưa có thanh toán thật.</p>{children}</div></div></BusinessContext.Provider>;
}