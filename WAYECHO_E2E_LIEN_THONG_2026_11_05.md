# WayEcho V7 - Rà soát liên thông đặt dịch vụ (2026-11-05)

## Phạm vi đã sửa

1. Tất cả dịch vụ đặt chỗ (lưu trú, ẩm thực, tour, vé) có `businessId` tới hộp thư DEMO **riêng theo dịch vụ**, không gán nhầm thương hiệu/đối tác thật. Mặc định `pending`, hiển thị rõ đây là yêu cầu DEMO chưa được nhà cung cấp thực tế xác nhận.
2. `Footer > Cổng đối tác liên thông > Doanh nghiệp`: thêm lựa chọn dịch vụ mô phỏng cần kiểm tra, giữ giao diện đã duyệt. Session có chữ ký HMAC gắn `businessId`; không thể chuyển phạm vi dữ liệu bằng query string.
3. `Khách > Đặt chỗ của tôi`: xem đơn mới và phản hồi; doanh nghiệp nhận trong Đặt chỗ & Yêu cầu, xác nhận/từ chối và thông báo trạng thái. Quyền doanh nghiệp chỉ áp dụng cho hộp thư đã chọn.
4. Loại trùng ID dịch vụ Di chuyển khỏi catalog. Sáu phương tiện có `provider` nhất quán theo phương tiện và hộp thư DEMO; Admin điều phối/trả trạng thái, cổng doanh nghiệp liên quan xem được yêu cầu xe nhưng không tự gán tài xế.
5. Nút không hoạt động ở Quản lý dịch vụ (Sửa/Tạm ngừng/Cập nhật khai báo) thay bằng các liên kết xem dịch vụ/đơn/hồ sơ. Không xóa route. Menu Quản lý phòng chỉ xuất hiện với đối tượng lưu trú.
6. Trang Tổng quan doanh nghiệp hiển thị dịch vụ đang chọn (thay vì cố định 4 thẻ không liên quan), thống nhất nhãn trạng thái tiếng Việt. Trang thống kê không tính giá khoảng/giá thỏa thuận thành doanh thu.
7. Sửa nút chuông ở Cổng HDV để mở thông báo. Cải thiện tên nút và từ tiếng Việt trong biểu mẫu.

## Kiểm tra

- 147/147 bài kiểm thử tự động đạt, bao gồm luồng khách đặt tất cả dịch vụ, hộp thư nhận đơn đúng, chặn hộp thư không thuộc phạm vi, cập nhật trạng thái và 6 phương tiện.
- 230 tệp JS/JSX/TS/TSX phân tích cú pháp không lỗi.
- Quét nút JSX cơ bản: 0 nút `<button>` khả nghi không có hành động ngoài submit hoặc nút disable. Đây KHÔNG phải kiểm thử toàn bộ tương tác runtime.

## Giới hạn cần giữ rõ trong báo cáo

- Chưa build Next.js / chạy Playwright hoặc thử toàn bộ trên trình duyệt: môi trường không có thư viện Next.js đã cài đủ. Vì vậy KHÔNG thể chứng nhận 100% tương tác thực tế.
- Dữ liệu API demo mặc định Vercel có thể mất hoặc khác nhau giữa các phiên serverless. Để vận hành thật cần cơ sở dữ liệu dùng chung bền vững.
- Không phát sinh thanh toán, đối tác thật, đặt xe thật, tài xế thật, GPS thật hay xác minh trợ năng thật.
