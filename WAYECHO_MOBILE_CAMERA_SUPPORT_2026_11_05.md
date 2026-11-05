# WayEcho – giao diện hỗ trợ camera trên điện thoại

- Ứng dụng web/PWA responsive, chưa phải APK/IPA native.
- Điện thoại: thanh điều hướng Trang chủ / Dịch vụ / Đặt chỗ / Hỗ trợ / Tài khoản.
- Hỗ trợ mở overlay toàn màn hình, có logo WayEcho đúng asset gốc và hai chế độ AI Camera / Hỗ trợ trực tiếp.
- Camera làm nền cả hai chế độ nếu khách chủ động cấp quyền; không tự khởi chạy camera khi mở bảng hỗ trợ.
- AI: mô tả cảnh, nhập câu hỏi, nhận dạng lời nói nếu trình duyệt hỗ trợ, đọc câu trả lời, đổi camera, kết nối tư vấn viên.
- Tư vấn: camera nền, xin quyền tạo phiên WebRTC, micro, đổi camera, tin nhắn, nghe lại, quay về AI; khi chuyển/đóng dừng track camera/micro.
- Luồng SOS riêng được giữ nguyên. AI không tự hướng dẫn di chuyển hoặc xác nhận lối an toàn.
- Thiết kế dùng vàng/kem WayEcho, kích thước điểm chạm tối thiểu 44px, hỗ trợ tai thỏ và vùng an toàn đáy.
- Không thay đổi Header/Footer desktop hay các cổng đối tác, admin, HDV, tình nguyện viên, doanh nghiệp.
- Kiểm thử mã nguồn và test tự động không thay cho E2E thực tế trên điện thoại, HTTPS và trình duyệt.
