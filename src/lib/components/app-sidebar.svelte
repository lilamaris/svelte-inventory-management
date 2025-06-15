<script lang="ts">
    import type { ComponentProps } from 'svelte';
    import GalleryVerticalEndIcon from '@lucide/svelte/icons/gallery-vertical-end';
    import { routes, type RouteNodes } from '$config/routes';
    import * as Sidebar from '$components/ui/sidebar';

    let { ref = $bindable(null), ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();
</script>

{#snippet routerGroup(routes: RouteNodes[])}
    {#each routes as route}
        <Sidebar.Menu>
            <Sidebar.MenuItem>
                <a href={route.href}>
                    <Sidebar.MenuButton>
                        <route.icon />
                        <span>{route.label}</span>
                    </Sidebar.MenuButton>
                </a>
            </Sidebar.MenuItem>
        </Sidebar.Menu>
    {/each}
{/snippet}

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
    <Sidebar.Content>
        {#each Object.entries(routes) as [key, route]}
            <Sidebar.Group>
                <Sidebar.GroupLabel class="capitalize">{key}</Sidebar.GroupLabel>
                {@render routerGroup(route)}
            </Sidebar.Group>
        {/each}
    </Sidebar.Content>
</Sidebar.Root>
