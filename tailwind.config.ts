import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-body)'],
        heading: ['var(--font-heading)'],
      },
      colors: {
        primary: '#002366',
        secondary: '#FFD700',
        accent: '#FF6347',
      },
      animation: {
        fadeIn: 'fadeIn 0.8s ease-out forwards',
        slideUp: 'slideUp 0.8s ease-out forwards',
        marquee: 'marquee 25s linear infinite',
        float: 'float 6s ease-in-out infinite',
        scaleIn: 'scaleIn 0.6s ease-out forwards',
        glow: 'pulse-glow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
export default config;