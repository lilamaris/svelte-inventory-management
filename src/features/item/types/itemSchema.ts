import type { Item } from '$generated/prisma';

import type { ColumnDef } from '@tanstack/table-core';
import { createRawSnippet } from 'svelte';
import { renderComponent, renderSnippet } from '$components/ui/data-table';
import FormatTime from '$lib/components/table/format-time.svelte';

export const itemColumns: ColumnDef<Item>[] = [
    {
        accessorKey: 'name',
        header: 'Name'
    },
    {
        accessorKey: 'description',
        header: 'Description',
        cell: ({ row }) => {
            const descriptionCellSnippet = createRawSnippet<[string]>((getDescription) => {
                const description = getDescription();
                return {
                    render: () => `<div class="truncate font-medium">${description}</div>`
                };
            });
            return renderSnippet(descriptionCellSnippet, row.getValue('description'));
        }
    },
    {
        accessorKey: 'quantity',
        header: 'Quantity'
    },
    {
        accessorKey: 'price',
        header: 'Price',
        cell: ({ row }) => {
            const formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
            });
            const priceCellSnippet = createRawSnippet<[string]>((getPrice) => {
                const price = getPrice();
                return {
                    render: () => `<div class="text-right font-medium">${price}</div>`
                };
            });
            return renderSnippet(priceCellSnippet, formatter.format(row.getValue('price')));
        }
    },
    {
        accessorKey: 'createdAt',
        header: 'Created At',
        cell: ({ row }) => {
            return renderComponent(FormatTime, { time: new Date(row.getValue('createdAt')) });
        }
    },
    {
        accessorKey: 'updatedAt',
        header: 'Updated At',
        cell: ({ row }) => {
            return renderComponent(FormatTime, { time: new Date(row.getValue('updatedAt')) });
        }
    }
];
