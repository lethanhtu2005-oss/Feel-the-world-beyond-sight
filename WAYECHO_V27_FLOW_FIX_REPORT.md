# WayEcho V27 — sửa các luồng demo, giữ nguyên lựa chọn database của V26

## Đã thay đổi
1. Đặt xe demo: `app/api/ride-demo/route.js` mới, dữ liệu lưu qua `lib/store.js` (file JSON một máy chủ local hoặc memory ở Vercel); Customer POST/GET/PUT, Admin GET/PATCH; lọc chuyến theo owner; từ chối nhảy trạng thái và đánh giá trước khi hoàn thành. Hai trang đều lấy dữ liệu từ API 4 giây/lần, không còn dùng localStorage làm nguồn chính. Đây vẫn là mock hãng vận chuyển, chỉ role admin mô phỏng điều phối; chưa có tài khoản hãng vận chuyển riêng.
2. Escrow: luồng thật của V26 đã dùng `/api/escrow` và server-side ledger. Giữ nguyên nghiệp vụ và bổ sung tự reload 5 giây/lần; `lib/escrowDemo.js` là mã cũ không dùng cho các trang chính.
3. Tư vấn video: thay signaling Map theo tiến trình bằng store `consultations` với TTL 25 phút, giới hạn số sự kiện, và yêu cầu quyền advisor/admin cho thao tác phía tư vấn. Chỉ hoạt động khi cùng một instance memory hoặc chế độ file local-single-host; chưa hỗ trợ đa-instance Vercel, chưa có TURN hoặc bảo đảm xuyên NAT.
4. Kiểm thử: 74/74 Node unit/static tests đạt. Không kiểm thử browser end-to-end vì Next.js CLI không có trong môi trường; `npm run build` dừng ở `next: not found` (exit 127).

## Cảnh báo bắt buộc
- Theo yêu cầu không sửa Database (vấn đề 1), Vercel mặc định lưu MEMORY theo instance: KHÔNG đạt đồng bộ xuyên instance, không bền vững sau cold-start. Dùng local-single-host có thể demo trên 2 thiết bị nối cùng máy chủ và có chung tài khoản, nhưng không phải triển khai production.
- Khách không đăng nhập thực có cookie guest gắn với một trình duyệt; muốn xem cùng dữ liệu trên máy khác phải triển khai cloud account/auth dùng chung.
- Cổng Admin hiện thao tác sự kiện hãng xe *mô phỏng*, không phải app tài xế thật.
- Không có API gọi xe hoặc thanh toán thật, không được dùng SOS/Camera như dịch vụ an toàn thực địa.

## Test local
`npm ci` (cần kết nối internet để cài dependencies), `npm test`, `npm run build`, `npm run dev`.
Test role: dùng tài khoản demo tự cấp trong `WAYECHO_USERS` đã hash mật khẩu; không đưa mật khẩu/secret vào GitHub.
