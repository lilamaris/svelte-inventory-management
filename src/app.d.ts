// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { User } from '$lib/server/api/user';
import type { Session } from '$lib/server/api/session';

declare global {
    namespace App {
        // interface Error {}
        interface Locals {
            user: User | null;
            session: Session | null;
        }
        // interface PageData {}
        // interface PageState {}
        // interface Platform {}
    }
}

export {};
