// Cấu hình trang Dịch vụ: mỗi nhóm dịch vụ có phần giới thiệu, lưu ý "nên hỏi trước" và lối đi tiếp riêng.
// Thông tin tiếp cận chỉ mang tính tham khảo; chỉ hiển thị "đã xác minh" khi dữ liệu có bằng chứng.
export const SERVICE_CONFIG = {
  destination: {
    kicker: "Điểm đến", title: "Điểm đến Phố cổ",
    intro: "Di tích, chợ và tuyến phố nổi bật, kèm mô tả bằng lời để hình dung trước khi đến.",
    ask: ["Lối vào có bậc thềm hoặc dốc không?", "Lòng đường và vỉa hè có đông xe không?", "Có người hỗ trợ tại điểm không?"],
    actions: [["Chỉ đường", "/navigation"], ["Tìm Guide đồng hành", "/services/guides"]],
  },
  accommodation: {
    kicker: "Lưu trú", title: "Lưu trú gần Phố cổ",
    intro: "Khách sạn và nhà nghỉ quanh Phố cổ. Hãy hỏi cơ sở về cầu thang, thang máy và lối vào trước khi đặt.",
    ask: ["Có thang máy hoặc phòng tầng trệt không?", "Quầy lễ tân có nhân viên hỗ trợ người khiếm thị không?", "Đường từ cổng vào phòng có bậc không?"],
    actions: [["Hỏi tư vấn viên", "/contact"], ["Đặt xe đến nơi ở", "/services/ride-booking"]],
  },
  restaurant: {
    kicker: "Ẩm thực", title: "Ẩm thực Phố cổ",
    intro: "Quán ăn, cà phê lâu năm trong ngõ nhỏ. Lưu ý lối vào hẹp, tiếng ồn và cách đọc thực đơn.",
    ask: ["Thực đơn có người đọc hoặc mã QR đọc được không?", "Ngõ vào rộng bao nhiêu, có bậc không?", "Giờ nào quán yên tĩnh hơn?"],
    actions: [["Chỉ đường", "/navigation"], ["Nhờ người đồng hành", "/services/guides"]],
  },
  activity: {
    kicker: "Tour & Trải nghiệm", title: "Tour và trải nghiệm",
    intro: "Hoạt động đi bộ, nghe kể chuyện và trải nghiệm làng nghề với mô tả giác quan rõ ràng.",
    ask: ["Tour có hướng dẫn viên mô tả bằng lời không?", "Quãng đường đi bộ dài bao nhiêu?", "Có điểm nghỉ và lối thoát an toàn không?"],
    actions: [["Tìm Guide đồng hành", "/services/guides"], ["Lập chuyến đi", "/my-trip"]],
  },
  ticket: {
    kicker: "Vé tham quan", title: "Vé tham quan",
    intro: "Vé vào di tích và bảo tàng. Hỏi về hỗ trợ khi vào cổng và chính sách người đi cùng.",
    ask: ["Người đi cùng có được miễn hoặc giảm vé không?", "Có thiết bị thuyết minh bằng giọng nói không?", "Lối vào dành riêng cho người cần hỗ trợ ở đâu?"],
    actions: [["Chỉ đường", "/navigation"], ["Lập chuyến đi", "/my-trip"]],
  },
  transport: {
    kicker: "Di chuyển", title: "Dịch vụ di chuyển cho người khiếm thị",
    intro: "Tìm và đặt phương tiện hỗ trợ di chuyển, đón trả tại điểm hẹn trong khu vực Phố cổ Hà Nội. Điểm đón, tuyến và khả năng phục vụ cần được xác nhận trước khi vận hành thực tế.",
    ask: ["Điểm đón có an toàn, dễ nhận biết bằng âm thanh không?", "Tài xế có được báo trước nhu cầu hỗ trợ không?", "Có thể gọi điện hoặc nhắn tin xác nhận không?"],
    actions: [["Đặt xe thử nghiệm", "/services/ride-booking"], ["Chỉ đường", "/navigation"]],
  },
};

export const LEVEL_ALL = "all";

export function levelOptions(items) {
  return [...new Set(items.map((i) => i.displayLevel ?? i.level).filter(Boolean))];
}

export function filterByLevel(items, level = LEVEL_ALL) {
  return level === LEVEL_ALL ? items : items.filter((i) => (i.displayLevel ?? i.level) === level);
}

// Mức tiếp cận MINH HỌA để thử bộ lọc: gán ổn định theo id, KHÔNG phải kết quả khảo sát thật.
export const DEMO_LEVELS = ["Tiếp cận tốt", "Tiếp cận trung bình", "Cần hỗ trợ"];
export function demoLevelFor(item) {
  if (DEMO_LEVELS.includes(item.level)) return item.level;
  let h = 0;
  for (const ch of String(item.id)) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return DEMO_LEVELS[h % DEMO_LEVELS.length];
}
export function withDisplayLevel(items, demo) {
  return items.map((it) => (demo ? { ...it, displayLevel: demoLevelFor(it), levelIsDemo: !DEMO_LEVELS.includes(it.level) } : { ...it, displayLevel: it.level, levelIsDemo: false }));
}
