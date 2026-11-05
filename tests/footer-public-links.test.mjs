import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
const read = (path) => readFile(new URL(path, import.meta.url),'utf8');

test('Public WayEcho footer uses project/about/mission links, never auto-login as admin', async () => {
  const footer = await read('../components/Footer.jsx');
  for (const link of ['/','/about','/mission','/partner','/help'])
    assert.ok(footer.includes(`href="${link}"`), `Missing ${link}`);
  assert.doesNotMatch(footer,/href="\/admin"|requiredRole: "admin"|Cổng Quản trị Admin/);
  const home = await read('../components/Header.jsx');
  assert.match(home,/isInternalPortalPath\(pathname\)/);
  assert.match(footer,/isInternalPortalPath\(pathname\)/);
});

test('Public project/about pages link to the homepage and are independent of admin portal', async () => {
  const about = await read('../app/about/page.jsx');
  const mission = await read('../app/mission/page.jsx');
  const projectLayout = await read('../components/AboutWayEchoPage.jsx');
  assert.match(projectLayout,/href="\/"/);
  assert.doesNotMatch(about+mission+projectLayout,/href="\/admin"/);
});
