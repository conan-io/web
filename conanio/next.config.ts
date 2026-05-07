import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  env: {
    conanioServer: process.env.NEXT_PUBLIC_CONAN_CONANIO_SERVICE,
    siteOrigin: process.env.NEXT_PUBLIC_SITE_ORIGIN || "https://conan.io",
    gtmURL: process.env.GTM_URL,
    gtmID: process.env.GTM_ID,
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
        // Redirect plain recipe slugs while excluding /center/llms.txt and existing /recipes paths.
        source: "/center/:recipe((?!.*recipes)(?!llms\\.txt$).*$)",
        destination: "/center/recipes/:recipe",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
