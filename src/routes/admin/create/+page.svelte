<script lang="ts">
	import { Card, Button, Input } from '$lib/components/ui';
	import { enhance } from '$app/forms';
	import type { ActionData, PageData } from './$types';

	const { data, form }: { data: PageData; form: ActionData } = $props();

	let isSubmitting = $state(false);
</script>

<svelte:head>
	<title>Create Wedding | NIKAH</title>
</svelte:head>

<div class="max-w-2xl mx-auto space-y-6">
	<div class="text-center">
		<h1 class="font-display text-3xl tracking-tight">Create Your Wedding</h1>
		<p class="text-muted mt-2">Set up your beautiful wedding invitation</p>
	</div>

	<Card variant="elevated">
		<form 
			method="POST" 
			class="space-y-6"
			use:enhance={() => {
				isSubmitting = true;
				return async ({ update }) => {
					isSubmitting = false;
					await update();
				};
			}}
		>
			{#if form?.error}
				<div class="p-3 rounded-md bg-red-500/10 border border-red-500/20 text-red-600 text-sm">
					{form.error}
				</div>
			{/if}

			<Input 
				label="Couple Names" 
				name="coupleNames" 
				placeholder="John & Jane" 
				required 
			/>

			<Input 
				label="Wedding URL" 
				name="slug" 
				placeholder="john-and-jane" 
				required 
			/>
			<p class="text-xs text-muted -mt-4">
				Your invitation will be at: {`${typeof window !== 'undefined' ? window.location.origin : ''}/your-url`}
			</p>

			<Input 
				label="Wedding Date" 
				name="weddingDate" 
				type="date" 
				required 
			/>

			<div class="space-y-2">
				<label class="block text-xs tracking-[0.18em] text-muted uppercase">Venue Details</label>
				<textarea 
					name="venueDetails"
					class="w-full rounded-md border border-border/10 bg-bg/60 px-4 py-3 text-sm outline-none transition focus:border-accent/40 min-h-24"
					placeholder="The Grand Ballroom&#10;123 Wedding Street&#10;City, Country"
				></textarea>
			</div>

			<Button type="submit" fullWidth loading={isSubmitting}>
				Create Wedding
			</Button>
		</form>
	</Card>
</div>
