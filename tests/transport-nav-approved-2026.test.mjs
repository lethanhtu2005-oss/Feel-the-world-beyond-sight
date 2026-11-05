import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
import {resolve} from 'node:path';
const root=process.cwd();
const read=x=>readFileSync(resolve(root,x),'utf8');
const header=read('components/Header.jsx');
const explore=read('app/explore/page.jsx');
const catalog=read('data/catalog.js');
const data=read('data/exploreApprovedData.js');
const card=read('components/CatalogCard.jsx');
test('Header và thanh danh mục có cùng điểm vào Di chuyển',()=>{
  assert.match(header,/\["Di chuyển","\/explore\?cat=transport"\]/);
  assert.match(explore,/\{id:"transport",label:"Di chuyển"\}/);
  for(const [label,path] of [['Lưu trú','/explore?cat=accommodation'],['Ẩm thực','/explore?cat=restaurant'],['Vé tham quan','/explore?cat=ticket'],['Tour & Trải nghiệm','/explore?cat=activity'],['Guide đồng hành','/services/guides'],['Đặt dịch vụ','/booking']]) {
    assert.ok(header.includes('"'+label+'","'+path+'"'),label);
    assert.ok(explore.includes(label),label+' missing in explore');
  }
});
test('Danh mục 6 phương tiện dùng chung ID với chi tiết và luồng đặt xe',()=>{
  const ids = ['pho-co-transport-car7','pho-co-transport-bus','pho-co-transport-electric','pho-co-transport-car','pho-co-transport-moto','pho-co-transport-cyclo'];
  assert.match(catalog,/item\.cat==="transport"/);
  assert.match(card,/\/services\/ride-booking\?service=/);
  assert.match(read('app/services/ride-booking/page.jsx'),/getItem\(searchParams\.get\('service'\)\)/);
  assert.match(read('app/services/ride-booking/page.jsx'),/selectedService\?\.cat === 'transport'/);
  for (const id of ids) assert.ok(data.includes('"id": "'+id+'"'), id);
  assert.ok(!data.includes('"id": "pho-co-transport-escort"'));
});
test('Không xóa các route cổng người dùng và đặt xe',()=>{
  for(const path of ['app/explore/page.jsx','app/services/ride-booking/page.jsx','app/booking/page.jsx','app/partner/page.jsx','app/guide/page.jsx','app/volunteer/page.jsx','app/business/page.jsx','app/admin/page.jsx']) assert.ok(existsSync(resolve(root,path)),path);
});
