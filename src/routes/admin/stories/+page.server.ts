import type { PageServerLoad } from './$types';
import { adminRoute } from '$lib/server/auth/guards';
import { getDb } from '$lib/server/db';
import { stories } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async (event) => {
    const session = adminRoute(event);
    const db = getDb(event);

    // Get wedding for this couple
    const { weddings } = await import('$lib/server/db/schema');
    const wedding = await db.query.weddings.findFirst({
        where: eq(weddings.userId, session.user.id)
    });

    if (!wedding) {
        return { stories: [], weddingId: null };
    }

    const storiesList = await db.query.stories.findMany({
        where: eq(stories.weddingId, wedding.id),
        orderBy: (s, { asc }) => [asc(s.order)]
    });

    return { stories: storiesList, weddingId: wedding.id };
};
