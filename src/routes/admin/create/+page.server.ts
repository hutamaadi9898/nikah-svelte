import type { Actions, PageServerLoad } from './$types';
import { redirect, fail } from '@sveltejs/kit';
import { adminRoute } from '$lib/server/auth/guards';
import { getDb } from '$lib/server/db';
import { weddings } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async (event) => {
    const session = adminRoute(event);
    const db = getDb(event);

    // Check if user already has a wedding
    const existingWedding = await db.query.weddings.findFirst({
        where: eq(weddings.userId, session.user.id)
    });

    if (existingWedding) {
        throw redirect(303, '/admin');
    }

    return { user: session.user };
};

export const actions: Actions = {
    default: async (event) => {
        const session = adminRoute(event);
        const db = getDb(event);
        const formData = await event.request.formData();

        const coupleNames = formData.get('coupleNames') as string;
        const slug = formData.get('slug') as string;
        const weddingDateStr = formData.get('weddingDate') as string;
        const venueDetails = formData.get('venueDetails') as string;

        if (!coupleNames || !slug || !weddingDateStr) {
            return fail(400, { error: 'Please fill in all required fields' });
        }

        // Check if slug is already taken
        const existingSlug = await db.query.weddings.findFirst({
            where: eq(weddings.slug, slug)
        });

        if (existingSlug) {
            return fail(400, { error: 'This URL is already taken. Please choose another.' });
        }

        // Create the wedding
        await db.insert(weddings).values({
            userId: session.user.id,
            slug,
            coupleNames,
            weddingDate: new Date(weddingDateStr),
            venueDetails: venueDetails || null,
            themeConfig: null
        });

        throw redirect(303, '/admin');
    }
};
