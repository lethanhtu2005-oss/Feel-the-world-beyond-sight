import Link from "next/link";
import Image from "next/image";
import {notFound} from "next/navigation";
import InterestForm from "@/components/InterestForm";
import {pageMetadata} from "@/lib/seo";
import styles from "./cooperate.module.css";

const pages={business:{title:"Dành cho doanh nghiệp",kind:"business",description:"Tìm hiểu cách chia sẻ thông tin dịch vụ và đề xuất hợp tác về du lịch tiếp cận."},guide:{title:"Dành cho Guide & Assistant",kind:"guide",description:"Tìm hiểu vai trò hướng dẫn, hỗ trợ đồng hành và gửi đăng ký quan tâm khi hệ thống tiếp nhận được bật."},cooperate:{title:"Hợp tác cùng WayEcho",kind:"cooperation",description:"Cùng xây dựng trải nghiệm du lịch Phố cổ Hà Nội thân thiện và dễ tiếp cận hơn cho người mù và người nhìn kém."}};
export function generateStaticParams(){return Object.keys(pages).map(kind=>({kind}));}
export async function generateMetadata({params}){const kind=(await params).kind,p=pages[kind];return p?pageMetadata(p.title,p.description,`/partners/${kind}`):{robots:{index:false}};}

function CooperationPage(){return <div className={styles.page}>
  <section className={styles.hero} aria-labelledby="cooperate-title">
    <div className={styles.heroText}>
      <p className={styles.eyebrow}><span aria-hidden="true">✦</span> KẾT NỐI CỘNG ĐỒNG · PHỐ CỔ HÀ NỘI</p>
      <h1 id="cooperate-title">Hợp tác cùng <span>WayEcho</span></h1>
      <p className={styles.lead}>Cùng xây dựng một Phố cổ thân thiện, nơi người mù và người nhìn kém có thể chủ động tìm hiểu, lựa chọn và tận hưởng trải nghiệm du lịch.</p>
      <p className={styles.heroNote}>WayEcho đang phát triển bản mô phỏng du lịch tiếp cận. Chúng tôi tìm kiếm sự kết nối và góp ý từ các cơ sở dịch vụ tại địa phương; chưa công bố đối tác chính thức.</p>
      <div className={styles.heroActions}><Link className={styles.primaryAction} href="/contact">Trao đổi về hợp tác <span aria-hidden="true">↗</span></Link><a className={styles.secondaryAction} href="#quyen-loi">Tìm hiểu lợi ích <span aria-hidden="true">↓</span></a></div>
    </div>
    <div className={styles.heroVisual}>
      <Image src="/assets/images/we-photo-pho-co-goc-pho.jpg" alt="Một góc phố cổ Hà Nội với kiến trúc và nhịp sống địa phương" fill priority sizes="(max-width:900px) 100vw, 45vw" className={styles.heroPhoto}/>
      <div className={styles.imageCaption}>Bắt đầu từ những địa điểm gần gũi nhất ở Hà Nội.</div>
    </div>
  </section>
  <div className={styles.container}>
    <section className={styles.intro} aria-labelledby="why-partner"><p className={styles.kicker}>VÌ SAO CHÚNG TÔI MUỐN KẾT NỐI?</p><h2 id="why-partner">Mỗi cơ sở thân thiện là một điểm khởi đầu cho hành trình tự tin hơn</h2><p>WayEcho là nền tảng du lịch tiếp cận hướng tới du khách mù và nhìn kém. Chúng tôi mong muốn kết nối với nhà hàng, quán ăn, quán cà phê, khách sạn, cơ sở di chuyển và điểm tham quan cùng quan tâm đến môi trường du lịch thân thiện, bình đẳng và dễ tiếp cận.</p><p>Không nhất thiết phải có đầy đủ tiện ích hỗ trợ ngay từ đầu. Điều quan trọng là cung cấp thông tin đúng với thực tế và đón tiếp mỗi người bằng thái độ tôn trọng.</p></section>
    <section id="quyen-loi" className={styles.benefits} aria-labelledby="benefits-title"><div className={styles.sectionHeading}><p className={styles.kicker}>GIÁ TRỊ HỢP TÁC</p><h2 id="benefits-title">WayEcho có thể cùng doanh nghiệp tạo nên điều gì?</h2></div>
      <div className={styles.benefitGrid}>
        <article className={styles.benefitCard}><span className={styles.icon} aria-hidden="true">⌂</span><h3>Giới thiệu cơ sở rõ ràng</h3><p>Trang thông tin riêng giúp khách tìm hiểu hình ảnh, địa chỉ, không gian và những điều kiện tiếp cận trước khi ghé thăm.</p></article>
        <article className={styles.benefitCard}><span className={styles.icon} aria-hidden="true">◎</span><h3>Hiểu trước nhu cầu hỗ trợ</h3><p>Khi khách chủ động đồng ý chia sẻ, cơ sở có thể xem yêu cầu như hỗ trợ tìm lối vào, hướng dẫn đến bàn hoặc định hướng không gian.</p></article>
        <article className={styles.benefitCard}><span className={styles.icon} aria-hidden="true">♡</span><h3>Cùng cải thiện trải nghiệm</h3><p>Phản hồi từ người sử dụng giúp cơ sở nhận ra những chi tiết nhỏ có thể cải thiện để phục vụ khách tốt hơn.</p></article>
      </div>
    </section>
    <section className={styles.details} aria-labelledby="details-title"><div className={styles.detailsPhoto}><Image src="/assets/images/cafe-street.jpg" alt="Không gian quán cà phê và sinh hoạt đường phố tại Hà Nội" fill sizes="(max-width:900px) 100vw, 42vw"/></div><div className={styles.detailsText}><p className={styles.kicker}>THÔNG TIN HỮU ÍCH</p><h2 id="details-title">Để du khách chuẩn bị trước khi đến</h2><p>WayEcho hướng tới việc trình bày điều kiện thực tế của từng cơ sở theo cách dễ hiểu và có thể đọc bằng công nghệ hỗ trợ.</p><ul><li>Lối vào, bậc cửa và độ thuận tiện khi tiếp cận.</li><li>Không gian di chuyển, vị trí bàn ghế và nhà vệ sinh.</li><li>Thông tin liên hệ, điểm hẹn và hình ảnh phù hợp.</li><li>Khả năng hỗ trợ trực tiếp của nhân viên khi được yêu cầu.</li></ul><p className={styles.detailFoot}>Thông tin sẽ cần được đối chiếu và xác minh trước khi được coi là đánh giá thực tế về khả năng tiếp cận.</p></div></section>
    <section className={styles.values} aria-labelledby="values-title"><p className={styles.kicker}>NGUYÊN TẮC ĐỒNG HÀNH</p><h2 id="values-title">Minh bạch trước, cải thiện cùng nhau</h2><div className={styles.valueList}><div><strong>01 · Trung thực</strong><p>Mô tả đúng điều kiện hiện có, kể cả những điểm còn hạn chế.</p></div><div><strong>02 · Tôn trọng</strong><p>Lắng nghe và hỏi khách trước khi hỗ trợ, không tự quyết thay họ.</p></div><div><strong>03 · Từng bước</strong><p>Tiếp nhận phản hồi và ưu tiên những cải thiện phù hợp với năng lực cơ sở.</p></div></div></section>
    <section className={styles.cta} aria-labelledby="cta-title"><div><p className={styles.kicker}>CÙNG BẮT ĐẦU TỪ PHỐ CỔ HÀ NỘI</p><h2 id="cta-title">Bạn muốn cơ sở của mình trở nên dễ tiếp cận hơn?</h2><p>WayEcho đang ở giai đoạn thử nghiệm và mong được lắng nghe các doanh nghiệp tiên phong tại địa phương. Hãy chia sẻ lĩnh vực hoạt động, khu vực và hình thức đồng hành bạn quan tâm.</p><p className={styles.contactNote}>Bạn có thể liên hệ qua trang <Link href="/contact">Liên hệ với chúng tôi</Link>. Email <strong>support@wayecho.vn</strong> do nhóm dự án đề xuất cần được xác nhận hoạt động trước khi sử dụng chính thức.</p></div><div className={styles.ctaActions}><Link href="/contact" className={styles.primaryAction}>Liên hệ WayEcho <span aria-hidden="true">↗</span></Link><Link href="/partner" className={styles.secondaryAction}>Cổng Đối tác Liên thông <span aria-hidden="true">→</span></Link></div></section>
    <div className={styles.formSection}><InterestForm kind="cooperation" enabled={process.env.WAYECHO_INQUIRIES_ENABLED==="1"}/></div>
    <p className={styles.disclaimer}>Lưu ý: Đây là website prototype. Việc gửi đề xuất chưa tạo quan hệ hợp tác, tài khoản đối tác hoặc cam kết doanh thu; các dịch vụ minh họa chưa phải dịch vụ vận hành thực tế.</p>
  </div>
</div>}

