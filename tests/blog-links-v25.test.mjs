import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const code=readFileSync(path.join(root,'components/BlogServiceSidebar.jsx'),'utf8');
const posts=JSON.parse(readFileSync(path.join(root,'data/newBlogPosts.json'),'utf8'));
const allowed=['/explore','/services/guides','/services/ride-booking','/contact','/destination'];
test('Mỗi thẻ bài viết có đích cụ thể, route hiện hữu',()=>{
 for(const post of posts){
  const block=code.split(`"${post.slug}": {`)[1]?.split('\n  },')[0];
  assert.ok(block,`Missing ${post.slug}`);
  const href=block.match(/href: "([^"]+)"/)?.[1];
  assert.ok(href,`Missing href ${post.slug}`);
  const [route]=href.split('?');assert.ok(allowed.includes(route),`Unexpected route ${route}`);
  if(route==='/explore')assert.ok(existsSync(path.join(root,'app/explore/page.jsx')));
  else if(route==='/destination')assert.ok(existsSync(path.join(root,'app/destination/page.jsx')));
  else assert.ok(existsSync(path.join(root,'app',route.slice(1),'page.jsx')),`Page missing ${route}`);
 }
});
test('Bài viết về điểm đến mở trang địa điểm đúng tên',()=>{
 assert.match(code,/href: "\/destination\?d=ho-guom"/);
 assert.match(code,/href: "\/destination\?d=nha-co-87-ma-may"/);
});
