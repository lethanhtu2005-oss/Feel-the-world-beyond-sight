# WayEcho /navigation - 05-11-2026

Phạm vi: chỉ trang app/navigation/page.jsx, phần hiển thị gọn bên trong VoiceDistanceFinder, và kiểm thử mới. Header, Footer, các nút nổi toàn site và trang khác không thay đổi.

- Bố cục desktop: cột công cụ bên trái, bản đồ OpenStreetMap tương tác bên phải.
- Cột trái: 3 chế độ Chỉ đường/Khám phá/Lớp bản đồ; chọn điểm xuất phát, cấp quyền GPS, chọn điểm đến, mở Google Maps để xem tuyến đường ngoài WayEcho.
- Micro: sử dụng bộ nhận dạng giọng nói trình duyệt có sẵn, với ô nhập văn bản thay thế.
- Bản đồ: tìm tên trong các điểm đang bật; tắt/bật lớp, nhấp pin để xem chi tiết; nhấp thẻ địa điểm để bản đồ tập trung vào địa điểm.
- Bên dưới: 3 lớp dữ liệu, 4 điểm nổi bật, hướng dẫn 3 bước.
- Không tự bịa tuyến đi bộ, ETA hoặc dữ liệu khảo sát tiếp cận. Nếu dịch vụ chưa có tọa độ xác minh, không hiển thị pin giả.
- Header/Footer/TravelerWidgets được render từ app/layout.jsx hiện có, không copy hoặc sửa.

Kiểm thử: 125/127 test đạt. 2 test thất bại liên quan yêu cầu menu Header cũ đã được thay đổi ở các phiên trước. Chưa chạy build Next.js hoặc thử trực quan trình duyệt vì thiếu node_modules trong môi trường.
