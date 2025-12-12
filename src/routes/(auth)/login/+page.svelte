<!-- Login page (Email/Password) -->
<script lang="ts">
	import { goto } from '$app/navigation';
	import { authClient } from '$lib/auth/client';
    import { Card, Button, Input } from '$lib/components/ui';

	let email = $state('');
	let password = $state('');
	let errorMessage = $state<string | null>(null);
	let isSubmitting = $state(false);
	
	async function submit() {
		errorMessage = null;
		isSubmitting = true;

		try {
			const res = await authClient.signIn.email({ email, password });
			if (res.error) {
				errorMessage = res.error.message ?? 'Unable to sign in.';
				return;
			}
			await goto('/admin');
		} catch {
			errorMessage = 'Unable to sign in.';
		} finally {
			isSubmitting = false;
		}
	}
</script>

<div class="min-h-dvh flex">
    <!-- Left: Image Section -->
    <div class="hidden lg:block w-1/2 relative overflow-hidden bg-stone-900">
        <img 
            src="https://images.unsplash.com/photo-1519225421980-715cb0202128?q=80&w=3000&auto=format&fit=crop" 
            alt="Wedding Couple"
            class="absolute inset-0 w-full h-full object-cover text-transparent opacity-80"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        <div class="absolute bottom-12 left-12 text-white">
            <h1 class="font-display text-5xl mb-2">Nikah</h1>
            <p class="text-white/80 font-medium tracking-wide">Craft your perfect wedding invitation.</p>
        </div>
    </div>

    <!-- Right: Form Section -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-8 bg-bg relative">
        <div class="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            <div class="text-center lg:text-left space-y-2">
                <h2 class="font-display text-4xl text-text">Welcome Back</h2>
                <p class="text-muted text-base">Sign in to continue managing your big day.</p>
            </div>

            <form
                class="space-y-6"
                onsubmit={e => { e.preventDefault(); void submit(); }}
            >
                <Input
                    label="Email Address"
                    type="email"
                    name="email"
                    autocomplete="email"
                    bind:value={email}
                    required
                    placeholder="you@example.com"
                />

                <Input
                    label="Password"
                    type="password"
                    name="password"
                    autocomplete="current-password"
                    bind:value={password}
                    required
                    placeholder="••••••••"
                />

                {#if errorMessage}
                    <div class="p-3 pb-3.5 rounded-lg bg-red-50 text-red-600 text-xs font-medium text-center shadow-sm border border-red-100">
                        {errorMessage}
                    </div>
                {/if}

                <div class="pt-2">
                    <Button type="submit" fullWidth loading={isSubmitting}>
                        Sign In
                    </Button>
                </div>
            </form>

            <div class="mt-8 text-center lg:text-left font-body">
                <p class="text-sm text-muted">
                    Don't have an account?
                    <a class="text-accent hover:text-accent/80 underline decoration-accent/30 underline-offset-4 transition-colors font-medium ml-1" href="/register">
                        Create one
                    </a>
                </p>
            </div>
            
             <p class="text-center lg:text-left text-xs text-muted/40 font-medium mt-12">
                &copy; 2025 Nikah Platform. All rights reserved.
            </p>
        </div>
    </div>
</div>
