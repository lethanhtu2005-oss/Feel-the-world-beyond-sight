# WayEcho V7 - Sửa luồng khách hàng (05/11/2026)

## Bảo toàn giao diện
- Không chỉnh sửa `components/Header.jsx` và `components/Footer.jsx` (SHA-256 được đối chiếu với bản ZIP đầu vào và trùng khớp).
- Không đưa thiết kế onboarding mới vào website.

## Các thay đổi
1. Đơn không còn tự được coi là đã trải nghiệm khi ngày hẹn đã qua. Chỉ `completed` mới mở nút đánh giá. Business/Admin xác nhận hoàn thành sau ngày dịch vụ; các tour có ký quỹ cần khách xác nhận hoàn thành.
2. API đánh giá đòi hỏi khách đăng nhập, `bookingId` thuộc đúng khách và dịch vụ đã hoàn thành; mỗi đơn chỉ đánh giá một lần. Trang đánh giá kiểm tra điều kiện và hiển thị lỗi rõ ràng.
3. Trang đặt xe cho phép khách đặt xe độc lập hoặc tùy chọn liên kết đơn đã đặt; vẫn bắt đăng nhập theo `proxy.js` và API.
4. Booking bổ sung đầy đủ nhu cầu hỗ trợ dịch vụ từ hồ sơ (thang máy, di chuyển, lên/xuống xe, tham quan...). Các cài đặt giao diện như cỡ chữ, tương phản không chia sẻ cho business. Quyền chia sẻ mặc định tắt cho từng booking.
5. Dữ liệu hồ sơ cá nhân, avatar, liên hệ SOS và gợi ý trợ năng được tách theo user.id trong localStorage của từng phiên tài khoản. Không tự chuyển dữ liệu localStorage cũ giữa tài khoản, nhằm tránh nhầm chủ sở hữu. Không đồng bộ đa thiết bị vì chưa có backend hồ sơ.
6. Dòng hướng dẫn 'đơn gắn với trình duyệt khi chưa đăng nhập' đã được bỏ. API client cho booking không dùng bản sao localStorage có nguy cơ rò dữ liệu giữa các tài khoản.

## Kiểm thử
- `npm test`: 124/129 đạt, 5 bài chưa đạt đều là kỳ vọng cũ đối với Header/Footer; hai phần này không được thay đổi.
- 11 file JSX/JS vừa sửa được kiểm tra cú pháp bằng TypeScript parser: không thấy lỗi cú pháp.
- Không chạy được Next.js production build và E2E browser do môi trường không có đủ dependencies npm trong cache offline.
- Dữ liệu giao dịch vẫn là mô phỏng; dữ liệu của môi trường demo lưu bộ nhớ server có thể mất khi reset. Việc tắt bản sao localStorage riêng cho booking tránh hiển thị đơn của tài khoản khác, nhưng không khắc phục hạn chế lưu trữ server demo.

## Điều cần kiểm thử khi deploy
- Guest -> Đặt dịch vụ/đặt xe -> Login -> Trở lại đúng URL, giữ item/guide.
- Khách 1 và khách 2 cùng trình duyệt: không đọc được booking/hồ sơ của nhau.
- Business xác nhận đơn, hoàn thành khi đã đến ngày; khách chỉ đánh giá sau khi hoàn thành; một đơn không đánh giá trùng.
- Hồ sơ lưu tùy chọn hỗ trợ -> Booking gợi ý đúng tùy chọn -> Khách chủ động bật chia sẻ -> Business nhận yêu cầu đã chọn.
- Đặt xe không cần đơn dịch vụ khác; nếu có đơn, liên kết là tùy chọn.
