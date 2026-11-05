import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
const base = process.cwd();
const src = (p) => readFileSync(join(base,p),'utf8');
test('Footer discovery links are relevant and audio guide is absent', () => {
 const footer = src('components/Footer.jsx');
 for (const href of ['/destination','/explore','/explore?cat=activity','/explore?cat=restaurant','/articles','/explore?cat=transport','/services/ride-booking','/faq']) assert.ok(footer.includes(`href="${href}"`),href);
 assert.doesNotMatch(footer,/audio[ -]?guide/i);
 assert.match(footer,/footer-heading mb-5 text-lg sm:text-xl/);
});
test('No customer-facing Audio Guide feature or label', () => {
 for(const name of ['components/ExploreTransitGuide.jsx','data/businesses.js','app/destination/DestinationView.jsx','app/item/ItemView.jsx','data/oldQuarterHome.js','data/newBlogPosts.json','app/my-trip/page.jsx']) assert.doesNotMatch(src(name),/audio[ -]?guide/i,name);
 assert.doesNotMatch(src('app/my-trip/page.jsx'),/48\.2 MB|Xuất âm thanh offline/);
});
test('FAQ still contains twenty accessible questions',()=>{
 const questions = src('app/faq-data.js');
 assert.match(src('app/faq/page.jsx'), /<details/);
 assert.equal((questions.match(/\"question\":/g)||[]).length,20);
});
