<!--
	Admin Settings page.
	Manage wedding details and account.
-->
<script lang="ts">
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();
	
	// Form state - using $derived to properly track data changes
	let coupleNames = $state(data.wedding?.coupleNames ?? '');
	let slug = $state(data.wedding?.slug ?? '');
	let weddingDate = $state(data.wedding?.weddingDate?.split('T')[0] ?? '');
	let venueDetails = $state(data.wedding?.venueDetails ?? '');
</script>

<svelte:head>
	<title>Settings | NIKAH Admin</title>
</svelte:head>

<div class="space-y-8">
	<!-- Header -->
	<div>
		<h1 class="font-display text-3xl sm:text-4xl text-zinc-900">Settings</h1>
		<p class="text-zinc-500 mt-1">Manage your wedding details and account</p>
	</div>

	<!-- Wedding Details -->
	<div class="bg-white rounded-xl p-6 border border-zinc-200">
		<h2 class="font-display text-xl text-zinc-900 mb-6 pb-4 border-b border-zinc-100">Wedding Details</h2>
		
		{#if data.wedding}
			<form class="space-y-6 max-w-xl">
				<div>
					<label for="coupleNames" class="block text-sm font-medium text-zinc-700 mb-2">Couple Names</label>
					<input 
						type="text" 
						id="coupleNames"
						bind:value={coupleNames} 
						placeholder="John & Jane"
						class="w-full px-4 py-3 rounded-lg border border-zinc-200 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 outline-none transition-all"
					/>
				</div>
				
				<div>
					<label for="slug" class="block text-sm font-medium text-zinc-700 mb-2">Wedding URL</label>
					<div class="flex items-center">
						<span class="text-zinc-400 text-sm mr-2">nikah.app/</span>
						<input 
							type="text" 
							id="slug"
							bind:value={slug} 
							placeholder="john-and-jane"
							class="flex-1 px-4 py-3 rounded-lg border border-zinc-200 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 outline-none transition-all"
						/>
					</div>
				</div>
				
				<div>
					<label for="weddingDate" class="block text-sm font-medium text-zinc-700 mb-2">Wedding Date</label>
					<input 
						type="date" 
						id="weddingDate"
						bind:value={weddingDate}
						class="w-full px-4 py-3 rounded-lg border border-zinc-200 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 outline-none transition-all"
					/>
				</div>
				
				<div>
					<label for="venueDetails" class="block text-sm font-medium text-zinc-700 mb-2">Venue Details</label>
					<textarea 
						id="venueDetails"
						bind:value={venueDetails}
						placeholder="Enter venue name and address..."
						rows="3"
						class="w-full px-4 py-3 rounded-lg border border-zinc-200 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 outline-none transition-all resize-none"
					></textarea>
				</div>

				<div class="pt-4">
					<button 
						type="submit"
						class="px-6 py-3 bg-zinc-900 text-white rounded-lg font-medium hover:bg-zinc-800 transition-colors"
					>
						Save Changes
					</button>
				</div>
			</form>
		{:else}
			<div class="text-center py-8">
				<p class="text-zinc-500 mb-4">You haven't created a wedding yet.</p>
				<a 
					href="/admin/create"
					class="inline-flex px-6 py-3 bg-zinc-900 text-white rounded-lg font-medium hover:bg-zinc-800 transition-colors"
				>
					Create Your Wedding
				</a>
			</div>
		{/if}
	</div>

	<!-- Account Info -->
	<div class="bg-white rounded-xl p-6 border border-zinc-200">
		<h2 class="font-display text-xl text-zinc-900 mb-6 pb-4 border-b border-zinc-100">Account</h2>
		<div class="grid sm:grid-cols-2 gap-6">
			<div>
				<p class="text-xs font-medium text-zinc-500 uppercase tracking-wide mb-1">Email</p>
				<p class="text-zinc-900">{data.user.email}</p>
			</div>
			<div>
				<p class="text-xs font-medium text-zinc-500 uppercase tracking-wide mb-1">Name</p>
				<p class="text-zinc-900">{data.user.name}</p>
			</div>
		</div>
	</div>
</div>
