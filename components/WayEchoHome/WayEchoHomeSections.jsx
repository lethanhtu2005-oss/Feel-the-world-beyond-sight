"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

// Routes trong WayEcho
const ROUTES = {
  map: "/navigation",
  trip: "/my-trip",
  guide: "/articles",
  destinations: "/destination",
  accessibility: "/onboarding",
};

const AUDIO_TRACKS = [
  {
    id: "hang-dao",
    title: "Phố Hàng Đào",
    subtitle: "Không khí buôn bán nhộn nhịp",
    speech: "Đây là bản nghe thử về phố Hàng Đào. Những cửa hàng nằm dọc tuyến phố, người mua bán trò chuyện và nhịp sống phố nghề mang đến một bầu không khí nhộn nhịp. Đây là giọng đọc minh họa, không phải bản ghi âm thực tế.",
  },
  {
    id: "hang-ma",
    title: "Phố Hàng Mã",
    subtitle: "Sắc màu lễ hội quanh năm",
    speech: "Đây là bản nghe thử về phố Hàng Mã. Dọc tuyến phố, những gian hàng bày bán đồ trang trí, đèn lồng và đồ thủ công theo mùa. Tiếng trò chuyện của người đi đường gợi lên không khí Phố cổ Hà Nội.",
  },
  {
    id: "ngo-pho-co",
    title: "Ngõ Phố cổ",
    subtitle: "Nhịp sống gần gũi, đời thường",
    speech: "Đây là bản nghe thử về một con ngõ ở Phố cổ Hà Nội. Từ những hàng quán nhỏ vọng ra tiếng trò chuyện và tiếng chế biến món ăn. Âm thanh thực tế có thể khác tùy địa điểm và thời gian.",
  },
];

const PREPARATION_CARDS = [
  {
    icon: "📍",
    title: "Thông tin điểm đến",
    description: "Lịch sử, lối đi, mức độ tiếp cận",
    href: ROUTES.destinations,
  },
  {
    icon: "🎧",
    title: "Hướng dẫn tiếp cận",
    description: "Đọc to, phóng chữ, tương phản",
    href: ROUTES.accessibility,
  },
  {
    icon: "📋",
    title: "Checklist chuẩn bị",
    description: "Hành trang & lưu ý an toàn",
    href: ROUTES.trip,
  },
  {
    icon: "☀️",
    title: "Thời tiết & thời điểm",
    description: "Kiểm tra dự báo trước khi đi",
    href: ROUTES.trip,
  },
];

function HanoiIllustration() {
  return (
    <svg
      className="we-hanoi-illustration"
      viewBox="0 0 600 245"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M0 198q100-60 202-18T600 166"
        stroke="#e4bd80"
        strokeWidth="3"
        opacity=".34"
      />
      <path
        d="M0 219q120-45 240-20T600 201"
        stroke="#e4bd80"
        strokeWidth="2"
        opacity=".30"
      />

      <g
        stroke="#b7894c"
        strokeWidth="2.4"
        fill="#f6e1bd"
        opacity=".83"
      >
        <path d="M272 196v-91h178v91M265 105h192l-15-13H281z" />
        <path d="M300 91V66h122v25M292 66h138l-14-13H306z" />
        <path d="M326 53V34h67v19M317 34h84l-13-12h-58z" />
        <path d="M275 196h180M296 196v-52h46v52M377 196v-52h46v52" />
        <path
          d="M346 196v-64q21-29 43 0v64"
          fill="#fff8ea"
        />
        <path d="M319 116h19v18h-19zM396 116h19v18h-19z" />
        <path d="M266 102h192" />
      </g>

      <g fill="#e5bc60" opacity=".48">
        <circle cx="205" cy="107" r="44" />
        <circle cx="163" cy="128" r="33" />
        <circle cx="504" cy="72" r="43" />
        <circle cx="543" cy="96" r="31" />
      </g>
    </svg>
  );
}

