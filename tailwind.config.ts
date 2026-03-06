import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['var(--font-heading)'],
        sans: ['var(--font-body)'],
      },
      colors: {
        primary: "#002147",
        secondary: "#FFD700",
        accent: "#A4001F",
      },
    },
  },
  plugins: [],
};
export default config;