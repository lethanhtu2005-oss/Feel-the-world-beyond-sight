import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const posts=JSON.parse(fs.readFileSync(path.join(root,'data/seoOldQuarterPosts.json'),'utf8'));
test('20 original SEO posts are individually present',()=>{
 assert.equal(posts.length,20);
 assert.equal(new Set(posts.map(p=>p.slug)).size,20);
 for(const p of posts){assert.ok(p.title&&p.summary);assert.ok(p.sections.length===3);assert.ok(p.sections.every(s=>s.paragraphs.length));assert.ok(p.imageSource.startsWith('https://commons.wikimedia.org/wiki/File:'));assert.ok(p.imageAlt.length>10);}
});
test('Existing article flow lists and serves 20 new posts',()=>{
 const list=fs.readFileSync(path.join(root,'app/articles/page.jsx'),'utf8');
 const detail=fs.readFileSync(path.join(root,'app/articles/[slug]/page.jsx'),'utf8');
 assert.match(list,/seoOldQuarterPosts/);assert.match(list,/postsInSection/);
 assert.match(detail,/getSeoOldQuarterPost\(slug\)/);
 assert.match(detail,/imageSource/);
});
