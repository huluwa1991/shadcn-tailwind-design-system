/** @type {import('tailwindcss').Config} */
import twAnimateCss from 'tw-animate-css';

export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{mdx,md}',
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [twAnimateCss],
  safelist: [{ pattern: /.*/ }],
};
