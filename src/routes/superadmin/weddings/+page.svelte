<!--
	SuperAdmin Wedding Management page.
	Lists all weddings with activation controls.
-->
<script lang="ts">
	import { Card, Button } from '$lib/components/ui';
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Weddings | SuperAdmin</title>
</svelte:head>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<div>
			<h1 class="font-display text-3xl tracking-tight">Wedding Management</h1>
			<p class="text-muted mt-1">View and manage all weddings on the platform.</p>
		</div>
	</div>

	{#if data.weddings.length > 0}
		<Card>
			<div class="overflow-x-auto">
				<table class="w-full text-sm">
					<thead>
						<tr class="border-b border-border/10 text-left text-xs uppercase tracking-wider text-muted">
							<th class="pb-3 font-medium">Slug</th>
							<th class="pb-3 font-medium">Couple</th>
							<th class="pb-3 font-medium">Date</th>
							<th class="pb-3 font-medium">Created</th>
							<th class="pb-3 font-medium text-right">Actions</th>
						</tr>
					</thead>
					<tbody>
						{#each data.weddings as wedding}
							<tr class="border-b border-border/5 last:border-0">
								<td class="py-3">
									<a href="/{wedding.slug}" target="_blank" class="text-accent hover:underline">
										{wedding.slug}
									</a>
								</td>
								<td class="py-3 font-medium">{wedding.coupleNames}</td>
								<td class="py-3 text-muted">
									{new Date(wedding.weddingDate).toLocaleDateString()}
								</td>
								<td class="py-3 text-muted">
									{new Date(wedding.createdAt).toLocaleDateString()}
								</td>
								<td class="py-3 text-right">
									<Button variant="ghost" onclick={() => {}}>
										Delete
									</Button>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</Card>
	{:else}
		<Card class="text-center py-12">
			<p class="text-muted">No weddings created yet.</p>
		</Card>
	{/if}
</div>
