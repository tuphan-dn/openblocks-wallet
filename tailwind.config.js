/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['selector', '[data-theme="dark"]'],
  content: ['./src/**/*.{js,ts,jsx,tsx,html}'],
  theme: {
    extend: {
      keyframes: {
        'pop-in': {
          from: { opacity: '0', transform: 'scaleX(0.95) scaleY(0.95)' },
          to: { opacity: '1', transform: 'scaleX(1) scaleY(1)' },
        },
      },
      animation: {
        'pop-in': 'pop-in 200ms cubic-bezier(0, 0, 0.2, 1)',
      },
      boxShadow: {
        outer:
          'inset .5px .5px #ffffff33, inset -.5px -.5px #0000001a, 0 4px 6px -1px #0000001a, 0 2px 4px -2px #0000001a',
      },
      fontFamily: {
        clash: '"Clash Display", sans-serif',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/theming/themes')['light'],
          primary: '#eaff74',
          'primary-content': '#2a3007',
          secondary: '#0f172a', // slate-900
          'secondary-content': '#f1f5f9', // slate-100
        },
        dark: {
          ...require('daisyui/src/theming/themes')['dark'],
          primary: '#eaff74',
          'primary-content': '#2a3007',
          secondary: '#f1f5f9', // slate-100
          'secondary-content': '#0f172a', // slate-900
        },
      },
    ],
  },
}
