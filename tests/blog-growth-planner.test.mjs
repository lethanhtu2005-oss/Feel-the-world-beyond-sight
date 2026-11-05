import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const read=p=>readFileSync(path.join(root,p),'utf8');
test('blog all article layouts have contextual, transparent service paths',()=>{
 const page=read('app/articles/[slug]/page.jsx');
 assert.equal((page.match(/<BlogServiceSidebar article=\{/g)||[]).length,3);
 const sidebar=read('components/BlogServiceSidebar.jsx');
 assert.match(sidebar,/Nội dung tài trợ/);
 assert.match(sidebar,/không phải quảng cáo được trả phí/);
 assert.doesNotMatch(sidebar,/icon: "♫"/);
});
test('blog category landing offers optional discovery rather than forced ads',()=>{
 const page=read('app/articles/page.jsx');
 assert.match(page,/Gợi ý tiếp tục hành trình/);
 for(const dest of ['/destination','/explore','/services/guides'])assert.ok(page.includes(`href="${dest}"`));
});
test('admin financial scenario is labeled hypothetical and includes AI, paid media, operational costs',()=>{
 const page=read('components/AdminOperations.jsx');
 assert.match(page,/<AdminGrowthPlanner\s*\/>/);
 const planner=read('components/AdminGrowthPlanner.jsx');
 for(const phrase of ['Mô phỏng nội bộ','AI tháng này','Ngân sách quảng cáo trả phí','Chi phí & ngân sách','Kết quả vận hành giả định','CPA quảng cáo'])assert.ok(planner.includes(phrase),phrase);
 assert.ok(existsSync(path.join(root,'WAYECHO_GROWTH_SEO_BLOG_ADS.md')));
});
