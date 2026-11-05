"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
function Notice(){
  const search=useSearchParams();
  if(search.get("booking")!=="1") return null;
  return <div role="status" className="mt-5 rounded-2xl border border-[#ebbd70] bg-[#fff5dd] p-4 text-[#55351f]">
    <p className="font-bold">Vui lòng đăng nhập để đặt dịch vụ</p>
    <p className="mt-1 text-sm">Bạn có thể khám phá dịch vụ mà không cần tài khoản. Sau khi đăng nhập, WayEcho sẽ đưa bạn trở lại dịch vụ vừa chọn để tiếp tục đặt chỗ.</p>
  </div>;
}
export default function BookingLoginNotice(){return <Suspense fallback={null}><Notice/></Suspense>}
