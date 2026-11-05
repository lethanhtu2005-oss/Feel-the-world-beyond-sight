# Cập nhật thông báo khách hàng và SOS mobile

- `/notifications`: chỉ dữ liệu thông báo thuộc tài khoản/phiên khách, không hiển thị danh sách cảnh báo thực địa và thiết bị bịa đặt. Trạng thái đã đọc được lưu ở sessionStorage của trình duyệt, không xác nhận đã đọc ở server.
- API GET `/api/notifications` lọc `ownerId` theo người đang đăng nhập, ngăn lộ thông báo giữa các khách. Admin vẫn xem được theo quyền.
- Không bán, phát hoặc cho mượn gậy trắng, tai nghe. Các mục giới thiệu thiết bị được chuyển thành lời khuyên dùng thiết bị cá nhân.
- Điện thoại dùng web/PWA không thể bảo đảm phát hiện phím cứng giảm âm lượng được giữ 5 giây (hệ điều hành kiểm soát). Đã bổ sung thao tác chạm giữ SOS trên màn hình 5 giây, có liên kết SOS bằng một chạm. Đây là trang SOS demo, không tự gửi cứu hộ.
- Nếu đóng gói ứng dụng native: ở lớp Android/iOS native cần xử lý sự kiện phím theo quy định của hệ điều hành, kiểm tra điều kiện foreground/background và chống kích hoạt nhầm; sau 5 giây mới gửi `window.dispatchEvent(new Event("wayecho:native-volume-down-held"))` tới WebView. Không dùng JavaScript web để giả bắt phím cứng và không khẳng định có khả năng hoạt động nền trên iOS.
- Không thay đổi header/footer/các cổng đã duyệt. Chưa có kiểm chứng thực nghiệm trên điện thoại thật hoặc gửi SOS thật.
