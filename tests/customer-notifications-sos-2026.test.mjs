import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
const read = path => readFile(new URL(path, import.meta.url),'utf8');
test('Trang thông báo khách không bịa cảnh báo thực địa hay thiết bị',async()=>{
 const s=await read('../app/notifications/page.jsx');
 assert.match(s,/Thông báo của tôi/);
 assert.match(s,/api\.listNotifications/);
 assert.doesNotMatch(s,/FIELD_ALERTS|Spatial Audio ON|WayEcho Wand|WCAG 2\.2 AAA|Cảnh báo chướng ngại vật: Thi công/);
 assert.match(s,/Chưa có thông báo nào/);
});
test('API thông báo không làm lộ dữ liệu khách khác',async()=>{
 const s=await read('../app/api/notifications/route.js');
 assert.match(s,/x\.ownerId === user\.id/);
});
test('Không giới thiệu cho mượn gậy/tai nghe tại cổng đối tác',async()=>{
 const s=await read('../app/partner/page.jsx');
 assert.doesNotMatch(s,/cần mượn thiết bị trợ thị khẩn cấp|Túi sơ cấp cứu & mượn/);
});
test('Nút SOS trên mobile chạm giữ 5 giây và có điểm nối native, desktop không giả bắt phím âm lượng',async()=>{
 const s=await read('../components/FloatingSOS.jsx');
 assert.match(s,/5000/);
 assert.match(s,/md:hidden/);
 assert.match(s,/wayecho:native-volume-down-held/);
 assert.match(s,/\/sos\?source=hold/);
});
