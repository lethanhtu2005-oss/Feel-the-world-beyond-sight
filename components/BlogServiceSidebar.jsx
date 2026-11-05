import Link from "next/link";
import {getNewBlogPost} from "@/data/newBlogPosts";
import {getOldQuarterBlog} from "@/data/oldQuarterBlogs";

// Mỗi bài trong bộ 10 bài WayEcho có đúng một thẻ chuyển đổi riêng.
// Đây là gợi ý biên tập; không giả định quan hệ đối tác, chứng nhận trợ năng hay đặt xe thành công.
export const editorialOffers = {
  "gioi-thieu-wayecho-du-lich-tiep-can": {
    eyebrow: "Khám phá dịch vụ phù hợp", title: "Tìm nơi lưu trú tại Phố cổ",
    description: "Xem danh sách khách sạn, nhà nghỉ và đối chiếu thông tin tiếp cận trước khi lựa chọn.",
    action: "Khám phá nơi lưu trú", href: "/explore?cat=accommodation", icon: "⌂", note: "Thông tin trợ năng chưa khảo sát thực địa cần được xác nhận với cơ sở."
  },
  "tro-ly-giong-noi-camera-ai": {
    eyebrow: "Có người đồng hành", title: "Hỏi tư vấn viên WayEcho",
    description: "Khi công nghệ không đủ chắc chắn, hãy tìm hiểu cách liên hệ người tư vấn thay vì phụ thuộc vào AI để dẫn đường.",
    action: "Xem kênh hỗ trợ", href: "/contact", icon: "☏", note: "Tư vấn trực tiếp và camera từ xa chỉ khả dụng khi phiên hỗ trợ thực sự được kết nối."
  },
  "hear-your-way": {
    eyebrow: "Tự chọn cách khám phá", title: "Hướng dẫn viên & người đồng hành",
    description: "Tìm hiểu các hình thức đồng hành và nhu cầu hỗ trợ mà bạn muốn trao đổi trước chuyến đi.",
    action: "Xem người đồng hành", href: "/services/guides", icon: "♙", note: "Hồ sơ, lịch trực và khả năng nhận khách demo chưa phải nhân sự đã xác minh."
  },
  "ho-guom-den-ngoc-son-tiep-can": {
    eyebrow: "Gợi ý tham quan", title: "Khám phá điểm đến quanh Hồ Gươm",
    description: "Tra cứu địa điểm, mô tả không gian và thông tin tham quan trước khi lên kế hoạch.",
    action: "Xem Hồ Gươm & Đền Ngọc Sơn", href: "/destination?d=ho-guom", icon: "⌖", note: "Không mặc định lối đi, công trình hoặc dịch vụ nào đáp ứng trợ năng nếu chưa kiểm chứng."
  },
  "nha-co-87-ma-may-am-thanh": {
    eyebrow: "Trải nghiệm di sản", title: "Điểm tham quan Phố cổ Hà Nội",
    description: "Tìm các địa điểm văn hóa liên quan đến không gian phố nghề và nhà cổ.",
    action: "Xem Nhà cổ 87 Mã Mây", href: "/destination?d=nha-co-87-ma-may", icon: "▣", note: "Thông tin vé, giờ mở cửa và tiện ích cần xác nhận trước chuyến đi."
  },
  "am-thuc-pho-co-qr-sound": {
    eyebrow: "Ẩm thực Phố cổ", title: "Tìm nhà hàng & quán ăn",
    description: "Tìm nơi ăn uống, xem mô tả món và hỏi cơ sở về thực đơn, giá, dị ứng hay hỗ trợ tại chỗ.",
    action: "Khám phá ẩm thực", href: "/explore?cat=restaurant", icon: "♨", note: "Menu âm thanh QR là ý tưởng trải nghiệm, không mặc định mọi nhà hàng đều cung cấp."
  },
  "tuyen-am-thanh-pho-co": {
    eyebrow: "Khám phá có người hỗ trợ", title: "Đặt hướng dẫn viên tham quan",
    description: "Tìm hướng dẫn viên để trao đổi lịch trình, mô tả di sản và nhu cầu đồng hành trực tiếp.",
    action: "Xem hướng dẫn viên", href: "/services/guides", icon: "♙", note: "WayEcho không cung cấp Audio Guide; dịch vụ đồng hành đang ở trạng thái minh họa, không thay thế hướng dẫn an toàn."
  },
  "mang-luoi-huong-dan-vien": {
    eyebrow: "Người đồng hành", title: "Tìm người hỗ trợ phù hợp",
    description: "Xem hồ sơ hướng dẫn viên, phân biệt hình thức hướng dẫn và đồng hành trước khi đặt dịch vụ.",
    action: "Xem danh sách hỗ trợ", href: "/services/guides", icon: "♧", note: "Danh sách nhân sự hiện mang tính minh họa; cần xác thực trước khi giao dịch thật."
  },
  "xich-lo-xe-dien-pho-co": {
    eyebrow: "Di chuyển cùng đối tác", title: "Đặt xe với đối tác mô phỏng",
    description: "Chuẩn bị điểm đón, nơi đến và yêu cầu hỗ trợ; sau đó chuyển sang kênh chính thức của nhà cung cấp.",
    action: "Chọn dịch vụ đặt xe", href: "/services/ride-booking", icon: "↗", note: "Dữ liệu giá và bên cung cấp hiện là minh họa; đặt xe thử chưa tạo chuyến thực tế."
  },
  "tram-ho-tro-hang-buom": {
    eyebrow: "Thông tin & hỗ trợ", title: "Liên hệ hỗ trợ WayEcho",
    description: "Tìm các kênh liên hệ và thông tin hỗ trợ trước chuyến đi, đặc biệt khi cần người đồng hành.",
    action: "Xem thông tin liên hệ", href: "/contact", icon: "☏", note: "Trạm hỗ trợ 28 Hàng Buồm là nội dung mô phỏng, không phải điểm hỗ trợ thực tế."
  }
};

