"use client";
import { useState } from "react";
import { safeNext } from "@/lib/redirect";

// Một nút duy nhất cho mỗi nhóm đối tác: tạo phiên demo đúng vai trò rồi chuyển thẳng vào cổng làm việc.
export default function PartnerEnter({ role, href, label, name = "", color = "#f8ae38", demoBusinessId = null }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function enter() {
    setBusy(true); setError("");
    try {
      const res = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: name, password: "", requiredRole: role, allowedRoles: [role], ...(role === "business" ? { demoBusinessId } : {}) }) });
      const body = await res.json();
      if (!res.ok) throw Error(body.error);
      const next = new URLSearchParams(window.location.search).get("next");
      const base = href.split("#")[0];
      window.location.assign(next && next.startsWith(base) ? safeNext(next, href) : href);
    } catch (e) { setError(e.message || "Không vào được cổng. Hãy thử lại."); setBusy(false); }
  }
  return <>
    <button type="button" onClick={enter} disabled={busy} className="flex min-h-[48px] w-full items-center justify-center rounded-xl px-4 py-3 text-center text-sm font-bold text-[#212529] shadow-sm transition-all hover:brightness-95 focus:ring-4 focus:ring-amber-200 disabled:opacity-60" style={{ backgroundColor: color }}>{busy ? "Đang mở cổng…" : label}</button>
    {error && <p role="alert" className="mt-2 text-sm text-red-800">{error}</p>}
  </>;
}
