# V10 - Kiem tra anh va tinh nang hoi khoang cach bang giong noi

## Da thuc hien
- Bo sung `components/VoiceDistanceFinder.jsx` vao `app/navigation/page.jsx`.
- Nhap van ban hoac nhan dang giong noi tren trinh duyet ho tro Web Speech API (`vi-VN`).
- GPS chi duoc xin sau khi nguoi dung bam nut "Dung vi tri cua toi".
- Neu khong co GPS, dung diem xuat phat minh hoa o trung tam Pho Co Ha Noi, thong bao ro.
- Tinh khoang cach duong chim bay bang haversine tu toa do thay vi phat sinh so ngau nhien.
- Chi giai dap nhung dia diem da co toa do trong du lieu WayEcho; khong bao dai ve cac dich vu chua co toa do.
- 25 anh minh hoa sai/dung chung trong dich vu V9 duoc thay bang anh trang thai "Chua co anh". KHONG coi day la yeu cau anh chinh xac da hoan thanh.

## Chua dat
- Chua the tai va kiem chung anh that cua tung co so luu tru, nha hang va noi ban ve; can nguon anh dung co so va quyen su dung.
- Chua co toa do cua 25 co so dich vu trong `oldQuarterServices.json`: tinh nang voice chua doc duoc khoang cach toi cac co so nay.
- Khong co routing duong bo, chua tinh so km di thuc te.
- Chua chay duoc Next.js build do phu thuoc trong container chua duoc cai day du.

## Kiem tra khi deploy
1. Deploy source va mo /navigation.
2. Cho phep micro tren HTTPS (Chrome ho tro Web Speech API tot hon cac trinh duyet khac).
3. Hoi: "Toi muon den Cho Dong Xuan" hoac nhap ten trong danh sach.
4. Bam "Dung vi tri cua toi" de xin GPS, hoi lai ten diem den.
5. So sanh ket qua voi khoang cach duong chim bay va kiem tra thong bao gioi han.
6. Kiem tra anh sau khi bo sung nguon anh chinh xac co giay phep.
