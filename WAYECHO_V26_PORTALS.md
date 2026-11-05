# V26 – Phân vai 3 cổng và luồng đăng nhập

- Customer giữ nguyên tại `/`.
- Partner gateway `/partner`, đăng nhập chung `/partner/login`, điều hướng theo server role `guide` → `/guide`, `business` → `/business`. Dashboard cũ giữ lại để tránh đứt chức năng. Đổi tài khoản cần đăng xuất (cookie HttpOnly).
- Internal login `/internal/login`; role `admin` → `/admin`; role `advisor` → `/admin/consultation`. Advisor không được mở các route quản trị `/admin/*` khác.
- Cổng tư vấn vẫn dùng WebRTC demo, và tín hiệu theo vai `advisor` phải xác thực qua server; room dùng mã phiên khách chủ động chia sẻ. Không khẳng định có người trực thật.
- Tài khoản demo cần cấp tại server qua `WAYECHO_USERS` hoặc CLI (passwordHash scrypt). Không thêm mật khẩu mặc định vào code. Khuyến nghị dùng localhost và dữ liệu giả để mô phỏng.
- Các booking và cập nhật Guide/Business trong source cũ có chỗ là demo/in-memory, chưa đảm bảo đồng bộ nhiều thiết bị hoặc thanh toán thực.
- `admin` vẫn truy cập Trung tâm tư vấn để giám sát/đào tạo; `advisor` chỉ có quyền tư vấn. Thay đổi vai trò không được làm chỉ bằng tab giao diện.
