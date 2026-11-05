// Ephemeral WebRTC signaling for the WayEcho prototype.
// IMPORTANT: In-memory state is NOT suitable for serverless multi-instance production.
// This endpoint is disabled on production unless explicitly enabled and secured.
import { NextResponse } from "next/server";
import { authenticate } from "@/lib/auth";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
import {list,transaction,insert} from "@/lib/store";
const active = process.env.NODE_ENV !== "production" || process.env.WAYECHO_DEMO_VIDEO_ENABLED === "true";
const TTL=25*60*1000;
function json(data,status=200){return NextResponse.json(data,{status,headers:{"Cache-Control":"no-store"}})}
function validRoom(room){return typeof room==="string"&&/^[a-f0-9-]{36}$/.test(room)}
async function advisorAuthorized(request){try{const u=await authenticate(request);return ["admin","advisor"].includes(u.role)}catch{return false}}
export async function POST(request){
 if(!active)return json({error:"Chưa bật tư vấn video trên máy chủ."},503);
 let body;try{body=await request.json()}catch{return json({error:"Dữ liệu không hợp lệ."},400)}
 const {action,room,role,payload}=body||{};
 if(action==="create"){
  const id=crypto.randomUUID();
  await transaction(db=>{db.consultations??=[];insert(db,"consultations",{room:id,updated:Date.now(),seq:0,events:[]});});
  return json({room:id});
 }
 if(!validRoom(room))return json({error:"Mã phiên không hợp lệ."},400);
 if(action==="send"){
  if(!["visitor","advisor"].includes(role)||!payload||JSON.stringify(payload).length>20000)return json({error:"Thông điệp không hợp lệ."},400);
  if(role==="advisor"&&!(await advisorAuthorized(request)))return json({error:"Tư vấn viên cần đăng nhập đúng quyền."},403);
  if(!["offer","answer","candidate","chat","bye"].includes(payload.type)||(role==="visitor"&&payload.type==="answer")||(role==="advisor"&&payload.type==="offer"))return json({error:"Loại tín hiệu không hợp lệ."},400);
  return transaction(db=>{const r=db.consultations.find(x=>x.room===room);if(!r||Date.now()-r.updated>TTL)return json({error:"Phiên đã hết hạn."},404);r.events.push({seq:++r.seq,role,payload});if(r.events.length>150)r.events.shift();r.updated=Date.now();return json({ok:true})}).catch(()=>json({error:"Máy chủ không lưu được tín hiệu tư vấn."},503));
 }
 if(action==="end"){
  if(role==="advisor"&&!(await advisorAuthorized(request)))return json({error:"Không có quyền kết thúc."},403);
  await transaction(db=>{db.consultations=db.consultations.filter(x=>x.room!==room);});return json({ok:true});
 }
 return json({error:"Hành động không hợp lệ."},400);
}
export async function GET(request){
 if(!active)return json({error:"Chưa bật tư vấn video trên máy chủ."},503);
 const url=new URL(request.url),room=url.searchParams.get("room"),role=url.searchParams.get("role"),since=Number(url.searchParams.get("since")||0);
 if(role==="advisor"&&!(await advisorAuthorized(request)))return json({error:"Tư vấn viên cần đăng nhập."},403);
 if(!validRoom(room)||!["visitor","advisor"].includes(role)||!Number.isSafeInteger(since)||since<0)return json({error:"Tham số không hợp lệ."},400);
 const rows=await list("consultations");const r=rows.find(x=>x.room===room);
 if(!r||Date.now()-r.updated>TTL)return json({error:"Phiên đã hết hạn hoặc không tồn tại."},404);
 return json({events:r.events.filter(e=>e.seq>since&&e.role!==role),seq:r.seq});
}
