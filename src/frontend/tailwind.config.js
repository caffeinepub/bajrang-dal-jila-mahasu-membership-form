/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        maroon: {
          DEFAULT: "oklch(var(--maroon))",
          dark: "oklch(var(--maroon-dark))",
          600: "oklch(28 0.13 15)",
          700: "oklch(23 0.11 13)",
          800: "oklch(18 0.09 12)",
        },
        saffron: {
          DEFAULT: "oklch(var(--saffron))",
          light: "oklch(72 0.16 60)",
        },
        gold: "oklch(var(--gold))",
        cream: "oklch(var(--cream))",
        background: "oklch(var(--background))",
        foreground: "oklch(var(--foreground))",
        card: {
          DEFAULT: "oklch(var(--card))",
          foreground: "oklch(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "oklch(var(--popover))",
          foreground: "oklch(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "oklch(var(--primary))",
          foreground: "oklch(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "oklch(var(--secondary))",
          foreground: "oklch(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "oklch(var(--muted))",
          foreground: "oklch(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "oklch(var(--accent))",
          foreground: "oklch(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "oklch(var(--destructive))",
          foreground: "oklch(var(--destructive-foreground))",
        },
        border: "oklch(var(--border))",
        input: "oklch(var(--input))",
        ring: "oklch(var(--ring))",
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"],
        devanagari: ["Noto Sans Devanagari", "sans-serif"],
        "devanagari-serif": ["Noto Serif Devanagari", "serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        card: "0 4px 24px rgba(90, 15, 15, 0.12), 0 1px 4px rgba(90, 15, 15, 0.08)",
        "card-lg": "0 8px 40px rgba(90, 15, 15, 0.18), 0 2px 8px rgba(90, 15, 15, 0.1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
