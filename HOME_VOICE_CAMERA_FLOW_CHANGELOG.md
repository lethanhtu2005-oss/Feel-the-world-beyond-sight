# WayEcho – sửa luồng tìm kiếm Trang chủ (05/11/2026)

Phạm vi chỉ gồm app/page.jsx, components/HomeDiscoverySearch.jsx và listener mở camera trong components/WayEchoAIWidget.jsx.

- Thanh tìm kiếm Trang chủ tự hiển thị tối đa 8 kết quả từ catalog, với đường dẫn đúng tới điểm đến hoặc sản phẩm dịch vụ; gợi ý nhanh thực sự kích hoạt tìm kiếm.
- Micro sử dụng Web Speech API (vi-VN), có nút dừng, trạng thái nghe và thông báo khi không có quyền/hỗ trợ.
- Camera mở cùng Trợ lý AI nổi có sẵn bằng sự kiện wayecho:open-ai-camera; yêu cầu quyền camera khi bấm. Không tạo trợ lý thứ hai.
- Các nút nổi SOS, Tư vấn viên, Trợ lý AI giữ nguyên trong TravelerWidgets.
- Không sửa hoặc xóa /search ở lượt này vì những phần khác của website có thể vẫn liên kết tới trang cũ.
- Các phản hồi giọng nói phụ thuộc quyền và khả năng Web Speech API của trình duyệt; Camera AI phụ thuộc HTTPS, quyền camera và API /api/ai-assistant.

Kiểm thử: 2/2 test mới đạt. Bộ test đầy đủ 118 ca: 116 đạt, 2 ca thất bại trước đó do kỳ vọng menu Header cũ. Không build Next.js được vì thiếu gói npm offline.
