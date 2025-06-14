import type { Cookies } from "@sveltejs/kit";

export interface ToastMessage {
    message: string;
    type: 'info' | 'success' | 'error';
    path: string;
}

const FLASH_TOAST_COOKIE_NAME = "flash-toast"

export function setToastMessage(cookies: Cookies, message: ToastMessage) {
    const flash = message;
    cookies.set(FLASH_TOAST_COOKIE_NAME, JSON.stringify(flash), {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30
    });
}

export function getToastMessage(cookies: Cookies) {
    const flash = cookies.get(FLASH_TOAST_COOKIE_NAME);
    if (!flash) return null;
    const toastMessage = JSON.parse(flash) as ToastMessage;
    cookies.delete(FLASH_TOAST_COOKIE_NAME, { path: '/' });
    return toastMessage;
}