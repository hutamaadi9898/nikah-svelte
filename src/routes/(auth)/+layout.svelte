<!--
  Auth layout: centered, breathable, minimalist card.
-->
<script lang="ts">
	import { page } from '$app/state';

	let { children } = $props();

	const titleByPath: Record<string, string> = {
		'/login': 'Welcome Back',
		'/register': 'Create Account'
	};

	const title = $derived(titleByPath[page.url.pathname] ?? 'Account');
</script>

<div class="min-h-dvh bg-bg text-text">
	<div class="mx-auto flex min-h-dvh w-full max-w-lg flex-col justify-center px-5 py-12">
		<div class="mb-6 text-center">
			<p class="font-body text-xs tracking-[0.28em] text-muted">NIKAH</p>
			<h1 class="mt-3 font-display text-3xl leading-tight tracking-tight">{title}</h1>
		</div>

		<div class="rounded-lg border border-border/10 bg-surface/70 p-6 shadow-soft backdrop-blur-sm">
			{@render children()}
		</div>
	</div>
</div>
