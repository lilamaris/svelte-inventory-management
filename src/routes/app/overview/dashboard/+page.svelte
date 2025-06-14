<script lang="ts">
    import Button from '$components/ui/button/button.svelte';

    let { data } = $props();
</script>

<a href="/auth/login">
    <Button>Login</Button>
</a>
<a href="/auth/logout">
    <Button>Logout</Button>
</a>
