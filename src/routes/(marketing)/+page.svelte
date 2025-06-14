<script lang="ts">
    import Hero from '$features/marketing/components/Hero.svelte';
    import Benefits from '$features/marketing/components/Benefits.svelte';
    import Footer from '$features/marketing/components/Footer.svelte';

    let { data } = $props();
</script>

<div class="flex min-h-screen w-full flex-col items-center">
    <Hero />
    <Benefits />
    <Footer />
</div>
