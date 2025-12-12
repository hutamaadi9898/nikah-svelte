/**
 * Server load for superadmin weddings page.
 * Lists all weddings on the platform.
 */
import type { PageServerLoad } from './$types';
import { getDb } from '$lib/server/db';

export const load: PageServerLoad = async (event) => {
    const db = getDb(event);

    const allWeddings = await db.query.weddings.findMany({
        orderBy: (weddings, { desc }) => [desc(weddings.createdAt)]
    });

    return {
        weddings: allWeddings
    };
};
