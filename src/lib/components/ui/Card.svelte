<script lang="ts">
	/**
	 * Card component for consistent container styling.
	 * Glassmorphism effect with subtle border.
	 */
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/** Card visual variant */
		variant?: 'default' | 'elevated' | 'outlined';
		/** Card content */
		children: Snippet;
	}

	const { variant = 'default', children, class: className = '', ...rest }: Props = $props();

	const variantClasses: Record<NonNullable<Props['variant']>, string> = {
		default: 'bg-surface/70 border border-border/10 shadow-soft backdrop-blur-sm',
		elevated: 'bg-surface/90 border border-border/15 shadow-xl backdrop-blur-md',
		outlined: 'bg-transparent border border-border/20'
	};
</script>

<div class="rounded-lg p-6 {variantClasses[variant]} {className}" {...rest}>
	{@render children()}
</div>
