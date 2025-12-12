/**
 * BetterAuth client for Svelte components.
 */
import { browser } from '$app/environment';
import { createAuthClient } from 'better-auth/svelte';

export const authClient = createAuthClient({
	baseURL: browser ? window.location.origin : 'http://localhost',
	basePath: '/api/auth'
});
