/**
 * Tailwind configuration for Nikah (Minimalist Luxury).
 * Uses CSS variables from `src/app.css` to avoid hardcoded colors in components.
 */
import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: ['class', '[data-theme="dark"]'],
	theme: {
		extend: {
			fontFamily: {
				display: ['"Playfair Display"', 'serif'],
				body: ['Lato', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif']
			},
			colors: {
				bg: 'rgb(var(--color-bg) / <alpha-value>)',
				surface: 'rgb(var(--color-surface) / <alpha-value>)',
				text: 'rgb(var(--color-text) / <alpha-value>)',
				muted: 'rgb(var(--color-muted) / <alpha-value>)',
				border: 'rgb(var(--color-border) / <alpha-value>)',
				accent: {
					DEFAULT: 'rgb(var(--color-accent) / <alpha-value>)',
					soft: 'rgb(var(--color-accent-soft) / <alpha-value>)'
				}
			},
			borderRadius: {
				sm: 'var(--radius-sm)',
				md: 'var(--radius-md)',
				lg: 'var(--radius-lg)'
			},
			boxShadow: {
				soft: '0 12px 40px rgb(0 0 0 / 0.10)'
			}
		}
	},
	plugins: [typography]
};

export default config;
