<script lang="ts">
    import * as Card from '$components/ui/card';
    import { Button } from '$components/ui/button';
    import LoginForm from '$features/auth/components/login-form.svelte';

    const formId = 'login-form';
    const action = '?/login';

    let { form } = $props();
</script>

<div class="bg-muted flex h-screen w-full items-center justify-center px-4">
    <Card.Root class="mx-auto w-full max-w-sm">
        <Card.Header>
            <Card.Title class="text-2xl">Sign up</Card.Title>
            <Card.Description>Create an account to get started</Card.Description>
        </Card.Header>
        <Card.Content>
            <div class="flex flex-col gap-4">
                <LoginForm {formId} {action} state={form?.state} />
                <Button type="submit" form={formId}>Sign up</Button>
                <div class="text-center text-sm">
                    Already have an account? <a href="/auth/login" class="hover:underline">Login</a>
                </div>
            </div>
        </Card.Content>
    </Card.Root>
</div>
