import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        cream: "var(--background)",
        surface: "var(--surface)",
        mutedSurface: "var(--surface-muted)",

        primary: "var(--primary)",
        primaryDark: "var(--primary-dark)",
        primarySoft: "var(--primary-soft)",

        accent: "var(--accent)",

        ink: "var(--ink)",
        muted: "var(--muted)",
        mutedStrong: "var(--muted-strong)",

        line: "var(--line)",
        lineStrong: "var(--line-strong)",

        successBg: "var(--success-bg)",
        successText: "var(--success-text)",

        warningBg: "var(--warning-bg)",
        warningText: "var(--warning-text)"
      },
      boxShadow: {
        soft: "0 8px 24px rgba(17, 24, 39, 0.04)",
        lift: "0 14px 32px rgba(17, 24, 39, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;