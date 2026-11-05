# WayEcho V18 – thực hiện và giới hạn nghiệm thu

ĐÃ THỰC HIỆN:
- Thêm collection escrow vào cơ chế lưu trữ máy chủ hiện tại.
- Chỉ tạo giao dịch escrow DEMO khi đơn tour có chọn HDV. Liên kết bookingId, ownerId, guideId.
- API /api/escrow GET/POST kiểm tra vai trò và quyền xem, cập nhật trạng thái bên trong transaction.
- Màn khách, HDV, quản trị dùng chung API thay vì ba bản sao localStorage.
- Không còn nút tạo giao dịch Escrow rời đơn đặt.
- Bộ quy tắc check-in hai phía; đóng tranh chấp không tự giải ngân; duyệt rút chỉ ở admin.

CHƯA ĐẠT TIÊU CHUẨN TRIỂN KHAI THỰC TẾ:
- Chưa tích hợp nhà cung cấp thanh toán, ví được cấp phép, chi hộ và webhook đối soát xác thực.
- Giá demo 300.000đ và phí 10% là giả định. Không thu/chuyển tiền.
- Storage hiện tại chỉ dùng local-single-host hoặc memory trên Vercel (KHÔNG bền, không multi-instance). Cần PostgreSQL có transaction và migration trước khi production.
- Mẫu guide chưa có danh tính, thông tin ngân hàng và phân công nhân sự xác thực.
- Cần RBAC được kiểm thử end-to-end, audit log bất biến, chống gian lận, idempotency, hoàn tiền, chính sách khiếu nại và kiểm tra bảo mật.
- Chưa đạt lời hứa triển khai thực tế. Không được sử dụng cho thanh toán thật.
