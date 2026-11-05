# WayEcho V23 — 10 bai blog, 10 the dich vu khac nhau

Moi bai trong `data/newBlogPosts.json` co mot the rieng theo `slug` tai `components/BlogServiceSidebar.jsx`.

- Gioi thieu WayEcho: Luu tru -> `/explore?cat=accommodation`
- Tro ly AI Camera: Tu van -> `/contact`
- Hear Your Way: Huong dan vien -> `/services/guides`
- Ho Guom - Den Ngoc Son: Diem den -> `/explore?cat=destination`
- Nha co Ma May: Diem tham quan -> `/explore?cat=destination`
- Am thuc: Nha hang -> `/explore?cat=restaurant`
- Tuyen am thanh: Huong dan vien -> `/services/guides`
- Mang luoi HDV/TNV: Ho so ho tro -> `/services/guides`
- Xich lo/xe dien: Chuyen tiep dat xe -> `/services/ride-booking`
- Tram Hang Buom: Lien he -> `/contact`

Giao dien: mot the chinh duy nhat o sidebar cho moi bai, giu phan cau chuyen lien quan. Khong dung anh AI. Du lieu tro nang, ho so nhan su, tram Ho tro Hang Buom va doi tac dat xe chua xac minh phai duoc gan nhan minh bach. Dat xe la chuyen tiep, khong tu dat cuoc.

Kiem thu: `node --test tests/*.test.mjs` = 61/61 PASS, trong do 2 bai kiem thu moi cho so luong/slug the rieng va duong dan. Chua xac nhan build Next.js hay giao dien trinh duyet.
