<!--
	Admin Stories page.
	Manage the couple's love story timeline.
-->
<script lang="ts">
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Stories | NIKAH Admin</title>
</svelte:head>

<div class="space-y-8">
	<!-- Header -->
	<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
		<div>
			<h1 class="font-display text-3xl sm:text-4xl text-zinc-900">Your Story</h1>
			<p class="text-zinc-500 mt-1">Share your journey with your guests</p>
		</div>
		<button class="px-5 py-2.5 bg-zinc-900 text-white rounded-lg text-sm font-medium hover:bg-zinc-800 transition-colors">
			Add Story
		</button>
	</div>

	{#if data.stories.length === 0}
		<!-- Empty State -->
		<div class="text-center py-16 bg-white rounded-xl border border-zinc-200">
			<div class="w-16 h-16 mx-auto mb-6 rounded-full bg-zinc-100 flex items-center justify-center">
				<span class="text-3xl">📖</span>
			</div>
			<h2 class="font-display text-xl text-zinc-900 mb-2">No stories yet</h2>
			<p class="text-zinc-500 max-w-sm mx-auto mb-6">
				Your guests would love to know how you met. Add your first story now.
			</p>
			<button class="px-6 py-3 bg-zinc-900 text-white rounded-lg font-medium hover:bg-zinc-800 transition-colors">
				Add Your First Story
			</button>
		</div>
	{:else}
		<!-- Stories List -->
		<div class="space-y-4">
			{#each data.stories as story}
				<div class="bg-white rounded-xl p-6 border border-zinc-200 hover:border-zinc-300 transition-colors group">
					<div class="flex items-start justify-between gap-4">
						<div class="flex-1 min-w-0">
							<h3 class="font-display text-xl text-zinc-900 mb-2">{story.title}</h3>
							<p class="text-xs font-medium text-zinc-400 uppercase tracking-wide mb-3">
								{new Date(story.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
							</p>
							<p class="text-zinc-600 line-clamp-2">{story.body}</p>
						</div>
						<div class="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
							<button class="px-4 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 bg-zinc-100 rounded-lg hover:bg-zinc-200 transition-colors">
								Edit
							</button>
							<button class="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
								Delete
							</button>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
