/**
 * Route guards for role-based access control (RBAC).
 */
import { redirect } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import type { UserRole } from './index';

function requireSession(event: RequestEvent): NonNullable<App.Locals['session']> {
	const session = event.locals.session;
	if (!session) throw redirect(303, '/login');
	return session;
}

function requireRole(event: RequestEvent, allowed: readonly UserRole[]): NonNullable<App.Locals['session']> {
	const session = requireSession(event);

	// Complex logic: RBAC is centralized here so routes stay declarative.
	const userRole = session.user.role as UserRole;
	if (!allowed.includes(userRole)) throw redirect(303, '/login');

	return session;
}

export function adminRoute(event: RequestEvent): NonNullable<App.Locals['session']> {
	return requireRole(event, ['couple', 'superadmin']);
}

export function superAdminRoute(event: RequestEvent): NonNullable<App.Locals['session']> {
	return requireRole(event, ['superadmin']);
}

