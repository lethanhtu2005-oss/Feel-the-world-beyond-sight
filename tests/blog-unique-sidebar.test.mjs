import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const posts=JSON.parse(fs.readFileSync(path.join(root,'data/newBlogPosts.json'),'utf8'));
const code=fs.readFileSync(path.join(root,'components/BlogServiceSidebar.jsx'),'utf8');
const cards=[...code.matchAll(/^  "([a-z0-9-]+)": \{/gm)].map(m=>m[1]);
test('10 bai blog co 10 the sidebar rieng',()=>{
 assert.equal(posts.length,10);
 assert.deepEqual(new Set(cards),new Set(posts.map(p=>p.slug)));
});
test('the sidebar co lien ket dich vu va ghi chu minh bach',()=>{
 for(const slug of cards){const section=code.split(`"${slug}": {`)[1].split('\n  },')[0];assert.match(section,/href: "\//);assert.match(section,/note: /);}
 assert.match(code,/data-blog-service-card/);
});
