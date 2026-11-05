"use client";
import { useState } from "react";
import { safeNext } from "@/lib/redirect";

const ROLE_INFO = {
  traveler: { label: "Khách hàng", icon: "👤", home: "/profile" },
  guide: { label: "Hướng dẫn viên", icon: "🧭", home: "/guide" },
  business: { label: "Doanh nghiệp", icon: "🏨", home: "/business" },
  admin: { label: "Quản trị viên", icon: "⚙️", home: "/admin" },
  advisor: { label: "Tư vấn viên", icon: "🎧", home: "/admin/consultation" },
};

export default function LoginForm({ portal = "all" }) {
  const roles = portal === "traveler" ? ["traveler"] : portal === "partner" ? ["guide","business"] : portal === "internal" ? ["admin","advisor"] : ["traveler", "guide", "business", "admin", "advisor"];
  const [role, setRole] = useState(roles[0]);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setBusy(true); setError("");
    try {
      const res = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: name, password: "", requiredRole: role, allowedRoles: roles }) });
      const body = await res.json();
      if (!res.ok) throw Error(body.error);
      if (portal === "traveler" && body.role !== "traveler") throw Error("Đây không phải vai trò Khách hàng.");
      window.location.assign(safeNext(new URLSearchParams(window.location.search).get("next"), ROLE_INFO[body.role]?.home || "/"));
    } catch (e) { setError(e.message || "Không vào được bản demo. Hãy thử lại."); } finally { setBusy(false); }
  }

  return (
    <form onSubmit={submit} className="mt-6 space-y-5">
      {portal === "internal" && (
        <button
          type="button"
          onClick={async () => {
            setBusy(true); setError("");
            try {
              const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: "Admin Demo", password: "", requiredRole: "admin", allowedRoles: ["admin", "advisor"] })
              });
              const body = await res.json();
              if (!res.ok) throw Error(body.error);
              window.location.assign("/admin");
            } catch (e) { setError(e.message || "Không vào được bản demo. Hãy thử lại."); } finally { setBusy(false); }
          }}
          disabled={busy}
          className="w-full min-h-[48px] rounded-xl bg-[#f8ae38] font-bold text-[#212529] hover:bg-[#e09f2f] transition-all shadow-sm flex items-center justify-center gap-2"
        >
          <span>⚙️ Vào ngay Cổng Quản trị Admin (DEMO)</span>
        </button>
      )}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-[#7a4c00] hc-surface hc-border">
        <p className="font-bold">Đăng nhập minh họa (DEMO)</p>
        <p className="mt-1">Không cần tài khoản hay mật khẩu. Bạn có thể nhập tên bất kỳ hoặc để trống rồi bấm vào.</p>
      </div>
      {roles.length > 1 && (
        <fieldset>
          <legend className="font-semibold">Bạn vào với vai trò</legend>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {roles.map((r) => (
              <label key={r} className={`flex min-h-[48px] cursor-pointer items-center gap-2 rounded-xl border-2 px-3 font-semibold hc-surface hc-border ${role === r ? "border-[#ef6d28] bg-[#fff2e9] text-[#8a3510]" : "border-line bg-white"}`}>
                <input type="radio" name="role" value={r} checked={role === r} onChange={() => setRole(r)} className="h-5 w-5" />
                <span aria-hidden="true">{ROLE_INFO[r].icon}</span> {ROLE_INFO[r].label}
              </label>
            ))}
          </div>
        </fieldset>
      )}
      <div>
        <label htmlFor="login-name" className="block font-semibold">Tên hiển thị (không bắt buộc)</label>
        <input id="login-name" name="name" value={name} onChange={(e) => setName(e.target.value)} maxLength={60} autoComplete="nickname" placeholder="Nhập gì cũng được, hoặc để trống" className="mt-2 min-h-[48px] w-full rounded-xl border border-line p-3 hc-surface hc-border" />
      </div>
      {error && <p role="alert" className="text-red-800">{error}</p>}
      <button className="btn-primary w-full" disabled={busy}>{busy ? "Đang vào…" : `Vào bản demo${roles.length === 1 ? ` (${ROLE_INFO[roles[0]].label})` : ""}`}</button>
    </form>
  );
}
