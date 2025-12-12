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
		/** Optional href to render as anchor */
		href?: string;
		/** Button content */
		children: Snippet;
	}

	const {
		variant = 'primary',
		loading = false,
		fullWidth = false,
		disabled,
        href,
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
		primary: 'bg-accent text-white hover:bg-zinc-800 shadow-sm', // High contrast black
		outline: 'bg-transparent text-text border border-border hover:bg-zinc-50',
		ghost: 'bg-transparent text-muted hover:text-text hover:bg-zinc-100/50',
		danger: 'bg-red-600 text-white hover:bg-red-700 shadow-sm',
        subtle: 'bg-zinc-100 text-text border border-transparent hover:bg-zinc-200/80 shadow-sm'
	};

	const widthClass = $derived(fullWidth ? 'w-full' : '');
    
    // Derived: Combine classes
    const combinedClasses = $derived(`${baseClasses} ${variantClasses[variant]} ${widthClass} ${className}`);
</script>

{#if href}
    <a
        {href}
        class={combinedClasses}
        {...rest as any}
    >
        {@render children()}
    </a>
{:else}
    <button
        class={combinedClasses}
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
{/if}
