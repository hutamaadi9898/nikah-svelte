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
		default: 'bg-surface border border-border shadow-[0px_4px_20px_0px_rgba(0,0,0,0.02)]', // Extremely subtle elegant shadow
		elevated: 'bg-surface border border-border shadow-lg shadow-zinc-200/50',
		outlined: 'bg-transparent border border-border',
        glass: 'bg-surface/80 border border-border backdrop-blur-sm' // Subtle glass, not heavy
	};
</script>

<div class="rounded-2xl p-8 {variantClasses[variant]} {className}" {...rest}>
	{@render children()}
</div>
