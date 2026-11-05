"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { initCustomerProfileScope, profileGet, profileSet } from "@/lib/customerProfileStorage";
import { useA11y } from "@/components/A11yProvider";
import { UserIcon, SpeakerIcon, AccessibleIcon, PhoneIcon, CheckIcon } from "@/components/Icons";

const GROUPS = [
  { title: "Hiển thị", items: [["largeText", "Tăng kích thước chữ"], ["highContrast", "Giao diện tương phản cao"], ["magnification", "Phóng to màn hình"], ["colorAdjust", "Điều chỉnh màu sắc"]] },
  { title: "Âm thanh & giọng nói", items: [["screenReader", "Hỗ trợ đọc văn bản (Text-to-Speech)"], ["audioDescription", "Mô tả hình ảnh bằng âm thanh"], ["voiceNavigation", "Chỉ đường bằng giọng nói"], ["voiceCommand", "Điều khiển bằng giọng nói"]] },
  { title: "Di chuyển & trợ giúp", items: [["stepFree", "Ưu tiên lối không bậc"], ["elevator", "Ưu tiên thang máy"], ["staff", "Nhân viên hỗ trợ"], ["mobility", "Hỗ trợ di chuyển"]] },
  { title: "Trong chuyến đi", items: [["checkin", "Hỗ trợ nhận phòng"], ["navigation", "Hỗ trợ tìm đường"], ["transport", "Hỗ trợ lên/xuống phương tiện"], ["attraction", "Hỗ trợ tại điểm tham quan"]] },
];
const DEFAULT_PREFS = { screenReader: true, audioDescription: true, staff: true, navigation: true };
const PROFILE_TYPES = [
  ["lowvision", "Người nhìn kém", "◉"], ["blind", "Người khiếm thị", "◌"],
  ["wheelchair", "Người dùng xe lăn", "♿"], ["hearing", "Người khiếm thính", "♫"],
  ["senior", "Người cao tuổi", "♧"], ["other", "Khác (ghi rõ)", "⋯"],
];
const blankContact = { name: "", phone: "", email: "", address: "", birthDate: "", gender: "" };
const quickIds = ["audioDescription", "voiceNavigation", "highContrast", "largeText"];
const quickLabels = { audioDescription: "Thuyết minh bằng âm thanh", voiceNavigation: "Chỉ đường bằng giọng nói", highContrast: "Giao diện tương phản cao", largeText: "Tăng kích thước chữ" };
const quickSymbols = { audioDescription: "◖))", voiceNavigation: "➤", highContrast: "◐", largeText: "Aa" };
const inputClass = "mt-1.5 w-full rounded-xl border border-[#e7ded1] bg-white px-4 py-3 text-base text-[#20232b] outline-none focus:border-[#e9a116] focus:ring-2 focus:ring-[#f8ae38]/30 hc-surface hc-border";
const cardClass = "rounded-[24px] border border-[#f0e8dd] bg-white p-5 shadow-[0_10px_32px_rgba(71,51,25,0.07)] hc-surface hc-border md:p-6";
const storageKeys = ["we-usertype", "we-contact", "we-birth-date", "we-emergency", "we-emergency-name", "we-companion", "we-access-prefs", "we-share-business"];

function ageFromDate(s) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s || "")) return null;
  const [y, m, d] = s.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  const now = new Date();
  if (dt.getFullYear() !== y || dt.getMonth() !== m - 1 || dt.getDate() !== d || dt > now || y < 1900) return null;
  return now.getFullYear() - y - (now.getMonth() + 1 < m || (now.getMonth() + 1 === m && now.getDate() < d) ? 1 : 0);
}

