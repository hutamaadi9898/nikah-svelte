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

<div class="space-y-10">
	<!-- Header -->
	<div>
		<h1 class="font-display text-4xl lg:text-5xl tracking-tight text-text">Dashboard</h1>
		<p class="text-muted mt-2 text-lg">Welcome back. Here's your wedding overview.</p>
	</div>

	{#if data.wedding && data.stats}
		<!-- Quick Stats -->
		<div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
			<Card class="p-6">
				<p class="text-xs font-semibold tracking-wide text-muted uppercase">Confirmed</p>
				<p class="font-display text-5xl mt-3 text-emerald-700/80">{data.stats.confirmed}</p>
				<p class="text-sm text-muted mt-2">{data.stats.totalPax} guests total</p>
			</Card>

			<Card class="p-6">
				<p class="text-xs font-semibold tracking-wide text-muted uppercase">Pending</p>
				<p class="font-display text-5xl mt-3 text-amber-600/80">{data.stats.pending}</p>
			</Card>

			<Card class="p-6">
				<p class="text-xs font-semibold tracking-wide text-muted uppercase">Declined</p>
				<p class="font-display text-5xl mt-3 text-rose-600/80">{data.stats.declined}</p>
			</Card>

			<Card class="p-6">
				<p class="text-xs font-semibold tracking-wide text-muted uppercase">Wishes</p>
				<p class="font-display text-5xl mt-3 text-text/80">{data.stats.totalWishes}</p>
			</Card>
		</div>

		<!-- Countdown & Actions -->
		<div class="grid lg:grid-cols-2 gap-8">
			<Card variant="elevated" class="p-8">
				<h2 class="font-display text-3xl mb-8">Countdown</h2>
				<Countdown targetDate={new Date(data.wedding.weddingDate)} />
			</Card>

			<Card class="p-8">
				<h2 class="font-display text-3xl mb-6">Quick Actions</h2>
				<div class="space-y-4">
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
					<a href="/admin/guests" class="block">
						<Button variant="subtle" fullWidth>👥 Manage Guests</Button>
					</a>
				</div>
			</Card>
		</div>

		<!-- Wedding Info -->
		<Card class="p-8">
			<h2 class="font-display text-3xl mb-6">Wedding Details</h2>
			<div class="grid md:grid-cols-2 gap-8 text-[0.95rem]">
				<div>
					<p class="text-muted text-xs uppercase tracking-wide font-semibold mb-1">Couple</p>
					<p class="font-display text-2xl text-text">{data.wedding.coupleNames}</p>
				</div>
				<div>
					<p class="text-muted text-xs uppercase tracking-wide font-semibold mb-1">Date</p>
					<p class="font-display text-2xl text-text">
						{new Date(data.wedding.weddingDate).toLocaleDateString('en-US', {
							weekday: 'long',
							year: 'numeric',
							month: 'long',
							day: 'numeric'
						})}
					</p>
				</div>
				<div class="md:col-span-2">
					<p class="text-muted text-xs uppercase tracking-wide font-semibold mb-1">Venue</p>
					<p class="font-medium whitespace-pre-line leading-relaxed text-text/80">{data.wedding.venueDetails}</p>
				</div>
			</div>
		</Card>
	{:else}
		<!-- No wedding yet -->
		<Card variant="glass" class="text-center py-20">
            <div class="max-w-md mx-auto space-y-6">
                <span class="text-6xl">✨</span>
                <h2 class="font-display text-4xl text-text">Welcome to Nikah</h2>
                <p class="text-muted text-lg leading-relaxed text-balance">
                    You haven't set up your wedding yet. Create one now to start sending invitations and collecting RSVPs.
                </p>
                <div class="pt-4">
                    <a href="/admin/create">
                        <Button class="px-8">Create Wedding</Button>
                    </a>
                </div>
            </div>
		</Card>
	{/if}
</div>
