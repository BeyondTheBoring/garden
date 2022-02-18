const defaultTheme = require('tailwindcss/defaultTheme')
const btbColors = require('./theme/colors')

const rem = px => `${px / 16}rem`
const fontSizeConfig = {
  'xxs': [rem(13), 1],
  'xs': [rem(14), rem(18)],
  'sm': [rem(16), rem(24)],
  'base': [rem(18), rem(28)],
  'lg': [rem(20), rem(32)],
  'xl': [rem(22), rem(36)],
  '2xl': [rem(25), rem(42)],
  '3xl': [rem(32), 1],
  '4xl': [rem(38), 1],
  '5xl': [rem(50), 1],
  '6xl': [rem(62), 1],
  '7xl': [rem(74), 1],
  '8xl': [rem(98), 1],
  '9xl': [rem(130), 1],
  'inherit': 'inherit',
}

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './posts/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './utils/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    colors: btbColors,

    fontFamily: {
      // sans: ['system-ui', ...defaultTheme.fontFamily.sans],
      // sans: ['tenon', ...defaultTheme.fontFamily.sans],
      // sans: ['Qanelas Soft', ...defaultTheme.fontFamily.sans],
      // sans: ['Proxima Soft Condensed', ...defaultTheme.fontFamily.sans],
      // sans: ['Cera Compact Pro', ...defaultTheme.fontFamily.sans],
      sans: ['brix-sans', ...defaultTheme.fontFamily.sans],
      hand: ['merott-fuzzy', ...defaultTheme.fontFamily.sans],
    },

    fontSize: fontSizeConfig,

    fontWeight: {
      normal: 400,
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
