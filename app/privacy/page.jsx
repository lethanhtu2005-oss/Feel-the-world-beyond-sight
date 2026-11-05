import InfoPage from "@/components/InfoPage";
import {pageMetadata} from "@/lib/seo";
import {privacySections} from "@/data/legalContent";
export const metadata=pageMetadata("Chính sách bảo mật WayEcho","Nguyên tắc xử lý dữ liệu, quyền của người dùng và giới hạn của Prototype WayEcho.","/privacy");
export default function PrivacyPage(){return <InfoPage eyebrow="WAYECHO PRIVACY POLICY · V1.0 · 03/11/2026" title="Chính sách bảo mật" subtitle="Minh bạch, cần thiết và có trách nhiệm với dữ liệu người dùng" intro="WayEcho tôn trọng quyền riêng tư của người dùng. Chính sách này giải thích nguyên tắc thu thập, sử dụng, lưu trữ, chia sẻ và bảo vệ thông tin trong quá trình truy cập website và trải nghiệm Prototype." sections={privacySections} notice="Nội dung được xây dựng cho Prototype. Trước khi cung cấp dịch vụ thực tế, chính sách cần được rà soát theo cách xử lý dữ liệu thật và quy định pháp luật áp dụng."/>}
