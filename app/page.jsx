import {pageMetadata,siteOrigin,jsonLd} from "@/lib/seo";
import Link from "next/link";
import DestinationGallery from "@/components/DestinationGallery";
import HomeOldQuarterCards from "@/components/HomeOldQuarterCards";
import HomeDiscoverySearch, { HomeDiscoveryHeroActions } from "@/components/HomeDiscoverySearch";
import { WayEchoAudioPreview, WayEchoTripPreparation } from "@/components/WayEchoHome/WayEchoHomeSections";
import { destinations } from "@/data/destinations";
import VerifiedImage from "@/components/VerifiedImage";
import {
  AccessibleIcon,
  BedIcon,
  BookmarkIcon,
  BusIcon,
  CameraIcon,
  CompassIcon,
  FoodIcon,
  HeadphonesIcon,
  MapPinIcon,
  MicIcon,
  MuseumIcon,
  SearchIcon,
  SpeakerIcon,
  UserIcon,
} from "@/components/Icons";

export const metadata=pageMetadata("WayEcho — Du lịch Hà Nội cho người khiếm thị","Tìm hiểu điểm đến Hà Nội, đối chiếu dữ liệu tiếp cận và chuẩn bị hành trình theo nhu cầu của bạn. Công cụ SOS, camera và booking có giới hạn demo.","/");

const FALLBACK = "/assets/images/location-image-unavailable.svg";

const HOME_IMAGES = {
  oldQuarterMain: {
    src: "/assets/images/old-quarter-motorbikes.jpg",
    alt: "Ảnh minh họa nhịp sống đường phố Hà Nội với phương tiện giao thông.",
  },
  oldQuarterLife: {
    src: "/assets/images/street-bikes.jpg",
    alt: "Một con phố trong khu phố cổ Hà Nội với xe đạp, người dân và khách tham quan đi lại giữa hai dãy nhà thấp tầng.",
  },
  oldQuarterCafe: {
    src: "/assets/images/egg-coffee-cafe.jpg",
    alt: "Mặt tiền một quán cà phê trong khu phố cổ Hà Nội với ánh đèn vàng ấm, bàn ghế phía trong và xe cộ lướt qua ngoài đường.",
  },
  oldQuarterFood: {
    src: "/assets/images/wet-market.jpg",
    alt: "Một khu hàng quán trong phố cổ Hà Nội đông người, ánh đèn ấm và không khí buôn bán nhộn nhịp.",
  },
  navigation: {
    src: "/assets/images/we-minh-hoa-dieu-huong-ban-do.jpg",
    alt: "Hình thiết kế minh họa điện thoại có bản đồ và đường đi, không phải giao diện bản đồ thực tế của WayEcho.",
  },
  camera: {
    src: "/assets/images/we-minh-hoa-tro-ly-camera.jpg",
    alt: "Hình thiết kế minh họa một điện thoại với vùng camera chụp phố cổ, không phải camera đang hoạt động.",
  },
  humanSupport: {
    src: "/assets/images/we-ai-ho-tro-tinh-nguyen-vien.jpg",
    alt: "Ảnh AI minh họa các tình nguyện viên hỗ trợ khách tham quan, không đại diện cho tình nguyện viên thật của WayEcho.",
  },
};

const needCards = [
  { icon: AccessibleIcon, label: "Thông tin\nđiểm đến", href: "/explore", tone: "bg-[#41b866]" },
  { icon: BedIcon, label: "Lưu trú\nDEMO", href: "/explore?cat=accommodation", tone: "bg-[#4d83cc]" },
  { icon: BusIcon, label: "Di chuyển\nDEMO", href: "/explore?cat=transport", tone: "bg-[#f56f41]" },
  { icon: FoodIcon, label: "Ẩm thực\nđịa phương", href: "/explore?cat=restaurant", tone: "bg-[#ea5973]" },
  { icon: MuseumIcon, label: "Trải nghiệm\nvăn hóa", href: "/explore?cat=activity", tone: "bg-[#8d62d8]" },
  { icon: UserIcon, label: "Người đồng\nhành", href: "/services/guides", tone: "bg-[#eea22e]" },
];

const destinationCards = destinations.slice(0,4).map(d => ({title:d.name,area:d.area,image:{src:d.image,alt:d.alt},facts:[d.access.status],badge:d.access.level,badgeClass:"bg-amber-100 text-amber-950",href:`/destination?d=${d.slug}`}));

