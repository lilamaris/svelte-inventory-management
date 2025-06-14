<script lang="ts">
    import Button from '$components/ui/button/button.svelte';

    let { data } = $props();
</script>

<div class="flex h-screen flex-col items-center justify-center">
    <h1>Welcome, {data.user.username}!</h1>
    <p>Session: {data.session.id}</p>
    <pre>{JSON.stringify(data, null, 2)}</pre>
    <a href="/auth/login">
        <Button>Login</Button>
    </a>
    <a href="/auth/logout">
        <Button>Logout</Button>
    </a>
</div>
