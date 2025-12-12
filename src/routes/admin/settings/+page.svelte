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

<div class="space-y-8">
	<div>
		<h1 class="font-display text-4xl tracking-tight text-text">Settings</h1>
		<p class="text-muted mt-2 text-base">Manage your wedding invitation details.</p>
	</div>

	<Card class="p-8">
		<h2 class="font-display text-2xl mb-6 text-text">Wedding Details</h2>
		
		{#if data.wedding}
			<form class="space-y-6">
				<Input label="Couple Names" bind:value={coupleNames} placeholder="John & Jane" />
				<Input label="Wedding URL Slug" bind:value={slug} placeholder="john-and-jane" />
				<Input label="Wedding Date" type="date" bind:value={weddingDate} />
				
				<div class="space-y-1.5">
					<label class="block text-xs font-medium tracking-wide text-muted uppercase ml-1" for="venueDetailsSettings">Venue Details</label>
					<textarea 
                        id="venueDetailsSettings"
						class="w-full rounded-xl border border-border/40 bg-white/50 px-4 py-3 text-[0.95rem] text-text outline-none ring-0 transition-all duration-300 placeholder:text-muted/40 focus:border-text/20 focus:bg-white focus:shadow-sm min-h-32"
						bind:value={venueDetails}
						placeholder="Enter venue name and address..."
					></textarea>
				</div>

				<div class="pt-2">
                    <Button type="submit">Save Changes</Button>
                </div>
			</form>
		{:else}
			<div class="text-center py-12">
				<p class="text-muted mb-6">You haven't created a wedding yet.</p>
				<Button>Create Your Wedding</Button>
			</div>
		{/if}
	</Card>

	<Card class="p-8">
		<h2 class="font-display text-2xl mb-6 text-text">Account</h2>
		<div class="grid grid-cols-2 gap-8 text-[0.95rem]">
			<div>
				<p class="text-xs text-muted uppercase tracking-wide font-medium mb-1">Email</p>
				<p class="text-text font-medium">{data.user.email}</p>
			</div>
			<div>
				<p class="text-xs text-muted uppercase tracking-wide font-medium mb-1">Name</p>
				<p class="text-text font-medium">{data.user.name}</p>
			</div>
		</div>
	</Card>
</div>
