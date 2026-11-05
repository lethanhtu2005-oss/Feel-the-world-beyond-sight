import { storageModeName } from "@/lib/store";

// Nhac nho ro rang nhung khong chen ngang header. Hien thi cuoi trang tren tat ca cong.
export default function StorageNotice() {
  if (storageModeName() !== "memory") return null;
  return (
    <aside aria-label="Lưu ý về dữ liệu bản thử nghiệm" className="border-t border-[#5e3b2a] bg-[#281811] px-4 py-3 text-center text-xs leading-relaxed text-[#e9d5c7] print:hidden">
      WayEcho đang ở giai đoạn thử nghiệm. Dữ liệu đặt dịch vụ, chuyến đi và đánh giá được lưu tạm, có thể mất khi hệ thống khởi động lại.
    </aside>
  );
}
