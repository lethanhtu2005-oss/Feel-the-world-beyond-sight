import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
const base=new URL('../',import.meta.url);
const read=f=>readFileSync(new URL(f,base),'utf8');
test('V28: onboarding has a public page and accessible four-step flow',()=>{
 assert.ok(existsSync(new URL('app/onboarding/page.jsx',base)));
 const ui=read('components/InteractiveOnboarding.jsx');
 for(const s of ['Chào mừng đến WayEcho','Cá nhân hóa trợ năng','Thử tìm kiếm bằng giọng nói','Khám phá và nhận hỗ trợ'])assert.ok(ui.includes(s),s);
 assert.match(ui,/useA11y/);assert.match(ui,/webkitSpeechRecognition/);assert.match(ui,/not-allowed/);assert.match(ui,/aria-live/);assert.match(ui,/Bỏ qua/);
});
test('V28: onboarding is reopenable in header and footer',()=>{
 assert.match(read('components/Header.jsx'),/\/onboarding/);
 assert.match(read('components/Footer.jsx'),/\/onboarding/);
});
test('V28: reduce motion disables onboarding animation',()=>{
 const css=read('app/globals.css');
 assert.match(css,/prefers-reduced-motion:reduce/);
 assert.match(css,/html\[data-reduce="reduce"\] \.we-onboard/);
});
