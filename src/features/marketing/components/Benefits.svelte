<script lang="ts">
    import { Button } from '$components/ui/button';
    import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$components/ui/card';
    import { goto } from '$app/navigation';
</script>

<section
    class="bg-background mx-auto flex w-full flex-col items-center justify-center py-12 md:py-24 lg:py-32"
>
    <div class="container px-4 md:px-6">
        <div class="flex flex-col items-center justify-center space-y-4 text-center">
            <div class="space-y-2">
                <h2 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    재고 관리 시스템 도입의 이점
                </h2>
                <p class="text-muted-foreground mx-auto max-w-[700px] md:text-xl">
                    최적화된 재고 관리를 통해 비즈니스 성장을 가속화하세요
                </p>
            </div>
        </div>
        <div class="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            <Card>
                <CardHeader>
                    <CardTitle>실시간 재고 추적</CardTitle>
                    <CardDescription>
                        모든 재고의 실시간 상태를 한눈에 파악하고 관리하세요
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p class="text-muted-foreground text-sm">
                        자동화된 재고 추적 시스템으로 재고 부족이나 과잉을 방지하고, 최적의 재고
                        수준을 유지할 수 있습니다.
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>자동화된 발주 관리</CardTitle>
                    <CardDescription>
                        스마트한 발주 시스템으로 업무 효율성을 높이세요
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p class="text-muted-foreground text-sm">
                        재고 수준에 따른 자동 발주 알림과 최적의 발주 시점을 제안하여 수동 작업을
                        최소화합니다.
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>데이터 기반 의사결정</CardTitle>
                    <CardDescription>인사이트를 통한 스마트한 비즈니스 결정</CardDescription>
                </CardHeader>
                <CardContent>
                    <p class="text-muted-foreground text-sm">
                        상세한 분석 리포트와 예측 모델을 통해 데이터 기반의 의사결정을 지원합니다.
                    </p>
                </CardContent>
            </Card>
        </div>

        <!-- 추가 이점 섹션 -->
        <div class="mt-16">
            <h3 class="mb-8 text-center text-2xl font-bold">더 많은 혜택</h3>
            <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div class="space-y-4">
                    <h4 class="text-xl font-semibold">📱 모바일 최적화</h4>
                    <p class="text-muted-foreground">
                        언제 어디서나 모바일 앱으로 재고를 확인하고 관리할 수 있습니다. 바코드 스캔
                        기능으로 빠른 재고 입력이 가능합니다.
                    </p>
                </div>
                <div class="space-y-4">
                    <h4 class="text-xl font-semibold">🔒 보안 시스템</h4>
                    <p class="text-muted-foreground">
                        엔터프라이즈급 보안 시스템으로 데이터를 안전하게 보호합니다. 사용자별 권한
                        설정으로 접근 제어가 가능합니다.
                    </p>
                </div>
                <div class="space-y-4">
                    <h4 class="text-xl font-semibold">📊 맞춤형 리포트</h4>
                    <p class="text-muted-foreground">
                        비즈니스에 최적화된 맞춤형 리포트를 제공합니다. 재고 회전율, 수익성 분석 등
                        다양한 지표를 확인할 수 있습니다.
                    </p>
                </div>
                <div class="space-y-4">
                    <h4 class="text-xl font-semibold">🔄 통합 시스템</h4>
                    <p class="text-muted-foreground">
                        기존 회계, ERP 시스템과의 원활한 연동을 지원합니다. 데이터 중복 입력 없이
                        효율적인 업무 처리가 가능합니다.
                    </p>
                </div>
            </div>
        </div>

        <!-- 서드파티 통합 섹션 -->
        <div class="mt-16">
            <h3 class="mb-8 text-center text-2xl font-bold">서드파티 통합으로 더 스마트하게</h3>
            <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle class="flex items-center gap-2">Notion</CardTitle>
                        <CardDescription>문서와 지식을 한 곳에서 관리</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul class="text-muted-foreground space-y-2 text-sm">
                            <li>• 재고 데이터를 Notion 페이지로 자동 동기화</li>
                            <li>• 재고 관련 문서와 데이터베이스 통합</li>
                            <li>• 팀 협업을 위한 중앙화된 문서 관리</li>
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle class="flex items-center gap-2">Slack</CardTitle>
                        <CardDescription>실시간 알림과 커뮤니케이션</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul class="text-muted-foreground space-y-2 text-sm">
                            <li>• 재고 부족 시 자동 알림</li>
                            <li>• 발주 승인 워크플로우 자동화</li>
                            <li>• 팀원 간 실시간 업데이트 공유</li>
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle class="flex items-center gap-2">Zapier</CardTitle>
                        <CardDescription>5,000+ 앱과의 자동화 연결</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul class="text-muted-foreground space-y-2 text-sm">
                            <li>• 다양한 앱과의 자동화 워크플로우</li>
                            <li>• 맞춤형 자동화 시나리오 구성</li>
                            <li>• 업무 프로세스 최적화</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>

        <!-- 통계 섹션 -->
        <div class="mt-16">
            <div class="flex justify-center">
                <Button size="lg" onclick={() => goto('/auth/signin')}>지금 시작하기</Button>
            </div>
        </div>
    </div>
</section>
