<script lang="ts">
	/**
	 * Input component with floating label animation.
	 * Follows "Minimalist Luxury" aesthetic - underlined, subtle transitions.
	 */
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface Props extends HTMLInputAttributes {
		/** Label text displayed above the input */
		label: string;
		/** Error message to display */
		error?: string;
		/** Bound value */
		value?: string;
	}

	let { label, error, id, value = $bindable(''), class: className = '', ...rest }: Props = $props();

	// Generate a unique ID if not provided
	const inputId = id ?? `input-${Math.random().toString(36).slice(2, 9)}`;
</script>

<div class="space-y-2 {className}">
	<label class="block text-xs tracking-[0.18em] text-muted uppercase" for={inputId}>
		{label}
	</label>
	<input
		id={inputId}
		class="
			w-full rounded-md
			border border-border/10 bg-bg/60
			px-4 py-3 text-sm text-text
			outline-none ring-0 transition duration-200
			placeholder:text-muted/50
			focus:border-accent/40
			aria-invalid:border-red-500/50
		"
		bind:value
		aria-invalid={!!error}
		{...rest}
	/>
	{#if error}
		<p class="text-xs text-red-500">{error}</p>
	{/if}
</div>