function Field({ title, children }) { return <label className="block text-sm font-semibold text-[#40372e]">{title}{children}</label>; }
function Modal({ title, children, onClose, wide = false }) {
  const closeRef = useRef(null);
  useEffect(() => {
    closeRef.current?.focus();
    const onKey = e => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  return <div className="fixed inset-0 z-[120] flex items-center justify-center overflow-y-auto bg-[#181714]/60 p-4" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
    <section role="dialog" aria-modal="true" aria-label={title} className={`my-auto max-h-[90vh] w-full overflow-y-auto rounded-[24px] bg-white p-5 shadow-2xl hc-surface md:p-7 ${wide ? "max-w-2xl" : "max-w-lg"}`}>
      <div className="mb-5 flex items-center justify-between gap-3"><h2 className="text-2xl font-bold">{title}</h2><button ref={closeRef} type="button" className="flex h-10 w-10 items-center justify-center rounded-full border border-[#ebdfca] text-xl hover:bg-[#fff5dc]" aria-label="Đóng cửa sổ" onClick={onClose}>×</button></div>
      {children}
    </section>
  </div>;
}
function Switch({ checked, onChange, label }) { return <label className="relative flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-[#f0eee9] bg-[#fafafa] px-4 py-3.5 transition hover:border-[#f8ae38] hc-surface hc-border"><span className="font-medium">{label}</span><input type="checkbox" className="peer sr-only" checked={checked} onChange={e => onChange(e.target.checked)}/><span aria-hidden="true" className={`relative h-7 w-12 shrink-0 rounded-full transition ${checked ? "bg-[#f8ae38]" : "bg-[#c7c8c9]"}`}><span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all ${checked ? "left-6" : "left-1"}`}/></span></label>; }

export default function ProfilePage() {
  const { speak, setContrastEnabled, setLargeTextEnabled, speechRate, setSpeechRate } = useA11y();
  const [userType, setUserType] = useState("lowvision");
  const [otherType, setOtherType] = useState("");
  const [emergency, setEmergency] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [companion, setCompanion] = useState({ name: "", phone: "" });
  const [prefs, setPrefs] = useState(DEFAULT_PREFS);
  const [shareWithBusiness, setShareWithBusiness] = useState(false);
  const [contact, setContact] = useState(blankContact);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [modal, setModal] = useState("");
  const [editContact, setEditContact] = useState(blankContact);
  const [editPerson, setEditPerson] = useState({ name: "", phone: "" });
  const [extraPrefs, setExtraPrefs] = useState(DEFAULT_PREFS);
  const [avatar, setAvatar] = useState("");
  const photoRef = useRef(null);
  const age = useMemo(() => ageFromDate(contact.birthDate), [contact.birthDate]);
  const maxDob = new Date().toISOString().slice(0, 10);
  const profileType = PROFILE_TYPES.find(([id]) => id === userType)?.[1] || "Chưa chọn";

  useEffect(() => {
    let active = true;
    initCustomerProfileScope().then(() => {
      if (!active) return;
      try {
      const type = profileGet("we-usertype") || "lowvision";
      setUserType(PROFILE_TYPES.some(([id]) => id === type) ? type : "lowvision");
      setOtherType(profileGet("we-usertype-other") || "");
      setEmergency(profileGet("we-emergency") || "");
      setEmergencyName(profileGet("we-emergency-name") || "");
      const c = JSON.parse(profileGet("we-contact") || "null");
      if (c && typeof c === "object") setContact({ ...blankContact, ...c, birthDate: c.birthDate || profileGet("we-birth-date") || "" });
      else setContact(prev => ({ ...prev, birthDate: profileGet("we-birth-date") || "" }));
      const savedCompanion = JSON.parse(profileGet("we-companion") || "null");
      if (savedCompanion && typeof savedCompanion === "object") setCompanion({ name: savedCompanion.name || "", phone: savedCompanion.phone || "" });
      const savedPrefs = JSON.parse(profileGet("we-access-prefs") || "null");
      if (savedPrefs && typeof savedPrefs === "object") setPrefs({ ...DEFAULT_PREFS, ...savedPrefs });
      setShareWithBusiness(profileGet("we-share-business") === "1");
      setAvatar(profileGet("we-profile-avatar") || "");
    } catch (_) { /* Damaged account-scoped demo storage does not prevent displaying the profile. */ }
    }).catch(() => { if (active) setError("Không xác định được phiên tài khoản; hãy đăng nhập lại."); });
    return () => { active = false; };
  }, []);

  function persist(next = {}) {
    const data = { contact, userType, emergency, emergencyName, companion, prefs, shareWithBusiness, otherType, ...next };
    if (data.contact.birthDate && ageFromDate(data.contact.birthDate) === null) { setError("Ngày sinh không hợp lệ. Hãy chọn ngày không vượt quá hôm nay."); return false; }
    if (data.contact.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.contact.email)) { setError("Email chưa đúng định dạng."); return false; }
    try {
      profileSet("we-usertype", data.userType);
      profileSet("we-usertype-other", data.otherType);
      profileSet("we-contact", JSON.stringify(data.contact));
      profileSet("we-birth-date", data.contact.birthDate);
      profileSet("we-emergency", data.emergency);
      profileSet("we-emergency-name", data.emergencyName);
      profileSet("we-companion", JSON.stringify(data.companion));
      profileSet("we-access-prefs", JSON.stringify(data.prefs));
      profileSet("we-share-business", data.shareWithBusiness ? "1" : "0");
    } catch (_) { setError("Trình duyệt không cho phép lưu dữ liệu trên thiết bị này."); return false; }
    setContrastEnabled(!!data.prefs.highContrast);
    setLargeTextEnabled(!!data.prefs.largeText);
    setSaved(true); setError("");
    return true;
  }
  function save() { if (persist()) speak("Đã lưu hồ sơ cá nhân và tùy chọn tiếp cận trên thiết bị này."); }
  function setPreference(key, value) {
    const next = { ...prefs, [key]: value };
    setPrefs(next); setSaved(false);
    persist({ prefs: next });
  }
  function beginEditContact() { setEditContact({ ...contact }); setError(""); setModal("contact"); }
  function submitEditContact(e) { e.preventDefault(); if (persist({ contact: editContact })) { setContact(editContact); setModal(""); } }
  function beginPerson(which) { setEditPerson(which === "companion" ? { ...companion } : { name: emergencyName, phone: emergency }); setError(""); setModal(which); }
  function savePerson(e) { e.preventDefault(); if (modal === "companion") { setCompanion(editPerson); persist({ companion: editPerson }); } else { setEmergencyName(editPerson.name); setEmergency(editPerson.phone); persist({ emergencyName: editPerson.name, emergency: editPerson.phone }); } setModal(""); }
  function removePerson(which) { if (which === "companion") { const val = { name: "", phone: "" }; setCompanion(val); persist({ companion: val }); } else { setEmergencyName(""); setEmergency(""); persist({ emergencyName: "", emergency: "" }); } setModal(""); }
  function uploadAvatar(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/") || file.size > 500000) { setError("Vui lòng chọn ảnh JPG/PNG/WebP nhỏ hơn 500 KB."); return; }
    const reader = new FileReader(); reader.onload = () => { try { const value = String(reader.result || ""); profileSet("we-profile-avatar", value); setAvatar(value); setError(""); } catch (_) { setError("Không đủ dung lượng lưu ảnh trên trình duyệt."); } }; reader.readAsDataURL(file);
  }

  return <div className="bg-[#fcfaf6] pb-14 hc-surface">
    <header className="relative min-h-[190px] overflow-hidden bg-[#aa741d] text-white md:min-h-[215px]" style={{ backgroundImage: "linear-gradient(90deg,rgba(74,49,8,.90),rgba(80,48,6,.55) 52%,rgba(55,35,13,.12)),url('/assets/images/we-photo-pho-co-goc-pho.jpg')", backgroundPosition: "center", backgroundSize: "cover" }}>
      <div className="container-page relative py-12 md:py-14"><h1 className="text-4xl font-bold md:text-5xl">Hồ sơ cá nhân</h1><p className="mt-3 max-w-2xl text-base md:text-lg">Quản lý thông tin, nhu cầu hỗ trợ và các chuyến đi của bạn.</p></div>
    </header>
    <div className="container-page relative z-10 -mt-5 max-w-7xl space-y-5">
      <section className={`${cardClass} grid gap-5 md:grid-cols-[145px_1fr]`} aria-label="Thông tin tài khoản">
        <div className="relative mx-auto h-32 w-32 md:mx-0 md:h-36 md:w-36"><div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-[#fff0c9] text-[#ad791d]">{avatar ? <img src={avatar} alt="Ảnh đại diện" className="h-full w-full object-cover"/> : <UserIcon size={72}/>}</div><input type="file" ref={photoRef} accept="image/png,image/jpeg,image/webp" className="sr-only" aria-label="Chọn ảnh đại diện" onChange={uploadAvatar}/><button type="button" onClick={()=>photoRef.current?.click()} title="Đổi ảnh đại diện" aria-label="Đổi ảnh đại diện" className="absolute bottom-1 right-0 flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-white bg-[#f8ae38] text-[#29231a] shadow">▣</button></div>
        <div className="min-w-0"><div className="flex flex-wrap items-start justify-between gap-3"><div><h2 className="text-3xl font-bold">{contact.name || "Khách du lịch WayEcho"}</h2><span className="mt-2 inline-flex rounded-full bg-[#fff3cf] px-3 py-1 text-sm font-semibold text-[#a96b00]">✦ Thành viên WayEcho</span></div><button type="button" onClick={beginEditContact} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#e8d9c1] bg-white px-5 py-2 font-semibold hover:border-[#f8ae38] hover:bg-[#fff7e6]">✎ Chỉnh sửa thông tin</button></div>
          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-[#61584d]"><span>✉ {contact.email || "Chưa cập nhật email"}</span><span>☎ {contact.phone || "Chưa cập nhật số điện thoại"}</span></div>
          <div className="mt-4 grid gap-2 sm:grid-cols-3"><div className="rounded-xl bg-[#fcf6ea] px-4 py-3 font-medium"><span className="mr-2 text-[#c48b13]">▦</span>{age === null ? "Chưa có ngày sinh hợp lệ" : `${age} tuổi`}</div><div className="rounded-xl bg-[#fcf6ea] px-4 py-3 font-medium"><span className="mr-2 text-[#c48b13]">⌖</span>{contact.address || "Chưa cập nhật địa chỉ"}</div><div className="rounded-xl bg-[#fcf6ea] px-4 py-3 font-medium"><span className="mr-2 text-[#c48b13]">◈</span>{contact.gender || "Chưa cập nhật giới tính"}</div></div>
        </div>
      </section>
      <div className="grid items-start gap-5 lg:grid-cols-2">
        <section className={cardClass} aria-labelledby="type-title"><div className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#fff2d2] text-[#be8615]"><AccessibleIcon size={23}/></span><div><h2 id="type-title" className="text-2xl">Loại hồ sơ tiếp cận</h2><p className="mt-1 text-sm text-[#686057]">Giúp WayEcho cá nhân hóa trải nghiệm phù hợp hơn.</p></div></div>
          <div className="mt-5 space-y-2" role="radiogroup" aria-label="Loại hồ sơ tiếp cận">{PROFILE_TYPES.map(([id,label,symbol])=><label key={id} className={`flex min-h-12 cursor-pointer items-center justify-between gap-3 rounded-xl border px-4 py-3 ${userType === id ? "border-[#f8ae38] bg-[#fff0b7]" : "border-[#eee6dd] bg-[#fafafa] hover:border-[#f8ae38]"}`}><span className="flex items-center gap-3 font-semibold"><span className="w-6 text-center text-xl text-[#bc8411]" aria-hidden="true">{symbol}</span>{label}</span><input type="radio" name="usertype" value={id} checked={userType === id} onChange={()=>{setUserType(id);setSaved(false);persist({userType:id});}} className="h-5 w-5 accent-[#efac25]"/></label>)}</div>
          {userType === "other" && <label className="mt-3 block text-sm font-semibold">Mô tả nhu cầu của bạn<input className={inputClass} value={otherType} maxLength={160} onChange={e=>{setOtherType(e.target.value);setSaved(false);}} onBlur={()=>persist({otherType})} placeholder="Ví dụ: cần người đồng hành khi di chuyển"/></label>}
          <p className="mt-4 text-xs text-[#74695d]">Bạn có thể thay đổi loại hồ sơ bất kỳ lúc nào. Hệ thống không tự suy đoán nhu cầu theo độ tuổi.</p>
        </section>
        <section className={cardClass} aria-labelledby="prefs-title"><div className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#fff2d2] text-[#be8615]"><SpeakerIcon size={23}/></span><div><h2 id="prefs-title" className="text-2xl">Tùy chọn hỗ trợ</h2><p className="mt-1 text-sm text-[#686057]">Chọn các hình thức hỗ trợ bạn cần trong chuyến đi.</p></div></div>
          <div className="mt-5 space-y-2">{quickIds.map(id=><div key={id} className="relative"><span className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 font-bold text-[#be8615]" aria-hidden="true">{quickSymbols[id]}</span><div className="[&>label]:pl-14"><Switch checked={!!prefs[id]} label={quickLabels[id]} onChange={value=>setPreference(id,value)}/></div></div>)}</div>
          <button type="button" className="mt-5 flex min-h-12 w-full items-center justify-center rounded-xl border border-[#e7ad37] bg-[#fff8e6] px-4 py-2 font-bold text-[#72500e] hover:bg-[#fff0c5]" onClick={()=>{setExtraPrefs({ ...prefs });setModal("support");}}>＋ Thêm tùy chọn hỗ trợ khác</button>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[#fffaf1] p-3"><label htmlFor="profile-rate" className="text-sm font-semibold">Tốc độ giọng đọc: {speechRate.toFixed(1)}×</label><input id="profile-rate" type="range" min="0.6" max="1.6" step="0.1" value={speechRate} onChange={e=>setSpeechRate(Number(e.target.value))} className="accent-[#f8ae38]"/><button type="button" onClick={()=>speak("Xin chào, đây là giọng đọc thử của WayEcho.")} className="rounded-lg border border-[#e8d5b6] px-3 py-2 text-sm font-semibold hover:bg-[#fff0c5]">▶ Nghe thử</button></div>
        </section>
        <section className={cardClass} aria-labelledby="people-title"><div className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#fff2d2] text-[#be8615]"><PhoneIcon size={23}/></span><div><h2 id="people-title" className="text-2xl">Người đồng hành & Liên hệ khẩn cấp</h2><p className="mt-1 text-sm text-[#686057]">Chỉ lưu thông tin bạn tự nguyện cung cấp.</p></div></div>
          <div className="mt-5 space-y-2">{[["companion","Người đồng hành",companion.name,companion.phone],["emergency","Liên hệ khẩn cấp",emergencyName,emergency]].map(([id,label,name,phone])=><div key={id} className="flex flex-wrap items-center gap-3 rounded-xl border border-[#f0e8dd] p-3"><span className="min-w-[135px] rounded-lg bg-[#fcf6e9] px-3 py-2 text-sm font-semibold text-[#6a511c]">{label}</span><div className="min-w-0 flex-1 text-sm"><p className="font-semibold">{name || "Chưa thêm thông tin"}</p><p className="text-[#665f54]">{phone || ""}</p></div><button type="button" aria-label={`Chỉnh sửa ${label.toLowerCase()}`} title={`Chỉnh sửa ${label.toLowerCase()}`} onClick={()=>beginPerson(id)} className="rounded-full border border-[#ebe2d6] px-3 py-2 hover:bg-[#fff3d5]">✎</button><button type="button" aria-label={`Xóa ${label.toLowerCase()}`} title={`Xóa ${label.toLowerCase()}`} onClick={()=>setModal(`delete-${id}`)} className="rounded-full border border-[#ebe2d6] px-3 py-2 text-red-700 hover:bg-red-50">✕</button></div>)}</div>
          <label className="mt-4 flex items-start gap-3 text-sm text-[#5d554d]"><input type="checkbox" checked={shareWithBusiness} onChange={e=>{setShareWithBusiness(e.target.checked);setSaved(false);persist({shareWithBusiness:e.target.checked});}} className="mt-1 h-5 w-5 accent-[#f8ae38]"/><span>Gợi ý nhu cầu hỗ trợ khi đặt dịch vụ; bạn vẫn xác nhận thông tin muốn chia sẻ trong từng lần đặt chỗ. Không tự động gửi liên hệ khẩn cấp.</span></label>
        </section>
        <section className={cardClass} aria-labelledby="bookings-title"><div className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#fff2d2] text-[#be8615]">▦</span><div><h2 id="bookings-title" className="text-2xl">Đặt chỗ & Chuyến đi</h2><p className="mt-1 text-sm text-[#686057]">Quản lý đặt chỗ và hành trình của bạn.</p></div></div>
          <div className="mt-5 space-y-2"><Link href="/my-booking" className="flex min-h-16 items-center gap-3 rounded-xl border border-[#f0e8dd] p-3 hover:border-[#f8ae38] hover:bg-[#fffaf0]"><span className="rounded-full bg-[#fff2d2] p-3 text-[#c18608]">▣</span><span className="flex-1"><strong className="block">Đặt chỗ của tôi</strong><span className="text-sm text-[#655d53]">Xem và quản lý các đặt chỗ</span></span><span aria-hidden="true">›</span></Link><Link href="/my-trip" className="flex min-h-16 items-center gap-3 rounded-xl border border-[#f0e8dd] p-3 hover:border-[#f8ae38] hover:bg-[#fffaf0]"><span className="rounded-full bg-[#fff2d2] p-3 text-[#c18608]">⌖</span><span className="flex-1"><strong className="block">Chuyến đi của tôi</strong><span className="text-sm text-[#655d53]">Lịch trình đã lưu và sắp tới</span></span><span aria-hidden="true">›</span></Link></div>
          <p className="mt-4 text-xs text-[#756b60]">Danh sách lấy từ luồng đặt chỗ và chuyến đi thực tế của prototype, không tạo dữ liệu đặt chỗ giả.</p>
        </section>
      </div>
      {error && <p role="alert" className="rounded-xl border border-red-300 bg-red-50 p-3 font-semibold text-red-800">{error}</p>}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-[#fff6df] p-4"><p className="max-w-2xl text-sm text-[#625a50]">Thông tin hồ sơ hiện chỉ lưu trên trình duyệt của thiết bị này (DEMO), chưa đồng bộ với tài khoản đăng nhập.</p><div className="flex flex-wrap items-center gap-3"><button type="button" onClick={save} className="btn-primary"><CheckIcon size={18}/> Lưu tất cả thay đổi</button>{saved && <span role="status" className="text-sm font-semibold text-green-800">✓ Đã lưu trên thiết bị</span>}</div></div>
    </div>
    {modal === "contact" && <Modal title="Chỉnh sửa thông tin cá nhân" onClose={()=>{setModal("");setError("");}} wide><form onSubmit={submitEditContact}><div className="grid gap-4 sm:grid-cols-2"><Field title="Họ và tên"><input className={inputClass} autoComplete="name" maxLength={120} value={editContact.name} onChange={e=>setEditContact(c=>({...c,name:e.target.value}))} placeholder="Nhập họ và tên"/></Field><Field title="Số điện thoại"><input className={inputClass} autoComplete="tel" type="tel" maxLength={30} value={editContact.phone} onChange={e=>setEditContact(c=>({...c,phone:e.target.value}))} placeholder="Nhập số điện thoại"/></Field><Field title="Email"><input className={inputClass} type="email" autoComplete="email" value={editContact.email} onChange={e=>setEditContact(c=>({...c,email:e.target.value}))} placeholder="Nhập email"/></Field><Field title="Ngày sinh (không bắt buộc)"><input className={inputClass} type="date" min="1900-01-01" max={maxDob} value={editContact.birthDate} onChange={e=>setEditContact(c=>({...c,birthDate:e.target.value}))}/></Field><Field title="Giới tính"><select className={inputClass} value={editContact.gender || ""} onChange={e=>setEditContact(c=>({...c,gender:e.target.value}))}><option value="">Không cung cấp</option><option value="Nữ">Nữ</option><option value="Nam">Nam</option><option value="Khác">Khác</option></select></Field><Field title="Địa chỉ / khu vực lưu trú"><input className={inputClass} value={editContact.address} onChange={e=>setEditContact(c=>({...c,address:e.target.value}))} placeholder="Ví dụ: Hà Nội" maxLength={120}/></Field></div><p className="mt-3 text-xs text-[#625b54]">Độ tuổi được tính tự động từ ngày sinh. Bạn có thể để trống ngày sinh.</p>{error && <p role="alert" className="mt-3 text-sm font-semibold text-red-700">{error}</p>}<div className="mt-6 flex justify-end gap-3"><button type="button" onClick={()=>{setModal("");setError("");}} className="btn-ghost">Hủy</button><button type="submit" className="btn-primary">Lưu thay đổi</button></div></form></Modal>}
    {modal === "support" && <Modal title="Thêm tùy chọn hỗ trợ" onClose={()=>setModal("")} wide><p className="mb-4 text-sm text-[#655c51]">Bật các tiện ích phù hợp với bạn. Một số mục là yêu cầu trợ giúp khi đặt dịch vụ, không có nghĩa tất cả địa điểm đã cung cấp tiện ích đó.</p><div className="grid gap-4 sm:grid-cols-2">{GROUPS.map(g=><fieldset key={g.title} className="rounded-xl border border-[#eee2d0] p-4"><legend className="px-2 font-bold">{g.title}</legend><div className="space-y-2">{g.items.map(([key,label])=><label key={key} className="flex cursor-pointer items-center gap-3 rounded-lg p-2 text-sm hover:bg-[#fff8e8]"><input type="checkbox" checked={!!extraPrefs[key]} onChange={e=>setExtraPrefs(p=>({...p,[key]:e.target.checked}))} className="h-5 w-5 shrink-0 accent-[#f8ae38]"/>{label}</label>)}</div></fieldset>)}</div><div className="mt-6 flex justify-end gap-3"><button type="button" className="btn-ghost" onClick={()=>setModal("")}>Hủy</button><button type="button" className="btn-primary" onClick={()=>{setPrefs(extraPrefs);persist({prefs:extraPrefs});setModal("");}}>Áp dụng tùy chọn</button></div></Modal>}
    {(modal === "companion" || modal === "emergency") && <Modal title={modal === "companion" ? "Chỉnh sửa người đồng hành" : "Chỉnh sửa liên hệ khẩn cấp"} onClose={()=>setModal("")}><form onSubmit={savePerson} className="space-y-4"><Field title="Họ và tên"><input className={inputClass} value={editPerson.name} onChange={e=>setEditPerson(p=>({...p,name:e.target.value}))} maxLength={120} placeholder="Nhập họ và tên"/></Field><Field title="Số điện thoại"><input className={inputClass} type="tel" value={editPerson.phone} onChange={e=>setEditPerson(p=>({...p,phone:e.target.value}))} maxLength={30} placeholder="Nhập số điện thoại"/></Field><p className="text-xs text-[#665d52]">Thông tin này lưu trên thiết bị và không tự động chia sẻ với đối tác.</p><div className="flex justify-end gap-3"><button type="button" className="btn-ghost" onClick={()=>setModal("")}>Hủy</button><button type="submit" className="btn-primary">Lưu thay đổi</button></div></form></Modal>}
    {(modal === "delete-companion" || modal === "delete-emergency") && <Modal title="Xác nhận xóa thông tin" onClose={()=>setModal("")}><p>Bạn có chắc muốn xóa {modal === "delete-companion" ? "người đồng hành" : "liên hệ khẩn cấp"} khỏi hồ sơ này?</p><div className="mt-6 flex justify-end gap-3"><button type="button" className="btn-ghost" onClick={()=>setModal("")}>Giữ lại</button><button type="button" onClick={()=>removePerson(modal === "delete-companion" ? "companion" : "emergency")} className="btn-primary">Xác nhận xóa</button></div></Modal>}
  </div>;
}