export function WayEchoAudioPreview({
  mapHref = ROUTES.map,
  tripHref = ROUTES.trip,
}) {
  const [active, setActive] = useState(null);
  const [available, setAvailable] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const utteranceRef = useRef(null);

  useEffect(() => {
    const supported =
      typeof window !== "undefined" &&
      "speechSynthesis" in window;

    if (supported) {
      queueMicrotask(() => setAvailable(true));
    }

    return () => {
      if (supported) {
        try {
          window.speechSynthesis.cancel();
        } catch {}
      }
    };
  }, []);

  function stopAudio() {
    if (
      typeof window !== "undefined" &&
      "speechSynthesis" in window
    ) {
      try {
        window.speechSynthesis.cancel();
      } catch {}
    }

    utteranceRef.current = null;
    setActive(null);
    setSpeaking(false);
  }

  function toggleAudio(track) {
    if (active === track.id) {
      stopAudio();
      return;
    }

    stopAudio();

    if (!available) return;

    try {
      const utterance = new SpeechSynthesisUtterance(track.speech);
      utterance.lang = "vi-VN";
      utterance.rate = 0.9;

      utterance.onend = () => {
        setActive(null);
        setSpeaking(false);
      };

      utterance.onerror = () => {
        setActive(null);
        setSpeaking(false);
      };

      utteranceRef.current = utterance;
      setActive(track.id);
      setSpeaking(true);

      window.speechSynthesis.speak(utterance);
    } catch {
      setActive(null);
      setSpeaking(false);
    }
  }

  return (
    <section
      className="we-audio-section"
      aria-labelledby="we-audio-title"
    >
      {/* Bản trình bày đã được duyệt: hiển thị nguyên vẹn thiết kế trên desktop.
          Các nút tương tác thật được đặt đúng vào vị trí trên ảnh để không mất chức năng. */}
      <div className="we-approved-audio" role="group" aria-label="Nghe trước không gian Phố cổ">
        <img
          className="we-approved-audio-image"
          src="/assets/images/wayecho-audio-pho-co-approved.png"
          alt=""
          aria-hidden="true"
          draggable="false"
        />
        {AUDIO_TRACKS.map((track, index) => (
          <button
            key={track.id}
            className={`we-approved-hit we-approved-track-${index + 1} ${active === track.id ? "is-active" : ""}`}
            type="button"
            disabled={!available}
            onClick={() => toggleAudio(track)}
            aria-pressed={active === track.id}
            aria-label={`${track.title}, ${track.subtitle}. ${active === track.id ? "Đang đọc; nhấn để dừng" : "Nhấn để nghe giọng đọc DEMO"}`}
          />
        ))}
        <Link className="we-approved-hit we-approved-map" href={mapHref} aria-label="Mở bản đồ dẫn đường" />
        <Link className="we-approved-hit we-approved-trip" href={tripHref} aria-label="Lập chuyến đi" />
        <p className="we-sr-only" aria-live="polite">
          {active ? `Đang đọc ${AUDIO_TRACKS.find((track) => track.id === active)?.title}` : "Đã dừng đọc"}
        </p>
      </div>
      <div className="we-audio-mobile-content">
      <div className="we-audio-head">
        <div className="we-audio-copy">
          <span className="we-audio-kicker">
            🎧 Nên đeo tai nghe khi nghe
          </span>

          <h2 id="we-audio-title">
            Nghe trước không gian <em>Phố cổ</em>
          </h2>

          <p>
            Mô tả bằng lời về âm thanh, không gian và nhịp sống từng khu vực, giúp bạn
            hình dung trước khi đến. Đây là bản nghe thử (DEMO), chưa phải bản thu âm thật.
          </p>

          <div
            className={`we-wave ${speaking ? "is-playing" : ""}`}
            aria-hidden="true"
          >
            {[
              16, 28, 46, 25, 51, 30, 19, 40,
              56, 21, 35, 44, 18, 49, 29, 42,
              17, 36, 52, 30, 18, 39, 27, 47,
              20, 34, 16,
            ].map((height, index) => (
              <i
                key={index}
                style={{
                  height: `${height}px`,
                  animationDelay: `${index * 0.06}s`,
                }}
              />
            ))}
          </div>
        </div>

        <HanoiIllustration />
      </div>

      <div
        className="we-track-grid"
        role="group"
        aria-label="Chọn bản nghe thử"
      >
        {AUDIO_TRACKS.map((track, index) => {
          const isCurrent = active === track.id;
          return (
            <button
              key={track.id}
              type="button"
              disabled={!available}
              className={`we-track ${isCurrent ? "is-active" : ""}`}
              onClick={() => toggleAudio(track)}
              aria-pressed={isCurrent}
              aria-label={`${track.title}, ${track.subtitle}. ${isCurrent ? "Đang phát, nhấn để dừng" : "Nhấn để nghe mô tả"}`}
            >
              <span
                className={`we-track-thumb we-track-thumb-${index + 1}`}
                aria-hidden="true"
              >
                {isCurrent ? "❚❚" : "▶"}
              </span>

              <span className="we-track-meta">
                <strong>
                  {index + 1}. {track.title}
                </strong>

                <small>{track.subtitle}</small>

                <span className="we-demo-tag">
                  🎧 Giọng đọc DEMO
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {!available && (
        <p className="mt-3 text-sm text-ink-soft" role="status">
          Trình duyệt chưa hỗ trợ đọc văn bản tự động. Bạn vẫn có thể tham khảo nội dung và sử dụng bản đồ dẫn đường.
        </p>
      )}

      <div className="we-audio-bottom">
        <div className="we-actions">
          <Link
            className="we-btn we-btn-primary"
            href={mapHref}
          >
            🗺 Mở bản đồ dẫn đường →
          </Link>

          <Link
            className="we-btn we-btn-outline"
            href={tripHref}
          >
            📅 Lập chuyến đi →
          </Link>
        </div>

        <div className="we-audio-benefits">
          <span>🎧 Thuyết minh chi tiết</span>
          <span>♿ Hỗ trợ trợ năng</span>
          <span>📍 Chủ động hành trình</span>
        </div>
      </div>

      <p className="we-sr-only" aria-live="polite">
        {active
          ? `Đang đọc mô tả ${
              AUDIO_TRACKS.find((t) => t.id === active)?.title
            }`
          : "Đã dừng đọc"}
      </p>
      </div>
    </section>
  );
}

export function WayEchoTripPreparation({
  guideHref = ROUTES.guide,
  tripHref = ROUTES.trip,
}) {
  return (
    <section
      className="we-prep-section"
      aria-labelledby="we-prep-title"
    >
      <div className="we-prep-content">
        <div className="we-prep-intro">
          <span
            className="we-accent-line"
            aria-hidden="true"
          />

          <h2 id="we-prep-title">
            Chuẩn bị <em>trước khi đi</em>
          </h2>

          <p>
            Tìm hiểu thông tin, đọc hướng dẫn tiếp cận và chuẩn bị hành trang
            phù hợp cho điểm đến.
          </p>

          <div className="we-actions">
            <Link
              href={guideHref}
              className="we-btn we-btn-primary"
            >
              📖 Đọc cẩm nang
            </Link>

            <Link
              href={tripHref}
              className="we-btn we-btn-outline"
            >
              📅 Lập kế hoạch chuyến đi
            </Link>
          </div>
        </div>

        <div className="we-prep-visual" aria-hidden="true">
          <img
            src="/assets/images/wayecho-chuan-bi-chuyen-di-da-duyet.webp"
            alt=""
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="we-prep-grid">
          {PREPARATION_CARDS.map((item) => (
            <Link
              key={item.title}
              className="we-prep-card"
              href={item.href}
            >
              <span className="we-prep-icon" aria-hidden="true">
                {item.icon}
              </span>

              <strong>{item.title}</strong>

              <small>{item.description}</small>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function WayEchoHomeSections() {
  return (
    <div className="we-additive-sections">
      <WayEchoAudioPreview />
      <WayEchoTripPreparation />
    </div>
  );
}
