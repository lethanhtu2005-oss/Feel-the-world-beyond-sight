import test from "node:test";
import assert from "node:assert/strict";
import { register } from "node:module";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("../", import.meta.url));
register(new URL("./helpers/alias-loader.mjs", import.meta.url), { data: { root } });
delete process.env.WAYECHO_SESSION_SECRET; delete process.env.WAYECHO_USERS; delete process.env.WAYECHO_DEMO_LOGIN;
const { login, demoLogin, authenticate } = await import("../lib/auth.js");
const reqWith = (token) => new Request("https://site.invalid/api/x", { headers: { cookie: `we_session=${token}` } });

test("đăng nhập minh họa: nhập gì cũng vào, kể cả để trống, không cần biến môi trường", async () => {
  for (const [email, pw] of [["", ""], ["abc", "xyz"], ["linh tinh @@", "123"]]) {
    const r = await login(email, pw, "traveler", "src");
    const u = await authenticate(reqWith(r.token));
    assert.equal(u.role, "traveler"); assert.equal(u.demo, true);
  }
});
test("phiên demo không phụ thuộc kho dữ liệu (chạy được trên máy chủ không trạng thái)", async () => {
  const { token } = demoLogin("Minh", "business");
  const u = await authenticate(reqWith(token));
  assert.equal(u.role, "business"); assert.equal(u.businessId, "b1");
  assert.equal((await authenticate(reqWith(demoLogin("Minh", "business").token))).id, u.id);
  assert.equal((await authenticate(reqWith(demoLogin("", "guide").token))).guideId, "g1");
});
test("không cho nâng quyền và có thể tắt bằng WAYECHO_DEMO_LOGIN=0", async () => {
  assert.throws(() => demoLogin("x", "admin", ["traveler"]), { status: 400 });
  const { token } = demoLogin("x", "admin");
  process.env.WAYECHO_DEMO_LOGIN = "0";
  try {
    assert.throws(() => demoLogin("x", "admin"), { status: 403 });
    await assert.rejects(authenticate(reqWith(token)), (e) => [401, 503].includes(e.status));
  } finally { delete process.env.WAYECHO_DEMO_LOGIN; }
});
test("khi đã bật nhận dữ liệu thật (form hợp tác), phiên minh họa không vào được khu nội bộ", () => {
  process.env.WAYECHO_INQUIRIES_ENABLED = "1";
  try {
    assert.throws(() => demoLogin("x", "admin"), { status: 403 });
    assert.throws(() => demoLogin("x", "advisor"), { status: 403 });
    assert.equal(demoLogin("x", "guide").user.role, "guide");
  } finally { delete process.env.WAYECHO_INQUIRIES_ENABLED; }
});