export default async function Partner({params}){const kind=(await params).kind,p=pages[kind];if(!p)notFound();if(kind==="cooperate")return <CooperationPage/>;return <div className="container-page py-10"><div className="max-w-3xl"><p className="font-semibold">Kết nối cùng WayEcho</p><h1 className="mt-2 text-4xl sm:text-5xl">{p.title}</h1><p className="mt-4 text-xl">{p.description}</p><section className="mt-7"><h2 className="text-3xl">Thông tin hợp tác</h2><p className="mt-3">WayEcho hướng đến việc giúp người mù và người nhìn kém tìm hiểu thông tin du lịch. Các thông tin đối tác trong bản mô phỏng chưa tương đương với hợp tác hoặc phân công thật.</p><p className="mt-3">{kind==="guide"?"Vai trò hướng dẫn viên và người đồng hành cần được trao đổi, đào tạo và xác minh trước khi triển khai thực tế.":"Hãy mô tả hình thức hợp tác, địa điểm, dịch vụ và điều kiện tiếp cận mà cơ sở có thể cung cấp."}</p></section><InterestForm kind={p.kind} enabled={process.env.WAYECHO_INQUIRIES_ENABLED==="1"}/><div className="mt-7 flex flex-wrap gap-3"><Link href={kind==="guide"?"/guide/login":"/login"} className="btn-ghost">Đã có tài khoản? Đăng nhập</Link><Link href="/contact" className="btn-ghost">Liên hệ với chúng tôi</Link><Link href="/partners/cooperate" className="btn-ghost">Hợp tác cùng WayEcho</Link></div></div></div>}
