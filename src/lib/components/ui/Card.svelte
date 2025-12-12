<script lang="ts">
	/**
	 * Card component for consistent container styling.
	 * Features: High radius, refined glassmorphism.
	 */
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/** Card visual variant */
		variant?: 'default' | 'elevated' | 'outlined' | 'glass';
		/** Card content */
		children: Snippet;
	}

	const { variant = 'default', children, class: className = '', ...rest }: Props = $props();

	const variantClasses: Record<NonNullable<Props['variant']>, string> = {
		default: 'bg-surface border border-border/40 shadow-sm shadow-stone-200/50',
		elevated: 'bg-surface border-0 shadow-[0_8px_30px_rgb(0,0,0,0.04)]', // Soft, boutique shadow
		outlined: 'bg-transparent border border-border',
        glass: 'bg-surface border border-border/40 shadow-sm' // Fallback to default for now as we removed glass
	};
</script>

<div class="rounded-2xl p-8 {variantClasses[variant]} {className}" {...rest}>
	{@render children()}
</div>
