# WayEcho - Cổng đối tác từ Footer

## Phạm vi chỉnh sửa
- Xóa riêng danh mục 'Đối tác' trong Header khách hàng (desktop và mobile vì dùng chung NAV).
- Giữ nguyên các danh mục Header khác và bố cục Footer đã chốt.
- Giữ đường dẫn Cổng Đối tác Liên thông ở Footer tới `/partner`, chỉ nhấn mạnh liên kết để dễ nhận biết.
- Trang `/partner` dùng giao diện chọn vai trò theo ảnh duyệt; các trường email/mật khẩu chỉ minh họa và không yêu cầu nhập.
- Nút truy cập sử dụng lại PartnerEnter hiện có: Hướng dẫn viên -> `/guide`, Tình nguyện viên -> `/volunteer`, Doanh nghiệp -> `/business`.
- Không thay đổi luồng khách hàng, đặt xe độc lập, booking, profile, onboarding hoặc các cổng công việc hiện có.

## Lưu ý về bản demo
- Hệ thống đang sử dụng demo auth. Do vai trò riêng `volunteer` chưa có trong bộ quyền demo cũ, Tình nguyện viên dùng phiên demo `guide` để vào `/volunteer` như phiên bản nền.
- Chưa kiểm tra bằng trình duyệt chạy Next.js do môi trường không có node_modules; chỉ kiểm tra bằng code và bộ test nguồn hiện có.
- Một số kiểm thử cũ kỳ vọng Header vẫn có liên kết Partner, trái với yêu cầu chuyển vào Footer. Không chỉnh Header để làm chúng đạt.
