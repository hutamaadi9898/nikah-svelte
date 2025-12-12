<script lang="ts">
	/**
	 * Navbar component with sticky glassmorphism effect.
	 * Supports both public wedding view and admin dashboard.
	 */
	import type { Snippet } from 'svelte';

	interface Props {
		/** Brand/Logo text or content */
		brand?: Snippet;
		/** Navigation items */
		children?: Snippet;
		/** Makes navbar transparent until scroll */
		transparent?: boolean;
	}

	const { brand, children, transparent = false }: Props = $props();

	let scrolled = $state(false);

	$effect(() => {
		const handleScroll = () => {
			scrolled = window.scrollY > 50;
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	});

	const bgClass = $derived(
		transparent && !scrolled
			? 'bg-transparent border-transparent'
			: 'bg-surface/80 border-border/10 backdrop-blur-md'
	);
</script>

<header
	class="
		fixed top-0 left-0 right-0 z-50
		border-b transition-all duration-300
		{bgClass}
	"
>
	<nav class="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
		<!-- Brand -->
		<div class="font-display text-lg tracking-tight">
			{#if brand}
				{@render brand()}
			{:else}
				<span class="text-accent">NIKAH</span>
			{/if}
		</div>

		<!-- Navigation items -->
		{#if children}
			<div class="flex items-center gap-6">
				{@render children()}
			</div>
		{/if}
	</nav>
</header>

<!-- Spacer to prevent content from going under fixed navbar -->
<div class="h-16"></div>
