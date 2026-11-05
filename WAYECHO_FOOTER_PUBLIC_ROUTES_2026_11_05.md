# Điều hướng Footer trên toàn website công khai

- Trang chủ, khám phá, dịch vụ, đặt chỗ, giới thiệu và sứ mệnh cùng sử dụng Footer khách hàng trong RootLayout.
- Logo Footer và breadcrumb giới thiệu đều dẫn về `/`.
- `Giới thiệu dự án` dẫn `/about`; `Sứ mệnh và tầm nhìn` dẫn `/mission`.
- Bỏ nút tự đăng nhập Admin qua Footer khách hàng (vì không phù hợp yêu cầu phân tách cổng).
- `/admin` và các cổng nghiệp vụ vẫn tồn tại, nhưng sử dụng layout/điều hướng độc lập và không render Footer công khai thông qua `isInternalPortalPath`.
- Giữ cổng đối tác tại `/partner` và các luồng liên quan.
