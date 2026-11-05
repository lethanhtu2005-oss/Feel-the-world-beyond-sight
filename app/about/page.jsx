import AboutWayEchoPage from "@/components/AboutWayEchoPage";
import {pageMetadata} from "@/lib/seo";
export const metadata=pageMetadata("Giới thiệu dự án","WayEcho là gì, lý do bắt đầu và định hướng phát triển dự án du lịch tiếp cận cho người khiếm thị.","/about");
export default function Page(){return <AboutWayEchoPage kind="intro"/>;}
