/**
 * Drizzle schema for Nikah (SQLite/D1).
 * Includes BetterAuth core tables + MVP wedding tables (Phases 2–3).
 */
import { index, integer, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable(
	'user',
	{
		id: text('id').primaryKey(),
		email: text('email').notNull(),
		emailVerified: integer('email_verified', { mode: 'boolean' }).notNull().default(false),
		name: text('name').notNull(),
		image: text('image'),
		role: text('role', { enum: ['superadmin', 'couple', 'guest'] }).notNull().default('couple'),
		createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull().$defaultFn(() => new Date()),
		updatedAt: integer('updated_at', { mode: 'timestamp_ms' }).notNull().$defaultFn(() => new Date()).$onUpdateFn(() => new Date())
	},
	(t) => ({
		emailUnique: uniqueIndex('user_email_unique').on(t.email),
		roleIdx: index('user_role_idx').on(t.role)
	})
);

export const session = sqliteTable(
	'session',
	{
		id: text('id').primaryKey(),
		userId: text('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
		expiresAt: integer('expires_at', { mode: 'timestamp_ms' }).notNull(),
		token: text('token').notNull(),
		ipAddress: text('ip_address'),
		userAgent: text('user_agent'),
		createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull().$defaultFn(() => new Date()),
		updatedAt: integer('updated_at', { mode: 'timestamp_ms' }).notNull().$defaultFn(() => new Date()).$onUpdateFn(() => new Date())
	},
	(t) => ({
		tokenUnique: uniqueIndex('session_token_unique').on(t.token),
		userIdx: index('session_user_id_idx').on(t.userId),
		expiresIdx: index('session_expires_at_idx').on(t.expiresAt)
	})
);

export const account = sqliteTable(
	'account',
	{
		id: text('id').primaryKey(),
		userId: text('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
		providerId: text('provider_id').notNull(),
		accountId: text('account_id').notNull(),
		accessToken: text('access_token'),
		refreshToken: text('refresh_token'),
		idToken: text('id_token'),
		accessTokenExpiresAt: integer('access_token_expires_at', { mode: 'timestamp_ms' }),
		refreshTokenExpiresAt: integer('refresh_token_expires_at', { mode: 'timestamp_ms' }),
		scope: text('scope'),
		password: text('password'),
		createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull().$defaultFn(() => new Date()),
		updatedAt: integer('updated_at', { mode: 'timestamp_ms' }).notNull().$defaultFn(() => new Date()).$onUpdateFn(() => new Date())
	},
	(t) => ({
		providerAccountUnique: uniqueIndex('account_provider_account_unique').on(t.providerId, t.accountId),
		userIdx: index('account_user_id_idx').on(t.userId)
	})
);

export const verification = sqliteTable(
	'verification',
	{
		id: text('id').primaryKey(),
		identifier: text('identifier').notNull(),
		value: text('value').notNull(),
		expiresAt: integer('expires_at', { mode: 'timestamp_ms' }).notNull(),
		createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull().$defaultFn(() => new Date()),
		updatedAt: integer('updated_at', { mode: 'timestamp_ms' }).notNull().$defaultFn(() => new Date()).$onUpdateFn(() => new Date())
	},
	(t) => ({
		identifierIdx: index('verification_identifier_idx').on(t.identifier),
		expiresIdx: index('verification_expires_at_idx').on(t.expiresAt)
	})
);

export const weddings = sqliteTable(
	'weddings',
	{
		id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
		userId: text('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
		slug: text('slug').notNull(),
		coupleNames: text('couple_names').notNull(),
		weddingDate: integer('wedding_date', { mode: 'timestamp_ms' }).notNull(),
		venueDetails: text('venue_details'),
		themeConfig: text('theme_config'),
		createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull().$defaultFn(() => new Date()),
		updatedAt: integer('updated_at', { mode: 'timestamp_ms' }).notNull().$defaultFn(() => new Date()).$onUpdateFn(() => new Date())
	},
	(t) => ({
		slugUnique: uniqueIndex('weddings_slug_unique').on(t.slug)
	})
);

export const guests = sqliteTable(
	'guests',
	{
		id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
		weddingId: text('wedding_id')
			.notNull()
			.references(() => weddings.id, { onDelete: 'cascade' }),
		name: text('name').notNull(),
		slug: text('slug').notNull(),
		pax: integer('pax').notNull().default(1),
		status: text('status', { enum: ['pending', 'confirmed', 'declined'] }).notNull().default('pending'),
		contact: text('contact'),
		createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull().$defaultFn(() => new Date()),
		updatedAt: integer('updated_at', { mode: 'timestamp_ms' }).notNull().$defaultFn(() => new Date()).$onUpdateFn(() => new Date())
	},
	(t) => ({
		weddingSlugUnique: uniqueIndex('guests_wedding_slug_unique').on(t.weddingId, t.slug),
		weddingIdx: index('guests_wedding_id_idx').on(t.weddingId),
		statusIdx: index('guests_status_idx').on(t.status)
	})
);

export const stories = sqliteTable(
	'stories',
	{
		id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
		weddingId: text('wedding_id')
			.notNull()
			.references(() => weddings.id, { onDelete: 'cascade' }),
		title: text('title').notNull(),
		body: text('body').notNull(),
		imagePath: text('image_path'),
		order: integer('order').notNull().default(0),
		createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull().$defaultFn(() => new Date()),
		updatedAt: integer('updated_at', { mode: 'timestamp_ms' }).notNull().$defaultFn(() => new Date()).$onUpdateFn(() => new Date())
	},
	(t) => ({
		weddingIdx: index('stories_wedding_id_idx').on(t.weddingId),
		orderIdx: index('stories_order_idx').on(t.order)
	})
);

export const gallery = sqliteTable(
	'gallery',
	{
		id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
		weddingId: text('wedding_id')
			.notNull()
			.references(() => weddings.id, { onDelete: 'cascade' }),
		imagePath: text('image_path').notNull(),
		caption: text('caption'),
		order: integer('order').notNull().default(0),
		createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull().$defaultFn(() => new Date()),
		updatedAt: integer('updated_at', { mode: 'timestamp_ms' }).notNull().$defaultFn(() => new Date()).$onUpdateFn(() => new Date())
	},
	(t) => ({
		weddingIdx: index('gallery_wedding_id_idx').on(t.weddingId),
		orderIdx: index('gallery_order_idx').on(t.order)
	})
);

export const wishes = sqliteTable(
	'wishes',
	{
		id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
		weddingId: text('wedding_id')
			.notNull()
			.references(() => weddings.id, { onDelete: 'cascade' }),
		guestName: text('guest_name').notNull(),
		message: text('message').notNull(),
		approved: integer('approved', { mode: 'boolean' }).notNull().default(false),
		createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull().$defaultFn(() => new Date()),
		updatedAt: integer('updated_at', { mode: 'timestamp_ms' }).notNull().$defaultFn(() => new Date()).$onUpdateFn(() => new Date())
	},
	(t) => ({
		weddingIdx: index('wishes_wedding_id_idx').on(t.weddingId),
		approvedIdx: index('wishes_approved_idx').on(t.approved)
	})
);

export type User = typeof user.$inferSelect;
export type Session = typeof session.$inferSelect;
export type Account = typeof account.$inferSelect;
export type Verification = typeof verification.$inferSelect;
export type Wedding = typeof weddings.$inferSelect;
export type Guest = typeof guests.$inferSelect;
export type Story = typeof stories.$inferSelect;
export type GalleryItem = typeof gallery.$inferSelect;
export type Wish = typeof wishes.$inferSelect;
