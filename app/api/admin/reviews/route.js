import {secured,fail,json} from "@/lib/auth";
import {list,transaction} from "@/lib/store";
export const dynamic="force-dynamic";
const sanitize=r=>({id:r.id,itemId:r.itemId,itemName:r.itemName,author:r.author,comment:r.comment,ratings:r.ratings,createdAt:r.createdAt,hiddenAt:r.hiddenAt||null,hiddenReason:r.hiddenReason||null});
export const GET=secured(async()=>json((await list("reviews")).map(sanitize)),["admin"]);
export const PATCH=secured(async(req,user)=>{
 let body;try{body=await req.json()}catch{fail(400,"Dữ liệu JSON không hợp lệ.")}
 const {id,action,reason}=body||{};
 if(typeof id!=="string"||!['hide','restore'].includes(action))fail(400,"Thao tác không hợp lệ.");
 if(action==='hide'&&(typeof reason!=="string"||reason.trim().length<8||reason.length>500))fail(400,"Cần ghi lý do vi phạm ít nhất 8 ký tự.");
 const result=await transaction(db=>{
  const row=db.reviews.find(r=>r.id===id);if(!row)fail(404,"Không tìm thấy đánh giá.");
  const now=new Date().toISOString();
  if(action==='hide'){row.hiddenAt=now;row.hiddenReason=reason.trim();row.hiddenBy=user.id;}
  else{row.hiddenAt=null;row.hiddenReason=null;row.hiddenBy=null;}
  db.reviewModerationLog??=[];
  db.reviewModerationLog.push({id:crypto.randomUUID(),reviewId:id,action,reason:action==='hide'?reason.trim():'Khôi phục hiển thị',actorId:user.id,at:now});
  return sanitize(row);
 });return json(result)
},["admin"]);
