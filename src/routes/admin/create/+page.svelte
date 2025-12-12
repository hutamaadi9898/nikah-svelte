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

<div class="max-w-2xl mx-auto space-y-8 pt-6">
	<div class="text-center space-y-3">
		<h1 class="font-display text-4xl lg:text-5xl tracking-tight text-text">Create Your Wedding</h1>
		<p class="text-muted text-base">Set up your beautiful digital invitation</p>
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

			<div class="space-y-1.5">
				<label class="block text-xs font-medium tracking-wide text-muted uppercase ml-1" for="venueDetails">Venue Details</label>
				<textarea 
                    id="venueDetails"
					name="venueDetails"
					class="w-full rounded-xl border border-border/40 bg-white/50 px-4 py-3 text-[0.95rem] text-text outline-none ring-0 transition-all duration-300 placeholder:text-muted/40 focus:border-text/20 focus:bg-white focus:shadow-sm min-h-32"
					placeholder="The Grand Ballroom&#10;123 Wedding Street&#10;City, Country"
				></textarea>
			</div>

			<Button type="submit" fullWidth loading={isSubmitting}>
				Create Wedding
			</Button>
		</form>
	</Card>
</div>
