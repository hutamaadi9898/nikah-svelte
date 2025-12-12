<script lang="ts">
	/**
	 * RSVP form component for guest responses.
	 * Supports name pre-fill from URL and pax selection.
	 */
	import { Button, Input, Card } from '$lib/components/ui';

	interface Props {
		/** Pre-filled guest name (from URL slug) */
		guestName?: string;
		/** Wedding slug for API submission */
		weddingSlug: string;
		/** Callback after successful RSVP */
		onSuccess?: () => void;
	}

	const { guestName = '', weddingSlug, onSuccess }: Props = $props();

	let name = $state(guestName);
	let pax = $state(1);
	let status = $state<'confirmed' | 'declined'>('confirmed');
	let message = $state('');
	let isSubmitting = $state(false);
	let errorMessage = $state<string | null>(null);

	async function submit() {
		errorMessage = null;
		isSubmitting = true;

		try {
			const res = await fetch(`/api/weddings/${weddingSlug}/rsvp`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name, pax, status, message })
			});

			if (!res.ok) {
				const data = (await res.json()) as { message?: string };
				errorMessage = data.message || 'Failed to submit RSVP.';
				return;
			}

			onSuccess?.();
		} catch {
			errorMessage = 'Network error. Please try again.';
		} finally {
			isSubmitting = false;
		}
	}
</script>

<Card variant="elevated">
	<h3 class="font-display text-2xl tracking-tight text-center mb-6">RSVP</h3>

	<form
		class="space-y-4"
		onsubmit={(e) => {
			e.preventDefault();
			void submit();
		}}
	>
		<Input label="Your Name" bind:value={name} required />

		<!-- Attendance -->
		<div class="space-y-2">
			<span class="block text-xs tracking-[0.18em] text-muted uppercase">Attendance</span>
			<div class="flex gap-4">
				<label class="flex items-center gap-2 cursor-pointer">
					<input
						type="radio"
						name="status"
						value="confirmed"
						bind:group={status}
						class="accent-accent"
					/>
					<span class="text-sm">I will attend</span>
				</label>
				<label class="flex items-center gap-2 cursor-pointer">
					<input
						type="radio"
						name="status"
						value="declined"
						bind:group={status}
						class="accent-accent"
					/>
					<span class="text-sm">Unable to attend</span>
				</label>
			</div>
		</div>

		<!-- Number of guests (only if attending) -->
		{#if status === 'confirmed'}
			<div class="space-y-2">
				<label class="block text-xs tracking-[0.18em] text-muted uppercase" for="pax">
					Number of Guests
				</label>
				<select
					id="pax"
					bind:value={pax}
					class="
						w-full rounded-md
						border border-border/10 bg-bg/60
						px-4 py-3 text-sm
						outline-none transition
						focus:border-accent/40
					"
				>
					{#each [1, 2, 3, 4, 5] as n}
						<option value={n}>{n}</option>
					{/each}
				</select>
			</div>
		{/if}

		<!-- Message/Wish -->
		<div class="space-y-2">
			<label class="block text-xs tracking-[0.18em] text-muted uppercase" for="message">
				Message for the couple (optional)
			</label>
			<textarea
				id="message"
				bind:value={message}
				rows="3"
				class="
					w-full rounded-md
					border border-border/10 bg-bg/60
					px-4 py-3 text-sm
					outline-none resize-none transition
					focus:border-accent/40
				"
				placeholder="Congratulations on your special day..."
			></textarea>
		</div>

		{#if errorMessage}
			<p class="text-sm text-red-500">{errorMessage}</p>
		{/if}

		<Button type="submit" fullWidth loading={isSubmitting}>
			Submit RSVP
		</Button>
	</form>
</Card>
