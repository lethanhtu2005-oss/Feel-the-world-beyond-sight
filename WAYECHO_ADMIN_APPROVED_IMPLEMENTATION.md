# WAYECHO ADMIN - BẢN TÍCH HỢP THIẾT KẾ ĐÃ DUYỆT
Ngày: 05/11/2026

## Phạm vi
- Mã nguồn nền: WayEcho_V7_Tinh_Nguyen_Vien_8_Trang_Dong_Bo_Luong.zip (giữ các cổng Khách, HDV, Tình nguyện viên, Doanh nghiệp, Đối tác).
- Sidebar Admin gồm 8 nhóm chính như mẫu chốt: Tổng quan; Điều phối & Hỗ trợ; Người dùng; Đối tác & Dịch vụ; Nội dung & Bản đồ; Vận hành hệ thống; Báo cáo & Thống kê; Cấu hình & Phân quyền.
- Các màn hình đã duyệt (ảnh gốc lưu tại docs/admin-approved-reference): Tổng quan dài; Trung tâm tư vấn; Quản lý đối tác; Yêu cầu hợp tác; Đánh giá & Phản hồi; Escrow; Theo dõi xe.
- Logo dùng chính biểu tượng /public/assets/brand/logo.png từ nguồn website và wordmark WayEcho (Way tối, Echo cam), nền trắng-kem-vàng; Radar giữ nền tối.
- Route Admin: /admin, /admin/dispatch, /admin/consultation, /admin/users, /admin/businesses, /admin/inquiries, /admin/content, /admin/moderation, /admin/operations, /admin/escrow, /admin/ride-demo, /admin/reports, /admin/settings.
- Đánh giá: khách đăng được ngay; GET /api/reviews không trả đánh giá đã ẩn; GET/PATCH /api/admin/reviews yêu cầu quyền admin, ghi lý do và nhật ký. Đây là soft-hide, có thể khôi phục.
- Escrow: kết nối API Escrow có sẵn; duyệt hoàn tiền, giải quyết tranh chấp, rút tiền chỉ theo trạng thái và quyền hạn được API cho phép. Không thu/chuyển tiền thật, không có sổ ký quỹ doanh nghiệp thực tế.
- Theo dõi xe: sử dụng GET/PATCH /api/ride-demo, bản đồ vẽ lộ trình minh họa; không có GPS thật.
- Trung tâm tư vấn: hàng đợi, phân công và tin nhắn mô phỏng trên trình duyệt; link tới /staff/consultation để dùng phiên WebRTC đang có, không tự nhận phiên hay bật camera.

## QA
- Cú pháp JSX: 16/16 tệp Admin mới và sửa đã parse thành công với TypeScript parser.
- Bộ test cũ: 124/134 đạt, 10 không đạt. Nhiều test còn yêu cầu bố cục Header/Footer cũ đã bị thay đổi theo quyết định trước đó; test nguồn trang xe cũ cũng không còn phù hợp với cấu trúc component mới.
- Không chạy được Next.js build và kiểm thử trình duyệt: môi trường thiếu node_modules hoàn chỉnh; npm ci không hoàn tất.
- ZIP đã đóng, kiểm tra CRC và tính tồn tại của route. Chưa triển khai lên Vercel.

## Lưu ý quan trọng
- Dữ liệu Vercel demo ở chế độ memory có thể mất khi instance khởi động lại, không đồng bộ giữa instances.
- Ảnh đã duyệt là tài liệu tham chiếu thiết kế; giao diện web được dựng bằng JSX/CSS có thể khác từng pixel so với ảnh mockup, không phải ảnh tĩnh thay thế chức năng.
- Khi triển khai thực tế cần cơ sở dữ liệu bền vững, audit log bất biến, thanh toán Escrow thực, GPS thật/đồng ý vị trí, xác minh pháp lý đối tác, quy trình phân quyền nhiều cấp.
