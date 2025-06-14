import { GitHub } from 'arctic';
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '$env/static/private';
import { PUBLIC_APP_URL } from '$env/static/public';

const app_base_url =
    process.env.NODE_ENV === 'production' ? PUBLIC_APP_URL : 'http://localhost:5173';
const provider_callback_url = `${app_base_url}/auth/login/github/callback`;

export const github = new GitHub(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, provider_callback_url);
