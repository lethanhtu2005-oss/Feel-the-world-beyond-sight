# WAYECHO — LUỒNG TRANG CHỦ SAU CHỈNH SỬA

**Phiên bản:** HOME FLOW V3 · 03/11/2026
**Nguồn đối chiếu:** source Next.js trong gói, các thay đổi HOME-01/02/03 đã chốt.
**Phạm vi:** đường điều hướng bắt đầu từ Trang chủ. Không khẳng định các màn hình đích đã hoàn thiện nghiệp vụ.

## 00. Sơ đồ tổng quan

```mermaid
flowchart TD
 H[HOME · Trang chủ]
 H -->|Menu Điểm đến| D[Danh sách /destination]
 H -->|Tìm kiếm| S[Tìm kiếm /search]
 H -->|Bản đồ| N[Bản đồ /navigation]
 H -->|Menu Dịch vụ| V{Chọn loại dịch vụ}
 V --> A[Lưu trú /explore?cat=accommodation]
 V --> F[Ẩm thực /explore?cat=restaurant]
 V --> T[Di chuyển /explore?cat=transport]
 V --> G[Guide đồng hành /item?id=demo-guide-tour]
 V --> X[Vé tham quan /explore?cat=activity]
 H -->|Blog & Trải nghiệm| B[Danh sách bài /articles]
 H -->|Hỗ trợ| HE[/help hoặc /profile]
 H -->|Đối tác| P[/partners/*]
 H -->|Mở trợ lý camera| C[/assistant]
 H -->|Bắt đầu bằng giọng nói| S
 H -->|Trợ năng trên header| AC[Panel trợ năng, không chuyển trang]
 H -->|Tài khoản| US[Menu tài khoản → login/profile/my-booking/my-trip]
 H -->|SOS| SO[/sos]
 H -->|Tư vấn viên nổi| CO[Panel tư vấn, chưa có chat thật]
 H -->|HOME-02 · Mở tiếp cận| DD[Accordion dữ liệu giả định trên thẻ]
 H -->|HOME-03 · Vuốt / bấm mũi tên| GA[Chuyển ảnh gallery, không chuyển trang]
 GA -->|Nhấn ảnh giữa| J{Nội dung ảnh}
 J -->|Phố xá, kiến trúc| D2[/destination?d=pho-co]
 J -->|Ẩm thực, cà phê| F
```

## 01. HOME-01 — HEADER V2

| Mã | Điểm chạm | Hành vi | Đích hiện có | Trạng thái |
|---|---|---|---|---|
| H01 | Logo | Nhấn | `/` | Có route |
| H02 | Điểm đến | Mở dropdown | Tất cả: `/destination`; Tìm kiếm: `/search`; Bản đồ: `/navigation` | Có route |
| H03 | Dịch vụ | Mở dropdown | Lưu trú `/explore?cat=accommodation`; Ẩm thực `/explore?cat=restaurant`; Di chuyển `/explore?cat=transport`; Guide `/item?id=demo-guide-tour`; Vé `/explore?cat=activity` | Có route; một số là DEMO |
| H04 | Blog & Trải nghiệm | Mở dropdown | `/articles` | Các nhánh chủ đề hiện dẫn chung; **cần lọc riêng** |
| H05 | Hỗ trợ | Mở dropdown | `/profile`, `/help`, `/help#contact`, `/sos` | Có route; xác minh anchor liên hệ |
| H06 | Đối tác | Mở dropdown | `/partners/business`, `/partners/guide`, `/partners/cooperate` | Có route |
| H07 | Trợ năng vàng | Nhấn | Panel Tương phản/Chữ lớn/Đọc trang | Không chuyển trang |
| H08 | Tài khoản | Nhấn | Login/Profile/My booking/My trip | Chưa có kiểm tra vai trò trước khi mở dropdown |
| H09 | SOS | Nhấn | `/sos` | DEMO; không thay số khẩn cấp thật |
| H10 | Tư vấn viên Lê Thanh Tú | Nhấn | Panel chào theo giờ; `/help#contact` | Chưa có live chat; số điện thoại chưa cập nhật |
| H11 | Mũi tên dropdown | Nhấn hoặc Enter/Space | Mở/đóng nhóm tương ứng | Không chuyển trang |

**Quy tắc UI:** chỉ một dropdown mở tại một thời điểm; Escape đóng. Ở mobile dùng menu cuộn. Trợ năng chỉ ở Header, không có nút trợ năng nổi thứ hai.

## 02. HERO / TÌM KIẾM

