"use client";
import {useEffect,useRef,useState} from "react";
import Link from "next/link";
import MobileCameraModeTabs from "./MobileCameraModeTabs";
import {useA11y} from "./A11yProvider";
import {useSpeechRecognition} from "@/lib/useSpeechRecognition";

const initial=[{role:"assistant",text:"Xin chào! Tôi là Trợ lý AI WayEcho. Tôi có thể mô tả những gì camera nhìn thấy bằng tiếng Việt, nhưng không thể chỉ đường hoặc xác nhận lối đi an toàn. Nếu cần di chuyển, bạn hãy dùng gậy để dò đường và cân nhắc nhờ người hỗ trợ."}];
export default function WayEchoAIWidget(){
 const [open,setOpen]=useState(false),[active,setActive]=useState(false),[status,setStatus]=useState("Camera chưa mở"),[text,setText]=useState(""),[messages,setMessages]=useState(initial),[busy,setBusy]=useState(false),[autoRead,setAutoRead]=useState(true);
 const video=useRef(null),stream=useRef(null),list=useRef(null),facing=useRef("environment");const {speak,stop}=useA11y();
 const {supported,listening,start,stop:stopListening,error:speechError}=useSpeechRecognition({lang:"vi-VN",onResult:(value)=>{setText(value);}});
 useEffect(()=>{if(active&&video.current&&stream.current){video.current.srcObject=stream.current;video.current.play().catch(()=>{});}},[active,open]);
 useEffect(()=>{list.current?.scrollTo({top:list.current.scrollHeight,behavior:"smooth"});},[messages,open]);
 // Reuse this existing floating AI camera for the homepage Camera button.
 // Permission is requested only after an explicit user click.
 useEffect(()=>{
  const handler=()=>{window.dispatchEvent(new CustomEvent("wayecho:widget-open",{detail:{widget:"ai"}}));setOpen(true);cameraOn();};
  const switchWidget=e=>{if(e.detail?.widget!=="ai")close();};
  window.addEventListener("wayecho:open-ai-camera",handler);
  const openPanel=()=>{window.dispatchEvent(new CustomEvent("wayecho:widget-open",{detail:{widget:"ai"}}));setOpen(true);};
  window.addEventListener("wayecho:open-ai-panel",openPanel);
  window.addEventListener("wayecho:widget-open",switchWidget);
  return ()=>{window.removeEventListener("wayecho:open-ai-camera",handler);window.removeEventListener("wayecho:open-ai-panel",openPanel);window.removeEventListener("wayecho:widget-open",switchWidget);};
 });
 useEffect(()=>()=>{stream.current?.getTracks().forEach(t=>t.stop());},[]);
 function cameraOff(){stream.current?.getTracks().forEach(t=>t.stop());stream.current=null;setActive(false);setStatus("Camera đã tắt");}
 function close(){cameraOff();stopListening();stop();setOpen(false);}
 function consultant(){close();window.dispatchEvent(new CustomEvent("wayecho:consultant",{detail:{message:"Tôi muốn được tư vấn viên hỗ trợ thông tin lộ trình hoặc kết nối người đồng hành. Trợ lý AI không cung cấp chỉ đường."}}));}
 const navigationQuestion=/(chỉ đường|dẫn đường|đường nào|đi hướng nào|rẽ (trái|phải)|băng qua|qua đường|có an toàn|tránh (xe|vật cản)|đi tiếp|đi thẳng|lối nào)/i;
 async function cameraOn(){
  if(!navigator.mediaDevices?.getUserMedia){setStatus("Trình duyệt không hỗ trợ camera. Cần HTTPS hoặc localhost.");return;}
  setStatus("Đang yêu cầu quyền sử dụng camera…");
  try{const s=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:facing.current}},audio:false});cameraOff();stream.current=s;setActive(true);setStatus("Camera đã mở. Chụp cảnh khi muốn AI phân tích.");}
  catch(e){setStatus(e.name==="NotAllowedError"?"Bạn chưa cấp quyền camera. Hãy cho phép trong trình duyệt.":"Không mở được camera trên thiết bị này.");}
 }
 async function switchCamera(){facing.current=facing.current==="environment"?"user":"environment";await cameraOn();}
 function grabFrame(){const v=video.current;if(!active||!v?.videoWidth)return null;const c=document.createElement("canvas");const scale=Math.min(1,1024/v.videoWidth);c.width=Math.round(v.videoWidth*scale);c.height=Math.round(v.videoHeight*scale);c.getContext("2d").drawImage(v,0,0,c.width,c.height);return c.toDataURL("image/jpeg",0.72);}
 async function ask(custom){const q=(custom||text||"Hãy mô tả những gì camera đang nhìn thấy.").trim();if(!q||busy)return;setText("");setMessages(m=>[...m,{role:"user",text:q}]);if(navigationQuestion.test(q)){const answer="Tôi chỉ mô tả cảnh trong camera, không thể chỉ đường, đánh giá an toàn hay hướng dẫn bạn di chuyển. Nếu bạn cần đi, hãy dùng gậy để dò đường và nhờ người hỗ trợ phù hợp. Bạn có muốn kết nối với tư vấn viên WayEcho để tìm hiểu lộ trình hoặc hỗ trợ đồng hành không?";setMessages(m=>[...m,{role:"assistant",text:answer}]);if(autoRead)speak(answer);return;}setBusy(true);const photo=grabFrame();try{
 const res=await fetch("/api/ai-assistant",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({question:q,image:photo})});const data=await res.json();const answer=data.answer||data.error||"Chưa thể nhận diện ảnh lúc này.";setMessages(m=>[...m,{role:"assistant",text:answer}]);if(autoRead)speak(answer);
 }catch(_){const answer="Không thể kết nối trợ lý AI. Vui lòng kiểm tra Internet và thử lại.";setMessages(m=>[...m,{role:"assistant",text:answer}]);if(autoRead)speak(answer);}finally{setBusy(false);}}
 return <aside className={`fixed bottom-[94px] right-3 ${open?"z-[100]":"z-[85]"} flex flex-col items-end gap-3 md:bottom-6 md:right-4 print:hidden`} aria-label="Trợ lý AI WayEcho">
  {open&&<section className="fixed inset-x-2 bottom-2 top-2 z-[105] flex min-h-0 flex-col overflow-hidden rounded-[22px] border border-[#e6cba8] bg-[#fff9f1] shadow-2xl md:inset-x-auto md:bottom-5 md:right-[132px] md:top-[76px] md:w-[min(430px,calc(100vw-168px))] md:rounded-[26px]" role="dialog" aria-modal="true" aria-label="Trợ lý AI với camera trực tiếp">
   <MobileCameraModeTabs mode="ai" onAI={()=>{}} onConsultant={consultant} onClose={close}/><header className="waye-camera-desktop-header flex items-center justify-between gap-2 bg-[#fff5e6] p-3"><div><h2 className="text-lg font-bold">✦ Trợ lý AI WayEcho</h2><p className="text-xs text-[#80512d]">Camera + hỏi đáp bằng tiếng Việt</p></div><div className="flex items-center gap-2"><Link href="/sos" className="rounded-full border border-red-300 bg-white px-3 py-2 text-xs font-bold text-red-700 md:hidden" aria-label="Mở hỗ trợ SOS">SOS</Link><button onClick={close} className="rounded-full border px-3 py-2 font-bold" aria-label="Đóng trợ lý AI">✕</button></div></header>
   <div className="waye-camera-stage relative min-h-0 flex-1 overflow-hidden bg-[#1f2424]">
    {active?<video ref={video} playsInline autoPlay muted className="absolute inset-0 h-full w-full object-cover" aria-label="Camera đang hiển thị trực tiếp"/>:<div className="absolute inset-0 flex items-center justify-center px-8 text-center text-white"><div><p className="text-5xl" aria-hidden="true">📷</p><p className="mt-3 text-base">Nhấn “Bật camera” để quan sát không gian xung quanh.</p><p className="mt-2 text-sm text-[#e6d6c5]">Camera chỉ bật khi bạn đồng ý.</p></div></div>}
    <div className="waye-camera-status absolute inset-x-0 top-0 flex items-center justify-between gap-2 bg-gradient-to-b from-black/75 to-transparent px-3 py-3 text-white"><span className="rounded-full bg-black/65 px-3 py-1 text-xs">{active?"● Camera trực tiếp":"○ Camera đang tắt"}</span><button onClick={active?cameraOff:cameraOn} className="rounded-full bg-[#f9a928] px-3 py-2 text-xs font-bold text-black">{active?"Tắt camera":"Bật camera"}</button></div>
    <div ref={list} className="waye-camera-chat absolute inset-x-2 bottom-2 max-h-[54%] space-y-2 overflow-y-auto rounded-2xl bg-black/20 p-2" aria-label="Các tin nhắn hỏi đáp" role="log" aria-live="polite">
     {messages.slice(-6).map((m,i)=><div key={i} className={`max-w-[91%] rounded-2xl px-3 py-2 text-sm leading-5 shadow-lg ${m.role==="user"?"ml-auto bg-[#ffbb62] text-[#261705]":"mr-auto bg-white/95 text-[#1a1a1a]"}`}>{m.text}</div>)}
     {busy&&<div className="w-fit rounded-xl bg-white px-3 py-2 text-sm">Đang phân tích ảnh và câu hỏi…</div>}
    </div>
   </div>
   <div className="waye-camera-controls border-t border-[#e9d8c5] bg-[#fff9f1] p-3"><p className="mb-2 text-xs text-[#72502d]" role="status">{status}</p><div className="flex flex-wrap items-center gap-2">
    <button type="button" onClick={()=>ask("Hãy mô tả cảnh trong ảnh camera này.")} disabled={busy||!active} className="rounded-xl bg-[#f59c23] px-3 py-2 text-sm font-bold disabled:opacity-40">📷 Mô tả cảnh</button>
    <button type="button" onClick={switchCamera} disabled={!active} className="rounded-xl border border-[#edbc81] px-3 py-2 text-sm font-bold disabled:opacity-40">🔄 Đổi camera</button>
    <button type="button" onClick={()=>listening?stopListening():start()} disabled={!supported} className="rounded-xl border border-[#edbc81] px-3 py-2 text-sm font-bold disabled:opacity-40" aria-pressed={listening}>{listening?"Dừng nghe":"🎤 Hỏi bằng giọng nói"}</button>
    <label className="ml-auto flex items-center gap-1 text-xs"><input type="checkbox" checked={autoRead} onChange={e=>setAutoRead(e.target.checked)}/> Tự đọc</label>
   </div>{speechError&&<p className="mt-1 text-xs text-red-700">{speechError}</p>}
   <form onSubmit={e=>{e.preventDefault();ask();}} className="mt-2 flex gap-2"><input value={text} onChange={e=>setText(e.target.value)} placeholder="Hỏi về cảnh trước mặt…" aria-label="Nhập câu hỏi bằng tiếng Việt" className="min-w-0 flex-1 rounded-xl border border-[#d8c2a6] bg-white px-3 py-3 text-sm text-[#121212]"/><button type="submit" disabled={busy||!text.trim()} className="rounded-xl bg-[#ffad31] px-4 font-bold disabled:opacity-40">Gửi</button></form>
   <button type="button" onClick={consultant} className="mt-2 w-full rounded-xl border border-[#d69c54] bg-white px-3 py-2 text-sm font-bold text-[#87451d]">Cần người hỗ trợ? Kết nối tư vấn viên →</button>
   <p className="mt-2 text-[11px] leading-4 text-[#705a48]">AI chỉ mô tả, có thể nhận diện sai. Nếu cần đi lại, hãy dùng gậy để dò và phương thức định hướng quen thuộc. AI không hướng dẫn rẽ, băng đường hay xác nhận lối an toàn. Tư vấn viên demo chưa kết nối trực tiếp với người thật. Ảnh chỉ gửi khi bạn yêu cầu phân tích.</p></div>
  </section>}
  <button type="button" onClick={()=>{if(open)close();else{window.dispatchEvent(new CustomEvent("wayecho:widget-open",{detail:{widget:"ai"}}));setOpen(true);}}} aria-expanded={open} aria-label={open?"Đóng trợ lý AI":"Mở trợ lý AI và camera"} className={`${open?"hidden md:block":"block"} w-[86px] rounded-[24px] transition-transform duration-200 hover:-translate-y-1 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#b8742c] md:w-[100px]`}><img src="/assets/images/floating-controls/ai.webp" alt="" width="414" height="379" className="h-auto w-full" draggable="false" /></button>
 </aside>;
}
