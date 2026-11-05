import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
const header = await readFile(new URL('../components/Header.jsx', import.meta.url),'utf8');

test('V30 Header bell appears before user avatar and menu opens from avatar', () => {
  assert.ok(header.indexOf('href="/notifications"') < header.indexOf('aria-label="Tài khoản của tôi"'));
  assert.match(header, /aria-expanded=\{account\}/);
  assert.match(header, /aria-controls="we-account-dropdown"/);
  assert.match(header, /aria-haspopup="true"/);
  assert.match(header, /setAccount\(!account\)/);
  assert.match(header, /event\.key === "Escape"/);
});

test('V30 user dropdown is for customers only; Partner and internal login are separate', async () => {
  for(const p of ["/login","/profile","/my-booking","/my-trip","/settings"]) {
    assert.ok(header.includes(`href="${p}"`) || header.includes(`"${p}"`),p);
  }
  assert.doesNotMatch(header, /href="\/partner\/login"/);
  assert.doesNotMatch(header, /href="\/internal\/login"/);
  assert.doesNotMatch(header, /href="\/admin"/);
  assert.doesNotMatch(header, /Quản trị Admin/);
  assert.match(header, /fetch\("\/api\/auth\/session"/);
  assert.match(header, /fetch\("\/api\/auth\/logout"/);
  assert.match(header, /guest/);
  assert.match(header, /Đăng nhập khách hàng/);
  assert.doesNotMatch(header, /\{label:"Đối tác"/); // Đã chốt cổng đối tác chỉ ở Footer
  const loginForm=await readFile(new URL('../components/LoginForm.jsx', import.meta.url),'utf8');
  const customerLogin=await readFile(new URL('../app/login/page.jsx', import.meta.url),'utf8');
  assert.match(customerLogin, /portal="traveler"/);
  assert.match(loginForm, /portal === "traveler" \? \["traveler"\]/);
  assert.match(loginForm, /body\.role !== "traveler"/);
  for(const file of ['../app/login/page.jsx','../app/partner/login/page.jsx','../app/internal/login/page.jsx','../app/notifications/page.jsx']) {
    const content=await readFile(new URL(file,import.meta.url),'utf8');
    assert.ok(content.length>50,`${file} missing`);
  }
});

test('V30 service menu uses real category and ride booking routes', async()=>{
  assert.match(header, /Tour & Trải nghiệm","\/explore\?cat=activity/);
  assert.match(header, /Di chuyển","\/explore\?cat=transport/);
});


test('V30 bell reads notifications for the current role rather than traveler-only', async () => {
 const page=await readFile(new URL('../app/notifications/page.jsx',import.meta.url),'utf8');
 const api=await readFile(new URL('../app/api/notifications/route.js',import.meta.url),'utf8');
 assert.match(page,/api\.listNotifications\(\)/);
 assert.match(api,/\["traveler","business","guide","admin","advisor"\]/);
});


test('Partner links in the public footer resolve to the three current partner portals', async () => {
  const footer = await readFile(new URL('../components/Footer.jsx', import.meta.url),'utf8');
  for (const route of ['/partner']) {
    assert.ok(footer.includes(`href="${route}"`), `Footer missing ${route}`);
  }
  // Ba vai trò tiếp tục được điều hướng từ /partner, tránh trùng cổng ở footer.
  const hub=await readFile(new URL('../app/partner/page.jsx',import.meta.url),'utf8');
  for (const route of ['/guide','/volunteer','/business']) assert.ok(hub.includes(route),route);
  assert.doesNotMatch(footer, /href="\/partners\/(guide|business)"/);
  assert.doesNotMatch(footer, /href="\/admin"/);
});
