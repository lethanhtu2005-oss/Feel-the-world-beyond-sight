import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
const page=readFileSync('app/volunteer/page.jsx','utf8');
const css=readFileSync('app/volunteer/volunteer.css','utf8');
test('Volunteer sidebar has 8 numbered-free sections',()=>{
 const ids=['overview','tasks','calendar','earnings','training','achievements','profile','settings'];
 for(const id of ids) assert.match(page,new RegExp(`\\["${id}",`));
 assert.equal((page.match(/\["(?:overview|tasks|calendar|earnings|training|achievements|profile|settings)",/g)||[]).length,8);
 assert.doesNotMatch(page,/\b[1-8]\. (?:Tổng quan|Nhiệm vụ|Lịch|Thu nhập|Đào tạo|Thành tích|Hồ sơ|Cài đặt)/);
});
test('Volunteer keeps existing field station and partner and SOS entry',()=>{
 assert.ok(existsSync('app/volunteer/station/page.jsx'));
 assert.match(page,/href="\/volunteer\/station"/);
 assert.match(page,/href="\/partner"/);
 assert.match(page,/href="\/sos"/);
});
test('Task lifecycles check training, scheduling overlap and do not auto-release money',()=>{
 assert.match(page,/coursesDone\.includes\(t\.skill\)/);
 assert.match(page,/const conflict=tasks\.some/);
 assert.match(page,/in_progress/);
 assert.match(page,/completed/);
 assert.match(page,/không tự giải ngân/);
});
test('Calendar, course and demo settings persist locally',()=>{
 for(const x of ['waye_volunteer_days_v1','waye_volunteer_courses_v1','waye_volunteer_settings_v1','waye_volunteer_tasks_v1']) assert.ok(page.includes(x));
});
test('WayEcho palette preserved in volunteer and data labeled as demo',()=>{
 assert.match(css,/#ffbd2e/);
 assert.match(css,/#fff8eb/);
 assert.match(page,/WayEcho DEMO/);
});
