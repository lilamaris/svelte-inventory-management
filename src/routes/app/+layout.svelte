<script lang="ts">
    let { children } = $props();

    import * as Sidebar from '$components/ui/sidebar';
    import { Separator } from '$components/ui/separator';

    import AppBreadcrumbs from '$components/app-breadcrumbs.svelte';
    import AppSidebar from '$components/app-sidebar.svelte';
</script>

<Sidebar.Provider>
    <AppSidebar variant="inset" />
    <Sidebar.Inset>
        <header class="flex items-center gap-2 p-4">
            <Sidebar.Trigger />
            <Separator orientation="vertical" class="data-[orientation=vertical]:h-4" />
            <AppBreadcrumbs class="px-2" />
        </header>
        <div class="@container/main flex flex-1 flex-col items-stretch gap-6 p-4 [&>section]:flex-1">
            {@render children()}
        </div>
    </Sidebar.Inset>
</Sidebar.Provider>
