const defaultTheme = require('tailwindcss/defaultTheme')
const btbColors = require('./theme/colors')

const defaultFontSizes = Object.keys(defaultTheme.fontSize)
const bumpedFontSizes = ['xxs', ...defaultFontSizes].reduce(
  (bumpedSizes, size, index) => ({
    ...bumpedSizes,
    [size]: defaultTheme.fontSize[defaultFontSizes[index]],
  }),
  {},
)

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './utils/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    colors: btbColors,

    fontFamily: {
      // sans: ['system-ui', ...defaultTheme.fontFamily.sans],
      // sans: ['tenon', ...defaultTheme.fontFamily.sans],
      sans: ['brix-sans', ...defaultTheme.fontFamily.sans],
      hand: ['fuzzy-bubbles', ...defaultTheme.fontFamily.sans],
    },

    fontSize: {
      ...bumpedFontSizes,
      '9xl': ['10rem', { lineHeight: '1' }],
    },

    fontWeight: {
      regular: 400,
      medium: 500,
      bold: 700,
    },

    screens: {
      xxs: '360px',
      xs: '480px',
      ...defaultTheme.screens,
      tall: { raw: '(min-height: 750px)' },
    },

    extend: {
      borderRadius: {
        '3xl': '1.25rem',
        '4xl': '1.5rem',
        '5xl': '2rem',
      },

      dropShadow: {
        sm: '0 1px 1px rgb(0 0 0 / 0.1)',
      },

      maxWidth: {
        '8xl': '90rem',
      },
    },
  },

  corePlugins: {
    container: false,
  },

  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
  ],
}
