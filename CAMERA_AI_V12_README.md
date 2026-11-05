# WayEcho V12 - Trợ lý AI Camera

- Hai nút riêng biệt bên phải: Tư vấn viên (trên), Trợ lý AI (dưới).
- Mở trợ lý: cửa sổ nổi, camera làm nền; tin nhắn xuất hiện đè trên camera.
- Camera thật: getUserMedia, chỉ mở khi bấm 'Bật camera', HTTPS hoặc localhost, quyền cấp bởi người dùng; tắt khi đóng.
- Mic: Web Speech API vi-VN nếu trình duyệt hỗ trợ, nhận câu hỏi dạng văn bản để người dùng xác nhận và bấm Gửi.
- Đọc: speechSynthesis vi-VN; chọn voice tiếng Việt nếu thiết bị có cài, nếu không có thì chất lượng tiếng Việt phụ thuộc engine/OS. Có nút tắt tự đọc.
- Nhận diện: ảnh camera được chụp và gửi tới /api/ai-assistant khi người dùng yêu cầu, không tự phát liên tục. Cấu hình OPENAI_API_KEY trong Environment Variables của Vercel để bật AI Vision thực. Tuỳ chọn WAYECHO_VISION_MODEL (mặc định gpt-4.1-mini).
- Không cấu hình key: camera và chat UI hoạt động, có thông báo minh bạch AI chưa kết nối, không giả vờ đã nhận diện.
- Không dùng kết quả ảnh tĩnh để đảm bảo an toàn giao thông/định hướng người khiếm thị.
- Cần kiểm thử thủ công trên thiết bị thực, HTTPS, trình duyệt hỗ trợ camera/mic và voice tiếng Việt.
