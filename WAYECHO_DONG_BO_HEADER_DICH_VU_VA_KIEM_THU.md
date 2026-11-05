# WAYECHO - Dong bo menu Dich vu & luong Di chuyen (05/11/2026)

## Da sua (khong xoa chuc nang)
- Header > Dich vu: bo sung Xem cac dich vu, Luu tru, Dat dich vu; thong nhat ten Am thuc, Guide dong hanh, Tour & Trai nghiem.
- Header > Di chuyen va thanh danh muc Di chuyen tren /explore: cung mo /explore?cat=transport. Trang nay la danh muc, chua phai form dat xe.
- /explore: hien ca cac loi vao Guide dong hanh va Dat dich vu ben canh cac tab danh muc; giu cac danh muc co san.
- Luong: /explore?cat=transport -> 6 the phuong tien -> Xem chi tiet /item?id=... hoac Dat xe thu nghiem /services/ride-booking?service=... -> form chon diem don, diem den va yeu cau ho tro.
- data/catalog.js: dua 6 dich vu di chuyen vao catalog chung. Truoc day co the nhin thay the tren /explore nhung form getItem(service) khong nhan dien duoc ID phuong tien.
- KHONG sua Header/Footer ngoai muc menu Dich vu, khong xoa cong, route hoac noi dung; KHONG thay doi khoi Admin/Guide/Volunteer/Business.

## Ket qua kiem thu
- Sau sua: 127/137 bai test dat, 10 test cu khong dat. 3 test moi ve dong bo danh muc, ID dat xe va bao toan cong deu dat.
- Chua xac nhan Next.js build/browser, do thu muc phu thuoc hien tai khong co binary next. Lenh npm run build bao 'next: not found'.
- Trong 10 test con lai: 
  (1) 2 test yeu cau Partner tren Header (V26/V30) trai voi quyet dinh da duyet chuyen cong vao Footer;
  (2) 2 test kiem Footer phai co link truc tiep /guide, /volunteer, /business; trong khi luong da duyet la Footer -> /partner -> 3 cong;
  (3) 2 test xe doc text truc tiep tu app/admin/rides/page.jsx; hien tai logic o components/AdminSections.jsx (refactor);
  (4) 1 test PartnerEnter cu, trong khi trang /partner da doi sang PartnerRoleCards;
  (5) 1 test theme/navigation cu mong co C am nang, Doi tac, /search, /booking tren Header (chuoi test khong phan biet link menudropdown voi route khac);
  (6) 1 test nhan account cu la 'Tai khoan khach hang'; thuc te da duyet 'Tai khoan cua toi';
  (7) 1 test V30 cu doi luong Di chuyen vao thang /services/ride-booking, trong khi luong moi dung danh muc /explore?cat=transport truoc khi dat xe.
- Khong chinh sua test cu cho mau xanh gia tao. Can xac nhan lai tieu chi test theo quyet dinh san pham, sau do moi cap nhat test va chay lai.

## Bao toan luong
- Header Dich vu / Di chuyen: /explore?cat=transport
- Thanh danh muc Di chuyen: /explore?cat=transport
- Chi tiet dich vu: /item?id=<ma dich vu>
- Dat xe: /services/ride-booking?service=<ma dich vu>
- Dat dich vu chung: /booking
- Guide dong hanh: /services/guides
- Footer -> Cong Doi Tac Lien Thong: /partner (3 role portal)

Du lieu xe va nha cung cap la DEMO, chua xac minh hop tac, gia, quyen anh hoac GPS thuc te.