| Mã | Điểm chạm | Đích | Lưu ý |
|---|---|---|---|
| H12 | Bắt đầu bằng giọng nói | `/search` | Hiện tại là **đi tới trang tìm kiếm**, KHÔNG khẳng định micro tự bật |
| H13 | Mở trợ lý camera | `/assistant` | Giữ CTA Camera; chức năng nhận diện thực chưa được xác nhận |
| H14 | Ô tìm kiếm / gợi ý | `/search` hoặc `/search?q=...` | Tránh tạo nút micro/camera nổi trùng lặp |

## 03. HOME-02 — BỐN THẺ KHÁM PHÁ

| Mã | Thẻ hiện đang dùng trong source | Tương tác | Trang đích | Điểm cần hoàn thiện |
|---|---|---|---|---|
| D01 | Nhịp sống phố cổ | Mở thông tin tiếp cận | Accordion cùng thẻ | Dữ liệu giả định, phải dán nhãn |
| D02 | Chợ và hàng quán địa phương | Mở thông tin tiếp cận | Accordion cùng thẻ | Dữ liệu giả định |
| D03 | Cà phê phố cổ | Mở thông tin tiếp cận | Accordion cùng thẻ | Dữ liệu giả định |
| D04 | Đường phố và xích lô | Mở thông tin tiếp cận | Accordion cùng thẻ | Dữ liệu giả định |
| D05 | Nhấn Xem thông tin — nhóm phố xá | Chuyển trang | `/destination?d=pho-co` | Đích khu vực chung, chưa có chi tiết riêng |
| D06 | Nhấn Xem thông tin — nhóm ăn uống | Chuyển trang | `/explore?cat=restaurant` | Đích danh mục, chưa có cơ sở kinh doanh cụ thể |

**LƯU Ý BẮT BUỘC:** Những thẻ nguồn này khác danh sách bốn địa điểm Nhà cổ Mã Mây, Chợ Đồng Xuân, Ô Quan Chưởng, Hàng Mã đã thảo luận trước đó. Đây là điểm **chưa khớp thiết kế chốt**, cần duyệt lại dữ liệu/ảnh theo tên địa điểm trước khi công bố. Không lấy ảnh chung gắn nhãn thành địa điểm cụ thể.

## 04. HOME-03 — GALLERY PHỐ CỔ

- Chỉ còn tiêu đề **Khám phá qua hình ảnh**, không có chữ đè trên ảnh.
- Bộ ảnh hiện tại: **12 ảnh local khác tệp**, không sử dụng AI để tạo ảnh. Chưa có bằng chứng xác nhận tọa độ chụp của từng ảnh, vì vậy **chưa thể bảo đảm cả 12 đều chụp trong ranh giới Phố cổ**; phần kiểm định ảnh vẫn là việc cần làm.
- Vuốt trái/phải hoặc bấm mũi tên → thay ảnh ở giữa, không điều hướng.
- Nhấn ảnh bên cạnh → chuyển ảnh ấy vào giữa.
- Nhấn ảnh giữa → đi đến trang tương ứng: cảnh phố `/destination?d=pho-co`, ẩm thực `/explore?cat=restaurant`.
- Cần bổ sung nhãn accessible name và điều khiển bàn phím đầy đủ, tránh chỉ phục vụ người nhìn thấy ảnh.

## 05. Nhánh lỗi, dữ liệu chưa có

- Nếu người dùng không cấp quyền camera/micro: giải thích quyền truy cập và hiển thị lối nhập bằng bàn phím / tìm kiếm thường.
- Nếu chưa đăng nhập khi đặt dịch vụ: chuyển đăng nhập, rồi quay lại vị trí đang thực hiện (chưa xác minh code hiện tại xử lý đủ).
- Nếu dịch vụ chưa có nhà cung cấp thật: gắn `DEMO`, không mô phỏng xác nhận đặt thành công thật.
- Nếu ảnh không tải: placeholder + alt text; không dùng một ảnh địa điểm khác làm ảnh thay thế.
- Nếu dữ liệu tiếp cận là giả định: luôn hiển thị nhãn cảnh báo rõ, không mô tả là khảo sát thực tế.

## 06. Đề xuất thứ tự sửa tiếp

1. Khóa lại danh sách bốn thẻ HOME-02 theo đúng tên địa điểm thực tế và ảnh đúng nguồn.
2. Kiểm chứng và lưu 10–15 ảnh chụp thật *trong ranh giới Phố cổ*, bỏ mọi ảnh không chứng minh được địa điểm; cập nhật gallery.
3. Bổ sung route trang đích riêng cho các chủ đề Blog và các địa điểm đủ dữ liệu.
4. Kiểm thử end-to-end các nút, trạng thái đăng nhập, quyền camera, keyboard / screen reader.

**Phân biệt:** Đã xác minh bằng cách đọc source ≠ đã kiểm thử bằng trình duyệt. Tài liệu này là sơ đồ đúng các đường dẫn trong mã, chưa phải biên bản test thực thi trên website live.
