<!-- Login page (Email/Password) -->
<script lang="ts">
	import { goto } from '$app/navigation';
	import { authClient } from '$lib/auth/client';

	let email = '';
	let password = '';
	let errorMessage: string | null = null;
	let isSubmitting = false;
	const emailId = 'email';
	const passwordId = 'password';

	async function submit() {
		errorMessage = null;
		isSubmitting = true;

		try {
			const res = await authClient.signIn.email({ email, password });
			if (res.error) {
				errorMessage = res.error.message ?? 'Unable to sign in.';
				return;
			}
			await goto('/');
		} catch {
			errorMessage = 'Unable to sign in.';
		} finally {
			isSubmitting = false;
		}
	}
</script>

<form
	class="space-y-4"
	on:submit|preventDefault={() => {
		void submit();
	}}
>
	<div class="space-y-2">
		<label class="block text-xs tracking-[0.18em] text-muted" for={emailId}>EMAIL</label>
		<input
			id={emailId}
			class="w-full rounded-md border border-border/10 bg-bg/60 px-4 py-3 text-sm outline-none ring-0 transition focus:border-accent/40"
			type="email"
			autocomplete="email"
			bind:value={email}
			required
		/>
	</div>

	<div class="space-y-2">
		<label class="block text-xs tracking-[0.18em] text-muted" for={passwordId}>PASSWORD</label>
		<input
			id={passwordId}
			class="w-full rounded-md border border-border/10 bg-bg/60 px-4 py-3 text-sm outline-none ring-0 transition focus:border-accent/40"
			type="password"
			autocomplete="current-password"
			bind:value={password}
			required
		/>
	</div>

	{#if errorMessage}
		<p class="text-sm text-accent">{errorMessage}</p>
	{/if}

	<button
		class="w-full rounded-md border border-border/15 bg-text px-4 py-3 font-body text-sm tracking-wide text-bg transition hover:bg-text/90 disabled:opacity-60"
		type="submit"
		disabled={isSubmitting}
	>
		{isSubmitting ? 'Signing in…' : 'Sign in'}
	</button>

	<p class="pt-2 text-center text-sm text-muted">
		New here?
		<a class="underline decoration-border/30 underline-offset-4 hover:decoration-accent/60" href="/register"
			>Create an account</a
		>
	</p>
</form>
