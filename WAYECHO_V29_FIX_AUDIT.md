# WAYECHO V29 - BAO CAO SUA LOI SAU QA V28

Ngay kiem tra: 03/11/2026. Nguon: WayEcho V28 (khong thay doi nghiep vu dat xe/Escrow).

## Da sua trong source
1. `lib/portalRoutes.js` - mot quy tac phan biet cac route noi bo (`/admin`, `/internal`, `/staff`, `/partner`, `/business`, `/guide`) va trang khach, dung ranh gioi path thay vi `startsWith` chung chung.
2. `components/TravelerWidgets.jsx` + `app/layout.jsx` - unmount toan bo floating SOS / tu van vien / AI Camera / bottom nav tren route noi bo. Unmount thay vi chi CSS hide de camera/micro cua widget duoc cleanup. Xoa body padding duoi cua Traveler tai portal noi bo.
3. `components/Header.jsx`, `components/MobileNav.jsx`, `components/Footer.jsx` - khong hien nav/footer Traveler tren route portal noi bo; label nav di chuyen doi thanh `Ban do`.
4. `components/InteractiveOnboarding.jsx` - bo lang nghe microphone khi Next/Back, link thoat trang hoac an tab; xoa cac event handler Web Speech cu, ngan callback den muon; cap nhat `aria-pressed` va focus tieu de khi qua buoc.
5. `components/Footer.jsx` - thay footer xanh den thanh nau dam/kem, bo nhan dien mang xa hoi demo khong co duong dan, giu cac link dich vu/Blog/tro giup/Partner/Onboarding/SOS; co canh bao thong tin demo.
6. `scripts/deploy-preflight.mjs` - kiem tra duong dan API dang su dung cho Ride/Escrow, khong tu dong coi module localStorage cu la nghiep vu dang chay. Van canh bao storage memory tren Vercel.
7. `public/sw.js` - tang phien ban cache, bo bypass trung lap, khong cache request cua internal/partner/admin, login, booking, ride-booking, SOS, API, RSC; chi cho phep document ngoai tuyen o mot so trang cong khai.
8. `tests/v29-regression.test.mjs` - them 6 bai regression cho portal shell, micro, footer, preflight, PWA.

## Kiem thu da thuc hien
- `npm test`: 83/83 pass, 0 fail (`/mnt/data/wayecho_v29_tests3.log`).
- Kiem tra cu phap 174 tep JSX/JS/MJS bang TypeScript parser: 0 loi parse.
- `node scripts/deploy-preflight.mjs`: kiem tra source PASS; thong bao can cau hinh secret va tai khoan.
- Duong dan Blog/route noi bo duoc giu nguyen; test cu 77/77 khong bi giam.

## CHUA DUOC NGHIEM THU - KHONG GOI LA HOAN THANH PRODUCTION
- Chua chay duoc `next build` hoac E2E tren website thuc: moi truong khong co binary `next`, khong ket noi npm registry de cai phu thuoc. Dung `/npm ci && npm run build && npm test` trong CI GitHub/Vercel.
- `lib/store.js` van dung per-instance memory tren Vercel neu khong co DB dung chung. Da duoc nguoi dung yeu cau tam giu; cac luong giua nhieu may hoac sau restart KHONG dam bao.
- WebRTC video/chia se camera, TURN, SSR/GPS va voice qua thiet bi phai duoc thu truc tiep. Khong mo WebRTC demo cong khai len Internet neu chua kiem tra phan quyen bao mat.
- Du lieu tiep can, nguoi huong dan, doanh nghiep, xe, thanh toan deu co phan mo phong va chua duoc xac minh thuc te.

## Trinh tu nghiem thu thuc te sau khi deploy
1. Tren GitHub Actions/Vercel chay npm ci, npm test, npm run build. Neu build fail, khong deploy.
2. Chrome/Edge (desktop va mobile): mo `/`, `/onboarding`, `/partner/login`, `/guide`, `/business`, `/internal/login`, `/admin`, `/admin/consultation`; check chrome/overlays tren viewport 390px va 1366px.
3. Thu onboarding micro: bam mic -> Next/Back/bo qua, browser permission deny, tab background; khong duoc con trang thai dang nghe.
4. Click 10 the dich vu ben phai 10 blog: verify trang dich, tai du lieu va CTA tiep theo.
5. Thu doi tai khoan Guide/Business/Advisor/Admin, session ngan chan duong dan trai quyen.
6. Thu tao don, SOS, Ride, Escrow (2 thiet bi) sau khi co DB chung. Tranh khang dinh dong bo thuc su khi chua co DB.
