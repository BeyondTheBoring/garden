const defaultTheme = require('tailwindcss/defaultTheme')
const btbColors = require('./theme/colors')

const rem = px => `${px / 16}rem`

const fontSizeConfig = {
  'xxs': [rem(11), 1],
  'xs': [rem(12), rem(18)],
  'sm': [rem(14), rem(24)],
  'base': [rem(16), rem(28)],
  'lg': [rem(18), rem(32)],
  'xl': [rem(20), rem(36)],
  '2xl': [rem(24), rem(42)],
  '3xl': [rem(30), 1],
  '4xl': [rem(36), 1],
  '5xl': [rem(48), 1],
  '6xl': [rem(60), 1],
  '7xl': [rem(72), 1],
  '8xl': [rem(96), 1],
  '9xl': [rem(128), 1],
  'inherit': 'inherit',
}

const screens = {
  xxs: '360px',
  xs: '480px',
  ...defaultTheme.screens,
  tall: { raw: '(min-height: 750px)' },
}

// add negated screen sizes with reverse queries
for (let screen in screens) {
  const size = screens[screen]
  if (typeof size === 'string' && size.endsWith('px')) {
    const px = Number(size.replace(/px$/, ''))
    if (isNaN(px)) continue
    const lowerScreenQuery = { max: `${px - 1}px` }
    screens[`-${screen}`] = lowerScreenQuery
  }
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
      // sans: ['Proxima Soft', ...defaultTheme.fontFamily.sans],
      sans: ['proxima-soft', ...defaultTheme.fontFamily.sans],
      // sans: ['Proxima Soft Condensed', ...defaultTheme.fontFamily.sans],
      // sans: ['Cera Compact Pro', ...defaultTheme.fontFamily.sans],
      // sans: ['brix-sans', ...defaultTheme.fontFamily.sans],
      hand: ['merott-fuzzy', ...defaultTheme.fontFamily.sans],
    },

    fontSize: fontSizeConfig,

    fontWeight: {
      normal: 400,
      medium: 600,
      bold: 700,
    },

    screens,

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
        '8xl': '92rem',
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
