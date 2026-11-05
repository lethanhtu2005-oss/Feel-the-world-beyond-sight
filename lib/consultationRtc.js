export async function signal(action,room,role,payload){
 const res=await fetch('/api/consultation',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action,room,role,payload}),cache:'no-store'});
 const data=await res.json();if(!res.ok)throw Error(data.error||'Không kết nối được máy chủ.');return data;
}
export function createRtc(){return new RTCPeerConnection({iceServers:[{urls:'stun:stun.l.google.com:19302'}]});}
export function readVietnamese(text){if(!('speechSynthesis' in window))return false;window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='vi-VN';u.rate=.95;const voices=window.speechSynthesis.getVoices();const vietnamese=voices.find(v=>v.lang?.toLowerCase().startsWith('vi'));if(vietnamese)u.voice=vietnamese;else return false;window.speechSynthesis.speak(u);return true;}
export function hasVietnameseVoice(){return 'speechSynthesis' in window&&window.speechSynthesis.getVoices().some(v=>v.lang?.toLowerCase().startsWith('vi'));}
