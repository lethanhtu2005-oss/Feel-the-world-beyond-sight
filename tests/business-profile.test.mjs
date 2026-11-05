import test from "node:test";
import assert from "node:assert/strict";
import { cleanProfile, defaultProfile, FACILITIES } from "../lib/businessProfile.js";

const base = defaultProfile({ name: "Cà phê Giảng", type: "Cafe", area: "Hoàn Kiếm" });

test("hồ sơ mặc định có đủ 4 hạng mục, chưa xác minh", () => {
  assert.equal(base.facilities.length, FACILITIES.length);
  assert.ok(base.facilities.every(f => f.status === "unverified"));
});
test("không cho tự đặt trạng thái verified", () => {
  const { value } = cleanProfile({ facilities: [{ key: "entrance", detail: "Cửa rộng 90cm", status: "verified" }] }, base);
  assert.equal(value.facilities[0].status, "unverified");
});
test("khai báo có nội dung được ghi là declared; thiếu nội dung thì không", () => {
  const { value } = cleanProfile({ facilities: [{ key: "menu", detail: "Có Braille", status: "declared" }, { key: "staff", detail: "", status: "declared" }] }, base);
  assert.equal(value.facilities.find(f => f.key === "menu").status, "declared");
  assert.equal(value.facilities.find(f => f.key === "staff").status, "unverified");
});
test("làm sạch thẻ HTML, từ chối tên rỗng và SĐT sai", () => {
  assert.ok(!cleanProfile({ desc: "<script>x</script>" }, base).value.desc.includes("<"));
  assert.ok(cleanProfile({ name: "  " }, base).error);
  assert.ok(cleanProfile({ phone: "abc!!" }, base).error);
  assert.ok(cleanProfile(null, base).error);
});
test("chỉ nhận bài tập huấn hợp lệ", () => {
  assert.deepEqual(cleanProfile({ training: ["greet", "bogus"] }, base).value.training, ["greet"]);
});

import { readFileSync } from "node:fs";
test("Đặt chỗ của tôi: khách có hủy, đánh giá, đặt lại và theo dõi tiến trình", () => {
  const s = readFileSync(new URL("../app/my-booking/page.jsx", import.meta.url), "utf8");
  for (const t of ["Hủy đặt chỗ", "Viết đánh giá tiếp cận", "Đặt lại dịch vụ này", "Tiến trình đặt chỗ"]) assert.ok(s.includes(t), t);
});
