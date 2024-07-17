/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    borderOpacity: '1',
    extend: {
      colors: {
        primary: '#4f679b',
        black: '#000',
        gray: '#cfcfcf',
        disabled: '#E4E4E4',
        white: '#fff',
        green: '#8fbb33',
        orange: '#ff7800',
        yellow: '#ffd60a',
        red: '#ff4d4f',
        bg: '#f1f4f9',
        content: '#fff',
        stroke: '#8b8b8b',
        gr: '#4f679b',
      },
    },
    screens: {
      md: { min: '1024px' },
      sm: { min: '768px' },
      xs: { min: '568px' },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
