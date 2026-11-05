import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const read = p => readFileSync(new URL(`../${p}`, import.meta.url), 'utf8');
test('Demo storage note is after Footer and not before Header', () => {
 const layout=read('app/layout.jsx');
 assert.ok(layout.indexOf('<StorageNotice />') > layout.indexOf('<Footer />'));
 assert.ok(layout.indexOf('<Header />') < layout.indexOf('<main id="main">'));
 const note=read('components/StorageNotice.jsx');
 assert.match(note,/bg-\[#281811\]/);
 assert.doesNotMatch(note,/bg-amber-100/);
});
test('Business notifications scope by businessId, not customer ownerId', () => {
 const route=read('app/api/notifications/route.js');
 assert.match(route,/x\.businessId === user\.businessId/);
 assert.match(route,/x\.ownerId === user\.id/);
 assert.match(route,/user\.role === "admin"/);
 const bookings=read('app/api/bookings/route.js');
 assert.match(bookings,/ownerId:null,role:"business",businessId/);
 assert.doesNotMatch(bookings,/ownerId:user\.id,role:"business",businessId/);
});
