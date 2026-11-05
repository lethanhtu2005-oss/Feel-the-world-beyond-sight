// TỆP SINH TỰ ĐỘNG bởi scripts/fetch-commons-photos.mjs — không sửa tay.
// Ghi đè ảnh/credit của điểm đến trong data/destinations.js. Slug không có ở đây giữ nguyên dữ liệu cũ.
const photos = {
  "nha-co-87-ma-may": {
    "image": "/assets/images/destinations/nha-co-87-ma-may.webp",
    "imageSrcSet": "/assets/images/destinations/nha-co-87-ma-may-800.webp 800w, /assets/images/destinations/nha-co-87-ma-may.webp 1600w",
    "alt": "Ảnh chụp thực tế liên quan đến Nhà cổ 87 Mã Mây, Hà Nội (tên ảnh gốc trên Commons: Maison longue traditionnelle (1)).",
    "imageCredit": "Guerinf · Wikimedia Commons · CC BY-SA 4.0",
    "imageSource": "https://commons.wikimedia.org/wiki/File%3AMaison_longue_traditionnelle_(1).jpg",
    "file": "Maison longue traditionnelle (1).jpg",
    "license": "CC BY-SA 4.0",
    "author": "Guerinf"
  },
  "dinh-kim-ngan": {
    "image": "/assets/images/destinations/dinh-kim-ngan.webp",
    "imageSrcSet": "/assets/images/destinations/dinh-kim-ngan-800.webp 800w, /assets/images/destinations/dinh-kim-ngan.webp 1600w",
    "alt": "Ảnh chụp thực tế liên quan đến Đình Kim Ngân, Hà Nội (tên ảnh gốc trên Commons: Kim Ngân Temple 3).",
    "imageCredit": "Christophe95 · Wikimedia Commons · CC BY-SA 4.0",
    "imageSource": "https://commons.wikimedia.org/wiki/File%3AKim_Ng%C3%A2n_Temple_3.jpg",
    "file": "Kim Ngân Temple 3.jpg",
    "license": "CC BY-SA 4.0",
    "author": "Christophe95"
  },
  "den-bach-ma": {
    "image": "/assets/images/destinations/den-bach-ma.webp",
    "imageSrcSet": "/assets/images/destinations/den-bach-ma-800.webp 800w, /assets/images/destinations/den-bach-ma.webp 1600w",
    "alt": "Ảnh chụp thực tế liên quan đến Đền Bạch Mã, Hà Nội (tên ảnh gốc trên Commons: Bạch Mã Temple 1).",
    "imageCredit": "Christophe95 · Wikimedia Commons · CC BY-SA 4.0",
    "imageSource": "https://commons.wikimedia.org/wiki/File%3AB%E1%BA%A1ch_M%C3%A3_Temple_1.jpg",
    "file": "Bạch Mã Temple 1.jpg",
    "license": "CC BY-SA 4.0",
    "author": "Christophe95"
  },
  "tt-22-hang-buom": {
    "image": "/assets/images/destinations/tt-22-hang-buom.webp",
    "imageSrcSet": "/assets/images/destinations/tt-22-hang-buom-800.webp 800w, /assets/images/destinations/tt-22-hang-buom.webp 1600w",
    "alt": "Ảnh chụp thực tế liên quan đến Trung tâm Nghệ thuật 22 Hàng Buồm (Hội quán Quảng Đông), Hà Nội (tên ảnh gốc trên Commons: Hội quán Quảng Đông 22 Hàng Buồm).",
    "imageCredit": "NKSTTSSHNVN · Wikimedia Commons · CC BY-SA 4.0",
    "imageSource": "https://commons.wikimedia.org/wiki/File%3AH%E1%BB%99i_qu%C3%A1n_Qu%E1%BA%A3ng_%C4%90%C3%B4ng_22_H%C3%A0ng_Bu%E1%BB%93m.jpg",
    "file": "Hội quán Quảng Đông 22 Hàng Buồm.jpg",
    "license": "CC BY-SA 4.0",
    "author": "NKSTTSSHNVN"
  },
  "den-quan-de": {
    "image": "/assets/images/destinations/den-quan-de.webp",
    "imageSrcSet": "/assets/images/destinations/den-quan-de-800.webp 800w, /assets/images/destinations/den-quan-de.webp 1600w",
    "alt": "Ảnh chụp thực tế liên quan đến Đền Quan Đế, Hà Nội (tên ảnh gốc trên Commons: Quan De Temple, Old Quarter, Hanoi (7)).",
    "imageCredit": "Richard Mortel from Riyadh, Saudi Arabia · Wikimedia Commons · CC BY 2.0",
    "imageSource": "https://commons.wikimedia.org/wiki/File%3AQuan_De_Temple%2C_Old_Quarter%2C_Hanoi_(7)_(38497042101).jpg",
    "file": "Quan De Temple, Old Quarter, Hanoi (7) (38497042101).jpg",
    "license": "CC BY 2.0",
    "author": "Richard Mortel from Riyadh, Saudi Arabia"
  },
  "o-quan-chuong": {
    "image": "/assets/images/destinations/o-quan-chuong.webp",
    "imageSrcSet": "/assets/images/destinations/o-quan-chuong-800.webp 800w, /assets/images/destinations/o-quan-chuong.webp 1600w",
    "alt": "Ảnh chụp thực tế liên quan đến Cửa Ô Quan Chưởng, Hà Nội (tên ảnh gốc trên Commons: Quan-chuong-hanoi).",
    "imageCredit": "Alex 69200 vx · Wikimedia Commons · CC BY-SA 4.0",
    "imageSource": "https://commons.wikimedia.org/wiki/File%3AQuan-chuong-hanoi.jpg",
    "file": "Quan-chuong-hanoi.jpg",
    "license": "CC BY-SA 4.0",
    "author": "Alex 69200 vx"
  },
  "cho-dong-xuan": {
    "image": "/assets/images/destinations/cho-dong-xuan.webp",
    "imageSrcSet": "/assets/images/destinations/cho-dong-xuan-800.webp 800w, /assets/images/destinations/cho-dong-xuan.webp 1600w",
    "alt": "Ảnh chụp thực tế liên quan đến Chợ Đồng Xuân, Hà Nội (tên ảnh gốc trên Commons: Dong Xuan market).",
    "imageCredit": "Juliana Ng from Singapore · Wikimedia Commons · CC BY 2.0",
    "imageSource": "https://commons.wikimedia.org/wiki/File%3ADong_Xuan_market.jpg",
    "file": "Dong Xuan market.jpg",
    "license": "CC BY 2.0",
    "author": "Juliana Ng from Singapore"
  },
  "pho-hang-bac": {
    "image": "/assets/images/destinations/pho-hang-bac.webp",
    "imageSrcSet": "/assets/images/destinations/pho-hang-bac-800.webp 800w, /assets/images/destinations/pho-hang-bac.webp 1600w",
    "alt": "Ảnh chụp thực tế liên quan đến Phố Hàng Bạc, Hà Nội (tên ảnh gốc trên Commons: Hàng Bạc).",
    "imageCredit": "Alexis Lê-Quôc · Wikimedia Commons · CC BY 2.0",
    "imageSource": "https://commons.wikimedia.org/wiki/File%3AH%C3%A0ng_B%E1%BA%A1c.jpg",
    "file": "Hàng Bạc.jpg",
    "license": "CC BY 2.0",
    "author": "Alexis Lê-Quôc"
  },
  "pho-hang-ma": {
    "image": "/assets/images/destinations/pho-hang-ma.webp",
    "imageSrcSet": "/assets/images/destinations/pho-hang-ma-800.webp 800w, /assets/images/destinations/pho-hang-ma.webp 1600w",
    "alt": "Ảnh chụp thực tế liên quan đến Phố Hàng Mã, Hà Nội (tên ảnh gốc trên Commons: Phố Hàng Mã, Hà Nội 001).",
    "imageCredit": "Phan Minh Tuấn · Wikimedia Commons · CC BY-SA 4.0",
    "imageSource": "https://commons.wikimedia.org/wiki/File%3APh%E1%BB%91_H%C3%A0ng_M%C3%A3%2C_H%C3%A0_N%E1%BB%99i_001.JPG",
    "file": "Phố Hàng Mã, Hà Nội 001.JPG",
    "license": "CC BY-SA 4.0",
    "author": "Phan Minh Tuấn"
  },
  "pho-hang-dao": {
    "image": "/assets/images/destinations/pho-hang-dao.webp",
    "imageSrcSet": "/assets/images/destinations/pho-hang-dao-800.webp 800w, /assets/images/destinations/pho-hang-dao.webp 1600w",
    "alt": "Ảnh chụp thực tế liên quan đến Phố Hàng Đào, Hà Nội (tên ảnh gốc trên Commons: Hanoi pho co, Pho Hang dao, viet nam - panoramio).",
    "imageCredit": "trungydang · Wikimedia Commons · CC BY 3.0",
    "imageSource": "https://commons.wikimedia.org/wiki/File%3AHanoi_pho_co%2C_Pho_Hang_dao%2C_viet_nam_-_panoramio.jpg",
    "file": "Hanoi pho co, Pho Hang dao, viet nam - panoramio.jpg",
    "license": "CC BY 3.0",
    "author": "trungydang"
  },
  "pho-hang-quat": {
    "image": "/assets/images/destinations/pho-hang-quat.webp",
    "imageSrcSet": "/assets/images/destinations/pho-hang-quat-800.webp 800w, /assets/images/destinations/pho-hang-quat.webp 1600w",
    "alt": "Ảnh chụp thực tế liên quan đến Phố Hàng Quạt, Hà Nội (tên ảnh gốc trên Commons: Hang Quat street of Buddhist altars & statues).",
    "imageCredit": "Greg Willis from Denver, CO, usa · Wikimedia Commons · CC BY-SA 2.0",
    "imageSource": "https://commons.wikimedia.org/wiki/File%3AHang_Quat_street_of_Buddhist_altars_%26_statues_(3695174688).jpg",
    "file": "Hang Quat street of Buddhist altars & statues (3695174688).jpg",
    "license": "CC BY-SA 2.0",
    "author": "Greg Willis from Denver, CO, usa"
  },
  "pho-ma-may": {
    "image": "/assets/images/destinations/pho-ma-may.webp",
    "imageSrcSet": "/assets/images/destinations/pho-ma-may-800.webp 800w, /assets/images/destinations/pho-ma-may.webp 1600w",
    "alt": "Ảnh chụp thực tế liên quan đến Phố Mã Mây, Hà Nội (tên ảnh gốc trên Commons: Dao Duy Tu & Ma May, Old Quarter, Hanoi).",
    "imageCredit": "Vinnie Cartabiano · Wikimedia Commons · CC BY 2.0",
    "imageSource": "https://commons.wikimedia.org/wiki/File%3ADao_Duy_Tu_%26_Ma_May%2C_Old_Quarter%2C_Hanoi_(28456369447).jpg",
    "file": "Dao Duy Tu & Ma May, Old Quarter, Hanoi (28456369447).jpg",
    "license": "CC BY 2.0",
    "author": "Vinnie Cartabiano"
  },
  "pho-ta-hien": {
    "image": "/assets/images/destinations/pho-ta-hien.webp",
    "imageSrcSet": "/assets/images/destinations/pho-ta-hien-800.webp 800w, /assets/images/destinations/pho-ta-hien.webp 1600w",
    "alt": "Ảnh chụp thực tế liên quan đến Tuyến phố Tạ Hiện, Hà Nội (tên ảnh gốc trên Commons: Phố Tạ Hiện - NKS).",
    "imageCredit": "NKSTTSSHNVN · Wikimedia Commons · CC BY-SA 4.0",
    "imageSource": "https://commons.wikimedia.org/wiki/File%3APh%E1%BB%91_T%E1%BA%A1_Hi%E1%BB%87n_-_NKS.jpg",
    "file": "Phố Tạ Hiện - NKS.jpg",
    "license": "CC BY-SA 4.0",
    "author": "NKSTTSSHNVN"
  },
  "ho-guom": {
    "image": "/assets/images/destinations/ho-guom.webp",
    "imageSrcSet": "/assets/images/destinations/ho-guom-800.webp 800w, /assets/images/destinations/ho-guom.webp 1600w",
    "alt": "Ảnh chụp thực tế liên quan đến Hồ Hoàn Kiếm & Cầu Thê Húc, Hà Nội (tên ảnh gốc trên Commons: Huc Bridge).",
    "imageCredit": "David Stanley · Wikimedia Commons · CC BY 2.0",
    "imageSource": "https://commons.wikimedia.org/wiki/File%3AHuc_Bridge.jpg",
    "file": "Huc Bridge.jpg",
    "license": "CC BY 2.0",
    "author": "David Stanley"
  },
  "pho-co": {
    "image": "/assets/images/destinations/pho-co.webp",
    "imageSrcSet": "/assets/images/destinations/pho-co-800.webp 800w, /assets/images/destinations/pho-co.webp 1600w",
    "alt": "Ảnh chụp thực tế liên quan đến Khu Phố cổ Hà Nội, Hà Nội (tên ảnh gốc trên Commons: Vietnam hanoi old quarter).",
    "imageCredit": "Maryam Laura Moazedi, www.moazedi.org · Wikimedia Commons · CC BY-SA 3.0",
    "imageSource": "https://commons.wikimedia.org/wiki/File%3AVietnam_hanoi_old_quarter.jpg",
    "file": "Vietnam hanoi old quarter.jpg",
    "license": "CC BY-SA 3.0",
    "author": "Maryam Laura Moazedi, www.moazedi.org"
  },
  "mua-roi-thang-long": {
    "image": "/assets/images/destinations/mua-roi-thang-long.webp",
    "imageSrcSet": "/assets/images/destinations/mua-roi-thang-long-800.webp 800w, /assets/images/destinations/mua-roi-thang-long.webp 1600w",
    "alt": "Ảnh chụp thực tế liên quan đến Nhà hát Múa rối Thăng Long, Hà Nội (tên ảnh gốc trên Commons: Thang Long Water Puppet Theatre).",
    "imageCredit": "shi zhao · Wikimedia Commons · CC BY-SA 2.0",
    "imageSource": "https://commons.wikimedia.org/wiki/File%3AThang_Long_Water_Puppet_Theatre.jpg",
    "file": "Thang Long Water Puppet Theatre.jpg",
    "license": "CC BY-SA 2.0",
    "author": "shi zhao"
  },
  "van-mieu": {
    "image": "/assets/images/destinations/van-mieu.webp",
    "imageSrcSet": "/assets/images/destinations/van-mieu-800.webp 800w, /assets/images/destinations/van-mieu.webp 1600w",
    "alt": "Ảnh chụp thực tế liên quan đến Văn Miếu – Quốc Tử Giám, Hà Nội (tên ảnh gốc trên Commons: Temple of Literature, Hanoi by Xiquinho Silva 02).",
    "imageCredit": "xiquinhosilva · Wikimedia Commons · CC BY 2.0",
    "imageSource": "https://commons.wikimedia.org/wiki/File%3ATemple_of_Literature%2C_Hanoi_by_Xiquinho_Silva_02.jpg",
    "file": "Temple of Literature, Hanoi by Xiquinho Silva 02.jpg",
    "license": "CC BY 2.0",
    "author": "xiquinhosilva"
  },
  "hoang-thanh-thang-long": {
    "image": "/assets/images/destinations/hoang-thanh-thang-long.webp",
    "imageSrcSet": "/assets/images/destinations/hoang-thanh-thang-long-800.webp 800w, /assets/images/destinations/hoang-thanh-thang-long.webp 1600w",
    "alt": "Ảnh chụp thực tế liên quan đến Hoàng thành Thăng Long, Hà Nội (tên ảnh gốc trên Commons: Central Sector of the Imperial Citadel of Thang Long - Hanoi).",
    "imageCredit": "katiebordner · Wikimedia Commons · CC BY 2.0",
    "imageSource": "https://commons.wikimedia.org/wiki/File%3ACentral_Sector_of_the_Imperial_Citadel_of_Thang_Long_-_Hanoi_(26246667851).jpg",
    "file": "Central Sector of the Imperial Citadel of Thang Long - Hanoi (26246667851).jpg",
    "license": "CC BY 2.0",
    "author": "katiebordner"
  }
};
export default photos;
