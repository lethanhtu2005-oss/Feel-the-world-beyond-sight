import LoginForm from "@/components/LoginForm";
import LogoutButton from "@/components/LogoutButton";
import BookingLoginNotice from "@/components/BookingLoginNotice";
import Link from "next/link";
export const metadata={title:"Đăng nhập khách hàng",robots:{index:false,follow:false}};
export default function Login(){return <div className="container-page py-12"><section className="mx-auto max-w-lg rounded-2xl border border-line bg-white p-6 hc-surface hc-border"><h1 className="text-4xl">Đăng nhập khách hàng WayEcho</h1><p className="mt-3 text-ink-soft">Đây là bản trải nghiệm: không cần tài khoản hay mật khẩu. Hồ sơ tiếp cận trên thiết bị vẫn dùng được độc lập.</p><BookingLoginNotice/><LoginForm portal="traveler"/><div className="mt-6 flex flex-wrap gap-3"><Link href="/profile" className="btn-ghost">Hồ sơ trên thiết bị</Link><LogoutButton/></div></section></div>;}