const featureCards = [
  {
    icon: MicIcon,
    title: "Khám phá bằng giọng nói",
    desc: "Nói khi thiết bị hỗ trợ hoặc nhập bằng bàn phím để tìm điểm đến và dịch vụ trong dữ liệu hiện có.",
    tone: "bg-[#ff6b2c]",
  },
  {
    icon: AccessibleIcon,
    title: "Thông tin tiếp cận rõ ràng",
    desc: "Đối chiếu nguồn và trạng thái dữ liệu. Tiện ích chưa xác minh luôn được ghi rõ để bạn chủ động hỏi trước.",
    tone: "bg-[#397ecb]",
  },
  {
    icon: CompassIcon,
    title: "Thông tin vị trí tham khảo",
    desc: "Xem vị trí và khoảng cách tham khảo; không dùng bản đồ hoặc AI như công cụ dẫn đường an toàn.",
    tone: "bg-[#35a356]",
  },
  {
    icon: UserIcon,
    title: "Trợ lý tại điểm đến",
    desc: "Hướng dẫn chi tiết, gợi ý trải nghiệm phù hợp và hỗ trợ nhanh khi bạn cần giúp đỡ.",
    tone: "bg-[#8a5bd2]",
  },
];

const journeyAssist = [
  {
    image: HOME_IMAGES.navigation,
    icon: CompassIcon,
    title: "Khám phá vị trí",
    desc: "Bản đồ giúp tìm hiểu điểm đến và khoảng cách tham khảo, không hướng dẫn di chuyển an toàn.",
    href: "/navigation",
  },
  {
    image: HOME_IMAGES.camera,
    icon: CameraIcon,
    title: "Trợ lý camera",
    desc: "Camera trên thiết bị và mô tả cảnh bằng tiếng Việt khi đã cấp quyền và cấu hình dịch vụ AI; AI có thể nhận diện sai.",
    href: "/assistant",
  },
  {
    image: HOME_IMAGES.humanSupport,
    icon: UserIcon,
    title: "Hỗ trợ con người",
    desc: "Tìm hiểu phạm vi Guide/Assistant và luồng yêu cầu DEMO. Chưa có đối tác được phân công thực tế.",
    href: "/services/guides",
  },
];

const processSteps = [
  { n: "1", icon: SearchIcon, title: "Khám phá", desc: "Tìm kiếm điểm đến, xem thông tin và hình ảnh bằng giọng nói." },
  { n: "2", icon: AccessibleIcon, title: "Kiểm tra tiếp cận", desc: "Xem mức độ tiếp cận, lối đi phù hợp và các tiện ích hỗ trợ tại điểm đến." },
  { n: "3", icon: MuseumIcon, title: "Đặt dịch vụ & hỗ trợ", desc: "Đặt vé, đặt Guide/Assistant hoặc các dịch vụ hỗ trợ cần thiết." },
  { n: "4", icon: MapPinIcon, title: "Trải nghiệm điểm đến", desc: "Tìm hiểu cảnh quan và địa điểm; nếu cần di chuyển, dùng gậy dò đường và sự hỗ trợ phù hợp." },
];

const stories = [
  {
    initial: "M",
    quote: "“Mình muốn nghe giới thiệu về Hồ Gươm trước khi đi và hỏi rõ những hỗ trợ đang có ở điểm đến.”",
    name: "Minh Đức",
    role: "Người khiếm thị",
  },
  {
    initial: "T",
    quote: "“Tôi nhìn kém nên muốn đối chiếu thông tin tiếp cận, gọi hỗ trợ và kiểm tra xem thông tin nào chỉ là minh họa. Nhờ vậy, tôi tự tin khám phá Hà Nội hơn rất nhiều.”",
    name: "Thu Hà",
    role: "Người nhìn kém",
  },
  {
    initial: "H",
    quote: "“Là thành viên cộng đồng, tôi rất vui khi thấy WayEcho tạo ra một cầu nối ý nghĩa. Tôi mong có một nơi để hướng dẫn viên và tình nguyện viên đăng ký hỗ trợ du khách minh bạch hơn.”",
    name: "Anh Hùng",
    role: "Thành viên cộng đồng",
  },
];

