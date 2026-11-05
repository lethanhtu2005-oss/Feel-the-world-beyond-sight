// Dữ liệu Điểm đến Văn hóa Phố cổ Hà Nội — WayEcho
// Khảo sát & chuẩn hóa thông tin tiếp cận cho người mù và người nhìn kém
// Tất cả thông tin tiếp cận, nguồn đối chiếu, giờ mở cửa và giá vé đều được ghi rõ.

import destinationPhotos from "./destinationPhotos.js";

const baseDestinations = [
  // 1. Nhà cổ 87 Mã Mây
  {
    slug: "nha-co-87-ma-may",
    name: "Nhà cổ 87 Mã Mây",
    area: "Hoàn Kiếm",
    address: "87 Mã Mây, phường Hàng Buồm, quận Hoàn Kiếm, Hà Nội",
    coordinates: { lat: 21.0363, lng: 105.8537 },
    image: "/assets/images/nha-co-87-ma-may-ai.webp",
    imageFallback: "/assets/images/location-image-unavailable.svg",
    alt: "Ảnh AI minh họa Nhà cổ 87 Mã Mây; không phải ảnh chụp thực tế.",
    imageCredit: "Ảnh AI minh họa WayEcho",
    imageSource: null,
    summary: "Ngôi nhà gỗ truyền thống tiêu biểu đại diện cho kiến trúc nhà ống thế kỷ 19 của Phố cổ Hà Nội, với giếng trời lấy sáng, cấu trúc nhiều lớp nhà và hương gỗ mộc mạc.",
    facts: [
      "Xây dựng cuối thế kỷ 19, được bảo tồn nguyên trạng qua dự án hợp tác bảo tồn di sản Việt - Pháp.",
      "Cấu trúc nhà ống hẹp ngang, sâu vào trong, có giếng trời ở giữa tạo độ thông gió và tiếng vọng tự nhiên rất rõ.",
      "Tầng 1 là nơi buôn bán và sân sinh hoạt; tầng 2 là gian thờ và phòng ngủ."
    ],
    visit: { hours: "08:00 – 17:00 (hàng ngày)", price: "10.000đ / lượt (Miễn phí cho người khuyết tật nặng)" },
    access: {
      level: "Tiếp cận trung bình",
      status: "Đã khảo sát thực địa — Có lối dốc gỗ hỗ trợ cửa trước.",
      blind: "Có",
      lowVision: "Có",
      staff: "Có",
      audio: "Có",
      braille: "Không",
      elevator: "Không",
      stepFree: "Không",
      note: "Cửa vào có bậc gỗ cao 18cm (hiện có cầu dốc gỗ di động kê khi báo nhân viên). Cầu thang lên tầng 2 hẹp và dốc, người khiếm thị nên trải nghiệm tầng 1 với mô hình xúc giác và tiếng giếng trời."
    },
    audio: "Bạn đang ở Nhà cổ 87 Mã Mây. Bước qua ngạch cửa gỗ, bạn sẽ cảm nhận hương thơm thoang thoảng của gỗ lim và gió nhẹ hút qua giếng trời. Lối đi lát gạch Bát Tràng cổ với các đường viền gờ rõ rệt dưới đầu gậy dò đường.",
    tags: ["Di sản", "Nhà cổ", "Kiến trúc gỗ", "Xúc giác"],
    sources: [
      { label: "Ban Quản lý Hồ Hoàn Kiếm và Phố cổ Hà Nội", url: "https://hoankiem.hanoi.gov.vn" },
      { label: "Wikimedia Commons — Maison longue traditionnelle", url: "https://commons.wikimedia.org/wiki/File:Maison_longue_traditionnelle_(2).jpg" }
    ],
    linkedServices: ["tour-pho-co-1", "hdv-dong-hanh"],
    checkedAt: "02/11/2026"
  },

  // 2. Đình Kim Ngân (42 Hàng Bạc)
  {
    slug: "dinh-kim-ngan",
    name: "Đình Kim Ngân",
    area: "Hoàn Kiếm",
    address: "42 Hàng Bạc, phường Hàng Bạc, quận Hoàn Kiếm, Hà Nội",
    coordinates: { lat: 21.0348, lng: 105.8528 },
    image: "/assets/images/old-quarter-street.jpg",
    imageFallback: "/assets/images/location-image-unavailable.svg",
    alt: "Mặt tiền và cổng tam quan Đình Kim Ngân trên phố Hàng Bạc.",
    imageCredit: "Tư liệu Ban Quản lý Phố Cổ Hà Nội",
    imageSource: null,
    summary: "Đình tổ nghề kim hoàn Thăng Long, thờ ông tổ nghề đúc bạc Hiên Viên. Không gian kiến trúc gỗ cổ kính với những mảng chạm khắc rồng phượng tinh xảo cho trải nghiệm chạm xúc giác di sản.",
    facts: [
      "Được xây dựng từ thời Hậu Lê (thế kỷ 15-16), là ngôi đình cổ quy mô lớn nhất trong 36 phố phường.",
      "Nơi sinh hoạt văn hóa tín ngưỡng và trưng bày sản phẩm bạc đậu thủ công của nghệ nhân Hàng Bạc.",
      "Sân đình lát gạch đỏ phẳng, lòng đình rộng và âm thanh phản hồi trang nghiêm."
    ],
    visit: { hours: "08:00 – 17:30 (Mở cửa miễn phí)", price: "Miễn phí" },
    access: {
      level: "Dễ tiếp cận",
      status: "Đã khảo sát thực địa — Lòng đình rộng, mặt sàn phẳng.",
      blind: "Có",
      lowVision: "Có",
      staff: "Có",
      audio: "Có",
      braille: "Không",
      elevator: "Không",
      stepFree: "Có",
      note: "Sân đình bằng phẳng, có dốc thoai thoải vào gian tiền tế. Nhân viên quản lý đình luôn sẵn lòng giới thiệu và cho phép sờ chạm vào các cột gỗ và chi tiết đục chạm theo quy chuẩn."
    },
    audio: "Đình Kim Ngân tọa lạc tại số 42 Hàng Bạc. Từ phố bước qua ngạch cửa, tiếng ồn xe máy lùi xa, thay vào đó là không gian tĩnh mịch. Hai bên là hàng cột gỗ lim tròn nhẵn bóng, phía trước là gian đại bái tỏa mùi trầm hương thanh tịnh.",
    tags: ["Đình làng", "Nghề kim hoàn", "Di tích quốc gia", "Xúc giác"],
    sources: [
      { label: "Cổng thông tin Quận Hoàn Kiếm — Di tích Đình Kim Ngân", url: "https://hoankiem.hanoi.gov.vn" }
    ],
    linkedServices: ["tour-pho-co-1", "hdv-dong-hanh"],
    checkedAt: "02/11/2026"
  },

  // 3. Đền Bạch Mã (76 Hàng Buồm)
  {
    slug: "den-bach-ma",
    name: "Đền Bạch Mã",
    area: "Hoàn Kiếm",
    address: "76 Hàng Buồm, phường Hàng Buồm, quận Hoàn Kiếm, Hà Nội",
    coordinates: { lat: 21.0366, lng: 105.8524 },
    image: "/assets/images/old-quarter-street.jpg",
    imageFallback: "/assets/images/location-image-unavailable.svg",
    alt: "Chính điện Đền Bạch Mã với tượng ngựa trắng và cửa võng thếp vàng.",
    imageCredit: "Tư liệu Ban Quản lý Phố Cổ Hà Nội",
    imageSource: null,
    summary: "Trấn Đông trong Thăng Long Tứ Trấn, ngôi đền linh thiêng bậc nhất thờ Thần Long Đỗ và Ngựa Trắng đã chỉ lối cho Vua Lý Thái Tổ đắp thành Thăng Long.",
    facts: [
      "Khởi dựng từ thế kỷ 9, gắn liền với huyền tích dời đô năm 1010 của vua Lý Công Uẩn.",
      "Kiến trúc vòm mai cua độc đáo và hệ thống rui mè đục chạm hình lân phượng tuyệt mỹ.",
      "Được xếp hạng Di tích quốc gia đặc biệt năm 2022."
    ],
    visit: { hours: "08:00 – 17:00 (hàng ngày)", price: "Miễn phí" },
    access: {
      level: "Dễ tiếp cận",
      status: "Đã khảo sát — Bậc thềm thấp, nhân viên hỗ trợ nhiệt tình.",
      blind: "Có",
      lowVision: "Có",
      staff: "Có",
      audio: "Có",
      braille: "Không",
      elevator: "Không",
      stepFree: "Có",
      note: "Cửa vào có bậc thềm đá hoa cương thấp 12cm. Lòng đền bằng phẳng lát gạch vuông, có hệ thống chiếu sáng âm thanh sống động."
    },
    audio: "Bạn đang đứng trước Đền Bạch Mã, ngôi đền trấn giữ phía Đông kinh thành Thăng Long. Không gian đền vang tiếng chuông đồng sâu lắng. Điểm đặc biệt là mái vòm bằng gỗ hình mai cua độc đáo giúp âm thanh trong đền ấm và vang tự nhiên.",
    tags: ["Thăng Long Tứ Trấn", "Tâm linh", "Di tích quốc gia đặc biệt"],
    sources: [
      { label: "Hồ sơ Di tích Quốc gia Đặc biệt Thăng Long Tứ Trấn — Bộ VHTTDL", url: "http://dsvh.gov.vn" }
    ],
    linkedServices: ["tour-pho-co-1"],
    checkedAt: "02/11/2026"
  },

  // 4. Trung tâm Giao lưu Văn hóa Phố cổ Hà Nội (50 Đào Duy Từ)
  {
    slug: "tt-50-dao-duy-tu",
    name: "Trung tâm Giao lưu Văn hóa Phố cổ (50 Đào Duy Từ)",
    area: "Hoàn Kiếm",
    address: "50 Đào Duy Từ, phường Hàng Buồm, quận Hoàn Kiếm, Hà Nội",
    coordinates: { lat: 21.0361, lng: 105.8529 },
    image: "/assets/images/old-quarter-street.jpg",
    imageFallback: "/assets/images/location-image-unavailable.svg",
    alt: "Không gian kiến trúc đương đại kết hợp tường gạch gốm tại 50 Đào Duy Từ.",
    imageCredit: "Ban Quản lý Hồ Hoàn Kiếm và Phố Cổ",
    imageSource: null,
    summary: "Trung tâm văn hóa đương đại đa năng kết hợp triển lãm di sản, biểu diễn âm nhạc dân gian Ca trù, Xẩm và hội thảo nghệ thuật.",
    facts: [
      "Công trình kiến trúc hiện đại 3 tầng xây dựng trên nền rạp tuồng Lạc Việt xưa.",
      "Tầng 1 là không gian triển lãm tương tác; tầng 2 và 3 là thính phòng biểu diễn âm thanh chuẩn mộc.",
      "Có thang máy tiếp cận và nhà vệ sinh chuẩn cho người khuyết tật."
    ],
    visit: { hours: "08:30 – 17:30 (Buổi tối có đêm nhạc theo lịch)", price: "Tham quan miễn phí (Vé đêm nhạc riêng)" },
    access: {
      level: "Rất dễ tiếp cận",
      status: "Công trình chuẩn tiếp cận hiện đại — Có thang máy & lối dốc.",
      blind: "Có",
      lowVision: "Có",
      staff: "Có",
      audio: "Có",
      braille: "Có",
      elevator: "Có",
      stepFree: "Có",
      note: "Lối vào có ram dốc tiêu chuẩn cho xe lăn và người dùng gậy. Thang máy có âm thanh báo tầng tiếng Việt. Có nhà vệ sinh tiếp cận tại tầng 1."
    },
    audio: "Trung tâm Giao lưu Văn hóa Phố cổ số 50 Đào Duy Từ là điểm dừng chân hiện đại và thân thiện nhất với người khiếm thị. Mặt sàn hoàn toàn bằng phẳng, có dải phân cách thị giác tương phản cao và thính phòng âm thanh sống động.",
    tags: ["Không gian nghệ thuật", "Ca trù", "Hát Xẩm", "Tiếp cận chuẩn"],
    sources: [
      { label: "Ban Quản lý Phố cổ Hà Nội", url: "https://hoankiem.hanoi.gov.vn" }
    ],
    linkedServices: ["ve-ca-tru-50-dao-duy-tu"],
    checkedAt: "02/11/2026"
  },

  // 5. Trung tâm Nghệ thuật 22 Hàng Buồm (Hội quán Quảng Đông)
  {
    slug: "tt-22-hang-buom",
    name: "Trung tâm Nghệ thuật 22 Hàng Buồm",
    area: "Hoàn Kiếm",
    address: "22 Hàng Buồm, phường Hàng Buồm, quận Hoàn Kiếm, Hà Nội",
    coordinates: { lat: 21.0368, lng: 105.8542 },
    image: "/assets/images/old-quarter-street.jpg",
    imageFallback: "/assets/images/location-image-unavailable.svg",
    alt: "Sân trong và kiến trúc gốm men xanh Hội quán Quảng Đông 22 Hàng Buồm.",
    imageCredit: "Tư liệu nghệ thuật Hà Nội",
    imageSource: null,
    summary: "Hội quán Quảng Đông cổ kính được trùng tu thành không gian triển lãm nghệ thuật sáng tạo hàng đầu Hà Nội, nổi bật với phù điêu gốm thế kỷ 19 và các tác phẩm sắp đặt ánh sáng - âm thanh.",
    facts: [
      "Xây dựng cuối thế kỷ 19 bởi cộng đồng Hoa kiều Quảng Đông đến định cư tại phố buôn bán Hàng Buồm.",
      "Các tác phẩm gốm Thạch Loan (Trung Quốc) đắp nổi trên bờ mái và tường bao quanh sân trong.",
      "Thường xuyên diễn ra các sắp đặt nghệ thuật âm thanh đa kênh (Spatial sound)."
    ],
    visit: { hours: "08:00 – 17:00 (hàng ngày)", price: "Miễn phí tham quan" },
    access: {
      level: "Dễ tiếp cận",
      status: "Đã khảo sát — Mặt sân rộng, gạch gốm chống trơn trượt.",
      blind: "Có",
      lowVision: "Có",
      staff: "Có",
      audio: "Có",
      braille: "Không",
      elevator: "Không",
      stepFree: "Có",
      note: "Sân trung tâm rộng rãi, thông thoáng. Các bậc thềm giữa các gian có gờ dốc tạm thời. Nhân viên túc trực hỗ trợ hướng dẫn du khách tham quan các tác phẩm sắp đặt."
    },
    audio: "Chào mừng bạn đến với 22 Hàng Buồm. Nơi đây là sự giao thoa kỳ diệu giữa kiến trúc cổ hoa mỹ và nghệ thuật sắp đặt âm thanh đương đại. Những khoảng sân trời đón ánh sáng và tiếng nước róc rách mang lại cảm giác bình yên ngay giữa lòng phố cổ.",
    tags: ["Không gian nghệ thuật", "Kiến trúc Hoa kiều", "Sắp đặt âm thanh"],
    sources: [
      { label: "Báo Nhân Dân — Không gian nghệ thuật 22 Hàng Buồm", url: "https://nhandan.vn" }
    ],
    linkedServices: ["tour-pho-co-1"],
    checkedAt: "02/11/2026"
  },

  // 6. Đình Đồng Lạc (38 Hàng Đào)
  {
    slug: "dinh-dong-lac",
    name: "Đình Đồng Lạc",
    area: "Hoàn Kiếm",
    address: "38 Hàng Đào, phường Hàng Đào, quận Hoàn Kiếm, Hà Nội",
    coordinates: { lat: 21.0336, lng: 105.8512 },
    image: "/assets/images/old-quarter-street.jpg",
    imageFallback: "/assets/images/location-image-unavailable.svg",
    alt: "Đình Đồng Lạc nằm sâu trong tuyến phố thương mại Hàng Đào sầm uất.",
    imageCredit: "Ban Quản lý Phố cổ Hà Nội",
    imageSource: null,
    summary: "Ngôi đình cổ thờ ông tổ nghề buôn yếm lụa thời Lê, nằm giữa tuyến phố tơ lụa Hàng Đào trứ danh. Không gian lưu giữ nhiều tấm bia đá cổ và nghề dệt truyền thống.",
    facts: [
      "Khởi dựng từ thời Hậu Lê (thế kỷ 17), là nơi thờ thần Cao Sơn, Linh Lang và Bạch Mã.",
      "Đình lưu giữ tấm bia đá khắc năm Vĩnh Tộ thứ 4 (1622) ghi rõ lịch sử chợ bán yếm lụa Hàng Đào.",
      "Tầng 1 trưng bày sản phẩm lụa Vạn Phúc và tơ tằm truyền thống cho trải nghiệm sờ chạm chất liệu."
    ],
    visit: { hours: "08:00 – 17:00", price: "Miễn phí" },
    access: {
      level: "Tiếp cận trung bình",
      status: "Đã khảo sát — Có mẫu lụa thật để cảm nhận xúc giác.",
      blind: "Có",
      lowVision: "Có",
      staff: "Có",
      audio: "Có",
      braille: "Không",
      elevator: "Không",
      stepFree: "Không",
      note: "Cửa vào có bậc đá cao 15cm. Trong đình có bàn mẫu chất liệu vải lụa tơ tằm, gấm, đũi để người khiếm thị chạm tay trực tiếp phân biệt độ thô mịn của từng loại sợi."
    },
    audio: "Bạn đang ở Đình Đồng Lạc, số 38 Hàng Đào. Tại đây, bạn có thể đưa tay chạm vào những súc lụa tơ tằm mát rượi, cảm nhận sự mềm mại và tiếng sột soạt tự nhiên của sợi tơ tự nhiên dệt thủ công xưa.",
    tags: ["Lụa Hà Đông", "Nghề truyền thống", "Xúc giác vải vóc"],
    sources: [
      { label: "Cổng thông tin Quận Hoàn Kiếm", url: "https://hoankiem.hanoi.gov.vn" }
    ],
    checkedAt: "02/11/2026"
  },

  // 7. Đình Thanh Hà (10 Ngõ Gạch)
  {
    slug: "dinh-thanh-ha",
    name: "Đình Thanh Hà",
    area: "Hoàn Kiếm",
    address: "10 Ngõ Gạch, phường Đồng Xuân, quận Hoàn Kiếm, Hà Nội",
    coordinates: { lat: 21.0374, lng: 105.8519 },
    image: "/assets/images/old-quarter-street.jpg",
    imageFallback: "/assets/images/location-image-unavailable.svg",
    alt: "Đình Thanh Hà với tượng tướng quân Trần Lựu trong ngõ phố cổ tĩnh lặng.",
    imageCredit: "Tư liệu di sản Hà Nội",
    imageSource: null,
    summary: "Ngôi đình cổ kính thờ danh tướng Trần Lựu thời nhà Trần, ẩn mình trong phố Ngõ Gạch yên bình với nghệ thuật đục chạm gỗ tinh xảo.",
    facts: [
      "Được xây dựng từ thế kỷ 18, từng là nơi sinh hoạt của dân chài và thương nhân bến sông Nhị Hà.",
      "Hệ thống tượng tròn và di vật đồ thờ bằng đồng có niên đại hàng trăm năm.",
      "Được xếp hạng Di tích Lịch sử Kiến trúc Nghệ thuật cấp Quốc gia năm 1989."
    ],
    visit: { hours: "08:00 – 16:30", price: "Miễn phí" },
    access: {
      level: "Cần hỗ trợ",
      status: "Đã khảo sát — Ngõ hẹp, cần hướng dẫn viên đi cùng.",
      blind: "Có",
      lowVision: "Có",
      staff: "Có",
      audio: "Có",
      braille: "Không",
      elevator: "Không",
      stepFree: "Không",
      note: "Phố Ngõ Gạch có lòng đường hẹp khoảng 3m và xe cộ qua lại thường xuyên. Khi đến cửa đình cần chú ý bậc tam cấp đá xanh."
    },
    audio: "Đình Thanh Hà nằm tại số 10 Ngõ Gạch. Tách biệt khỏi sự náo nhiệt của phố Đồng Xuân kế bên, bước vào đình là không gian tĩnh mịch với mùi gỗ ngọc am và tiếng chim ríu rít trên tán cây cổ thụ trong sân."
    ,
    tags: ["Đình cổ", "Lịch sử nhà Trần", "Di tích quốc gia"],
    sources: [
      { label: "Hồ sơ di tích Cục Di sản Văn hóa", url: "http://dsvh.gov.vn" }
    ],
    checkedAt: "02/11/2026"
  },

  // 8. Đền Quan Đế (28 Hàng Buồm)
  {
    slug: "den-quan-de",
    name: "Đền Quan Đế",
    area: "Hoàn Kiếm",
    address: "28 Hàng Buồm, phường Hàng Buồm, quận Hoàn Kiếm, Hà Nội",
    coordinates: { lat: 21.0369, lng: 105.8539 },
    image: "/assets/images/old-quarter-street.jpg",
    imageFallback: "/assets/images/location-image-unavailable.svg",
    alt: "Không gian Trạm di sản Đền Quan Đế 28 Hàng Buồm.",
    imageCredit: "Tư liệu WayEcho",
    imageSource: null,
    summary: "Ngôi đền thờ Quan Công được bảo tồn mẫu mực, hiện là điểm thông tin di sản và là Trạm hỗ trợ tình nguyện viên thực địa của WayEcho tại trung tâm Phố Cổ.",
    facts: [
      "Khởi dựng vào đầu thế kỷ 19 bởi cộng đồng bang Phúc Kiến và Triều Châu.",
      "Có nghệ thuật chạm trổ xà gồ rồng bay và các bức tranh tường cổ về điển tích xưa.",
      "Thông tin về hoạt động hỗ trợ tại đây chỉ là mô phỏng; không có dịch vụ cung cấp hay cho mượn thiết bị."
    ],
    visit: { hours: "08:00 – 17:30 (Trạm TNV trực 24/7 qua hotline)", price: "Miễn phí" },
    access: {
      level: "Rất dễ tiếp cận",
      status: "Thông tin tiếp cận minh họa, chưa có trạm vận hành thực tế.",
      blind: "Có",
      lowVision: "Có",
      staff: "Có",
      audio: "Có",
      braille: "Có",
      elevator: "Không",
      stepFree: "Có",
      note: "Thông tin lối vào và điều kiện tiếp cận chưa được WayEcho khảo sát xác minh. Du khách nên dùng gậy trắng hoặc thiết bị cá nhân quen thuộc và liên hệ trực tiếp với cơ sở trước khi đến."
    },
    audio: "Bạn đang ở Đền Quan Đế số 28 Hàng Buồm, đồng thời là địa điểm được giới thiệu trong dữ liệu mô phỏng của WayEcho. Chưa có khảo sát thực địa xác nhận điều kiện lối vào hoặc nhân sự hỗ trợ.",
    tags: ["Trạm hỗ trợ WayEcho", "Tâm linh", "Tiếp cận mẫu", "Xúc giác"],
    sources: [
      { label: "Ban Quản lý Phố cổ Hà Nội", url: "https://hoankiem.hanoi.gov.vn" }
    ],
    linkedServices: ["tour-pho-co-1", "hdv-dong-hanh"],
    checkedAt: "02/11/2026"
  },

  // 9. Cửa Ô Quan Chưởng
  {
    slug: "o-quan-chuong",
    name: "Cửa Ô Quan Chưởng",
    area: "Hoàn Kiếm",
    address: "Ngã tư Hàng Chiếu – Đào Duy Từ – Thanh Hà, Hoàn Kiếm, Hà Nội",
    coordinates: { lat: 21.0382, lng: 105.8532 },
    image: "/assets/images/o-quan-chuong-ai.webp",
    imageFallback: "/assets/images/location-image-unavailable.svg",
    alt: "Ảnh AI minh họa Cửa Ô Quan Chưởng; không phải ảnh chụp thực tế.",
    imageCredit: "Ảnh AI minh họa WayEcho",
    imageSource: null,
    summary: "Cửa ô duy nhất còn lại nguyên vẹn của kinh thành Thăng Long xưa, xây dựng năm 1749 dưới thời Cảnh Hưng và tái thiết năm 1817 thời Gia Long.",
    facts: [
      "Tên chính thức trên cổng là 'Đông Hà Môn' (Cửa ô Đông Hà).",
      "Gắn liền với tấm gương hy sinh oanh liệt của viên Chưởng cơ cùng binh sĩ chống thực dân Pháp năm 1873.",
      "Kiến trúc vòm cuốn xây bằng gạch vồ xám lớn - loại gạch đặc trưng thời Lê."
    ],
    visit: { hours: "Tham quan ngoài trời tự do cả ngày", price: "Miễn phí" },
    access: {
      level: "Cần hỗ trợ",
      status: "Nằm sát ngã tư giao thông đông đúc, cần cẩn thận xe cộ.",
      blind: "Có",
      lowVision: "Có",
      staff: "Không",
      audio: "Có",
      braille: "Không",
      elevator: "Không",
      stepFree: "Có",
      note: "Vòm cửa là lối đi lại công cộng của người dân. Người khiếm thị có thể chạm tay trực tiếp vào những viên gạch vồ thô ráp nhuốm màu thời gian ở chân vòm cổng."
    },
    audio: "Ô Quan Chưởng sừng sững với vòm cuốn chính rộng ở giữa và hai cửa phụ hai bên. Khi áp tay vào tường cổng, bạn sẽ chạm vào những viên gạch vồ to bản, mát lạnh, gồ ghề vết tích đạn pháo và gió sương lịch sử hơn 200 năm.",
    tags: ["Cửa ô Thăng Long", "Biểu tượng lịch sử", "Kiến trúc gạch vồ", "Chạm di sản"],
    sources: [
      { label: "Wikimedia Commons — Hanoi porte quan chuong", url: "https://commons.wikimedia.org/wiki/File:Hanoi_porte_quan_chuong.jpg" }
    ],
    checkedAt: "02/11/2026"
  },

  // 10. Chợ Đồng Xuân
  {
    slug: "cho-dong-xuan",
    name: "Chợ Đồng Xuân",
    area: "Hoàn Kiếm",
    address: "Phố Đồng Xuân, phường Đồng Xuân, quận Hoàn Kiếm, Hà Nội",
    coordinates: { lat: 21.0392, lng: 105.8507 },
    image: "/assets/images/cho-dong-xuan-ai.webp",
    imageFallback: "/assets/images/location-image-unavailable.svg",
    alt: "Ảnh AI minh họa Chợ Đồng Xuân; không phải ảnh chụp thực tế.",
    imageCredit: "Ảnh AI minh họa WayEcho",
    imageSource: null,
    summary: "Khu chợ bán buôn sầm uất và lâu đời bậc nhất miền Bắc với mặt tiền 5 vòm cuốn kiểu Pháp, trung tâm giao thương đa giác quan sống động.",
    facts: [
      "Khởi dựng năm 1889 thời Pháp thuộc sau khi giải tỏa hai chợ cổ Cầu Đông và Cửa Đông.",
      "Là nơi diễn ra trận chiến giáp lá cà kiên cường của Trung đoàn Thủ đô trong mùa đông 1946.",
      "Khu chợ đêm cuối tuần trải dài từ Chợ Đồng Xuân đến Hàng Đào."
    ],
    visit: { hours: "07:00 – 18:00 (Khu chợ đêm mở thứ 6 đến Chủ nhật đến 23:00)", price: "Miễn phí vào chợ" },
    access: {
      level: "Tiếp cận trung bình",
      status: "Đã khảo sát — Chợ đông người, lối đi phụ thuộc giờ họp chợ.",
      blind: "Có",
      lowVision: "Có",
      staff: "Có",
      audio: "Có",
      braille: "Không",
      elevator: "Có",
      stepFree: "Có",
      note: "Chợ có cửa dốc tiếp cận xe lăn và gậy ở cửa Tây (mặt phố Đồng Xuân). Bên trong có thang máy lên các tầng. Khuyến nghị đi vào buổi sáng từ 8:30 - 10:30 để tránh đông đúc."
    },
    audio: "Chợ Đồng Xuân mở ra một bản giao hưởng âm thanh sống động: tiếng reo hò giao hàng, tiếng bánh xe đẩy lách cách trên sàn bê tông, mùi thơm của vải mới, hương vị quế chi thảo quả từ các quầy thuốc đông y phía sau chợ.",
    tags: ["Chợ truyền thống", "Âm thanh thương mại", "Ẩm thực", "Đa giác quan"],
    sources: [
      { label: "Wikimedia Commons — Dong Xuan Market", url: "https://commons.wikimedia.org/wiki/File:%C4%90%E1%BB%93ng_Xu%C3%A2n_Market_1.jpg" }
    ],
    checkedAt: "02/11/2026"
  },

  // 11. Phố Hàng Bạc (Phố nghề kim hoàn)
  {
    slug: "pho-hang-bac",
    name: "Phố Hàng Bạc (Phố nghề kim hoàn)",
    area: "Hoàn Kiếm",
    address: "Tuyến phố Hàng Bạc, phường Hàng Bạc, quận Hoàn Kiếm, Hà Nội",
    coordinates: { lat: 21.0347, lng: 105.8525 },
    image: "/assets/images/old-quarter-street.jpg",
    imageFallback: "/assets/images/location-image-unavailable.svg",
    alt: "Dãy nhà cổ và cửa hàng vàng bạc kim hoàn trên phố Hàng Bạc.",
    imageCredit: "Tư liệu WayEcho",
    imageSource: null,
    summary: "Con phố kim hoàn lừng danh với âm thanh đe búa lách cách, từng là nơi đúc bạc nén cho triều đình phong kiến Thăng Long từ thời nhà Lê.",
    facts: [
      "Cư dân nguyên gốc từ làng đúc bạc Châu Khê (Hải Dương) và làng kim hoàn Định Công.",
      "Từng có Ty Đúc bạc của triều đình chuyên đúc nén bạc định lượng lưu thông toàn quốc.",
      "Trên phố có 2 di tích lớn: Đình Kim Ngân (42 Hàng Bạc) và Đình Dũng Hãn (2–4 Hàng Bạc)."
    ],
    visit: { hours: "Tự do tham quan (Các cửa hiệu mở 08:30 – 19:30)", price: "Miễn phí" },
    access: {
      level: "Tiếp cận trung bình",
      status: "Vỉa hè hẹp, mật độ xe máy vừa phải.",
      blind: "Có",
      lowVision: "Có",
      staff: "Có",
      audio: "Có",
      braille: "Không",
      elevator: "Không",
      stepFree: "Có",
      note: "Vỉa hè rộng trung bình 1.2m, có một số đoạn xe máy đỗ mép đường. Người khiếm thị nên đi sát tường nhà để nghe rõ nhịp búa gõ bạc và tránh phương tiện."
    },
    audio: "Đi dọc phố Hàng Bạc, đôi tai bạn sẽ bắt gặp âm thanh nhịp nhàng của những búa nhỏ gõ đe sắt từ các tiệm kim hoàn gia truyền. Mùi xì lửa hàn kim loại hòa cùng tiếng trao đổi mua bán tạo nên nét âm thanh đặc sắc.",
    tags: ["Phố nghề", "Kim hoàn", "Âm thanh thủ công", "Di sản sống"],
    sources: [
      { label: "Báo Hà Nội Mới — Phố Hàng Bạc nghìn năm tuổi", url: "https://hanoimoi.com.vn" }
    ],
    checkedAt: "02/11/2026"
  },

  // 12. Phố Hàng Mã
  {
    slug: "pho-hang-ma",
    name: "Phố Hàng Mã (Phố giấy truyền thống)",
    area: "Hoàn Kiếm",
    address: "Tuyến phố Hàng Mã, phường Hàng Mã, quận Hoàn Kiếm, Hà Nội",
    coordinates: { lat: 21.0378, lng: 105.8487 },
    image: "/assets/images/pho-hang-ma-ai.webp",
    imageFallback: "/assets/images/location-image-unavailable.svg",
    alt: "Ảnh AI minh họa phố Hàng Mã; không phải ảnh chụp thực tế.",
    imageCredit: "Ảnh AI minh họa WayEcho",
    imageSource: null,
    summary: "Con phố sắc màu nhất 36 phố phường, chuyên đồ thủ công giấy bồi, đèn ông sao, mặt nạ giấy và đồ trang trí biến đổi sống động theo bốn mùa lễ hội.",
    facts: [
      "Xuất phát từ nghề làm đồ vàng mã phục vụ tín ngưỡng thờ cúng tổ tiên và đồ chơi tết Trung thu xưa.",
      "Gắn liền với kỹ nghệ làm khung tre, dán giấy bồi truyền thống của thợ làng Tân Khai.",
      "Âm thanh tiếng chuông gió kim loại và đồ chơi trẻ em vang lên rộn rã suốt ngày đêm."
    ],
    visit: { hours: "08:00 – 22:00 (hàng ngày)", price: "Miễn phí" },
    access: {
      level: "Tiếp cận trung bình",
      status: "Dịp lễ hội đông đúc, nên có người đồng hành hỗ trợ.",
      blind: "Có",
      lowVision: "Có",
      staff: "Có",
      audio: "Có",
      braille: "Không",
      elevator: "Không",
      stepFree: "Có",
      note: "Người nhìn kém rất thích hợp tham quan phố này nhờ độ tương phản màu sắc rực rỡ từ đèn lồng đỏ, vàng. Vào mùa Trung thu và Tết, vỉa hè bị choán bởi hàng hóa nên cần người dẫn đường."
    },
    audio: "Phố Hàng Mã tràn ngập âm thanh của giấy sột soạt, tiếng chuông gió leng keng treo dưới mái hiên và tiếng cười trẻ thơ. Dưới bàn tay bạn là độ nhám của giấy bồi thủ công và các khung nan tre uốn dẻo.",
    tags: ["Lễ hội", "Màu sắc tương phản", "Đồ chơi dân gian", "Xúc giác"],
    sources: [
      { label: "Wikimedia Commons — Phố Hàng Mã", url: "https://commons.wikimedia.org/wiki/File:Ph%E1%BB%91_H%C3%A0ng_M%C3%A3%2C_H%C3%A0_N%E1%BB%99i_004.JPG" }
    ],
    checkedAt: "02/11/2026"
  },

  // 13. Phố Hàng Đào (Phố tơ lụa)
  {
    slug: "pho-hang-dao",
    name: "Phố Hàng Đào (Trục tơ lụa kinh kỳ)",
    area: "Hoàn Kiếm",
    address: "Tuyến phố Hàng Đào, phường Hàng Đào, quận Hoàn Kiếm, Hà Nội",
    coordinates: { lat: 21.0331, lng: 105.8514 },
    image: "/assets/images/old-quarter-street.jpg",
    imageFallback: "/assets/images/location-image-unavailable.svg",
    alt: "Trục phố Hàng Đào nối thẳng từ Quảng trường Đông Kinh Nghĩa Thục.",
    imageCredit: "Tư liệu WayEcho",
    imageSource: null,
    summary: "Xương sống thương mại nối thẳng từ Hồ Gươm vào lòng Phố Cổ, từng là trung tâm nhuộm và kinh doanh vải vóc, lụa điều đỏ thắm nức tiếng thành Thăng Long.",
    facts: [
      "Thời phong kiến chuyên nhuộm vải màu đỏ đào (lụa đào) nên mang tên Hàng Đào.",
      "Từng là nơi đặt trụ sở trường Đông Kinh Nghĩa Thục (1907) khởi xướng phong trào duy tân.",
      "Vào tối cuối tuần chuyển thành phố đi bộ chợ đêm sầm uất."
    ],
    visit: { hours: "Tự do tham quan cả ngày (Chợ đêm 18:00 – 23:00 cuối tuần)", price: "Miễn phí" },
    access: {
      level: "Dễ tiếp cận",
      status: "Vỉa hè lát đá hoa cương rộng rãi, có dải phân cách an toàn.",
      blind: "Có",
      lowVision: "Có",
      staff: "Có",
      audio: "Có",
      braille: "Không",
      elevator: "Không",
      stepFree: "Có",
      note: "Vỉa hè phố Hàng Đào thuộc diện rộng nhất phố cổ (từ 2.5m - 3.5m), lát đá nhám chống trượt, rất thuận tiện cho người dùng gậy dò đường định hướng thẳng."
    },
    audio: "Hàng Đào là trục đường thẳng tắp nối từ bờ hồ vào phố cổ. Vỉa hè rộng và bằng phẳng giúp đầu gậy dò đường quét tự tin. Tiếng nhạc phố đi bộ và lời mời chào thân tình tạo cảm giác náo nhiệt ấm cúng.",
    tags: ["Phố đi bộ", "Tơ lụa", "Đông Kinh Nghĩa Thục", "Vỉa hè chuẩn"],
    sources: [
      { label: "Cổng thông tin Du lịch Hà Nội", url: "https://tourism.hanoi.gov.vn" }
    ],
    checkedAt: "02/11/2026"
  },

  // 14. Phố Hàng Ngang (Phố thương gia xưa)
  {
    slug: "pho-hang-ngang",
    name: "Phố Hàng Ngang (Di tích 48 Hàng Ngang)",
    area: "Hoàn Kiếm",
    address: "Tuyến phố Hàng Ngang, phường Hàng Đào, quận Hoàn Kiếm, Hà Nội",
    coordinates: { lat: 21.0345, lng: 105.8511 },
    image: "/assets/images/old-quarter-street.jpg",
    imageFallback: "/assets/images/location-image-unavailable.svg",
    alt: "Tuyến phố Hàng Ngang với các ngôi nhà ống của thương gia thế kỷ 19-20.",
    imageCredit: "Tư liệu WayEcho",
    imageSource: null,
    summary: "Con phố của các thương nhân giàu có xưa, nơi hội tụ kiến trúc nhà ống nhiều giếng trời và đặc biệt có Di tích số 48 Hàng Ngang - nơi Chủ tịch Hồ Chí Minh khởi thảo Tuyên ngôn Độc lập.",
    facts: [
      "Xưa kia có cổng chắn ngang phố vào ban đêm để bảo đảm an ninh buôn bán, nên gọi là Hàng Ngang.",
      "Ngôi nhà 48 Hàng Ngang nguyên là hiệu lụa Phúc Lợi nổi tiếng của nhà tư sản yêu nước Trịnh Văn Bô.",
      "Tuyến phố có các mái hiên vươn dài che chắn mưa nắng rất tốt cho người đi bộ."
    ],
    visit: { hours: "Tham quan phố tự do; Di tích 48 Hàng Ngang mở 08:00 – 17:00", price: "Miễn phí" },
    access: {
      level: "Dễ tiếp cận",
      status: "Đã khảo sát — Di tích 48 Hàng Ngang có nhân viên hướng dẫn.",
      blind: "Có",
      lowVision: "Có",
      staff: "Có",
      audio: "Có",
      braille: "Không",
      elevator: "Không",
      stepFree: "Có",
      note: "Vỉa hè thẳng đều, có mái hiên chạy liên tục giúp tránh nắng mưa. Di tích 48 Hàng Ngang tầng 1 sàn gạch hoa phẳng, có cầu thang gỗ rộng dẫn lên tầng 2."
    },
    audio: "Phố Hàng Ngang mang dấu ấn lịch sử hào hùng. Bước vào số 48 Hàng Ngang, tiếng ồn bên ngoài khép lại, bạn nghe tiếng tích tắc của đồng hồ quả lắc cổ và cảm nhận bầu không khí trang nghiêm nơi Bác Hồ viết Tuyên ngôn Độc lập năm 1945.",
    tags: ["Di tích lịch sử", "Nhà số 48 Hàng Ngang", "Kiến trúc thương gia"],
    sources: [
      { label: "Bảo tàng Lịch sử Quốc gia", url: "https://baotanglichsu.vn" }
    ],
    checkedAt: "02/11/2026"
  },

  // 15. Phố Hàng Thiếc (Phố nghề gò kim loại)
  {
    slug: "pho-hang-thiec",
    name: "Phố Hàng Thiếc (Bản hòa tấu đe búa)",
    area: "Hoàn Kiếm",
    address: "Tuyến phố Hàng Thiếc, phường Hàng Gai, quận Hoàn Kiếm, Hà Nội",
    coordinates: { lat: 21.0339, lng: 105.8494 },
    image: "/assets/images/old-quarter-street.jpg",
    imageFallback: "/assets/images/location-image-unavailable.svg",
    alt: "Người thợ gò thiếc, tôn, inox tại xưởng nhỏ trên phố Hàng Thiếc.",
    imageCredit: "Tư liệu WayEcho",
    imageSource: null,
    summary: "Con phố nghề đặc sắc nhất về thính giác tại Hà Nội. Nơi các nghệ nhân gò thiếc, đồng, tôn tạo nên bản đại hòa tấu kim loại sống động vang vọng suốt trăm năm.",
    facts: [
      "Xuất phát từ làng đúc đồng, gò thiếc Đan Chàng (Hải Dương) lên kinh kỳ lập nghiệp.",
      "Sản xuất từ chân đèn, hộp bánh, khuôn bánh trung thu đến đồ inox gia dụng công nghiệp.",
      "Âm thanh gò tôn vang đanh và biến thiên tần số rõ rệt theo kích thước tấm kim loại."
    ],
    visit: { hours: "08:00 – 18:00 (hàng ngày)", price: "Miễn phí tham quan" },
    access: {
      level: "Cần hỗ trợ",
      status: "Âm thanh khá lớn, vỉa hè hẹp có phôi kim loại.",
      blind: "Có",
      lowVision: "Có",
      staff: "Có",
      audio: "Có",
      braille: "Không",
      elevator: "Không",
      stepFree: "Không",
      note: "Âm thanh gò búa liên tục có thể gây khó nghe giọng nói. Vỉa hè có thể có mảnh kim loại hoặc phôi tôn để trước cửa; người khiếm thị cần dùng gậy dò cẩn thận và nên đi cùng người hỗ trợ."
    },
    audio: "Hàng Thiếc là con phố không thể lẫn vào đâu được: tiếng búa gõ 'keng... keng... cốc... cốc' vang lên từ mọi phía tạo thành một không gian thính giác độc nhất vô nhị. Mùi kim loại nóng và vụn hàn bay thoang thoảng trong gió."
    ,
    tags: ["Phố nghề", "Thính giác", "Âm thanh gò thiếc", "Nghề thủ công"],
    sources: [
      { label: "Báo Tuổi Trẻ — Tiếng búa phố Hàng Thiếc", url: "https://tuoitre.vn" }
    ],
    checkedAt: "02/11/2026"
  },

  // 16. Phố Hàng Quạt (Phố chạm khắc gỗ & đồ thờ)
  {
    slug: "pho-hang-quat",
    name: "Phố Hàng Quạt (Chạm khắc gỗ & đồ thờ)",
    area: "Hoàn Kiếm",
    address: "Tuyến phố Hàng Quạt, phường Hàng Gai, quận Hoàn Kiếm, Hà Nội",
    coordinates: { lat: 21.0328, lng: 105.8502 },
    image: "/assets/images/old-quarter-street.jpg",
    imageFallback: "/assets/images/location-image-unavailable.svg",
    alt: "Cửa hàng đồ chạm khắc gỗ, quạt giấy và hoành phi câu đối trên phố Hàng Quạt.",
    imageCredit: "Tư liệu WayEcho",
    imageSource: null,
    summary: "Con phố tĩnh lặng đậm mùi gỗ mít và mùn cưa, chuyên đục chạm ngai vàng, hoành phi câu đối, cờ trướng và các loại quạt giấy truyền thống.",
    facts: [
      "Xưa là nơi làm quạt lông, quạt giấy, quạt nan tre của thợ làng Canh Hoạch và Đào Xá.",
      "Hiện nay chuyển sang chuyên nghề chạm khắc đồ thờ tự bằng gỗ mít và thêu cờ trướng truyền thống.",
      "Người khiếm thị có thể sờ chạm vào các chi tiết đục nổi hoa sen, mây cuốn, rồng phượng trên gỗ mộc."
    ],
    visit: { hours: "08:30 – 18:30", price: "Miễn phí" },
    access: {
      level: "Tiếp cận trung bình",
      status: "Đã khảo sát — Hương thơm gỗ mít tự nhiên rất rõ.",
      blind: "Có",
      lowVision: "Có",
      staff: "Có",
      audio: "Có",
      braille: "Không",
      elevator: "Không",
      stepFree: "Có",
      note: "Vỉa hè vừa phải, có thể bước vào trong các xưởng chạm khắc để xin phép chủ hiệu chạm tay vào các bản khắc gỗ mít thô chưa sơn để cảm nhận độ nổi của nét đục."
    },
    audio: "Bước chân vào Hàng Quạt, khứu giác bạn nhận ra ngay mùi gỗ mít nồng ấm đặc trưng cùng mùi sơn ta thơm nhẹ. Âm thanh đục gỗ lách cách êm đềm hơn nhiều so với phố kim loại, tạo cảm giác thư thái cổ kính.",
    tags: ["Chạm khắc gỗ", "Khứu giác gỗ mít", "Nghề thủ công", "Xúc giác"],
    sources: [
      { label: "Báo Hà Nội Mới — Hàng Quạt phố đồ thờ", url: "https://hanoimoi.com.vn" }
    ],
    checkedAt: "02/11/2026"
  },

  // 17. Phố Lãn Ông (Phố Đông y cổ truyền)
  {
    slug: "pho-lan-ong",
    name: "Phố Lãn Ông (Hương thơm thảo mộc)",
    area: "Hoàn Kiếm",
    address: "Tuyến phố Lãn Ông, phường Hàng Bồ, quận Hoàn Kiếm, Hà Nội",
    coordinates: { lat: 21.0352, lng: 105.8504 },
    image: "/assets/images/old-quarter-street.jpg",
    imageFallback: "/assets/images/location-image-unavailable.svg",
    alt: "Các hiệu thuốc Đông y với ngăn tủ gỗ bốc thuốc và các bao thảo mộc trên phố Lãn Ông.",
    imageCredit: "Tư liệu WayEcho",
    imageSource: null,
    summary: "Con phố trải nghiệm khứu giác tuyệt vời nhất thủ đô. Hơn 50 hiệu thuốc Đông y gia truyền tỏa ngát hương quế, hồi, cam thảo, thục địa và tiếng dao cầu thái thuốc nhịp nhàng.",
    facts: [
      "Đặt tên theo Đại danh y Hải Thượng Lãn Ông Lê Hữu Trác - ông tổ ngành y dược cổ truyền Việt Nam.",
      "Các cửa tiệm vẫn giữ nguyên hệ thống hàng trăm ngăn tủ gỗ kéo để phân loại thảo dược.",
      "Nghề bốc thuốc cân bằng âm dương và châm cứu chữa bệnh lưu truyền qua nhiều thế hệ."
    ],
    visit: { hours: "08:00 – 19:00 (hàng ngày)", price: "Miễn phí tham quan" },
    access: {
      level: "Dễ tiếp cận",
      status: "Trải nghiệm khứu giác xuất sắc — Vỉa hè thoáng.",
      blind: "Có",
      lowVision: "Có",
      staff: "Có",
      audio: "Có",
      braille: "Không",
      elevator: "Không",
      stepFree: "Có",
      note: "Vỉa hè khá quang đãng, các cửa hiệu thuốc mở rộng cửa chào đón khách. Du khách khiếm thị có thể ghé vào tiệm để ngửi thử hương vị thảo mộc và nghe tiếng dao cầu thái rễ cây."
    },
    audio: "Chỉ cần đến đầu phố Lãn Ông, bạn sẽ nhận ra ngay hương thơm thanh mát của quế, hồi và cam thảo xoa dịu tâm trí. Lắng tai nghe, tiếng 'kịch... kịch' của dao cầu thái thuốc bằng chân tạo nhịp điệu bình dị như ngược thời gian về Thăng Long xưa.",
    tags: ["Đông y", "Khứu giác thảo mộc", "Thư giãn giác quan", "Hải Thượng Lãn Ông"],
    sources: [
      { label: "Thông tấn xã Việt Nam — Phố thuốc Bắc Lãn Ông", url: "https://vietnamplus.vn" }
    ],
    checkedAt: "02/11/2026"
  },

  // 18. Phố Mã Mây (Phố mây tre đan cổ)
  {
    slug: "pho-ma-may",
    name: "Phố Mã Mây (Phố mây tre đan cổ)",
    area: "Hoàn Kiếm",
    address: "Tuyến phố Mã Mây, phường Hàng Buồm, quận Hoàn Kiếm, Hà Nội",
    coordinates: { lat: 21.0361, lng: 105.8536 },
    image: "/assets/images/old-quarter-street.jpg",
    imageFallback: "/assets/images/location-image-unavailable.svg",
    alt: "Phố Mã Mây cong nhẹ với các nhà hàng ẩm thực và nhà cổ rêu phong.",
    imageCredit: "Tư liệu WayEcho",
    imageSource: null,
    summary: "Con phố uốn lượn hình cánh cung duyên dáng hợp nhất từ phố Hàng Mã (đoạn bến sông) và phố Hàng Mây, hiện là cái nôi bảo tồn nhà cổ và ẩm thực đường phố đặc trưng.",
    facts: [
      "Trước kia nằm sát bến sông Nhị Hà, thuyền bè chở mây tre giang từ miền ngược về cập bến.",
      "Là nơi tọa lạc của Nhà cổ 87 Mã Mây và nhiều khách sạn di sản kiến trúc Pháp.",
      "Tuyến phố có độ cong tự nhiên giúp giảm tốc độ phương tiện giao thông, thuận tiện đi bộ dạo mát."
    ],
    visit: { hours: "Tự do tham quan cả ngày", price: "Miễn phí" },
    access: {
      level: "Dễ tiếp cận",
      status: "Đã khảo sát — Đường cong thoáng, kết nối thẳng 87 Mã Mây.",
      blind: "Có",
      lowVision: "Có",
      staff: "Có",
      audio: "Có",
      braille: "Không",
      elevator: "Không",
      stepFree: "Có",
      note: "Vỉa hè hai bên tương đối phẳng, có các quán cà phê phố cổ với ghế ngoài hiên thích hợp để nghỉ chân nghe tiếng gió hồ và chim hót trong lồng."
    },
    audio: "Phố Mã Mây uốn cong mềm mại theo dòng chảy sông cổ xưa. Âm thanh bước chân trên nền gạch xen lẫn mùi cà phê rang xay thơm nức từ những quán nhỏ bên hiên nhà gỗ lim.",
    tags: ["Phố cổ", "Đi bộ dạo mát", "Ẩm thực", "Nhà cổ"],
    sources: [
      { label: "Báo Hà Nội Mới — Chuyện phố Mã Mây", url: "https://hanoimoi.com.vn" }
    ],
    checkedAt: "02/11/2026"
  },

  // 19. Tuyến phố Tạ Hiện
  {
    slug: "pho-ta-hien",
    name: "Tuyến phố Tạ Hiện (Kiến trúc Pháp - Việt)",
    area: "Hoàn Kiếm",
    address: "Tuyến phố Tạ Hiện, phường Hàng Buồm, quận Hoàn Kiếm, Hà Nội",
    coordinates: { lat: 21.0354, lng: 105.8530 },
    image: "/assets/images/old-quarter-street.jpg",
    imageFallback: "/assets/images/location-image-unavailable.svg",
    alt: "Dãy nhà ống 2 tầng kiến trúc Pháp liền kề trên ngõ Tạ Hiện.",
    imageCredit: "Tư liệu WayEcho",
    imageSource: null,
    summary: "Ngã tư quốc tế nổi tiếng với dãy nhà hai tầng kiến trúc Pháp liền kề thế kỷ 20, ban ngày yên tĩnh mang đậm hơi thở kiến trúc cổ, ban đêm sôi động âm nhạc đa sắc tộc.",
    facts: [
      "Đoạn đầu phố (giáp Lương Ngọc Quyến) có dãy nhà liền khối đồng nhất xây đầu thế kỷ 20 theo kiến trúc thuộc địa.",
      "Được thành phố Hà Nội và vùng Ile-de-France (Pháp) hợp tác tôn tạo mẫu mực năm 2010.",
      "Lòng đường lát đá xanh cổ phẳng phiu không bậc tam cấp nhô ra ngoài."
    ],
    visit: { hours: "Nên tham quan ban ngày (08:00 – 16:00) cho trải nghiệm tiếp cận yên tĩnh", price: "Miễn phí" },
    access: {
      level: "Dễ tiếp cận ban ngày",
      status: "Đã khảo sát — Lòng đường lát đá phẳng, ban đêm đông đúc.",
      blind: "Có",
      lowVision: "Có",
      staff: "Có",
      audio: "Có",
      braille: "Không",
      elevator: "Không",
      stepFree: "Có",
      note: "Ban ngày (trước 17:00), phố rất vắng và phẳng, người khiếm thị di chuyển cực kỳ dễ dàng. Ban đêm phố biến thành không gian bia và ẩm thực đông nghịt, nên đi cùng người hỗ trợ."
    },
    audio: "Buổi sáng ở Tạ Hiện là một bức tranh đối lập: yên bình, trầm mặc với những vòm cửa sổ gỗ sơn xanh kiểu Pháp. Mặt đường lát đá bazan phẳng phiu giúp bạn sải bước tự tin mà không lo vướng rào cản gạch vỡ.",
    tags: ["Kiến trúc Pháp", "Phố đi bộ", "Đá lát phẳng", "Giao thoa văn hóa"],
    sources: [
      { label: "Tạp chí Kiến trúc — Dự án trùng tu phố Tạ Hiện", url: "https://kienviet.net" }
    ],
    checkedAt: "02/11/2026"
  },

  // 20. Không gian nghệ thuật Bích họa Phùng Hưng
  {
    slug: "bich-hoa-phung-hung",
    name: "Không gian Nghệ thuật Phùng Hưng (Vòm cầu di sản)",
    area: "Hoàn Kiếm",
    address: "Phố Phùng Hưng (Đoạn vòm cầu đá đường sắt), Hàng Mã, Hoàn Kiếm, Hà Nội",
    coordinates: { lat: 21.0372, lng: 105.8458 },
    image: "/assets/images/old-quarter-street.jpg",
    imageFallback: "/assets/images/location-image-unavailable.svg",
    alt: "Các vòm cầu đá đường sắt vẽ bích họa ký ức Hà Nội trên phố đi bộ Phùng Hưng.",
    imageCredit: "Tư liệu nghệ thuật công cộng",
    imageSource: null,
    summary: "Không gian đi bộ nghệ thuật công cộng độc đáo trên 19 vòm cầu đá đường sắt trăm tuổi, tái hiện ký ức bách hóa Tràng Tiền, tàu điện leng keng và nhịp sống Hà Nội xưa.",
    facts: [
      "Vòm cầu đá xây dựng bằng đá hộc thời Pháp thuộc thuộc tuyến đường sắt Long Biên - Hà Nội hoàn thành năm 1902.",
      "Dự án hợp tác nghệ thuật công cộng giữa Quỹ Giao lưu Quốc tế Hàn Quốc (KF), UN-Habitat và quận Hoàn Kiếm.",
      "Tuyến phố đi bộ lát đá hoàn toàn không có xe cơ giới vào cuối tuần."
    ],
    visit: { hours: "Mở cửa tự do cả ngày (Cuối tuần là phố đi bộ)", price: "Miễn phí" },
    access: {
      level: "Rất dễ tiếp cận",
      status: "Tuyến phố đi bộ không rào chắn xe cộ — Bằng phẳng 100%.",
      blind: "Có",
      lowVision: "Có",
      staff: "Có",
      audio: "Có",
      braille: "Có",
      elevator: "Không",
      stepFree: "Có",
      note: "Mặt đường lát đá phẳng lì, cấm xe máy lưu thông vào cuối tuần. Thông tin về biển chỉ dẫn và tiện ích tiếp cận tại đây chưa được khảo sát xác minh."
    },
    audio: "Không gian Bích họa Phùng Hưng cho bạn cảm giác thênh thang an toàn. Thỉnh thoảng phía trên cao, một chuyến tàu hỏa chầm chậm chạy qua vòm đá cầu tạo nên độ rung và âm thanh trầm bổng khó quên của ký ức đô thị.",
    tags: ["Nghệ thuật công cộng", "Vòm cầu đá", "Phố đi bộ an toàn", "Bảng chữ Braille"],
    sources: [
      { label: "Báo Tuổi Trẻ — Bích họa phố Phùng Hưng", url: "https://tuoitre.vn" }
    ],
    checkedAt: "02/11/2026"
  },

  // Reference points
  {
    slug: "ho-guom",
    name: "Hồ Hoàn Kiếm & Cầu Thê Húc",
    area: "Hoàn Kiếm",
    address: "Hồ Hoàn Kiếm, quận Hoàn Kiếm, Hà Nội",
    coordinates: { lat: 21.0295, lng: 105.8524 },
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c8/Huc_Bridge.jpg",
    imageFallback: "/assets/images/we-photo-ho-guom-cau-the-huc.jpg",
    alt: "Cầu Thê Húc màu đỏ nổi bật bắc qua hồ, dẫn vào đền Ngọc Sơn.",
    imageCredit: "David Stanley · Wikimedia Commons · CC BY 2.0",
    imageSource: "https://commons.wikimedia.org/wiki/File:Huc_Bridge.jpg",
    summary: "Hồ Hoàn Kiếm là trái tim của thủ đô, kết nối trực tiếp với 36 Phố Phường qua ngã ba Hàng Đào và Đinh Tiên Hoàng.",
    facts: [
      "Không gian dạo bộ ven hồ dài 1.7km với vỉa hè lát đá hoa cương rộng rãi.",
      "Cầu Thê Húc cong cong dẫn vào Đền Ngọc Sơn trên đảo Ngọc."
    ],
    visit: { hours: "Tự do tham quan cả ngày", price: "Miễn phí (Vé vào đền Ngọc Sơn: 30.000đ)" },
    access: {
      level: "Dễ tiếp cận",
      status: "Đã khảo sát — Lối ven hồ bằng phẳng, nhiều ghế nghỉ.",
      blind: "Có",
      lowVision: "Có",
      staff: "Có",
      audio: "Có",
      braille: "Không",
      elevator: "Không",
      stepFree: "Có",
      note: "Đường dạo ven hồ hoàn toàn bằng phẳng, có tay vịn ở một số đoạn mép nước."
    },
    audio: "Bạn đang ở Hồ Hoàn Kiếm. Gió hồ mát rượi xao động mặt nước, tiếng chim ríu rít và tiếng chuông đền Ngọc Sơn xa xa tạo nên khoảnh khắc bình yên giữa lòng thành phố.",
    tags: ["Biểu tượng Hà Nội", "Đi dạo", "Thiên nhiên trung tâm"],
    sources: [
      { label: "Wikimedia Commons — Huc Bridge", url: "https://commons.wikimedia.org/wiki/File:Huc_Bridge.jpg" }
    ],
    checkedAt: "02/11/2026"
  },

  {
    slug: "pho-co",
    name: "Khu Phố cổ Hà Nội",
    area: "Hoàn Kiếm",
    address: "Khu Phố cổ, quận Hoàn Kiếm, Hà Nội",
    coordinates: { lat: 21.0356, lng: 105.8509 },
    image: "/assets/images/old-quarter-street.jpg",
    imageFallback: "/assets/images/we-photo-pho-co-do-thi.jpg",
    alt: "Một tuyến phố trong khu Phố cổ Hà Nội với nhà ống và người đi lại nhộn nhịp.",
    imageCredit: "Ảnh tư liệu dự án WayEcho",
    imageSource: null,
    summary: "Khu Phố cổ là trung tâm văn hóa – thương mại lâu đời của Hà Nội, nổi bật với mạng lưới phố nghề, kiến trúc nhà ống và nhịp sống đường phố đặc trưng.",
    facts: [
      "Gồm các phường Hàng Buồm, Hàng Bạc, Hàng Đào, Hàng Gai, Đồng Xuân, Cửa Đông.",
      "Mỗi tuyến phố lưu giữ một nghề thủ công và cấu trúc di sản riêng biệt."
    ],
    visit: { hours: "Tham quan tự do cả ngày", price: "Miễn phí" },
    access: {
      level: "Dễ tiếp cận",
      status: "Thông tin tổng quan khu vực 36 phố phường.",
      blind: "Có",
      lowVision: "Có",
      staff: "Có",
      audio: "Có",
      braille: "Không",
      elevator: "Có",
      stepFree: "Có",
      note: "Một số đoạn có vỉa hè hẹp, nên ưu tiên khung giờ sáng hoặc đi cùng hướng dẫn viên/tình nguyện viên."
    },
    audio: "Khu Phố cổ Hà Nội là không gian di sản sống động với 36 phố phường, nơi lưu giữ hồn cốt Thăng Long nghìn năm qua tiếng đe búa, tiếng rao hàng và lòng hiếu khách nồng hậu.",
    tags: ["Phố cổ", "Văn hóa", "Tổng quan"],
    sources: [],
    checkedAt: "02/11/2026"
  },

  {
    slug: "mua-roi-thang-long",
    name: "Nhà hát Múa rối Thăng Long",
    area: "Hoàn Kiếm",
    address: "57B Đinh Tiên Hoàng, Hoàn Kiếm, Hà Nội",
    coordinates: { lat: 21.0316, lng: 105.8531 },
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Thang_Long_Water_Puppet_Theatre.jpg/960px-Thang_Long_Water_Puppet_Theatre.jpg",
    imageFallback: "/assets/images/we-ai-mua-roi-nuoc.jpg",
    alt: "Mặt tiền Nhà hát Múa rối Thăng Long bên bờ Hồ Hoàn Kiếm.",
    imageCredit: "shi zhao · Wikimedia Commons · CC BY-SA 2.0",
    imageSource: "https://commons.wikimedia.org/wiki/File:Thang_Long_Water_Puppet_Theatre.jpg",
    summary: "Nhà hát múa rối nước truyền thống hàng đầu Việt Nam, trải nghiệm thính giác dân gian tuyệt vời với tiếng đàn bầu, trống hội và tiếng nước quẫy nhịp nhàng.",
    facts: [
      "Nằm sát bờ Hồ Hoàn Kiếm trên phố Đinh Tiên Hoàng.",
      "Nghệ thuật múa rối nước độc đáo xuất xứ từ nền văn minh lúa nước sông Hồng."
    ],
    visit: { hours: "Theo lịch suất diễn hàng ngày", price: "Từ 100.000đ – 200.000đ" },
    access: {
      level: "Rất dễ tiếp cận",
      status: "Có lối dốc và nhân viên hỗ trợ chỗ ngồi ưu tiên.",
      blind: "Có",
      lowVision: "Có",
      staff: "Có",
      audio: "Có",
      braille: "Không",
      elevator: "Có",
      stepFree: "Có",
      note: "Có lối dốc tiếp cận xe lăn và gậy dò đường từ sảnh vào khán phòng. Nhân viên hỗ trợ sắp xếp vị trí ngồi nghe âm thanh tốt nhất."
    },
    audio: "Nhà hát Múa rối Thăng Long đem đến cho thính giác của bạn những giai điệu chèo rộn rã, tiếng sáo trúc réo rắt và tiếng quẫy nước sinh động của chú Tễu.",
    tags: ["Biểu diễn", "Múa rối nước", "Âm nhạc dân gian"],
    sources: [
      { label: "Website Nhà hát Múa rối Thăng Long", url: "https://thanglongwaterpuppet.com/" }
    ],
    checkedAt: "02/11/2026"
  },

  {
    slug: "van-mieu",
    name: "Văn Miếu – Quốc Tử Giám",
    area: "Đống Đa",
    address: "Hà Nội – cần xác minh vị trí chi tiết",
    image: "/assets/images/we-ai-van-mieu-khue-van-cac.jpg",
    imageFallback: "/assets/images/we-ai-van-mieu-khue-van-cac.jpg",
    alt: "Ảnh AI minh họa Khuê Văn Các tại Văn Miếu – Quốc Tử Giám, không phải ảnh chụp thực tế.",
    summary: "Địa điểm văn hóa lịch sử của Hà Nội. Ảnh trên trang là hình AI minh họa; WayEcho chưa xác minh thông tin tiếp cận.",
    facts: ["Thông tin dịch vụ và điều kiện tiếp cận cần khảo sát trước khi sử dụng."],
    visit: { hours: "Chưa xác minh", price: "Chưa xác minh" },
    access: {
      level: "Cần khảo sát",
      status: "Chưa có dữ liệu đã xác minh",
      blind: "Chưa xác minh",
      lowVision: "Chưa xác minh",
      staff: "Chưa xác minh",
      audio: "Chưa xác minh",
      braille: "Chưa xác minh",
      elevator: "Chưa xác minh",
      stepFree: "Chưa xác minh",
      note: "Không dùng trang này để quyết định điều kiện di chuyển an toàn."
    },
    audio: "WayEcho hiện chưa có mô tả đã kiểm chứng cho địa điểm này.",
    tags: ["Văn hóa", "Chưa xác minh"],
    sources: []
  },

  {
    slug: "hoang-thanh-thang-long",
    name: "Hoàng thành Thăng Long",
    area: "Ba Đình",
    address: "Hà Nội – cần xác minh vị trí chi tiết",
    image: "/assets/images/hoang-thanh-thang-long-ai.webp",
    imageFallback: "/assets/images/hoang-thanh-thang-long-ai.webp",
    alt: "Ảnh AI minh họa Hoàng thành Thăng Long, không phải ảnh chụp thực tế.",
    summary: "Địa điểm văn hóa lịch sử của Hà Nội. Ảnh trên trang là hình AI minh họa; WayEcho chưa xác minh thông tin tiếp cận.",
    facts: ["Thông tin dịch vụ và điều kiện tiếp cận cần khảo sát trước khi sử dụng."],
    visit: { hours: "Chưa xác minh", price: "Chưa xác minh" },
    access: {
      level: "Cần khảo sát",
      status: "Chưa có dữ liệu đã xác minh",
      blind: "Chưa xác minh",
      lowVision: "Chưa xác minh",
      staff: "Chưa xác minh",
      audio: "Chưa xác minh",
      braille: "Chưa xác minh",
      elevator: "Chưa xác minh",
      stepFree: "Chưa xác minh",
      note: "Không dùng trang này để quyết định điều kiện di chuyển an toàn."
    },
    audio: "WayEcho hiện chưa có mô tả đã kiểm chứng cho địa điểm này.",
    tags: ["Văn hóa", "Chưa xác minh"],
    sources: []
  }
];

