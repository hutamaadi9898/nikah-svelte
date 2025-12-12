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
		{ href: '/admin', label: 'Overview', icon: '🏠' },
		{ href: '/admin/guests', label: 'Guests', icon: '👥' },
		{ href: '/admin/stories', label: 'Stories', icon: '📖' },
		{ href: '/admin/gallery', label: 'Gallery', icon: '📸' },
		{ href: '/admin/settings', label: 'Settings', icon: '⚙️' }
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

	// Mobile sidebar state
	let isSidebarOpen = $state(false);
</script>

<div class="min-h-dvh bg-zinc-100">
	<!-- Mobile Header -->
	<header class="lg:hidden fixed top-0 left-0 right-0 h-14 bg-white border-b border-zinc-200 flex items-center justify-between px-4 z-50">
		<span class="font-display text-xl">Nikah</span>
		<button 
			onclick={() => isSidebarOpen = !isSidebarOpen} 
			class="p-2 hover:bg-zinc-100 rounded-lg"
			aria-label="Toggle Menu"
		>
			<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
			</svg>
		</button>
	</header>

	<div class="flex">
		<!-- Desktop Sidebar -->
		<aside class="hidden lg:flex flex-col w-64 min-h-dvh bg-white border-r border-zinc-200">
			<!-- Brand -->
			<div class="h-16 flex items-center px-6 border-b border-zinc-100">
				<span class="font-display text-2xl">Nikah</span>
			</div>

			<!-- Navigation -->
			<nav class="flex-1 p-4">
				<ul class="space-y-1">
					{#each navItems as item}
						<li>
							<a
								href={item.href}
								class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors
									{isActive(item.href)
										? 'bg-zinc-900 text-white'
										: 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'}"
							>
								<span class="text-lg">{item.icon}</span>
								{item.label}
							</a>
						</li>
					{/each}
				</ul>
			</nav>

			<!-- User -->
			<div class="p-4 border-t border-zinc-100">
				<div class="flex items-center gap-3 mb-3">
					<div class="w-10 h-10 rounded-full bg-zinc-900 text-white flex items-center justify-center text-sm font-medium">
						{data.user.name.charAt(0).toUpperCase()}
					</div>
					<div class="flex-1 min-w-0">
						<p class="text-sm font-medium truncate">{data.user.name}</p>
						<p class="text-xs text-zinc-500 truncate">{data.user.email}</p>
					</div>
				</div>
				<button
					onclick={signOut}
					class="w-full text-left text-sm text-zinc-500 hover:text-red-600 transition-colors"
				>
					Sign out
				</button>
			</div>
		</aside>

		<!-- Mobile Sidebar Overlay -->
		{#if isSidebarOpen}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div 
				class="fixed inset-0 bg-black/50 z-40 lg:hidden"
				onclick={() => isSidebarOpen = false}
			></div>
			
			<!-- Mobile Sidebar -->
			<aside class="fixed left-0 top-0 bottom-0 w-72 bg-white z-50 lg:hidden flex flex-col shadow-xl">
				<div class="h-14 flex items-center justify-between px-4 border-b border-zinc-100">
					<span class="font-display text-xl">Nikah</span>
					<button onclick={() => isSidebarOpen = false} class="p-2" aria-label="Close Menu">
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
						</svg>
					</button>
				</div>
				
				<nav class="flex-1 p-4">
					<ul class="space-y-1">
						{#each navItems as item}
							<li>
								<a
									href={item.href}
									onclick={() => isSidebarOpen = false}
									class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors
										{isActive(item.href)
											? 'bg-zinc-900 text-white'
											: 'text-zinc-600 hover:bg-zinc-100'}"
								>
									<span class="text-lg">{item.icon}</span>
									{item.label}
								</a>
							</li>
						{/each}
					</ul>
				</nav>

				<div class="p-4 border-t border-zinc-100">
					<div class="flex items-center gap-3 mb-3">
						<div class="w-10 h-10 rounded-full bg-zinc-900 text-white flex items-center justify-center text-sm font-medium">
							{data.user.name.charAt(0).toUpperCase()}
						</div>
						<div class="flex-1 min-w-0">
							<p class="text-sm font-medium truncate">{data.user.name}</p>
							<p class="text-xs text-zinc-500 truncate">{data.user.email}</p>
						</div>
					</div>
					<button
						onclick={signOut}
						class="w-full text-left text-sm text-zinc-500 hover:text-red-600"
					>
						Sign out
					</button>
				</div>
			</aside>
		{/if}

		<!-- Main Content -->
		<main class="flex-1 min-h-dvh pt-14 lg:pt-0">
			<div class="max-w-5xl mx-auto p-6 lg:p-10">
				{@render children()}
			</div>
		</main>
	</div>
</div>
