"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useA11y } from "@/components/A11yProvider";
import ThemeControl from "@/components/ThemeControl";
import { CheckIcon } from "@/components/Icons";

const ROLE_LABELS = { traveler: "Khách hàng", guide: "Guide / Tình nguyện viên", business: "Doanh nghiệp đối tác", admin: "Quản trị viên", advisor: "Tư vấn viên" };
const card = "rounded-[18px] border border-line bg-white p-6 shadow-card hc-surface hc-border";

export default function SettingsPage() {
  const { speak, contrast, largeText, setContrastEnabled, setLargeTextEnabled, speechRate, setSpeechRate } = useA11y();
  const [session, setSession] = useState(undefined);
  const [displayName, setDisplayName] = useState("");
  const [notify, setNotify] = useState(true);
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    try { setDisplayName(localStorage.getItem("we-display-name") || ""); setNotify(localStorage.getItem("we-notify") !== "0"); } catch (_) {}
    fetch("/api/auth/session", { cache: "no-store" }).then((r) => (r.ok ? r.json() : null)).then(setSession).catch(() => setSession(null));
  }, []);

  function save() {
    try { localStorage.setItem("we-display-name", displayName.trim()); localStorage.setItem("we-notify", notify ? "1" : "0"); } catch (_) {}
    setSaved(true); speak("Đã lưu cài đặt tài khoản trên thiết bị.");
  }
  async function logout() {
    setBusy(true); setError("");
    try { const r = await fetch("/api/auth/logout", { method: "POST" }); if (!r.ok) throw Error(); window.location.assign("/"); }
    catch { setError("Chưa đăng xuất được. Hãy thử lại."); setBusy(false); }
  }
  const authenticated = Boolean(session && !session.guest);

  return (
    <div className="container-page py-10">
      <h1 className="text-4xl sm:text-5xl">Cài đặt tài khoản</h1>
      <p className="hc-muted mt-3 max-w-3xl text-lg text-ink-soft">Thông tin đăng nhập và tùy chọn cá nhân. Bản demo lưu tùy chọn trên thiết bị này.</p>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section aria-labelledby="st-login" className={card}>
          <h2 id="st-login" className="text-2xl">Thông tin đăng nhập</h2>
          {session === undefined ? <p role="status" className="mt-3">Đang kiểm tra phiên…</p> : authenticated ? <dl className="mt-4 space-y-3"><div><dt className="text-sm text-ink-soft hc-muted">Vai trò</dt><dd className="font-semibold">{ROLE_LABELS[session.role] || session.role}</dd></div><div><dt className="text-sm text-ink-soft hc-muted">Trạng thái</dt><dd className="font-semibold">Đang đăng nhập{session.demo ? " (minh họa)" : ""}</dd></div></dl> : <><p className="mt-3">Bạn đang dùng phiên khách. Đăng nhập (minh họa) để đồng bộ đặt chỗ và chuyến đi.</p><Link href="/login?next=/settings" className="btn-primary mt-4">Đăng nhập khách hàng</Link></>}
          <label htmlFor="st-name" className="mt-5 block font-semibold">Tên hiển thị</label>
          <input id="st-name" value={displayName} maxLength={60} onChange={(e) => { setDisplayName(e.target.value); setSaved(false); }} className="mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 text-lg hc-surface hc-border" />
          <p className="hc-muted mt-2 text-sm text-ink-soft">Thông tin liên hệ chi tiết chỉnh tại <Link href="/profile" className="underline">Hồ sơ cá nhân</Link>.</p>
        </section>
        <section aria-labelledby="st-pref" className={card}>
          <h2 id="st-pref" className="text-2xl">Tùy chọn cá nhân</h2>
          <div className="mt-4"><ThemeControl /></div>
          <label htmlFor="st-rate" className="mt-5 block font-semibold">Tốc độ đọc: {speechRate.toFixed(1)}×</label>
          <input id="st-rate" type="range" min="0.6" max="1.6" step="0.1" value={speechRate} onChange={(e) => setSpeechRate(Number(e.target.value))} className="mt-2 w-full accent-[#f8ae38]" />
          <div className="mt-4 space-y-3">
            <label className="flex min-h-[48px] items-center justify-between rounded-xl border border-line px-3 hc-border"><span className="font-semibold">Tương phản cao</span><input type="checkbox" checked={contrast} onChange={(e) => setContrastEnabled(e.target.checked)} className="h-5 w-5 accent-[#f8ae38]" /></label>
            <label className="flex min-h-[48px] items-center justify-between rounded-xl border border-line px-3 hc-border"><span className="font-semibold">Chữ lớn</span><input type="checkbox" checked={largeText} onChange={(e) => setLargeTextEnabled(e.target.checked)} className="h-5 w-5 accent-[#f8ae38]" /></label>
            <label className="flex min-h-[48px] items-center justify-between rounded-xl border border-line px-3 hc-border"><span className="font-semibold">Nhận thông báo đặt chỗ</span><input type="checkbox" checked={notify} onChange={(e) => { setNotify(e.target.checked); setSaved(false); }} className="h-5 w-5 accent-[#f8ae38]" /></label>
          </div>
        </section>
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button type="button" onClick={save} className="btn-primary text-lg"><CheckIcon size={20} /> Lưu cài đặt</button>
        {authenticated && <button type="button" onClick={logout} disabled={busy} className="btn-ghost hc-border disabled:opacity-60">{busy ? "Đang đăng xuất…" : "Đăng xuất"}</button>}
        {saved && <span role="status" className="font-semibold text-green-800">Đã lưu trên thiết bị.</span>}
        {error && <p role="alert" className="text-red-800">{error}</p>}
      </div>
    </div>
  );
}
