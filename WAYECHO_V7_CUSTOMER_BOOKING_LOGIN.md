# Quy tắc đăng nhập cổng khách WayEcho

- Menu tài khoản chung trong `components/Header.jsx`: luôn hiển thị **Tài khoản của tôi**, không hiển thị vai trò của cổng đối tác.
- Khách chưa đăng nhập vẫn xem dịch vụ, nội dung, điểm đến như bình thường.
- `proxy.js` bắt đăng nhập trước khi mở `/booking` hoặc `/services/ride-booking`, giữ nguyên query string qua `next`.
- `/login?booking=1` hiển thị thông báo; sau khi đăng nhập, `LoginForm` quay về đường dẫn `next` đã được `safeNext` kiểm tra.
- API POST `/api/bookings` và `/api/ride-demo` từ chối phiên guest (401), kể cả khi bỏ qua giao diện; không tác động cổng HDV.
- Đăng nhập DEMO của dự án vẫn là đăng nhập minh họa, chưa phải hệ thống tài khoản thật.
