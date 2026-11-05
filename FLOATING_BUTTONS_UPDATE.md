# Cập nhật cụm nút nổi - SOS / Tư vấn viên / Trợ lý AI

- Nguồn thiết kế: ảnh số 1 người dùng cung cấp ngày 05/11/2026.
- Tách **đúng hình đồ họa gốc** từ ảnh, chuyển thành 3 tệp WebP đặt tại `public/assets/images/floating-controls/`.
- Thay **chỉ hình dáng** ba nút nổi trong `FloatingSOS.jsx`, `ConsultantWidget.jsx` và `WayEchoAIWidget.jsx`.
- Giữ nguyên onClick, đường dẫn `/sos`, các hộp thoại, logic camera / AI / tư vấn và phân quyền cổng nội bộ.
- Desktop: 100px ngang; mobile: 86px ngang. Nút xếp dọc, có khoảng cách và vị trí điều chỉnh tránh MobileNav.
- `img` có alt rỗng vì hình chứa chữ chỉ mang tính trang trí; nút có aria-label riêng cho trình đọc màn hình.
- **Không sửa bất kỳ khu vực nào khác trên trang chủ.**
