const path = require('path')

const nextMDX = require('@next/mdx')
const withPlugins = require('next-compose-plugins')
const reactSvg = require('next-react-svg')

const { imageSize } = require('./tools/mdx/image-size')
const { imagePlaceholder } = require('./tools/mdx/image-placeholder')

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    reactRemoveProperties: {
      // The regexes defined here are processed in Rust so the syntax is
      // different from JavaScript `RegExp`s. See https://docs.rs/regex.
      properties: ['^data-test', '^data-placeholder'],
    },
  },

  experimental: {
    externalDir: true,
    optimizeCss: true,
  },

  images: {
    domains: ['images.unsplash.com', 'secure.gravatar.com'],
    formats: ['image/avif', 'image/webp'],
  },

  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],

  reactStrictMode: true,
  swcMinify: true,
}

module.exports = withPlugins(
  [
    /* [plugin, { ...config }] */
    [reactSvg, { include: path.resolve(__dirname, 'assets') }],
    [
      nextMDX({
        extension: /\.mdx?$/,
        options: {
          providerImportSource: '@mdx-js/react',
          remarkPlugins: [],
          rehypePlugins: [
            [imageSize, {}],
            [imagePlaceholder, {}],
          ],
        },
      }),
    ],
  ],
  nextConfig,
)
