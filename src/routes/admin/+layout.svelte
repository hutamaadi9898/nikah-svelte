<!--
	Admin dashboard layout with sidebar navigation.
	Minimalist Luxury aesthetic - clean, focused, elegant.
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

	// Navigation items
	const navItems = [
		{ href: '/admin', label: 'Overview', icon: 'home' },
		{ href: '/admin/guests', label: 'Guests', icon: 'users' },
		{ href: '/admin/stories', label: 'Stories', icon: 'book' },
		{ href: '/admin/gallery', label: 'Gallery', icon: 'image' },
		{ href: '/admin/settings', label: 'Settings', icon: 'settings' }
	];

	async function signOut() {
		await authClient.signOut();
		await goto('/login');
	}

	function isActive(href: string): boolean {
		if (href === '/admin') {
			return page.url.pathname === '/admin';
		}
		return page.url.pathname.startsWith(href);
	}
</script>

<div class="min-h-dvh bg-bg flex text-text font-body">
	<!-- Sidebar: Deep Emerald Background -->
	<aside class="w-72 border-r border-white/5 bg-accent flex flex-col sticky top-0 h-dvh text-white">
		<!-- Brand -->
		<div class="h-24 flex items-center px-8">
			<span class="font-display text-4xl text-white tracking-normal">Nikah</span>
		</div>

		<!-- Navigation -->
		<nav class="flex-1 px-4 py-4">
			<ul class="space-y-1">
				{#each navItems as item}
					<li>
						<a
							href={item.href}
							class="
								flex items-center gap-3 px-4 py-3.5 rounded-xl
								text-[0.95rem] font-medium transition-all duration-200
								{isActive(item.href)
									? 'bg-white/10 text-white shadow-inner'
									: 'text-white/60 hover:text-white hover:bg-white/5'}
							"
						>
							<span class="w-5 h-5 flex items-center justify-center opacity-70">
                                <!-- Using text for now, but could be SVGs -->
								{#if item.icon === 'home'}📊{/if}
								{#if item.icon === 'users'}👥{/if}
								{#if item.icon === 'book'}📖{/if}
								{#if item.icon === 'image'}🖼{/if}
								{#if item.icon === 'settings'}⚙{/if}
							</span>
							{item.label}
						</a>
					</li>
				{/each}
			</ul>
		</nav>

		<!-- User info + sign out -->
		<div class="p-6 bg-black/10">
			<div class="flex items-center gap-3 mb-4">
				<div class="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-sm font-display text-white shadow-sm">
					{data.user.name.charAt(0).toUpperCase()}
				</div>
				<div class="flex-1 min-w-0">
					<p class="text-sm font-medium truncate text-white">{data.user.name}</p>
					<p class="text-xs text-white/50 truncate">{data.user.email}</p>
				</div>
			</div>
			<button
				onclick={signOut}
				class="w-full text-left text-xs text-white/60 hover:text-white transition px-2 py-1 font-medium"
			>
				Sign out
			</button>
		</div>
	</aside>

	<!-- Main content -->
	<main class="flex-1 overflow-y-auto bg-stone-50">
		<div class="max-w-6xl mx-auto px-12 py-12">
			{@render children()}
		</div>
	</main>
</div>
