import Link from "next/link";
import PartnerRoleCards from "@/components/PartnerRoleCards";

export const metadata = {
  title: "Cổng Đối Tác Liên Thông · WayEcho Phố Cổ Hà Nội",
  description:
    "Không gian hợp tác liên thông dành cho Hướng dẫn viên, Tình nguyện viên cộng đồng và Doanh nghiệp tiếp cận tại Phố cổ Hà Nội."
};

const partnerRoles = [
  {
    id: "guide", role: "guide",
    title: "Hướng Dẫn Viên & Sighted Guide",
    badge: "Chuyên môn 1-1",
    icon: "🧭",
    color: "#f8ae38",
    desc: "Dành cho hướng dẫn viên có chứng chỉ, người dẫn đường thấu cảm được đào tạo chuẩn WBU. Quản lý lịch hỗ trợ, nhận ca tour tiếp cận, theo dõi ký quỹ Escrow và hồ sơ trợ năng của du khách.",
    features: [
      "Nhận tour & ca đồng hành âm thanh 1-1",
      "Xem hồ sơ tiếp cận & mức độ khiếm thị của khách",
      "Bảo vệ thu nhập qua cơ chế Ký quỹ Escrow",
      "Bản đồ cảnh báo rào cản vỉa hè theo thời gian thực"
    ],
    primaryAction: {
      label: "Vào cổng Hướng dẫn viên",
      href: "/guide"
    },
    secondaryActions: [
      { label: "Xem lịch ca sắp tới", href: "/guide/schedule" },
    ]
  },
  {
    id: "volunteer", role: "guide",
    title: "Tình Nguyện Viên Phố Cổ",
    badge: "Cộng đồng hỗ trợ",
    icon: "🤝",
    color: "#0d9488",
    desc: "Dành cho các bạn trẻ, sinh viên và tình nguyện viên trực tại các trạm di sản Phố Cổ (28 Hàng Buồm, 87 Mã Mây). Đón khách khiếm thị qua đường, hỗ trợ định hướng tại chỗ và cập nhật rào cản vật lý.",
    features: [
      "Trực ca tại Trạm điều phối 28 Hàng Buồm",
      "Nhận yêu cầu hỗ trợ tức thời (Real-time feed)",
      "Khảo sát & báo cáo vật cản dải gạch xúc giác",
      "Hướng dẫn khách sử dụng thiết bị hỗ trợ cá nhân của chính mình"
    ],
    primaryAction: {
      label: "Vào cổng Tình nguyện viên",
      href: "/volunteer"
    },
    secondaryActions: [
      { label: "Quy chuẩn đồng hành WBU", href: "/volunteer#wbu-guidelines" },
      { label: "Bảng tin khảo sát rào cản", href: "/volunteer#audit-feed" },
    ]
  },
  {
    id: "business", role: "business",
    title: "Doanh Nghiệp & Điểm Đến Di Sản",
    badge: "Cơ sở tiếp cận",
    icon: "🏛️",
    color: "#825500",
    desc: "Dành cho ban quản lý di tích (đình, đền, nhà cổ), khách sạn, quán cà phê, nhà hàng và cơ sở văn hóa tại 36 Phố Phường. Minh bạch thông số tiếp cận thực tế và kết nối du khách.",
    features: [
      "Quản lý danh mục dịch vụ & đặt chỗ tiếp cận",
      "Công bố thông số lối dốc, bậc thềm, thực đơn âm thanh",
      "Nhận góp ý trải nghiệm thực tế từ người khiếm thị",
      "Gắn nhãn Đối tác Tiếp cận có kiểm định tại thực địa"
    ],
    primaryAction: {
      label: "Vào cổng Doanh nghiệp",
      href: "/business"
    },
    secondaryActions: [
      { label: "Quản lý dịch vụ & tiếp cận", href: "/business/services" },
    ]
  }
];