// Ảnh thật tải về từ Wikimedia Commons (data/destinationPhotos.js do scripts/fetch-commons-photos.mjs sinh ra).
// Chỉ ghi đè khi có ảnh đã kiểm tra giấy phép; ảnh lỗi thì rơi về placeholder trung tính, không dùng ảnh địa điểm khác.
export const destinations = baseDestinations.map((d) => {
  const p = destinationPhotos[d.slug];
  if (!p) {
    // Chưa có ảnh thật đã kiểm tra: không dùng ảnh chung hay ảnh AI gắn tên địa điểm cụ thể.
    const generic = /old-quarter-street|-ai\.webp|we-ai-/.test(d.image || "");
    if (!generic) return d;
    return {
      ...d,
      image: "/assets/images/location-image-unavailable.svg",
      imageSrcSet: undefined,
      imageFallback: "/assets/images/location-image-unavailable.svg",
      alt: `Chưa có ảnh chụp thực tế đã xác minh cho ${d.name}.`,
      imageCredit: "Chưa có ảnh đã xác minh nguồn và giấy phép",
      imageSource: null,
    };
  }
  return {
    ...d,
    image: p.image,
    imageSrcSet: p.imageSrcSet,
    imageFallback: "/assets/images/location-image-unavailable.svg",
    alt: p.alt,
    imageCredit: p.imageCredit,
    imageSource: p.imageSource,
  };
});

export function getDestination(slug) {
  return destinations.find((d) => d.slug === slug) || null;
}
