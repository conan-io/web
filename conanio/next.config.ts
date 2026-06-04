import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  env: {
    conanioServer: process.env.NEXT_PUBLIC_CONAN_CONANIO_SERVICE,
    /** Conan Audit auth (catalog-proxy internal API): signup, recover, validate. */
    conanioAuthServer: process.env.CONANIO_AUTH_SERVER,
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
        source: "/audit",
        destination: "/audit/register",
        permanent: true,
      },
      {
        source: "/recover",
        destination: "/audit/recover",
        permanent: true,
      },
      {
        source: "/content-unavailable",
        destination: "/audit/content-unavailable",
        permanent: true,
      },
      {
        source: "/validate/:token",
        destination: "/audit/validate/:token",
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
