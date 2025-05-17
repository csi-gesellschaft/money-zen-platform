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
				// DEXE-inspired color palette
				charcoal: {
					light: '#1E2227',
					DEFAULT: '#0E1014',
					dark: '#080A0D',
				},
				gray: {
					light: '#9BA1AF',
					DEFAULT: '#5C6272',
					dark: '#383C48',
				},
				teal: {
					light: '#7CF7E3',
					DEFAULT: '#40E1C6',
					dark: '#2ABEAA',
				},
				slate: {
					light: '#A0B4C8',
					DEFAULT: '#7A8B9A',
					dark: '#5D6E7A',
				},
				// Colors for financial categories
				expense: {
					light: '#FF5B79',
					DEFAULT: '#E61E3C',
					dark: '#C01431',
				},
				revenue: {
					light: '#52DE97',
					DEFAULT: '#33C17E',
					dark: '#289F66',
				},
				investment: {
					light: '#E6D2B3',
					DEFAULT: '#C4B091',
					dark: '#A08E72',
				},
				// Alternative names for teal for easier referencing
				mint: {
					light: '#7CF7E3',
					DEFAULT: '#40E1C6',
					dark: '#2ABEAA',
				},
				purple: {
					// This isn't in the image, but using these values since previous code uses 'purple'
					light: '#40E1C6',
					DEFAULT: '#40E1C6',
					dark: '#2ABEAA',
				},
				crimson: {
					// This isn't in the image, but keeping this since code uses it
					light: '#FF5B79',
					DEFAULT: '#E61E3C',
					dark: '#C01431',
				}
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
				},
				'slide-in': {
					'0%': {
						transform: 'translateY(10px)',
						opacity: '0'
					},
					'100%': {
						transform: 'translateY(0)',
						opacity: '1'
					}
				},
				'fade-in': {
					from: {
						opacity: '0'
					},
					to: {
						opacity: '1'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-light': 'pulse-light 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'slide-in': 'slide-in 0.3s ease-out',
				'fade-in': 'fade-in 0.3s ease-out'
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				mono: ['JetBrains Mono', 'monospace'],
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
