import type { NextConfig } from "next";

const securityHeaders = [
  // Help prevent XSS and data injection
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline' https:",
      "img-src 'self' data: blob: https:",
      "connect-src 'self' https://ctftime.org https://api.resend.com https://emsixploit.vercel.app https://*.emsixploit.vercel.app",
      "font-src 'self' data:",
      "frame-ancestors 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
  // Clickjacking protection (also covered by CSP frame-ancestors)
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  // MIME type sniffing protection
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // Enforce HTTPS for future requests
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  // Reduce referrer leakage
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  // Lock down powerful browser features
  {
    key: "Permissions-Policy",
    value: "geolocation=(), microphone=(), camera=(), payment=()",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
