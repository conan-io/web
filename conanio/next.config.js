/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
    experimental: {
    outputStandalone: true,
  },
  env: {
    conanioServer: process.env.CONANIO_SERVER,
  },
  async redirects() {
    return [
      {
        source: '/:slug*.html',
        destination: '/:slug*',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
