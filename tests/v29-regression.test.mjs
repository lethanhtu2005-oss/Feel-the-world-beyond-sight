import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {dirname,join} from 'node:path';
import {isInternalPortalPath} from '../lib/portalRoutes.js';
const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const source=path=>readFileSync(join(root,path),'utf8');

test('V29: exact role-route boundaries keep 3 portals separate',()=>{
 for(const route of ['/admin','/admin/consultation','/internal/login','/staff/consultation','/business/bookings','/guide/profile','/partner','/partner/login'])assert.equal(isInternalPortalPath(route),true,route);
 for(const route of ['/','/articles','/onboarding','/navigation','/profile','/services/ride-booking','/partners/guide','/partner-article'])assert.equal(isInternalPortalPath(route),false,route);
});
test('V29: traveler-only widgets unmount together on internal portals',()=>{
 const layout=source('app/layout.jsx'), wrapper=source('components/TravelerWidgets.jsx');
 assert.match(layout,/<TravelerWidgets\s*\/>/);
 for(const component of ['FloatingSOS','ConsultantWidget','WayEchoAIWidget','MobileNav']){
  assert.match(wrapper,new RegExp(`<${component}\\s*\\/>`));
  assert.doesNotMatch(layout,new RegExp(`<${component}\\s*\\/>`));
 }
 assert.match(wrapper,/if \(internal\) return null/);
 assert.match(wrapper,/isInternalPortalPath\(pathname\)/);
 assert.match(source('components/MobileNav.jsx'),/isInternalPortalPath\(pathname\)/);
 assert.match(source('components/Header.jsx'),/isInternalPortalPath\(pathname\)/);
 assert.match(source('components/Footer.jsx'),/isInternalPortalPath\(pathname\)/);
});
test('V29: microphone is aborted on step exit, navigation and background',()=>{
 const ui=source('components/InteractiveOnboarding.jsx');
 assert.match(ui,/const abortMic=\(\)=>/);
 assert.match(ui,/r\.onstart=null;r\.onresult=null;r\.onerror=null;r\.onend=null/);
 assert.match(ui,/const next=\(\)=>\{abortMic\(\)/);
 assert.match(ui,/const previous=\(\)=>\{abortMic\(\)/);
 assert.match(ui,/visibilitychange/);
 assert.match(ui,/onClick=\{\(\)=>\{abortMic\(\);stop\(\);\}\}/);
 assert.match(ui,/onend=\(\)=>\{if\(recog\.current===r\)/);
 assert.match(ui,/aria-pressed=\{listening\}/);
 assert.match(ui,/ref=\{stageTitle\} tabIndex=\{-1\}/);
});
test('V29: footer matches agreed brown style and public internal links exist',()=>{
 const foot=source('components/Footer.jsx');
 assert.match(foot,/bg-\[#352016\]/);
 assert.doesNotMatch(foot,/bg-\[#07121f\]/);
 for(const route of ['/onboarding','/partner','/privacy','/terms','/sos','/services/ride-booking']) assert.ok(foot.includes(route),route);
 for(const route of ['/onboarding','/partner','/privacy','/terms','/sos','/services/ride-booking','/partners/cooperate','/partners/guide','/partners/business']) assert.ok(existsSync(join(root,'app',route.slice(1),'page.jsx')) || (route.startsWith('/partners/') && existsSync(join(root,'app','partners','[kind]','page.jsx'))),route);
});
test('V29: preflight audits active server booking and Escrow instead of legacy localStorage',()=>{
 const script=source('scripts/deploy-preflight.mjs');
 assert.match(script,/api\/ride-demo\/route\.js/);
 assert.match(script,/api\/escrow\/route\.js/);
 assert.doesNotMatch(script,/readFileSync\(resolve\(root,'lib\/rideDemo\.js'\)/);
 assert.doesNotMatch(script,/readFileSync\(resolve\(root,'lib\/escrowDemo\.js'\)/);
 assert.match(script,/Vercel storage uses instance memory/);
});

test('V29: PWA service worker excludes all private and SOS navigation paths',()=>{
 const sw=source('public/sw.js');
 assert.match(sw,/PRIVATE_PATH/);
 assert.match(sw,/PRIVATE_SERVICE/);
 assert.match(sw,/internal\|staff\|partner\|business\|guide/);
 assert.match(sw,/my-booking\|my-trip\|notifications/);
 assert.match(sw,/sos\|assistant/);
 assert.match(sw,/ride-booking/);
 assert.match(sw,/PUBLIC_OFFLINE_PAGES/);
 assert.match(sw,/private\|no-store/);
});
