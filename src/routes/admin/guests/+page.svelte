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

<div class="space-y-8">
	<!-- Header -->
	<div class="flex items-center justify-between">
		<div>
			<h1 class="font-display text-4xl tracking-tight text-text">Guest List</h1>
			<p class="text-muted mt-2 text-base">Manage your wedding guests and RSVPs.</p>
		</div>
		<Button onclick={() => {}}>+ Add Guest</Button>
	</div>

	{#if data.guests.length > 0}
		<!-- Stats summary -->
		<div class="flex gap-6 text-sm border-b border-border/10 pb-6">
			<span class="text-text font-medium">
				Total: <span class="ml-1 text-muted">{data.guests.length}</span>
			</span>
			<span class="text-emerald-700">
				Confirmed: <span class="font-medium">{data.guests.filter((g) => g.status === 'confirmed').length}</span>
			</span>
			<span class="text-amber-600">
				Pending: <span class="font-medium">{data.guests.filter((g) => g.status === 'pending').length}</span>
			</span>
			<span class="text-rose-600">
				Declined: <span class="font-medium">{data.guests.filter((g) => g.status === 'declined').length}</span>
			</span>
		</div>

		<!-- Guest table -->
		<Card class="p-0 overflow-hidden bg-white/50 border-border/10">
			<div class="overflow-x-auto">
				<table class="w-full text-sm text-left">
					<thead class="bg-surface/50 text-muted uppercase text-[0.7rem] font-semibold tracking-wide">
						<tr>
							<th class="px-6 py-4">Name</th>
							<th class="px-6 py-4">Status</th>
							<th class="px-6 py-4">Pax</th>
							<th class="px-6 py-4">Contact</th>
							<th class="px-6 py-4 text-right">Actions</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-border/5">
						{#each data.guests as guest}
							<tr class="hover:bg-surface/30 transition-colors group">
								<td class="px-6 py-4 font-medium text-text">{guest.name}</td>
								<td class="px-6 py-4">
									<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize {statusColors[guest.status]}">
										{guest.status}
									</span>
								</td>
								<td class="px-6 py-4 text-muted tabular-nums">{guest.pax}</td>
								<td class="px-6 py-4 text-muted">{guest.contact || '—'}</td>
								<td class="px-6 py-4 text-right">
									<button
										class="text-accent hover:text-accent-dark transition-colors text-xs font-medium opacity-0 group-hover:opacity-100"
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
		<Card class="text-center py-20 bg-surface/30 border-dashed">
            <div class="max-w-sm mx-auto space-y-4">
                <span class="text-4xl">👥</span>
                <p class="text-text font-medium text-lg">No guests yet</p>
                <p class="text-muted text-sm">Start inviting people to your special day.</p>
                <div class="pt-2">
                    <Button onclick={() => {}}>Add Your First Guest</Button>
                </div>
            </div>
		</Card>
	{/if}
</div>
