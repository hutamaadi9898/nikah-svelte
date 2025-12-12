<!--
	SuperAdmin dashboard layout.
	Similar to admin but with different navigation and branding.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import { page } from '$app/state';
	import { authClient } from '$lib/auth/client';
	import { goto } from '$app/navigation';

	interface Props {
		data: LayoutData;
		children: Snippet;
	}

	const { data, children }: Props = $props();

	const navItems = [
		{ href: '/superadmin', label: 'Overview', icon: '📊' },
		{ href: '/superadmin/users', label: 'Users', icon: '👤' },
		{ href: '/superadmin/weddings', label: 'Weddings', icon: '💒' }
	];

	async function signOut() {
		await authClient.signOut();
		await goto('/login');
	}

	function isActive(href: string): boolean {
		if (href === '/superadmin') {
			return page.url.pathname === '/superadmin';
		}
		return page.url.pathname.startsWith(href);
	}
</script>

<div class="min-h-dvh bg-bg flex">
	<!-- Sidebar -->
	<aside class="w-64 border-r border-border/10 bg-red-950/5 flex flex-col">
		<!-- Brand -->
		<div class="h-16 flex items-center px-6 border-b border-border/10">
			<span class="font-display text-lg tracking-tight text-red-600">NIKAH</span>
			<span class="ml-2 text-xs text-red-500 font-medium">SuperAdmin</span>
		</div>

		<!-- Navigation -->
		<nav class="flex-1 py-6 px-3">
			<ul class="space-y-1">
				{#each navItems as item}
					<li>
						<a
							href={item.href}
							class="
								flex items-center gap-3 px-3 py-2.5 rounded-md
								text-sm transition-colors
								{isActive(item.href)
									? 'bg-red-500/10 text-red-600 font-medium'
									: 'text-muted hover:text-text hover:bg-surface/60'}
							"
						>
							<span class="w-5 text-center">{item.icon}</span>
							{item.label}
						</a>
					</li>
				{/each}
			</ul>
		</nav>

		<!-- User info -->
		<div class="p-4 border-t border-border/10">
			<div class="flex items-center gap-3 mb-3">
				<div class="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-xs font-medium text-red-600">
					{data.user.name.charAt(0).toUpperCase()}
				</div>
				<div class="flex-1 min-w-0">
					<p class="text-sm font-medium truncate">{data.user.name}</p>
					<p class="text-xs text-red-500">superadmin</p>
				</div>
			</div>
			<button
				onclick={signOut}
				class="w-full text-left text-xs text-muted hover:text-text transition px-2 py-1"
			>
				Sign out
			</button>
		</div>
	</aside>

	<!-- Main content -->
	<main class="flex-1 overflow-auto">
		<div class="max-w-6xl mx-auto px-8 py-8">
			{@render children()}
		</div>
	</main>
</div>
