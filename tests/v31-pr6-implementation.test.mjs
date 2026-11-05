import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile, stat} from 'node:fs/promises';

const read = (path) => readFile(new URL(path, import.meta.url), 'utf8');

test('V31: Admin portal is absent from every public Header navigation surface', async () => {
  const header = await read('../components/Header.jsx');
  assert.doesNotMatch(header, /href=["']\/admin(?:["'?#]|$)/);
  assert.doesNotMatch(header, /Quản trị Admin|Admin Portal|Admin Demo/);
  assert.doesNotMatch(header, /requiredRole:\s*["']admin["']/);
  assert.doesNotMatch(header, /admin:\s*["']\/admin/);
  assert.doesNotMatch(header, /session\.role!==["']admin["']/);
  assert.match(header, /const nav =/);
  assert.match(header, /id="we-mobile-nav"/);
  assert.match(header, /aria-controls="we-mobile-nav"/);
});

test('V31: public Footer and Header never sign in to Admin; portal remains accessible separately', async () => {
  const header = await read('../components/Header.jsx');
  const footer = await read('../components/Footer.jsx');
  assert.doesNotMatch(header, /href=["']\/admin/);
  assert.doesNotMatch(footer, /href=["']\/admin["']/);
  assert.doesNotMatch(footer, /Cổng Quản trị Admin|Admin Demo|Admin Portal/);
  assert.doesNotMatch(footer, /requiredRole: "admin"/);
  const admin = await read('../app/admin/layout.jsx');
  assert.match(admin, /Cổng Quản trị Hệ thống/);
  for (const route of ['/partner']) {
    assert.ok(footer.includes(`href="${route}"`), `Footer missing ${route}`);
  }
  const partner = await read('../app/partner/page.jsx');
  for (const route of ['/business','/guide','/volunteer']) assert.ok(partner.includes(route), route);
});

test('V31: optimized WebP illustrations are referenced by destination and blog data', async () => {
  const destinations = await read('../data/destinations.js');
  const blogs = await read('../data/oldQuarterBlogs.js');
  assert.match(destinations, /hoang-thanh-thang-long-ai\.webp/);
  for (const name of [
    'nha-co-87-ma-may-ai',
    'cho-dong-xuan-ai',
    'o-quan-chuong-ai',
    'pho-hang-ma-ai',
  ]) {
    assert.ok(blogs.includes(`${name}.webp`), `Blog data does not reference ${name}.webp`);
  }
  for (const name of [
    'nha-co-87-ma-may-ai',
    'cho-dong-xuan-ai',
    'o-quan-chuong-ai',
    'pho-hang-ma-ai',
    'hoang-thanh-thang-long-ai',
  ]) {
    const asset = new URL(`../public/assets/images/${name}.webp`, import.meta.url);
    const info = await stat(asset);
    assert.ok(info.size > 0, `Missing or empty optimized asset: ${name}.webp`);
  }
});
