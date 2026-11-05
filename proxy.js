import { NextResponse } from "next/server";
import {
  authenticate,
  errorResponse,
  demoLogin,
  sessionCookie
} from "@/lib/auth";

export async function proxy(req) {
  const p = req.nextUrl.pathname;

  if (p === "/guide/login" || p === "/guide/register") {
    return NextResponse.next();
  }

  if (p === "/booking" || p === "/services/ride-booking") {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("next", p + req.nextUrl.search);
    loginUrl.searchParams.set("booking", "1");

    try {
      const traveler = await authenticate(req);
      if (traveler.guest || traveler.role !== "traveler") {
        return NextResponse.redirect(loginUrl);
      }
      const response = NextResponse.next();
      response.headers.set("Cache-Control", "private, no-store");
      return response;
    } catch (error) {
      if (error.status === 401) {
        return NextResponse.redirect(loginUrl);
      }
      return errorResponse(error);
    }
  }

  const role = p.startsWith("/business")
    ? "business"
    : p.startsWith("/admin/consultation") ||
      p.startsWith("/staff/consultation")
      ? "advisor"
      : p.startsWith("/admin") || p.startsWith("/staff")
        ? "admin"
        : "guide";

  const toLogin = () => {
    const url = new URL(
      role === "guide" || role === "business"
        ? "/partner"
        : "/internal/login",
      req.url
    );
    url.searchParams.set("next", p + req.nextUrl.search);
    return NextResponse.redirect(url);
  };

  try {
    const user = await authenticate(req);

    if (user.guest) return toLogin();

    const permitted =
      user.role === role ||
      (role === "advisor" && user.role === "admin");

    if (!permitted) {
      // Chỉ tự chuyển vai trò đối với phiên Demo.
      // Không áp dụng cho tài khoản thật.
      if (user.demo === true) {
        const result = demoLogin(
          user.name || "WayEcho Demo",
          role,
          [role],
          role === "business" ? "b1" : null
        );

        const response = NextResponse.redirect(req.nextUrl);
        response.headers.set(
          "Set-Cookie",
          sessionCookie(result.token)
        );
        response.headers.set("Cache-Control", "private, no-store");
        return response;
      }

      return toLogin();
    }

    const response = NextResponse.next();
    response.headers.set("Cache-Control", "private, no-store");
    return response;

  } catch (error) {
    if (error.status === 401) return toLogin();
    return errorResponse(error);
  }
}

export const config = {
  matcher: [
    "/business/:path*",
    "/admin/:path*",
    "/guide/:path*",
    "/staff/:path*",
    "/booking",
    "/services/ride-booking"
  ]
};
