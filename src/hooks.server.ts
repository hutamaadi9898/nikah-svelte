/**
 * Server hooks:
 * - Routes BetterAuth requests to the auth handler.
 * - Loads session once per request for non-auth routes.
 */
import type { Handle } from '@sveltejs/kit';
import { building } from '$app/environment';
import { isAuthPath, svelteKitHandler } from 'better-auth/svelte-kit';
import { createNikahAuth } from '$lib/server/auth';

export const handle: Handle = async ({ event, resolve }) => {
	const auth = createNikahAuth(event);
	event.locals.auth = auth;

	// Avoid duplicate DB work for auth endpoints (they manage their own session lifecycle).
	if (!isAuthPath(event.url.toString(), auth.options)) {
		event.locals.session = await auth.api.getSession({ headers: event.request.headers });
		event.locals.user = event.locals.session?.user ?? null;
	}

	return svelteKitHandler({ auth, event, resolve, building });
};
