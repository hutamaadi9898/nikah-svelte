<script lang="ts">
	/**
	 * Floating audio player for background music.
	 * Unobtrusive, positioned bottom-right.
	 */
	interface Props {
		/** URL of the audio file */
		src: string;
		/** Whether to autoplay (user must interact first due to browser policies) */
		autoplay?: boolean;
	}

	const { src, autoplay = false }: Props = $props();

	let audioEl: HTMLAudioElement | undefined = $state();
	let isPlaying = $state(false);
	let hasInteracted = $state(false);

	// Attempt autoplay after first user interaction
	$effect(() => {
		if (!audioEl || !autoplay || hasInteracted) return;

		const handleInteraction = () => {
			hasInteracted = true;
			audioEl?.play().catch(() => {
				// Autoplay blocked - user will need to click
			});
		};

		document.addEventListener('click', handleInteraction, { once: true });
		document.addEventListener('touchstart', handleInteraction, { once: true });

		return () => {
			document.removeEventListener('click', handleInteraction);
			document.removeEventListener('touchstart', handleInteraction);
		};
	});

	function togglePlay() {
		if (!audioEl) return;
		if (isPlaying) {
			audioEl.pause();
		} else {
			audioEl.play();
		}
	}
</script>

<audio
	bind:this={audioEl}
	{src}
	loop
	onplay={() => (isPlaying = true)}
	onpause={() => (isPlaying = false)}
></audio>

<button
	class="
		fixed bottom-6 right-6 z-40
		flex h-12 w-12 items-center justify-center
		rounded-full border border-border/20
		bg-surface/90 backdrop-blur-sm
		shadow-lg
		transition hover:border-accent/40 hover:scale-105
	"
	onclick={togglePlay}
	aria-label={isPlaying ? 'Pause music' : 'Play music'}
>
	{#if isPlaying}
		<!-- Pause icon -->
		<svg class="h-5 w-5 text-text" fill="currentColor" viewBox="0 0 24 24">
			<rect x="6" y="5" width="4" height="14" rx="1" />
			<rect x="14" y="5" width="4" height="14" rx="1" />
		</svg>
	{:else}
		<!-- Play icon -->
		<svg class="h-5 w-5 text-text ml-0.5" fill="currentColor" viewBox="0 0 24 24">
			<path d="M8 5v14l11-7z" />
		</svg>
	{/if}
</button>
