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
				// Zentrix-inspired color palette
				zentrix: {
					background: '#0B0D20', // Deep blue background
					card: '#111936',       // Slightly lighter card background
					accent1: '#B1FF36',    // Lime green for accents
					accent2: '#40E1C6',    // Cyan blue for accents
					accent3: '#F24E76',    // Magenta pink for accents
					accent4: '#F5D45A',    // Golden yellow for alerts/notifications
				},
				// Keep financial category colors
				expense: {
					light: '#F24E76', // Changed to match theme
					DEFAULT: '#E61E3C',
					dark: '#C01431',
				},
				revenue: {
					light: '#B1FF36', // Changed to match theme
					DEFAULT: '#90E82E',
					dark: '#73C825',
				},
				investment: {
					light: '#F5D45A', // Changed to match theme
					DEFAULT: '#E9BE39',
					dark: '#C39C24',
				},
				// Map previous color names to new theme colors
				charcoal: {
					light: '#2D3054',
					DEFAULT: '#111936',
					dark: '#0B0D20',
				},
				gray: {
					light: '#9BA1AF',
					DEFAULT: '#5C6272',
					dark: '#383C48',
				},
				teal: {
					light: '#40E1C6',
					DEFAULT: '#28C4AD',
					dark: '#1BA89E',
				},
				slate: {
					light: '#A0B4C8',
					DEFAULT: '#7A8B9A',
					dark: '#5D6E7A',
				},
				mint: {
					light: '#40E1C6',
					DEFAULT: '#28C4AD',
					dark: '#1BA89E',
				},
				purple: {
					light: '#B290FF',
					DEFAULT: '#9D6FFF',
					dark: '#7D4FE0',
				},
				crimson: {
					light: '#F24E76',
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
				},
				'pulse-glow': {
					'0%, 100%': {
						boxShadow: '0 0 10px rgba(177, 255, 54, 0.5)'
					},
					'50%': {
						boxShadow: '0 0 20px rgba(177, 255, 54, 0.8)'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0)'
					},
					'50%': {
						transform: 'translateY(-10px)'
					}
				},
				'neon-pulse': {
					'0%, 100%': {
						filter: 'drop-shadow(0 0 5px rgba(64, 225, 198, 0.7))'
					},
					'50%': {
						filter: 'drop-shadow(0 0 15px rgba(64, 225, 198, 1))'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-light': 'pulse-light 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'slide-in': 'slide-in 0.3s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
				'float': 'float 6s ease-in-out infinite',
				'neon-pulse': 'neon-pulse 3s ease-in-out infinite'
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				mono: ['JetBrains Mono', 'monospace'],
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
