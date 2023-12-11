const { nextui } = require('@nextui-org/react')
const withMT = require('@material-tailwind/react/utils/withMT')

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: [
    './src/renderer/index.html',
    './src/renderer/src/*.tsx',
    './src/renderer/src/components/**/*.tsx',
    './src/renderer/src/assets/*.tsx',
    './node_modules/@nextui-org/theme/dist/**/*.{js, ts, jsx, tsx}',
    './node_modules/@material-tailwind/react/theme/components/**/*.{js, jsx, ts, tsx}',
    './node_modules/@material-tailwind/react/components/**/*.{js, jsx, ts, tsx}'
  ],
  theme: {
    extend: {}
  },
  plugins: [nextui()]
})
