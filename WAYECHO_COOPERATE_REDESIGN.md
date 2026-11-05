# Cập nhật trang Hợp tác cùng WayEcho

- Trang: `/partners/cooperate`, không đổi route.
- Thiết kế lại dựa trên văn bản người dùng: lợi ích doanh nghiệp, thông tin trợ năng, nhu cầu hỗ trợ, nguyên tắc trung thực, lời mời hợp tác.
- Không tự tạo nhà cung cấp đã xác minh, số hotline hay tuyên bố ký hợp đồng; không cam kết email hoạt động.
- Nút liên hệ chuyển `/contact`; cổng liên thông chuyển `/partner`.
- Giữ `InterestForm`: chỉ gửi dữ liệu nếu `WAYECHO_INQUIRIES_ENABLED=1`.
- Các route `/partners/business` và `/partners/guide` vẫn giữ, nội dung kỹ thuật được viết lại tự nhiên.
- Sử dụng ảnh có sẵn trong dự án, ảnh có alt, thiết kế responsive, đủ nhãn và focus.
