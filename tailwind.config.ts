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
				// Updated modern color palette
				blue: {
					light: '#E1EBFF',
					DEFAULT: '#4361EE',
					dark: '#3A0CA3',
				},
				teal: {
					light: '#E0FBFC',
					DEFAULT: '#48CAE4',
					dark: '#0096C7',
				},
				gray: {
					light: '#F8F9FA',
					DEFAULT: '#6C757D',
					dark: '#343A40',
				},
				orange: {
					light: '#FFE8D6',
					DEFAULT: '#FF9F1C',
					dark: '#F48C06',
				},
				brick: {
					light: '#FED2CF',
					DEFAULT: '#E63946',
					dark: '#D00000',
				},
				// Updated colors for financial categories
				expense: {
					light: '#FDE0DD',
					DEFAULT: '#E63946',
					dark: '#C1121F',
				},
				revenue: {
					light: '#D9F2D9',
					DEFAULT: '#38B000',
					dark: '#008000',
				},
				investment: {
					light: '#FFF3D6',
					DEFAULT: '#D4A373',
					dark: '#BC8A5F',
				},
				// Keep legacy color palette for backward compatibility
				purple: {
					light: '#EDE9FF',
					DEFAULT: '#7209B7',
					dark: '#560BAD',
				},
				green: {
					light: '#E3FCEF',
					DEFAULT: '#38B000',
				},
				yellow: {
					light: '#FFF8E1',
					DEFAULT: '#FFB800',
				},
				red: {
					light: '#FFE6E6',
					DEFAULT: '#E63946',
				},
				indigo: {
					light: '#E8EAF6',
					DEFAULT: '#4361EE',
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
