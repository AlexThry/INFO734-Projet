/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      screens: {
        '2xl': { min: '1535px' },
        'xl': { min: '1279px' },
        'lg': { min: '1023px' },
        'md': { min: '767px' },
        'sm': { min: '639px' },
      },
      fontSize: {
        'xxs': ['0.625rem', '1rem']
      }
    },
  },
  plugins: [
    require('flowbite/plugin')

  ],
}

