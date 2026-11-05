"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isInternalPortalPath } from "@/lib/portalRoutes";
import Logo from "./Logo";

const footerLink =
  "inline-flex min-h-11 items-center rounded-md text-[15px] text-[#f2e4d8] transition-colors hover:text-[#ffd35d] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ffcf7c]";

export default function Footer() {
  const pathname = usePathname();

  if (isInternalPortalPath(pathname)) return null;

  return (
    <footer
      className="site-footer mt-0 bg-[#352016] text-[#fff2e7] print:hidden"
      role="contentinfo"
      aria-label="Chân trang WayEcho"
    >
      <div className="container-page py-12 sm:py-14">
        <div className="footer-container flex flex-col-reverse justify-between gap-10 lg:flex-row lg:gap-12">
          {/* ==================== KHU VỰC BÊN TRÁI: CÁC CỘT LIÊN KẾT ==================== */}
          <div className="footer-left grid flex-1 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {/* CỘT 1: WAYECHO */}
            <div className="footer-col">
              <h3 className="footer-heading mb-5 text-lg sm:text-xl font-extrabold uppercase tracking-wide leading-tight text-[#ffc342]">
                WAYECHO
              </h3>
              <ul className="space-y-1">
                <li>
                  <Link className={footerLink} href="/about">
                    Giới thiệu dự án
                  </Link>
                </li>
                <li>
                  <Link className={footerLink} href="/mission">
                    Sứ mệnh và tầm nhìn
                  </Link>
                </li>
                <li>
                  <Link className={`${footerLink} !font-bold !text-[#ffcf7c] hover:!text-white`} href="/partner" aria-label="Mở Cổng Đối tác Liên thông dành cho hướng dẫn viên, tình nguyện viên và doanh nghiệp">
                    Cổng Đối tác Liên thông
                  </Link>
                </li>
                <li>
                  <Link className={footerLink} href="/partners/cooperate">
                    Hợp tác cùng WayEcho
                  </Link>
                </li>
                <li>
                  <Link className={footerLink} href="/faq">
                    Câu hỏi thường gặp
                  </Link>
                </li>
              </ul>
            </div>

            {/* CỘT 2: KHÁM PHÁ HÀ NỘI */}
            <div className="footer-col">
              <h3 className="footer-heading mb-5 text-lg sm:text-xl font-extrabold uppercase tracking-wide leading-tight text-[#ffc342]">
                KHÁM PHÁ HÀ NỘI
              </h3>
              <ul className="space-y-1">
                <li>
                  <Link className={footerLink} href="/destination">
                    Điểm đến Phố Cổ
                  </Link>
                </li>
                <li>
                  <Link className={footerLink} href="/explore">
                    Khám phá các dịch vụ
                  </Link>
                </li>
                <li>
                  <Link className={footerLink} href="/explore?cat=activity">
                    Tour & Trải nghiệm
                  </Link>
                </li>
                <li>
                  <Link className={footerLink} href="/explore?cat=restaurant">
                    Ẩm thực Phố Cổ
                  </Link>
                </li>
                <li>
                  <Link className={footerLink} href="/articles">
                    Blog khám phá Hà Nội
                  </Link>
                </li>
                <li>
                  <Link className={footerLink} href="/explore?cat=transport">
                    Dịch vụ di chuyển
                  </Link>
                </li>
                <li>
                  <Link className={footerLink} href="/services/ride-booking">
                    Đặt xe hỗ trợ (demo)
                  </Link>
                </li>
              </ul>
            </div>

            {/* CỘT 3: HỖ TRỢ */}
            <div className="footer-col">
              <h3 className="footer-heading mb-5 text-lg sm:text-xl font-extrabold uppercase tracking-wide leading-tight text-[#ffc342]">
                HỖ TRỢ
              </h3>
              <ul className="space-y-1">
                <li>
                  <Link className={footerLink} href="/help">
                    Trung tâm trợ giúp
                  </Link>
                </li>
                <li>
                  <Link className={footerLink} href="/onboarding">
                    Hướng dẫn tương tác
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    className={footerLink}
                    onClick={() => window.dispatchEvent(new CustomEvent("wayecho:consultant"))}
                  >
                    Tư vấn viên
                  </button>
                </li>
                <li>
                  <Link className={footerLink} href="/sos">
                    SOS
                  </Link>
                </li>
              </ul>
            </div>

            {/* CỘT 4: THÔNG TIN PHÁP LÝ */}
            <div className="footer-col">
              <h3 className="footer-heading mb-5 text-lg sm:text-xl font-extrabold uppercase tracking-wide leading-tight text-[#ffc342]">
                THÔNG TIN PHÁP LÝ
              </h3>
              <ul className="space-y-1">
                <li>
                  <Link className={footerLink} href="/privacy">
                    Chính sách bảo mật
                  </Link>
                </li>
                <li>
                  <Link className={footerLink} href="/terms">
                    Điều khoản sử dụng
                  </Link>
                </li>
                <li>
                  <Link className={footerLink} href="/photo-credits">
                    Nguồn ảnh & giấy phép
                  </Link>
                </li>
                <li>
                  <Link className={footerLink} href="/accessibility">
                    Tuyên bố trợ năng (WCAG 2.2)
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* ==================== KHU VỰC BÊN PHẢI: LOGO & GIỚI THIỆU ==================== */}
          <div className="footer-right flex flex-col justify-between border-t border-[#5e3b2a] pt-6 lg:w-[380px] lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0">
            <div className="brand-block">
              <Link
                href="/"
                className="brand-logo inline-flex items-center gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ffcf7c]"
                aria-label="WayEcho - Trang chủ"
              >
                <Logo dark height={34} />
                <span className="text-2xl font-extrabold tracking-tight text-white">WayEcho</span>
              </Link>
              <span className="brand-slogan mt-1 mb-4 block text-xs font-bold tracking-widest text-primary uppercase">
                CẢM NHẬN HÀ NỘI THEO CÁCH CỦA BẠN
              </span>

              <div className="brand-description space-y-3 text-sm leading-relaxed text-[#dcc2af]">
                <p>
                  WayEcho là nền tảng du lịch hướng đến khả năng tiếp cận, hỗ trợ người khiếm thị và
                  người có thị lực kém khám phá Hà Nội một cách chủ động và thuận tiện hơn.
                </p>
                <p>
                  Thông qua các tiện ích hỗ trợ như nội dung mô tả dễ tiếp cận, trợ lý camera AI và
                  thông tin điểm đến, WayEcho mong muốn mở ra những hành trình khám phá giàu trải nghiệm,
                  nơi mọi người đều có thể cảm nhận vẻ đẹp của Hà Nội theo cách riêng.
                </p>
                <p className="tagline-highlight font-semibold italic text-[#ffd35d]">
                  Mở lối trải nghiệm, kết nối mọi hành trình.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== KHỐI DƯỚI CÙNG: SOS & PHÁP LÝ ==================== */}
      <div className="footer-bottom border-t border-[#80604f] bg-[#281811] py-6 text-sm text-[#f2e4d8]">
        <div className="bottom-container container-page flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="contact-and-social">
            <p className="text-sm">
              📍 <strong>Trạm demo:</strong> 28 Hàng Buồm, Hoàn Kiếm, Hà Nội | ✉️{" "}
              <strong>Email:</strong>{" "}
              <a
                href="mailto:support@wayecho.vn"
                className="underline decoration-[#e6af7e] underline-offset-4 hover:text-[#ffd35d] focus-visible:outline-2 focus-visible:outline-[#ffcf7c]"
              >
                support@wayecho.vn
              </a>
            </p>
            <div
              className="social-links mt-3 flex flex-wrap gap-2"
              aria-label="Mạng xã hội WayEcho"
            >
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook WayEcho (mở tab mới)"
                className="inline-flex min-h-[44px] items-center rounded bg-[#4a2e20] px-3 py-1.5 text-xs text-[#cbd5e1] transition-colors hover:bg-primary hover:text-black focus-visible:outline-2 focus-visible:outline-[#ffcf7c]"
              >
                Facebook
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube WayEcho (mở tab mới)"
                className="inline-flex min-h-[44px] items-center rounded bg-[#4a2e20] px-3 py-1.5 text-xs text-[#cbd5e1] transition-colors hover:bg-primary hover:text-black focus-visible:outline-2 focus-visible:outline-[#ffcf7c]"
              >
                YouTube
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok WayEcho (mở tab mới)"
                className="inline-flex min-h-[44px] items-center rounded bg-[#4a2e20] px-3 py-1.5 text-xs text-[#cbd5e1] transition-colors hover:bg-primary hover:text-black focus-visible:outline-2 focus-visible:outline-[#ffcf7c]"
              >
                TikTok
              </a>
            </div>
          </div>

          <div className="contact-cta-block text-left md:text-right">
            <Link
              href="/contact"
              className="btn-contact inline-flex min-h-[44px] items-center justify-center rounded-lg bg-[#F8AE38] px-6 py-3 text-sm font-bold text-[#352016] shadow transition-colors hover:bg-[#E09F2F] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ffcf7c]"
            >
              Liên hệ với chúng tôi
            </Link>
          </div>
        </div>

        <div className="copyright-bar container-page mt-6 border-t border-dashed border-[#5e3b2a] pt-4 text-center text-xs text-[#bda393]">
          <p>© 2026 WayEcho. Mọi quyền được bảo lưu. · Website/App mô phỏng phục vụ nghiên cứu.</p>
          <p className="disclaimer mt-1 text-[11px] opacity-80">
            Thông tin liên hệ, dịch vụ trợ năng và đối tác trong prototype là dữ liệu minh họa, chưa
            xác minh hoạt động thực tế.
          </p>
        </div>
      </div>
    </footer>
  );
}
