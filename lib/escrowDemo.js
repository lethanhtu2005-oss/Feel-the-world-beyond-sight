"use client";
// Prototype-only ledger. Never transmit or represent real money.
export const KEY = "wayecho:v17:escrow-demo";
export const SEED = [{id:"WX-DEMO-001",service:"Đồng hành khám phá Phố cổ",traveler:"Khách minh họa",guide:"Hướng dẫn viên demo",amount:500000,feePercent:10,status:"awaiting_payment",checkinCustomer:false,checkinGuide:false,completedByGuide:false,confirmedByCustomer:false,dispute:false,payoutStatus:"none",withdrawStatus:"none",createdAt:"DEMO"}];
export const LABELS = {awaiting_payment:"Chờ thanh toán",paid:"Đã thanh toán mô phỏng",in_progress:"Đang thực hiện",awaiting_confirmation:"Chờ khách xác nhận",disputed:"Tạm dừng do tranh chấp",available:"Thu nhập có thể rút",withdraw_pending:"Yêu cầu rút đang chờ",withdrawn:"Đã chi trả mô phỏng",cancelled:"Đã hủy (demo)"};
export const money = n => new Intl.NumberFormat("vi-VN").format(n) + "đ";
export function readLedger(){if(typeof window==="undefined")return SEED; try{const raw=localStorage.getItem(KEY); if(!raw)return SEED; const data=JSON.parse(raw);return Array.isArray(data)?data:SEED;}catch{return SEED;}}
export function saveLedger(data){localStorage.setItem(KEY,JSON.stringify(data));window.dispatchEvent(new Event("wayecho-ledger-change"));}
export function transition(id,action){const rows=readLedger();let msg="Không thể thực hiện: điều kiện hoặc trạng thái không phù hợp.";const next=rows.map(t=>{if(t.id!==id)return t;const x={...t};
if(action==="pay"&&x.status==="awaiting_payment"){x.status="paid";msg="Đã ghi nhận thanh toán DEMO. Không có tiền thật.";}
else if(action==="customer_checkin"&&x.status==="paid"){x.checkinCustomer=true;if(x.checkinGuide)x.status="in_progress";msg="Khách đã xác nhận gặp HDV (demo).";}
else if(action==="guide_checkin"&&x.status==="paid"){x.checkinGuide=true;if(x.checkinCustomer)x.status="in_progress";msg="HDV đã xác nhận có mặt (demo).";}
else if(action==="guide_complete"&&x.status==="in_progress"){x.completedByGuide=true;x.status="awaiting_confirmation";msg="Đang chờ khách xác nhận hoàn thành.";}
else if(action==="customer_confirm"&&x.status==="awaiting_confirmation"&&!x.dispute){x.confirmedByCustomer=true;x.status="available";x.payoutStatus="available";msg="Đã đối soát mô phỏng, thu nhập có thể rút.";}
else if(action==="dispute"&&["paid","in_progress","awaiting_confirmation"].includes(x.status)){x.previousStatus=x.status;x.status="disputed";x.dispute=true;msg="Đã ghi nhận sự cố DEMO. Giải ngân bị khóa.";}
else if(action==="resolve_complete"&&x.status==="disputed"){x.dispute=false;x.status=x.completedByGuide?"awaiting_confirmation":x.previousStatus==="in_progress"?"in_progress":"paid";msg="Đã xử lý tranh chấp DEMO; vẫn cần khách xác nhận hoàn thành.";}
else if(action==="refund"&&x.status==="disputed"){x.dispute=false;x.status="cancelled";x.payoutStatus="none";msg="Đã đánh dấu hoàn tiền DEMO; không hoàn tiền thật.";}
else if(action==="withdraw"&&x.status==="available"&&!x.dispute){x.status="withdraw_pending";x.withdrawStatus="pending";msg="Đã tạo yêu cầu rút tiền DEMO; chưa gửi ngân hàng.";}
else if(action==="approve_withdraw"&&x.status==="withdraw_pending"&&!x.dispute){x.status="withdrawn";x.withdrawStatus="completed";msg="Đã đánh dấu chi trả DEMO, không chuyển khoản thật.";}
return x;}); if(msg.startsWith("Không thể"))return {rows,message:msg,ok:false};saveLedger(next);return {rows:next,message:msg,ok:true};}
export function addDemoBooking(service="Đồng hành Phố cổ",amount=300000){const rows=readLedger();const id="WX-DEMO-"+String(Date.now());const row={...SEED[0],id,service,amount,createdAt:new Date().toLocaleString("vi-VN"),status:"awaiting_payment",checkinCustomer:false,checkinGuide:false,completedByGuide:false,confirmedByCustomer:false,dispute:false,payoutStatus:"none",withdrawStatus:"none"};saveLedger([row,...rows]);return row;}
