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
				// New color palette
				blue: {
					light: '#D5E3FF',
					DEFAULT: '#4B7CCC',
					dark: '#3A61A3',
				},
				teal: {
					light: '#E3FEFF',
					DEFAULT: '#77F2FF',
					dark: '#5BC2CC',
				},
				gray: {
					light: '#F5F6F8',
					DEFAULT: '#858D99',
					dark: '#606A7B',
				},
				orange: {
					light: '#FFE9E0',
					DEFAULT: '#FF8658',
					dark: '#E06B42',
				},
				brick: {
					light: '#FFDBD7',
					DEFAULT: '#CC5948',
					dark: '#A3463A',
				},
				// Colors for financial categories
				expense: {
					light: '#FFD7D5',
					DEFAULT: '#E74C3C',
					dark: '#C0392B',
				},
				revenue: {
					light: '#D7F9E9',
					DEFAULT: '#2ECC71',
					dark: '#27AE60',
				},
				investment: {
					light: '#FFF5E0',
					DEFAULT: '#E2C9A6',
					dark: '#C4A484',
				},
				// Keep legacy color palette for backward compatibility
				purple: {
					light: '#EDE9FF',
					DEFAULT: '#6C5CE7',
					dark: '#5541D9',
				},
				green: {
					light: '#E3FCEF',
					DEFAULT: '#0CCE6B',
				},
				yellow: {
					light: '#FFF8E1',
					DEFAULT: '#FDCB6E',
				},
				red: {
					light: '#FFE6E6',
					DEFAULT: '#FF6B6B',
				},
				indigo: {
					light: '#E8EAF6',
					DEFAULT: '#546DE5',
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
