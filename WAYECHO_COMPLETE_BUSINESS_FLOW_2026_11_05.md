# WayEcho – Đồng bộ nghiệp vụ và quản trị chi phí (05/11/2026)

- Đồng bộ giá demo HDV 350.000đ / 2 giờ ở danh sách, xác nhận đặt chỗ, API và Escrow. Giá trọn gói; phí kết nối đã nằm trong giá, khách không bị cộng thêm lúc thanh toán.
- `lib/serviceEconomics.js`: cấu hình và công thức thù lao / phí nền tảng / lãi góp minh họa cho HDV và TNV. TNV chưa có luồng booking khách chung với HDV, không tự nhận đã tích hợp thành đặt TNV thật.
- `api/bookings`: chốt giá demo từ cấu hình máy chủ, không tin giá/fee gửi từ browser; hash idempotency bao gồm HDV được chọn.
- Admin Report: thêm số đơn demo từ API phân quyền admin và nguồn lưu trữ, không nhầm với doanh thu thực nhận; bóc tách chi phí AI, trạm, bảo trì web, SEO, dự phòng và quảng cáo, cảnh báo CPA.
- KHÔNG vận hành thanh toán thật, trạm thật, HDV thật, SOS cứu hộ thật; Escrow chỉ là ledger demo.
- Mức phí HDV 12%, TNV 10% đều là giả định, cần thương lượng và thẩm định pháp lý/tài chính trước khi thương mại hóa.
- Chưa gắn GA4 / Google Ads vì thiếu property và cơ chế đồng ý phù hợp, không bật theo dõi nhạy cảm ngầm. Chưa có giới hạn chi phí AI tại API vì AI Camera hiện là minh họa không gọi API AI thật.
