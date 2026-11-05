// Helper gọi API từ phía client.
async function req(url, opts) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...opts,
  });
  if (typeof window !== "undefined" && res.headers.get("x-wayecho-storage") === "memory") window.__weMem = true;
  if (!res.ok) { const data=await res.json().catch(()=>null); throw new Error(data?.error || `Không xử lý được yêu cầu (${res.status}).`); }
  return res.status === 204 ? null : res.json();
}

// Bản demo trên Vercel lưu dữ liệu trong bộ nhớ tạm của máy chủ (header X-WayEcho-Storage: memory),
// có thể mất khi máy chủ khởi động lại hoặc chuyển sang instance khác. Khi đó trình duyệt giữ thêm
// một bản sao cục bộ của chính người dùng để danh sách đặt chỗ, lưu, chuyến đi không "biến mất".
const MIRROR = "we-demo-mirror";
const mem = () => typeof window !== "undefined" && window.__weMem === true;
function mirrorRead() { try { return JSON.parse(localStorage.getItem(MIRROR) || "{}") || {}; } catch { return {}; } }
function mirrorWrite(all) { try { localStorage.setItem(MIRROR, JSON.stringify(all)); } catch {} }
export function mergeMirror(kind, serverRows, keyOf) {
  if (!mem() || !Array.isArray(serverRows)) return serverRows;
  const local = mirrorRead()[kind] || [];
  const seen = new Set(serverRows.map(keyOf));
  return [...serverRows, ...local.filter((r) => !seen.has(keyOf(r)))];
}
function mirrorAdd(kind, row, keyOf) {
  if (!mem() || !row) return row;
  const all = mirrorRead();
  all[kind] = [...(all[kind] || []).filter((r) => keyOf(r) !== keyOf(row)), row].slice(-100);
  mirrorWrite(all);
  return row;
}
function mirrorDrop(kind, key, keyOf) {
  if (!mem()) return;
  const all = mirrorRead();
  all[kind] = (all[kind] || []).filter((r) => keyOf(r) !== key);
  mirrorWrite(all);
}
function mirrorPatch(kind, key, keyOf, patch) {
  if (!mem()) return;
  const all = mirrorRead();
  all[kind] = (all[kind] || []).map((r) => (keyOf(r) === key ? { ...r, ...patch } : r));
  mirrorWrite(all);
}
const byId = (r) => r.id, byRef = (r) => r.refId;

export const api = {
  listEscrow: () => req("/api/escrow"),
  changeEscrow: (id,action) => req("/api/escrow", {method:"POST", body:JSON.stringify({id,action})}),
  // Bookings
  listBookings: async () => req("/api/bookings"),
  createBooking: async (data) => req("/api/bookings", { method: "POST", body: JSON.stringify(data) }),
  updateBooking: async (id, status) => {
    return req("/api/bookings", { method: "PATCH", body: JSON.stringify({ id, status }) });
  },

  // Saved
  listSaved: async () => mergeMirror("saved", await req("/api/saved"), byRef),
  savePlace: async (data) => mirrorAdd("saved", await req("/api/saved", { method: "POST", body: JSON.stringify(data) }), byRef),
  unsavePlace: async (refId) => { try { const r = await req(`/api/saved?refId=${encodeURIComponent(refId)}`, { method: "DELETE" }); mirrorDrop("saved", refId, byRef); return r; } catch (e) { if (mem()) { mirrorDrop("saved", refId, byRef); return { ok: true }; } throw e; } },

  // Trip planner
  listTrip: async () => mergeMirror("trip", await req("/api/trip"), byRef),
  addToTrip: async (data) => mirrorAdd("trip", await req("/api/trip", { method: "POST", body: JSON.stringify(data) }), byRef),
  removeFromTrip: async (refId) => { try { const r = await req(`/api/trip?refId=${encodeURIComponent(refId)}`, { method: "DELETE" }); mirrorDrop("trip", refId, byRef); return r; } catch (e) { if (mem()) { mirrorDrop("trip", refId, byRef); return { ok: true }; } throw e; } },

  // Reviews
  listReviews: (place) => req(`/api/reviews${place ? `?place=${encodeURIComponent(place)}` : ""}`),
  createReview: (data) => req("/api/reviews", { method: "POST", body: JSON.stringify(data) }),

  // Báo thông tin tiếp cận chưa đúng (RV02)
  createReport: (data) => req("/api/reports", { method: "POST", body: JSON.stringify(data) }),
  listReports: () => req("/api/reports"),

  // Business-scoped
  listBusinessBookings: (bizId) => req(`/api/bookings?business=${encodeURIComponent(bizId)}`),
  listRequests: (bizId) => req(`/api/requests${bizId ? `?business=${encodeURIComponent(bizId)}` : ""}`),
  updateRequest: (id, status, note) => req("/api/requests", { method: "PATCH", body: JSON.stringify({ id, status, note }) }),

  // Hồ sơ cơ sở của Business (lưu ở server; bản sao cục bộ chỉ để không mất khi máy chủ demo khởi động lại)
  getBusinessProfile: async (bizId) => {
    const data = await req(`/api/business-profile${bizId ? `?business=${encodeURIComponent(bizId)}` : ""}`);
    if (!data.saved) { try { const local = JSON.parse(localStorage.getItem(`we-biz-profile-${data.businessId}`) || "null"); if (local) return { ...data, profile: { ...data.profile, ...local }, local: true }; } catch {} }
    return data;
  },
  saveBusinessProfile: async (profile) => {
    const data = await req("/api/business-profile", { method: "PUT", body: JSON.stringify(profile) });
    try { localStorage.setItem(`we-biz-profile-${data.businessId}`, JSON.stringify(data.profile)); } catch {}
    return data;
  },

  // Notifications
  listNotifications: ({ role, business } = {}) => {
    const qs = new URLSearchParams();
    if (role) qs.set("role", role);
    if (business) qs.set("business", business);
    const s = qs.toString();
    return req(`/api/notifications${s ? `?${s}` : ""}`);
  },
};
