<script lang="ts" generics="TData">
    import * as Table from '$components/ui/table';
    import { FlexRender } from '$components/ui/data-table';
    import { createSvelteTable } from '$components/ui/data-table';
    import type { TableOptions } from '@tanstack/table-core';

    export interface DataTableProps<TData> {
        options: TableOptions<TData>;
    }

    const defaultOptions: Partial<TableOptions<TData>> = {
        defaultColumn: {
            size: 10
        }
    };
    let { options }: DataTableProps<TData> = $props();

    const table = createSvelteTable({ ...defaultOptions, ...options });
</script>

<div class="rounded-md border">
    <Table.Root>
        <Table.Header>
            {#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
                <Table.Row>
                    {#each headerGroup.headers as header (header.id)}
                        <Table.Head style={`width: ${header.column.getSize()}px`}>
                            {#if !header.isPlaceholder}
                                <FlexRender
                                    content={header.column.columnDef.header}
                                    context={header.getContext()}
                                />
                            {/if}
                        </Table.Head>
                    {/each}
                </Table.Row>
            {/each}
        </Table.Header>
        <Table.Body>
            {#each table.getRowModel().rows as row (row.id)}
                <Table.Row data-state={row.getIsSelected() && 'selected'}>
                    {#each row.getVisibleCells() as cell (cell.id)}
                        <Table.Cell class="truncate" style={`width: ${cell.column.getSize()}px`}>
                            <FlexRender
                                content={cell.column.columnDef.cell}
                                context={cell.getContext()}
                            />
                        </Table.Cell>
                    {/each}
                </Table.Row>
            {:else}
                <Table.Row>
                    <Table.Cell colspan={table.getAllColumns().length} class="h-24 text-center">
                        No results.
                    </Table.Cell>
                </Table.Row>
            {/each}
        </Table.Body>
    </Table.Root>
</div>
