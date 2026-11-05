import {serviceBreakdown} from "./serviceEconomics.js";
import {fail} from "./auth.js";
import {canRead} from "./permissions.js";
export const FEE_PERCENT=12; // Demo assumption, not a contracted fee.
export const LABELS={awaiting_payment:"Chờ thanh toán",paid:"Đã thanh toán mô phỏng",in_progress:"Đang thực hiện",awaiting_confirmation:"Chờ khách xác nhận",disputed:"Tạm dừng vì tranh chấp",available:"Có thể rút (mô phỏng)",withdraw_pending:"Đang chờ duyệt rút",withdrawn:"Đã ghi nhận chi trả mô phỏng",cancelled:"Đã hủy (mô phỏng)"};
export function canSee(user,row){return user.role==="admin" || user.role==="traveler"&&row.ownerId===user.id || user.role==="guide"&&!!user.guideId&&row.guideId===user.guideId;}
export function changeEscrow(row, action, role){
 const next={...row};
 const rules={
 pay:["traveler",["awaiting_payment"]],customer_checkin:["traveler",["paid"]],guide_checkin:["guide",["paid"]],guide_complete:["guide",["in_progress"]],customer_confirm:["traveler",["awaiting_confirmation"]],dispute:["traveler",["paid","in_progress","awaiting_confirmation"]],resolve_complete:["admin",["disputed"]],refund:["admin",["disputed"]],withdraw:["guide",["available"]],approve_withdraw:["admin",["withdraw_pending"]]};
 const rule=rules[action];if(!rule||role!==rule[0]||!rule[1].includes(row.status))fail(409,"Trạng thái hoặc quyền thao tác không phù hợp.");
 if(action==="pay")next.status="paid";
 if(action==="customer_checkin") {next.checkinCustomer=true;if(next.checkinGuide)next.status="in_progress";}
 if(action==="guide_checkin") {next.checkinGuide=true;if(next.checkinCustomer)next.status="in_progress";}
 if(action==="guide_complete"){next.completedByGuide=true;next.status="awaiting_confirmation";}
 if(action==="customer_confirm"){if(!next.completedByGuide||next.dispute)fail(409,"Chuyến đi chưa hoàn thành hoặc đang có tranh chấp.");next.confirmedByCustomer=true;next.status="available";}
 if(action==="dispute"){next.previousStatus=next.status;next.status="disputed";next.dispute=true;}
 if(action==="resolve_complete"){next.dispute=false;next.status=next.completedByGuide?"awaiting_confirmation":next.checkinCustomer&&next.checkinGuide?"in_progress":"paid";}
 if(action==="refund"){next.dispute=false;next.status="cancelled";}
 if(action==="withdraw"){next.status="withdraw_pending";next.withdrawStatus="pending";}
 if(action==="approve_withdraw"){next.status="withdrawn";next.withdrawStatus="completed";}
 next.updatedAt=new Date().toISOString();return next;
}
export function newEscrow(booking){return {bookingId:booking.id,ownerId:booking.ownerId,guideId:booking.guideId,service:booking.itemName,amount:serviceBreakdown("guide").gross,feePercent:FEE_PERCENT,status:"awaiting_payment",checkinCustomer:false,checkinGuide:false,completedByGuide:false,confirmedByCustomer:false,dispute:false,withdrawStatus:"none",isDemo:true};}
