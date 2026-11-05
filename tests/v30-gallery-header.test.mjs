import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { oldQuarterGallery } from "../data/oldQuarterGallery.js";
import { oldQuarterCards } from "../data/oldQuarterHome.js";
import { destinations } from "../data/destinations.js";
import { photoCredits } from "../data/photoCredits.js";
const source = name => readFile(new URL(name, import.meta.url), "utf8");
const fileName = url => decodeURIComponent(new URL(url, "https://site.invalid").pathname.split("/").pop());

test("V30 gallery có 15 tệp ảnh riêng, không lặp với bốn thẻ và trang chi tiết", () => {
 assert.equal(oldQuarterGallery.length,15);
 const gallery = oldQuarterGallery.map(x=>fileName(x.image));
 const cards = oldQuarterCards.map(x=>fileName(x.image));
 const details = destinations.filter(d=>["nha-co-87-ma-may","cho-dong-xuan","o-quan-chuong","pho-hang-ma"].includes(d.slug)).map(d=>fileName(d.image));
 assert.equal(new Set(gallery).size,15);
 assert.equal(new Set(cards).size,4);
 assert.equal(new Set(details).size,4);
 assert.equal(new Set([...gallery,...cards,...details]).size,23);
});
test("V30 Gallery tự loại ảnh lỗi, lightbox không in nguồn và có bảng credits tập trung",async()=>{
 const gallery=await source("../components/DestinationGallery.jsx");
 assert.match(gallery,/onError=\{\(\) => markUnavailable/);
 assert.match(gallery,/oldQuarterGallery\.filter/);
 assert.match(gallery,/showModal\(\)/);
 assert.doesNotMatch(gallery,/Nguồn ảnh chưa được xác minh/);
 const footer=await source("../components/Footer.jsx");
 assert.match(footer,/Nguồn ảnh & giấy phép/);
 assert.match(footer,/\/photo-credits/);
 assert.ok(photoCredits.length>=29);
 assert.equal(new Set(photoCredits.map(x=>x.file)).size,photoCredits.length);
 for(const img of oldQuarterGallery) assert.ok(photoCredits.some(c=>c.source===img.source));
});
test("V30 Header thay SOS bằng chuông thật, footer vẫn có SOS",async()=>{
 const header=await source("../components/Header.jsx");
 const footer=await source("../components/Footer.jsx");
 assert.match(header,/href="\/notifications"/);
 assert.match(header,/aria-label="Xem thông báo"/);
 assert.doesNotMatch(header,/<SOSLink/);
 assert.match(footer,/\/sos/);
 const notifications=await source("../app/notifications/page.jsx");
 assert.match(notifications,/listNotifications/);
});
test("V30 ảnh hero chỉ dùng một lần ở trang chủ",async()=>{
 const home=await source("../app/page.jsx");
 assert.equal((home.match(/oldQuarterMain\.src/g)||[]).length,1);
});
