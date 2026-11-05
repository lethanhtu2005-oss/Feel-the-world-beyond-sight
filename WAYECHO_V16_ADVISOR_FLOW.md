# WayEcho V16 — camera nền và tư vấn viên nhận hình

## Đã thay đổi
- Khách: mở tư vấn viên -> cấp quyền camera -> ảnh camera làm nền -> mã phiên ngẫu nhiên -> gửi mã phiên cho người hỗ trợ -> người hỗ trợ nhập mã trong `/staff/consultation` -> nhận hình/video qua WebRTC khi kết nối thành công.
- Khách và tư vấn viên có thể gửi tin nhắn hai chiều qua WebRTC data channel. Tin của tư vấn viên được đọc tiếng Việt khi thiết bị có giọng `vi-VN`.
- Hai bên có thể bật micro theo yêu cầu, mặc định mic tắt. Đóng phiên ngừng camera/micro.
- Bộ lọc tiếp cận mặc định dùng dữ liệu demo (vẫn có chế độ chỉ thông tin được xác minh). Dữ liệu giả định KHÔNG thể công bố là điều kiện tiếp cận thật.

## Giới hạn quan trọng
- Signaling dùng RAM của tiến trình Next.js, chỉ phù hợp bản demo chạy trên **một tiến trình**. Không đảm bảo hoạt động khi deploy Vercel Serverless (nhiều instance/không giữ RAM). Để chạy thật trên Vercel cần thay API signaling bằng Redis/Ably/Pusher hoặc dịch vụ video chuyên dụng có STUN/TURN.
- Trang `/staff/consultation` chưa có xác thực nhân viên. Không bật `WAYECHO_DEMO_VIDEO_ENABLED=true` trên site công khai nếu chưa thêm đăng nhập và quyền truy cập.
- Để truyền hình ảnh tốt trên mạng di động/NAT đối xứng cần máy chủ TURN. Hiện chỉ cấu hình STUN, nên một số cặp mạng sẽ không gọi được.
- Không có tư vấn viên trực thực. Tên, ca trực, điện thoại là mẫu giả định.
- Browser cần HTTPS, cấp quyền camera/micro, và giọng đọc tiếng Việt được cài trên thiết bị.
- AI không hướng dẫn di chuyển. Tư vấn viên chỉ quan sát từ xa, không bảo đảm an toàn; người dùng cần gậy dò đường và các hỗ trợ phù hợp.

## Thử tại máy
1. `npm install` rồi `npm run dev`.
2. Trình duyệt khách mở trang chủ -> Tư vấn viên -> Mở camera và tạo phiên, sao chép mã UUID.
3. Trình duyệt tư vấn mở `/staff/consultation` -> nhập mã -> Nhận phiên.
4. Trình duyệt khách xác nhận đã kết nối, thử chat hai chiều và mic.

## Điểm cần thống nhất trước public launch
- Chọn backend signaling bền vững và TURN; hệ thống xác thực tư vấn viên; consent về camera, lưu trữ và quyền riêng tư; trạng thái trực thực tế; phương án khi tư vấn viên offline.
