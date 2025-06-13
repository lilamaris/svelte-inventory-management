import {
    deleteSessionTokenCookie,
    setSessionTokenCookie,
    validateSessionToken
} from '$lib/server/api/session';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const authHandle: Handle = async ({ event, resolve }) => {
    const token = event.cookies.get('session') ?? null;
    if (token === null) {
        event.locals.user = null;
        event.locals.session = null;
        return resolve(event);
    }

    const { session, user } = await validateSessionToken(token);
    if (session !== null) {
        setSessionTokenCookie(event.cookies, token, session.expiresAt);
    } else {
        deleteSessionTokenCookie(event.cookies);
    }

    event.locals.user = user;
    event.locals.session = session;
    return resolve(event);
};

export const handle = sequence(authHandle);
