<script lang="ts">
    import { Button } from '$components/ui/button';
    import { goto } from '$app/navigation';
</script>

<section
    class="from-background to-muted flex h-screen w-full items-center justify-center bg-gradient-to-b"
>
    <div class="container px-4 md:px-6">
        <div class="flex flex-col items-center space-y-4 text-center">
            <h1 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                스마트한 재고 관리의 시작
            </h1>
            <p class="text-muted-foreground mx-auto max-w-[700px] md:text-xl">
                실시간 재고 추적, 자동화된 발주 관리, 그리고 데이터 기반의 의사결정으로
                <br class="hidden sm:inline" />
                비즈니스의 효율성을 극대화하세요.
            </p>
            <div class="space-x-4">
                <Button size="lg" onclick={() => goto('/auth/signup')}>무료로 시작하기</Button>
                <Button size="lg" variant="outline" onclick={() => goto('/auth/login')}>
                    로그인
                </Button>
            </div>
        </div>
    </div>
</section>
