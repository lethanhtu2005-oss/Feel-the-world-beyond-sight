export const RIDE_KEY = 'wayecho_ride_demo_v24';
export const RIDE_PROVIDERS = [
 {id:'grab-demo',name:'Grab – mô phỏng (chưa xác nhận hợp tác)'},
 {id:'be-demo',name:'be – mô phỏng (chưa xác nhận hợp tác)'},
 {id:'xanh-demo',name:'Xanh SM – mô phỏng (chưa xác nhận hợp tác)'},
 {id:'hopdong-7cho-demo',name:'Đơn vị ô tô hợp đồng 7 chỗ Hoàn Kiếm (demo)'},
 {id:'vinbus-demo',name:'VinBus – minh họa, chưa xác nhận hợp tác'},
 {id:'xe-dien-demo',name:'Đơn vị xe điện du lịch Hoàn Kiếm (demo)'},
 {id:'xichlo-demo',name:'Nhóm lái xích lô địa phương (demo)'}
];
// Một nguồn dữ liệu duy nhất cho lựa chọn phương tiện ở form, API và thẻ dịch vụ.
export const RIDE_VEHICLES = [
 {id:'car7',name:'Ô tô 7 chỗ',price:'60.000–150.000đ / chuyến',icon:'🚙',provider:'hopdong-7cho-demo',serviceId:'pho-co-transport-car7',desc:'Phù hợp nhóm hoặc gia đình; cần xác nhận hỗ trợ gậy dò đường, xe lăn gấp và chó dẫn đường.'},
 {id:'bus',name:'Xe buýt điện đô thị',price:'7.000–9.000đ / vé lượt',icon:'🚌',provider:'vinbus-demo',serviceId:'pho-co-transport-bus',desc:'Kiểm tra tuyến, điểm dừng và khả năng lên xuống thực tế trước khi đi.'},
 {id:'electric',name:'Xe điện du lịch Phố Cổ',price:'35.000đ / vé tham quan',icon:'🚐',provider:'xe-dien-demo',serviceId:'pho-co-transport-electric',desc:'Cần xác nhận chỗ ngồi, điểm đón và hình thức hỗ trợ lên xuống.'},
 {id:'car',name:'Ô tô đón trả tại Phố Cổ',price:'40.000–120.000đ / chuyến',icon:'🚗',provider:'xanh-demo',serviceId:'pho-co-transport-car',desc:'Tài xế hỗ trợ đón trả; yêu cầu hỗ trợ cần được xác nhận trước.'},
 {id:'motorbike',name:'Xe máy đồng hành đón ngõ nhỏ',price:'20.000–40.000đ / chặng',icon:'🛵',provider:'xanh-demo',serviceId:'pho-co-transport-moto',desc:'Cần đánh giá khả năng lên xuống, đội mũ và an toàn trước khi chọn.'},
 {id:'cyclo',name:'Xích lô trải nghiệm Phố Cổ',price:'100.000–150.000đ / giờ',icon:'🚲',provider:'xichlo-demo',serviceId:'pho-co-transport-cyclo',desc:'Đi chậm nghe thuyết minh; cần xác nhận lối lên xuống và tuyến thực tế.'}
];
export const RIDE_VEHICLE_IDS = RIDE_VEHICLES.map(v=>v.id);
export const RIDE_SERVICE_PRESETS = Object.fromEntries(RIDE_VEHICLES.map(v=>[v.serviceId,{vehicle:v.id,provider:v.provider}]));
export const RIDE_STATUS = {requested:'Đã gửi yêu cầu',assigned:'Đã có tài xế',arrived:'Tài xế đã đến điểm đón',in_progress:'Đang trong chuyến',completed:'Chuyến đi đã kết thúc',cancelled:'Đã hủy'};
const NEXT = {requested:['assigned','cancelled'], assigned:['arrived','cancelled'], arrived:['in_progress','cancelled'], in_progress:['completed'], completed:[], cancelled:[]};
export const DEMO_DRIVERS=[{name:'Nguyễn Văn Minh (demo)',plate:'29A-123.45 (demo)',vehicle:'Ô tô 4 chỗ (demo)'},{name:'Trần Quốc Huy (demo)',plate:'29B-456.78 (demo)',vehicle:'Ô tô 4 chỗ (demo)'},{name:'Lê Thu Hà (demo)',plate:'29C-888.66 (demo)',vehicle:'Xe điện (demo)'}];
export function newRide(data, id=`WX-${Date.now().toString(36).toUpperCase()}`){
 if(!data.pickup?.trim() || !data.destination?.trim()) throw Error('Cần nhập điểm đón và điểm đến.');
 if(!RIDE_PROVIDERS.some(p=>p.id===data.provider)) throw Error('Chọn một đối tác mô phỏng.');
 return {id,provider:data.provider,pickup:data.pickup.trim(),destination:data.destination.trim(),vehicle:data.vehicle||'car',notes:data.notes||'',consent:Boolean(data.consent),status:'requested',driver:null,payment:'not_confirmed',events:[{status:'requested',time:new Date().toISOString()}],createdAt:new Date().toISOString(),feedback:null};
}
export function advanceRide(ride,to){if(!(NEXT[ride.status]||[]).includes(to)) throw Error('Chuyển trạng thái không hợp lệ.');const result={...ride,status:to,events:[...ride.events,{status:to,time:new Date().toISOString()}]};if(to==='assigned'){
 const index=RIDE_PROVIDERS.findIndex(p=>p.id===ride.provider);
 const vehicleName=RIDE_VEHICLES.find(v=>v.id===ride.vehicle)?.name||'Phương tiện demo';
 result.driver=index>=0 && index<DEMO_DRIVERS.length
   ? DEMO_DRIVERS[index]
   : {name:'Tài xế minh họa (demo)',plate:'Chưa có biển số xác minh',vehicle:vehicleName};
} return result;}
export function getRides(){if(typeof window==='undefined')return [];try{return JSON.parse(window.localStorage.getItem(RIDE_KEY)||'[]')}catch{return []}}
export function saveRides(rides){if(typeof window!=='undefined'){window.localStorage.setItem(RIDE_KEY,JSON.stringify(rides));window.dispatchEvent(new Event('wayecho-rides-changed'));}return rides;}
export function updateRide(id,fn){const all=getRides();const i=all.findIndex(x=>x.id===id);if(i<0)throw Error('Không tìm thấy chuyến xe.');all[i]=fn(all[i]);saveRides(all);return all[i];}
export function speakVietnamese(message){if(typeof window==='undefined'||!('speechSynthesis'in window))return false;const voices=window.speechSynthesis.getVoices();const voice=voices.find(v=>v.lang?.toLowerCase().startsWith('vi'));if(!voice)return false;window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(message);u.lang='vi-VN';u.voice=voice;u.rate=.92;window.speechSynthesis.speak(u);return true;}
