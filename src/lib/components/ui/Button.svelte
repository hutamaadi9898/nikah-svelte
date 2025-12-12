<script lang="ts">
	/**
	 * Button component with Modern Editorial variants.
	 * Supports: primary, outline, ghost, danger, subtle.
	 * Shape: Pill (rounded-full)
	 */
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props extends HTMLButtonAttributes {
		/** Button style variant */
		variant?: 'primary' | 'outline' | 'ghost' | 'danger' | 'subtle';
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
		rounded-full px-6 py-3
		font-body text-[0.925rem] font-medium tracking-normal
		transition-all duration-300 ease-out
		disabled:opacity-50 disabled:cursor-not-allowed
		active:scale-[0.98]
		focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg
	`;

	// Variant-specific classes
	const variantClasses: Record<NonNullable<Props['variant']>, string> = {
		primary: 'bg-accent text-white border border-transparent hover:bg-accent/90 shadow-md shadow-accent/20 hover:shadow-lg hover:shadow-accent/30',
		outline: 'bg-transparent text-text border border-border hover:border-accent hover:text-accent hover:bg-surface',
		ghost: 'bg-transparent text-text hover:bg-surface text-muted hover:text-accent',
		danger: 'bg-red-700 text-white border border-transparent hover:bg-red-800 shadow-sm',
        subtle: 'bg-surface text-text border border-border hover:border-accent/30 hover:bg-white shadow-sm'
	};

	const widthClass = $derived(fullWidth ? 'w-full' : '');
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
