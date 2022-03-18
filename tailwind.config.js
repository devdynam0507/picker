module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    keyframes: {
      bounce: {
        '0%, 100%': {
          transform: 'translateY(-15%)',
          'animation-timing-function': 'cubic-bezier(0.8,0,1,1)',
        },
        '50%': {
          transform: 'none',
          'animation-timing-function': 'cubic-bezier(0,0,0.2,1)',
        },
      },
    },
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
      keyframes: {
        slide: {
          '100%': {
            top: '-200px',
          },
        },
      },
      animation: {
        slide: 'slide 4.2s steps(5) infinite',
      },
    },
  },
  plugins: [],
};
