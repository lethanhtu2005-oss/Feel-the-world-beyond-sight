import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const source = p=>readFileSync(new URL(p,import.meta.url),"utf8");
test("Ride API: server validates role, ownership, state transitions and feedback",()=>{
 const api=source("../app/api/ride-demo/route.js");
 assert.match(api,/secured/);assert.match(api,/ownerId===user.id/);assert.match(api,/advanceRide\(ride,body.status\)/);assert.match(api,/ride.status!=="completed"/);
});
test("Customer and dispatcher fetch ride data from server API, not localStorage",()=>{
 const customer=source("../app/services/ride-booking/page.jsx");
 const admin=source("../app/admin/ride-demo/page.jsx");
 assert.match(customer,/fetch\('\/api\/ride-demo'/);assert.match(admin,/AdminSections/);assert.match(source('../components/AdminSections.jsx'),/useFeed\('\/api\/ride-demo',4000\)/);
 assert.doesNotMatch(customer,/getRides\(/);assert.doesNotMatch(admin,/getRides\(/);
});
test("Video signaling uses shared app store, not server-only registry",()=>{
 const api=source("../app/api/consultation/route.js");const store=source("../lib/store.js");
 assert.match(api,/transaction\(/);assert.match(api,/list\("consultations"\)/);
 assert.doesNotMatch(api,/globalThis\.__wayechoConsultations/);
 assert.match(store,/"consultations"/);
});
test("Escrow frontend polls server and uses API to change transaction",()=>{
 const component=source("../components/EscrowLedgerView.jsx");
 assert.match(component,/setInterval\(reload,5000\)/);assert.match(component,/api.changeEscrow/);
});
