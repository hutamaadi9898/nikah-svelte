/**
 * Database client factory.
 *
 * - Cloudflare runtime: uses the `DB` D1 binding.
 * - Local Node/Vite dev: falls back to a local SQLite database via libSQL (`DATABASE_URL`).
 */
import { createClient } from '@libsql/client';
import { drizzle as drizzleD1, type DrizzleD1Database } from 'drizzle-orm/d1';
import { drizzle as drizzleLibsql, type LibSQLDatabase } from 'drizzle-orm/libsql';
import type { RequestEvent } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import * as schema from './schema';

export type NikahDb = DrizzleD1Database<typeof schema> | LibSQLDatabase<typeof schema>;

function getLocalDb(): LibSQLDatabase<typeof schema> {
	if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');
	const client = createClient({ url: env.DATABASE_URL });
	return drizzleLibsql(client, { schema });
}

function getD1Db(platformEnv: Env): DrizzleD1Database<typeof schema> {
	return drizzleD1(platformEnv.DB, { schema });
}

export function getDb(event: Pick<RequestEvent, 'platform'>): NikahDb {
	// Prioritize DATABASE_URL for local development
	// D1 bindings exist in vite dev but are not functional
	if (env.DATABASE_URL) {
		return getLocalDb();
	}

	const platformEnv = event.platform?.env;
	// Only use D1 if DATABASE_URL is not set and we're in Cloudflare runtime
	if (platformEnv?.DB && typeof platformEnv.DB?.prepare === 'function') {
		return getD1Db(platformEnv);
	}

	// Fallback to local db
	return getLocalDb();
}
