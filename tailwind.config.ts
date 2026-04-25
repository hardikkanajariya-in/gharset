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
        strongSurface: "var(--surface-strong)",

        primary: "var(--primary)",
        primaryDark: "var(--primary-dark)",
        primarySoft: "var(--primary-soft)",

        secondary: "var(--secondary)",
        secondaryDark: "var(--secondary-dark)",
        secondarySoft: "var(--secondary-soft)",

        accent: "var(--accent)",
        accentSoft: "var(--accent-soft)",

        ink: "var(--ink)",
        muted: "var(--muted)",
        mutedStrong: "var(--muted-strong)",

        line: "var(--line)",
        lineStrong: "var(--line-strong)",

        successBg: "var(--success-bg)",
        successText: "var(--success-text)",

        warningBg: "var(--warning-bg)",
        warningText: "var(--warning-text)",

        dangerBg: "var(--danger-bg)",
        dangerText: "var(--danger-text)"
      },
      boxShadow: {
        soft: "0 8px 24px rgba(8, 17, 31, 0.08)",
        lift: "0 16px 36px rgba(8, 17, 31, 0.16)",
        crisp: "0 2px 0 rgba(8, 17, 31, 0.08), 0 10px 22px rgba(8, 17, 31, 0.10)"
      }
    }
  },
  plugins: []
};

export default config;
