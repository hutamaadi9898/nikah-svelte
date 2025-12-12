<script lang="ts">
	/** Footer component with minimal branding. */
	interface Props {
		/** Show full footer with links, or minimal footer */
		variant?: 'minimal' | 'full';
	}

	const { variant = 'minimal' }: Props = $props();
</script>

<footer class="border-t border-border/10 py-8">
	<div class="mx-auto max-w-6xl px-6">
		{#if variant === 'full'}
			<div class="grid grid-cols-2 gap-8 md:grid-cols-4">
				<div>
					<h4 class="font-display text-sm tracking-tight mb-3">NIKAH</h4>
					<p class="text-xs text-muted leading-relaxed">
						Beautiful wedding invitations, crafted with love.
					</p>
				</div>
				<!-- Could add more columns for links -->
			</div>
			<div class="mt-8 pt-6 border-t border-border/5">
				<p class="text-xs text-muted text-center">
					&copy; {new Date().getFullYear()} NIKAH. All rights reserved.
				</p>
			</div>
		{:else}
			<p class="text-xs text-muted text-center tracking-wide">
				Made with <span class="text-accent">&hearts;</span> by NIKAH
			</p>
		{/if}
	</div>
</footer>
