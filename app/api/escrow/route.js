import {secured,fail,json} from "@/lib/auth";
import {list,transaction,insert} from "@/lib/store";
import {canSee,changeEscrow} from "@/lib/escrowServer";
export const dynamic="force-dynamic";
export const GET=secured(async(req,user)=>json((await list("escrow")).filter(row=>canSee(user,row))),["traveler","guide","admin"],{guest:true});
export const POST=secured(async(req,user)=>{
 let body;try{body=await req.json()}catch{fail(400,"Dữ liệu không hợp lệ.")}
 if(!body||typeof body.id!=="string"||typeof body.action!=="string")fail(400,"Thiếu mã giao dịch hoặc thao tác.");
 const result=await transaction(db=>{
  const row=db.escrow.find(x=>x.id===body.id);if(!row||!canSee(user,row))fail(404,"Không tìm thấy giao dịch có quyền truy cập.");
  const changed=changeEscrow(row,body.action,user.role);Object.assign(row,changed);
  if(body.action === "customer_confirm" && row.confirmedByCustomer) {
    const booking=db.bookings.find(x=>x.id===row.bookingId && x.ownerId===row.ownerId);
    if(booking && booking.status === "confirmed") { booking.status="completed"; booking.updatedAt=new Date().toISOString(); }
  }
  insert(db,"notifications",{ownerId:row.ownerId,role:"traveler",type:"escrow_status",message:`Giao dịch demo ${row.bookingId}: ${row.status}`});
  return row;
 });return json(result);
},["traveler","guide","admin"],{guest:true});
