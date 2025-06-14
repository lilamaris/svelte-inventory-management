<script lang="ts">
    import { Toaster } from '$components/ui/sonner';
    import { toast } from 'svelte-sonner';
    import { page } from '$app/state';
    import '../app.css';
    let { children } = $props();
    import { ModeWatcher } from 'mode-watcher';

    $effect(() => {
        if (page.data.toast) {
            const { type, message, path } = page.data.toast;
            if (path !== page.url.pathname) return;

            switch (type) {
                case 'success':
                    toast.success(message);
                    break;
                case 'error':
                    toast.error(message);
                    break;
                case 'info':
                    toast.info(message);
                    break;
            }
        }
    });
</script>

{@render children()}
<Toaster />
<ModeWatcher />
