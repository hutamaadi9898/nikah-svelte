<script lang="ts">
	/**
	 * Input component with Modern Editorial aesthetic.
	 * Features: Subtle borders, clean typography, soft focus states.
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

	// Generate a unique ID if not provided, keep it stable
	const defaultId = `input-${Math.random().toString(36).slice(2, 9)}`;
	const inputId = $derived(id ?? defaultId);
</script>

<div class="space-y-1.5 {className}">
	<label class="block text-xs font-medium tracking-wide text-muted uppercase ml-1" for={inputId}>
		{label}
	</label>
	<div class="relative group">
        <input
            id={inputId}
            class="
                w-full rounded-lg
                border-0 bg-stone-100
                px-4 py-3 text-[0.95rem] text-text
                outline-none ring-1 ring-transparent transition-all duration-300
                placeholder:text-muted/60
                focus:bg-white focus:ring-accent/50 focus:shadow-md focus:shadow-accent/5
                group-hover:bg-stone-50
                aria-invalid:ring-red-500/50 aria-invalid:focus:ring-red-500
            "
            bind:value
            aria-invalid={!!error}
            {...rest}
        />
    </div>
	{#if error}
		<p class="text-xs text-red-500 ml-1">{error}</p>
	{/if}
</div>
