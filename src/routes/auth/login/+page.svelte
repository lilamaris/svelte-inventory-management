<script lang="ts">
    import * as Card from '$components/ui/card';
    import { Button } from '$components/ui/button';
    import LoginForm from '$features/auth/components/login-form.svelte';
    import { onMount } from 'svelte';
    
    const formId = 'login-form';
    const action = '?/login';

    let { form, flash } = $props();

    onMount(() => {
        if (flash) {
            console.log(flash);
        }
    });
</script>

<div class="bg-muted flex h-screen w-full items-center justify-center px-4">
    <Card.Root class="mx-auto w-full max-w-sm">
        <Card.Header>
            <Card.Title class="text-2xl">Login</Card.Title>
            <Card.Description>Login to your account to get started</Card.Description>
        </Card.Header>
        <Card.Content>
            <div class="flex flex-col gap-4">
                <LoginForm {formId} {action} state={form?.state} />
                {#if form?.state?.message}
                    <p class="text-destructive text-sm">{form.state.message}</p>
                {/if}
                <Button type="submit" form={formId}>Login</Button>
                <div class="text-center text-sm">
                    Don't have an account? <a href="/auth/signup" class="hover:underline">Sign up</a
                    >
                </div>
            </div>
        </Card.Content>
    </Card.Root>
</div>
