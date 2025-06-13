import prisma from '$lib/prisma';
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from '@oslojs/encoding';
import { sha256 } from '@oslojs/crypto/sha2';
import type { Cookies } from '@sveltejs/kit';

import type { User } from '$lib/server/api/user';

const SESSION_EXPIRATION_TIME = 1000 * 60 * 60 * 24; // 1 day

export interface Session {
    id: string;
    expiresAt: Date;
    userId: string;
}

type SessionValidationResult = { session: Session; user: User } | { session: null; user: null };

export async function validateSessionToken(token: string): Promise<SessionValidationResult> {
    const now = Date.now();
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
    const sessionResult = await prisma.session.findUnique({
        where: {
            id: sessionId
        },
        include: {
            user: {
                select: {
                    id: true,
                    username: true,
                    email: true
                }
            }
        }
    });

    if (!sessionResult) return { session: null, user: null };

    const session: Session = {
        id: sessionResult.id,
        expiresAt: new Date(sessionResult.expiresAt),
        userId: sessionResult.userId
    };

    const user: User = {
        id: sessionResult.user.id,
        username: sessionResult.user.username,
        email: sessionResult.user.email
    };

    if (now >= session.expiresAt.getTime()) {
        await invalidateSession(sessionId);
        return { session: null, user: null };
    }

    if (session.expiresAt.getTime() - now < SESSION_EXPIRATION_TIME) {
        session.expiresAt = new Date(now + SESSION_EXPIRATION_TIME);
        await prisma.session.update({
            where: { id: sessionId },
            data: { expiresAt: session.expiresAt }
        });
    }

    return { session, user };
}

export async function invalidateSession(sessionId: string): Promise<void> {
    await prisma.session.delete({
        where: { id: sessionId }
    });
}

export async function invalidateUserSessions(userId: string): Promise<void> {
    await prisma.session.deleteMany({
        where: { userId }
    });
}

export function setSessionTokenCookie(cookies: Cookies, token: string, expiresAt: Date): void {
    cookies.set('session', token, {
        httpOnly: true,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        expires: expiresAt,
        maxAge: expiresAt.getTime() - Date.now()
    });
}

export function deleteSessionTokenCookie(cookies: Cookies): void {
    cookies.set('session', '', {
        httpOnly: true,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        expires: new Date(0)
    });
}

export function generateSessionToken(): string {
    const tokenBytes = new Uint8Array(20);
    crypto.getRandomValues(tokenBytes);
    const token = encodeBase32LowerCaseNoPadding(tokenBytes).toLowerCase();
    return token;
}

export async function createSession(token: string, userId: string): Promise<Session> {
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
    const session: Session = {
        id: sessionId,
        userId,
        expiresAt: new Date(Date.now() + SESSION_EXPIRATION_TIME)
    };
    await prisma.session.create({
        data: {
            id: session.id,
            userId: session.userId,
            expiresAt: session.expiresAt
        }
    });
    return session;
}
