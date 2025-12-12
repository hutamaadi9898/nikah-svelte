<script lang="ts">
	/**
	 * Elegant countdown timer to the wedding date.
	 * Displays days, hours, minutes, seconds with refined typography.
	 */
	interface Props {
		/** Target date for the countdown */
		targetDate: Date;
	}

	const { targetDate }: Props = $props();

	// Reactive time remaining
	let now = $state(new Date());

	// Update every second
	$effect(() => {
		const interval = setInterval(() => {
			now = new Date();
		}, 1000);

		return () => clearInterval(interval);
	});

	// Calculate time difference
	const timeRemaining = $derived(() => {
		const diff = targetDate.getTime() - now.getTime();
		if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };

		const seconds = Math.floor((diff / 1000) % 60);
		const minutes = Math.floor((diff / (1000 * 60)) % 60);
		const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
		const days = Math.floor(diff / (1000 * 60 * 60 * 24));

		return { days, hours, minutes, seconds, isPast: false };
	});

	// Helper to pad numbers
	function pad(n: number): string {
		return n.toString().padStart(2, '0');
	}
</script>

<div class="flex items-center justify-center gap-4 md:gap-8">
	<!-- Days -->
	<div class="text-center">
		<div class="font-display text-4xl md:text-6xl tracking-tight text-text">
			{timeRemaining().days}
		</div>
		<div class="text-xs tracking-[0.2em] text-muted uppercase mt-2">Days</div>
	</div>

	<span class="text-2xl text-muted/40 font-light">:</span>

	<!-- Hours -->
	<div class="text-center">
		<div class="font-display text-4xl md:text-6xl tracking-tight text-text">
			{pad(timeRemaining().hours)}
		</div>
		<div class="text-xs tracking-[0.2em] text-muted uppercase mt-2">Hours</div>
	</div>

	<span class="text-2xl text-muted/40 font-light">:</span>

	<!-- Minutes -->
	<div class="text-center">
		<div class="font-display text-4xl md:text-6xl tracking-tight text-text">
			{pad(timeRemaining().minutes)}
		</div>
		<div class="text-xs tracking-[0.2em] text-muted uppercase mt-2">Minutes</div>
	</div>

	<span class="text-2xl text-muted/40 font-light">:</span>

	<!-- Seconds -->
	<div class="text-center">
		<div class="font-display text-4xl md:text-6xl tracking-tight text-text">
			{pad(timeRemaining().seconds)}
		</div>
		<div class="text-xs tracking-[0.2em] text-muted uppercase mt-2">Seconds</div>
	</div>
</div>

{#if timeRemaining().isPast}
	<p class="text-center text-accent mt-4 font-display text-lg italic">
		The celebration has begun!
	</p>
{/if}
