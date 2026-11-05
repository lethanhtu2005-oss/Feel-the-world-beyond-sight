// Các mục của Blog & Trải nghiệm. Một bài có thể thuộc nhiều mục; mỗi bài phải thuộc ít nhất một mục.
export const BLOG_SECTIONS = [
  { id: "cam-nang", label: "Cẩm nang du lịch", desc: "Kiến thức nền và hướng dẫn để chuẩn bị chuyến đi Phố cổ.",
    slugs: ["chuan-bi-hanh-trinh", "dung-wayecho-va-quyen-chia-se", "len-ke-hoach-kham-pha-pho-co-ha-noi-di-the-nao-de-hieu-sau-ma-khong-voi", "gioi-thieu-wayecho-du-lich-tiep-can", "hear-your-way", "khu-pho-co-ha-noi-co-tu-bao-gio-lich-su-hinh-thanh-va-ranh-gioi-can-biet", "vi-sao-pho-co-ha-noi-co-nhung-con-pho-dan-xen-nhu-ban-co", "ten-pho-bat-dau-bang-chu-hang-doc-lich-su-nghe-nghiep-qua-dia-danh"] },
  { id: "du-lich-tiep-can", label: "Du lịch tiếp cận", desc: "Dữ liệu tiếp cận, công nghệ hỗ trợ và dịch vụ đồng hành cho người mù, nhìn kém.",
    slugs: ["doc-du-lieu-tiep-can", "chuan-bi-hanh-trinh", "tro-ly-giong-noi-camera-ai", "mang-luoi-huong-dan-vien", "xich-lo-xe-dien-pho-co", "tram-ho-tro-hang-buom", "tu-di-bo-xe-dien-den-phuong-tien-hien-dai-giao-thong-da-doi-thay-o-pho-co-ra-sao"] },
  { id: "goi-y-hanh-trinh", label: "Gợi ý hành trình", desc: "Tuyến đi, điểm dừng và nhịp tham quan gợi ý, đi kèm lưu ý tiếp cận.",
    slugs: ["ho-guom-den-ngoc-son-tiep-can", "tuyen-am-thanh-pho-co", "am-thuc-pho-co-qr-sound", "nha-co-87-ma-may-am-thanh", "len-ke-hoach-kham-pha-pho-co-ha-noi-di-the-nao-de-hieu-sau-ma-khong-voi", "mot-ngay-o-pho-co-xua-nhip-sinh-hoat-cua-nguoi-buon-ban-va-cu-dan", "mua-le-hoi-va-lich-buon-ban-khi-nhu-cau-theo-mua-dinh-hinh-nhip-pho-co", "nha-co-87-ma-may", "cho-dong-xuan", "o-quan-chuong", "pho-hang-ma"] },
  { id: "cau-chuyen", label: "Câu chuyện trải nghiệm", desc: "Di sản, con người và đời sống Phố cổ qua từng câu chuyện.",
    slugs: ["nha-co-87-ma-may", "cho-dong-xuan", "o-quan-chuong", "pho-hang-ma", "dau-tich-song-nuoc-giua-long-pho-co-nhung-dong-chay-da-doi-thay", "tu-lang-nghe-den-cua-hieu-mang-luoi-kinh-te-dung-sau-pho-co", "pho-co-ha-noi-qua-cac-thoi-ky-tu-phuong-nghe-den-trung-tam-thuong-mai-hien-dai", "ngoai-cho-lon-nhung-khong-gian-mua-ban-nho-da-nuoi-song-pho-co", "cua-o-va-ranh-gioi-thang-long-xua-nhung-loi-ra-vao-cua-do-thi", "dinh-den-va-hoi-quan-khong-gian-tin-nguong-trong-khu-pho-buon-ban", "pho-co-noi-gap-go-cua-nhieu-cong-dong-cu-dan-va-dong-van-hoa", "mot-ngay-o-pho-co-xua-nhip-sinh-hoat-cua-nguoi-buon-ban-va-cu-dan", "nguoi-dan-pho-co-hom-nay-giu-nghe-doi-nghe-va-thich-nghi-voi-du-lich", "pho-co-trong-thoi-phap-thuoc-nhung-thay-doi-ve-duong-pho-va-ha-tang", "vi-sao-pho-co-co-nhieu-ngo-nho-va-khong-gian-sinh-hoat-chung", "pho-co-ha-noi-trong-hoi-hoa-tu-ky-uc-do-thi-den-nhung-net-ve"] },
  { id: "meo-du-lich", label: "Mẹo du lịch", desc: "Mẹo ngắn để đi an toàn, tôn trọng người dân và kiểm soát thông tin của bạn.",
    slugs: ["chuan-bi-hanh-trinh", "dung-wayecho-va-quyen-chia-se", "doc-du-lieu-tiep-can", "du-lich-co-trach-nhiem-o-pho-co-ha-noi-nhung-dieu-nho-tao-nen-khac-biet", "bao-ton-pho-co-giu-gin-di-san-nhung-van-bao-dam-cuoc-song-cu-dan", "xich-lo-xe-dien-pho-co"] },
];

export const sectionById = (id) => BLOG_SECTIONS.find((s) => s.id === id) || null;

// Chuẩn hóa 4 loại bài (cẩm nang, câu chuyện, bài WayEcho, bài chuyên sâu) về cùng một dạng thẻ.
export function normalizePost(p) {
  return {
    slug: p.slug,
    title: p.title,
    summary: p.intro || p.summary || "",
    image: p.image || null,
    fallback: p.imageFallback || "/assets/images/location-image-unavailable.svg",
    alt: p.imageAlt || p.alt || p.title,
    tag: p.tag || p.category || "",
  };
}

export function postsInSection(sectionId, allPosts) {
  const s = sectionById(sectionId);
  if (!s) return [];
  const bySlug = new Map(allPosts.map((p) => [p.slug, p]));
  return s.slugs.map((slug) => bySlug.get(slug)).filter(Boolean);
}

export function unassignedPosts(allPosts) {
  const used = new Set(BLOG_SECTIONS.flatMap((s) => s.slugs));
  return allPosts.filter((p) => !used.has(p.slug));
}
