# WayEcho - Kiểm tra liên thông luồng khách hàng (05/11/2026)

## Phạm vi
Không sửa components/Header.jsx, components/Footer.jsx, app/onboarding hoặc cổng đối tác.

## Các điểm chạm đặt dịch vụ đã đối chiếu
- app/item/ItemView.jsx -> /booking?item=...
- app/destination/DestinationView.jsx -> /booking?item=... và /services/ride-booking
- app/services/guides/page.jsx -> /booking?item=...&guide=...
- app/my-booking/page.jsx -> /booking?item=... (đặt lại)
- components/ExploreTransitGuide.jsx -> /services/ride-booking
- components/BlogServiceSidebar.jsx -> /services/ride-booking
- app/booking/page.jsx -> /services/ride-booking
- components/Footer.jsx -> /services/ride-booking (giữ nguyên)

## Cơ chế tập trung hiện có
- proxy.js yêu cầu phiên traveler không phải guest tại /booking và /services/ride-booking.
- Chưa đăng nhập: chuyển /login?next=<đường dẫn + query string>&booking=1.
- LoginForm.jsx dùng safeNext để quay lại đúng đường dẫn + thông tin item/guide.
- POST /api/bookings và POST /api/ride-demo: từ chối guest (401), không chỉ chặn giao diện.
- Trang /login là cổng khách riêng, cổng HDV/Business có các trang riêng.
- Header khách hiển thị 'Tài khoản của tôi' với menu chung từ một component.

## Test
- Cập nhật tests/p0-b.test.mjs: hai kịch bản cũ cho guest đặt booking không còn đúng chính sách mới. Thay bằng kiểm tra guest bị 401, traveler tạo được đơn, tách biệt quyền xem/hủy, và thử lưu trên Vercel bằng phiên demo traveler có chữ ký.
- Chạy riêng p0-b.test.mjs: 18/18 đạt.
- Chạy toàn bộ: 124/129 đạt; 5 test còn lại gắn Header/Footer hoặc điều kiện kiểm tra tên/link cũ: #100, #107, #109, #111, #117. Không thay đổi Header/Footer để chiều theo test cũ.

## Giới hạn
- Chưa chạy kiểm thử E2E bằng trình duyệt hoặc deploy Vercel.
- Đăng nhập hiện là DEMO, không đại diện cho xác thực tài khoản thực tế.
