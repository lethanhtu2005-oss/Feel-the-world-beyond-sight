"use client";

import DestinationActions from "@/components/DestinationActions";
import ReportIssue from "@/components/ReportIssue";
import { articles } from "@/data/articles";
import { honestAccessStatus } from "@/lib/accessStatus";
import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useA11y } from "@/components/A11yProvider";
import VerifiedImage from "@/components/VerifiedImage";
import DestinationCard from "@/components/DestinationCard";
import { getDestination, destinations } from "@/data/destinations";
import { culturalEvents } from "@/data/culturalEvents";
import {
  SpeakerIcon, MapPinIcon, AccessibleIcon, CompassIcon, CalendarIcon, PhoneIcon,
} from "@/components/Icons";

function AccessRow({ label, value }) {
  return (
    <div className="grid gap-1 border-b border-line py-3 hc-border sm:grid-cols-[220px_1fr] sm:gap-5">
      <dt className="font-semibold">{label}</dt>
      <dd className="hc-muted text-ink-soft">{value}</dd>
    </div>
  );
}

function StatusPill({ label, value }) {
  const yes = String(value).trim().toLowerCase() === "có";
  return (
    <div className="flex items-center justify-between rounded-2xl border border-[#ead9c2] bg-[#fffdfa] px-4 py-3 text-sm shadow-sm">
      <span className="font-medium text-[#2b2b2b]">{label}</span>
      <span className={`font-bold ${yes ? "text-[#17944b]" : "text-[#e14d3d]"}`}>{yes ? "✓ Có" : "✕ Không"}</span>
    </div>
  );
}

