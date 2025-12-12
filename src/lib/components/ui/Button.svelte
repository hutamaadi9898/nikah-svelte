<script lang="ts">
	/**
	 * Button component with Minimalist Luxury variants.
	 * Supports: primary, outline, ghost, danger.
	 */
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props extends HTMLButtonAttributes {
		/** Button style variant */
		variant?: 'primary' | 'outline' | 'ghost' | 'danger';
		/** Loading state - shows spinner and disables button */
		loading?: boolean;
		/** Full width button */
		fullWidth?: boolean;
		/** Button content */
		children: Snippet;
	}

	const {
		variant = 'primary',
		loading = false,
		fullWidth = false,
		disabled,
		children,
		class: className = '',
		...rest
	}: Props = $props();

	// Base classes shared across all variants
	const baseClasses = `
		inline-flex items-center justify-center gap-2
		rounded-md px-4 py-3
		font-body text-sm tracking-wide
		transition duration-200 ease-out
		disabled:opacity-50 disabled:cursor-not-allowed
		focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg
	`;

	// Variant-specific classes
	const variantClasses: Record<NonNullable<Props['variant']>, string> = {
		primary: 'bg-text text-bg border border-border/15 hover:bg-text/90',
		outline: 'bg-transparent text-text border border-border/20 hover:border-border/40 hover:bg-surface/50',
		ghost: 'bg-transparent text-text hover:bg-surface/60',
		danger: 'bg-red-600 text-white border border-red-700 hover:bg-red-700'
	};

	const widthClass = fullWidth ? 'w-full' : '';
</script>

<button
	class="{baseClasses} {variantClasses[variant]} {widthClass} {className}"
	disabled={disabled || loading}
	{...rest}
>
	{#if loading}
		<svg class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
			<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
			<path
				class="opacity-75"
				fill="currentColor"
				d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
			/>
		</svg>
	{/if}
	{@render children()}
</button>
