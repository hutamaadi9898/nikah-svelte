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
                w-full rounded-md
                border border-border bg-white
                px-3.5 py-2.5 text-sm text-text
                outline-none ring-0 transition-all duration-200
                placeholder:text-muted/50
                focus:border-accent focus:ring-1 focus:ring-accent
                group-hover:border-zinc-300
                aria-invalid:border-red-500 aria-invalid:focus:ring-red-500
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
