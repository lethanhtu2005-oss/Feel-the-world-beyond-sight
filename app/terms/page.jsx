import InfoPage from "@/components/InfoPage";
import {pageMetadata} from "@/lib/seo";
import {termsSections} from "@/data/legalContent";
export const metadata=pageMetadata("Điều khoản sử dụng WayEcho","Quyền, trách nhiệm và giới hạn sử dụng các tính năng Prototype WayEcho.","/terms");
export default function TermsPage(){return <InfoPage eyebrow="WAYECHO TERMS OF USE · V1.0 · 03/11/2026" title="Điều khoản sử dụng" subtitle="Áp dụng cho phiên bản thử nghiệm (Prototype)" intro="Chào mừng bạn đến với WayEcho. Điều khoản này quy định quyền, trách nhiệm và các điều kiện áp dụng khi truy cập nền tảng. Bằng việc sử dụng WayEcho, bạn được đề nghị đọc kỹ các giới hạn của phiên bản Prototype." sections={termsSections} notice="WayEcho là sản phẩm Prototype phục vụ học tập, nghiên cứu và trình diễn; không phải dịch vụ thương mại hoặc dịch vụ khẩn cấp. Hãy sử dụng thiết bị trợ năng và phương tiện hỗ trợ phù hợp trong môi trường thực tế."/>}
