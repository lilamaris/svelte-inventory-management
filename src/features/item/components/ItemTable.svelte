<script lang="ts" module>
    export type ItemTableProps =
        | {
              isLoading: false;
              items: { items: Item[]; totalItems: number; pageCount: number };
              currentPage: number;
          }
        | {
              isLoading: true;
              items?: never;
              currentPage?: never;
          };
</script>

<script lang="ts">
    import { getCoreRowModel } from '@tanstack/table-core';
    import DataTable from '$lib/components/data-table.svelte';

    import { itemColumns } from '$features/item/types/itemSchema.js';
    import type { Item } from '$generated/prisma';
    import { renderComponent } from '$components/ui/data-table';
    import Skeleton from '$components/ui/skeleton/skeleton.svelte';
    import Button from '$components/ui/button/button.svelte';
    import { ChevronLeft, ChevronRight, Search } from '@lucide/svelte';
    let {
        items = { items: [], totalItems: 0, pageCount: 0 },
        isLoading,
        currentPage = 1
    }: ItemTableProps = $props();

    const tableData = isLoading ? Array(10).fill({}) : items.items;
    const tableColumns = !isLoading
        ? itemColumns
        : itemColumns.map((column) => ({
              ...column,
              cell: () => renderComponent(Skeleton, { class: 'after:content-["a"] text-muted' })
          }));

    const tableOptions = $state({
        data: tableData,
        columns: tableColumns,
        getCoreRowModel: getCoreRowModel()
    });
</script>

<div class="flex flex-col gap-4">
    <div class="flex h-5 items-center justify-between">
        {#if isLoading}
            <Skeleton class="text-muted h-4 w-64" />
        {:else}
            <p class="text-muted-foreground text-sm">
                Showing {currentPage * 10 - 9} - {Math.min(currentPage * 10, items.totalItems)}
                of {items.totalItems} items
            </p>
        {/if}
    </div>
    <DataTable options={tableOptions} />
    <div class="flex h-10 items-center justify-end gap-2 select-none">
        {#if isLoading}
            <Skeleton class="size-9" />
            <Skeleton class="size-9" />
        {:else}
            {#if currentPage > 1}
                <a
                    href={`/app/inventory/items/${currentPage - 1}`}
                    data-sveltekit-preload-data="hover"
                >
                    <Button disabled={currentPage === 1} size="icon"
                        ><ChevronLeft class="size-4" /></Button
                    >
                </a>
            {:else}
                <Button disabled size="icon"><ChevronLeft class="size-4" /></Button>
            {/if}
            {#if currentPage < items.pageCount}
                <a
                    href={`/app/inventory/items/${currentPage + 1}`}
                    data-sveltekit-preload-data="hover"
                >
                    <Button size="icon"><ChevronRight class="size-4" /></Button>
                </a>
            {:else}
                <Button disabled size="icon"><ChevronRight class="size-4" /></Button>
            {/if}
        {/if}
    </div>
</div>
