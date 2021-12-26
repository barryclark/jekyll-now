module.exports = {
  mode: 'jit',
  content: [
    './_includes/**/*.html',
    './_layouts/**/*.html',
    './_posts/*.html',
    './*.html',
  ],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}