function RoundIcon({ children, className = "" }) {
  return <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white ${className}`}>{children}</span>;
}

export default function HomePage() {
  return (
    <div className="home-page wayecho-redesign hc-surface relative overflow-hidden">
      <section className="we-home-hero container-page pb-8 pt-8 lg:pb-12 lg:pt-12 relative">
        {/* Decorative 3D Ambient Bubble Elements — Integrated into Hero background */}
        <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden select-none" aria-hidden="true">
          {/* Warm Amber Bubble behind headline creating soft golden depth */}
          <div className="bubble-orb-amber -top-16 -left-12 h-72 w-72 sm:h-96 sm:w-96 opacity-45" />
          {/* Subtle Ambient Glass Orb floating between headline and mosaic */}
          <div className="bubble-orb-glass top-1/4 left-[44%] h-48 w-48 opacity-35 hidden md:block" />
          {/* Glass Bubble highlighting photo mosaic depth */}
          <div className="bubble-orb-glass -bottom-10 right-4 h-64 w-64 sm:h-80 sm:w-80 opacity-55" />
          {/* Complementary warm amber accent orb upper right */}
          <div className="bubble-orb-amber -top-8 right-12 h-52 w-52 opacity-35" />
        </div>

        <div className="we-home-hero-inner relative z-10 grid items-center gap-8 lg:grid-cols-[.92fr_1.08fr] lg:gap-12">
          <div>
            <span className="chip hc-surface hc-border shadow-sm"><AccessibleIcon size={16} /> Thiết kế cho người khiếm thị</span>
            <h1 className="mt-5 max-w-[650px] text-5xl leading-[.98] sm:text-6xl lg:text-[68px]">
              Khám phá Hà Nội,<br /><span className="text-[#eb5d27]">theo cách của bạn</span>
            </h1>
            <p className="hc-muted mt-5 max-w-[650px] text-[18px] leading-8 text-ink-soft">
              Dành cho người khiếm thị và người nhìn kém. Khám phá Phố cổ qua âm thanh, thông tin tiếp cận và sự đồng hành của con người — với quyền chủ động luôn thuộc về bạn.
            </p>
            <HomeDiscoveryHeroActions />
            <p className="hc-muted mt-5 flex items-center gap-3 text-sm italic text-ink-soft"><span aria-hidden="true" className="inline-block h-[4px] w-10 rounded-full bg-primary" /> Hà Nội gần hơn, cho mọi người</p>
          </div>

          <div className="we-photo-mosaic grid min-h-[430px] grid-cols-2 grid-rows-2 gap-3" aria-label="Một số hình ảnh thật về Phố cổ Hà Nội">
            <Link href="/destination?d=pho-co" className="group relative row-span-1 overflow-hidden rounded-[24px] shadow-card lg:row-span-2">
              <VerifiedImage src={HOME_IMAGES.oldQuarterMain.src} fallback={FALLBACK} alt={HOME_IMAGES.oldQuarterMain.alt} priority className="h-full min-h-[250px] w-full object-cover transition duration-300 group-hover:scale-[1.02]" />
              <span className="absolute inset-x-4 bottom-4 rounded-2xl bg-black/60 px-4 py-3 text-white backdrop-blur-sm"><span className="flex items-center gap-2 font-bold"><MapPinIcon size={18} /> Phố cổ Hà Nội</span><span className="block pl-6 text-xs text-white/85">Không gian phố xưa giữa lòng thủ đô</span></span>
            </Link>
            <Link href="/destination?d=pho-co" className="group relative overflow-hidden rounded-[24px] shadow-card">
              <VerifiedImage src={HOME_IMAGES.oldQuarterLife.src} fallback={FALLBACK} alt={HOME_IMAGES.oldQuarterLife.alt} loading="eager" className="h-full min-h-[205px] w-full object-cover transition duration-300 group-hover:scale-[1.02]" />
              <span className="absolute inset-x-3 bottom-3 rounded-2xl bg-black/60 px-3 py-2.5 text-white backdrop-blur-sm"><span className="flex items-center gap-2 font-bold"><MapPinIcon size={17} /> Nhịp sống phố cổ</span><span className="block pl-6 text-[11px] text-white/85">Con phố nhỏ, xe đạp và đời sống thường ngày</span></span>
            </Link>
            <div className="grid grid-cols-2 gap-3">
              <figure className="relative overflow-hidden rounded-[22px] shadow-card">
                <VerifiedImage src={HOME_IMAGES.oldQuarterCafe.src} fallback={FALLBACK} alt={HOME_IMAGES.oldQuarterCafe.alt} loading="eager" className="h-full min-h-[205px] w-full object-cover" />
                <figcaption className="absolute inset-x-2 bottom-2 rounded-xl bg-black/60 px-2.5 py-2 text-white backdrop-blur-sm"><span className="font-bold">Cà phê phố cổ</span><span className="block text-[10px] text-white/85">Một khoảng dừng chân ấm áp</span></figcaption>
              </figure>
              <figure className="relative overflow-hidden rounded-[22px] shadow-card">
                <VerifiedImage src={HOME_IMAGES.oldQuarterFood.src} fallback={FALLBACK} alt={HOME_IMAGES.oldQuarterFood.alt} loading="eager" className="h-full min-h-[205px] w-full object-cover" />
                <figcaption className="absolute inset-x-2 bottom-2 rounded-xl bg-black/60 px-2.5 py-2 text-white backdrop-blur-sm"><span className="font-bold">Hàng quán phố cổ</span><span className="block text-[10px] text-white/85">Không khí nhộn nhịp về đêm</span></figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      <HomeDiscoverySearch />

      <section className="container-page pb-11 relative z-10" aria-labelledby="need-heading">
        <div className="mb-4">
          <h2 id="need-heading" className="text-3xl text-[#352016]">Chọn theo nhu cầu</h2>
          <p className="hc-muted mt-1 text-ink-soft">Lựa chọn nhanh các dịch vụ và thông tin phù hợp với hành trình của bạn.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          {needCards.map(({ icon: Icon, label, href, tone }) => (
            <Link key={label} href={href} className="group flex min-h-[108px] items-center gap-3 rounded-2xl glass-liquid p-4 card-3d hc-surface hc-border lg:flex-col lg:items-start">
              <RoundIcon className={`${tone} shadow-md`}><Icon size={23} /></RoundIcon>
              <span className="whitespace-pre-line font-bold leading-tight text-ink">{label}</span><span aria-hidden="true" className="ml-auto text-xl lg:hidden text-ink-soft">›</span>
            </Link>
          ))}
        </div>
      </section>

      <HomeOldQuarterCards />
      <div className="container-page py-6">
        <WayEchoAudioPreview />
      </div>

      <section className="container-page py-12 relative z-10" aria-labelledby="help-heading">
        <h2 id="help-heading" className="text-4xl text-[#352016]">WayEcho giúp bạn như thế nào?</h2>
        <p className="hc-muted mt-1 text-ink-soft">Những tính năng được thiết kế để hành trình khám phá Hà Nội của bạn dễ dàng và chủ động hơn.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featureCards.map(({ icon: Icon, title, desc, tone }) => (
            <article key={title} className="glass-liquid rounded-2xl p-5 card-3d hc-surface hc-border">
              <RoundIcon className={`${tone} shadow-md`}><Icon size={23} /></RoundIcon>
              <h3 className="mt-4 text-[22px] text-[#352016]">{title}</h3>
              <p className="hc-muted mt-2 text-sm leading-6 text-ink-soft">{desc}</p>
            </article>
          ))}
        </div>
      </section>

      <DestinationGallery destinations={destinations} />
      <div className="container-page pb-12">
        <WayEchoTripPreparation />
      </div>

      <section className="border-y border-line bg-[#fffdf8] py-12 hc-surface hc-border" aria-labelledby="assistant-heading">
        <div className="container-page">
          <h2 id="assistant-heading" className="text-5xl">Trợ lý <span className="text-[#eb5d27]">trong hành trình</span></h2>
          <p className="hc-muted mt-2 max-w-2xl text-lg text-ink-soft">Công nghệ và con người cùng đồng hành, giúp bạn tự tin khám phá Hà Nội theo cách của riêng mình.</p>
          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {journeyAssist.map(({ image, icon: Icon, title, desc, href }) => (
              <article key={title} className="overflow-hidden rounded-[22px] border border-line bg-white shadow-card hc-surface hc-border">
                <VerifiedImage src={image.src} fallback={FALLBACK} alt={image.alt} className="h-60 w-full object-cover" />
                <div className="flex gap-4 p-5">
                  <RoundIcon className="bg-[#f48627]"><Icon size={24} /></RoundIcon>
                  <div className="min-w-0 flex-1"><h3 className="text-2xl">{title}</h3><p className="hc-muted mt-2 text-sm leading-6 text-ink-soft">{desc}</p></div>
                  <Link href={href} aria-label={`Mở ${title}`} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-alt text-xl">→</Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-6 rounded-[22px] border border-line bg-white p-5 shadow-card hc-surface hc-border sm:p-7">
            <h2 className="text-4xl">Hành trình với <span className="text-[#eb5d27]">WayEcho</span></h2>
            <p className="hc-muted mt-1 text-ink-soft">Bốn bước rõ ràng để tìm hiểu, kiểm tra và lựa chọn hỗ trợ phù hợp.</p>
            <ol className="mt-6 grid gap-5 lg:grid-cols-4">
              {processSteps.map(({ n, icon: Icon, title, desc }) => (
                <li key={n} className="relative flex gap-4 lg:block">
                  <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#fff3e0] text-[#ee7d20]"><Icon size={28} /><span className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-sm font-bold text-ink">{n}</span></div>
                  <div className="lg:mt-4"><h3 className="text-xl">{title}</h3><p className="hc-muted mt-2 text-sm leading-6 text-ink-soft">{desc}</p></div>
                  {n !== "4" && <span aria-hidden="true" className="absolute right-0 top-6 hidden text-3xl text-primary lg:block">›</span>}
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-8" aria-labelledby="stories-heading">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div><h2 id="stories-heading" className="text-4xl">Những <span className="text-[#eb5d27]">tình huống minh họa</span></h2><p className="hc-muted mt-1 text-ink-soft">Nội dung mẫu để minh họa nhu cầu sử dụng, không phải đánh giá của khách hàng đã được xác minh.</p></div>
              <Link href="/review" className="btn-ghost hc-border !min-h-[42px] !px-5 !py-2 text-sm">Viết đánh giá trải nghiệm →</Link>
            </div>
            <div className="mt-5 grid gap-4 lg:grid-cols-3">
              {stories.map((story) => (
                <article key={story.name} className="rounded-2xl border border-line bg-white p-5 shadow-card hc-surface hc-border">
                  <div className="flex gap-4"><div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#f3e3c5] text-xl font-bold text-[#8b5b12]" aria-hidden="true">{story.initial}</div><div><p className="text-sm leading-6 text-ink-soft hc-muted">{story.quote}</p><p className="mt-3 font-bold">{story.name}</p><p className="text-sm text-ink-soft hc-muted">{story.role}</p></div></div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-12" id="download-app" aria-labelledby="download-heading">
        <div className="overflow-hidden rounded-[28px] border border-[#eedfc9] bg-[linear-gradient(110deg,#fff7e9_0%,#fffdf9_55%,#f8ebd2_100%)] shadow-card hc-surface hc-border">
          <div className="grid items-center gap-8 p-7 lg:grid-cols-[1.05fr_.95fr] lg:p-10">
            <div>
              <h2 id="download-heading" className="text-5xl">Cài đặt ứng dụng <span className="text-[#eb5d27]">WayEcho</span></h2>
              <p className="mt-2 text-2xl font-semibold">Khám phá Hà Nội luôn sẵn sàng trên điện thoại của bạn.</p>
              <p className="hc-muted mt-4 max-w-2xl text-ink-soft">WayEcho hỗ trợ Progressive Web App (PWA) cài đặt trực tiếp không cần tải từ kho ứng dụng, hoạt động mượt mà với VoiceOver và TalkBack trên iOS và Android.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/app" aria-label="Xem hướng dẫn cài WayEcho trên iPhone hoặc iPad" className="rounded-xl bg-black px-5 py-3 text-white"><span className="block text-[10px] uppercase tracking-wider">Cài đặt trên iOS</span><span className="text-xl font-bold">➕ Thêm vào MH chính</span></Link>
                <Link href="/app" aria-label="Xem hướng dẫn cài WayEcho trên Android" className="rounded-xl bg-black px-5 py-3 text-white"><span className="block text-[10px] uppercase tracking-wider">Cài đặt trên Android</span><span className="text-xl font-bold">▶ Cài đặt Web App</span></Link>
              </div>
              <p className="hc-muted mt-5 flex items-center gap-3 italic text-ink-soft"><span aria-hidden="true" className="inline-block h-[4px] w-10 rounded-full bg-primary" /> Cùng WayEcho, Hà Nội gần hơn, cho mọi người!</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-[1fr_230px] sm:items-center">
              <div className="space-y-5">
                <div className="flex gap-4"><RoundIcon className="bg-[#f6a62e] text-ink"><MicIcon size={22} /></RoundIcon><div><h3 className="text-xl">Khám phá bằng giọng nói</h3><p className="hc-muted mt-1 text-sm text-ink-soft">Nói nhu cầu để tìm địa điểm và dịch vụ lập tức.</p></div></div>
                <div className="flex gap-4"><RoundIcon className="bg-[#3f7dca]"><BookmarkIcon size={22} /></RoundIcon><div><h3 className="text-xl">Lưu hành trình cá nhân</h3><p className="hc-muted mt-1 text-sm text-ink-soft">Lưu lại điểm đến yêu thích và lên lịch trình linh hoạt.</p></div></div>
                <div className="flex gap-4"><RoundIcon className="bg-[#ec633b]"><HeadphonesIcon size={22} /></RoundIcon><div><h3 className="text-xl">Hỗ trợ khẩn cấp SOS</h3><p className="hc-muted mt-1 text-sm text-ink-soft">Lấy tọa độ GPS, gửi SMS cho người thân và gọi 115 ngay trong một màn hình.</p></div></div>
              </div>
              <div className="relative mx-auto w-[220px] rounded-[34px] border-[8px] border-[#111827] bg-white p-3 shadow-2xl" aria-label="Mô phỏng giao diện ứng dụng WayEcho trên điện thoại">
                <div className="mx-auto mb-3 h-2 w-20 rounded-full bg-[#1f2937]" />
                <div className="flex items-center gap-2 text-sm font-black"><span className="text-[#ef6d28]">⌖</span> Way<span className="text-[#ef6d28]">Echo</span></div>
                <div className="mt-3 rounded-xl border border-line bg-white p-2 text-[10px] shadow-sm">Bạn muốn khám phá Hà Nội điều gì? <span className="float-right rounded-full bg-primary p-1"><MicIcon size={12} /></span></div>
                <div className="mt-3 grid grid-cols-4 gap-1 text-center text-[8px]"><span>♿<br />Điểm đến</span><span>🍴<br />Ẩm thực</span><span>🏛<br />Văn hóa</span><span>🧭<br />Bản đồ</span></div>
                <div className="mt-3 text-[10px] font-bold">Khám phá Hà Nội</div>
                <div className="mt-2 rounded-2xl border border-[#eadbc8] bg-[#fff5e7] p-3" aria-label="Minh họa giao diện danh sách điểm đến, không phải ảnh chụp lặp lại">
                  <p className="text-xs font-bold text-[#a64d18]">Gợi ý trong chuyến đi</p>
                  <div className="mt-2 flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs"><span aria-hidden="true">📍</span><span>Nhà cổ 87 Mã Mây</span></div>
                  <div className="mt-2 flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs"><span aria-hidden="true">🔊</span><span>Nghe thông tin điểm đến</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-[22px] border border-line bg-white p-6 shadow-card hc-surface hc-border">
          <div className="grid gap-5 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
            <div><h2 className="text-4xl">Cần hỗ trợ thêm?</h2><p className="hc-muted mt-1 text-ink-soft">Xem hướng dẫn, tìm hiểu các hình thức hỗ trợ và kênh liên hệ được công bố trên WayEcho.</p></div>
            <div className="grid gap-3 sm:grid-cols-3">
              <Link href="/onboarding" className="flex gap-3 rounded-2xl border border-line p-4 hover:bg-surface-alt hc-border"><RoundIcon className="bg-[#dceaff] text-[#3d73bc]"><span aria-hidden="true" className="text-xl">▤</span></RoundIcon><div><h3 className="text-base">Xem hướng dẫn sử dụng</h3><p className="hc-muted mt-1 text-xs text-ink-soft">Tìm hiểu cách sử dụng WayEcho dễ dàng và nhanh chóng.</p></div></Link>
              <Link href="/contact" className="flex gap-3 rounded-2xl border border-line p-4 hover:bg-surface-alt hc-border"><RoundIcon className="bg-[#dff4e5] text-[#238a4d]"><HeadphonesIcon size={21} /></RoundIcon><div><h3 className="text-base">Liên hệ hỗ trợ</h3><p className="hc-muted mt-1 text-xs text-ink-soft">Đặt câu hỏi hoặc nhận hỗ trợ từ đội ngũ của chúng tôi.</p></div></Link>
              <Link href="/services/guides" className="flex gap-3 rounded-2xl border border-line p-4 hover:bg-surface-alt hc-border"><RoundIcon className="bg-[#ffe9ca] text-[#d57d0a]"><UserIcon size={21} /></RoundIcon><div><h3 className="text-base">Tìm Guide & Assistant</h3><p className="hc-muted mt-1 text-xs text-ink-soft">Kết nối với hướng dẫn viên và trợ lý phù hợp.</p></div></Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
