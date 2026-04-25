import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F8F5EF",
        surface: "#FFFFFF",
        mutedSurface: "#F1EDE6",
        primary: "#2F5D50",
        primaryDark: "#24483E",
        accent: "#B86B3E",
        ink: "#1F2933",
        muted: "#667085",
        line: "#E4DDD3"
      },
      boxShadow: {
        soft: "0 8px 24px rgba(31, 41, 51, 0.04)",
        lift: "0 16px 36px rgba(31, 41, 51, 0.07)"
      }
    }
  },
  plugins: []
};

export default config;
