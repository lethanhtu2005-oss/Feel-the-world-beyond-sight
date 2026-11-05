import InfoPage from "@/components/InfoPage";
import {pageMetadata} from "@/lib/seo";
import {contactSections} from "@/data/legalContent";
export const metadata=pageMetadata("Liên hệ WayEcho","Các kênh liên hệ minh họa của WayEcho, gửi phản hồi, báo lỗi và tìm hiểu hợp tác.","/contact");
export default function ContactPage(){return <InfoPage eyebrow="WAYECHO CONTACT CENTER" title="Liên hệ với chúng tôi" subtitle="Chúng tôi luôn sẵn sàng lắng nghe bạn" intro="WayEcho coi phản hồi của người dùng là một phần quan trọng trong quá trình phát triển. Nếu bạn có câu hỏi, gặp sự cố, phát hiện thông tin chưa chính xác hoặc muốn đề xuất hợp tác, hãy tham khảo các thông tin dưới đây. Lưu ý các kênh liên hệ trong Prototype chưa được xác minh là đang hoạt động." sections={contactSections} notice="Hotline, email, địa chỉ trạm hỗ trợ và giờ phục vụ được nêu trong trang này đều là thông tin minh họa Prototype, không phải đầu mối hỗ trợ đang hoạt động. Không dùng trong tình huống khẩn cấp."/>}
