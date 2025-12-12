/**
 * Server load for admin guests page.
 * Fetches all guests for the wedding.
 */
import type { PageServerLoad } from './$types';
import { getDb } from '$lib/server/db';
import { guests, weddings } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async (event) => {
    const db = getDb(event);

    // For MVP, get the first wedding
    const wedding = await db.query.weddings.findFirst();

    if (!wedding) {
        return { guests: [], wedding: null };
    }

    const guestList = await db.query.guests.findMany({
        where: eq(guests.weddingId, wedding.id),
        orderBy: (guests, { desc }) => [desc(guests.createdAt)]
    });

    return {
        wedding,
        guests: guestList
    };
};
