import type { NextConfig } from "next";

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  buildExcludes: [/middleware-manifest\.json$/],
  runtimeCaching: [
    // فایل‌های استاتیک Next.js
    {
      urlPattern: /^https:\/\/radio-javan\.mohammademamiproject\.ir\/_next\/static\//,
      handler: "CacheFirst",
      options: {
        cacheName: "static-resources",
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 روز
        },
      },
    },
    {
      urlPattern: /^https:\/\/radio-javan\.mohammademamiproject\.ir\/images\//,
      handler: "CacheFirst",
      options: {
        cacheName: "image-cache",
        expiration: {
          maxEntries: 60,
          maxAgeSeconds: 60 * 24 * 60 * 60, // 60 روز
        },
      },
    },
    // API
    {
      urlPattern: /^https:\/\/radio-javan\.mohammademamiproject\.ir\/api\//,
      handler: "NetworkFirst",
      options: {
        cacheName: "api-cache",
        networkTimeoutSeconds: 10,
        expiration: {
          maxEntries: 30,
          maxAgeSeconds: 24 * 60 * 60, // 1 روز
        },
      },
    },
  ],
});

const nextConfig: NextConfig = {
  reactCompiler: true,
};

export default withPWA(nextConfig);
