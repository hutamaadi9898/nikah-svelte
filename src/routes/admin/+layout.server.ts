/**
 * Server load for admin layout.
 * Ensures user is logged in and has couple/superadmin role.
 */
import type { LayoutServerLoad } from './$types';
import { adminRoute } from '$lib/server/auth/guards';
import { getDb } from '$lib/server/db';
import { weddings } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: LayoutServerLoad = async (event) => {
    const session = adminRoute(event);
    const db = getDb(event);

    // Get the user's wedding (assumes one wedding per user for MVP)
    const userWedding = await db.query.weddings.findFirst({
        // In a real app, we'd have a userId foreign key. For MVP, we'll use a pattern.
        // This is a placeholder - you'd need to add ownerId to weddings table
    });

    return {
        session,
        user: session.user,
        wedding: userWedding
    };
};
