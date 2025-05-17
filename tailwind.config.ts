
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
        // Financial category colors
        expense: {
          light: "#FFBDBD",
          DEFAULT: "#FF5A5A",
          dark: "#DE3B3B",
        },
        revenue: {
          light: "#C3FFBD",
          DEFAULT: "#4CAF50",
          dark: "#3B8C3E",
        },
        investment: {
          light: "#FFE8BD",
          DEFAULT: "#FFB74D",
          dark: "#F59E0B",
        },
        // Basic UI colors
        blue: {
          light: "#D1E9FF",
          DEFAULT: "#2196F3",
          dark: "#1976D2",
        },
        gray: {
          light: "#F5F5F5",
          DEFAULT: "#9E9E9E",
          dark: "#616161",
        },
        orange: {
          light: "#FFE0B2",
          DEFAULT: "#FF9800",
          dark: "#F57C00",
        },
        teal: {
          light: "#B2DFDB",
          DEFAULT: "#009688",
          dark: "#00796B",
        },
        brick: {
          light: "#FFCCBC",
          DEFAULT: "#FF5722",
          dark: "#E64A19",
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 0.25rem)",
        sm: "calc(var(--radius) - 0.5rem)"
      },
      keyframes: {
        "accordion-down": {
          from: { height: '0' },
          to: { height: "var(--radix-accordion-content-height)" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: '0' }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out"
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
