// Dữ liệu Sự kiện Văn hóa Phố cổ Hà Nội — WayEcho
// Phục vụ Lớp dữ liệu thứ 2 của Bản đồ Văn hóa và liên thông Điểm đến → Sự kiện → Dịch vụ / Booking

export const culturalEvents = [
  {
    id: "event-ca-tru-50-dao-duy-tu",
    title: "Đêm Di Sản Ca Trù & Hát Xẩm Thính Phòng",
    category: "Biểu diễn âm nhạc",
    destinationSlug: "tt-50-dao-duy-tu",
    location: "Trung tâm Giao lưu Văn hóa Phố cổ (50 Đào Duy Từ)",
    address: "50 Đào Duy Từ, phường Hàng Buồm, Hoàn Kiếm, Hà Nội",
    coordinates: { lat: 21.0361, lng: 105.8529 },
    schedule: "20:00 – 21:30, Tối thứ Sáu và Chủ Nhật hàng tuần",
    date: "Tối thứ Sáu & Chủ Nhật",
    price: "150.000đ (Ưu đãi 50% cho người khiếm thị và người đồng hành)",
    summary: "Thưởng thức nghệ thuật Ca trù (Di sản phi vật thể nhân loại) và Hát Xẩm chợ Đồng Xuân qua tiếng đàn đáy trầm mộc, nhịp phách giòn tan và giọng hát ngân nga trong không gian thính phòng tiếp cận.",
    accessibility: {
      rating: "Xuất sắc cho người khiếm thị",
      blind: "100% Phù hợp (Trải nghiệm thính giác đỉnh cao)",
      lowVision: "Tốt (Ánh sáng sân khấu ấm áp)",
      staff: "Có nhân viên đón tại cửa và hỗ trợ chỗ ngồi ưu tiên",
      accessibilityNote: "Có phần giới thiệu cấu tạo đàn đáy và cỗ phách cho du khách sờ chạm",
      stepFree: "Có ram dốc cửa vào và thang máy lên tầng 2"
    },
    serviceId: "ve-ca-tru-50-dao-duy-tu",
    organizer: "CLB Ca trù Hà Nội & Ban Quản lý Phố Cổ",
    verifiedSource: "Ban Quản lý Hồ Hoàn Kiếm và Phố cổ Hà Nội"
  },
  {
    id: "event-nghe-thuat-22-hang-buom",
    title: "Triển Lãm Không Gian Nghệ Thuật Sắp Đặt & Âm Thanh 3D",
    category: "Triển lãm di sản",
    destinationSlug: "tt-22-hang-buom",
    location: "Trung tâm Nghệ thuật 22 Hàng Buồm (Hội quán Quảng Đông)",
    address: "22 Hàng Buồm, phường Hàng Buồm, Hoàn Kiếm, Hà Nội",
    coordinates: { lat: 21.0368, lng: 105.8542 },
    schedule: "08:30 – 17:00 (Mở cửa tất cả các ngày trong tuần)",
    date: "Mở cửa hàng ngày",
    price: "Miễn phí tham quan",
    summary: "Triển lãm tương tác đa giác quan kết hợp giữa mỹ thuật gốm phù điêu thế kỷ 19 và sắp đặt âm thanh không gian tái hiện tiếng thở của phố nghề buôn bán sầm uất xưa.",
    accessibility: {
      rating: "Dễ tiếp cận",
      blind: "Có âm thanh thuyết minh đa kênh tự động phát theo vị trí",
      lowVision: "Độ tương phản cao giữa mảng tường gốm men xanh và sàn gạch",
      staff: "Tình nguyện viên trực tại sảnh đón",
      accessibilityNote: "Có thể cân nhắc dùng tai nghe cá nhân để nghe nội dung; WayEcho không cung cấp hoặc cho mượn thiết bị.",
      stepFree: "Sân trong phẳng lì, có gờ dốc cao su tạm thời giữa các gian"
    },
    serviceId: "tour-pho-co-1",
    organizer: "Trung tâm Văn hóa Nghệ thuật 22 Hàng Buồm",
    verifiedSource: "Sở Văn hóa & Thể thao Hà Nội"
  },
  {
    id: "event-le-hoi-dinh-kim-ngan",
    title: "Trình Diễn Nghệ Thuật Chạm Bạc Đậu & Trải Nghiệm Xúc Giác Kim Hoàn",
    category: "Nghề thủ công & Xúc giác",
    destinationSlug: "dinh-kim-ngan",
    location: "Đình Kim Ngân (42 Hàng Bạc)",
    address: "42 Hàng Bạc, phường Hàng Bạc, Hoàn Kiếm, Hà Nội",
    coordinates: { lat: 21.0348, lng: 105.8528 },
    schedule: "09:00 – 11:30 và 14:30 – 17:00 các ngày thứ Bảy, Chủ Nhật",
    date: "Thứ Bảy & Chủ Nhật hàng tuần",
    price: "Miễn phí trải nghiệm chạm sản phẩm",
    summary: "Gặp gỡ nghệ nhân kim hoàn làng Định Công và Châu Khê tại sân đình. Người khiếm thị được trực tiếp cầm nắm dụng cụ đe búa thu nhỏ và sờ chạm các chi tiết sợi bạc se chỉ mảnh như sợi tóc.",
    accessibility: {
      rating: "Tuyệt vời cho trải nghiệm xúc giác",
      blind: "Cho phép sờ chạm các mẫu bạc phôi thô và sợi bạc uốn hoa văn",
      lowVision: "Bàn trưng bày có đèn chiếu sáng rọi tập trung",
      staff: "Nghệ nhân trực tiếp hướng dẫn cầm nắm an toàn",
      accessibilityNote: "Nghe tiếng gõ đe sắt và nghe nghệ nhân kể chuyện nghề",
      stepFree: "Sân đình phẳng, có bậc thấp 10cm vào gian bái đường"
    },
    serviceId: "hdv-dong-hanh",
    organizer: "Hội Nghệ nhân Thợ bạc Hà Nội",
    verifiedSource: "UBND Phường Hàng Bạc"
  },
  {
    id: "event-tau-dien-bich-hoa-phung-hung",
    title: "Chương Trình Âm Nhạc Đường Phố Ký Ức Hà Nội Dưới Vòm Cầu",
    category: "Không gian đi bộ & Âm nhạc",
    destinationSlug: "bich-hoa-phung-hung",
    location: "Phố Bích họa Phùng Hưng (Đoạn vòm cầu đường sắt)",
    address: "Phố Phùng Hưng, quận Hoàn Kiếm, Hà Nội",
    coordinates: { lat: 21.0372, lng: 105.8458 },
    schedule: "19:30 – 21:30, Tối thứ Bảy hàng tuần",
    date: "Tối thứ Bảy",
    price: "Miễn phí",
    summary: "Hòa mình vào không gian đi bộ an toàn 100% không khói xe máy, lắng nghe tiếng đàn guitar mộc, tiếng saxophone và âm thanh mô phỏng tiếng leng keng tàu điện xưa.",
    accessibility: {
      rating: "Hoàn toàn không rào cản",
      blind: "Mặt phố đi bộ lát đá phẳng hoàn toàn, không có phương tiện cơ giới",
      lowVision: "Không gian thoáng đãng, ánh sáng đèn đường vàng ấm",
      staff: "Có đội tự quản và tình nguyện viên túc trực đầu tuyến phố",
      accessibilityNote: "Các vòm cầu có biển chữ nổi Braille tóm tắt lịch sử",
      stepFree: "100% Không bậc thềm, rất lý tưởng cho gậy dò đường và xe lăn"
    },
    serviceId: "tour-pho-co-1",
    organizer: "Ban Quản lý Không gian Đi bộ Hoàn Kiếm",
    verifiedSource: "Cổng thông tin Quận Hoàn Kiếm"
  },
  {
    id: "event-cho-dem-dong-xuan",
    title: "Trải Nghiệm Khứu Giác & Ẩm Thực Chợ Đêm Phố Cổ",
    category: "Ẩm thực & Đa giác quan",
    destinationSlug: "cho-dong-xuan",
    location: "Tuyến phố Hàng Đào – Đồng Xuân",
    address: "Phố Đồng Xuân, Hoàn Kiếm, Hà Nội",
    coordinates: { lat: 21.0392, lng: 105.8507 },
    schedule: "18:30 – 22:30, Tối thứ Sáu, Thứ Bảy và Chủ Nhật",
    date: "Cuối tuần",
    price: "Tự do tham quan (Chi phí ẩm thực theo món)",
    summary: "Hành trình đa giác quan qua thế giới ẩm thực đường phố Hà Nội: mùi chả nướng than hoa nức mũi, chè sen long nhãn ngọt mát, hương thơm thảo quả bún thang nồng nàn.",
    accessibility: {
      rating: "Cần có người hỗ trợ vì đông đúc",
      blind: "Khứu giác và thính giác cực kỳ phong phú",
      lowVision: "Nhiều quầy hàng sáng đèn rực rỡ",
      staff: "Khuyến nghị đi cùng Hướng dẫn viên Sighted Guide hoặc Tình nguyện viên",
      accessibilityNote: "Có hướng dẫn viên mô tả chi tiết nguồn gốc từng món ăn",
      stepFree: "Lòng đường phố đi bộ tương đối bằng phẳng"
    },
    serviceId: "hdv-dong-hanh",
    organizer: "Công ty Cổ phần Đồng Xuân",
    verifiedSource: "Công ty Cổ phần Đồng Xuân"
  }
];

export function getEventsByDestination(slug) {
  return culturalEvents.filter((ev) => ev.destinationSlug === slug);
}

export function getAllEvents() {
  return culturalEvents;
}
