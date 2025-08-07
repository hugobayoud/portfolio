/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['selector', '.dark-theme'],
  theme: {
    extend: {
      fontFamily: {
        'tt-trailers-bold': ['var(--font-tt-trailers-bold)'],
        'poppins-regular': ['var(--font-poppins-regular)'],
        'open-sans': ['var(--font-open-sans)'],
      },
    },
  },
};