export default function PartnerGateway() {
  return (
    <div className="min-h-screen bg-[#faf9f3] py-10 sm:py-14 text-[#212529]">
      <div className="container-page max-w-6xl mx-auto px-4">
        <nav aria-label="Đường dẫn trang" className="mb-5 flex items-center gap-2 text-sm text-[#665b50]">
          <Link href="/" className="hover:text-[#c75c13]">Trang chủ</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page" className="font-semibold text-[#9a4311]">Cổng đối tác liên thông</span>
        </nav>
        <section className="relative overflow-hidden rounded-[30px] border border-[#e8d6bd] bg-[#fff9eb] shadow-[0_12px_40px_rgba(70,45,18,.07)]">
          <div className="absolute inset-y-0 right-0 hidden w-[47%] bg-[url('/assets/images/we-photo-doi-song-pho-co.jpg')] bg-cover bg-center md:block" aria-hidden="true" />
          <div className="absolute inset-y-0 right-0 hidden w-[58%] bg-gradient-to-r from-[#fff9eb] via-[#fff9eb]/80 to-transparent md:block" aria-hidden="true" />
          <div className="relative px-6 py-10 sm:px-10 sm:py-14">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#e9c98c] bg-white/90 px-4 py-2 text-xs font-bold text-[#9c5708]">✦ Đồng hành cùng du lịch hòa nhập</span>
            <h1 className="mt-5 max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-[#352016] sm:text-5xl">Cổng đối tác liên thông WayEcho</h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-[#624735]">Một điểm kết nối dành cho Hướng dẫn viên, Tình nguyện viên và Doanh nghiệp cùng phát triển trải nghiệm du lịch tiếp cận tại Hà Nội.</p>
            <p className="mt-4 text-sm font-semibold text-[#8c5700]">Tìm hiểu quyền lợi và tính năng từng nhóm bên dưới, sau đó chọn cổng phù hợp để truy cập bản demo.</p>
          </div>
        </section>
        <section aria-label="Ba nhóm đối tác WayEcho" className="mt-10">
          <div className="mb-6">
            <h2 className="text-2xl font-extrabold text-[#352016] sm:text-3xl">Chọn cổng làm việc của bạn</h2>
            <p className="mt-2 text-sm leading-6 text-[#665b50]">Mỗi nhóm có một không gian làm việc riêng. Đọc phần giới thiệu, bấm <strong>Vào cổng</strong> để xem màn hình đăng nhập demo và tiếp tục tới đúng cổng đã có.</p>
          </div>
          <PartnerRoleCards roles={partnerRoles} />
        </section>

        {/* Dispatch & Operations Notice */}
        <section className="mt-10 rounded-3xl border border-[#ebd9c5] bg-[#fffbf2] p-6 sm:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#c75c13] uppercase tracking-wider">
                <span className="h-2 w-2 rounded-full bg-[#16a34a] animate-pulse" />
                <span>Trạm Điều Phối Thực Địa Phố Cổ</span>
              </div>
              <h3 className="mt-1 text-xl font-bold text-[#352016]">
                Trạm Hỗ Trợ 28 Hàng Buồm & Trung Tâm Văn Hóa 87 Mã Mây
              </h3>
              <p className="mt-2 text-sm text-[#665b50] max-w-2xl leading-relaxed">
                Trang này mô phỏng cách kết nối Hướng dẫn viên, Tình nguyện viên và Du khách.
                WayEcho không vận hành trạm cứu hộ và không cung cấp, bán hay cho mượn gậy trắng, tai nghe hoặc thiết bị trợ năng.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 shrink-0">
              <Link
                href="/partners/cooperate"
                className="rounded-xl border border-[#d66217] bg-white px-4 py-2.5 text-sm font-bold text-[#d66217] hover:bg-[#ffedd5] transition-colors"
              >
                📝 Đăng ký hợp tác
              </Link>
              <Link
                href="/sos"
                className="rounded-xl bg-[#dc2626] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#b91c1c] transition-colors"
              >
                🚨 SOS Khẩn cấp
              </Link>
            </div>
          </div>
        </section>

        {/* Accessibility & Ethics Commitments */}
        <section className="mt-10 border-t border-[#ebd9c5] pt-8">
          <h3 className="text-lg font-bold text-[#352016]">Nguyên Tắc Làm Việc Cùng Người Khiếm Thị</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-3 text-sm text-[#554336]">
            <div className="rounded-2xl bg-white p-4 border border-[#ebd9c5]">
              <p className="font-bold text-[#352016]">1. Tôn Trọng Quyền Tự Chủ</p>
              <p className="mt-1 text-xs text-[#665b50]">
                Luôn hỏi ý kiến trước khi chạm hoặc dẫn dắt. Không kéo gậy trắng hay tự ý xốc nách khách.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-4 border border-[#ebd9c5]">
              <p className="font-bold text-[#352016]">2. Mô Tả Bằng Vị Trí Kim Đồng Hồ</p>
              <p className="mt-1 text-xs text-[#665b50]">
                Sử dụng hướng chỉ 12 giờ (phía trước), 3 giờ (bên phải), 9 giờ (bên trái) để chỉ vị trí bậc thềm, cửa ra vào.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-4 border border-[#ebd9c5]">
              <p className="font-bold text-[#352016]">3. Minh Bạch Thông Số Kỹ Thuật</p>
              <p className="mt-1 text-xs text-[#665b50]">
                Không nói &ldquo;dễ đi&rdquo; chung chung. Hãy nói rõ: có 2 bậc tam cấp cao 15cm, có gờ dốc tạm hay vỉa hè hẹp.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
