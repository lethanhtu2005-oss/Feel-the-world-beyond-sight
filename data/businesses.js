// Mỗi dịch vụ có một hộp thư tiếp nhận DEMO độc lập, KHÔNG phải quan hệ đối tác thật.
import { catalog } from "./catalog.js";
export const DEMO_BUSINESS_ID = "b1";

export const businesses = [
  { id: "b1", name: "Khách sạn La Siesta Classic Hàng Bè", type: "Lưu trú", area: "Hà Nội", rep: "Tài khoản demo", verified: false, logo: "/assets/images/cafe-street.jpg", declaration: { blind: "Chưa xác minh", lowVision: "Chưa xác minh", staff: "Chưa xác minh", audio: "Chưa xác minh", braille: "Chưa xác minh", elevator: "Chưa xác minh", stepFree: "Chưa xác minh", checkinAssist: "Chưa xác minh", accessibleRoom: "Chưa xác minh" }, items: ["demo-hotel"] },
  { id: "b2", name: "Business hoạt động — DEMO", type: "Tour & Guide", area: "Hà Nội", rep: "Tài khoản demo", verified: false, logo: "/assets/images/cyclo-street.jpg", declaration: { blind: "Chưa xác minh", lowVision: "Chưa xác minh", staff: "Chưa xác minh", audio: "Chưa xác minh", braille: "Chưa xác minh", elevator: "Không áp dụng", stepFree: "Chưa xác minh", checkinAssist: "Không áp dụng", accessibleRoom: "Không áp dụng" }, items: ["demo-guide-tour"] },
  { id: "b3", name: "Business vận chuyển — DEMO", type: "Transport", area: "Hà Nội", rep: "Tài khoản demo", verified: false, logo: "/assets/images/street-bikes.jpg", declaration: { blind: "Chưa xác minh", lowVision: "Chưa xác minh", staff: "Chưa xác minh", audio: "Không áp dụng", braille: "Không áp dụng", elevator: "Không áp dụng", stepFree: "Chưa xác minh", checkinAssist: "Không áp dụng", accessibleRoom: "Không áp dụng" }, items: ["demo-transport"] },
];

// Một đại diện nhận đơn thử nghiệm cho mỗi mục, không mạo danh nhà cung cấp thực tế.
const CATEGORY_NAMES = { accommodation: "Lưu trú", restaurant: "Ẩm thực", activity: "Tour & trải nghiệm", ticket: "Vé tham quan", transport: "Di chuyển" };
const demoServices = catalog.filter(item => CATEGORY_NAMES[item.cat] && !businesses.some(b => b.items.includes(item.id)));
for (const item of demoServices) {
  businesses.push({
    id: `demo-provider-${item.id}`, name: `Điểm tiếp nhận DEMO · ${item.name}`,
    type: CATEGORY_NAMES[item.cat], area: "Phố cổ Hà Nội", rep: "Bộ phận thử nghiệm WayEcho",
    verified: false, isDemo: true, logo: item.imageFallback || item.image || "/assets/images/old-quarter-street.jpg",
    declaration: { blind: "Chưa xác minh", lowVision: "Chưa xác minh", staff: "Chưa xác minh", audio: "Chưa xác minh", braille: "Chưa xác minh", elevator: "Chưa xác minh", stepFree: "Chưa xác minh", checkinAssist: "Chưa xác minh", accessibleRoom: "Chưa xác minh" },
    items: [item.id],
  });
}
const itemToBiz = {};
businesses.forEach((b) => b.items.forEach((it) => { itemToBiz[it] = b.id; }));
export function getBusiness(id) { return businesses.find((b) => b.id === id) || null; }
export function businessIdForItem(itemId) { return itemToBiz[itemId] || null; }
export function getBusinessForItem(itemId) { return getBusiness(itemToBiz[itemId]); }

// Only data accompanied by a verifiable, service-specific source may be marked verified.
// Demo declarations never pass the verified filter, even if they say "Có".
export function itemA11y(item, { mode = "verified" } = {}) {
  const declaration = item.accessDetails || getBusinessForItem(item.id)?.declaration ||
    (item.cat === "destination" ? item.access : null) || {};
  const keys = ["blind", "lowVision", "staff", "braille", "elevator", "stepFree"];
  const valid = value => ["Có", "Tốt", "Trung bình"].includes(value);
  const evidence = item.accessEvidence || {};
  const verified = item.a11yVerified === true;
  const result = {};
  keys.forEach(key => {
    const hasEvidence = verified && !!evidence[key]?.source && evidence[key]?.verified === true;
    result[key] = mode === "verified" ? (hasEvidence && valid(declaration[key])) : valid(declaration[key]);
  });
  return result;
}

export const A11Y_FILTERS = [
  { key: "blind", label: "Phù hợp người mù (đã xác minh)" },
  { key: "lowVision", label: "Phù hợp nhìn kém (đã xác minh)" },
  { key: "staff", label: "Có nhân viên hỗ trợ (đã xác minh)" },
  { key: "elevator", label: "Có thang máy (đã xác minh)" },
  { key: "stepFree", label: "Lối không bậc (đã xác minh)" },
];
