# WayEcho V13 – Điều chỉnh và kiểm tra luồng

- Ba nút nổi bên phải, từ trên xuống: **SOS → Tư vấn viên → Trợ lý AI**. SOS mở `/sos`, không tự gọi cứu hộ; Tư vấn viên mở panel demo; AI mở camera/chat.
- AI chỉ mô tả, không chỉ đường, không đánh giá an toàn và không xác định chính xác chướng ngại tức thời. Chặn nhóm câu hỏi chỉ đường ở cả giao diện và API; luôn kèm khuyến nghị sử dụng gậy dò và hỗ trợ phù hợp.
- Nút nối sang Tư vấn viên mở panel và điền nội dung yêu cầu, **không** gửi tin nhắn tự động và **không** có người thật trực tuyến.
- Camera chỉ mở khi người dùng cấp quyền và sẽ tắt khi đóng. Hỏi đáp AI thực cần `OPENAI_API_KEY`. TTS dùng vi-VN, còn tùy giọng tiếng Việt sẵn trên thiết bị.
- **Cấn cần báo:** Cụm `Bản đồ / Điều hướng` của website có thể mang ngữ nghĩa AI dẫn đường; phải phân biệt đó là bản đồ thông tin/ước tính, không phải hướng dẫn an toàn. UI hỏi tư vấn viên về chỉ đường chưa có chat người thật: chỉ dùng để tạo yêu cầu và chuyển trang liên hệ.
- **Cần kiểm tra trực tiếp:** sự chồng lấn 3 nút với nút trợ năng/mobile, kiểm thử browser trên điện thoại, camera và voice. Chưa xác nhận build.
