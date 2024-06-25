import type { Config } from "tailwindcss";
// import colors from '@/assets/js/colors.mjs';

const config: Config = {
  content: [
    // "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    // "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    // "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        // ...colors,
        primary_layout: "#1e1f23",
        secondary_layout: "rgb(253,102,0)",
        primary_color: "white",
        fond: "#f2f3f7b3"
      }
    },
  },
  plugins: [],
};
export default config;
