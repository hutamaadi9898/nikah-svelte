// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
        interface Platform {
            env: Env
            cf: CfProperties
            ctx: ExecutionContext
        }
		interface Locals {
			auth: import('$lib/server/auth').NikahAuth;
			session: import('$lib/server/auth').NikahSession;
			user: import('$lib/server/auth').NikahSessionData['user'] | null;
		}
    }
}

export {};
