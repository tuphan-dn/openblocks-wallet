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
        noise: {
          '0%, 100%': { backgroundPosition: '0 0' },
          '10%': { backgroundPosition: '-5% -10%' },
          '20%': { backgroundPosition: '-15% 5%' },
          '30%': { backgroundPosition: '7% -25%' },
          '40%': { backgroundPosition: '20% 25%' },
          '50%': { backgroundPosition: '-25% 10%' },
          '60%': { backgroundPosition: '15% 5%' },
          '70%': { backgroundPosition: '0% 15%' },
          '80%': { backgroundPosition: '25% 35%' },
          '90%': { backgroundPosition: '-10% 10%' },
        },
      },
      animation: {
        'pop-in': 'pop-in 200ms cubic-bezier(0, 0, 0.2, 1)',
        noise: 'noise 200ms infinite;',
      },
      backgroundImage: {
        noise: "url('/assets/noise.png')",
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
          // Main colors
          primary: '#eaff74',
          'primary-content': '#2a3007',
          secondary: '#0f172a', // slate-900
          'secondary-content': '#f1f5f9', // slate-100
          // Informative colors
          info: '#e9f2ff',
          'info-content': '#0086fc',
          success: '#e3eee2',
          'success-content': '#00C454',
          error: '#fff0f0',
          'error-content': '#ff4e4e',
          warning: '#fefae6',
          'warning-content': '#f6c30f',
        },
        dark: {
          ...require('daisyui/src/theming/themes')['dark'],
          primary: '#eaff74',
          'primary-content': '#2a3007',
          secondary: '#f1f5f9', // slate-100
          'secondary-content': '#0f172a', // slate-900
          // Informative colors
          info: '#e9f2ff',
          'info-content': '#0086fc',
          success: '#e3eee2',
          'success-content': '#00C454',
          error: '#fff0f0',
          'error-content': '#ff4e4e',
          warning: '#fefae6',
          'warning-content': '#f6c30f',
        },
      },
    ],
  },
}
