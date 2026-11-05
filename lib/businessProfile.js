// Hồ sơ cơ sở của Business (DEMO): thông tin liên hệ, trạng thái đón khách, khai báo tiếp cận và tiến độ tập huấn.
// Thuần JS để dùng được cả ở server (API) và client (form). Khai báo của Business KHÔNG tự thành "đã xác minh":
// chỉ quản trị viên WayEcho mới xác minh, nên trạng thái hợp lệ ở đây chỉ có "declared" hoặc "unverified".
export const FACILITIES = [
  { key: "entrance", title: "Lối vào & cửa chính", hint: "Bậc thềm, độ rộng cửa, dốc, bề mặt chống trượt" },
  { key: "menu", title: "Thực đơn & thông tin đa hình thức", hint: "Chữ nổi Braille, chữ lớn, mã QR đọc giọng nói" },
  { key: "seating", title: "Chỗ ngồi & ánh sáng", hint: "Lối đi giữa bàn, bàn dành riêng, ánh sáng, chống chói" },
  { key: "staff", title: "Nhân sự phục vụ", hint: "Số nhân viên đã tập huấn hỗ trợ khách khiếm thị" },
];
export const FACILITY_STATUS = { declared: "Cơ sở tự khai báo", unverified: "Chưa khai báo / chưa xác minh" };
export const TRAINING = [
  { id: "greet", title: "Chào hỏi & tiếp cận nhẹ nhàng", note: "Xưng tên trước khi chạm, hỏi ý khách trước khi dẫn, không kéo gậy trắng." },
  { id: "clock", title: "Quy tắc mặt đồng hồ", note: "Mô tả vị trí đồ vật theo giờ: ly nước hướng 12 giờ, đĩa bánh hướng 3 giờ." },
  { id: "pay", title: "Thanh toán an toàn", note: "Đọc to số tiền, xác nhận bằng giọng nói, đưa lại hóa đơn và tiền thừa vào tay khách." },
];
const text = (v, max) => (v === undefined || v === null ? "" : String(v).replace(/[\u0000-\u001f<>]/g, " ").trim().slice(0, max));

export function defaultProfile(biz) {
  return {
    name: biz?.name || "", type: biz?.type || "", area: biz?.area || "", address: "", phone: "", hours: "",
    desc: "Hồ sơ doanh nghiệp demo. Cơ sở thật phải cung cấp thông tin xác minh và chỉ khai báo tiện ích tiếp cận có căn cứ.",
    open: true,
    facilities: FACILITIES.map(f => ({ key: f.key, detail: "", status: "unverified" })),
    training: [],
    updatedAt: null,
  };
}
// Trả về { value } hoặc { error } để route trả 400 với thông báo tiếng Việt.
export function cleanProfile(input, base) {
  if (!input || typeof input !== "object" || Array.isArray(input)) return { error: "Dữ liệu hồ sơ không hợp lệ." };
  const out = { ...defaultProfile(), ...(base || {}) };
  for (const [k, max] of [["name", 80], ["type", 40], ["area", 80], ["address", 160], ["phone", 30], ["hours", 60], ["desc", 600]]) {
    if (input[k] !== undefined) out[k] = text(input[k], max);
  }
  if (!out.name) return { error: "Tên doanh nghiệp không được để trống." };
  if (out.phone && !/^[0-9+().\-\s]{6,30}$/.test(out.phone)) return { error: "Số điện thoại chỉ gồm chữ số và + ( ) . -" };
  if (input.open !== undefined) out.open = input.open === true;
  if (input.facilities !== undefined) {
    if (!Array.isArray(input.facilities)) return { error: "Danh sách khai báo tiếp cận không hợp lệ." };
    out.facilities = FACILITIES.map(f => {
      const got = input.facilities.find(x => x?.key === f.key) || {};
      const detail = text(got.detail, 300);
      return { key: f.key, detail, status: detail && got.status === "declared" ? "declared" : "unverified" };
    });
  }
  if (input.training !== undefined) {
    if (!Array.isArray(input.training)) return { error: "Tiến độ tập huấn không hợp lệ." };
    out.training = TRAINING.map(t => t.id).filter(id => input.training.includes(id));
  }
  return { value: out };
}
