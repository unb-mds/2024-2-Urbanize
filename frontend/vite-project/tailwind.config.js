/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        customRed: '#FF0505',
        customLightGreen: '#00CD1F',
        customGrey: '#C7C5C5',
        customBlue: '#104177',
      },
    },
  },
  plugins: [],
};
