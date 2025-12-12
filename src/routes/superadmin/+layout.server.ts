/**
 * Server load for superadmin layout.
 * Ensures user has superadmin role.
 */
import type { LayoutServerLoad } from './$types';
import { superAdminRoute } from '$lib/server/auth/guards';

export const load: LayoutServerLoad = async (event) => {
    const session = superAdminRoute(event);

    return {
        session,
        user: session.user
    };
};
