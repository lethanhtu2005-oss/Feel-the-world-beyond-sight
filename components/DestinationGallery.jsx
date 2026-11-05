"use client";
import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { oldQuarterGallery } from "@/data/oldQuarterGallery";

export default function DestinationGallery() {
  const [active, setActive] = useState(0);
  const [unavailable, setUnavailable] = useState([]);
  const start = useRef(null);
  const modal = useRef(null);
  // imageCredit is intentionally omitted from the carousel/lightbox; citations live in /photo-credits.
  const visible = useMemo(() => oldQuarterGallery.filter(x => !unavailable.includes(x.source)), [unavailable]);
  const n = visible.length;
  const selected = n ? active % n : 0;
  const current = n ? visible[selected] : null;
  const advance = delta => { if (n) setActive(index => ((index % n) + delta + n) % n); };
  const markUnavailable = source => {
    setUnavailable(items => items.includes(source) ? items : [...items, source]);
    if (modal.current?.open) modal.current.close();
  };
  const offset = i => { let distance = (i - selected + n) % n; return distance > n/2 ? distance - n : distance; };

  return <section className="container-page py-12" aria-labelledby="gallery-heading">
    <h2 id="gallery-heading" className="text-4xl">Khám phá qua hình ảnh</h2>
    <p className="mt-2 text-sm text-ink-soft">15 hình ảnh Phố cổ Hà Nội được chọn cho bộ sưu tập. Chọn ảnh để xem lớn và khám phá nội dung liên quan.</p>
    {n ? <>
      <div className="we-gallery-stage relative mt-6 h-[340px] overflow-hidden sm:h-[450px] lg:h-[510px]"
        onTouchStart={event => { start.current = event.touches[0].clientX; }}
        onTouchEnd={event => { if (start.current === null) return; const delta = event.changedTouches[0].clientX - start.current; if (Math.abs(delta) > 40) advance(delta < 0 ? 1 : -1); start.current = null; }}>
        <div className="absolute inset-0" aria-roledescription="carousel" aria-label={`${n} ảnh đang hiển thị về Phố cổ Hà Nội`}>
          {visible.map((photo, i) => {
            const d = offset(i);
            if (Math.abs(d) > 2) return null;
            const middle = d === 0;
            return <div key={photo.source} className={`we-gallery-tile absolute left-1/2 top-5 h-[285px] w-[63%] overflow-hidden rounded-2xl border-2 border-white shadow-2xl transition-transform duration-500 sm:h-[380px] sm:w-[49%] lg:h-[435px] lg:w-[38%] ${middle ? 'z-20' : 'z-10'}`}
              style={{transform:`translateX(calc(-50% + ${d * 70}%)) scale(${middle ? 1 : Math.abs(d) === 1 ? .83 : .66}) rotateY(${d * -7}deg)`, filter:middle ? 'none' : `brightness(${Math.abs(d) === 1 ? .87 : .72})`, zIndex:20-Math.abs(d)}}>
              <button type="button" tabIndex={middle ? 0 : -1} onClick={() => middle ? modal.current?.showModal() : setActive(i)} aria-label={`Xem ảnh lớn: ${photo.name}`} className="h-full w-full">
                <img src={photo.image} alt={photo.alt} loading={Math.abs(d) > 1 ? 'lazy' : 'eager'} referrerPolicy="no-referrer" onError={() => markUnavailable(photo.source)} className="h-full w-full object-cover" />
              </button>
              {middle && <Link href={photo.href} aria-label={`Tìm hiểu thêm về ${photo.name}`} className="absolute bottom-2 right-2 z-30 rounded-lg bg-white/95 px-3 py-2 text-xs font-semibold text-black">Xem nội dung</Link>}
            </div>;
          })}
        </div>
        <button type="button" aria-label="Ảnh trước" onClick={() => advance(-1)} className="absolute left-1 top-[45%] z-30 h-12 w-12 rounded-full bg-white text-3xl shadow-lg focus-visible:outline-2 focus-visible:outline-orange-600">‹</button>
        <button type="button" aria-label="Ảnh tiếp theo" onClick={() => advance(1)} className="absolute right-1 top-[45%] z-30 h-12 w-12 rounded-full bg-white text-3xl shadow-lg focus-visible:outline-2 focus-visible:outline-orange-600">›</button>
      </div>
      <div className="mt-2 flex flex-wrap justify-center gap-2" aria-label="Chọn ảnh trong bộ sưu tập">{visible.map((photo, i) => <button type="button" key={photo.source} onClick={() => setActive(i)} aria-label={`Ảnh ${i+1}: ${photo.name}`} aria-current={selected === i ? 'true' : undefined} className={`h-2.5 rounded-full ${selected === i ? 'w-6 bg-[#ec702b]' : 'w-2.5 bg-[#d6d0c7]'}`}/>)}</div>
      <dialog ref={modal} onClose={() => {}} aria-label="Xem ảnh lớn" className="we-gallery-modal max-h-[90dvh] w-[min(95vw,900px)] rounded-2xl bg-white p-4 shadow-2xl backdrop:bg-black/75">
        <div className="flex justify-end"><button type="button" onClick={() => modal.current?.close()} className="rounded-lg border px-4 py-2">Đóng ảnh</button></div>
        {current && <><img src={current.image} alt={current.alt} referrerPolicy="no-referrer" onError={() => markUnavailable(current.source)} className="mt-3 max-h-[70dvh] w-full object-contain"/><p className="mt-2 text-sm font-semibold">{current.name}</p><Link href={current.href} className="mt-2 inline-block underline" onClick={() => modal.current?.close()}>Xem nội dung liên quan</Link></>}
      </dialog>
      <p className="sr-only" aria-live="polite">Ảnh {selected+1}/{n}: {current?.name}</p>
    </> : <p role="status" className="mt-6 rounded-2xl bg-[#fff5ea] p-6">Hiện chưa tải được ảnh trong bộ sưu tập. Bạn vẫn có thể khám phá điểm đến qua phần mô tả và âm thanh.</p>}
  </section>;
}
