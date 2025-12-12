<!--
	Admin Gallery page.
	Manage wedding photos.
-->
<script lang="ts">
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Gallery | NIKAH Admin</title>
</svelte:head>

<div class="space-y-8">
	<!-- Header -->
	<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
		<div>
			<h1 class="font-display text-3xl sm:text-4xl text-zinc-900">Photo Gallery</h1>
			<p class="text-zinc-500 mt-1">Share your beautiful memories</p>
		</div>
		<button class="px-5 py-2.5 bg-zinc-900 text-white rounded-lg text-sm font-medium hover:bg-zinc-800 transition-colors">
			Upload Photos
		</button>
	</div>

	{#if data.photos.length === 0}
		<!-- Empty State -->
		<div class="text-center py-16 bg-white rounded-xl border border-zinc-200">
			<div class="w-16 h-16 mx-auto mb-6 rounded-full bg-zinc-100 flex items-center justify-center">
				<span class="text-3xl">📸</span>
			</div>
			<h2 class="font-display text-xl text-zinc-900 mb-2">No photos yet</h2>
			<p class="text-zinc-500 max-w-sm mx-auto mb-6">
				Create a beautiful gallery for your guests.
			</p>
			<button class="px-6 py-3 bg-zinc-900 text-white rounded-lg font-medium hover:bg-zinc-800 transition-colors">
				Upload Your First Photo
			</button>
		</div>
	{:else}
		<!-- Photo Grid -->
		<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
			{#each data.photos as photo}
				<div class="group relative aspect-square bg-zinc-100 rounded-xl overflow-hidden border border-zinc-200">
					<img 
						src={photo.imagePath} 
						alt={photo.caption ?? 'Gallery photo'} 
						class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
					/>
					<div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
						<button class="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors">
							Delete
						</button>
					</div>
					{#if photo.caption}
						<div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
							<p class="text-white text-sm truncate">{photo.caption}</p>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	{/if}
</div>
