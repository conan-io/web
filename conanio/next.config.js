/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
    experimental: {
    outputStandalone: true,
  },
  env: {
    conanioServer: process.env.CONANIO_SERVER,
  },
}

module.exports = nextConfig
