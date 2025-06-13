<script lang="ts" module>
    import type { ActionState } from '$lib/types';
    import { loginSchema } from '$features/auth/types/authSchema';

    export type LoginFormProps = {
        formId: string;
        action: string;
        state?: ActionState<typeof loginSchema>;
    };
</script>

<script lang="ts">
    import { Label } from '$components/ui/label';
    import { Input } from '$components/ui/input';
    import { enhance } from '$app/forms';

    let { formId, action = '', state }: LoginFormProps = $props();
</script>

<form id={formId} {action} use:enhance method="post" class="flex flex-col gap-6">
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
        {#if state?.errors?.password}
            <p class="text-destructive text-sm">{state.errors.password}</p>
        {/if}
    </div>
</form>
