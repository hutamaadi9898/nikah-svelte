<!--
	Admin Overview page.
	Shows RSVP stats, quick actions, and wedding info.
-->
<script lang="ts">
	import { Card, Button } from '$lib/components/ui';
	import { Countdown } from '$lib/components/wedding';
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Dashboard | NIKAH Admin</title>
</svelte:head>

<div class="space-y-8">
	<!-- Header -->
	<div>
		<h1 class="font-display text-3xl tracking-tight">Dashboard</h1>
		<p class="text-muted mt-1">Welcome back! Here's an overview of your wedding.</p>
	</div>

	{#if data.wedding && data.stats}
		<!-- Quick Stats -->
		<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
			<Card>
				<p class="text-xs tracking-[0.18em] text-muted uppercase">Confirmed</p>
				<p class="font-display text-3xl mt-1 text-green-600">{data.stats.confirmed}</p>
				<p class="text-xs text-muted mt-1">{data.stats.totalPax} total guests</p>
			</Card>

			<Card>
				<p class="text-xs tracking-[0.18em] text-muted uppercase">Pending</p>
				<p class="font-display text-3xl mt-1 text-amber-500">{data.stats.pending}</p>
			</Card>

			<Card>
				<p class="text-xs tracking-[0.18em] text-muted uppercase">Declined</p>
				<p class="font-display text-3xl mt-1 text-red-500">{data.stats.declined}</p>
			</Card>

			<Card>
				<p class="text-xs tracking-[0.18em] text-muted uppercase">Wishes</p>
				<p class="font-display text-3xl mt-1">{data.stats.totalWishes}</p>
			</Card>
		</div>

		<!-- Countdown & Actions -->
		<div class="grid md:grid-cols-2 gap-6">
			<Card variant="elevated">
				<h2 class="font-display text-xl mb-6">Countdown</h2>
				<Countdown targetDate={new Date(data.wedding.weddingDate)} />
			</Card>

			<Card>
				<h2 class="font-display text-xl mb-4">Quick Actions</h2>
				<div class="space-y-3">
					<Button
						variant="outline"
						fullWidth
						onclick={() => {
							navigator.clipboard.writeText(`${window.location.origin}/${data.wedding?.slug}`);
						}}
					>
						📋 Copy Invitation Link
					</Button>
					<Button variant="outline" fullWidth onclick={() => window.open(`/${data.wedding?.slug}`, '_blank')}>
						👁 Preview Invitation
					</Button>
					<a href="/admin/guests">
						<Button variant="ghost" fullWidth>👥 Manage Guests</Button>
					</a>
				</div>
			</Card>
		</div>

		<!-- Wedding Info -->
		<Card>
			<h2 class="font-display text-xl mb-4">Wedding Details</h2>
			<div class="grid md:grid-cols-2 gap-4 text-sm">
				<div>
					<p class="text-muted">Couple</p>
					<p class="font-medium">{data.wedding.coupleNames}</p>
				</div>
				<div>
					<p class="text-muted">Date</p>
					<p class="font-medium">
						{new Date(data.wedding.weddingDate).toLocaleDateString('en-US', {
							weekday: 'long',
							year: 'numeric',
							month: 'long',
							day: 'numeric'
						})}
					</p>
				</div>
				<div class="md:col-span-2">
					<p class="text-muted">Venue</p>
					<p class="font-medium whitespace-pre-line">{data.wedding.venueDetails}</p>
				</div>
			</div>
		</Card>
	{:else}
		<!-- No wedding yet -->
		<Card variant="elevated" class="text-center py-12">
			<p class="font-display text-2xl mb-2">No Wedding Found</p>
			<p class="text-muted mb-6">Create your wedding to get started.</p>
			<Button onclick={() => {}}>Create Wedding</Button>
		</Card>
	{/if}
</div>
