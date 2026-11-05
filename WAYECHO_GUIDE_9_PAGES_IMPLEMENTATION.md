# WayEcho – Cổng hướng dẫn viên (9 màn hình)

- Đã chuyển Guide Portal sang một sidebar duy nhất, bỏ menu điều hướng trùng ở phía trên.
- `/guide`: Tổng quan, tour, checklist tiếp cận và lối tắt Escrow.
- `/guide/bookings`: danh sách chuyến minh họa, bộ lọc, chi tiết, xác nhận/khởi hành/kết thúc mô phỏng; có bảng phân công cũ riêng để không mất dấu dữ liệu sẵn có.
- `/guide/schedule`: lịch hỗ trợ tuần và khung giờ rảnh (lưu trình duyệt).
- `/guide/support`: tiếp nhận yêu cầu tiếp cận, tiến trình xử lý, liên kết SOS.
- `/guide/reviews`: đánh giá và phản hồi mô phỏng.
- `/guide/profile`: chỉnh sửa thông tin demo, kinh nghiệm, chứng chỉ, khu vực và thiết bị.
- `/guide/escrow`: giữ nguyên `EscrowLedgerView` và API Escrow của dự án, chỉ bổ sung giao diện bao ngoài; không chuyển HDV sang `/admin/escrow`.
- `/guide/analytics`: chỉ số và biểu đồ giả lập; xuất CSV của các chuyến mẫu.
- `/guide/settings`: tùy chọn thông báo và trợ năng mô phỏng, liên kết Escrow và SOS.

## Điều quan trọng

- Toàn bộ booking/yêu cầu/đánh giá mẫu mới được ghi rõ DEMO, lưu bằng localStorage trên từng thiết bị; không đồng bộ hoặc tạo đơn booking thật.
- Escrow đọc dữ liệu từ API cũ và chịu giới hạn của API; không có giao dịch tiền thật. Không cam kết tự động giải ngân sau 24 giờ.
- Đường dẫn `/partner`, `/volunteer`, `/business`, Footer và Header khách hàng không bị thay đổi.
- Đã kiểm tra cú pháp 11 file JSX bằng TypeScript parser và tồn tại 9/9 route.
- Bộ kiểm thử dự án 121/129 bài đạt, 8 bài chưa đạt còn liên quan đến các kỳ vọng cũ của Header/Footer/Partner. Chưa chạy build Next hoặc E2E trình duyệt do thiếu các gói npm trong môi trường.
