# WAYECHO - KIEM TRA VA DONG BO LUONG 05/11/2026

## Ket qua
- `npm test`: 144/144 dat, 0 fail.
- Phan tich cu phap 226 tep JS/JSX/TS/TSX: 0 loi.
- So khop 37 duong dan noi bo truc tiep tim trong components: 0 duong dan thieu trang.
- Day la ket qua kiem thu tai moi truong ma nguon. KHONG phai xac nhan 100% UI tren browser sau deploy.
- Build Next.js / E2E browser: chua chay duoc vi npm package next chua cai dat duoc o moi truong nay (npm ci offline ENOTCACHED); can chay npm ci, npm run build va E2E tren may co npm registry.

## Sua luong theo giao dien da duyet
- Giu Cổng doi tac lien thong tai Footer -> /partner -> 3 vai tro (Guide / Volunteer / Business), khong dua lai len Header khach.
- Giu tai khoan menu "Tai khoan cua toi" cho khach, giu header/footer da duyet.
- Header Dich vu va thanh danh muc Di chuyen deu vao /explore?cat=transport. The dich vu vao form /services/ride-booking?service=<id>.
- Dong bo 6 phuong tien demo trong `lib/rideDemo.js`, giao dien form va `app/api/ride-demo/route.js` (oto 7 cho, xe buyt dien, xe dien du lich, oto don tra, xe may, xich lo); khong tu dong chon mot don booking khac khi dat xe doc lap.
- API ride van yeu cau khach da dang nhap moi duoc tao yeu cau, chi Admin duoc chuyen trang thai. Xe va nha cung cap la demo, khong co GPS hoac thanh toan that.
- Admin theo doi xe tai lai API moi 4 giay va khi quay lai tab; loc dung trang thai Dang di chuyen / Da hoan thanh / Cho ghep xe.
- Cap nhat test cu kiem tra cau truc da bo / ten component cu sang hop dong dieu huong duoc duyet, khong xoa tinh nang hay duong dan da duyet.
- Them 7 bai kiem thu lien ket danh muc -> form -> API -> Admin va 6 phuong tien.

## Gioi han quan trong
- 100% (144/144) la ty le PASS cua test tu dong hien co, KHONG co nghia moi thao tac da duoc kiem thu bang trinh duyet.
- Chua deploy len Vercel. Du lieu demo co the khong ben vung neu deploy tren serverless khong co database ben vung.
- Khong xoa trang, khong thay header/footer, khong thay cac man hinh Admin da duyet.
