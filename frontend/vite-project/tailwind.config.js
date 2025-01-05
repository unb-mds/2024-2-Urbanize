/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '640px',  // Telas pequenas
      md: '768px',  // Telas médias
      lg: '1024px', // Telas grandes
      xl: '1280px', // Telas extra grandes
      '2xl': '1536px', // Telas muito grandes
    },
    extend: {
      colors: {
        customRed: '#FF0505', // Vermelho
        customLightGreen: '#00CD1F', // Verde
        customGrey: '#C7C5C5', // Cinza
        customBlue: '#104177', // Azul
      }
    },
  },
  plugins: [],
}

