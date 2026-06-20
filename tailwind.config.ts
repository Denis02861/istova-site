import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: "#744436", dark: "#5A3328", light: "#A37260" },
        sand: { DEFAULT: "#F4F2EF", soft: "#FAF8F5", deep: "#E8E4DE" },
        moss: { DEFAULT: "#6D6652", dark: "#544E3F", light: "#8B8470" },
        nude: { DEFAULT: "#D3BCA3", soft: "#E5D6C4", deep: "#B89C7E" },
      },
      fontFamily: {
        display: ["UNCAGE", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        // serif оставлен для обратной совместимости — указывает на UNCAGE
        serif: ["UNCAGE", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
