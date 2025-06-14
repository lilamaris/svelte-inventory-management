<script lang="ts">
    import { page } from '$app/state';
    import { routes, type RouteNodes } from '$config/routes';
    import * as Breadcrumb from '$components/ui/breadcrumb';
    import * as DropdownMenu from '$components/ui/dropdown-menu';
    import type { ComponentProps } from 'svelte';
    import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';

    const breadcrumbs = $derived.by(() => {
        const crumbs: RouteNodes[] = [];
        const segments = page.url.pathname.split('/').filter(Boolean);
        crumbs.push({ id: 'home', href: '/', label: 'Home' });
        crumbs.push({
            id: segments[1],
            label: segments[1],
            children: routes[segments[1]]
        });
        let candidate = routes[segments[1]];

        for (const segment of segments.slice(2)) {
            const found = candidate.find((route) => route.id === segment);
            if (!found) break;
            crumbs.push(found);
            candidate = found.children ?? [];
        }

        return crumbs;
    });

    let { ...restProps }: ComponentProps<typeof Breadcrumb.Root> = $props();
</script>

{#snippet breadcrumb(crumb: RouteNodes, isLast: boolean)}
    <Breadcrumb.Item>
        {#if crumb.icon}
            <crumb.icon class="hidden size-4 md:block" />
        {/if}
        {#if crumb.children}
            <DropdownMenu.Root>
                <DropdownMenu.Trigger
                    class="hover:text-primary flex items-center gap-1 capitalize transition-colors"
                >
                    {crumb.label}
                    <ChevronDownIcon class="hidden size-4 md:block" />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content side="bottom" align="start">
                    {#each crumb.children as child}
                        <DropdownMenu.Item>
                            <Breadcrumb.Link
                                href={child.href}
                                class="flex items-center gap-1.5 capitalize"
                            >
                                {#if child.icon}
                                    <child.icon class="hidden size-4 md:block" />
                                {/if}
                                {child.label}
                            </Breadcrumb.Link>
                        </DropdownMenu.Item>
                    {/each}
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        {:else if isLast}
            <Breadcrumb.Page>{crumb.label}</Breadcrumb.Page>
        {:else}
            <Breadcrumb.Link href={crumb.href}>{crumb.label}</Breadcrumb.Link>
        {/if}

        {#if !isLast}
            <Breadcrumb.Separator class="hidden md:block" />
        {/if}
    </Breadcrumb.Item>
{/snippet}

<Breadcrumb.Root {...restProps}>
    <Breadcrumb.List>
        {#each breadcrumbs as crumb, index}
            {@render breadcrumb(crumb, index === breadcrumbs.length - 1)}
        {/each}
    </Breadcrumb.List>
</Breadcrumb.Root>
