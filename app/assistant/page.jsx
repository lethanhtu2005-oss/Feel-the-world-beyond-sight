"use client";

import { useState } from "react";
import { useA11y } from "@/components/A11yProvider";
import VerifiedImage from "@/components/VerifiedImage";
import CameraCapture from "@/components/CameraCapture";
import { CameraIcon, SpeakerIcon, PhoneIcon, WaveIcon } from "@/components/Icons";

const SCENES = [
  { img: "/assets/images/old-quarter-street.jpg", alt: "Phố hẹp trong khu phố cổ Hà Nội với xe máy và hàng quán hai bên.", desc: "Demo mô tả: hình ảnh cho thấy một tuyến phố hẹp, có xe máy và hàng quán hai bên. Hệ thống không thể xác nhận khoảng cách hay vật cản thực tế chỉ từ ảnh demo.", confidence: "Trung bình" },
  { img: "/assets/images/cafe-street.jpg", alt: "Khu vực quán cà phê mặt phố với bàn ghế đặt gần lối đi.", desc: "Demo mô tả: có bàn ghế đặt gần khu vực lối đi. AI cần camera trực tiếp và vẫn có thể bỏ sót chướng ngại nhỏ hoặc vật đang chuyển động.", confidence: "Trung bình" },
  { img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Temple_of_Literature%2C_Hanoi_by_Xiquinho_Silva_02.jpg/1280px-Temple_of_Literature%2C_Hanoi_by_Xiquinho_Silva_02.jpg", fallback: "/assets/images/we-ai-van-mieu-khue-van-cac.jpg", alt: "Khuôn viên Văn Miếu – Quốc Tử Giám với kiến trúc mái ngói truyền thống và sân lát gạch.", desc: "Demo mô tả: đây là ảnh Văn Miếu – Quốc Tử Giám. AI có thể mô tả kiến trúc và cảnh quan nhìn thấy, nhưng không được tự kết luận lối đi có an toàn hoặc accessible hay không.", confidence: "Cao về nhận diện địa điểm, thấp về an toàn tuyến đi" },
];

export default function AssistantPage() {
  const { speak } = useA11y();
  const [scene, setScene] = useState(0);
  const [scanning, setScanning] = useState(false);
  const [described, setDescribed] = useState(false);
  const current = SCENES[scene];

  function scan() { setScanning(true); setDescribed(false); speak("Đang phát mô tả viết sẵn cho ảnh mẫu. Chưa có phân tích AI thật."); setTimeout(() => { setScanning(false); setDescribed(true); speak(`${current.desc} Nhãn minh họa viết sẵn: ${current.confidence}.`); }, 900); }
  function nextScene() { setScene((scene + 1) % SCENES.length); setDescribed(false); }

  return (
    <div className="container-page py-10 relative overflow-hidden">
      {/* 3D Ambient Orbs */}
      <div className="bubble-orb-amber -top-20 -right-20 w-80 h-80 opacity-40 pointer-events-none" aria-hidden="true" />

      <p className="font-bold text-[#d86927] uppercase tracking-wider text-xs">AI Camera / Vision Assistant</p>
      <h1 className="mt-1 text-4xl sm:text-5xl font-bold text-[#352016]">Trợ lý mô tả hình ảnh</h1>
      <p className="hc-muted mt-3 max-w-3xl text-lg text-ink-soft">Tính năng này mô phỏng FR-12: zoom/OCR/mô tả cho người nhìn kém và người mù. AI là công cụ hỗ trợ, không phải hệ thống bảo đảm an toàn.</p>

      <div role="note" className="mt-5 rounded-2xl glass-liquid-warm border border-[#eedecb] p-5 shadow-sm text-sm">
        <p className="font-semibold text-[#8b4d1b]">Lưu ý quyền riêng tư & phạm vi thử nghiệm:</p>
        <p className="mt-1 text-[#452a1d]">Bạn có thể mở camera hoặc chọn ảnh để xem trước trên thiết bị. Chưa có nhận diện hình ảnh hay OCR thật, và ảnh của bạn không được gửi ra ngoài. Phần ví dụ bên dưới dùng ảnh mẫu với mô tả viết sẵn.</p>
      </div>

      <CameraCapture />

      <h2 className="mt-12 text-2xl font-bold text-[#352016]">Ví dụ mô tả với ảnh mẫu</h2>
      <div className="mt-5 grid gap-8 lg:grid-cols-2">
        <div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] border border-[#eedecb] bg-surface-alt card-3d hc-border">
            <VerifiedImage src={current.img} fallback={current.fallback} alt={current.alt} className={`h-full w-full object-cover transition ${scanning ? "blur-[2px] brightness-75" : ""}`} />
            <div className="pointer-events-none absolute inset-6 rounded-2xl border-2 border-white/80 shadow-inner" aria-hidden="true" />
            {scanning && <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm text-white"><span className="flex items-center gap-2 rounded-full bg-black/80 border border-white/20 px-5 py-2.5 font-semibold shadow-lg"><WaveIcon size={20} className="animate-pulse text-[#f8ae38]" /> Đang mở mô tả mẫu…</span></div>}
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <button onClick={scan} className="btn-3d text-lg px-6 py-3 flex items-center gap-2"><CameraIcon size={22} /> Mô tả ảnh demo</button>
            <button onClick={nextScene} className="btn-ghost hc-border text-lg rounded-full bg-white/80 backdrop-blur-md hover:bg-white">Đổi cảnh</button>
          </div>
        </div>

        <div>
          <div className="rounded-[22px] border border-[#eedecb] glass-liquid p-6 card-3d hc-surface hc-border">
            <p className="flex items-center gap-2 text-sm font-bold text-[#d86927] uppercase tracking-wider"><SpeakerIcon size={18} /> Kết quả mô tả âm thanh</p>
            <p className="mt-3 min-h-[6rem] text-xl leading-relaxed text-[#212529]" aria-live="polite">{described ? current.desc : "Nhấn “Mô tả ảnh demo” để xem cách hệ thống phản hồi."}</p>
            {described && (
              <>
                <p className="mt-4 rounded-xl bg-[#fff2dc] border border-[#f0d8b6] p-3.5 text-sm font-semibold text-[#7a4c00]">
                  Nhãn minh họa, không do mô hình tính: {current.confidence}
                </p>
                <button onClick={() => speak(`${current.desc} Nhãn minh họa viết sẵn: ${current.confidence}.`)} className="btn-ghost hc-border mt-3 rounded-xl flex items-center gap-2 text-sm">
                  <SpeakerIcon size={18} /> Nghe lại
                </button>
              </>
            )}
          </div>
          <div className="mt-5 rounded-[22px] bg-[#352016] text-[#fff2e7] p-6 shadow-xl border border-[#4f3223]">
            <h2 className="text-2xl font-bold text-white">AI không chắc? Chuyển sang người thật.</h2>
            <p className="mt-2 text-[#e5d2c3] text-sm leading-relaxed">Trong sản phẩm thật, Human Support có thể nhận request và chỉ nhận location/thông tin khi Traveler cấp quyền.</p>
            <a href="/help" className="btn-3d mt-5 w-full text-lg flex items-center justify-center gap-2"><PhoneIcon size={22} /> Mở kênh hỗ trợ</a>
          </div>
        </div>
      </div>
    </div>
  );
}
