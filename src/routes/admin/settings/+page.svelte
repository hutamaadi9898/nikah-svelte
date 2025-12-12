<script lang="ts">
	import type { PageData } from './$types';
	import { Card, Button, Input } from '$lib/components/ui';

	const { data }: { data: PageData } = $props();

	let coupleNames = $state(data.wedding?.coupleNames ?? '');
	let slug = $state(data.wedding?.slug ?? '');
	let weddingDate = $state(data.wedding?.weddingDate ? new Date(data.wedding.weddingDate).toISOString().split('T')[0] : '');
	let venueDetails = $state(data.wedding?.venueDetails ?? '');
</script>

<svelte:head>
	<title>Settings | NIKAH Admin</title>
</svelte:head>

<div class="space-y-6">
	<div>
		<h1 class="font-display text-2xl tracking-tight">Settings</h1>
		<p class="text-sm text-muted mt-1">Manage your wedding invitation settings</p>
	</div>

	<Card>
		<h2 class="font-display text-lg mb-4">Wedding Details</h2>
		
		{#if data.wedding}
			<form class="space-y-4">
				<Input label="Couple Names" bind:value={coupleNames} placeholder="John & Jane" />
				<Input label="Wedding URL Slug" bind:value={slug} placeholder="john-and-jane" />
				<Input label="Wedding Date" type="date" bind:value={weddingDate} />
				
				<div class="space-y-2">
					<label class="block text-xs tracking-[0.18em] text-muted uppercase">Venue Details</label>
					<textarea 
						class="w-full rounded-md border border-border/10 bg-bg/60 px-4 py-3 text-sm outline-none transition focus:border-accent/40 min-h-24"
						bind:value={venueDetails}
						placeholder="Enter venue name and address..."
					></textarea>
				</div>

				<Button type="submit">Save Changes</Button>
			</form>
		{:else}
			<div class="text-center py-8">
				<p class="text-muted mb-4">You haven't created a wedding yet.</p>
				<Button>Create Your Wedding</Button>
			</div>
		{/if}
	</Card>

	<Card>
		<h2 class="font-display text-lg mb-4">Account</h2>
		<div class="space-y-3">
			<div>
				<p class="text-xs text-muted uppercase tracking-wide">Email</p>
				<p class="text-sm">{data.user.email}</p>
			</div>
			<div>
				<p class="text-xs text-muted uppercase tracking-wide">Name</p>
				<p class="text-sm">{data.user.name}</p>
			</div>
		</div>
	</Card>
</div>
