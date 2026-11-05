"use client";

import { useState } from "react";

export default function VerifiedImage({ src, fallback, alt, fallbackAlt, className = "", loading = "lazy", priority = false, srcSet, sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" }) {
  const [current, setCurrent] = useState(src || fallback);
  const showingFallback = Boolean(fallback && current === fallback && src && src !== fallback);
  const effectiveAlt = showingFallback
    ? (fallbackAlt || `Ảnh nguồn của địa điểm hiện không tải được. Mô tả ảnh dự kiến: ${alt}`)
    : alt;

  return (
    <img
      src={current}
      srcSet={current === src ? srcSet : undefined}
      sizes={current === src && srcSet ? sizes : undefined}
      alt={effectiveAlt}
      loading={priority ? "eager" : loading}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => { if (fallback && current !== fallback) setCurrent(fallback); }}
      className={className}
    />
  );
}
