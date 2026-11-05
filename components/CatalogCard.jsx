"use client";

import { useState } from "react";
import Link from "next/link";
import { useA11y } from "./A11yProvider";
import VerifiedImage from "./VerifiedImage";
import { api } from "@/lib/api";
import { SERVICE_CONFIG } from "@/data/serviceDiscovery";
import { MapPinIcon, SpeakerIcon, HeartIcon, PlusIcon, AccessibleIcon } from "./Icons";

const levelColor = { "Tiếp cận tốt": "bg-[#dff5ea] text-[#0b5a3a]", "Tiếp cận trung bình": "bg-[#fff1bf] text-[#7a4d00]", "Dữ liệu một phần": "bg-blue-100 text-blue-950", "Cần khảo sát": "bg-amber-100 text-amber-950", "Cần xác minh": "bg-violet-100 text-violet-950", "Cần hỗ trợ": "bg-orange-100 text-orange-950", "Chưa xác minh": "bg-neutral-200 text-neutral-900", "Tiếp cận chưa xác minh": "bg-neutral-200 text-neutral-900" };

export default function CatalogCard({ item }) {
  const { speak } = useA11y();
  const [saved, setSaved] = useState(false);
  const [added, setAdded] = useState(false);
  const shownLevel = item.displayLevel ?? item.level;
  const cfg = SERVICE_CONFIG[item.cat] || SERVICE_CONFIG.destination;
  const detail = item.destinationSlug && item.cat === "destination" ? `/destination?d=${item.destinationSlug}` : `/item?id=${item.id}`;
  async function save() { try { await api.savePlace({ refId: item.id, name: item.name, cat: item.cat, image: item.image }); setSaved(true); speak(`Đã lưu ${item.name}.`); } catch (_) { speak("Không lưu được, thử lại sau."); } }
  async function addTrip() { try { await api.addToTrip({ refId: item.id, name: item.name, cat: item.cat, image: item.image, area: item.area }); setAdded(true); speak(`Đã thêm ${item.name} vào chuyến đi.`); } catch (_) { speak("Không thêm được, thử lại sau."); } }

  return (
    <article className="hc-surface hc-border group flex h-full flex-col overflow-hidden rounded-[22px] border border-line bg-white shadow-card transition hover:-translate-y-0.5 hover:shadow-card-hover">
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-alt">
        <VerifiedImage src={item.image} srcSet={item.imageSrcSet} fallback={item.imageFallback} alt={item.alt} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
        <span className="absolute left-3 top-3 rounded-pill bg-white/95 px-3 py-1 text-xs font-bold text-ink">{cfg.kicker}</span>
        {item.isDemo && <span className="absolute bottom-3 left-3 rounded-pill bg-black/80 px-3 py-1 text-xs font-bold text-white">DỮ LIỆU DEMO</span>}
        <button type="button" onClick={save} aria-pressed={saved} aria-label={saved ? `Đã lưu ${item.name}` : `Lưu ${item.name}`} className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-ink shadow"><HeartIcon size={18} filled={saved} className={saved ? "text-red-500" : ""} /></button>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="flex items-center gap-1 text-sm text-ink-soft hc-muted"><MapPinIcon size={15} /> {item.area}</p>
        <h3 className="mt-1 text-[22px] leading-tight"><Link href={detail} className="hover:text-accent-dark hover:underline">{item.name}</Link></h3>
        <p className={`mt-3 inline-flex items-center self-start rounded-pill px-3 py-1.5 text-xs font-bold ${levelColor[shownLevel] || "bg-neutral-200 text-neutral-900"}`}><AccessibleIcon size={13} className="mr-1" />{shownLevel}{item.levelIsDemo ? " · minh họa" : ""}</p>
        <p className="mt-3 text-ink-soft hc-muted">{item.summary}</p>
        {item.cat === "transport" && (
          <dl className="mt-3 space-y-1 rounded-xl border border-[#ecd6af] bg-[#fffaf0] p-3 text-sm">
            <div><dt className="inline font-bold">Loại xe: </dt><dd className="inline">{item.transportType}</dd></div>
            <div><dt className="inline font-bold">Hãng/phương tiện: </dt><dd className="inline">{item.vehicleBrand}</dd></div>
            <div><dt className="inline font-bold">Đơn vị (demo): </dt><dd className="inline">{item.provider}</dd></div>
            <div><dt className="inline font-bold">Điểm đón: </dt><dd className="inline">{item.pickupPoint}</dd></div>
            <div><dt className="inline font-bold">Mức tiếp cận (minh họa): </dt><dd className="inline">{item.declaredLevel}</dd></div>
          </dl>
        )}
        {item.note && <p className="mt-3 rounded-xl bg-[#fff9ed] p-3 text-sm hc-surface">{item.note}</p>}
        <details className="mt-3 rounded-xl border border-[#e7c99c] bg-[#fff9ed] hc-surface hc-border">
          <summary className="flex min-h-[44px] cursor-pointer items-center px-3 font-bold">Nên hỏi trước khi đi</summary>
          <ul className="grid gap-1 px-3 pb-3 text-sm">{cfg.ask.map((q) => <li key={q}>• {q}</li>)}</ul>
        </details>
        <p className="mt-3 text-sm font-bold text-ink">{item.price}</p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button type="button" onClick={() => speak(item.audio)} className="btn-primary !min-h-[44px] !py-2 text-sm" aria-label={`Nghe mô tả ${item.name}`}><SpeakerIcon size={16} /> Nghe mô tả</button>
          <Link href={detail} className="btn-ghost hc-border !min-h-[44px] !py-2 text-sm">Xem chi tiết</Link>
          {cfg.actions.map(([label, href]) => <Link key={href} href={item.cat === "transport" && href === "/services/ride-booking" ? `/services/ride-booking?service=${encodeURIComponent(item.id)}` : href} className="btn-ghost hc-border !min-h-[44px] !py-2 text-sm">{label}</Link>)}
          <button type="button" onClick={addTrip} aria-pressed={added} className="btn-ghost hc-border col-span-2 !min-h-[44px] !py-2 text-sm" aria-label={`Thêm ${item.name} vào chuyến đi`}><PlusIcon size={16} /> {added ? "Đã thêm vào chuyến đi" : "Thêm vào chuyến đi"}</button>
        </div>
      </div>
    </article>
  );
}
