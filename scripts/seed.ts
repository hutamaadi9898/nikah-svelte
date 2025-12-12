/**
 * Database seeder for development/testing.
 * Creates a superadmin user, a couple user, and a demo wedding with sample data.
 *
 * Run with: pnpm tsx scripts/seed.ts
 */
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from '../src/lib/server/db/schema';

const DATABASE_URL = process.env.DATABASE_URL || 'file:local.db';

async function seed() {
    console.log('🌱 Starting database seed...\n');

    const client = createClient({ url: DATABASE_URL });
    const db = drizzle(client, { schema });

    // Create superadmin user
    const superadminId = crypto.randomUUID();
    console.log('Creating superadmin user...');
    await db.insert(schema.user).values({
        id: superadminId,
        email: 'admin@nikah.dev',
        emailVerified: true,
        name: 'Super Admin',
        role: 'superadmin',
        createdAt: new Date(),
        updatedAt: new Date()
    }).onConflictDoNothing();

    // Create account for superadmin (password: password123)
    // Note: In production, use proper bcrypt hashing
    await db.insert(schema.account).values({
        id: crypto.randomUUID(),
        userId: superadminId,
        providerId: 'credential',
        accountId: superadminId,
        password: '$2a$10$dummy.hash.for.seeding.purposes.only', // Placeholder
        createdAt: new Date(),
        updatedAt: new Date()
    }).onConflictDoNothing();

    // Create couple user
    const coupleId = crypto.randomUUID();
    console.log('Creating couple user...');
    await db.insert(schema.user).values({
        id: coupleId,
        email: 'couple@nikah.dev',
        emailVerified: true,
        name: 'John & Jane',
        role: 'couple',
        createdAt: new Date(),
        updatedAt: new Date()
    }).onConflictDoNothing();

    await db.insert(schema.account).values({
        id: crypto.randomUUID(),
        userId: coupleId,
        providerId: 'credential',
        accountId: coupleId,
        password: '$2a$10$dummy.hash.for.seeding.purposes.only',
        createdAt: new Date(),
        updatedAt: new Date()
    }).onConflictDoNothing();

    // Create demo wedding
    const weddingId = crypto.randomUUID();
    console.log('Creating demo wedding...');
    await db.insert(schema.weddings).values({
        id: weddingId,
        slug: 'demo-wedding',
        coupleNames: 'John & Jane',
        weddingDate: new Date('2025-06-15T14:00:00'),
        venueDetails: 'The Grand Ballroom\n123 Wedding Lane\nJakarta, Indonesia',
        themeConfig: JSON.stringify({
            template: 'ethereal-minimalist',
            primaryColor: '#D4AF37',
            fontDisplay: 'Playfair Display',
            fontBody: 'Lato'
        }),
        createdAt: new Date(),
        updatedAt: new Date()
    }).onConflictDoNothing();

    // Create sample stories
    console.log('Creating sample stories...');
    const stories = [
        { title: 'How We Met', body: 'It was a beautiful summer day when our eyes first met at a coffee shop in Jakarta.', order: 1 },
        { title: 'The Proposal', body: 'Under the starlit sky, I asked the question that would change our lives forever.', order: 2 },
        { title: 'Our Journey', body: 'From friends to lovers, every moment has been a cherished memory.', order: 3 }
    ];

    for (const story of stories) {
        await db.insert(schema.stories).values({
            id: crypto.randomUUID(),
            weddingId,
            title: story.title,
            body: story.body,
            order: story.order,
            createdAt: new Date(),
            updatedAt: new Date()
        }).onConflictDoNothing();
    }

    // Create sample guests
    console.log('Creating sample guests...');
    const guests = [
        { name: 'Alice Smith', slug: 'alice-smith', pax: 2, status: 'confirmed' as const },
        { name: 'Bob Johnson', slug: 'bob-johnson', pax: 1, status: 'pending' as const },
        { name: 'Charlie Brown', slug: 'charlie-brown', pax: 3, status: 'confirmed' as const },
        { name: 'Diana Ross', slug: 'diana-ross', pax: 1, status: 'declined' as const }
    ];

    for (const guest of guests) {
        await db.insert(schema.guests).values({
            id: crypto.randomUUID(),
            weddingId,
            name: guest.name,
            slug: guest.slug,
            pax: guest.pax,
            status: guest.status,
            createdAt: new Date(),
            updatedAt: new Date()
        }).onConflictDoNothing();
    }

    // Create sample wishes
    console.log('Creating sample wishes...');
    const wishes = [
        { guestName: 'Alice Smith', message: 'Congratulations on your special day! Wishing you a lifetime of happiness!' },
        { guestName: 'Charlie Brown', message: 'So happy for you both! May your love grow stronger each day.' }
    ];

    for (const wish of wishes) {
        await db.insert(schema.wishes).values({
            id: crypto.randomUUID(),
            weddingId,
            guestName: wish.guestName,
            message: wish.message,
            approved: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }).onConflictDoNothing();
    }

    console.log('\n✅ Seed completed successfully!');
    console.log('\n📋 Test accounts:');
    console.log('   SuperAdmin: admin@nikah.dev');
    console.log('   Couple: couple@nikah.dev');
    console.log('   (Note: You need to register these accounts via the UI first)');
    console.log('\n🌐 Demo wedding: /demo-wedding');

    process.exit(0);
}

seed().catch((err) => {
    console.error('❌ Seed failed:', err);
    process.exit(1);
});
