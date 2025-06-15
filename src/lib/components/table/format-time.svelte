<script lang="ts">
    let { time }: { time: Date } = $props();
</script>

<div>
    {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
</div>
