<script lang="ts">
	import { page } from '$app/state';

	const user = $derived(page.data?.user);
	let scrollY = $state(0);
</script>

<svelte:window bind:scrollY={scrollY} />

<div class="min-h-screen bg-white">
	<!-- Navigation -->
	<nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 {scrollY > 50 ? 'bg-white/95 backdrop-blur-sm border-b border-zinc-200 shadow-sm' : 'bg-transparent'}">
		<div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
			<a href="/" class="font-display text-xl {scrollY > 50 ? 'text-zinc-900' : 'text-white'}">
				Nikah
			</a>
			<div class="flex items-center gap-4">
				{#if user}
					<a 
						href="/admin" 
						class="px-5 py-2 rounded-lg text-sm font-medium transition-colors
							{scrollY > 50 ? 'bg-zinc-900 text-white hover:bg-zinc-800' : 'bg-white text-zinc-900 hover:bg-zinc-100'}"
					>
						Dashboard
					</a>
				{:else}
					<a 
						href="/login" 
						class="text-sm font-medium transition-opacity hover:opacity-70 {scrollY > 50 ? 'text-zinc-600' : 'text-white'}"
					>
						Sign In
					</a>
					<a 
						href="/register"
						class="px-5 py-2 rounded-lg text-sm font-medium transition-colors
							{scrollY > 50 ? 'bg-zinc-900 text-white hover:bg-zinc-800' : 'bg-white text-zinc-900 hover:bg-zinc-100'}"
					>
						Get Started
					</a>
				{/if}
			</div>
		</div>
	</nav>

	<!-- Hero Section -->
	<header class="relative min-h-screen flex items-center justify-center overflow-hidden">
		<!-- Background Image -->
		<div class="absolute inset-0">
			<img 
				src="/images/hero-wedding.jpg" 
				alt="Wedding" 
				class="w-full h-full object-cover"
			/>
			<div class="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>
		</div>

		<!-- Hero Content -->
		<div class="relative z-10 text-center px-6 max-w-4xl mx-auto">
			<h1 class="font-display text-4xl sm:text-5xl md:text-7xl text-white leading-tight mb-6 animate-fade-up">
				Your Wedding,<br/>Beautifully Simple.
			</h1>
			<p class="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto mb-10 animate-fade-up animation-delay-100">
				The elegant, ad-free wedding invitation platform for modern couples.
			</p>
			<div class="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up animation-delay-200">
				{#if user}
					<a href="/admin" class="w-full sm:w-auto px-8 py-4 bg-white text-zinc-900 rounded-lg font-medium text-lg hover:bg-zinc-100 transition-colors shadow-lg">
						Go to Dashboard
					</a>
				{:else}
					<a href="/register" class="w-full sm:w-auto px-8 py-4 bg-white text-zinc-900 rounded-lg font-medium text-lg hover:bg-zinc-100 transition-colors shadow-lg">
						Start for Free
					</a>
					<a href="#features" class="w-full sm:w-auto px-8 py-4 border border-white/30 text-white rounded-lg font-medium text-lg hover:bg-white/10 transition-colors backdrop-blur-sm">
						Learn More
					</a>
				{/if}
			</div>
		</div>

		<!-- Scroll Indicator -->
		<div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
			<svg class="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
			</svg>
		</div>
	</header>

	<!-- Features Section -->
	<section id="features" class="py-24 px-6 bg-zinc-50">
		<div class="max-w-6xl mx-auto">
			<div class="text-center mb-16">
				<h2 class="font-display text-3xl sm:text-4xl text-zinc-900 mb-4">Everything You Need</h2>
				<p class="text-zinc-500 text-lg max-w-xl mx-auto">
					Manage your special day without the clutter. Just pure, beautiful simplicity.
				</p>
			</div>

			<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
				<div class="bg-white rounded-2xl p-8 border border-zinc-200 hover:shadow-lg transition-shadow">
					<div class="w-14 h-14 bg-zinc-100 rounded-xl flex items-center justify-center text-2xl mb-6">
						💌
					</div>
					<h3 class="font-display text-xl text-zinc-900 mb-3">Digital RSVPs</h3>
					<p class="text-zinc-500 leading-relaxed">
						Collect RSVPs effortlessly. Track dietary requirements and plus-ones in real-time.
					</p>
				</div>

				<div class="bg-white rounded-2xl p-8 border border-zinc-200 hover:shadow-lg transition-shadow">
					<div class="w-14 h-14 bg-zinc-100 rounded-xl flex items-center justify-center text-2xl mb-6">
						📸
					</div>
					<h3 class="font-display text-xl text-zinc-900 mb-3">Photo Gallery</h3>
					<p class="text-zinc-500 leading-relaxed">
						Share high-resolution photos with your guests. A beautiful grid for beautiful memories.
					</p>
				</div>

				<div class="bg-white rounded-2xl p-8 border border-zinc-200 hover:shadow-lg transition-shadow">
					<div class="w-14 h-14 bg-zinc-100 rounded-xl flex items-center justify-center text-2xl mb-6">
						📖
					</div>
					<h3 class="font-display text-xl text-zinc-900 mb-3">Your Love Story</h3>
					<p class="text-zinc-500 leading-relaxed">
						Tell your unique journey. Share how you met and the moments that led to yes.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Quote Section -->
	<section class="relative py-32 px-6 overflow-hidden">
		<div class="absolute inset-0">
			<img 
				src="/images/floral-divider.jpg" 
				alt="Flowers" 
				class="w-full h-full object-cover"
			/>
			<div class="absolute inset-0 bg-black/40"></div>
		</div>
		<div class="relative z-10 max-w-3xl mx-auto text-center">
			<blockquote class="font-display text-3xl sm:text-4xl md:text-5xl text-white leading-tight">
				"The best thing to hold onto in life is each other."
			</blockquote>
			<cite class="block mt-6 text-white/70 text-lg">— Audrey Hepburn</cite>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="py-24 px-6 bg-white">
		<div class="max-w-2xl mx-auto text-center">
			<h2 class="font-display text-3xl sm:text-4xl text-zinc-900 mb-4">Ready to Begin?</h2>
			<p class="text-zinc-500 text-lg mb-10">
				Create your wedding website today. No credit card required.
			</p>
			{#if user}
				<a 
					href="/admin" 
					class="inline-flex px-10 py-4 bg-zinc-900 text-white rounded-lg font-medium text-lg hover:bg-zinc-800 transition-colors shadow-lg"
				>
					Go to Dashboard
				</a>
			{:else}
				<a 
					href="/register" 
					class="inline-flex px-10 py-4 bg-zinc-900 text-white rounded-lg font-medium text-lg hover:bg-zinc-800 transition-colors shadow-lg"
				>
					Create My Wedding
				</a>
			{/if}
		</div>
	</section>

	<!-- Footer -->
	<footer class="py-12 px-6 border-t border-zinc-200 bg-white">
		<div class="max-w-6xl mx-auto flex flex-col items-center gap-6">
			<span class="font-display text-2xl">Nikah</span>
			<div class="flex gap-8 text-sm text-zinc-500">
				<a href="/privacy" class="hover:text-zinc-900 transition-colors">Privacy</a>
				<a href="/terms" class="hover:text-zinc-900 transition-colors">Terms</a>
				<a href="/contact" class="hover:text-zinc-900 transition-colors">Contact</a>
			</div>
			<p class="text-zinc-400 text-sm">© 2025 Nikah. Built with love.</p>
		</div>
	</footer>
</div>

<style>
	.animate-fade-up {
		animation: fadeUp 0.8s ease-out forwards;
		opacity: 0;
	}
	
	.animation-delay-100 {
		animation-delay: 0.1s;
	}
	
	.animation-delay-200 {
		animation-delay: 0.2s;
	}
	
	@keyframes fadeUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
