import type { Prisma } from '$generated/prisma';
import prisma from '$lib/prisma.js';
import { json } from '@sveltejs/kit';

export async function GET({ params, url }) {
    const page = Number(params.page) || 1;

    const query = url.searchParams;
    const limit = Number(query.get('limit')) || 10;
    const search = query.get('search') || '';
    const orderBy = query.get('orderBy') || 'asc';
    const orderByField = query.get('orderByField') || 'createdAt';

    const whereClause: Prisma.ItemWhereInput = {
        OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { sku: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } }
        ]
    };

    const items = await prisma.item.findMany({
        where: whereClause,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
            [orderByField]: orderBy
        }
    });

    const totalItems = await prisma.item.count({ where: whereClause });
    const pageCount = Math.ceil(totalItems / limit);

    return json({ items, totalItems, pageCount });
}
