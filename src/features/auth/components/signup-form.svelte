<script lang="ts" module>
    import type { ActionState } from '$lib/types';
    import { signupSchema } from '$features/auth/types/authSchema';

    export type SignupFormProps = {
        formId: string;
        action: string;
        state?: ActionState<typeof signupSchema>;
    };
</script>

<script lang="ts">
    import type { SubmitFunction } from '@sveltejs/kit';
    import { Label } from '$components/ui/label';
    import { Input } from '$components/ui/input';
    import { enhance } from '$app/forms';

    let { formId, action = '', state }: SignupFormProps = $props();

    const handleSubmit: SubmitFunction = (event) => {};
</script>

<form id={formId} {action} use:enhance={handleSubmit} method="post" class="flex flex-col gap-6">
    <div class="grid gap-2">
        <Label for="username">Username</Label>
        <Input type="text" id="username" name="username" placeholder="Enter your username" />
        {#if state?.errors?.username}
            <p class="text-destructive text-sm">{state.errors.username}</p>
        {/if}
    </div>
    <div class="grid gap-2">
        <Label for="email">Email</Label>
        <Input type="email" id="email" name="email" placeholder="Enter your email" />
        {#if state?.errors?.email}
            <p class="text-destructive text-sm">{state.errors.email}</p>
        {/if}
    </div>
    <div class="grid gap-2">
        <Label for="password">Password</Label>
        <Input type="password" id="password" name="password" placeholder="Enter your password" />
        <div class="flex flex-col gap-1">
            {#if state?.errors?.password}
                <p class="text-destructive text-sm">Password must be</p>
                <ul class="list-inside list-disc">
                    {#each state.errors.password as error}
                        <li class="text-destructive text-sm">{error}</li>
                    {/each}
                </ul>
            {/if}
        </div>
    </div>
    <div class="grid gap-2">
        <Label for="confirm-password">Confirm Password</Label>
        <Input
            type="password"
            id="confirm-password"
            name="confirm-password"
            placeholder="Confirm your password"
        />
        {#if state?.errors?.['confirm-password']}
            <p class="text-destructive text-sm">{state.errors['confirm-password']}</p>
        {/if}
    </div>
</form>
