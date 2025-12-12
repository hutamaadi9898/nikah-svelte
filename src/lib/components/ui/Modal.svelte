<script lang="ts">
	/**
	 * Modal component with backdrop blur and elegant transitions.
	 * Uses native dialog element for accessibility.
	 */
	import type { Snippet } from 'svelte';

	interface Props {
		/** Controls modal visibility */
		open: boolean;
		/** Called when modal should close (backdrop click or Escape) */
		onClose: () => void;
		/** Modal title displayed in header */
		title?: string;
		/** Modal content */
		children: Snippet;
	}

	const { open, onClose, title, children }: Props = $props();

	let dialogEl: HTMLDialogElement | undefined = $state();

	// Sync open state with native dialog
	$effect(() => {
		if (!dialogEl) return;
		if (open && !dialogEl.open) {
			dialogEl.showModal();
		} else if (!open && dialogEl.open) {
			dialogEl.close();
		}
	});

	function handleBackdropClick(e: MouseEvent) {
		// Close only if clicking the backdrop (dialog element itself)
		if (e.target === dialogEl) onClose();
	}
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<dialog
	bind:this={dialogEl}
	class="
		max-w-lg w-full mx-auto
		rounded-lg border border-border/10
		bg-surface/95 backdrop-blur-md
		p-0 shadow-xl
		open:animate-in open:fade-in open:zoom-in-95
		transition-all duration-300
		[&::backdrop]:bg-black/50 [&::backdrop]:backdrop-blur-sm
	"
	onclose={onClose}
	onclick={handleBackdropClick}
	onkeydown={(e) => e.key === 'Escape' && onClose()}
>
	{#if title}
		<header class="border-b border-border/10 px-6 py-4">
			<h2 class="font-display text-xl tracking-tight">{title}</h2>
		</header>
	{/if}

	<div class="p-6">
		{@render children()}
	</div>
</dialog>
