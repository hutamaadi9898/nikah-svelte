<!--
	Admin Guest Manager page.
	Lists all guests with status badges and actions.
-->
<script lang="ts">
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();

	const statusStyles: Record<string, string> = {
		confirmed: 'bg-emerald-100 text-emerald-700 border-emerald-200',
		pending: 'bg-amber-100 text-amber-700 border-amber-200',
		declined: 'bg-red-100 text-red-700 border-red-200'
	};

	function copyGuestLink(guestSlug: string) {
		const link = `${window.location.origin}/${data.wedding?.slug}?u=${guestSlug}`;
		navigator.clipboard.writeText(link);
	}
</script>

<svelte:head>
	<title>Guests | NIKAH Admin</title>
</svelte:head>

<div class="space-y-8">
	<!-- Header -->
	<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
		<div>
			<h1 class="font-display text-3xl sm:text-4xl text-zinc-900">Guest List</h1>
			<p class="text-zinc-500 mt-1">Manage your wedding guests and RSVPs</p>
		</div>
		<button class="px-5 py-2.5 bg-zinc-900 text-white rounded-lg text-sm font-medium hover:bg-zinc-800 transition-colors">
			Add Guest
		</button>
	</div>

	{#if data.guests.length > 0}
		<!-- Stats -->
		<div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
			<div class="bg-white rounded-xl p-4 border border-zinc-200">
				<p class="text-xs font-medium text-zinc-500 uppercase">Total</p>
				<p class="text-2xl font-display text-zinc-900">{data.guests.length}</p>
			</div>
			<div class="bg-white rounded-xl p-4 border border-zinc-200">
				<p class="text-xs font-medium text-emerald-600 uppercase">Confirmed</p>
				<p class="text-2xl font-display text-emerald-600">{data.guests.filter((g) => g.status === 'confirmed').length}</p>
			</div>
			<div class="bg-white rounded-xl p-4 border border-zinc-200">
				<p class="text-xs font-medium text-amber-600 uppercase">Pending</p>
				<p class="text-2xl font-display text-amber-600">{data.guests.filter((g) => g.status === 'pending').length}</p>
			</div>
			<div class="bg-white rounded-xl p-4 border border-zinc-200">
				<p class="text-xs font-medium text-red-600 uppercase">Declined</p>
				<p class="text-2xl font-display text-red-600">{data.guests.filter((g) => g.status === 'declined').length}</p>
			</div>
		</div>

		<!-- Guest Table -->
		<div class="bg-white rounded-xl border border-zinc-200 overflow-hidden">
			<div class="overflow-x-auto">
				<table class="w-full text-sm">
					<thead class="bg-zinc-50 border-b border-zinc-200">
						<tr>
							<th class="px-6 py-3 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wide">Name</th>
							<th class="px-6 py-3 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wide">Status</th>
							<th class="px-6 py-3 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wide">Pax</th>
							<th class="px-6 py-3 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wide">Contact</th>
							<th class="px-6 py-3 text-right text-xs font-semibold text-zinc-500 uppercase tracking-wide">Actions</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-zinc-100">
						{#each data.guests as guest}
							<tr class="hover:bg-zinc-50 transition-colors group">
								<td class="px-6 py-4 font-medium text-zinc-900">{guest.name}</td>
								<td class="px-6 py-4">
									<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium capitalize border {statusStyles[guest.status]}">
										{guest.status}
									</span>
								</td>
								<td class="px-6 py-4 text-zinc-600">{guest.pax}</td>
								<td class="px-6 py-4 text-zinc-600">{guest.contact || '—'}</td>
								<td class="px-6 py-4 text-right">
									<button
										class="text-zinc-600 hover:text-zinc-900 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity"
										onclick={() => copyGuestLink(guest.slug)}
									>
										Copy Link
									</button>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	{:else}
		<!-- Empty State -->
		<div class="text-center py-16 bg-white rounded-xl border border-zinc-200">
			<div class="w-16 h-16 mx-auto mb-6 rounded-full bg-zinc-100 flex items-center justify-center">
				<span class="text-3xl">👥</span>
			</div>
			<h2 class="font-display text-xl text-zinc-900 mb-2">No guests yet</h2>
			<p class="text-zinc-500 max-w-sm mx-auto mb-6">
				Start inviting people to your special day.
			</p>
			<button class="px-6 py-3 bg-zinc-900 text-white rounded-lg font-medium hover:bg-zinc-800 transition-colors">
				Add Your First Guest
			</button>
		</div>
	{/if}
</div>
