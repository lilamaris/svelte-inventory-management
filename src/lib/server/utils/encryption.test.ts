import { describe, it, expect } from 'vitest';
import { decryptToString, encryptString } from './encryption';

describe('encryption', () => {
    it('should encrypt and decrypt data', () => {
        const data = 'Hello, world! This is a test string need to over 33 bits';
        const encrypted = encryptString(data);
        const decrypted = decryptToString(encrypted);
        expect(decrypted).toBe(data);
    });
});
