import test from "node:test";
import assert from "node:assert/strict";
import {changeEscrow,newEscrow,canSee} from "../lib/escrowServer.js";
const booking={id:"b1",ownerId:"t1",guideId:"g1",itemName:"Tour thử"};
test("cross-role escrow demo complete and withdrawal",()=>{
 let x=newEscrow(booking);assert.equal(x.status,"awaiting_payment");
 x=changeEscrow(x,"pay","traveler");x=changeEscrow(x,"customer_checkin","traveler");x=changeEscrow(x,"guide_checkin","guide");assert.equal(x.status,"in_progress");x=changeEscrow(x,"guide_complete","guide");x=changeEscrow(x,"customer_confirm","traveler");assert.equal(x.status,"available");x=changeEscrow(x,"withdraw","guide");x=changeEscrow(x,"approve_withdraw","admin");assert.equal(x.status,"withdrawn");
});
test("dispute stops income and only admin resolves",()=>{
 let x=newEscrow(booking);x=changeEscrow(x,"pay","traveler");x=changeEscrow(x,"dispute","traveler");assert.throws(()=>changeEscrow(x,"customer_confirm","traveler"));assert.throws(()=>changeEscrow(x,"refund","guide"));x=changeEscrow(x,"refund","admin");assert.equal(x.status,"cancelled");
});
test("guide and traveler cannot read other people's escrow",()=>{
 const x=newEscrow(booking);assert.equal(canSee({role:"guide",guideId:"g2"},x),false);assert.equal(canSee({role:"traveler",id:"t2"},x),false);assert.equal(canSee({role:"guide",guideId:"g1"},x),true);
});
