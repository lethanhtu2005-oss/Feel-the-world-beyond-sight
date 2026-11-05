# WayEcho V17 – Escrow Prototype

- Đây là mô phỏng, không tạo ví điện tử, không giữ hoặc chuyển tiền thật.
- Khách: `/my-booking` → thanh toán demo → check-in → xác nhận hoàn tất / báo sự cố.
- HDV: `/guide/profile` → check-in → hoàn thành → số dư khả dụng → yêu cầu rút.
- Admin: `/admin` → xử lý tranh chấp → duyệt rút demo.
- Check-in hai phía là điều kiện chuyển sang đang thực hiện.
- HDV không thể tự giải ngân: phải có xác nhận hoàn thành của khách.
- Có tranh chấp: đóng băng giải ngân, admin chỉ có thể xử lý hoặc đánh dấu hoàn tiền demo.
- Không tự giải ngân sau 24 giờ; không tự duyệt rút.
- Phí nền tảng 10% chỉ là giả định minh họa.
- Dữ liệu dùng localStorage và đồng bộ tab cùng origin, KHÔNG đồng bộ giữa thiết bị, tài khoản hoặc máy chủ. Không dùng cho giao dịch thật.
- V17 vẫn chưa tích hợp vào toàn bộ backend booking đang có. Cần liên kết qua bookingId, phân quyền xác thực, kiểm tra callback thanh toán, cơ chế idempotency, transaction ledger và audit log trước khi triển khai thật.
- Không triển khai pháp lý Escrow; cần đối tác thanh toán phù hợp và rà soát pháp lý trước giao dịch thực.
