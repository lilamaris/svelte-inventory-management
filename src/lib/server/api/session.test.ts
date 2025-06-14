import prisma from '$lib/prisma';
import { describe, it, expect } from 'vitest';
import { createSession, generateSessionToken, validateSessionToken } from './session';

describe('session', () => {
    it('should get null when invalid session token', async () => {
        const sessionToken = generateSessionToken();

        const result = await validateSessionToken(sessionToken);
        expect(result.session).toBeNull();
        expect(result.user).toBeNull();
    });
});
