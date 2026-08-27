/**
 * Обычная сборка — полноценный Next.js (`npm run dev`, `npm run build`).
 *
 * STATIC_EXPORT=1 собирает статику в out/ — её можно положить на любой
 * хостинг без Node.js. basePath задаётся через BASE_PATH, если сайт
 * отдаётся из подпапки (например, GitHub Pages).
 */
const isStatic = process.env.STATIC_EXPORT === "1";
const basePath = process.env.BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  ...(isStatic
    ? {
        output: "export",
        basePath,
        assetPrefix: basePath,
        images: { unoptimized: true },
        trailingSlash: true,
      }
    : {}),
};

export default nextConfig;
