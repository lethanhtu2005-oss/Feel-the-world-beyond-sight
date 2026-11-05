"use client";

import Image from "next/image";

export default function MobileCameraModeTabs({mode, onAI, onConsultant, onClose}) {
  return (
    <div className="waye-camera-mobile-head md:hidden">
      <div className="waye-camera-mobile-brand">
        <button type="button" aria-label="Đóng và quay lại trang trước" className="waye-camera-back" onClick={onClose}>←</button>
        <Image src="/assets/brand/logo.png" alt="WayEcho" width={142} height={45} className="waye-camera-logo" priority />
        <span aria-label="Cài đặt trợ năng" className="waye-camera-access" title="Giao diện hỗ trợ tiếp cận">♿</span>
      </div>
      <div className="waye-camera-mobile-tabs" role="group" aria-label="Chọn hình thức hỗ trợ">
        <button type="button" aria-pressed={mode === "ai"} className={mode === "ai" ? "active" : ""} onClick={onAI}>📷 AI Camera</button>
        <button type="button" aria-pressed={mode === "consultant"} className={mode === "consultant" ? "active" : ""} onClick={onConsultant}>🎧 Hỗ trợ trực tiếp</button>
      </div>
    </div>
  );
}
