<script lang="ts" module>
	/**
	 * Toast notification component.
	 * Appears from bottom-right, auto-dismisses.
	 */
	export type ToastType = 'success' | 'error' | 'info';

	export interface Toast {
		id: string;
		message: string;
		type: ToastType;
	}

	/** Reactive store for active toasts */
	let toasts = $state<Toast[]>([]);

	const TOAST_DURATION = 4000;

	export function showToast(message: string, type: ToastType = 'info') {
		const id = crypto.randomUUID();
		toasts = [...toasts, { id, message, type }];

		setTimeout(() => {
			toasts = toasts.filter((t) => t.id !== id);
		}, TOAST_DURATION);
	}

	export function dismissToast(id: string) {
		toasts = toasts.filter((t) => t.id !== id);
	}
</script>

<script lang="ts">
	const typeStyles: Record<ToastType, string> = {
		success: 'border-green-500/30 text-green-600',
		error: 'border-red-500/30 text-red-600',
		info: 'border-accent/30 text-accent'
	};
</script>

{#if toasts.length > 0}
	<div class="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
		{#each toasts as toast (toast.id)}
			<div
				class="
					flex items-center gap-3
					rounded-md border bg-surface/95 backdrop-blur-sm
					px-4 py-3 shadow-lg
					animate-in slide-in-from-right fade-in duration-300
					{typeStyles[toast.type]}
				"
				role="alert"
			>
				<span class="text-sm">{toast.message}</span>
				<button
					class="ml-2 text-muted hover:text-text transition"
					onclick={() => dismissToast(toast.id)}
					aria-label="Dismiss"
				>
					✕
				</button>
			</div>
		{/each}
	</div>
{/if}
