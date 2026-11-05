"use client";
import {useEffect} from "react";
import {usePathname} from "next/navigation";
import {isInternalPortalPath} from "@/lib/portalRoutes";
import FloatingSOS from "./FloatingSOS";
import ConsultantWidget from "./ConsultantWidget";
import WayEchoAIWidget from "./WayEchoAIWidget";
import MobileNav from "./MobileNav";

// Unmount widgets on an internal portal route: this also releases camera/mic
// through the widgets' normal unmount handlers. No traveler actions on admin.
export default function TravelerWidgets() {
  const pathname = usePathname();
  const internal = isInternalPortalPath(pathname);
  useEffect(() => {
    document.body.classList.toggle("we-internal-portal", internal);
    return () => document.body.classList.remove("we-internal-portal");
  }, [internal]);
  if (internal) return null;
  return <><FloatingSOS/><ConsultantWidget/><WayEchoAIWidget/><MobileNav/></>;
}
