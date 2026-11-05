# WayEcho V15 – Lọc dữ liệu trợ năng & Camera tư vấn viên

## Bộ lọc
- Mọi hạng mục danh mục đều dùng hàm `itemA11y` đọc `accessDetails` của từng dịch vụ; không còn đọc từ một tài khoản Business chung không khớp danh mục.
- Chế độ mặc định `Đã xác minh`: chỉ cho phép trả kết quả khi từng tiêu chí có `a11yVerified: true` và `accessEvidence[key].verified: true` kèm `accessEvidence[key].source` của chính cơ sở. Chưa nhập đủ nguồn sẽ ra 0 kết quả, **không bịa**.
- Chế độ `Dữ liệu minh họa`: cho phép thử lọc trên nhãn "Có" trong dữ liệu thử nghiệm. Không dùng để quyết định điều kiện đi lại.
- TODO: kiểm chứng trực tiếp từng cơ sở/tiêu chí, bổ sung thời điểm, nguồn và người xác minh. Tuyệt đối không gắn nhãn đã xác minh cho dữ liệu tự chế.

## Tư vấn viên camera
- Người dùng bấm Tư vấn viên -> đọc trạng thái prototype -> chủ động chọn Mở camera -> trình duyệt xin quyền -> hình video xuất hiện trên máy -> Tắt camera/đóng widget: ngừng toàn bộ tracks.
- Không tự bật camera, không bật microphone, không gửi hình qua mạng.
- Bản này **chưa có** cuộc gọi video, WebRTC, phòng tư vấn, kết nối tư vấn viên thật, token truy cập hay server signaling. Do đó hình camera chưa truyền đến tư vấn viên. Phải tích hợp dịch vụ gọi video và cơ chế xin phép chia sẻ riêng trước khi triển khai chức năng tư vấn từ xa thật.

## Phát hiện cần sửa tiếp
- Dữ liệu dịch vụ đã có nhiều tiêu chí trợ năng giả định nhưng không có nguồn xác minh. Không thể có bộ lọc "thật" khi chưa đi khảo sát hoặc lấy xác nhận từ cơ sở.
- Trong các phiên bản trước, một số điểm đến có `blind`, `stepFree`, `elevator` là "Có" dù chưa có bằng chứng. Các nhãn này phải được đánh dấu "minh họa" đến khi xác minh.
- Liên kết sang tư vấn viên không đồng nghĩa đã kết nối người thật.
- AI không phải công cụ dẫn đường; nếu khách cần di chuyển, khuyến cáo dùng gậy và người hỗ trợ phù hợp.
