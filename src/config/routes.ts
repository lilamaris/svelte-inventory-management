import type { Icon as IconType } from '@lucide/svelte';

import GaugeIcon from '@lucide/svelte/icons/gauge';
import PackageIcon from '@lucide/svelte/icons/package';
import TagIcon from '@lucide/svelte/icons/tag';
import PencilIcon from '@lucide/svelte/icons/pencil';
import PlusIcon from '@lucide/svelte/icons/plus';

import { Role } from '$generated/prisma/enums';

export interface RouteNodes {
    id: string;
    label: string;
    href?: string;
    icon?: typeof IconType;
    roles?: Role[];
    children?: RouteNodes[];
}

export const routes: Record<string, RouteNodes[]> = {
    'overview': [
        {
            id: 'dashboard',
            label: 'Dashboard',
            href: '/app/overview/dashboard',
            icon: GaugeIcon,
            roles: [Role.Admin, Role.Manager, Role.Viewer]
        }
    ],
    'inventory': [
        {
            id: 'items',
            label: 'Items',
            href: '/app/inventory/items',
            icon: PackageIcon,
            roles: [Role.Admin, Role.Manager],
            children: [
                {
                    id: 'create',
                    label: 'Create Item',
                    href: '/app/inventory/items/create',
                    icon: PlusIcon,
                    roles: [Role.Admin, Role.Manager]
                },
                {
                    id: 'edit',
                    label: 'Edit Item',
                    href: '/app/inventory/items/edit',
                    icon: PencilIcon,
                    roles: [Role.Admin, Role.Manager]
                }
            ]
        },
        {
            id: 'categories',
            label: 'Categories',
            href: '/app/inventory/categories',
            icon: TagIcon,
            roles: [Role.Admin, Role.Manager]
        }
    ]
};
