import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('blog article connects to service discovery sidebars',()=>{assert.match(read('app/articles/[slug]/page.jsx'),/BlogServiceSidebar/);assert.match(read('components/BlogServiceSidebar.jsx'),/explore\?cat=accommodation/);assert.match(read('components/BlogServiceSidebar.jsx'),/explore\?cat=restaurant/);assert.match(read('components/BlogServiceSidebar.jsx'),/services\/ride-booking/);});
test('ride handoff uses official provider websites, no pretend confirmed booking',()=>{const s=read('app/services/ride-booking/page.jsx');assert.match(s,/https:\/\/www\.grab\.com\/vn\/transport\//);assert.match(s,/https:\/\/be\.com\.vn\//);assert.match(s,/không đồng nghĩa đặt xe thành công/);assert.match(s,/rel="noopener noreferrer"/);});
test('ride handoff only copies trip details by deliberate user action',()=>{const s=read('app/services/ride-booking/page.jsx');assert.match(s,/onClick=\{async\(\)=>/);assert.match(s,/navigator\.clipboard\.writeText/);assert.doesNotMatch(s,/navigator\.geolocation/);});
