const path = require('path')

const withPlugins = require('next-compose-plugins')
const reactSvg = require('next-react-svg')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    externalDir: true,
    optimizeCss: true,
  },
}

module.exports = withPlugins(
  [
    /* [plugin, { ...config }] */
    [reactSvg, { include: path.resolve(__dirname, 'assets') }],
  ],
  nextConfig,
)
