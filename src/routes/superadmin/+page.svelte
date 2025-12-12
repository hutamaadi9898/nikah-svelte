<!--
	SuperAdmin Overview page.
	Platform-wide statistics and health.
-->
<script lang="ts">
	import { Card } from '$lib/components/ui';
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>SuperAdmin | NIKAH</title>
</svelte:head>

<div class="space-y-8">
	<div>
		<h1 class="font-display text-3xl tracking-tight">Platform Overview</h1>
		<p class="text-muted mt-1">Monitor the health of the NIKAH platform.</p>
	</div>

	<!-- Stats Grid -->
	<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
		<Card>
			<p class="text-xs tracking-[0.18em] text-muted uppercase">Total Users</p>
			<p class="font-display text-4xl mt-2">{data.stats.totalUsers}</p>
		</Card>

		<Card>
			<p class="text-xs tracking-[0.18em] text-muted uppercase">Total Weddings</p>
			<p class="font-display text-4xl mt-2">{data.stats.totalWeddings}</p>
		</Card>

		<Card>
			<p class="text-xs tracking-[0.18em] text-muted uppercase">Total Guests</p>
			<p class="font-display text-4xl mt-2">{data.stats.totalGuests}</p>
		</Card>

		<Card>
			<p class="text-xs tracking-[0.18em] text-muted uppercase">Total Wishes</p>
			<p class="font-display text-4xl mt-2">{data.stats.totalWishes}</p>
		</Card>
	</div>

	<!-- Quick Links -->
	<Card>
		<h2 class="font-display text-xl mb-4">Quick Actions</h2>
		<div class="flex gap-4">
			<a href="/superadmin/users" class="text-sm text-accent hover:underline">Manage Users →</a>
			<a href="/superadmin/weddings" class="text-sm text-accent hover:underline">Manage Weddings →</a>
		</div>
	</Card>
</div>