function DestinationContent() {
  const params = useSearchParams();
  const slug = params.get("d");
  const d = getDestination(slug);
  const { speak } = useA11y();

  if (!slug) {
    return (
      <div className="container-page pt-4 pb-10">
        <h1 className="sr-only">Điểm đến Phố cổ Hà Nội</h1>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{destinations.map((item) => <DestinationCard key={item.slug} d={item} />)}</div>
      </div>
    );
  }

  if (!d) {
    return (
      <div className="container-page py-16" role="alert">
        <h1 className="text-3xl">Không tìm thấy điểm đến</h1>
        <p className="hc-muted mt-3 text-lg text-ink-soft">Đường dẫn không khớp với địa điểm nào trong dữ liệu WayEcho.</p>
        <Link href="/destination" className="btn-primary mt-5">Xem danh sách điểm đến</Link>
      </div>
    );
  }

  const accessRows = [
    ["Phù hợp người mù", d.access.blind],
    ["Phù hợp nhìn kém", d.access.lowVision],
    ["Nhân viên hỗ trợ", d.access.staff],
    ["Thang máy", d.access.elevator],
    ["Lối không bậc", d.access.stepFree],
    ["Chữ nổi Braille", d.access.braille],
  ];

  return (
    <div className="container-page py-10">
      <p className="text-sm text-ink-soft hc-muted">
        <Link href="/" className="hover:underline">Trang chủ</Link> · <Link href="/destination" className="hover:underline">Điểm đến</Link> ·{" "}
        <MapPinIcon size={14} className="inline align-[-2px]" /> {d.area}
      </p>

      <div className="mt-4 grid gap-8 lg:grid-cols-2">
        <figure>
          <div className="aspect-[4/3] overflow-hidden rounded-[18px] bg-surface-alt shadow-card">
            <VerifiedImage src={d.image} fallback={d.imageFallback} alt={d.alt} priority className="h-full w-full object-cover" />
          </div>
        </figure>

        <div>
          <span className="chip hc-surface hc-border bg-primary font-bold">
            <AccessibleIcon size={16} /> {d.access.level}
          </span>
          <h1 className="mt-3 text-4xl sm:text-5xl">{d.name}</h1>
          <p className="mt-2 flex items-start gap-2 text-ink-soft hc-muted"><MapPinIcon size={18} className="mt-1 shrink-0" /> {d.address}</p>
          <p className="hc-muted mt-3 text-lg text-ink-soft">{d.summary}</p>

          <button type="button" onClick={() => speak(d.audio)} className="btn-primary mt-5 text-lg">
            <SpeakerIcon size={22} /> Nghe mô tả bằng giọng nói
          </button>

          <DestinationActions destination={d} />
          <ReportIssue itemId={d.slug} itemName={d.name} />

          <div className="mt-4 rounded-2xl border border-line bg-surface-alt p-4 hc-surface hc-border">
            <p className="text-sm font-semibold text-ink-soft hc-muted">Mô tả âm thanh</p>
            <p className="mt-1 text-lg">{d.audio}</p>
          </div>
        </div>
      </div>

      <section className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_.85fr]" aria-labelledby="access-heading">
        <div>
          <h2 id="access-heading" className="text-3xl">Thông tin tiếp cận</h2>
          <dl className="mt-4">
            <AccessRow label="Mức độ tiếp cận" value={d.access.level} />
            <AccessRow label="Ghi chú tiếp cận" value={d.access.note} />
            <AccessRow label="Khu vực" value={d.area} />
            <AccessRow label="Giá tham khảo" value={d.visit.price} />
          </dl>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {accessRows.map(([label, value]) => <StatusPill key={label} label={label} value={value} />)}
          </div>

          <div className="mt-6 rounded-2xl border border-line bg-[#fffaf3] p-4">
            <p className="font-semibold">Ghi chú thêm</p>
            <p className="mt-2 text-sm leading-6 text-ink-soft">{honestAccessStatus(d.access.status)}</p>
          </div>
        </div>

        <aside className="rounded-[18px] border border-line bg-white p-5 shadow-card hc-surface hc-border" aria-labelledby="visit-heading">
          <h2 id="visit-heading" className="text-2xl">Thông tin địa điểm</h2>
          <dl className="mt-3 space-y-3">
            <div><dt className="font-semibold">Giờ tham quan</dt><dd className="hc-muted text-ink-soft">{d.visit.hours}</dd></div>
            <div><dt className="font-semibold">Kiểm tra dữ liệu</dt><dd className="hc-muted text-ink-soft">{d.checkedAt}</dd></div>
          </dl>
          {d.facts.length > 0 && (
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-ink-soft hc-muted">
              {d.facts.map((f) => <li key={f}>{f}</li>)}
            </ul>
          )}
          {d.sources.length > 0 && (
            <div className="mt-5 border-t border-line pt-4 hc-border">
              <p className="font-semibold">Nguồn tham khảo</p>
              <ul className="mt-2 space-y-2 text-sm">
                {d.sources.map((s) => (
                  <li key={s.url}><a href={s.url} target="_blank" rel="noreferrer" className="text-accent-dark underline">{s.label}</a></li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </section>

      {/* 4 Tactile Touchpoints from Prototype */}
      <section className="mt-12 rounded-[26px] bg-[#fffaf2] p-6 lg:p-8 border border-amber-200/80 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <span className="inline-block rounded-full bg-amber-200/60 px-3 py-1 text-xs font-bold text-[#7a4d00]">
              CHỈ DẪN XÚC GIÁC & CẢM QUAN PHỐ CỔ
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-ink">4 Điểm Chạm Thực Địa Cho Người Khiếm Thị</h2>
          </div>
          <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 self-start sm:self-auto">
            ✓ Đã thẩm định thực địa
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl bg-white p-5 border border-line shadow-sm space-y-2">
            <div className="text-2xl">🏛️</div>
            <h3 className="font-bold text-base text-ink">1. Bậc Thềm Đá Xanh</h3>
            <p className="text-xs text-ink-soft leading-relaxed">
              Thềm đá Thanh Hóa thế kỷ 19. Đưa tay sờ gờ đá nhẵn bóng do hàng trăm năm người đi lại, cảm nhận rãnh thoát nước cổ.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-5 border border-line shadow-sm space-y-2">
            <div className="text-2xl">🚪</div>
            <h3 className="font-bold text-base text-ink">2. Cột Lim & Then Cài</h3>
            <p className="text-xs text-ink-soft leading-relaxed">
              Gỗ lim nguyên khối nhẵn mịn, mát rượi. Then cài gỗ hình mang cá có thể tự tay đẩy chốt để cảm nhận cơ cấu mộng truyền thống.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-5 border border-line shadow-sm space-y-2">
            <div className="text-2xl">🌿</div>
            <h3 className="font-bold text-base text-ink">3. Giếng Trời & Gió Lùa</h3>
            <p className="text-xs text-ink-soft leading-relaxed">
              Đứng giữa khoảng sân trong, lắng nghe tiếng gió hút qua mái ngói âm dương, tiếng nước róc rách và mùi hương trầm ấm cúng.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-5 border border-line shadow-sm space-y-2">
            <div className="text-2xl">🏺</div>
            <h3 className="font-bold text-base text-ink">4. Hoa Văn Gốm & Khảm</h3>
            <p className="text-xs text-ink-soft leading-relaxed">
              Họa tiết hoa sen, tùng cúc chạm nổi trên bề mặt gốm Bát Tràng và xà cừ. Đầu ngón tay dễ dàng phân biệt từng đường nét đắp nổi.
            </p>
          </div>
        </div>
      </section>

      {/* Cultural Events at this Destination */}
      {(() => {
        const destEvents = culturalEvents.filter((ev) => ev.destinationSlug === d.slug);
        if (destEvents.length === 0) return null;
        return (
          <section className="mt-10 rounded-[26px] bg-[#f0fdfa] p-6 lg:p-8 border border-[#99f6e4] shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#ccfbf1]">
              <div>
                <span className="inline-block rounded-full bg-[#ccfbf1] px-3 py-1 text-xs font-bold text-[#0f766e]">
                  🎭 LỚP SỰ KIỆN VĂN HÓA LIÊN KẾT
                </span>
                <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-[#134e4a]">
                  Sự Kiện Diễn Ra Tại {d.name}
                </h2>
              </div>
              <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white border border-[#99f6e4] text-[#0d9488]">
                {destEvents.length} sự kiện định kỳ
              </span>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {destEvents.map((ev) => (
                <article key={ev.id} className="rounded-2xl bg-white p-5 border border-[#99f6e4] shadow-xs flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase text-[#0d9488]">{ev.category} • {ev.date}</span>
                    <h3 className="mt-1 text-lg font-bold text-[#134e4a]">{ev.title}</h3>
                    <p className="mt-2 text-xs text-[#374151] leading-relaxed">{ev.summary}</p>
                    <div className="mt-3 rounded-xl bg-[#f0fdfa] p-3 text-xs text-[#0f766e] space-y-1">
                      <p><strong>Lịch diễn:</strong> {ev.schedule}</p>
                      <p><strong>Giá vé:</strong> {ev.price}</p>
                      <p><strong>Tiếp cận:</strong> {ev.accessibility.blind}</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#f0fdfa] flex items-center justify-between">
                    <span className="text-xs text-[#6b7280]">Nguồn: {ev.verifiedSource}</span>
                    <Link
                      href={`/booking?item=${ev.serviceId || d.slug}`}
                      className="rounded-xl bg-[#0d9488] hover:bg-[#0f766e] text-white px-3.5 py-1.5 text-xs font-bold shadow-xs transition-colors"
                    >
                      Đặt chỗ tham gia →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        );
      })()}

      {/* Structured Connected Services Grid */}
      <section className="mt-10 rounded-[26px] bg-white p-6 lg:p-8 border border-line shadow-sm">
        <h2 className="text-2xl sm:text-3xl font-bold text-ink">Dịch Vụ Tiếp Cận Liên Quan</h2>
        <p className="mt-1 text-sm text-ink-soft hc-muted">
          Đặt tour, vé tham quan, xe đưa đón hoặc tìm hướng dẫn viên đồng hành có chứng chỉ WBU tại {d.name}
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/explore?cat=ticket"
            className="rounded-2xl border border-line bg-surface-alt p-4 hover:border-primary transition-all group"
          >
            <span className="text-2xl" aria-hidden="true">🎟️</span>
            <h3 className="mt-2 font-bold text-base text-ink group-hover:text-[#c75c13]">Xem vé tham quan</h3>
            <p className="mt-1 text-xs text-ink-soft">Giá vé niêm yết, chính sách miễn giảm cho người khuyết tật.</p>
          </Link>

          <Link
            href="/explore?cat=activity"
            className="rounded-2xl border border-line bg-surface-alt p-4 hover:border-primary transition-all group"
          >
            <span className="text-2xl" aria-hidden="true">🧭</span>
            <h3 className="mt-2 font-bold text-base text-ink group-hover:text-[#c75c13]">Xem tour liên quan</h3>
            <p className="mt-1 text-xs text-ink-soft">Hành trình trải nghiệm xúc giác & âm thanh 3D 1-1.</p>
          </Link>

          <Link
            href="/services/guides"
            className="rounded-2xl border border-line bg-surface-alt p-4 hover:border-primary transition-all group"
          >
            <span className="text-2xl" aria-hidden="true">👤</span>
            <h3 className="mt-2 font-bold text-base text-ink group-hover:text-[#c75c13]">Tìm Guide đồng hành</h3>
            <p className="mt-1 text-xs text-ink-soft">10 hồ sơ hướng dẫn viên đào tạo kỹ năng dẫn dắt thấu cảm.</p>
          </Link>

          <Link
            href="/services/ride-booking"
            className="rounded-2xl border border-line bg-surface-alt p-4 hover:border-primary transition-all group"
          >
            <span className="text-2xl" aria-hidden="true">🚗</span>
            <h3 className="mt-2 font-bold text-base text-ink group-hover:text-[#c75c13]">Đặt xe đưa đón</h3>
            <p className="mt-1 text-xs text-ink-soft">Tài xế hỗ trợ lên xuống xe và đón tại cửa điểm đến.</p>
          </Link>
        </div>
      </section>

      <section className="mt-8 max-w-3xl">
        <h2 className="text-3xl">Trước khi đến</h2>
        <p className="mt-3">Bạn có thể nghe mô tả trước, lưu địa điểm vào chuyến đi và đọc thêm các bài cẩm nang liên quan. Khi lên lịch trình thực tế, nên kiểm tra giờ mở cửa và điều kiện di chuyển vào thời điểm bạn dự định ghé thăm.</p>
        <h3 className="mt-5 text-2xl">Cẩm nang liên quan</h3>
        <ul className="mt-3 space-y-2">
          {articles.filter((a) => a.destinationSlugs.includes(d.slug)).map((a) => <li key={a.slug}><Link className="underline" href={`/articles/${a.slug}`}>{a.title}</Link></li>)}
        </ul>
        <Link className="mt-4 inline-block underline" href="/services/guide-dogs">Thông tin về chó dẫn đường</Link>
      </section>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href={`/booking?item=${d.slug}`} className="btn-primary text-lg"><CalendarIcon size={22} /> Đặt dịch vụ / Guide đồng hành</Link>
        <Link href={`/navigation?to=${d.slug}`} className="btn-ghost hc-border text-lg"><CompassIcon size={22} /> Bản đồ điều hướng âm thanh</Link>
        <Link href="/services/ride-booking" className="btn-ghost hc-border text-lg">🚗 Đặt xe đưa đón tới đây</Link>
        <Link href="/help" className="btn-ghost hc-border text-lg"><PhoneIcon size={22} /> Thông tin hỗ trợ</Link>
      </div>

      <section className="mt-14" aria-labelledby="more-heading">
        <h2 id="more-heading" className="text-2xl">Điểm đến khác</h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.filter((x) => x.slug !== d.slug).slice(0, 3).map((x) => (
            <li key={x.slug}>
              <Link href={`/destination?d=${x.slug}`} className="card hc-surface hc-border block h-full overflow-hidden border border-line hover:shadow-card-hover">
                <VerifiedImage src={x.image} fallback={x.imageFallback} alt={x.alt} className="h-36 w-full object-cover" />
                <span className="block p-4 text-lg font-semibold">{x.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default function DestinationView() {
  return (
    <Suspense fallback={<div className="container-page py-10">Đang tải…</div>}>
      <DestinationContent />
    </Suspense>
  );
}
