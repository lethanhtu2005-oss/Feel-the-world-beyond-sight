"use client";

import { useState } from "react";
import Link from "next/link";
import VerifiedImage from "./VerifiedImage";
import { oldQuarterCards } from "@/data/oldQuarterHome";

export default function HomeOldQuarterCards() {
  const [opened, setOpened] = useState(-1);

  return (
    <section className="border-y border-line bg-[#fffaf2] py-12 hc-surface hc-border" aria-labelledby="discover-heading">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 id="discover-heading" className="text-4xl">Gợi ý khám phá Phố cổ Hà Nội</h2>
            <p className="mt-1 text-ink-soft hc-muted">Bốn điểm đến nổi bật với mô tả dễ hình dung và thông tin tiếp cận tham khảo.</p>
          </div>
          <Link href="/destination" className="btn-ghost hc-border">Xem thêm điểm đến ›</Link>
        </div>

        <div className="mt-6 grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {oldQuarterCards.map((x, i) => {
            const accessLevel = x.info.find(([key]) => key === "Mức độ tiếp cận")?.[1] || "Thông tin tham khảo";
            return (
              <article key={x.title} className="overflow-hidden rounded-[22px] border border-[#eedecb] bg-white card-3d hc-surface hc-border">
                <VerifiedImage src={x.image} fallback="/assets/images/location-image-unavailable.svg" alt={x.alt} className="h-52 w-full object-cover" />
                <div className="p-5">
                  <h3 className="text-[24px] leading-tight text-[#352016]">{x.title}</h3>
                  <p className="mt-2 text-sm text-ink-soft">⌖ {x.area}</p>
                  <p className="mt-3 text-sm leading-6">{x.desc}</p>
                  <p className="mt-3 inline-flex rounded-full bg-[#fff1bf] border border-[#f0d8b6] px-3 py-1.5 text-xs font-bold text-[#7a4d00]">{accessLevel}</p>

                  <button
                    type="button"
                    aria-expanded={opened === i}
                    aria-controls={`we-access-place-${i}`}
                    onClick={() => setOpened(opened === i ? -1 : i)}
                    className="mt-4 flex w-full min-h-12 items-center justify-between rounded-xl border border-[#e7c99c] bg-[#fff9ed] hover:bg-[#fff2dc] transition-colors px-3.5 text-left font-bold text-[#452a1d]"
                  >
                    <span>Thông tin tiếp cận</span>
                    <svg className={`h-4 w-4 transition-transform duration-200 ${opened === i ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m6 9 6 6 6-6" /></svg>
                  </button>

                  {opened === i && (
                    <div id={`we-access-place-${i}`} className="mt-3 space-y-2.5 rounded-xl bg-[#fff9ed] p-3.5 border border-[#eedecb] text-sm">
                      <p className="font-bold text-[#89540d]">THÔNG TIN THAM KHẢO</p>
                      {x.info.map(([k, v]) => <p key={k}><strong>{k}: </strong>{v}</p>)}
                    </div>
                  )}

                  <Link href={x.href} className="mt-4 inline-flex min-h-11 items-center font-bold text-[#b54d17] hover:text-[#d86927] transition-colors underline">Xem thông tin điểm đến →</Link>
                </div>
              </article>
            );
          })}
        </div>

        <p className="mt-4 text-xs text-ink-soft">Nguồn ảnh và giấy phép được tổng hợp ở cuối trang; thông tin tiếp cận vẫn là dữ liệu demo chưa được khảo sát thực địa. Xem danh mục nguồn ảnh ở cuối trang.</p>
      </div>
    </section>
  );
}
