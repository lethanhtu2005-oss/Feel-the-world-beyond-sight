import test from 'node:test';
import assert from 'node:assert/strict';
import {serviceBreakdown} from '../lib/serviceEconomics.js';
import {newEscrow} from '../lib/escrowServer.js';
test('Guide price splits consistently, without double charging customer',()=>{
 const x=serviceBreakdown('guide');
 assert.equal(x.gross,350000);assert.equal(x.platformFee,42000);
 assert.equal(x.providerPay,308000);assert.equal(x.providerPay+x.platformFee,x.gross);
 assert.equal(x.contribution,34000);
 const escrow=newEscrow({id:'b',ownerId:'u',guideId:'g1',itemName:'Guide demo'});
 assert.equal(escrow.amount,x.gross);assert.equal(escrow.feePercent,x.platformPercent);
});
test('Volunteer is a compensation-based demo, not an assertion of free service',()=>{
 const x=serviceBreakdown('volunteer');
 assert.equal(x.gross,200000);assert.equal(x.platformFee,20000);
 assert.equal(x.providerPay,180000);assert.equal(x.contribution,15000);
});
test('Reject invalid overridden prices',()=>{
 assert.throws(()=>serviceBreakdown('guide',-1),RangeError);
 assert.throws(()=>serviceBreakdown('guide',Number.NaN),RangeError);
});
