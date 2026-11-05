/** @type {import('next').NextConfig} */
// Header bảo mật cơ bản. Camera/micro/vị trí chỉ cho chính trang này (SOS, trợ lý camera, giọng nói).
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  ...(process.env.NODE_ENV === "development" ? [] : [{ key: "X-Frame-Options", value: "SAMEORIGIN" }]),
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(self), microphone=(self), geolocation=(self)" },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
