/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      margin: {
        '2px': '2px',
      },
      padding: {
        '2px': '2px',
      },
      boxShadow: {
        'nav-item': '4px 4px 8px #212124, -4px -4px 8px #2d2d30',
        'nav-item-active': 'inset 4px 4px 8px #212124,inset -4px -4px 8px #2d2d30',
        'modal': '0 4px 30px #00000025',
        'tile': 'inset 1px 1px 2px #0a0a0b, inset -1px -1px 2px #26262b',
        'tile-snake': '1px 1px 2px #1f3206, -1px -1px 2px #7bc618',
        'tile-food': '1px 1px 2px #4a0b0b, -1px -1px 2px #ff2d2d',
      },
      backgroundImage: {
        'tile': 'linear-gradient(145deg, #161618, #1a1a1d)',
        'tile-snake': 'linear-gradient(145deg, #528510, #45700e)',
        'tile-food': 'linear-gradient(145deg, #c61e1e, #a71919)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
