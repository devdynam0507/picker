module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'picker-orange': '#f45314',
        'picker-yellow': '#ffcc33',
      },
      backgroundImage: {
        'top-bg1': "url('/img/top-bg1.png')",
        'top-bg2': "url('/img/top-bg2.png')",
      },
      screens: {
        tall: { raw: '(min-height: 750px)' },
      },
      flex: {
        30: '1 1 30%',
      },
    },
  },
  plugins: [],
};
