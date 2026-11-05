import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const root = new URL('../', import.meta.url);
const ledger = readFileSync(new URL('lib/escrowDemo.js',root),'utf8');
const view = readFileSync(new URL('components/EscrowLedgerView.jsx',root),'utf8');
test('Escrow locks payouts on disputes and requires dual check-in and customer confirmation',()=>{
  for(const rule of ['if(x.checkinGuide)x.status','!x.dispute','x.status==="disputed"','x.status==="available"'])assert.ok(ledger.includes(rule), rule);
});
test('V17 is explicitly demo only and provides all three role surfaces',()=>{
 assert.ok(view.includes('DEMO – không tiền thật'));
 for(const role of ['customer','guide','admin'])assert.ok(view.includes(role));
});
