import { describe, it, expect } from 'vitest';

describe('session.server', () => {
	it('generating Ids and secrets', () => {
		const asciiRangeTexts = '23456789abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ!@#$%^&';
		expect(asciiRangeTexts.length).toBe(64);
        
        // Generate 24 bytes = 192 bits of entropy
		const bytes = new Uint8Array(24);
		crypto.getRandomValues(bytes);

        // collect secret id
		let id = '';

        // crypto create random values range is 0-255, our ascii range is 0-63. so we cover all the values by shifting the values to the right by 2 bits.
		const shift = 2;
		for (let i = 0; i < bytes.length; i++) {
			const shiftBytes = bytes[i] >> shift;
			id += asciiRangeTexts[shiftBytes];
		}
		console.log(id);
	});
});
