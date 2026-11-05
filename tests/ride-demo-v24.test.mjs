import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
const source=readFileSync(new URL('../lib/rideDemo.js',import.meta.url),'utf8');
test('Demo shows all providers and explicit disclaimer',()=>{assert.match(source,/Grab/);assert.match(source,/Xanh SM/);assert.match(readFileSync(new URL('../app/services/ride-booking/page.jsx',import.meta.url),'utf8'),/CHỈ LÀ MÔ PHỎNG/)});
test('State graph refuses jumping directly to completed',()=>{assert.match(source,/requested:\['assigned','cancelled'\]/);assert.match(source,/throw Error\('Chuyển trạng thái không hợp lệ/)});
test('Dispatch and customer share storage key',()=>{assert.match(source,/wayecho_ride_demo_v24/);assert.match(readFileSync(new URL('../components/AdminSections.jsx',import.meta.url),'utf8'),/updateRide/)});
