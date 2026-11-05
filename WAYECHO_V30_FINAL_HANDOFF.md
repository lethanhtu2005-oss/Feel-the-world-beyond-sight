# WAYECHO V30 — Bàn giao giao diện Header và ảnh

## Header công khai (Customer)

Thanh điều hướng: **Điểm đến | Dịch vụ | Blog & Trải nghiệm | Hỗ trợ | Đối tác**.

Bên phải: **Nút trợ năng | Chuông thông báo (/notifications) | Biểu tượng người (dropdown Customer)**. SOS không xuất hiện ở Header, vẫn còn trong chức năng hỗ trợ và nút SOS riêng.

Dropdown tài khoản Customer:
- Khi chưa đăng nhập: Đăng nhập khách hàng (`/login`), Hồ sơ tiếp cận trên thiết bị (`/profile`), Đặt chỗ của tôi (`/my-booking`), Chuyến đi của tôi (`/my-trip`).
- Khi đăng nhập Customer: Hồ sơ, Đặt chỗ, Chuyến đi, Đăng xuất/Chuyển tài khoản.
- Đối tác/Guide đăng nhập tại **Đối tác → Đăng nhập đối tác** (`/partner/login`). Nhân viên nội bộ mở riêng `/internal/login`.
- Trang `/login` chỉ nhận vai trò `traveler` ở phía server, không chỉ kiểm tra trên giao diện.

## Ảnh và Footer

- 15 mục ảnh gallery, khác với 4 ảnh thẻ và 4 ảnh chi tiết, theo danh mục trong source.
- Gallery ẩn những ảnh không tải được và không hiển thị placeholder; lightbox không hiển thị nguồn.
- Dẫn chiếu, thông tin bản quyền ảnh ở `/photo-credits`, liên kết trong footer.
- Giữ nền footer nâu–kem theo nhận diện WayEcho.

## Kiểm thử

- `node --test tests/*.test.mjs`: 91/91 đạt trên mã nguồn trong bản bàn giao.
- ZIP CRC: kiểm tra riêng khi đóng gói.
- Chưa xác nhận build Next.js hoặc E2E trình duyệt do môi trường không cài được Next.js CLI.
- Máy chạy kiểm thử không phân giải được tên miền Wikimedia, vì vậy **chưa xác minh được URL ảnh trả HTTP 200**. Khi triển khai trên Vercel cần thử gallery trên thiết bị có Internet, kiểm tra trang nguồn và giấy phép từng tệp.
- Dữ liệu trên Vercel có thể lưu tạm theo instance nếu chưa cấu hình database chung. Không gọi đây là bản production hoàn thiện.
