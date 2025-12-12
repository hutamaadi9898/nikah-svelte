import type { PageServerLoad } from './$types';
import { adminRoute } from '$lib/server/auth/guards';
import { getDb } from '$lib/server/db';
import { weddings } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async (event) => {
    const session = adminRoute(event);
    const db = getDb(event);

    // Get wedding for this couple
    const wedding = await db.query.weddings.findFirst({
        where: eq(weddings.userId, session.user.id)
    });

    return { wedding, user: session.user };
};
