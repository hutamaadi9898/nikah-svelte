<!-- Register page (Email/Password) -->
<script lang="ts">
	import { goto } from '$app/navigation';
	import { authClient } from '$lib/auth/client';

	let name = '';
	let email = '';
	let password = '';
	let errorMessage: string | null = null;
	let isSubmitting = false;
	const nameId = 'name';
	const emailId = 'email';
	const passwordId = 'password';

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

<form
	class="space-y-4"
	on:submit|preventDefault={() => {
		void submit();
	}}
>
	<div class="space-y-2">
		<label class="block text-xs tracking-[0.18em] text-muted" for={nameId}>NAME</label>
		<input
			id={nameId}
			class="w-full rounded-md border border-border/10 bg-bg/60 px-4 py-3 text-sm outline-none ring-0 transition focus:border-accent/40"
			autocomplete="name"
			bind:value={name}
			required
		/>
	</div>

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
			autocomplete="new-password"
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
		{isSubmitting ? 'Creating…' : 'Create account'}
	</button>

	<p class="pt-2 text-center text-sm text-muted">
		Already have an account?
		<a class="underline decoration-border/30 underline-offset-4 hover:decoration-accent/60" href="/login"
			>Sign in</a
		>
	</p>
</form>
