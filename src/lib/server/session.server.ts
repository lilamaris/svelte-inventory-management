import prisma from '$lib/prisma';

export interface Session {
    id: string;
    secretHash: Uint8Array;
    lastVerifiedAt: Date;
    createdAt: Date;
}

export interface SessionWithToken extends Session {
    token: string;
}

const INACTIVITY_TIMEOUT_SECONDS = 60 * 60 * 24 * 10; // 10 days
const ACTIVITY_CHECK_INTERVAL_SECONDS = 60 * 60; // 1 hours
const SESSION_EXPIRES_IN_SECONDS = 60 * 60 * 24; // 1 day

async function hashSecret(secret: string): Promise<Uint8Array> {
    const secretBytes = new TextEncoder().encode(secret);
    const secretHashBuffer = await crypto.subtle.digest('SHA-256', secretBytes);
    return new Uint8Array(secretHashBuffer);
}

function generateSecureRandomString(): string {
    const asciiRangeTexts = '23456789abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ!@#$%^&';
    const bytes = new Uint8Array(24);
    crypto.getRandomValues(bytes);

    let id = '';

    const shift = 2;
    for (let i = 0; i < bytes.length; i++) {
        const shiftBytes = bytes[i] >> shift;
        id += asciiRangeTexts[shiftBytes];
    }
    return id;
}

async function createSession(): Promise<SessionWithToken> {
    const now = new Date();

    const id = generateSecureRandomString();
    const secret = generateSecureRandomString();
    const secretHash = await hashSecret(secret);

    const token = id + '.' + secret;

    const session: SessionWithToken = {
        id,
        secretHash,
        createdAt: now,
        token
    };
    await prisma.session.create({
        data: {
            id: session.id,
            secretHash: session.secretHash,
            createdAt: Math.floor(session.createdAt.getTime() / 1000)
        }
    });

    return session;
}

async function validateSessionToken(token: string): Promise<Session | null> {
    const now = new Date();

    const tokenParts = token.split('.');
    if (tokenParts.length !== 2) return null;

    const [sessionId, sessionSecret] = tokenParts;

    const session = await getSession(sessionId);
    const tokenSecretHash = await hashSecret(sessionSecret);
    const validSecret = session && constantTimeEqual(tokenSecretHash, session.secretHash);
    if (!validSecret) return null;

    if (
        now.getTime() - session.lastVerifiedAt.getTime() >=
        ACTIVITY_CHECK_INTERVAL_SECONDS * 1000
    ) {
        session.lastVerifiedAt = now;
        await prisma.session.update({
            where: { id: sessionId },
            data: { lastVerifiedAt: Math.floor(now.getTime() / 1000) }
        });
    }

    return session;
}

async function getSession(sessionId: string): Promise<Session | null> {
    const now = new Date();

    const result = await prisma.session.findUnique({
        where: { id: sessionId }
    });
    if (!result) return null;
    const session: Session = {
        id: result.id,
        secretHash: result.secretHash,
        lastVerifiedAt: new Date(result.lastVerifiedAt * 1000),
        createdAt: new Date(result.createdAt * 1000)
    };

    // Inactivity timeout
    if (now.getTime() - session.lastVerifiedAt.getTime() >= INACTIVITY_TIMEOUT_SECONDS * 1000) {
        await prisma.session.delete({
            where: { id: sessionId }
        });
        return null;
    }

    return session;
}

function constantTimeEqual(a: Uint8Array, b: Uint8Array): boolean {
    if (a.byteLength !== b.byteLength) return false;
    let c = 0;
    for (let i = 0; i < a.byteLength; i++) {
        c |= a[i] ^ b[i];
    }
    return c === 0;
}

function encodedSessionPublicJSON(session: Session): string {
    const json = JSON.stringify({
        id: session.id,
        createdAt: Math.floor(session.createdAt.getTime() / 1000)
    });
    return json;
}
