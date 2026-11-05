import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {RIDE_VEHICLES,RIDE_PROVIDERS,RIDE_VEHICLE_IDS,RIDE_SERVICE_PRESETS,newRide,advanceRide} from '../lib/rideDemo.js';
import {EXPLORE_APPROVED_ITEMS} from '../data/exploreApprovedData.js';
const root=path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const read=p=>readFileSync(path.join(root,p),'utf8');
const ids=new Set(EXPLORE_APPROVED_ITEMS.filter(i=>i.cat==='transport').map(i=>i.id));
test('6 phương tiện hiển thị đúng một hệ ID giữa danh mục và form đặt xe',()=>{
 assert.equal(RIDE_VEHICLES.length,6);
 assert.equal(new Set(RIDE_VEHICLE_IDS).size,6);
 for(const v of RIDE_VEHICLES){
  assert.ok(ids.has(v.serviceId),v.serviceId);
  assert.deepEqual(RIDE_SERVICE_PRESETS[v.serviceId],{vehicle:v.id,provider:v.provider});
  assert.ok(RIDE_PROVIDERS.some(p=>p.id===v.provider),v.provider);
 }
 assert.equal(ids.size,6);
});
test('Cả sáu ảnh phương tiện trong danh mục có tệp thực',()=>{
 for(const it of EXPLORE_APPROVED_ITEMS.filter(i=>i.cat==='transport')){
  assert.ok(it.image.startsWith('/assets/images/'));
  assert.ok(existsSync(path.join(root,'public',it.image)),it.image);
 }
});
test('Mọi xe được tạo, gán tài xế demo và kết thúc theo đúng state machine',()=>{
 for(const vehicle of RIDE_VEHICLES){
  let ride=newRide({pickup:'Hồ Gươm',destination:'Mã Mây',provider:vehicle.provider,vehicle:vehicle.id,consent:true},'T-'+vehicle.id);
  assert.equal(ride.vehicle,vehicle.id);
  for(const status of ['assigned','arrived','in_progress','completed'])ride=advanceRide(ride,status);
  assert.equal(ride.status,'completed');
  assert.equal(ride.events.length,5);
  assert.ok(ride.driver.name.includes('demo'));
  assert.throws(()=>advanceRide(ride,'in_progress'),/không hợp lệ/);
 }
});
test('Danh mục, header và thẻ dùng một URL Di chuyển; đặt xe có service ID',()=>{
 assert.match(read('components/Header.jsx'),/Di chuyển","\/explore\?cat=transport/);
 assert.match(read('app/explore/page.jsx'),/id:"transport",label:"Di chuyển"/);
 assert.match(read('components/CatalogCard.jsx'),/ride-booking\?service=/);
 assert.match(read('app/services/ride-booking/page.jsx'),/RIDE_SERVICE_PRESETS\[selectedService.id\]/);
});
test('Đặt xe độc lập, không tự ý thay điểm đến bằng booking khác',()=>{
 const s=read('app/services/ride-booking/page.jsx');
 assert.match(s,/if \(requestedBookingId\)/);
 assert.doesNotMatch(s,/requestedBookingId\s*\?\s*valid.find\(b=>b.id === requestedBookingId\)\s*\|\| valid\[0\]/);
 assert.match(s,/Không liên kết — đặt xe độc lập/);
});
test('API nhận đủ loại xe và chỉ khách đã đăng nhập được tạo đơn',()=>{
 const s=read('app/api/ride-demo/route.js');
 assert.match(s,/RIDE_VEHICLE_IDS.includes\(body.vehicle\)/);
 assert.match(s,/if\(user.guest\)fail\(401/);
 assert.match(s,/user.role!=="traveler"/);
 assert.match(s,/user.role!=="admin"/);
});
test('Admin đọc lại API xe định kỳ, có bộ lọc đúng trạng thái',()=>{
 const s=read('components/AdminSections.jsx');
 assert.match(s,/useFeed\('\/api\/ride-demo',4000\)/);
 assert.match(s,/view==='Đang di chuyển'&&r.status==='in_progress'/);
 assert.match(s,/view==='Đã hoàn thành'&&r.status==='completed'/);
 assert.match(s,/view==='Chờ ghép xe'&&r.status==='requested'/);
 assert.match(s,/fetch\('\/api\/ride-demo',\{method:'PATCH'/);
});
