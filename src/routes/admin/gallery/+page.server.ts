import type { PageServerLoad } from './$types';
import { adminRoute } from '$lib/server/auth/guards';
import { getDb } from '$lib/server/db';
import { gallery } from '$lib/server/db/schema';
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
        return { photos: [], weddingId: null };
    }

    const photos = await db.query.gallery.findMany({
        where: eq(gallery.weddingId, wedding.id),
        orderBy: (g, { asc }) => [asc(g.order)]
    });

    return { photos, weddingId: wedding.id };
};
