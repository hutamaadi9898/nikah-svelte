/**
 * Root layout server load.
 * Provides user session data to all pages.
 */
import type { ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async (event) => {
    return {
        user: event.locals.user,
        session: event.locals.session
    };
};
