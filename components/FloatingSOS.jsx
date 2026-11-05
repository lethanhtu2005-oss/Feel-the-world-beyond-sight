"use client";
import {useEffect,useRef,useState} from "react";
import {useRouter} from "next/navigation";
import Link from "next/link";
export default function FloatingSOS(){
 const router=useRouter();const timer=useRef(null);const [holding,setHolding]=useState(false);
 const cancel=()=>{if(timer.current)clearTimeout(timer.current);timer.current=null;setHolding(false);};
 const start=()=>{cancel();setHolding(true);timer.current=setTimeout(()=>{timer.current=null;setHolding(false);router.push("/sos?source=hold");},5000);};
 useEffect(()=>()=>{if(timer.current)clearTimeout(timer.current);},[]);
 // Nút âm lượng cứng không được Web/PWA cấp API bắt giữ 5 giây.
 // Khi có ứng dụng native, lớp native cần gọi sự kiện này sau khi xác minh đủ 5 giây.
 useEffect(()=>{const onNative=()=>router.push("/sos?source=native-volume");window.addEventListener("wayecho:native-volume-down-held",onNative);return()=>window.removeEventListener("wayecho:native-volume-down-held",onNative);},[router]);
 return <aside className="fixed bottom-[286px] right-3 z-[87] print:hidden md:bottom-[240px] md:right-4" aria-label="Hỗ trợ SOS demo">
  <div className="hidden md:block"><Link href="/sos" className="block w-[100px] rounded-[24px] focus-visible:outline focus-visible:outline-4 focus-visible:outline-[#fbbf24]" aria-label="Mở trang SOS demo"><img src="/assets/images/floating-controls/sos.webp" alt="SOS" width="414" height="379"/></Link></div>
  <div className="md:hidden flex flex-col items-center gap-1">
   <button type="button" onPointerDown={start} onPointerUp={cancel} onPointerCancel={cancel} onPointerLeave={cancel} onContextMenu={e=>e.preventDefault()} className={`flex h-[76px] w-[76px] touch-none select-none flex-col items-center justify-center rounded-full border-4 border-white bg-red-700 text-white shadow-xl ${holding?"ring-4 ring-red-300":""}`} aria-label="Chạm và giữ SOS trong 5 giây để mở trang hỗ trợ khẩn cấp demo"><strong className="text-lg">SOS</strong><span className="text-[10px]">Giữ 5 giây</span></button>
   <Link href="/sos" className="rounded-md bg-white/90 px-2 py-1 text-[11px] font-bold text-red-800">Mở SOS</Link>
  </div>
 </aside>;
}
