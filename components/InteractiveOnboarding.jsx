"use client";
import {useEffect,useRef,useState} from "react";
import Link from "next/link";
import {useA11y} from "@/components/A11yProvider";

const steps=[
 {title:"Chào mừng đến WayEcho",desc:"Khám phá Hà Nội theo cách của bạn. Bản hướng dẫn này có thể bỏ qua và mở lại bất kỳ lúc nào.",symbol:"✦"},
 {title:"Cá nhân hóa trợ năng",desc:"Chọn chữ lớn, tương phản cao và tốc độ đọc theo nhu cầu của bạn.",symbol:"Aa"},
 {title:"Thử tìm kiếm bằng giọng nói",desc:"Nhấn micro để thử nói tên điểm đến. Bạn luôn có thể nhập bằng bàn phím.",symbol:"🎙"},
 {title:"Khám phá và nhận hỗ trợ",desc:"Camera AI chỉ mô tả thông tin và có thể nhận diện sai. Tư vấn viên và SOS là các luồng hỗ trợ riêng; không dùng AI để dẫn đường an toàn.",symbol:"♡"}
];
export default function InteractiveOnboarding(){
 const {contrast,largeText,speechRate,toggleContrast,toggleLargeText,setSpeechRate,speak,stop}=useA11y();
 const [step,setStep]=useState(0),[heard,setHeard]=useState(""),[typing,setTyping]=useState(""),[listening,setListening]=useState(false),[message,setMessage]=useState("");
 const recog=useRef(null);
 const stageTitle=useRef(null),focusNextStage=useRef(false);
 // Disable handlers before aborting: late Web Speech events must not update
 // the UI after the user has left the microphone step.
 const abortMic=()=>{
  const r=recog.current;recog.current=null;
  if(r){r.onstart=null;r.onresult=null;r.onerror=null;r.onend=null;try{r.abort();}catch{}}
  setListening(false);
 };
 useEffect(()=>{
  const onHidden=()=>{if(document.visibilityState==="hidden"){const r=recog.current;recog.current=null;if(r){r.onstart=null;r.onresult=null;r.onerror=null;r.onend=null;try{r.abort();}catch{}}setListening(false);}};
  document.addEventListener("visibilitychange",onHidden);
  return()=>{document.removeEventListener("visibilitychange",onHidden);const r=recog.current;recog.current=null;try{r?.abort();}catch{}try{window.speechSynthesis?.cancel();}catch{}};
 },[]);
 useEffect(()=>{if(focusNextStage.current){focusNextStage.current=false;stageTitle.current?.focus();}},[step]);
 const next=()=>{abortMic();stop();setMessage("");focusNextStage.current=true;setStep(v=>Math.min(3,v+1));};
 const previous=()=>{abortMic();stop();setMessage("");focusNextStage.current=true;setStep(v=>Math.max(0,v-1));};
 const mic=()=>{
  if(recog.current){abortMic();setMessage("Đã dừng micro.");return;}
  const API=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!API){setMessage("Trình duyệt này chưa hỗ trợ nhận dạng giọng nói. Hãy thử nhập tên địa điểm vào ô bên dưới.");return;}
  const r=new API();recog.current=r;r.lang="vi-VN";r.interimResults=false;r.maxAlternatives=1;
  r.onstart=()=>{if(recog.current!==r)return;setListening(true);setMessage("Micro đang nghe. Bạn có thể nói tên điểm đến.");};
  r.onresult=(e)=>{if(recog.current!==r)return;const text=e.results?.[0]?.[0]?.transcript||"";setHeard(text);setTyping(text);setMessage(text?`Đã nhận: ${text}`:"Không nhận được nội dung.");};
  r.onerror=(e)=>{if(recog.current!==r)return;setMessage(e.error==="not-allowed"?"Micro bị từ chối quyền. Bạn vẫn có thể nhập bằng bàn phím.":"Không nhận dạng được giọng nói. Hãy thử lại hoặc gõ bằng bàn phím.");};
  r.onend=()=>{if(recog.current===r){recog.current=null;setListening(false);}};
  try{r.start();}catch{abortMic();setMessage("Không mở được micro. Hãy dùng bàn phím.");}
 };
 return <section className="we-onboard mx-auto max-w-3xl px-4 py-10 sm:py-16" aria-label="Hướng dẫn làm quen WayEcho">
  <div className="we-onboard-panel rounded-[30px] border border-[#ead8c8] bg-white p-5 shadow-xl sm:p-9">
   <div className="flex items-center justify-between gap-3"><span className="text-sm font-bold text-[#a54816]">WAYECHO · HƯỚNG DẪN TƯƠNG TÁC</span><Link href="/" onClick={()=>{abortMic();stop();}} className="rounded-xl border border-[#e8d9cc] px-4 py-3 font-semibold hover:bg-orange-50 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-orange-600">Bỏ qua</Link></div>
   <p className="mt-5 text-sm font-semibold" aria-live="polite">Bước {step+1} trên 4</p>
   <div className="mt-2 grid grid-cols-4 gap-2" aria-hidden="true">{steps.map((_,i)=><span key={i} className={`h-2 rounded-full ${i<=step?"bg-[#ec721d]":"bg-[#f0e6dc]"}`}/>)}</div>
   <div key={step} className="we-onboard-stage mt-7 rounded-3xl bg-[#fff6eb] px-5 py-8 text-center sm:px-8">
    <div className="we-onboard-symbol mx-auto grid h-20 w-20 place-items-center rounded-full bg-white text-3xl font-black text-[#bd531b] shadow-lg" aria-hidden="true">{steps[step].symbol}</div>
    <h1 ref={stageTitle} tabIndex={-1} className="mt-5 text-3xl font-black text-[#4b2c1d] sm:text-4xl">{steps[step].title}</h1>
    <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-[#47352c]">{steps[step].desc}</p>
   </div>
   {step===0&&<div className="mt-5 flex flex-wrap gap-3"><button type="button" onClick={()=>speak("Chào mừng đến WayEcho. Bạn có thể khám phá Hà Nội và tự chọn những công cụ hỗ trợ phù hợp.")} className="we-onboard-secondary">Nghe giới thiệu</button><Link className="we-onboard-secondary" href="/explore" onClick={()=>{abortMic();stop();}}>Xem điểm đến ngay</Link></div>}
   {step===1&&<div className="mt-5 grid gap-3 sm:grid-cols-2"><button type="button" aria-pressed={largeText} className="we-onboard-secondary" onClick={toggleLargeText}>Chữ lớn: {largeText?"Đang bật":"Đang tắt"}</button><button type="button" aria-pressed={contrast} className="we-onboard-secondary" onClick={toggleContrast}>Tương phản cao: {contrast?"Đang bật":"Đang tắt"}</button><label className="sm:col-span-2">Tốc độ giọng đọc: {speechRate.toFixed(1)}×<input className="mt-3 w-full accent-orange-600" type="range" min="0.6" max="1.6" step="0.1" value={speechRate} onChange={e=>setSpeechRate(Number(e.target.value))}/></label><button className="we-onboard-secondary sm:col-span-2" type="button" onClick={()=>speak("Đây là ví dụ giọng đọc tiếng Việt ở tốc độ bạn đã chọn.")}>Nghe thử tốc độ</button></div>}
   {step===2&&<div className="mt-5 space-y-3"><button className="we-onboard-mic" type="button" aria-pressed={listening} onClick={mic}>{listening?"Dừng nghe":"🎙 Bấm để nói"}</button><label className="block font-semibold" htmlFor="we-onboard-query">Hoặc nhập điểm đến</label><input id="we-onboard-query" className="w-full rounded-xl border border-[#bd997e] bg-white p-3 focus-visible:outline-4 focus-visible:outline-orange-600" value={typing} onChange={e=>setTyping(e.target.value)} placeholder="Ví dụ: Chợ Đồng Xuân"/><p className="text-sm" role="status" aria-live="polite">{message|| (heard?`Bạn vừa nói: ${heard}`:"Chỉ thực hành tại đây, không tự động tìm đường hoặc bật micro khi tải trang.")}</p>{typing.trim()&&<Link className="we-onboard-secondary inline-flex" onClick={()=>{abortMic();stop();}} href={`/search?q=${encodeURIComponent(typing.trim())}`}>Tìm kiếm “{typing.trim()}”</Link>}</div>}
   {step===3&&<div className="mt-5 grid gap-3 sm:grid-cols-3"><Link className="we-onboard-secondary text-center" href="/assistant" onClick={()=>{abortMic();stop();}}>Trợ lý Camera AI</Link><Link className="we-onboard-secondary text-center" href="/help" onClick={()=>{abortMic();stop();}}>Tư vấn & Trợ giúp</Link><Link className="we-onboard-secondary text-center" href="/sos" onClick={()=>{abortMic();stop();}}>SOS demo</Link></div>}
   <div className="mt-8 flex justify-between gap-3"><button className="we-onboard-secondary" type="button" onClick={previous} disabled={step===0}>Quay lại</button>{step===3?<Link href="/" onClick={()=>{abortMic();stop();}} className="we-onboard-next">Hoàn thành →</Link>:<button className="we-onboard-next" type="button" onClick={next}>Tiếp tục →</button>}</div>
  </div>
 </section>;
}
