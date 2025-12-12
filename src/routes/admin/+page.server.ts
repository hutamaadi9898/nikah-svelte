/**
 * Server load for admin overview page.
 * Fetches guest stats for the user's wedding.
 */
import type { PageServerLoad } from './$types';
import { getDb } from '$lib/server/db';
import { guests, wishes } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async (event) => {
    const db = getDb(event);

    // For MVP, get the first wedding (in production, filter by ownerId)
    const wedding = await db.query.weddings.findFirst();

    if (!wedding) {
        return {
            stats: null,
            wedding: null
        };
    }

    // Fetch all guests and wishes, then count in JS (simpler for union db type)
    const allGuests = await db.query.guests.findMany({
        where: eq(guests.weddingId, wedding.id)
    });

    const allWishes = await db.query.wishes.findMany({
        where: eq(wishes.weddingId, wedding.id)
    });

    // Calculate stats in JavaScript
    const confirmed = allGuests.filter((g) => g.status === 'confirmed');
    const pending = allGuests.filter((g) => g.status === 'pending');
    const declined = allGuests.filter((g) => g.status === 'declined');
    const totalPax = confirmed.reduce((sum, g) => sum + g.pax, 0);

    return {
        wedding,
        stats: {
            confirmed: confirmed.length,
            pending: pending.length,
            declined: declined.length,
            totalPax,
            totalWishes: allWishes.length
        }
    };
};
