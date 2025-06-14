<script lang="ts">
    import type { ComponentProps } from 'svelte';
    import GalleryVerticalEndIcon from '@lucide/svelte/icons/gallery-vertical-end';
    import { routes, type RouteNodes } from '$config/routes';
    import * as Sidebar from '$components/ui/sidebar';

    let { ref = $bindable(null), ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();
</script>

<Sidebar.Root {...restProps} bind:ref>
    <Sidebar.Header>
        <Sidebar.Menu>
            <Sidebar.MenuItem>
                <Sidebar.MenuButton>
                    <GalleryVerticalEndIcon />
                    <span>Overview</span>
                </Sidebar.MenuButton>
            </Sidebar.MenuItem>
        </Sidebar.Menu>
    </Sidebar.Header>
</Sidebar.Root>
