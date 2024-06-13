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
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/theming/themes')['light'],
          primary: '#0ea5e9', // sky-500
          'primary-content': '#e0f2fe', // sky-100
          secondary: '#0f172a', // slate-900
          'secondary-content': '#f1f5f9', // slate-100
        },
        dark: {
          ...require('daisyui/src/theming/themes')['dark'],
          primary: '#0ea5e9', // sky-500
          'primary-content': '#e0f2fe', // sky-100
          secondary: '#f1f5f9', // slate-100
          'secondary-content': '#0f172a', // slate-900
        },
      },
    ],
  },
}
