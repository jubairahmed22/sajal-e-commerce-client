/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        'white-99': 'F8F5F1',
        'hex-99': '#53624e',
        'hex-142': '#e0e1df',
      },
      colors: {
        'custom-dark': '#1a1b1a',
      },
      boxShadow: {
        'glow': '0 0 10px #fff, 0 0 20px #fff, 0 0 30px #f0f, 0 0 40px #f0f, 0 0 50px #f0f, 0 0 60px #f0f, 0 0 70px #f0f',
      },
      fontFamily: {
        marcellus: ['Marcellus', 'serif'],
        jost: ['Jost', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        spaceMono: ['Space Mono', 'monospace'],
        montserrat: ['Montserrat', 'sans-serif'],
        courierPrime: ['Courier Prime', 'monospace'],
      },
      screens: {
        'sm': {'min': '335px', 'max': '780px'},
        'md': {'min': '781px', 'max': '1099px'},
        'pad': {'min': '1000px', 'max': '1299px'},
        'lap': {'min': '1300px', 'max': '1800px'},
      },
    },
  },
  plugins: [],
}
