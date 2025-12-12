<script lang="ts">
	import type { PageData } from './$types';
	import { Card, Button } from '$lib/components/ui';

	const { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Photo Gallery | NIKAH Admin</title>
</svelte:head>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<div>
			<h1 class="font-display text-2xl tracking-tight">Photo Gallery</h1>
			<p class="text-sm text-muted mt-1">Upload and manage your engagement/pre-wedding photos</p>
		</div>
		<Button>Upload Photo</Button>
	</div>

	{#if data.photos.length === 0}
		<Card>
			<div class="text-center py-12">
				<p class="text-muted mb-4">No photos yet. Upload your first photo!</p>
				<Button>Upload Your First Photo</Button>
			</div>
		</Card>
	{:else}
		<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
			{#each data.photos as photo}
				<Card class="p-2">
					<img 
						src={photo.imagePath} 
						alt={photo.caption ?? 'Gallery photo'} 
						class="w-full aspect-square object-cover rounded"
					/>
					{#if photo.caption}
						<p class="text-xs text-muted mt-2 truncate">{photo.caption}</p>
					{/if}
				</Card>
			{/each}
		</div>
	{/if}
</div>
