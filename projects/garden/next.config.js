const path = require('path')

const withPlugins = require('next-compose-plugins')
const reactSvg = require('next-react-svg')

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    externalDir: true,
    optimizeCss: true,
    reactRemoveProperties: {
      // The regexes defined here are processed in Rust so the syntax is
      // different from JavaScript `RegExp`s. See https://docs.rs/regex.
      properties: ['^data-test', '^data-placeholder'],
    },
  },

  images: {
    domains: ['images.unsplash.com', 'secure.gravatar.com'],
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
