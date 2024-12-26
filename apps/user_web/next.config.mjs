import createNextIntlPlugin from "next-intl/plugin";
import nextPWA from "next-pwa";

const withNextIntl = createNextIntlPlugin("./src/_lib/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  env: {
    NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL:
      process.env.VERCEL_PROJECT_PRODUCTION_URL,
  },
};

const withPWA = nextPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
});

export default process.env.NODE_ENV === "development"
  ? withNextIntl(nextConfig)
  : withPWA(withNextIntl(nextConfig));
