import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const profile = readFileSync(new URL('../app/profile/page.jsx', import.meta.url), 'utf8');
const login = readFileSync(new URL('../app/login/page.jsx', import.meta.url), 'utf8');
test('Profile remains separate from login and contains DOB/derived age', () => {
  assert.match(profile, /birthDate/);
  assert.match(profile, /ageFromDate/);
  assert.match(profile, /Ngày sinh/);
  assert.match(profile, /Độ tuổi/);
  assert.match(profile, /we-contact/);
  assert.doesNotMatch(login, /ageFromDate|birthDate|Ngày sinh/);
});
test('Profile keeps access needs and consent behavior', () => {
  for (const key of ['we-usertype','we-access-prefs','we-share-business','we-emergency','we-companion']) assert.ok(profile.includes(key), key);
  assert.match(profile, /my-booking/);
  assert.match(profile, /my-trip/);
  assert.match(profile, /Chưa có ngày sinh hợp lệ/);
});
