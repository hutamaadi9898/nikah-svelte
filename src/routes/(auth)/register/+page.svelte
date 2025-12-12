<!-- Register page (Email/Password) -->
<script lang="ts">
	import { goto } from '$app/navigation';
	import { authClient } from '$lib/auth/client';
    import { Card, Button, Input } from '$lib/components/ui';

	let name = $state('');
	let email = $state('');
	let password = $state('');
	let errorMessage = $state<string | null>(null);
	let isSubmitting = $state(false);

	async function submit() {
		errorMessage = null;
		isSubmitting = true;

		try {
			const res = await authClient.signUp.email({ name, email, password });
			if (res.error) {
				errorMessage = res.error.message ?? 'Unable to create account.';
				return;
			}
			await goto('/admin');
		} catch {
			errorMessage = 'Unable to create account.';
		} finally {
			isSubmitting = false;
		}
	}
</script>

<div class="min-h-dvh flex flex-row-reverse">
    <!-- Right: Image Section -->
    <div class="hidden lg:block w-1/2 relative overflow-hidden bg-stone-900">
        <img 
            src="https://images.unsplash.com/photo-1511285560982-1351cdeb9821?q=80&w=3000&auto=format&fit=crop" 
            alt="Wedding Floral"
            class="absolute inset-0 w-full h-full object-cover text-transparent opacity-80"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        <div class="absolute bottom-12 right-12 text-white text-right">
            <h1 class="font-display text-5xl mb-2">Begin Journey</h1>
            <p class="text-white/80 font-medium tracking-wide">Create a timeless memory.</p>
        </div>
    </div>

    <!-- Left: Form Section -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white relative border-l border-zinc-100">
        <div class="w-full max-w-sm space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-700">
            
            <div class="text-center lg:text-left space-y-2">
                <h2 class="font-display text-4xl text-text tracking-tight">Create Account</h2>
                <p class="text-muted text-base">Start your beautiful journey with Nikah.</p>
            </div>

            <form
                class="space-y-6"
                onsubmit={e => { e.preventDefault(); void submit(); }}
            >
                <Input
                    label="Full Name"
                    autocomplete="name"
                    bind:value={name}
                    required
                    placeholder="John Doe"
                />

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
                    autocomplete="new-password"
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
                        Create Account
                    </Button>
                </div>
            </form>

            <div class="mt-8 text-center lg:text-left font-body">
                <p class="text-sm text-muted">
                    Already have an account?
                    <a class="text-accent hover:text-accent/80 underline decoration-border/30 underline-offset-4 transition-colors font-medium ml-1" href="/login">
                        Sign in
                    </a>
                </p>
            </div>

            <p class="text-center lg:text-left text-xs text-muted/40 font-medium mt-12">
                &copy; 2025 Nikah Platform. All rights reserved.
            </p>
        </div>
    </div>
</div>
