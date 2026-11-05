import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const home=readFileSync('app/page.jsx','utf8');
const discovery=readFileSync('components/HomeDiscoverySearch.jsx','utf8');
const widget=readFileSync('components/WayEchoAIWidget.jsx','utf8');
const floaters=readFileSync('components/TravelerWidgets.jsx','utf8');
test('Home discovery embeds interactive search without sending homepage actions to /search',()=>{
 assert.match(home, /<HomeDiscoverySearch\s*\/>/);
 assert.match(home, /<HomeDiscoveryHeroActions\s*\/>/);
 assert.doesNotMatch(home, /href="\/search(?:\?|\")/);
 assert.match(discovery, /role="search"/);
 assert.match(discovery, /useSpeechRecognition/);
 assert.match(discovery, /onResult:/);
 assert.match(discovery, /aria-live="polite"/);
 assert.match(discovery, /href="\/explore"/);
 assert.match(discovery, /href="\/destination"/);
});
test('Homepage camera reuses the existing floating AI widget, with all three floaters retained',()=>{
 assert.match(discovery,/wayecho:open-ai-camera/);
 assert.match(widget,/addEventListener\("wayecho:open-ai-camera"/);
 assert.match(widget,/setOpen\(true\);cameraOn\(\)/);
 for(const name of ['FloatingSOS','ConsultantWidget','WayEchoAIWidget'])assert.match(floaters,new RegExp(`<${name}\\s*\\/>`));
});
