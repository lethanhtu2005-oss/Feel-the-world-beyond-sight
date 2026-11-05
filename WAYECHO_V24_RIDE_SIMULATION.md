# WayEcho V24 – mô phỏng đặt xe liên thông

## Những gì chạy trong prototype
- Trang khách `/services/ride-booking`: nhập điểm đón/đến bằng bàn phím hoặc mic tiếng Việt khi trình duyệt hỗ trợ; chọn Grab/be/Xanh SM mô phỏng; thêm nhu cầu trợ năng; đồng ý sử dụng dữ liệu demo; tạo mã chuyến và xem tình trạng.
- Trang điều phối `/admin/ride-demo`: xem yêu cầu trong cùng trình duyệt, ghép tài xế mô phỏng, thay đổi trạng thái tới điểm đón, đang đi, hoàn tất hoặc hủy. Có lịch sử trạng thái.
- Trạng thái của hai trang liên thông bằng localStorage và sự kiện `storage` khi mở ở nhiều tab cùng origin, không đồng bộ hai máy riêng.
- Nút sao chép yêu cầu và đường dẫn đến các trang chính thức của Grab, be, Xanh SM được giữ lại như một lựa chọn độc lập.
- TTS chỉ phát khi thiết bị có giọng tiếng Việt, không chọn giọng nước khác; thông báo bằng chữ vẫn luôn hiện.
- Khách có thể đánh giá trải nghiệm mô phỏng sau khi chuyến kết thúc.

## Giới hạn bắt buộc khi trình bày với giảng viên
- Không có API hợp tác, tài xế/biển số/tên đối tác xuất hiện trong prototype chỉ là hư cấu. KHÔNG CÓ XE THẬT, GIÁ XE THẬT, TÀI XẾ THẬT HOẶC THANH TOÁN THẬT.
- `localStorage` không phải backend production. Cổng điều phối demo không có xác thực phân quyền production. Không dùng để điều phối thật.
- GPS không thể xác minh đứng trên vỉa hè an toàn; AI không được chỉ đường. Trước khi di chuyển, người dùng khiếm thị cần dùng gậy dò và có thể nhờ tư vấn viên/người hỗ trợ.
- Việc gửi ghi chú trợ năng đến tài xế thật chỉ thực hiện khi đối tác chính thức hỗ trợ và được người dùng đồng ý. Trong V24 không có truyền dữ liệu cho đối tác.
- Kiểm thử `node --test tests/*.test.mjs` đạt 64/64 trên môi trường tác giả; build Next.js và kiểm thử browser/thiết bị thực chưa được xác nhận.

## Cách demo 2 màn hình
1. Mở hai tab cùng trình duyệt tại `/services/ride-booking` và `/admin/ride-demo`.
2. Tab khách tạo chuyến mới với thông tin giả.
3. Tab điều phối bấm `Ghép tài xế demo`, `Tài xế đến đón`, `Bắt đầu chuyến`, `Kết thúc chuyến`.
4. Chuyển sang tab khách để nhìn trạng thái được cập nhật; đánh giá trải nghiệm.
5. Mở Blog bài di chuyển và bấm thẻ `Đặt xe` để thấy luồng chuyển đến trang mới.
