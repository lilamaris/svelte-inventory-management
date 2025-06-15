import type { Item } from '$generated/prisma/index.js';
import { validateSessionToken } from '$lib/server/api/session.js';
import { getToastMessage, setToastMessage } from '$lib/server/api/toast.js';
import { redirect } from '@sveltejs/kit';

export async function load({ params, fetch, cookies }) {
    const token = cookies.get('session');
    if (!token) {
        setToastMessage(cookies, {
            message: 'You must be logged in to view this page',
            type: 'error',
            path: '/app/inventory/items'
        });
        return redirect(302, '/login');
    }

    const { session, user } = await validateSessionToken(token);

    if (!user?.roles.includes('Manager') && session) {
        setToastMessage(cookies, {
            message: 'You do not have permission to view this page',
            type: 'error',
            path: '/app/overview/dashboard'
        });
        return redirect(302, '/app/overview/dashboard');
    }
    const { page } = params;
    const pageNumber = Number(page);
    if (isNaN(pageNumber) || pageNumber < 1) {
        return redirect(302, '/app/inventory/items/1');
    }

    const itemResponse: Promise<{ items: Item[]; totalItems: number; pageCount: number }> = fetch(
        `/api/items/${pageNumber}`
    ).then((res) => res.json());

    const toast = getToastMessage(cookies);
    return { itemResponse, page: pageNumber, toast };
}