const legacyOffer = {eyebrow:"Dịch vụ liên quan",title:"Khám phá dịch vụ Phố cổ",description:"Xem các dịch vụ liên quan đến điểm đến và kiểm tra thông tin trước khi đặt.",action:"Xem dịch vụ",href:"/explore",icon:"⌂",note:"Gợi ý dịch vụ không đồng nghĩa quan hệ đối tác hoặc dữ liệu trợ năng đã xác minh."};

export default function BlogServiceSidebar({article}) {
  const offer = editorialOffers[article.slug] || legacyOffer;
  const related = (article.relatedSlugs || []).map(slug => getNewBlogPost(slug) || getOldQuarterBlog(slug)).filter(Boolean).slice(0, 2);
  return <aside className="min-w-0" aria-label="Dịch vụ liên quan đến bài viết"><div className="sticky top-28 space-y-5">
    <section data-blog-service-card={article.slug} className="overflow-hidden rounded-[26px] border border-[#f1dfc8] bg-[#fff9f0] shadow-card">
      <div className="bg-gradient-to-br from-[#ffe6c4] via-[#fff3e1] to-[#fffaf3] px-6 pb-6 pt-7">
        <div className="flex items-start gap-3"><span aria-hidden="true" className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#f28a22] text-3xl font-bold text-white shadow-sm">{offer.icon}</span><div><p className="text-[11px] font-extrabold uppercase tracking-[.12em] text-[#9a4b20]">{offer.eyebrow}</p><h2 className="mt-2 font-body text-[27px] font-bold leading-[1.15] text-[#542b18]">{offer.title}</h2></div></div>
        <p className="mt-5 text-[15px] leading-7 text-[#604939]">{offer.description}</p>
        <Link className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#e77724] px-4 py-3 text-center text-sm font-bold text-white transition-colors hover:bg-[#b94f1e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600" href={offer.href}>{offer.action} <span aria-hidden="true" className="ml-2">→</span></Link>
      </div><p className="px-6 py-4 text-xs leading-5 text-[#775d47]">{offer.note}</p>
    </section>
    {related.length > 0 && <div className="rounded-[23px] border border-[#efddc8] bg-white p-5 shadow-sm"><h3 className="font-body text-[23px] font-bold text-[#542b18]">Khám phá câu chuyện khác</h3>{related.map(post => <Link key={post.slug} className="mt-3 block border-t border-[#f1dfc8] pt-3 text-sm font-semibold leading-6 text-[#a84d20] hover:underline" href={`/articles/${post.slug}`}>{post.title} →</Link>)}</div>}
    <p className="px-2 text-xs leading-5 text-[#766253]">Gợi ý biên tập theo chủ đề, không phải quảng cáo được trả phí. Nếu có hợp đồng tài trợ, WayEcho sẽ gắn nhãn “Nội dung tài trợ” rõ ràng.</p>
  </div></aside>;
}
