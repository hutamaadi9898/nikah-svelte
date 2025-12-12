<script lang="ts">
	import type { PageData } from './$types';
	import { Card, Button } from '$lib/components/ui';

	const { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Our Story | NIKAH Admin</title>
</svelte:head>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<div>
			<h1 class="font-display text-2xl tracking-tight">Our Story</h1>
			<p class="text-sm text-muted mt-1">Share your love story with your guests</p>
		</div>
		<Button>Add Story</Button>
	</div>

	{#if data.stories.length === 0}
		<Card>
			<div class="text-center py-12">
				<p class="text-muted mb-4">No stories yet. Add your first love story!</p>
				<Button>Add Your First Story</Button>
			</div>
		</Card>
	{:else}
		<div class="space-y-4">
			{#each data.stories as story}
				<Card>
					<div class="flex items-start justify-between">
						<div>
							<h3 class="font-display text-lg">{story.title}</h3>
							{#if story.date}
								<p class="text-xs text-muted mt-1">{new Date(story.date).toLocaleDateString()}</p>
							{/if}
							<p class="text-sm text-muted mt-2 line-clamp-2">{story.content}</p>
						</div>
						<div class="flex gap-2">
							<Button variant="ghost">Edit</Button>
							<Button variant="danger">Delete</Button>
						</div>
					</div>
				</Card>
			{/each}
		</div>
	{/if}
</div>
