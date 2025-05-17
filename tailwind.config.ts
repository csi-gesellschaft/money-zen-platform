
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
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Modern color palette
				blue: {
					light: '#E1F0FF',
					DEFAULT: '#2563EB',
					dark: '#1E40AF',
				},
				teal: {
					light: '#CCFBF1',
					DEFAULT: '#14B8A6',
					dark: '#0F766E',
				},
				gray: {
					light: '#F9FAFB',
					DEFAULT: '#64748B',
					dark: '#334155',
				},
				orange: {
					light: '#FFEDD5',
					DEFAULT: '#F97316',
					dark: '#EA580C',
				},
				brick: {
					light: '#FEE2E2',
					DEFAULT: '#EF4444',
					dark: '#B91C1C',
				},
				// Financial categories colors
				expense: {
					light: '#FEE2E2',
					DEFAULT: '#EF4444',
					dark: '#B91C1C',
				},
				revenue: {
					light: '#DCFCE7',
					DEFAULT: '#10B981',
					dark: '#059669',
				},
				investment: {
					light: '#FEF3C7',
					DEFAULT: '#F59E0B',
					dark: '#D97706',
				},
				// Legacy colors for compatibility
				purple: {
					light: '#EDE9FE',
					DEFAULT: '#8B5CF6',
					dark: '#6D28D9',
				},
				green: {
					light: '#DCFCE7',
					DEFAULT: '#10B981',
				},
				yellow: {
					light: '#FEF3C7',
					DEFAULT: '#F59E0B',
				},
				red: {
					light: '#FEE2E2',
					DEFAULT: '#EF4444',
				},
				indigo: {
					light: '#E0E7FF',
					DEFAULT: '#6366F1',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 0.25rem)',
				sm: 'calc(var(--radius) - 0.5rem)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'pulse-light': {
					'0%, 100%': {
						opacity: '1'
					},
					'50%': {
						opacity: '0.8'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-light': 'pulse-light 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
