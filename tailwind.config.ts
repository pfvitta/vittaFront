import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        tertiary: "var(--color-tertiary)",
        quaternary: "var(--color-quaternary)",
      },
      fontFamily: {
        primary: ["var(--font-geist-sans)", "sans-serif"],
        secondary: ["var(--font-geist-mono)", "monospace"],
      },
      height: {
        navbar: "2rem",
      }
    },
  },
  plugins: [],
} satisfies Config;