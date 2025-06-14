import { getToastMessage } from '$lib/server/api/toast';

export function load({ cookies }) {
    const toast = getToastMessage(cookies);
    return { toast };
}
