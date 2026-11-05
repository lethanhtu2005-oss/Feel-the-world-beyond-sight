# WayEcho — ghi chú demo tại chân trang và sửa quyền nhận thông báo

- Chuyển StorageNotice từ trên Header xuống sau Footer trong root layout. Ghi chú nhỏ, không che nội dung; giữ cảnh báo lưu dữ liệu tạm trên cả các cổng nội bộ (có footer riêng).
- API /api/bookings: thông báo doanh nghiệp là thông báo theo businessId, không mạo nhận ownerId của khách.
- API /api/notifications: lọc theo businessId với doanh nghiệp, ownerId với khách/HDV/tư vấn; admin lọc theo quyền admin, không lộ doanh nghiệp khác.
- Không thay đổi font Blog, thiết kế các trang, SOS, giao dịch hay dữ liệu demo.
- Bản ZIP cần triển khai lên Vercel mới phản ánh trên website trực tuyến.
