# WayEcho V25 — Kiểm tra thẻ Blog, Partner và Admin (bản mô phỏng)

## 1. Mười thẻ Blog và đích đến

| Bài | Đường dẫn | Đích đến thực hiện |
|---|---|---|
| 1. Giới thiệu | `/explore?cat=accommodation` | Danh sách lưu trú |
| 2. AI Camera | `/contact` | Thông tin liên hệ (không tự nối tư vấn viên) |
| 3. HEAR YOUR WAY | `/services/guides` | Danh sách người đồng hành demo |
| 4. Hồ Gươm | `/destination?d=ho-guom` | Chi tiết Hồ Gươm |
| 5. Nhà cổ | `/destination?d=nha-co-87-ma-may` | Chi tiết Nhà cổ |
| 6. Ẩm thực | `/explore?cat=restaurant` | Danh sách nhà hàng |
| 7. Tuyến âm thanh | `/services/guides` | Hướng dẫn viên hỗ trợ |
| 8. Mạng lưới | `/services/guides` | Người đồng hành demo |
| 9. Xe | `/services/ride-booking` | Tạo chuyến demo; chọn đối tác Grab/be/Xanh SM mô phỏng và có liên kết đối tác thật riêng |
| 10. Trạm hỗ trợ | `/contact` | Thông tin liên hệ, **không khẳng định trạm có thật** |

Mỗi nút chính của thẻ dùng Next `Link` và tới một route hiện hữu. Nút ở thẻ đặt xe dẫn đến hệ thống mô phỏng trước; nút mở Grab/be/Xanh SM ở trang đặt xe chỉ mở website chính thức, không tự tạo đơn thực.

## 2. Partner = đối tác cung cấp dịch vụ, không phải Admin

**Đối tác khách sạn/nhà hàng:** `/partners/business` (giới thiệu, nộp quan tâm khi tính năng bật) → `/login` (tài khoản demo) → `/business` (tổng quan) → `/business/services` (dịch vụ, tiếp cận) → `/business/bookings` (đặt chỗ) / `/business/requests` (yêu cầu) → `/business/reviews` (đánh giá). Cổng đối tác không có quyền duyệt chính họ. Trong source hiện tại các nút Sửa/Tạm ngừng dịch vụ mới là UI demo, chưa có lưu trạng thái thực.

**Đối tác Guide:** `/partners/guide` → `/guide/login` → `/guide/profile` / `/guide/bookings` / `/guide/schedule`. Escrow demo không phải dòng tiền thật.

**Đối tác gọi xe:** Grab, be, Xanh SM là **nhà cung cấp độc lập giả lập**, không phải tài khoản `/business` trong mô hình V24; không có API và không có người lái xe thật. Giảng viên có thể xem trạng thái đối tác bằng `/admin/ride-demo`, nhưng đó là **màn mô phỏng kết quả API/webhook**, chưa phải cổng đăng nhập đối tác độc lập. Không được nói tài xế đã đăng nhập.

## 3. Admin = WayEcho kiểm soát nội dung, yêu cầu, sự cố

`/admin` → `/admin/businesses` (duyệt minh họa; màn hình hiện chưa lưu server) / `/admin/moderation` (kiểm duyệt dữ liệu tiếp cận và đánh giá) / `/admin/inquiries` (yêu cầu hợp tác) / `/admin/ride-demo` (điều phối **mô phỏng**) / sổ Escrow demo.

Đối với chuyến xe: Khách `/services/ride-booking` tạo chuyến `requested` → admin mô phỏng gán tài xế `assigned` → `arrived` → `in_progress` → `completed` hoặc hủy khi hợp lệ. Cập nhật đồng bộ **giữa các tab trong cùng trình duyệt** nhờ localStorage; không phải backend liên thông nhiều thiết bị. Khách có thể xem đánh giá và thông tin tài xế GIẢ LẬP sau khi gán. Không tính chuyến đã thanh toán thật.

## 4. Những vấn đề phát hiện cần ưu tiên tiếp theo

1. Admin hiện gộp vai trò điều phối mock với vai trò kiểm duyệt. Để mô phỏng API thuyết phục hơn, nên có màn `Ride Partner Simulator` độc lập và chỉ cho Admin **xem/giám sát**; đây là đề xuất cải tiến chứ chưa có sẵn trong V25.
2. `/admin/businesses` dùng state trong React và ghi chú DEMO: chưa lưu kết quả duyệt server. Không nên trình bày là workflow xác minh doanh nghiệp thực.
3. `/business/services` các nút chỉnh sửa/tạm ngừng chưa cập nhật dữ liệu dùng chung.
4. Cổng partner hiện mới tiếp nhận quan tâm nếu bật `WAYECHO_INQUIRIES_ENABLED=1`; không tự cấp tài khoản sau duyệt.
5. `/contact` chưa mở thẳng phiên video tư vấn: khách vẫn phải mở nút nổi tư vấn viên và tạo mã phiên.
6. Cần cơ sở dữ liệu chung, phân quyền role-based, audit log, API/webhook giả lập qua backend để mô phỏng trên nhiều máy; các test source không chứng minh toàn bộ những chức năng này chạy thực tế.

## 5. Quy tắc an toàn

Thông tin trợ năng của địa điểm và tài xế đang là dữ liệu DEMO chưa xác minh. AI chỉ mô tả, **không dẫn đường**. GPS không chứng minh được khách đứng trên vỉa hè an toàn. Hệ thống không được báo đã đặt xe thật hoặc nhận được thanh toán thật.
