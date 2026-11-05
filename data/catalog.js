import { destinations } from "./destinations.js";
import services from "./oldQuarterServicesData.js";
import { EXPLORE_APPROVED_ITEMS } from "./exploreApprovedData.js";
export const CATEGORIES=[
 {id:"destination",label:"Điểm đến",href:"/explore?cat=destination"},
 {id:"accommodation",label:"Lưu trú",href:"/explore?cat=accommodation"},
 {id:"restaurant",label:"Ẩm thực",href:"/explore?cat=restaurant"},
 {id:"activity",label:"Tour & Trải nghiệm",href:"/explore?cat=activity"},
 {id:"ticket",label:"Vé tham quan",href:"/explore?cat=ticket"},
 {id:"transport",label:"Di chuyển",href:"/explore?cat=transport"}];
// Legacy internal demo IDs remain valid for booking links created before the
// Phố cổ catalog migration. These are NOT actual bookable businesses.
const legacyDemoItems = [
 {id:"demo-hotel",cat:"accommodation",name:"Lưu trú thử nghiệm WayEcho",area:"Hà Nội",price:"Giá mô phỏng",isDemo:true,verifiedPlace:false,image:"/assets/images/we-ai-luu-tru-phong.jpg",imageFallback:"/assets/images/we-ai-luu-tru-phong.jpg",alt:"Phòng nghỉ phong cách nhà cổ Hà Nội, ảnh AI minh họa dịch vụ lưu trú demo.",level:"Cần khảo sát"},
 {id:"demo-restaurant",cat:"restaurant",name:"Ẩm thực thử nghiệm WayEcho",area:"Hà Nội",price:"Giá mô phỏng",isDemo:true,verifiedPlace:false,image:"/assets/images/we-ai-an-uong-nha-hang.jpg",imageFallback:"/assets/images/we-ai-an-uong-nha-hang.jpg",alt:"Không gian nhà hàng kiểu Việt, ảnh AI minh họa dịch vụ ăn uống demo.",level:"Cần khảo sát"}
];

const destinationItems=destinations.map(d=>({id:d.slug,cat:"destination",name:d.name,area:d.area,image:d.image,imageSrcSet:d.imageSrcSet,imageFallback:d.imageFallback,alt:d.alt,price:d.visit?.price||"Xem chi tiết",level:d.access.level,note:d.access.status,audio:d.audio,summary:d.summary,verifiedPlace:true,destinationSlug:d.slug}));
// Các phương tiện phải nằm trong danh mục chung để /item và /services/ride-booking?service=... cùng tìm được một ID.
const approvedAdditions=EXPLORE_APPROVED_ITEMS.filter(item=>
  (item.id.startsWith("tour-") || item.id==="wayecho-theater-preview" || item.cat==="transport") &&
  ![...destinationItems,...services,...legacyDemoItems].some(existing=>existing.id===item.id)
);
const baseCatalog=[...destinationItems,...services,...legacyDemoItems];
// Only enrich catalog entries explicitly surfaced by /explore; preserve other records and routes.
export const catalog=[...baseCatalog.map(old=>{
  const approved=EXPLORE_APPROVED_ITEMS.find(it=>it.id===old.id);
  return approved ? {...old, image:approved.image, imageFallback:approved.imageFallback, alt:approved.alt, galleryImages:approved.galleryImages, sourceStatus:approved.sourceStatus, summary:approved.summary, audio:approved.audio, price:approved.price, detail:approved.detail, accessibilityDemo:approved.accessibilityDemo, stops:approved.stops, time:approved.time} : old;
}), ...approvedAdditions];
export const byCategory=cat=>cat?catalog.filter(it=>it.cat===cat):catalog;
export const getItem=id=>catalog.find(it=>it.id===id)||null;
export const catLabel=cat=>CATEGORIES.find(x=>x.id===cat)?.label||"Mục";
