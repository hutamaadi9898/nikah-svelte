/**
 * RSVP API endpoint for wedding invitations.
 * POST: Submit an RSVP response.
 */
import { json, error } from '@sveltejs/kit';
import { eq, and } from 'drizzle-orm';
import type { RequestHandler } from './$types';
import { getDb } from '$lib/server/db';
import { weddings, guests, wishes } from '$lib/server/db/schema';

export const POST: RequestHandler = async (event) => {
    const db = getDb(event);
    const slug = event.params.slug;

    // Validate request body
    const body = await event.request.json().catch(() => null);
    if (!body || typeof body !== 'object') {
        throw error(400, 'Invalid request body');
    }

    const { name, pax, status, message } = body as {
        name?: string;
        pax?: number;
        status?: 'confirmed' | 'declined';
        message?: string;
    };

    if (!name || !status) {
        throw error(400, 'Name and status are required');
    }

    // Find the wedding
    const wedding = await db.query.weddings.findFirst({
        where: eq(weddings.slug, slug)
    });

    if (!wedding) {
        throw error(404, 'Wedding not found');
    }

    // Generate a guest slug from the name
    const guestSlug = name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .slice(0, 50);

    // Upsert guest (update if exists, insert if not)
    const existingGuest = await db.query.guests.findFirst({
        where: and(eq(guests.weddingId, wedding.id), eq(guests.slug, guestSlug))
    });

    if (existingGuest) {
        // Update existing guest
        await db
            .update(guests)
            .set({
                pax: status === 'confirmed' ? (pax ?? 1) : 0,
                status,
                updatedAt: new Date()
            })
            .where(eq(guests.id, existingGuest.id));
    } else {
        // Insert new guest
        await db.insert(guests).values({
            weddingId: wedding.id,
            name,
            slug: guestSlug,
            pax: status === 'confirmed' ? (pax ?? 1) : 0,
            status
        });
    }

    // If there's a message, add it to wishes (pending approval)
    if (message && message.trim()) {
        await db.insert(wishes).values({
            weddingId: wedding.id,
            guestName: name,
            message: message.trim(),
            approved: false // Requires admin approval
        });
    }

    return json({ success: true, message: 'RSVP submitted successfully' });
};
