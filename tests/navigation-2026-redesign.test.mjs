import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const page = fs.readFileSync(new URL('../app/navigation/page.jsx', import.meta.url), 'utf8');
const voice = fs.readFileSync(new URL('../components/VoiceDistanceFinder.jsx', import.meta.url), 'utf8');

test('navigation keeps actual OpenStreetMap, linked lists and three map layers', () => {
  assert.match(page, /<MapView points=\{points\}/);
  assert.match(page, /Điểm đến văn hóa/);
  assert.match(page, /Sự kiện văn hóa/);
  assert.match(page, /Dịch vụ hỗ trợ/);
  assert.match(page, /aria-pressed=\{visibleLayers\[k\]\}/);
});
test('navigation has usable destination selection GPS and voice', () => {
  assert.match(page, /navigator\.geolocation\.getCurrentPosition/);
  assert.match(page, /<form onSubmit=\{searchRoute\}/);
  assert.match(page, /<VoiceDistanceFinder initialTarget=\{selectedSlug\} compact/);
  assert.match(voice, /window\.webkitSpeechRecognition/);
});
test('navigation labels distance correctly and does not pretend to offer validated routes', () => {
  assert.match(page, /Khoảng cách đường chim bay/);
  assert.match(page, /google\.com\/maps\/dir/);
  assert.match(page, /route=\{\[\]\}/);
  assert.doesNotMatch(page, /100% an toàn/);
});
test('navigation reuses app-wide header footer and floating widgets via layout', () => {
  const layout = fs.readFileSync(new URL('../app/layout.jsx', import.meta.url), 'utf8');
  for (const pattern of [/<Header\s*\/>/, /<Footer\s*\/>/, /<TravelerWidgets\s*\/>/]) assert.match(layout, pattern);
});
