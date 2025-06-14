export interface AppMetadata {
    name: string;
    description: string;
    version: string;
    author: string;
    authorUrl: string;
}

export const appMetadata: AppMetadata = {
    name: 'Inventory Management',
    description: 'Inventory Management System example with SvelteKit and Prisma',
    version: '0.0.1',
    author: 'Lilamaris',
    authorUrl: 'https://blog.lilamaris.com'
}