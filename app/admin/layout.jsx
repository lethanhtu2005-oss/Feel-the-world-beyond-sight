import AdminNav from "@/components/AdminNav";
import "./wayecho-admin.css";
export const metadata={robots:{index:false,follow:false},title:{default:"Admin WayEcho",template:"%s · WayEcho Admin"}};
export default function AdminLayout({children}){return <div className="waye-admin-shell"><AdminNav/><main className="waye-admin-main"><div className="waye-admin-topbar"><strong>Cổng Quản trị Hệ thống (Admin Portal)</strong><span>WayEcho · Môi trường DEMO, không giao dịch thật</span><span className="waye-admin-avatar">QT</span></div>{children}</main></div>}
