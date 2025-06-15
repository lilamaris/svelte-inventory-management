<script lang="ts">
    import { Button } from '$components/ui/button';
    import { Input } from '$components/ui/input';
    import { Search } from '@lucide/svelte';
    import ItemTable from '$features/item/components/ItemTable.svelte';
    let { data } = $props();
</script>

<section class="flex flex-col gap-4">
    <div class="flex items-center gap-2">
        <form class="flex items-center gap-2">
            <Input placeholder="Search" />
            <Button type="submit">
                <Search class="size-4" />
            </Button>
        </form>
    </div>
    {#await data.itemResponse}
        <ItemTable isLoading={true} />
    {:then items}
        <ItemTable {items} currentPage={data.page} isLoading={false} />
    {/await}
</section>
