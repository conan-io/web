/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  env: {
    conanioServer: process.env.NEXT_PUBLIC_CONAN_CONANIO_SERVICE,
    conanioAuthServer: process.env.CONANIO_AUTH_SERVER,
    gtmURL: process.env.GTM_URL,
    gtmID: process.env.GTM_ID
  },
  async redirects() {
    return [
      {
        source: '/:slug*.html',
        destination: '/:slug*',
        permanent: true,
      },
      {
        source: '/center/:recipe((?!.*recipes).*$)',
        destination: '/center/recipes/:recipe',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
