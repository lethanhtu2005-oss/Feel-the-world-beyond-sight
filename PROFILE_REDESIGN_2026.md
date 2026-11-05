# WayEcho /profile – phiên bản UI cập nhật ngày 05/11/2026

- Chỉnh sửa **trực tiếp** `app/profile/page.jsx` trong ZIP V7 cập nhật tuổi và trợ năng. Header, Footer, 3 widget nổi và các trang khác không bị thay đổi.
- Không có thanh menu dọc riêng. Bố cục mới: hero Phố Cổ, thẻ tài khoản toàn chiều ngang, 2 cột Loại hồ sơ/Tùy chọn hỗ trợ, 2 cột Người đồng hành/Đặt chỗ.
- Dùng màu nền vàng WayEcho `#f8ae38`, nền kem và chữ tối; responsive.
- **Chỉnh sửa thông tin** mở dialog có Họ tên, điện thoại, email, ngày sinh, giới tính, địa chỉ; nút Hủy/Lưu thay đổi; tuổi tự tính, kiểm tra ngày sinh và email. Ảnh đại diện đổi được với tệp <=500KB.
- **Loại hồ sơ** chọn người nhìn kém, khiếm thị, dùng xe lăn, khiếm thính, cao tuổi hoặc khác (có mô tả); không mặc định chỉnh chế độ trợ năng theo hồ sơ.
- **Tùy chọn hỗ trợ** có 4 công tắc nhanh, nút thêm mở dialog chọn từ **đủ 16 trợ giúp cũ**, nút Hủy/Áp dụng; giữ tốc độ đọc, Nghe thử. Hai trạng thái chữ lớn/tương phản dùng A11yProvider.
- **Người đồng hành** và **Liên hệ khẩn cấp** mở dialog sửa, hoặc xác nhận xóa riêng từng người.
- **Đặt chỗ của tôi** liên kết `/my-booking`; **Chuyến đi của tôi** liên kết `/my-trip`, không tạo lịch sử giả.
- Dữ liệu DEMO lưu localStorage (chưa đồng bộ tài khoản), giữ các khóa cũ `we-usertype`, `we-contact`, `we-birth-date`, `we-emergency`, `we-emergency-name`, `we-companion`, `we-access-prefs`, `we-share-business`. Có khóa mới `we-usertype-other` và `we-profile-avatar`.
- Ràng buộc: việc bật các trợ giúp theo nhu cầu không xác nhận chúng được hỗ trợ ở mọi địa điểm; thông tin liên hệ khẩn cấp không tự gửi cho đối tác.
