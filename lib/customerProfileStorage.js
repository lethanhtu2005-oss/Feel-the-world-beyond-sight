// Thông tin cá nhân demo được tách theo phiên tài khoản, không chia sẻ giữa
// các khách cùng trình duyệt. Không phải đồng bộ máy chủ / đa thiết bị.
let activeProfileScope = null;
export async function initCustomerProfileScope() {
  const response = await fetch('/api/auth/session', { cache: 'no-store' });
  if (!response.ok) throw new Error('Không xác định được tài khoản khách hàng.');
  const user = await response.json();
  if (!user?.id || user.role !== 'traveler') throw new Error('Vui lòng sử dụng tài khoản khách hàng.');
  activeProfileScope = `we-customer:${encodeURIComponent(user.id)}:`;
  return activeProfileScope;
}
export function profileGet(key) {
  if (!activeProfileScope) return null;
  return localStorage.getItem(activeProfileScope + key);
}
export function profileSet(key, value) {
  if (!activeProfileScope) throw new Error('Chưa xác nhận phiên tài khoản.');
  localStorage.setItem(activeProfileScope + key, value);
}
