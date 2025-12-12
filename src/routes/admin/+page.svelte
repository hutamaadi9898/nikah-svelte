<!--
	Admin Overview page.
	Shows RSVP stats, quick actions, and wedding info.
-->
<script lang="ts">
	import { Button } from '$lib/components/ui';
	import { Countdown } from '$lib/components/wedding';
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Dashboard | NIKAH Admin</title>
</svelte:head>

<div class="space-y-8">
	<!-- Header -->
	<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
		<div>
			<h1 class="font-display text-3xl sm:text-4xl text-zinc-900">Dashboard</h1>
			<p class="text-zinc-500 mt-1">Welcome back! Here's your wedding overview.</p>
		</div>
		{#if data.wedding}
			<a 
				href="/{data.wedding.slug}" 
				target="_blank"
				class="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-900 text-white rounded-lg text-sm font-medium hover:bg-zinc-800 transition-colors"
			>
				View Live Site
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
				</svg>
			</a>
		{/if}
	</div>

	{#if data.wedding}
		<!-- Stats Grid -->
		<div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
			<div class="bg-white rounded-xl p-5 border border-zinc-200">
				<p class="text-xs font-medium text-zinc-500 uppercase tracking-wide mb-2">Total Guests</p>
				<p class="text-3xl font-display text-zinc-900">{data.stats.totalPax}</p>
			</div>
			<div class="bg-white rounded-xl p-5 border border-zinc-200">
				<p class="text-xs font-medium text-zinc-500 uppercase tracking-wide mb-2">Confirmed</p>
				<p class="text-3xl font-display text-emerald-600">{data.stats.confirmed}</p>
			</div>
			<div class="bg-white rounded-xl p-5 border border-zinc-200">
				<p class="text-xs font-medium text-zinc-500 uppercase tracking-wide mb-2">Pending</p>
				<p class="text-3xl font-display text-amber-600">{data.stats.pending}</p>
			</div>
			<div class="bg-zinc-900 text-white rounded-xl p-5">
				<p class="text-xs font-medium text-zinc-400 uppercase tracking-wide mb-2">Days Left</p>
				<div class="text-3xl font-display">
					<Countdown targetDate={data.wedding.weddingDate} />
				</div>
			</div>
		</div>

		<!-- Quick Actions -->
		<div>
			<h2 class="font-display text-xl text-zinc-900 mb-4">Quick Actions</h2>
			<div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
				<a href="/admin/guests" class="group bg-white rounded-xl p-5 border border-zinc-200 hover:border-zinc-400 transition-colors">
					<span class="text-2xl mb-3 block">👥</span>
					<h3 class="font-medium text-zinc-900 group-hover:underline">Guest List</h3>
					<p class="text-sm text-zinc-500 mt-1">Manage RSVPs</p>
				</a>
				<a href="/admin/stories" class="group bg-white rounded-xl p-5 border border-zinc-200 hover:border-zinc-400 transition-colors">
					<span class="text-2xl mb-3 block">📖</span>
					<h3 class="font-medium text-zinc-900 group-hover:underline">Our Story</h3>
					<p class="text-sm text-zinc-500 mt-1">Share your journey</p>
				</a>
				<a href="/admin/gallery" class="group bg-white rounded-xl p-5 border border-zinc-200 hover:border-zinc-400 transition-colors">
					<span class="text-2xl mb-3 block">📸</span>
					<h3 class="font-medium text-zinc-900 group-hover:underline">Photo Gallery</h3>
					<p class="text-sm text-zinc-500 mt-1">Upload memories</p>
				</a>
				<a href="/admin/settings" class="group bg-white rounded-xl p-5 border border-zinc-200 hover:border-zinc-400 transition-colors">
					<span class="text-2xl mb-3 block">⚙️</span>
					<h3 class="font-medium text-zinc-900 group-hover:underline">Settings</h3>
					<p class="text-sm text-zinc-500 mt-1">Update details</p>
				</a>
			</div>
		</div>

		<!-- Wedding Details -->
		<div class="bg-white rounded-xl p-6 border border-zinc-200">
			<h2 class="font-display text-xl text-zinc-900 mb-4">Wedding Details</h2>
			<div class="grid sm:grid-cols-2 gap-6">
				<div>
					<p class="text-xs font-medium text-zinc-500 uppercase tracking-wide mb-1">Date</p>
					<p class="text-zinc-900 font-medium">
						{new Date(data.wedding.weddingDate).toLocaleDateString(undefined, { 
							weekday: 'long', 
							year: 'numeric', 
							month: 'long', 
							day: 'numeric' 
						})}
					</p>
				</div>
				<div>
					<p class="text-xs font-medium text-zinc-500 uppercase tracking-wide mb-1">Venue</p>
					<p class="text-zinc-900 font-medium whitespace-pre-wrap">{data.wedding.venueDetails || 'Not set'}</p>
				</div>
			</div>
			<div class="mt-6 pt-6 border-t border-zinc-100">
				<a href="/admin/settings" class="text-sm text-zinc-600 hover:text-zinc-900 underline underline-offset-4">
					Edit wedding details →
				</a>
			</div>
		</div>

	{:else}
		<!-- Empty State -->
		<div class="text-center py-16 bg-white rounded-xl border border-zinc-200">
			<div class="w-16 h-16 mx-auto mb-6 rounded-full bg-zinc-100 flex items-center justify-center">
				<span class="text-3xl">✨</span>
			</div>
			<h2 class="font-display text-2xl text-zinc-900 mb-2">Welcome to Nikah</h2>
			<p class="text-zinc-500 max-w-md mx-auto mb-6">
				Let's start by creating your wedding page. It only takes a few minutes.
			</p>
			<a 
				href="/admin/create"
				class="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 text-white rounded-lg font-medium hover:bg-zinc-800 transition-colors"
			>
				Create Your Wedding
			</a>
		</div>
	{/if}
</div>
