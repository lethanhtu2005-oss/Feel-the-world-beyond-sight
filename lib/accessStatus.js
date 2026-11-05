// Mô tả tiếp cận trong dữ liệu có thể mở đầu bằng "Đã khảo sát…" dù chưa có biên bản khảo sát đính kèm.
// Hiển thị trung thực: chỉ coi là tham khảo cho tới khi có nguồn xác minh.
export function honestAccessStatus(status = "") {
  const text = String(status).trim();
  const claim = /^Đã khảo sát(?: thực địa)?\s*[—–-]\s*/i;
  if (claim.test(text)) return `Mô tả tham khảo, chưa xác minh tại chỗ — ${text.replace(claim, "")}`;
  return text;
}
