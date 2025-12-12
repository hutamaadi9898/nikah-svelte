/**
 * BetterAuth configuration (Email/Password) for Nikah.
 * Bound to the request so it can use the Cloudflare `DB` D1 binding when available.
 */
import type { RequestEvent } from '@sveltejs/kit';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { createFieldAttribute } from 'better-auth/db';
import { z } from 'zod';
import { getDb } from '$lib/server/db';
import * as schema from '$lib/server/db/schema';

export const userRoleSchema = z.enum(['superadmin', 'couple', 'guest']);
export type UserRole = z.infer<typeof userRoleSchema>;

function getAuthSecret(event: RequestEvent): string {
	const platformSecret = (event.platform?.env as unknown as Partial<{ BETTER_AUTH_SECRET: string }>)
		.BETTER_AUTH_SECRET;
	const secret = platformSecret ?? process.env.BETTER_AUTH_SECRET;
	if (!secret) {
		throw new Error(
			'BETTER_AUTH_SECRET is not set. Provide it via `wrangler secret put BETTER_AUTH_SECRET` (Cloudflare) or `.env` (local).'
		);
	}
	return secret;
}

export function createNikahAuth(event: RequestEvent) {
	const db = getDb(event);

	return betterAuth({
		basePath: '/api/auth',
		secret: getAuthSecret(event),
		database: drizzleAdapter(db as unknown as Record<string, unknown>, {
			provider: 'sqlite',
			schema: schema as unknown as Record<string, unknown>,
			usePlural: false,
			// Disable transactions - D1 has limited transaction support
			transaction: false
		}),
		emailAndPassword: {
			enabled: true,
			minPasswordLength: 8,
			maxPasswordLength: 128
		},
		user: {
			additionalFields: {
				role: createFieldAttribute('string', {
					required: true,
					defaultValue: 'couple',
					validator: { input: userRoleSchema, output: userRoleSchema }
				})
			}
		}
	});
}

export type NikahAuth = ReturnType<typeof createNikahAuth>;
export type NikahSessionData = NikahAuth['$Infer']['Session'];
export type NikahSession = NikahSessionData | null;
