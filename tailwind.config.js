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
          'inset .5px .5px rgba(255, 255, 255, 0.6), 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
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
