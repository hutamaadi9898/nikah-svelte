<!--
	Landing page for NIKAH - Minimalist Luxury Wedding Invitations.
	Connects to login/register and showcases the product.
-->
<script lang="ts">
	import { Button } from '$lib/components/ui';
	import { Footer } from '$lib/components/layout';
	import { page } from '$app/state';

	// Check if user is logged in
	const user = $derived(page.data?.user);
</script>

<svelte:head>
	<title>NIKAH - Elegant Wedding Invitations</title>
	<meta name="description" content="Create beautiful, minimalist wedding invitations that your guests will love." />
</svelte:head>

<div class="min-h-dvh bg-bg">
	<!-- Navbar -->
	<header class="fixed top-0 left-0 right-0 z-50 border-b border-border/10 bg-surface/80 backdrop-blur-md">
		<nav class="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
			<a href="/" class="font-display text-xl tracking-tight text-accent">NIKAH</a>
			<div class="flex items-center gap-4">
				{#if user}
					<a href="/admin" class="text-sm text-muted hover:text-text transition">Dashboard</a>
					{#if user.role === 'superadmin'}
						<a href="/superadmin" class="text-sm text-red-500 hover:text-red-400 transition">SuperAdmin</a>
					{/if}
				{:else}
					<a href="/login" class="text-sm text-muted hover:text-text transition">Sign in</a>
					<a href="/register">
						<Button>Get Started</Button>
					</a>
				{/if}
			</div>
		</nav>
	</header>

	<!-- Hero Section -->
	<section class="pt-32 pb-24 px-6">
		<div class="mx-auto max-w-4xl text-center">
			<p class="text-xs tracking-[0.3em] text-accent uppercase mb-4 animate-fade-in">Premium Wedding Invitations</p>
			<h1 class="font-display text-5xl md:text-7xl tracking-tight leading-tight animate-fade-in-up">
				Celebrate Your Love<br />
				<span class="italic text-accent">Beautifully</span>
			</h1>
			<p class="mt-6 text-lg text-muted max-w-2xl mx-auto animate-fade-in-up" style="animation-delay: 100ms">
				Create stunning, minimalist wedding invitations that reflect your unique story. Share with guests, collect RSVPs, and manage everything in one place.
			</p>
			<div class="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style="animation-delay: 200ms">
				{#if user}
					<a href="/admin">
						<Button>Go to Dashboard</Button>
					</a>
				{:else}
					<a href="/register">
						<Button>Create Your Invitation</Button>
					</a>
					<a href="/demo-wedding">
						<Button variant="outline">View Demo</Button>
					</a>
				{/if}
			</div>
		</div>
	</section>

	<!-- Features Section -->
	<section class="py-24 px-6 bg-surface/30">
		<div class="mx-auto max-w-6xl">
			<h2 class="font-display text-3xl md:text-4xl text-center tracking-tight mb-16">Everything You Need</h2>
			<div class="grid md:grid-cols-3 gap-8">
				<div class="text-center">
					<div class="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center text-2xl">📋</div>
					<h3 class="font-display text-xl mb-2">RSVP Management</h3>
					<p class="text-muted text-sm">Track guest responses, meal preferences, and +1s all in one dashboard.</p>
				</div>
				<div class="text-center">
					<div class="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center text-2xl">📸</div>
					<h3 class="font-display text-xl mb-2">Photo Gallery</h3>
					<p class="text-muted text-sm">Share your engagement photos and pre-wedding moments beautifully.</p>
				</div>
				<div class="text-center">
					<div class="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center text-2xl">💬</div>
					<h3 class="font-display text-xl mb-2">Digital Guestbook</h3>
					<p class="text-muted text-sm">Collect heartfelt wishes from your guests before and after the big day.</p>
				</div>
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="py-24 px-6">
		<div class="mx-auto max-w-2xl text-center">
			<h2 class="font-display text-3xl md:text-4xl tracking-tight mb-4">Ready to Begin?</h2>
			<p class="text-muted mb-8">Join couples who have chosen elegance.</p>
			{#if !user}
				<a href="/register">
					<Button>Start Free</Button>
				</a>
			{:else}
				<a href="/admin">
					<Button>View Dashboard</Button>
				</a>
			{/if}
		</div>
	</section>

	<Footer variant="full" />
</div>

<style>
	@keyframes fade-in {
		from { opacity: 0; }
		to { opacity: 1; }
	}
	@keyframes fade-in-up {
		from { opacity: 0; transform: translateY(20px); }
		to { opacity: 1; transform: translateY(0); }
	}
	.animate-fade-in {
		animation: fade-in 0.6s ease-out both;
	}
	.animate-fade-in-up {
		animation: fade-in-up 0.6s ease-out both;
	}
</style>
