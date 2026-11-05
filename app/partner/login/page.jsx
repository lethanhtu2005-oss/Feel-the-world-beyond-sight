import { redirect } from "next/navigation";
export const metadata = { robots: { index: false, follow: false } };
// Không còn cổng đăng nhập riêng: mọi đối tác vào qua Cổng Đối Tác Liên Thông.
export default async function PartnerLogin({ searchParams }) {
  const next = (await searchParams)?.next;
  redirect(typeof next === "string" && next.startsWith("/") && !next.startsWith("//") ? `/partner?next=${encodeURIComponent(next)}` : "/partner");
}
