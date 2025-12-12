<!--
	Admin Guest Manager page.
	Lists all guests with status badges and actions.
-->
<script lang="ts">
	import { Card, Button } from '$lib/components/ui';
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();

	const statusColors: Record<string, string> = {
		confirmed: 'bg-green-100 text-green-700',
		pending: 'bg-amber-100 text-amber-700',
		declined: 'bg-red-100 text-red-700'
	};

	function copyGuestLink(guestSlug: string) {
		const link = `${window.location.origin}/${data.wedding?.slug}?u=${guestSlug}`;
		navigator.clipboard.writeText(link);
	}
</script>

<svelte:head>
	<title>Guests | NIKAH Admin</title>
</svelte:head>

<div class="space-y-6">
	<!-- Header -->
	<div class="flex items-center justify-between">
		<div>
			<h1 class="font-display text-3xl tracking-tight">Guest List</h1>
			<p class="text-muted mt-1">Manage your wedding guests and RSVPs.</p>
		</div>
		<Button onclick={() => {}}>+ Add Guest</Button>
	</div>

	{#if data.guests.length > 0}
		<!-- Stats summary -->
		<div class="flex gap-4 text-sm">
			<span class="text-muted">
				Total: <span class="font-medium text-text">{data.guests.length}</span>
			</span>
			<span class="text-green-600">
				Confirmed: {data.guests.filter((g) => g.status === 'confirmed').length}
			</span>
			<span class="text-amber-600">
				Pending: {data.guests.filter((g) => g.status === 'pending').length}
			</span>
			<span class="text-red-600">
				Declined: {data.guests.filter((g) => g.status === 'declined').length}
			</span>
		</div>

		<!-- Guest table -->
		<Card>
			<div class="overflow-x-auto">
				<table class="w-full text-sm">
					<thead>
						<tr class="border-b border-border/10 text-left text-xs uppercase tracking-wider text-muted">
							<th class="pb-3 font-medium">Name</th>
							<th class="pb-3 font-medium">Status</th>
							<th class="pb-3 font-medium">Pax</th>
							<th class="pb-3 font-medium">Contact</th>
							<th class="pb-3 font-medium text-right">Actions</th>
						</tr>
					</thead>
					<tbody>
						{#each data.guests as guest}
							<tr class="border-b border-border/5 last:border-0">
								<td class="py-3 font-medium">{guest.name}</td>
								<td class="py-3">
									<span class="inline-block px-2 py-0.5 rounded-full text-xs font-medium {statusColors[guest.status]}">
										{guest.status}
									</span>
								</td>
								<td class="py-3">{guest.pax}</td>
								<td class="py-3 text-muted">{guest.contact || '—'}</td>
								<td class="py-3 text-right">
									<button
										class="text-muted hover:text-accent transition text-xs"
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
		</Card>
	{:else}
		<Card class="text-center py-12">
			<p class="text-muted mb-4">No guests yet.</p>
			<Button onclick={() => {}}>Add Your First Guest</Button>
		</Card>
	{/if}
</div>
