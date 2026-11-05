"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useA11y } from "@/components/A11yProvider";
import VerifiedImage from "@/components/VerifiedImage";
import { api } from "@/lib/api";
import { getItem, catLabel } from "@/data/catalog";
import { SpeakerIcon, MapPinIcon, AccessibleIcon, CalendarIcon, HeartIcon, PlusIcon } from "@/components/Icons";

function Row({ label, value }) { return <div className="grid gap-1 border-b border-line py-3 hc-border sm:grid-cols-[190px_1fr] sm:gap-4"><dt className="font-semibold">{label}</dt><dd className="hc-muted text-ink-soft">{value}</dd></div>; }

function ItemContent() {
  const params = useSearchParams();
  const item = getItem(params.get("id") || params.get("slug"));
  const { speak } = useA11y();
  const [reviews, setReviews] = useState([]);
  const [reviewError,setReviewError]=useState("");
  const [saved, setSaved] = useState(false);
  const [added, setAdded] = useState(false);

  const itemId = item?.id;
  useEffect(() => { if (itemId) api.listReviews(itemId).then(setReviews).catch(err=>setReviewError(err.message)); }, [itemId]);
  if (!item) return <div className="container-page py-16"><p className="text-xl">Không tìm thấy mục này. <Link className="text-accent-dark underline" href="/explore">Quay lại khám phá</Link>.</p></div>;

  async function save() { try { await api.savePlace({ refId: item.id, name: item.name, cat: item.cat, image: item.image }); setSaved(true); speak(`Đã lưu ${item.name}.`); } catch(err) { speak(err.message || "Không lưu được. Hãy kiểm tra đăng nhập."); } }
  async function addTrip() { try { await api.addToTrip({ refId: item.id, name: item.name, cat: item.cat, image: item.image, area: item.area }); setAdded(true); speak(`Đã thêm ${item.name} vào chuyến đi.`); } catch(err) { speak(err.message || "Không lưu được. Hãy kiểm tra đăng nhập."); } }

  if (item.destinationSlug && item.cat === "destination") {
    return <div className="container-page py-16"><h1 className="text-3xl">Đang mở dữ liệu điểm đến…</h1><p className="hc-muted mt-3 text-ink-soft">Thông tin địa điểm công cộng được trình bày ở trang riêng để hiển thị nguồn và trạng thái xác minh accessibility rõ hơn.</p><Link href={`/destination?d=${item.destinationSlug}`} className="btn-primary mt-5">Mở {item.name}</Link></div>;
  }

  return (
    <div className="container-page py-10">
      <p className="text-sm text-ink-soft hc-muted"><Link href={`/explore?cat=${item.cat}`} className="hover:underline">{catLabel(item.cat)}</Link> · <MapPinIcon size={14} className="inline align-[-2px]" /> {item.area}</p>

      <div className="mt-4 grid gap-8 lg:grid-cols-2">
        <figure><div className="aspect-[4/3] overflow-hidden rounded-[18px] bg-surface-alt shadow-card"><VerifiedImage src={item.image} fallback={item.imageFallback} alt={item.alt} className="h-full w-full object-cover" /></div><figcaption className="hc-muted mt-2 text-sm text-ink-soft">{item.isDemo ? "Ảnh minh họa theo loại hình, chưa xác minh là ảnh chụp cơ sở có tên trên thẻ. Tên, địa chỉ lấy theo nguồn công khai; đặt chỗ là demo." : "Ảnh của địa điểm thật; xem trang điểm đến để kiểm tra nguồn."}</figcaption></figure>
        <div>
          <div className="flex flex-wrap items-center gap-2"><span className="chip hc-surface hc-border bg-primary"><AccessibleIcon size={16} /> {item.level}</span>{item.isDemo && <span className="chip border border-neutral-500 bg-neutral-100 text-neutral-900">DỮ LIỆU DEMO</span>}</div>
          <h1 className="mt-3 text-4xl sm:text-5xl">{item.name}</h1>
          <p className="hc-muted mt-3 text-lg text-ink-soft">{item.summary}</p>
          <p className="mt-3 text-lg font-bold">{item.price}</p>
          <button onClick={() => speak(item.audio)} className="btn-primary mt-4 text-lg"><SpeakerIcon size={22} /> Nghe mô tả</button>
          <div className="mt-3 rounded-2xl bg-surface-alt p-4 hc-surface hc-border"><p className="text-sm font-semibold text-ink-soft hc-muted">Mô tả âm thanh</p><p className="mt-1 text-lg">{item.audio}</p></div>
        </div>
      </div>

      {item.cat === "transport" && <section className="mt-8 max-w-4xl rounded-2xl border border-[#ecd6af] bg-[#fff9ed] p-5"><h2 className="text-2xl font-bold">Thông tin phương tiện & hỗ trợ</h2><dl className="mt-3"><Row label="Loại dịch vụ" value={item.transportType}/><Row label="Hãng/phương tiện" value={item.vehicleBrand}/><Row label="Đơn vị cung cấp (demo)" value={item.provider}/><Row label="Điểm đón dự kiến" value={item.pickupPoint}/><Row label="Mức tiếp cận minh họa" value={item.declaredLevel}/><Row label="Hỗ trợ khi di chuyển" value={item.supportInfo}/></dl><p className="mt-4 text-sm text-ink-soft">Chưa xác nhận hợp tác, lịch trình, hãng xe, quyền sử dụng ảnh hoặc tính năng tiếp cận. Không sử dụng thông tin này thay cho kiểm tra thực tế.</p></section>}
      {item.galleryImages?.length > 1 && <section className="mt-8" aria-label="Ảnh tham khảo của dịch vụ"><h2 className="mb-3 text-2xl">Hình ảnh tham khảo</h2><div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{item.galleryImages.map((src,index)=><div className="overflow-hidden rounded-xl border border-line" key={src}><VerifiedImage src={src} fallback={item.imageFallback} alt={`Ảnh tham khảo ${index+1} của ${item.name}`} className="aspect-[4/3] w-full object-cover"/></div>)}</div><p className="mt-2 text-sm text-ink-soft">Ảnh tham khảo từ tài liệu, quyền sử dụng công khai và mức độ tiếp cận chưa được xác minh.</p></section>}
      {item.detail && <section className="mt-8 max-w-4xl"><h2 className="mb-3 text-2xl">Giới thiệu chi tiết</h2><p className="leading-relaxed text-ink-soft">{item.detail}</p></section>}
      {item.stops?.length > 0 && <section className="mt-8 max-w-4xl"><h2 className="mb-3 text-2xl">Lịch trình đề xuất (DEMO)</h2><ol className="list-decimal space-y-2 pl-6">{item.stops.map((stop,idx)=><li key={idx}>{stop}</li>)}</ol><p className="mt-3 text-sm text-ink-soft">Các điểm dừng và điều kiện an toàn cần khảo sát trước khi tổ chức.</p></section>}
      {item.accessibilityDemo?.length === 7 && <section className="mt-8 max-w-4xl"><h2 className="mb-3 text-2xl">6 tiêu chí tiếp cận</h2><p className="mb-3 text-sm text-ink-soft">Dữ liệu tham khảo trong hồ sơ chưa được xác minh; không sử dụng làm cam kết tiếp cận thực tế.</p><dl>{[0,1,2,3,5,6].map((index)=><Row key={index} label={["Mức độ tiếp cận","Phù hợp người mù","Phù hợp người nhìn kém","Có nhân viên hỗ trợ","Có thang máy","Lối không bậc"][[0,1,2,3,5,6].indexOf(index)]} value={item.accessibilityDemo[index]} />)}</dl></section>}
      <section className="mt-10" aria-labelledby="acc"><h2 id="acc" className="text-3xl">Thông tin tiếp cận</h2><p className="hc-muted mt-2 max-w-3xl text-ink-soft">Các tiêu chí tiếp cận dưới đây chưa được khảo sát thực địa. Hãy hỏi nhà cung cấp trước khi đến; WayEcho không xác nhận dịch vụ hoặc tiện ích.</p><dl className="mt-4 max-w-3xl"><Row label="Trạng thái" value={item.level} /><Row label="Ghi chú" value={item.note} /><Row label="Khu vực" value={item.area} /><Row label="Giá" value={item.price} /><Row label="Địa chỉ" value={item.address || item.area} /></dl></section>

      {item.destinationSlug && <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-4 text-blue-950">Mục này liên kết với một địa điểm thật. <Link href={`/destination?d=${item.destinationSlug}`} className="font-bold underline">Xem nguồn và dữ liệu địa điểm →</Link></div>}

      <p role="note" className="mt-6">Luồng đặt chỗ hiện là DEMO cho mọi mục, kể cả địa điểm có thật. Chưa có inventory, thanh toán hoặc xác nhận từ nhà cung cấp thật.</p>
      <div className="mt-8 flex flex-wrap gap-3">{item.cat!=="destination" ? <Link href={item.cat === "transport" ? `/services/ride-booking?service=${encodeURIComponent(item.id)}` : `/booking?item=${item.id}`} className="btn-primary text-lg"><CalendarIcon size={22} /> {item.cat === "transport" ? "Đặt xe thử nghiệm" : "Thử luồng đặt chỗ DEMO"}</Link> : <Link href="/navigation" className="btn-primary text-lg"><MapPinIcon size={22} /> Xem đường đi</Link>}<button onClick={addTrip} className="btn-ghost hc-border text-lg"><PlusIcon size={20} /> {added ? "Đã thêm chuyến" : "Thêm vào chuyến"}</button><button onClick={save} className="btn-ghost hc-border text-lg"><HeartIcon size={20} filled={saved} className={saved ? "text-red-500" : ""} /> {saved ? "Đã lưu" : "Lưu"}</button></div>

      <section className="mt-12" aria-labelledby="rv"><div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center"><h2 id="rv" className="text-3xl">Đánh giá tiếp cận</h2><Link href={`/review?item=${item.id}`} className="font-semibold text-accent-dark underline">Viết đánh giá →</Link></div>{reviewError ? <p role="alert" className="mt-4">{reviewError}</p> : reviews.length === 0 ? <p className="hc-muted mt-4 text-ink-soft">Chưa có đánh giá sau trải nghiệm trong dữ liệu demo.</p> : <ul className="mt-4 space-y-3">{reviews.map((r) => <li key={r.id} className="card hc-surface hc-border border border-line p-4"><p className="font-semibold">{r.author}</p>{r.comment && <p className="hc-muted mt-1 text-ink-soft">{r.comment}</p>}</li>)}</ul>}</section>
    </div>
  );
}

export default function ItemView() { return <Suspense fallback={<div className="container-page py-10">Đang tải…</div>}><ItemContent /></Suspense>; }
