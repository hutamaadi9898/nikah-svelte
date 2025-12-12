<script lang="ts">
	import type { PageData } from './$types';
	import { Card, Button } from '$lib/components/ui';

	const { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Photo Gallery | NIKAH Admin</title>
</svelte:head>

<div class="space-y-8">
	<div class="flex items-center justify-between">
		<div>
			<h1 class="font-display text-4xl tracking-tight text-text">Photo Gallery</h1>
			<p class="text-muted mt-2 text-base">Upload and manage your engagement/pre-wedding photos.</p>
		</div>
		<Button>Upload Photo</Button>
	</div>

	{#if data.photos.length === 0}
		<Card class="text-center py-20 bg-surface/30 border-dashed">
			<div class="max-w-sm mx-auto space-y-4">
                <span class="text-4xl">📸</span>
				<p class="text-text font-medium text-lg">No photos yet</p>
                <p class="text-muted text-sm">Create a beautiful gallery for your guests.</p>
				<div class="pt-2">
                    <Button variant="subtle">Upload Your First Photo</Button>
                </div>
			</div>
		</Card>
	{:else}
		<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
			{#each data.photos as photo}
				<Card class="p-3 group">
					<div class="relative overflow-hidden rounded-lg aspect-square">
                        <img 
                            src={photo.imagePath} 
                            alt={photo.caption ?? 'Gallery photo'} 
                            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
					{#if photo.caption}
						<p class="text-xs text-center text-muted mt-3 truncate font-medium">{photo.caption}</p>
					{/if}
                    <div class="mt-3 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                         <Button variant="danger" class="text-xs h-8 px-3">Delete</Button>
                    </div>
				</Card>
			{/each}
		</div>
	{/if}
</div>
