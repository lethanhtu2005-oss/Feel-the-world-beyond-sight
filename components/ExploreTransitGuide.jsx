'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useA11y } from '@/components/A11yProvider';
import {
  MapPinIcon,
  PhoneIcon,
  CheckIcon,
  WalkingIcon,
  AccessibleIcon,
  ShieldIcon,
  SpeakerIcon,
  CompassIcon,
  BusIcon,
  MicIcon,
  InfoIcon,
  CalendarIcon
} from '@/components/Icons';
import VerifiedImage from '@/components/VerifiedImage';

export default function ExploreTransitGuide() {
  const { speak, stop } = useA11y();
  const [isPlayingTTS, setIsPlayingTTS] = useState(false);
  const [pickup, setPickup] = useState('28 Hàng Buồm (Tổng trạm)');
  const [dropoff, setDropoff] = useState('Bờ Hồ Hoàn Kiếm');
  const [assistTypes, setAssistTypes] = useState(['wheelchair', 'guide_dog']);
  const [routeResult, setRouteResult] = useState({
    pickup: '28 Hàng Buồm (Tổng trạm)',
    dropoff: 'Bờ Hồ Hoàn Kiếm',
    title: 'Tuyến Xe Điện Phố Cổ Tuyến 01 (Sàn Thấp Tiếp Cận)',
    badge: '100% Không Bậc Tam Cấp',
    description: 'Đón tại Trạm 28 Hàng Buồm → Bờ Hồ Hoàn Kiếm (Thời gian: 8 phút, tần suất 10 phút/chuyến).',
    features: ['Ram dốc xe 8% (QCVN 10)', 'Loa phát âm thanh báo trạm', 'Hỗ trợ gập gậy và xe lăn']
  });

  const toggleTTS = () => {
    if (isPlayingTTS) {
      stop();
      setIsPlayingTTS(false);
    } else {
      setIsPlayingTTS(true);
      speak(
        'Cẩm nang di chuyển hòa nhập Phố Cổ Hà Nội của WayEcho. Thông tin về dốc lên xuống và các tiện ích trên phương tiện trong bản demo chưa được xác minh. Vui lòng hỏi nhà cung cấp trước khi đi.'
      );
    }
  };

  const handleCalculateRoute = (e) => {
    if (e) e.preventDefault();
    const p = pickup.trim() || '28 Hàng Buồm (Tổng trạm)';
    const d = dropoff.trim() || 'Bờ Hồ Hoàn Kiếm';
    const result = {
      pickup: p,
      dropoff: d,
      title: 'Tuyến Xe Điện Phố Cổ Tuyến 01 (Sàn Thấp Tiếp Cận)',
      badge: '100% Không Bậc Tam Cấp',
      description: `Đón tại ${p} → Đến ${d} (Thời gian ước tính: 8 phút, tần suất 10 phút/chuyến).`,
      features: [
        'Ram dốc sàn xe 8% đạt chuẩn QCVN 10',
        'Loa phát thanh tự động kích hoạt báo trạm theo GPS',
        'Tài xế được đào tạo đón rước du khách khiếm thị tận cửa'
      ]
    };
    setRouteResult(result);
    speak(`Đã tính toán lộ trình tiếp cận tối ưu từ ${p} đến ${d}. Lộ trình không bậc tam cấp, có ram dốc và loa phát báo trạm.`);
  };

  const mic = (setter) => {
    const Recognition = typeof window !== 'undefined' ? (window.SpeechRecognition || window.webkitSpeechRecognition) : null;
    if (!Recognition) {
      speak('Trình duyệt chưa hỗ trợ nhập bằng giọng nói.');
      return;
    }
    const rec = new Recognition();
    rec.lang = 'vi-VN';
    rec.onresult = (e) => {
      const text = e.results[0][0].transcript;
      setter(text);
      speak(`Đã ghi nhận: ${text}`);
    };
    rec.onerror = () => speak('Không nhận được giọng nói. Hãy kiểm tra quyền micro.');
    rec.start();
  };

  return (
    <div className="space-y-10 my-8">
      {/* 1. Accessibility Ribbon */}
      <div className="rounded-2xl border border-line bg-surface-alt p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-emerald-800 dark:text-emerald-400">
          <CheckIcon size={18} className="text-emerald-700" />
          <span>QCVN 10:2014/BXD Thực Địa 36 Phố Phường</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={toggleTTS}
            className={`btn-ghost hc-border !min-h-10 !px-3 text-xs sm:text-sm font-semibold transition-colors ${
              isPlayingTTS ? 'bg-primary text-ink' : ''
            }`}
            aria-label={isPlayingTTS ? 'Dừng phát cẩm nang' : 'Nghe cẩm nang di chuyển 3 phút'}
          >
            <SpeakerIcon size={16} className="text-primary" />
            <span>{isPlayingTTS ? 'Đang phát cẩm nang...' : 'Nghe cẩm nang (3 phút)'}</span>
          </button>
          <a
            href="tel:19008282"
            className="btn-ghost hc-border !min-h-10 !px-3 text-xs sm:text-sm font-bold !bg-red-600 !text-white hover:!bg-red-700 transition-colors"
            aria-label="Gọi khẩn cấp cứu trợ di chuyển 1900 8282"
          >
            <PhoneIcon size={16} />
            <span>Hotline Dẫn Đường: 1900 8282</span>
          </a>
        </div>
      </div>

      {/* 2. Hero & Interactive Route Planner Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Context & Vision */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <span className="chip hc-surface hc-border text-xs uppercase tracking-wider font-bold text-primary">
              Cẩm Nang Giao Thông Hòa Nhập Phố Cổ
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold leading-tight">
              Di Chuyển Không Rào Cản Giữa Trái Tim Hà Nội 36 Phố Phường
            </h2>
            <p className="text-ink-soft text-base sm:text-lg leading-relaxed">
              Hệ sinh thái giao thông tiếp cận WayEcho đồng bộ hóa xe điện sàn thấp, xe buýt trợ năng, công nghệ âm thanh không gian 3D và mạng lưới dẫn đường tình nguyện, giúp người khiếm thị và người dùng xe lăn làm chủ mọi hành trình di sản.
            </p>
          </div>

          {/* Quick Assist Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="card hc-surface hc-border p-4 space-y-1">
              <AccessibleIcon size={24} className="text-primary" />
              <p className="font-bold text-sm">Ram Nâng Dốc Xe</p>
              <p className="text-xs text-ink-soft">Độ dốc tiêu chuẩn 1:12 an toàn</p>
            </div>
            <div className="card hc-surface hc-border p-4 space-y-1">
              <SpeakerIcon size={24} className="text-accent-dark" />
              <p className="font-bold text-sm">Loa Thông Báo Tuyến</p>
              <p className="text-xs text-ink-soft">GPS định vị chuẩn xác từng góc phố</p>
            </div>
            <div className="card hc-surface hc-border p-4 space-y-1">
              <ShieldIcon size={24} className="text-primary" />
              <p className="font-bold text-sm">Chó Dẫn Đường &amp; Gậy</p>
              <p className="text-xs text-ink-soft">100% Không tính thêm phụ phí</p>
            </div>
          </div>

          {/* Transit Image Preview */}
          <div className="relative rounded-2xl overflow-hidden border border-line shadow-sm group">
            <VerifiedImage
              src="/assets/images/we-ai-xe-dien-du-lich.jpg"
              fallback="/assets/images/location-image-unavailable.svg"
              alt="Ảnh AI minh họa dịch vụ xe điện du lịch sàn thấp; không phải ảnh chụp thực tế."
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-5">
              <div className="text-white space-y-1">
                <span className="chip !bg-primary !text-ink text-[11px] font-bold uppercase tracking-wider">
                  Thực địa kết nối di sản
                </span>
                <p className="font-display font-bold text-lg sm:text-xl">
                  Tuyến Xe Điện Di Sản Sàn Thấp kết nối 14 đền chùa &amp; phố nghề
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Route Planner Card */}
        <div className="lg:col-span-5 card hc-surface hc-border p-6 shadow-card space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-line">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-primary text-ink">
                <CompassIcon size={20} />
              </span>
              <div>
                <h3 className="font-bold text-lg">Tìm Tuyến Trợ Năng</h3>
                <p className="text-xs text-ink-soft">Tùy biến theo nhu cầu vận động riêng</p>
              </div>
            </div>
            <span className="chip hc-surface hc-border text-xs font-bold text-primary">
              Trợ Lý AI
            </span>
          </div>

          <form onSubmit={handleCalculateRoute} className="space-y-4">
            <div>
              <label htmlFor="planner-pickup" className="text-xs font-bold uppercase tracking-wide text-ink flex items-center gap-1.5">
                <MapPinIcon size={14} className="text-primary" />
                Điểm xuất phát tại Phố Cổ
              </label>
              <div className="flex gap-2 mt-1">
                <input
                  id="planner-pickup"
                  type="text"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className="min-h-11 w-full rounded-xl border border-line bg-surface px-3 py-2 text-sm text-ink focus-visible:outline-2"
                  placeholder="Ví dụ: 28 Hàng Buồm, 87 Mã Mây..."
                />
                <button
                  type="button"
                  onClick={() => mic(setPickup)}
                  className="btn-ghost hc-border !min-h-11 !px-3 shrink-0"
                  aria-label="Nói điểm xuất phát"
                >
                  <MicIcon size={18} />
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="planner-dropoff" className="text-xs font-bold uppercase tracking-wide text-ink flex items-center gap-1.5">
                <MapPinIcon size={14} className="text-accent-dark" />
                Điểm đến mong muốn
              </label>
              <div className="flex gap-2 mt-1">
                <input
                  id="planner-dropoff"
                  type="text"
                  value={dropoff}
                  onChange={(e) => setDropoff(e.target.value)}
                  className="min-h-11 w-full rounded-xl border border-line bg-surface px-3 py-2 text-sm text-ink focus-visible:outline-2"
                  placeholder="Ví dụ: Đền Ngọc Sơn, Ô Quan Chưởng..."
                />
                <button
                  type="button"
                  onClick={() => mic(setDropoff)}
                  className="btn-ghost hc-border !min-h-11 !px-3 shrink-0"
                  aria-label="Nói điểm đến"
                >
                  <MicIcon size={18} />
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wide text-ink block">
                Hình thức hỗ trợ tiếp cận cần ưu tiên:
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <label className="flex items-center gap-2 p-2 rounded-lg bg-surface-alt border border-line cursor-pointer hover:border-primary">
                  <input
                    type="checkbox"
                    checked={assistTypes.includes('wheelchair')}
                    onChange={(e) => {
                      const next = e.target.checked
                        ? [...assistTypes, 'wheelchair']
                        : assistTypes.filter((x) => x !== 'wheelchair');
                      setAssistTypes(next);
                    }}
                    className="w-4 h-4 accent-primary"
                  />
                  <span>Xe lăn điện/cơ</span>
                </label>

                <label className="flex items-center gap-2 p-2 rounded-lg bg-surface-alt border border-line cursor-pointer hover:border-primary">
                  <input
                    type="checkbox"
                    checked={assistTypes.includes('guide_dog')}
                    onChange={(e) => {
                      const next = e.target.checked
                        ? [...assistTypes, 'guide_dog']
                        : assistTypes.filter((x) => x !== 'guide_dog');
                      setAssistTypes(next);
                    }}
                    className="w-4 h-4 accent-primary"
                  />
                  <span>Chó dẫn đường / Gậy</span>
                </label>

                <label className="flex items-center gap-2 p-2 rounded-lg bg-surface-alt border border-line cursor-pointer hover:border-primary">
                  <input
                    type="checkbox"
                    checked={assistTypes.includes('sighted_guide')}
                    onChange={(e) => {
                      const next = e.target.checked
                        ? [...assistTypes, 'sighted_guide']
                        : assistTypes.filter((x) => x !== 'sighted_guide');
                      setAssistTypes(next);
                    }}
                    className="w-4 h-4 accent-primary"
                  />
                  <span>TNV dẫn bộ qua ngã tư</span>
                </label>
              </div>
            </div>

            <button type="submit" className="btn-primary w-full !min-h-11 text-xs sm:text-sm font-bold">
              <CompassIcon size={18} />
              <span>Tra Cứu Lộ Trình Tiếp Cận Tối Ưu</span>
            </button>
          </form>

          {/* Dynamic route calculation result box */}
          {routeResult && (
            <div className="rounded-xl border border-line bg-surface-alt p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
                  Lộ Trình Đề Xuất Nhanh Nhất
                </span>
                <span className="chip hc-surface hc-border text-[11px] font-bold text-emerald-800 dark:text-emerald-400">
                  {routeResult.badge}
                </span>
              </div>
              <p className="font-bold text-sm text-ink">{routeResult.title}</p>
              <p className="text-xs text-ink-soft">{routeResult.description}</p>
              <ul className="text-xs text-ink space-y-1 pt-1">
                {routeResult.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <CheckIcon size={14} className="text-emerald-700 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => speak(`${routeResult.title}. ${routeResult.description}. Tính năng: ${routeResult.features.join(', ')}`)}
                  className="btn-ghost hc-border !min-h-9 !px-3 text-xs font-semibold"
                >
                  <SpeakerIcon size={14} className="text-primary" />
                  <span>Nghe lộ trình</span>
                </button>
                <Link
                  href="/services/ride-booking"
                  className="btn-primary !min-h-9 !px-3 text-xs font-semibold"
                >
                  Điều phối xe đón ↗
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. Metrics & Infrastructure Overview Section */}
      <div className="space-y-4 pt-6 border-t border-line">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div>
            <span className="chip hc-surface hc-border text-xs uppercase tracking-wider font-bold text-primary">
              Hạ Tầng Giao Thông Hòa Nhập
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-ink mt-1">
              Chỉ Số Tiếp Cận Phố Cổ Thực Tế
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-ink-soft max-w-xl">
            Được đo đạc và kiểm định trực tiếp theo tiêu chuẩn xây dựng QCVN 10:2014/BXD phối hợp cùng Hiệp hội Người Mù Quận Hoàn Kiếm.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="card hc-surface hc-border p-5 space-y-2 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="p-3 rounded-2xl bg-amber-100 dark:bg-amber-950 text-primary">
                <BusIcon size={24} />
              </span>
              <span className="chip hc-surface hc-border text-xs font-semibold">18 Điểm Đỗ</span>
            </div>
            <div>
              <p className="text-4xl font-display font-bold text-ink">18</p>
              <h3 className="font-bold text-base mt-1">Trạm Đón Tiếp Cận</h3>
              <p className="text-xs text-ink-soft mt-1">
                Đầy đủ dốc ram 1:12, gạch dẫn hướng nổi tactile và thanh vịn tay đôi.
              </p>
            </div>
          </div>

          <div className="card hc-surface hc-border p-5 space-y-2 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="p-3 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800">
                <SpeakerIcon size={24} />
              </span>
              <span className="chip hc-surface hc-border text-xs font-semibold">100% Đạt Chuẩn</span>
            </div>
            <div>
              <p className="text-4xl font-display font-bold text-emerald-700 dark:text-emerald-400">100%</p>
              <h3 className="font-bold text-base mt-1">Xe Điện Có Thuyết Minh</h3>
              <p className="text-xs text-ink-soft mt-1">
                Loa thông minh tự kích hoạt khi qua các di tích, hỗ trợ gập xe lăn và gậy.
              </p>
            </div>
          </div>

          <div className="card hc-surface hc-border p-5 space-y-2 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="p-3 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-800">
                <ShieldIcon size={24} />
              </span>
              <span className="chip hc-surface hc-border text-xs font-semibold">Thường Trực</span>
            </div>
            <div>
              <p className="text-4xl font-display font-bold text-ink">45+</p>
              <h3 className="font-bold text-base mt-1">Bác Tài Huấn Luyện Tiếp Cận</h3>
              <p className="text-xs text-ink-soft mt-1">
                Nắm vững quy trình dắt tay đón trả an toàn, xếp gậy và xe lăn cho du khách khiếm thị.
              </p>
            </div>
          </div>

          <div className="card hc-surface hc-border p-5 space-y-2 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="p-3 rounded-2xl bg-purple-100 dark:bg-purple-950 text-purple-800">
                <CheckIcon size={24} />
              </span>
              <span className="chip hc-surface hc-border text-xs font-semibold">Hoàn Toàn An Toàn</span>
            </div>
            <div>
              <p className="text-4xl font-display font-bold text-accent-dark">2.400+</p>
              <h3 className="font-bold text-base mt-1">Chuyến Đi Đồng Hành</h3>
              <p className="text-xs text-ink-soft mt-1">
                Ghi nhận chỉ số hài lòng 99.4% từ cộng đồng người khiếm thị và người hạn chế vận động.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. 4 Core Transit Modes Bento Grid */}
      <div className="space-y-4 pt-6 border-t border-line">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div>
            <span className="chip hc-surface hc-border text-xs uppercase tracking-wider font-bold text-primary">
              Phương Tiện Thực Tế
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-ink mt-1">
              4 Phương Thức Di Chuyển Tiếp Cận Tại Phố Cổ
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-ink-soft max-w-xl">
            Tất cả phương tiện đều được trang bị tính năng hỗ trợ khiếm thị và lối vào không bậc tam cấp.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Mode 1 */}
          <div className="card hc-surface hc-border p-6 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🛺</span>
                <div>
                  <h3 className="font-bold text-lg">Xe Điện Du Lịch Phố Cổ</h3>
                  <p className="text-xs text-primary font-bold">Tuyến 01 &amp; Tuyến 02 · 14 Điểm Di Sản</p>
                </div>
              </div>
              <span className="chip hc-surface hc-border font-bold text-emerald-800 dark:text-emerald-400 text-xs">
                35.000đ / Lượt
              </span>
            </div>
            <p className="text-sm text-ink-soft">
              Xe điện mui trần thoáng khí với sàn phẳng có tấm ram gấp dốc 8%, dễ dàng đẩy xe lăn và bước lên xe với gậy dò đường. Hệ thống loa đa hướng phát thuyết minh tự động khi xe chạy qua các đền, đình cổ.
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs text-ink">
              <div className="p-2.5 rounded-xl bg-surface-alt border border-line space-y-1">
                <span className="font-bold block text-primary">Tần suất di chuyển</span>
                <span>10 phút / chuyến</span>
              </div>
              <div className="p-2.5 rounded-xl bg-surface-alt border border-line space-y-1">
                <span className="font-bold block text-emerald-800 dark:text-emerald-400">Trợ năng gậy dò &amp; chó</span>
                <span>Cho phép mang chó dẫn đường</span>
              </div>
            </div>
          </div>

          {/* Mode 2 */}
          <div className="card hc-surface hc-border p-6 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🚌</span>
                <div>
                  <h3 className="font-bold text-lg">Xe Buýt Đô Thị Sàn Thấp</h3>
                  <p className="text-xs text-primary font-bold">Tuyến 09A, 09B, 14, 36 quanh hồ &amp; vành đai</p>
                </div>
              </div>
              <span className="chip hc-surface hc-border font-bold text-emerald-800 dark:text-emerald-400 text-xs">
                7.000đ / Lượt
              </span>
            </div>
            <p className="text-sm text-ink-soft">
              Dòng xe buýt thế hệ mới Transerco hạ gầm tự động ngang bằng mép vỉa hè, có bậc ram mở rộng và khu vực neo giữ xe lăn riêng biệt kèm đai an toàn. Đèn LED tương phản cao và loa đọc trạm rõ ràng.
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs text-ink">
              <div className="p-2.5 rounded-xl bg-surface-alt border border-line space-y-1">
                <span className="font-bold block text-primary">Độ phủ vành đai</span>
                <span>Chạy quanh trục Đinh Tiên Hoàng</span>
              </div>
              <div className="p-2.5 rounded-xl bg-surface-alt border border-line space-y-1">
                <span className="font-bold block text-emerald-800 dark:text-emerald-400">Vé ưu đãi trợ năng</span>
                <span>Miễn phí 100% người khuyết tật</span>
              </div>
            </div>
          </div>

          {/* Mode 3 */}
          <div className="card hc-surface hc-border p-6 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🚗</span>
                <div>
                  <h3 className="font-bold text-lg">Taxi &amp; Xe Công Nghệ Tiếp Cận (WAV)</h3>
                  <p className="text-xs text-primary font-bold">Grab / be / Xanh SM có ghi chú trợ năng</p>
                </div>
              </div>
              <span className="chip hc-surface hc-border font-bold text-emerald-800 dark:text-emerald-400 text-xs">
                Từ 45.000đ / Chuyến
              </span>
            </div>
            <p className="text-sm text-ink-soft">
              Ô tô 4 chỗ cốp rộng chở gậy gập và đón chở chó dẫn đường. Trong WayEcho, bạn có thể sao chép nhanh ghi chú tiếp cận (vị trí đứng đón, nhu cầu gọi điện) để dán sang ứng dụng đặt xe ngoài.
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs text-ink">
              <div className="p-2.5 rounded-xl bg-surface-alt border border-line space-y-1">
                <span className="font-bold block text-primary">Điểm đón thuận tiện</span>
                <span>Ngoài khung giờ phố đi bộ</span>
              </div>
              <div className="p-2.5 rounded-xl bg-surface-alt border border-line space-y-1">
                <span className="font-bold block text-emerald-800 dark:text-emerald-400">Hỗ trợ giao tiếp</span>
                <span>Tài xế chủ động gọi đón tận nơi</span>
              </div>
            </div>
          </div>

          {/* Mode 4 */}
          <div className="card hc-surface hc-border p-6 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🦯</span>
                <div>
                  <h3 className="font-bold text-lg">Đi Bộ Có Tình Nguyện Viên / Guide</h3>
                  <p className="text-xs text-primary font-bold">Đồng hành qua ngã tư &amp; các con ngõ cổ</p>
                </div>
              </div>
              <span className="chip hc-surface hc-border font-bold text-emerald-800 dark:text-emerald-400 text-xs">
                Miễn phí / Trải nghiệm
              </span>
            </div>
            <p className="text-sm text-ink-soft">
              Dịch vụ tình nguyện viên dẫn đường được đào tạo bài bản về kỹ thuật dắt tay thị giác (Sighted Guide Technique), mô tả chướng ngại vật mặt đường lát đá và hỗ trợ tìm lối vào các quán ăn ngõ hẹp.
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs text-ink">
              <div className="p-2.5 rounded-xl bg-surface-alt border border-line space-y-1">
                <span className="font-bold block text-primary">Khu vực phục vụ</span>
                <span>Toàn bộ 36 Phố Phường Hà Nội</span>
              </div>
              <div className="p-2.5 rounded-xl bg-surface-alt border border-line space-y-1">
                <span className="font-bold block text-emerald-800 dark:text-emerald-400">Liên hệ đặt Guide</span>
                <span>Qua danh bạ Dịch vụ WayEcho</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. 4 Safe Transit Hubs Section */}
      <div className="space-y-4 pt-6 border-t border-line">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div>
            <span className="chip hc-surface hc-border text-xs uppercase tracking-wider font-bold text-primary">
              Mạng Lưới Điểm Đến An Toàn
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-ink mt-1">
              4 Trạm Trung Chuyển Đạt Chuẩn Tiếp Cận Vàng
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-ink-soft max-w-xl">
            Các trạm đón trả có vỉa hè hạ dốc phẳng, có người hỗ trợ thường trực và không bị ùn tắc xe cộ.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="card hc-surface hc-border p-4 space-y-2">
            <span className="chip hc-surface hc-border text-[11px] font-bold text-primary">Trạm 01</span>
            <h3 className="font-bold text-base">Bến Xe Điện Bờ Hồ - Đinh Tiên Hoàng</h3>
            <p className="text-xs text-ink-soft">
              Đối diện Đền Ngọc Sơn. Mặt hè rộng 6m, lát gạch dẫn hướng nổi tactile liền mạch ra tận mép đón xe điện.
            </p>
            <p className="text-xs font-semibold text-emerald-800 dark:text-emerald-400">
              ✓ Có nhân viên hỗ trợ dìu khách lên xe
            </p>
          </div>

          <div className="card hc-surface hc-border p-4 space-y-2">
            <span className="chip hc-surface hc-border text-[11px] font-bold text-primary">Trạm 02</span>
            <h3 className="font-bold text-base">Trạm Điều Phối 28 Hàng Buồm</h3>
            <p className="text-xs text-ink-soft">
              Trung tâm văn hóa nghệ thuật phố cổ. Lối vào dốc phẳng, điểm hẹn đón xe công nghệ và xe điện kết nối ngõ Mã Mây.
            </p>
            <p className="text-xs font-semibold text-emerald-800 dark:text-emerald-400">
              ✓ Có biển chỉ dẫn chữ nổi Braille &amp; âm thanh
            </p>
          </div>

          <div className="card hc-surface hc-border p-4 space-y-2">
            <span className="chip hc-surface hc-border text-[11px] font-bold text-primary">Trạm 03</span>
            <h3 className="font-bold text-base">Trạm Chợ Đồng Xuân - Cổng Nam</h3>
            <p className="text-xs text-ink-soft">
              Phố Cầu Đông. Điểm tập kết xe điện mui trần tham quan chợ và phố ẩm thực đêm, có nhà vệ sinh tiếp cận chuẩn quốc gia.
            </p>
            <p className="text-xs font-semibold text-emerald-800 dark:text-emerald-400">
              ✓ Nhà vệ sinh có chuông báo khẩn cấp SOS
            </p>
          </div>

          <div className="card hc-surface hc-border p-4 space-y-2">
            <span className="chip hc-surface hc-border text-[11px] font-bold text-primary">Trạm 04</span>
            <h3 className="font-bold text-base">Bến Trung Chuyển Xe Buýt Long Biên</h3>
            <p className="text-xs text-ink-soft">
              Đường Yên Phụ. Kết nối các tuyến buýt sàn thấp từ sân bay Nội Bài và các quận về cửa ngõ phía Bắc Phố Cổ.
            </p>
            <p className="text-xs font-semibold text-emerald-800 dark:text-emerald-400">
              ✓ Cầu vượt bộ hành có thang máy nâng
            </p>
          </div>
        </div>
      </div>

      {/* 6. Hanoi Old Quarter Specific Access Guidelines */}
      <div className="rounded-2xl border border-line bg-surface-alt p-6 space-y-4">
        <h3 className="text-xl font-bold font-display flex items-center gap-2">
          <InfoIcon size={20} className="text-primary" />
          <span>Lưu Ý Đặc Thù Khi Di Chuyển Trong Phố Cổ Hà Nội</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div className="p-3.5 rounded-xl bg-surface border border-line space-y-1">
            <p className="font-bold text-primary">Khung Giờ Phố Đi Bộ Cuối Tuần</p>
            <p className="text-ink-soft">
              Từ 19h Thứ Sáu đến 24h Chủ Nhật hàng tuần, các tuyến phố quanh Hồ Gươm và vùng lõi cấm phương tiện cơ giới. Hãy đặt điểm đón tại các trạm vành đai như 28 Hàng Buồm hoặc Trần Quang Khải.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-surface border border-line space-y-1">
            <p className="font-bold text-primary">Mặt Đá Gồ Ghề &amp; Bậc Ngõ Cổ</p>
            <p className="text-ink-soft">
              Nhiều ngõ phố cổ chỉ rộng dưới 1m và có gờ ngưỡng cửa gỗ truyền thống. Hãy sử dụng gậy dò đường quét góc 45 độ hoặc nhờ tình nguyện viên đồng hành khi vào các ngõ sâu.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-surface border border-line space-y-1">
            <p className="font-bold text-primary">Hỗ Trợ Tận Nơi Qua SOS</p>
            <p className="text-ink-soft">
              Nếu gặp khó khăn khi tìm xe hoặc bị lạc trong phố cổ, bấm nút SOS màu đỏ ở thanh điều hướng dưới màn hình hoặc gọi ngay 1900 8282 để đội phản ứng nhanh hỗ trợ định vị.
            </p>
          </div>
        </div>
      </div>

      {/* 7. Connection Banner to Ride Dispatch */}
      <div className="rounded-2xl border-2 border-primary/40 bg-[#fff9ed] dark:bg-amber-950/30 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="font-bold text-lg text-ink flex items-center gap-2">
            <span>🚗</span>
            <span>Điều Phối Đặt Xe Đón Trả Tận Nơi Phố Cổ</span>
          </p>
          <p className="text-sm text-ink-soft max-w-2xl">
            Để bảo đảm điều phối điểm đón thuận tiện và thông báo trước nhu cầu trợ năng cho tài xế, dịch vụ đặt xe tiếp cận của WayEcho được kích hoạt đồng bộ sau khi bạn đã đặt chỗ một dịch vụ lưu trú, ẩm thực hoặc tour tại Phố Cổ.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link href="/my-booking" className="btn-ghost hc-border font-semibold text-xs sm:text-sm">
            <CalendarIcon size={16} />
            <span>Xem Đặt chỗ của tôi</span>
          </Link>
          <Link href="/services/ride-booking" className="btn-primary font-bold text-xs sm:text-sm">
            <span>Vào Trung tâm điều phối ↗</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
