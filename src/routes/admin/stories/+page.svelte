<script lang="ts">
	import type { PageData } from './$types';
	import { Card, Button } from '$lib/components/ui';

	const { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Our Story | NIKAH Admin</title>
</svelte:head>

<div class="space-y-8">
	<div class="flex items-center justify-between">
		<div>
			<h1 class="font-display text-4xl tracking-tight text-text">Our Story</h1>
			<p class="text-muted mt-2 text-base">Share your love story with your guests.</p>
		</div>
		<Button>Add Story</Button>
	</div>

	{#if data.stories.length === 0}
		<Card class="text-center py-20 bg-surface/30 border-dashed">
			<div class="max-w-sm mx-auto space-y-4">
                <span class="text-4xl">📖</span>
				<p class="text-text font-medium text-lg">No stories yet</p>
                <p class="text-muted text-sm">Your guests would love to know how you met. Add your first story now.</p>
				<div class="pt-2">
                    <Button variant="subtle">Add Your First Story</Button>
                </div>
			</div>
		</Card>
	{:else}
		<div class="grid gap-6">
			{#each data.stories as story}
				<Card class="p-6 transition-all hover:shadow-md group">
					<div class="flex items-start justify-between gap-6">
						<div class="space-y-2">
							<h3 class="font-display text-2xl text-text">{story.title}</h3>
							<p class="text-xs font-medium tracking-wide text-accent uppercase">{new Date(story.createdAt).toLocaleDateString()}</p>
							<p class="text-[0.95rem] text-muted leading-relaxed line-clamp-2 max-w-2xl">{story.body}</p>
						</div>
						<div class="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
							<Button variant="subtle" class="text-xs px-4 h-9">Edit</Button>
							<Button variant="danger" class="text-xs px-4 h-9">Delete</Button>
						</div>
					</div>
				</Card>
			{/each}
		</div>
	{/if}
</div>
