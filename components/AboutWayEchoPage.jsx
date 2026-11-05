import Link from "next/link";
import content from "@/data/aboutWayEcho.json";

function RichText({value}) {
  return <>{value.split(/(\*\*[^*]+\*\*)/g).map((part,i)=>part.startsWith("**")&&part.endsWith("**")?<strong key={i}>{part.slice(2,-2)}</strong>:<span key={i}>{part}</span>)}</>;
}
const values=[{icon:"◎",title:"Tôn trọng"},{icon:"✓",title:"Trung thực"},{icon:"◉",title:"Lắng nghe"},{icon:"✦",title:"Khiêm tốn"},{icon:"♡",title:"Chung tay"}];
export default function AboutWayEchoPage({kind}) {
  const isMission=kind==="mission";
  const blocks=isMission?content.mission:content.intro;
  return <div className="min-h-screen bg-[#fffaf1] text-[#39291e]">
    <div className="relative overflow-hidden bg-gradient-to-r from-[#fff0d0] via-[#fff8ec] to-[#ffe6a9]">
      <div className="container-page relative py-12 sm:py-20">
        <nav aria-label="Đường dẫn trang" className="mb-6 text-sm"><Link href="/" className="underline underline-offset-4">Trang chủ</Link><span aria-hidden="true"> › </span><span aria-current="page">{isMission?"Sứ mệnh và tầm nhìn":"Giới thiệu dự án"}</span></nav>
        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_.9fr]">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full bg-[#ffdf87] px-4 py-2 text-sm font-bold text-[#75450c]">WAYECHO · DỰ ÁN DU LỊCH TIẾP CẬN</span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight sm:text-5xl">{isMission?"Sứ mệnh, tầm nhìn và giá trị":"WayEcho – Feel the world beyond sight"}</h1>
            <p className="mt-4 text-lg leading-relaxed">{isMission?"Từng bước xây dựng trải nghiệm du lịch cởi mở, dễ tiếp cận và tôn trọng quyền lựa chọn của mỗi người.":"Cảm nhận thế giới vượt ngoài tầm nhìn."}</p>
            <p className="mt-4 rounded-2xl border border-[#efce8b] bg-white/80 p-4 text-sm leading-relaxed"><strong>Thông tin về dự án:</strong> WayEcho là bản mô phỏng phục vụ học tập và nghiên cứu của nhóm sinh viên Trường Đại học Phenikaa. Dịch vụ và thông tin tiếp cận chưa được xác minh để vận hành thực tế.</p>
          </div>
          <img src={isMission?"/assets/images/old-quarter-street.jpg":"/assets/images/we-photo-ho-guom-cau-the-huc.jpg"} alt={isMission?"Khung cảnh phố cổ Hà Nội":"Khung cảnh Hồ Hoàn Kiếm tại Hà Nội"} className="h-64 w-full rounded-[28px] object-cover shadow-lg sm:h-80" />
        </div>
      </div>
    </div>
    <div className="container-page grid gap-8 py-10 lg:grid-cols-[230px_minmax(0,1fr)] lg:py-14">
      <aside className="lg:sticky lg:top-24 lg:self-start"><div className="rounded-3xl border border-[#f0dfc5] bg-white p-4 shadow-sm"><h2 className="mb-3 font-bold">Về WayEcho</h2><nav aria-label="Nội dung dự án" className="space-y-2"><Link className={`block rounded-xl px-4 py-3 ${!isMission?"bg-[#ffdd83] font-bold":"hover:bg-[#fff4de]"}`} href="/about">Giới thiệu dự án</Link><Link className={`block rounded-xl px-4 py-3 ${isMission?"bg-[#ffdd83] font-bold":"hover:bg-[#fff4de]"}`} href="/mission">Sứ mệnh và tầm nhìn</Link><Link className="block rounded-xl px-4 py-3 hover:bg-[#fff4de]" href="/contact">Liên hệ và góp ý</Link></nav></div></aside>
      <article className="min-w-0 rounded-[30px] border border-[#efdfca] bg-white px-5 py-7 shadow-sm sm:px-10 sm:py-10">
        {blocks.map((block,i)=>{
          if(block.type==="hero"||block.type==="tagline")return null;
          if(block.type==="h2")return <h2 key={i} className="mb-4 mt-10 border-l-4 border-[#f6a51c] pl-4 text-2xl font-extrabold first:mt-0 sm:text-3xl">{block.text}</h2>;
          if(block.type==="bold")return <h3 key={i} className="mb-2 mt-7 text-lg font-bold text-[#ad670b] sm:text-xl">{block.text}</h3>;
          return <p key={i} className="mb-5 text-base leading-8 sm:text-[17px]"><RichText value={block.text}/></p>;
        })}
        <div className="mt-10 flex flex-wrap gap-3 border-t border-[#f3e6d4] pt-7"><Link href={isMission?"/about":"/mission"} className="inline-flex min-h-12 items-center rounded-full bg-[#ffb72e] px-6 font-bold text-[#32220e] hover:bg-[#f8a718]">{isMission?"Tìm hiểu về dự án":"Xem sứ mệnh và tầm nhìn"} →</Link><Link href="/contact" className="inline-flex min-h-12 items-center rounded-full border border-[#dab982] px-6 font-semibold hover:bg-[#fff4dd]">Gửi góp ý</Link></div>
      </article>
    </div>
  </div>;
}
