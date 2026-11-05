'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { RIDE_PROVIDERS, RIDE_STATUS, RIDE_VEHICLES, RIDE_SERVICE_PRESETS, speakVietnamese } from '@/lib/rideDemo';
import { getItem } from '@/data/catalog';
import { useA11y } from '@/components/A11yProvider';
import { api } from '@/lib/api';
import {
  MapPinIcon,
  PhoneIcon,
  CheckIcon,
  AccessibleIcon,
  ShieldIcon,
  SpeakerIcon,
  CalendarIcon,
  BusIcon,
  MicIcon
} from '@/components/Icons';

const inputStyle = 'mt-2 min-h-12 w-full rounded-xl border border-line bg-surface px-4 py-3 text-ink focus-visible:outline-2';

function RideBookingContent() {
  const searchParams = useSearchParams();
  const requestedBookingId = searchParams.get('bookingId');
  const selectedService = getItem(searchParams.get('service'));
  const { speak } = useA11y();

  // Booking gating state
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [demoUnlocked, setDemoUnlocked] = useState(false);

  // Form State
  const [form, setForm] = useState({
    pickup: '87 Mã Mây, Hàng Buồm',
    destination: 'Chợ Đồng Xuân, Hoàn Kiếm',
    provider: 'xe-dien-demo',
    vehicle: 'electric',
    notes: 'Có gậy dò; xin gọi khi đến điểm hẹn đón.',
    consent: true
  });
  const [rides, setRides] = useState([]);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [voice, setVoice] = useState(false);

  useEffect(() => {
    if (selectedService?.cat === 'transport') {
      const preset = RIDE_SERVICE_PRESETS[selectedService.id];
      setForm(f => ({
        ...f,
        ...(preset || {}),
        pickup: selectedService.pickupPoint || f.pickup,
        notes: `${selectedService.name} (DEMO). ${selectedService.supportInfo || ''} ${f.notes}`
      }));
    }
  }, [selectedService?.id]);

  // Fetch bookings from server
  useEffect(() => {
    let live = true;
    api.listBookings()
      .then(list => {
        if (!live) return;
        const valid = Array.isArray(list) ? list : [];
        setBookings(valid);
        // Đặt xe độc lập là mặc định; chỉ liên kết đơn đặt khác khi khách chủ động chọn.
        if (requestedBookingId) {
          const matched = valid.find(b => b.id === requestedBookingId);
          if (matched) {
            setSelectedBooking(matched);
            setForm(f => ({
              ...f,
              destination: matched.itemName || matched.address || f.destination,
              notes: matched.specialRequests || matched.accessibilityNeeds || f.notes
            }));
          }
        }
      })
      .catch(() => {
        if (live) setBookings([]);
      })
      .finally(() => {
        if (live) setLoadingBookings(false);
      });

    return () => { live = false; };
  }, [requestedBookingId]);

  // Polling simulated rides from server API
  useEffect(() => {
    let live = true;
    const refresh = async () => {
      try {
        const res = await fetch('/api/ride-demo', { cache: 'no-store' });
        const data = await res.json();
        if (!res.ok) throw Error(data.error || 'Không tải được chuyến');
        if (live) setRides(data);
      } catch (e) {
        if (live) setError(e.message);
      }
    };
    refresh();
    const timer = setInterval(refresh, 4000);
    const onFocus = () => refresh();
    window.addEventListener('focus', onFocus);
    return () => {
      live = false;
      clearInterval(timer);
      window.removeEventListener('focus', onFocus);
    };
  }, []);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const say = s => {
    setNotice(s);
    if (voice && !speakVietnamese(s)) {
      setNotice(s + ' Thiết bị chưa có giọng đọc tiếng Việt, vui lòng sử dụng trình đọc màn hình.');
    }
  };

  const handleSelectBooking = (bookingId) => {
    const found = bookings.find(b => b.id === bookingId);
    if (!bookingId) { setSelectedBooking(null); return; }
    if (found) {
      setSelectedBooking(found);
      setForm(f => ({
        ...f,
        destination: found.itemName || f.destination,
        notes: found.specialRequests || found.accessibilityNeeds || f.notes
      }));
      speak(`Đã liên kết chuyến xe với dịch vụ ${found.itemName}`);
    }
  };

  const activateDemoBooking = () => {
    const demoBooking = {
      id: 'bk-sample-transport',
      itemName: 'Khách sạn Romantique Hotel De Hanoi',
      address: '35–37 Bát Sứ, Hoàn Kiếm, Hà Nội',
      date: 'Hôm nay',
      time: '14:30',
      guests: 2,
      specialRequests: 'Có gậy dò đường; mong tài xế gọi điện trước khi đến điểm đón.'
    };
    setSelectedBooking(demoBooking);
    setDemoUnlocked(true);
    setForm(f => ({
      ...f,
      destination: demoBooking.itemName,
      pickup: 'Bến Xe Điện Bờ Hồ - Đinh Tiên Hoàng',
      notes: demoBooking.specialRequests
    }));
    speak('Đã kích hoạt đặt chỗ mẫu demo. Bạn có thể thử nghiệm tạo chuyến xe tiếp cận.');
  };

  const make = async () => {
    try {
      if (!form.consent) throw Error('Bạn cần đồng ý tạo chuyến đi mô phỏng.');
      const res = await fetch('/api/ride-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const ride = await res.json();
      if (!res.ok) throw Error(ride.error || 'Không tạo được yêu cầu.');
      setRides(r => [ride, ...r]);
      setError('');
      say('Đã tạo yêu cầu đặt xe mô phỏng. Mã chuyến ' + ride.id + '. Chờ xử lý mô phỏng.');
    } catch (e) {
      setError(e.message);
    }
  };

  const mic = field => {
    const Recognition = typeof window !== 'undefined' ? (window.SpeechRecognition || window.webkitSpeechRecognition) : null;
    if (!Recognition) {
      setError('Trình duyệt chưa hỗ trợ nhập bằng giọng nói. Bạn có thể gõ hoặc dùng trình đọc màn hình.');
      return;
    }
    const rec = new Recognition();
    rec.lang = 'vi-VN';
    rec.onresult = e => {
      const text = e.results[0][0].transcript;
      set(field, text);
    };
    rec.onerror = () => setError('Không nhận được giọng nói. Hãy kiểm tra quyền micro.');
    rec.start();
  };

  const vehicles = RIDE_VEHICLES; // Đồng nhất 6 phương tiện ở danh mục, form và API.

  const hasAccess = true; // Đặt xe độc lập; liên kết với đơn dịch vụ là tùy chọn.

  return (
    <div className="min-h-screen bg-surface text-ink">
      {/* 1. Header & Breadcrumbs */}
      <section className="w-full bg-surface-alt border-b border-line py-3 px-4 sm:px-6">
        <div className="container-page flex flex-col md:flex-row md:items-center justify-between gap-3 text-sm">
          <nav aria-label="Đường dẫn trang" className="flex items-center flex-wrap gap-2 text-xs sm:text-sm text-ink-soft">
            <Link href="/" className="hover:text-ink hover:underline">
              Trang chủ
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/explore?cat=transport" className="hover:text-ink hover:underline">
              Dịch vụ
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-ink font-semibold" aria-current="page">
              Di chuyển
            </span>
          </nav>

          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <span className="chip hc-surface hc-border text-[11px] sm:text-xs text-amber-800 dark:text-amber-400 font-bold">
              <ShieldIcon size={14} className="text-primary" />
              CHỈ LÀ MÔ PHỎNG · DỮ LIỆU THỬ NGHIỆM
            </span>
          </div>
        </div>
      </section>

      {/* 2. Main Page Header */}
      <section className="container-page py-8">
        <div className="space-y-2">
          <span className="chip hc-surface hc-border text-xs uppercase tracking-wider font-bold text-primary">
            WayEcho · Trung tâm điều phối mô phỏng
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-bold leading-tight">
            Đặt Xe &amp; Hỗ Trợ Di Chuyển Tiếp Cận Phố Cổ
          </h1>
          <p className="text-ink-soft text-base sm:text-lg max-w-3xl leading-relaxed">
            Thử toàn bộ quy trình đặt xe, nhận tài xế, theo dõi chuyến và hỗ trợ trợ năng trong WayEcho.
          </p>
        </div>

        {/* Loading State */}
        {loadingBookings && (
          <div className="mt-8 rounded-2xl border border-line bg-surface-alt p-6 text-center">
            <p className="text-ink-soft">Đang kiểm tra lịch sử đặt dịch vụ của bạn…</p>
          </div>
        )}

        {/* GATING BARRIER: If user has NOT booked any service yet */}
        {!loadingBookings && !hasAccess && (
          <div className="mt-8 rounded-2xl border-2 border-amber-300 bg-[#fff9ed] dark:bg-amber-950/30 p-8 space-y-6">
            <div className="flex items-start gap-4">
              <span className="text-4xl p-3 rounded-2xl bg-amber-100 dark:bg-amber-900/50">
                ⚠️
              </span>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold font-display text-ink">
                  Yêu Cầu Đã Đặt Dịch Vụ Trước Khi Điều Phối Xe
                </h2>
                <p className="text-ink-soft text-sm sm:text-base leading-relaxed">
                  Bạn <strong>có thể đặt xe độc lập</strong>, không cần đặt tour, khách sạn hoặc dịch vụ khác trước. Nếu đã có đơn đặt dịch vụ, bạn có thể tự chọn liên kết để điền sẵn thông tin điểm đến.
                </p>
                <p className="text-xs text-ink-soft">
                  Hiện tại bạn chưa có dịch vụ nào trong danh sách đặt chỗ của thiết bị này.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link href="/explore" className="btn-primary !min-h-12 !px-5 font-bold text-sm">
                🔍 Khám phá dịch vụ &amp; Đặt trước
              </Link>
              <Link href="/my-booking" className="btn-ghost hc-border !min-h-12 !px-4 font-semibold text-sm">
                <CalendarIcon size={18} />
                <span>Kiểm tra Đặt chỗ của tôi</span>
              </Link>
              <button
                type="button"
                onClick={activateDemoBooking}
                className="btn-ghost hc-border !min-h-12 !px-4 text-xs sm:text-sm font-semibold !border-amber-400 hover:!bg-amber-100 dark:hover:!bg-amber-900/50"
              >
                ⚡ Thử nhanh với Đặt chỗ mẫu (Demo)
              </button>
            </div>
          </div>
        )}

        {/* Đặt xe độc lập hoặc liên kết đặt chỗ — không bắt buộc có dịch vụ khác. */}
        {!loadingBookings && hasAccess && (
          <div className="mt-8 space-y-8">
            {/* Active Service Booking Linkage Card */}
            <div className="rounded-2xl border border-line bg-surface-alt p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="p-3 rounded-xl bg-primary text-ink text-xl">
                  <CalendarIcon size={24} />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">
                      {selectedBooking ? "Đã liên kết dịch vụ đặt trước" : "Đặt xe độc lập (không cần đơn dịch vụ khác)"}
                    </span>
                    {selectedBooking && <span className="chip hc-surface hc-border text-[11px] font-bold text-emerald-800 dark:text-emerald-400">Đã liên kết</span>}
                  </div>
                  <p className="font-bold text-base text-ink mt-0.5">
                    {selectedBooking?.itemName || "Chọn điểm đón và điểm đến bên dưới"}
                  </p>
                  <p className="text-xs text-ink-soft">
                    {selectedBooking ? `${selectedBooking.date || "Chưa chọn ngày"} · ${selectedBooking.time || "Chưa chọn giờ"} · ${selectedBooking.address || "Hà Nội"}` : "Bạn có thể đặt xe trực tiếp hoặc liên kết với đặt chỗ đã có."}
                  </p>
                </div>
              </div>

              {bookings.length > 0 && (
                <div className="flex items-center gap-2">
                  <label htmlFor="booking-switcher" className="text-xs font-bold text-ink shrink-0">
                    Đổi dịch vụ:
                  </label>
                  <select
                    id="booking-switcher"
                    value={selectedBooking?.id || ''}
                    onChange={(e) => handleSelectBooking(e.target.value)}
                    className="min-h-10 rounded-xl border border-line bg-surface px-3 text-xs text-ink"
                  >
                    <option value="">Không liên kết — đặt xe độc lập</option>
                    {bookings.filter(b => !["cancelled", "rejected"].includes(b.status)).map(b => (
                      <option key={b.id} value={b.id}>
                        {b.itemName} ({b.date || '—'})
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Vehicle Selector Options */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold font-display">Chọn Loại Phương Tiện Tiếp Cận Phù Hợp</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {vehicles.map(v => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setForm(f => ({...f, vehicle:v.id, provider:v.provider}))}
                    className={`card hc-surface p-4 text-left border transition-all ${
                      form.vehicle === v.id
                        ? 'border-primary ring-2 ring-primary/20 bg-surface-alt'
                        : 'border-line hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-3xl">{v.icon}</span>
                      <span className="font-bold text-xs text-primary">{v.price}</span>
                    </div>
                    <p className="font-bold text-sm text-ink mt-2">{v.name}</p>
                    <p className="text-xs text-ink-soft mt-1">{v.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* 2-Column Simulation Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* Left Column: Booking Form */}
              <section className="card hc-surface hc-border p-6 shadow-card space-y-4">
                <div className="flex items-center justify-between border-b border-line pb-3">
                  <h3 className="font-display text-2xl font-bold">Tạo yêu cầu đón xe</h3>
                  <span className="chip hc-surface hc-border text-xs font-semibold">
                    Giả lập tức thời
                  </span>
                </div>

                <div className="space-y-3 text-sm">
                  <div>
                    <label htmlFor="form-pickup" className="block font-semibold">
                      Điểm hẹn đón
                    </label>
                    <div className="flex gap-2">
                      <input
                        id="form-pickup"
                        className={inputStyle}
                        value={form.pickup}
                        onChange={e => set('pickup', e.target.value)}
                        placeholder="Ví dụ: 28 Hàng Buồm hoặc điểm gần bạn"
                      />
                      <button
                        type="button"
                        onClick={() => mic('pickup')}
                        className="btn-ghost hc-border mt-2 !min-h-12 !px-3 shrink-0"
                        aria-label="Nói điểm đón"
                      >
                        <MicIcon size={20} />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="form-destination" className="block font-semibold">
                      Điểm đến (có thể nhập độc lập hoặc liên kết dịch vụ)
                    </label>
                    <div className="flex gap-2">
                      <input
                        id="form-destination"
                        className={inputStyle}
                        value={form.destination}
                        onChange={e => set('destination', e.target.value)}
                        placeholder="Ví dụ: Chợ Đồng Xuân hoặc tên cơ sở"
                      />
                      <button
                        type="button"
                        onClick={() => mic('destination')}
                        className="btn-ghost hc-border mt-2 !min-h-12 !px-3 shrink-0"
                        aria-label="Nói điểm đến"
                      >
                        <MicIcon size={20} />
                      </button>
                    </div>
                  </div>

                  <label className="block font-semibold">
                    Đối tác điều phối mô phỏng
                    <select
                      className={inputStyle}
                      value={form.provider}
                      onChange={e => set('provider', e.target.value)}
                    >
                      {RIDE_PROVIDERS.map(p => (
                        <option key={p.id} value={p.id}>
                          {p.name} ({p.note})
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="block font-semibold">
                    Nhu cầu trợ năng gửi tài xế
                    <textarea
                      className={inputStyle}
                      rows={3}
                      value={form.notes}
                      onChange={e => set('notes', e.target.value)}
                      placeholder="Ví dụ: Có gậy dò; xin gọi khi đến điểm đón. Không mặc định tài xế tự biết hỗ trợ."
                    />
                  </label>

                  <label className="flex items-start gap-3 text-sm cursor-pointer">
                    <input
                      className="mt-1 h-5 w-5 accent-primary"
                      type="checkbox"
                      checked={form.consent}
                      onChange={e => set('consent', e.target.checked)}
                    />
                    <span className="text-ink-soft">
                      Tôi hiểu đây chỉ là chuyến xe giả lập, đồng ý gửi thông tin mô phỏng lên máy chủ thử nghiệm. Không nhập dữ liệu cá nhân thật.
                    </span>
                  </label>

                  <label className="flex items-center gap-3 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={voice}
                      onChange={e => setVoice(e.target.checked)}
                      className="w-4 h-4 accent-primary"
                    />
                    <span className="text-ink-soft">
                      Tự đọc thông báo bằng giọng tiếng Việt (khi thiết bị hỗ trợ)
                    </span>
                  </label>

                  <button className="btn-primary w-full min-h-12 text-sm font-bold mt-2" type="button" onClick={make}>
                    Xác nhận tạo chuyến DEMO
                  </button>

                  {error && <p role="alert" className="mt-3 text-red-800 dark:text-red-400 font-semibold text-sm">{error}</p>}
                  {notice && <p role="status" className="mt-3 text-emerald-900 dark:text-emerald-300 font-semibold text-sm">{notice}</p>}
                </div>
              </section>

              {/* Right Column: Live Simulated Rides Tracker */}
              <section className="card hc-surface hc-border p-6 shadow-card space-y-4">
                <div className="flex items-center justify-between border-b border-line pb-3">
                  <h3 className="font-display text-2xl font-bold">Theo dõi chuyến xe</h3>
                  <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-1 rounded-full">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" /> Radar GPS
                  </span>
                </div>

                <p className="text-sm text-ink-soft">
                  Trạng thái được đồng bộ thời gian thực từ máy chủ mô phỏng của WayEcho.
                </p>

                <div className="space-y-4" aria-live="polite">
                  {rides.length === 0 ? (
                    <div className="rounded-xl bg-surface-alt p-5 text-sm text-ink-soft text-center space-y-2">
                      <p className="font-semibold text-ink">Chưa có yêu cầu đặt xe demo nào.</p>
                      <p className="text-xs">
                        Hãy điền điểm đón và bấm &quot;Xác nhận tạo chuyến DEMO&quot; ở cột bên trái để bắt đầu theo dõi.
                      </p>
                    </div>
                  ) : (
                    rides.map(r => (
                      <div key={r.id} className="rounded-2xl border border-line p-4 space-y-2 bg-surface-alt">
                        <div className="flex items-center justify-between">
                          <p className="font-bold text-primary">{r.id} · {RIDE_STATUS[r.status]}</p>
                          <span className="text-xs px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-semibold uppercase">
                            {r.status}
                          </span>
                        </div>
                        <p className="text-sm font-semibold">{r.pickup} → {r.destination}</p>
                        <p className="text-xs text-ink-soft">
                          Đối tác: {RIDE_PROVIDERS.find(p => p.id === r.provider)?.name}
                        </p>

                        {r.driver && (
                          <div className="rounded-xl bg-surface p-3 text-sm space-y-1 border border-line">
                            <p className="font-bold text-ink">
                              Tài xế giả lập: {r.driver.name} · {r.driver.plate}
                            </p>
                            <p className="text-xs text-emerald-800 dark:text-emerald-400">
                              Đã kích hoạt chế độ hỗ trợ tiếp cận (gọi điện thoại trước khi đến).
                            </p>
                          </div>
                        )}

                        {r.status === 'completed' && (
                          <div className="pt-2 border-t border-line space-y-2">
                            <p className="text-sm text-ink-soft">
                              Chuyến đã kết thúc theo mô phỏng. WayEcho không xác minh an toàn vị trí xuống xe.
                            </p>
                            <label className="block text-sm font-semibold">
                              Đánh giá hỗ trợ
                              <select
                                className={inputStyle}
                                defaultValue=""
                                onChange={async e => {
                                  if (!e.target.value) return;
                                  try {
                                    const res = await fetch('/api/ride-demo', {
                                      method: 'PUT',
                                      headers: { 'Content-Type': 'application/json' },
                                      body: JSON.stringify({ id: r.id, feedback: e.target.value })
                                    });
                                    const result = await res.json();
                                    if (!res.ok) throw Error(result.error);
                                    setRides(xs => xs.map(x => x.id === r.id ? result : x));
                                  } catch (err) {
                                    setError(err.message);
                                  }
                                }}
                              >
                                <option value="">Chọn đánh giá</option>
                                <option value="good">Tốt</option>
                                <option value="improve">Cần cải thiện</option>
                              </select>
                            </label>
                            <Link href="/contact" className="mt-2 inline-block underline text-sm text-primary">
                              Liên hệ tư vấn viên nếu cần hỗ trợ
                            </Link>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </section>
            </div>
          </div>
        )}

        {/* 3. External official app handoff */}
        <section className="card hc-surface hc-border p-6 space-y-4 mt-8">
          <h2 className="font-display text-2xl font-bold">Lựa chọn chuyển sang ứng dụng thật (ngoài mô phỏng)</h2>
          <p className="text-sm text-ink-soft">
            Mở website đối tác không đồng nghĩa đặt xe thành công. Đặt xe thật, giá và thanh toán do đối tác xác nhận.
          </p>

          <button
            type="button"
            className="btn-ghost hc-border font-semibold text-sm"
            onClick={async()=>{
              const content = `Điểm đón: ${form.pickup || 'Chưa nhập'}\nĐiểm đến: ${form.destination || 'Chưa nhập'}\nGhi chú trợ năng: ${form.notes || 'Không có'}`;
              try {
                await navigator.clipboard.writeText(content);
                setNotice('Đã sao chép thông tin để tự nhập tại ứng dụng đối tác.');
              } catch {
                setError('Không thể sao chép trên trình duyệt này.');
              }
            }}
          >
            📋 Sao chép thông tin chuyến xe
          </button>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="https://www.grab.com/vn/transport/"
              target="_blank"
              rel="noopener noreferrer"
              className="chip hc-surface hc-border !px-4 !py-2 text-sm font-semibold hover:border-primary transition-colors"
            >
              Mở Grab ↗
            </a>
            <a
              href="https://be.com.vn/"
              target="_blank"
              rel="noopener noreferrer"
              className="chip hc-surface hc-border !px-4 !py-2 text-sm font-semibold hover:border-primary transition-colors"
            >
              Mở be ↗
            </a>
            <a
              href="https://www.xanhsm.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="chip hc-surface hc-border !px-4 !py-2 text-sm font-semibold hover:border-primary transition-colors"
            >
              Mở Xanh SM ↗
            </a>
          </div>
        </section>

        {/* 4. Safety limits card */}
        <div className="card hc-surface hc-border p-5 text-sm leading-relaxed bg-surface-alt mt-6">
          <strong>Giới hạn an toàn (CHỈ LÀ MÔ PHỎNG):</strong> WayEcho không hướng dẫn người khiếm thị rẽ hoặc vượt đường bằng AI. Mọi thông tin tài xế, biển số và trạng thái đều giả lập. Nếu thực sự di chuyển, hãy sử dụng gậy dò đường và yêu cầu người hỗ trợ đáng tin cậy khi cần.
        </div>
      </section>
    </div>
  );
}

export default function RideBooking() {
  return (
    <Suspense fallback={<div className="container-page py-10">Đang tải trung tâm điều phối…</div>}>
      <RideBookingContent />
    </Suspense>
  );
}
