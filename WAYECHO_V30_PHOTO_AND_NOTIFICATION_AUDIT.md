# WayEcho V30 — Audit ảnh, gallery và thông báo

## Đã chỉnh
- Gallery có 15 mục ảnh khác nhau đối chiếu theo danh mục tệp Wikimedia. Không đưa ảnh Chợ Đồng Xuân / Ô Quan Chưởng đã ở thẻ vào gallery.
- Thay ảnh thẻ Nhà cổ 87 Mã Mây bằng tệp có mô tả vị trí rõ `Maison longue traditionnelle (1).jpg`. Thay Hàng Mã bằng ảnh có tên địa danh rõ.
- Đổi ảnh ở trang chi tiết 4 địa điểm thành tệp riêng với ảnh thẻ (nhưng vẫn cùng đúng địa điểm).
- Ảnh ở phần hero `old-quarter-street.jpg` không còn trùng với phần mô phỏng màn hình điện thoại (thay bằng UI mẫu phi ảnh).
- Gallery sẽ loại phần tử ảnh lỗi, không thay ảnh lỗi bằng placeholder; cả lightbox cũng không hiển thị nguồn/credit.
- Tập trung 29 dẫn chiếu ảnh Commons trong mục `Nguồn ảnh & giấy phép` ở footer, dẫn đến `/photo-credits`.
- Header thay nút SOS lặp bằng chuông Thông báo dẫn đến `/notifications`; SOS nổi và luồng khẩn cấp ở nơi khác được giữ.
- Chuông nằm ngay bên trái biểu tượng người dùng. Nhấn biểu tượng người dùng để mở menu **chỉ dành cho Customer**: đăng nhập khách hàng, hồ sơ, chuyến đi và đặt chỗ. Đăng nhập Partner/Guide nằm trong menu Đối tác; tài khoản nhân viên WayEcho đăng nhập qua `/internal/login` riêng, không xuất hiện trong dropdown Customer. Server từ chối đăng nhập nhầm vai trò trên trang `/login`. Khi đã có phiên đăng nhập, menu hiển thị đúng vai trò và có hành động đăng xuất/chuyển tài khoản qua API.
- Gỡ câu khẳng định ảnh “đúng địa danh” tuyệt đối khi chưa xác thực nguồn thực địa.

## Giới hạn
- Danh sách gallery được chọn từ các tệp Wikimedia có thể tra cứu trên danh mục ảnh được công khai. Chưa kiểm chứng trực tiếp HTTP 200 từng URL ảnh khi chạy trên trình duyệt, vì máy hiện không truy cập được CDN ảnh. Gallery tự lọc khi ảnh không tải được; số ảnh hiển thị có thể thấp hơn 15 tùy kết nối.
- Các ảnh JPG nội bộ cũ chưa có đủ bằng chứng bản quyền / địa danh; không sử dụng để khẳng định địa chỉ.
- Vercel production build và E2E browser chưa xác nhận.
