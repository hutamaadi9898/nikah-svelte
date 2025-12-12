<!--
	Public wedding invitation page.
	Uses the "Ethereal Minimalist" template - Minimalist Luxury aesthetic.
-->
<script lang="ts">
	import { Countdown, AudioPlayer, RSVPForm } from '$lib/components/wedding';
	import { Footer } from '$lib/components/layout';
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();

	const { wedding, stories, gallery, wishes } = data;

	// Smooth scroll to section
	function scrollTo(sectionId: string) {
		document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
	}
</script>

<svelte:head>
	<title>{wedding.coupleNames} - Wedding Invitation</title>
	<meta name="description" content="You are invited to celebrate the wedding of {wedding.coupleNames}" />
</svelte:head>

<!-- Floating Audio Player -->
<AudioPlayer src="/audio/wedding-music.mp3" autoplay />

<!-- Hero Section -->
<section
	id="hero"
	class="relative min-h-dvh flex flex-col items-center justify-center px-6 text-center"
>
	<!-- Background gradient -->
	<div class="absolute inset-0 bg-gradient-to-b from-bg via-bg/95 to-surface/50 -z-10" />

	<!-- Content with fade-in animation -->
	<div class="animate-fade-in-up">
		<p class="text-xs tracking-[0.3em] text-muted uppercase mb-4">The Wedding of</p>
		<h1 class="font-display text-5xl md:text-7xl tracking-tight text-balance leading-tight">
			{wedding.coupleNames}
		</h1>
		<p class="mt-6 text-lg text-muted font-light">
			{new Date(wedding.weddingDate).toLocaleDateString('en-US', {
				weekday: 'long',
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			})}
		</p>

		<!-- Countdown -->
		<div class="mt-12">
			<Countdown targetDate={new Date(wedding.weddingDate)} />
		</div>
	</div>

	<!-- Scroll indicator -->
	<button
		class="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted animate-bounce"
		onclick={() => scrollTo('story')}
		aria-label="Scroll to story"
	>
		<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
		</svg>
	</button>
</section>

<!-- Story Timeline -->
<section id="story" class="py-24 px-6 bg-surface/30">
	<div class="mx-auto max-w-3xl">
		<h2 class="font-display text-3xl md:text-4xl text-center tracking-tight mb-16">Our Story</h2>

		{#if stories.length > 0}
			<div class="relative">
				<!-- Vertical line -->
				<div class="absolute left-1/2 top-0 bottom-0 w-px bg-border/20 -translate-x-1/2 hidden md:block" />

				{#each stories as story, i}
					<div
						class="relative mb-16 last:mb-0 md:grid md:grid-cols-2 md:gap-12 animate-fade-in-up"
						style="animation-delay: {i * 150}ms"
					>
						<!-- Dot on timeline -->
						<div class="hidden md:block absolute left-1/2 top-4 w-3 h-3 rounded-full bg-accent -translate-x-1/2" />

						<!-- Content alternates sides -->
						<div class={i % 2 === 0 ? 'md:text-right md:pr-8' : 'md:col-start-2 md:pl-8'}>
							<h3 class="font-display text-xl tracking-tight">{story.title}</h3>
							<p class="mt-3 text-muted leading-relaxed">{story.body}</p>
						</div>

						<!-- Image on opposite side -->
						{#if story.imagePath}
							<div class={i % 2 === 0 ? 'md:col-start-2 md:pl-8 mt-4 md:mt-0' : 'md:col-start-1 md:row-start-1 md:pr-8 mt-4 md:mt-0'}>
								<img
									src={story.imagePath}
									alt={story.title}
									class="rounded-lg w-full h-48 object-cover"
								/>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		{:else}
			<p class="text-center text-muted">Our story will be shared here soon.</p>
		{/if}
	</div>
</section>

<!-- Gallery -->
<section id="gallery" class="py-24 px-6">
	<div class="mx-auto max-w-6xl">
		<h2 class="font-display text-3xl md:text-4xl text-center tracking-tight mb-16">Gallery</h2>

		{#if gallery.length > 0}
			<div class="grid grid-cols-2 md:grid-cols-3 gap-4">
				{#each gallery as item, i}
					<div
						class="relative overflow-hidden rounded-lg aspect-square group animate-fade-in-up"
						style="animation-delay: {i * 100}ms"
					>
						<img
							src={item.imagePath}
							alt={item.caption ?? 'Gallery image'}
							class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
						/>
						{#if item.caption}
							<div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
								<p class="text-white text-sm">{item.caption}</p>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		{:else}
			<p class="text-center text-muted">Photos coming soon.</p>
		{/if}
	</div>
</section>

<!-- Event Details & RSVP -->
<section id="rsvp" class="py-24 px-6 bg-surface/30">
	<div class="mx-auto max-w-xl">
		<h2 class="font-display text-3xl md:text-4xl text-center tracking-tight mb-8">Join Us</h2>

		<!-- Venue details -->
		<div class="text-center mb-12">
			<p class="text-muted whitespace-pre-line">{wedding.venueDetails}</p>
		</div>

		<!-- RSVP Form -->
		<RSVPForm
			weddingSlug={wedding.slug}
			onSuccess={() => {
				// Could show a toast or redirect
			}}
		/>
	</div>
</section>

<!-- Guestbook / Wishes -->
<section id="wishes" class="py-24 px-6">
	<div class="mx-auto max-w-3xl">
		<h2 class="font-display text-3xl md:text-4xl text-center tracking-tight mb-16">Wishes</h2>

		{#if wishes.length > 0}
			<div class="space-y-6">
				{#each wishes as wish}
					<div class="border-l-2 border-accent/30 pl-6">
						<p class="text-muted italic">"{wish.message}"</p>
						<p class="mt-2 text-sm text-text/70">— {wish.guestName}</p>
					</div>
				{/each}
			</div>
		{:else}
			<p class="text-center text-muted">Be the first to leave a wish!</p>
		{/if}
	</div>
</section>

<Footer />

<style>
	@keyframes fade-in-up {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.animate-fade-in-up {
		animation: fade-in-up 0.6s ease-out both;
	}
</style>
