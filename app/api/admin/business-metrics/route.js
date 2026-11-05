import {secured,json} from "@/lib/auth";
import {list,storageModeName} from "@/lib/store";
import {serviceBreakdown} from "@/lib/serviceEconomics";
export const dynamic="force-dynamic";
export const GET=secured(async()=>{
  const bookings=await list("bookings");
  const completed=bookings.filter(b=>b.status==="completed");
  const guides=completed.filter(b=>b.guideId&&b.pricingDemo?.kind==="guide");
  const estimatedPlatformFees=guides.reduce((sum,b)=>sum+(b.pricingDemo?.platformFee||0),0);
  return json({isDemo:true,storage:storageModeName(), total:bookings.length,pending:bookings.filter(b=>b.status==="pending").length,completed:completed.length,guideCompleted:guides.length,guidePlatformFeeDemo:estimatedPlatformFees,unconfirmed:bookings.filter(b=>!b.pricingDemo&&b.guideId).length,guideReference:serviceBreakdown("guide"),notice:"Số liệu đặt chỗ demo; không có doanh thu thực nhận hoặc xác nhận thanh toán ngân hàng."});
},["admin"]);
