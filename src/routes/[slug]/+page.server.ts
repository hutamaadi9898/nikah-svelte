/**
 * Server load function for public wedding view.
 * Fetches wedding data by slug plus all related content.
 */
import { error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { getDb } from '$lib/server/db';
import { weddings, stories, gallery, wishes } from '$lib/server/db/schema';

export const load: PageServerLoad = async (event) => {
    const db = getDb(event);
    const slug = event.params.slug;

    // Fetch wedding by slug
    const wedding = await db.query.weddings.findFirst({
        where: eq(weddings.slug, slug)
    });

    if (!wedding) {
        throw error(404, 'Wedding not found');
    }

    // Fetch related content in parallel
    const [weddingStories, galleryItems, weddingWishes] = await Promise.all([
        db.query.stories.findMany({
            where: eq(stories.weddingId, wedding.id),
            orderBy: (stories, { asc }) => [asc(stories.order)]
        }),
        db.query.gallery.findMany({
            where: eq(gallery.weddingId, wedding.id),
            orderBy: (gallery, { asc }) => [asc(gallery.order)]
        }),
        db.query.wishes.findMany({
            where: eq(wishes.weddingId, wedding.id),
            orderBy: (wishes, { desc }) => [desc(wishes.createdAt)]
        })
    ]);

    // Parse theme config (stored as JSON string)
    let themeConfig: Record<string, unknown> = {};
    try {
        themeConfig = JSON.parse(wedding.themeConfig);
    } catch {
        // Default empty config
    }

    return {
        wedding: {
            ...wedding,
            themeConfig
        },
        stories: weddingStories,
        gallery: galleryItems,
        wishes: weddingWishes.filter((w) => w.approved) // Only show approved wishes
    };
};
