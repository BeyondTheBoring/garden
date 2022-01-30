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
  ],

  theme: {
    colors: btbColors,

    fontFamily: {
      sans: ['brix-sans', ...defaultTheme.fontFamily.sans],
      hand: ['fuzzy-bubbles', ...defaultTheme.fontFamily.sans],
    },

    fontWeight: {
      regular: 400,
      medium: 500,
      bold: 700,
    },

    fontSize: {
      ...bumpedFontSizes,
      '9xl': ['10rem', { lineHeight: '1' }],
    },

    screens: {
      xxs: '360px',
      xs: '480px',
      ...defaultTheme.screens,
      tall: { raw: '(min-height: 800px)' },
    },

    extend: {
      borderRadius: {
        '3xl': '1.25rem',
        '4xl': '1.5rem',
        '5xl': '2rem',
      },

      maxWidth: {
        '8xl': '90rem',
      },
    },
  },

  corePlugins: {
    container: false,
  },

  plugins: [],
}
