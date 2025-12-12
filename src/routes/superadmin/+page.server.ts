/**
 * Server load for superadmin overview.
 * Fetches platform-wide statistics.
 */
import type { PageServerLoad } from './$types';
import { getDb } from '$lib/server/db';

export const load: PageServerLoad = async (event) => {
    const db = getDb(event);

    // Fetch all and count in JS (simpler for union db type)
    const [users, allWeddings, allGuests, allWishes] = await Promise.all([
        db.query.user.findMany(),
        db.query.weddings.findMany(),
        db.query.guests.findMany(),
        db.query.wishes.findMany()
    ]);

    return {
        stats: {
            totalUsers: users.length,
            totalWeddings: allWeddings.length,
            totalGuests: allGuests.length,
            totalWishes: allWishes.length
        }
    };
};
