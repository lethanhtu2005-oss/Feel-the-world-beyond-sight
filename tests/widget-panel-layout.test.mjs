import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const ai=fs.readFileSync(new URL('../components/WayEchoAIWidget.jsx',import.meta.url),'utf8');
const consultant=fs.readFileSync(new URL('../components/ConsultantWidget.jsx',import.meta.url),'utf8');
const sos=fs.readFileSync(new URL('../components/FloatingSOS.jsx',import.meta.url),'utf8');
test('desktop widget panels avoid the floating right rail',()=>{
  for (const code of [ai, consultant]) {
    assert.match(code,/md:right-\[132px\]/);
    assert.match(code,/md:top-\[76px\]/);
    assert.match(code,/md:bottom-5/);
    assert.match(code,/\$\{open\?"z-\[100\]"/);
  }
  assert.match(sos,/z-\[87\]/);
});
test('mobile panels fill the viewport and offer close and SOS links',()=>{
  for (const code of [ai, consultant]) {
    assert.match(code,/fixed inset-x-2 bottom-2 top-2/);
    assert.match(code,/href="\/sos"/);
    assert.match(code,/hidden md:block/);
  }
});
test('AI and consultant signal exclusive display',()=>{
  for (const code of [ai, consultant]) {
    assert.match(code,/wayecho:widget-open/);
    assert.match(code,/switchWidget/);
  }
});
