import type { NextConfig } from "next";

const isFirebaseExport = process.env.FIREBASE_EXPORT === "true";

const nextConfig: NextConfig = {
  ...(isFirebaseExport ? { output: "export" } : {}),
  images: {
    formats: ["image/avif", "image/webp"],
    unoptimized: isFirebaseExport,
  },
  ...(isFirebaseExport
    ? {}
    : {
        async headers() {
          return [
            {
              source: "/(.*)",
              headers: [
                { key: "X-Content-Type-Options", value: "nosniff" },
                { key: "X-Frame-Options", value: "SAMEORIGIN" },
                { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
              ],
            },
          ];
        },
      }),
};

export default nextConfig;
