import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      height: {
        calc: "10vh",
      },
      colors: {
        CAROLINA_BLUE: "#0085CA",
      },
      screens: {
        xxs: "320px",
        xs: "400px",
        sm: "550px",
        md: "800px",
        "3xl": "2200px",
      },
      fontSize: {
        sm: "12px",
        xs: "11px",
      },
    },
  },
  plugins: [],
};
export default config;
