import test from 'node:test';
import assert from 'node:assert/strict';
import {honestAccessStatus} from '../lib/accessStatus.js';

test('honestAccessStatus: không khẳng định "đã khảo sát" khi chưa có xác minh', () => {
  assert.equal(honestAccessStatus('Đã khảo sát thực địa — Có lối dốc.'), 'Mô tả tham khảo, chưa xác minh tại chỗ — Có lối dốc.');
  assert.equal(honestAccessStatus('Đã khảo sát — Ngõ hẹp.'), 'Mô tả tham khảo, chưa xác minh tại chỗ — Ngõ hẹp.');
  assert.equal(honestAccessStatus('Vỉa hè hẹp.'), 'Vỉa hè hẹp.');
  assert.equal(honestAccessStatus(undefined), '');
});
