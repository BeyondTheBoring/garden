const path = require('path')

const withPlugins = require('next-compose-plugins')
const reactSvg = require('next-react-svg')

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    externalDir: true,
    optimizeCss: true,
  },

  images: {
    domains: ['images.unsplash.com'],
    formats: ['image/avif', 'image/webp'],
  },

  reactStrictMode: true,
}

module.exports = withPlugins(
  [
    /* [plugin, { ...config }] */
    [reactSvg, { include: path.resolve(__dirname, 'assets') }],
  ],
  nextConfig,
)
