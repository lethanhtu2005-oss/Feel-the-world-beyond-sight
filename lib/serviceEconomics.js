// Các mức dưới đây CHỈ là giả định tài chính dùng trong prototype.
// Không tính hai lần tiền khách trả: doanh thu nền tảng = phí kết nối, không phải tổng giá.
export const DEMO_SERVICE_PRICES = Object.freeze({
  guide: Object.freeze({gross:350000, platformPercent:12, directCost:8000, durationHours:2}),
  volunteer: Object.freeze({gross:200000, platformPercent:10, directCost:5000, durationHours:2}),
});
export function serviceBreakdown(kind, grossOverride) {
  const config=DEMO_SERVICE_PRICES[kind];
  if(!config) return null;
  const gross=grossOverride===undefined?config.gross:Number(grossOverride);
  if(!Number.isSafeInteger(gross)||gross<0||gross>1000000000) throw new RangeError('Giá dịch vụ không hợp lệ');
  const platformFee=Math.round(gross*config.platformPercent/100);
  const providerPay=gross-platformFee;
  return {kind,gross,platformFee,providerPay,platformPercent:config.platformPercent,directCost:config.directCost,contribution:platformFee-config.directCost,durationHours:config.durationHours,isDemo:true};
}
export const formatVND=value=>new Intl.NumberFormat('vi-VN').format(value)+'đ';
