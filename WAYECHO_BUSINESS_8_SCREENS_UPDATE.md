# WayEcho · Cổng doanh nghiệp 8 màn hình (05/11/2026)

- Giữ nguyên `/partner`, `/guide`, `/volunteer`, toàn bộ cổng khách hàng.
- Cổng doanh nghiệp dùng sidebar thống nhất 8 mục. `/business/bookings` có liên kết trực tiếp tới `/business/requests` để không làm mất luồng hỗ trợ.
- 8 mục: Tổng quan, Đặt chỗ & Yêu cầu, Quản lý dịch vụ, Quản lý phòng, Đánh giá & Phản hồi, Hồ sơ cơ sở, Thống kê & Báo cáo, Cài đặt.
- Booking/yêu cầu/hồ sơ/đánh giá dùng API demo hiện có. Quản lý phòng và cài đặt là mô phỏng có lưu `localStorage` theo businessId. Báo cáo thống kê dữ liệu booking của cơ sở, xuất CSV.
- Không tạo doanh thu, đánh giá, khách và giao dịch giả làm dữ liệu thực. Tên La Siesta chỉ là nhãn minh họa, KHÔNG khẳng định là đối tác WayEcho, không khẳng định địa chỉ/hạng sao/giá phòng.
- Chưa có đồng bộ giữa quản lý phòng và số lượng bán thực tế hay thanh toán thật.
