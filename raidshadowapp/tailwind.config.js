const { nextui } = require('@nextui-org/react')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/renderer/index.html',
    './src/renderer/src/*.tsx',
    './src/renderer/src/components/**/*.tsx',
    './node_modules/@nextui-org/theme/dist/**/*.{js, ts, jsx, tsx}'
  ],
  theme: {
    extend: {}
  },
  plugins: [nextui()]
}
