import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  env: {
    conanioServer: process.env.NEXT_PUBLIC_CONAN_CONANIO_SERVICE,
    siteOrigin: process.env.NEXT_PUBLIC_SITE_ORIGIN || "https://conan.io",
    gtmURL: process.env.GTM_URL,
    gtmID: process.env.GTM_ID,
    /** Same idea as `conanioServer`: `NEXT_PUBLIC_CONAN_VERSION` → `conanVersion` in app code. */
    conanVersion: process.env.NEXT_PUBLIC_CONAN_VERSION?.trim() || "2.27.1",
  },
  async redirects() {
    return [
      {
        source: "/download",
        destination: "/downloads",
        permanent: true,
      },
      {
        source: "/:slug*.html",
        destination: "/:slug*",
        permanent: true,
      },
      {
        // Exclude /center/llms.txt and avoid paths already containing "recipes".
        source: "/center/:recipe((?!.*recipes)(?!llms\\.txt$).*$)",
        destination: "/center/recipes/:recipe",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
