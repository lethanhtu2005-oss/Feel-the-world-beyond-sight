# WayEcho - Tích hợp HOME-01 / HOME-02 / HOME-03

## Đã sửa
- HOME-01: Header một hàng với Điểm đến, Dịch vụ, Blog & Trải nghiệm, Hỗ trợ, Đối tác. Dịch vụ gồm Lưu trú, Ẩm thực, Di chuyển, Guide đồng hành, Vé tham quan. Mũi tên SVG bo nét và xoay khi mở. Trợ năng duy nhất ở header gồm tương phản, chữ lớn, đọc trang. Tài khoản ở góc phải, SOS độc lập. Không thay nút Camera trong Hero.
- Nút nổi: chỉ còn Tư vấn WayEcho, với tư vấn viên Lê Thanh Tú, lời chào theo giờ thiết bị; số điện thoại chưa có, không bịa số. Widget KHÔNG PHẢI live chat thật, không gửi dữ liệu.
- HOME-02: Bốn thẻ Nhà cổ 87 Mã Mây, Chợ Đồng Xuân, Ô Quan Chưởng, Phố Hàng Mã; mô tả phù hợp nghe; dropdown tiếp cận đóng/mở theo từng thẻ. Thông tin tiếp cận là GIẢ ĐỊNH, có cảnh báo; không mô tả đã khảo sát.
- HOME-03: Carousel 15 ảnh Phố cổ từ danh sách Wikimedia của bản tham chiếu, bố cục xếp lớp, vuốt trái/phải, nút trước/sau và pagination. Không chữ phủ ảnh, chỉ tiêu đề “Khám phá qua hình ảnh”. Ảnh trung tâm liên kết tới trang tương ứng còn hiện có.

## Cần kiểm tra trước khi phát hành
1. Ảnh vẫn tải từ nguồn bên ngoài, có nguy cơ lỗi hotlink hoặc đổi URL. Môi trường tạo file không có DNS để tải/xác minh các ảnh. Dù đã lựa chọn theo đúng tên địa danh và nguồn công khai, yêu cầu kiểm tra trực quan và quyền sử dụng trước khi công bố. Nếu ảnh lỗi, giao diện dùng fallback trung tính chứ KHÔNG dùng ảnh sai địa điểm.
2. Bốn nút “Xem thông tin điểm đến” tạm dẫn tới trang /destination?d=pho-co sẵn có; cần tạo trang chi tiết riêng cho mỗi địa danh nếu muốn nội dung riêng.
3. Blog & Trải nghiệm đã có /articles nhưng hiện chưa có bộ lọc phân mục riêng. Các mục phân loại tạm điều hướng đến trang bài viết tổng hợp.
4. Vé tham quan dùng danh mục activity hiện có; cần hoàn thiện luồng đặt vé riêng nếu sản phẩm chưa cung cấp.
5. Chat tư vấn chưa nối backend; giờ trực và SĐT phải được người vận hành cung cấp. SOS có riêng /sos.
6. Cần chạy `npm ci && npm run build && npm test` tại máy có mạng trước khi deploy. Môi trường tạo file không cài đủ node_modules và không tải được gói từ npm.

## Các file đã thay đổi
- components/Header.jsx
- components/ConsultantWidget.jsx
- components/HomeOldQuarterCards.jsx
- components/DestinationGallery.jsx
- app/page.jsx
- app/layout.jsx
- app/globals.css
- data/oldQuarterHome.js
- data/oldQuarterGallery.js

## Hướng dẫn
`npm ci` rồi `npm run dev` và mở http://localhost:3000.

## 03/11/2026 — Đồng bộ luồng sau cập nhật trang chủ
- Bổ sung `USER_FLOW_HOME_UPDATED.md`: bản đồ tương tác HOME-01/HOME-02/HOME-03, nhãn trạng thái thực tế và các trường hợp chưa xác minh.
- Không sửa phần trang khác ngoài phạm vi trang chủ để tránh biến đổi nghiệp vụ chưa được chốt.
